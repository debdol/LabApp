import { Image, StyleSheet, Text, TouchableOpacity, View, Linking, Alert, TextInput, FlatList, SafeAreaView, Animated, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleContext } from './App';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
// import { Alert, VStack, HStack, IconButton, Box, Center, CloseIcon } from "native-base";

const ProductPage = ({ route }) => {
    const { getAddToCartData, getCartCounter, PostCartCounter } = useContext(StyleContext);
    const navigation = useNavigation();
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 120);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 120],
        outputRange: [0, -120]
    })

    const allProducts = [
        {
            image: "./assets/wheelProduct.png",
            rating: "4.5",
            name: "Apollo Tyres",
            price: "600",
            original_price: "500"
        },
        {
            image: "./assets/wheelProduct.png",
            rating: "5",
            name: "Apollo Bike",
            price: "500",
            original_price: "500"
        },
        {
            image: "./assets/wheelProduct.png",
            rating: "4.9",
            name: "Apollo Window",
            price: "400",
            original_price: "500"
        },
        {
            image: "./assets/wheelProduct.png",
            rating: "4.4",
            name: "Apollo Door",
            price: "300",
            original_price: "500"
        },
        {
            image: "./assets/wheelProduct.png",
            rating: "4",
            name: "Apollo Mirror",
            price: "200",
            original_price: "500"
        }
    ]
    const allProductHandler = (item, index) => {
        // console.log("item :", item.item)
        return (
            <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { productDetailss: item })} key={index}>
                <View style={{ borderColor: "#E0EAEF", borderWidth: 1, width: "48%", height: 235, padding: 6, flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "#FFF", borderRadius: 10, }}>
                    <Image source={require('./assets/wheelProduct.png')} style={{ alignSelf: "center" }} />
                    <View style={styles.ratingView}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require('./assets/Star.png')} />
                            <Text style={styles.ratingsTxt}>{item.item.rating}</Text>
                        </View>
                        {/* <TouchableOpacity>
                            <AntDesign name='hearto' size={20} />
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.productName}>{item.item.name}</Text>
                    <View style={styles.priceView}>
                        <FontAwesome name='inr' size={15} color={"#3D4759"} />
                        <Text style={styles.priceTxt}>{item.item.price}</Text>
                    </View>
                    <View style={styles.cardFooterView}>
                        <TouchableOpacity style={styles.BuyBtn}>
                            <Text style={styles.BuyBtnTxt}>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartBtn} onPress={() => {
                            //Add To Cart API should be called here
                            getAddToCartData(item.item);
                            getCartCounter(PostCartCounter + 1);
                        }}>
                            <Entypo name='shopping-cart' size={20} color={"#3D4759"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ color: "#FFFFFF" }}>
            <View style={styles.productHeadingView}>
                <AntDesign name='left' size={29} style={{ color: "#3D4759" }} onPress={() => navigation.goBack()} />
                <Text style={styles.productHeadingTxt}>Shop</Text>
                <TouchableOpacity style={{ position: "relative" }} onPress={() => {
                    navigation.navigate("GoToCartPage");
                }}>{PostCartCounter > 0 ?
                    <Text style={{ borderColor: "red", borderWidth: 1, position: "absolute", height: 20, width: 20, right: 15, top: 0, bottom: 19, borderRadius: 10, zIndex: 2, backgroundColor: "red", textAlign: "center", fontFamily: "forza-Bold", color: "#FFFFFF" }}>{PostCartCounter}</Text>
                    : null}
                    <FontAwesome name='shopping-bag' size={20} style={{ color: "black" }} />
                </TouchableOpacity>
            </View>
            <View style={styles.ProductContainer}>
                <View style={styles.productSlideChildContainer}>
                    <Image source={require('./assets/cartimg.png')} />
                    <View style={styles.productSlideTxtView}>
                        <Text style={styles.safeOnTheRoad}>SAFE ON THE ROAD</Text>
                        <TouchableOpacity style={styles.buyNowBtn}>
                            <Text style={{ fontFamily: "Forza-Bold", color: "#3D4759" }}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.locationView}>
                    <View style={{ width: "50%", flexDirection: "row", gap: 10 }}>
                        <View style={styles.locationContainer}>
                            <Entypo name='location-pin' style={styles.locationI} size={24} />
                        </View>
                        <TouchableOpacity>
                            <Text style={{
                                fontWeight: "400",
                                fontSize: 12,
                                color: "black",
                                fontFamily: "Forza-Bold"
                            }}>your location</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{
                                    color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                                }} ellipsizeMode='tail' numberOfLines={1}>placeName,</Text>
                                <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>stateName</Text>
                                <AntDesign name="caretup" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <Animated.View style={{
            transform: [
              { translateY: translateY }
            ]
          }}> */}
                <View style={styles.inputView}>
                    <AntDesign name='search1' size={20} style={{ fontWeight: "400", marginLeft: 22, fontSize: 15, color: "black", fontFamily: "Forza-Bold" }} />
                    <TextInput style={styles.inputStyle} placeholder='Search' placeholderTextColor={"#3D4759"} />
                </View>
                {/* </Animated.View> */}
                <View style={styles.ourProductHeadingView}>
                    <Text style={styles.ourProductTxt}>Our products</Text>
                    <FontAwesome name='sliders' size={25} style={{ color: "black" }} />
                </View>
                <Text style={styles.ourProductTxt}>All products</Text>
                <FlatList data={allProducts} keyExtractor={(item, index) => index} renderItem={({ item, index }) => allProductHandler({ item, index })} onScroll={(e) => {
                    // console.log("scrolling:", e);
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                }} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    ProductContainer: {
        height: "100%",
        padding: 9
    },
    productHeadingView: {
        padding: 9,
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19
        // borderWidth:1,
        // borderColor:"red",
    },
    productHeadingTxt: {
        fontFamily: "Forza-Bold",
        fontSize: 20,
        color: "#3D4759"
    },
    // productSlideCard: {
    //   alignSelf: "center",
    //   // flexDirection: "column",
    //   backgroundColor: "#F4B755",
    //   width: "100%",
    //   height: "50%",
    //   padding: 10,
    //   borderRadius: 16,
    //   borderColor: "red",
    //   borderWidth:1
    // },
    productSlideChildContainer: {
        flexDirection: "row",
        backgroundColor: "#F4B755",
        justifyContent: "space-between",
        width: "100%",
        height: "26%",
        borderRadius: 16,
        padding: 10,
        marginBottom: "3%"
    },
    safeOnTheRoad: {
        fontFamily: "Forza-Black",
        color: "#1A1A1A",
    },
    productSlideTxtView: {
        // borderWidth: 1,
        // borderColor: "red",
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: "flex-end"
    },
    buyNowBtn: {
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#FFFFFF",
        borderRadius: 23,
        width: 160,
        height: 45,
    },
    locationView: {
        paddingHorizontal: 11,
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 19,
        marginBottom: "3%"
        // borderWidth: 1,
        // borderColor: "red",
    },
    locationContainer: {
        backgroundColor: "#F1F7FF",
        borderWidth: 1,
        borderColor: "#91BAF6",
        borderRadius: 22,
        height: 40,
        width: 40,
    },
    locationI: {
        top: "19%",
        left: "17.87%",
        color: "#FFA514"
    },
    inputView: {
        backgroundColor: "#D7E2F0",
        // borderWidth: 1,
        // borderColor: "red" ,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 33,
        height: 50,
        marginBottom: "3%",
        width: "100%",
    },
    inputStyle: {
        height: 40,
        width: "88%",
        padding: 4,
        letterSpacing: 1,
        fontSize: 15,
        fontFamily: "Forza-Bold",
        // backgroundColor: "#D7E2F0",
        // borderWidth: 1,
        // borderColor: "red"
    },
    ourProductHeadingView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "3%",
        // borderWidth: 1,
        // borderColor: "red"
    },
    ourProductTxt: {
        fontFamily: "Forza-Bold",
        fontSize: 22,
        marginBottom: "3%",
        color: "#3D4759"
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
export default ProductPage;