import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePage = () => {

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
        <Icon name="user" size={40}  />
      </View>

      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{profileData.FullName}</Text>
        <Text style={styles.profileSubtitle}>{profileData.DesignationName}</Text>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.detailLabel}>Employee ID:</Text>
        <Text style={styles.detailValue}>{profileData.EmpCode}</Text>

        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailValue}>{profileData.Email}</Text>

        <Text style={styles.detailLabel}>Mobile No:</Text>
        <Text style={styles.detailValue}>{profileData.MobileNo}</Text>

        <Text style={styles.detailLabel}>Department:</Text>
        <Text style={styles.detailValue}>{profileData.DepartmentName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3498db',
  },
  profileIcon: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    // color: '#fff',
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  profileDetails: {
    marginTop: 20,
    
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 15,
    color: '#fff',
  },
});

export default ProfilePage;
