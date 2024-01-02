import React,{useEffect, useState} from 'react';
import { getInvoice, calculateTotal } from './services/getInvoice';
import { ClientView } from './components/ClientView';
import {CompanyView} from './components/CompanyView';
import {InvoiceView} from './components/InvoiceView';
import {ListItemView} from './components/ListItemView';
import {TotalView} from './components/TotalView';
import FormItemView from './components/FormItemsView';

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

  const [counter, setCounter]= useState(4);

  const {id, name, client, company} = invoice;


  useEffect(()=>{
    const data = getInvoice();//traer la data de una api
    console.log(data);
    setInvoice(data);
    setItems(data.items);
  },[])


  useEffect(()=>{
    setTotal(calculateTotal(items))
    console.log('el items cambio');
  },[items])

  const handlerAddItems = ({product, price, quantity})=>{

    setItems([...items, {
      id:counter,
      product: product.trim(),
      price:+price.trim(),
      quantity:parseInt(quantity.trim(),10)
    }]);

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
              <FormItemView handler={ handlerAddItems } />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InvoiceApp;
