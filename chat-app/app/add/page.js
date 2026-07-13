"use client";
import { useState } from "react";
import TopBar from "./components/TopBar";
import styles from "./add.module.css";

const FAKE_USER = { name: "kai.mp4", id: "UZT-2H8V", mutuals: "2 mutuals: juno, theo" };

export default function AddPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);   //null | user | "none"
  const [requested, setRequested] = useState(false);

  function search() {
    if (!query.trim()) return;
    // fake for neeow: exact match on our sample user, otherwise there'd beno match
    setRequested(false);
    setResult(query.trim().toUpperCase() === FAKE_USER.id ? FAKE_USER : "none");
  }

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
            onChange={(e) => { setQuery(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button className={styles.searchBtn} onClick={search}>search</button>
        </div>

        <div className={styles.chips}>
          <span className={styles.tryLabel}>try:</span>
          <button className={styles.chip} onClick={() => setQuery("UZT-2H8V")}>UZT-2H8V</button>
        </div>

        {result === "none" && <p className={styles.noMatch}>no one with that id</p>}

        {result && result !== "none" && (
          <div className={styles.resultCard}>
            <div className={styles.resultAvatar}>{result.name[0]}</div>
            <div className={styles.resultInfo}>
              <div className={styles.resultName}>{result.name}</div>
              <div className={styles.resultMeta}>
                <span className={styles.resultId}>{result.id}</span> · {result.mutuals}
              </div>
            </div>
            <button
              className={requested ? styles.requestedBtn : styles.requestBtn}
              disabled={requested}
              onClick={() => setRequested(true)}
            >
              {requested ? "requested ✓" : "request access"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}