const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// ✅ CORS (allow Netlify frontend)
app.use(cors({
  origin: "*"
}));

const SECRET_KEY = "mysecretkey";

// ✅ Root route (test)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy user check
  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign(
      { email, role: "admin" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: { email, role: "admin" }
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// ✅ Middleware (token verify)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(403).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Dashboard route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Dashboard Access",
    user: req.user
  });
});

// ✅ Admin route
app.get("/admin", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }

  res.json({ message: "Admin Access 🔥" });
});

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});