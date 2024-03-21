import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubcategoryCard from "./card";

import s from "./gallery.module.scss";

const SubcategoriesGallery = ({ subcategories }) => {
  return (
    <>
      {subcategories && (
        <div className={`${s.subcategories_gallery}  row gy-4`}>
          {subcategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              return (
                <div key={category._id} className={`col ${s.col}`}>
                  <SubcategoryCard category={category} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SubcategoriesGallery;
