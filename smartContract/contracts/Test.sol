// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

interface ERC721 {
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    function balanceOf(address _owner) external view returns (uint256); // 해당 주소가 보유하고있는 nft갯수를 리턴
    function ownerOf(uint256 _tokenId) external view returns (address); // nft를 소유하고 있는 주소를 리턴
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable; // 전송받는 to 주소가 erc721토큰을 받을수 있는지 체크하고 전달
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable; // nft 소유자로부터 해당 nft를 다른 주소로 전송 
    function approve(address _approved, uint256 _tokenId) external payable; // 해당 주소에 nft 전송 권한을 부여
    function setApprovalForAll(address _operator, bool _approved) external; // nft 소유자가 해당 주소에게 모든 nft 에 대한 전송 권한 부여 및 해제
    function getApproved(uint256 _tokenId) external view returns (address); // 해당 토큰의 전송 권한을 갖고 있는 주소를 리턴
    function isApprovedForAll(address _owner, address _operator) external view returns (bool); // setApprovealForAll 의 권한이 있는지 true, false 리턴
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMsg) internal pure returns (uint256) {
        require(b <= a, errorMsg);
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if ( a == 0 ) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
}

library Counters {

    using SafeMath for uint256;

    struct Counter {
        uint256 value;
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter.value;
    }

    function increment(Counter storage counter) internal {
        counter.value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter.value = counter.value.sub(1);
    }
}

library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }

}


