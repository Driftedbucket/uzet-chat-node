const express = require("express");
const { PrismaClient } = require("@prisma/client");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const prisma = new PrismaClient();

//all routes here require a user tyo be logged in
router.use(requireAuth()); 

const PUBLIC_USER = {id:true, name:true, uzetId:true};

