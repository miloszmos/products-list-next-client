import ProducItem from "components/routes/products/ProductItem";
import styles from "components/routes/products/ProductList.module.scss";
import { ProductType } from "types";

interface ProductListProps {
  products?: ProductType[];
}

const ProductsList = ({ products = [] }: ProductListProps) => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProducItem key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="no-results">
          <p>No Results</p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
