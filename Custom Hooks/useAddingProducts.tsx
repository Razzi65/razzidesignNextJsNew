"use client"

import { useState } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '@/config/firebase';




const UseAddingProducts = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [availability, setAvailability] = useState('');
  const [category, setCategory] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [image, setImages] = useState<any>();
  const [size, setSize] = useState('')
  const [colors, setColors] = useState('')



  

  return {
     name, setName, description, setDescription, availability, setAvailability, category, setCategory,
    oldPrice, setOldPrice, salePrice, setSalePrice, image, setImages, size, setSize, colors, setColors

  }
}

export default UseAddingProducts