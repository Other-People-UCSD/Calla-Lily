import Layout from '@/components/layout';
import contentStyles from '@/styles/content.module.scss';
import animationStyles from "@/styles/animations.module.scss";
import teamStyles from "@/styles/team.module.scss";
import { useTina } from 'tinacms/dist/react';
import client from '@/tina/__generated__/client';
import { getSortedPostsData } from '@/lib/posts';
import { useEffect } from 'react';

export default function About(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const forms = props.dataForms.forms;

  const teamKeys = ['editor_in_chief', 'editorial', 'design_team', 'publicity_events'];
  const teamTitles = ['Editor in Chief', 'Editorial', 'Design', 'PR + Events'];

  useEffect(() => {
    const teamDiv = document.getElementById('teamDiv');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gtag('event', 'team_viewed', {
          'value': 'true',
          'time': new Date()
        });
      }
    }, {
      root: null,
      threshold: 0.1
    })
    observer.observe(teamDiv)
  });

  // console.log(data)
  return (
    <Layout landingPage title={"About"}>
      <div className={teamStyles["team_module"]}>
        <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
          <h1>O(THE)R PEOPLE</h1>
        </div>
        <h2><strong>ABOUT US</strong></h2>
        <div>
          <p>Other People Literary Magazine at UC San Diego is the first student-run literary magazine and club.</p>

          <p>
            We publish biannually in the Fall and Spring and accept works of fiction, poetry, creative nonfiction,
            art,
            and photography. We wish to present the dynamic range of artistic capability inherent in UCSD students,
            to
            create an inclusive platform to share creative works, and to encourage literary and artistic exploration
            among all students. We seek to embrace our core principle of showcasing “O(the)r People,” or celebrating
            at
            once our diversity, our individual uniqueness, our shared experiences, and our collective journey
            through
            this world. Our hope is that Other People Magazine will become a permanent organization at the
            University of
            California, San Diego, and will remain an enduring outlet for student creativity.
          </p>
        </div>

        <h2><strong>SUBMISSIONS INFO</strong></h2>

        <p>
          Our Editorial team reviews submissions individually and votes on their favorite pieces based on quality,
          creativity, craft, and style. The team then convenes to determine the strongest pieces of the selection, the
          number of which is adjusted to fit the maximum length of the magazine publication. For detailed submissions
          instructions, please see our <a href="https://www.otherpeoplesd.com/submissions">Submissions</a> page.
        </p>

        <h2><strong>OUR MISSION</strong></h2>

        <div className={"center"}>
          <em>Other People<br />
            A place to explore the timeless human experience;<br />
            A place to revere the joys and struggles of our journeys through life;<br />
            A place to celebrate the uniqueness of the human spirit;<br />
            Through a fusion of Language, Art, Image, and Technology.</em>
        </div>

        <h2><strong>OUR STORY</strong></h2>

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

      <div className={contentStyles["application-grid-wrapper"]}>
        <h2>TEAM ROLES</h2>
        <ul className={contentStyles["application-grid"]}>
          <li>
            <h3>Editorial & Content</h3>
            <p>Editors review and edit submissions, then produce the pages of the magazine. Content writers create
              exclusive prose, interview submittors about their
              stories, and may write articles of their choice.</p>
            <p className={"center"}>
              {forms?.editorial &&
                <a href={forms.editorial}>(Apply Here!)</a>
              }

              {forms?.content && !forms?.editorial &&
                <a href={forms.content}>(Apply Here!)</a>
              }

              {!forms?.editorial && !forms?.content &&
                <>(Applications Closed)</>
              }
            </p>
          </li>
          <li>
            <h3>Design & Social Media</h3>
            <p>Design illustrators create artwork to complement accepted prose. We publish digital and print copies of
              issues, as well as designing inclusive access to artistic expression through our website.</p>
            <p className={"center"}>
              {forms?.design ?
                <a href={forms.design}>(Apply Here!)</a>
                :
                <>(Applications Closed)</>
              }
            </p>
          </li>
          <li>
            <h3>Event Planning</h3>
            <p>Promote the magazine through social media, plan open mic nights, fundraisers, socials, etc. Marketing and
              event planners help fund the magazine and increase our outreach beyond the campus.</p>
            <p className={"center"}>
              {forms?.events ?
                <a href={forms.events}>(Apply Here!)</a>
                :
                <>(Applications Closed)</>
              }
            </p>
          </li>
          <li>
            <h3>Web Development/UI/UX</h3>
            <p>The website developer/producer is responsible for publishing content to the website and implementing
              accessible designs to display to the public through frontend programming!</p>
            <p className={"center"}>
              {forms?.website ?
                <a href={forms.website}>(Apply Here!)</a>
                :
                <>(Applications Closed)</>
              }
            </p>
          </li>
        </ul>
      </div>

      <div id="teamDiv" className={teamStyles.team_module}>
        <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
          <h2>OUR TEAM</h2>
        </div>

        {
          teamKeys.map((key, index) => {
            return (
              <div key={index} className={teamStyles.team_module_child}>
                <ul>
                  <h2>{teamTitles[index]}</h2>
                  {
                    data.team[key].map(member => {
                      return <li key={member}><h3>/ {member}</h3></li>
                    })
                  }
                </ul>
              </div>
            );
          })
        }
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data = {}
  let query = {}
  let variables = { relativePath: `../data/team.json` }

  try {
    const res = await client.queries.team(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  let dataForms = {}
  let variablesForms = { relativePath: `../data/forms.json` }

  try {
    const res = await client.queries.forms(variablesForms)
    dataForms = res.data
  } catch {
    // swallow errors related to document creation
  }

  const allPostsData = getSortedPostsData();

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      dataForms: dataForms,
      allPostsData,
    },
  };
}
