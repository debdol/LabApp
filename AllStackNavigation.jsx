import { View, Text } from 'react-native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
import React from 'react'
import Allnavigation from './Allnavigation';
import ChatComponent from './ChatComponent';
import Mechanicsss from './Mechanicsss';
import MechanicsDetails from './MechanicsDetails';
import ManuallyLocation from './ManuallyLocation';
import YourMechanics from './YourMechanics';
import InvoicePage from './InvoicePage';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import GoToCartPage from './GoToCartPage';

const AllStackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Allnavigation" component={Allnavigation} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="ChatComponent" component={ChatComponent} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="Mechanicsss" component={Mechanicsss} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="MechanicsDetails" component={MechanicsDetails} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="ManuallyLocation" component={ManuallyLocation} options={(() => ({
                    // headerShown: false
                }))} />
                <Stack.Screen name="YourMechanics" component={YourMechanics} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="InvoicePage" component={InvoicePage} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="Cart" component={Cart} options={(() => ({
                    headerShown: false
                }))} />
                <Stack.Screen name="GoToCartPage" component={GoToCartPage} options={(() => ({
                    headerShown: true,
                    headerTitleAlign :"center",
                    headerTitle:"Add To Cart",
                    headerTitleStyle:{
                        fontFamily:"Forza-Bold"
                    }
                }))} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AllStackNavigation;