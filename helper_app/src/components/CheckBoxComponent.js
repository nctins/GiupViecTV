import { Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ObjMapper from "object-mapper";
import useTheme from "~hooks/useTheme";

const CheckBoxComponent = (props) => {
    const iconName = props.isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";
    
    const colors = useTheme().colors;
    const color = props.color || "Gray.8";
    const size = props.size || 24;

    return (
        <Pressable onPress={props.onPress}>
            <MaterialCommunityIcons
                name={iconName} size={size} color={ObjMapper.getKeyValue(colors, color)} />
        </Pressable>
    );
};

export default CheckBoxComponent;
