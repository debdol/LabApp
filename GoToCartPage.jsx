import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StyleContext } from './App';
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from './Loading';

const GoToCartPage = () => {
    const { postAddToCartData, getAddToCartData, getCartCounter, PostCartCounter } = useContext(StyleContext);
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        if (postAddToCartData) {
            // console.log("postAddToCartData :", PostCartCounter);
            setCartData(postAddToCartData);
        }
    }, [postAddToCartData])

    return (
        <View>
            {cartData.length != 0 ? <FlatList data={cartData} keyExtractor={({ item, index }) => index} renderItem={({ item, index }) => {
                // console.log("items :", index)
                return (
                    <View style={styles.container} key={index}>
                        <Text></Text>
                        <View style={{ flexDirection: "column", justifyContent: "space-evenly", width: "66%" }}>
                            <View style={styles.nameAndDeleteView}>
                                <Text style={styles.nameTxt}>{item.name}</Text>
                                <TouchableOpacity onPress={() => {
                                    //Delete API should be Called Here
                                    console.log("itemIndex :", index)
                                }}>
                                    <AntDesign name='delete' size={19} color={"#3D4759"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome name='inr' size={19} color={"#3D4759"} />
                                    <Text style={styles.txt}>{item.price}</Text>
                                </View>
                                <View style={{ flexDirection: "row", borderRadius: 19, justifyContent: "space-evenly", backgroundColor: "#F3F3F3", alignItems: "center", width: 100 }}>
                                    <Text style={[styles.txt, { fontSize: 29 }]} onPress={() => {
                                        // console.log("plus:", PostCartCounter);
                                        if (PostCartCounter > 1) {
                                            getCartCounter(PostCartCounter - 1);
                                        }
                                        // else {
                                        //     //Delete API should be Called Here
                                        // }
                                    }}>-</Text>
                                    <Text style={[styles.txt, { fontSize: 20 }]}>{PostCartCounter}</Text>
                                    <Text style={[styles.txt, { fontSize: 29 }]} onPress={(e) => {
                                        // console.log("plus:", e);
                                        getCartCounter(PostCartCounter + 1);
                                    }}>+</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }} />
                : <Loading />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 368,
        height: 120,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        borderColor: '#E0EAEF',
        borderWidth: 1,
        alignSelf: "center",
        padding: 9,
        borderRadius: 15,
        marginBottom: 9,
        elevation: 9,
        shadowRadius: 15
    },
    nameAndDeleteView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignItems: "center",
        gap: 9
    },
    nameTxt: {
        fontFamily: "Forza-Bold",
        fontSize: 19,
        color: ("#3D4759")
    },
    txt: {
        color: ("#3D4759"),
        fontFamily: "Forza-Bold",
        fontSize: 20
    }
})
export default GoToCartPage