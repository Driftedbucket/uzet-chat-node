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