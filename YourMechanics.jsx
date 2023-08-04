import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import call from "react-native-phone-call";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const YourMechanics = () => {
    const navigation = useNavigation();
    const { postUserCarNumber, postUserLocationDetails, postUserService, postServiceRequestDetails, postMehcanicsDetails, postUserlat, postUserLong } = useContext(StyleContext);
    const [mNumber, setMNumber] = useState();
    const [reachTime, setReachTime] = useState();

    const lotationObject = [
        { latitude: postUserlat, longitude: postUserLong },
        { latitude: Number(postMehcanicsDetails.location.latitude), longitude: Number(postMehcanicsDetails.location.longitude) }
    ]

    useEffect(() => {
        setMNumber(postMehcanicsDetails.contact_number);
        // console.log("postServiceRequestDetails :",postServiceRequestDetails);
        axios.get("http://43.204.88.205:90/get-mechanic-reviews?mechanic_id=RSM458954&page=1&page_size=10")
            .then((res) => console.log("reviews :", res))
            .catch((err) => console.log(err))
    }, []);

    const callMechanic = () => {
        if (mNumber) {
            console.log("call number :", mNumber);
            let args = {
                number: mNumber, // String value with the number to call
                prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call 
                skipCanOpen: false // Skip the canOpenURL check
            }
            call(args).catch(console.error)
        } else {
            console.log("hosse na ");
        }
    }

    return (
        <View style={{ backgroundColor: "#FFFFFF" }}>
            <View style={styles.headingView}>
                <AntDesign name='left' size={29} style={styles.headingIcon} onPress={() => navigation.goBack()} />
                <Text style={styles.headingTxt}>Your Mehcanics</Text>
            </View>
            <View style={{ padding: 19 }}>
                <View style={styles.reachingTimeView}>
                    <Text style={styles.reachingTimeHeading}>Mechanic will reach you in time</Text>
                    <Text style={styles.reachingTime}>18:00-18:10</Text>
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
                                strokeWidth={2}
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
                <View style={{ backgroundColor: "#FFF", padding: 10, borderWidth: 1, borderColor: "#E0EAEF", justifyContent: "center", width: 350, alignSelf: "center", borderRadius: 10, marginTop: "9%" }}>
                    <View style={styles.yourMechanicsHeaderView}>
                        <View style={styles.yourMechanicsPicContactView}>
                            <Image source={{ uri: `http://43.204.88.205${postMehcanicsDetails.profile_picture.split("/code")[1]}` }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                            <View style={styles.contactUrMechanicsView}>
                                <Text style={styles.txts}>Contact your mechanic</Text>
                                <Text style={styles.txts}>{postMehcanicsDetails.distance} away ({postMehcanicsDetails.duration})</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.callBtn} onPress={() => callMechanic()}>
                                <Text style={[styles.callBtnTxt, { color: "#FFFFFF" }]}>Call now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ marginBottom: 10, fontSize: 18, color: "#505056", fontFamily: "Forza-Bold" }}>Order details</Text>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Order number : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>#ASDF-AASDF</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Your location : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{postUserLocationDetails[0]} ,{postUserLocationDetails[4]}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Car name : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>TATA</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Car no : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{postUserCarNumber}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Repair : </Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{postUserService}</Text>
                        </View>
                        <View style={styles.orderNumberView}>
                            <Text style={[styles.txts, styles.txtsKey]}>Mechanic charge :</Text>
                            <Text style={[styles.txts, styles.txtsResult]}>{postMehcanicsDetails.rate}$/hr</Text>
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
        fontSize: 19
    },
    headingIcon: {
        color: "black",
        right: 90
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
        marginBottom: "10%"
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
        color: "#3D4759"
    }
})
export default YourMechanics;