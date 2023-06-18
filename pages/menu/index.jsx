import MenuWrapper from "@/components/product/MenuWrapper";
import React from "react";
import axios from "axios";
const Index = ({ categoryList, productList }) => {
  return <MenuWrapper categoryList={categoryList} productList={productList} />;
};

export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};
export default Index;
