import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { Box, Center, VStack,Skeleton, HStack, Heading, Spinner } from "native-base";

const Loading = () => {
  return (
    // <ActivityIndicator size="large" color="#0000ff" style={{
    //   alignItems: "center",
    //   marginTop: 350
    // }} />
    <HStack space={8} justifyContent="center" alignItems="center" style={{ alignItems: "center", marginTop: 350 }}>
      <Spinner size="lg" />
    </HStack>
  )
}

export default Loading

const styles = StyleSheet.create({})