import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StyleContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LoginMain from './LogInMain';
import axios from 'axios';
import { updateProfilePic } from './APIs';


const Profile = () => {
  const navigation = useNavigation();
  const { getMainPage, getPageName, postUserName, postUserNumber, postUserAddress, postUserEmail, postUserCarModel, postUserCarNumber, getUserImage, postUserLog } = useContext(StyleContext);
  const [imagPath, setImagPath] = useState();
  // console.log("tpken :", postUserLog);
  const logOutHandler = async () => {
    await AsyncStorage.removeItem("User_Token");
    getMainPage(<LoginMain />);
    getPageName("Home");
  }

  const picPicker = () => {
    let options = {
      storageOptions: {
        path: "image"
      }
    }
    launchImageLibrary(options, response => {
      if (response.assets) {
        const path = response.assets[0].fileName;
        const type = response.assets[0].type;
        const data = new FormData();
        data.append('profile_picture', path)
        data.append('type', type)
        // const data = `profile_picture=@${path};type=${type}`;
        console.log("user Profile pic :", data);

        axios.put(updateProfilePic, data, {
          headers: {
            'Authorization': `Bearer ${postUserLog}`,
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((res) => console.log("responce in image :", res))
          .catch((error) => console.log("error in image :", error));
        setImagPath(response.assets[0].uri);
        getUserImage(response.assets[0].uri);
      }
    })
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Profile</Text>

        {imagPath ? (<ImageBackground style={styles.imgAndCameraView} source={{ uri: imagPath }} imageStyle={{ borderRadius: 50 }}>
          <AntDesign name='camera' size={20} style={styles.cameraStyle} onPress={picPicker} />
        </ImageBackground>) : (<View style={styles.picLessCameraStyleView}>
          <Image source={require("./assets/profileAvtar.png")} style={styles.profileAvtar} />
          <AntDesign name='camera' size={20} style={styles.picLessCameraStyle} onPress={picPicker} />
        </View>)}

        <View style={styles.editProfileIconTxtView}>
          <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate("EditProfile")}>
            <FontAwesome name='edit' size={22} style={styles.editProfileIcon} />
          </TouchableOpacity>
          <Text style={styles.editProfileBtnTxt}>Edit Profile</Text>
        </View>

        <View style={styles.nameAndOtherTxtView}>
          <Text style={styles.name}>{postUserName}</Text>
        </View>
        <Text style={styles.middleBorder}></Text>
        <View style={styles.thirdSectionView}>
          <View style={styles.hireMechanicsMainView}>
            <View style={styles.hireMechanicsChildView}>
              <FontAwesome5 name='tools' style={styles.rangeImg} size={20} />
              <Text style={styles.rangeTxt}>50+</Text>
            </View>
            <Text style={styles.hireMechanicsTxt}>Hire mechanics</Text>
          </View>
          <View style={styles.ratingsMainView}>
            <View style={styles.ratingsChildView}>
              <Image source={require("./assets/Star.png")} style={styles.fiveStarImg} />
              <Text style={styles.ratingNumber}>8.0</Text>
            </View>
            <Text style={styles.ratingTxt}>Rating</Text>
          </View>
        </View>

        <View style={styles.fourthSectionView}>
          <Text style={styles.fourthSectionHeaderTxt}>My Info</Text>
          <View style={styles.fourthSectionPhonMainView}>
            <View style={styles.fourthSectionPhonChildView}>
              <Feather name='phone-call' style={styles.phoneIcon} size={22} />
              <Text style={styles.phoneTxt}>Phone</Text>
            </View>
            <Text style={styles.phoneNumber}>{postUserNumber}</Text>
          </View>
          <View style={styles.fourthSectionPhonMainView}>
            <View style={styles.fourthSectionPhonChildView}>
              <Feather name='mail' style={styles.phoneIcon} size={22} />
              <Text style={styles.phoneTxt}>Email</Text>
            </View>
            <Text style={styles.phoneNumber}>{postUserEmail}</Text>
          </View>
          <View style={[styles.fourthSectionPhonMainView, { borderBottomWidth: 0 }]}>
            <View style={styles.fourthSectionPhonChildView}>
              <EvilIcons name='location' style={styles.phoneIcon} size={22} />
              <Text style={styles.phoneTxt}>Address</Text>
            </View>
            <Text style={styles.phoneNumber}>{postUserAddress}</Text>
          </View>
        </View>

        <View style={[styles.fourthSectionView, { height: 200 }]}>
          <Text style={styles.fourthSectionHeaderTxt}>Vehicle</Text>
          <View style={styles.BrandBMWMainView}>
            <View style={styles.brandView}>
              <FontAwesome5 name='car-side' style={styles.brandImg} size={22} />
              <Text style={styles.brandTxt}>Model</Text>
            </View>
            <Text style={styles.modelTxt}>{postUserCarModel}</Text>
          </View>
          <View style={[styles.BrandBMWMainView, { borderBottomColor: "white" }]}>
            <View style={styles.brandView}>
              <FontAwesome5 name='car-side' style={styles.brandImg} size={22} />
              <Text style={styles.brandTxt}>VIN</Text>
            </View>
            <Text style={styles.modelTxt}>{postUserCarNumber}</Text>
          </View>
        </View>

        <View style={styles.lastSectionView}>
          <View style={styles.myWalletMainView}>
            <View style={styles.myWalletAndIconView}>
              <Entypo name='wallet' size={20} style={styles.MyWalletIcon} />
              <Text style={styles.MyWalletTxt}>My Wallet</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.rightIcon} />
          </View>

          <View style={styles.myWalletMainView}>
            <View style={styles.myWalletAndIconView}>
              <Octicons name='tools' size={20} style={styles.MyWalletIcon} />
              <Text style={styles.MyWalletTxt}>Mechanics services</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.rightIcon} />
          </View>

          <View style={styles.myWalletMainView}>
            <View style={styles.myWalletAndIconView}>
              <Feather name='shopping-bag' size={20} style={styles.MyWalletIcon} />
              <Text style={styles.MyWalletTxt}>Shop</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.rightIcon} />
          </View>

          <View style={styles.myWalletMainView}>
            <View style={styles.myWalletAndIconView}>
              <MaterialCommunityIcons name='order-bool-ascending-variant' size={20} style={styles.MyWalletIcon} />
              <Text style={styles.MyWalletTxt}>Order</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.rightIcon} />
          </View>

          <View style={styles.myWalletMainView}>
            <View style={styles.myWalletAndIconView}>
              <AntDesign name='heart' size={20} style={styles.MyWalletIcon} />
              <Text style={styles.MyWalletTxt}>Favourite</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.rightIcon} />
          </View>

        </View>
        <Image source={require("./assets/logo.png")} style={styles.footerLogo} />
        <TouchableOpacity style={styles.logOutBtn} onPress={logOutHandler}>
          <Text style={styles.logOutBtnTxt}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  mainView: {
    padding: 22,
  },
  heading: {
    color: '#3D4759',
    alignSelf: "center",
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "Forza-Bold",
  },
  imgAndCameraView: {
    // borderWidth:1,
    width: 100,
    height: 100,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15,
  },
  cameraStyle: {
    color: "#FFFFFF",
    backgroundColor: "#007AFF",
    borderRadius: 19,
    padding: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    top: 59,
    left: 40
  },
  picLessCameraStyleView: {
    alignSelf: "center",
    borderRadius: 50,
    borderColor: "#778899",
    marginBottom: 15,
    position: "relative"
  },
  profileAvtar: {
    height: 100,
    width: 100,
  },
  picLessCameraStyle: {
    borderColor: "#EEEEEE",
    borderWidth: 1.5,
    position: "absolute",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFFFFF",
    backgroundColor: "#007AFF",
    borderRadius: 15,
    top: 59,
    left: 60,
    width: 30,
    height: 30,
  },
  editProfileBtn: {
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  editProfileIconTxtView: {
    alignItems: "center",
    position: "absolute",
    right: 2,
    top: 55
  },
  editProfileIcon: {
    color: "white",
  },
  editProfileBtnTxt: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
  nameAndOtherTxtView: {
    alignItems: "center",
    marginBottom: 15
  },
  name: {
    color: "#3D4759",
    fontSize: 22,
    fontFamily: "Forza-Black",
  },
  middleBorder: {
    borderWidth: 0.5,
    borderColor: "#838B98",
    backgroundColor: "#838B98",
    width: 1.5,
    height: 25,
    alignSelf: "center",
    position: "absolute",
    top: 220
  },
  thirdSectionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    // borderWidth:1,
    width: "80%",
    alignSelf: "center"
  },
  hireMechanicsMainView: {
    // borderRightWidth:0.5
  },
  ratingsMainView: {
    alignItems: "center",
  },
  hireMechanicsChildView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  rangeImg: {
    color: "black"
  },
  rangeTxt: {
    color: "#3D4759",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Forza-Bold"
  },
  hireMechanicsTxt: {
    color: "#838B98",
    fontSize: 16
  },
  ratingsChildView: {
    // borderWidth:1,
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "center"
  },
  fiveStarImg: {

  },
  ratingNumber: {
    color: "#3D4759",
    fontSize: 20,
    fontFamily: "Forza-Bold"
  },
  ratingTxt: {
    color: "#838B98",
    fontWeight: "400",
    fontSize: 16
  },
  fourthSectionView: {
    padding: 19,
    backgroundColor: "#FFFFFF",
    width: 350,
    // height: 200,
    borderWidth: 1,
    borderColor: "#E0EAEF",
    alignSelf: "center",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 15
  },
  fourthSectionHeaderTxt: {
    color: "#3D4759",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Forza-Bold",
  },
  fourthSectionPhonMainView: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 12,
    padding: 9
  },
  fourthSectionPhonChildView: {
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  phoneIcon: {
    color: "black"
  },
  phoneTxt: {
    color: "#505056",
    fontWeight: "400",
    fontSize: 20,
    fontFamily: "Forza-Bold",
  },
  phoneNumber: {
    color: "#3D4759",
    fontWeight: "400",
    fontSize: 18,
  },
  BrandBMWMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 12
  },
  brandView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  brandImg: {
    color: "black"
  },
  brandTxt: {
    color: "#505056",
    fontWeight: "600",
    fontSize: 20,
    letterSpacing: 0.2,
    fontFamily: "Forza-Bold",
  },
  bmwLogoAndTxt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  bmwTxt: {
    color: "#3D4759",
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 0.2
  },
  modelTxt: {
    color: "#3D4759",
    fontWeight: "400",
    fontSize: 18
  },
  myWalletMainView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  myWalletAndIconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9
  },
  MyWalletIcon: {
    color: "black",
    height: 38,
    width: 40,
    backgroundColor: "#DEEAF7",
    padding: 6,
    borderRadius: 6,
    verticalAlign: "middle",
    textAlign: "center"
  },
  MyWalletTxt: {
    color: "#3D4759",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Forza-Bold",
  },
  rightIcon: {
    color: "black"
  },
  lastSectionView: {
    paddingHorizontal: 10,
    width: 368,
    height: 323,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 15
  },
  footerLogo: {
    height: 57,
    width: 271,
    alignSelf: "center",
    marginBottom: 15
  },
  logOutBtn: {
    backgroundColor: "#D5E1EE",
    borderRadius: 35,
    width: 344,
    height: 75,
    alignSelf: "center",
    // padding:9,
    justifyContent: "center",
    marginBottom: 33
  },
  logOutBtnTxt: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  }
})
export default Profile;