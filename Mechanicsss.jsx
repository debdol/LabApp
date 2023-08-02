import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { StyleContext } from './App';
// import MapboxGL, { MarkerView } from "@rnmapbox/maps";
import axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, MapViewDirections, } from 'react-native-maps';

const Mechanicsss = () => {
    const navigation = useNavigation();
    const { postServiceRequestDetails, postUserlat, postUserLong } = useContext(StyleContext);
    const [markers, setMarkers] = useState(null);
    // console.log("M-Coordinate", markers);
    const mechanicsDetailsUpdation = () => {
        let query = "";
        if (markers) {
            for (let i = 0; i < markers.length; i++) {
                if (i == markers.length - 1) {
                    query = query + `${markers[i].longitude},${markers[i].latitude}`
                    // console.log("distancesss :", query);
                }
                else {
                    query = query + `${markers[i].longitude},${markers[i].latitude};`
                }
            }
        }
        // axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${postUserlat, postUserLong}&destinations=${28.548552, 77.257133}&units=imperial&key=`)
        //     .then((res) => { console.log("res in map :", res.data) })
        //     .catch((err) => console.log("res in map :", err))
    };

    useEffect(() => {
        if (postServiceRequestDetails) {
            const temp = postServiceRequestDetails.map((item) => item.location);
            // console.log("mD :",temp)
            setMarkers(temp);
        }
    }, [postServiceRequestDetails]);

    useEffect(() => {
        mechanicsDetailsUpdation();
    }, [markers])

    const mechanicsList_Handler = ({ item, index }) => {
        // mechanicsDetailsUpdation(item.location);
        // console.log("imag pathssssssss:", `http://43.204.88.205${imgPath[1]}`,"index :",index);
        return (
            <View style={styles.machanicsNearMeMainContainer}>
                <View style={styles.flatListPicAndLocationView}>
                    <Image source={{ uri: `http://43.204.88.205${item.profile_picture.split("/code")[1]}` }} style={styles.mechanicImg} />
                    <View style={{ marginLeft: 11 }}>
                        <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>{item.m_name}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <EvilIcons name='star' size={20} style={styles.fiveStar} />
                            <EvilIcons name='star' size={20} style={styles.fiveStar} />
                            <EvilIcons name='star' size={20} style={styles.fiveStar} />
                            <EvilIcons name='star' size={20} style={styles.fiveStar} />
                            <EvilIcons name='star' size={20} style={styles.fiveStar} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.AutomobileTxt}>Automobile Mechanic</Text>
                    <View style={styles.locationPinAndLocationName}>
                        <Entypo name='location-pin' style={{ fontSize: 20, color: "black" }} />
                        <Text style={{ fontSize: 16, color: "black", fontFamily: "Forza-Bold" }}>{item.address}</Text>
                    </View>
                    <View style={styles.flatListFooterMainView}>
                        <View style={{
                            flexDirection: "column",
                            justifyContent: "center", alignItems: "center",
                        }}>
                            <Text style={{ fontSize: 12, marginBottom: 9, color: "#3D4759", fontFamily: "Forza-Bold" }}>Working time</Text>
                            <Text style={{ backgroundColor: "#F2F9FF", borderRadius: 5, color: "#3D4759", width: 90, height: 40, textAlignVertical: "center", textAlign: "center" }}>{item.working_time.from_time}am-{item.working_time.to_time}pm</Text>
                        </View>
                        <View style={{
                            // borderWidth: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 9
                        }}>
                            <Text style={{ marginBottom: 8, fontSize: 12, color: "#3D4759", fontFamily: "Forza-Bold" }}>Rate</Text>
                            <Text style={{
                                width: 100,
                                height: 37,
                                borderRadius: 5,
                                backgroundColor: "#EEA734",
                                color: "white",
                                textAlign: "center",
                                padding: 9
                            }}>${item.rate}/Hr</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => { navigation.navigate("MechanicsDetails", { item: item }) }} >
                    <Text style={styles.viewDetailsTxt}>View details</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            {postServiceRequestDetails ? (
                <View style={styles.page}>
                    <View style={styles.headingView}>
                        <AntDesign name='left' size={29} style={styles.headingIcon} onPress={() => navigation.goBack()} />
                        <Text style={styles.headingTxt}>Mechanics</Text>
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
                            maxZoomLevel={15}
                            loadingEnabled={true}
                            moveOnMarkerPress={true}
                        // userLocationPriority='high'
                        >
                            {markers ? (
                                markers.map((item, index) => {
                                    return (
                                        <Marker coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }}
                                            key={index}
                                            tracksViewChanges={false}>
                                            <Image source={require("./assets/MapMarker.png")} style={styles.markerImg} />
                                        </Marker>
                                    )
                                })
                            ) : null}
                        </MapView>
                    </View >
                    <View style={{ position: "absolute", zIndex: 2, top: 544 }}>
                        <FlatList data={postServiceRequestDetails} renderItem={({ item, index }) => mechanicsList_Handler({ item, index })} keyExtractor={(item, index) => index} horizontal />
                    </View>
                </View>
            ) : (<ActivityIndicator size="large" color="#0000ff" style={{ alignItems: "center", marginTop: 350 }} />)}
        </View>
    );
};

const styles = StyleSheet.create({
    headingView: {
        position: "absolute",
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 70,
        elevation: 4,
        shadowColor: "#878787",
        borderWidth: 1,
        borderColor: "white",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    headingTxt: {
        color: "black",
        fontFamily: "Forza-Black",
        fontSize: 19
    },
    headingIcon: {
        color: "black",
        right: 100
    },
    machanicsNearMeMainContainer: {
        marginHorizontal: 3,
        borderWidth: 1,
        borderColor: "#E0EAEF",
        backgroundColor: "#FFFFFF",
        height: 290,
        width: 220,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        borderRadius: 9,
        padding: 10,
    },
    flatListPicAndLocationView: {
        flexDirection: "row",
        alignItems: "center",
        // borderWidth:1,
        width: "100%"
    },
    mechanicImg: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    fiveStar: {
        color: "#DFB300"
    },
    AutomobileTxt: {
        color: "#3D4759",
        fontWeight: "400",
        fontSize: 17,
        marginTop: 9,
        marginBottom: 4,
        fontFamily: "Forza-Black"
    },
    locationPinAndLocationName: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    flatListFooterMainView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    viewDetailsBtn: {
        backgroundColor: "#007AFF",
        width: 200,
        height: 44,
        borderRadius: 44,
        marginTop: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    viewDetailsTxt: {
        color: "white",
        fontWeight: "400",
        fontSize: 14
    },
    page: {
        // top: "40%",
        height: "140%",
        width: "100%",
        alignItems: "center",
    },
    container: {
        height: 317,
        width: 389,
        backgroundColor: "white",
    },
    markerImg: {
        height: 40,
        width: 33,
    },
});

export default Mechanicsss;
