import SocialLogin from "./social/social";

export interface LoginInterface {
    login(): Promise<any>;
    logout(): Promise<any>;
};


enum LoginType {
    NAVER = "naver",
    GOOGLE = "google",
    FACE_BOOK = "facebook",
    TOY = "toy"
};

abstract class LoginFactory {

    public static getInstance(type: LoginType): LoginInterface {
        let loginProvider: LoginInterface = new ToyLoginProvider();
        switch(type) {
            case LoginType.FACE_BOOK:
                loginProvider = SocialLogin.init(type);
                break;
            case LoginType.NAVER:
                //loginProvider = new NaverLoginProvider();
                // break;
            case LoginType.GOOGLE:
                // break;
            case LoginType.TOY:
                break;
            default:
                throw new Error(`${type} not supported LoginType`);
        }
        
        return loginProvider;
    }
};

class ToyLoginProvider implements LoginInterface {
    login(): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    };

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    };
}

export {
    LoginType,
    LoginFactory
}

export default LoginInterface;