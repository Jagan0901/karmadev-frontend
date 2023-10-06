import { useParams } from "react-router-dom";
import { API } from "../api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "../Components/Loading";
import { NavBar } from "../Components/NavBar";

export function EditProduct() { 
  const { productId } = useParams();
  const [products, setProducts] = useState(null);

  const getProducts = () => {
    fetch(`${API}/products/${productId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((product) => setProducts(product));
  };

  useEffect(() => getProducts(), []);

  return products ? <EditProductForm product={products} /> : <Loading />;
}

function EditProductForm({ product }) {
  const [name, setName] = useState(product.name);
  const [poster, setPoster] = useState(product.poster);
  const [rating, setRating] = useState(product.rating);
  const [summary, setSummary] = useState(product.summary);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [warranty, setWarranty] = useState(product.warranty);
  const [status, setStatus] = useState("");

  const editProduct = ()=>{
     if (!name || !poster || !rating || !summary || !category || !price || !warranty)
       return setStatus("Please fill out the fields");
     if (+rating > 10 || !+rating === 10 || +rating < 0)
       return setStatus("Rating should be in the range between 0 to 10");
     if (+warranty > 20 || +warranty === 0 || +warranty < 0)
       return setStatus("Enter valid warranty"); 
    const updatedProduct = {
      name: name,
      poster: poster,
      rating: rating,
      summary: summary,
      category: category,
      price: price,
      warranty: warranty
    };
    fetch(`${API}/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => navigate("/products"));
  };

  const statusStyles = {
    textAlign: "center",
    color: "red",
  };

  

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="add-product">
        <TextField
          id="outlined-basic"
          label="Product name"
          variant="outlined"
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a name"
          value={name}
        />

        <TextField
          id="outlined-basic"
          label="Product poster"
          variant="outlined"
          type="text"
          placeholder="Enter a poster"
          onChange={(event) => setPoster(event.target.value)}
          value={poster}
        />

        <TextField
          id="outlined-basic"
          label="Product rating"
          variant="outlined"
          type="number"
          onChange={(event) => setRating(event.target.value)}
          placeholder="Enter a rating"
          value={rating}
        />

        <TextField
          id="outlined-basic"
          label="Product summary"
          variant="outlined"
          type="text"
          onChange={(event) => setSummary(event.target.value)}
          placeholder="Enter a summary"
          value={summary}
        />

        <TextField
          id="outlined-basic"
          label="Product Category"
          variant="outlined"
          type="text"
          placeholder="Enter category"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        />
        <TextField
          id="outlined-basic"
          label="Product Price"
          variant="outlined"
          type="number"
          placeholder="Enter price "
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <TextField
          id="outlined-basic"
          label="Product Warranty"
          variant="outlined"
          type="number"
          placeholder="Enter warranty "
          onChange={(event) => setWarranty(event.target.value)}
          value={warranty}
        />
        <br></br>
        <Button color="success" variant="contained" onClick={editProduct}>
          Save
        </Button>
        <h3 style={statusStyles}>{status}</h3>
      </div>
    </>
  );
}
