import Image from "next/image";
import { FooterLogo } from "./footer";
import styles from "@/styles/header.module.scss";
import { useState } from "react";

export default function Announcement(props) {
  const [page, setPage] = useState(1)

  const announcements = [1,2,3]

  const handlePageChange = (offset) => {
    if (page + offset < 1 || page + offset > 3) {
      return
    }
    setPage(page + offset)
  }


  return (
    <div className={styles.announcement + " announcement-mobile"}>
      <div className={styles.toolbar}>
        {page}
        <div className={styles.logo}>
          <Image src="/favicons/favicon-32x32.png" width={32} height={32}></Image>
        </div>
        {announcements.length}
      </div>

      <div className={styles.content}>
  This is where the text for the announcement goes
      </div>

      {page != 1 &&
        <button className={styles["left-arrow"]}
          onClick={() => handlePageChange(-1)}>
            &#x25C0;
        </button>
      }

      {page < 3 &&
        <button className={styles["right-arrow"]}
          onClick={() => handlePageChange(1)}>
            &#x25B6;
        </button>
      }

    </div >
  )
}

function useHidePopup() {
  
}