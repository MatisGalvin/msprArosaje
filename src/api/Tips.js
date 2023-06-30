import axios from "axios";
import store from "../redux/appStore";
global.Buffer = require('buffer').Buffer;

const baseURL = 'https://api.arosaje.com/api';

const tipsURLDeep = `${baseURL}/api/tips?populate=deep`
const tipsURL = `${baseURL}/api/tips`
const imageURL = `${baseURL}/api/images`

export class Tips {
    static async getTips() {
        const response = await axios.get(`${plantsURL}`);
        return response.data;
    }

    static async getTipsByPlantId(plantId, jwt) {

        const response = await axios.get(
            `${tipsURLDeep}&filters[plant][id][$eq]=${plantId}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        );
        return response.data;
    }

    static async postTip(tip, plantId, botanistId) {
        const response = await axios.post(
            `${tipsURL}`,
            {
                "data": {
                    "tip": tip,
                    "plant": plantId,
                    "botanist": botanistId
                }
            },
            {
                'Authorization': `Bearer ${appStore.appStore.jwt}`
            }
        );
        return response.data;
    }

}