import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Account created!");
      navigate("/");
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="auth">
      <h1>Join LinkUp</h1>

      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={register}>Create Account</button>
    </div>
  );
}