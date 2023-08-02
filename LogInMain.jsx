import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpPage from './SignUpPage';
import OtpPage from './OtpPage';
import RegisterPage from './RegisterPage';

const LoginMain = () => {
    const [logPage, setLogPage] = useState("login");
    const [number, setNumber] = useState();
    // const [recieveToken,setRecieveToken] = useState();
    const page_Handler = (value) => {
        setLogPage(value);
    }
    const numberHandeler = (value) => {
        setNumber(value);
    }
    // const tokenHandeler =(value)=>{
    //     setRecieveToken(value);
    // }
    return (
        <View style={styles.container}>
            {(logPage == "login") ? <SignUpPage pagename={page_Handler} userNumber={numberHandeler} /> : (logPage == "otp") ? <OtpPage pagename={page_Handler} numberSend={number} /> : (logPage == "RegisterPage") ? <RegisterPage /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

export default LoginMain;
