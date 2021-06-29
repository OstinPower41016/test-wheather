import axios from "../axios";

export const getWheather = async (searchText: string) => {
  try {
    const response = await axios.get(
      `weather?APPID=b79ccfe94759a38a9dcc9f9c8ef0942c&lang=ru&units=metric&q=${searchText}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
