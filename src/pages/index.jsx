import Head from "next/head";
import { axiosInstance } from "@/lib/axios";
import { useFetchProducts } from "@/features/product/useFetchProducts";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

export default function Home() {
  const { data: products, isLoading: productIsLoading, refetch: refetchProducts } = useFetchProducts();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
    onSubmit: () => {
      const { name, price, description, image } = formik.values;
      mutate({
        name,
        price: parseInt(price),
        description,
        image
      })
      formik.setFieldValue("name","")
      formik.setFieldValue("price",0)
      formik.setFieldValue("description","")
      formik.setFieldValue("image", "")
      alert("oke")
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.post("/products", body);
      return productResponse;
    },
    onSuccess: () => {
      formik.resetForm();
      refetchProducts()
      console.log("Product added successfully");
    },
  });


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

  const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value)
  }

  return (
    <>
      <Head>
        <title>Products Page</title>
        <meta name="description" content="Products page with list and form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Products Page
          </h1>
          
          {/* Product Table */}
          <table className="w-full text-left table-auto border-collapse mb-6">
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
              {productIsLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="loader items-center flex justify-center"></div>
                  </td>
                </tr>
              ) : (
                renderProducts()
              )}
            </tbody>
          </table>

          {/* Product Form */}
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="block text-gray-600 mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="name"
                  value={formik.values.name}
                  onChange={handleFormInput}
                />
              </div>
              <div className="form-control">
                <label className="block text-gray-600 mb-2">Product Price</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="price"
                  value={formik.values.price}
                  onChange={handleFormInput}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="block text-gray-600 mb-2">Product Description</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="description"
                value={formik.values.description}
                onChange={handleFormInput}
              />
            </div>

            <div className="form-control">
              <label className="block text-gray-600 mb-2">Product Image URL</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="image"
                value={formik.values.image}
                onChange={handleFormInput}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
