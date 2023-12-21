import { StyleSheet, Text, View, ScrollView } from "react-native";
import { BASE_URL, PASSWORD, USERNAME, blackColor } from "../../varible";
import base64 from "base-64";
import React, { useState, useMemo, useEffect } from "react";
// import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Button } from "@rneui/themed";

const OrderInfo = ({ route }) => {
  const navigation = useNavigation();

  const orderNo = route.params?.orderNo;
  console.log("orderNo ", orderNo);

  const [data, setData] = useState(null);

  //======================= Order info   Api Calling ==========================
  const fetchOrderInfoData = async () => {
    try {
      const url = `${BASE_URL}/api/NewOrderApi/GetPoInfo?orderNo=${orderNo}&verId=1`;
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      // Fetch data from the URL
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      const Result = await response.json();
      console.log("order info", JSON.stringify(Result, null, 2));
      setData(Result);
    } catch (error) {
      // console.error("Fetch error:", error);
      // throw error;
    }
  };

  useEffect(() => {
    fetchOrderInfoData();
  }, []);


  
  // Initialize a variable to store the grand total
  let grandTotal = 0;

  // Map through the OrderItemList and calculate the grand total
  data?.OrderItemList?.forEach((item) => {
    grandTotal += item.TotalPrice;
  });

  return (


   <>
     <ScrollView> 
<View style={styles.container}>
<View style={styles.card}>
  <Text style={styles.cardText} selectable={true}>Order No: {data?.OrderBaicInfo?.OrderNo}</Text>
      <Text style={styles.cardText} selectable={true}>Order Date: {data?.OrderBaicInfo?.OrderDate &&
        moment(data.OrderBaicInfo.OrderDate).format("DD-MM-YYYY")}  
      </Text>
  <Text style={styles.cardText} selectable={true}>Delivery Date: {data?.OrderBaicInfo?.DeliveryDate &&
        moment(data.OrderBaicInfo.DeliveryDate).format("DD-MM-YYYY")}</Text>
  <Text style={styles.cardText} selectable={true}>{data?.OrderBaicInfo?.CustomerName}</Text>
  <Text style={styles.cardText} selectable={true}>{data?.OrderBaicInfo?.CustomerAddress}</Text>

</View>
</View>

  
    <View style={styles.tableContainer}>

    <View style={styles.tableHeader}>
    <View style={styles.column}>
    <Text style={styles.headerText}>Name</Text>
    </View>

    <View style={styles.column2}>
    <Text style={[styles.headerText,{marginLeft:1}]}>Quantity</Text>
    </View>

    <View style={styles.column2}>
    <Text style={styles.headerText}>Price</Text>
    </View>
    </View>

    {data?.OrderItemList?.map((item, index) => (
    <View style={styles.tableRow} key={index}>

    <View style={styles.column}>
    <Text style={styles.label} >
    {item.ProductName}
    </Text>
    </View>

    <View style={styles.column2}>
    <Text style={styles.label}>{item.Quantity}</Text>
    </View>

    <View style={styles.column2}>
    <Text style={styles.label}>{item.TotalPrice}</Text>
    </View>
    </View>
    ))}
    </View>
    </ScrollView> 

    <View style={{ alignSelf: "flex-end" }}>
  <Text style={{ fontSize: 18, color: "black" }}>
    Total = {grandTotal}
  </Text>
</View>  

<View style={{width:"20%",}}>
  <Button
    onPress={() => navigation.navigate("Home")}
    color="#2E97A7"  
    >
    Back
  </Button>
</View>
    </>

  );
};

export default OrderInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', 
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  card: {
    backgroundColor: '#9bf6ff',
    padding: 16,
    borderRadius: 8,
    width: '90%',
  alignSelf:"center",
  marginTop:20

  },
  cardText: {
    // marginBottom: 8,
    fontSize:16,
    color: 'black',
    padding:8,
    alignSelf:"flex-start",
    // fontWeight: "700",
    // fontFamily: 'Roboto-bold',
    marginLeft:25 
  },


// ============table design ================
tableContainer: {
   marginTop:20,

  // Add any additional styles for your table container
},
tableHeader: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  paddingVertical: 10,
  backgroundColor: "lightgray",
  marginHorizontal: 10,

},
column: {
  width: '50%',
  justifyContent: 'center',
  // alignItems: 'center',
  alignItems:"flex-start"

},
column2: {
  width: '25%', // Each column takes 25% of the width
  justifyContent: 'center',
  alignItems: "flex-end",
  paddingRight:30
},
tableRow: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  paddingVertical: 10,
  marginHorizontal: 10,
  backgroundColor: "#f3ffbd",

},
label: {
  color:blackColor

  // Add any additional styles for your label text
},
headerText: {
  fontWeight: "700",
  fontFamily: 'Roboto-bold',
  color:blackColor
  // Add any additional styles for your header text
},


});







