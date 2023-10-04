import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import sha256 from 'sha256';
const Buffer = require("buffer").Buffer;
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { calculateTotalAmount, getCheckOutDetailss } from './APIs';


const InvoicePage = ({ route }) => {
    const { postUserLocationDetails, postUserLog, postUserName, postUserImage, postServiceRequestDetails } = useContext(StyleContext);
    const navigation = useNavigation();
    const [routedData, setRoutedData] = useState();
    const [amountRelatedData, setAmountRelatedData] = useState(null);
    const [gotData, setGotData] = useState(false);
    const [monthName, setMonthName] = useState();
    const [checkOutDetails, setCheckOutDetails] = useState(null);
    const [services, setServices] = useState(null);
    const [servicesValue, setServicesValue] = useState(null);
    const [marchantIdLocalStorage, setMarchantIdLocalStorage] = useState(false);

    // console.log(postUserLog)
    const getStorage = async () => {
        if (await AsyncStorage.getItem('marhchant_id')) {
            let temp = await AsyncStorage.getItem('marhchant_id');
            setMarchantIdLocalStorage(temp);
            // console.log("storage is full of bitches")
        } else {
            setMarchantIdLocalStorage(false);
        }
    }
    //Check AsyncStorage
    useEffect(async () => {
        // console.log("marchantIdLocalStorage :", marchantIdLocalStorage);
        getStorage();
    }, []);

    const checkStatus = () => {
        const saltKey = 'a344f36b-a485-410a-94ae-61dcad8a0fcb';
        let shaValue = sha256(`/pg/v1/status/M1U16ALDP072/${marchantIdLocalStorage}` + saltKey) + "###" + 1;
        const options = {
            method: 'GET',
            url: `https://api.phonepe.com/apis/hermes/pg/v1/status/M1U16ALDP072/${marchantIdLocalStorage}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': shaValue,
                'X-MERCHANT-ID': "M1U16ALDP072"
            }
        };
        axios
            .request(options)
            .then(async (response) => {
                if (response.data.success == true) {
                    console.log("route.params.acceptedMDetails._id :", route.params.acceptedMDetails._id);
                    console.log("response_to_check_payment_status :", response.data);
                    let temp = response.data;
                    axios.post(`${calculateTotalAmount}${route.params.acceptedMDetails._id}`, [temp], {
                        headers: {
                            'Authorization': `Bearer ${postUserLog}`,
                            'accept': 'application/json'
                        }
                    })
                        .then((response) => { console.log("response_in_store_payment :", response) })
                        .catch((error) => console.log("error_in_store_payment :", error))

                }
                // AsyncStorage.removeItem('marhchant_id')
            })
            .catch(function (error) {
                console.error("error_to_check_payment_status:", error);
            })
    }

    const getCheckoutDetails = () => {
        axios.get(getCheckOutDetailss, {
            headers: {
                'Authorization': `Bearer ${postUserLog}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log("response_in_checkOutDetails:", res.data.data);
                AsyncStorage.setItem('marhchant_id', res.data.data.merchantTransactionId);
                setCheckOutDetails(res.data.data);
            })
            .catch((err) => console.log("error_in_checkOutDetails :", err));
    }

    //Checks if transactionID is available on AsyncStorage & calls API accordingly
    useEffect(() => {
        if (marchantIdLocalStorage !== false) {
            console.log("marchantIdLocalStorage :", marchantIdLocalStorage);
            checkStatus();
        } else {
            console.log("local_storage_is_empty");
            getCheckoutDetails();
        }
    }, [marchantIdLocalStorage])

    async function openLink(url) {
        try {
            //   const url = 'https://github.com/proyecto26'
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#453AA4',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#6200EE',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    }
                })
                    .then((res) => {
                        console.log("Bombai se aaya mera dost: ", res);
                        if (result.type === "loadstop") {
                            console.log("Callback URL is: ", res.url);
                        }
                    })
                    .catch((err) => {
                        console.log("Gadbad hai re baba: ", err)
                    })
                await this.sleep(800);
                Alert.alert(JSON.stringify(result))
                // console.log(result);
            }
            else {
                Linking.openURL(url);
                console.log("url_in_else_statement :", url);
            }
        } catch (error) {
            console.log("error_msg :", error);
        }
    }



    useEffect(() => {
        if (route.params) {
            setRoutedData(route.params.acceptedMDetails);
            // console.log("serviceRequestId :", route.params.acceptedMDetails._id);
        }
    }, [route.params]);

    useEffect(() => {
        if (routedData) {
            // console.log("routedData :", routedData._id);
            axios.get(`${calculateTotalAmount}${routedData._id}`, {
                headers: {
                    'Authorization': `Bearer ${postUserLog}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    let services = Object.keys(res.data.data[0].services);
                    let servicesValue = Object.values(res.data.data[0].services);
                    setServices(services);
                    setServicesValue(servicesValue);
                    // console.log("total ammount:", servicesValue);
                    setAmountRelatedData(res.data.data[0])
                })
                .catch((error) => console.log("error in total amount :", error))
        }
    }, [routedData])

    useEffect(() => {
        if (amountRelatedData !== null) setGotData(true)
    }, [amountRelatedData])

    const getMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }

    useEffect(() => {
        setMonthName(getMonthName(route.params.acceptedMDetails.requested_at.split("-")[1]))
    }, [route.params.acceptedMDetails])

    const payMentHandeler = async () => {
        if (checkOutDetails) {
            // console.log("total_amount :", checkOutDetails.merchantTransactionId);
            const saltKey = 'a344f36b-a485-410a-94ae-61dcad8a0fcb';
            const payload = {
                "merchantId": checkOutDetails.merchantId,
                "merchantTransactionId": checkOutDetails.merchantTransactionId,
                "merchantUserId": checkOutDetails.merchantUserId,
                "amount": 100 * amountRelatedData.total_amount,
                "redirectUrl": "roadserve://.MainActivity",
                "redirectMode": "POST",
                "callbackUrl": "https://roadserve.in",
                "mobileNumber": checkOutDetails.mobileNumber,
                "paymentInstrument": {
                    "type": "PAY_PAGE"
                }
            }

            let encodedAuth = new Buffer(JSON.stringify(payload)).toString("base64");
            let shaValue = sha256(encodedAuth + "/pg/v1/pay" + saltKey) + "###" + 1;

            const options = {
                method: 'POST',
                url: 'https://api.phonepe.com/apis/hermes/pg/v1/pay',
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
                    // console.log("{ route } :", checkOutDetails.merchantTransactionId);
                    openLink(response.data.data.instrumentResponse.redirectInfo.url)
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    console.error("error is in payment :", error);
                });
        }
    }
    return (
        <>
            {postUserLocationDetails && gotData ? (
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
                                <Text style={[styles.invoiceForTxt, { fontSize: 20, alignSelf: "center" }]}>₹ {amountRelatedData.total_amount}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 9 }}>
                                    <Image source={require('./assets/calendar.png')} />
                                    <Text style={{ color: "#505056" }}>{monthName}{route.params.acceptedMDetails.requested_at.split("-")[0]},{route.params.acceptedMDetails.requested_at.split("-")[2].split(" ")[0]}</Text>
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
                                        <Text style={styles.txt}>{services[0].charAt(0).toUpperCase() + services[0].slice(1)}</Text>
                                        <Text style={styles.txt}>₹{servicesValue}</Text>
                                    </View>
                                    <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                        <Text style={styles.txt}>Service charge</Text>
                                        <Text style={styles.txt}>₹{amountRelatedData.service_charge}</Text>
                                    </View>
                                </View>
                                <View style={[styles.txtContainerTwoChild]}>
                                    {/* <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                    <Text style={styles.txt}>Subtotal</Text>
                                    <Text style={styles.txt}>₹20.00</Text>
                                </View> */}
                                    <View style={[styles.everyTxtConatiner, { borderBottomColor: "", borderBottomWidth: 0 }]}>
                                        <Text style={styles.txt}>Discount {amountRelatedData.discount}</Text>
                                        <Text style={styles.txt}>₹{amountRelatedData.discount}</Text>
                                    </View>
                                </View>
                                <View style={styles.everyTxtConatiner}>
                                    <Text style={styles.txt}>Total amount</Text>
                                    <Text style={styles.txt}>₹{amountRelatedData.total_amount}</Text>
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
            ) : <Loading />}

        </>
    )

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