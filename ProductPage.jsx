import { Image, StyleSheet, Text, TouchableOpacity, View, Linking, Alert, TextInput, FlatList, SafeAreaView, Animated, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleContext } from './App';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import AllProductHandler from './AllProductHandler';
import axios from 'axios';
import { error } from 'console';
// import { Alert, VStack, HStack, IconButton, Box, Center, CloseIcon } from "native-base";

const ProductPage = ({ route }) => {
    const { getAddToCartData, getCartCounter, PostCartCounter, postUserLocationDetails } = useContext(StyleContext);
    const navigation = useNavigation();
    const [placeName, setPlaceName] = useState();
    const [yAxis, setYaxis] = useState();
    const [searchedProduct, setSearchedProduct] = useState();
    const [allProducts, setAllProducts] = useState();

    useEffect(() => {
        axios.get("http://43.204.88.205:90/all-parts-details")
            .then((response) => {
                console.log('products:', response.data.data);
                setAllProducts(response.data.data);
            })
            .catch((error) => console.log("error_in_app_parts_details:", error))
    }, [])
    const searcheProduct_handler = (searchedProduct) => {
        //Search API should b called here
        console.log("searchedProduct :", searchedProduct);
    }

    useEffect(() => {
        if (searchedProduct) {
            searcheProduct_handler(searchedProduct);
        }
    }, [searchedProduct]);

    useEffect(() => {
        if (postUserLocationDetails) {
            setPlaceName(postUserLocationDetails.split(','));
        }
    }, [postUserLocationDetails])

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollViewStyle} showsVerticalScrollIndicator={false} onScroll={(event) => {
                const y = event.nativeEvent.contentOffset.y;
                // console.log('eventSc:', parseFloat(y).toFixed(0).toString());
                setYaxis(parseFloat(y).toFixed(0).toString());
            }}>
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
                                {placeName ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{
                                        color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                                    }} ellipsizeMode='tail' numberOfLines={1}>{placeName[0]},</Text>
                                    <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>{placeName[1]}</Text>
                                    <AntDesign name="caretdown" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
                                </View> : null}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AntDesign name='search1' size={20} style={{ fontWeight: "400", marginLeft: 22, fontSize: 15, fontFamily: "Forza-Bold" }} color={"#3D4759"} />
                            <TextInput style={styles.inputStyle} placeholder='Search' placeholderTextColor={"#3D4759"} value={searchedProduct} onChangeText={(text) => {
                                setSearchedProduct(text);
                            }} />
                        </View>
                        {searchedProduct ?
                            <TouchableOpacity onPress={() => setSearchedProduct()}>
                                <Entypo size={25} name='cross' color={"#FFFFFF"} style={styles.cross} />
                            </TouchableOpacity> : null}
                    </View>
                    <View style={styles.ourProductHeadingView}>
                        <Text style={styles.ourProductTxt}>Our products</Text>
                        <FontAwesome name='sliders' size={25} style={{ color: "black" }} />
                    </View>
                    <Text style={styles.ourProductTxt}>All products</Text>
                    {allProducts ?
                        <View style={styles.allProductView}>
                            {allProducts.map((item, index) => {
                                return (
                                    <AllProductHandler item={item} key={index} />
                                )
                            })}
                        </View> : null}
                </View>
            </ScrollView>
            <View style={yAxis >= 360 ? [{ position: "absolute", zIndex: 10, top: 0, alignSelf: "center" }, styles.inputView] : styles.inputView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name='search1' size={20} style={{ fontWeight: "400", marginLeft: 22, fontSize: 15, fontFamily: "Forza-Bold" }} color={'#3D4759'} />
                    <TextInput style={styles.inputStyle} placeholder='Search' placeholderTextColor={"#3D4759"} onChangeText={(text) => {
                        setSearchedProduct(text);
                    }} value={searchedProduct} />
                </View>
                {searchedProduct ?
                    <TouchableOpacity onPress={() => setSearchedProduct()}>
                        <Entypo size={25} name='cross' color={"#FFFFFF"} style={styles.cross} />
                    </TouchableOpacity> : null}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    scrollViewStyle: {
        color: "#FFFFFF",
        height: "100%"
    },
    ProductContainer: {
        height: "100%",
        padding: 9,
    },
    productHeadingView: {
        padding: 9,
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
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
        height: "15%",
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
        width: "82%",
        padding: 4,
        letterSpacing: 1,
        fontSize: 15,
        fontFamily: "Forza-Bold",
        color: "#3D4759",
        // backgroundColor: "#D7E2F0",
        // borderWidth: 1,
        // borderColor: "red"
    },
    cross: {
        textAlign: "center",
        textAlignVertical: "center",
        position: "absolute",
        left: -4,
        bottom: -14,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        backgroundColor: "#F12028",
        borderRadius: 20
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
    allProductView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: "wrap",
        width: "100%",
        height: "140%",
        gap: 8,
        // borderColor:"red",
        // borderWidth:1
    }
})
export default ProductPage;