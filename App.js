import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [latLng, setLatLng] = useState({ lat: 60.200692, lng: 24.934302 });
  const latitudeDelta = 0.0322;
  const longitudeDelta = 0.0221;

  // State where location is saved
  const [region, setRegion] = useState({
    latitude: latLng.lat,
    longitude: latLng.lng,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  });

  // State where marker is saved
  const [marker, setMarker] = useState({
    latitude: latLng.lat,
    longitude: latLng.lng,
  });

  // State where textinput field value is saved
  const [keyword, setKeyword] = useState();

  const search = () => {
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?maxResults=1&key=6n92vHDoYKItr56PlkIm6X4tBuIgXD7S&location=${keyword}`)
      .then(response => response.json())
      .then(responseJson => setLatLng(responseJson.results[0].locations[0].latLng))
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  }

  // When latLng changes value, update region and marker
  useEffect(() => {
    setRegion({ latitude: latLng.lat, longitude: latLng.lng, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta });
    setMarker({ latitude: latLng.lat, longitude: latLng.lng })
  }, [latLng]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={marker}
          title={keyword}
        />
      </MapView>
      <TextInput
        style={{ fontSize: 18, width: '95%', borderBottomWidth: 1, margin: 5 }}
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <View style={{width: "95%", marginBottom: 5}}>
        <Button
          title="Show" onPress={search}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});