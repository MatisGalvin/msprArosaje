import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "../../../colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../../src/screens/Home/Home";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { WrapperScreen } from "../../../src/components/WrapperScreen/WrapperScreen";
import { Image, StyleSheet, Text } from "react-native";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Notifications } from "../../../src/screens/Notifications/Notifications";
import PlantesNavigation from "../../../src/navigations/PlantesNavigation/PlantesNavigation";
import Carte from "../../../src/screens/Carte/Carte";
import Analyse from "../../../src/screens/Analyse/Analyse";
import { initState } from "../../../src/utils/initState";
import { useSelector } from "react-redux";
import Login from "../../screens/Login/Login";
import {
  selectIsLoggedIn,
  selectUser,
  selectUsername,
} from "../../redux/reducers/authReducer";
import store from "../../redux/appStore";
import { useMatomo } from "matomo-tracker-react-native";
import { Garde } from "../../screens/Garde/Garde";
import { Discussion } from "../../screens/Discussion/Discussion";
import Profile from "../../screens/Profile/Profile";
import Parameters from "../../screens/Parameters/Parameters";
import SignUp from "../../screens/SignUp/SignUp";
import OneDiscussion from "../../screens/OneDiscussion/OneDiscussion";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Home") {
            icon = focused
              ? require("../../../assets/images/static/bottomBar/house_active.png")
              : require("../../../assets/images/static/bottomBar/house_outline.png");
          } else if (route.name === "Plantes") {
            icon = focused
              ? require("../../../assets/images/static/bottomBar/plant_active.png")
              : require("../../../assets/images/static/bottomBar/plant_outline.png");
          } else if (route.name === "Analyse") {
            icon = focused
              ? require("../../../assets/images/static/bottomBar/photo_active.png")
              : require("../../../assets/images/static/bottomBar/photo_outline.png");
          } else if (route.name === "Garde") {
            icon = focused
              ? require("../../../assets/images/static/bottomBar/tool_active.png")
              : require("../../../assets/images/static/bottomBar/tool_outline.png");
          } else if (route.name === "Carte") {
            icon = focused
              ? require("../../../assets/images/static/bottomBar/location_active.png")
              : require("../../../assets/images/static/bottomBar/location_outline.png");
          }

          return <Image source={icon} style={{ width: 24, height: 24 }} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          return (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? "bold" : "normal",
                color: colors.gray[600],
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarStyle: styles.tabbarShadow,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {() => (
          <WrapperScreen>
            <Home />
          </WrapperScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Plantes">
        {() => (
          <WrapperScreen>
            <PlantesNavigation />
          </WrapperScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Analyse">
        {() => (
          <WrapperScreen>
            <Analyse />
          </WrapperScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Garde">
        {() => (
          <WrapperScreen>
            <Garde />
          </WrapperScreen>
        )}
      </Tab.Screen>
      <Tab.Screen name="Carte">
        {() => (
          <WrapperScreen>
            <Carte />
          </WrapperScreen>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function GlobalAppNavigation() {
  //   store.dispatch({
  //     type: "setSignOut",
  //   });

  const { trackAppStart } = useMatomo();

  useEffect(() => {
    trackAppStart();
  }, []);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaProvider>
        {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
        {/* <AppNavigator /> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login">
        {() => (
          <WrapperScreen>
            <Login />
          </WrapperScreen>
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {() => (
          <WrapperScreen>
            <SignUp />
          </WrapperScreen>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Default" component={BottomTabNavigator} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Discussion" component={Discussion} />
      <Stack.Screen name="OneDiscussion" component={OneDiscussion} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Parameters" component={Parameters} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbarShadow: {
    borderTopWidth: 0,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  noTabbarShadow: {
    borderTopWidth: 0,
  },
});
