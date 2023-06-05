import axios from "axios";
import { defaultImage } from "./defaultImage";
global.Buffer = require("buffer").Buffer;

const baseURL = "http://arosaje.maximebaudoin.fr:1337";
const imageURL = `${baseURL}/api/images`;

export class Images {

  static async addImage(base64) {
    let dataImage = {
      data: {
        base64: base64,
      },
    };
    const response = await axios.post(`${imageURL}`, dataImage);
    return response.data;
  }
}
