export const invoice={
  id:10,
  name: "Componentes PC",
  client:{
    name: 'Pepe',
    lastName:"Vasquez",
    address:{
      country:"usa",
      city:"Los angeles",
      street: "One Street",
      number:12
    },
  },
    company:{
      name:"New EGG",
      fiscalNumber:125454,
    },
    items:[
      {
        id:1,
        product:'Cpu Intel 17',
        price:499,
        quantity:1
      },
      {
        id:2,
        product:'Corsair Keyboard Mecanico',
        price:150,
        quantity:2
      },
      {
        id:3,
        product:'Monitor Asus',
        price:350,
        quantity:1
      },
    ]
}
