import base64 from "base-64";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";

export const fetchRegistrationData = async (setIsLoading,userId, mobile, password) => {
  
  const requestData = {
    // CustomerId: 318233,
    NetworkId: userId,
    MobileNo: mobile,
    Password: password,
  };

  console.log("Posting loan data:", JSON.stringify(requestData, null, 2));

  try {
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
    const response = await fetch(`${BASE_URL}/api/HomeApi/Registration`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },

      body: JSON.stringify(requestData),
    });
    const jsonData = await response.json();
    //console.log(JSON.stringify(jsonData, null, 2));
    //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
    // setData(jsonData);
    // setFilteredData(jsonData);
    // setIsLoading(false);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
    // setIsLoading(false);
    throw error;
  }
};
