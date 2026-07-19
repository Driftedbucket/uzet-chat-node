const express = require("express");
const { PrismaClient } = require("@prisma/client");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const prisma = new PrismaClient();

//all routes here require a user tyo be logged in
router.use(requireAuth()); 

const PUBLIC_USER = {id:true, name:true, uzetId:true};

// GET /friends/search?uzetId=UZT-XXXX 
router.get("/search", async (req, res) => {
  const uzetId = (req.query.uzetId || "").trim().toUpperCase();

  const user = await prisma.user.findUnique({
    where: { uzetId },
    select: PUBLIC_USER,
  });

  
  if (!user || user.id === req.userId) {
    return res.json({ user: null });
  }

  //tell frontend if a request already exists in either direction
  const existing = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { fromUserId: req.userId, toUserId: user.id },
        { fromUserId: user.id, toUserId: req.userId },
      ],
    },
  });

  res.json({ user, existingStatus: existing?.status || null });
});