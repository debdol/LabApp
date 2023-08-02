import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
const Cart = () => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>View Service Charge List</Text>
          <Entypo size={30} name='chevron-small-down' style={styles.headerIcon} />
        </View>
        <View style={styles.totalBalanceView}>
          <Text style={styles.totalBalanceTxt}>Total Balance</Text>
          <View style={styles.totalBalanceNumberView}>
            <LinearGradient colors={["#313335", "#646668"]}>
              <Text style={styles.totalBalanceFirstNumber}>1,565</Text>
            </LinearGradient>
            <Text style={styles.totalBalanceDot}>.</Text>
            <LinearGradient colors={["#313335", "#646668"]}>
              <Text style={styles.totalBalanceFirstNumber}>35</Text>
            </LinearGradient>
            <Fontisto name='inr' size={12} style={styles.inrIcon} />
          </View>
        </View>
        <Text style={styles.serviceChargeHeading}>Service Charge</Text>
        <View style={styles.flatTierMainView}>
          <View style={styles.flatTierChildContainer}>
            <View style={styles.flatTierTitlePriceView}>
              <Text style={styles.flatTierTxt}>Flat Tier</Text>
              <View style={styles.flatTierPriceView}>
                <Text style={styles.price}>150</Text>
                <Fontisto name='inr' size={12} style={[styles.price,{fontSize:11}]} />
                <Text style={styles.price}>/hr</Text>
              </View>
            </View>
            <FontAwesome name='pause' size={15} style={styles.pauseIcon} />
          </View>
          <View style={styles.bill_Hours_min_secView}>
            <View style={{}}>
              <Text style={styles.billTxt}>Bill</Text>
              <View style={styles.billView}>
                <Text style={styles.billFirstPrice}>570</Text>
                <Text style={styles.billDot}>.</Text>
                <Text style={styles.billFirstPrice}>34</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            </View>
          </View>
        </View>
        <View style={styles.lowFuelMainView}>
          <View style={styles.imgTxtView}>
            <View style={{ padding: 9, backgroundColor: "#E0E6ED", borderRadius: 14, }}>
              <Image source={require("./assets/gas-pump1(traced).png")} style={styles.fuelImg} />
            </View>
            <View style={styles.lowFuelView}>
              <Text style={styles.lowFuelTxt}>Low Fuel</Text>
              <View style={styles.lowFuelPriceIconView}>
                <Text style={styles.lowFuelPriceTxt}>150</Text>
                <FontAwesome name='inr' style={[styles.lowFuelPriceTxt,{fontSize:14}]} />
                <Text style={styles.lowFuelPriceTxt}>Fix price</Text>
              </View>
            </View>
          </View>
          <Image source={require('./assets/Vector.png')} style={{ marginRight: 11 }} />
        </View>
      </View>
      <View style={styles.footerView}>
        <View style={styles.totalPriceView}>
          <Text style={styles.totalPriceTxt}>Total</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Text style={styles.totalPrice}>1,565.35</Text>
            <FontAwesome name='inr' style={styles.totalPrice} />
          </View>
        </View>
        <View style={styles.checkOutBtnView}>
          <Text style={styles.checkOutBtnTxt}>Checkout</Text>
          <AntDesign name='right' style={styles.checkOutBtnIcon} size={26} />
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flexDirection: "column",
  },
  headerView: {
    // borderWidth:1,
    marginBottom:23,
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
    fontFamily:"Forza-Bold",
  },
  headerIcon: {
    // borderWidth:1
    backgroundColor: "#FFA514",
    borderRadius: 90,
    color: "black"
  },
  totalBalanceView: {
    marginBottom:23,
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
    fontFamily:"Forza-Bold",
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
    marginBottom:23,
    color: "#3D4759",
    // fontWeight: "700",
    fontSize: 26,
    fontFamily:"Forza-Black",
  },
  flatTierMainView: {
    marginBottom:23,
    borderWidth: 1,
    borderColor: "#EFF1F6",
    padding: 19,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: "#FFFFFF"
  },
  flatTierChildContainer: {
    // borderWidth:1,
    marginBottom:9,
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
  },
  price: {
    color: "#FFA514",
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: "600"
  },
  flatTierTxt: {
    color: "#505056",
    fontWeight: "600",
    fontSize: 24,
    letterSpacing: 1,
    fontFamily:"Forza-Bold",
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
    fontFamily:"Forza-Bold",
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
    fontWeight: "500",
    fontSize: 22,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  billDot: {
    backgroundColor: "black",
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  hrView: {
    flexDirection: "column",
    alignItems: "center"
  },
  billHourTxt: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    fontFamily:"Forza-Bold",
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
    fontFamily:"Forza-Bold",
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
    borderTopWidth: 1,
    borderTopLeftRadius:22,
    borderTopRightRadius:22,
    borderColor: "#EBEBEB",
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingVertical: 15,
    gap:9,
    // padding:19,
    backgroundColor: "#FFFFFF"
  },
  totalPriceView: {

  },
  totalPriceTxt: {
    color: "black",
    fontSize: 18,
    fontWeight: "600"
  },
  totalPrice: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
  },
  checkOutBtnView: {
    backgroundColor: "#007AFF",
    borderRadius: 33,
    flexDirection: "row",
    gap: 45,
    alignItems: "center",
    width: 229,
    height: 70,
  },
  checkOutBtnTxt: {
    color: "#FFFFFF",
    fontSize:18 ,
    marginLeft: 34,
    fontFamily:"Forza-Bold",
  },
  checkOutBtnIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    color: "black",
    padding: 17
  }
})
export default Cart