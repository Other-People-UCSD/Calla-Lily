import Layout from "@/components/layout";
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import contentStyles from "@/styles/content.module.scss";
import postStyles from "@/styles/posts.module.scss";

export default function UCMagazines() {
  return (
    <>
      <Layout title={"UC Magazines"}>
        <div className={contentStyles.content}>
          <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
            <div className={indexStyles.IndexContainer}>
              <div className={indexStyles["landing-title"]}>
                <h1 style={{ fontSize: 2 + 'rem' }}>List of UC Creative Magazines & Journals</h1>
              </div>
            </div>
          </div>

          <p>The University of California system has dozens of magazines and journals highlighting the creative
            minds of their students. Yet none of the UC websites contain a collective listing of these magazines, so it is our duty
            as a student-led magazine to help students find their way to the creative voices across our UC system!
          </p>

          <p>All initial descriptions have been pulled directly from their about pages.</p>
          <p>To include your own description, logo, expected submissions timeline & who can submit, email us at
            otherpeopleucsd@gmail.com!</p>

          <p><strong>Last Updated: March 6, 2023</strong></p>

          <h2>UCSD Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://otherpeoplesd.com" target="_blank" rel="noopener">
                  OTHER PEOPLE Literary Arts Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.kaleidoscopedmag.com/" target="_blank" rel="noopener">
                  KALEIDOSCOPED Literary Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.facebook.com/trenducsd/" target="_blank" rel="noopener">
                  TREND Fashion & Lifestyle Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://alchemy.ucsd.edu/" target="_blank" rel="noopener">
                  Alchemy: A Journal of Translation</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2012</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.facebook.com/RevellationsUCSD/" target="_blank" rel="noopener">
                  Revellations</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1966?</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://miacucsd.wixsite.com/mysite" target="_blank" rel="noopener">
                  Multi-Identity Art Collective</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2017?</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://maximalistmagazine.wixsite.com/maximalist-magazin-1" target="_blank" rel="noopener">
                  Maximalist Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2022</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.antifragilezine.com/" target="_blank" rel="noopener">
                  Antifragile Zine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://fashionquarterly.wordpress.com/" target="_blank" rel="noopener">
                  FASHION QUARTERLY</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
            </li>
          </ul>


          <h2>UC Berkeley Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://berkeleyfictionreview.org/" target="_blank" rel="noopener">
                  Berkeley Fiction Review</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1981</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.ocf.berkeley.edu/~bpr/" target="_blank" rel="noopener">
                  Berkeley Poetry Review</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1974</span>
              </p>
            </li>
            <li>
              <p>
                <a href="http://www.baremagazine.org/" target="_blank" rel="noopener">
                  BARE Arts, Fashion, Lifestyle Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2007</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://ucbcluj.org/" target="_blank" rel="noopener">
                  UC Berkeley Comparitive Literature Undergraduate Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2011</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://ucbcluj.org/home-page-static/vagabond/" target="_blank" rel="noopener">
                  Vagabond Multilingual Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2002</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://transit.berkeley.edu/" target="_blank" rel="noopener">
                  TRANSIT Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2005</span>
              </p>
            </li>
          </ul>


          <h2>UC Davis Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://www.openceilingsmagazine.com/" target="_blank" rel="noopener">
                  open ceilings</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
            </li>
          </ul>


          <h2>UCI Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://faultline.sites.uci.edu/" target="_blank" rel="noopener">
                  Faultline Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1992</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/lucid/" target="_blank" rel="noopener">
                  LUCID</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/narchp/about/" target="_blank" rel="noopener">
                  Neon Anteater Renaissance</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/newforum/" target="_blank" rel="noopener">
                  New Forum</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1998</span>
              </p>
            </li>
          </ul>


          <h2>UCLA Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="http://aleph.humanities.ucla.edu/  " target="_blank" rel="noopener">
                  Aleph</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2005</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://internationalcenter.ucla.edu/programs-events/in-house-program" target="_blank"
                  rel="noopener">
                  Envelope: Art & Writing Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.westwinducla.com/" target="_blank" rel="noopener">
                  Westwind Journal of the Arts</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1957</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://uclaradio.com/" target="_blank" rel="noopener">
                  UCLA Radio</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1962</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://al-talib.org/" target="_blank" rel="noopener">
                  Al-Talib</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1990</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://femmagazine.com/" target="_blank" rel="noopener">
                  FEM</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1973</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://haam.org/" target="_blank" rel="noopener">
                  Ha&apos;Am</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1972</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://lagente.org/" target="_blank" rel="noopener">
                  La Gente</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1971</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://nommomagazine.com/" target="_blank" rel="noopener">
                  Nommo</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1968</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://outwritenewsmag.org/" target="_blank" rel="noopener">
                  OutWrite</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1979</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://pacificties.org/" target="_blank" rel="noopener">
                  Pacific Ties</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1977</span>
              </p>
            </li>

          </ul>


          <h2>UC Merced Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://thevernalpool.ucmerced.edu/" target="_blank" rel="noopener">
                  The Vernal Pool</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2014</span>
              </p>
            </li>
          </ul>
          <h2>UCR Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://audeamus.wixsite.com/ucjournal" target="_blank" rel="noopener">
                  Audeamus Multidisciplinary Honors Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2007</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://mosaiczine.com/" target="_blank" rel="noopener">
                  Mosaic Art & Literary Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1959</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://sarreview.ucr.edu/" target="_blank" rel="noopener">
                  Santa Ana River Review (MFA)</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2015</span>
              </p>
            </li>
          </ul>


          <h2>UCSB Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://spectrum.ccs.ucsb.edu/" target="_blank" rel="noopener">
                  Spectrum Literary Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1957</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://catalyst.english.ucsb.edu/" target="_blank" rel="noopener">
                  The Catalyst Contemporary Literary Arts Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1996</span>
              </p>
            </li>
          </ul>

          <h2>UCSC Magazines & Journals</h2>
          <ul>
            <li>
              <p><a href="https://scstudentmedia.org/organizations/" target="_blank" rel="noopener">List of student media
                publications</a></p>
            </li>
            <li>
              <p>
                <a href="https://alayanthology.com/" target="_blank" rel="noopener">
                  Alay</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://chinquapinucsc.com/" target="_blank" rel="noopener">
                  Chinquapin</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1978</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.cityonahillpress.com/" target="_blank" rel="noopener">
                  City on a Hill Press</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://eyecandyfilmjournal.org/" target="_blank" rel="noopener">
                  EyeCandy Film Journal</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/film-production-coalition/" target="_blank" rel="noopener">
                  Film Production Coalition</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://fishrap.live/" target="_blank" rel="noopener">
                  Fish Rap Live!</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1990</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://fruitcakemagazine.com/" target="_blank" rel="noopener">
                  Fruitcake</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2016</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://gaiamagsc.wordpress.com/" target="_blank" rel="noopener">
                  Gaia</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2009</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://sites.google.com/view/kalopsiaucsc" target="_blank" rel="noopener">
                  Kalopsia</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2017</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.kzsc.org/podcasts/" target="_blank" rel="noopener">
                  KZSC</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://leviathanjewishjournal.com/" target="_blank" rel="noopener">
                  Leviathan Jewish Journal</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://studentmediawebdev4.wixsite.com/matchboxmagazine" target="_blank" rel="noopener">
                  Matchbox</a>
              </p>
            </li>
            <li>
              <p>
                <a href="http://sctv.ucsc.edu/ots/" target="_blank" rel="noopener">
                  On the Spot</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://redwheelbarrowanthology.org/" target="_blank" rel="noopener">
                  Red Wheelbarrow Anthology</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://scientificslug.com/" target="_blank" rel="noopener">
                  Scientific Slug</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2013</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/" target="_blank" rel="noopener">
                  SCTV</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://shutterslugphotography.org/" target="_blank" rel="noopener">
                  Shutterslug Photography</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2016</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/slug-works/" target="_blank" rel="noopener">
                  Slugworks Animation</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2015</span>
              </p>
            </li>
            <li>
              <p>
                <a href="https://twanaspress.com/" target="_blank" rel="noopener">
                  TWANAS</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1979</span>
              </p>
            </li>
          </ul>

          <hr />

          <h2>UCSD Magazines & Journals</h2>
          <ul className={postStyles["uc-cards"]}>
            <li>
              <p>
                <a href="https://otherpeoplesd.com" target="_blank" rel="noopener">
                  OTHER PEOPLE Literary Arts Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
              <p>Other People is the first student-run literary arts magazine at UCSD. We wish to present the dynamic
                range of artistic capability inherent in UCSD students, to create an inclusive platform to share
                creative works, and to encourage literary and artistic exploration among all students. We seek to
                embrace our core principle of showcasing &quot;O(the)r People,&quot; or celebrating at once our diversity, our
                individual uniqueness, our shared experiences, and our collective journey through this world. </p>
            </li>
            <li>
              <p>
                <a href="https://www.kaleidoscopedmag.com/" target="_blank" rel="noopener">
                  KALEIDOSCOPED</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
              <p>KALEIDOSCOPED is a MFA-run literary magazine especially interested in publishing literary and visual art
                that makes use of cross-genre, hybrid, experimental, unusual, or fragmented forms, and in turn allows us
                to imagine the world from its creator&apos;s unique position within it. We welcome works which contend with
                historical and ongoing racial and colonial violence in any of its forms.</p>
            </li>
            <li>
              <p>
                <a href="https://www.facebook.com/trenducsd/" target="_blank" rel="noopener">
                  TREND Fashion & Lifestyle Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
              <p>TREND is a biannual student-run fashion and lifestyle magazine. We are a team of student artists,
                designers, writers, photographers, stylists and marketing managers. This magazine is the perfect place
                to be in for anyone with a creative mind and a love for fashion.</p>
            </li>
            <li>
              <p>
                <a href="https://alchemy.ucsd.edu/" target="_blank" rel="noopener">
                  Alchemy: A Journal of Translation</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2012</span>
              </p>
              <p>Alchemy is committed to publishing quality, contemporary translations of poetry, fiction, and non-fiction
                creative writing. By dedicating our journal to the publication of high quality translations by students
                and emerging translators, we aim to encourage a new generation of translators. We publish creative
                translations and adaptations, including homophonic, homolinguistic, and other poetic forms. It is our
                belief that translation can teach us new things about writing and about language itself.</p>
            </li>
            <li>
              <p>
                <a href="https://www.facebook.com/RevellationsUCSD" target="_blank" rel="noopener">
                  Revellations</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1966</span>
              </p>
              <p>Revellations is a Revelle-based student-run publication committed to fostering and improving individual’s
                writing capabilities in the genre of their choice. We provide a creative outlet for the Revelle
                community and encourage self-expression through all written mediums! Check us out at our
                <a href="https://www.facebook.com/RevellationsUCSD" target="_blank" rel="noopener">Facebook page</a>
                and send us a message if you&apos;re interested in joining!
              </p>
            </li>
            <li>
              <p>
                <a href="https://miacucsd.wixsite.com/mysite/" target="_blank" rel="noopener">
                  Multi-Identity Art Collective</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2017</span>
              </p>
              <p>
                Multi-Identity Art Collective (MIAC) is an intersectional art group geared toward no one in particular because we
                take just about everyone! We&apos;re just a big family of artists from different experience levels, majors, and
                backgrounds. It doesn&apos;t matter if this is the first time you&apos;ve touched a pencil or if you&apos;ve been doing art since
                you could hold one. We welcome all identities, skill levels, specialties, and majors to come make art with their
                fellow artists!
              </p>
            </li>
            <li>
              <p>
                <a href="https://www.antifragilezine.com/" target="_blank" rel="noopener">
                  Antifragile Zine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
              <p>(Not affiliated with UCSD) Antifragile is an artist collective, media platform, and independent magazine
                created by and for youth artists. Our mission is to highlight and uplift marginalized and
                underrepresented voices and creatives of color so that they can tell the stories that often get pushed
                aside. We are a haven for youth artists, especially those who have felt unseen in mainstream media, to
                feel both safe, supported, and beautiful, as well as angry and loud and heard. </p>
            </li>
            <li>
              <p>
                <a href="https://fashionquarterly.wordpress.com/" target="_blank" rel="noopener">
                  FASHION QUARTERLY</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
              <p>Fashion Quarterly (FQ) is a premier student-run fashion publication active on <a
                href="https://www.facebook.com/fqmag/" target="_blank" rel="noopener">Facebook</a>. We collaborate
                with students and locals to produce semi-quarterly publications each year. In addition to our
                semi-quarterly publications, we also actively release content throughout the year on our blog</p>
            </li>
          </ul>

          <h2>UC Berkeley Magazines & Journals</h2>
          <ul className={postStyles["uc-cards"]}>
            <li>
              <p>
                <a href="https://berkeleyfictionreview.org/" target="_blank" rel="noopener">
                  Berkeley Fiction Review</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1981</span>
              </p>
              <p>The <em>Berkeley Fiction Review</em> is a UC Berkeley undergraduate, student-run publication. We look for
                innovative short fiction that plays with form and content, as well as traditionally constructed stories
                with fresh voices and original ideas. We invite submissions of previously unpublished short stories
                year-round and publish annually.</p>
            </li>
            <li>
              <p>
                <a href="https://www.ocf.berkeley.edu/~bpr/" target="_blank" rel="noopener">
                  Berkeley Poetry Review</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1974</span>
              </p>
              <p>The <em>Berkeley Poetry Review</em> has featured the work of both new and established poets and writers,
                including Lawrence Ferlinghetti, Yusef Komunyakaa, Brenda Hillman, Czesław Miłosz, Cole Swensen, Robert
                Hass, Ishmael Reed, Thom Gunn, and many others from the Bay Area poetry community. We seek
                language-based and/or experimental writing, translations, art, and (less frequently) essays and
                interviews, and are particularly interested in work that complicates prevailing conceptions of race,
                gender, sexuality, ecology, poetic form, and narrative voice. We release our MIDTERM chapbook each
                December, and our annual issue the following May.</p>
            </li>
            <li>
              <p>
                <a href="http://www.baremagazine.org/" target="_blank" rel="noopener">
                  BARE Arts, Fashion, Lifestyle Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2007</span>
              </p>
              <p>BARE Magazine is UC Berkeley&apos;s premier arts, fashion, and lifestyle publication. Since its debut in 2007,
                BARE has gained prominence on campus, and has also garnered national recognition in publications such as
                the New York Times and Teen Vogue. An entirely student-run publication, BARE publishes a print
                publication once a semester</p>
              <p>BARE allows students the opportunity to collaboratively explore their interests in a range of fields
                including journalism, photography, styling, design, modeling, and marketing. BARE celebrates and engages
                with the diversity of Berkeley and the Bay Area, aiming to foster a community of creatively driven
                individuals.</p>
            </li>
            <li>
              <p>
                <a href="https://ucbcluj.org/" target="_blank" rel="noopener">
                  UC Berkeley Comparitive Literature Undergraduate Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2011</span>
              </p>
              <p>The UC Berkeley Comparative Literature Undergraduate Journal publishes premier undergraduate research in
                comparative texts and media, treating a broad range of topics including, but not limited to, theoretical
                literary discourse, international trends in literature, and comparisons of national literature.</p>
            </li>
            <li>
              <p>
                <a href="https://ucbcluj.org/home-page-static/vagabond/" target="_blank" rel="noopener">
                  Vagabond Multilingual Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2002</span>
              </p>
              <p>If a student is exploring the translation of a queer Cambodian novel into English, or if a student is
                expressing his cultural Chicano heritage through poetry, or if a student engages with film criticism to
                explore the representations of African American societies, these interdisciplinary but committed forms
                of writing are what Vagabond wants to highlight. Vagabond will publish multilingual creative, academic,
                and critical projects from translation, poetry, art criticism, and interviews with professors. We are
                dedicated to fostering diversity and unity through this magazine by giving a platform to students for
                them to share their voices and to embrace their cultural and linguistic legacies.</p>
            </li>
            <li>
              <p>
                <a href="https://transit.berkeley.edu/" target="_blank" rel="noopener">
                  TRANSIT Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2005</span>
              </p>
              <p>TRANSIT [ISSN 1551-9627], originating from the Department of German at the University of California,
                Berkeley, is the first refereed, multidisciplinary online journal dedicated to the critical inquiry of
                travel, migration, and multiculturalism in the German-speaking world. TRANSIT invites critical work, in
                English or German, from all areas in which movement and transition are major forces, from translation to
                travelogues and other forms of cultural transfer.</p>
            </li>
          </ul>

          <h2>UC Davis Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://www.openceilingsmagazine.com/" target="_blank" rel="noopener">
                  open ceilings</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
              <p>We at Mechanism Press are dedicated to the craft of writing and strive to foster an appreciation for
                literature in our community. Our goal is to empower unheard voices and provide UC Davis students, staff,
                faculty, and members of the community with an avenue for creative expression. We endeavor to capture a
                representative collection of our time, and preserve it in print, as we nurture opportunities for
                interdisciplinary collaboration in a publication bigger than the individual. By establishing this
                student-led press on campus, we overcome traditional barriers to publication to showcase a diversity of
                writers, while offering affiliates the opportunity to expand their academic portfolios. We aim to act as
                a mechanism by which a creator&apos;s work can be published and shared.</p>
            </li>
          </ul>


          <h2>UCI Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://faultline.sites.uci.edu/" target="_blank" rel="noopener">
                  Faultline Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1992</span>
              </p>
              <p>First published in 1992 by founding editor Alyn Warren, <em>Faultline</em> is UC Irvine&apos;s Pushcart
                prize-winning journal. Housed in UC Irvine&apos;s Department of English and produced by the graduate students
                of the Programs in Writing, <em>Faultline</em> features the work of emerging and established writers
                from the U.S. and abroad. The journal publishes new poetry, fiction, creative nonfiction, translations,
                and art in an annual spring issue.</p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/lucid/" target="_blank" rel="noopener">
                  LUCID</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2020</span>
              </p>
              <p>Lucid is an annual journal of first generation student writing published through the English Department&apos;s
                Composition Program. Representing a unique collaboration between students and first-gen faculty, Lucid
                provides a platform for first-gen students to express their identities and experiences, offering an
                essential space for dialogue about what it means to be part of a university. Lucid is building an
                embodied community doing the work of education.</p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/narchp/about/" target="_blank" rel="noopener">
                  Neon Anteater Renaissance</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2010</span>
              </p>
              <p>NAR is the Creative Works Journal published by the Campuswide Honors Collegium at the University of
                California, Irvine. We provide quarterly compilations of CHC students&apos; creative submissions, which range
                from poems and short stories, to photographs and computer graphics.</p>
            </li>
            <li>
              <p>
                <a href="https://sites.uci.edu/newforum/" target="_blank" rel="noopener">
                  New Forum</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1998</span>
              </p>
              <p>The New Forum works to create a vibrant, inviting space for UCI&apos;s undergraduate writers. We invite
                writers of all backgrounds to share their work with us. This journal publishes a quarterly journal. We
                accept student-written poetry, fiction, non-fiction, and artwork. Our events throughout the quarter
                include a launch party for the newest issue, open mic nights, and poetry readings.</p>
            </li>
          </ul>


          <h2>UCLA Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="http://aleph.humanities.ucla.edu/  " target="_blank" rel="noopener">
                  Aleph</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2005</span>
              </p>
              <p><em>Aleph</em> (pronounced “ah-lef”) is UCLA&apos;s only official journal that publishes undergraduate
                research in the humanities, social sciences, and behavioral sciences. Run by undergraduates,
                <em>Aleph</em> publishes select submissions online and in print with the support of our sponsor, the
                UCLA Undergraduate Research Center – Humanities, Arts, and Social Sciences.
              </p>
            </li>
            <li>
              <p>
                <a href="https://internationalcenter.ucla.edu/programs-events/in-house-program" target="_blank"
                  rel="noopener">
                  Envelope: Art & Writing Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2019</span>
              </p>
              <p>Envelope is an Art & Writing Magazine featuring creative work from UCLA&apos;s International Student, Scholar,
                and Staff community. When you open Envelope, you find poems, creative fiction, opinion pieces, digital
                art, drawings, paintings, and photography. The hope for this magazine is that it provides a platform for
                international students, scholars, and staff, both at UCLA and UCLA Extension to share their unique
                perspectives with the extended campus community and beyond.</p>
            </li>
            <li>
              <p>
                <a href="https://www.westwinducla.com/" target="_blank" rel="noopener">
                  Westwind Journal of the Arts</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1957</span>
              </p>
              <p>Westwind welcomes submissions from new and experienced writers and artists. We seek to cultivate and
                sustain networks between artists, writers, poets, and readers surpassing the bounds of UCLA&apos;s campus, in
                which we were founded.</p>
              <p>Reflective of our inclusion of a variety of different art forms, Westwind encourages work to abandon
                formulaic and traditional demands and expectations.</p>
            </li>
            <li>
              <p>
                <a href="https://uclaradio.com/" target="_blank" rel="noopener">
                  UCLA Radio</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1962</span>
              </p>
              <p>While our primary focus is delivering original and diverse radio content, UCLA Radio members work on art,
                design, web development, marketing, photography, audio production, and more. Our station strives to
                promote a safe, inclusive music scene in LA and provide a community for innovative, motivated students
                from different majors and backgrounds to explore their creativity, build practical skills, and discover
                the LA music and art scene.</p>
            </li>
            <li>
              <p>
                <a href="https://al-talib.org/" target="_blank" rel="noopener">
                  Al-Talib</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1990</span>
              </p>
              <p>Al-Talib provides an independent perspective on issues important to Muslim communities. Targeting a
                college-age audience at UCLA, we seek to create an outlet for activism and creativity on and off campus,
                a platform for representation of all facets of the Muslim-American communities and a safe space for
                sensitive topics. We believe that this sort of dialogue, no matter how uncomfortable it may be at times,
                is necessary in order for our community to appreciate and celebrate its diversity.</p>
            </li>
            <li>
              <p>
                <a href="https://femmagazine.com/" target="_blank" rel="noopener">
                  FEM</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1973</span>
              </p>
              <p>FEM, UCLA&apos;s feminist newsmagazine since 1973, is dedicated to the empowerment of all people, the
                recognition of gender diversity, the dismantling of systems of oppression, and the application of
                intersectional feminist ideology for the liberation of all peoples. FEM operates within an
                anti-capitalist, anti-imperialist, anti-racist framework. Our organization seeks to challenge oppression
                based on sexuality, gender, race, class, ability, religion, and other hegemonic power structures. We
                create a wide range of compassionate multimedia content that recenters narratives often rejected or
                ignored within mainstream media. Beyond journalism, FEM engages in actionable praxes by building
                coalitions with other campus and community members. As self-reflective feminists, we are committed to
                unlearning and relearning alongside our global audience as the socio-political landscape in which we are
                situated continues to transform.</p>
            </li>
            <li>
              <p>
                <a href="https://haam.org/" target="_blank" rel="noopener">
                  Ha&apos;Am</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1972</span>
              </p>
              <p>
                Ha&apos;Am has been the official student-run Jewish newsmagazine at UCLA since 1972. We are a hybrid, online
                and print publication that aims to inform both the UCLA student body and the larger Los Angeles
                community of Jewish happenings and opinions on campus. Our team strives to uphold Jewish values and to
                instill within our ranks journalistic integrity of the highest order. Together, we engage and grapple
                with our tradition in the hopes of enriching our diverse experiences.</p>
            </li>
            <li>
              <p>
                <a href="https://lagente.org/" target="_blank" rel="noopener">
                  La Gente</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1971</span>
              </p>
              <p>La Gente Newsmagazine, born from the Chicana/o movement, arose out of a need to represent the Latinx
                community and Latinx issues in UCLA and the greater Los Angeles area. We feature news and opinions that
                highlight our communities since 1971. We continue to provide the latest on art, culture, community, and
                university news and events relating to our communities.</p>
            </li>
            <li>
              <p>
                <a href="https://nommomagazine.com/" target="_blank" rel="noopener">
                  Nommo</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1968</span>
              </p>
              <p>Nommo helps Black students identify and clarify a vast array of attitudes and goals, and it is an
                invaluable step toward wider communication between Black students and the campus community and the
                community-at-large. The world that the news media offers to their Black audiences is almost totally
                white in both appearance and attitude, save for the moments where Black death enters as a spectacle. In
                response, Nommo seeks to give currency to the expression of Black power for Black people through the
                power of the written word. Nommo serves and elevates the voices and perspectives of the Afrikan
                Diaspora.</p>
            </li>
            <li>
              <p>
                <a href="https://outwritenewsmag.org/" target="_blank" rel="noopener">
                  OutWrite</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1979</span>
              </p>
              <p>OutWrite Newsmagazine strives to build a growing educational platform through a multi-media approach that
                uplifts and empowers the often silenced voices of the incredibly diverse queer community. We aim to
                challenge dominant cisheteronormative narratives through an unapologetically anti-queerphobic,
                anti-racist, and progressive lens.</p>
            </li>
            <li>
              <p>
                <a href="https://pacificties.org/" target="_blank" rel="noopener">
                  Pacific Ties</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1977</span>
              </p>
              <p>We are the oldest student-run Asian Pacific Islander Desi American newsmagazine in the nation. Publishing
                at UCLA since 1977, we showcase rich and diverse stories about the Asian Pacific Islander Desi American
                community on and off campus through news and commentary.</p>
              <p>We create an on-going dialogue that offers insight into the dynamics of being an APIDA. Pacific Ties
                serves to challenge the perceptions of APIDA identity as well as to celebrate the achievements of the
                communities we all have ties to.</p>
            </li>

          </ul>


          <h2>UC Merced Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://thevernalpool.ucmerced.edu/" target="_blank" rel="noopener">
                  The Vernal Pool</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2014</span>
              </p>
              <p>As the leading creative writing journal for UC Merced undergraduate students, The Vernal Pool provides an
                edited expressive space for the student body to publish original work and an open, accessible venue for
                audiences to read, appreciate, celebrate and respond.</p>
            </li>
          </ul>
          <h2>UCR Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://audeamus.wixsite.com/ucjournal" target="_blank" rel="noopener">
                  Audeamus Multidisciplinary Honors Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2007</span>
              </p>
              <p>The Audeamus journal publishes works of all mediums &mdash; from research papers to artwork and
                photography to musical scores &mdash; basically anything reproducible on paper. Audeamus is produced by
                UCR University Honors students of all disciplines and majors; the students do everything from research
                and advertisement, to journal design and submissions. Flipping through the pages of any issue, you can
                find an organic chemistry research paper right next to a literary analysis, and just down the table of
                contents, you might find some photography or a biology paper</p>
            </li>
            <li>
              <p>
                <a href="https://mosaiczine.com/" target="_blank" rel="noopener">
                  Mosaic Art & Literary Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1959</span>
              </p>
              <p>In 1959, Mosaic began as a small group of poets, and we&apos;re still going strong nearly 60 years later,
                having expanded into a home for all writers, musicians, and artists. We are completely
                undergraduate-run, and publish one volume of prose, poetry, and art every year. But that&apos;s not
                all&mdash;we also host a number of community outreach events (including our popular Open Mic Nights) in
                order to promote and nurture the Riverside art and literary scene.</p>
            </li>
            <li>
              <p>
                <a href="https://sarreview.ucr.edu/" target="_blank" rel="noopener">
                  Santa Ana River Review (MFA)</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2015</span>
              </p>
              <p>The Santa Ana River Review is an online literary and arts journal dedicated to biannually publishing bold
                new works in visual art, nonfiction, fiction, poetry, and drama. Led by the students of the Creative
                Writing and Writing for the Performing Arts graduate program at UCR, we work to publish literature and
                art that reflect the diversity of our community in Southern California and beyond. We are especially
                interested in publishing work by BIPOC and LGBTQ+ creatives</p>
            </li>
          </ul>


          <h2>UCSB Magazines & Journals</h2>
          <ul>
            <li>
              <p>
                <a href="https://spectrum.ccs.ucsb.edu/" target="_blank" rel="noopener">
                  Spectrum Literary Journal</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1957</span>
              </p>
              <p>We are an annual journal of art and literature published by the University of California Santa Barbara&apos;s
                College of Creative Studies, founded in 1957 by Marvin Mudrick. Our mission is to publish a spectrum of
                voices, genres, and topics in each issue that encompass a wide range of human experiences. We value high
                quality work that doesn&apos;t fit in anywhere else--strange, brilliant, or funny pieces that make us come
                back again and again.</p>
              <p>Spectrum has a storied history — in our sixty plus years, we&apos;ve published works by people like William
                Carlos Williams and Raymond Carver. But we&apos;re always looking for up-and-coming writers and artists and
                love being the first place to publish new voices.</p>
            </li>
            <li>
              <p>
                <a href="https://catalyst.english.ucsb.edu/" target="_blank" rel="noopener">
                  The Catalyst Contemporary Literary Arts Magazine</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1996</span>
              </p>
              <p>The Catalyst is itself an art object. Each issue will be unique, with depth through juxtaposition,
                arrangement and composition to create an aesthetic suited to the particular piece within the issue. We
                envision an environment that enables undergrads to participate in contemporary discussion about all
                ranges of literature and art, which will in turn, enrich inspiration and enthusiasm for original student
                work.</p>
            </li>
          </ul>


          <h2>UCSC Magazines & Journals</h2>
          <ul>
            <li>
              <p><a href="https://scstudentmedia.org/organizations/" target="_blank" rel="noopener">List of student media
                publications</a></p>
            </li>
            <li>
              <p>
                <a href="https://alayanthology.com/" target="_blank" rel="noopener">
                  Alay</a>
              </p>
              <p>Alay, in Tagalog, translates to “dedication” or “offering”, is an aspect housed under Bayanihan Community
                (formerly known as the Filipino Student Association) at UC Santa Cruz.</p>
              <p>Alay’s main goal as an aspect is to publish and showcase student artwork, and serve as an outlet for
                self-expression within the Bayanihan space. The publication, referred to as the anthology, consists of
                both textual and visual works, submitted by the Pilipinx community and our allies, and produced during
                spring quarter through Student Media.</p>
              <p>Although Alay is affiliated with Bayanihan, we also welcome non-Pilipinx contributors in order to
                emphasize our message of diversity.</p>
            </li>
            <li>
              <p>
                <a href="https://chinquapinucsc.com/" target="_blank" rel="noopener">
                  Chinquapin</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1978</span>
              </p>
              <p>For the past 42 years, we have been run entirely by undergraduate students of the University of
                California Santa Cruz. Chinquapin is a space for students to learn about the ins and outs of publishing;
                both as submitters and editors. Our mission is to provide a high quality, inclusive platform for
                undergraduate art.</p>
            </li>
            <li>
              <p>
                <a href="https://www.cityonahillpress.com/" target="_blank" rel="noopener">
                  City on a Hill Press</a>
              </p>
              <p>City on a Hill Press is produced by and for UCSC students. Our primary goal is to report and analyze
                issues affecting the student population and the Santa Cruz community. We also serve to watchdog the
                politics of the UC administration. While we endeavor to present multiple sides of a story, we realize
                our own outlooks influence the presentation of the news. The City on a Hill Press (CHP) collective is
                dedicated to covering underreported events, ideas and voices. Ideally, CHP’s pages will serve as an
                arena for debate, challenge, and ultimately, change.</p>
            </li>
            <li>
              <p>
                <a href="https://eyecandyfilmjournal.org/" target="_blank" rel="noopener">
                  EyeCandy Film Journal</a>
              </p>
              <p>EyeCandy Film Journal is an annually published, student-run media studies collection. Our aim is to focus
                on culturally relevant and compelling topics that expand our relationships with film, television, and
                new media forms. We hope that our publication will motivate readers to engage with media in a more
                in-depth, critical, and complex fashion, and act as a platform for the UCSC community to consider new
                and thoughtful perspectives on visual culture.</p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/film-production-coalition/" target="_blank" rel="noopener">
                  Film Production Coalition</a>
              </p>
              <p>The Film Production Coalition (FPC) is an organization dedicated to collaboratively making short films
                every quarter in small production groups, in a variety of genres. We don’t require any experience and
                are committed to teaching members all aspects of film production from start to finish.</p>
              <p>We also host a quarterly festival that is used to exhibit the work of FPC in addition to content produced
                by other Student Media organizations and independent filmmakers.</p>
            </li>
            <li>
              <p>
                <a href="https://fishrap.live/" target="_blank" rel="noopener">
                  Fish Rap Live!</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1990</span>
              </p>
              <p>Fishrap Live! is the premier satire publication at the University of California, Santa Cruz and 12 time
                winner of the Ms. Clam Chowder award for the worst tasting clam chowder in the entire United States.</p>
            </li>
            <li>
              <p>
                <a href="https://fruitcakemagazine.com/" target="_blank" rel="noopener">
                  Fruitcake</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2016</span>
              </p>
              <p>Fruitcake is a comic art magazine dedicated to the expression of creativity and ideas through visual
                media, particularly in the comic format. At Fruitcake we strive to provide a space for student artists
                to share their stories, thoughts, narratives, and opinions through such comics, cartoons, sequential
                art, and graphic novellas. We champion a diversity of style and place an emphasis on the message of
                artists’ work, as opposed to their technical training or years of experience. Besides providing a place
                for students to get published, we also hope to inspire community members to try their hand at art and
                expressing themselves visually because we believe that storytelling is one of the strongest ways of
                forming human connection, as it allows us to empathize and understand one another better than any other
                form of communication.</p>
            </li>
            <li>
              <p>
                <a href="https://gaiamagsc.wordpress.com/" target="_blank" rel="noopener">
                  Gaia</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2009</span>
              </p>
              <p>Gaia Magazine is the student-run environmental magazine at the University of California, Santa Cruz. It
                aims to provide coverage of sustainability-related issues and initiatives on, or linked to, the UCSC
                campus, as well as the broader community, in order to further awareness and inspire constructive action.
                Gaia expresses and promotes the student vision of sustainability at UCSC and also strives to practice
                the sustainability it promotes by printing locally on recycled paper using soy-based ink and conserving
                resources via online expansion. Gaia welcomes submissions from UCSC students, publishing online content
                year round in addition to an annual print issue in the Spring.</p>
            </li>
            <li>
              <p>
                <a href="https://sites.google.com/view/kalopsiaucsc" target="_blank" rel="noopener">
                  Kalopsia</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2017</span>
              </p>
              <p>Kalopsia is an undergraduate philosophy journal based in the University of California, Santa Cruz.
                Dedicated to the seeking of truth, beauty, and their potential disjunction, Kalopsia accepts visual art,
                poetry, and philosophical papers that demonstrate this pursuit. It is a space for UCSC undergraduates to
                display their scholarship, learn from their peers, and become a part of a shared academic experience.
                All topics of inquiry are welcome, and undergraduates from all disciplines are encouraged to submit
                their work.</p>
            </li>
            <li>
              <p>
                <a href="https://www.kzsc.org/podcasts/" target="_blank" rel="noopener">
                  KZSC</a>
              </p>
              <p>KZSC is a noncommercial, educational, community radio station and student-run organization at UC Santa
                Cruz. At our core, we are curators, journalists, and advocates of inclusivity and the collaborative
                arts. We at KZSC share the goal of uplifting alternative and underrepresented voices in the media. This
                includes, but is not limited to: women; cultural, ethnic and racial minorities; people of all sexual
                orientations; gender identities; as well as seniors and those with disabilities. </p>
            </li>
            <li>
              <p>
                <a href="https://leviathanjewishjournal.com/" target="_blank" rel="noopener">
                  Leviathan Jewish Journal</a>
              </p>
              <p>Leviathan Jewish Journal is the Jewish publication at UC Santa Cruz. For almost 50 years, dating back to
                when UC Santa Cruz first opened, Leviathan Jewish Journal publishes articles, columns, news, recipes
                stories and artwork from students pertaining to the Jewish community and experience. Pick up a copy of
                our latest edition at the libraries and cafes around campus as well at select Synagogues and Jewish
                community centers throughout California.</p>
            </li>
            <li>
              <p>
                <a href="https://studentmediawebdev4.wixsite.com/matchboxmagazine" target="_blank" rel="noopener">
                  Matchbox</a>
              </p>
              <p>Matchbox Magazine is a UC-wide collaborative creative writing project. We publish prose, poetry, art,
                music and spoken word created by students throughout the UC system, and send about 50 copies of our
                magazine to the literature departments at each UC school.</p>
            </li>
            <li>
              <p>
                <a href="http://sctv.ucsc.edu/ots/" target="_blank" rel="noopener">
                  On the Spot</a>
              </p>
              <p>From writing and acting to producing and editing, On The Spot (OTS) does it all. OTS strives to provide
                quality entertainment programming, while offering students hands-on experience with television
                production. OTS is a student-run broadcast organization that produces numerous television shows
                including sketch-comedy shows, music videos, and psychological thrillers.</p>
            </li>
            <li>
              <p>
                <a href="https://redwheelbarrowanthology.org/" target="_blank" rel="noopener">
                  Red Wheelbarrow Anthology</a>
              </p>
              <p>Red Wheelbarrow is an annually-published anthology. We showcase the creative and critical wordks of
                current students, promoting the talent and diversity of our community.</p>
            </li>
            <li>
              <p>
                <a href="https://scientificslug.com/" target="_blank" rel="noopener">
                  Scientific Slug</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2013</span>
              </p>
              <p>The mission of Scientific Slug is to showcase scientific research and science education through
                journalism and creative works. We deeply value diversity, activism, and collaboration throughout the
                science community, by engaging with a diverse number of communities on campus. What sets Scientific Slug
                apart is that we are a student-run science magazine and aim to communicate science in a way that is
                accessible to an audience of scientists and non-scientists alike, in turn fostering an environment where
                scientific and artistic collaboration can flourish. We hope to provide the opportunity for our members
                to learn the technical processes of producing a magazine and to improve journalism skills.</p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/" target="_blank" rel="noopener">
                  SCTV</a>
              </p>
            </li>
            <li>
              <p>
                <a href="https://shutterslugphotography.org/" target="_blank" rel="noopener">
                  Shutterslug Photography</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2016</span>
              </p>
              <p>Shutterslug is the official student-run photography organization at UCSC. Through meetings, events,
                photo-critiques, and collaboration, we welcome students of all skill levels and hope to foster a
                tight-knit community committed to advancing their craft. Members are encouraged to strengthen their
                leadership skills, develop their creativity, and gain exposure by having their work displayed on our
                media platforms and potentially published in a magazine – Lightleak – created by Shutterslug members.
              </p>
            </li>
            <li>
              <p>
                <a href="https://studentcabletelevision.com/slug-works/" target="_blank" rel="noopener">
                  Slugworks Animation</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 2015</span>
              </p>
              <p>
                Slugworks Animation is a club at UCSC where members make animated short films! We create all forms of
                animation in 2-D, 3-D, and stop motion. Our club is great for anyone interested in writing,
                storyboarding, animating, voice acting, editing, or composing music for our short films.</p>
            </li>
            <li>
              <p>
                <a href="https://twanaspress.com/" target="_blank" rel="noopener">
                  TWANAS</a> <span className={`${postStyles.est} ${postStyles.gold}`}>Est. 1979</span>
              </p>
              <p>TWANAS is dedicated to providing a media outlet for students of color to write about the issues that
                affect students of color. TWANAS facilitates an open inclusive space for individuals at UCSC who hold
                various identities across all intersections creatively expressing issues that affect all communities of
                color through journalistic and artistic mediums. TWANAS accomplishes this goal by producing a
                publication twice a year, hosting a website online and engaging in critical dialogue at member meetings.
              </p>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
}