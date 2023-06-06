import { createStackNavigator } from "@react-navigation/stack";
import Plantes from "../../screens/Plantes/Plantes";
import AddPlante from "../../screens/Plantes/AddPlante/AddPlante";
import NewReportScreen from "../../screens/Plantes/MesPlantes/Reports/NewReportScreen"; 

const Stack = createStackNavigator();

export default function PlantesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="MyPlantes" component={Plantes} />
      <Stack.Screen name="AddPlante" component={AddPlante} />
      <Stack.Screen name="NewReport" component={NewReportScreen} />
    </Stack.Navigator>
  );
}
