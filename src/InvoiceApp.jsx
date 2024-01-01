import React,{useState} from 'react';
import { getInvoice } from './services/getInvoice';
import { ClientView } from './components/ClientView';
import {CompanyView} from './components/CompanyView';
import {InvoiceView} from './components/InvoiceView';
import {ListItemView} from './components/ListItemView';
import {TotalView} from './components/TotalView';

const InvoiceApp=()=>{

  const {id, name, client, company, items:itemsInitial, total} = getInvoice();

  const [productValue, setProductValue]= useState('');
  const [priceValue, setPriceValue]= useState('');
  const [quantityValue, setQuantityValue]= useState('');

  const [items, setItems]=useState(itemsInitial);

  const [counter, setCounter]= useState(4);


  //TODO:2DA FORMA DESECTRUCTURADO
  const onProductChange = ({target})=>{
    console.log(target.value);
      setProductValue(target.value)
  }
  const onPriceChange =({target})=>{
    console.log(target.value);
    setPriceValue(target.value);
  }

  const onQuantityChange=({target})=>{
    console.log(target.value);
    setQuantityValue(target.value);
  }

  const onInvoiceItemsSubmit = (event)=>{
    event.preventDefault();

    if(productValue.trim().length <=1) return;
    if(priceValue.trim().length <=1) return;
    if(isNaN(priceValue.trim())) {
      alert("Error el precio no es un numero")
      return;
    };
    if(quantityValue.trim().length <1) {
      alert("La cantidad tiene q ser mayor a cero")
      return;
    };
    if(isNaN(quantityValue.trim())) {
      alert("Error la cantidad no es un numero")
      return;
    };

    setItems([...items, {
      id:counter,
      product: productValue.trim(),
      price:+priceValue.trim(),
      quantity:parseInt(quantityValue.trim(),10)
    }]);
    setProductValue('');
    setPriceValue('');
    setQuantityValue('');
    setCounter(counter+1);
  }

  return(
    <>
      <div className='container'>
        <div className="card my-3" >
          <div className="card-header">
            Ejemplo Factura
          </div>
          <div className="card-body">
            <InvoiceView id={id} name={name} />
            <div className='row my-3'>
              <div className="col">
              {/*Datos del cliente*/}
                <ClientView client={client} title="Datos del cliente"/>
              </div>

              <div className="col">
              {/*Datos del Empresa*/}
                <CompanyView company={company} title="Datos de la empresa"/>
              </div>
            </div>
            <div className="row">
              {/*Datos del Empresa*/}
              <ListItemView title="Productos de la Factura" items={items}/>
              <TotalView total={total}/>

              {/* Formulario*/}
              <form className='w-50' onSubmit={onInvoiceItemsSubmit}>
                <input
                  className="form-control m-2"
                  type="text"
                  name="product"
                  value={productValue}
                  placeholder='Producto'
                  onChange={onProductChange}
                />
                <input
                  className="form-control m-2"
                  type="number"
                  name="price"
                  value={priceValue}
                  placeholder='Precio'
                  onChange={(event)=> onPriceChange(event)}
                />
                <input
                  className="form-control m-2"
                  type="number"
                  name="quantity"
                  value={quantityValue}
                  placeholder='Cantidad'
                  onChange={onQuantityChange}
                />
                <button
                  type='submit'
                  className='btn btn-primary m-3'
                >
                  Nuevo Item
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceApp;
