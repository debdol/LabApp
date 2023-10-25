import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleContext } from './App';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';


const ProductDetails = ({ route }) => {
    const { postUserLog, getAddToCartData, getCartCounter, PostCartCounter } = useContext(StyleContext);
    const navigation = useNavigation();
    const [showData, setShowData] = useState("description");
    const [count, setCount] = useState(1);
    const [goToCart, setGoToCart] = useState(true);
    // console.log('goToCart :', route.params.productDetailss);
    return (
        <View>
            <View style={styles.HeadingView}>
                <AntDesign name='left' onPress={() => navigation.goBack()} size={35} color={'#FFFFFF'} style={styles.backButton} />
                <Image source={{ uri: route.params.productDetailss.images[0] }} style={styles.productImage} />
                <Text></Text>
            </View>
            <View style={styles.bodyView}>
                <View style={styles.productContainer}>
                    <View style={styles.nameRatingView}>
                        <Text style={styles.originalPriceTxt}>{route.params.productDetailss.product_name}</Text>
                        {/* <View style={styles.ratingView}>
                            <Text style={[styles.originalPriceTxt, { fontSize: 14 }]}>{route.params.productDetailss.rating}</Text>
                            <Entypo name='star' size={15} color={'#F1C203'} />
                        </View> */}
                    </View>
                    <View style={styles.PriceMainView}>
                        {/* <View style={[styles.oiginalPriceView]}>
                            <FontAwesome name='inr' size={22} color={'#F22023'} />
                            <Text style={[styles.originalPriceTxt, { textDecorationLine: "line-through", textDecorationColor: "#FF0000", color: "#F22023" }]}>{route.params.productDetailss.original_price}</Text>
                        </View> */}
                        <View style={styles.oiginalPriceView}>
                            <FontAwesome name='inr' size={22} color={'#3D4759'} />
                            <Text style={styles.originalPriceTxt}>{route.params.productDetailss.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.DescriptionReviewContainer}>
                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={() => {
                            setShowData("description");
                        }} style={showData === "description" ? { borderBottomColor: "#3D4759", borderBottomWidth: 2 } : null}>
                            <Text style={styles.originalPriceTxt}>Description</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setShowData("reviews");
                        }} style={showData === "reviews" ? { borderBottomColor: "#3D4759", borderBottomWidth: 2 } : null}>
                            <Text style={styles.originalPriceTxt}>Reviews</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.originalPriceTxt, { fontSize: 15 }]}>{showData}</Text>
                </View>
                <View style={styles.footerView}>
                    <View style={styles.countMainView}>
                        <Text></Text>
                        <Text style={[styles.originalPriceTxt, { color: '#007AFF' }]}>{count}</Text>
                        <View style={styles.countBtnView}>
                            <TouchableOpacity onPress={() => {
                                setCount(count + 1);
                            }}>
                                <AntDesign name="caretup" style={{ textAlignVertical: "center", padding: 2 }} size={16} color={"#007AFF"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (count > 0) {
                                    setCount(count - 1);
                                }
                            }}>
                                <AntDesign name="caretdown" style={{ textAlignVertical: "center", padding: 2 }} size={16} color={"#007AFF"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {goToCart === true ?
                        (<TouchableOpacity style={styles.checkOutBtn} onPress={() => {
                            getAddToCartData(route.params.productDetailss.item);
                            getCartCounter(PostCartCounter + 1);
                            setGoToCart(false);
                        }}>
                            <Text style={styles.checkOutBtnTxt}>Add to Cart</Text>
                        </TouchableOpacity>)
                        :
                        goToCart === false ?
                            (<TouchableOpacity style={styles.checkOutBtn} onPress={() => {
                                navigation.navigate("GoToCartPage");
                            }}>
                                <Text style={styles.checkOutBtnTxt}>Go to Cart</Text>
                            </TouchableOpacity>) : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HeadingView: {
        // padding: 6,
        elevation:9,
        backgroundColor: "#ffffff",
        // paddingVertical: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        // alignItems: "center",
        borderWidth:1,
        borderColor:"black",
        borderRadius:9
    },
    backButton: {
        position: "absolute",
        top:7,
        left:6,
        zIndex: 9,
        // borderWidth: 1,
        // borderColor: "red",
    },
    productImage: {
        // alignSelf: "center",
        height: 240,
        width: '100%',
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5
    },
    bodyView: {
        padding: 14,
        flexDirection: "column",
        height: "92%",
        position: "relative"
    },
    productContainer: {
        // borderWidth: 1,
        // // borderColor: "#E0EAEF",
        // borderColor: "red",
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 9,
        width: "100%",
        height: "15%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    PriceMainView: {
        // borderWidth: 1,
        // borderColor: "red",
        // justifyContent: "flex-end",
        gap: 9
    },
    oiginalPriceView: {
        flexDirection: "row",
        alignItems: "center"
    },
    originalPriceTxt: {
        fontSize: 22,
        fontFamily: "Forza-Bold",
        color: "#3D4759"
    },
    nameRatingView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    ratingView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 71,
        height: 36,
        borderRadius: 19,
        backgroundColor: "#ECF1F6",
        // borderWidth:1,
        // borderColor:"red",
    },
    DescriptionReviewContainer: {
        borderWidth: 1,
        borderColor: "#E0EAEF",
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 9,
        width: "100%",
        height: "15%",
        // flexDirection: "row",
        // justifyContent: "space-between"
    },
    btnView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 15,
        // borderWidth:1,
        // borderColor:"red",
    },
    footerView: {
        // borderColor:"red",
        // borderWidth:1,
        width: "100%",
        alignSelf: "center",
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        top:515
    },
    countMainView: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "center",
        width: 110,
        height: 66,
        borderWidth: 2,
        borderColor: "#007AFF",
        borderRadius: 35
    },
    countBtnView: {

    },
    checkOutBtn: {
        backgroundColor: "#007AFF",
        borderRadius: 33,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 29,
        width: 200,
        height: 66,
    },
    checkOutBtnTxt: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "Forza-Bold",
    },

})
export default ProductDetails
