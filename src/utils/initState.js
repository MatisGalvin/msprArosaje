import { Plants } from "../api/Plants";
import { Users } from "../api/Users";
import { StrapiDatas } from "../api/api";
import store from "../redux/appStore";
export async function initState(username) {
  const myPlants = await Plants.getPlantsByUsername(username);
  await store.dispatch({ type: "INIT_OWN_PLANTS", plants: myPlants });
  const reponseUser = await Users.getUserByUsername(username);
  await store.dispatch({
    type: "INIT_STATE",
    id: reponseUser.id,
    username: username,
    address: reponseUser.address[0].address,
    city: reponseUser.address[0].city,
    zipcode: reponseUser.address[0].zipcode,
    profile_picture: reponseUser.profile_picture.base64,
  });

  return true;
}
