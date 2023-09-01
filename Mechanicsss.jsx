import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { StyleContext } from './App';
import MapView, { PROVIDER_GOOGLE, Marker, MapCircle, } from 'react-native-maps';

const Mechanicsss = () => {
    const navigation = useNavigation();
    const { postServiceRequestDetails, postUserlat, postUserLong, getPageName } = useContext(StyleContext);
    const [markers, setMarkers] = useState();
    const [mechanicsDetails, setMechanicsDetails] = useState();

    useEffect(() => {
        if (mechanicsDetails) {
            let temp = mechanicsDetails.map((item, index) => item.location);
            setMarkers(temp);
        }
    }, [mechanicsDetails])

    useEffect(() => {
        console.log("status in mechanicss page :",postServiceRequestDetails)
        if (postServiceRequestDetails) {
            if (postServiceRequestDetails[0].status === "accepted") {
                navigation.navigate("YourMechanics", { acceptedMDetails: postServiceRequestDetails[0] });
            } else if (postServiceRequestDetails[0].status === "initiated") {
                navigation.navigate("Cart", { acceptedMDetails: postServiceRequestDetails[0] });
                getPageName("Cart")
            }
            else {
                setMechanicsDetails(postServiceRequestDetails[0].mechanic);
            }
        }
    }, [postServiceRequestDetails]);

    const mechanicsList_Handler = ({ item, index }) => {
        return (
            <View style={styles.machanicsNearMeMainContainer} key={index}>
                <View style={styles.flatListPicAndLocationView}>
                    {item.profile_picture ? <Image source={{ uri: `http://43.204.88.205${item.profile_picture.split("/code")[1]}` }} style={styles.mechanicImg} /> : null}
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
                    <Text style={{ width: "79%", color: "black", fontFamily: "Forza-Bold" }}>{item.distance} away ({item.duration})</Text>
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
                            <Text style={{ backgroundColor: "#F2F9FF", borderRadius: 5, color: "#3D4759", width: 90, height: 40, textAlignVertical: "center", textAlign: "center", fontFamily: "Forza-Bold" }}>{item.working_time.from_time}-{item.working_time.to_time}</Text>
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
            {mechanicsDetails ? (
                <>
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
                                showsUserLocation
                                followUserLocation
                                zoomTapEnabled={true}>
                                <MapCircle
                                    center={{
                                        latitude: postUserlat,
                                        longitude: postUserLong,
                                    }}
                                    radius={15000}
                                    strokeWidth={2}
                                    strokeColor={'#1a66ff'}
                                    fillColor={'rgba(230,238,255,0.5)'}
                                />
                                {markers ? (
                                    markers.map((item, index) => {
                                        return (
                                            <Marker coordinate={{ latitude: Number(item.latitude), longitude: Number(item.longitude) }} tracksViewChanges={false} key={index} image={require("./assets/MechanicIcon.png")} />
                                        )
                                    })
                                ) : null}
                            </MapView>
                        </View >
                    </View>
                    <View style={{ position: "absolute", zIndex: 2, top: 544, backgroundColor: "rgba(52, 52, 52, 0.8)", width: "100%", paddingVertical: 9 }}>
                        <FlatList data={mechanicsDetails} renderItem={({ item, index }) => mechanicsList_Handler({ item, index })} keyExtractor={(item, index) => index} horizontal />
                    </View>
                </>
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
        height: 270,
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
        height: "98%",
        width: "100%",
        alignItems: "center",
    },
    container: {
        height: 317,
        width: 389,
        backgroundColor: "white",
    },
});

export default Mechanicsss;
