import { AnyObjectType, HTTP_METHODS } from "../../../type";

export enum FaceBookGraphApiVersion {
    V2_7 = "v2.7",
    V2_6 = "v2.6",
    V2_5 = "v2.5",
    V2_4 = "v2.4",
    V2_3 = "v2.3"
};

export type FaceBookInitParams = {
    appId: string,
    version: FaceBookGraphApiVersion,
    cookie?: boolean,
    localStorage?: boolean,
    status?: boolean,
    xfbml?: boolean,
    frictionlessRequests?: boolean,
    hideFlashCallback?: () => void
};

export enum FaceBookLoginStatus {
    CONNECTED = "connected",
    NOT_AUTHORIZED = "not_authorized",
    UNKNOWN = "unknown"
};

export type FaceBookLoginInfo = {
    accessToken: string,
    expiresIn: number,
    data_access_expiration_time: number,
    signedRequest: string,
    userID: string,
    graphDomain: string
};

export type FaceBookLoginStatusInfoType = {
    status: FaceBookLoginStatus,
    authResponse: FaceBookLoginInfo
};

export enum FaceBookLoginAuthType {
    RE_REQUEST = "rerequest",
    RE_AUTHENTICATE = "reauthenticate",
    RE_AUTHORIZE = "reauthorize"
};

export type FaceBookLoginOptions = {
    auth_type?: FaceBookLoginAuthType,
    scope: string,
    return_scopes: boolean,
    enable_profile_selector?: boolean,
    profile_selector_ids?: string
};

export type apiVarargsType = string | HTTP_METHODS | AnyObjectType;

export type FaceBookSDK = {
    init: (params: FaceBookInitParams) => void,
    getLoginStatus: (callback: (response: FaceBookLoginStatusInfoType) => void, cacheFlag: boolean) => void
    login: (callback: (response: FaceBookLoginStatusInfoType) => void, opts?: FaceBookLoginOptions) => void
    api: (...args: any[]) => void
};