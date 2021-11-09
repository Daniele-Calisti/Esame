import * as React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const markers = [
    {
        nome: "Chiesa",
        descrizione: "Chiesa di San Luca",
        lat: 41.44834645248565,
        lng: 12.878481538287087
    },
    {
        nome: "Conad",
        descrizione: "Supermercato Conad",
        lat: 41.452463738171744, 
        lng: 12.872387559900204
    },
    {
        nome: "Tribunale",
        descrizione: "tribunale di Latina",
        lat: 41.469922928981696, 
        lng: 12.912411900427227
    }
]

const Map = props => {
    return(
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: 41.452399407592445,
                    longitude: 12.872516305922463,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    markers.map( (item,index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude : item.lat, longitude : item.lng }}
                            title={item.nome}
                            description={item.descrizione}
                            />
                    ))
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }
})

export default Map;