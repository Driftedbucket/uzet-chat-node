const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//UZT-XXXX generation
//4 charsacters from an unambiguous alphabet(no O/0, I/1 confusion)
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomUzetId() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `UZT-${code}`;
}



