import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { checkStatus } from "../../redux/categories/categoriesSlice";

function Categories() {
  const dispatch = useDispatch();
  dispatch(checkStatus());
  const categories = useSelector((state) => state.categories.categories);
  
  return (
    <div>
      <h2>Categories</h2>
      <div>
        {categories.map((c) => (
          <li>{c}</li>
        ))}
      </div>
    </div>
  );
}

Categories.propTypes = {};

export default Categories;
