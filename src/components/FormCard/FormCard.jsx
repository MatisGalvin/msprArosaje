import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../../colors";
import { useState } from "react";

export default function FormCard({ style, setCanSubmit, streetProp, cityProp, zipcodeProp, plantName, setPlantName, plantDescription, setPlantDescription }) {
  const [street, setStreet] = useState(streetProp);
  const [city, setCity] = useState(cityProp);
  const [zipcode, setZipcode] = useState(zipcodeProp);

  const canSubmitOrNot = () => {
    if (street && city && zipcode && zipcode.length === 5 && plantName) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const onChangeStreet = (value) => {
    setStreet(value);
  };

  const onChangeCity = (value) => {
    setCity(value);
  };

  const onChangeZipcode = (value) => {
    setZipcode(value);
  };

  const onChangePlantName = (value) => {
    setPlantName(value);
  };

  const onChangeDescription = (value) => {
    setPlantDescription(value);
  };

  return (
    <View style={[styles.body, style]}>
      <View style={styles.container}>
        <Text style={styles.smallTitle}>Adresse</Text>
        <Text style={styles.subTitle}>Voie et numéro de voie</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Votre rue"
          value={street}
          onChangeText={onChangeStreet}
          onEndEditing={canSubmitOrNot}
        />

        <Text style={styles.subTitle}>Ville</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Votre ville"
          value={city}
          onChangeText={onChangeCity}
          onEndEditing={canSubmitOrNot}
        />

        <Text style={styles.subTitle}>Code postal</Text>
        <TextInput
          style={styles.textInput}
          placeholder="75000"
          keyboardType="numeric"
          maxLength={5}
          value={zipcode}
          onChangeText={onChangeZipcode}
          onEndEditing={canSubmitOrNot}
        />

        <Text style={styles.smallTitle}>Nom</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ma belle plante"
          onChangeText={onChangePlantName}
          onEndEditing={canSubmitOrNot}
        />

        <Text style={styles.smallTitle}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Une anecdote ou un conseil sur la plante"
          multiline
          onChangeText={onChangeDescription}
          onEndEditing={canSubmitOrNot}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    minWidth: "100%",
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 12,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  container: {
    alignSelf: "stretch",
    gap: 16,
  },
  smallTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[600],
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray[600],
  },
  textInput: {
    width: "100%",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
    borderColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 6,
    color: colors.gray[600],
  },
  textArea: {
    width: "100%",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 8,
    borderColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 6,
    color: colors.gray[600],
    paddingBottom: 100,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
