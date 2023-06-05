import MenuWrapper from "@/components/product/MenuWrapper";
import React from "react";
import axios from "axios";
const Index = ({ categoryList }) => {
  return <MenuWrapper categoryList={categoryList} />;
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return {
    props: {
      categoryList: res.data ? res.data : [],
    },
  };
};
export default Index;
