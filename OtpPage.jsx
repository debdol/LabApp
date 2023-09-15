import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import axios from 'axios';
import { baseUrl, logInUrl } from './APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleContext } from './App';
import Loading from './Loading';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import messaging from '@react-native-firebase/messaging';

const OtpPage = (props) => {
    // const [registerVarification, setRegisterVarification] = useState();
    const { getMainPage } = useContext(StyleContext);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [otp, setOtp] = useState();
    const [fcmToken, setFcmToken] = useState(null);
    const storeNumber = props.numberSend;

    //Getting FCM token.......................
    const getDeviceToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        setFcmToken(token);
    }

    //calling getDeviceToken...........................
    useEffect(() => {
        getDeviceToken();
    }, []);

    const resendOTP = () => {
        setMinutes(0);
        setSeconds(30);
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const getApiFunction = () => {
        const num = storeNumber.toString();
        if (num) {
            axios.get(`${baseUrl}login?contact_number=${num}&device_fcm=${fcmToken}`)
                .then((res) => console.log("response in resend otp", res.data))
                .catch((error) => console.log(error));
        }
    }

    const otpVarification = () => {
        if (otp) {
            axios.get(`${baseUrl}otp-verification?contact_number=${storeNumber}&otp=${otp}`)
                .then((res) => {
                    // console.log("trueee:", res.data)
                    if (res.data.registered === true) {
                        AsyncStorage.setItem('User_Token', res.data.token);
                        getMainPage(<Loading />);
                    } else {
                        AsyncStorage.setItem('varified_Token', res.data.token);
                        props.pagename("RegisterPage")
                    }

                })
                .catch((error) => console.log(error));
        }
    }

    // async function storeData(res) {
    //     try {
    //         if (res.data.registered) {
    //             const jsonValue = JSON.stringify(res.data.token);
    //             await AsyncStorage.setItem('User_Token', res.data.token);
    //             getUserLog(true);
    //         } else {
    //             const jsonValue = JSON.stringify(res.data.token);
    //             await AsyncStorage.setItem('varified_Token', res.data.token);
    //             const v = await AsyncStorage.getItem('varified_Token');
    //             props.pagename("RegisterPage")
    //         }

    //     } catch (e) {
    //         // saving error
    //         console.log("try catch :", e);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <Image source={require("./assets/logo.png")} style={styles.logo} />
            <Text style={styles.heading}>We sent you an SMS code</Text>
            <Text style={styles.number}>On number: +91 {props.numberSend}</Text>
            <OTPInputView
                style={styles.otpView}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged={code => { setOtp(code) }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    setOtp(code);
                })}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={() => {
                otpVarification();
            }}>
                <Text style={styles.btnText}>submit</Text>
            </TouchableOpacity>
            <View style={styles.resendBtn}>
                {
                    seconds > 0 || minutes > 0 ? (
                        <Text style={styles.showTime}>
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </Text>
                    ) : (
                        <Text style={styles.dontReciveCode}>Didn't recieve code?</Text>
                    )
                }
                <TouchableOpacity
                    disabled={seconds > 0 || minutes > 0}
                    // style={[styles.resendBtn]}
                    onPress={() => { resendOTP(); getApiFunction() }}
                >
                    <Text style={styles.resendTxt}> Resend OTP</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 11
    },
    title: {
        fontSize: 20,
        fontFamily: "Forza-Bold",
        alignSelf: "center",
        color: "black"
    },
    otpView: {
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 50,
        width: "85%",
        height: "auto",
        color:"black"
    },

    inputView: {
        width: 60,
        height: 70,
        marginLeft: 14,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#D7E2F0",
        color: "black",
        fontSize: 30,
    },
    logo: {
        height: 60,
        width: 250,
        alignSelf: "center",
        marginTop: 22
    },
    heading: {
        alignSelf: "center",
        fontSize: 28,
        color: '#0D0D0D',
        fontFamily: "Forza-Bold",
        marginTop: 22,
    },
    number: {
        marginTop: 40,
        alignSelf: "center",
        color: "#505056",
        fontSize: 18,
        fontFamily: "Forza-Bold",
    },
    submitBtn: {
        alignSelf: "center",
        alignItems: "center",
        width: 190,
        backgroundColor: "#007AFF",
        height: 50,
        borderRadius: 50,
        marginTop: 60
    },
    btnText: {
        textAlign: "center",
        color: "white",
        padding: 12,
        fontSize: 17

    },
    footerView: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 60,
        gap: 9,
        letterSpacing: 5
    },
    resendBtn: {
        borderBottomWidth: 1,
        borderBottomColor: "#007AFF",
        alignSelf: "center",
        marginTop: 22
    },
    resendTxt: {
        color: "#007AFF",
    },
    showTime: {
        alignSelf: "center",
        color: "black"
    },
    dontReciveCode: {
        alignSelf: "center",
        marginTop: 19,
        color: "black",
        fontFamily: "Forza-Bold"
    },
    //pakage of OTP style........................
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
})
export default OtpPage;