import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { StyleContext } from './App';
// import MapboxGL, { MarkerView } from "@rnmapbox/maps";
// import MapBox from './MAPS/MapBox';
import MapView, { PROVIDER_GOOGLE, Marker, MapMarker, } from 'react-native-maps';
// MapboxGL.setWellKnownTileServer('Mapbox');
export const token = "pk.eyJ1Ijoic2FuZ3JhbS1ta2oiLCJhIjoiY2xqNDR1N2R3MHMycjNkbzAwbTd4eWtpcCJ9.6C-telOrK-86LmYXGu3FVA";
// MapboxGL.setAccessToken(token);
const SearchMechanics = () => {
    const { postUserlat, postUserLong } = useContext(StyleContext);
    const navigation = useNavigation();


    // useEffect(() => {
    //     // MapboxGL.setTelemetryEnabled(false);
    //     // console.log("user lat long :", postUserLong, postUserlat);
    // }, []);


    return (
        <View>
            <View style={styles.txt}>
                <View style={styles.headingView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='left' size={29} style={{ color: "black", marginLeft: 3 }} />
                    </TouchableOpacity>
                    <Text style={{ color: "black", marginLeft: 83, fontFamily: "Forza-Bold", fontSize: 17 }}>Search mechanics</Text>
                </View>
                <Image source={require("./assets/planet-earth.png")} style={styles.earthImg} />
                <Text style={styles.whereIsTheCarTxt}>Where is the car?</Text>
                <Text style={styles.kindlyLet}>Kindly let know the car’s location so that we can fine technicians within the area</Text>
                <TouchableOpacity style={styles.useCurrenLBtn} onPress={() => navigation.navigate("InformationPage")}>
                    <Text style={styles.useCurrenLTxt}>Use current Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inputLocationMBtn} onPress={() => navigation.navigate("ManuallyLocation")}>
                    <Text style={styles.inputeLTxt}>Input Location Manually</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.page}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ width: "100%", height: "80%" }}
                    initialRegion={{
                        latitude: postUserlat,
                        longitude: postUserLong,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    // showsUserLocation={true}
                    zoomTapEnabled={true}
                    maxZoomLevel={25}
                // userLocationPriority='high'
                >
                    <MapMarker coordinate={{ latitude: Number(postUserlat), longitude: Number(postUserLong) }}>
                        <Marker coordinate={{latitude: Number(postUserlat), longitude: Number(postUserLong)}} tracksViewChanges={false}>
                            <Image source={require("./assets/MapMarker.png")} style={styles.markerImg} />
                        </Marker>
                    </MapMarker>
                </MapView>
            </View >
        </View >
    )
}


const styles = StyleSheet.create({
    headingView: {
        flexDirection: "row",
        // justifyContent: "space-between",
        // height: 44,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    txt: {
        position: "absolute",
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        alignItems: "center",
        zIndex: 1,
        width: "100%",
        height: "56%",
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
        elevation: 4,
        shadowColor: "#3f7bbd",
        shadowOpacity: 0.2,
    },
    earthImg: {
        height: 150,
        width: 150
    },
    whereIsTheCarTxt: {
        color: "#3D4759",
        fontFamily: "Forza-Black",
        fontSize: 28
    },
    kindlyLet: {
        color: "#505056",
        fontFamily: "Forza-Bold",
        fontSize: 15,
        width: "89%",
        letterSpacing: 0.5
    },
    useCurrenLBtn: {
        backgroundColor: "#007AFF",
        borderRadius: 35,
        paddingHorizontal: 74,
        paddingVertical: 20
    },
    useCurrenLTxt: {
        color: "white",
        fontSize: 16,
        fontFamily: "Forza-Bold",
    },
    inputLocationMBtn: {
        borderRadius: 35,
        paddingHorizontal: 66,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: "#007AFF",
    },
    inputeLTxt: {
        fontSize: 16,
        fontFamily: "Forza-Bold",
        color: "#007AFF"
    },
    page: {
        top: "40%",
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    container: {
        height: 317,
        width: 389,
        backgroundColor: "white",
    },
    markerImg: {
        height: 36,
        width: 30,
    },
})
export default SearchMechanics