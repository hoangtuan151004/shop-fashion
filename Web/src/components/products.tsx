import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
type ProductProps = {
  data: [];
  title?: string;
};
const Products: React.FC<ProductProps> = ({ data, title }) => {
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  return (
    <div className="container mx-auto px-4 flex-col py-[50px] ">
      <p className=" text-black text-[36px] leading-[20px] font-bold pb-[63px]">
        {title}
      </p>

      {data && data.length > 0 ? (
        <div className="card flex justify-center gap-[20px] flex-wrap ">
          {data.map((item: any) => (
            <>
              <div key={item._id}>
                <Link href={`/product/${item._id}`}>
                  <div className="card-item flex flex-col text-black rounded-lg bg-white w-[280px] transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden">
                    {/* Product Image */}
                    <img
                      src={`http://localhost:3000/images/${item.img}`}
                      alt="Product Image"
                      className="card-item-img w-full h-[200px] object-cover"
                    />

                    {/* Product Info */}
                    <div className="p-4 flex flex-col text-black gap-4">
                      <h2 className="text-[20px] font-bold leading-[24px] text-center hover:text-[#b31f2a] transition duration-300">
                        {item.name}
                      </h2>

                      <div className="card-item-info flex justify-between items-center">
                        <div className="info flex flex-col gap-1">
                          <p className="text-[16px] font-semibold">
                            {formatCurrency(item.price)}
                          </p>
                          <span className="text-[14px] text-gray-500">
                            Số lượng: {item.quantity}
                          </span>
                        </div>

                        <FontAwesomeIcon
                          className="btn-product text-[30px] text-gray-600 hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer"
                          icon={faShoppingCart}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="text-black text-center">Không có sản phẩm</div>
      )}
    </div>
  );
};

export default Products;
