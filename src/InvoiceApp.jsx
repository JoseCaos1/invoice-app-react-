import React,{useEffect, useState} from 'react';
import { getInvoice, calculateTotal } from './services/getInvoice';
import { ClientView } from './components/ClientView';
import {CompanyView} from './components/CompanyView';
import {InvoiceView} from './components/InvoiceView';
import {ListItemView} from './components/ListItemView';
import {TotalView} from './components/TotalView';

const invoiceInitial={
  id: 0,
  name: "",
  client:{
    name: '',
    lastName:"",
    address:{
      country:"",
      city:"",
      street: "",
      number:0
    },
  },
    company:{
      name:"",
      fiscalNumber:0,
    },
    items:[]
}

const InvoiceApp=()=>{

  const [total, setTotal]=useState(0);

  const [invoice, setInvoice] = useState(invoiceInitial);

  const [items, setItems]=useState([]);

  const [formItemsState, setFormItemsState]= useState({
    product: '',
    price:'',
    quantity:'',
  });

  const [counter, setCounter]= useState(4);

  const {id, name, client, company} = invoice;

  const { product, price, quantity } =formItemsState;

  useEffect(()=>{
    const data = getInvoice();//traer la data de una api
    console.log(data);
    setInvoice(data);
    setItems(data.items);
  },[])

  useEffect(()=>{
    //console.log('el precio cambio!');
  },[price])

  useEffect(()=>{
    //console.log('el formItemsState cambio');
  },[formItemsState])

  useEffect(()=>{
    setTotal(calculateTotal(items))
    console.log('el items cambio');
  },[items])


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

    setItems([...items, {
      id:counter,
      product: product.trim(),
      price:+price.trim(),
      quantity:parseInt(quantity.trim(),10)
    }]);

    setFormItemsState({
        product: '',
        price:'',
        quantity:'',
      });
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

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceApp;
