const superagent = require("superagent");

function fetchAPI(config) {
  var [method, url, headers, params] = [
    config["method"],
    config["url"],
    config["headers"],
    config["params"],
  ];
  console.log(params);
  console.log(url + headers["endpoint"] + headers["category"]);
  if (method === "GET") {
    superagent
      .get(url + headers["endpoint"] + headers["category"])
      .query(params)
      .end((err, res) => {
        if (err) {
          return console.error(err);
        }
        console.log(res);
      });
  }
}

exports.fetchAPI = fetchAPI;
