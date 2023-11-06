import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Pressable, Modal, Alert } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import useThemeStyles from '~hooks/useThemeStyles';
import AvatarComponent from '~components/AvatarComponent';
import Typography from "~components/Typography";
import { AuthContext } from "~contexts/AuthContext";
import StarRatingComponent from '~components/StarRatingComponent';
import { ClockEditIcon, ClockRemoveIcon, CrossIcon, PlusIcon, CheckAllIcon } from '~components/Icons';
import CheckBoxComponent from '~components/CheckBoxComponent';
import Button from '~components/Button';
import { DateInput, TimeInput } from '~components/Inputs';
import { BREAK_TIME, BREAK_TIME_MILISEC, BREAK_TIME_MINUS, JS_DAYS, TIMESERVING_HOURS, TIMESERVING_MILISEC } from '~constants/app_contants';
import Toast from '~utils/Toast';
import { AxiosContext } from '~contexts/AxiosContext';
import { DateObj2TimeStr, TimeStr2DateObj } from '~utils/Dateformater';
import SafeView from '~components/SafeView';
import StatusBar from '~components/StatusBar';
import LoadingScreen from '~screens/LoadingScreen';
import DefaultIcon from '~components/Icons/DefaultIcon';

const styles = (theme) => StyleSheet.create({
	default: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: theme.colors.Gray[1],
	},
	avatar_border: {
		borderRadius: 100,
		borderWidth: 1,
		borderColor: theme.colors.BackgroundBlue,
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	statistic: {
		wraper: {
			height: 160,
			width: "100%",
			backgroundColor: theme.colors.BackgroundBlue,
			flexDirection: "row",
		},
		left: {
			width: 150,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		right: {
			// flex: 2,
			flexDirection: "column",
			justifyContent: "center",

		},
		circle_top_title: {
			height: 26,
			padding: 2,
		},
		circle_block: {
			backgroundColor: theme.colors.Gray[0],
			width: 100,
			height: 100,
			borderRadius: 100,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 2,
			borderColor: theme.colors.FrostySkies,
		},
		left_item: {
			margin: 2,
			flexDirection: "row",
			alignItems: "center"
		}
	},
	list_item: {
		flexDirection: "column",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 10,
		marginBottom: 5,
	},
	list_item_body: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",

	},
	list_item_title: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	vertical_item: {
		wraper: {
			marginTop: 8,
			height: 110,
			maxWidth: 110,
			// width: "30%",
			flexDirection: "column",
			backgroundColor: theme.colors.Gray[0],
			borderRadius: 10,
			alignSelf: "center",
			marginHorizontal: 3,
		},
		header: {
			width: "100%",
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
			backgroundColor: theme.colors.BackgroundBlue,
		},
		body: {
			width: "100%",
			flex: 1,
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 5,
		},
		time_list: {
			minHeight: 60,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column"
		},
	},
	item: {
		wraper: {
			marginTop: 8,
			minHeight: 70,
			width: "48%",
			flexDirection: "row",
			backgroundColor: theme.colors.Gray[0],
			borderRadius: 10,
			alignSelf: "center",
			marginHorizontal: 3,
		},
		left: {
			width: 60,
			borderTopLeftRadius: 10,
			borderBottomLeftRadius: 10,
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			position: "relative",
			backgroundColor: theme.colors.ShinyOrange,
		},
		right: {
			width: "100%",
			flex: 1,
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 5,
		},
		time_list: {
			// minWidth: 150,
			minHeight: 60,
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column"
		},
	},
	center_view: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.Transparency,
	},
	modal: {
		wraper: {
			minHeight: 200,
			width: "80%",
			backgroundColor: theme.colors.Gray[0],
		},
		check_item: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			height: 35,
			marginBottom: 5,
			borderRadius: 5,
			padding: 5,
			margin: 5,
		},
		form: {
			flexDirection: "column",
			padding: 10,
			paddingHorizontal: 20,
		},
		date_time_input: {
			marginTop: 10,
		},
		is_check_item: {
			backgroundColor: theme.colors.Gray[1],
		},
		check_list: {
			flexDirection: "column",
			padding: 10,
			paddingHorizontal: 30,
		},
		btn_group: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginTop: 15,
		},
		btn_ok: {
			width: 100,
			backgroundColor: theme.colors.SpringGreen,
		},
		btn_cancel: {
			width: 100,
			backgroundColor: theme.colors.StrawberryRed,
		}
	},
	avatar: {
		alignSelf: "center",
		borderWidth: 3,
		borderRadius: 50,
		borderColor: theme.colors.Azure,
	},
	service_work_container: {
		backgroundColor: theme.colors.Gray[0],
		borderRadius: 15,
		marginBottom: 15,
		padding: 10,
		borderColor: theme.colors.Azure,
		borderWidth: 1,
	},
	service_work_item: {
		width: "50%",
		flexDirection: "row", 
		justifyContent: "flex-start", 
		alignItems: "center",
	},
	checkbox:{
		true: theme.colors.Azure,
		false: theme.colors.Gray[5]
	}
})

