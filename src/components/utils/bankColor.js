export const bankColor = (bankName) => {
  let backgroundColor;
  switch (bankName) {
    case "Nationwide":
      backgroundColor = "#4d52e0";
      break;
    case "1st Direct":
      backgroundColor = "#000";
      break;
    case "Santander":
      backgroundColor = "#e92d00";
      break;
    case "AMEX":
      backgroundColor = "#3762B6";
      break;
    case "HSBC":
      backgroundColor = "#DB290D";
      break;
    default:
      backgroundColor = "#4d52e0";
  }

  return backgroundColor;
};
