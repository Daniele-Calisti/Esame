import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const SingleTravel = ({route,navigation}) => {
    const {name} = route.params
    return(
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Inserisci qui il posto da cercare"
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const placeId = data.place_id;
                    console.log(placeId);
                    //const infoJson = getPlaceInformation(placeId);
                    //console.log(JSON.stringify(infoJson))
                }}
                query={{
                    key: 'AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs',
                    language: 'it',
                }}
                styles={{
                    textInputContainer: {
                        paddingHorizontal: "20%",
                        paddingTop: "10%",
                        borderRadius: 100
                    },
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
            <Text>
                Stai andando a: {name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',
    }
})

export default SingleTravel;