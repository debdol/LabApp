import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import MechanicHistoryFlatlist from './MechanicHistoryFlatLIst';
const MechanicsHistory = () => {

  const onTheWaydata = [
    {
      id: "1",
      name: 'Werolla Cardigans',
      image: "https://everydaypower.com/wp-content/uploads/2023/01/Mechanic-Quotes-That-Will-Inspire-You-To-Work-Hard.jpg",
      location: 'Gwagwalada',
      code: 'Hire code : #124TKY125',
      cost: "$385.00",
      status: "Track Order"
    },
    {
      id: "2",
      name: 'Werolla Cardigans',
      image: "https://everydaypower.com/wp-content/uploads/2023/01/Mechanic-Quotes-That-Will-Inspire-You-To-Work-Hard.jpg",
      location: 'Gwagwalada',
      code: 'Hire code : #124TKY125',
      cost: "$385.00",
      status: "Track Order"
    },
    {
      id: "3",
      name: 'Werolla Cardigans',
      image: "https://everydaypower.com/wp-content/uploads/2023/01/Mechanic-Quotes-That-Will-Inspire-You-To-Work-Hard.jpg",
      location: 'Gwagwalada',
      code: 'Hire code : #124TKY125',
      cost: "$385.00",
      status: "Track Order"
    },
    {
      id: "4",
      name: 'Werolla Cardigans',
      image: "https://everydaypower.com/wp-content/uploads/2023/01/Mechanic-Quotes-That-Will-Inspire-You-To-Work-Hard.jpg",
      location: 'Gwagwalada',
      code: 'Hire code : #124TKY125',
      cost: "$385.00",
      status: "canTrack Order"
    },
    {
      id: "5",
      name: 'Werolla Cardigans',
      image: "https://everydaypower.com/wp-content/uploads/2023/01/Mechanic-Quotes-That-Will-Inspire-You-To-Work-Hard.jpg",
      location: 'Gwagwalada',
      code: 'Hire code : #124TKY125',
      cost: "$385.00",
      status: "comTrack Order"
    }
  ]
  const FlatListB = () => {
    return (
      <>
        <Text style={{ color: "#3D4759", fontSize: 26, fontWeight: "600", marginBottom: 10 ,fontFamily:"Forza-Black",}}>Past History</Text>
        <View style={{ width: '100%', height: '100%', }}>
          <FlatList data={onTheWaydata}
            keyExtractor={(e: any) => e.id}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            renderItem={(e: any) => {
              return (
                <MechanicHistoryFlatlist item={onTheWaydata} />
              )
            }}
          />
        </View>
      </>
    )
  }
  return (
    <View style={styles.bodyMainView}>
      <Text style={{ color: "#3D4759", fontSize: 24, fontWeight: "600", marginBottom: 10,fontFamily:"Forza-Black", }}>On The Way</Text>
      <View style={{ width: '100%', height: '87%', }}>
        <FlatList data={onTheWaydata}
          keyExtractor={(e: any) => e.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<FlatListB/> }
          onEndReachedThreshold={0.1}
          renderItem={(e: any) => {
            return (
              <MechanicHistoryFlatlist item={onTheWaydata} />
            )
          }}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  bodyMainView: {
    padding: 11
  },
})
export default MechanicsHistory;