import axios from "axios";
import { useSelector } from "react-redux";

class Analyse {

    static baseUrl = 'https://api.arosaje.com/api';

    static post = async (data) => {

        const appStore = useSelector((state) => state.appStore);

        try {

            response = await axios.post(`${this.baseUrl}/analyses`, {
                data: {
                    plantIdData: data
                }
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${appStore.jwt}`
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