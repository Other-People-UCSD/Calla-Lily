import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import styles from './stylesheet.module.scss';

export default function IconLibrary() {

  return (
    <>
      <h2>Iconography</h2>

      <div className={styles.icon__grid}>
        <div className={styles.icon__item}>
          <IconButton>
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
          <p>ArrowForwardIcon</p>
          <p>32px</p>
        </div>
        <div className={styles.icon__item}>
          <IconButton>
            <FacebookIcon fontSize="large" />
          </IconButton>
          <p>FacebookIcon</p>
          <p>32px</p>
        </div>
        <div className={styles.icon__item}>
          <IconButton>
            <InstagramIcon fontSize="large" />
          </IconButton>
          <p>InstagramIcon</p>
          <p>32px</p>
        </div>
        <div className={styles.icon__item}>
          <IconButton>
            <MailOutlineIcon fontSize="large" />
          </IconButton>
          <p>MailOutlineIcon</p>
          <p>32px</p>
        </div>
      </div>

      <h3>Accents</h3>
      <div className={styles.icon__grid}>
        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"circle-fill"} fill="black" width="32" height="32" />
          </IconButton>
          <p>#circle-fill</p>
          <p>32px</p>
        </div>
        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"circle-fill"} fill="violet" width="100" height="100" />
          </IconButton>
          <p>#circle-fill</p>
          <p>100px</p>
        </div>

        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"circle-outline"} stroke="black" strokeWidth="1px" width="32" height="32" />
          </IconButton>
          <p>#circle-outline</p>
          <p>32px, stroke 1px</p>
        </div>
        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"circle-outline"} stroke="black" strokeWidth="2px" width="100" height="100" />
          </IconButton>
          <p>#circle-outline</p>
          <p>100px, stroke 2px</p>
        </div>
      </div>
      <div className={styles.icon__grid}>
      <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"vd-fill"} stroke="black" fill="black" strokeWidth="0.2px" width="89" height="64" />
          </IconButton>
          <p>#vd-fill</p>
          <p>89x64, stroke 0.2px</p>
        </div>

        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"vd-fill"} stroke="green" fill="green" strokeWidth="1px" width="128px" height="120px" />
          </IconButton>
          <p>#vd-fill</p>
          <p>128px, stroke 1px, fill & stroke same-color</p>
        </div>

        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"vd-fill"} stroke="black" fill="green" strokeWidth="1px" width="128px" height="120px" />
          </IconButton>
          <p>#vd-fill</p>
          <p>128px, stroke 1px, fill green, stroke black</p>
        </div>
        
        
        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"vd-outline"} stroke="black" fill="black" width="64" height="64" />
          </IconButton>
          <p>#vd-outline</p>
          <p>64px, stroke 1px</p>
        </div>

        <div className={styles.icon__item}>
          <IconButton>
            <CircleAccent id={"vd-outline"} stroke="black" strokeWidth="3px" fill="gold" width="100" height="100" />
          </IconButton>
          <p>#vd-outline</p>
          <p>100px, stroke 3px</p>
        </div>
      </div>
    </>
  )
}

const IconButton = (props) => {

  return (
    <button>
      {props.children}
    </button>
  );
}

const CircleAccent = ({ id, className, ...props }) => {
  return <svg className={className} {...props}>
    <use href={`/svg/accents.svg#${id}`} />
  </svg>
}