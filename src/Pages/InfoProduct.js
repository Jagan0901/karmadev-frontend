import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


export function InfoProduct() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const getProductInfo = () => {
    fetch(`${API}/products/${productId}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((pd) => setProduct(pd));
  };

  useEffect(() => getProductInfo(), []);

  return product ? (
    <div>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "35%",
          marginRight: "35%",
          marginBottom: "10px",
        }}
      >
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={product.poster}
            title={product.name}
            className="pic"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category : {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price : ₹{product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Warranty : {product.warranty} year
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button
        // style={backStyles}
        variant="contained"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  ) : (
    "Loading..."
  );
}
