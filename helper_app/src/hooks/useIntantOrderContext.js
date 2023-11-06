import { useContext } from "react";
import { IntantOrderContext } from "~contexts/IntantOrderContext";

const useIntantOrderContext = () => {
  return useContext(IntantOrderContext);
};

export default useIntantOrderContext;
