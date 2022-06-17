import React, { useState } from "react";

import TEST from "../contracts/Test.json";
import Web3 from "web3";

import "./mint.css";

const metamaskSync = async (setSelectedAccount, setSectionClassName) => {
    const {ethereum} = window;
    if (!ethereum) {
        throw new Error("metamask not found");
    }
    
    setSectionClassName("d");
    let result = null;
    try {
        result = await ethereum.enable();
        setSelectedAccount((result[0] || ethereum.selectedAddress));
    } catch(e) {
        throw e;
    } finally {
        setSectionClassName(() => "");
    }
    return [new Web3(ethereum), result[0]];
};

const Mint = () => {
    const [web3, setWeb3] = useState({});
    const [selectedAccount, setSelectedAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [sectionClassName, setSectionClassName] = useState("");
    const mintFn = async () => {
        let web = web3;
        let account = selectedAccount;
        if (!web3.address) {
           [web, account] = await metamaskSync(setSelectedAccount, setSectionClassName);
           setWeb3(web);
        }

        let contractInstance = contract;

        if (contract === null) {
            const networkId = await web.eth.net.getId();
            const networkData = TEST.networks[networkId];
            if (!(networkData && networkData.address)) {
              throw new Error(`contract instance fail: {networkId: ${networkId}, networkData: ${networkData}}`);
            }
            contractInstance = new web.eth.Contract(TEST.abi, networkData.address);
            setContract(contractInstance);
        }

        const { publicMint } = contractInstance.methods;

        const transactionId = publicMint(10);
        console.log(web.eth);
        console.log(transactionId);
        transactionId.send({from: account, value: 1000000000000000 * 10}).then(transaction => {
            console.log("transaction: ", transaction);
        });
    };

    return (
        <section className={sectionClassName}>
            <article>
                <button onClick={mintFn}>Mint</button>
            </article>
        </section>
    );
};

export default Mint;