import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <ActivityIndicator size="large" color="#0000ff" style={{
      alignItems: "center",
      marginTop: 350
    }} />
  )
}

export default Loading

const styles = StyleSheet.create({})