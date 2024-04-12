import Link from 'next/link';
import styles from '@/styles/footer.module.scss';
import { SpriteIcon } from '@/pages';
import formData from '@/data/forms.json';

const col1 = [
  {
    "name": "Issuu ->",
    "link": "https://issuu.com/otherpeoplesd",
    "outbound": true,
    "label": "Issuu"
  }];

const col2 = [
  {
    "name": "Poetry",
    "link": "/poetry",
    "outbound": false
  },
  {
    "name": "Fiction",
    "link": "/fiction",
    "outbound": false
  },
  {
    "name": "Nonfiction",
    "link": "/nonfiction",
    "outbound": false
  },
  {
    "name": "Visual Arts",
    "link": "/visualarts",
    "outbound": false
  },
  {
    "name": "Search",
    "link": "/search",
    "outbound": false
  },
]

const col3 = [
  {
    "name": "About",
    "link": "/about",
    "outbound": false
  },
  {
    "name": "Team Applications",
    "link": "/about#team",
    "outbound": false
  },
  {
    "name": "Submissions",
    "link": "/submissions",
    "outbound": false
  },
  {
    "name": "Community <3",
    "link": "/uc-magazines",
    "outbound": false,
    "label": "Community"
  },
]

const col4 = [
  {
    "name": "Instagram",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Facebook",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Discord",
    "link": "/",
    "outbound": true
  },
  {
    "name": "Email",
    "link": "/",
    "outbound": false
  },
]

const defaultConfig = {
  'showGradient': true,
  'showMore': true,
  'showNewsletter': true,
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
            <SpriteIcon id="vd-fill" fill="#FFFEFB" stroke="#FFFEFB" strokeWidth="1px" width="150" height="150"
              className={styles['svg--accent']} style={{ right: "5vw", top: "-80px" }} />

            <p className={`${styles.more__block__heading} text--heading_2`}>More Information</p>
            <hr />
            <div className={styles.more__grid}>
              <div className={styles.more__block}>
                <p className={`${styles.more__block__heading} text--heading_2`}>Submissions Info</p>
                <p>Our Editorial team reviews submissions individually and votes on their favorite pieces based on quality, creativity, craft, and style. The team then convenes to determine the strongest pieces of the selection, the number of which is adjusted to fit the maximum length of the magazine publication.</p>
                <p>For detailed submissions instructions, please see our Submissions page.</p>
              </div>

              <div className={styles.more__block}>
                <p className={`${styles.more__block__heading} text--heading_2`}>Team Applications</p>
                <p></p>
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

        {
          !pageType && config.showNewsletter !== false &&
          <NewsletterForm />
        }

        <div className={styles.nav}>
          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Our Prints</p>
            <FooterList col={col1} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Explore Content</p>
            <FooterList col={col2} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Other Resources</p>
            <FooterList col={col3} />
          </div>

          <div className={styles.nav__column}>
            <p className={styles.nav__header}>Follow Us!</p>
            <FooterList col={col4} />
          </div>
        </div>
        <div className={styles.base__copyright}>
          <svg className={styles.opm__logo}><use href="/svg/accents.svg#logo-vd-op-text" /></svg>
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
                <a href={item.link} target="_blank" rel="noreferer noopener" aria-label={item.label}>{item.name}</a>
              ) : (
                <Link href={item.link} aria-label={item.label}>{item.name}</Link>
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
          className={`${styles.newsletter__label} text--heading_2`}>
          Sign Up For Our Newsletter!
        </label>

        <hr />

        <div className={styles.newsletter__inputbox}>
          <input
            type="email"
            defaultValue=""
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="EMAIL"
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