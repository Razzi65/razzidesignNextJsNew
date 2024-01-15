"use client"
// AllProducts.js

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { SimpleGrid } from "@chakra-ui/react";
import ProductType from "@/types/productType";
import ProductCard from "./productCard";
import Link from "next/link";
import { Flex } from "@chakra-ui/react";

const CategoryDisplay = ({ category, numProducts }) => {
  const [allProductDb, setAllProductDb] = useState<ProductType[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchAllProducts = async () => {
    try {
      setIsFetching(true);

      const querySnapshot = await getDocs(collection(db, 'Products'));
      const productsData: ProductType[] = [];

      querySnapshot.forEach((doc) => {
        productsData.push({
          Name: doc.data().Name,
          Availabilty: doc.data().Availability,
          Category: doc.data().Category,
          Description: doc.data().Description,
          OldPrice: doc.data().OldPrice,
          NewPrice: doc.data().NewPrice,
          image: doc.data().image,
          id: doc.id,
          colors: doc.data().colors,
          size: doc.data().size
        });
      });

      console.log('All Products:', productsData);
      setAllProductDb(productsData);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filteredProducts = allProductDb
    .filter((product) => product.Category === category)
    .slice(0, numProducts === Infinity ? undefined : numProducts)

    return (
      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={9}>
          {filteredProducts.map((product, index) => (
            <Link
              href={{
                pathname: "/productDisplay",
                query: {
                  productData: JSON.stringify(product.id),
                  category: category, // Pass the category name as a query parameter
                },
              }}
              key={product.id}
            >
              <ProductCard key={product.id} index={index} product={product} />
            </Link>
          ))}
        </SimpleGrid>
      </Flex>
    );
  };
  
  export default CategoryDisplay;