export const getStockStatus = (stock: number) => {
  if (stock > 50) {
    return "green";
  } else if (stock > 25) {
    return "orange";
  } else {
    return "red";
  }
};

export const calculatePrice = (price: number, percentage: number) => {
  return (price - (price * percentage) / 100).toFixed(2);
};
