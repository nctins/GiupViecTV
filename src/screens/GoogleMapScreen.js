import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Alert } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import Button from '~components/Button';
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { API_GOOGLE } from "../constants/api";
import { BackIcon, CancelIcon, PlusIcon } from '~components/Icons';
import MinusIcon from '~components/Icons/MinusIcon';

const { width, height } = Dimensions.get("window");

const SearchAddressComponent = ({onPlaceSelected, position, goBackScreen, setOriginAddress, setOriginPlaceID}) => {
    const style = useThemeStyles(styles);
    const authContext = useContext(AuthContext);
    const {authAxios} = useContext(AxiosContext);
    const [address, setAddress] = useState("");
    const [placeID, setPlaceID] = useState("");

    const reverseGeocodeGoogle = async () => {
        let UrlAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.latitude + "," + position.longitude + "&key=" + API_GOOGLE;
        authAxios
        .get(UrlAPI)
        .then(async (response) => {
            let address_obj = response.data.results[0];
            // console.log("address obj");
            // console.log(address_obj);
            setPlaceID(address_obj.place_id);
            setAddress(address_obj.formatted_address);
        })
        .catch(async (error) => {
            console.log(error);
        });
    }

    const onConfirm = () => {
        if(placeID && placeID.length > 0){
            setOriginPlaceID(placeID);
            setOriginAddress(address);
            goBackScreen();
        }else{
            Alert.alert(
                "Thông báo!",
                "Địa chỉ hiện tại không đúng! \\n Vui lòng chọn lại địa chỉ.",
                [
                  { text: "OK"}
                ]
              );
        }
    }

    useEffect(() => {
        reverseGeocodeGoogle();
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
                    language: 'en', // Ngôn ngữ tìm kiếm
                    // types: '(cities)', // Loại địa điểm cần tìm
                    components: 'country:vn', // Chỉ tìm kiếm trong Việt Nam
                    location: '10.8231,106.6297', // Tọa độ trung tâm Hồ Chí Minh
                    radius: '20000', // Bán kính tìm kiếm (đơn vị là mét)
                    strictBounds: true, // Giới hạn tìm kiếm trong bán kính đã định sẵn
                }}
                renderRightButton={() => {return (<View style={{width: 120, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                                    {address.length > 0 ? <CancelIcon onPress={() => {setAddress("")}} /> : null} 
                                                    <Button style={style.confirmButton} borderRadius={100} onPress={onConfirm}>xác nhận </Button>
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

const GoogleMap = ({setModalVisible, setOriginAddress, setOriginPlaceID}) => { 
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

    const zoomIn = () => {
        const { latitudeDelta, longitudeDelta } = position;
        setPosition({...position,latitudeDelta: latitudeDelta * 0.5,longitudeDelta: longitudeDelta * 0.5});
    };
    
    const zoomOut = () => {
        const { latitudeDelta, longitudeDelta } = position;
        setPosition({...position,latitudeDelta: latitudeDelta * 2,longitudeDelta: longitudeDelta * 2});
    };

    const onPlaceSelected = (details) => {
        setPosition(prev => {return {...prev,latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}})
    };

    const onPressMap = (pos) => {
        setPosition(prev => {return {...prev, latitude:pos.latitude, longitude:pos.longitude}});
    }

    const goBackScreen = () => {
        setModalVisible(false);
    }

    return (
        <View style={style.container}>
            <MapView 
                style={style.map} 
                provider={PROVIDER_GOOGLE} 
                ref={mapRef}
                region={position}
                onPress={(e) => {
                    // console.log(e.nativeEvent);
                    onPressMap(e.nativeEvent.coordinate);
                }}
            >
                {position && <Marker coordinate={{latitude: position.latitude, longitude: position.longitude}} />}
            </MapView>
            <View style={style.backIconContainer}>
                <BackIcon size='md' color='while' onPress={goBackScreen} />
            </View>
            <SearchAddressComponent 
                onPlaceSelected = {onPlaceSelected} 
                position={position} 
                goBackScreen={goBackScreen} 
                setOriginAddress = {setOriginAddress} 
                setOriginPlaceID = {setOriginPlaceID}
            />
            <Button style = {style.zoomInButton} radius={0} onPress={zoomIn}>
                <PlusIcon size='sm' color='while'/>
            </Button>
            <Button style = {style.zoomOutButton} radius={0} onPress={zoomOut}>
                <MinusIcon size='sm' color='while' />
            </Button>

        </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        position: "absolute",
        top: 0,
        left: 0,
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
        top: 60,
    },
    inputContainer:{
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
    zoomInButton:{
        position: "absolute",
        width:  40, 
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.colors.BackgroundBlue,
        top: height - 140,
        left: width - 60,
        justifyContent: "center"
    },
    zoomOutButton:{
        position: "absolute",
        width:  40,
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.colors.BackgroundBlue,
        top: height - 90,
        left: width - 60,
        justifyContent: "center"
    },
    backIconContainer:{
        position: "absolute",
        width:  50,
        height: 50,
        paddingHorizontal: 0,
        paddingVertical: 0,
        top: 0,
        left: 10,
        justifyContent: "center",
        alignItems: "center"
    }
  })

export default GoogleMap