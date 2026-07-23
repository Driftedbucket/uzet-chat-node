"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "./lib/api";
import styles from "./page.module.css";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("register"); //"register"orr"login"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(null); //set only after registeringg→ shows onboarding
  const [copied, setCopied] = useState(false);


}

