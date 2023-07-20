import axios from "axios";

class Discussion {

    static baseUrl = 'https://api.arosaje.com/api/';

    static getDiscussionsByUserId = async (userId, jwt) => {

        try {

            const response = await axios.get(`${this.baseUrl}discussions?populate=deep&filters[$or][user1][data][id][$eq]=${userId}&filters[$or][user2][data][id][$eq]=${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }

            return false;

        } catch (error) {
            console.log('Discussion:getDiscussionsByUserId', error);

            return false;
        }
    }

    static localRegister = async (username, email, password) => {

        try {

            const response = await axios.post(`${this.baseUrl}/local/register`, {
                username: username,
                email: email,
                password: password
            });

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }

            return false;

        } catch (error) {
            console.log('Auth:localRegister', error);

            return false;
        }
    }
}

export default Discussion;