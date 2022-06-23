const reduceTotal = (pizzas) => {
  const totalPrice = pizzas.reduce((sum, pizza) => sum + pizza.price * pizza.count, 0);
  const totalCount = pizzas.reduce((sum, pizza) => sum + pizza.count, 0);

  return { totalPrice, totalCount };
};

export default reduceTotal;
