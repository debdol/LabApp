import { useNavigation } from '@react-navigation/native';
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import About from './MehcanicsAboutSpecializationReviews/About';
import Reviews from './MehcanicsAboutSpecializationReviews/Reviews';
import Specialization from './MehcanicsAboutSpecializationReviews/Specialization';
import axios from 'axios';
import Loading from './Loading';

const MechanicsDetails = ({ route }) => {
    const [optionPage, setOptionPage] = useState("About");
    const navigation = useNavigation();
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [serviceTypes, setServiceTypes] = useState();

    // console.log("postServiceRequestDetails :", postServiceRequestDetails[0].service_types);
    useEffect(() => {
        let dates = route.params.item.registered_on.split("-");
        let year = dates[2]
        let onlyYear = year.split(" ");
        setDate(dates[0]);
        setMonth(dates[1]);
        setYear(onlyYear[0]);
    }, [route])

    useEffect(() => {
        axios.get("http://43.204.88.205:90/service-types")
            .then((res) => {
                setServiceTypes(res.data.data);
            })
            .catch((error) => console.log("error in service in mechanicsDetails :", error))
    }, [])
    return (
        <SafeAreaView>
            {serviceTypes ? <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={styles.container}>
                    <ImageBackground source={require("./assets/Rectangle42319.png")} style={styles.headerImgBackGround}>
                        <View style={styles.headingView}>
                            <AntDesign name='left' size={29} style={styles.headingIcon} onPress={() => navigation.goBack()} />
                            <Text style={styles.headingTxt}>Mechanics details</Text>
                        </View>
                    </ImageBackground>
                    <View style={{}}>
                        <View style={styles.firstCard}>
                            <View style={styles.firstCardFirstRow}>
                                <Image source={{ uri: `http://43.204.88.205${route.params.item.profile_picture.split("/code")[1]}` }} style={styles.mechanicsPic} />
                                <View style={styles.firstCardFirstRowNameView}>
                                    <Text style={styles.firstCardFirstRowNameTxt}>{route.params.item.m_name}</Text>
                                    <Text style={styles.firstCardFirstRowNameTxt}>Automobile Mechanic</Text>
                                    <Text style={styles.firstCardFirstRowNameTxt}>Registered On {date}/{month}/{year}</Text>
                                </View>
                            </View>
                            <View style={styles.firstCardSecondRow}>
                                <View style={styles.firstCardSecondRowRatingView}>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>4.8</Text>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>Rating</Text>
                                </View>
                                <Text style={{ borderWidth: 0.5, backgroundColor: "black" }}></Text>
                                <View style={styles.firstCardSecondRowRatingView}>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>{route.params.item.experience} years</Text>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>Experience</Text>
                                </View>
                                <Text style={{ borderWidth: 0.5, backgroundColor: "black" }}></Text>
                                <View style={styles.firstCardSecondRowRatingView}>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>{route.params.item.work_completed} work</Text>
                                    <Text style={styles.firstCardSecondRowRatingTxt}>Complete</Text>
                                </View>
                            </View>
                            <View style={styles.firstCardThirdRow}>
                                <AntDesign name='clockcircle' style={styles.firstCardThirdRowClock} size={18} />
                                <Text style={styles.firstCardThirdRowClock}>Working time: {route.params.item.working_time.from_time}-{route.params.item.working_time.to_time}</Text>
                            </View>
                            <View style={styles.firstCardFourthRow}>
                                <FontAwesome5 name='coins' style={{ color: "black" }} size={20} />
                                <Text style={styles.firstCardThirdRowClock}>Rate per hour :</Text>
                                <Text style={styles.firstCardFourthRowRate}>{route.params.item.rate}/hr</Text>
                            </View>
                        </View>
                        {/* <View style={styles.secondCard}>
                            <View style={styles.secondCardBtnsView}>
                                <TouchableOpacity onPress={() => setOptionPage("About")}>
                                    <Text style={[styles.AboutDisable, (optionPage == "About") ? styles.aboutEnabled : null]}>About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setOptionPage("Specialization")}>
                                    <Text style={[styles.AboutDisable, (optionPage == "Specialization") ? styles.aboutEnabled : null]}>Specialization</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setOptionPage("Reviews")}>
                                    <Text style={[styles.AboutDisable, (optionPage == "Reviews") ? styles.aboutEnabled : null]}>Reviews</Text>
                                </TouchableOpacity>
                            </View>
                            {(optionPage == "About") ? (<About />) : (optionPage == "Reviews") ? (<Reviews />) : (optionPage == "Specialization") ? (<Specialization />) : null}
                        </View> */}

                        {/* <View style={styles.fourthCardView}>
                            <Text>All Reviews(102)</Text>
                            <View style={styles.fourthCardFirstChilCardView}>
                                <View style={styles.fourthCardFirstChildFirstRowView}>
                                    <View>
                                        <Image source={require("./assets/Ellipse7240.png")} style={styles.mechanicImg} />
                                        <View style={styles.fiveStarAndNameView}>
                                            <View style={{ flexDirection: "row" }}>
                                                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                                                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                                                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                                                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                                                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                                            </View>
                                            <Text style={styles.name}>Ahmed Yinusa</Text>
                                        </View>
                                    </View>
                                    <Text>26 Aug 2023</Text>
                                </View>
                                <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam odit incidunt voluptate iusto. Quos perferendis iusto laborum quidem sunt aspernatur.</Text>
                                <View>
                                    <Entypo name='reply' />
                                    <Text>Reply</Text>
                                </View>
                            </View>
                        </View> */}
                    </View>
                </View>
                <View style={styles.thirdCard}>
                    <Text style={styles.thirdCardHeader}>Specialization</Text>
                    <View>
                        <View style={styles.thirdCardHeaderFirstRowView}>
                            <Text style={styles.thirdCardHeaderFirstRowTxt}>Experties</Text>
                            <Feather name='info' size={16} style={styles.thirdCardHeaderFirstRowIcon} />
                        </View>
                        {route.params.item.specialization.map((item, index) => {
                            <View style={styles.thirdCardHeaderSecondRowView} key={index}>
                                <Text style={styles.thirdCardHeaderSecondRowTxt}>{item}</Text>
                            </View>
                        })}
                    </View>
                </View>
                <View style={styles.thirdCard}>
                    <Text style={[styles.thirdCardHeader, { borderBottomWidth: 1, borderBottomColor: "#E0EAEF" }]}>Service Charge</Text>
                    {serviceTypes.map((item, index) => {
                        let lowwerAndHigherCaseName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
                        return (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#E0EAEF", padding: 10 }}>
                                <Text style={{ color: "black", fontFamily: "Forza-Bold", color: "#505056", fontSize: 17 }}>{lowwerAndHigherCaseName}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView> : <Loading />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImgBackGround: {
        height: 250,
        // borderWidth: 1,
    },
    headingView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444444",
        height: 60,
        opacity: 0.6,
    },
    headingTxt: {
        color: "#FFFFFF",
        fontFamily: "Forza-Black"
    },
    headingIcon: {
        color: "#FFFFFF",
        right: 110
    },
    firstCard: {
        marginTop: 22,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0EAEF",
        width: 350,
        height: 350,
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
        paddingHorizontal: 9,
        backgroundColor: "#FFFFFF"
    },
    firstCardFirstRow: {
        flexDirection: "row",
        gap: 9
    },
    mechanicsPic: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    firstCardFirstRowNameView: {
        flexDirection: "column"
    },
    firstCardFirstRowNameTxt: {
        color: "black",
        fontFamily: "Forza-Bold"
    },
    firstCardSecondRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    firstCardSecondRowRatingView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // borderWidth:1
    },
    firstCardSecondRowRatingTxt: {
        color: "black",
        fontFamily: "Forza-Bold"
    },
    firstCardThirdRow: {
        flexDirection: "row",
        // justifyContent:"center",
        // gap:49
        alignItems: "center",
        gap: 9
    },
    firstCardThirdRowClock: {
        color: "black",
        fontFamily: "Forza-Bold"
    },
    firstCardFourthRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9
    },
    firstCardFourthRowRate: {
        color: "#EEA734",
        fontFamily: "Forza-Bold"
    },
    secondCard: {
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0EAEF",
        width: 340,
        height: 300,
        alignSelf: "center",
        paddingHorizontal: 9,
        backgroundColor: "#FFFFFF"
    },
    secondCardBtnsView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15,
        marginBottom: 10,
        borderBottomColor: "#E0EAEF",
        borderBottomWidth: 1
    },
    AboutDisable: {
        color: "black",
        paddingHorizontal: 19
    },
    aboutEnabled: {
        borderBottomWidth: 4,
        borderBottomColor: "#3D4759",
        fontWeight: "500"
    },
    thirdCard: {
        marginTop: 15,
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0EAEF",
        width: 350,
        alignSelf: "center",
        paddingHorizontal: 9,
        padding: 9,
        backgroundColor: "#FFFFFF",
    },
    thirdCardHeader: {
        color: "#3D4759",
        fontSize: 22,
        fontWeight: "500",
        borderBottomWidth: 1,
        borderBottomColor: "#E0EAEF",
        marginBottom: 9,
        fontFamily: "Forza-Bold"
    },
    thirdCardHeaderFirstRowView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        marginBottom: 9
    },
    thirdCardHeaderFirstRowTxt: {
        color: "#505056",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Forza-Bold"
    },
    thirdCardHeaderFirstRowIcon: {
        color: "black"
    },
    thirdCardHeaderSecondRowView: {
        flexDirection: "row",
        gap: 9,
        marginTop: 9
    },
    thirdCardHeaderSecondRowTxt: {
        borderWidth: 1,
        borderColor: "#E0EAEF",
        backgroundColor: "#E5F1FF",
        color: "#505056",
        width: 144,
        height: 39,
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 20,
        fontSize: 12,
        fontFamily: "Forza-Bold"
    },
    fourthCardView: {
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0EAEF",
        width: 340,
        height: 350,
        alignSelf: "center",
        paddingHorizontal: 9,
        padding: 9,
        backgroundColor: "#FFFFFF"
    },
    fiveStar: {
        color: "#DFB300"
    },
    fourthCardFirstChilCardView: {
        backgroundColor: "#FFFFFF"
    },
    fourthCardFirstChildFirstRowView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mechanicImg: {

    },
    fiveStarAndNameView: {

    },
    name: {
        color: "black"
    }
});

export default MechanicsDetails;
