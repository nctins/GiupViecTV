import TokenService from "../services/token.service";
import axios from "axios";

const pushNotification = async (notification, user_ids) => {
    const tokens = await TokenService.getNotificationTokens(user_ids);
    if(!Array.isArray(tokens) || tokens.length === 0){
        return;
    }
    const to = tokens.map((token => `ExponentPushToken[${token}]`));
    const data = {
        to: to,
        title: notification.title,
        body: notification.content,
    }
    await axios.post("https://exp.host/--/api/v2/push/send", data);
}

export {pushNotification};