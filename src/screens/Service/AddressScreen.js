import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import useThemeStyles from "~hooks/useThemeStyles";
import Typography from "~components/Typography";
import { EditIcon, TrashIcon } from "~components/Icons";
import Button, { ActionButton } from "~components/Button";
import useServiceContext from "~hooks/useServiceContext";
import { TextInput } from "~components/Inputs";

const styles = (theme) =>
  StyleSheet.create({
    content: {
      flex: 7,
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
    },
    actionButton: {
      color: theme.colors.Azure,
      style: {
        ...theme.shadow,
      },
    },
  });

const AddressScreen = () => {
  const style = useThemeStyles(styles);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const { addressIds, addresses } = useServiceContext();
  const [address_edit, setAddressEdit] = useState({});

  const onEditAddress = (address) => {
    setModalEditVisible(true);
    setAddressEdit(address);
  };

  const ModalAddress = () => {
    const style = useThemeStyles(modalStyle);
    const { controller } = useServiceContext();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");

    return (
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={style.centeredView}>
            <TouchableWithoutFeedback>
              <View style={style.modalView}>
                <View style={style.formInput}>
                  <Typography>Tiêu đề</Typography>
                  <TextInput
                    variant="modalForm"
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                    value={title}
                  />
                </View>
                <View style={style.formInput}>
                  <Typography>Địa chỉ</Typography>
                  <TextInput
                    variant="modalForm"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={address}
                    onChangeText={(text) => {
                      setAddress(text);
                    }}
                  />
                </View>
                <View style={style.footer}>
                  <Button
                    size="modalSize"
                    isShadow
                    onPress={() => {
                      controller.createAddress(title, address);
                      setModalVisible(false);
                    }}
                  >
                    OK
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const ModalEditAddress = () => {
    const style = useThemeStyles(modalStyle);
    const { controller } = useServiceContext();
    const [title, setTitle] = useState(address_edit.title);
    const [address, setAddress] = useState(address_edit.address);
    // console.log(data);
    const onEdit = () => {
      controller.updateAddress({
        title,
        address,
        address_id: address_edit.address_id,
      })
      setModalEditVisible(false);
    }
    return (
      <Modal animationType="none" transparent={true} visible={modalEditVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalEditVisible(false);
          }}
        >
          <View style={style.centeredView}>
            <TouchableWithoutFeedback>
              <View style={style.modalView}>
                <View style={style.formInput}>
                  <Typography>Tiêu đề</Typography>
                  <TextInput
                    variant="modalForm"
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                    value={title}
                  />
                </View>
                <View style={style.formInput}>
                  <Typography>Địa chỉ</Typography>
                  <TextInput
                    variant="modalForm"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={address}
                    onChangeText={(text) => {
                      setAddress(text);
                    }}
                  />
                </View>
                <View style={style.footer}>
                  <Button
                    size="modalSize"
                    isShadow
                    onPress={() => onEdit()}
                  >
                    OK
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={style.content}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignSelf: "center" }}
      >
        {addressIds.map((id) => {
          const address = addresses[id];
          return (
            <AddressCard
              key={id}
              title={address.address_title}
              address={address.address}
              addressId={id}
              onEdit={onEditAddress}
            />
          );
        })}
        <View style={{ height: 150 }}></View>
      </ScrollView>
      <ActionButton
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <ModalAddress />
      <ModalEditAddress />
    </View>
  );
};

const CardStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      minHeight: 130,
      width: 340,
      borderRadius: 10,
      backgroundColor: theme.colors.Gray[0],
      marginTop: 10,
      ...theme.shadow,
    },
    header: {
      flex: 2,
      borderBottomWidth: 2,
      flexDirection: "row",
      borderBottomColor: theme.colors.Gray[3],
      paddingHorizontal: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    body: {
      flex: 3,
      padding: 10,
    },
    footer: {
      flex: 1,
      padding: 10,
      paddingBottom: 15,
      justifyContent: "space-between",
      flexDirection: "row",
    },
  });

const AddressCard = ({ title = "", address = "", addressId, onEdit }) => {
  const style = useThemeStyles(CardStyles);
  const { controller } = useServiceContext();
  const onDelete = () => {
    Alert.alert("", "Bạn có muốn xóa địa chỉ này không", [
      {
        text: "OK",
        onPress: () => {
          controller.deleteAddress(addressId);
        },
      },
    ]);
  };
  return (
    <View style={style.wrapper}>
      <View style={style.header}>
        <Typography variant="Subtitle">{title}</Typography>
        <Pressable
          onPress={() => {
            onEdit({ address_id: addressId, title, address });
          }}
        >
          <EditIcon size="sm" />
        </Pressable>
      </View>
      <View style={style.body}>
        <Typography>{address}</Typography>
      </View>
      <View style={style.footer}>
        <Pressable onPress={() => onDelete()}>
          <Typography variant="MiniDescription" color="AlizarinRed">
            xóa địa chỉ
          </Typography>
        </Pressable>
        <Pressable
          onPress={() => {
            controller.onChooseAddress(addressId);
          }}
        >
          <Typography variant="MiniDescription" color="Azure">
            chọn địa chỉ này {">"}
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

const modalStyle = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.Transparency,
    },
    modalView: {
      margin: 10,
      backgroundColor: theme.colors.Gray[0],
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      // height: 250,
      width: 320,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    formInput: {
      marginTop: 10,
    },
    footer: {
      marginVertical: 15,
    },
  });

export default AddressScreen;
