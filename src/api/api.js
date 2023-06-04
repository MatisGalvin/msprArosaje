
import axios from "axios";
global.Buffer = require('buffer').Buffer;

const baseURL = "http://arosaje.maximebaudoin.fr:1337"

const plantsURL = `${baseURL}/api/plants`
const imageURL = `${baseURL}/api/images`

export class StrapiDatas {


  static async getImageBase64(imagePath) {
    const response = await axios.get(imagePath, {
      responseType: 'arraybuffer'
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return base64;
  }
  

  static async getPlants() {
    const response = await axios.get(`${plantsURL}`);
    return response.data;
  }

  static async addImage(base64) {
    const response = await axios.post(`${imageURL}`, {
      data : {
        base64 : base64
      }
    });
    return response.data;
  }

  static async addPlant(name, description, ownerUsername, arrayBases64) {
    for (let i = 0; i < arrayBases64.length; i++) {
      console.log("item : " + arrayBases64[i])
      await this.addImage(StrapiDatas.getImageBase64(arrayBases64[i]))
      console.log("item base : " + arrayBases64[i])
    }
    const myImage = StrapiDatas.getImageBase64(arrayBases64[0])
    console.log(myImage)
    const response = await axios.post(`${plantsURL}`, {
      name: name,
      description: description,
      owner: {
        connect: [{username: ownerUsername}]
      },
      images: {
        connect: [{base64: StrapiDatas.getImageBase64(arrayBases64[0])}]
      }
    },
    );
    return response.data;
  }

  static async getPlantsByUsername(username) {
    const response = await axios.get(`${plantsURL}?populate=*&filters[owner][username][$eq]=${username}`);
    return response.data.data;
  }
}