//      <ScrollView> 
//       <View style={{ padding: 10, backgroundColor: "#e9ecef", elevation: 5 }}>

//         <View style={styles.pageInfoOne}>
//           <Text style={styles.text}>Order No: {data?.OrderBaicInfo?.OrderNo}</Text>
//           {/* <Text style={styles.text}>{data?.OrderBaicInfo?.OrderDate} </Text>
//     <Text style={styles.text}>{data?.OrderBaicInfo?.DeliveryDate} </Text> */}
//           <Text style={styles.text}>
//           Order Date: {data?.OrderBaicInfo?.OrderDate &&
//               moment(data.OrderBaicInfo.OrderDate).format("DD-MM-YYYY")}  
           
//           </Text>
//           <Text style={styles.text}>
//           Delivery Date: {data?.OrderBaicInfo?.DeliveryDate &&
//               moment(data.OrderBaicInfo.DeliveryDate).format("DD-MM-YYYY")}
            
//           </Text>
//           <View style={styles.divider}></View>

//           <Text style={styles.text}>{data?.OrderBaicInfo?.CustomerName}</Text>
//           <Text style={styles.text}>
//             {data?.OrderBaicInfo?.CustomerAddress}
//           </Text>
//         </View>




//         <ScrollView> 

//       <View style={styles.tableContainer}>
//   <View style={styles.tableHeader}>
//     <View style={styles.column}>
//       <Text style={styles.headerText}>Name</Text>
//     </View>
//     <View style={styles.column2}>
//       <Text style={styles.headerText}>Quantity</Text>
//     </View>
//     <View style={styles.column2}>
//       <Text style={styles.headerText}>Price</Text>
//     </View>
//   </View>

//   {data?.OrderItemList?.map((item, index) => (
//     <View style={styles.tableRow} key={index}>
//       <View style={styles.column}>
//         <Text style={styles.label} numberOfLines={2}>
//           {item.ProductName}
//         </Text>
//       </View>

//       <View style={styles.column2}>
//         <Text style={styles.label}>{item.Quantity}</Text>
//       </View>

//       <View style={styles.column2}>
//         <Text style={styles.label}>{item.TotalPrice}</Text>
//       </View>
//     </View>
//   ))}
// </View>

// </ScrollView> 


//         {/* part end */}
//       {/* grand total */}
//   <View style={{ alignSelf: "flex-end" }}>
//     <Text style={{ fontSize: 18, color: "black" }}>
//       Total = {grandTotal}
//     </Text>
//   </View>

//   <View style={{ width: 100, alignSelf: "center", marginVertical: 30 }}>
//     <Button
//       icon="arrow-left"
//       mode="contained"
//       onPress={() => navigation.navigate("Home")}
//       buttonColor="tomato"
//     >
//       Back
//     </Button>
//   </View>
//    </View>
//    </ScrollView>



// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#ffffff",
//     // elevation: 5,
//   },
//   pageInfoOne: {
//     marginTop: 10,
//     // backgroundColor: "#c9cdd0",
//     width: "100%",
//     alignSelf: "center",
//     borderRadius: 5,
//     // elevation: 4,
//     // padding:10
//   },
//   text: {
//     color: "#000000",
//     textAlign: "center",
//     fontWeight: "bold",
//     lineHeight: 50,
//   },
//   divider: {
//     borderBottomColor: "gray",
//     marginVertical: 8,

//     flex: 1,
//     height: 1,
//     width: "60%",
//     backgroundColor: "gray",
//     alignSelf: "center",
//   },
//   column: {
//     // flex: 1,
//     width: "30%",
//   },
//   label: {
//     fontSize: 16,
//   },


//   // ===========
//   tableContainer: {
//     alignSelf: "center",
//     width: "100%",
//     marginVertical: 20,
//     backgroundColor: "#ffffff",
//     borderRadius: 5,
//     elevation: 2,
//   },
//   tableHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     backgroundColor: "#f0f0f0",
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 16,
//     borderBottomColor: "#e0e0e0",
//     borderBottomWidth: 1,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "700",
//     fontFamily: 'Roboto-bold', 
//   },
// });
