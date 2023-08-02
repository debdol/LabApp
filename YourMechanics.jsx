import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapboxGL from "@rnmapbox/maps";
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import call from "react-native-phone-call";
import axios from 'axios';
import { token } from './SearchMechanics';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1Ijoic2FuZ3JhbS1ta2oiLCJhIjoiY2xqNDR1N2R3MHMycjNkbzAwbTd4eWtpcCJ9.6C-telOrK-86LmYXGu3FVA");

const YourMechanics = () => {
    const navigation = useNavigation();
    const { postUserCarNumber, postUserLocationDetails, postUserService, postServiceRequestDetails, postMehcanicsDetails, postUserlat, postUserLong } = useContext(StyleContext);
    const coordinatesExamples = [postMehcanicsDetails.location.longitude, postMehcanicsDetails.location.latitude];
    const userLatLong = [postUserLong, postUserlat];
    const [distance, setDistance] = useState();
    const [time, setTime] = useState();
    const [mNumber, setMNumber] = useState(null);
    // console.log("co ordinates in map page :", postUserLong,postUserlat,postMehcanicsDetails.location.longitude,postMehcanicsDetails.location.latitude);
    let uLong = postUserLong;
    let uLat = postUserlat;
    let mLong = postMehcanicsDetails.location.longitude;
    let mLat = postMehcanicsDetails.location.latitude
    const lotationObject = [
        { longitude: postUserLong, latitude: postUserlat },
        { longitude: postMehcanicsDetails.location.longitude, latitude: postMehcanicsDetails.location.latitude }
    ]
    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
        setMNumber(postMehcanicsDetails.contact_number);
        // console.log("number :", mNumber);
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${uLong},${uLat};${mLong},${mLat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${token}`)
            .then((res) => {
                console.log("responecececec :", res.data.routes[0]);
                let kmDistance = Math.floor(res.data.routes[0].distance / 1000);
                let minTime = Math.floor(res.data.routes[0].duration / 60);
                console.log("time :",minTime);
                setTime(minTime);
                setDistance(kmDistance);
            })
            .catch((error) => console.log(error))
    }, []);

    const callMechanic = () => {
        if (mNumber) {
            const args = {
                number: mNumber, // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
                skipCanOpen: true // Skip the canOpenURL check
            }
            call(args).catch(console.error)
            console.log("huss bal");
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
                        <MapboxGL.MapView style={{ flex: 1, }}>
                            {lotationObject ? lotationObject.map((item, index) => {
                                // console.log("items :", item);
                                return (
                                    <View key={index}>
                                        <MapboxGL.Camera
                                            zoomLevel={7}
                                            centerCoordinate={userLatLong}
                                        />
                                        <MapboxGL.PointAnnotation
                                            id="point"
                                            coordinate={[item.longitude, item.latitude]}
                                        />
                                    </View>
                                )
                            }) : null}
                        </MapboxGL.MapView>
                    </View>
                </View>
                <View style={{
                    backgroundColor: "#FFF",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#E0EAEF",
                    justifyContent: "center",
                    width: 350,
                    alignSelf: "center",
                    borderRadius: 10,
                    marginTop: "9%"
                }}>
                    <View style={styles.yourMechanicsHeaderView}>
                        <View style={styles.yourMechanicsPicContactView}>
                            <Image source={require("./assets/Ellipse7227.png")} style={{ height: 50, width: 50 }} />
                            <View style={styles.contactUrMechanicsView}>
                                <Text style={styles.txts}>Contact your mechanic</Text>
                                <Text style={styles.txts}>{distance}km away ({time}mins)</Text>
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
        backgroundColor: "tomato",
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