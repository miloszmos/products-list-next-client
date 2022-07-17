import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, [router]);

  return <div>You saw things you weren&apos;t suppoposed to see 👀</div>;
};

export default Home;
