import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const Mechanic = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* Mechanics Heading & Notifications.................. */}

        <View style={styles.headingContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.locationContainer}>
              <Entypo name='location-pin' style={styles.locationI} size={24} />
            </View>
            <View style={{ marginLeft: 9 }}>
              <Text style={{
                fontWeight: "400",
                fontSize: 12,
                color: "black",
                fontFamily: "Forza-Bold"
              }}>Your location</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{
                  color: "#3D4759",
                  fontSize: 12,
                  fontWeight: "500",
                  letterSpacing: 0.5,
                  fontFamily: "Forza-Bold"
                }}>Manchester,  UK</Text>
                <AntDesign name="caretdown" />
              </View>
            </View>
          </View>
          <View style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
        {/* BODY is start here................................. */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 22,
          alignItems: "center",
          marginTop: 9,
          marginBottom: 5
        }}>
          <Text style={{
            fontSize: 19,
            color: "#3D4759",
            fontWeight: "600",
            fontFamily: "Forza-Black"
          }}>Nearby Mechanics</Text>
          <Text style={{
            borderBottomWidth: 1,
            color: "#007AFF",
            borderBottomColor: "#007AFF"
          }}>see all</Text>
        </View>
        <View style={styles.mapMainContainer}>
          <Image source={{
            uri: "https://play-lh.googleusercontent.com/Ito_mErj91qJbCKNWiNARDnJW7O4nyaOW1LaPTSPgkilNpZj2IXLMA-OhdJ1AiDEeQ=w240-h480-rw"
          }} style={{
            width: 350,
            height: 200,
            borderRadius: 16,
          }} />
        </View>
        <View style={styles.bodyLocation}>
          <View style={styles.locationContainer}>
            <Entypo name='location-pin' style={styles.locationI} size={24} />
          </View>
          <View style={{ marginLeft: 6 }}>
            <Text style={{
              color: "black",
              fontWeight: "400",
              fontSize: 12,
              fontFamily: "Forza-Bold"
            }}>Your location</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{
                color: "#3D4759",
                fontSize: 12,
                fontWeight: "500",
                letterSpacing: 0.5,
                fontFamily: "Forza-Bold"
              }}>Manchester,  UK</Text>
              <AntDesign name="caretdown" />
            </View>
          </View>
        </View>
        {/* MECHANICS NEAR ME ................................................................... */}
        <Text style={styles.mechanicsHeading}>Mechanics Near Me</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.machanicsNearMeMainContainer}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              // borderWidth:1,
              width: "100%"
            }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 40, width: 40, borderRadius: 25 }} />
              <View style={{ marginLeft: 11 }}>
                <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>Manchester</Text>
                <View style={{ flexDirection: "row" }}>
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
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
                <Text style={{ fontSize: 16, fontFamily: "Forza-Bold" }}>Gwagwalada</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                }}>
                  <Text style={{ fontSize: 12, marginBottom: 9, color: "#3D4759", fontFamily: "Forza-Bold" }}>Working time</Text>
                  <Text style={{ backgroundColor: "#F2F9FF", padding: 9, borderRadius: 5, color: "#3D4759" }}>08am-10pm</Text>
                </View>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 9
                }}>
                  <Text style={{ marginBottom: 9, fontSize: 12, color: "#3D4759", fontFamily: "Forza-Bold" }}>Rate</Text>
                  <Text style={{
                    width: 100,
                    height: 37,
                    borderRadius: 5,
                    backgroundColor: "#EEA734",
                    color: "white",
                    textAlign: "center",
                    padding: 9
                  }}>$20.00/Hr</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.machanicsNearMeMainContainer}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              // borderWidth:1,
              width: "100%"
            }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 40, width: 40, borderRadius: 25 }} />
              <View style={{ marginLeft: 11 }}>
                <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>Manchester</Text>
                <View style={{ flexDirection: "row" }}>
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
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
                <Text style={{ fontSize: 16, fontFamily: "Forza-Bold" }}>Gwagwalada</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                }}>
                  <Text style={{ fontSize: 12, marginBottom: 9, color: "#3D4759", fontFamily: "Forza-Bold" }}>Working time</Text>
                  <Text style={{ backgroundColor: "#F2F9FF", padding: 9, borderRadius: 5, color: "#3D4759" }}>08am-10pm</Text>
                </View>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 9
                }}>
                  <Text style={{ marginBottom: 9, fontSize: 12, color: "#3D4759", fontFamily: "Forza-Bold" }}>Rate</Text>
                  <Text style={{
                    width: 100,
                    height: 37,
                    borderRadius: 5,
                    backgroundColor: "#EEA734",
                    color: "white",
                    textAlign: "center",
                    padding: 9
                  }}>$20.00/Hr</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.machanicsNearMeMainContainer}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              // borderWidth:1,
              width: "100%"
            }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 40, width: 40, borderRadius: 25 }} />
              <View style={{ marginLeft: 11 }}>
                <Text style={{ color: "black", fontFamily: "Forza-Bold" }}>Manchester</Text>
                <View style={{ flexDirection: "row" }}>
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
                  <EvilIcons name='star' size={15} style={styles.fiveStar} />
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
                <Text style={{ fontSize: 16, fontFamily: "Forza-Bold" }}>Gwagwalada</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center", alignItems: "center",
                }}>
                  <Text style={{ fontSize: 12, marginBottom: 9, color: "#3D4759", fontFamily: "Forza-Bold" }}>Working time</Text>
                  <Text style={{ backgroundColor: "#F2F9FF", padding: 9, borderRadius: 5, color: "#3D4759" }}>08am-10pm</Text>
                </View>
                <View style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 9
                }}>
                  <Text style={{ marginBottom: 9, fontSize: 12, color: "#3D4759", fontFamily: "Forza-Bold" }}>Rate</Text>
                  <Text style={{
                    width: 100,
                    height: 37,
                    borderRadius: 5,
                    backgroundColor: "#EEA734",
                    color: "white",
                    textAlign: "center",
                    padding: 9
                  }}>$20.00/Hr</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* POPULAR MECHANICS ...................................... */}
        <Text style={styles.mechanicsHeading}>Popular Mechanics</Text>
        <View style={styles.popularMechanicsMainView}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 50, width: 50, borderRadius: 25 }} />
              <View style={{}}>
                <Text style={{
                  color: "#3D4759",
                  fontWeight: "600",
                  fontSize: 13,
                  fontFamily: "Forza-Bold"
                }}>Wade Warren</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <EvilIcons name='location' size={27} style={{ color: "#505056" }} />
                  <Text style={{
                    color: "#505056",
                    fontWeight: "400",
                    fontSize: 14,
                    fontFamily: "Forza-Bold"
                  }}>1.7 km</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: "#007AFF",
              padding: 16,
              borderRadius: 29,
              width: 139,
              height: 55,
              alignItems: "center"
            }}>
              <Text style={{ color: "white", fontSize: 16, letterSpacing: 0.5 }}>View details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Working time</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>8.30am-10.15am</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Rate</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>$20.00/Hr</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#EDEDED"}}>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold", }}>Ratings: 8.15(90)</Text>
          </View>
        </View>
        <View style={styles.popularMechanicsMainView}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 50, width: 50, borderRadius: 25 }} />
              <View style={{}}>
                <Text style={{
                  color: "#3D4759",
                  fontWeight: "600",
                  fontSize: 13,
                  fontFamily: "Forza-Bold"
                }}>Wade Warren</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <EvilIcons name='location' size={27} style={{ color: "#505056" }} />
                  <Text style={{
                    color: "#505056",
                    fontWeight: "400",
                    fontSize: 14,
                    fontFamily: "Forza-Bold"
                  }}>1.7 km</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: "#007AFF",
              padding: 16,
              borderRadius: 29,
              width: 139,
              height: 55,
              alignItems: "center"
            }}>
              <Text style={{ color: "white", fontSize: 16, letterSpacing: 0.5 }}>View details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Working time</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>8.30am-10.15am</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Rate</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>$20.00/Hr</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#EDEDED"}}>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold", }}>Ratings: 8.15(90)</Text>
          </View>
        </View>
        <View style={styles.popularMechanicsMainView}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Image source={{
                uri: "https://img.freepik.com/free-photo/car-mechanic-changing-wheels-car_1303-27465.jpg?w=2000"
              }} style={{ height: 50, width: 50, borderRadius: 25 }} />
              <View style={{}}>
                <Text style={{
                  color: "#3D4759",
                  fontWeight: "600",
                  fontSize: 13,
                  fontFamily: "Forza-Bold"
                }}>Wade Warren</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <EvilIcons name='location' size={27} style={{ color: "#505056" }} />
                  <Text style={{
                    color: "#505056",
                    fontWeight: "400",
                    fontSize: 14,
                    fontFamily: "Forza-Bold"
                  }}>1.7 km</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{
              backgroundColor: "#007AFF",
              padding: 16,
              borderRadius: 29,
              width: 139,
              height: 55,
              alignItems: "center"
            }}>
              <Text style={{ color: "white", fontSize: 16, letterSpacing: 0.5 }}>View details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Working time</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>8.30am-10.15am</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>Rate</Text>
            <Text style={{ fontSize: 13, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold" }}>$20.00/Hr</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#EDEDED"}}>
            <View style={{ flexDirection: "row" }}>
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
              <EvilIcons name='star' size={22} style={styles.fiveStar} />
            </View>
            <Text style={{ fontSize: 14, fontWeight: "400", letterSpacing: 0.5, color: "#505056", fontFamily: "Forza-Bold", }}>Ratings: 8.15(90)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 9,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
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
  mapMainContainer: {
    alignItems: "center"
  },
  bodyLocation: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    marginTop: 12,
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
    alignItems: "flex-start",
    borderRadius: 9
  },
  mechanicsHeading: {
    color: "#3D4759",
    fontWeight: "600",
    fontSize: 24,
    paddingHorizontal: 22,
    marginVertical: 9,
    fontFamily: "Forza-Black"
  },
  fiveStar: {
    color: "#DFB300"
  },
  popularMechanicsMainView: {
    marginBottom: 12,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 22,
    alignSelf: "center",
    padding: 9,
    borderWidth: 1,
    borderColor: "#E0EAEF",
    width: 350,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  }
})
export default Mechanic