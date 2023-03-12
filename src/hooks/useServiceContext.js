import { useContext } from "react";
import { ServiceContext } from "~contexts/ServiceContext";

const useServiceContext = () => {
    return useContext(ServiceContext);
};

export default useServiceContext;
