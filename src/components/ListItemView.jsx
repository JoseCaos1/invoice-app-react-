import PropTypes from 'prop-types';
import {RowItemView} from "./RowItemView"

export const ListItemView=({title,items })=>{
  return(
    <>
            <h4>{title}</h4>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {/* {items.map(item=>{*/}
                {items.map(({id, product, price, quantity})=>(
                  <RowItemView
                    key={id}
                    product={product}
                    price={price}
                    quantity={quantity}
                  />
                    )
                  )
                }
              </tbody>
            </table>

    </>
  )
}

ListItemView.propTypes={
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

{/*ListItemView.propTypes = {*/}
  {/*title: PropTypes.string.isRequired,*/}
  {/*items: PropTypes.arrayOf(*/}
    {/*PropTypes.shape({*/}
      {/*id: PropTypes.number.isRequired,*/}
      {/*product: PropTypes.string.isRequired,*/}
      {/*price: PropTypes.number.isRequired,*/}
      {/*quantity: PropTypes.string.isRequired, // Cambiado a string, ya que lo convertirás en RowItemView*/}
    {/*})*/}
  {/*).isRequired,*/}
{/*};*/}
