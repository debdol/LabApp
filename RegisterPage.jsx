import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { StyleContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllStackNavigation from './AllStackNavigation';
import * as Yup from 'yup';
import { Formik } from 'formik';

const RegisterPage = (props) => {
    const [token, setToken] = useState();
    const { postUserLog, getMainPage, getUserLog, } = useContext(StyleContext);
    //user data
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [carModel, setCarModel] = useState();
    const [carNumber, setCarNumber] = useState();
    const [pinCode, setPincode] = useState();
    const [state, setState] = useState();
    const [userLat, setUserLat] = useState();
    const [userLong, setUserLong] = useState();


    // getting user lat long
    const getUserLatLong = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position);
                setUserLat(position.coords.latitude.toString());
                setUserLong(position.coords.longitude.toString());
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const userSchema = Yup.object().shape({
        name: Yup.string().required('Pls, enter your name..................'),
        car_number: Yup.string().required('Pls, enter your car number..................'),
        car_model: Yup.string().required('Pls, enter your car model..................'),
        email_id: Yup.string().email("Please enter valid email").required('Pls, enter your email id..................'),
        address: Yup.string().required('Pls, enter your address..................'),
        pin_code: Yup.string().min(6).required('Pls, enter your pincode..................'),
        state: Yup.string().required('Pls, enter your state..................'),
        // latitude: Yup.string(),
        // longitude: Yup.string()
    });

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('varified_Token');
            // console.log("token :", value);
            setToken(value);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    //calling lat long API
    useEffect(() => {
        getUserLatLong();
    }, [])
    const submitHandler = async () => {
        const datas = {
            name: fullName,
            car_number: carNumber,
            car_model: carModel,
            email_id: email,
            address: address,
            pin_code: pinCode,
            state: state,
            latitude: userLat,
            longitude: userLong
        }
        // console.log('token in registerPage: ', datas);
        if (userLat && userLong) {
            axios.post("http://43.204.88.205:90/registration", datas, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json '
                }
            })
                .then((res) => {
                    // console.log("response in regiterPage :", res.data);
                    getUserLog(res.data.token);
                    AsyncStorage.setItem('User_Token', res.data.token);
                    AsyncStorage.removeItem('varified_Token');
                })
                .catch((e) => {
                    console.log("error in RegisterPage :", e)
                })
        }

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
                <Formik
                    initialValues={{ name: '', car_number: '', car_model: '', email_id: '', address: '', pin_code: '', state: '', latitude: '', longitude: '' }}
                    validationSchema={userSchema}
                    onSubmit={values => {
                        // console.log(values, "user lat :", typeof (userLat));
                        submitHandler();
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
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
                                    <TextInput placeholder='Full name' style={styles.fullNameI} onChangeText={(value) => { handleChange('name')(value); setFullName(value) }} value={values.name} />
                                </View>
                                {errors.name && touched.name ? (<Text style={styles.errorStyle}>{errors.name}</Text>) : null}

                                <View style={styles.inputLogoConatiner}>
                                    <MaterialCommunityIcons name='email-outline' size={30} style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        marginLeft: 5,
                                        padding: 8,
                                        borderRadius: 22,
                                        color: "#242B2E"
                                    }} />
                                    <TextInput placeholder='Email' style={styles.fullNameI} onChangeText={(value) => { handleChange('email_id')(value); setEmail(value) }} value={values.email_id} />
                                </View>
                                {errors.email_id && touched.email_id ? (<Text style={styles.errorStyle}>{errors.email_id}</Text>) : null}

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
                                    <TextInput placeholder='Address' style={styles.fullNameI} onChangeText={(value) => { handleChange('address')(value); setAddress(value) }} value={values.address} />
                                </View>
                                {errors.address && touched.address ? (<Text style={styles.errorStyle}>{errors.address}</Text>) : null}

                                <View style={styles.inputLogoConatiner}>
                                    <AntDesign name='car' size={30} style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        marginLeft: 5,
                                        padding: 8,
                                        borderRadius: 22,
                                        color: "#242B2E"
                                    }} />
                                    <TextInput placeholder='Car Model' style={styles.fullNameI} onChangeText={(value) => { handleChange('car_model')(value); setCarModel(value) }} value={values.car_model} />
                                </View>
                                {errors.car_model && touched.car_model ? (<Text style={styles.errorStyle}>{errors.car_model}</Text>) : null}

                                <View style={styles.inputLogoConatiner}>
                                    <FontAwesome5 name='car-alt' size={30} style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        marginLeft: 5,
                                        padding: 8,
                                        borderRadius: 22,
                                        color: "#242B2E"
                                    }} />
                                    <TextInput placeholder='Car number' style={styles.fullNameI} onChangeText={(value) => { handleChange('car_number')(value); setCarNumber(value) }} value={values.car_number} />
                                </View>
                                {errors.car_number && touched.car_number ? (<Text style={styles.errorStyle}>{errors.car_number}</Text>) : null}

                                <View style={styles.inputLogoConatiner}>
                                    <MaterialIcons name='fiber-pin' size={30} style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        marginLeft: 5,
                                        padding: 8,
                                        borderRadius: 22,
                                        color: "#242B2E"
                                    }} />
                                    <TextInput placeholder='Pin Code' style={styles.fullNameI} onChangeText={(value) => { handleChange('pin_code')(value); setPincode(value) }} value={values.pin_code} maxLength={6} />
                                </View>
                                {errors.pin_code && touched.pin_code ? (<Text style={styles.errorStyle}>{errors.pin_code}</Text>) : null}

                                <View style={styles.inputLogoConatiner}>
                                    <Feather name='map-pin' size={30} style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        marginLeft: 5,
                                        padding: 8,
                                        borderRadius: 22,
                                        color: "#242B2E"
                                    }} />
                                    <TextInput placeholder='state' style={styles.fullNameI} onChangeText={(value) => { handleChange('state')(value); setState(value) }} value={values.state} />
                                </View>
                                {errors.state && touched.state ? (<Text style={styles.errorStyle}>{errors.state}</Text>) : null}
                            </View>
                            <TouchableOpacity style={styles.nextBtn} onPress={() => {
                                handleSubmit();
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
                        </>
                    )}
                </Formik>
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
    },
    //Error style
    errorStyle: {
        color: "red",
        marginBottom: 9,
        fontFamily: "Forza-Bold",
        alignSelf: "center"
    }

})
export default RegisterPage