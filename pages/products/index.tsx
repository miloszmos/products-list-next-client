import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";
import { ProductType } from "types";

import ProductsList from "components/routes/products/ProductList";
import CategoryFilter from "components/molecules/CategoryFilter";
import BrandFilter from "components/molecules/BrandFilter";
import Card from "components/atoms/Card";
import styles from "styles/products/Products.module.scss";
import { API_URL } from "constants/index";
import ResetFilter from "components/molecules/ResetFilter";
import Badge from "components/atoms/Badge";

const PRODUCTS_QUERY = "products";
const QUERY_LIMIT = 5;

const fetchProducts = async ({ pageParam = 1, ...rest }) => {
  const { queryKey } = rest;
  const { category, brand } = queryKey[1];

  const URL = `${API_URL}/products?_page=${pageParam}&_limit=${QUERY_LIMIT}${
    category ? `&category=${category}` : ""
  }${brand ? `&brand=${brand}` : ""}`;
  const res = await fetch(URL);
  const results: ProductType[] = await res.json();
  const total = Number(res.headers.get("X-Total-Count"));

  return {
    results,
    nextPage: pageParam + 1,
    total,
    totalPages: Math.ceil(total / QUERY_LIMIT),
  };
};

const Products = () => {
  const router = useRouter();
  const [query, setQuery] = useState<{
    category?: string;
    brand?: string;
  }>({});

  useEffect(() => {
    setQuery(router.query);
  }, [router.query]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [PRODUCTS_QUERY, { category: query?.category, brand: query?.brand }],
    fetchProducts,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextPage <= lastPage.totalPages) {
          return lastPage.nextPage;
        }
        return false;
      },
    }
  );

  const handleFetchMore = () => fetchNextPage();

  const products = data?.pages.map((page) => page.results).flat();

  return (
    <div className={styles.container}>
      <Card>
        <div className="top">
          <h1>Filtersz</h1>
          {!!Object.values(query).length && (
            <div>
              {Object.values(query).map((filter) => (
                <Badge key={filter}>{filter}</Badge>
              ))}
            </div>
          )}
        </div>
        <div className="selectors">
          <CategoryFilter />
          <BrandFilter />
        </div>
      </Card>
      <Card>
        <div className="total">
          <ResetFilter />
          {data?.pages[0] && <span>Total Items: {data.pages[0].total}</span>}
        </div>
        <ProductsList products={products} />
        {hasNextPage && (
          <div className="more">
            <button onClick={handleFetchMore}>Load More</button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Products;
