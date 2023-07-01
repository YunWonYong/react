export interface LoginInterface {
    login(): Promise<any>;
    logout(): Promise<any>;
};

export interface SocialLoginAdapterInterface {
    _login(): Promise<any>;
    _logout(): Promise<any>;
    _init(): any;
};

export enum LoginType {
    NAVER = "naver",
    GOOGLE = "google",
    FACE_BOOK = "facebook",
    TOY = "toy"
};

export type LoginContextType = {
    login: (type: LoginType) => Promise<any>,
    logout: () => Promise<any>,
};

export type LoginInfoType = {
    instance: null | LoginInterface,
    info: {
        [key in string]: any
    }
};