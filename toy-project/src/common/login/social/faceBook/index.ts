import { AnyObjectType, HTTP_METHODS } from "../../../type";
import { SocialLoginAdapterInterface } from "../../type";
import { FaceBookGraphApiVersion, FaceBookLoginStatus, FaceBookSDK, apiVarargsType } from "./type";

declare global {
    interface Window {
        FB: FaceBookSDK
    }
}

class FaceBookLogin implements SocialLoginAdapterInterface {

    constructor(private readonly sdk: FaceBookSDK) {}

    public _init(): SocialLoginAdapterInterface {
        this.sdk.init({
            appId: "247663311348868",
            version: FaceBookGraphApiVersion.V2_7,
            cookie: true,
            xfbml: true
        });

        return this;
        // return new Promise((resolve, reject) => {
        //     this.loginCheck()
        //     .then((checkResult) => {
        //         console.log(checkResult);
        //         resolve(this);
        //     }).catch(reject);
        // });
    }

    public _login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sdk
            .login((response) => {
                console.log(response);
                const { authResponse, status } = response;
                if (status !== FaceBookLoginStatus.CONNECTED) {
                    reject(`face book login state: ${status}`);
                }

                const { userID } = authResponse;
                this.api((user) => {
                    const { id, name } = user;
                    resolve({ authResponse, id, name });
                }, `/${userID}`, HTTP_METHODS.GET);
            })
        });
    }

    public _logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve("facebook logout hello")
        });
    }

    private loginCheck() {
        return new Promise((resolve, reject) => {
            try {
                this.sdk.getLoginStatus((response) => {
                    if (response.status === FaceBookLoginStatus.CONNECTED) {
                        this._login().then(resolve).catch(reject);
                        return;
                    }
                    resolve(response);
                }, true);
            } catch(e) {
                reject(e);
            }
        });
    }
    
    private api(callback: (...args: any) => void, ...args: apiVarargsType[]): void {
        this.sdk.api(...args, callback);
    }
}

export {
    FaceBookLogin
};