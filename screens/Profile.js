import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';

export default class Profile extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.registerText}>Prova di Registrati</Text>
                </View>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity style={styles.buttonContainer}>
                            {/*<Text>{user ? "Login" : "Registrati"}</Text>*/}
                            <Text>Opcion 1</Text>  
                            </TouchableOpacity>              
                            <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 2</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:200,
        textAlign: 'center',
        color: "red",
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerText:{
        alignSelf: 'center',
        textAlignVertical: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });
