import base64 from "base-64";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";

export const fetchOrderInfoData = async (orderNo, verId) => {
  try {
    // Construct the URL with query parameters
    const url = `${BASE_URL}/api/NewOrderApi/GetPoInfo?orderNo=${orderNo}&verId=${verId}`;
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

    // Fetch data from the URL
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });  
    console.log("order info",response);
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text(); 
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // You can handle the error further up the call stack if needed
  }
};
