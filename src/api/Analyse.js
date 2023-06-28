import axios from "axios";

class Analyse {

    static baseUrl = 'https://arosaje.maximebaudoin.fr/api';

    static post = async (data, jwt) => {

        try {

            response = await axios.post(`${this.baseUrl}/analyses`, {
                data: {
                    plantIdData: data
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
            console.log('Analyse:post', error);
        }
    }
}

export default Analyse;