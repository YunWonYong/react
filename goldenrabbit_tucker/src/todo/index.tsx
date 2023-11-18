import { FC, useContext, useState, useEffect, useCallback, useRef, KeyboardEvent } from "react";
import { v4 as uuidV4 } from "uuid";
import TodoWrap from "./Wrap";
import "./index.css";
import ServerContext, { HttpMethods, ServerCallParamType } from "../server/ServerContext";

type TodoListType = {
    info?: Record<string, string>,
    keys?: string[],
    values?: string[]
};

type TodoType = {
    id: string,
    content: string,
    check: boolean,
};

const TodoList = () => {
    const [writer, setWriter] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [list, setList] = useState<TodoListType>({
        
    });
    const server = useContext(ServerContext);
    
    useEffect(() => {
        const storage = window.localStorage;
        let writer = storage.getItem("writer");
        if (writer === null) {
            writer = uuidV4();
        }
        storage.setItem("writer", writer);
        setWriter(writer);
    }, []);

    useEffect(() => {
        if (writer === null) {
            return;
        }
        const getList = async () => {
            const parmas: ServerCallParamType = {
                method: HttpMethods.GET,
                path: `todos/${writer}`
            };
            const data = await server.api<TodoListType>(parmas);
            setList(data);
        }

        getList();
    }, [writer, server, refresh]);

    const insert = useCallback(async (content: string) => {
        try {
            const parmas: ServerCallParamType = {
                method: HttpMethods.POST,
                path: `todos`,
                body: {
                    writer,
                    content
                }
            };
            const data = await server.api<string>(parmas);
            if (data === "ok") {
                setRefresh((refresh) => !refresh);
            }
        } catch(e) {
            console.error(e);
        }
    }, [writer, server]);

    const check = useCallback(async (id: string) => {
        try {
            const parmas: ServerCallParamType = {
                method: HttpMethods.PATCH,
                path: `todos/${writer}/${id}`
            };
            const data = await server.api<string>(parmas);
            if (data === "ok") {
                setRefresh((refresh) => !refresh);
            }
        } catch(e) {
            throw e;
        }
    }, [writer, server]);

    const remove = useCallback(async (id: string) => {
        try {
            
            const parmas: ServerCallParamType = {
                method: HttpMethods.DELETE,
                path: `todos/${writer}/${id}`
            };
            const data = await server.api<string>(parmas);
            if (data === "ok") {
                setRefresh((refresh) => !refresh);
            }
        } catch(e) {
            throw e;
        }
    }, [writer, server]);

    return (
        <TodoWrap>
             <section className="todo_list">
                <TodoInput 
                    insertFn={ insert }
                />
                {
                    list.values &&
                        list.values.map((str: string) => {
                        const todo = JSON.parse(str) as TodoType
                        return (
                            <TodoCard 
                                key={todo.id}
                                info={todo}
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

const TodoInput: FC<{insertFn: (content: string) => Promise<void> }> = ({ insertFn }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const insert = async () => {
        const { current } = inputRef;
        if (current === null) {
            throw new Error("current not found!!!.");
        }
        const { value } = current;
        await insertFn(value);
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

const TodoCard: FC<{info: TodoType, checkFn:(id: string) => Promise<void>, removeFn: (id: string) => Promise<void> }> = ({ info, checkFn, removeFn }) => {
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