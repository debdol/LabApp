//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const About = () => {
    return (
        <View style={styles.container}>
            <View style={styles.aboutFirstSectionView}>
                <Text style={styles.aboutFirstSectionTxt}>Workshop</Text>
                <Text style={styles.aboutFirstSectionDescription}>Shop 24 Ziquinchor Street, Off IBB Way. wuse Zone 4, (Opposite Fabeq Plaza) Abuja</Text>
            </View>
            <View>
                <Text style={styles.aboutFirstSectionTxt}>Bio</Text>
                <Text style={styles.aboutFirstSectionDescription}>I am the mechanic for yor car. All i wanted to do is work on cars all day, but main focus is rhw feel-good feeling</Text>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        flexDirection:"column",
        padding:12,
    },
    aboutFirstSectionView:{
        flexDirection:"column"
    },
    aboutFirstSectionTxt:{
        color:"#3D4759",
        fontWeight:"600",
        fontSize:18,
        marginVertical:10
    },
    aboutFirstSectionDescription:{
        color:"#505056",
        fontWeight:"400",
        fontSize:16
    }
});

//make this component available to the app
export default About;
