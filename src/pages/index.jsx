import Head from "next/head";
import { useFetchProducts } from "@/features/product/useFetchProducts";
import { useFormik } from "formik";
import { useCreateProduct } from "@/features/product/useCreateProduct";
import { useDeleteProduct } from "@/features/product/useDeleteProduct";
import { useEditProduct } from "@/features/product/useEditProduct";

export default function Home() {
  const { data: products,
    isLoading: productIsLoading,
    refetch: refetchProducts
  } = useFetchProducts();

  const { mutate: createProduct, isLoading: createProductIsLoading } = useCreateProduct({
    onSuccess: () => {
      refetchProducts()
    },
  })

  const { mutate: editProduct, isLoading: editProductIsLoading } = useEditProduct({
    onSuccess: () => {
      refetchProducts()
    },
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
      id: 0
    },
    onSubmit: () => {
      const { name, price, description, image, id } = formik.values;
      if (id) {
        editProduct({
          name,
          price: parseInt(price),
          description,
          image,
          id: parseInt(id)
        })
      //  alert("okee")
      } else {
        createProduct({
          name,
          price: parseInt(price),
          description,
          image,
          id
        })
        // alert("oke")
      }
      formik.setFieldValue("name","")
      formik.setFieldValue("price",0)
      formik.setFieldValue("description","")
      formik.setFieldValue("image", "")
      formik.setFieldValue("id", "")
    },
  });


  const {mutate: deleteProduct} = useDeleteProduct({
    onSuccess: () => {
      refetchProducts()
    }
  })

  const confirmationDelete = (productId) => {
    const shouldDelete = confirm("Are you Sure")

    if (shouldDelete) {
      deleteProduct(productId)
    }
  } 

  const onEditClick = (product) => {
    formik.setFieldValue("id", product.id)
    formik.setFieldValue("name", product.name)
    formik.setFieldValue("price", product.price)
    formik.setFieldValue("description", product.description)
    formik.setFieldValue("image", product.image)
  }

  const renderProducts = () => {
    return products?.data.map((product) => (
      <tr key={product.id} className="bg-white hover:bg-gray-50 text-gray-700">
        <td className="py-3 px-4 border-b">{product.id}</td>
        <td className="py-3 px-4 border-b">{product.name}</td>
        <td className="py-3 px-4 border-b">{product.price}</td>
        <td className="py-3 px-4 border-b">{product.description}</td>
        <td className="py-3 px-4 border-b">
          <button onClick={() => onEditClick(product)} className="bg-gray-600 rounded-md px-2 py-1 text-white hover:bg-red-500 transition duration-200">Edit</button>
        </td>
        <td className="py-3 px-4 border-b">
          <button onClick={() => confirmationDelete(product.id)} className="bg-red-600 rounded-md px-2 py-1 text-white hover:bg-red-500 transition duration-200">Delete</button>
        </td>
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
                <th className="py-3 px-4 border-b" colSpan={2}>Action</th>
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
                <label className="block text-gray-600 mb-2">Product ID</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="name"
                  value={formik.values.id}
                  onChange={handleFormInput}
                />
              </div>
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
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            {
              createProductIsLoading ? (
                <div className="loader items-center flex justify-center"></div>
              ) : (
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
              )
            }
          </form>
        </div>
      </div>
    </>
  );
}
