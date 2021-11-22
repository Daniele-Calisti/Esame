import React, { Component, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { getFirestore, setDoc, doc , onSnapshot, query, where, collection} from 'firebase/firestore';
import Locality from '../components/Locality';
import db from '../components/Firebase'
import md5 from "react-native-md5";

const API_KEY = 'AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs';


const getIndirizzo = (addresInformation) => addresInformation[1].long_name + ", " + addresInformation[2].long_name + ", " + addresInformation[4].short_name + "," + addresInformation[7].long_name;

const localitaAlreadyExists = (via) => {
    /*
    const q = query(collection(db, "viaggi"), where("username", "==", "calisti.daniele"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                const nome = doc.data().titolo;
                const img = doc.data().img;

                const objViaggio = {
                    id: md5.hex_md5( Date.now() +"" ),
                    nome: nome,
                    img: img
                }

                this.updateViaggi(objViaggio)
            });
        });
        */
    return false
}

const insertLocalita = (objLocalita) => {
    
    const id = md5.hex_md5( Date.now() +"" );
    const username = "calisti.daniele";

    if(!localitaAlreadyExists(objLocalita.via))
        setDoc(doc(db, "localita", id), {
            placeId: objLocalita.placeId,
            idViaggio: objLocalita.idViaggio
        });
}

const SingleTravel = ({route,navigation}) => {

    const [indirizzo, setIndirizzo] = useState("");
    const [numTelefono, setNumTelefono] = useState("");
    const [nome, setNome] = useState("");
    const [aperto, setAperto] = useState(false);
    const [objLocalita, setObjLocalita] = useState([]);

    const {name} = route.params
    const idViaggio = route.params.id

    useEffect( () => {
        const q = query(collection(db, "localita"), where("idViaggio", "==", idViaggio));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const placeId = doc.data().placeId;
                
                axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`)
                .then(data => {
                    const root = data.data.result;
                    const addresInformation = root.address_components;

                    const indirizzo = getIndirizzo(addresInformation)
                    setIndirizzo(indirizzo);

                    const numTelefono = root.international_phone_number;
                    setNumTelefono(numTelefono);

                    const nome = root.name;
                    setNome(nome);

                    const openNow = root.opening_hours.open_now;
                    setAperto(openNow);

                    const obj = {
                        nome,
                        indirizzo,
                        numTelefono,
                        openNow,
                        idViaggio
                    }

                    setObjLocalita(arr => [...arr, obj]);
                    
                }).catch(error => {
                    //Se qualcosa va storto gestisco gli errori
                    console.log(error);
                })
            });
        });
    })
    
    const localita = objLocalita.map( (el, index) => {
        return(
            <Locality nome={el.nome} indirizzo={el.indirizzo} openNow={el.openNow} key={index}/>
        )
    })

    return(
        <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder="Inserisci qui il posto da cercare"
                    onPress={(data, details = null) => {

                        const placeId = data.place_id;
                        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`)
                        .then(data => {
                            const root = data.data.result;
                            const addresInformation = root.address_components;

                            const indirizzo = getIndirizzo(addresInformation)
                            setIndirizzo(indirizzo);

                            const numTelefono = root.international_phone_number;
                            setNumTelefono(numTelefono);

                            const nome = root.name;
                            setNome(nome);

                            const openNow = root.opening_hours.open_now;
                            setAperto(openNow);

                            const obj = {
                                nome,
                                indirizzo,
                                numTelefono,
                                openNow,
                                idViaggio
                            }

                            setObjLocalita(arr => [...arr, obj]);
                            insertLocalita({
                                placeId,
                                idViaggio
                            });
                            
                        }).catch(error => {
                            //Se qualcosa va storto gestisco gli errori
                            console.log(error);
                        })
                    }}
                    query={{
                        key: 'AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs',
                        language: 'it',
                    }}
                    styles={{
                        container:{
                            flex:1,
                        },
                        textInputContainer: {
                            paddingHorizontal: "20%",
                            paddingTop: "10%",
                            borderRadius: 100,
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
            <ScrollView contentContainerStyle={styles.containerScrollview}>
                {localita}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    containerScrollview:{
        marginTop: "100%",
        alignItems: 'center',
    },
})

export default SingleTravel;