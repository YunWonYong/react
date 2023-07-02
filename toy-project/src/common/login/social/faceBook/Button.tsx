import { useContext } from "react";
import LoginContext from "../../Context";
import { LoginType } from "../../type";

const FaceBookLoginBtn = () => {
    
    const context = useContext(LoginContext);

    const faceBookLogin = () => context.login(LoginType.FACE_BOOK);
    return (
        <div>
            <button
                onClick={ faceBookLogin }
            >
                facebook login
            </button>
        </div>
    );
};

export default FaceBookLoginBtn;