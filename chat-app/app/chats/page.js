"use client";
import { useState } from "react";
import TopBar from "../components/TopBar";
import { CHATS, MESSAGES, STICKERS, AVATAR_COLORS } from "../lib/sampleData";
import styles from "./chats.module.css";

function Avatar({name,index,size=44}){
    return (
    <div
      className={styles.avatar}
      style={{
        width: size, height: size,
        background: AVATAR_COLORS[index % AVATAR_COLORS.length],
        fontSize: size * 0.36,
      }}
    >
      {name[0]}
    </div>
  );
}

function Message({msg}){
    const out=msg.direction==="out";

    if (msg.type === "sticker") {
    return <div className={`${styles.msgRow} ${out ? styles.rowOut : ""}`}>
      <div>
        <div className={styles.sticker}>{msg.glyph}</div>
        <div className={`${styles.time} ${out ? styles.timeOut : ""}`}>{msg.time}</div>
      </div>
    </div>;
  }

  if (msg.type === "voice") {
    return <div className={`${styles.msgRow} ${out ? styles.rowOut : ""}`}>
      <div>
        <div className={`${styles.bubble} ${out ? styles.bubbleOut : styles.bubbleIn} ${styles.voiceBubble}`}>
          <span className={styles.playTri} style={{ borderLeftColor: out ? "#fff" : "var(--accent)" }} />
          <span className={styles.waveform}>
            {msg.bars.map((h, i) => (
              <span key={i} className={styles.bar}
                style={{ height: h, background: out ? "rgba(255,255,255,0.75)" : "#5E5580" }} />
            ))}
          </span>
          <span className={styles.duration}>{msg.duration}</span>
        </div>
        <div className={`${styles.time} ${out ? styles.timeOut : ""}`}>{msg.time}</div>
      </div>
    </div>;
  }

  if (msg.type === "video") {
    return <div className={`${styles.msgRow} ${out ? styles.rowOut : ""}`}>
      <div>
        <div className={styles.videoCard}>
          <div className={styles.videoThumb}><div className={styles.videoPlay}>▶</div></div>
          <div className={styles.videoFooter}>{msg.filename} · {msg.duration}</div>
        </div>
        <div className={`${styles.time} ${out ? styles.timeOut : ""}`}>{msg.time}</div>
      </div>
    </div>;
  }
}