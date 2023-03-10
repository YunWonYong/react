import { Dimmed, DimmedContextProvider } from "./context/DimmedContext";
import { LoginBtn, UserContextProvider } from "./context/UserContext";

const App = () => {
    return (
        <DimmedContextProvider>
            <Dimmed />
            <UserContextProvider>
                <LoginBtn />
                asdasd
            </UserContextProvider>
        </DimmedContextProvider>
    );
}

export default App;
