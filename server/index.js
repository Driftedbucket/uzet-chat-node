require("dotenv").config();
const express=require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({origin: "http;//localhost:3000"}));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;

///uses requireAuth
const requireAuth = require("./middleware/requireAuth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, uzetId: true }, //nnever send passwordHash
  });
  res.json({ user });
});

app.listen(PORT, () => console.log(`uzet api running on :${PORT}`));