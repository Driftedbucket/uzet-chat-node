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

  function copyId() {
    navigator.clipboard.writeText(newUser.uzetId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  //post-signup onboarding/konima sho wiishangitha "hi, you're in/wuuhala po, omo wuli"
  if(newUser){
    return(
    <div className={styles.screen}>
        <div className={styles.logoMark}>u</div>
        <h1 className={styles.hero}>hi. you&apos;re in.</h1>
        <p className={styles.sub}>
          uzet is invite-only by design. your id is the only way anyone finds you.
        </p>
        <div className={styles.idPill}>
          <span className={styles.idLabel}>your id</span>
          <span className={styles.idValue}>{newUser.uzetId}</span>
          <button className={styles.copyBtn} onClick={copyId}>
            {copied ? "copied ✓" : "copy"}
          </button>
        </div>
        <button className={styles.cta} onClick={() => router.push("/chats")}>
          start chatting
        </button>
      </div>
    );
  }

  //auth/signup/register/iishangitha form
  return(
    <div className={styles.screen}>
      <div className={styles.logoMark}>u</div>
      <h1 className={styles.hero}>uzet</h1>
      <p className={styles.sub}>
        {mode === "register" ? "make an account. get your id. disappear from search." : "welcome back."}
      </p>

      <div className={styles.card}>
        {mode === "register" && (
          <input className={styles.field} placeholder="name"
            value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input className={styles.field} placeholder="email" type="email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={styles.field} placeholder="password" type="password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()} />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.cta} onClick={submit} disabled={loading}>
          {loading ? "..." : mode === "register" ? "create account" : "log in"}
        </button>

        <p className={styles.switchMode}>
          {mode === "register" ? (
            <>already have an id? <button onClick={() => { setMode("login"); setError(""); }}>log in</button></>
          ) : (
            <>new here? <button onClick={() => { setMode("register"); setError(""); }}>create account</button></>
          )}
        </p>
      </div>
    </div>
  );

}

