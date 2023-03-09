import { createContext, useState, FC, ReactNode } from "react";
import User, { UserType } from "../ts/User";

type UserContextType = {
    info: UserType,
    logout: () => void
};

const userInstance = new User();
const default_user = userInstance.get();

const UseContext = createContext<UserContextType>({
    info: default_user,
    logout: () => console.log("init")
});

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>(default_user);

    const logout = () => {

    };

    return (
        <UseContext.Provider value={ { info: user, logout } }>
            {
                children
            }
        </UseContext.Provider>
    );
};


export default UseContext;
export {
    UserContextProvider
};