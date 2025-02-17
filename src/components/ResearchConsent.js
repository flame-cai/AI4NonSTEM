import React from "react";

const ResearchConsent = ({ consent, setConsent, setIsPopupOpen, submitConsent }) => {
  const handleConsentChange = (value) => {
    setConsent(value);
    setIsPopupOpen(false);
    submitConsent(value);
  };

  return (
    <div className="popup-overlay" role="dialog" aria-labelledby="popup-header" aria-modal="true">
      <div className="popup-content">
        <button 
          class="close-btn"
          aria-label="Close"
          onClick={() => setIsPopupOpen(false)}
        >&times;</button>
        <h3 id="popup-header">Participant Information Sheet & Research Consent Form</h3>
        <section className="popup-body">
          <h4>Title: Teaching Artificial Intelligence in non-STEM settings: a case study</h4>

          <article>
            <p><strong>Introduction:</strong></p>
            <p>
              You have been invited to participate in a research study conducted by
              Kaushik Gopalan from FLAME University. The broad goal of the study is
              to analyze ways in which the students interact with the AI interface
              and use the learnings from the case study to further improve the tools
              used to teach AI to non-STEM students.
            </p>

            <p><strong>Purpose of the Study:</strong></p>
            <p>
              The purpose of this study is to demonstrate novel methods to help
              non-STEM students learn about essential skills while using Generative
              AI technologies. Specifically, we introduce tools which help non-STEM
              students develop prompt engineering and information verification
              skills.
            </p>

            <p><strong>Procedures:</strong></p>
            <p>
              If you consent, we will save the prompts you provided and the AI's
              responses and use it for research purposes. However, your identity or
              email will NOT be saved and all the data will be completely anonymous.
            </p>

            <p><strong>Duration of Participation:</strong></p>
            <p>
              The study consists of the hands-on activity that you just completed in
              class. You will only need a few minutes to read this form and decide
              if you would like to allow the use of your activity for research
              purposes.
            </p>

            <p><strong>Participation and Withdrawal:</strong></p>
            <p>
              Participation in this study is entirely voluntary, and you are free to
              choose whether or not to participate. You may withdraw from the study
              at any time without any consequences or loss of benefits to which you
              are otherwise entitled. There is no compensation for participation,
              and no grades or academic evaluations are associated with any of the
              activities in this study. The investigator may choose to withdraw you
              from the study if circumstances arise that warrant such action.
            </p>

            <p><strong>Potential Benefits:</strong></p>
            <p>
              Findings from this study can provide valuable insights into how
              AI-based tools can be incorporated into educational settings to
              improve the learning experience.
            </p>

            <p><strong>Confidentiality:</strong></p>
            <p>
              All information obtained in connection with this study that can
              identify you will not be saved. Data collected will be stored securely
              and will only be accessible to the research team. Any published
              results will not include information that can identify you as an
              individual participant.
            </p>

            <p><strong>Risks:</strong></p>
            <p>
              There are no known risks associated with participation in this study.
            </p>

            <p><strong>Contact Information:</strong></p>
            <p>
              If you have any questions or concerns about the research, please feel
              free to contact Kaushik Gopalan at <a href="mailto:kaushik.gopalan@flame.edu.in">kaushik.gopalan@flame.edu.in</a> or
              Prajish Prasad at <a href="mailto:prajish.prasad@flame.edu.in">prajish.prasad@flame.edu.in</a> for further information
              or clarification.
            </p>

            <p><strong>Consent:</strong></p>
            <p>
              By proceeding to participate in this study, you are indicating that
              you have read and understood the information provided above and
              voluntarily agree to participate.
            </p>

            <p>Thank you for your time and consideration in contributing to this research study!</p>
          </article>

          <fieldset className="radio-buttons">
            <legend>Consent of Participation</legend>
            <p>1. I have received sufficient information about this research project.</p>
            <p>2. I understand the procedures described above.</p>
            <p>3. My questions have been answered to my satisfaction.</p>

            <label>
              <input
                type="radio"
                name="consent"
                value="1"
                checked={consent === 1}
                onChange={() => handleConsentChange(1)}
              />
              I agree to participate in this research project, by permitting to
              the use of my data for research purposes AND I state that I am at least 18 years of age.
            </label>
            <label>
              <input
                type="radio"
                name="consent"
                value="0"
                checked={consent === 0}
                onChange={() => handleConsentChange(0)}
              />
              I do not agree to participate in this research project, by NOT
              permitting to the use of my data for research purposes OR I am under 18 years of age.
            </label>
          </fieldset>
        </section>
      </div>
    </div>
  );
};

export default ResearchConsent;
