import { StyleSheet, Text, View, Image, FlatList, PermissionsAndroid } from 'react-native'
import React, { useContext, useEffect, useState, createContext } from 'react'
// import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import AllStackNavigation from './AllStackNavigation';
import LoginMain from './LogInMain';
export const StyleContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loading from './Loading';
import { enableLatestRenderer } from 'react-native-maps';
import { userData } from './APIs';
import { NativeBaseProvider } from "native-base";

enableLatestRenderer();

export default function App() {
  const [pageName, setPageName] = useState("Home");
  const [latData, setlatData] = useState(null);
  const [longData, setLongData] = useState(null);
  const [Userlog, setUserlog] = useState(null);

  const [userName, setUserName] = useState();
  const [userNumber, setUserNumber] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userCarModel, setUserCarModel] = useState();
  const [userCarNumber, setUserCarNumber] = useState();
  const [userCars, setUserCars] = useState([]);
  const [validityOfCard, setValidityOfCard] = useState();
  const [userCardNumber, setUserCardNumber] = useState();
  const [userState, setUserState] = useState();
  const [userPinCode, setUserPinCode] = useState();
  const [userImage, setUserImage] = useState();
  const [serviceRequestDetails, setServiceRequestDetails] = useState();
  const [locationDetails, setLocationDetails] = useState();
  const [userService, setUserService] = useState();
  const [mechanicsDetails, setmechanicsDetails] = useState();

  const [mainPage, setMainPage] = useState(<Loading />);
  //checking userData API................
  useEffect(() => {
    if (Userlog) {
      console.log("check_userData_token:", Userlog);
      axios.get(userData, {
        'Authorization': `Bearer ${Userlog}`,
        'Content-Type': 'application/json'
      })
        .then((res) => {
          console.log("response_in_userData_check :", res.data.data)
        })
        .catch((error) => console.log("error_in_userData_check :", error))
    }
  }, [Userlog])


  // Set User Token if there is any.........................
  async function logcall() {
    if (await AsyncStorage.getItem('User_Token')) {
      setUserlog(await AsyncStorage.getItem('User_Token'));
      // console.log("user tokrn : ", await AsyncStorage.getItem('User_Token'));
    } else {
      setMainPage(<LoginMain />);
    }
  };


  useEffect(() => {
    logcall();
  }, []);

  //call userData end point to get the user data............................
  useEffect(() => {
    if (Userlog) {
      setMainPage(<Loading />)
      axios.get(userData, {
        headers: {
          'Authorization': `Bearer ${Userlog}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          // console.log("responce in appjs :", res.data.data);
          setUserCars(res.data.data.cars);
          setUserName(res.data.data.name);
          setUserNumber(res.data.data.contact_number);
          setUserAddress(res.data.data.address);
          setUserEmail(res.data.data.email_id);
          setUserCarModel(res.data.data.cars[0].car_model);
          setUserCarNumber(res.data.data.cars[0].car_number);
          setUserState(res.data.data.state);
          setUserPinCode(res.data.data.pin_code);

          if (res.data.data.card_number) {
            const cardNumber = res.data.data.card_number;
            const firstFourNum = cardNumber[0] + cardNumber[1] + cardNumber[2] + cardNumber[3];
            const secondFourNum = cardNumber[4] + cardNumber[5] + cardNumber[6] + cardNumber[7];
            const thirdFourNum = cardNumber[8] + cardNumber[9] + cardNumber[10] + cardNumber[11];
            const fourthFourNum = cardNumber[12] + cardNumber[13] + cardNumber[14] + cardNumber[15];
            const totalMerged_Num = firstFourNum + "  " + secondFourNum + "  " + thirdFourNum + "  " + fourthFourNum;
            setUserCardNumber(totalMerged_Num);
          }

          const date = res.data.data.registered_on;
          const month = date[3] + date[4];
          const year = date[6] + date[7] + date[8] + date[9];
          setValidityOfCard(month + "/" + year);
          setMainPage(<AllStackNavigation />);
        })
        .catch((e) => console.log("error in app :", e))
    }
  }, [Userlog]);

  const userName_handler = (value) => {
    setUserName(value);
  };
  const userEmail_handler = (value) => {
    setUserEmail(value);
  };
  const userAddress_handler = (value) => {
    setUserAddress(value);
  };
  const userCarModel_handler = (value) => {
    setUserCarModel(value);
  };
  const userCarNumber_handler = (value) => {
    setUserCarNumber(value)
  };
  const userImage_handler = (value) => {
    setUserImage(value);
  }
  const mainPage_handler = (value) => {
    setMainPage(value);
    logcall();
  }
  const userlat_handler = (value) => {
    setlatData(value);
  }
  const userLong_hanlder = (value) => {
    setLongData(value);
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  componentDidMount = () => {
    SplashScreen.hide();
  }
  const page_handler = (value) => {
    setPageName(value);
  }
  const userlog_handler = (value) => {
    setUserlog(value);
    // console.log("userlog_handler in app.js page: ", value);
  }
  const serviceRequestDetails_handler = (value) => {
    setServiceRequestDetails(value);
  }
  const userLocationDetails_handler = (value) => {
    setLocationDetails(value)
  }
  const userService_handler = (value) => {
    setUserService(value);
  }
  const mechanicsDetails_handler = (value) => {
    setmechanicsDetails(value);
  }

  const locationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  useEffect(() => {
    locationPermission();
  }, [])



  return (
    <NativeBaseProvider>
      <StyleContext.Provider value={{
        // send
        postPageName: pageName,
        postUserLog: Userlog,

        postUserName: userName,
        postUserNumber: userNumber,
        postUserAddress: userAddress,
        postUserEmail: userEmail,
        postUserCarModel: userCarModel,
        postUserCarNumber: userCarNumber,
        postUserCars: userCars,
        postUserSate: userState,
        postUserPinCode: userPinCode,
        postUserlat: latData,
        postUserLong: longData,
        postUserCardValidity: validityOfCard,
        postUsercard_number: userCardNumber,
        postUserImage: userImage,
        postServiceRequestDetails: serviceRequestDetails,
        postUserLocationDetails: locationDetails,
        postUserService: userService,
        postMehcanicsDetails: mechanicsDetails,
        //recived
        getPageName: page_handler,
        getUserLog: userlog_handler,

        getUserName: userName_handler,
        getUseremail: userEmail_handler,
        getUserAddress: userAddress_handler,
        getUserCarModel: userCarModel_handler,
        getUserCarNumber: userCarNumber_handler,
        getUserlat: userlat_handler,
        getUserLong: userLong_hanlder,
        getUserImage: userImage_handler,
        getMainPage: mainPage_handler,
        getServiceRequestDetails: serviceRequestDetails_handler,
        getUserLocationDetails: userLocationDetails_handler,
        getUserService: userService_handler,
        getMechanicsDetails: mechanicsDetails_handler,
      }}>
        {
          mainPage
        }
      </StyleContext.Provider>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  imgStyle: {
    height: 190,
    width: 190
  }
})