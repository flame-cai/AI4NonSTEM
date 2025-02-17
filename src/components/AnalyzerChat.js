import { useState, useEffect, useRef } from 'react';
import logo from '../logo.svg';
import ResearchConsent from './ResearchConsent';

const AnalyzerChat = (prop) => {
  const [messages, setMessages] = useState(prop.messages);
  const [inputMessage, setInputMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(prop.system_prompt);
  const [consent, setConsent] = useState(prop.consent === 0 ? 0 : 1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const messagesEndRef = useRef(null);

  const handleButtonClick = () => {
    const button = document.querySelector('.sys-prompt');
    const systemWrapper = document.querySelector('.system-wrapper');
    button.innerText = button.innerText === 'Save' ? 'Edit' : 'Save';
    systemWrapper.style.display = systemWrapper.style.display === 'none' ? 'flex' : 'none';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage("");
      fetch("https://asia-south1-ppt-tts.cloudfunctions.net/ai4non-stem/analyzer_chat",
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${prop.token}`
          },
          body: JSON.stringify({messages: [...messages, { role: 'user', content: inputMessage }], system_prompt: systemPrompt})
        }
      )
      .then(response => response.json()
        .then(data => {
          if (response.ok) {
            setMessages(messages => [...messages, data]);
          } else {
            document.getElementById("main").innerHTML = `<h1 style="color: red;">${data.error}</h1>`;
          }
        })
      )
      .catch(error => {
        console.error('Error:', error);
      })
    }
  };

  const submitConsent = (value) => {
    fetch("https://asia-south1-ppt-tts.cloudfunctions.net/ai4non-stem/submit_consent",
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${prop.token}`
        },
        body: JSON.stringify({analyzer: value})
      }
    )
    .then(response => response.json()
      .then(data => {
        if (response.ok) {
          setConsent(value);
        } else {
          document.getElementById("main").innerHTML = `<h1 style="color: red;">${data.error}</h1>`;
        }
      })
    )
    .catch(error => {
      console.error('Error:', error);
    })
  };

  return (
    <div className="wrapper-column">
      <div className="wrapper-row-top-2">
        <div className="reference-wrapper-2">
          <h4>System Prompt <button className='sys-prompt' style={{ position: 'absolute', right: '4vmin' }} onClick={handleButtonClick}>Save</button></h4>
          <div className="system-wrapper">
            <textarea
              className="sys-input"
              value={systemPrompt}
              rows={4}
              onDrop={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onDrag={(e) => e.preventDefault()}
              onDragEnd={(e) => e.preventDefault()}
              onChange={(e) => setSystemPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              placeholder=" Enter System Prompt..."
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="clear" onClick={() => setSystemPrompt("")}>
              Clear
            </button>
          </div>
        </div>
        <div className="chat-wrapper-2">
          <div id="messages" className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.role}-row`}>
                {msg.role === 'assistant' && (
                  <>
                    <div className="profile-picture-wrapper left">
                      <img src={logo} alt={`${msg.role} profile picture`} className={`profile-picture ${msg.role}-profile-picture`} />
                    </div>
                    <div className={`message ${msg.role}-msg`}>
                      <span>{msg.content}</span>
                    </div>
                  </>
                )}
                {msg.role !== 'assistant' && (
                  <>
                    <div className={`message ${msg.role}-msg`}>
                      <span>{msg.content}</span>
                    </div>
                    <div className="profile-picture-wrapper right">
                      <img src={prop.picture} alt={`${msg.role} profile picture`} className={`profile-picture ${msg.role}-profile-picture`} />
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-wrapper-2">
            <button className="new" onClick={() => { setMessages([]); }}>
              New Chat
            </button>&nbsp;
            <>
              <textarea
                className="input"
                value={inputMessage}
                rows={4}
                maxLength={250}
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onDrag={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder=" Type your message..."
              />&nbsp;
              <pre
                style={{
                  display: "block",
                  bottom: "1vmin",
                  right: "12vmin",
                  fontSize: "12px",
                  color: "white",
                  pointerEvents: "none",
                }}
              >
                {250 - inputMessage.length} / {250}<br></br>character(s)<br></br>remaining
              </pre>&nbsp;
              <button className="send" onClick={sendMessage}>
                Send
              </button>
            </>
          </div>
        </div>
      </div>
      <div className="wrapper-row-bottom">
        <div className="confirm-wrapper" onClick={() => setIsPopupOpen(true)}>
          Click here to read the Participant Information Sheet
        </div>
        {isPopupOpen && (
          <ResearchConsent 
            consent={consent} 
            setConsent={setConsent} 
            setIsPopupOpen={setIsPopupOpen}
            submitConsent={submitConsent}
          />
        )}
      </div>
    </div>
  );
};

export default AnalyzerChat;
