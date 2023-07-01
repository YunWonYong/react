import { createContext } from "react";
import { LoginContextType } from "./type";

const defaultPromiseFn = (): Promise<any> => {
    return new Promise((resolve) => {
        resolve("login Context initialized");
    });
}

const LoginContext = createContext<LoginContextType>({
    login: defaultPromiseFn,
    logout: defaultPromiseFn,
});

export default LoginContext;