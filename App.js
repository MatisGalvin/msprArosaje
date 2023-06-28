import { Provider } from "react-redux";
import GlobalAppNavigation from "./src/navigations/GlobalAppNavigation/GlobalAppNavigation";
import store from "./src/redux/appStore";
import { StatusBar } from "react-native";

export default function App() {
    return <Provider store={store}>
        <GlobalAppNavigation />
        <StatusBar style="auto" />
    </Provider>;
}