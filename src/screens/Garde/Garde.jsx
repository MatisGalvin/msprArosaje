import { Header } from "../../components/Header/Header";
import {
  StyleSheet,
  View,
} from "react-native";
import utilsStylesheet from "../../utils/utilsStylesheet";
import socket from "../../utils/socket";
import { useEffect } from "react";

export const Garde = () => {

    return <View style={{flex: 1}}>
        <Header screenName="Accueil" customStylesheet={utilsStylesheet.containerPadding} />
        <View style={{flex: 6}} >
            
      </View>
    </View>;
};

const styles = StyleSheet.create({});
