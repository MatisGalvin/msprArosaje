import axios from "axios";
import { defaultImage } from "./defaultImage";
import Image from "./Image";
import { useSelector } from "react-redux";
import store from "../redux/appStore";
import { selectJWT } from "../redux/reducers/authReducer";

const baseURL = 'https://api.arosaje.com/api';

const plantsURLbasic = `${baseURL}/api/plants`;
const plantsURL = `${baseURL}/api/plants?populate=*`;
const plantsURLDeep = `${baseURL}/api/plants?populate=deep`;
const imageURL = `${baseURL}/api/images`;

export class Plants {
    static async getPlants() {

        const appStore = store.getState();
        useSelector(selectIsLoggedIn)

        const response = await axios.get(`${plantsURL}`, {
            headers: {
                'Authorization': `Bearer ${appStore.appStore.jwt}`
            }
        });

        return response.data;
    }

    static async getPlantsDeep() {

        const appStore = store.getState();

        const response = await axios.get(`${plantsURLDeep}`, {
            headers: {
                'Authorization': `Bearer ${appStore.appStore.jwt}`
            }
        });
        return response.data;
    }

    static async getPlantsByUsername(username) {

        const jwt = useSelector(selectJWT);

        try {

            const response = await axios.get(`${plantsURL}&filters[owner][username][$eq]=${username}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (response.status !== 201 && response.status !== 200) {
                return false;
            }

            if (typeof response.data[0] == 'undefined') {
                return false;
            }

            return response.data;

        } catch (error) {
            console.log('Plants:getPlantsByUsername', error);

            return false;
        }
    }

    static async getPlantsByUserId(userID, jwt) {

        try {

            const response = await axios.get(`${plantsURL}&filters[owner][id][$eq]=${userID}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            console.log(response);

            if (response.status !== 201 && response.status !== 200) {
                return false;
            }

            if (typeof response.data == 'undefined') {
                return false;
            }

            return response.data;

        } catch (error) {
            console.log('Plants:getPlantsByUserId', error);

            return false;
        }
    }

    static async pushImagesIntoStrapi(images) {
        let imageIds = [];
        for (let index = 0; index < images.length; index++) {
            if (images[index] !== "") {
                const responseImage = await Image.post(images[index]);
                imageIds.push(responseImage.data.id);
            }
        }
        return imageIds;
    }

    static async addPlant(name, description, ownerID, images) {
        // images est un tableau d'images

        const appStore = store.getState();

        const imageIds = await this.pushImagesIntoStrapi(images);

        const response = await axios.post(`${plantsURLbasic}`, {
            data: {
                name: name,
                description: description,
                owner: ownerID,
                images: imageIds,
                // images: [responseImage.data.id],
            },
        }, {
            'Authorization': `Bearer ${appStore.appStore.jwt}`
        });

        return response.data;
    }
}
