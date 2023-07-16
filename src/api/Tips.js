import axios from "axios";
import store from "../redux/appStore";
global.Buffer = require('buffer').Buffer;

const baseURL = "https://api.arosaje.com"


const tipsURLDeep = `${baseURL}/api/tips?populate=deep`
const tipsURL = `${baseURL}/api/tips`
const imageURL = `${baseURL}/api/images`

export class Tips {
    static async getTips(jwt) {
        const response = await axios.get(`${plantsURL}`,
        {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

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

    static async postTip(tip, plantId, botanistId, jwt) {

        try {

            const response = await axios.post(
                `${tipsURL}`,
                {
                    data: {
                        tip: tip,
                        plant: plantId,
                        botanist: botanistId
                    }
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }

            return false;

        } catch (error) {
            console.log('Tips:postTip', error);

            return false;
        }

        // const response = await axios.post(
        //     `${tipsURL}`,
        //     {
        //         "data": {
        //             "tip": tip,
        //             "plant": plantId,
        //             "botanist": botanistId
        //         }
        //     },
        //     {
        //         'Authorization': `Bearer ${jwt}`
        //     }
        // );
        // return response.data;
    }

}