const FormData = require("form-data");
const axios = require("axios");
const data = new FormData();

function getArt(styleImage, contentImage) {
  data.append("focusContent", "true");
  data.append("styleImage", styleImage);
  data.append("contentImage", contentImage);

  const options = {
    method: "POST",
    url: "https://ai-art-maker.p.rapidapi.com/remix-art",
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
      "X-RapidAPI-Host": "ai-art-maker.p.rapidapi.com",
      ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

exports.getArt = getArt;