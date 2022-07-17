import Button from "components/atoms/Button";
import { useRouter } from "next/router";
import React from "react";

const ResetFilter = ({ text = "Reset Filters" }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <Button onClick={handleOnClick} type="tertiary">
      {text}
    </Button>
  );
};

export default ResetFilter;
