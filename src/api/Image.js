import axios from "axios";

class Image {

    static baseUrl = 'https://arosaje.maximebaudoin.fr/api';

    static post = async (base64, jwt) => {

        try {

            response = await axios.post(`${this.baseUrl}/images`, {
                data: {
                    base64: base64
                }
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
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