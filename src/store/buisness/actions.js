export async function addNewItemInvoice({ commit }, payload) {
  try {
    const data = await getPromise(payload);
    console.log(data);
    const invoiceObject = {
      item_name: data,
      quantity: 1,
      rate: 1000,
      amount: 1000,
      tax_rate: 5,
      discount_rate: 5,
      discount_amount: 50,
      net_amount: 950,
    };
    commit("setNewItem", invoiceObject);
  } catch (e) {
    return [false, e];
  }
}

function getPromise(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(payload);
    }, 2000);
  });
}
