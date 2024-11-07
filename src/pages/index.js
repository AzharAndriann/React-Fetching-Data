import Head from "next/head";
import {axiosInstance} from "@/lib/axios"
import { useEffect, useState } from "react";
import { useProducts } from "@/features/product/useProducts";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const {data: products, isLoading} = useProducts()

  const renderProducts = () => {
    return products?.data.map((product) => (
      <tr key={product.id} className="bg-white hover:bg-gray-50 text-gray-700">
        <td className="py-3 px-4 border-b">{product.id}</td>
        <td className="py-3 px-4 border-b">{product.name}</td>
        <td className="py-3 px-4 border-b">{product.price}</td>
        <td className="py-3 px-4 border-b">{product.description}</td>
        <td className="py-3 px-4 border-b">{product.image}</td>
      </tr>
    ));
  };

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Hello World!
          </h1>
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 border-b">ID</th>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Price</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Image</th>
              </tr>
            </thead>
            <tbody>
              {renderProducts()}
              {/* {renderProducts() ? renderProducts() : <div className="loader"></div>} */}
              {/* {isLoading && <div className="loader"></div>} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
