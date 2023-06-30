import axios from "axios";
import store from "../redux/appStore";
import { useSelector } from "react-redux";
import { selectJWT } from "../redux/reducers/authReducer";

const baseURL = 'https://api.arosaje.com';

const usersURLDeep = `${baseURL}/api/users?populate=*`
const usersURL = `${baseURL}/api/users`

export class Users {

    static async findById(id, jwtDefault = '') {

        const jwt = jwtDefault !== '' ? jwtDefault : useSelector(selectJWT);

        try {

            const response = await axios.get(
                `${usersURLDeep}&filters[id][$eq]=${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );

            if (response.status !== 201 && response.status !== 200) {
                return false;
            }

            if(typeof response.data[0] == 'undefined') {
                return false;
            }

            return response.data;

        } catch (error) {
            console.log('Users:findById', error);

            return false;
        }
    }

    static async getUserIdByUsername(username) {
        const jwt = useSelector(selectJWT);

        const response = await axios.get(
            `${usersURL}?filters[username][$eq]=${username}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        );
        return response.data[0].id;
    }
}
