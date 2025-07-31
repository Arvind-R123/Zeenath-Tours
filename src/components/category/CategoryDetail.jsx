import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Edit } from "lucide-react";

const CategoryDetail = () => {
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const category = categories.find((c) => c.id === Number(id));

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <Link
            to={`/categories/${id}/edit`}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <Edit className="h-5 w-5 text-gray-600" />
          </Link>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {category.name}
              </h1>
              <p className="text-xl text-indigo-600 mt-2">
                ${category.price.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-800">
                Stock: {category.stock}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{category.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Category</h2>
              <p className="mt-1 text-sm text-gray-900">{category.name}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Subcategory</h2>
              <p className="mt-1 text-sm text-gray-900">
                {category.subcategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/categories"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
};

export default CategoryDetail;
