import { FC, ReactNode } from "react";

const TodoWrap:FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="wrap">
            {
                children
            }
        </div>
    )
};

export default TodoWrap;