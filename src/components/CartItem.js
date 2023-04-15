import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { LIMIT_ADDRESS_LENGTH, LIMIT_REASON_CANCAL_LENGTH, PAYMENT_METHOD_CONDITION, POST_STATE } from "../constants/app_contants";
import DateFormater from '~utils/Dateformater';
import { currencyWithDot } from '~utils/StringFormat';

const styles = (theme) => StyleSheet.create({
    wrapper: {
        width: "100%",
        height: 120,
        backgroundColor: "#f0faff",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        borderWidth: 1,
        padding: 3,
        borderColor: theme.colors.BackgroundBlue,
        borderRadius: 10,
    },
    leftContainer: {
        width: "70%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 10,
        borderEndWidth: 1,
        borderEndColor: theme.colors.Gray[3],
    },
    rightContainer: {
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        backgroundColor: "#f0fbff",
    },
    textItem: {
        marginVertical: 1,
    },
})

const CartItem = ({ navigation, post }) => {
    const style = useThemeStyles(styles);

    const onPressCart = () => {
        navigation.navigate("CartDetail", { post: post });
    }

    const displayAddress = () => {
        if (post.address.length > LIMIT_ADDRESS_LENGTH.LENGTH) {
            return post.address.substring(0, LIMIT_ADDRESS_LENGTH.LENGTH).concat("...");
        } else {
            return post.address;
        }
    }

    const displayReasonCancal = () => {
        if (post.reason_cancel.length > LIMIT_REASON_CANCAL_LENGTH) {
            return post.reason_cancel.substring(0, LIMIT_REASON_CANCAL_LENGTH).concat("...");
        } else {
            return post.reason_cancel;
        }
    }

    const displayDateTime = () => {
        const date = new Date(post.date);
        return `${post.time.substring(0, 5)}, ${DateFormater(date)}`
    }

    const displayPaymentMethod = () => {
        if (post.payment_method === PAYMENT_METHOD_CONDITION.COD) {
            return PAYMENT_METHOD_CONDITION.COD_NA;
        } else if (post.payment_method === PAYMENT_METHOD_CONDITION.VNPAY) {
            return PAYMENT_METHOD_CONDITION.VNPAY_NA
        } else {
            return PAYMENT_METHOD_CONDITION.ALL_NA;
        }
    }
    const displayCurrency = () => {
        const currency = currencyWithDot(post.total);
        if (currency.length >= 9) {
            return (
            <>
                <Typography variant="TextBold">{currencyWithDot(post.total)}</Typography>
                <Typography variant="TextBold">VNĐ</Typography>
            </>
            )
        }
        return <Typography variant="TextBold">{currencyWithDot(post.total)} VNĐ</Typography>
    }

    return (
        <TouchableOpacity onPress={onPressCart}>
            <View style={style.wrapper}>
                <View style={style.leftContainer}>
                    <Typography style={style.textItem} variant="Title">{post.helper_na}</Typography>
                    <Typography style={style.textItem} color="Azure" variant="Text">{displayDateTime()}</Typography>
                    <Typography style={style.textItem} variant="Text">{displayAddress()}</Typography>
                </View>
                <View style={style.rightContainer}>
                    {displayCurrency()}
                    <Typography variant="Description">{displayPaymentMethod()}</Typography>
                    {post.post_state === POST_STATE.CANCEL && (
                        <Typography color='StrawberryRed' style={{marginTop:5}} variant='Description'>{displayReasonCancal()}</Typography>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default CartItem;