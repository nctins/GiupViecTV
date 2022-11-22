import React from "react";
import Typography from "./Typography";

const CurrencyText = ({
  value = 0,
  variant = "H7",
  currency = "VNĐ",
  color = "Gray.8",
}) => {
  const text = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <Typography variant={variant} color={color}>
      {text} {currency}
    </Typography>
  );
};

export default CurrencyText;
