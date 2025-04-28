"use client";
import React from "react";
import Products from "../../components/products";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products";
import Link from "next/link";
const Product: React.FC = () => {
  const [products, getProducts] = useState<any>([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts();
    getProducts(response);
  };
  return (
    <main className="">
      <div className="px-[70px] pt-[20px]">
        <div className="bg-gray-800 text-white rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold">Ladies Top</h2>
          <span className="block text-lg mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
            praesentium facere unde illum vel necessitatibus.
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col w-[20%] md:w-1/4 xl:w-1/5 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Danh mục
          </h2>
          <div className="space-y-4">
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Nón
              </span>
            </Link>
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Áo Thun
              </span>
            </Link>
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Áo khoác
              </span>
            </Link>
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Quần jean
              </span>
            </Link>
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Quần tây
              </span>
            </Link>
            <Link
              href=""
              className="text-gray-700 hover:text-[#b31f2a] hover:scale-105 transform transition duration-300"
            >
              <span className="block py-2 px-3 rounded hover:bg-gray-100">
                Thắt lưng
              </span>
            </Link>
          </div>
        </div>

        <div className="right w-[80%]">
          <Products data={products.data} />
        </div>
      </div>
    </main>
  );
};

export default Product;
