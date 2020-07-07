export const categoryFilter = (transactions) => {
  let data = [];

  transactions.forEach((transaction) => {
    // If Data contains category already, add it to the existing
    if (transaction.income) {
      return;
    }

    if (data.some((item) => item.category === transaction.category)) {
      // Access the data object and add the amount to it
      data.forEach((item) => {
        if (item.category === transaction.category) {
          item.amount += transaction.amount;
        }
      });
    } else {
      // If not then add a new category
      let tran = {
        category: transaction.category,
        amount: transaction.amount,
      };

      // and push to the data array
      data.push(tran);
    }
  });

  return data;
};
