import axios from "axios";

class PlantID {

    static baseUrl = 'https://api.plant.id/v2';

    static post = async (base64) => {

        try {

            response = await axios.post(`${this.baseUrl}/health_assessment`, {
                images: [
                    `data:image/png;base64,${base64}`
                ],
                language: 'fr'
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Api-Key': process.env.API_KEY
                }
            });

            if (response.status === 201 || response.status === 200) {
                return JSON.stringify(response.data);
            }
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

export default PlantID;