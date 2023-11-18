import { FC, ReactNode, useState } from "react";
import ServerContext, { HttpMethods, ServerCallParamType } from "./ServerContext";
import axios, { AxiosResponse } from "axios";

const ServerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [url, setUrl] = useState<string>("http://localhost:3250");
    const api = async <T,> (params: ServerCallParamType) => {
        let { method, path, body = {}, header = {} } = params;
        path = `${url}/${path}`;
        let job: Promise<AxiosResponse> | null = null;
        switch (method) {
            case HttpMethods.GET:
                job = axios.get(path, header);
            break;
            case HttpMethods.POST:
                job = axios.post(path, body, header);
            break;
            case HttpMethods.PUT:
                job = axios.put(path, body, header);
            break;
            case HttpMethods.PATCH:
                job = axios.patch(path, body, header);
            break;
            case HttpMethods.DELETE:
                job = axios.delete(path, header);
            break;
            default:
                throw new Error("not supported method type");
        }
        try {
            const { data } = await job;
            return data as T;
        } catch(e) {
            throw e;
        }
    }

    return (
        <ServerContext.Provider value={{ api }}>
            {
                children
            }
        </ServerContext.Provider>
    );
};

export default ServerProvider;