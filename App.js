import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function ImagePickerExample() {
  const [ image, setImage ] = useState(null);
  const [ locayion, setLaction ] = useState(null);
  const pickImage = async () => {
    const library = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(`Library Access: ${library.status}`)
    
    if (library.status !== 'granted') return alert('Sorry, we need camera roll permissions to make this work!');
  

    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(image);

    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  const takePhoto = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const library = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log(`Library Access: ${library.status}`)
    console.log(`Camera Access: ${camera.status}`)

    if (camera.status && library.status !== 'granted') return alert( `Camera and photo library access is needed to use this functionality`)

    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setImage(image.uri)
  }
  
  const getLocation = async () =>{
    const { location } = await Location.requestForegroundPermissionsAsync();
    console.log(`Location access: ${location.status}`)

    if( location.status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});

      if (location){
        setLocation(location);
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button
        title="Get my location"
        onPress={getLocation}
      />
    </View>
  );
}
