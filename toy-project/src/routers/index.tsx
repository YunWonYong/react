import { createBrowserRouter } from "react-router-dom";
import rootRoute from "./root";
import loginRoute from "./login";

const router = createBrowserRouter([
    rootRoute,
    loginRoute
]);

export {
    router
};