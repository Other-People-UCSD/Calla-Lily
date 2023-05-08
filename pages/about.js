import Layout from '@/components/layout';
import contentStyles from '@/styles/content.module.scss';
import animationStyles from "@/styles/animations.module.scss";
import teamStyles from "@/styles/team.module.scss";
import indexStyles from "@/styles/index.module.scss";
import { useTina } from 'tinacms/dist/react';
import client from '@/tina/__generated__/client';
import { getSortedPostsData } from '@/lib/posts';

export default function About(props) {
  const {query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // console.log(data)
  return (
    <Layout genre title={"About"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <div className={contentStyles["landing-title"]}>
            <h1>(THE PEOPLE)</h1>
          </div>
        </div>
      </div>
      <div className={teamStyles["team_module"]}>
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
          instructions, please see our <a href="https://otherpeoplesd.com/submissions">Submissions</a> page.
        </p>

        <h2><strong>OUR MISSION</strong></h2>

        <div className={"center"}>
          <em>Other People<br />
            A place to explore the timeless human experience;<br />
            A place to revere the joys and struggles of our journeys through life;<br />
            A place to celebrate the uniqueness of the human spirit;<br />
            Through a fusion of Language, Art, Image, and Technology.<br /></em>
        </div>

        <br />

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

      <div className={teamStyles.team_module}>
        <div className={teamStyles.team_module_child}>
          <ul>
            <h2>Editor in Chief</h2>
            {
              data.team.editor_in_chief.map(member => {
                return <li key={member}><h3>/ {member}</h3></li>
              })
            }
          </ul>
        </div>
      </div>

      <div className={teamStyles.team_module}>
        <div className={teamStyles.team_module_child}>
          <ul>
            <h2>Editorial</h2>
            {
              data.team.editorial.map(member => {
                return <li key={member}><h3>/ {member}</h3></li>
              })
            }
          </ul>
        </div>
      </div>

      <div className={teamStyles.team_module}>
        <div className={teamStyles.team_module_child}>
          <ul>
            <h2>Design</h2>
            {
              data.team.design_team.map(member => {
                return <li key={member}><h3>/ {member}</h3></li>
              })
            }
          </ul>
        </div>
      </div>
      <div className={teamStyles.team_module}>
        <div className={teamStyles.team_module_child}>
          <ul>
            <h2>PR + Events</h2>
            {
              data.team.publicity_events.map(member => {
                return <li key={member}><h3>/ {member}</h3></li>
              })
            }
          </ul>
        </div>
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

  const allPostsData = getSortedPostsData();

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      allPostsData,
    },
  };
}