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

