import "./index.css";
import { useState } from "react";
import React from "react";
import { productsData } from "./data.js";

export default function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState("id");
  const [sortOrder, setSortOrder] = useState("Smallest to Highest");

  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortCriteria === "id") {
      return sortOrder === "Smallest to Highest" ? a.id - b.id : b.id - a.id;
    } else if (sortCriteria === "price") {
      return sortOrder === "Smallest to Highest"
        ? a.price - b.price
        : b.price - a.price;
    }
    return 0;
  });

  const filteredProducts = categoryFilter
    ? sortedProducts.filter((product) => product.category === categoryFilter)
    : sortedProducts;

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "Smallest to Highest"
        ? "Highest to Smallest"
        : "Smallest to Highest"
    );
  };

  return (
    <div className="app">
      <Logo />
      <div className="add-form">
        <div>
          <label>Filter by Category </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Clothing">Clothing</option>
            <option value="Travel">Travel</option>
            <option value="Accessories">Accessories</option>
            <option value="Fitness">Fitness</option>
            <option value="Furniture">Furniture</option>
            <option value="Kitchen">Kitchen</option>
          </select>
        </div>
        <div>
          <button onClick={() => handleSort("price")}>Sort by Price</button>
          <button onClick={() => handleSortOrder()}>Toggle Sort Order</button>
        </div>
      </div>
      <div className="list">
        <div style={{ display: "flex", marginLeft: "2rem" }}>
          <p style={{ marginRight: "1rem" }}>Sort By : </p>
          {sortCriteria === "id" ? (
            <p style={{ marginRight: "1rem" }}> ID </p>
          ) : (
            <p style={{ marginRight: "1rem" }}>PRICE </p>
          )}
          <p>({sortOrder})</p>
        </div>
        <ul>
          {filteredProducts.map((product) => (
            <Item item={product} key={product.id} />
          ))}
        </ul>
      </div>

      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>PLAY CART 🛒</h1>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <div className="card">
        <img
          className="avatar"
          style={{ objectFit: "cover" }}
          src={item.image}
          alt="Product"
        />
        <div className="data">
          <h3>{item.name}</h3>
          <br />
          <p style={{ fontSize: "1.5rem" }}>{item.description}</p>
          <p
            style={{
              fontSize: "1.7rem",
              fontWeight: "800",
              marginTop: "1.2rem",
            }}
          >
            {" "}
            Price: {item.price}
          </p>
        </div>
      </div>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have {productsData.length} items on your list</em>
    </footer>
  );
}
