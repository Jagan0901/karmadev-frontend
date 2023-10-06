import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { NavBar } from "../Components/NavBar";

export function AddProduct() {
  // const moviesList = INITIAL_MOVIES_LIST;
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");

  const navigate = useNavigate();

  const statusStyles = {
    textAlign: "center",
    color: "red",
  };

  const addProduct = ()=>{
    if(!name || !poster || !rating || !summary || !category || !price || !warranty) return setStatus("Please fill out the fields");
    if((+rating)>10 || !(+rating)===10 || (+rating)<0) return setStatus("Rating should be in the range between 0 to 10");
    if((+warranty)>20 || (+warranty)===0 || (+warranty)<0) return setStatus("Enter valid warranty");
    const newProduct = {
      name: name,
      poster: poster,
      rating: rating,
      summary: summary,
      category: category,
      price: price,
      warranty:warranty
    };
    //1. method - POST
    //2. body - data -> should be in json format
    //3. headers - JSON

    fetch(`${API}/products`, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res)=> {
        if(res.error) setStatus(res.error)
        else navigate("/products");
    })
  };

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
        />

        <TextField
          id="outlined-basic"
          label="Product poster"
          variant="outlined"
          type="text"
          placeholder="Enter a poster"
          onChange={(event) => setPoster(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Product rating"
          variant="outlined"
          type="number"
          onChange={(event) => setRating(event.target.value)}
          placeholder="Enter a rating"
        />

        <TextField
          id="outlined-basic"
          label="Product summary"
          variant="outlined"
          type="text"
          onChange={(event) => setSummary(event.target.value)}
          placeholder="Enter a summary"
        />

        <TextField
          id="outlined-basic"
          label="Product Category"
          variant="outlined"
          type="text"
          placeholder="Enter category"
          onChange={(event) => setCategory(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Product Price"
          variant="outlined"
          type="number"
          placeholder="Enter price "
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Product Warranty"
          variant="outlined"
          type="number"
          placeholder="Enter warranty "
          onChange={(event) => setWarranty(event.target.value)}
        />
        <br></br>
        <Button variant="contained" onClick={addProduct}>
          Add Product
        </Button>
        <h3 style={statusStyles}>{status}</h3>
      </div>
    </>
  );
}
