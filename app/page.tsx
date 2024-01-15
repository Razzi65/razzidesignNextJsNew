'use client'

import AllProducts from "@/components/allProducts"
import CartItem from "@/components/cartItem"
import HeroSection from "@/components/heroSection"
import Navbar from "@/components/navbar"
import NewSection1 from "@/components/newSection1"
import Section2 from "@/components/section2"
import Section3 from "@/components/section3"
import initAuth from "@/config/authentication"
import { useEffect, useState } from "react"

import WhyUs from "@/components/whyUs"
import Timelime from "@/components/timeline"
import Gift from "@/components/gift"
import Footer from "@/components/footer"
import CategoryDisplay from "@/components/categoryDisplay"
import ClientReviews from "@/components/clientReviews"
import ProductDisplay from "@/components/fourCategories"

export default function Home() {
  useEffect(() => {
    const initializeAuthentication = async () => {
      try {
        await initAuth();
        // Continue with your application logic after successful authentication
      } catch (error) {
        // Handle authentication error
      }
    };

    initializeAuthentication();
  }, []);




  
  return (
    <>


      <HeroSection />
      
      <br/>

      <ProductDisplay/>
      
      
      <Timelime/>

      <Gift/>
      
      <CategoryDisplay category="Acrylic" numProducts={8}/>
      
      <ClientReviews/>
      <WhyUs/>
    
      


   

    </>
  )
}
