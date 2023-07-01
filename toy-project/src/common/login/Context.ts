import { createContext } from "react";
import { LoginType } from "./model";

const defaultPromiseFn = (): Promise<any> => {
    return new Promise((resolve) => {
        resolve("login Context initialized");
    });
}

type LoginContextType = {
    login: (type: LoginType) => Promise<any>,
    logout: () => Promise<any>,
};

const LoginContext = createContext<LoginContextType>({
    login: defaultPromiseFn,
    logout: defaultPromiseFn,
});

export default LoginContext;