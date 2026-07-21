"use client";
import { useState } from "react";
import TopBar from "../components/TopBar";
import { AVATAR_COLORS } from "../lib/sampleData";
import styles from "./request.module.css";
import {apiFetch} from "../lib/api"

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState({});

  useEffect(()=>{
    apiFetch("/friiends/requests")
    .then((data)=>setRequests(data.requests))
    .catch(console.error)
    .finally(()=>setLoading(false))
  },[]);

  async function respond(id, action){
    setAnswered((prev) => ({ ...prev, [id]: action + "ed" })); // optimistic
    try {
      await apiFetch(`/friends/requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });
    } catch (err) {
      setAnswered((prev) => {
        const next = { ...prev };
        delete next[id]; //roll it back
        return next;
      });
      console.error(err);
    }
  }

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