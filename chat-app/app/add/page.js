"use client";
import { useState } from "react";
import TopBar from "../components/TopBar";
import styles from "./add.module.css";
import {apiFetch} from "../lib/api";
const FAKE_USER = { name: "kai.mp4", id: "UZT-2H8V", mutuals: "2 mutuals: juno, theo" };


export default function AddPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);   //null | user | "none"
  const [requested, setRequested] = useState(false);
  const [status, setStatus] = useState(null);
  const [error,setError] = useState("");

  async function search() {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await apiFetch(`/friends/search?uzetId=${encodeURIComponent(q)}`);
      if (!data.user) {
        setResult(false);
      } else {
        setResult(data.user);
        setStatus(data.existingStatus); //coould be PENDING/ACCEPTED
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function requestAccess() {
    //optimistic: flip the button immediately
    setStatus("PENDING");
    try {
      await apiFetch("/friends/requests", {
        method: "POST",
        body: JSON.stringify({ toUserId: result.id }),
      });
    } catch (err) {
      //roll backfor when the server says no
      setStatus(null);
      setError(err.message);
    }
  }

  function buttonFor(status) {
    if (status === "PENDING")
      return <button className={styles.requestedBtn} disabled>requested ✓</button>;
    if (status === "ACCEPTED")
      return <button className={styles.requestedBtn} disabled>added ✓</button>;
    return <button className={styles.requestBtn} onClick={requestAccess}>request access</button>;
  }


  //REFACTOR TO DYNAMICALLY RENDER 
  return (
    <div className={styles.screen}>
      <TopBar />
      <div className={styles.content}>
        <h1 className={styles.title}>who are you looking for?</h1>
        <p className={styles.sub}>paste their uzet id — that&apos;s the only way in</p>

        <div className={styles.searchPill}>
          <input
            className={styles.searchInput}
            placeholder="UZT-XXXX"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setResult(null); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button className={styles.searchBtn} onClick={search} disabled={loading}>
            {loading ? "..." : "search"}
          </button>
        </div>

        {error && <p className={styles.noMatch}>{error}</p>}

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultAvatar}>{result.name[0]}</div>
            <div className={styles.resultInfo}>
              <div className={styles.resultName}>{result.name}</div>
              <div className={styles.resultMeta}>
                <span className={styles.resultId}>{result.uzetId}</span>
              </div>
            </div>
            {buttonFor(status)}
          </div>
        )}

        {result === false && <p className={styles.noMatch}>no one with that id</p>}
      </div>
    </div>
  );
}