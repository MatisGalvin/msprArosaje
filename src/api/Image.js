import axios from "axios";

class Image {

    static baseUrl = 'http://arosaje.maximebaudoin.fr:1337/api';

    static post = async (base64) => {

        try {

            response = await axios.post(`${this.baseUrl}/images`, {
                data: {
                    base64: base64
                }
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_TOKEN}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }
            return false;

        } catch (error) {
            console.log(error);
        }
    }
}

export default Image;