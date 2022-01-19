import { useHistory } from "react-router";

const Products = ({ products }) => {
    const history = useHistory();
    return <div>
         {products.map(product => <div onClick={() => history.push(`/${product.id}`)} key={product.id}>
                <img className="product-pic" src={product.picture} alt="img"/>
                <p>{product.name}</p>
                <p>{'\u2605'} {product.rating}</p>
             </div>)} 
        </div>
}

export default Products;