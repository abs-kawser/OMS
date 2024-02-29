import base64 from "base-64";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';



// export const fetchProductData = async ( setIsLoading) => {
//   try {
//     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
//     const response = await fetch(`${BASE_URL}/api/ProductApi/GetAllProduct`, {
//       headers: {
//         Authorization: authHeader,
//       },
//     });
//     const jsonData = await response.json();
//     //console.log(JSON.stringify(jsonData, null, 2));
//     await AsyncStorage.setItem('ProductList', JSON.stringify(jsonData));
//     // setData(jsonData);
//     // setFilteredData(jsonData);
//     // setIsLoading(false);
//     return jsonData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     setIsLoading(false);
//     // setIsLoading(false);
//     throw error;
//   }
// };


export const fetchProductData = async (setIsLoading) => {
  try {
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
    const response = await axios.get(`${BASE_URL}/api/ProductApi/GetAllProduct`, {
      headers: {
        Authorization: authHeader,
      },
    });

    const jsonData = response.data;

    // Save fetched data to AsyncStorage
    await AsyncStorage.setItem('ProductList', JSON.stringify(jsonData));
    setIsLoading(false);

    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
    // Handle the error here or rethrow it based on your requirements
    throw error; // You may remove this line if you handle the error here
  }
};




// export const fetchProductData = async (setIsLoading) => {
//   try {
//     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
//     const response = await axios.get(`${BASE_URL}/api/ProductApi/GetAllProduct`, {
//       headers: {
//         'Authorization': authHeader,
//       },
//     });

//     if (response.status === 200) {
//       const jsonData = response.data;
//       await AsyncStorage.setItem('ProductList', JSON.stringify(jsonData));
//       return jsonData;
//     } else {
//       console.error('Error fetching data:', response.status, response.statusText);
//       setIsLoading(false);
//       throw new Error('Error fetching data');
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     setIsLoading(false);
//     throw error;
//   }
// };




