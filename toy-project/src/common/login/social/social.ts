import { AnyObjectType, HTTP_METHODS } from "../../type";
import { LoginType } from "../model";

abstract class SocialLogin {
    private type: LoginType;

    constructor(type: LoginType) {
        this.type = type;
    }

    login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._login()
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch(reject);
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._logout()
            .then((result) => {
                console.log(result);
                resolve(result);
            })
            .catch(reject);
        });
    }

    public static init(type: LoginType): SocialLogin {
        let instance: SocialLogin;
        switch(type) {
            case LoginType.FACE_BOOK:
                if (window.FB === undefined) {
                    throw new Error("facebook sdk not found!!!");
                }

                instance = new FaceBookLogin(type, window.FB);
                break;
            default:
                throw new Error(`${type} social login not supported`);
        }

        instance._init();
        return instance;
    }

    protected abstract _init(): any;
    protected abstract _login(): Promise<any>;
    protected abstract _logout(): Promise<any>;
}


enum FaceBookGraphApiVersion {
    V2_7 = "v2.7",
    V2_6 = "v2.6",
    V2_5 = "v2.5",
    V2_4 = "v2.4",
    V2_3 = "v2.3"
};

type FaceBookInitParams = {
    appId: string,
    version: FaceBookGraphApiVersion,
    cookie?: boolean,
    localStorage?: boolean,
    status?: boolean,
    xfbml?: boolean,
    frictionlessRequests?: boolean,
    hideFlashCallback?: () => void
};

enum FaceBookLoginStatus {
    CONNECTED = "connected",
    NOT_AUTHORIZED = "not_authorized",
    UNKNOWN = "unknown"
};

type FaceBookLoginInfo = {
    accessToken: string,
    expiresIn: number,
    data_access_expiration_time: number,
    signedRequest: string,
    userID: string,
    graphDomain: string
};

type FaceBookLoginStatusInfoType = {
    status: FaceBookLoginStatus,
    authResponse: FaceBookLoginInfo
};

enum FaceBookLoginAuthType {
    RE_REQUEST = "rerequest",
    RE_AUTHENTICATE = "reauthenticate",
    RE_AUTHORIZE = "reauthorize"
};

type FaceBookLoginOptions = {
    auth_type?: FaceBookLoginAuthType,
    scope: string,
    return_scopes: boolean,
    enable_profile_selector?: boolean,
    profile_selector_ids?: string
};

type apiVarargsType = string | HTTP_METHODS | AnyObjectType;

type FaceBookSDK = {
    init: (params: FaceBookInitParams) => void,
    getLoginStatus: (callback: (response: FaceBookLoginStatusInfoType) => void, cacheFlag: boolean) => void
    login: (callback: (response: FaceBookLoginStatusInfoType) => void, opts?: FaceBookLoginOptions) => void
    api: (...args: any[]) => void
};


declare global {
    interface Window {
        FB: FaceBookSDK
    }
}

class FaceBookLogin extends SocialLogin {
    private readonly sdk: FaceBookSDK;

    constructor(type: LoginType, sdk: FaceBookSDK) {
        super(type);
        this.sdk = sdk;
    }

    protected _init(): Promise<SocialLogin> {
        this.sdk.init({
            appId: "247663311348868",
            version: FaceBookGraphApiVersion.V2_7,
            cookie: true,
            xfbml: true
        });

        return new Promise((resolve, reject) => {
            this.loginCheck()
            .then((checkResult) => {
                console.log(checkResult);
                resolve(this);
            }).catch(reject);
        });
    }

    protected _login(): Promise<any> {
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

    protected _logout(): Promise<any> {
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
export default SocialLogin;