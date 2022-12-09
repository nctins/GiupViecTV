import { Platform } from "react-native";
import Constants from "expo-constants";
import * as ExpoNotifications from "expo-notifications";

const Notifications = {};

Notifications.registerForPushNotifications = async function () {
  if (Constants.isDevice) {
    // Get the notifications permission
    const { status: existingStatus } =
      await ExpoNotifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await ExpoNotifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    // If the permission was granted, then get the token
    const experienceId = "@nctins/GiupViecTV_NGV";
    const token = (
      await ExpoNotifications.getExpoPushTokenAsync({ experienceId })
    ).data;
    console.log(token);

    // Android specific configuration
    if (Platform.OS === "android") {
      ExpoNotifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: ExpoNotifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
};

Notifications.setNotificationHandler = () =>
  ExpoNotifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

Notifications.ExpoNotifications = ExpoNotifications;

export default Notifications;
