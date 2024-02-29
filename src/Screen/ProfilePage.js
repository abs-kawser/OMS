import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLogin } from '../Context/LoginProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { blackColor } from '../../varible';

const ProfilePage = () => {


  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

 

  const profileData = {
    FullName: 'Shahidul Islam',
    EmpNetworkId: 'U21080273',
    EmpCode: 'U21080273',
    Email: 'shahidul@tbs.com',
    MobileNo: '01731111111',
    DepartmentName: 'Internal Compliance',
    DesignationName: 'Sr. Medical Business Executive',
  };

  return (
    
   <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Icon name="user" size={80}   color="#3498db"/>
      </View>

      <View style={styles.profileHeader} >
        <Text style={styles.profileName} selectable={true}>{userDetails.FullName}</Text>
        <Text style={styles.profileSubtitle}selectable={true}>{userDetails.DesignationName}</Text>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.detailLabel} selectable={true}>Employee ID</Text>
        <Text style={styles.detailValue} selectable={true}>{userDetails.EmpCode}</Text>

        <Text style={styles.detailLabel} selectable={true}>Email</Text>
        <Text style={styles.detailValue} selectable={true}>{userDetails.Email}</Text>

        <Text style={styles.detailLabel}selectable={true}>Mobile No</Text>
        <Text style={styles.detailValue}selectable={true}>{userDetails.MobileNo}</Text>

        <Text style={styles.detailLabel}selectable={true}>Department</Text>
        <Text style={styles.detailValue}selectable={true}>{userDetails.DepartmentName}</Text>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#3498db',
  },
  profileIcon: {
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: '#3498db',

  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileName: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 5,
    fontWeight: "700",
    fontFamily: 'Roboto-bold',
    color:blackColor
    // color: '#fff',
  },
  profileSubtitle: {
    fontSize: 16,
    color:blackColor

    // color: '#fff',
  },
  profileDetails: {
    marginTop: 20,
    
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:blackColor

    // color: '#fff',
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 15,
    color:blackColor

    // color: '#fff',
  },
});

export default ProfilePage;
 