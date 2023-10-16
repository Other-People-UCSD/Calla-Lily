import Image from "next/image";
import { FooterLogo } from "./footer";
import headerStyles from "@/styles/header.module.scss";
import animStyles from "@/styles/animations.module.scss";
import { useState, useRef, useEffect } from "react";
import { Opacity } from "@mui/icons-material";

const firstAnimDur = "2s";

export default function Announcement(props) {
  const overlayRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  useHidePopup(overlayRef);

  const [page, setPage] = useState(1)

  const announcements = [1, 2, 3]

  const handlePageChange = (offset) => {
    if (page + offset < 1 || page + offset > 3) {
      return
    }
    setPage(page + offset)
  }

  useEffect(() => {
    document.getElementById("intersectAnimation").addEventListener("endEvent", () => {
      console.log('ended')
    })
  }, [overlayRef, prevRef, nextRef])


  return (
    <div
      ref={overlayRef}
      className={headerStyles.announcementOverlay}>

      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">


        <circle id="lcirc" cx="200" cy="200" r="100"
          className={`${animStyles.circle}`}>
          <animateMotion
            dur={firstAnimDur}
            path="m 0 0 l 300 0"
            begin="startButton.click"
            fill="freeze"
          />
        </circle>

        <circle id="rcirc" cx="800" cy="200" r="100"
          className={`${animStyles.circle}`}>
          <animateMotion
            dur={firstAnimDur}
            path="m 0 0 l -300 0"
            begin="startButton.click"
            fill="freeze"
          />
        </circle>


        <mask id="mask-intersect"
          maskMode="luminance">
          <rect x="500" y="100" width="200" height="200" fill="black" />
          <circle cx="200" cy="200" r="100" fill="white">
            <animateMotion
              dur={firstAnimDur}
              path="m 0 0 l 600 0"
              begin="startButton.click"
              fill="freeze" />
          </circle>
        </mask>

        <circle id="intersect" cx="800" cy="200" r="100"
          className={`${animStyles.circle} ${animStyles.black}`}
          fill="black"
          mask="url(#mask-intersect)">
          <animateMotion
            id="intersectAnimation"
            dur={firstAnimDur}
            path="m 0 0 l -300 0"
            begin="startButton.click"
            fill="freeze" />
        </circle>


        <circle id="annoPrev" cx="100" cy="200" r="100"
          className={`${animStyles.circle} ${animStyles["anno-progress"]}`}>
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="500ms"
            fill="freeze"
            begin="intersectAnimation.end" />

          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1ms"
            fill="freeze"
            begin="annoPrev.click" />
        </circle>

        <circle id="annoNext" cx="900" cy="200" r="100"
          className={`${animStyles.circle} ${animStyles["anno-progress"]}`}>
          <animate
            attributeName="opacity"
            from="0" to="1" dur="500ms"
            fill="freeze"
            begin="intersectAnimation.end" />

          <animate
            attributeName="opacity"
            from="1" to="0" dur="1ms"
            fill="freeze"
            begin="annoNext.click" />

        </circle>

        <rect
          id="startButton"
          x="460"
          y="350"
          rx="5"
          height="25"
          width="80"
          fill="#EFEFEF55"
          stroke="black"
          stroke-width="1" />

        <text x="500" y="370" text-anchor="middle">
          Begin
        </text>


      </svg>
    </div>
  )
}

function useHidePopup(ref) {
  useEffect(() => {
    function handleClickOutsideRef(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("todo code to close ref element")
      }
    }

    window.addEventListener("mousedown", handleClickOutsideRef);
    return () => {
      window.removeEventListener("mousedown", handleClickOutsideRef);
    }
  }, [ref]);
}

{/* <div 
        ref={overlayRef}
        className={styles.announcement + " announcement-mobile"}>
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

      </div> */}