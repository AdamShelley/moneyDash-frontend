export const bankColor = (bankName) => {
  let bankData = {
    backgroundColor: "",
    icon: "far fa-credit-card",
  };
  switch (bankName) {
    case "Nationwide":
      bankData.backgroundColor = "#4d52e0";
      break;
    case "1st Direct":
      bankData.backgroundColor = "#000";
      break;
    case "Santander":
      bankData.backgroundColor = "#e92d00";
      break;
    case "AMEX":
      bankData.backgroundColor = "#3762B6";
      bankData.icon = "fab fa-cc-amex";
      break;

    case "HSBC":
      bankData.backgroundColor = "#DB290D";
      break;
    default:
      bankData.backgroundColor = "#4d52e0";
  }

  return bankData;
};
