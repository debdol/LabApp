import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { baseUrl, logInUrl } from './APIs';
const SignUpPage = (props: any) => {
    const [inputNumber, setInputNumber] = useState(false);

    const getLogInData = () => {

        const num = inputNumber.toString();
        if (inputNumber) {
            props.userNumber(inputNumber);
            axios.get(`${baseUrl}login?contact_number=${num}&device_fcm='eQONCIs3Rku474Chexzonu:APA91bE7cxUy6G9OC4NArxsfALglRFVF6cMyA7XY--ZCVvFJd8qlRWGoT0jXIifw93czKBN5XKjkcjigeDFzKocgKAPzchTmNGnpz6rNiSiCw2I6Her0nGjXVuYxjfjJthrnSTAC4zzP'`)
                .then((res) => console.log("Data in signUpPage: ", res))
                .catch((error) => console.log(error));
        }
    }
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
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#D7E2F0", borderRadius: 40, marginTop: 24 }}>
                    <Text style={{ fontWeight: "400", marginLeft: 22, fontSize: 19, color: "black", fontFamily: "Forza-Bold" }}>+91</Text>
                    <TextInput style={{
                        height: 30,
                        width: 280,
                        margin: 12,
                        borderLeftWidth: 1,
                        padding: 4,
                        color: "#0D0D0D",
                        letterSpacing: 1,
                        fontSize: 19,
                        fontFamily: "Forza-Bold"
                    }} keyboardType='numeric' onChangeText={(e: any) => setInputNumber(e)} />
                </View>
                <TouchableOpacity style={{ marginTop: 40, backgroundColor: "#007AFF", borderRadius: 39, width: 190 }} onPress={() => {
                    getLogInData();
                    props.pagename("otp");
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
                            marginLeft: 15
                        }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})
export default SignUpPage