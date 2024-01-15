"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useToast,
    InputGroup,
    Heading,
    Select
} from '@chakra-ui/react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/config/firebase';
import UseAddingProducts from '@/Custom Hooks/useAddingProducts';

const AdminProductUpload = () => {
    let imageURL = ''
    const {
        name,
        setName,
        description,
        setDescription,
        availability,
        setAvailability,
        category,
        setCategory,
        oldPrice,
        setOldPrice,
        salePrice,
        setSalePrice,
        image,
        setImages,
        colors,
        setColors,
        size,
        setSize
    } = UseAddingProducts();

    const toast = useToast();

    const handleImageUpload = async () => {
        try {
            if (!image) {
                throw new Error('Please select an image to upload.');
            }

            const storageRef = ref(storage, `productImages/${image.name}`);

            await uploadBytes(storageRef, image)





            await getDownloadURL(ref(storage, storageRef))
                .then((url) => {
                    imageURL = url

                })




            console.log('image URL:', imageURL);

            toast({
                title: 'Image Uploaded',
                description: 'Image uploaded successfully!',
                status: 'success',
            });

        } catch (error) {
            console.error('Image Upload Error:', error.message);
            toast({
                title: 'Image Upload Error',
                description: error.message,
                status: 'error',
            });
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleImageUpload();

            const docRef = await addDoc(collection(db, 'Products'), {
                Name: name,
                Availability: true,
                Category: category,
                Description: description,
                OldPrice: oldPrice,
                NewPrice: salePrice,
                image: imageURL,  // Use the image URL directly
                colors: colors,
                size: size,
                Timestamp: serverTimestamp(),
            });

            toast({
                title: 'Product Uploaded',
                description: 'The product has been successfully uploaded.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            setName('');
            setDescription('');
            setAvailability('');
            setCategory('');
            setOldPrice('');
            setSalePrice('');
            setColors('');
            setSize('')
            setImages('');

            console.log('Document written with ID:', docRef.id);
        } catch (error) {
            console.error('Form Submission Error:', error.message);
        }
    };

    return (
        <Box
            minH="100vh"
            background="linear-gradient(180deg, #48BB78 0%, #4299E1 100%)"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                p={10}
                borderWidth="1px"
                borderRadius="lg"
                background="gray.500"
                boxShadow="lg"
            >
                <Heading color="white">Upload Products</Heading>

                <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                        <FormLabel color="white">Name</FormLabel>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Description</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </FormControl>


                    <FormControl mb={4}>
                        <FormLabel color="white">Availability</FormLabel>
                        <Input
                            type="text"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            placeholder='write true or false'
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Category</FormLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Select a category"
                            required
                        >
                            <option value="Premium Acrylic">Premium Acrylic</option>
                            <option value="Plywood">Plywood</option>
                            <option value="Table Tops">Table Tops</option>
                            <option value="Car Hangings">Car Hangings</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Old Price</FormLabel>
                        <Input
                            type="number"
                            value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Sale Price</FormLabel>
                        <Input
                            type="number"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Size</FormLabel>
                        <Input
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel color="white">Colors</FormLabel>
                        <Input
                            type="text"
                            value={colors}
                            onChange={(e) => setColors(e.target.value)}
                            required
                        />
                    </FormControl>


                    <FormControl mb={4}>
                        <FormLabel color="white">Images</FormLabel>
                        <InputGroup>
                            <Input
                                type="file"
                                onChange={(e) => setImages(e.target.files[0])}
                                required
                                placeholder="Select an image"

                            />
                        </InputGroup>
                    </FormControl>

                    <Button type="submit" colorScheme="teal">
                        Upload Product
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AdminProductUpload;
