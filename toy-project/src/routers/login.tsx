import { RouteObject } from "react-router-dom";

import Login from "../Login";

const loginRoute: RouteObject = {
	path: "/login",
    element: <Login />
};

export default loginRoute;