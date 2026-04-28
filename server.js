const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const orderRoutes = require("./routes/orders");

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));