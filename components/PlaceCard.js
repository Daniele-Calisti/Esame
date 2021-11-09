import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlaceCard = props => {
    return(
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Image style={styles.imageStyle} source={{uri:"https://picsum.photos/200"}} />
                <View style={styles.infoStyle}>
                <Text style={styles.titleStyle}>{props.title}</Text>
                <Text style={styles.categoryStyle}>Via Milazzo 47, Latina LT</Text>
                
                <View style={styles.iconLabelStyle}>
                    <Ionicons name={"ios-pin"} size={20}/>
                </View>
                </View>
            </View>
        </View>
    )
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#5DADE2',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 100,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default PlaceCard;
