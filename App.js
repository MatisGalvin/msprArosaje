import { Provider } from "react-redux";
import GlobalAppNavigation from "./src/navigations/GlobalAppNavigation/GlobalAppNavigation";
import store from "./src/redux/appStore";
import { StatusBar } from "react-native";
import MatomoTracker, { MatomoProvider } from 'matomo-tracker-react-native';

export default function App() {

    const instance = new MatomoTracker({
        urlBase: 'https://matomo.arosaje.com/', // required
        siteId: 2, // required, number matching your Matomo project
    });

    return <MatomoProvider instance={instance}>
        <Provider store={store}>
            <GlobalAppNavigation />
            <StatusBar style="auto" />
        </Provider>
    </MatomoProvider>;
}