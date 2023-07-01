import { useContext } from "react"; 
import LoginContext from "../../common/login/Context";
import { LoginType } from "../../common/login";

const LoginSelect = () => {
    const context = useContext(LoginContext);

    const faceBookLogin = (type: LoginType) => context.login(type);
    return (
        <article >
            login select
            <button onClick={ () => faceBookLogin(LoginType.FACE_BOOK) }>
                facebook login
            </button>
        </article>
    );
};

export default LoginSelect;