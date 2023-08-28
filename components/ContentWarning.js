import Link from "next/link";

const ContentWarning = ({ description }) => {
  const access = () => {
    document.getElementById('cw').className = 'hidden';
    document.getElementById('cr-article').className = '';
  }
  return (
    <div id="cw" className={"content-warning"}>
      <div className={"warning center"}>
        <p className={"title"}>CONTENT WARNING</p>
        <p>{description}</p>
        <p>Viewer discretion is advised. Proceed to view content?</p>
        <div className={"options center"}>
          <Link href="/">Cancel</Link>
          <button onClick={access}>Enter</button>
        </div>
      </div>
    </div>

  );
}

export default ContentWarning;
