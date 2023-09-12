import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { baseUrl, logInUrl } from './APIs';
import * as yup from 'yup';
import { Formik } from 'formik';
import messaging from '@react-native-firebase/messaging';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { NativeBaseProvider, Box, extendTheme, Button, HStack, Checkbox, Input, VStack, IconButton } from "native-base";


const SignUpPage = (props) => {
    const [inputNumber, setInputNumber] = useState(null);
    const [fcmToken, setFcmToken] = useState(null);
    const [checkBtn, setCheckBtn] = useState(false);


    const getDeviceToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log("FCM token:", token);
    }

    useEffect(() => {
        getDeviceToken();
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert((remoteMessage.notification.body) + "!");
            console.log("foreGround msg check:", JSON.stringify(remoteMessage.notification.body))
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (inputNumber && fcmToken && checkBtn) {
            props.userNumber(inputNumber);
            axios.get(`${baseUrl}login?contact_number=${inputNumber}&device_fcm=${fcmToken}`)
                .then((res) => {
                    console.log("responce in signUpPage:", res.data);
                    //Hemant bro add check feature to this login API
                    if (res.data) {
                        props.pagename("otp");
                    } else {
                        Alert.alert("pls,enter valid number");
                    }
                })
                .catch((error) => console.log("error_in_otp_API :", error));
        } else {
            Alert.alert("pls,allow terms & conditions");
            console.log("checkBtn :", checkBtn);
        }
    }, [inputNumber])

    const userSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .min(10)
            .required('Phone number is required')
    });
    return (
        <View>
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text style={{ color: "black", fontFamily: "Forza-Bold", fontSize: 16 }}>SignUp</Text>
                <Image source={require('./assets/logo.png')} style={{ height: 60, width: 250, marginTop: 30, borderWidth: 1 }} />
                <Text style={{
                    marginTop: 11,
                    fontSize: 25,
                    color: '#0D0D0D',
                    textAlign: "center",
                    fontFamily: "Forza-Bold"
                }}>Enter Your Mobile Number</Text>
                <Text style={{ marginTop: 11, fontSize: 17, color: '#758283', fontFamily: "Forza-Bold" }}>you will receive 4 digit code to </Text>
                <Text style={{ fontSize: 17, fontWeight: "600", color: '#758283', fontFamily: "Forza-Bold" }}>varify next</Text>
                <View style={{ alignItems: "center", borderRadius: 40, marginTop: 24 }}>
                    <Formik
                        initialValues={{ phoneNumber: '' }}
                        onSubmit={(values, { resetForm }) => {
                            // console.log("values :", values.phoneNumber);
                            setInputNumber(values.phoneNumber);
                            resetForm({ values: '' });
                        }}
                        validationSchema={userSchema}
                    >
                        {({ handleChange, handleSubmit, errors, touched, values }) => (
                            <View>
                                <View style={styles.nineOneInputView}>
                                    <Text style={{ fontWeight: "400", marginLeft: 22, fontSize: 15, color: "black", fontFamily: "Forza-Bold" }}>+91</Text>
                                    <TextInput style={styles.inputStyle} keyboardType='number-pad' onChangeText={handleChange('phoneNumber')} placeholder='write your phone number' maxLength={10} value={values.phoneNumber} />
                                </View>
                                {errors.phoneNumber && touched.phoneNumber ? (<Text style={{ color: "red", marginBottom: 9, fontFamily: "Forza-Bold" }}>{errors.phoneNumber}</Text>) : null}
                                <View style={styles.conditionCheckView} onStartShouldSetResponder={() => setCheckBtn(!checkBtn)}>
                                    <Checkbox value="one" my={2} style={styles.checkBox} onChange={(e) => {
                                        // console.log("check :", e);
                                        setCheckBtn(e)
                                    }} colorScheme={"blue"} size="md" _disabled={true} isChecked={checkBtn}>
                                        <Text style={styles.termsConditionText}>I hereby agree to all terms & conditions</Text>
                                    </Checkbox>
                                </View>
                                <TouchableOpacity style={checkBtn ? { marginTop: 40, backgroundColor: "#007AFF", borderRadius: 39, width: 190, alignSelf: "center" } : { marginTop: 40, backgroundColor: "#3991bd", borderRadius: 39, width: 190, alignSelf: "center" }} onPress={() => {
                                    handleSubmit();
                                }}>
                                    <View style={{ display: "flex", flexDirection: "row", padding: 5, alignItems: "center" }}>
                                        <Text style={{
                                            color: "white",
                                            marginLeft: 45,
                                            fontWeight: "500",
                                            fontSize: 16,
                                            justifyContent: "center"
                                        }}>send OTP</Text>
                                        <AntDesign name='right' size={20} color={"black"} style={{
                                            backgroundColor: "white", borderRadius: 45, padding: 15,
                                            marginLeft: "9%"
                                        }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    inputStyle: {
        height: 40,
        width: 280,
        margin: 12,
        borderLeftWidth: 1,
        padding: 4,
        color: "#0D0D0D",
        letterSpacing: 1,
        fontSize: 15,
        fontFamily: "Forza-Bold",
        // backgroundColor: "#D7E2F0",
        // borderWidth: 1,
        // borderColor: "red"
    },
    conditionCheckView: {
        // borderWidth:1,
        // borderColor:"red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%"
    },
    termsConditionText: {
        color: "#3D4759",
        fontFamily: "Forza-Bold",
        fontSize: 15
    },
    nineOneInputView: {
        backgroundColor: "#D7E2F0",
        // borderWidth: 1,
        // borderColor: "red" ,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6
    },
    inputFieldErrorView: {
        flexDirection: "column"
    }
})
export default SignUpPage