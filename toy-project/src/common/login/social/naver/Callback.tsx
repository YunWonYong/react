import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContextType, LoginType } from "../../type";
import LoginContext from "../../Context";

const Naver = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext<LoginContextType>(LoginContext);
    useEffect(() => {
        console.log("Naver Component", location);
        const login = async () => {
            let redirectUrl = "/login";
            try {
                const { hash } = location;
                const loginResult = await context.login(LoginType.NAVER, { query: hash });
                console.log(loginResult);
                redirectUrl = "/";
            } catch(e) {
                alert("네이버 로그인 실패 했습니다.");
            } finally {
                navigate(redirectUrl);
            }
        };
        login();
    }, []);
    return (
        <>
            naver login try
        </>
    );
};

export default Naver;