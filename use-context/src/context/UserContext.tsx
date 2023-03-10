import { createContext, useState, FC, ReactNode, useEffect, useContext } from "react";
import User, { UserGrant, UserGrantType, UserMenuGrant, UserState, UserType } from "../ts/User";
import DimmedContext, { DimmedState } from "./DimmedContext";

type UserContextType = {
    info: UserType,
    logout: () => void,
    login: () => void,
};

const userInstance = new User();
const default_user = userInstance.get();

const UserContext = createContext<UserContextType>({
    info: default_user,
    logout: () => console.log("init"),
    login: () => console.log("init")
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>(default_user);
    const { open, close } = useContext(DimmedContext);
    console.log(user);
    useEffect(() => {
        if (user.state !== UserState.INIT) {
            return;
        }
        const getData = () => {
            open(DimmedState.GLOBAL);
            const tick = setTimeout(() => { 
                try {
                    clearTimeout(tick);

                    if (Math.floor(Math.random() * 2) + 1 === 2) {
                        setUser((user) => {
                            return {
                                ...user,
                                state: UserState.NONE
                            };
                        });
                        return;
                    }
                    const grant: UserGrantType = {};
                    
                    grant[UserGrant.SLOTS] = UserMenuGrant.DEV;
                    grant[UserGrant.BACCARA] = UserMenuGrant.VIEWER;
                    grant[UserGrant.ADMIN] = UserMenuGrant.ADMIN;
                    setUser((user: UserType) => {
                        return {
                            ...user,
                            email: "test@g.c",
                            name: "tester",
                            grant,
                            state: UserState.LOGIN
                        };
                    });
                } catch(e) {
                    throw e;
                } finally {
                    close(DimmedState.GLOBAL); 
                }

            }, 5000);
        }
        getData();
        // eslint-disable-next-line
    }, []);

    const logout = () => {
        if (user.state !== UserState.LOGIN) {
            return;
        }
        setUser({ ...default_user, state: UserState.NONE });
    };

    const login = () => {
        open(DimmedState.GLOBAL);
        const tick = setTimeout(() => { 
            try {
                clearTimeout(tick);
                const grant: UserGrantType = {};
                
                grant[UserGrant.SLOTS] = UserMenuGrant.DEV;
                grant[UserGrant.BACCARA] = UserMenuGrant.VIEWER;
                grant[UserGrant.ADMIN] = UserMenuGrant.ADMIN;
                setUser((user: UserType) => {
                    return {
                        ...user,
                        email: "test@g.c",
                        name: "tester",
                        grant,
                        state: UserState.LOGIN
                    };
                });
            } catch(e) {
                throw e;
            } finally {
                close(DimmedState.GLOBAL);
            }
        });
    };

    return (
        <UserContext.Provider value={ { info: user, logout, login } }>
            {
                children
            }
        </UserContext.Provider>
    );
};

export default UserContext;
export {
    UserContextProvider
};