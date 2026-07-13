"use client";
import { useState } from "react";
import TopBar from "./components/TopBar";
import { AVATAR_COLORS } from "../lib/sampleData";
import styles from "./requests.module.css";

const INITIAL_REQUESTS = [
  { id: 1, name: "kai.mp4", uzetId: "UZT-2H8V", note: "met at soren's set", status: "pending" },
  { id: 2, name: "lex", uzetId: "UZT-7Q1M", note: "from the film club gc", status: "pending" },
  { id: 3, name: "ana_b", uzetId: "UZT-5C3R", note: "no note attached", status: "pending" },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  function setStatus(id, status) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }
  return (
    <div className={styles.screen}>
      <TopBar />
      <div className={styles.content}>
        <h1 className={styles.title}>knock knock.</h1>
        <p className={styles.sub}>these people have your id and want to chat. your call.</p>

        <div className={styles.list}>
          {requests.map((req, i) => (
            <div key={req.id} className={styles.card}>
              <div
                className={styles.avatar}
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {req.name[0]}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{req.name}</div>
                <div className={styles.meta}>
                  <span className={styles.reqId}>{req.uzetId}</span> · {req.note}
                </div>
              </div>

              {req.status === "pending" && (
                <div className={styles.actions}>
                  <button className={styles.decline} onClick={() => setStatus(req.id, "declined")}>
                    decline
                  </button>
                  <button className={styles.accept} onClick={() => setStatus(req.id, "accepted")}>
                    accept
                  </button>
                </div>
              )}
              {req.status === "accepted" && <span className={styles.added}>added ✓</span>}
              {req.status === "declined" && <span className={styles.declined}>declined</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}