import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StyleContext } from "./App";
import MapboxGL, { MapView, MarkerView } from "@rnmapbox/maps";
import Marker from "@rnmapbox/maps"

MapboxGL.setWellKnownTileServer('Mapbox');
// MapboxGL.setWellKnownTileServer(MapboxGL.TileServers.Mapbox)
MapboxGL.setAccessToken("pk.eyJ1Ijoic2FuZ3JhbS1ta2oiLCJhIjoiY2xqNDR1N2R3MHMycjNkbzAwbTd4eWtpcCJ9.6C-telOrK-86LmYXGu3FVA");

const ManuallyLocation = () => {
    const { postUserlat, postUserLong, getUserlat, getUserLong } = useContext(StyleContext);
    const coordinatesExamples = [postUserLong, postUserlat];

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
        // console.log("co ordinates in manually page :", coordinatesExamples);
    }, []);

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapView style={{ flex: 1 }}>
                    <MapboxGL.Camera
                        zoomLevel={15}
                        centerCoordinate={coordinatesExamples}
                    />
                    <MapboxGL.PointAnnotation
                        id="point"
                        coordinate={coordinatesExamples}
                        draggable={true}
                        onDragEnd={e => {
                            console.log(e.geometry.coordinates);
                            // getUserLong(e.geometry.coordinates[0]);
                            // getUserlat(e.geometry.coordinates[1]);
                        }}
                    />
                </MapView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    page: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    container: {
        height: 770,
        width: 390,
        backgroundColor: "white"
    },
    markerImg: {
        height: 41,
        width: 30,
    },
});

export default ManuallyLocation;