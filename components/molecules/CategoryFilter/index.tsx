import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { API_URL, CATEGORY_FILTER } from "constants/index";
import Select from "components/atoms/Select";

const CATEGORIES = "categories";

const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/${CATEGORIES}`);
  const response = await res.json();

  return response;
};

const CategoryFilter = () => {
  const { data } = useQuery(CATEGORIES, fetchCategories);
  const router = useRouter();

  const onFilterChange = (value: string) => {
    router.replace({
      query: {
        ...router.query,
        category: value,
      },
    });
  };

  return (
    <Select
      name={CATEGORY_FILTER}
      options={data || []}
      label="Category"
      placeholder="Select Category"
      onChange={onFilterChange}
      initialValue={[router.query.category].join("")}
    />
  );
};

export default CategoryFilter;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(CATEGORIES, fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
