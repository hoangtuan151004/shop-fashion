'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts } from '@/api/products' // Giả sử API đã được cấu hình

const Cateegories: React.FC = () => {
  const [products, setProducts] = useState<any>([])
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      setProducts(response?.data) // Giả sử API trả về danh sách sản phẩm trong `data`
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm', error)
    }
  }

  useEffect(() => {
    fetchProducts() // Gọi hàm fetchProducts khi component được mount
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css'
        />
      </head>
      <input type='checkbox' id='menu-toggle' className='hidden' />
      <div
        className={`sidebar fixed h-full w-[165px] bg-gray-800 transition-all duration-300 ${
          isMenuOpen ? 'left-0' : 'left-[-165px]'
        }`}>
        <div className='side-menu mt-8 space-y-2'>
          <ul className='flex flex-col items-center text-center pt-[50px]'>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href='/admin'
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-home'></span>
                <small>Dashboard</small>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href=''
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-user-alt'></span>
                <small>User</small>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-600 items-center'>
              <Link
                href='/admin/categories'
                className='flex items-center text-gray-400 hover:text-white'>
                <div className='flex flex-col pl-[45px]'>
                  <span className='text-2xl las la-tag'></span>
                  <small>Danh mục</small>
                </div>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href='/admin/proadmin'
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-shopping-cart'></span>
                <small>Sản phẩm</small>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href=''
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-envelope'></span>
                <small>Mailbox</small>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href=''
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-clipboard-list'></span>
                <small>Projects</small>
              </Link>
            </li>
            <li className='w-full p-3 hover:bg-gray-700'>
              <Link
                href=''
                className='flex flex-col items-center text-gray-400 hover:text-white'>
                <span className='text-2xl las la-shopping-cart'></span>
                <small>Orders</small>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`main-content transition-all duration-300 ${
          isMenuOpen ? 'ml-[165px]' : 'ml-0'
        }`}>
        <header className='fixed left-0 top-0 right-0 h-[60px] bg-white shadow-md flex justify-between items-center px-4'>
          <label
            htmlFor='menu-toggle'
            className='cursor-pointer text-2xl las la-bars text-black'
            onClick={() => setIsMenuOpen((prev) => !prev)}></label>
          <div className='header-menu flex items-center space-x-4 text-black'>
            <label className='text-2xl las la-search'></label>
            <div className='notify-icon relative'>
              <span className='text-2xl las la-envelope'></span>
              <span className='absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full px-1'>
                4
              </span>
            </div>
            <div className='notify-icon relative'>
              <span className='text-2xl las la-bell'></span>
              <span className='absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full px-1'>
                3
              </span>
            </div>
            <div className='user flex items-center space-x-1 cursor-pointer'>
              <span className='text-2xl las la-power-off text-red-500'></span>
              <span className='text-sm'>Logout</span>
            </div>
          </div>
        </header>

        <main className='pt-[60px] bg-gray-100'>
          <div className='records bg-white p-4 shadow-md'>
            <div className='record-header flex justify-between items-center mb-4'>
              <div className='add flex items-center space-x-2'>
                <span className='text-gray-600'>Entries</span>
                <select className='border rounded p-1 text-gray-600'>
                  <option defaultValue=''>ID</option>
                </select>

                <div className=''>
                  {/* Nút để mở popup */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className=' text-[16px]rounded-md hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125 bg-[#FF5959] text-white rounded px-3 py-1'>
                    Thêm Danh Mục
                  </button>

                  {/* Nền mờ và nội dung popup */}
                  {showPopup && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
                      <div className='bg-white rounded-lg shadow-lg p-8 w-[1000px] relative overflow-y-auto max-h-[90vh] pt-[50px] '>
                        {/* Nút đóng */}
                        <button
                          onClick={() => setShowPopup(false)}
                          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'>
                          &times;
                        </button>

                        {/* Nội dung của popup */}

                        <div className='mt-6 flex justify-center'>
                          <button
                            onClick={handleClosePopup}
                            className='bg-[#FF5959] rounded-[10px] w-[fit-content] px-[20px] py-[9px] hover:text-[#b31f2a] transition duration-300 ease-in-out transform hover:scale-125 '>
                            Đóng cửa sổ
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Link href=''>
                <h1 className='text-xl text-black'>Quản Lý Danh Mục</h1>
              </Link>

              <div className='browse flex items-center space-x-2'>
                <input
                  type='search'
                  placeholder='Search'
                  className='record-search border rounded p-1 text-gray-600'
                />
                <select className='border rounded p-1 text-gray-600'>
                  <option defaultValue=''>Status</option>
                </select>
              </div>
            </div>

            <div className='table-responsive overflow-auto'>
              <table className='w-full text-left table-fixed'>
                <thead className='bg-gray-200 text-gray-600'>
                  <tr>
                    <th className='py-4 px-6'>STT</th>
                    <th className='py-4 px-6'>Tên</th>

                    <th className='py-4 px-6'>Mô tả</th>
                    <th className='py-4 px-6'>Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {/* {products.map((product: any, index: number) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 text-black"
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6 truncate">{product.name}</td>
                      <td className="py-4 px-6">{product.price} VND</td>
                      <td className="py-4 px-6">
                        <img
                          src={`http://localhost:3000/images/${product.img}`}
                          alt={product.name}
                          className="w-[100px]"
                        />
                      </td>
                      <td className="py-4 px-6 text-[16px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {product.description}
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-teal-500 hover:text-teal-700">
                          Sửa
                        </button>
                        <button className="ml-2 text-red-500 hover:text-red-700">
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Cateegories
