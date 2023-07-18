import axios from "axios";

class Auth {
  static baseUrl = "https://api.arosaje.com/api/auth";

  static localConnect = async (identifier, password) => {
    try {
      const response = await axios.post(
        `${this.baseUrl}/local`,
        {
          identifier: identifier,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.PUBLIC_USER_TOKEN}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }

      return false;
    } catch (error) {
      console.log("Auth:localConnect", error);

      return false;
    }
  };

  static localRegister = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${this.baseUrl}/local/register`,
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.PUBLIC_USER_TOKEN}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }

      return false;
    } catch (error) {
      console.log("Auth:localRegister", error);

      return false;
    }
  };
}

export default Auth;
