import { FC, useState } from "react";
import { ChildrenType } from "../type";
import LoginContext from "./Context";
import LoginInterface, { LoginFactory, LoginType } from "./model";


type LoginInfoType = {
    instance: null | LoginInterface,
    info: {
        [key in string]: any
    }
};

const Provider: FC<ChildrenType> = ({ children }) => {
    const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
        instance: null,
        info: {
            
        }
    });
    const login = (type: LoginType): Promise<any> => {
        return new Promise((resolve, reject) => {
            try {
                debugger;
                const instance = LoginFactory.getInstance(type);
                instance
                .login()
                .then((result) => {
                    setLoginInfo({
                        instance,
                        info: {
                            "asdaosdnaod": result
                        }
                    });
                    resolve(result);
                })
                .catch(reject);
            } catch(e) {
                reject(e);
            }
        });
    };

    const logout = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            const { instance } = loginInfo;
            if (instance === null) {
                reject("logout instance not found");
                return;
            }

            instance
            .logout()
            .then(resolve)
            .catch(reject);
        });
    };
    return (
        <LoginContext.Provider value={{ login, logout }}>
            {
                children
            }
        </LoginContext.Provider>
    );
};

const LoginProvider: FC<ChildrenType> = ({ children }) => {
    return (
        <Provider>
            {
                children
            }
        </Provider>
    );
};

export default LoginProvider;