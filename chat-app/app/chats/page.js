"use client";
import { useState } from "react";
import TopBar from "./components/TopBar";
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

  return <div className={`${styles.msgRow} ${out ? styles.rowOut : ""}`}>
    <div>
      <div className={`${styles.bubble} ${out ? styles.bubbleOut : styles.bubbleIn}`}>
        {msg.sender && <div className={styles.sender}>{msg.sender}</div>}
        {msg.text}
      </div>
      <div className={`${styles.time} ${out ? styles.timeOut : ""}`}>{msg.time}</div>
    </div>
  </div>;
}

export default function ChatsPage(){
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);
  const [messagesByChat, setMessagesByChat] = useState(MESSAGES);
  const [draft, setDraft] = useState("");
  const [trayOpen, setTrayOpen] = useState(false);

  const activeChat = CHATS.find((c) => c.id === activeChatId);
  const messages = messagesByChat[activeChatId] || [];

  function sendMessage(msg) {
    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [{ id: Date.now(), direction: "out", time: "now", ...msg }, ...(prev[activeChatId] || [])],
    }));
  }

  function sendText() {
    if (!draft.trim()) return;
    sendMessage({ type: "text", text: draft.trim() });
    setDraft("");
  }

  return(
    <div className={styles.screen}>
      <TopBar />
      <div className={styles.panes}>

        <aside className={styles.sidebar}>
          <input className={styles.search} placeholder="search chats" />
          <div className={styles.chatList}>
            {CHATS.map((chat, i) => (
              <button key={chat.id}
                className={`${styles.chatRow} ${chat.id === activeChatId ? styles.chatRowActive : ""}`}
                onClick={() => setActiveChatId(chat.id)}>
                <Avatar name={chat.name} index={i} />
                <div className={styles.chatInfo}>
                  <div className={styles.chatTop}>
                    <span className={styles.chatName}>{chat.name}</span>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                  <div className={styles.chatBottom}>
                    <span className={styles.preview}>{chat.preview}</span>
                    {chat.unread > 0 && <span className={styles.unread}>{chat.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className={styles.convo}>
          <div className={styles.convoHeader}>
            <Avatar name={activeChat.name} index={CHATS.indexOf(activeChat)} size={40} />
            <div>
              <div className={styles.convoName}>{activeChat.name}</div>
              <div className={styles.presence}>online now</div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconBtn}>📞</button>
              <button className={styles.iconBtn}>🎥</button>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((msg) => <Message key={msg.id} msg={msg} />)}
          </div>

          {trayOpen && (
            <div className={styles.tray}>
              {STICKERS.map((s) => (
                <button key={s} className={styles.trayTile}
                  onClick={() => { sendMessage({ type: "sticker", glyph: s }); setTrayOpen(false); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className={styles.composerWrap}>
            <div className={styles.composer}>
              <button className={styles.iconBtn}>+</button>
              <button className={styles.iconBtn} onClick={() => setTrayOpen((o) => !o)}>✦</button>
              <input
                className={styles.input}
                placeholder={`message ${activeChat.name}`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendText()}
              />
              <button className={`${styles.iconBtn} ${styles.mic}`}>🎙</button>
              <button className={styles.send} onClick={sendText}>↑</button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}