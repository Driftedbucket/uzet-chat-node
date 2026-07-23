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

  async function submit() {
    setError("");
    setLoading(true);
    try {
      const path = mode === "register" ? "/auth/register" : "/auth/login";
      const body = mode === "register" ? { name, email, password } : { email, password };

      const data = await apiFetch(path, { method: "POST", body: JSON.stringify(body) });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (mode === "register") {
        setNewUser(data.user); //stay here,show new id
      } else {
        router.push("/chats");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

}

