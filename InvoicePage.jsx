import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import sha256 from 'sha256';
const Buffer = require("buffer").Buffer;
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import axios from 'axios';

const InvoicePage = ({ route }) => {
    const { postUserLocationDetails, postUserLog, postUserName, postUserImage, postServiceRequestDetails } = useContext(StyleContext);
    const navigation = useNavigation();
    const [monthName, setMonthName] = useState();
    // console.log("{ route } :", route.params.acceptedMDetailss.requested_at.split("-")[2].split(" ")[0], route.params.acceptedMDetailss.requested_at.split("-")[1], route.params.acceptedMDetailss.requested_at.split("-"));
    // console.log("{ route } :", postUserLog)


    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }
    useEffect(() => {
        setMonthName(getMonthName(route.params.acceptedMDetailss.requested_at.split("-")[1]))
    }, [route.params.acceptedMDetailss])

    const payMentHandeler = async () => {
        const saltKey = '892f68a5-f75e-40ce-96cc-0a71a5b2abc7';
        const payload = {
            "merchantId": "ROADUAT",
            "merchantTransactionId": "MT7850590068188104",
            "merchantUserId": "MUID123",
            "amount": 100 * route.params.totalAmountData.total_amount,
            "redirectUrl": "roadserve://.MainActivity",
            "redirectMode": "POST",
            "callbackUrl": "roadserve://.MainActivity",
            "mobileNumber": "9999999999",
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        let encodedAuth = new Buffer(JSON.stringify(payload)).toString("base64");
        let shaValue = sha256(encodedAuth + "/pg/v1/pay" + saltKey) + "###" + 1;

        const options = {
            method: 'POST',
            url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': shaValue
            },
            data: { request: encodedAuth }
        };

        axios
            .request(options)
            .then((response) => {
                // console.log(response.data.data.instrumentResponse.redirectInfo.url);
                Linking.openURL(response.data.data.instrumentResponse.redirectInfo.url);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    if (postUserLocationDetails) {
        return (
            <View style={{ height: "92%" }}>
                <View style={styles.headingView}>
                    <AntDesign name='left' size={29} style={styles.headingIcon} onPress={() => navigation.goBack()} />
                    <Text style={styles.headingTxt}>Invoice</Text>
                    <Text style={{ width: "9%" }}></Text>
                </View>
                <View style={styles.mainConatiner}>
                    <View style={styles.upperCardView}>
                        <Image source={require('./assets/RectangleCard.png')} style={styles.upperCardImg} />
                        <View style={styles.imgTxtMPicMainView}>
                            <Text style={styles.invoiceForTxt}>Invoice for</Text>
                            <Image source={postUserImage ? { uri: postUserImage } : require("./assets/profileAvtar.png")} style={styles.img} />
                            <Text style={styles.invoiceForMName}>{postUserName}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Entypo name='location-pin' size={26} color={"#3D4759"} />
                                <Text style={[styles.invoiceForTxt, { color: "#3D4759", width: "90%", padding: 3, fontWeight: "600" }]}>{postUserLocationDetails}</Text>
                            </View>
                        </View>
                        <View style={styles.showTotalAmount}>
                            <Text style={[styles.txt, { alignSelf: "center" }]} >Total Amount</Text>
                            <Text style={[styles.invoiceForTxt, { fontSize: 20, alignSelf: "center" }]}>₹ {route.params.totalAmountData.total_amount}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 9 }}>
                                <Image source={require('./assets/calendar.png')} />
                                <Text style={{ color: "#505056" }}>{monthName}{route.params.acceptedMDetailss.requested_at.split("-")[0]},{route.params.acceptedMDetailss.requested_at.split("-")[2].split(" ")[0]}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.invoiceHeading}>Invoice details</Text>
                    <View style={styles.paymentCardContainer}>
                        <Image source={require("./assets/cardStyle.png")} style={styles.paymentCard} />
                        <View style={styles.txtConatiner}>
                            <View style={styles.everyTxtConatiner}>
                                <Text style={styles.txtHeading}>Task</Text>
                                <Text style={styles.txtHeading}>Total</Text>
                            </View>
                            <View style={[styles.txtContainerTwoChild]}>
                                <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                    <Text style={styles.txt}>{route.params.acceptedMDetailss.service_types[0].service_name.charAt(0).toUpperCase() + route.params.acceptedMDetailss.service_types[0].service_name.slice(1)}</Text>
                                    <Text style={styles.txt}>₹{route.params.acceptedMDetailss.service_types[0].price}</Text>
                                </View>
                                <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                    <Text style={styles.txt}>Service charge</Text>
                                    <Text style={styles.txt}>₹{route.params.totalAmountData.service_charge}</Text>
                                </View>
                            </View>
                            <View style={[styles.txtContainerTwoChild]}>
                                {/* <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                    <Text style={styles.txt}>Subtotal</Text>
                                    <Text style={styles.txt}>₹20.00</Text>
                                </View> */}
                                <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                    <Text style={styles.txt}>Discount {route.params.totalAmountData.discount}</Text>
                                    <Text style={styles.txt}>₹{route.params.totalAmountData.discount}</Text>
                                </View>
                            </View>
                            <View style={styles.everyTxtConatiner}>
                                <Text style={styles.txt}>Total amount</Text>
                                <Text style={styles.txt}>₹{route.params.totalAmountData.total_amount}</Text>
                            </View>
                            <View style={[styles.noteIconTxtView, { width: "20%", alignSelf: "center", position: "absolute", bottom: "26%" }]}>
                                <Image source={require("./assets/notes.png")} style={styles.noteIcon} />
                                <Text style={[styles.txt, { fontFamily: "Forza-Bold" }]}>Notes</Text>
                            </View>
                            <Text style={[styles.txt, { position: "absolute", bottom: "9%", alignSelf: "center", fontWeight: "400", fontSize: 17, color: "#505056", width: "100%", textAlign: "center" }]}>Hi <Text style={{ fontFamily: "Forza-Bold", color: "#007AFF", letterSpacing: 0.5 }}>{postUserName}</Text>, have a look at the invoice for the Mechanic service.</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.footerBtn} onPress={payMentHandeler}>
                        <View style={styles.checkOutBtnView}>
                            <Text style={{ width: "5%" }}></Text>
                            <Text style={styles.checkOutBtnTxt}>Continue to payment</Text>
                            <AntDesign name='right' style={styles.checkOutBtnIcon} size={26} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        <Loading />
    }
}


