import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const API_KEY = 'AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs';

var getPlaceInformation = (placeId) => {
    let ret;
    var axios = require('axios');

    var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`,
    headers: { }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response))
    })
    .catch(function (error) {
        ret = -1;
    });

    return ret;
}

const GooglePlacesComponent = props => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Inserisci qui il posto da cercare"
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    const placeId = data.place_id;
                    console.log(placeId);
                    const infoJson = getPlaceInformation(placeId);
                    console.log(JSON.stringify(infoJson))
                }}
                query={{
                    key: 'AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs',
                    language: 'it',
                }}
                styles={{
                    textInputContainer: {
                        paddingHorizontal: "20%",
                        paddingTop: "5%",
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
        )
}

export default GooglePlacesComponent;
            