import Link from 'next/link';
import styles from '@/styles/footer.module.scss';
import formData from '@/data/forms.json';
import ThemeToggle from './ThemeToggle';

const defaultConfig = {
  'showGradient': false,
  'showMore': false,
  'showNewsletter': false,
}

export default function Footer({ pageType, footerConfig }) {
  // Updates values in the defaultConfig if they are provided in footerConfig
  const config = { ...defaultConfig, ...footerConfig }

  function getYear() {
    return new Date().getFullYear();
  }

  const gradient = config.showGradient ? `${styles.gradient}` : '';

  return (
    <footer className={`${styles.base} ${gradient}`}>
      <div className={styles.base__content}>

        {
          !pageType && config.showMore !== false &&
          <div className={styles.more} >
            <p className={`${styles.more__block__heading} text--heading_2`}>More Information</p>
            <div className={styles.more__grid}>
              <div className={styles.more__block}>
                <p className={`${styles.more__block__heading} text--heading_2`}>Submissions Info</p>
                <p>Our team reviews submissions individually based on quality, creativity, craft, and style, then convenes to determine the strongest pieces of the selection.</p>
                <p>For detailed submissions instructions, please see our <Link href="/submissions" >Submissions</Link> page.</p>
                {(formData.submissions_written || formData.submissions_visual) ?
                  <Link href="/submissions" >Submisssions are currently <strong>open</strong>.</Link>
                  :
                  <p>Submissions are currently <strong>closed</strong>.</p>
                }
              </div>

              <div className={styles.more__block}>
                <p className={`${styles.more__block__heading} text--heading_2`}>Team Applications</p>
                <ul className={styles.team__app__list}>
                  {formData.app_editorial &&
                    <li>
                      <p>Editorial</p>
                      <a href={formData.app_editorial}>[Apply Here!]</a>
                    </li>
                  }
                  {formData.app_content &&
                    <li>
                      <p>Content</p>
                      <a href={formData.app_content}>[Apply Here!]</a>
                    </li>
                  }
                  {formData.app_design &&
                    <li>
                      <p>Design</p>
                      <a href={formData.app_design}>[Apply Here!]</a>
                    </li>
                  }
                  {formData.app_website &&
                    <li>
                      <p>Web Dev/UI/UX</p>
                      <a href={formData.app_website}>[Apply Here!]</a>
                    </li>
                  }
                  {formData.app_social_media &&
                    <li>
                      <p>Social Media</p>
                      <a href={formData.app_social_media}>[Apply Here!]</a>
                    </li>
                  }
                  {formData.app_event_planning &&
                    <li>
                      <p>Event Planning</p>
                      <a href={formData.app_event_planning}>[Apply Here!]</a>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        }

        <div className={styles.nav}>
          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Explore Content</p>
            <FooterList col={formData.footer__c2} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Other Resources</p>
            <FooterList col={formData.footer__c3} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Follow Us!</p>
            <FooterList col={formData.footer__c4} />
          </div>
          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Accessibility</p>
            <ThemeToggle />
          </div>
        </div>
        <div className={styles.base__copyright}>
          <svg className={styles.opm__logo}><use href="/svg/sprites.svg#logo-vd-op-text" /></svg>
          <p className={styles.base__copyright__text}>
            {`© ${getYear()} All Rights Reserved`}<br />
            Version 4.5.9<br />
            Calla-Lily
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ col }) {
  return (
    <ul className={styles.nav__list}>
      {
        col.map((item, idx) => {
          return <li key={idx} className={styles.nav__list__item}>
            {
              item.outbound ? (
                <a href={item.url} target="_blank" rel="noreferer noopener" aria-label={item.aria_label}>{item.name}</a>
              ) : (
                <Link href={item.url} aria-label={item.aria_label}>{item.name}</Link>
              )
            }
          </li>
        })
      }
    </ul>
  )
}

export const NewsletterForm = ({ homepage }) => {
  const type = (homepage) ? `${styles.newsletter_homepage}` : `${styles.newsletter_footer}`;
  return <div className={type} id="mc_embed_signup">
    <form action="https://gmail.us4.list-manage.com/subscribe/post?u=4b1b080bf138808842bdfbe2b&amp;id=32695fe3bf" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
      <div id="mc_embed_signup_scroll">
        <label htmlFor="mce-EMAIL"
          className={`${styles.newsletter__label}`}>
          Sign Up For Our Newsletter!
        </label>

        <div className={styles.newsletter__inputbox}>
          <input
            type="email"
            defaultValue=""
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="EMAIL..."
            required
            className={styles.newsletter__input__email} />


          {/* <real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
          <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
            <input type="text" name="b_4b1b080bf138808842bdfbe2b_32695fe3bf" tabIndex="-1" defaultValue="" />
          </div>

          <input
            type="submit"
            value="SIGN UP!"
            name="subscribe"
            id="mc-embedded-subscribe"
            className={styles.newsletter__submit}
          />
        </div>
      </div>
    </form>
  </div>
}