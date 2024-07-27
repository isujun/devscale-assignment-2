import { IResponseData } from "./types/entity";

const API_URL = "https://v1.appbackend.io/v1/rows/7Eg7yYwLkQ8u";

async function getTodos() {
  try {
    const response = await fetch(API_URL);
    const responseData: IResponseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

getTodos();
