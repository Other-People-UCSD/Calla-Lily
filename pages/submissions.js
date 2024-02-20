import Layout from '@/components/layout';
import styles from '@/styles/submissions.module.scss';
import animationStyles from "@/styles/animations.module.scss";
import client from '../tina/__generated__/client'
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function Submissions(props) {
  const { query, variables, data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const status = data.forms["written"] || data.forms["visual"];

  return (
    <Layout landingPage title={"Submissions"} className={styles.main} footerConfig={{ 'showMore': false }}>
      <div className={`${animationStyles.fadeInBottom} title__accent`}>
        <h1 className={`text--heading_1 text__landing--heading_1`} aria-label="Submissions">
          Submissi<span className="text--shadow">o</span>ns
        </h1>
      </div>
      <p className={styles.status}>
        {status ? (
          "Currently accepting submissions"
        ) : (
          "Currently closed"
        )
        }
      </p>

      <div className={styles.forms}>
        {status ? (
          <>
            {data.forms.written ? (<p><a href={data.forms.written}>Written Submissions</a></p>) : null}
            {data.forms.visual ? (<p><a href={data.forms.visual}>Visual Submissions</a></p>) : null}
          </>
        ) : (
          <TinaMarkdown content={data.forms.subsClosedText} />
        )
        }

        <p>(The list of submissions are often updated on our discord! <a href="https://discord.gg/ZT3Mx78Ar7" rel="noreferer noopener">https://discord.gg/ZT3Mx78Ar7</a>)</p>
        <p>Magazine submissions are selected based on quality, originality, creativity, and the creator’s intent!</p>
      </div>

      <hr />
      <svg className={styles.svg__guidelines}>
        <circle cx="300" cy="300" r="300" />
      </svg>

      <div className={styles.guidelines}>

        <h2>Reading Period:</h2>

        <p>The editorial team will be reviewing and sending out acceptances on a rolling basis. Our waiting period is approximately three months, but this could vary.</p>

        <h2>What we accept:</h2>
        <ul>
          <li>Prose of any genre under 3k words</li>
          <li>Poetry</li>
          <li>Art (traditional or digital, short comics, photography, graphic text, etc).</li>
          <li>We encourage you to submit spoken word, performance, experimental, cross-genre, and other forms of work!</li>
          <li>If you have a question about what we accept, please email us at otherpeopleucsd@gmail.com.<sup>[1]</sup></li>
        </ul>

        <h2>How we want it:</h2>
        <ul>
          <li><strong>Please create an individual submission for each work.</strong></li>
          <li>Remove your name and other personally identifying information within the contents of the work so that our team can review submissions anonymously. If you notice that your name is on the filename, that is okay as it&apos;ll be removed during review.</li>
          <li>Literature: please submit a PDF in standard manuscript format.</li>
          <li className={styles.list__subitem}>Only the piece’s title, word count, and story/poem should be contained in the PDF.</li>
          <li>Art: High fidelity .pdf, .jpg, .tiff, .heic accepted.</li>
          <li className={styles.list__subitem}>If you would like to submit a series, please create an individual submission for each work.</li>
          <li className={styles.list__subitem}>If submitting a photograph of a physical work, please ensure there is good lighting and the work is fully inside the frame.</li>
          <li>More detailed instructions are listed in the Google Form submission form as well! In this form, please answer the questions about the genre of your work, input your email address and name, and attach an <strong>anonymized</strong> copy of your work. Optional: tell us anything you want us to know about your work and its meaning.</li>
        </ul>

        <h2>Who we accept from:</h2>

        <ul>
          <li>Current UCSD undergraduates</li>
          <li>UCSD graduate students</li>
          <li>UCSD alumni graduated within the last 3 years</li>
        </ul>

        <h2>FAQ</h2>
        <ul>
          <p>Q: Can we submit multiple submissions?</p>
          <p className={styles.answer}>Yes. Please submit them in individual files. Please review the submission form for any restrictions.</p>
          <p>Q: When do your submission periods usually open?</p>
          <p className={styles.answer}>End of Spring Quarter - Early Fall Quarter</p>
          <p className={styles.answer}>Late Fall Quarter - End of Winter Quarter</p>
        </ul>

        <p className={styles.footnote}>[1A] We do not consider previously published work.</p>
        <p className={styles.footnote}>[1B] Currently, we do not have the funds to pay our contributors.</p>

        <svg className={styles.svg__guidelines__bottom}>
          <circle cx="200" cy="300" r="250" />
          <circle cx="400" cy="500" r="250" />
        </svg>
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

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
    },
  };
}