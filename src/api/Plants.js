import axios from "axios";
import { defaultImage } from "./defaultImage";
import { Images } from "./Images";
global.Buffer = require("buffer").Buffer;

const baseURL = "http://arosaje.maximebaudoin.fr:1337";

const plantsURLbasic = `${baseURL}/api/plants`;
const plantsURL = `${baseURL}/api/plants?populate=*`;
const plantsURLDeep = `${baseURL}/api/plants?populate=deep`;
const imageURL = `${baseURL}/api/images`;

export class Plants {
  static async getPlants() {
    const response = await axios.get(`${plantsURL}`);
    return response.data;
  }

  static async getPlantsDeep() {
    const response = await axios.get(`${plantsURLDeep}`);
    return response.data;
  }

  static async getPlantsByUsername(username) {
    const response = await axios.get(
      `${plantsURL}&filters[owner][username][$eq]=${username}`
    );
    return response.data.data;
  }


  static async addPlant(name, description, ownerID /*, images*/) {
    const responseImage = await Images.addImage(defaultImage);
  
    const response = await axios.post(`${plantsURLbasic}`, {
      data: {
        name: name,
        description: description,
        owner: ownerID,
        images: [responseImage.data.id],
      },
    });
  
    return response.data;
  }
}