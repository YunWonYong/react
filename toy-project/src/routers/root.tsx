import { RouteObject } from "react-router-dom";

import Root from "../Root";

const rootChildren: RouteObject[] = [

];

const rootRoute: RouteObject = {
	path: "/",
    element: <Root />,
    children: rootChildren
};

export default rootRoute;