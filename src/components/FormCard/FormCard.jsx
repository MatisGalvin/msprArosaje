import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../../../colors";

export default function FormCard({style}) {
  return (
    <View style={[styles.body, style]}>
      <View style={styles.container}>
        <Text style={styles.smallTitle}>Adresse</Text>
        <Text style={styles.subTitle}>Voie et numéro de voie</Text>
        <TextInput style={styles.textInput} placeholder="25 Rue Exemple" />

        <Text style={styles.subTitle}>Ville</Text>
        <TextInput style={styles.textInput} placeholder="Paris" />

        <Text style={styles.subTitle}>Code postal</Text>
        <TextInput
          style={styles.textInput}
          placeholder="75000"
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.smallTitle}>Nom</Text>
        <TextInput style={styles.textInput} placeholder="Ma belle plante" />

        <Text style={styles.smallTitle}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Une anecdote ou un conseil sur la plante"
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
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
