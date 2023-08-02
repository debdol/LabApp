import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { StyleContext } from "../App";
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



const MapBox = () => (
    <View style={{}}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Marker coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
            }} tracksViewChanges={false}>
                <Image source={require("../assets/MapMarker.png")} style={styles.markerImg} resizeMode={'contain'} />
            </Marker>
        </MapView>
    </View >
);
const styles = StyleSheet.create({
    markerImg: {
        height: 41,
        width: 30,
    },
});

export default MapBox;