import { useState, useMemo } from 'react';

const TuringReview = (prop) => {
  const [confidence, setConfidence] = useState('');
  const [selectedResponse, setSelectedResponse] = useState('');

  const swapRandomly = (var1, var2) => {
    return Math.random() >= 0.5 ? [var2, var1, true] : [var1, var2, false];
  };

  const [response1, response2, isSwapped] = useMemo(
    () => swapRandomly(prop.user_response, prop.ai_response),
    [prop.user_response, prop.ai_response]
  );

  const endExam = () => {
    const userPin = prompt("Please enter your security PIN:");
    if (userPin == prop.security_pin) {
      const isIdentified = (isSwapped && selectedResponse === "response1") || (!isSwapped && selectedResponse === "response2");
      fetch("https://asia-south1-ppt-tts.cloudfunctions.net/ai4non-stem/turing_end", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${prop.token}`
        },
        body: JSON.stringify({ is_identified: isIdentified, confidence: confidence })
      })
      .then(response => response.json()
        .then(data => {
          if (response.ok) {
            prop.setProgress(2);
            prop.setReport([isIdentified, confidence]);
          } else {
            document.getElementById("main").innerHTML = `<h1 style="color: red;">${data.error}</h1>`;
          }
        })
      )
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  }; 

  return (
    <div className="wrapper-column">
      <div className="wrapper-review-top">
        <div className="response1-wrapper">
          <h4>Response 1</h4>
          {isSwapped ? (
            <span>{response1}</span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: response1 }}></span>
          )}
        </div>
        <div className="response2-wrapper">
          <h4>Response 2</h4>
          {isSwapped ? (
            <span dangerouslySetInnerHTML={{ __html: response2 }}></span>
          ) : (
            <span>{response2}</span>
          )}
        </div>
      </div>
      <div className="wrapper-review-bottom">
        <div className="review-wrapper">
          <div>
            <label><b>Select AI Response:</b></label>&nbsp;&nbsp;
            <input type="radio" id="response1" name="response" value="response1" onChange={(e) => setSelectedResponse(e.target.value)}></input>
            <label for="response1">Response 1</label>&nbsp;
            <input type="radio" id="response2" name="response" value="response2" onChange={(e) => setSelectedResponse(e.target.value)}></input>
            <label for="response2">Response 2</label>&nbsp;
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <label for="confidence"><b>Confidence:</b></label>&nbsp;
            <input type="range" id="confidence" name="confidence" min="0" max="100" step="1" value={confidence} onChange={(e) => setConfidence(e.target.value)}></input>&nbsp;
            <span id="confidenceValue">{confidence}</span>
          </div>
        </div>
        <div className="end-wrapper">
          <button className="submit" type="submit" onClick={() => {
            if (!selectedResponse || !confidence) {
              alert('Please select the AI response and adjust the confidence level before submitting.');
            } else {
              endExam();
            }
          }}>End</button>
        </div>
      </div>
    </div>
  );
};

export default TuringReview;
