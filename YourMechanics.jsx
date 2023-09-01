import { StyleSheet, Text, View, TouchableOpacity, Image ,Linking} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const YourMechanics = ({ route }) => {
    const navigation = useNavigation();
    const { postUserCarNumber, postUserLocationDetails, postUserService, postUserlat, postUserLong } = useContext(StyleContext);
    const [mNumber, setMNumber] = useState();

    const lotationObject = [
        { latitude: postUserlat, longitude: postUserLong },
        { latitude: Number(route.params.acceptedMDetails.m_location.latitude), longitude: Number(route.params.acceptedMDetails.m_location.longitude) }
    ]

    useEffect(() => {
        if (route.params.acceptedMDetails) {
            setMNumber(route.params.acceptedMDetails.m_contact);
            // console.log("postServiceRequestDetails :", route.params.acceptedMDetails);
        }
    }, [route.params.acceptedMDetails]);

    return (
        <View style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.headingView}>
                <AntDesign name='left' size={29} style={styles.headingIcon} onPress={() => navigation.goBack()} />
                <Text style={styles.headingTxt}>Your Mehcanics</Text>
            </View>
            <View style={{ padding: 19 }}>
                <View style={styles.reachingTimeView}>
                    <Text style={styles.reachingTimeHeading}>Mechanic will reach you in time</Text>
                    <Text style={styles.reachingTime}>{route.params.acceptedMDetails.m_duration}</Text>
                </View>
                <View style={styles.page}>
                    <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ width: "100%", height: "100%" }}
                            initialRegion={{
                                latitude: postUserlat,
                                longitude: postUserLong,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Polyline
                                coordinates={[
                                    lotationObject[0],
                                    lotationObject[1]
                                ]}
                                strokeColor="#007AFF"
                                strokeWidth={1.5}
                            />
                            {lotationObject ? lotationObject.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <Marker coordinate={{
                                            latitude: Number(item.latitude),
                                            longitude: Number(item.longitude)
                                        }} tracksViewChanges={false} key={index} image={require("./assets/MapMarker.png")} />
                                    )
                                } else {
                                    return (
                                        <Marker coordinate={{
                                            latitude: Number(item.latitude),
                                            longitude: Number(item.longitude)
                                        }} tracksViewChanges={false} key={index} image={require("./assets/MechanicIcon.png")} />
                                    )
                                }
                            }) : null}
                        </MapView>
                    </View>
                </View>
                <View style={{ backgroundColor: "#FFF", padding: 10, borderWidth: 1, borderColor: "#E0EAEF", justifyContent: "center", width: 350, alignSelf: "center", borderRadius: 10, marginTop: "4%" }}>
                    <View style={styles.yourMechanicsHeaderView}>
                        <View style={styles.yourMechanicsPicContactView}>
                            {route.params.acceptedMDetails.m_image ? <Image source={{ uri: `http://43.204.88.205${route.params.acceptedMDetails.m_image.split("/code")[1]}` }} style={{ height: 50, width: 50, borderRadius: 25 }} /> : null}
                            <View style={styles.contactUrMechanicsView}>
                                <Text style={styles.txts}>Contact your mechanic</Text>
                                <Text style={styles.txts}>{route.params.acceptedMDetails.m_distance} away ({route.params.acceptedMDetails.m_duration})</Text>
                            </View>
                        </View>
                        <View style={styles.callSmsView}>
                            <TouchableOpacity style={styles.callBtn} onPress={() => {Linking.openURL(`tel:${mNumber}`)}}>
                                <Text style={[styles.callBtnTxt, { color: "#FFFFFF" }]}>Call now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.smsBtn} onPress={() => {Linking.openURL(`sms:${mNumber}`)}}>
                                <MaterialIcons name='sms' style={[styles.callBtnTxt, { color: "#FFFFFF", }]} size={40}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontFamily: "Forza-Bold", alignSelf: "center", color: "#505056", letterSpacing: 1, fontSize: 15 }}>Your OTP : {route.params.acceptedMDetails.otp}</Text>
                    </View>
                    <View style={{ padding: "2%" }}>
                        <Text style={{ fontSize: 18, color: "#505056", fontFamily: "Forza-Bold" }}>Order details</Text>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Order number :  </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{route.params.acceptedMDetails.service_code}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Your location : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{postUserLocationDetails.split(",")[2]},{postUserLocationDetails.split(",")[4]}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Car name : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>TATA</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Car no : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{route.params.acceptedMDetails.car_number}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Repair : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{route.params.acceptedMDetails.service_types[0].service_name}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Mechanic charge :</Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{route.params.acceptedMDetails.m_rate}/hr</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headingView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        height: 70,
    },
    headingTxt: {
        color: "#3D4759",
        fontFamily: "Forza-Black",
        fontSize: 19,
        alignItems:"center",
    },
    headingIcon: {
        color: "black",
        right: 88
    },
    page: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        borderRadius: 10
    },
    container: {
        height: 250,
        width: 350,
        // backgroundColor: "tomato",
        borderRadius: 10,
        overflow: 'hidden',
    },
    reachingTimeView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    reachingTimeHeading: {
        fontFamily: "Forza-Bold",
        color: "#505056",
        fontSize: 19
    },
    reachingTime: {
        fontFamily: "Forza-Bold",
        color: "#505056",
        fontSize: 15,
        marginBottom: "5%"
    },
    yourMechanicsHeaderView: {
        padding: 5,
        borderBottomWidth: 1,
        borderColor: "#E0EAEF",
        flexDirection: "column",
        gap: 7,
    },
    yourMechanicsPicContactView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    contactUrMechanicsView: {

    },
    callSmsView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:5
    },
    callBtn: {
        backgroundColor: "#007AFF",
        width: 260,
        height: 44,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    callBtnTxt: {
        fontFamily: "Forza-Bold",
        fontSize: 17,

    },
    smsBtn:{
        padding:10,
        borderRadius:20,
        backgroundColor:"#FFA514"
    },
    orderNumberView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5%"
    },
    txts: {
        fontFamily: "Forza-Bold",
        color: "#3D4759"
    },
    txtsKey: {
        color: "#505056",
    },
    txtsResult: {
        color: "#3D4759",
    }
})
export default YourMechanics;