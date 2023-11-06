import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "~contexts/AuthContext";
import { AxiosContext } from "~contexts/AxiosContext";
import useThemeStyles from '~hooks/useThemeStyles';
import Typography from "~components/Typography";
import { LIMIT_ADDRESS_LENGTH, PAYMENT_METHOD_CONDITION, POST_STATE } from "../constants/app_contants";
import DateFormater from '~utils/Dateformater';
import { currencyWithDot } from '~utils/StringFormat';
import { ORDER_DETAIL_SCREEN } from '~constants/screen_name';
import { PlusIcon } from './Icons';
import MinusIcon from './Icons/MinusIcon';

const styles = (theme) => StyleSheet.create({
    container:{
        width: "100%",
    },
    header:{
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.Azure,
        paddingHorizontal: 10,
    },
    contentContainer: {
        width: "100%",
        flexDirection: "column",
    },
    title: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.Gray[3],
        paddingHorizontal: 10,
    },
    line: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.Gray[3],
        marginLeft: 30,
        marginRight: 10,
    },
    moreInfoContainer:{
        paddingBottom: 20,
    },
    CartComponentIncome:{
        wrapper: {
            height: 60,
            backgroundColor: "#f0faff",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            marginLeft: 30,
            marginRight: 20,
            borderWidth: 1,
            borderColor: theme.colors.BackgroundBlue,
            borderRadius: 10,
            padding: 0,
        },
        leftContainer: {
            width: "65%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingHorizontal: 5,
            borderEndWidth: 1,
            borderEndColor: theme.colors.Gray[3]
        },
        rightContainer: {
            flex: 1,
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 5,
            backgroundColor: "#f0fbff",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
        },
    },
    textItem: {
        marginVertical: 1,
    },
})

