import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import { useNavigation } from '@react-navigation/native';
import { StyleContext } from './App';
import axios from 'axios';
import Loading from './Loading';
import { nearByMechanicss, openServiceRequestDetails, } from './APIs';

const Home = () => {
  const navigation = useNavigation();
  const { postPageName, getPageName, postUserName, postUserCardValidity, postUsercard_number, postUserlat, postUserLong, getUserLocationDetails, postUserLog } = useContext(StyleContext);
  const [refreshing, setRefreshing] = useState(false);
  const [fullAddress, setFullAddress] = useState();
  const [placeName, setPlaceName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [nearByMechanics, setNearByMechanics] = useState([]);
  const [fullAddressControllerVariable, setFullAddressControllerVariable] = useState(false);



  const showFullAddress = () => {
    setFullAddressControllerVariable(!fullAddressControllerVariable);
  }


  const nearByMechanicsApi_Handler = () => {
    axios.get(nearByMechanicss, {
      headers: {
        'Authorization': `Bearer ${postUserLog}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        // console.log("near by mechanics :", res.data.mechanics);
        setNearByMechanics(res.data.mechanics);
      })
      .catch((err) => console.log("near by mechanics error:", err))
  }

  const nearByMechanicsList = ({ item, index }) => {
    if (nearByMechanics) {
      return (
        <View style={styles.machanicsNearMeMainContainer}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            // borderWidth:1,
            width: "100%"
          }}>
            <Image source={{
              uri: `http://43.204.88.205${item.profile_picture.split("/code")[1]}`
            }} style={{ height: 50, width: 50, borderRadius: 25 }} />
            <View style={{ marginLeft: 11 }}>
              <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>{item.m_name}</Text>
              <View style={{ flexDirection: "row" }}>
                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                <EvilIcons name='star' size={20} style={styles.fiveStar} />
                <EvilIcons name='star' size={20} style={styles.fiveStar} />
              </View>
            </View>
          </View>
          <View>
            <Text style={{ color: "#3D4759", fontWeight: "400", fontSize: 16, marginTop: 9, marginBottom: 4, fontFamily: "Forza-Bold" }}>Automobile Mechanic</Text>
            <Text style={{ color: "#3D4759", marginBottom: 6, fontFamily: "Forza-Bold" }}>12km away (18mins)</Text>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5
            }}>
              <Entypo name='location-pin' style={{ fontSize: 20 }} />
              <Text style={{ fontSize: 16, fontFamily: "Forza-Bold" }}>{item.address}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{
                // borderWidth: 1,
                flexDirection: "column",
                justifyContent: "center", alignItems: "center",
              }}>
                <Text style={{ fontSize: 12, marginBottom: 9, color: "#3D4759", fontFamily: "Forza-Bold" }}>Working time</Text>
                <Text style={{ backgroundColor: "#F2F9FF", padding: 9, borderRadius: 5, color: "#3D4759", fontFamily: "Forza-Bold", }}>{item.working_time.from_time}-{item.working_time.to_time}</Text>
              </View>
              <View style={{
                // borderWidth: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 9
              }}>
                <Text style={{ marginBottom: 9, fontSize: 12, color: "#3D4759", fontFamily: "Forza-Bold" }}>Rate</Text>
                <Text style={{
                  fontFamily: "Forza-Bold",
                  width: 100,
                  height: 37,
                  borderRadius: 5,
                  backgroundColor: "#EEA734",
                  color: "white",
                  textAlign: "center",
                  padding: 9
                }}>{item.rate}/Hr</Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      <Loading />
    }
  }

  const getThePlaceName = () => {
    if (postUserlat && postUserLong) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${postUserlat},${postUserLong}&key=`)
        .then((res) => {
          // console.log("responce in geoCoding :", res.data.results[4].formatted_address.split(",")[3]);
          if (res) {
            setFullAddress(res.data.results[4].formatted_address.split(","));
            setPlaceName(res.data.results[4].formatted_address.split(",")[3]);
            setStateName(res.data.results[4].formatted_address.split(",")[4]);
          }
        })
        .catch((error) => { console.log("error of homePage in geoCoding :", error) })
    } else {
      setPlaceName("place");
      setStateName("state");
    }
  }

  useEffect(() => {
    getThePlaceName();
    console.log("postUserLong:", postUserLong);
    if (postUserLog) {
      axios.get(openServiceRequestDetails, {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          // console.log("res in user data in homePage :", res.data.data[0]);
          if (res.data.data[0].status === "active") {
            navigation.navigate("YourMechanics", { acceptedMDetails: res.data.data[0] })
          }
        })
        .catch((error) => { "error in user data in homePage :", error })
    }
    nearByMechanicsApi_Handler();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <View style={{ width: "50%", flexDirection: "row", gap: 10 }}>
          <View style={styles.locationContainer}>
            <Entypo name='location-pin' style={styles.locationI} size={24} />
          </View>
          <View style={{}}>
            <Text style={{
              fontWeight: "400",
              fontSize: 12,
              color: "black",
              fontFamily: "Forza-Bold"
            }}>your location</Text>

            {fullAddressControllerVariable ?
              (<TouchableOpacity onPress={() => showFullAddress()} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{
                  color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                }} ellipsizeMode='tail' numberOfLines={1}>{placeName},</Text>
                <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>{stateName}</Text>
                <AntDesign name="caretup" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
              </TouchableOpacity>)
              :
              (<TouchableOpacity onPress={() => showFullAddress()} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{
                  color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                }} ellipsizeMode='tail' numberOfLines={1}>{placeName},</Text>
                <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>{stateName}</Text>
                <AntDesign name="caretdown" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
              </TouchableOpacity>)}

          </View>
        </View>
        <View style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: 140
        }}>
          <Fontisto name='bell' size={30} style={{ color: "black" }} />
          <Text style={{
            position: "absolute",
            backgroundColor: "#DD4B4B",
            width: 12,
            height: 12,
            borderRadius: 6,
            left: 16,
            top: 6,

          }}></Text>
        </View>
      </View>
      {fullAddressControllerVariable ? <Text style={styles.fullAddressStyle}>{fullAddress}</Text> : null}
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { onRefresh(); getThePlaceName() }} />}>
        {/* BODY .................................. */}
        <View>
          <View style={styles.mainContainer}>
            <View style={{
              alignSelf: "center",
              width: 356,
              height: 185,
              backgroundColor: "#007AFF",
              borderRadius: 15,
              padding: 10,
              justifyContent: "space-between",
            }}>
              <View style={{
                padding: 9,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Image source={require("./assets/Vector1.png")} resizeMode='cover' />
                <Text style={{
                  marginLeft: 9,
                  fontWeight: "400",
                  width: 177,
                  color: "#FFFFFF",
                  letterSpacing: 1,
                  fontFamily: "Forza-Bold"
                }}>Get car help with our professional car mechanics.</Text>
              </View>
              <TouchableOpacity style={{
                flexDirection: "row",
                backgroundColor: "#0065D3",
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 33,
                marginBottom: 9,
                height: 72,
              }} onPress={() => {
                navigation.navigate("HomeStackScreen");
                // getPageName("Mechanic");
              }}>
                <Text style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#FFFFFF",
                  fontFamily: "Forza-Bold"
                }}>Search Mechanics</Text>
                <View style={{
                  padding: 20,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#00D1FF",
                  marginLeft: 55
                }}>
                  <AntDesign name='search1' size={20} style={{
                    color: "white",
                  }} />
                </View>
              </TouchableOpacity>
            </View>
            <ImageBackground source={require('./assets/card_back.png')} style={{
              width: 356,
              height: 185,
              padding: 14,
              marginTop: 19,
              alignSelf: "center",
            }} imageStyle={{
              borderRadius: 16,
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{
                  alignItems: "center",
                  // marginTop: "9%"
                  // borderWidth:1,
                  borderColor: "white"
                }}>
                  <Text style={{
                    letterSpacing: 0.7,
                    color: "#ffffff",
                    fontSize: 19,
                    fontFamily: "Forza-Bold"
                  }}>{postUserName}</Text>
                </View>
                <View>
                  <Text style={{
                    color: "#ffffff",
                    fontFamily: "Forza-Bold"
                  }}>Validity from</Text>
                  <Text style={{
                    color: "#ffffff",
                    fontFamily: "Forza-Bold"
                  }}>{postUserCardValidity}</Text>
                </View>
              </View>
              <View style={{ alignItems: "center", }}>
                {postUsercard_number ? (<Text style={{
                  color: "#CAD5E2",
                  fontFamily: "Forza-Bold",
                  fontSize: 18,
                  marginTop: "9%",
                }}>{postUsercard_number}</Text>) : (<Text style={{
                  color: "#CAD5E2",
                  fontFamily: "Forza-Bold",
                  fontSize: 18,
                  marginTop: "9%",
                }}>XXXX XXXX XXXX XXXX</Text>)}
              </View>
            </ImageBackground>
            <View style={styles.thirdMainContainer}>
              <View style={styles.thirdCardChildContainer}>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{
                    color: "#3D4759",
                    fontWeight: "500",
                    fontSize: 16,
                    fontFamily: "Forza-Black"
                  }}>Spare Parts/Shop</Text>
                  <Text style={{
                    width: "44%",
                    color: "black",
                    fontFamily: "Forza-Bold"
                  }}>Buy spare and car accessories and car fluids</Text>
                </View>
                <View>
                  <Image source={require("./assets/pngkit_auto-png-images_2522770.png")} style={styles.thirdCardPic} />
                </View>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "#FFFFFF",
                borderRadius: 22.5,
                width: 174,
                height: 45,
              }}>
                <Text style={{
                  // marginLeft:"12%",
                  color: "#3D4759",
                  fontWeight: "700",
                  fontSize: 16,
                  fontFamily: "Forza-Bold"
                }}>Comming soon...</Text>
                <AntDesign name='arrowright' size={22} color={"black"} />
              </View>
            </View>

            {/* MECHANICS NEAR ME starts here..................... */}
            <Text style={styles.mechanicsHeading}>Mechanics Near Me</Text>
            <FlatList data={nearByMechanics} keyExtractor={(item) => item._id} renderItem={({ item, index }) => nearByMechanicsList({ item, index })} horizontal />

            {/* POPULAR OFFER START ................................*/}
            <Text style={styles.popularOfferHeading}>Popular offer</Text>
            <Text style={{ color: "black", fontFamily: "Forza-Bold", fontSize: 15 }}>Comming Soon.....................</Text>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.popularOfferMainContainer}>
                <Image source={{
                  uri: "https://www.shutterstock.com/image-illustration/perpetuum-mobile-gears-260nw-64576072.jpg"
                }}
                  style={{ height: 110, width: 110, alignSelf: "center" }}
                />
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  marginTop: 4,
                  alignItems: "center",
                  marginBottom: 7
                }}>
                  <View style={{ flexDirection: "row", }}>
                    <EvilIcons name='star' size={20} style={styles.fiveStar} />
                    <Text style={{ color: "black" }}>5.0</Text>
                  </View>
                  <AntDesign name='hearto' size={16} style={{ color: "black" }} />
                </View>
                <Text style={{
                  fontWeight: "300",
                  fontSize: 14,
                  color: "black",
                  marginBottom: 5,
                  fontFamily: "Forza-Bold"
                }}>Radial engine</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 5 }}>
                  <Text style={{
                    color: "black",
                    fontSize: 17
                  }}>$120.25</Text>
                  <Text style={{ color: "red", marginLeft: 9 }}>$120.25</Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <TouchableOpacity style={{
                    height: 40,
                    width: 96,
                    padding: 9,
                    backgroundColor: "#007AFF",
                    borderRadius: 25,
                    alignItems: "center",
                  }}>
                    <Text style={{
                      color: "white",
                      fontFamily: "Forza-Bold"
                    }}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor: "#FDF4E6",
                    width: 45,
                    height: 45,
                    borderRadius: 22,
                    padding: 13,
                  }}>
                    <EvilIcons name='cart' size={20} style={{ color: "black" }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.popularOfferMainContainer}>
                <Image source={{
                  uri: "https://www.shutterstock.com/image-illustration/perpetuum-mobile-gears-260nw-64576072.jpg"
                }}
                  style={{ height: 110, width: 110, alignSelf: "center" }}
                />
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  marginTop: 4,
                  alignItems: "center",
                  marginBottom: 7
                }}>
                  <View style={{ flexDirection: "row", }}>
                    <EvilIcons name='star' size={20} style={styles.fiveStar} />
                    <Text style={{ color: "black" }}>5.0</Text>
                  </View>
                  <AntDesign name='hearto' size={16} style={{ color: "black" }} />
                </View>
                <Text style={{
                  fontWeight: "300",
                  fontSize: 14,
                  color: "black",
                  marginBottom: 5,
                  fontFamily: "Forza-Bold"
                }}>Radial engine</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 5 }}>
                  <Text style={{
                    color: "black",
                    fontSize: 17
                  }}>$120.25</Text>
                  <Text style={{ color: "red", marginLeft: 9 }}>$120.25</Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <TouchableOpacity style={{
                    height: 40,
                    width: 96,
                    padding: 9,
                    backgroundColor: "#007AFF",
                    borderRadius: 25,
                    alignItems: "center",
                  }}>
                    <Text style={{
                      color: "white",
                      fontFamily: "Forza-Bold"
                    }}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor: "#FDF4E6",
                    width: 45,
                    height: 45,
                    borderRadius: 22,
                    padding: 13
                  }}>
                    <EvilIcons name='cart' size={20} style={{ color: "black" }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.popularOfferMainContainer}>
                <Image source={{
                  uri: "https://www.shutterstock.com/image-illustration/perpetuum-mobile-gears-260nw-64576072.jpg"
                }}
                  style={{ height: 110, width: 110, alignSelf: "center" }}
                />
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // borderWidth: 1,
                  marginTop: 4,
                  alignItems: "center",
                  marginBottom: 7
                }}>
                  <View style={{ flexDirection: "row", }}>
                    <EvilIcons name='star' size={20} style={styles.fiveStar} />
                    <Text style={{ color: "black" }}>5.0</Text>
                  </View>
                  <AntDesign name='hearto' size={16} style={{ color: "black" }} />
                </View>
                <Text style={{
                  fontWeight: "300",
                  fontSize: 14,
                  color: "black",
                  marginBottom: 5,
                  fontFamily: "Forza-Bold"
                }}>Radial engine</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 5 }}>
                  <Text style={{
                    color: "black",
                    fontSize: 17
                  }}>$120.25</Text>
                  <Text style={{ color: "red", marginLeft: 9 }}>$120.25</Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <TouchableOpacity style={{
                    height: 40,
                    width: 96,
                    padding: 9,
                    backgroundColor: "#007AFF",
                    borderRadius: 25,
                    alignItems: "center",
                  }}>
                    <Text style={{
                      color: "white",
                      fontFamily: "Forza-Bold"
                    }}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor: "#FDF4E6",
                    width: 45,
                    height: 45,
                    borderRadius: 22,
                    padding: 13
                  }}>
                    <EvilIcons name='cart' size={20} style={{ color: "black" }} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView> */}
          </View>
        </View>
      </ScrollView>
      {/* <TouchableOpacity style={styles.orderTrackingBtn} onPress={() => {
        navigation.navigate("ChatComponent")
      }}>
        <View style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Octicons name='location' size={30} style={{
            color: "white"
          }} />
          <Text style={{ color: "white", fontSize: 17 }}>Order</Text>
          <Text style={{ color: "white", fontSize: 17 }}>tracking</Text>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView >
  )
}


const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 11,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19
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
  fullAddressStyle: {
    position: "absolute",
    top: "9%",
    zIndex: 2,
    backgroundColor: "#FFFFFF",
    width: "60%",
    right: "35%",
    padding: 9,
    borderRadius: 10,
    fontFamily: "Forza-Bold",
    fontSize: 10
  },
  mainContainer: {
    padding: "2%",
    // alignSelf: "center",
    marginBottom: "20%",
  },
  thirdMainContainer: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F4B755",
    width: 356,
    height: 185,
    padding: 14,
    marginTop: 19,
    borderRadius: 16,
  },
  thirdCardChildContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%"
  },
  thirdCardPic: {
    position: "absolute",
    right: -20,
    height: 109,
    width: 109
  },
  mechanicsHeading: {
    fontSize: 24,
    color: "#3D4759",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "Forza-Black",

  },
  machanicsNearMeMainContainer: {
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E0EAEF",
    backgroundColor: "#FFFFFF",
    // height: 220,
    // width: 220,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    // alignItems: "flex-start",
    borderRadius: 9
  },
  fiveStar: {
    color: "#DFB300"
  },
  popularOfferHeading: {
    fontSize: 24,
    color: "#3D4759",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "Forza-Black"
  },
  popularOfferMainContainer: {
    marginHorizontal: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 260,
    width: 190,
    padding: 9,
    borderColor: "#E0EAEF",
  },
  orderTrackingBtn: {
    zIndex: 1,
    borderWidth: 5,
    borderColor: "white",
    position: "absolute",
    top: 600,
    left: 262,
    padding: 9,
    alignItems: "center",
    backgroundColor: "#007AFF",
    width: 110,
    height: 110,
    borderRadius: 60,
  }
})
export default Home