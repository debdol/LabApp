import { VirtualizedScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MechanicsHistory from './MechanicsHistory';
import OrderHistory from './OrderHistory';
import { ScrollView } from 'react-native-gesture-handler';
const History = () => {
  const [pageSwap, setPageSwap] = useState(true);
  return (
    // <ScrollView>
      <View style={{ padding: 11 }}>
        <View style={{
          // borderWidth:1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 44
        }}>
          <AntDesign name='left' size={30} style={{ color: "black" }} />
          <Text style={{ color: "#3D4759", fontWeight: "500", fontSize: 20 ,fontFamily:"Forza-Bold"}}>History</Text>
          <EvilIcons name='search' size={35} style={{ color: "black" }} />
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}>
          <TouchableOpacity onPress={() => setPageSwap(true)} style={[styles.btn,
          (pageSwap) ? { borderBottomWidth: 6, borderBottomColor: "#156BEC" } : null]}>
            <Text style={{
              color: "#3D4759",
              fontWeight: "600",
              fontSize: 17,
              fontFamily:"Forza-Bold",
            }}>Mechanics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPageSwap(false)} style={[styles.btn,
          (!pageSwap) ? { borderBottomWidth: 6, borderBottomColor: "#156BEC" } : null]}>
            <Text style={{
              color: "#3D4759",
              fontWeight: "600",
              fontSize: 17,
              fontFamily:"Forza-Bold",
            }}>Orders</Text>
          </TouchableOpacity>
        </View>
        {pageSwap ? <MechanicsHistory /> : <OrderHistory />}
      </View>
  )
}


const styles = StyleSheet.create({
  btn: {
    width: 150,
    alignItems: "center"
  }
})
export default History