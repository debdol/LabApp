import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react'

const ChatComponent = () => {
    return (
        <View>
            <View style={styles.fullBodyContainer}>
                <View style={styles.headerMainContainer}>
                    <View style={styles.imgAndNameView}>
                        <AntDesign name='left' size={30} style={{ color: "black" }} />
                        <View style={styles.imgView}>
                            <Image source={{ uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000" }} style={{ height: 52, width: 52, borderRadius: 26 }} />
                            <Text style={styles.onIndicator}></Text>
                        </View>
                        <View>
                            <Text style={styles.mechanicsName}>Jonh Antoniome</Text>
                            <Text style={{ color: "#737D8D", fontWeight: "500", fontSize: 14, letterSpacing: 0.5 }}>Active now</Text>
                        </View>
                    </View>
                    <View style={styles.headerIconView}>
                        <Feather name='phone-call' style={styles.headerIcon} size={14} />
                        <AntDesign name='videocamera' style={styles.headerIcon} size={14} />
                        <Entypo name='dots-three-vertical' style={styles.headerIcon} size={14} />
                    </View>
                </View>
                <View style={styles.todayView}>
                    <Text style={styles.todayTxt}>Today</Text>
                </View>
                <View style={{}}>
                    <View>
                        <View style={styles.chatBoxMainChildView}>
                            <View style={styles.carMechanic_imgAndCodeView}>
                                <Image source={{ uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000" }} style={{ height: 52, width: 52, borderRadius: 26 }} />
                                <View style={{ flexDirection: "column", justifyContent: "space-between", gap: 5 }}>
                                    <Text style={styles.carMechanicTxt}>Car mechanic</Text>
                                    <Text style={{ color: "#505056", letterSpacing: 0.5, fontWeight: "500", fontSize: 14 }}>sku code -425458</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: "#3D4759", letterSpacing: 0.5, fontWeight: "600" }}>$2338,1</Text>
                            </View>
                        </View>
                        <View style={styles.customerChatView}>
                            <Text></Text>
                            <View style={styles.txtImageMainView}>
                                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                                    <Text style={styles.customerTxt}>Hi, I am Jonh Antoniome. I Need Your Help on an urgent basis</Text>
                                    <Text style={styles.timeStyle}>12:28pm</Text>
                                </View>
                                <Image source={{ uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000" }} style={{ height: 24, width: 24, borderRadius: 12 }} />
                            </View>
                        </View>
                        <View style={styles.companyReplyView}>
                            <Text style={styles.companyReplyTxt}>Yes Please, How can i help you?</Text>
                            <Text style={styles.timeStyle}>12:30pm</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottmInputView}>
                        <TextInput placeholder='Type somthing..........' />
                    </View>
                    <View style={styles.bottomIconsMainContainer}>
                        <View style={styles.bottomIconView}>
                            <Feather name='smile' size={17} style={styles.bottomIcons} />
                        </View>
                        <View style={[styles.bottomIconView, styles.bottomClipIconView]}>
                            <AntDesign name='paperclip' size={17} style={styles.bottomIcons} />
                        </View>
                        <View style={[styles.bottomIconView, styles.bottomShareIconView]}>
                            <AntDesign name='sharealt' size={17} style={styles.bottomIcons} />
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    fullBodyContainer: {
        padding: 14
    },
    headerMainContainer: {
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#DCDDDE"
    },
    imgAndNameView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
    },
    imgView: {
        flexDirection: "row",
    },
    onIndicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "#07E01C",
        left: 40,
        top: 38
    },
    mechanicsName: {
        color: "#1B215A",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 0.5,
    },
    headerIconView: {
        flexDirection: "row"
    },
    headerIcon: {
        // borderWidth:1,
        height: 36,
        width: 36,
        padding: 10,
        textAlign: "center",
        color: "#000000",
        borderRadius: 40,
        marginHorizontal: 3,
        backgroundColor: "#f8f8ff"
    },
    todayView: {
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: "#F6F8FB",
        width: 85,
        height: 33,
        alignItems: "center",
        borderRadius: 17,
        padding: 3
    },
    todayTxt: {
        color: "#737D8D",
        fontWeight: "600",
        fontSize: 18,
        letterSpacing: 0.5,
    },
    chatBoxMainChildView: {
        padding: 12,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F4B755",
        borderRadius: 12
    },
    carMechanic_imgAndCodeView: {
        // borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    carMechanicTxt: {
        color: "#3D4759",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 0.5,
    },
    customerChatView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },
    txtImageMainView: {
        marginTop: 19,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 4,
    },
    customerTxt: {
        padding: 12,
        backgroundColor: "#007AFF",
        width: 230,
        height: 74,
        fontWeight: "500",
        fontSize: 14,
        color: "white",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        letterSpacing: 0.5
    },
    timeStyle: {
        letterSpacing: 1,
        fontSize: 14,
        color: "#737D8D",
        fontWeight: "500"
    },
    companyReplyView: {
        width: 284,
        height: 54,
    },
    companyReplyTxt: {
        backgroundColor: "#DDE5EF",
        color: "black",
        padding: 17,
        fontWeight: "500",
        fontSize: 14,
        letterSpacing: 0.5,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    bottomContainer: {},
    bottmInputView: {
        padding: 9,
        flexDirection: "row",
        marginTop: 317,
        backgroundColor: "#DEEEFF",
        // borderRadius: 14,
        height: 60,
        width: 250,
        marginLeft: 36
    },
    bottomIconsMainContainer: {
        // borderWidth:1
        backgroundColor: "#DEEEFF",
    },
    bottomIconView: {
        position: "absolute",
        zIndex: 1,
        bottom: 15,
        left: 3,
        backgroundColor: "#007AFF",
        height: 30,
        width: 30,
        borderRadius: 15
    },
    bottomIcons: {
        padding: 6,
        color: "white"
    },
    bottomClipIconView: {
        left: 288,
    },
    bottomShareIconView: {
        left: 328
    }
})
export default ChatComponent