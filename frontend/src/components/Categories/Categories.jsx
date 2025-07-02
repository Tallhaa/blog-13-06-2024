import React from "react";
import "./Categories.css";

const Categories = ({ onCategorySelect }) => {
  const categories = ["All", "Technology", "Programming", "News", "Buisiness"];

  return (
    <div className="category-container">
      <h2 style={{ paddingLeft: "16px", marginBottom: "10px" }}>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onCategorySelect(category.toLowerCase())}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
