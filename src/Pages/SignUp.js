import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import { API } from "../api";

export function SignUp() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const statusStyles = {
    textAlign: "center",
    color: status === "Created Successfully" ? "green" : "red",
  };

  const handleSignUp = () => {
    if (!mail || !password) return setStatus("Please fill out the fields");
    setLoading(true);

    const newUser = {
      email: mail,
      password: password,
    };

    fetch(`${API}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())

      .then((response) => {
        if (response.message) {
          setStatus(response.message);
          navigate("/");
          setLoading(false);
        } else if (response.error) {
          setStatus(response.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        setStatus(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>Sign Up</h2>
      <form className="login">
        <TextField
          variant="outlined"
          id="email"
          label="Create Email"
          type="email"
          placeholder="Create new email"
          onChange={(event) => setMail(event.target.value)}
        />
        <TextField
          variant="outlined"
          id="password"
          label="Create Password"
          type="password"
          placeholder="Create new password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleSignUp}
        >
          Sign Up
        </LoadingButton>
        <h3 style={statusStyles}>{status}</h3>
      </form>
    </div>
  );
}
