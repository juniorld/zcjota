import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Component,useState} from "react";
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView , { Callout, Marker, Polyline,provider } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const ubiImage = require('./assets/ubicacion.png')
const cravyImage = require('./assets/tienda.png')
 

export default function App() {

  
  const [MapData, duration] = React.useState({
    distance:0,
    duration: 0,
  });
  const [origin, setOrigin] = React.useState({
    latitude:-17.748811692293902,
    longitude:  -63.1493895583319,
  });

  const [cravy] = React.useState({
    latitude:-17.41358328135466,
    longitude:  -66.16623603376084
   
  });

  const [cravy1] = React.useState({
    latitude:-17.767630424398185,
    longitude:  -63.15818800553231
    
  });

  const [cravy2] = React.useState({
    latitude:   -17.76675060727519,
    longitude:  -63.19123690819468
  
  });

  const [cravy3] = React.useState({
    latitude:-17.750677297645375,
    longitude: -63.171870104179085
    
  });

  const [cravy4] = React.useState({
    latitude:-17.782584442337782,
    longitude: -63.17189681902508
    
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
      // customMapStyle={mapStyle}
      style={styles.map2} 
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04
      }}
      
      mapType="standard"
      provider="google"
      >

        
      <Marker
      //draggable
      coordinate={origin}
      
      image={ubiImage}
     //</MapView> onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
     >
        <Callout>
          <Text>Mi ubicacion</Text>
         </Callout>
        
      </Marker>

      <Marker
      //draggable
      coordinate={cravy}
      image={cravyImage}
      onPress={(direction) => setRegion(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>Sucursal Chb</Text>
         </Callout>
        
      </Marker>

      <Marker
      //draggable
      coordinate={cravy1}
      image={cravyImage}
      onPress={(direction) => setRegion(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>Sucursal</Text>
         </Callout>
        
      </Marker>

      <Marker
      //draggable
      coordinate={cravy2}
      image={cravyImage}
      onPress={(direction) => setRegion(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>Sucursal</Text>
         </Callout>
        
      </Marker>

      <Marker
      //draggable
      coordinate={cravy3}
      image={cravyImage}
      onPress={(direction) => setRegion(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>Sucursal</Text>
         </Callout>
        
      </Marker>

      <Marker
      //draggable
      onPress={(direction) => setRegion(direction.nativeEvent.coordinate)}
      coordinate={cravy4}
      image={cravyImage}
      //</MapView>onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>1</Text>
         </Callout>
        
      </Marker>





      <Marker 
         // onPress={(direction) => setOrigin(direction.nativeEvent.coordinate)}
          draggable
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          onDragEnd= {(direction) => setRegion(direction.nativeEvent.coordinate)}
          //onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      >
        <Callout>
          <Text>Destino</Text>
         </Callout>
      </Marker>


<MapViewDirections
         origin={origin}
         destination={{latitude: region.latitude, longitude: region.longitude}}
         apikey={'AIzaSyCyh5gh3bBe9VhQqxFaRrEtVbuWOIZcqo8'}
         strokeColor="black"
         strokeWidth={5}
         onReady={result =>{
          MapData.distance = result.distance
          MapData.duration = result.duration
        console.log(`Distance: ${MapData.distance} km`)
         console.log(`Duration: ${MapData.duration} min.`)
         }}
         />
         
      </MapView>
      <View style={styles.container2}>
      <Text>
                 km: {Math.round(MapData.distance)}
                 
          </Text>
          <Text>
                 Minutos: {Math.round(MapData.duration)}
               
          </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : 50,
  },
  container2:{
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop : 50,
  },
  map2:{
    flex: 16,
    width: '100%',
    height: '100%',
    
  },
  
});
