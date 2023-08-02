import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
const MechanicHistoryFlatlist = (item:any) => {
    // console.log(item.item[0].name);
    return (
        <View style={styles.flatListMainConatiner} >
            <Image source={{ uri: item.item[0].image }} style={{
                height: 130,
                width: 130,
                borderRadius: 9
            }} />
            <View style={styles.txtContainer}>
                <Text style={styles.name}>{item.item[0].name}</Text>
                <View style={styles.loactionIconNameView}>
                    <Entypo name='location-pin' style={{
                        color: "#3D4759",
                    }} size={25} />
                    <Text style={styles.locationTxt}>{item.item[0].location}</Text>
                </View>
                <Text style={styles.codeTxt}>{item.item[0].code}</Text>
                <View style={styles.priceTrackOrderView}>
                    <Text style={styles.costTxt}>{item.item[0].cost}</Text>
                    <TouchableOpacity style={styles.trackOrderBtn}>
                        <Text style={styles.trackOrderBtnTxt}>{item.item[0].status}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    flatListMainConatiner: {
        marginBottom: 9,
        // justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        flexDirection: "row",
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },
    txtContainer: {
        padding: 3,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    loactionIconNameView: {
        width: "60%",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        color: "#3D4759",
        letterSpacing: 0.5,
        fontSize: 20,
        fontFamily:"Forza-Bold",
    },
    locationTxt: {
        color: "#3D4759",
        // fontWeight: "400",
        fontSize: 15,
        fontFamily:"Forza-Bold",
    },
    codeTxt: {
        color: "#3D4759",
        fontSize: 16,
        // fontWeight: "200",
        fontFamily:"Forza-Bold",
    },
    priceTrackOrderView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    costTxt: {
        color: "#3D4759",
        fontSize: 18,
        fontWeight: "600",
    },
    trackOrderBtn: {
        backgroundColor: "#FFA514",
        borderRadius: 18,
        width: 122,
        height: 33,
        padding: 5,
        marginLeft: 9
    },
    trackOrderBtnTxt: {
        color: "white",
        textAlign: "center"
    }
});
export default MechanicHistoryFlatlist;