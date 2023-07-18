import axios from "axios";

class Message {

    static baseUrl = 'https://api.arosaje.com/api/';

    static getMessagesByDiscussionID = async (discussionId, jwt) => {

        try {

            const response = await axios.get(`${this.baseUrl}messages?populate=*&filters[discussion][data][id][$eq]=${discussionId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            if (response.status === 201 || response.status === 200) {
                return response.data;
            }

            return false;

        } catch (error) {
            console.log('Message:getMessagesByDiscussionID', error);

            return false;
        }
    }
}

export default Message;