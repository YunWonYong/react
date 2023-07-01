import { FC, useState } from "react";
import { ChildrenType } from "../type";
import LoginContext from "./Context";
import { LoginManager, LoginType } from ".";
import { LoginInfoType } from "./type";

const Provider: FC<ChildrenType> = ({ children }) => {
    const [loginInfo, setLoginInfo] = useState<LoginInfoType>({
        instance: null,
        info: {
            
        }
    });
    const login = async (type: LoginType) => {
        try {
            const instance = LoginManager.getInstance(type);
            const result = await instance.login();
            setLoginInfo(() => {
                return {
                    instance,
                    info: result
                };
            });
        } catch(e) {
            throw e;
        }
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