const styles = StyleSheet.create({
    mainConatiner: {
        padding: 9,
        // borderWidth:1,
        // borderColor:"red",
        height: "100%",
        width: "100%"
    },
    headingView: {
        // borderWidth: 1,
        // borderColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
    },
    headingTxt: {
        // borderWidth:1,
        // borderColor:"red",
        color: "#3D4759",
        fontWeight: "500",
        fontSize: 19,
        alignItems: "center",
    },
    headingIcon: {
        // borderWidth:1,
        // borderColor:"red",
        color: "black",
    },
    upperCardView: {
        position: "relative",
    },
    upperCardImg: {

    },
    imgTxtMPicMainView: {
        position: "absolute",
        padding: 10,
    },
    showTotalAmount: {
        position: "absolute",
        flexDirection: "column",
        justifyContent: "space-evenly",
        // padding: 10,
        width: 155,
        height: 100,
        borderRadius: 12,
        backgroundColor: "#FFF",
        right: 15,
        top: 9
    },
    invoiceForTxt: {
        color: "#3D4759",
        fontWeight: "500"
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 36,
        alignItems: "center",
    },
    invoiceForMName: {
        color: "#3D4759",
        fontFamily: "Forza-Bold",
        fontSize: 19,
        width: "auto"
    },
    invoiceHeading: {
        fontFamily: "Forza-Black",
        color: "#3D4759",
        fontSize: 24,
        padding: 15
    },
    paymentCardContainer: {
        position: "relative"
    },
    paymentCard: {
        width: 368,
        height: 422,
        alignSelf: "center",
    },
    txtConatiner: {
        position: "absolute",
        width: 368,
        height: 400,
        alignSelf: "center",
        padding: 5,
        justifyContent: 'flex-start',
    },
    everyTxtConatiner: {
        // marginBottom:"9%",
        padding: 10,
        alignItems: "center",
        borderBottomColor: "#ECECEC",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txtHeading: {
        color: "#000000",
        fontFamily: "Forza-Bold",
        fontSize: 19
    },
    txt: {
        color: "#505056",
        fontWeight: "400",
        fontSize: 17
        // borderColor:"red",
        // borderWidth:1,
    },
    txtContainerTwoChild: {
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC"
    },
    noteIconTxtView: {
        // borderWidth: 1,
        // borderColor: "red",
        alignItems: "center",
        gap: 9,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    noteIcon: {
        // borderWidth: 1,
        // borderColor: "red",
        height: 25,
        width: 25
    },
    footerBtn: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
    },
    checkOutBtnView: {
        justifyContent: "space-around",
        backgroundColor: "#007AFF",
        borderRadius: 33,
        flexDirection: "row",
        gap: 45,
        alignItems: "center",
        width: "100%",
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
export default InvoicePage