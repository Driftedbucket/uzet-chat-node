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

//POST /friends/requests {toUserId,note?} 
router.post("/requests", async (req, res) => {
  const { toUserId, note } = req.body;

  if (!toUserId || toUserId === req.userId) {
    return res.status(400).json({ error: "invalid recipient" });
  }

  const target = await prisma.user.findUnique({ where: { id: toUserId } });
  if (!target) return res.status(404).json({ error: "user not found" });

  //block duplicates
  //requested you, the answer is "check your inbox", not a new request
  const existing = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { fromUserId: req.userId, toUserId },
        { fromUserId: toUserId, toUserId: req.userId },
      ],
    },
  });
  if (existing) {
    return res.status(409).json({ error: "request already exists", status: existing.status });
  }

  const request = await prisma.friendRequest.create({
    data: { fromUserId: req.userId, toUserId, note: note || null },
  });

  res.status(201).json({ request });
});

//GET /friends/requests
router.get("/requests", async (req, res) => {
  const requests = await prisma.friendRequest.findMany({
    where: { toUserId: req.userId, status: "PENDING" },
    include: { fromUser: { select: PUBLIC_USER } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ requests });
});