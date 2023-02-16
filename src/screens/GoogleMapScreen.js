import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView,StatusBar,ScrollView,TextInput,RefreshControl } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_GOOGLE } from "../constants/api";

const { width, height } = Dimensions.get("window");

const SearchAddressComponent = ({onPlaceSelected}) => {
    const style = useThemeStyles(styles);

    return (
        <GooglePlacesAutocomplete
            styles={{textInput: style.input}}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details) => {
                // 'details' is provided when fetchDetails = true
                onPlaceSelected(details);
            }}
            query={{
                key: API_GOOGLE,
                language: 'vi',
            }}
        />
    )
}

const ASPECT_RATIO = width / height;

const cal_longitude_Delta = (latitudeDelta) => {
    return latitudeDelta * ASPECT_RATIO;
}

const GoogleMap = ({}) => { 
    const style = useThemeStyles(styles);
    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);
    const [position, setPosition] = useState({latitude: 10.8403729,
                                            longitude: 106.6752672,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: cal_longitude_Delta(0.01)});
    const mapRef = useRef(null);

    const moveTo = async () => {
        const camera = await mapRef.current?.getCamera();
        // console.log("position:");
        if (camera) {
            console.log(position);
            camera.center = {
                                latitude: position.latitude,
                                longitude: position.longitude
                            };
            mapRef.current?.animateCamera(camera, { duration: 1000 });
        }
    };

    const onPlaceSelected = (details) => {
        // const position = {
        //   latitude: details?.geometry.location.lat || 0,
        //   longitude: details?.geometry.location.lng || 0,
        // };
        // setPosition(position);
        setPosition(prev => {return {...prev,latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}})
        moveTo();
    };

    const onPressMap = (pos) => {
        // console.log(position);
        setPosition(prev => {return {...prev, latitude:pos.latitude, longitude:pos.longitude}});
        moveTo();
    }

    return (
        <View style={style.container}>
            <SearchAddressComponent />
            <MapView 
                style={style.map} 
                provider={PROVIDER_GOOGLE} 
                ref={mapRef}
                initialRegion={position}
                onPress={(e) => onPressMap(e.nativeEvent.coordinate)}
            >
                {position && <Marker coordinate={{latitude: position.latitude, longitude: position.longitude}} />}
            </MapView>
            <View style={style.searchContainer}>
                <SearchAddressComponent onPlaceSelected = {onPlaceSelected}/>
            </View>
        </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    searchContainer: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: 100,
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#bbb",
        paddingVertical: 12,
        marginTop: 16,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: "center",
    },
  })

export default GoogleMap