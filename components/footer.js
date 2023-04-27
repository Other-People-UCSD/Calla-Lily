import footerStyles from '@/styles/footer.module.scss';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div id="mc_embed_signup">

      </div>

      <div>
        <Image src="/Calla-Lily/favicons/footer.svg" width={80} height={50.75} alt={"The People"}/>
        <h4>
          {`© ${getYear()} All Rights Reserved`}<br />
          Version 4.0.0<br />
          Calla-Lily</h4>
      </div>
    </footer>
  );

  function getYear() {
    return new Date().getFullYear();
  }
}