import axios from "axios";
import store from "../redux/appStore";

class Image {

    static baseUrl = 'https://arosaje.maximebaudoin.fr/api';

    static post = async (base64) => {

        const appStore = store.getState();

        try {

            response = await axios.post(`${this.baseUrl}/images`, {
                data: {
                    base64: base64
                }
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${appStore.appStore.jwt}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }
            return false;

        } catch (error) {
            console.log('Image:post', error);
        }
    }
}

export default Image;