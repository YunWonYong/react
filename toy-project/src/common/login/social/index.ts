import { LoginType } from "..";
import { FaceBookLogin } from "./faceBook";
import { LoginInterface, SocialLoginAdapterInterface } from "../type";

export abstract class AbstSocialLoginAdapter implements LoginInterface {
    constructor(private readonly instance: SocialLoginAdapterInterface) {}
    
    public static getInstance(type: LoginType): AbstSocialLoginAdapter {
        try {
            let instance: SocialLoginAdapterInterface | null = null;
            switch(type) {
                case LoginType.FACE_BOOK:
                    if (window.FB === undefined) {
                        throw new Error("facebook sdk not found!!!");
                    }
                    instance = new FaceBookLogin(window.FB);
                    break;
                default:
                    throw new Error(`not supported social login type: ${type}`);
            }
            
            if (instance === null) {
                throw new Error(`SocicalLoginAdapter ${type} instance initialized fail!!!`);
            }
            instance._init();
            return new SocialLoginAdapter(instance);
        } catch(e) {
            throw e;
        }
    }

    login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance
            ._login()
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch(reject);
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance
            ._logout()
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch(reject);
        });
    }
}

class SocialLoginAdapter extends AbstSocialLoginAdapter {
    constructor(instance: SocialLoginAdapterInterface) {
        super(instance);
    } 
}

export default AbstSocialLoginAdapter;