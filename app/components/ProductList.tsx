"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

interface ProductData {
  id: string;
  name: string;
  image: [];
  price: string;
}

interface ProductListProps {
  onProductSelect: (productId: string) => void;
}

const fetchProducts = async (): Promise<ProductData[]> => {
  const response = await fetch("/api/v1/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const { data, isLoading, error } = useQuery<ProductData[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  if (isLoading) {
    return <div className="text-white text-5xl loading-spinner"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-3">
      <h1 className="text-2xl text-white">Products</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {data &&
          data.map((product) => (
            <Button
              variant={"default"}
              size={"lg"}
              key={product.id}
              onClick={() => onProductSelect(product.id)}
            >
              {product.name}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
