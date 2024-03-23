import "regenerator-runtime/runtime";

import React, { useContext, useEffect, useRef, useState } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [phase1, setPhase1] = useState(
    "Suggest beautiful places to see on an upcoming road trip"
  );
  const [phase2, setPhase2] = useState(
    "Breifly sumarize this concept: urban planning"
  );
  const [phase3, setPhase3] = useState(
    "Discuss the concept of 'justice' according to Plato's Republic"
  );
  const [phase4, setPhase4] = useState(
    "Improve the readability of the following code"
  );
  const resultRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [resultData]);
  const scrollToBottom = () => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
    const numberOfLines = e.target.value.split("\n").length;
    setInput(e.target.value);
    if (numberOfLines === 0) {
      e.target.rows = 1;
    } else if (numberOfLines <= 5) {
      e.target.rows = numberOfLines;
    } else {
      e.target.rows = 5;
    }
  };

  const speakNow = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your Browser doesn't support speech recognition.");
      return;
    }

    SpeechRecognition.startListening();
  };

  useEffect(()=>{
    setInput(transcript)
  }, [transcript])
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>
            Gemini Clone <img src={assets.gemini_icon} alt="" />
          </p>
          <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Dev.</span>
                </p>
                <p>How can i help you today?</p>
              </div>
              <div className="cards">
                <div className="card" onClick={() => setInput(phase1)}>
                  <p>{phase1}</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card" onClick={() => setInput(phase2)}>
                  <p>{phase2}</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card" onClick={() => setInput(phase3)}>
                  <p>{phase3}</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card" onClick={() => setInput(phase4)}>
                  <p>{phase4}</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result" ref={resultRef}>
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <textarea
                onChange={handleChange}
                value={input}
                type="text"
                rows={1}
                placeholder="Enter your prompt here..."
              />
              <div>
                <img
                  src={assets.gallery_icon}
                  alt=""
                  onClick={() => alert("Buy me a coffee to use this feature.")}
                />
                {listening ? "On" : null}
                <img
                  src={assets.mic_icon}
                  alt=""
                  onClick={speakNow}
                />

                {input ? (
                  <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                ) : null}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate information, including about people,
              so double check its responses.{" "}
              <a target="_blank" href="https://sourav-c-portfolio.netlify.app">
                Developed by Sourav.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
