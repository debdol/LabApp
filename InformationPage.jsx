import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
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
import { creatServiceRequest, openServiceRequestDetails, serviceTypes } from './APIs';
import Loading from './Loading';

const InformationPage = () => {
  const { postUserCars, postUserLog, postUserlat, postUserLong, getServiceRequestDetails, getUserService, postUserService } = useContext(StyleContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [checkBtn, setCheckBtn] = useState(true);
  const [ureMsg, setUreMsg] = useState();
  const [serviceCode, setServiceCode] = useState();
  const [problems, setProblems] = useState([]);
  const [serviceRequestData, setServiceRequestData] = useState();

  useEffect(() => {
    axios.get(serviceTypes)
      .then((res) => {
        console.log("response_check_sertypes_API:", res.data)
      })
      .catch((err) => console.log("error_check_sertypes_API:", err))
  }, [])

  // Function for Creating Service Request..............................
  const searchMechanics = () => {
    const serviceData = {
      car_manufacturer: "alto",
      car_model: postUserCars[0].car_model,
      car_number: postUserCars[0].car_number,
      latitude: postUserlat,
      longitude: postUserLong,
      message: ureMsg ? ureMsg : ' ',
      service_type_code: [serviceCode],
    }

    //Creating  your service request.....................................
    if (postUserService && serviceCode) {
      navigation.navigate("Mechanicsss");
      // console.log("token : ",postUserLog);
      axios.post(creatServiceRequest, serviceData, {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.data) {
            // console.log('response in create request create API :', res.data);
            setServiceRequestData(true);
          } else {
            setModalVisible(true);
          }
        })
        .catch((err) => console.log("error in create service :", err));
    } else {
      Alert.alert("plz,fill up the neccessary field or you have not got service types ");
    }
  }

  //Get your service request data...........................................
  useEffect(() => {
    if (serviceRequestData) {
      axios.get(openServiceRequestDetails, {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          // console.log("res_in_requestdetails_in_informationPage:", res.data.data[0])
          // navigation.navigate("Mechanicsss");
          setServiceRequestData(false);
          getServiceRequestDetails(res.data.data);
        })
        .catch((err) => console.log("error in requestdetails :", err))
    };
  }, [serviceRequestData]);


  //making an array with your serviceTypes..................................
  useEffect(() => {
    axios.get(serviceTypes)
      .then((res) => {
        setProblems(res.data.data.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1)))
        // console.log("data is comming late in information page:", res.data)
      })
      .catch((err) => console.log("error :", err));
  }, []);

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
            <TouchableOpacity activeOpacity={1}>
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
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerSectionMainView}>
          <Text style={styles.ChooseUrServiceTxt}>Choose your service</Text>
          {problems.length != 0 ? <SelectDropdown
            data={problems}
            onSelect={(selectedItem, index) => {
              console.log("selectedItem :", selectedItem);
              getUserService(selectedItem);
              axios.get(serviceTypes)
                .then((res) => {
                  // console.log("check_service_type_code_response:", res.data)
                  if (selectedItem === problems[index] && res.data.data[index].service_code) {

                    // problem is in bellow API
                    setServiceCode(res.data.data[index].service_code);
                    console.log("service_type_code :", res.data.data[index].service_code);
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
          /> : <Text style={[styles.dropdown1BtnStyle, { fontFamily: "Forza-Bold", color: "#000000", textAlign: "center", textAlignVertical: "center" }]}>you may not have your data so pls wait</Text>}
          <Text style={styles.whatsWrong}>What is wrong with the vehicle?</Text>
          <TextInput placeholder='Write your message......' style={styles.footerInput} onChangeText={e => setUreMsg(e)} />
        </View>
        <TouchableOpacity style={styles.searchMehcanicsBtn} onPress={() => {
          searchMechanics();
          // setOpenServiceRequestDetailsController('false')
        }}>
          <Text style={styles.searchMehcanicsBtnTxt}>Search Mechanics</Text>
        </TouchableOpacity>
        {/* Showing service Request Status ...................... */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}> heyyy!!! your service request has created</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Exit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
    padding: 15,
    height: 137,
    width: "100%",
    backgroundColor: "#EAEEF2",
    borderRadius: 20,
    textAlignVertical: "top",
    fontFamily: "Forza-Bold",
    fontSize: 16,
    alignSelf: "center",
    color: "#000000",
  },
  searchMehcanicsBtn: {
    backgroundColor: "#007AFF",
    width: "100%",
    height: 64,
    alignSelf: "center",
    borderRadius: 44,
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
  //modal style..........................
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: "black",
    fontFamily: "Forza-Bold",
    fontSize: 16
  },
})
export default InformationPage;