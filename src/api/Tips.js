import axios from "axios";
global.Buffer = require('buffer').Buffer;

const baseURL = "http://arosaje.maximebaudoin.fr:1337"

const tipsURLDeep = `${baseURL}/api/tips?populate=deep`
const tipsURL = `${baseURL}/api/tips`
const imageURL = `${baseURL}/api/images`

export class Tips {
  static async getTips() {
    const response = await axios.get(`${plantsURL}`);
    return response.data;
  }

  static async getTipsByPlantId(plantId) {
    const response = await axios.get(
      `${tipsURLDeep}&filters[plant][id][$eq]=${plantId}`
    );
    return response.data;
  }

  static async postTip(tip, plantId, botanistId) {
    const response = await axios.post(
      `${tipsURL}`,
      {
        "data": {
          "tip": tip,
          "plant": plantId,
          "botanist": botanistId
        }
      }
    );
    return response.data;
  }

}