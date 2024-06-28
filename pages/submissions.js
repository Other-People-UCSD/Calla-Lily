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
  const status = data.forms["submissions_written"] || data.forms["submissions_visual"];

  return (
    <Layout landingPage title={"Submissions"} className={styles.main} footerConfig={{ 'showMore': false }}>
      <div className={styles.main__content}>
        <div className={`${animationStyles.fadeInBottom} title__accent`}>
          <h1 className={`text__landing--heading_1 ${styles.h1}`} aria-label="Submissions">Submissions</h1>
        </div>
        <div className={styles.forms}>
          {status ? (
            <>
              {data.forms.submissions_written ? (<p><a href={data.forms.submissions_written}>Written Submissions</a></p>) : null}
              {data.forms.submissions_visual ? (<p><a href={data.forms.submissions_visual}>Visual Submissions</a></p>) : null}
            </>
          ) : (
            <TinaMarkdown content={data.forms.subsClosedText} />
          )
          }

          <p>(Updates on our submission status are found on our socials and <a href="https://discord.gg/ZT3Mx78Ar7" rel="noreferer noopener">discord</a>)</p>      </div>

      </div>
      <hr />

      <div className={`${styles.guidelines} ${styles.main__content}`}>

        <h2 style={{marginTop: 0}}>Reading Period:</h2>

        <p>Magazine submissions are selected based on quality, originality, creativity, and the creator’s intent!</p>
        <p>The editorial and design teams will be reviewing and sending out acceptances on a rolling basis.</p>
        <p>Our waiting period is approximately three months after submissions close, but this could vary.</p>

        <h2>Who we accept from:</h2>

        <ul className={styles.chip__wrapper}>
          <li><TextChip backgroundColor={"#F8E1CF"} color={"black"} text={"UCSD Undergraduates"} /></li>
          <li><TextChip backgroundColor={"#FAD6E5"} color={"black"} text={"UCSD Graduates"} /></li>
          <li><TextChip backgroundColor={"#D8E8F6"} color={"black"} text={"UCSD Alumni"} /></li>
        </ul>

        <h2>What we accept:</h2>
        <ul className={styles.chip__wrapper}>
          <li><TextChip backgroundColor={"#D8E8F6"} color={"black"} text={"Prose (under 3k words)"} /></li>
          <li><TextChip backgroundColor={"#FAD6E5"} color={"black"} text={"Poetry"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Traditional Art"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Digital Art"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Photography"} /></li>
          <li><TextChip backgroundColor={"#D8E8F6"} color={"black"} text={"Screenplay"} /></li>
          <li><TextChip backgroundColor={"#FAD6E5"} color={"black"} text={"Spoken Word"} /></li>
          <li><TextChip backgroundColor={"#D8E8F6"} color={"black"} text={"Experimental Work"} /></li>
          <li><TextChip backgroundColor={"#FAD6E5"} color={"black"} text={"Cross-Genre"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Short Comic"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Fashion"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Dance"} /></li>
          <li><TextChip backgroundColor={"#E7F3E2"} color={"black"} text={"Performance"} /></li>
        </ul>

        <p>We do not consider previously published work.</p>
        <p>If you have a question about what is accepted, please email us at otherpeopleucsd@gmail.com.</p>

        <h2>How we want it:</h2>
        <strong>Please create an individual submission for each work.</strong>
        <ul>
          <li>Remove your name and other personally identifying information within the contents of the work so that our team can review submissions anonymously. If you notice that your name is on the filename after submitting, that is intended and will be removed during review.</li>
          <li>Literature: please submit a PDF in standard manuscript format.</li>
          <li className={styles.list__subitem}>Only the piece’s title, word count, and story/poem should be contained in the PDF.</li>
          <li>Art: High fidelity PDF, JPG, TIFF, HEIC accepted.</li>
          <li className={styles.list__subitem}>If you would like to submit a series, please create an individual submission for each work.</li>
          <li className={styles.list__subitem}>If submitting a photograph of a physical work, please ensure there is good lighting and the work is fully inside the frame.</li>
          <li>Video: submit directly if under 1024 MB or 1 GB, otherwise submit a link to the video.</li>
          <li>More detailed instructions are listed in the Google Form submission form as well! In this form, please answer the questions about the genre of your work, input your email address and name, and attach an <strong>anonymized</strong> copy of your work. Optional: tell us anything you want us to know about your work and its meaning.</li>
        </ul>

        <h2>FAQ</h2>
        <ul className={styles.faq__list}>
          <li>Q: Can we submit multiple submissions?</li>
          <li className={styles.list__subitem}>Yes. Please submit them in individual files. Please review the submission form for any restrictions.</li>
          <li>Q: When do your submission periods usually open?</li>
          <li className={styles.list__subitem}>End of Spring Quarter &mdash; Early Fall Quarter</li>
          <li className={styles.list__subitem}>Late Fall Quarter &mdash; End of Winter Quarter (if biannual submissions)</li>
        </ul>
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

const TextChip = ({ text, backgroundColor, color }) => {
  return <div title={text} className={`${styles.text__chip}`} style={{ backgroundColor: backgroundColor, color: color }}>{text}</div>
}