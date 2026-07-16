const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//UZT-XXXX generation
//4 charsacters from an unambiguous alphabet (no O/0, I/1 confusion)
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomUzetId() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `UZT-${code}`;
}

//no 2 users should have the smae id 
async function generateUniqueUzetId() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = randomUzetId();
    const existing = await prisma.user.findUnique({ where: { uzetId: candidate } });
    if (!existing) return candidate;
  }
  throw new Error("could not generate unique id");
}

//POST auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "password must be at least 8 characters" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const uzetId = await generateUniqueUzetId();

    const user = await prisma.user.create({
      data: { name, email, passwordHash, uzetId },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, uzetId: user.uzetId },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
});



