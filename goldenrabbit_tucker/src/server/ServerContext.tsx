import { createContext } from "react";

export enum HttpMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete"
}

export type ServerCallParamType = {
    method: HttpMethods,
    path: string,
    body?: Record<string, any>,
    header?: Record<string, any>
}

type ServerContextType = {
    api<T>(params: ServerCallParamType): Promise<T>;
}

const ServerContext = createContext<ServerContextType>({
    api: <T,>(params: ServerCallParamType): Promise<T> => {
        console.log(params);
        return new Promise((_, reject) => reject(params));
    }
});

export default ServerContext;