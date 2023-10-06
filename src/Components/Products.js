import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API } from "../api";
import { LikeDislike } from "./LikeDislike";

export const Products = ({ product, refresh }) => {
  const [show, setShow] = useState(true);

  const ratingStyles = {
    color:
      product.rating >= 9
        ? "darkGoldenrod"
        : product.rating >= 8
        ? "green"
        : "red",
    fontWeight: "bold",
  };
  const likeDeleteEdit = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const deleteProduct = () => {
    fetch(`${API}/products/${product.id}`, {
      method: "DELETE",
    }).then(() => refresh());
  };

  const navigate = useNavigate();
  return (
    <div className="product-container">
      <img className="product-poster" src={product.poster} alt={product.name} />
      <div className="product-specs">
        <div className="product-N-btn">
          <h3 className="product-name">{product.name}</h3>
          <IconButton onClick={() => setShow(!show)}>
            {show ? (
              <ExpandLessIcon className="product-toggle" />
            ) : (
              <ExpandMoreIcon className="product-toggle" />
            )}
          </IconButton>
          <IconButton
            aria-label="info"
            color="primary"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <InfoIcon className="product-info" />
          </IconButton>
        </div>
        <p className="product-rating" style={ratingStyles}>
          ⭐{product.rating}{" "}
        </p>
      </div>
      {show ? <p className="product-summary">{product.summary}</p> : ""}
      <div style={likeDeleteEdit}>
        <LikeDislike />
        <div>
          <IconButton aria-label="delete" color="error" onClick={deleteProduct}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="secondary"
            onClick={() => navigate(`/products/edit/${product.id}`)}
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
