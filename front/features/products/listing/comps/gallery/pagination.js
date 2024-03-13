import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import s from "./pagination.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

//todo styles for disabled control buttons
function ProductsPagination({ numPages, activePageId }) {
  const router = useRouter();
  const { categoryPath } = router.query;

  return (
    <Pagination
      size="lg"
      className={`${s.pagination}`}
      // bsPrefix={"products_pagination"}
    >
      <div
        className={`${s.controls} ${s.left} ${
          activePageId == 1 ? "disabled" : ""
        }`}
      >
        <Pagination.First
          href={`/products/${categoryPath}/page=1`}
          className={`${s.item}`}
        />

        <Pagination.Prev
          href={`/products/${categoryPath}/page=${Math.max(
            1,
            Number(activePageId) - 1
          )}`}
          className={`${s.item}`}
        />
      </div>

      <div className={`${s.pages_group}`}>
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageId) => {
          return (
            <Pagination.Item
              className={pageId == activePageId ? s.itemActive : s.item}
              active={pageId == activePageId}
              key={pageId}
              href={`/products/${categoryPath}/page=${pageId}`}
              // linkClassName="product_page_item"
            >
              {pageId}
            </Pagination.Item>
          );
        })}
      </div>

      <div
        className={`${s.controls} ${s.right} ${
          activePageId == numPages ? "disabled" : ""
        }`}
      >
        <Pagination.Next
          className={`${s.item}`}
          href={`/products/${categoryPath}/page=${Math.max(
            1,
            Number(activePageId) + 1
          )}`}
        />
        <Pagination.Last
          className={`${s.item}`}
          href={`/products/${categoryPath}/page=${numPages}`}
        />
      </div>
    </Pagination>
  );
}

export default ProductsPagination;
