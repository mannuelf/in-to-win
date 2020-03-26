import React from "react";
import { BASE_URL, CORONA_FACTS } from "../constants/constants";

function AskCoronaGo() {
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
    fetch("https://cors-anywhere.herokuapp.com/http://34.243.84.61/coronafacts")
      .then(response => {
        return response.json();
      })
      .then(result => {
        let filteredResult = result.map(value => {
          let outputObj = {};
          let key = value.output;
          outputObj[key] = 1;
          return {
            input: encode(value.input),
            output: outputObj
          };
        });
        let fixedData = fixLengths(filteredResult);
        console.log("filteredResult ", fixedData);
        let net = new brain.NeuralNetwork();
        net.train(fixedData, {
          iterations: 500,
          log: true
        });
        trainedNet = net.toFunction();
        console.log("Finished training...");
        let answer = execute(document.getElementById("answer").value);
        document.getElementById("theResult").innerHTML = answer;
      });
  }

  return (
    <div className="App">
      <h1>Get your facts straight about the Corona virus</h1>
    </div>
  );
}
export default AskCoronaGo;
