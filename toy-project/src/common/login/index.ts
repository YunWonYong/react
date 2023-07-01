import SocialLoginAdapter from "./social";
import { LoginInterface, LoginType } from "./type";

abstract class LoginManager {

    public static getInstance(type: LoginType): LoginInterface {
        let loginProvider: LoginInterface | null = null;
        switch(type) {
            case LoginType.FACE_BOOK:
            case LoginType.NAVER:
            case LoginType.GOOGLE:
                loginProvider = SocialLoginAdapter.getInstance(type);
                break;
            case LoginType.TOY:
                break;
        }

        if (loginProvider === null) {
            throw new Error();
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
    LoginManager
};