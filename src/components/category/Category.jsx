import React, { useState, Suspense } from "react";

const CategoryList = React.lazy(() => import("../CategoryList"));
const CategoryForm = React.lazy(() => import("../CategoryForm"));
const CategoryDetail = React.lazy(() => import("../CategoryDetail"));

export const Categories = () => {
  const [categoriesView, setCategoriesView] = useState({
    list: true,
    create: false,
    edit: false,
    detail: false,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {categoriesView.create || categoriesView.edit ? (
        <CategoryForm
          categoriesView={categoriesView}
          setCategoriesView={setCategoriesView}
        />
      ) : categoriesView.detail ? (
        <CategoryDetail
          categoriesView={categoriesView}
          setCategoriesView={setCategoriesView}
        />
      ) : (
        <CategoryList
          categoriesView={categoriesView}
          setCategoriesView={setCategoriesView}
        />
      )}
    </Suspense>
  );
};
