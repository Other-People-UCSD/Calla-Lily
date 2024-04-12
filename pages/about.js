import Layout from '@/components/layout';
import animationStyles from "@/styles/animations.module.scss";
import styles from "@/styles/about.module.scss";
import { useTina } from 'tinacms/dist/react';
import client from '@/tina/__generated__/client';

export default function About(props) {
  const footerConfig = {
    'showGradient': false,
    'showMore': true,
    'showNewsletter': true,
  };

  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: { ...props.data, ...props.dataForms },
  })

  function TeamList({ cmsKeys, labels }) {
    if (cmsKeys.length !== labels.length) {
      throw Error('TeamList: Each key must have a label!');
    }

    return cmsKeys.map((key, index) => {
      return (
        <ul key={index} className={styles.team__list}>
          <h4 className={`text--heading_3`}>{labels[index]}</h4>
          {
            data.team[key].map(member => {
              return <li key={member}>/ {member}</li>
            })
          }
        </ul>
      );
    })
  }

  return (
    <Layout landingPage title={"About"} footerConfig={footerConfig} className={styles.main}>
      <div className={styles.content}>
        <div className={`${animationStyles.fadeInBottom} title__accent`}>
          <h1 className={`text--heading_1 text__landing--heading_1`} aria-label="Other People">
            <span className="text--shadow">O</span>(THE)R PE<span className="text--shadow">O</span>PLE
          </h1>
        </div>

        <p className={`${styles.values} ${styles['values--right']}`}>A place to explore the timeless human experience;</p>

        <div className={styles.block__about}>
          <svg className={styles.svg__about}>
            <circle cx="300" cy="300" r="300" />
          </svg>

          <h2 className={`text--heading_1`}>About Us</h2>
          <p>Other People Literary Magazine at UC San Diego is the first student-run literary magazine and club.</p>
          <p>
            We publish biannually in the Fall and Spring and accept works of fiction, poetry, creative nonfiction, art,
            and photography. We wish to present the dynamic range of artistic capability inherent in UCSD students, to
            create an inclusive platform to share creative works, and to encourage literary and artistic exploration
            among all students. We seek to embrace our core principle of showcasing “O(the)r People,” or celebrating at
            once our diversity, our individual uniqueness, our shared experiences, and our collective journey through
            this world. Our hope is that Other People Magazine will become a permanent organization at the University of
            California, San Diego, and will remain an enduring outlet for student creativity.
          </p>
        </div>


        <div className={styles.block__story}>
          <h2 className={`text--heading_1`}>Our Story</h2>
          <p className={styles.values}>A place to revere the joys and struggles of our journeys through life;</p>

          <p>
            Other People Magazine began as a dream shared by a group of writing and art enthusiasts. The magazine&apos;s
            founders all had the same wish—for UCSD to have a place where literary and artistic creativity could
            flourish on a predominately STEM-focused campus. When a Fall 2019 writing workshop class brought this group
            of Literature/Writing majors and art lovers together, their dream began to become reality. Together, the
            founders inspired each other to embark on the journey of turning their dream into an enduring legacy of
            artistic expression on campus. And so Other People began—in a flurry of mission-statement writing, logo
            designing, team recruitment, flyer posting, and excited member meetings late at night.
          </p>

          <p>
            Gradually, a magazine and club began to take shape. We were thrilled by the outpouring of support and
            attendees from Other People&apos;s first informational session, as well as by the volume of creative work
            submitted to the magazine during the first submissions cycle. Drawing upon the strength of collaboration
            from students of many disciplines, backgrounds, and talents, the dream of Other People became reality in
            July 2020, which marked the publication of Other People Literary Magazine&apos;s first issue.
          </p>

          <p>
            This project was one that was months in the making. We could not have reached the milestone of publishing
            our first issue without the help of all those who supported Other People, who believed in us back when we
            were just a dream, who offered us their advice and wisdom, who shared with us their creativity. Thank you;
            you are our inspiration. We hope Other People is a reality that lives up to your dreams.
          </p>
        </div>

        <p className={`${styles.values} ${styles['values--right']}`}>A place to celebrate the uniqueness of the human spirit;</p>
        <div className={styles.block__roles}>
          <svg className={styles.svg__roles}>
            <circle cx="400" cy="400" r="400" />
          </svg>

          <h2 className={styles['text--clear-left']}>Creative Innovation</h2>

          <p>
            Our digital goal is to present creative work in a way that anyone can enjoy through accessible means.
            This requires heavy involvement in the digital publishing process by creating our own native products
            to showcase experimentative work. As a result, Other People&apos;s digital team operates at the forefront of next-gen techniques,
            optimizing fast performance and featuring machine learning to recommend additional works you may enjoy.
            We wish to show you an aesthetic that cannot be achieved by ordinary templates, as everything has been handcrafted with passion.
          </p>
          <p>
            Each collection has been selected from hundreds of works, and the submission bins continue to overflow with your creations.
            Our capacity to showcase influential works increases as we want our readers to experience the same emotions
            that the creators put into these fragments of fiction or reality. With every cycle of talent that passes through our organization,
            we have come to learn from each other&apos;s imagination and knowledge, polishing the ideas creators want to convey.
            Other People Magazine truly inspires young writers, artists, and performers to let their creativity cultivate.
          </p>
        </div>
      </div>

      <p className={`${styles.values} ${styles['values--center']}`}>Through a fusion of Language, Art, Image, and Technology.</p>
      <div className={styles.block__team}>
        <div className={styles.content}>
          <h2 id="team" className={`text--heading_1 ${styles.header}`}>Our Team</h2>

          <div className={`${styles.block__team__section} ${styles.block__team__editorial}`}>
            <h3 className={`text--heading_2`}>Editorial Team</h3>
            {data.forms.app_editorial && <a href={data.forms.app_editorial} className={styles.application__link}>[Apply to Editorial!]</a>}
            {data.forms.app_content && <a href={data.forms.app_content} className={styles.application__link}>[Apply to Content!]</a>}

            <p>Editors review submissions and often workshop with writers to edit accepted submissions for publishing. They may arrange the pages of the magazine to create a pleasant reading experience through the magazine.</p>
            <p>Content writers go through pitches, workshops with editors, and writers&apos; rooms to publish exclusive prose. They may interview submittors about their stories, and may write creative articles of their choice.</p>

            {/* <TeamList cmsKeys={['editor_in_chief']} labels={['Editor in Chief']} /> */}
            <div className={styles.block__team__lists}>
              <TeamList cmsKeys={['editor_in_chief', 'editorial', 'content']} labels={['Editor in Chief', 'Editors', 'Content Writers']} />
            </div>

            <svg className={styles.svg__editorial__bottom}>
              <circle cx="250" cy="250" r="250" />
            </svg>
          </div>

          <div className={`${styles.block__team__section} ${styles.block__team__design}`}>
            <h3 className={`text--heading_2`}>Design Team</h3>
            {data.forms.app_design && <a href={data.forms.app_design} className={styles.application__link}>[Apply to Design!]</a>}
            {data.forms.app_website && <a href={data.forms.app_website} className={styles.application__link}>[Apply to Digital (UI/UX/Dev)!]</a>}

            <p>Design illustrators create artwork to complement accepted prose or to feature onto many facets of our organization&apos;s culture. They design a stunning aesthetic for the physical and digital magazine publications.</p>
            <p>The digital team is responsible for publishing content to the website, designing for accessibility and aesthetic, reader retention, and building features through programming! They also keep internals organized for the other teams in the long run.</p>

            {/* <TeamList cmsKeys={['design_directors']} labels={['Design Directors']} /> */}
            <div className={styles.block__team__lists}>
              <TeamList cmsKeys={['design_directors', 'design', 'digital']} labels={['Design Directors', 'Designers', 'Digital Team']} />
            </div>

            <svg className={styles.svg__design__bottom}>
              <circle cx="200" cy="200" r="200" />
            </svg>
          </div>

          <div className={`${styles.block__team__section} ${styles.block__team__outreach}`}>
            <h3 className={`text--heading_2`}>Outreach Team</h3>
            {data.forms.app_social_media && <a href={data.forms.app_social_media} className={styles.application__link}>[Apply to Social Media!]</a>}
            {data.forms.app_event_planning && <a href={data.forms.app_event_planning} className={styles.application__link}>[Apply to Event Planning!]</a>}
            <p>Social media members design illustrations that follow what&apos;s trending to increase engagement with the community. They also create captivating previews for upcoming events and stories about to be published!</p>
            <p>Event planners plan open mic nights, fundraisers, socials, etc. and help fund magazine production for our community to enjoy!</p>

            <div className={styles.block__team__lists}>
              <TeamList cmsKeys={['outreach_directors', 'publicity_events']} labels={['Outreach Directors', 'PR/Events']} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.block__alumni}>
        <div className={styles.content}>
          <h2 className={`text--heading_1 ${styles.header}`}>Alumni</h2>
          <div className={styles.block__alumni__lists}>
            <TeamList cmsKeys={['alumni_editorial']} labels={['Editorial']} />
            <div>
              <TeamList cmsKeys={['alumni_design', 'alumni_pr']} labels={['Design', 'PR + Events']} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data = {};
  let query = {};
  let variables = { relativePath: `../data/team.json` };

  try {
    const res = await client.queries.team(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch {
    // swallow errors related to document creation
  }

  let dataForms = {};
  let variablesForms = { relativePath: `../data/forms.json` };

  try {
    const res = await client.queries.forms(variablesForms);
    dataForms = res.data;
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      dataForms: dataForms,
    },
  };
}