const ScheduleModal = ({ visible, setVisible, data, setSchedule }) => {
	const style = useThemeStyles(styles);
	const [items, setItems] = useState([]);

	useEffect(() => { setItems(data); }, [visible])

	const toggleItem = (idx) => {
		const new_items = [...items];
		const item = items[idx];
		new_items[idx] = { ...item, value: !item.value };
		setItems(new_items);
	};

	return (
		<Modal animationType='none' visible={visible} transparent={true} style={{ flex: 1 }}>
			<View style={[style.center_view]}>
				<View style={style.modal.wraper}>
					<View style={style.modal.check_list}>
						{items.map((ele, idx) => {
							return ele.value ? (
								<View style={[style.modal.check_item, style.modal.is_check_item]} key={`schedule_modal_item${idx}`}>
									<Typography variant='SubTitle' color='Gray.8'>{ele.title}</Typography>
									<CheckBoxComponent
										isChecked={ele.value}
										onPress={() => toggleItem(idx)}
										color="Azure"
										size={20} />
								</View>
							) : (
								<View style={style.modal.check_item} key={`schedule_modal_item${idx}`}>
									<Typography variant='SubTitle' color='Gray.8'>{ele.title}</Typography>
									<CheckBoxComponent
										isChecked={ele.value}
										onPress={() => toggleItem(idx)}
										color="Azure"
										size={20} />
								</View>
							)
						})}
						<View style={style.modal.btn_group}>
							<Button
								size='modalBtn'
								style={style.modal.btn_ok}
								onPress={() => { setSchedule(items); setVisible(false); }}>
								OK
							</Button>
							<Button
								size='modalBtn'
								style={style.modal.btn_cancel}
								onPress={() => { setVisible(false); }}>
								Hủy
							</Button>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const RestModal = ({ visible, setVisible, data = null, setData, setRestList, rest_list, schedule = [], setIsLoading}) => {
	const style = useThemeStyles(styles);
	const [date, setDate] = useState(null);
	const [time_list, setTimeList] = useState(null);
	const {authAxios} = useContext(AxiosContext);
	const {authState} = useContext(AuthContext);
	const helper_id = authState.user.id;

	useEffect(() => {
		if (data) {
			const rest_date = rest_list[data]
			setDate(rest_date.date);
		} else {
			// const currentDate = new Date();
			// const init_time_to = new Date(currentDate.getTime() + TIMESERVING_MILISEC);
			setDate(null);
		}
	}, [visible]);

	useEffect(() => {
		if (date instanceof Date) {
			let new_time_list = {};
			if (data) {
				new_time_list = rest_list[data].time_list;
			} else {
				const day = JS_DAYS[date.getDay()];
				new_time_list = schedule[day].time_list.map((ele, idx) => {
					return { ...ele, selected: false }
				})
			}
			setTimeList(new_time_list);
		}
	}, [date])

	const checkValid = () => {
		if (!date) {
			Toast.createToast("Bạn chưa chọn ngày nghỉ nào.")
			return false;
		}
		if (time_list.filter((ele) => ele.selected).length == 0) {
			Toast.createToast("Bạn chưa chọn ca nghỉ nào.")
			return false;
		}
		return true;
	}

	const resetState = () => {
		if (data) {
			setData(null);
		}
		setDate(null);
		setTimeList(null);
		return;
	}

	const onOK = () => {
		if (!checkValid()) {
			return;
		}

		const new_rest_list = { ...rest_list };
		const key = date.toISOString().slice(0, 10).split("-").join("");
		new_rest_list[key] = {
			date: date,
			time_list: time_list,
		};
		const data = {
			date: date,
			off_time_1: time_list[0].selected,
			off_time_2: time_list[1].selected,
			off_time_3: time_list[2].selected,
		}
		setIsLoading(true);
		authAxios
		  .put(`/helper/${helper_id}/rest-schedule`, data)
		  .then((res)=>{
			  setRestList(new_rest_list);
			  resetState();
			  setVisible(false);
			  setIsLoading(false);
		  })
		  .catch((err)=>{
			Toast.createToast("Có lỗi xảy ra vui lòng thử lại.");
			setIsLoading(false);
		  })
	};

	const onSelectItem = (idx) => {
		const item = time_list[idx];
		const new_time_list = [...time_list];
		new_time_list[idx] = {...item, selected: !item.selected};
		setTimeList(new_time_list);
	}

	const onCancel = () => {
		resetState();
		setVisible(false);
	}

	return (
		<Modal animationType='none' visible={visible} transparent={true} style={{ flex: 1 }}>
			<View style={[style.center_view]}>
				<View style={[{ minWidth: 10 }, style.modal.wraper, { minWidth: 10 }]}>
					<View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
						<Typography variant='H7'>Chọn ngày nghỉ</Typography>
					</View>
					<View style={style.modal.form}>
						<View style={style.modal.date_time_input}>
							<Typography style={{ marginBottom: 5 }}>Ngày nghỉ:</Typography>
							<DateInput
								value={date}
								onChange={(selectedTime) => {
									setDate(selectedTime);
								}}
								containerStyle={{ width: "100%" }}
								auto_completed={false}
							/>
						</View>
						<View style={style.modal.date_time_input}>
							<Typography style={{ marginBottom: 5 }}>Ca nghỉ:</Typography>
							{time_list && time_list.map((ele, idx) => {
								const time_from = ele.from;
								const time_to = ele.to;
								if (time_from && time_to) {
									return (
										<View style={[style.modal.check_item, style.modal.is_check_item,{justifyContent: "flex-start", alignItems: "center",margin: 0}]} key={`rest_modal_item_checkbox${idx}`}>
											<CheckBoxComponent
												isChecked={ele.selected}
												onPress={() => onSelectItem(idx)}
												color="Azure"
												size={20} />

											<View style={{ marginLeft: 10 }}>
												<Typography variant='SubTitle' color='Gray.8'>{`${time_from.toTimeString().slice(0,5)} - ${time_to.toTimeString().slice(0,5)}`}</Typography>
											</View>
										</View>
									)
								}

							})}
							{
								time_list && time_list.filter((ele) => ele.from && ele.to).length == 0 && (
									<View style={{flexDirection:"row", justifyContent:"center"}}>
										<Typography variant='Description' color='StrawberryRed'>Bạn không có ca làm nào vào ngày này.</Typography>
									</View>
								)
							}
						</View>
						<View style={style.modal.btn_group}>
							<Button size='modalBtn' style={style.modal.btn_ok} onPress={() => onOK()}>
								OK
							</Button>
							<Button size='modalBtn' style={style.modal.btn_cancel} onPress={() => onCancel()}>
								Hủy
							</Button>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const EditScheduleModal = ({ visible, setVisible, day = 0, setSchedule, schedule, setIsLoading }) => {
	const { authAxios } = useContext(AxiosContext);
	const { authState } = useContext(AuthContext);
	const helper_id = authState.user.id;

	const style = useThemeStyles(styles);
	const [time_list, setTimeList] = useState([
		{ from: null, to: null },
		{ from: null, to: null },
		{ from: null, to: null },
	]);

	const setTimeFrom = (value, idx) => {
		if(!checkTimeFrom(value, idx)) {
			// setTimeListEle({from: null, to: null},idx);
			return;
		}
		setTimeListEle({...time_list[idx], from: value}, idx);
		return;
	};

	const setTimeTo = (value, idx) => {
		if (!checkTimeTo(value, idx)) {
			setTimeListEle({ ...time_list[idx], to: null });
			return
		}
		setTimeListEle({ ...time_list[idx], to: value }, idx)
	};

	const setTimeListEle = (ele, idx) => {
		const new_time_list = [...time_list];
		new_time_list[idx] = ele;
		setTimeList(new_time_list);
		return;
	}

	const checkTimeFrom = (value, idx) => {
		if (time_list[idx].to && time_list[idx].to - value < TIMESERVING_MILISEC) {
			Toast.createToast(`Một ca làm việc ít nhất phải ${TIMESERVING_HOURS} giờ.`)
			return false;
		}
		if (idx == 0) {
			return true;
		}

		const prev_item = time_list[idx-1];
		if (!prev_item.to || !prev_item.from) {
			Toast.createToast("Bạn cần nhập xong ca làm trước");
			return false;
		}
		if ( value - prev_item.to < BREAK_TIME_MILISEC) {
			// console.log(value - prev_item.to - BREAK_TIME_MILISEC);
			Toast.createToast(`Hai ca làm cần cách nhau ít nhất ${BREAK_TIME_MINUS} phút`);
			return false;
		}
		return true;
	}

	const checkTimeTo = (value, idx) => {
		const item = time_list[idx];
		if (value - item.from < TIMESERVING_MILISEC) {
			// console.log(value - item.from - TIMESERVING_MILISEC);
			Toast.createToast(`Một ca làm việc ít nhất phải ${TIMESERVING_HOURS} giờ.`)
			return false;
		}

		if (idx != 0) {
			const prev_item = time_list[idx-1];
			if (!prev_item.to || !prev_item.from) {
				Toast.createToast("Bạn cần nhập xong ca làm trước");
				return false;
			}
		}

		if (idx == time_list.length - 1) {
			return true;
		}

		const next_item = time_list[idx + 1];
		if (next_item.from && next_item.from - value < BREAK_TIME_MILISEC) {
			Toast.createToast(`Hai ca làm cần cách nhau ít nhất ${BREAK_TIME_MINUS} phút`);
			return false;
		}
		return true;
	}

	useEffect(() => {
		const init = [...schedule[day].time_list];
		setTimeList(init);
	}, [visible]);

	const updateSchedule = (values = null) => {
		setIsLoading(true);
		if (!values) {
			values = time_list;
		}
		const new_schedule = [...schedule];
		new_schedule[day] = { ...schedule[day], time_list: values };
		const data = {
			helper_id: helper_id,
			day: day,
			is_working: schedule[day].value,
			time_from_1: values[0].from ? DateObj2TimeStr(values[0].from) : null,
			time_to_1: values[0].to ? DateObj2TimeStr(values[0].to) : null,
			time_from_2: values[1].from ? DateObj2TimeStr(values[1].from) : null,
			time_to_2: values[1].to ? DateObj2TimeStr(values[1].to) : null,
			time_from_3: values[2].from ? DateObj2TimeStr(values[2].from) : null,
			time_to_3: values[2].to ? DateObj2TimeStr(values[2].to) : null,
		}
		authAxios.put(`/helper/${helper_id}/working-schedule`, data)
		  .then(()=>{
			setSchedule(new_schedule);
		    setVisible(false);
			setIsLoading(false);
		  })
		  .catch((err)=>{
			Toast.createToast("có lỗi xảy ra vui lòng thử lại");
			setIsLoading(false);
		  })
	};

	const onClear = (idx) => {
		const new_time_list = [...time_list];
		new_time_list.push(new_time_list.splice(idx, 1)[0])
		new_time_list[2] = {from: null, to: null};
		setTimeList(new_time_list);
		return new_time_list;
	}

	const onOK = () => {
		if(time_list.filter((time)=>!time.from && !time.to).length == 3) {
			Toast.createToast("Vui lòng nhập ít nhất 1 ca làm việc.");
			return;
		}
		for (let index = 0; index < time_list.length; index++) {
			const time = time_list[index];
			if (!time.to != !time.from) {
				Alert.alert(
					"",
					`Ca làm việc ${index + 1} sẽ bị xoá do chưa nhập đầy đủ bạn có muốn tiếp tục không?`,
					[{text:"OK", onPress:()=>{ const new_sate = onClear(index); updateSchedule(new_sate) }}, {text:"Hủy", style:"cancel"}])
				return;
			}
		}
		updateSchedule();
		return;
	}

	return (
		<Modal animationType='none' visible={visible} transparent={true} style={{ flex: 1 }}>
			<View style={[style.center_view]}>
				<View style={[{ minWidth: 10 }, style.modal.wraper, { minWidth: 10 }]}>
					<View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
						<Typography variant='H7'>{schedule[day].title}</Typography>
					</View>
					<View style={style.modal.form}>
						{
							time_list.map((ele, idx) => {
								return (
									<View style={style.modal.date_time_input} key={`date_time_input${idx}`}>
										<View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:5}}>
											<View style={{flexDirection:"row", alignItems:"center"}}>
												<Typography variant='Text' style={{ marginBottom: 5 }}>Ca làm việc {idx + 1}:</Typography>
											</View>
											<Pressable style={{marginBottom:6}} onPress={() => onClear(idx)}>
												<Typography variant='Description' color='StrawberryRed'>xoá</Typography>
											</Pressable>
										</View>
										<View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
											<TimeInput
												value={ele.from}
												onChange={(selectedTime) => {
													setTimeFrom(selectedTime, idx);
												}}
												containerStyle={{ width: "40%" }}
												auto_completed={false}
											/>
											<Typography> - </Typography>
											<TimeInput
												value={ele.to}
												onChange={(selectedTime) => {
													setTimeTo(selectedTime, idx);
												}}
												containerStyle={{ width: "40%" }}
												auto_completed={false}
											/>
										</View>
									</View>
								)
							})
						}
						<View style={style.modal.btn_group}>
							<Button
								size='modalBtn'
								style={style.modal.btn_ok}
								onPress={() => onOK()}>
								OK
							</Button>
							<Button
								size='modalBtn'
								style={style.modal.btn_cancel}
								onPress={() => { setVisible(false); }}>
								Hủy
							</Button>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const ListSelectServiceComponent = ({service, helper_id, getServicesAPI, setIsLoading}) => {
	const style = useThemeStyles(styles);
	const { authAxios } = useContext(AxiosContext);
	const [isChecked, setIsChecked] = useState(service.isChecked);

	useEffect(()=>{
		setIsChecked(service.isChecked);
	}, [service]);

	const onChangeChecked = (value) => {
		if(value){
			turnOnService();
		}else{
			turnOffService();
		}
	}

	const turnOnService = () => {
		setIsLoading(true);
		authAxios
			.post(`/helper/` + helper_id + `/service-work`, {
				service_id: service.service_id
			})
			.then((res)=>{
				Toast.createToast(res.data.msg);
				setIsChecked(true);
				setIsLoading(false);
			})
			.catch((err) => {
				Toast.createToast(err.msg);
				setIsChecked(false);
				getServicesAPI();
			})
	}

	const turnOffService = () => {
		const data = {
			helper_id: helper_id,
			service_id: service.service_id,
		}
		setIsLoading(true);
		authAxios
			.delete(`/helper/${helper_id}/service-work`,{data})
			.then((res)=>{
				Toast.createToast(res.data.msg);
				setIsChecked(false);
				setIsLoading(false);
			})
			.catch((err) => {
				Toast.createToast(err.msg);
				setIsChecked(true);
				getServicesAPI();
			})
	}

	return (
		<View key={service.service_id} style={style.service_work_item}>
			<CheckBox
				value={isChecked}
				onValueChange={onChangeChecked}
				tintColors={style.checkbox}
			/>
			<Typography variant='Text'>{service.name}</Typography>
		</View>
	)
}

const HomeScreen = () => {
	const style = useThemeStyles(styles);
	const authContext = useContext(AuthContext);
	const user = authContext.authState.user;
	const [schedule_modal, setScheduleModal] = useState(false);
	const init_schedule = [
		{ title: "Thứ 2", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Thứ 3", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Thứ 4", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Thứ 5", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Thứ 6", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Thứ 7", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
		{ title: "Chủ nhật", value: false, time_list: [{ from: null, to: null }, { from: null, to: null }, { from: null, to: null }] },
	];
	const [schedule, setSchedule] = useState(init_schedule);
	const [rest_modal, setRestModal] = useState(false);
	// rest list is: {yyyymmdd:{date, time_list:[{selected, time_from, time_to}]}
	const [rest_list, setRestList] = useState({});

	// edit schedule state 
	const [target_schedule, setTargetSchedule] = useState(0);
	const [edit_schedule_modal, setEditScheduleModal] = useState(false);

	// edit rest state
	const [target_rest_date, setTargetRestDate] = useState(null);

	const { authAxios } = useContext(AxiosContext);
	const { authState } = useContext(AuthContext);

	// statistic state 
	const init_statistic = {
		credits: 0,
		num_complete_posting: 0,
		num_cancel_post: 0,
		avg_rating: 0,
	}
	const [statistic_state, setStatisticState] = useState(init_statistic);
	
	const helper_id = authState.user.id;

	const [services, setServices] = useState([]);
	const [serviceWork, setServiceWork] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(()=>{
		getWorkScheduleAPI();
		getStatistStateAPI();
		getServicesAPI();
	}, [])

	const getWorkScheduleAPI = () => {
		setIsLoading(true);
		// get working schedule
		authAxios
		  .get(`helper/${helper_id}/working-schedule`)
		  .then((res)=>{
			const res_obj = res.data;
			let new_schedule = [...schedule];
			res_obj.forEach((ele) => {
				const time_list = [
					{
						from: ele.time_from_1 ? TimeStr2DateObj(ele.time_from_1) : null, 
						to: ele.time_to_1 ? TimeStr2DateObj(ele.time_to_1) : null
					},
					{
						from: ele.time_from_2 ? TimeStr2DateObj(ele.time_from_2) : null, 
						to: ele.time_to_2 ? TimeStr2DateObj(ele.time_to_2) : null
					},
					{
						from: ele.time_from_3 ? TimeStr2DateObj(ele.time_from_3) : null, 
						to: ele.time_to_3 ? TimeStr2DateObj(ele.time_to_3) : null
					},
				];
				
				new_schedule[ele.day] = {
					...new_schedule[ele.day],
					value: ele.is_working == 1,
					time_list: time_list,
				};
			})
			getRestList(new_schedule)
			setSchedule(new_schedule);
		}).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

	const getStatistStateAPI = () => {
		setIsLoading(true);
		authAxios
			.get(`/helper/${helper_id}`)
			.then((res)=>{
				const res_obj = res.data.data;
				const data = {
					credits: res_obj.credits,
					num_complete_posting: res_obj.num_complete_posting,
					num_cancel_post: res_obj.num_cancel_post,
					avg_rating: res_obj.avg_rating,
				};
				setStatisticState(data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			})
	}

	const getServicesAPI = () => {
		setIsLoading(true);
		let service_work = [];
		authAxios
		.get(`/helper/` + helper_id + `/service-work`)
		.then((res)=>{
			// console.log(res.data.data);
			service_work = res.data.data;
			setServiceWork(service_work);
		})

		authAxios
			.get(`/services`)
			.then((res)=>{
				// console.log(res.data.data);
				let lst_service = res.data.data;
				lst_service = lst_service.map((service) => {
					for (let i = 0; i < service_work.length; i++) {
						const element = service_work[i];
						if(service.service_id === element.service_id){
							return {...service, isChecked: true}
						}
					}
					return {...service, isChecked: false}
				})
				setServices(lst_service);
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}

	const getRestList = (working_schedule) =>{
		// get rest_schedule
		setIsLoading(true);
		authAxios
		  .get(`helper/${helper_id}/rest-schedule`)
		  .then((res)=>{
			const resObj = res.data;
			// console.log(resObj);

			let new_rest_list = {};
			resObj.forEach((ele)=>{
				// console.log(ele);
				const date = new Date(ele.date);
				const key = date.toISOString().slice(0, 10).split("-").join("");
				const day = JS_DAYS[date.getDay()];
				// console.log(date.getDay());
				// console.log(JS_DAYS);
				// console.log(day);
				
				const time_list = working_schedule[day].time_list.map((time, idx)=>{
					return {
						selected: ele[`off_time_${idx+1}`],
						from: time.from,
						to: time.to,
					}
				})
				// console.log(time_list);
				new_rest_list[key] = {
					date: date,
					day: day,
					time_list: time_list,
				}
			})
			// console.log(new_rest_list);
			setRestList(new_rest_list);
			setIsLoading(false);
		  }).catch((err) => {
			console.log(err);
			setIsLoading(false);
		})
	}

	const toggleSchedule = (idx) => {
		const new_schedule = [...schedule];
		const item = schedule[idx];
		new_schedule[idx] = { ...item, value: !item.value };
		setSchedule(new_schedule);
	};

	const resetSchedule = (idx) => {
		setIsLoading(true);
		const new_schedule = [...schedule];
		const item = schedule[idx];
		const new_item = { ...item, value: false, time_list: [{ from: null, to: null },{ from: null, to: null },{ from: null, to: null }] };
		const time_list = new_item.time_list;
		const data = {
			helper_id: helper_id,
			day: idx,
			is_working: false,
			time_from_1: null,
			time_to_1: null,
			time_from_2: null,
			time_to_2: null,
			time_from_3: null,
			time_to_3: null,
		}
		authAxios.put(`/helper/${helper_id}/working-schedule`, data)
		  	.then(()=>{
				new_schedule[idx] = new_item;
				setSchedule(new_schedule);
				setIsLoading(false);
			})
			.catch((err)=>{
				Toast.createToast("có lỗi xảy ra vui lòng thử lại");
				setIsLoading(false);
			})
		
	}

	const prepareDeleteSchedule = (idx) =>{
		// const delete_date = schedule[idx];
		const conflict_rest_date = Object.keys(rest_list).filter(key =>{
			return JS_DAYS[rest_list[key].date.getDay()] == idx;
		});
		if (conflict_rest_date.length == 0) {
			return;
		};
		conflict_rest_date.forEach( item =>resetRestDate(item));
	}

	const onDeleteSchedule = (idx) => {
		Alert.alert("Xóa lịch làm việc",
			`Bạn có muốn xóa lịch làm việc vào ${schedule[idx].title} không ?`
			+`\n*Lịch nghỉ vào ${schedule[idx].title} sẽ bị xóa`,
			[
				{
					text: "OK",
					onPress: () => {
						//TODO
						prepareDeleteSchedule(idx);
						resetSchedule(idx);
					}
				},
				{
					text: "Hủy",
					style: "cancel"
				}
			])
	}

	const onEditSchedule = (idx) => {
		setEditScheduleModal(true);
		setTargetSchedule(idx);
	};

	const onEditRestDate = (key) => {
		setTargetRestDate(key);
		setRestModal(true);
	}

	const resetRestDate = (key) => {
		setIsLoading(true);
		const rest_date = rest_list[key].date;
		const data = {
			date: rest_date,
			helper_id: helper_id,
		}
		// console.log(data);
		authAxios.delete(`/helper/${helper_id}/rest-schedule`, {data})
			.then((res)=>{
				console.log(res.data);
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
				setIsLoading(false);
			})
		const new_rest_list = { ...rest_list };
		delete new_rest_list[key];
		setRestList(new_rest_list);
	}

	const onDeleteRestItem = (key) => {
		const rest_date = rest_list[key].date;
		const date_str = `${rest_date.getFullYear()}-${rest_date.getMonth()+1}-${rest_date.getDate()}`;
		Alert.alert(
			"Xóa ngày nghỉ",
			`Bạn có muốn xóa lịch nghỉ vào ngày ${date_str} không ?`,
			[
				{text: "OK", onPress: () => {resetRestDate(key);}},
				{text: "Hủy", style: "cancel"}
			])
	}

	const WorkingItem = ({data, idx}) => {
		const ele = data;
		return (
			<View style={style.vertical_item.wraper} key={`working_item.wraper${idx}`}>
				<View style={style.vertical_item.header}>
					<Typography variant='SubTitle' color='Gray.0'>{ele.title}</Typography>
				</View>
				<View style={style.vertical_item.body}>
					<View style={style.item.time_list}>
						{ schedule[idx].time_list.filter((time) => time.from && time.to).length == 0 ?
								(
									<Pressable style={{ height: 50, padding: 10 }} onPress={() => onEditSchedule(idx)} >
										<Typography variant='Description' color='Azure'>Chạm để nhập thời gian làm</Typography>
									</Pressable>
								) :
								schedule[idx].time_list.map((time, time_idx) => {
									if (time.from && time.to) {
										return (
											<View style={{ marginVertical: 2 }} key={`time_list${idx}${time_idx}`}>
												<Typography variant='Text'>{`${time.from.toTimeString().slice(0, 5)} - ${time.to.toTimeString().slice(0, 5)}`}</Typography>
											</View>
										)
									}
								})
						}
					</View>
					<View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 25 }}>
						<Pressable onPress={() => onDeleteSchedule(idx)} >
							<CrossIcon size={17} color="AlizarinRed" />
						</Pressable>
						<Pressable onPress={() => onEditSchedule(idx)}>
							<ClockEditIcon size={17} color="Azure" />
						</Pressable>
					</View>
				</View>
			</View>
		)
	}

	const checkAllService = () => {
		setIsLoading(true);
		let data = services.map((service) => {
			return {
				service_id: service.service_id,
			}
		});
		authAxios
			.post(`/helper/` + helper_id + `/service-work/checkAll`, {
				services: data,
			})
			.then((res)=>{
				Toast.createToast(res.data.msg);
				setIsLoading(false);
				getServicesAPI();
			})
			.catch((err) => {
				Toast.createToast(err.msg);
				getServicesAPI();
			})
	}

	const unCheckAllService = () => {
		setIsLoading(true);
		authAxios
			.delete(`/helper/` + helper_id + `/service-work/unCheckAll`)
			.then((res)=>{
				Toast.createToast(res.data.msg);
				setIsLoading(false);
				getServicesAPI();
			})
			.catch((err) => {
				Toast.createToast(err.msg);
				getServicesAPI();
			})
	}

	const createBoxServiceWork = () => {
		let lstServiceCheck = services.filter((service) => {
			return service.isChecked;
		});
		return (
			<View style={style.list_item}>
				<View style={style.list_item_title}>
					<Typography variant='SubtitleSemiBold' color='Gray.11'>Dịch vụ thực hiện </Typography>
					<Pressable 
						style={{flexDirection:"row", alignItems: "center" }}
						onPress={lstServiceCheck.length === 0 ? checkAllService : unCheckAllService}
					>
						<CheckAllIcon color='Gray.11' size={20} />
						<Typography variant='Description' color='Gray.11' style={{marginLeft: 10,}}>{lstServiceCheck.length === 0 ? "Chọn tất cả" : "Bỏ chọn tất cả"}</Typography>
					</Pressable>
				</View>
				<View style={[style.list_item_body, style.service_work_container]}>
					{
					services.map((service, idx) => {
						return <ListSelectServiceComponent 
									key={service.service_id}
									helper_id={helper_id}
									service={service}
									getServicesAPI={getServicesAPI}
									setIsLoading={setIsLoading}
								/>
					})
					}
				</View>
			</View>
		)
	}

	const onClickDefaultScheduleWork = () => {
		Alert.alert("Thông báo",
			`Bạn có muốn đặt lại lịch làm việc mặt định không?`,
			[
				{
					text: "OK",
					onPress: () => {setDefaultScheduleWork()},
				},
				{
					text: "Hủy",
					style: "cancel"
				}
			])
	}

	const setDefaultScheduleWork = () => {
		setIsLoading(true);
		authAxios.post(`/helper/${helper_id}/working-schedule`, {})
			.then(()=>{
				getWorkScheduleAPI();
				setIsLoading(false);
			})
			.catch((err)=>{
				Toast.createToast("có lỗi xảy ra vui lòng thử lại");
				console.log(err);
				setIsLoading(false);
			})
	}

	return (
		<>
		<StatusBar barStyle='dark-content' backgroundColor='Gray.1'/>
		<SafeView>
			{isLoading ? <LoadingScreen /> : null}
			<View style={style.default}>
				<StatusBar />
				<ScrollView>
					{/* wellcome title */}
					<View style={style.header}>
						<View style={{width:"70%", flexDirection:"column"}}>
							<Typography variant="H7">Xin chào, {user.name}</Typography>
							{user.address && user.address.length > 0 ? 
								<Typography variant="Text" color='BackgroundBlue'>{user.address}</Typography> : 
								<Typography variant="Text" color='ASpunkyRedOrange'>{"Bạn chưa cài đặt địa chỉ, vui lòng cài đặt đặt địa chỉ trong Tài khoản -> Chỉnh sửa thông tin cá nhân"}</Typography>}
						</View>
						<AvatarComponent img={user.avatar_url} size='lg' containerAvatarStyle={style.avatar_border}/>
					</View>
					{/* thong ke */}
					<View style={style.statistic.wraper}>
						<View style={style.statistic.left}>
							<Typography style={style.statistic.circle_top_title} variant="H6" color='Gray.0'>Điểm tin cậy</Typography>
							<View style={style.statistic.circle_block}>
								<Typography variant='H2' color='Azure'>{statistic_state.credits}</Typography>
							</View>
						</View>
						<View style={style.statistic.right}>
							<View style={style.statistic.left_item}>
								<Typography variant="Title" color='Gray.0'>Đánh giá:</Typography>
								<StarRatingComponent
									containerStyle={{ width: 80, marginLeft: 15 }}
									rating={statistic_state.avg_rating}
									starSize={15} />
							</View>
							<View style={style.statistic.left_item}>
								<Typography variant="Title" color='Gray.0'>Số lần hủy: {statistic_state.num_cancel_post}</Typography>
							</View>
							<View style={style.statistic.left_item}>
								<Typography variant="Title" color='Gray.0'>Số lần hoàn thành: {statistic_state.num_complete_posting}</Typography>
							</View>
						</View>
					</View>
					{/* lich lam viec */}
					<View style={style.list_item}>
						<View style={style.list_item_title}>
							<View style={{flexDirection: "row"}}>
								<Typography style={{marginRight: 10}} variant='SubtitleSemiBold' color='Gray.11'>Lịch làm việc</Typography>
								<Pressable onPress={onClickDefaultScheduleWork}>
									<DefaultIcon color='Gray.11' size={20} />
								</Pressable>
							</View>
							{schedule.filter((ele) => { return ele.value }).length == 7 ?
								null
								:
								<Pressable onPress={() => { setScheduleModal(true); }}>
									<PlusIcon color='Gray.11' size={20} />
								</Pressable>
							}
						</View>
						<View style={style.list_item_body}>
							{schedule.map((ele, idx) => {
								if (ele.value) {
									return <WorkingItem data={ele} idx={idx} key={`schedule_item${idx}`}/>
								}
							})}
						</View>
					</View>

					{/* lich nghi */}
					<View style={style.list_item}>
						<View style={style.list_item_title}>
							<Typography variant='SubtitleSemiBold' color='Gray.11'>Lịch nghỉ</Typography>
							<Pressable onPress={() => { setRestModal(true) }}>
								<PlusIcon color='Gray.11' size={20} />
							</Pressable>
						</View>
						<View style={style.list_item_body}>
							{Object.keys(rest_list).map((key, idx) => {
								const date = new Date(rest_list[key].date);
								const time_list = rest_list[key].time_list;
								return (
									<View style={style.item.wraper} key={`rest_item.wraper${idx}`}>
										<View style={style.item.left}>
											<Typography variant='SubTitle' color='Gray.0'>{`${date.getDate()}/${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`}</Typography>
											<Typography variant='SubTitle' color='Gray.0'>{`${date.getFullYear()}`}</Typography>
										</View>
										<View style={style.item.right}>
											<View style={style.item.time_list}>
												{time_list.map((time, idx) => {
													if (time.selected && time.from && time.to) {
														const time_from = time.from.toTimeString().slice(0, 5);
														const time_to = time.to.toTimeString().slice(0, 5);
														return (
															<View style={{ marginVertical: 2 }} key={`rest_time_list${key}${idx}`}>
																<Typography variant='Text'>{`${time_from} - ${time_to}`}</Typography>
															</View>
														)
													}
												})}
											</View>
											<View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 25 }}>
												<Pressable onPress={() => onDeleteRestItem(key)} >
													<CrossIcon size={17} color="AlizarinRed" />
												</Pressable>
												<Pressable onPress={() => onEditRestDate(key)}>
													<ClockEditIcon size={17} color="Azure" />
												</Pressable>
											</View>
										</View>
									</View>
								)
							})}
						</View>
					</View>

					{/* chọn dịch vụ */}
					{services && services.length > 0 ? createBoxServiceWork() : null}
				</ScrollView>
				{/* lich lam viec modal */}
				<ScheduleModal
					visible={schedule_modal}
					setVisible={setScheduleModal}
					data={schedule}
					setSchedule={setSchedule}
				/>
				{/* modal lich nghi */}
				<RestModal
					visible={rest_modal}
					setVisible={setRestModal}
					setRestList={setRestList}
					rest_list={rest_list}
					data={target_rest_date}
					setData={setTargetRestDate}
					schedule={schedule}
					setIsLoading={setIsLoading}
				/>
				<EditScheduleModal
					visible={edit_schedule_modal}
					setVisible={setEditScheduleModal}
					day={target_schedule}
					setSchedule={setSchedule}
					schedule={schedule}
					setIsLoading={setIsLoading}
				/>
			</View>
		</SafeView>
		</>
	)
}

export default HomeScreen
