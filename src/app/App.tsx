import { AppRouter } from "./router";
import { AppProvider } from "./provider";
function App() {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
}

export default App;
