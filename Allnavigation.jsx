import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Mechanic from './Mechanic';
import Cart from './Cart';
import History from './History';
import Profile from './Profile';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchMechanics from './SearchMechanics';
import { StyleContext } from './App';
import InformationPage from './InformationPage';
import EditProfile from './EditProfile';
import axios from 'axios';
import { openServiceRequestDetails } from './APIs';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export const HomeStackScreen = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Mechanic" component={Mechanic} options={(() => ({
                headerShown: false
            }))} /> */}
            <Stack.Screen name="SearchMechanics" component={SearchMechanics} options={(() => ({
                headerShown: false
            }))} />
            <Stack.Screen name="InformationPage" component={InformationPage} options={(() => ({
                headerTitleAlign: "center",
                headerTitle: "Information",
                headerTitleStyle: {
                    fontFamily: "Forza-Bold",
                    letterSpacing: 1
                }
            }))} />

        </Stack.Navigator>
    );
}

const ProfileStackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} options={(() => ({
                headerTitleAlign: "center",
                headerShown: false
            }))} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={(() => ({
                headerShown: true,
                headerTitleAlign: "center",
                headerTitle: "Edit Profile"
            }))} />
        </Stack.Navigator>
    )
}

const Allnavigation = () => {
    const { postPageName, getPageName, postUserLog } = useContext(StyleContext);

    // console.log("pageNameinAllnavigation:", postPageName);
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                height: "10%",
                borderBottomRightRadius: 9,
                borderBottomLeftRadius: 9,
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={
                (({ navigation }) => ({
                    headerShown: false,
                    tabBarButton: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home");
                            getPageName("Home");
                        }} style={postPageName == "Home" ? styles.tabBtnContainer : styles.tabBtnContainerNonClicked}>
                            <View style={styles.btnContainerView}>
                                <Feather name="home" size={20} style={postPageName == "Home" ? styles.tabBtnIconClicked : styles.tabBtnIconNonClicked} />
                                <Text style={[styles.btnText, postPageName == "Home" ? styles.btnTextActive : styles.btnTextHide]}>Home</Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }))} />

            <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options={(({ navigation }) => ({
                headerShown: false,
                tabBarButton: () => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("HomeStackScreen");
                        getPageName("Mechanic")
                    }} style={postPageName == "Mechanic" ? styles.tabBtnContainer : styles.tabBtnContainerNonClicked}>
                        <View style={styles.btnContainerView}>
                            <Feather name="shopping-cart" size={20} style={postPageName == "Mechanic" ? styles.tabBtnIconClicked : styles.tabBtnIconNonClicked} />
                            <Text style={[styles.btnText, postPageName == "Mechanic" ? styles.btnTextActive : styles.btnTextHide]}>Mechanic</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }))} />

            <Tab.Screen name="Cart" component={Cart} options={(({ navigation }) => ({
                headerShown: false,
                tabBarButton: () => (
                    <TouchableOpacity onPress={() => {
                        if (postUserLog) {
                            axios.get(openServiceRequestDetails, {
                                headers: {
                                    'Authorization': `Bearer ${postUserLog}`,
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then((res) => {
                                    if (res.data.data.length !== 0) {
                                        if (res.data.data[0].status === "initiated") {
                                            navigation.navigate("Cart", { acceptedMDetails: res.data.data[0] });
                                            getPageName("Cart")
                                        }
                                    }
                                })
                                .catch((error) => { console.log("error in user data in cart :", error) })
                        }
                    }} style={postPageName == "Cart" ? styles.tabBtnContainer : styles.tabBtnContainerNonClicked}>
                        <View style={styles.btnContainerView}>
                            <Feather name="shopping-cart" size={20} style={postPageName == "Cart" ? styles.tabBtnIconClicked : styles.tabBtnIconNonClicked} />
                            <Text style={[styles.btnText, postPageName == "Cart" ? styles.btnTextActive : styles.btnTextHide]}>Cart</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }))} />

            <Tab.Screen name="History" component={History} options={(({ navigation }) => ({
                headerShown: false,
                tabBarButton: () => (
                    <TouchableOpacity onPress={() => {
                        // navigation.navigate("History");
                        // getPageName("History")
                    }} style={postPageName == "History" ? styles.tabBtnContainer : styles.tabBtnContainerNonClicked}>
                        <View style={styles.btnContainerView}>
                            <MaterialIcons name="watch-later" size={20} style={postPageName == "History" ? styles.tabBtnIconClicked : styles.tabBtnIconNonClicked} />
                            <Text style={[styles.btnText, postPageName == "History" ? styles.btnTextActive : styles.btnTextHide]}>History</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }))} />
            <Tab.Screen name="ProfileStackScreen" component={ProfileStackScreen} options={(({ navigation }) => ({
                headerShown: false,
                headerTitleAlign: "center",
                tabBarButton: () => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ProfileStackScreen");
                        getPageName("Profile")
                    }} style={postPageName == "Profile" ? styles.tabBtnContainer : styles.tabBtnContainerNonClicked}>
                        <View style={styles.btnContainerView}>
                            <MaterialCommunityIcons name="account" size={20} style={postPageName == "Profile" ? styles.tabBtnIconClicked : styles.tabBtnIconNonClicked} />
                            <Text style={[styles.btnText, postPageName == "Profile" ? styles.btnTextActive : styles.btnTextHide]}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                ),
            }))} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBtnContainerNonClicked: {
        alignSelf: "center",
        marginHorizontal: 21
    },
    tabBtnContainer: {
        height: "55%",
        width: 90,
        padding: 12,
        alignSelf: "center",
        backgroundColor: "#D7E2F0",
        borderRadius: 19,
    },
    btnContainerView: {
        gap: 15,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    tabBtnIconClicked: {
        color: "#007AFF"
    },
    tabBtnIconNonClicked: {
        color: "black"
    },
    btnText: {

    },
    btnTextActive: {
        fontWeight: "800",
        color: "#007AFF",
        borderRadius: 9,
    },
    btnTextHide: {
        display: "none",
    }
})
export default Allnavigation