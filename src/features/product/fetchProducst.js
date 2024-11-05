import { axiosInstance } from "@/lib/axios"
import { useEffect, useState } from "react"

export const useProducts = () => {
  const [products, setProducts] = useState([])
// const [isLoading, setIsLoading] = useState(false)

const fetchProducts = async () => {
  // setIsLoading(true)
  try {
    // setTimeout(async () => {
    //   const productResponse = await axiosInstance.get(
    //     "/products"
    //   )
    //   setProducts(productResponse.data)
    //   setIsLoading(false)
    // }, 1500)
    const productResponse = await axiosInstance.get(
      "/products"
    )
    setProducts(productResponse.data)
  } catch (error) {
    console.log(error)
  }
  }


  useEffect(() => {
    fetchProducts()
  },[])

  return {
    data: products,
    // isLoading: isLoading
  }
}