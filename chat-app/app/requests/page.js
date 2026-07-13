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
}