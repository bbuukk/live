import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubcategoryCard from "./card";

import s from "./gallery.module.scss";

const SubcategoriesGallery = ({ subcategories }) => {
  return (
    <>
      {subcategories && (
        // <div className={`${s.center_container}`}>

        <div className={`${s.gallery} row g-3`}>
          {subcategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              return (
                <li key={category._id} className={`col ${s.col}`}>
                  <SubcategoryCard category={category} />
                </li>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SubcategoriesGallery;
