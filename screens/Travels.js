import * as React from 'react';
import { View, Text, Modal, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import CustomizeButton from '../components/CustomizeButton';
import TravelCard from '../components/TravelCard';
import { getFirestore, setDoc, doc , onSnapshot, query, where, collection} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import md5 from "react-native-md5";
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const firebaseConfig = {
    apiKey: "AIzaSyBFu8QaULKyu3bX9o00qQmWXa69xrg5cWs",
    authDomain: "esame-326913.firebaseapp.com",
    projectId: "esame-326913",
    storageBucket: "esame-326913.appspot.com",
    messagingSenderId: "404096939057",
    appId: "1:404096939057:web:cfe43c26c613818e041110",
    measurementId: "G-DVGFHQ9J3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default class Travels extends React.Component{

    state = {
        isVisible: false,
        titoloViaggio: "",
        viaggi: [],
        newViaggio: {nome: ""}
    }

    //Prendo tutti i viaggi dell'utente
    componentDidMount(){
        //Query con cui accedo ai dati dell'utente
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

        console.log(JSON.stringify(this.state.viaggi))
    }

    updateViaggi = viaggio => {
        this.setState(prevState => {
            return {
                viaggi: prevState.viaggi.concat(viaggio)
            }
        })
    }

    insertDocument = (id,titolo,img,username) => {
        setDoc(doc(db, "viaggi", titolo), {
            titolo,
            img,
            username
        });

    }

    changeVisibility = () => {
        (this.state.isVisible ? this.setState({isVisible:false}) : this.setState({isVisible:true}))
    }

    OnChangeTextHandler = (titoloViaggio) => {
        this.setState({titoloViaggio})
    }

    onAddViaggio = (viaggio) => {
        if(viaggio.trim() === "")
        {
            alert("Dai un titolo al tuo viaggio!")
            return 
        }

        const id = md5.hex_md5( Date.now() +"" );
        const img = "https://source.unsplash.com/random";

        this.insertDocument(id,viaggio,img,"calisti.daniele");
        this.changeVisibility()
        alert("Viaggio: " + viaggio + " inserito correttamente!");
        const objViaggio = {
            id,
            nome: viaggio,
            img
        }
        //this.updateViaggi.bind(objViaggio)
        this.setState({newViaggio: objViaggio});
    }

    deleteViaggio = (id) => 
    {
      this.setState({
        viaggi: this.state.viaggi.filter(viaggio => viaggio.id !== id)
      })
    }

    renderTravelCard = () => {
        if(this.state.newViaggio.nome != "")
            return(
                <TravelCard title={this.state.newViaggio.nome} />
            )
    }

    goToTravel = (viaggio) => {
        this.props.navigation.navigate('Viaggio',{
            name: viaggio.nome
        })
    }

    render(){
        const cardViaggi = this.state.viaggi.map( (item, index) => {
            return(
                <TouchableOpacity key={item.id} onPress={this.goToTravel.bind(this,item)}>
                    <TravelCard title={item.nome}/>
                </TouchableOpacity>
            )
        })
        return(
            <View style={styles.mainContainer}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        this.changeVisibility
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.OnChangeTextHandler}
                            placeholder="Titolo del tuo viaggio"
                        />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={this.onAddViaggio.bind(this, this.state.titoloViaggio)}
                                >
                                <Text style={styles.textStyle}>Aggiungi viaggio</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={this.changeVisibility}
                                >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <CustomizeButton title={"Aggiungi un nuovo viaggio"} bgColor={"#5DADE2"} onPress={this.changeVisibility}/>
                <ScrollView>
                    {cardViaggi}
                    
                    {this.renderTravelCard}
                    
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    mainContainer: {
        flex: 1
    },  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
