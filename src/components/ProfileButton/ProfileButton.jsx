import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectProfilePicture,
  selectUsername,
} from "../../redux/reducers/authReducer";
import colors from "../../../colors";

export const ProfileButton = () => {
  // TODO : Ouvrir le screen <PROFILE>

  const profilePicture = useSelector(selectProfilePicture);

  return (
    <TouchableOpacity>
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
