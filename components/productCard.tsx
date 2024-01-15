'use client'
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text, Image as ChakraImage
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ProductType from "@/types/productType";
import { db,auth } from "@/config/firebase";
import { motion } from "framer-motion";
import Link from "next/link";
import initAuth from '@/config/authentication';
import { useEffect } from "react";
import { signInAnonymously } from 'firebase/auth';




interface ProductCardProps {
  product: ProductType;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {

  
  const router = useRouter();
  
   
    


  const onClickHandler = async (productDetail: any) => {
    
    await initAuth(); // Ensure authentication before proceeding

    const user = auth.currentUser;

   {if (!user) {
      await signInAnonymously(auth);
  }
    }

    const docRef = await addDoc(collection(db, "Carts"), {
      userId: user.uid,
      Name: productDetail.Name,
      Category: productDetail.Category,
      Description: productDetail.Description,
      OldPrice: productDetail.OldPrice,
      NewPrice: productDetail.NewPrice,
      image: productDetail.image,
      Productid: productDetail.id,
      colors: productDetail.colors,
      size: productDetail.size
    });

    console.log("image", productDetail.image);
    console.log("Document written with ID: ", docRef.id);
    
    router.push("/cartPage");
    
    
  };

  

  return (

    <>



      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? "100%" : "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack
          spacing={{ base: '4', md: '5' }}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box position="relative" overflow="hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.image}
                alt={product.Name}
                borderRadius={{ base: 'md', md: 'xl' }}
                h={{ base: "200px", md: "250px" }}
                w="100%"
                fit={'cover'}
              />
            </motion.div>
          </Box>

          <Stack spacing="1" p={4}>
            <Text
              fontWeight="semibold"
              fontSize="lg"
              color="gray.800"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {product.Name}
            </Text>
            <Flex alignItems="baseline" justifyContent="space-between">
              <Text
                fontWeight="bold"
                fontSize="md"
                color="gray.800"
              >
                Rs.{product.NewPrice}/-
              </Text>
              {product.OldPrice && (
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.500"
                  ml={2}
                >
                  Rs.{product.OldPrice}/-
                </Text>
              )}
            </Flex>

            

             

              <Link href={{
            // pathname: "/cartPage",
            query: {
              productData:JSON.stringify(product.id)}}}>
          
          <Button
                onClick={() => onClickHandler(product)}
                bg={'cyan.600'}
                w="100%"
                mt={2}
                color={'white'}
                _hover={{ bg: 'blue.800' }}
              >
                Buy Now
              </Button>
          </Link>

         


          </Stack>
        </Stack>
      </motion.div>
    </>

  );

};


export default ProductCard;
