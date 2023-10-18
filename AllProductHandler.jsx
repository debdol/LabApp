import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';


const AllProductHandler = ({ item }) => {
    const { getAddToCartData, getCartCounter, PostCartCounter } = useContext(StyleContext);
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { productDetailss: item })} style={styles.productBox}>
            <Image source={require('./assets/wheelProduct.png')} style={{ alignSelf: "center" }} />
            <View style={styles.ratingView}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require('./assets/Star.png')} />
                    <Text style={styles.ratingsTxt}>{item.rating}</Text>
                </View>
                {/* <TouchableOpacity>
                        <AntDesign name='hearto' size={20} />
                    </TouchableOpacity> */}
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceView}>
                <FontAwesome name='inr' size={15} color={"#3D4759"} />
                <Text style={styles.priceTxt}>{item.price}</Text>
            </View>
            <View style={styles.cardFooterView}>
                <TouchableOpacity style={styles.BuyBtn}>
                    <Text style={styles.BuyBtnTxt}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartBtn} onPress={() => {
                    //Add To Cart API should be called here
                    getAddToCartData(item);
                    getCartCounter(PostCartCounter + 1);
                }}>
                    <Entypo name='shopping-cart' size={20} color={"#3D4759"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    productBox: {
        borderWidth: 1,
        borderColor: "#E0EAEF",
        // borderColor: "red",
        borderRadius: 10,
        width: "47%",
        height: 225,
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "#FFF",
    },
    ratingView: {
        flexDirection: "row",
        // borderColor:"red",
        // borderWidth:1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    ratingsTxt: {
        color: "#3D4759",
        fontSize: 15
    },
    productName: {
        fontFamily: "Forza-Bold",
        fontSize: 18,
        color: "#3D4759",
    },
    priceView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    priceTxt: {
        color: "#3D4759",
        fontSize: 20,
        fontFamily: "Forza-Bold"
    },
    cardFooterView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    BuyBtn: {
        // borderWidth: 1,
        // borderColor: "red",
        height: 45,
        width: 95,
        borderRadius: 25,
        alignItems: "center",
        backgroundColor: "#007AFF",
        padding: 11
    },
    BuyBtnTxt: {
        color: "#FFF",
        fontFamily: "Forza-Bold"
    },
    cartBtn: {
        height: 45,
        width: 45,
        borderRadius: 22,
        backgroundColor: "#FDF4E6",
        // borderWidth:1,
        // borderColor:"red",
        alignItems: "center",
        padding: 11
    }
})
export default AllProductHandler;
