import Badge from "components/atoms/Badge";
import Image from "next/image";
import { ProductType } from "types";
import styles from "components/routes/products/ProductItem.module.scss";
import { calculatePrice, getStockStatus } from "utils";

interface ProductProps {
  product: ProductType;
}

const ProducItem = ({
  product: {
    title,
    description,
    price,
    discountPercentage,
    thumbnail,
    stock,
    category,
  },
}: ProductProps) => {
  return (
    <div className={styles.container}>
      <div className="picture">
        <Image
          width={200}
          height={200}
          src={thumbnail}
          alt="product"
          objectFit="contain"
        />
      </div>
      <div className="info">
        <div>
          <p className="title">{title}</p>
          <p className="desc">{description}</p>
        </div>
        <div className="bottom">
          <Badge>{category}</Badge>
          <div>
            <div className="price">
              <span
                className={`base-price ${
                  discountPercentage > 0 ? "discount" : ""
                }`}
              >
                ${price}
              </span>
              <span>${calculatePrice(price, discountPercentage)}</span>
            </div>
            <div className="stock">
              Stock: <span className={getStockStatus(stock)}>{stock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducItem;
