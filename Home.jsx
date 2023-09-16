import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, RefreshControl, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { StyleContext } from './App';
import axios from 'axios';
import { nearByMechanicss, openServiceRequestDetails, } from './APIs';
import Loading from './Loading';


const Home = () => {
  const navigation = useNavigation();
  const { getPageName, postUserName, postUserCardValidity, postUsercard_number, getUserLocationDetails, postUserLog, getUserlat, getUserLong, getUnavailable, postUnavailable } = useContext(StyleContext);
  const [refreshing, setRefreshing] = useState(false);
  const [fullAddress, setFullAddress] = useState();
  const [placeName, setPlaceName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [nearByMechanics, setNearByMechanics] = useState([]);
  const [fullAddressControllerVariable, setFullAddressControllerVariable] = useState(false);
  const [userLatitude, setUserLatitude] = useState();
  const [userLongitude, setUserLongitude] = useState();
  const [gotLatLongIndicator, setGotLatLongIndicator] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getPageName("Home");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // Get user Lat and Long ................................
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        setUserLatitude(position.coords.latitude);
        getUserlat(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
        getUserLong(position.coords.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  useEffect(() => {
    getLocation();
  }, [])

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
    // console.log("item_in_home_page", item);
    return (
      <View style={styles.machanicsNearMeMainContainer}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          // borderWidth:1,
          width: "100%"
        }}>
          {item.profile_picture === null ? <Image source={{
            uri: "https://media.istockphoto.com/id/1165311626/photo/mechanic-using-a-ratchet-wrench.jpg?s=612x612&w=0&k=20&c=D4XCHr8BeR44hdJXS_Tp-9djQ7jWDKKkBWSKaqhuqK8="
          }} style={{ height: 50, width: 50, borderRadius: 25 }} /> : <Image source={{
            uri: `http://43.204.88.205${item.profile_picture.split("/code")[1]}`
          }} style={{ height: 50, width: 50, borderRadius: 25 }} />}

          <View style={{ marginLeft: 11 }}>
            <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>{item.m_name}</Text>
            <View style={{ flexDirection: "row" }}>
              {/* <EvilIcons name='star' size={20} style={styles.fiveStar} />
              <EvilIcons name='star' size={20} style={styles.fiveStar} />
              <EvilIcons name='star' size={20} style={styles.fiveStar} />
              <EvilIcons name='star' size={20} style={styles.fiveStar} /> */}
              <Text style={{ color: "#3D4759", fontSize: 13 }}>Ratings...</Text>
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
            <Entypo name='location-pin' style={{ fontSize: 20, color: "black" }} />
            <Text style={{ fontSize: 16, fontFamily: "Forza-Bold", color: "#3D4759" }}>{item.address}</Text>
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
  }

  //Get the location name of user............................................
  const getThePlaceName = () => {
    if (userLatitude && userLongitude) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=`)
        .then((res) => {
          // console.log("responce in geoCoding :", res.data.results[4].formatted_address.split(",")[3]);
          setFullAddress(res.data.results[4].formatted_address);
          setPlaceName(res.data.results[4].formatted_address.split(",")[3]);
          setStateName(res.data.results[4].formatted_address.split(",")[4]);
          getUserLocationDetails(res.data.results[4].formatted_address);
          // setGotLatLongIndicator(true);
        })
        .catch((error) => { console.log("error of homePage in geoCoding :", error) })
    } else {
      setPlaceName("place");
      setStateName("state");
    }
  }
  // Calling the getThePlaceName Funtion here...........................................
  useEffect(() => {
    getThePlaceName();
  }, [userLongitude]);

  //Call the openService Request Detail end point for checking status.................................................
  useEffect(() => {
    if (postUserLog) {
      // console.log("postUnavailable :", postUnavailable);
      axios.get(openServiceRequestDetails, {
        headers: {
          'Authorization': `Bearer ${postUserLog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.data.data.length !== 0) {
            // console.log("status_Check :", res.data.data[0].status);
            if (res.data.data[0].status === "accepted" && gotLatLongIndicator === true) {
              navigation.navigate("YourMechanics", { acceptedMDetails: res.data.data[0] });
              getPageName("Mechanic");
            } else if (res.data.data[0].status === "initiated" && gotLatLongIndicator === true) {
              navigation.navigate("Cart", { acceptedMDetails: res.data.data[0] });
              getPageName("Cart")
            } else if (res.data.data[0].status === "not available" && gotLatLongIndicator === true) {
              getUnavailable(true);
              navigation.navigate("Mechanicsss", { acceptedMDetails: res.data.data[0] });
              // console.log("its running");
              // navigation.navigate("InvoicePage", { acceptedMDetails: res.data.data[0] });
            }
          }
        })
        .catch((error) => { console.log("error in user data in home page:", error) })
    };

    //calling openServiceRequestDetails API 
    setTimeout(() => {
      setGotLatLongIndicator(!gotLatLongIndicator);
      // console.log("serviceRequestData")
    }, 1000);
  }, [gotLatLongIndicator]);

  useEffect(() => {
    nearByMechanicsApi_Handler();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (nearByMechanics.length != 0) {
    return (
      <SafeAreaView>
        <View style={styles.headingContainer}>
          <View style={{ width: "50%", flexDirection: "row", gap: 10 }}>
            <View style={styles.locationContainer}>
              <Entypo name='location-pin' style={styles.locationI} size={24} />
            </View>
            <TouchableOpacity onPress={() => showFullAddress()}>
              <Text style={{
                fontWeight: "400",
                fontSize: 12,
                color: "black",
                fontFamily: "Forza-Bold"
              }}>your location</Text>

              {fullAddressControllerVariable ?
                (<Text style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{
                    color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                  }} ellipsizeMode='tail' numberOfLines={1}>{placeName},</Text>
                  <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>{stateName}</Text>
                  <AntDesign name="caretup" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
                </Text>)
                :
                (<Text style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{
                    color: "#3D4759", fontSize: 12, fontWeight: "500", letterSpacing: 0.5, fontFamily: "Forza-Bold",
                  }} ellipsizeMode='tail' numberOfLines={1}>{placeName},</Text>
                  <Text style={{ fontFamily: "Forza-Bold", fontSize: 12, color: "#3D4759", }}>{stateName}</Text>
                  <AntDesign name="caretdown" style={{ color: "#201E1E", textAlignVertical: "center", padding: 2 }} />
                </Text>)}
            </TouchableOpacity>
          </View>

          <View style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 140
          }}>
            <Fontisto name='bell' size={30} style={{ color: "black" }} />
            {/* <Text style={{
              position: "absolute",
              backgroundColor: "#DD4B4B",
              width: 12,
              height: 12,
              borderRadius: 6,
              left: 16,
              top: 6,
            }}></Text> */}
          </View>
        </View>
        {fullAddressControllerVariable ? <Text style={styles.fullAddressStyle}>{fullAddress}</Text> : null}
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { onRefresh(); getThePlaceName() }} />}>
          {/* BODY .................................. */}
          <View style={styles.mainContainer}>
            <View style={{
              alignSelf: "center",
              width: "100%",
              height: "18%",
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
                // paddingHorizontal: 33,
                // marginBottom: 9,
                justifyContent: 'space-between',
                height: '37%',
                width: '100%',
              }} onPress={() => {
                navigation.navigate("HomeStackScreen");
                getPageName("Mechanic");
              }}>
                <Text></Text>
                <Text style={{
                  textAlign: "center",
                  alignItems: "center",
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
                }}>
                  <AntDesign name='search1' size={20} style={{
                    color: "white",
                  }} />
                </View>
              </TouchableOpacity>
            </View>
            <ImageBackground source={require('./assets/card_back.png')} style={{
              // borderWidth:1,
              // borderColor:"red",
              width: "100%",
              height: 198,
              // padding: 14,
              marginTop: 19,
              alignSelf: "center",
            }} imageStyle={{
              borderRadius: 16,
            }}>
              {postUsercard_number ?
                (<>
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
                    <Text style={{
                      color: "#CAD5E2",
                      fontFamily: "Forza-Bold",
                      fontSize: 18,
                      marginTop: "9%",
                    }}>{postUsercard_number}</Text>
                  </View>
                </>) : (<View style={{ alignItems: "center" }}>
                  <Text style={{
                    color: "#CAD5E2",
                    fontFamily: "Forza-Bold",
                    fontSize: 18,
                  }}>No Card assigned</Text>
                </View>)}
            </ImageBackground>
            <View style={styles.thirdMainContainer}>
              <View style={styles.thirdCardChildContainer}>
                <View style={{
                  flexDirection: "column",
                  width: "50%",
                }}>
                  <Text style={{
                    color: "#3D4759",
                    fontSize: 16,
                    fontFamily: "Forza-Black",
                  }}>Spare Parts/Shop</Text>
                  <Text style={{
                    color: "black",
                    fontFamily: "Forza-Bold",
                  }}>Buy spare and car accessories and car fluids</Text>
                </View>
                <Image source={require("./assets/pngkit_auto-png-images_2522770.png")} style={styles.thirdCardPic} />
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
            {nearByMechanics.length != 0 ? <FlatList data={nearByMechanics} keyExtractor={(item) => item._id} renderItem={({ item, index }) => nearByMechanicsList({ item, index })} horizontal showsHorizontalScrollIndicator={false} />
              : null}
            {/* POPULAR OFFER START ................................*/}
            <Text style={styles.popularOfferHeading}>Popular offer</Text>
            <Text style={{ color: "black", fontFamily: "Forza-Bold", fontSize: 15, alignSelf: "center", marginBottom: "19%" }}>Comming Soon........</Text>
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
  } else {
    return (
      <Loading />
    )
  }

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
    right: "15%",
    padding: 9,
    borderWidth: 2,
    borderColor: "#D2D6E1",
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
    fontFamily: "Forza-Bold",
    fontSize: 10,
    color: "black",
  },
  mainContainer: {
    padding: "2%",
    // alignSelf: "center",
    marginBottom: "20%",
    height: "100%"
  },
  thirdMainContainer: {
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F4B755",
    width: "100%",
    height: "18%",
    padding: 14,
    marginTop: 19,
    borderRadius: 16,
  },
  thirdCardChildContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "red",
  },
  thirdCardPic: {
    // borderWidth: 1,
    // borderColor: "red",
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
    height: "90%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderRadius: 9
  },
  fiveStar: {
    color: "#DFB300"
  },
  popularOfferHeading: {
    fontSize: 24,
    color: "#3D4759",
    fontWeight: "500",
    marginVertical: "3%",
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