import React from "react";
import Typography from "./Typography";

const CurrencyText = ({
  value = 0,
  variant = "H7",
  currency = "VNĐ",
  color = "Gray.8",
  prefix = ""
}) => {
  const text = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <Typography variant={variant} color={color}>
      {prefix} {text} {currency}
    </Typography>
  );
};

export default CurrencyText;
