import React,{useEffect, useState} from 'react';

export const FormItemView=({ handler })=>{


  const [formItemsState, setFormItemsState]= useState({
    product: '',
    price:'',
    quantity:'',
  });

  const { product, price, quantity } =formItemsState;

  useEffect(()=>{
    //console.log('el precio cambio!');
  },[price])

  useEffect(()=>{
    //console.log('el formItemsState cambio');
  },[formItemsState])

  //TODO: FORM STATE PARA TODOS LOS INPUT
  const onInputChange = ({target :{ name, value }})=>{
    //console.log(name);
    //console.log(value);

    setFormItemsState({
      ...formItemsState,
      [ name ]: value
    })
  }

  const onInvoiceItemsSubmit = (event)=>{
    event.preventDefault();

    if(product.trim().length <=1) return;
    if(price.trim().length <=1) return;
    if(isNaN(price.trim())) {
      alert("Error el precio no es un numero")
      return;
    };
    if(quantity.trim().length <1) {
      alert("La cantidad tiene q ser mayor a cero")
      return;
    };
    if(isNaN(quantity.trim())) {
      alert("Error la cantidad no es un numero")
      return;
    };

    handler(formItemsState);

    setFormItemsState({
        product: '',
        price:'',
        quantity:'',
      });
  }

  return(
    <>
      <form className='w-50' onSubmit={onInvoiceItemsSubmit}>
        <input
          className="form-control m-2"
          type="text"
          name="product"
          value={product}
          placeholder='Producto'
          onChange={onInputChange}
        />
        <input
          className="form-control m-2"
          type="number"
          name="price"
          value={price}
          placeholder='Precio'
          onChange={(event)=> onInputChange(event)}
        />
        <input
          className="form-control m-2"
          type="number"
          name="quantity"
          value={quantity}
          placeholder='Cantidad'
          onChange={onInputChange}
        />
        <button
          type='submit'
          className='btn btn-primary m-3'
        >
          Nuevo Item
        </button>
      </form>
    </>
  );
}
export default FormItemView;
