const express = require("express");
const cors = require("cors");
const path = require("path");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const usersRoute = require("./routes/users/usersRoute");
const globalerrorhandler = require("./middlewares/globalerrorhandler");
require("./config/dbConnect");

const app = express();

// ──────────────────────────────────────
// ✅ Middleware to allow all cross-origin
// ──────────────────────────────────────
app.use(cors({ origin: "*" })); // allows all origins
app.use(express.json()); // parses incoming JSON

// ──────────────────────────────────────
// ✅ Routes
// ──────────────────────────────────────
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/accounts", accountRoute);
app.use("/api/v1/transactions", transactionsRoute);

// ──────────────────────────────────────
// ✅ Global Error Handler
// ──────────────────────────────────────
app.use(globalerrorhandler);

// ──────────────────────────────────────
// 🔄 Optional: Serve frontend if deployed together
// ──────────────────────────────────────
// const frontendPath = path.join(__dirname, "income-expenses-tracker (frontend)", "build");
// app.use(express.static(frontendPath));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
// });

// ──────────────────────────────────────
// ✅ Start Server
// ──────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
