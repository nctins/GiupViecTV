import { useContext } from "react";
import { NotificationContext } from "~contexts/NotificationContext";

const useNotificationContext = () => {
    return useContext(NotificationContext);
};

export default useNotificationContext;