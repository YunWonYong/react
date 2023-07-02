import { AnyObjectType } from "../type";

export interface LoginInterface {
    login(body?: AnyObjectType): Promise<any>;
    logout(): Promise<any>;
};

export interface SocialLoginAdapterInterface {
    _login(body?: AnyObjectType): Promise<any>;
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
    login: (type: LoginType, body?: AnyObjectType) => Promise<any>,
    logout: () => Promise<any>,
};

export type LoginInfoType = {
    instance: null | LoginInterface,
    info: {
        [key in string]: any
    }
};