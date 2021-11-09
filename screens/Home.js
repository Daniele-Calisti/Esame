import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GooglePlacesComponent from '../components/GooglePlacesComponent'
import PlaceCard from '../components/PlaceCard';


const Home = props => {
    return(
        <View style={styles.container}>
            <PlaceCard title={"Il presidente"}/>
        </View>
            
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
          },
    }
)

export default Home;