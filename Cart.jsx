import { Image, StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { StyleContext } from './App';
import { calculateTotalAmount, serviceTypes } from './APIs';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
// import { Alert, VStack, HStack, IconButton, Box, Center, CloseIcon } from "native-base";

const Cart = ({ route }) => {
  const navigation = useNavigation();
  const { postServiceRequestDetails, postUserlat, postUserLong, getPageName, postUserLog } = useContext(StyleContext);
  const [totalAmount, setTotalAmount] = useState();
  const [amountRelatedData, setAmountRelatedData] = useState();
  const [problems, setProblems] = useState();
  const [showServiceTypes, setShowServiceTypes] = useState(false);
  const [routedData, setRoutedData] = useState();

  useEffect(() => {
    if (route.params) {
      setRoutedData(route.params.acceptedMDetails);
    }
  }, [route.params])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setShowServiceTypes(false)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  // console.log("route_params_acceptedMDetails:", route.params.acceptedMDetails.service_types[0].status);

  //Total amount checkkk.........................
  useEffect(() => {
    if (routedData) {
      axios.get(`${calculateTotalAmount}${routedData._id}`, {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          // console.log("total ammount:", route.params.acceptedMDetails);
          setAmountRelatedData(res.data.data[0])
          setTotalAmount(res.data.data[0].total_amount);
        })
        .catch((error) => console.log("error in total amount :", error))
    }
  }, [routedData])

  //Go to Invoice Page......................................................
  const goToInvoicePage = () => {
    if (amountRelatedData && routedData.service_types[0].status === "completed") {
      navigation.navigate("InvoicePage", { totalAmountData: amountRelatedData, acceptedMDetailss: routedData })
    } else {
      Alert.alert("Your survice is not Completed")
    }
  }

  //Making an array with your serviceTypes..................................
  useEffect(() => {
    axios.get(serviceTypes)
      .then((res) => {
        setProblems(res.data.data.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1)))
      })
      .catch((err) => console.log("error :", err));
  }, []);

  if (routedData) {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity style={styles.headerView} onPress={() => setShowServiceTypes(!showServiceTypes)}>
            <Text style={styles.headerTxt}>View Service Charge List</Text>
            {showServiceTypes ? <Entypo size={30} name='chevron-small-up' style={styles.headerIcon} /> : <Entypo size={30} name='chevron-small-down' style={styles.headerIcon} />}
          </TouchableOpacity>
          {showServiceTypes ?
            <View style={styles.chartsStyleMainView} onStartShouldSetResponder={() => setShowServiceTypes(false)}>
              <View style={styles.chartsStyle}>
                {problems ? problems.map((item, index) => (<Text key={index} style={styles.chartsTextStyle}>{item}</Text>)) : null}
              </View>
            </View> : null}
          <View style={styles.totalBalanceView}>
            <Text style={styles.totalBalanceTxt}>Total Balance</Text>
            <View style={styles.totalBalanceNumberView}>
              <LinearGradient colors={["#313335", "#646668"]} style={{ borderRadius: 10 }}>
                <Text style={styles.totalBalanceFirstNumber}>{totalAmount}</Text>
              </LinearGradient>
              <Text style={styles.totalBalanceDot}>.</Text>
              <LinearGradient colors={["#313335", "#646668"]} style={{ borderRadius: 10 }}>
                <Text style={styles.totalBalanceFirstNumber}>00</Text>
              </LinearGradient>
              <Fontisto name='inr' size={12} style={styles.inrIcon} />
            </View>
          </View>
          <Text style={styles.serviceChargeHeading}>Service Charge</Text>
          {routedData.service_types[0].status === "active" ?
            (<View style={styles.flatTierMainView}>
              <View style={styles.flatTierChildContainer}>
                <View style={styles.flatTierTitlePriceView}>
                  <Text style={styles.flatTierTxt}>{routedData.service_types[0].service_name.charAt(0).toUpperCase() + routedData.service_types[0].service_name.slice(1)}</Text>
                  <View style={styles.flatTierPriceView}>
                    <Text style={styles.price}>{routedData.service_types[0].price}</Text>
                    <Fontisto name='inr' size={12} style={[styles.price, { fontSize: 11 }]} />
                  </View>
                </View>
                <FontAwesome name='pause' size={15} style={styles.pauseIcon} />
              </View>
              <View style={styles.bill_Hours_min_secView}>
                <View style={{}}>
                  <Text style={styles.billTxt}>Bill</Text>
                  <View style={styles.billView}>
                    <Text style={styles.billFirstPrice}>{routedData.service_types[0].price}</Text>
                  </View>
                </View>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.hrView}>
                <Text style={styles.billHourTxt}>Hours</Text>
                <View style={styles.timrAndDoubleDotView}>
                  <Text style={styles.billHour}>01</Text>
                  <Text style={styles.doubleDot}>:</Text>
                </View>
              </View>
              <View>
                <Text style={styles.billHourTxt}>Minutes</Text>
                <View style={styles.timrAndDoubleDotView}>
                  <Text style={styles.billHour}>34</Text>
                  <Text style={styles.doubleDot}>:</Text>
                </View>
              </View>
              <View>
                <Text style={styles.billHourTxt}>Seconds</Text>
                <Text style={styles.billHour}>13</Text>
              </View>
            </View> */}
              </View>
            </View>) :
            routedData.service_types[0].status === "completed" ?
              (<View style={styles.lowFuelMainView}>
                <View style={styles.imgTxtView}>
                  <View style={{ padding: 9, backgroundColor: "#E0E6ED", borderRadius: 14, }}>
                    <Image source={require("./assets/gas-pump1(traced).png")} style={styles.fuelImg} />
                  </View>
                  <View style={styles.lowFuelView}>
                    <Text style={styles.lowFuelTxt}>{routedData.service_types[0].service_name.charAt(0).toUpperCase() + routedData.service_types[0].service_name.slice(1)}</Text>
                    <View style={styles.lowFuelPriceIconView}>
                      <Text style={styles.lowFuelPriceTxt}>{routedData.service_types[0].price}</Text>
                      <FontAwesome name='inr' style={[styles.lowFuelPriceTxt, { fontSize: 14 }]} />
                      <Text style={styles.lowFuelPriceTxt}>Fix price</Text>
                    </View>
                  </View>
                </View>
                <Image source={require('./assets/Vector.png')} style={{ marginRight: 11 }} />
              </View>)
              : null
          }
        </View>
        <View style={styles.footerView}>
          <View style={styles.totalPriceView}>
            <Text style={styles.totalPriceTxt}>Total</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
              <Text style={styles.totalPrice}>{totalAmount}</Text>
              <FontAwesome name='inr' style={styles.totalPrice} />
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            goToInvoicePage();
          }}>
            <View style={styles.checkOutBtnView}>
              <Text></Text>
              <Text style={styles.checkOutBtnTxt}>Checkout</Text>
              <AntDesign name='right' style={styles.checkOutBtnIcon} size={26} />
            </View>
          </TouchableOpacity>
        </View>
      </View >
    )
  } else {
    return (
      <Loading />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%"
  },
  mainContainer: {
    padding: 16,
    flexDirection: "column",
  },
  headerView: {
    // borderWidth:1,
    marginBottom: 23,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 19,
    backgroundColor: "#FFFFFF",
    borderRadius: 45,
    elevation: 9,
  },
  headerTxt: {
    // borderWidth:1
    color: "#3D4759",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
    fontFamily: "Forza-Bold",
  },
  headerIcon: {
    // borderWidth:1
    backgroundColor: "#FFA514",
    borderRadius: 90,
    color: "black"
  },
  chartsStyleMainView: {
    // borderColor: "red",
    // borderWidth: 1,
    top: "18%",
    position: "absolute",
    width: "100%",
    height: "130%",
    alignSelf: "center",
    zIndex: 6,
  },
  chartsStyle: {
    borderWidth: 1,
    borderColor: "#E0EAEF",
    // position: "absolute",
    padding: 20,
    // zIndex: 6,
    // top: "18%",
    // width: "80%",
    // height: "29%",
    // alignSelf: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2
  },
  chartsTextStyle: {
    fontFamily: "Forza-Bold",
    fontSize: 19,
    color: "#3D4759",
  },
  totalBalanceView: {
    marginBottom: 23,
    flexDirection: "column",
    backgroundColor: "#FFCD7D",
    borderRadius: 15,
    padding: 19,
  },
  totalBalanceTxt: {
    // borderWidth: 1
    color: "#3D4759",
    fontWeight: "600",
    letterSpacing: 0.5,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Forza-Bold",
  },
  totalBalanceNumberView: {
    // borderWidth:1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  totalBalanceFirstNumber: {
    // borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: "white",
    fontSize: 42,
    fontWeight: "500",
    borderRadius: 15
  },
  totalBalanceDot: {
    backgroundColor: "black",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  inrIcon: {
    color: "white",
    fontSize: 50,
    alignSelf: "center"
  },
  serviceChargeHeading: {
    marginBottom: 23,
    color: "#3D4759",
    // fontWeight: "700",
    fontSize: 26,
    fontFamily: "Forza-Black",
  },
  flatTierMainView: {
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "#EFF1F6",
    padding: 19,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: "#FFFFFF"
  },
  flatTierChildContainer: {
    // borderWidth:1,
    marginBottom: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flatTierTitlePriceView: {
    // borderWidth:1
  },
  flatTierPriceView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  price: {
    color: "#FFA514",
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "Forza-Bold"
  },
  flatTierTxt: {
    color: "#505056",
    fontWeight: "600",
    fontSize: 24,
    letterSpacing: 1,
    fontFamily: "Forza-Bold",
  },
  pauseIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // borderWidth:1,
    color: "white",
    padding: 17,
    textAlign: "center",
    backgroundColor: "#007AFF"
  },
  bill_Hours_min_secView: {
    // borderWidth:1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  billTxt: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Forza-Bold",
  },
  billView: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4
  },
  billFirstPrice: {
    color: "#3D4759",
    backgroundColor: "#FFA514",
    borderRadius: 5,
    fontFamily: "Forza-Bold",
    fontSize: 22,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  hrView: {
    flexDirection: "column",
    alignItems: "center"
  },
  billHourTxt: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Forza-Bold",
  },
  timrAndDoubleDotView: {
    flexDirection: "row",
    alignItems: "center"
  },
  billHour: {
    backgroundColor: "black",
    borderRadius: 5,
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 22,
    paddingHorizontal: 11,
    paddingVertical: 2
  },
  doubleDot: {
    // borderWidth: 1,
    color: "black",
    padding: 4,
    fontSize: 30
  },
  lowFuelMainView: {
    borderWidth: 1,
    borderColor: "#EFF1F6",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignItems: "center",
    padding: 4,
    elevation: 11,
  },
  imgTxtView: {
    flexDirection: "row",
  },
  fuelImg: {
    // backgroundColor:"#E0E6ED",
    height: 60,
    width: 60,
  },
  lowFuelView: {
    // borderWidth: 1,
    justifyContent: "center",
    padding: 12,
  },
  lowFuelTxt: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Forza-Bold",
  },
  lowFuelPriceIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 3
  },
  lowFuelPriceTxt: {
    color: "#FFA514",
    fontSize: 17,
    fontWeight: "700",
  },
  footerView: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%",
    borderTopWidth: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderColor: "#EBEBEB",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 15,
    gap: 9,
    backgroundColor: "#FFFFFF"
  },
  totalPriceView: {

  },
  totalPriceTxt: {
    color: "black",
    fontSize: 18,
    fontFamily: "Forza-Bold"
  },
  totalPrice: {
    color: "black",
    fontSize: 24,
    fontFamily: "Forza-Bold"
  },
  checkOutBtnView: {
    backgroundColor: "#007AFF",
    borderRadius: 33,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 29,
    width: 229,
    height: 70,
  },
  checkOutBtnTxt: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Forza-Bold",
  },
  checkOutBtnIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    color: "black",
    padding: 17
  }
})
export default Cart