import Layout from '@/components/layout';
import contentStyles from '@/styles/content.module.scss';
import animationStyles from "@/styles/animations.module.scss";
import indexStyles from "@/styles/index.module.scss";
import client from '../tina/__generated__/client'
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { getSortedPostsData } from '@/lib/posts';

export default function Submissions(props) {
  const {query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const status = data.forms["written"] || data.forms["visual"];

  return (
    <Layout genre title={"Submissions"}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
        <div className={indexStyles.IndexContainer}>
          <div className={contentStyles["landing-title"]}>
          <h1>Submissions</h1>
          </div>
        </div>
      </div>
      <div className={contentStyles["submissions-content"]}>
        <div className={contentStyles["submissions-status"]}>
          <h4>
            {status ? (
              "Currently accepting submissions"
            ) : (
              "Currently closed"
            )
            }
          </h4>
        </div>

        { status ? (
          <>
            { data.forms.written ? (<p><a href={data.forms.written}>Written Submissions</a></p>) : null}
            { data.forms.visual ? (<p><a href={data.forms.visual}>Visual Submissions</a></p>) : null }
          </>
          ) : (
            <TinaMarkdown content={data.forms.subsClosedText} />
          )
        }

        {/* { data.forms.otherSubs.length > 0 ? (
          data.forms.otherSubs.map((submission) => {
            return <p key={submission}><a href={submission.link}>{submission.description}</a></p>
          })
        ): null} */}

        <p>(The list of submissions are often updated on our discord! <a href="https://discord.gg/Z9eFGkd9bU" rel="noreferer noopener">https://discord.gg/Z9eFGkd9bU</a>)</p>

        <p>*Magazine submissions will be selected based on quality, originality, creativity, and the creator’s intent!</p>

        <h1 id="reading-period">Reading Period:</h1>

        <p>The editorial team will be reviewing and sending out acceptances on a rolling basis. Our waiting period is approximately three months, but this could vary.</p>

        <h1 id="what-we-accept">&zwj;What we accept:</h1>

        <ul>
          <li>Prose of any genre under 3k words</li>
          <li>Poetry</li>
          <li>Art (traditional or digital, short comics, photography, graphic text, etc). &zwj;</li>
          <li>We encourage you to submit spoken word, performance, experimental, cross-genre, and other data.forms of work!</li>
          <li>If you have a question about what we accept, please email us at otherpeopleucsd@gmail.com.<sup>[1]</sup></li>
        </ul>

        <h1 id="how-we-want-it">How we want it:</h1>
        <ul>
          <li><strong>Please create an individual submission for each work.</strong></li>
          <li>Remove your name and other personally identifying information from the document. Files should be ANONYMIZED - do not include your name anywhere so that our team can review submissions anonymously.</li>
          <li>Written works: please submit a PDF in standard manuscript format.</li>
          <li>Only the piece’s title, word count, and story/poem should be contained in the PDF.</li>
          <li>Art: High fidelity .pdf, .jpg, .tiff accepted.
            <ul>
              <li>If you would like to submit a series, please create an individual submission for each work.</li>
            </ul>
          </li>
          <li>More detailed instructions are listed in the Google Form submission form as well! In this form, please answer the questions about the genre of your work, input your email address and name, and attach an <strong>anonymized</strong> copy of your work. Optional: tell us anything you want us to know about your work and its meaning.</li>
        </ul>

        <h1 id="who-we-accept-from">Who we accept from:</h1>

        <ul>
          <li>Current UCSD undergraduates</li>
          <li>Graduate students</li>
          <li>UCSD alumni graduated within the last 3 years&zwj;</li>
        </ul>

        <p>Short and sweet, right?</p>

        <h1 id="faq">FAQ</h1>
        <ul>
          <li>Q: Can we submit multiple submissions?
            <ul>
              <li>A: Yes. Please submit them in individual files. There is no limit to number of submissions as we review each work anonymously.</li>
            </ul>
          </li>
          <li>Q: When do your submission periods usually open?
            <ul>
              <li>A: End of Spring Quarter - Early Fall Quarter</li>
              <li>&amp; Late Fall Quarter - End of Winter Quarter</li>
            </ul>
          </li>
        </ul>

        <h4 id="1a-we-do-not-consider-previously-published-work">[1A] We do not consider previously published work.</h4>
        <h4 id="1b-currently-we-do-not-have-the-funds-to-pay-our-contributors">[1B] Currently, we do not have the funds to pay our contributors.</h4>
        <p><br /></p>



      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data = {}
  let query = {}
  let variables = { relativePath: `../data/forms.json` }
  try {
    const res = await client.queries.forms(variables)
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