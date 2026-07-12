"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ME } from "../lib/sampleData";
import styles from "./TopBar.module.css";

const TABS = [
    {href:"/chats", label:"chats"},
    {href:"/add", label:"add friends"},
    {href:"/request", label:"requests",badge:3},  
];

export default function Topbar(){
    const pathname = usePathname
    
    return(<header>
        <div className={styles.brand}>
        <div className={styles.logo}>u</div>
        <span className={styles.wordmark}>uzet</span>
      </div>

      <nav className={styles.navPill}>
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${pathname.startsWith(tab.href) ? styles.tabActive : ""}`}
          >
            {tab.label}
            {tab.badge > 0 && <span className={styles.badge}>{tab.badge}</span>}
          </Link>
        ))}
      </nav>

      <div className={styles.user}>
        <span className={styles.userId}>{ME.id}</span>
        <div className={styles.meAvatar} />
      </div>
    </header>)
}