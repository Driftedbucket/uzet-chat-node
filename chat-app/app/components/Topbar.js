"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ME } from "../lib/sampleData";
import styles from "./Topbar.module.css";
import {apiFetch} from "../lib/api";

export default function Topbar(){
    const pathname = usePathname();
    const [pendingCount, setPendingCount]=useState(0);
    const [me,setMe] = useState(null);

    useEffect(()=>{
      //get logged in user from login/refgister
      const stored = localStorage.getItem("user");
      if(stored) setMe(JSON.parse(stored));

      apiFetch("/friends/requests")
      .then((data)=>setpendingCount(data.requests.length))
      .catch(()=>{});//if not logged in or server is down--badgw stys hidden
    })
    
    const TABS=[
      {href:"/chats", label:"chats"},
      {href:"/add", label:"add friends"},
      {href:"/requests", label:"requests", badge:pendingCount}
    ];

    return(
    <header className={styles.bar}>
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
        <span className={styles.userId}>{me?.uzetId || ""}</span>
        <div className={styles.meAvatar} />
      </div>
    </header>
  );
}

//ts bs is not commiting