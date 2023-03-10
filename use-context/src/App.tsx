import { GlobalDimmed, DimmedContextProvider } from "./context/DimmedContext";
import { UserContextProvider } from "./context/UserContext";
import Container from "./component/Container";

const App = () => {
    return (
        <DimmedContextProvider>
            <GlobalDimmed />
            <UserContextProvider>
                <Container />
            </UserContextProvider>
        </DimmedContextProvider>
    );
};

export default App;
