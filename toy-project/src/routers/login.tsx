import { RouteObject } from "react-router-dom";

import Login from "../Login";
import Naver from "../common/login/social/naver/Callback";

const loginRouteChildren: RouteObject[] = [
    {
        path: "naver",
        element: <Naver />
    }
];

const loginRoute: RouteObject = {
	path: "/login",
    element: <Login />,
    children: loginRouteChildren
};

export default loginRoute;