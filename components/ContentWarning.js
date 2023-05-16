const ContentWarning = ({ description }) => {
  const access = () => {
    document.getElementById('cw').className = 'hidden';
    document.getElementById('cw-story').className = '';
  }
  return (
    <div id="cw" class="content-warning">
      <div class="warning center">
        <p class="title">CONTENT WARNING</p>
        <p>{description}</p>
        <p>Viewer discretion is advised. Proceed to view content?</p>
        <div class="options center">
          <a href="/">Cancel</a>
          <button onClick={access}>Enter</button>
        </div>
      </div>
    </div>

  );
}

export default ContentWarning;
