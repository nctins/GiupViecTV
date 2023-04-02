import React from "react";
import { currencyWithDot } from "~utils/StringFormat";
import Typography from "./Typography";

const CurrencyText = ({
  value = 0,
  variant = "H7",
  currency = "VNĐ",
  color = "Gray.8",
  prefix = "",
  style={}
}) => {
  const text = !value ? 0 : currencyWithDot(value);
  return (
    <Typography variant={variant} color={color} style={style}>
      {prefix} {text} {currency}
    </Typography>
  );
};

export default CurrencyText;
