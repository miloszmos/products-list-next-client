import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { API_URL, BRAND_FILTER } from "constants/index";
import Select from "components/atoms/Select";

const BRANDS = "brands";

const fetchBrands = async () => {
  const res = await fetch(`${API_URL}/${BRANDS}`);
  const response = await res.json();

  return response;
};

const BrandFilter = () => {
  const { data } = useQuery(BRANDS, fetchBrands);
  const router = useRouter();

  const onFilterChange = (value: string) => {
    router.replace({
      query: {
        ...router.query,
        brand: value,
      },
    });
  };

  return (
    <Select
      name={BRAND_FILTER}
      options={data || []}
      label="Brand"
      placeholder="Select Brand"
      onChange={onFilterChange}
      initialValue={[router.query.brand].join("")}
    />
  );
};

export default BrandFilter;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(BRANDS, fetchBrands);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
