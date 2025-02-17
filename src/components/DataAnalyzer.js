import { useState } from 'react';
import logo from '../logo.svg';
import AnalyzerChat from './AnalyzerChat';

const DataAnalyzer = (prop) => {
  const [progress, setProgress] = useState(prop.data.progress);

  const renderBody = () => {
    return <AnalyzerChat token={prop.token} email={prop.data.email} messages={prop.data.messages} picture={prop.data.picture} system_prompt={prop.data.system_prompt} progress={progress} setProgress={setProgress} consent={prop.data.consent}/>;
  };
  return (
    <main>
      <header className="header">
        <div className="banner">
          <img src={logo} className="logo" alt="logo" />&nbsp;
          <h2>Data Analyzer</h2>
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

export default DataAnalyzer;