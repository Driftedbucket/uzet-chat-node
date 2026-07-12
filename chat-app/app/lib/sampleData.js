export const AVATAR_COLORS = ["#4A2E8F", "#8F2E6B", "#2E5C8F", "#8F5C2E", "#3D8F2E"];

export const CHATS = [
  { id: "juno", name: "juno", time: "2m", preview: "sent the cut — watch b4 tonight", unread: 2 },
  { id: "3am", name: "3am club", isGroup: true, time: "14m", preview: "theo: WHO booked the karaoke room", unread: 5 },
  { id: "theo", name: "theo", time: "1h", preview: "voice note · 0:41", unread: 0 },
  { id: "riya", name: "riya", time: "ytd", preview: "ok that sticker pack is elite", unread: 0 },
  { id: "mars", name: "mars.wav", time: "ytd", preview: "video · demo_v3.mp4", unread: 0 },
];

//return the newest messages in each array 
export const MESSAGES = {
  juno: [
    { id: 4, direction: "out", type: "sticker", glyph: "🔥", time: "9:47" },
    { id: 3, direction: "in", type: "video", filename: "demo_v3.mp4", duration: "0:32", time: "9:46" },
    { id: 2, direction: "out", type: "text", text: "send it send it", time: "9:44" },
    { id: 1, direction: "in", type: "text", text: "sent the cut — watch b4 tonight", time: "9:41" },
  ],
  "3am": [
    { id: 3, direction: "in", type: "text", sender: "theo", text: "WHO booked the karaoke room", time: "8:52" },
    { id: 2, direction: "in", type: "text", sender: "riya", text: "not me 💀", time: "8:53" },
    { id: 1, direction: "out", type: "text", text: "it was mars. obviously.", time: "8:55" },
  ],
  theo: [
    { id: 1, direction: "in", type: "voice", duration: "0:41", bars: [8,14,19,11,6,16,20,9,13,7,18,12,15,6,17,10,14,8], time: "7:30" },
  ],
  riya: [
    { id: 1, direction: "in", type: "text", text: "ok that sticker pack is elite", time: "ytd" },
  ],
  mars: [
    { id: 1, direction: "in", type: "video", filename: "demo_v3.mp4", duration: "0:32", time: "ytd" },
  ],
};

export const STICKERS = ["🔥", "😭", "🫡", "💀", "🐸", "✨", "🫶", "👾"];
export const ME = { id: "UZT-0M3G", name: "you" };