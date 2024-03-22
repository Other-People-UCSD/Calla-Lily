import { useRouter } from "next/router";
import { useState } from "react";
import styles from '@/styles/posts.module.scss';

/**
 * Create an overlay that warns the user if they want to continue, otherwise send them back.
 * @param {String} description The text to warn what kind of content the user should be aware of 
 * @returns 
 */
const ContentWarning = ({ description }) => {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  // Send user back to the previous page. More UX-friendly than linking to a fixed page.
  const handleCancel = () => {
    router.back();
  }

  // Since scrolling is still possible while overlay is shown, always scroll to top of the work.
  const handleAccess = () => {
    window?.scrollTo(0,0);
    setShowOverlay(false);
  }

  return (
    <>
      {showOverlay &&
        <div className={styles.cw}>
          <div className={styles.cw__contentbox}>
            <p className={styles.cw__title}>CONTENT WARNING</p>
            <p>{description}</p>
            <p>Viewer discretion is advised. Proceed to view content?</p>
            <div className={styles.cw__btn__container}>
              <button onClick={handleCancel} className={`${styles.cw__btn} ${styles.cw__cancel}`}>Cancel</button>
              <button onClick={handleAccess} className={`${styles.cw__btn} ${styles.cw__enter}`}>Enter</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ContentWarning;
