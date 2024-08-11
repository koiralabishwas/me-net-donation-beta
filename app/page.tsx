"use client";
import React, { useEffect, useState } from "react";
import DonationForm from "@/components/DonationForm";
import ProductList from "@/components/ProductList";
import { connection, db } from "@/server/db/db";
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };



  return (
    <div>
      <ProductList onProductSelect={handleProductSelect} />
      {selectedProduct && <DonationForm productId={selectedProduct} />}
    </div>
  );
}
