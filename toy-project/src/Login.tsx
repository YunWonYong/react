import { Outlet, useLocation } from "react-router-dom";
import LoginProvider, { LoginBtnBox } from "./common/login/Provider";

const Login = () => {
    const location = useLocation();
    const { pathname } = location;
    return (
        <LoginProvider>
            {
                pathname !== "/login/naver"
                    ?   <LoginBtnBox />
                    :   <Outlet />
            }
        </LoginProvider>
    );
};

export default Login;