import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView , { Callout, Marker, Polyline,provider } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const carImage = require('./assets/auto.png')
export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude:-17.748811692293902,
    longitude:  -63.1493895583319,
  });

  const [destination, setDestination] = React.useState({
    latitude: -17.763257,
    longitude: -63.159766,
  });

  const [des, setdes] = React.useState({
    latitude: -17.769813,
    longitude: -63.015726

  });
 
  const [region, setRegion] = React.useState({
    latitude: -17.763257,
    longitude: -63.159766,
    latitudeDelta: 0.09,
   longitudeDelta: 0.04
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <Text>
      <GooglePlacesAutocomplete 
      style={styles.pkaces}
      placeholder='Search'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby:"distance"
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        
        console.log(data, details)
       setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        })
      }}
      query={{key: 'AIzaSyCyh5gh3bBe9VhQqxFaRrEtVbuWOIZcqo8',
        language: 'es',
        components : "country:bo",
        types: "establishment",
        radius: 30000,
        location:`${region.latitude},${region.longitude}`
      }}
    
    /> 
</Text>
      
      <MapView
      style={styles.map2} 
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      }}
      provider="google"
      >

        
      <Marker
      draggable
      coordinate={origin}
      //image={carImage}
      onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}>
        <Callout>
          <Text>Mi ubicacion</Text>
         </Callout>
        
      </Marker>

      <Marker 
      
          draggable
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          onDragEnd= {(direction) => setRegion(direction.nativeEvent.coordinate)}
          //onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      />

<MapViewDirections
         origin={origin}
         destination={{latitude: region.latitude, longitude: region.longitude}}
         apikey={'AIzaSyCyh5gh3bBe9VhQqxFaRrEtVbuWOIZcqo8'}
         strokeColor="black"
         strokeWidth={5}
         />




      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : 50,
  },
  map2:{
    width: '100%',
    height: '100%'
  },
});
