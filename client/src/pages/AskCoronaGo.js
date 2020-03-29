import React, { useState, useEffect } from "react";
import { BASE_URL, CORONA_FACTS } from "../constants/constants";
import brain from "brain.js";
import LoadingGif from "./../assets/gifs/ai-orb-transparent.gif";
import theme from "../GlobalStyle/Theme";
import Button from "../components/Button";

function AskCoronaGo() {
  const [coronaQuery, setCoronaQuery] = useState("");
  const [theAnswer, setTheAnswer] = useState([
    "Hi! I'm a AI based Fact Checker. How can I help you?"
  ]);
  const [botChat, setBotChat] = useState([]);

  const [showLoading, setShowLoading] = useState(false);
  let trainedNet;

  const botAnswer = [...botChat];

  useEffect(() => {
    botAnswer.push(theAnswer && theAnswer);
    setBotChat(botAnswer);
  }, [theAnswer]);

  const encode = arg => {
    var input = [];
    for (let i = 0; i < arg.length; i++) {
      input.push(arg.charCodeAt(i) / 1000);
    }
    return input;
  };
  const fixLengths = data => {
    let maxLengthInput = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].input.length > maxLengthInput) {
        maxLengthInput = data[i].input.length;
      }
    }
    for (let i = 0; i < data.length; i++) {
      while (data[i].input.length < maxLengthInput) {
        data[i].input.push(0);
      }
    }
    return data;
  };

  function train() {
    fetch(BASE_URL + CORONA_FACTS)
      .then(response => {
        return response.json();
      })
      .then(result => {
        let filteredResult = result.map(value => {
          let outputObj = {};
          let key = value.isTrue;
          outputObj[key] = 1;
          return {
            input: encode(value.text),
            output: outputObj
          };
        });
        let fixedData = fixLengths(filteredResult);
        let net = new brain.NeuralNetwork();
        net.train(fixedData, {
          iterations: 200,
          log: true
        });
        trainedNet = net.toFunction();
        console.log("Finished training...");
        let answer = execute(coronaQuery);
      });
  }

  const execute = input => {
    let results = trainedNet(encode(input));
    let output =
      results.true > results.false
        ? "Your answer is correct"
        : "Your answer is incorrect";
    const answers = [output];
    setTheAnswer(answers);
    setShowLoading(false);
  };

  const handleChange = input => {
    setCoronaQuery(input.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowLoading(true);
    train();
  };

  return (
    <div className="modal-container" style={style_container}>
      <div style={style_upperRow}>
        {" "}
        {botChat.map((bChat, index) => (
          <div key={index} className="chat-card" style={style_chatCardBot}>
            <p>{bChat}</p>
          </div>
        ))}
        <div style={style_loaderContainer}>
          <div>
            <svg
              className={showLoading ? "coronaBot-loader" : null}
              style={style_coronaBot}
              fill={theme.colors.primary}
              data-name="Слой 1"
              id="Слой_1"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path d="M120,56a8,8,0,0,0-7.74,6H102a37.86,37.86,0,0,0-9.72-23.4l7.31-7.31a8,8,0,1,0-2.83-2.83L89.4,35.77A37.86,37.86,0,0,0,66,26.05V15.74a8,8,0,1,0-4,0V26.05a37.86,37.86,0,0,0-23.4,9.72l-7.31-7.31a8,8,0,1,0-2.83,2.83l7.31,7.31A37.86,37.86,0,0,0,26.05,62H15.74a8,8,0,1,0,0,4H26.05a37.86,37.86,0,0,0,9.72,23.4l-7.31,7.31a8,8,0,1,0,2.83,2.83l7.31-7.31A37.86,37.86,0,0,0,62,102v10.31a8,8,0,1,0,4,0V102a37.86,37.86,0,0,0,23.4-9.72l7.31,7.31a8,8,0,1,0,2.83-2.83L92.23,89.4A37.86,37.86,0,0,0,102,66h10.31A8,8,0,1,0,120,56ZM100.77,21.57A4,4,0,1,1,99.6,24.4,4,4,0,0,1,100.77,21.57ZM60,8a4,4,0,1,1,4,4A4,4,0,0,1,60,8ZM21.57,27.23a4,4,0,0,1,5.66-5.66,4,4,0,0,1-5.66,5.66ZM8,68a4,4,0,1,1,4-4A4,4,0,0,1,8,68Zm19.23,38.43a4,4,0,0,1-5.66-5.66,4,4,0,0,1,5.66,5.66ZM68,120a4,4,0,1,1-4-4A4,4,0,0,1,68,120Zm38.43-19.23a4,4,0,0,1-5.66,5.66,4,4,0,0,1,5.66-5.66ZM64,98A34,34,0,1,1,98,64,34,34,0,0,1,64,98Zm56-30a4,4,0,1,1,4-4A4,4,0,0,1,120,68Z" />
              <path d="M40.34,58.34a8,8,0,1,0,11.32,0A8,8,0,0,0,40.34,58.34Zm8.49,8.49a4,4,0,1,1,0-5.66A4,4,0,0,1,48.83,66.83Z" />
              <path d="M58.34,40.34a8,8,0,1,0,11.32,0A8,8,0,0,0,58.34,40.34Zm8.49,8.49a4,4,0,1,1,0-5.66A4,4,0,0,1,66.83,48.83Z" />
              <path d="M76.34,58.34a8,8,0,1,0,11.32,0A8,8,0,0,0,76.34,58.34Zm8.49,8.49a4,4,0,1,1,0-5.66A4,4,0,0,1,84.83,66.83Z" />
              <path d="M58.34,76.34a8,8,0,1,0,11.32,0A8,8,0,0,0,58.34,76.34Zm8.49,8.49a4,4,0,1,1,0-5.66A4,4,0,0,1,66.83,84.83Z" />
            </svg>{" "}
          </div>
          {showLoading && <p>I'm still learning, please be patient.</p>}
        </div>
      </div>
      <form onSubmit={handleSubmit} style={style_form}>
        <input
          style={style_askInput}
          type="text"
          name="coronaQuestion"
          placeholder="Ask me about corona here..."
          className=""
          onChange={handleChange}
        />
        <button type="submit" style={style_sendBtn}>
          {" "}
          Send
        </button>
      </form>
    </div>
  );
}

const style_container = {
  display: "flex",
  flexDirection: "column",
  height: "90vh"
};

const style_upperRow = {
  maxHeight: "50%",
  overflow: "scroll"
};

const style_loaderContainer = {
  display: "flex",
  textAlign: "left",
  fontSize: "16px",
  margin: "20px 0"
};
const style_coronaBot = {
  width: "64px",
  marginRight: "8px"
};

const style_chatCardBot = {
  width: "80%",
  fontSize: "16px",
  padding: "4px 4px",
  borderRadius: "20px",
  backgroundColor: `${theme.colors.primary}`,
  color: `${theme.colors.dark}`,
  marginBottom: "16px"
};
const style_chatCardUser = {
  width: "80%",
  marginLeft: "20%",
  fontSize: "16px",
  padding: "4px 4px",
  borderRadius: "20px",
  backgroundColor: `${theme.colors.text}`,
  color: `${theme.colors.grey}`,
  marginBottom: "16px"
};

const style_form = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 8px",
  background: "transparent",
  boxShadow: `${theme.shadowUp}`
};

const style_askInput = {
  width: "75%",
  border: "none",
  borderBottom: `2pt solid ${theme.colors.primary}`,
  backgroundColor: "transparent",
  outline: "none",
  padding: "8px 2px",
  fontSize: "16px",
  color: `${theme.colors.text}`
};

const style_sendBtn = {
  padding: "8px 16px",
  borderRadius: "50px",
  fontSize: "16px",
  marginLeft: "8px",
  backgroundColor: `${theme.colors.primary}`,
  border: "none"
};

export default AskCoronaGo;
