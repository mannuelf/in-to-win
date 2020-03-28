import React, { useState } from "react";
import { BASE_URL, CORONA_FACTS } from "../constants/constants";
import brain from "brain.js";

function AskCoronaGo() {
  const [coronaQuery, setCoronaQuery] = useState("");
  const [theAnswer, setTheAnswer] = useState("");
  let trainedNet;

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
        //document.getElementById("theResult").innerHTML = answer;
      });
  }

  const execute = input => {
    let results = trainedNet(encode(input));
    let output = results.true > results.false ? "true" : "false";
    setTheAnswer(output);

    // let output;
    // results.true > results.false
    //   ? (output = `<h3> The answer is <b>correct</b> <span class="glyphicon glyphicon-ok" aria-hidden="true"></h3></div>`)
    //   : (output = `<h3>The answer is <b>incorrect</b> <span class="glyphicon glyphicon-remove" aria-hidden="true"></h3></div>`);
    // return output;
  };

  const handleChange = input => {
    setCoronaQuery(input.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    train();
  };

  return (
    <div className="App">
      <h1>Ask Corona Buster a question about the Corona Virus</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="coronaQuestion"
          className=""
          onChange={handleChange}
        />
        <input type="submit" />

        <br />
        <br />
        <br />
        {theAnswer}
      </form>
    </div>
  );
}
export default AskCoronaGo;
