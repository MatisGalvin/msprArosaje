import axios from "axios";
import Image from "./Image";

const baseURL = "https://api.arosaje.com";

const plantsURLbasic = `${baseURL}/api/plants`;
const plantsURL = `${baseURL}/api/plants?populate=*`;
const plantsURLDeep = `${baseURL}/api/plants?populate=deep`;
const imageURL = `${baseURL}/api/images`;

export class Plants {
  static async getPlants(jwt) {
    const response = await axios.get(`${plantsURL}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  }

  static async getPlantsDeep(jwt) {
    const response = await axios.get(`${plantsURLDeep}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  }

  static async getPlantsByUsername(username, jwt) {
    try {
      const response = await axios.get(
        `${plantsURL}&filters[owner][username][$eq]=${username}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status !== 201 && response.status !== 200) {
        return false;
      }

      if (typeof response.data[0] == "undefined") {
        return false;
      }

      return response.data;
    } catch (error) {
      console.log("Plants:getPlantsByUsername", error);

      return false;
    }
  }

  static async getPlantsByUserId(userID, jwt) {
    try {
      const response = await axios.get(
        `${plantsURL}&filters[owner][id][$eq]=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status !== 201 && response.status !== 200) {
        return false;
      }

      if (typeof response.data == "undefined") {
        return false;
      }

      return response.data;
    } catch (error) {
      console.log("Plants:getPlantsByUserId", error);

      return false;
    }
  }

  static async pushImagesIntoStrapi(images, jwt) {
    let imageIds = [];
    for (let index = 0; index < images.length; index++) {
      if (images[index] !== "") {
        const responseImage = await Image.post(images[index], jwt);
        imageIds.push(responseImage.data.id);
      }
    }
    return imageIds;
  }

  static async addPlant(name, description, ownerID, images, jwt) {
    // images est un tableau d'images

    const imageIds = await this.pushImagesIntoStrapi(images, jwt);

    const response = await axios.post(
      `${plantsURLbasic}`,
      {
        data: {
          name: name,
          description: description,
          owner: ownerID,
          images: imageIds,
          // images: [responseImage.data.id],
        },
      },
      {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  }
}
