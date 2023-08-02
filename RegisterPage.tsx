import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import axios from 'axios';
import { StyleContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterPage = (props: any) => {
    const [token, setToken] = useState();
    const { postUserLog, getUserLog, postUserlat, postUserLong } = useContext(StyleContext);
    //user data
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [carModel, setCarModel] = useState();
    const [carNumber, setCarNumber] = useState();
    const [pinCode, setPincode] = useState();
    const [state, setState] = useState();
    // console.log(typeof (longitude));


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const value  = await AsyncStorage.getItem('varified_Token');
            // console.log("token :", value);
            setToken(value);
        } catch (e) {
            console.log(e);
        }
    };
    const submitHandler = () => {
        const datas = {
            name: fullName,
            car_number: carNumber,
            car_model: carModel,
            email_id: email,
            address: address,
            pin_code: pinCode,
            state: state,
            latitude: postUserlat,
            longitude: postUserLong
        }
        // console.log('lat: ', postUserlat);
        axios.post("http://43.204.88.205:90/registration", datas, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json '
            }
        })
            .then((res) => {
                // console.log("token in regiterPage :",res.data.token);
                getUserLog("true");
                AsyncStorage.setItem('User_Token', res.data.token);
                AsyncStorage.removeItem('varified_Token');
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={styles.title}>Sign up</Text>
                <Image source={require("./assets/logo.png")} style={styles.logo} />
                <Text style={styles.heading}>Welcome to sign up</Text>
                <View style={styles.semiHeadingContainer}>
                    <Text style={styles.semiHeadingText}>Get fast help with our roadside</Text>
                    <Text style={styles.semiHeadingText}>Assistance app-just fill out the form!</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputLogoConatiner}>
                        <AntDesign name='user' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Full name' style={styles.fullNameI} onChangeText={(e:any) => setFullName(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <MaterialCommunityIcons name='email-outline' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Email' style={styles.fullNameI} onChangeText={(e:any) => setEmail(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <Entypo name='location-pin' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            height: 45,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Address' style={styles.fullNameI} onChangeText={(e:any) => setAddress(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <AntDesign name='car' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Car Model' style={styles.fullNameI} onChangeText={(e:any) => setCarModel(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <FontAwesome5 name='car-alt' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Car number' style={styles.fullNameI} onChangeText={(e:any) => setCarNumber(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <MaterialIcons name='fiber-pin' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='Pin Code' style={styles.fullNameI} onChangeText={(e:any) => setPincode(e)} />
                    </View>

                    <View style={styles.inputLogoConatiner}>
                        <Feather name='map-pin' size={30} style={{
                            textAlign: "center",
                            backgroundColor: "white",
                            marginLeft: 5,
                            padding: 8,
                            borderRadius: 22,
                            color: "#242B2E"
                        }} />
                        <TextInput placeholder='state' style={styles.fullNameI} onChangeText={(e:any) => setState(e)} />
                    </View>
                </View>
                <TouchableOpacity style={styles.nextBtn} onPress={() => {
                    submitHandler();
                }}>
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Next</Text>
                        <AntDesign name='right' size={20} color={"black"} style={{
                            backgroundColor: "white",
                            borderRadius: 45,
                            padding: 15,
                            marginLeft: 92
                        }} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        alignSelf: "center",
        color: "black",
        fontFamily: "Forza-Bold"
    },
    logo: {
        height: 60,
        width: 250,
        alignSelf: "center",
    },
    heading: {
        alignSelf: "center",
        fontSize: 28,
        color: '#0D0D0D',
        fontFamily: "Forza-Black"
    },
    semiHeadingContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    semiHeadingText: {
        color: "#758283",
        fontFamily: "Forza-Bold"
    },
    formContainer: {
        marginTop: 20,

    },
    inputLogoConatiner: {
        marginTop: 11,
        display: "flex",
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D7E2F0",
        borderRadius: 29,
        height: 57
    },
    fullNameI: {
        marginLeft: 15,
        width: 298,
    },
    nextBtn: {
        alignSelf: "center",
        marginTop: 59,
        backgroundColor: "#007AFF",
        borderRadius: 39,
        width: 333
    },
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
        alignItems: "center"
    },
    btnText: {
        color: "white",
        marginLeft: 147,
        fontWeight: "500",
        fontSize: 16,
        justifyContent: "center"
    }

})
export default RegisterPage