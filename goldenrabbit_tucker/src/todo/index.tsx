import { FC, useState, useEffect, useCallback, useRef, KeyboardEvent } from "react";
import TodoWrap from "./Wrap";
import axios, { AxiosResponse } from "axios";
import "./index.css";

type TodoCardType = {
    id: string,
    content: string,
    check: boolean,
};

const TodoList = () => {
    const [list, setList] = useState<TodoCardType[]>([]);

    useEffect(() => {
        const getData = async() => {
            const response: AxiosResponse<TodoCardType[], any> = await axios.get("http://localhost:3250/todo");
            const { data } = response;
            setList(data);
        };

        getData();
    }, []);

    const insert = useCallback(async (content: string) => {
        try {
            const { data } = await axios.post(`http://localhost:3250/todo`, {
                content
            });
            if (data) {
                setList((todoList) => {
                    return [...todoList, data];
                });
            }
            return data;
        } catch(e) {
            console.error(e);
            return null;
        }
    }, [setList]);

    const check = useCallback(async (id: string) => {
        try {
            const { data } = await axios.put(`http://localhost:3250/todo/${id}`);
            if (data === "ok") {
                setList((todoList) => {
                    return todoList.map((todoCard) => {
                        if (todoCard.id === id) {
                            todoCard.check = !todoCard.check;
                        }
                        return todoCard;
                    });
                });
            }
            return data;
        } catch(e) {
            throw e;
        }
    }, [setList]);

    const remove = useCallback(async (id: string) => {
        try {
            const { data } = await axios.delete(`http://localhost:3250/todo/${id}`);
            if (data === "ok") {
                setList((todoList) => {
                    return todoList.filter((todoCard) => {
                        return todoCard.id !== id;
                    });
                });
            }
            return data;
        } catch(e) {
            throw e;
        }
    }, [setList]);

    return (
        <TodoWrap>
             <section className="todo_list">
                <TodoInput 
                    insertFn={ insert }
                />
                {
                    list.map((todoCard: TodoCardType) => {
                        return (
                            <TodoCard 
                                key={todoCard.id}
                                info={todoCard}
                                checkFn={ check }
                                removeFn={ remove }
                            />
                        )
                    })
                }
            </section>
        </TodoWrap>
    );
};

const TodoInput: FC<{insertFn: (content: string) => Promise<TodoCardType | null> }> = ({ insertFn }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const insert = async () => {
        const { current } = inputRef;
        if (current === null) {
            throw new Error("current not found!!!.");
        }
        const { value } = current;
        const result = await insertFn(value);
        if (result === null) {
            return;
        }
        current.value = "";
    };
    return (
        <>
            <h1>
                Awesome Todo List
            </h1>
            <div className="todo_input_box">
                <input 
                    className="todo_input"
                    type="text" 
                    placeholder="What do you need to do today?" 
                    ref={ inputRef }
                    onKeyDown={ (e: KeyboardEvent<HTMLInputElement> | undefined) => {
                        if (e?.code?.toLocaleLowerCase() === "enter") {
                            insert();
                        }
                    }}
                />
                <div
                    className="todo_add_btn"
                    onClick={ insert }
                >
                    Add
                </div>
            </div>
        </>
    );
}

const TodoCard: FC<{info: TodoCardType, checkFn:(id: string) => Promise<string>, removeFn: (id: string) => Promise<string> }> = ({ info, checkFn, removeFn }) => {
    return (
        <article className={`todo_card ${info.check? "check": ""}`}>
            <div
                className={`check_box`}
                onClick={ () => checkFn(info.id) }
            ></div>
            <div className="todo_content">
                {
                    info.content
                }
            </div>
            <div
                className="delete_btn"
                onClick={ ()=> removeFn(info.id) }
            >
                X
            </div>
        </article>
    )
}

export default TodoList;