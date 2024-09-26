const isJson = document.contentType === "application/json";

const addBodyTagIfMissing = () => {
  if (!document.querySelector("body")) {
    const body = document.createElement("body");
    document.querySelector("html").appendChild(body);
  }
};

const addHeadTagIfMissing = () => {
  if (!document.querySelector("head")) {
    const headNode = document.createElement("head");
    document
      .querySelector("html")
      .insertBefore(headNode, document.querySelector("body"));
  }
};

document.onreadystatechange = function () {
  console.log("Ready state changed : " + document.readyState);
  if (document.readyState === "complete") {
    if (isJson) {
      addBodyTagIfMissing();
      addHeadTagIfMissing();

      // add css file to the document dynamically
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.id = "prismCss";
      const cssFilePath = chrome.runtime.getURL("/prism/prism.css");
      console.log("CSS file path : " + cssFilePath);
      link.setAttribute("href", cssFilePath);
      const response = document.head.appendChild(link);

      // add js file to the document dynamically
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "prismJs";
      const jsFilePath = chrome.runtime.getURL("/prism/prism.js");
      script.setAttribute("src", jsFilePath);

      // append the script to the body
      //document.querySelector("body").appendChild(script);
      document.body.appendChild(script);

      // get the json data from the document
      const jsonData = document.body.innerText;
      //console.log(jsonData);

      const formattedJson = JSON.stringify(JSON.parse(jsonData), null, 2);

      // create a pre element to display the json data
      const pre = document.createElement("pre");
      pre.id = "pre";
      pre.className = "line-numbers";

      // create a code block with json language
      const jsonCode = document.createElement("code");
      jsonCode.id = "json";
      jsonCode.className = "language-json";
      jsonCode.textContent = formattedJson;

      // append the code block to the pre element
      pre.appendChild(jsonCode);

      // clear existing content in the document
      document.body.innerHTML = "";

      // add the div element to the document
      document.body.appendChild(pre);
    }
  }
};
