// import { useState } from "react";
// import { collection, addDoc, getDocs } from 'firebase/firestore';


// const UseProductDisplay = () => {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [newProductId, setNewProductId] = useState('')

//     const fetchProductDetails = async () => {
//         try {
//             // Create a query to get a specific product document from the "Products" collection
//             const productQuery = collection(db, 'Products');
//             const productSnapshot = await getDocs(productQuery);

//             // Find the product with the matching ID
//             const productDetails = productSnapshot.docs.find(
//                 (doc) => doc.id === newProductId
//             );

//             if (productDetails) {
//                 // Extract data from the product document
//                 setSelectedProduct({
//                     id: productDetails.id,
//                     data: productDetails.data(),
//                 });
//             } else {
//                 console.error('Product not found.');
//             }
//         } catch (error) {
//             console.error('Error fetching product details:', error);
//         }
//     };

//     return {

//         fetchProductDetails, selectedProduct, setSelectedProduct, newProductId, setNewProductId
//     }
// }


// export default UseProductDisplay