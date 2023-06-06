import axios from "axios";

class Analyse {

    static baseUrl = 'http://192.168.1.77:1337/api';

    static post = async (data) => {

        try {

            response = await axios.post(`${this.baseUrl}/analyses`, {
                data: {
                    plantIdData: data
                }
            }, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer 7d4bf0c7f26b420050f1d8358e0af98cccd429ea87fc19b14016cc3f9541ffbed4f92cad49ac35c32ae9808bb2d3d2ea2e53135ec15f4feb7945af1eea457d036b88556fc1edd739efd20c2a283cf62b0b009dd501e3b6f0a409191f1e2ff9a83b49399496f5e59cf510e2deeee454a7379c42dc4fe73492f39c9de4b2d14f7e'
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

export default Analyse;