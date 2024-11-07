import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useProducts = () => {
//   const [products, setProducts] = useState([])
// // const [isLoading, setIsLoading] = useState(false)

// const fetchProducts = async () => {
//   // setIsLoading(true)
//   try {
//     // setTimeout(async () => {
//     //   const productResponse = await axiosInstance.get(
//     //     "/products"
//     //   )
//     //   setProducts(productResponse.data)
//     //   setIsLoading(false)
//     // }, 1500)
//     const productResponse = await axiosInstance.get(
//       "/products"
//     )
//     setProducts(productResponse.data)
//   } catch (error) {
//     console.log(error)
//   }
//   }


//   useEffect(() => {
//     fetchProducts()
  //   },[])
  
  return useQuery({
    queryFn: async () => {
      const productResponse = await axiosInstance.get(
        "/products"
      )
      return productResponse
    },
  })  
}