contract MinterRole {
    using Roles for Roles.Role;

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    Roles.Role private _minters;

    constructor() {
        _addMinter(msg.sender);
    }

    modifier onlyMinter() {
        require(isMinter(msg.sender), "MinterRole: caller does not have the Minter role");
        _;
    }

    function isMinter(address account) public view returns (bool) {
        return _minters.has(account);
    }

    function addMinter(address account) public onlyMinter {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(msg.sender);
    }

    function _addMinter(address account) internal {
        _minters.add(account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        _minters.remove(account);
        emit MinterRemoved(account);
    }
}

library String {
    function uint2str(uint _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }

        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}

contract Test is ERC721, MinterRole {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    uint256 private _mintIndexForSale;

    // NFT의 tokenId를 소유하고 있는 account를 저장
    mapping(uint256 => address) private _tokenOwner;

    // tokenId에 대한 권한이 있는 account를 저장
    mapping(uint256 => address) private _tokenApprovals;

    // owner가 갖고 있는 token의 개수를 저장
    mapping(address => Counters.Counter) private _ownedTokensCount;

    // owner가 보유한 tokenId들
    mapping(address => uint256[]) private _ownedTokens;

    // owner가 보유한 tokenId들의 index
    mapping(uint256 => uint256) private _ownedTokenIndexs;    



    mapping(address => mapping(address => bool)) private _operatorApprovals;

    mapping(address => uint256) private _lastCallBlockNumber;
    uint256 private _antibotInterval;
    uint256 private _mintStartBlockNumber;
    uint256 private _mintLimitPerBlock;
    uint256 private _mintPrice;

    string baseURI;

    constructor() {
        _mintIndexForSale = 1;        
        _mintLimitPerBlock = 275;
        _mintPrice = 1000000000000000;
    }

    function getBaseURI() public view returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyMinter {
        baseURI = _newBaseURI;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "TEST: URI query for nonexistent token");
        string memory uri = getBaseURI();
        if (bytes(uri).length == 0) {
            return "";
        }
        return string(abi.encodePacked(uri, "1", ".json"));
    }

    function getOwnedTokenCount() external view returns(Counters.Counter memory) {
        return _ownedTokensCount[msg.sender];
    }

    // _onwer가 보유한 NFT 개수를 조회
    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "TEST: balance query for the zero address");
        return _ownedTokensCount[_owner].current();
    }

    // tokenId를 보유한 owner 조회
    function ownerOf(uint256 _tokenId) external view returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "TEST: owner query for nonexistent token");
        return owner;
    }

    // 전송받는 to 주소가 erc721토큰을 받을수 있는지 체크하고 전달
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(_to != address(0), "TEST: to == address(0)");
        this.safeTransferFrom(_from, _to, _tokenId, "");
    } 

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) external payable {
        this.transferFrom(_from, _to, _tokenId);
    }


    // nft 소유자로부터 해당 nft를 다른 주소로 전송 
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(_isApprovedOrOwner(msg.sender, _tokenId), "TEST: transter caller is not owner nor approved");
        _transferFrom(_from, _to, _tokenId);
    }

    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(this.ownerOf(_tokenId) == _from, "TEST: transfer of token that is not own");
        require(_to != address(0), "TEST: transfer to the zero address");
        if(_tokenApprovals[_tokenId] != address(0)) {
            _tokenApprovals[_tokenId] = address(0);
        }

        _ownedTokensCount[_from].decrement();
        _ownedTokensCount[_to].increment();
        _tokenOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function _isApprovedOrOwner(address sender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "TEST: operator query for nonexistent token");
        address owner = this.ownerOf(tokenId);
        return sender == owner || this.getApproved(tokenId) == sender || this.isApprovedForAll(owner, sender);
    }

    // 해당 주소에 nft 전송 권한을 부여
    function approve(address _approved, uint256 _tokenId) external payable {
        address owner = this.ownerOf(_tokenId);
        require(_approved != owner, "TEST: approval to current owner");
        address sender = msg.sender;
        require(owner == sender || this.isApprovedForAll(owner, sender), "TEST: approved caller is not owner nor approved for all");
        _tokenApprovals[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    } 

    // nft 소유자가 해당 주소에게 모든 nft 에 대한 전송 권한 부여 및 해제
    function setApprovalForAll(address _operator, bool _approved) external {
        address owner = msg.sender;
        require(_operator != owner, "TEST: approve to caller");
        _operatorApprovals[owner][_operator] = _approved;
    } 

    // 해당 토큰의 전송 권한을 갖고 있는 주소를 리턴
    function getApproved(uint256 _tokenId) external view returns (address) {
        require(_exists(_tokenId), "TEST: approved query for nonexistent token");
        return _tokenApprovals[_tokenId];
    } 

    // setApprovealForAll 의 권한이 있는지 true, false 리턴
    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    } 

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "TEST: mint to the zero address");
        require(!_exists(tokenId), "TEST: token already minted");
        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();
        _ownedTokens[to].push(tokenId);
        _ownedTokenIndexs[tokenId] = _ownedTokens[to].length.sub(1);
        emit Transfer(address(0), to, tokenId);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    
    function airDropMint(address user, uint256 requestedCount) external onlyMinter {
        require(requestedCount > 0, "zero request");
        for (uint256 i = 0; i < requestedCount; i++) {
            _mint(user, _mintIndexForSale);
            _mintIndexForSale = _mintIndexForSale.add(1);
        }
    }

    function withdraw() external onlyMinter {
        // payable(0x7bfBAEeBED250747f2954656dC5c092Cc3605A7E).transfer(payable(address(this)).balance * 5 / 100);
        payable(msg.sender).transfer(payable(address(this)).balance);
    }

    function getTokenIds(address owner) external view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function publicMint(uint256 requestedCount) external payable {
        address sender = msg.sender;
        require(_lastCallBlockNumber[sender].add(_antibotInterval) < block.number, "Bot is not allowed");
        require(block.number >= _mintStartBlockNumber, "Not yet started");
        require(requestedCount > 0 && requestedCount <= _mintLimitPerBlock, "Too many requests or zero request");
        require(msg.value == _mintPrice.mul(requestedCount), "Not enough Klay");
    
        for (uint256 i = 0; i < requestedCount; i++) {
            _mint(sender, _mintIndexForSale);
            _mintIndexForSale = _mintIndexForSale.add(1);
        }

        _lastCallBlockNumber[sender] = block.number;
    }

    function getSender() external view returns (address) {
        return msg.sender;
    }
}
