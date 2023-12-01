import { useState } from "react";
import carouselStyles from '@/styles/carousel.module.scss';
import homepageStyles from '@/styles/homepage.module.scss'
import Image from "next/image";


const poetryItems = [
  {
    "title": "I Sold My Soul At Sun God",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/temporariness-of-twenty-kyoko-downey.jpg",
    "image_caption": "",
  },
  {
    "title": "A Day at the Beach",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/a-day-at-the-beach-tammy-ding.jpg",
    "image_caption": "",
  },
  {
    "title": "to you a reply",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/to-you-a-reply-kevin-phan.jpg",
    "image_caption": "",
  },
];

const visualArtItems = [
  {
    "title": "Ascension",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/ascension-alperen-ayan.jpg",
    "image_caption": "",
  },
  {
    "title": "Invitation",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/invitation-boopala-arul.jpg",
    "image_caption": "",
  },
];

const fictionItems = [
  {
    "title": "The Twelve Zodiac Animals Visit",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/zodiac-animals-cover-helen-huang.png",
    "image_caption": "",
  },
  {
    "title": "Violations in the Guest Visitor Policy",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/violations-guest-visitor-policy-cover-amy-stukenholtz.jpg",
    "image_caption": "",
  },
];

const nonfictionItems = [
  {
    "title": "Cognates",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/cognates-kayla-weiss.jpg",
    "image_caption": "",
  },
  {
    "title": "Porcelain in Silks",
    "description": "",
    "item_link": "",
    "image_url": "/images/5/porcelain-in-silks-guyon-perez.jpg",
    "image_caption": "",
  },
];


export default function Carousel({ genre, contentAlign }) {
  const [curItem, setCurItem] = useState(0);
  

  let items = poetryItems;
  if (genre === 'poetry') {
    items = poetryItems;
  } else if (genre === 'visual') {
    items = visualArtItems;
  } else if (genre === 'fiction') {
    items = fictionItems
  } else if (genre === 'nonfiction' ) {
    items = nonfictionItems
  }

  function prevItem() {
    if (curItem === 0) {
      return setCurItem(items.length - 1);
    }
    setCurItem(curItem - 1)
  }

  function nextItem() {
    if (curItem === items.length - 1) {
      return setCurItem(0);
    }
    return setCurItem(curItem + 1)
  }

  return (
    <div className={`${carouselStyles.base} ${carouselStyles.base__genre}`}>
      <div className={carouselStyles.viewer}>
        {
          items.map((item, idx) => {
            return <Carousel__GenreItem key={idx} item={item} contentAlign={contentAlign}
              style={{ transform: `translate(-${curItem * 100}%)` }} />
          })
        }
      </div>
      <div className={`${carouselStyles.control} ${carouselStyles[`control--${contentAlign}`]}`}>
        <button className={`${carouselStyles.control__prev}`} onClick={prevItem}><LeftArrowIcon /></button>
        <button className={`${carouselStyles.control__next}`} onClick={nextItem}><RightArrowIcon /></button>
      </div>
    </div>
  )
}

function Carousel__GenreItem({ item, contentAlign, style }) {
  return (
    <div className={`${homepageStyles.block} ${carouselStyles.item} ${homepageStyles[`block--${contentAlign}`]}`} style={style}>
      <div className={homepageStyles.block__img}>
        <div className={homepageStyles.block__img__container}>
          <Image className={`${homepageStyles.img__cover}  ${homepageStyles[`img__cover--${contentAlign}`]}`}
            src={item.image_url} fill={true} 
            placeholder={'empty'}
            sizes={"(max-width: 768px) 100vw, 50vw"}/>
        </div>
        <div className={homepageStyles.block__img__caption}>Katie Gasper</div>
      </div>
      <div className={homepageStyles.block__text}>
        <p className={`text--heading_2 ${homepageStyles.block__title}`}>{item.title}</p>
        <p className={homepageStyles["text--body"]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eleifend ultricies accumsan. Quisque imperdiet nulla sagittis, euismod turpis sed, porta magna. Donec at elit vel diam vehicula ultrices. </p>
        <p>Nam hendrerit pretium aliquam. Nunc egestas, enim a venenatis imperdiet, justo...</p>
        <p>Click to read more.</p>
      </div>
    </div>
  )
}

const LeftArrowIcon = () => {
  return <svg width="48" height="84" viewBox="0 0 48 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.90576 41.9252C2.70259 41.7246 2.70831 41.3949 2.91831 41.2016L1.2248 39.3617L2.91831 41.2016L43.917 3.46591C44.0224 3.36885 44.109 3.34081 44.1765 3.33154C44.257 3.32048 44.3577 3.33165 44.4605 3.37783C44.5632 3.42402 44.6384 3.4919 44.6837 3.55948C44.7215 3.61611 44.7581 3.69946 44.7556 3.8428L43.4219 80.753C43.4194 80.8963 43.38 80.9783 43.3401 81.0335C43.2926 81.0995 43.2151 81.1646 43.1108 81.2071C43.0065 81.2496 42.9055 81.2572 42.8254 81.2433C42.7583 81.2316 42.6727 81.2005 42.5707 81.0997L2.90576 41.9252Z" stroke="#3E3E3E" strokeWidth="5" />
  </svg>
}

const RightArrowIcon = () => {
  return <svg width="48" height="84" viewBox="0 0 48 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44.8759 42.9249C45.0875 42.7314 45.0932 42.3999 44.8885 42.199L4.92481 2.98753C4.82276 2.88741 4.73725 2.8565 4.67004 2.84498C4.58995 2.83124 4.48911 2.83903 4.38514 2.88159C4.28116 2.92415 4.20381 2.98928 4.15637 3.05522C4.11655 3.11056 4.07728 3.19254 4.0748 3.33544L2.73998 80.3089C2.7375 80.4518 2.7739 80.5351 2.81177 80.5918C2.85691 80.6594 2.93194 80.7273 3.03438 80.7735C3.13682 80.8197 3.23732 80.8311 3.31784 80.8203C3.38541 80.8111 3.47194 80.7833 3.57739 80.6869L44.8759 42.9249Z" stroke="#3E3E3E" strokeWidth="5" />
  </svg>
}

