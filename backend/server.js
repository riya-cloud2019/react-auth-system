const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

const user = {
  email: "admin@gmail.com",
  password: "123456",
  role: "admin"
};

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ email, role: user.role }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "No token" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    next();
  });
};

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Dashboard Access", user: req.user });
});

app.get("/admin", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }
  res.json({ message: "Admin Access" });
});

app.listen(5000, () => console.log("Server running on 5000"));