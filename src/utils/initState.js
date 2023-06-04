import { Plants } from "../api/Plants"
import { Users } from "../api/Users"
import { StrapiDatas } from "../api/api"
import store from "../redux/appStore"
export async function initState(username, address, city, zipcode){const myPlants = await Plants.getPlantsByUsername(username)
    await store.dispatch({type: "INIT_OWN_PLANTS", plants: myPlants})
    const id = await Users.getUserIdByUsername(username)
    await store.dispatch({type: "INIT_STATE", id: id, username: username, address: address, city: city, zipcode: zipcode})

    return true
}