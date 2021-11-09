import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Map from './screens/Map'
import Profile from './screens/Profile'
import Travels from './screens/Travels'
import { Ionicons } from '@expo/vector-icons';
import SingleTravel from './screens/SingleTravel';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTotalFlies = () => {
  return 5;
}

function tabNavigation(){
  return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-home'
                    : 'ios-home-outline';
                } else if (route.name === 'Map') {
                  iconName = focused ? 'ios-map' : 'ios-map-outline';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'ios-person' : 'ios-person-outline';
                } else if (route.name === 'Travel') {
                  iconName = focused ? 'ios-airplane' : 'ios-airplane-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            })}
          >
        <Tab.Screen options={{title:"Homepage"}} name="Home" component={Home} />
        <Tab.Screen options={{title:"Consulta la mappa"}} name="Map" component={Map} />
        <Tab.Screen options={{title:"I tuoi viaggi"}} name="Travel" options={{ tabBarBadge: getTotalFlies() }} component={Travels}/>
        <Tab.Screen options={{title:"Il tuo profilo"}} name="Profile" component={Profile}/>
      </Tab.Navigator>
  );
}

export default class App extends React.Component{
  
  componentDidMount(){
    //Gestiscco autologin
  }
  render()
  {
    return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTitleAlign:'center',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff'
              },{headerShown: false }}>
              {/*Qui definisco tutte le pagine che ci sarrano nella mia app*/}
              {
                /* 
                  con options posso stilizzare l'header di default
                  title => modifico il tiotolo dell'header
                  header: () => null || <Componente />    -->  rendo invisibile l'header se ho già creato un mio header || uso come header un componente che ho già creat
                */
              }
              <Stack.Screen name="Homepage" component={tabNavigation} />
              <Stack.Screen name="Viaggio" component={SingleTravel} />
              {/**
               *  ({ route }) => ({ title: "Informazioni meteo di " + route.params.cityParam}) --> prendo i parametri passati da App.js
               */}
            </Stack.Navigator>
            
          </NavigationContainer>
    )
  }
}
