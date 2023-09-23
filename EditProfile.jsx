import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleContext } from './App';
import { addCarUrl, editProfileUrl, updateProfilePic } from './APIs';
import Loading from './Loading';

const EditProfile = () => {

    const { getMainPage, getUserLog, postUserName, postUserEmail, postUserAddress, postUserCarModel, postUserCarNumber, postUserSate, postUserPinCode, getPageName, postUserLog, postUserImg, getUpdateImg, postUpdateImg } = useContext(StyleContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [varifiedToken, setVarifiedToken] = useState();
    const [changeCarModel, setChangeCarModel] = useState();
    const [changeCarNumber, setChangeCarNumber] = useState();

    const [fullName, setFullName] = useState(postUserName);
    const [email, setEmail] = useState(postUserEmail);
    const [address, setAddress] = useState(postUserAddress);
    const [state, setState] = useState(postUserSate);
    const [pinCode, setPinCode] = useState(postUserPinCode);
    // const [carNumber, setCarNumber] = useState(postUserCarNumber);
    const [carModel, setCarModel] = useState(postUserCarModel);



    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('User_Token');
            // console.log("token in editProfile:", await AsyncStorage.getItem('User_Token'));
            setVarifiedToken(value);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    const editProfileApi = () => {
        const query = `name=${fullName}&email_id=${email}&address=${address}&state=${state}&pin_code=${pinCode}&car_model=${carModel}`;
        axios.put(`${editProfileUrl}${query}`,
            query,
            {
                headers: {
                    'Authorization': `Bearer ${varifiedToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log("response in edit profile :", res.data);
                Alert.alert(res.data.message);
                getUserLog(true);
                getMainPage(<Loading />);
                getPageName("Home");
            })
            .catch((err) => {
                console.log("error in edit profile :", err);
            })
    }

    const addCar_Handler = () => {
        const carDetailsChange = {
            car_number: changeCarNumber,
            car_model: changeCarModel
        }
        if (carDetailsChange.car_number && carDetailsChange.car_model) {
            axios.post(addCarUrl, carDetailsChange, {
                headers: {
                    'Authorization': `Bearer ${varifiedToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log("response for addCar :", res);
                })
                .catch((err) => {
                    console.log("error for addcar :", err);
                })
        } else {
            setModalVisible(false);
        }
    };

    const picPicker = () => {
        let options = {
            storageOptions: {
                path: "image"
            }
        }
        launchImageLibrary(options, response => {
            if (response.assets) {
                let imgData = {
                    uri: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type
                }
                let data = new FormData();
                data.append('profile_picture', imgData);
                // console.log("update Profile Pic:", response.assets[0].uri);
                uploadImage(data);
            }
        })
    }

    const uploadImage = (data) => {
        axios.put(updateProfilePic, data, {
            headers: {
                'Authorization': `Bearer ${postUserLog}`,
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            }
        })
            .then((res) => {
                // console.log("response in image :", res.data.message);
                if (res.data) {
                    Alert.alert(res.data.message);
                    getUpdateImg(!postUpdateImg);
                }
            })
            .catch((error) => console.log("error in imagein editProfile :", error));
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity onPress={picPicker} style={{ alignSelf: "center" }}>
                        <ImageBackground style={styles.imgAndCameraView} source={postUserImg ? { uri: postUserImg } : require("./assets/profileAvtar.png")} imageStyle={{ borderRadius: 75, width: 150, height: 150 }}>
                            <AntDesign name='camera' size={29} style={styles.cameraStyle} />
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={styles.formHeading}>Basic details</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputLogoConatiner}>
                            <AntDesign name='user' size={30} style={styles.userIcon} />
                            <TextInput placeholder='Full name' style={styles.fullNameI} onChangeText={(e) => setFullName(e)} value={fullName} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <MaterialCommunityIcons name='email-outline' size={30} style={styles.userIcon} />
                            <TextInput placeholder='Email' style={styles.fullNameI} onChangeText={(e) => setEmail(e)} value={postUserEmail} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <Entypo name='location-pin' size={30} style={styles.userIcon} />
                            <TextInput placeholder='Address' style={styles.fullNameI} onChangeText={(e) => setAddress(e)} value={address} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <Feather name='map-pin' size={30} style={styles.userIcon} />
                            <TextInput placeholder='State' style={styles.fullNameI} onChangeText={(e) => setState(e)} value={state} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <MaterialIcons name='fiber-pin' size={30} style={styles.userIcon} />
                            <TextInput placeholder='pin code' style={styles.fullNameI} onChangeText={(e) => setPinCode(e)} value={pinCode} keyboardType='number-pad' maxLength={6} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <AntDesign name='car' size={30} style={styles.userIcon} />
                            <TextInput placeholder='Car Model' style={styles.fullNameI} onChangeText={(e) => setCarModel(e)} value={carModel} />
                        </View>
                        <View style={styles.inputLogoConatiner}>
                            <FontAwesome5 name='car-alt' size={30} style={styles.userIcon} />
                            <TextInput placeholder='Car number' style={styles.fullNameI} value={postUserCarNumber} />
                        </View>
                    </View>
                    {/* POP UP CODE  ................................................................................................. */}
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
                                    <Text style={styles.modalText}>Add New Car</Text>
                                    <TextInput placeholder='Write your car model' style={{ height: 40, padding: 9, elevation: 2, backgroundColor: "#FFFFFF" }} onChangeText={(e) => setChangeCarModel(e)} />
                                    <TextInput placeholder='Write your car number' style={{ marginTop: 15, marginBottom: 10, elevation: 2, height: 40, padding: 9, backgroundColor: "#FFFFFF" }} onChangeText={(e) => setChangeCarNumber(e)} />
                                    <TouchableOpacity
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => { setModalVisible(!modalVisible); addCar_Handler() }}>
                                        <Text style={styles.textStyle}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity
                            style={[styles.button, styles.addNewCarView]}
                        // onPress={() => setModalVisible(true)}
                        >
                            <MaterialCommunityIcons name='car-outline' style={styles.addNewCarIcon} size={28} />
                            <Text style={styles.addNewCarTxt}>Add new car</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.saveBtnView} onPress={() => editProfileApi()}>
                        <Text style={styles.saveBtnTxt}>Save</Text>
                        <AntDesign name='right' style={styles.saveBtnIcon} size={26} />
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 6
    },
    imgAndCameraView: {
        // borderWidth:1,
        width: 170,
        height: 170,
        alignItems: "center",
        marginBottom: 15
    },
    profileAvtar: {
        height: 150,
        width: 150,
    },
    picLessCameraStyle: {
        borderWidth: 1,
        borderColor: "#EEEEEE",
        textAlign: "center",
        textAlignVertical: "center",
        color: "#FFFFFF",
        backgroundColor: "#007AFF",
        top: 60,
        left: 77,
        width: 30,
        height: 30,
        borderRadius: 15,
        position: "absolute"
    },
    cameraStyle: {
        color: "#FFFFFF",
        backgroundColor: "#007AFF",
        borderRadius: 29,
        padding: 4,
        borderWidth: 2,
        borderColor: "#EEEEEE",
        textAlign: "center",
        textAlignVertical: "center",
        top: 97,
        left: 47
    },
    formHeading: {
        color: "#3D4759",
        fontSize: 26,
        width: "85%",
        alignSelf: "center",
        marginBottom: 15,
        padding: 4,
        fontFamily: "Forza-Black",
    },
    formContainer: {
        // marginTop: 20,
        marginBottom: 15
    },
    inputLogoConatiner: {
        marginBottom: 15,
        display: "flex",
        height: 57,
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D7E2F0",
        borderRadius: 29,
        position: "relative"
    },
    userIcon: {
        textAlign: "center",
        backgroundColor: "white",
        marginLeft: 5,
        padding: 8,
        borderRadius: 22,
        color: "#242B2E"
    },
    fullNameI: {
        marginLeft: 15,
        // width: 298,
        fontFamily: "Forza-Bold",
        letterSpacing: 1
    },
    BMWinputLogoConatiner: {
        marginBottom: 15,
        width: "85%",
        height: 57,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        borderRadius: 29,
        alignItems: "center",
        elevation: 3
    },
    BMWIconInputView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    BMWIcon: {
        backgroundColor: "white",
        marginLeft: 6
    },
    BMWIconYellow: {
        // borderWidth:1
        backgroundColor: "#FFA514",
        borderRadius: 90,
        color: "black",
        position: "absolute",
        right: 10
    },
    addNewCarView: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        gap: 9,
        marginBottom: 15
    },
    addNewCarIcon: {
        color: "black",
        borderWidth: 1,
        borderRadius: 27,
        padding: 9
    },
    addNewCarTxt: {
        color: "#007AFF",
        fontWeight: "500",
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#007AFF"
    },
    saveBtnView: {
        marginBottom: 9,
        backgroundColor: "#007AFF",
        borderRadius: 33,
        flexDirection: "row",
        gap: 45,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "space-between",
        width: "85%",
        height: 70,
    },
    saveBtnTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        left: 139
    },
    saveBtnIcon: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        color: "black",
        padding: 17,
        right: 3
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: 250,
        width: 250,
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
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        height: 40,
        width: 100
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: "Forza-Bold"
    },
    modalText: {
        color: "black",
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: "Forza-Bold"
    },
});

export default EditProfile;


