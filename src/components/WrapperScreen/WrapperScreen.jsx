import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WrapperScreen = ({children}) => {

    return <SafeAreaView style={{flex: 1, paddingBottom: 0, marginBottom: 0}} edges={['left', 'right', 'top']}>
        {children}
    </SafeAreaView>;
}