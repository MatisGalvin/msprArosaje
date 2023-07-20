import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectProfilePicture,
  selectUsername,
} from "../../redux/reducers/authReducer";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import OnlineDot from "../OnlineDot/OnlineDot";

export const ProfileButton = () => {
  // TODO : Ouvrir le screen <PROFILE>

  const navigation = useNavigation()
  const profilePicture = useSelector(selectProfilePicture);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Image source={profilePicture ? { uri: profilePicture } : require('../../../assets/images/static/profile.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: colors.white
  },
});
