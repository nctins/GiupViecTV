import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView,StatusBar,ScrollView,TextInput,RefreshControl } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import Button from '~components/Button';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { API_GOOGLE } from "../constants/api";
import { CancelIcon, PlusIcon } from '~components/Icons';
import MinusIcon from '~components/Icons/MinusIcon';

const { width, height } = Dimensions.get("window");
const SearchAddressComponent = ({onPlaceSelected, position}) => {
    const style = useThemeStyles(styles);
    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);
    const [address, setAddress] = useState("");

    const getAddress = (address) => {
        console.log(address);
        return address.streetNumber + " " + address.street + " " + address.subregion + " " + address.region;
    }

    const reverseGeocode = async () => {
        // Location.setGoogleApiKey(API_GOOGLE);
        const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
            {
                latitude: position.latitude,
                longitude: position.longitude,
                // useGoogleMaps: true,
            }
        );
        
        setAddress(getAddress(reverseGeocodeAddress[0]));
    }

    const reverseGeocodeGoogle = async () => {
        authAxios
        .get("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=" + API_GOOGLE)
        .then(async (response) => {
            console.log("oke");
            console.log(response.data.results);
            setAddress(response.data.results[0]);
        })
        .catch(async (error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        reverseGeocode();
    }, [position]);

    return (
        <View style={style.searchContainer}>
            <GooglePlacesAutocomplete
                styles={{container: style.inputContainer ,textInputContainer:style.textInputContainer ,textInput: style.input}}
                placeholder= "Nhập địa chỉ của bạn"
                fetchDetails={true}
                currentLocation={true}
                autoFillOnNotFound={true}
                onPress={(data, details) => {
                    // 'details' is provided when fetchDetails = true
                    onPlaceSelected(details);
                }}
                textInputProps={{
                    value: address,
                    onChangeText: setAddress,
                }}
                onFail={error => console.error(error)}
                query={{
                    key: API_GOOGLE,
                    language: 'en',
                }}
                renderRightButton={() => {return (<View style={{width: 120, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                                    {address.length > 0 ? <CancelIcon onPress={() => {setAddress("")}} /> : null} 
                                                    <Button style={style.confirmButton} borderRadius={100}>xác nhận</Button>
                                                </View>)}}
            >
            </GooglePlacesAutocomplete>
        </View>
        
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

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
          
            let location = await Location.getCurrentPositionAsync({});
        //   console.log(location);
        //   setPosition({...position, latitude: location.coords.latitude, longitude: location.coords.longitude});
        })();
    }, []);

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

    const zoomIn = () => {
        const { latitudeDelta, longitudeDelta } = position;
        setPosition({...position,latitudeDelta: latitudeDelta * 0.5,longitudeDelta: longitudeDelta * 0.5});
    };
    
    const zoomOut = () => {
        const { latitudeDelta, longitudeDelta } = position;
        setPosition({...position,latitudeDelta: latitudeDelta * 2,longitudeDelta: longitudeDelta * 2});
    };

    const onPlaceSelected = (details) => {
        // const position = {
        //   latitude: details?.geometry.location.lat || 0,
        //   longitude: details?.geometry.location.lng || 0,
        // };
        // setPosition(position);
        console.log(details);
        setPosition(prev => {return {...prev,latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}})
        // moveTo();
    };

    const onPressMap = (pos) => {
        // console.log(position);
        setPosition(prev => {return {...prev, latitude:pos.latitude, longitude:pos.longitude}});
        // moveTo();
    }

    return (
        <View style={style.container}>
            <SearchAddressComponent />
            <MapView 
                style={style.map} 
                provider={PROVIDER_GOOGLE} 
                ref={mapRef}
                region={position}
                onPress={(e) => onPressMap(e.nativeEvent.coordinate)}
            >
                {position && <Marker coordinate={{latitude: position.latitude, longitude: position.longitude}} />}
            </MapView>
            <SearchAddressComponent onPlaceSelected = {onPlaceSelected} position={position} />
            <Button style = {style.zoomInButton} radius={0} onPress={zoomIn}>
                <PlusIcon />
            </Button>
            <Button style = {style.zoomOutButton} radius={0} onPress={zoomOut}>
                <MinusIcon />
            </Button>

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
        padding: 5,
        borderRadius: 8,
        top: 40,
    },
    inputContainer:{
        // backgroundColor: "blue",
        width: "100%",
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 100,
    },
    textInputContainer:{
        borderRadius: 100,
        width: "100%",
    },
    input: {
        borderRadius: 100,
    },
    confirmButton:{
        width: 90,
        height: 30,
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: theme.colors.BackgroundBlue,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    zoomInButtonContainer: {
        position: "absolute",
        width: 40,
        height: 40,
        backgroundColor: "white",
        top: height - 180,
        left: width - 70,
    },
    zoomInButton:{
        position: "absolute",
        width:  40,
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.colors.BackgroundBlue,
        top: height - 180,
        left: width - 70,
    },
    zoomOutButton:{
        position: "absolute",
        width:  40,
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.colors.BackgroundBlue,
        top: height - 130,
        left: width - 70,
    },
  })

export default GoogleMap