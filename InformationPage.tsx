import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';
import { StyleContext } from './App';
import axios from 'axios';
const InformationPage = () => {
  const { postUserCars, postUserLog, postUserlat, postUserLong, getServiceRequestDetails, getUserService } = useContext(StyleContext);

  const navigation = useNavigation();
  const [checkBtn, setCheckBtn] = useState(true);
  const [ureMsg, setUreMsg] = useState();
  const [serviceCode, setServiceCode] = useState();
  const [problems, setProblems] = useState([]);


  useEffect(() => {
    axios.get("http://43.204.88.205:90/service-types")
      .then((res) => {
        // console.log("resPonce of service :", problems);
        setProblems(res.data.data.map((item: any) => item.name))
      })
      .catch((err) => console.log("error :", err))
  }, [])
  const multipleLocation = () => {
    // console.log(postUserLong);
    const serviceData = {
      car_manufacturer: "alto",
      car_model: postUserCars[0].car_model,
      car_number: postUserCars[0].car_number,
      latitude: postUserlat,
      longitude: postUserLong,
      message: ureMsg,
      service_type_code: [serviceCode],
    }
    // axios.post("http://43.204.88.205:90/create-service-request", serviceData, {
    //   headers: {
    //     'Authorization': `Bearer ${postUserLog}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then((res) => {
    //     console.log("res in create service :", res.data.mechanics)
    //   })
    //   .catch((err) => console.log("err in create service :", err));
    if (serviceData.message) {
      navigation.navigate("Mechanicsss");
      axios.get("http://43.204.88.205:90/open-service-request-details", {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          // console.log("responce in requestdetails :", res.data.data[0].mechanic);
          getServiceRequestDetails(res.data.data[0].mechanic)
        })
        .catch((err) => console.log("error in requestdetails :", err))
    };
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingHorizontal: 19 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.headingQuestion}>Answer a few Question To Get The Best Mechanic For Your Need</Text>
        <View style={{ marginTop: 39 }}>
          <Text style={[styles.headingQuestion, { fontSize: 22, marginBottom: 18 }]}>Which car would you like to repair?</Text>
          <View style={styles.whichCarMainView}>
            <View style={styles.whichCarFirstSections}>
              <View style={styles.carIconNameView}>
                <View style={styles.carIconDiv}>
                  <Image source={require("./assets/CarIcon.png")} style={styles.carIcon} />
                </View>
                <View style={styles.carNameNumberView}>
                  <Text style={styles.carName}>Car Model: {postUserCars[0].car_model}</Text>
                  <Text style={styles.carName}>No: {postUserCars[0].car_number}</Text>
                </View>
              </View>
              <BouncyCheckbox
                style={styles.checkBox}
                size={25}
                fillColor="#007AFF"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                disableBuiltInState
                isChecked={checkBtn}
              // onPress={() => { console.log(checkBtn) ;setCheckBtn(!checkBtn)}}
              />
            </View>
            <View style={styles.addNewCarMainContainer}>
              <View style={[styles.whichCarFirstSections, { borderBottomWidth: 0 }]}>
                <View style={styles.carIconNameView}>
                  <Fontisto name='car' size={33} style={[styles.carIconDiv, styles.carIcon]} />
                  <Text style={styles.carName}>Add new car</Text>
                </View>
                <BouncyCheckbox
                  style={styles.checkBox}
                  size={25}
                  fillColor="#007AFF"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "red" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  disableBuiltInState
                  isChecked={false}
                // onPress={() => { console.log(checkBtn); setCheckBtn(!checkBtn) }}
                />
              </View>
              {/* <View style={styles.selectionView}>
                <View style={styles.SelectManufacturerView}>
                  <Text style={styles.SelectManufacturerTxt}>Select Manufacturer</Text>
                  <AntDesign name='down' size={20} style={styles.downIcon} />
                </View>
                <View style={styles.SelectManufacturerView}>
                  <Text style={styles.SelectManufacturerTxt}>Select Car Model</Text>
                  <AntDesign name='down' size={20} style={styles.downIcon} />
                </View>
                <View style={styles.SelectManufacturerView}>
                  <Text style={styles.SelectManufacturerTxt}>Select Car Number</Text>
                  <AntDesign name='down' size={20} style={styles.downIcon} />
                </View>
              </View> */}
            </View>
          </View>
        </View>

        <View style={styles.footerSectionMainView}>
          <Text style={styles.ChooseUrServiceTxt}>Choose your service</Text>
          <SelectDropdown
            data={problems}
            onSelect={(selectedItem, index) => {
              // console.log("selected :", selectedItem);
              getUserService(selectedItem);

              axios.get("http://43.204.88.205:90/service-types")
                .then((res) => {
                  // console.log(res.data.data);
                  if (selectedItem === problems[index]) {
                    setServiceCode(res.data.data[index].service_code);
                    // console.log("service code :", res.data.data[index].service_code);
                  }
                })
                .catch((err) => console.log(err))
            }}

            defaultButtonText={'choose your service'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return (
                // console.log("index :", index),
                selectedItem
              )
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <Entypo name={isOpened ? 'chevron-up' : 'chevron-down'} size={18} style={styles.BMWIconYellow} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <Text style={styles.whatsWrong}>What is wrong with the vehicle?</Text>
          <TextInput placeholder='Write your message' style={styles.footerInput} onChangeText={(e: any) => setUreMsg(e)} />
        </View>
        <TouchableOpacity style={styles.searchMehcanicsBtn} onPress={() => multipleLocation()}>
          <Text style={styles.searchMehcanicsBtnTxt}>Search Mechanics</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headingQuestion: {
    color: "#3D4759",
    fontFamily: "Forza-Black",
    fontSize: 25,
    alignSelf: "center",
    // marginBottom:40,
    marginTop: 14

  },
  whichCarMainView: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    padding: 9
  },
  addNewCarMainContainer: {
    // borderWidth:1,
    marginTop: 10
  },
  whichCarFirstSections: {
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  carIconNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11
  },
  carIcon: {
    color: "#000000",
    padding: 9
  },
  carIconDiv: {
    alignItems: "center",
    padding: 11,
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25
  },
  carNameNumberView: {
    // borderWidth:1
    flexDirection: "column"
  },
  carName: {
    color: "#505056",
    fontFamily: "Forza-Bold",
    fontSize: 15
  },
  checkBox: {
    // borderWidth: 1,
  },
  selectionView: {
    flexDirection: "column",
    paddingHorizontal: 33
  },
  SelectManufacturerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    // borderWidth:1,
    alignItems: "center"
  },
  SelectManufacturerTxt: {
    color: "#505056",
    fontWeight: "700",
    fontSize: 19,
    letterSpacing: 0.5
  },
  downIcon: {
    color: "black"
  },
  footerSectionMainView: {
    height: 330,
    marginTop: 9,
    // borderWidth: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  ChooseUrServiceTxt: {
    color: "#3D4759",
    fontSize: 22,
    fontFamily: "Forza-Black",
  },
  flatTierMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 55,
    elevation: 4,
    shadowRadius: 60,
    height: 65,
    padding: 19,
  },
  wheelIconTxtView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  wheelIcon: {
    color: "#FFA514"
  },
  flatTierTxt: {
    color: "black",
  },
  BMWIconYellow: {
    width: 30,
    height: 30,
    backgroundColor: "#FFA514",
    borderRadius: 15,
    color: "black",
    verticalAlign: "middle",
    textAlign: "center",
    position: "absolute",
    right: "90%",
    top: 10
  },
  whatsWrong: {
    color: "#3D4759",
    fontFamily: "Forza-Black",
    fontSize: 20
  },
  footerInput: {
    height: 137,
    width: 353,
    backgroundColor: "#EAEEF2",
    borderRadius: 20,
    textAlignVertical: "top",
    fontFamily: "Forza-Bold",
    fontSize: 16,
    color: "black",
  },
  searchMehcanicsBtn: {
    backgroundColor: "#007AFF",
    width: 353,
    height: 64,
    borderRadius: 44,
    // marginTop: 19,
    marginBottom: 19
  },
  searchMehcanicsBtnTxt: {
    color: "white",
    textAlign: "center",
    padding: 18,
    fontFamily: "Forza-Bold",
    fontSize: 20
  },
  dropdown1BtnStyle: {
    width: '90%',
    alignSelf: "center",
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    elevation: 6,
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', borderRadius: 16 },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontFamily: "Forza-Bold" },
})
export default InformationPage;