import { invoice } from "../data/invoive"

export const getInvoice=()=>{
  //console.log(invoice);

  //let total = 0;
  //invoice.items.forEach(item =>{
    //total = total + item.price * item.quantity;
  //})
  //1er forma
  //return {...invoice, total:total};
  // lo mismo pero resumido

  //2da forma es la programacion funcional
  const total = invoice.items
    .map(item => item.price * item.quantity)
    .reduce((accumulator, currentValue)=>accumulator + currentValue, 0);
  return {...invoice, total};
}
