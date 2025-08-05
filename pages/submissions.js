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
  const status = data.forms["submissions_written"] || data.forms["submissions_visual"];

  return (
    <Layout landingPage title={"Submissions"}>
      <div className={contentStyles["submissions-content"]}>
      <div className={`${animationStyles.cssanimation} ${animationStyles.sequence} ${animationStyles.fadeInBottom}`}>
          <h1>Submissions</h1>
      </div>
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
            { data.forms.submissions_written ? (<p><a href={data.forms.submissions_written}>Written Submissions</a></p>) : null}
            { data.forms.submissions_visual ? (<p><a href={data.forms.submissions_visual}>Visual Submissions</a></p>) : null }
          </>
          ) : (
            <TinaMarkdown content={data.forms.subsClosedText} />
          )
        }
        
        <p>(The list of submissions are often updated on our discord! <a href="https://discord.gg/ZT3Mx78Ar7" rel="noreferer noopener">https://discord.gg/ZT3Mx78Ar7</a> <strong>Last Updated 10/2</strong>)</p>

        <p>*Magazine submissions will be selected based on quality, originality, creativity, and the creator’s intent!</p>

        <h2 id="reading-period">Reading Period:</h2>

        <p>The editorial team will be reviewing and sending out acceptances on a rolling basis. Our waiting period is approximately three months, but this could vary.</p>

        <h2 id="what-we-accept">&zwj;What we accept:</h2>

        <ul>
          <li>Prose of any genre under 3k words</li>
          <li>Poetry</li>
          <li>Art (traditional or digital, short comics, photography, graphic text, etc). &zwj;</li>
          <li>We encourage you to submit spoken word, performance, experimental, cross-genre, and other data.forms of work!</li>
          <li>If you have a question about what we accept, please email us at otherpeopleucsd@gmail.com.<sup>[1]</sup></li>
        </ul>

        <h2 id="how-we-want-it">How we want it:</h2>
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

        <h2 id="who-we-accept-from">Who we accept from:</h2>

        <ul>
          <li>Current UCSD undergraduates</li>
          <li>Graduate students</li>
          <li>UCSD alumni graduated within the last 3 years&zwj;</li>
        </ul>

        <p>Short and sweet, right?</p>

        <h2 id="faq">FAQ</h2>
        <ul>
          <li>Q: Can we submit multiple submissions?
            <ul>
              <li>A: Yes. Please submit them in individual files. Please review the submission form for any restrictions.</li>
            </ul>
          </li>
          <li>Q: When do your submission periods usually open?
            <ul>
              <li>End of Spring Quarter - Early Fall Quarter</li>
              <li>Late Fall Quarter - End of Winter Quarter</li>
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
