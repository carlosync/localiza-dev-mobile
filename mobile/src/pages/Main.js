import React, { useState ,useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";

function Main() {
    const [currentRegion, setCurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03, 
                })
            }
        }

        loadInitialPosition();
    }, []);

    if(!currentRegion){
        return null;
    }

    return (
      <MapView initialRegion={currentRegion} style={style.map}>
        <Marker coordinate={{ latitude: 2.8124912, longitude: -60.7059648 }}>
          <Image
            style={style.avatar}
            source={{
              uri: "https://avatars3.githubusercontent.com/u/3606676?s=460&v=4"
            }}
          />
        </Marker>
      </MapView>
    );
}

const style = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        
    },
});

export default Main;