"use client";
import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "@/redux/slices/cartslice";
import { useMemo } from "react";
import "../globals.css";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartItem {
  _id: string;
  name: string;
  price: number;
  price_2: number;
  quantity: number;
  img: string;
}

export default function Cart() {
  // Lấy dữ liệu giỏ hàng từ Redux store
  const cartItems = useSelector((state: any) => state.cart?.items) || [];
  const dispatch = useDispatch();

  // Tính tổng giá trị đơn hàng
  const total = useMemo(
    () =>
      cartItems.reduce(
        (total: number, item: CartItem) => total + item.price_2 * item.quantity,
        0
      ),
    [cartItems]
  );

  // Hàm xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: CartItem
  ) => {
    const newQuantity = parseInt(e.target.value, 10);

    // Kiểm tra và điều chỉnh số lượng
    if (newQuantity >= 1 && newQuantity <= 100) {
      dispatch(
        updateCartItemQuantity({
          _id: item._id,
          quantity: newQuantity,
        })
      );
    } else if (newQuantity < 1) {
      dispatch(
        updateCartItemQuantity({
          _id: item._id,
          quantity: 1, // Nếu nhỏ hơn 1, gán lại là 1
        })
      );
    } else if (newQuantity > 100) {
      dispatch(
        updateCartItemQuantity({
          _id: item._id,
          quantity: 100, // Nếu lớn hơn 100, gán lại là 100
        })
      );
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="content-cart flex flex-col lg:flex-row gap-8">
        <div className="box-left w-full lg:w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 border-b border-gray-300">STT</th>
                <th className="py-2 border-b border-gray-300">Sản phẩm</th>
                <th className="py-2 border-b border-gray-300">Tên</th>
                <th className="py-2 border-b border-gray-300">Đơn giá</th>
                <th className="py-2 border-b border-gray-300">Số lượng</th>
                <th className="py-2 border-b border-gray-300">Thành tiền</th>
                <th className="py-2 border-b border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem, index: number) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/images/${item.img}`}
                      alt="Product Image"
                      className="card-item-img w-[200px] py-2 px-4 text-center"
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.price}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      className="qty w-16 p-1 border rounded text-center"
                      min="1"
                      max="100"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                    />
                  </td>

                  <td className="py-2 px-4">{item.price * item.quantity}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="btn-choice flex justify-between mt-4">
            <Link className="hover:text-[#b31f2a]" href="/">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                <i className="fa-solid fa-angle-left"></i> Tiếp tục mua
              </button>
            </Link>
            <Link
              href={{
                pathname: "/checkout", // Địa chỉ trang thanh toán
                query: {
                  cartItems: JSON.stringify(cartItems),
                  total: total.toString(),
                }, // Truyền dữ liệu qua query params
              }}
            >
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Thanh toán <i className="fa-solid fa-chevron-right"></i>
              </button>
            </Link>
          </div>
        </div>

        {/* <div className="box-right w-full lg:w-1/3 bg-gray-50 p-4 rounded-lg">
          <div className="voucher mb-4">
            <label htmlFor="voucher-code" className="block font-medium mb-1">
              Mã giảm giá
            </label>
            <input
              className="w-full p-2 border rounded mb-2"
              type="text"
              id="voucher-code"
              placeholder="Nhập mã giảm giá"
            />
            <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
              Nhập
            </button>
          </div>
          <div className="total text-gray-700">
            <div className="flex justify-between mb-2">
              <span>Giảm giá:</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tổng cộng:</span>
              <span id="sumMoney">{total}</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="paymentCheckbox"
                className="mr-2"
                required
              />
              <label htmlFor="paymentCheckbox">Thanh toán khi nhận hàng</label>
            </div>
          </div>
        </div> */}
      </div>

      <button
        className="btn-del-all bg-red-500 text-white px-4 py-2 rounded mt-6 hover:bg-red-600 transition"
        onClick={() => dispatch(clearCart())}
      >
        Xóa tất cả
      </button>

      <div className="foot text-center text-gray-600 mt-4">
        <i className="fa-solid fa-truck-fast"></i> Giao hàng miễn phí trong tuần
        này
      </div>
    </div>
  );
}
