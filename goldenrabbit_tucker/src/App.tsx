import ServerProvider from "./server/ServerProvider";
import TodoList from "./todo";

const App = () => {
    return (
        <ServerProvider>
            <TodoList />
        </ServerProvider>
    );
}

export default App;
