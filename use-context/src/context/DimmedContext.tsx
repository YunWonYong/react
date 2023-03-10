import { createContext, FC, ReactNode, useContext, useReducer } from "react";

import css from "../css/dimmed.module.css";

enum DimmedState {
    GLOBAL = "global",
    ASIDE = "aside",
    CONTAINER = "container",
    LOCAL = "local",
    GLOBAL_LOADING = "globalLoading",
    ASIDE_LOADING = "asideLoading",
    CONTAINER_LOADING = "containerLoading",
    LOCAL_LOADING = "localLoading"
};

type DimmedContextType = {
    open: (state: DimmedState) => void,
    close: (state: DimmedState) => void,
    state: DimmedStateType
};

const default_state = { className: DimmedState.GLOBAL, flag: false };

const DimmedContext = createContext<DimmedContextType>({
    open: () => console.log("init"),
    close: () => console.log("close"),
    state: default_state
});


type DimmedStateType = {
    className: string,
    flag: boolean
};

type DimmedStateReducerType = {
    type: DimmedState,
    flag: boolean
};

const reducer = (state: DimmedStateType, { type, flag }: DimmedStateReducerType) => {
    console.log("dimmed reducer fn");
    switch(type) {
        case DimmedState.GLOBAL:
            return { className: "global", flag };
        default:
            throw new Error(`not supported action type = ${type}`);
    }

};

const DimmedContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, default_state);

    const open = (state: DimmedState) => {
        if (window.document.body) {
            window.document.body.style.overflow = "hidden"
        }

        console.log("dimmed open fn");
        dispatch({ 
            type: state, 
            flag: true 
        });
    };

    const close = (state: DimmedState) => {
        if (window.document.body) {
            window.document.body.style.overflow = "auto"
        }
        dispatch({ 
            type: state, 
            flag: false 
        });
    };

    return (
        <DimmedContext.Provider value={{ open, close, state }}>
            {
                children
            }
        </DimmedContext.Provider>
    );
};

const Dimmed = () => {
    const { state } = useContext(DimmedContext);
    console.log(state);
    return (
        <>
            {
                state.flag &&
                    <div className={ `${css.dimmed} ${css[state.className]}` }></div>
            }
        </>
    );
};

const GlobalDimmed = () => {
    const { state } = useContext(DimmedContext);
    console.log(state);
    return (
        <>
            {
                state.flag &&
                    <div className={ `${css.dimmed} ${css[state.className]}` }></div>
            }
        </>
    );
};
export default DimmedContext; 

export { Dimmed, GlobalDimmed, DimmedContextProvider, DimmedState }