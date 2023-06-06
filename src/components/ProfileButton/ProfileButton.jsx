import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export const ProfileButton = () => {
  // TODO : Récupérer l'image dynamiquement avec l'utilisateur connecté et ouvrir le screen <PROFILE>

  const [profilePicture, setProfilePicture] = useState();

  const appStore = useSelector((state) => state.appStore);

  useEffect(() => {
    if(!appStore) {
        return;
    }
    setProfilePicture(appStore.profile_picture);
  }, []);

  return (
    <TouchableOpacity>
      {profilePicture && <Image source={{ uri: profilePicture }} style={styles.image} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 38,
    height: 38,
    borderRadius: 50,
  },
});
