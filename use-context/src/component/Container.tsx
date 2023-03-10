import { useContext } from "react";

import UserContext from "../context/UserContext";
import { UserState } from "../ts/User";


const Container = () => {
    const { info, login, logout } = useContext(UserContext);
    switch(info.state) {
        case UserState.LOGIN:
            return (
                <div>
                    <div>
                        <button
                            onClick={ logout }
                        >
                            logout
                        </button>
                    </div>
                    <div>
                        email: 
                        {
                            info.email
                        }
                    </div>
                    <div>
                        name: 
                        {
                            info.name
                        }
                    </div>
                        {
                            Object.keys(info.grant).map(key => {
                                return (
                                    <div key={ `${key}` }>
                                        <span
                                            style={{
                                                paddingRight: "10px"
                                            }}    
                                        >
                                            {
                                                `${key}:`
                                            }
                                        </span>
                                        <span>
                                            {
                                                info.grant[key]
                                            },
                                        </span>
                                    </div>

                                );
                            })
                        }
                </div>
            );
        case UserState.NONE:
            return (
                <button onClick={ login }>
                    login
                </button>
            );
        case UserState.INIT:
            return <></>
        default:
            throw new Error(`container not supported state = ${info.state}`);
    }
};


export default Container;