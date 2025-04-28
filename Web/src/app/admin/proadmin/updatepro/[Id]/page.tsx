"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { getProductDetail, updateProduct } from "@/api/products";
import { Category } from "../../../../../types";

interface EditProductProps {
  params: { id: string };
}

interface FormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  img?: FileList;
}

export default function EditProduct({ params }: EditProductProps) {
  const router = useRouter();
  const id = params.id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const getCategories = async () => {
    const response = await fetch("/api/categories");
    if (!response.ok) throw new Error("Network response was not ok.");
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productData] = await Promise.all([
          getCategories(),
          getProductDetail(id),
        ]);

        if (Array.isArray(categoriesData) && categoriesData.length > 0) {
          setCategories(categoriesData);
        }

        if (productData && Array.isArray(productData)) {
          const product = productData[0];
          setPreviewImage(`http://localhost:3000/images/${product.img || ""}`);
          setValue("name", product.name || "");
          setValue(
            "price",
            typeof product.price === "number" ? product.price : 0
          );
          setValue("description", product.description || "");
          setValue("categoryId", product.category?.categoryId || "");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "img" && data.img?.[0]) {
        formData.append("img", data.img[0]);
      } else {
        formData.append(key, (data as any)[key]?.toString() || "");
      }
    }

    try {
      await updateProduct(id, formData);
      router.push("/sanpham");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      <h2>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Tên sản phẩm */}
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            id="name"
            {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
            type="text"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Giá sản phẩm */}
        <div>
          <label htmlFor="price">Giá</label>
          <input
            id="price"
            {...register("price", {
              required: "Giá sản phẩm là bắt buộc",
              valueAsNumber: true,
            })}
            type="number"
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <label htmlFor="description">Mô t���</label>
          <textarea
            id="description"
            {...register("description", { required: "Mô tả là bắt buộc" })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        {/* Danh mục */}
        <div>
          <label htmlFor="categoryId">Danh mục</label>
          <select
            id="categoryId"
            {...register("categoryId", { required: "Danh mục là bắt buộc" })}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p>{errors.categoryId.message}</p>}
        </div>

        {/* Ảnh sản phẩm */}
        <div>
          <label htmlFor="img">Ảnh sản phẩm</label>
          <input
            id="img"
            type="file"
            accept="image/*"
            {...register("img")}
            onChange={handleImageChange}
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" style={{ width: 100 }} />
          )}
        </div>

        <button type="submit">Cập nhật sản phẩm</button>
      </form>
    </div>
  );
}
