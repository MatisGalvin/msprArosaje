import axios from "axios";

const baseURL = "http://arosaje.maximebaudoin.fr:1337"

const usersURLDeep = `${baseURL}/api/users?populate=*`
const usersURL = `${baseURL}/api/users`

export class Users {

  static async getUserByUsername(username) {
    const response = await axios.get(
      `${usersURLDeep}&filters[username][$eq]=${username}`
    );
    return response.data[0];
  }

  static async getUserIdByUsername(username) {
    const response = await axios.get(
      `${usersURL}?filters[username][$eq]=${username}`
    );
    return response.data[0].id;
  }
}
