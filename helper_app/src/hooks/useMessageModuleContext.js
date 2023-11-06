import { useContext } from "react"
import { MessageModuleConext } from "~contexts/MessageModuleContext"

const useMessageModuleContext = () => {
    return useContext(MessageModuleConext);
}

export default useMessageModuleContext;