const CartComponentIncome = ({navigation, cart}) => {
    const style = useThemeStyles(styles);
    const post = cart;
    const onPressCart = () => {
        // navigation.navigate(ORDER_DETAIL_SCREEN, { post: post });
    }

    const displayAddress = () => {
        if (post.address.length > 35) {
            return post.address.substring(0, 35).concat("...");
        } else {
            return post.address;
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
        return <Typography variant="TextBold">{currencyWithDot(parseInt(post.total) + parseInt(post.coupon_price))} VNĐ</Typography>
    }

    return (
        <TouchableOpacity onPress={onPressCart}>
            <View style={style.CartComponentIncome.wrapper}>
                <View style={style.CartComponentIncome.leftContainer}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Typography style={style.CartComponentIncome.textItem} variant="TextBold">{post.customer_name}</Typography>
                        <Typography style={[style.CartComponentIncome.textItem, {marginLeft: 10,}]} color="Azure" variant="Description">{displayDateTime()}</Typography>
                    </View>
                    <Typography style={style.CartComponentIncome.textItem} variant="Description">{displayAddress()}</Typography>
                </View>
                <View style={style.CartComponentIncome.rightContainer}>
                    {displayCurrency()}
                    <Typography variant="TextBold">- {currencyWithDot(post.coupon_price)}</Typography>
                    <Typography variant="Description">{displayPaymentMethod()}</Typography>
                </View>
            </View>
        </TouchableOpacity>
    );
}



const IncomeComponent = ({ navigation, data, setIsLoadding}) => {
    const style = useThemeStyles(styles);
    const {authAxios} = useContext(AxiosContext)
    const [moreInfo, setMoreInfo] = useState(false);
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCod, setTotalCod] = useState(0);
    const [totalVNPAY, setTotalVNPAY] = useState(0);
    const [receivePrice, setReceivePrice] = useState(0);
    const [enterprisePrice, setEnterprisePrice] = useState(0);
    const [couponCodPrice, setCouponCodPrice] = useState(0);
    const [couponVnpayPrice, setCouponVnpayPrice] = useState(0);

    useEffect(() => {
        calculatorPrice();
        getSystemControl();
    },[])

    const calculatorPrice = () => {
        let total_price = 0;
        let total_cod_price = 0;
        let total_vnpay_price = 0;
        let coupon_cod_price = 0;
        let coupon_vnpay_price = 0;
        data.lst_cart.map((post) => {
            total_cod_price += (parseInt(post.total) + parseInt(post.coupon_price));
            coupon_cod_price += parseInt(post.coupon_price);
        });
        data.lst_cart_vnpay.map((post) => {
            total_vnpay_price += (parseInt(post.total) + parseInt(post.coupon_price));
            coupon_vnpay_price += parseInt(post.coupon_price);
        });
        total_price = total_cod_price + total_vnpay_price;
        setTotalPrice(total_price);
        setTotalCod(total_cod_price);
        setTotalVNPAY(total_vnpay_price);
        setCouponCodPrice(coupon_cod_price);
        setCouponVnpayPrice(coupon_vnpay_price);
        setReceivePrice(total_vnpay_price + coupon_cod_price);
        setEnterprisePrice(total_price * tax + total_price * serviceFee);
    }

    const getSystemControl = () => {
        setIsLoadding(true);
        authAxios
        .get("/admin/UserManagement/system_control/tax")
        .then(async (response) => {
            let data = response.data.data;
            setTax(data.value)
            setIsLoadding(false);
        })
        .catch(async (error) => {
            if (error.response) {
            console.log(error.response.data);
            }
            setIsLoadding(false);
        });

        setIsLoadding(true);
        authAxios
        .get("/admin/UserManagement/system_control/service_fee")
        .then(async (response) => {
            let data = response.data.data;
            setServiceFee(data.value)
            setIsLoadding(false);
        })
        .catch(async (error) => {
            if (error.response) {
            console.log(error.response.data);
            }
            setIsLoadding(false);
        });
    }

    const moreInfoRender = () => {
        return (
            <View style={style.contentContainer}>
                <View style={style.moreInfoContainer}>
                    <View style={style.title}>
                        <Typography variant='SubtitleSemiBold' color='Gray.11'> (1) Thanh toán tiền mặt: </Typography>
                    </View>
                    {
                        data && data.lst_cart ? data.lst_cart.map((cart, idx) => {
                            return <CartComponentIncome key={idx} navigation={navigation} cart={cart}> </CartComponentIncome>
                        }) : null
                    }
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Tổng cộng: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalCod))} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Coupon: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(couponCodPrice)} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Phí dịch vụ: ({serviceFee * 100}%)</Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalCod) * serviceFee)} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Thuế tạm tính: ({tax * 100}%)</Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalCod) * tax)} VNĐ</Typography>
                    </View>

                    <View style={style.title}>
                        <Typography variant='SubtitleSemiBold' color='Gray.11'> (2) Thanh toán VNPAY: </Typography>
                    </View>
                    {
                        data && data.lst_cart_vnpay ? data.lst_cart_vnpay.map((cart, idx) => {
                            return <CartComponentIncome key={idx} navigation={navigation} cart={cart}> </CartComponentIncome>
                        }) : null
                    }
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Tổng cộng: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalVNPAY))} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Coupon: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(couponVnpayPrice)} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Phí dịch vụ: ({serviceFee * 100}%)</Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalVNPAY) * serviceFee)} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Thuế tạm tính: ({tax * 100}%)</Typography>
                        <Typography variant='TextBold' color='Gray.11'>{currencyWithDot(parseInt(totalVNPAY) * tax)} VNĐ</Typography>
                    </View>

                    <View style={style.title}>
                        <Typography variant='SubtitleSemiBold' color='Gray.11'> Tổng thu nhập </Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Số tiền bạn kiếm được: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{data.total_price === null ? currencyWithDot(parseInt(totalPrice)) : currencyWithDot(parseInt(data.total_price))} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Số tiền bạn cần trả cho công ty: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{data.enterprise_price === null ? currencyWithDot(enterprisePrice) : currencyWithDot(parseInt(data.enterprise_price))} VNĐ</Typography>
                    </View>
                    <View style={style.line}>
                        <Typography variant='TextBold' color='Gray.11'>Số tiền công ty trả lại cho bạn: </Typography>
                        <Typography variant='TextBold' color='Gray.11'>{data.receive_price === null ? currencyWithDot(receivePrice) : currencyWithDot(parseInt(data.receive_price))} VNĐ</Typography>
                    </View>
                    {!data.isPayment ? <Typography variant='TextBold' color='Azure' style={{marginTop: 10, marginLeft: 10,}}>* Vui lòng đến công ty để kết toán tiền </Typography> : null}
                </View>
            </View>
        )
    }

    return (
        <View style={style.container}>
            
            <View style={style.header}>
                <Typography variant='TitleBold' color='Azure'>{data.start_date.substring(0,10)} - {data.end_date === null ? "TODAY" : data.end_date.substring(0,10)}</Typography>
                {moreInfo ? <MinusIcon color='Azure' onPress={() => setMoreInfo(false)} /> : <PlusIcon color='Azure' onPress={() => setMoreInfo(true)} />}
            </View>
            {moreInfo ? moreInfoRender() 
                : null
            }
        </View>
    );
}
export default IncomeComponent;