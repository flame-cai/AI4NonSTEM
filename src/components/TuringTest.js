import { useState } from 'react';
import logo from '../logo.svg';
import TuringChat from './TuringChat';
import TuringReview from './TuringReview';

const TuringTest = (prop) => {
  const [progress, setProgress] = useState(prop.data.progress);
  const [ai_response, setAIResponse] = useState(prop.data.ai_response);
  const [report, setReport] = useState([prop.data.is_identified, prop.data.confidence]);

  const renderBody = () => {
    if (progress == 0) {
      return <TuringChat token={prop.token} email={prop.data.email} messages={prop.data.messages} picture={prop.data.picture} user_response={prop.data.user_response} setProgress={setProgress} setAIResponse={setAIResponse} consent={prop.data.consent}/>;
    } else if (progress == 1) {
      return <TuringReview token={prop.token} user_response={prop.data.user_response} ai_response={ai_response} security_pin={prop.data.security_pin} setProgress={setProgress} setReport={setReport}/>;
    } else if (progress == 2) {
      return <h4>
        The observer's identification of the AI response was <u>{report[0] ? 'correct' : 'incorrect'}</u>, with a confidence level of <u>{report[1]}%</u>.
        <br /><br />
        The Turing Test has been successfully completed. You may now close this tab.
      </h4>
    }
  };
  return (
    <main>
      <header className="header">
        <div className="banner">
          <img src={logo} className="logo" alt="logo" />&nbsp;
          <h2>Turing Test</h2>
        </div>
        <div className="user">
          <div className="name">Demo User</div>
          <div className="email">[demo.user@email.com]</div>
        </div>
        {/* <div className="user">
          <div className="name">{prop.data.name}</div>
          <div className="email">[{prop.data.email}]</div>
        </div> */}
      </header>
      <div className="body">
        {renderBody()}
      </div>
      <footer className="footer">
        <p>Made with ❤️</p>
      </footer>
    </main>
  );
};

export default TuringTest;