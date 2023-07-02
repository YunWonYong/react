import { useEffect } from "react";

declare global {
    interface Window {
        naver_id_login: any
    }
}

const NaverLoginBtn = () => {
    useEffect(() => {
        const naver = new window.naver_id_login("hLo_8qQSqjVgHuHuPduN", "http://localhost:3000/login/naver");
        var state = naver.getUniqState();
        naver.setButton("white", 2,40);
        naver.setDomain("http://localhost:3000");
        naver.setState(state);
        naver.init_naver_id_login();
    }, []);

    return (
        <div id="naver_id_login">

        </div>
    );
};

export default NaverLoginBtn;