import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const CustomizeButton = props => {
    return (
        <TouchableOpacity style={[styles.button,{backgroundColor:props.bgColor}]} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: "50%",
        height: 25,
        borderRadius: 20,
        marginTop: "5%"
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    }
})

export default CustomizeButton;
