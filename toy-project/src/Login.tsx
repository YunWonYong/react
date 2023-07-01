import LoginProvider from "./common/login/Provider";
import LoginSelect from "./components/login/LoginSelect";

const Login = () => {
    return (
        <LoginProvider>
            <LoginSelect />
        </LoginProvider>
    );
};

export default Login;