import { SafeAreaView } from 'react-native-safe-area-context';

export const WrapperScreen = ({children}) => {

    return <SafeAreaView style={{flex: 1, padding: 16, paddingTop: 0}}>
        {children}
    </SafeAreaView>;
}