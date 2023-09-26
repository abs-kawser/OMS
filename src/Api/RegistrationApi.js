import base64 from "base-64";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";

export const fetchRegistrationData = async (setIsLoading) => {
  const requestData = {
    // CustomerId: 318233,
    NetworkId: U21080274,
    MobileNo: "01731111112",
    Password: 123456,
  };

  console.log("Posting loan data:", JSON.stringify(requestData, null, 2));

  try {
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
    const response = await fetch(`${BASE_URL}/api/HomeApi/Registration`, {
      headers: {
        Authorization: authHeader,
        method: "POST",
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
