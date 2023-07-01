import { ReactNode } from "react";

export type ChildrenType = {
    children: ReactNode
};

enum HTTP_METHODS {
    GET = "get",
    POST = "post",
    DELETE = "delete"
};

export type AnyObjectType = {
    [key in string]: any
};

export type ParamObjectType<T> = {
    [key in string]: T
};

export type ParamObjectListType<T> = {
    [key in string]: T[]
};

export {
    HTTP_METHODS
};