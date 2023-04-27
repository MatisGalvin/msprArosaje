import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "./colors";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from "./src/screens/Home/Home";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { WrapperScreen } from "./src/components/WrapperScreen/WrapperScreen";
import { Image, Text } from "react-native";

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Notifications } from './src/screens/Notifications/Notifications';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = focused ? require('./assets/images/static/bottomBar/house_active.png') : require('./assets/images/static/bottomBar/house_outline.png');
                    } else if (route.name === 'Plantes') {
                        icon = focused ? require('./assets/images/static/bottomBar/plant_active.png') : require('./assets/images/static/bottomBar/plant_outline.png');
                    } else if (route.name === 'Analyse') {
                        icon = focused ? require('./assets/images/static/bottomBar/photo_active.png') : require('./assets/images/static/bottomBar/photo_outline.png');
                    } else if (route.name === 'Garde') {
                        icon = focused ? require('./assets/images/static/bottomBar/tool_active.png') : require('./assets/images/static/bottomBar/tool_outline.png');
                    } else if (route.name === 'Carte') {
                        icon = focused ? require('./assets/images/static/bottomBar/location_active.png') : require('./assets/images/static/bottomBar/location_outline.png');
                    }

                    return <Image source={icon} style={{ width: 24, height: 24 }} />;
                },
                tabBarLabel: ({ focused, color, size }) => {
                    return <Text style={{
                        fontSize: 12,
                        fontWeight: focused ? 'bold' : 'normal',
                        color: colors.gray[600]
                    }}>
                        {route.name}
                    </Text>
                },
                tabBarStyle: {
                    borderTopWidth: 0,

                    shadowColor: colors.black,
                    shadowOffset: {
                        width: 0,
                        height: -5
                    },
                    shadowOpacity: .15,
                    shadowRadius: 10,
                },
                headerShown: false
            })}
        >
            <Tab.Screen name="Home">{() => <WrapperScreen><Home /></WrapperScreen>}</Tab.Screen>
            <Tab.Screen name="Plantes">{() => <WrapperScreen><Home /></WrapperScreen>}</Tab.Screen>
            <Tab.Screen name="Analyse">{() => <WrapperScreen><Home /></WrapperScreen>}</Tab.Screen>
            <Tab.Screen name="Garde">{() => <WrapperScreen><Home /></WrapperScreen>}</Tab.Screen>
            <Tab.Screen name="Carte">{() => <WrapperScreen><Home /></WrapperScreen>}</Tab.Screen>
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

export default function App() {

    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.background,
        },
    };

    return <NavigationContainer theme={navTheme}>
        <SafeAreaProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Default" component={BottomTabNavigator} />
                <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={{
                        presentation: "modal",
                        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
                    }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    </NavigationContainer>
}