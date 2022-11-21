async function fetchFDA(params) {
  let url = new URL("https://api.fda.gov");
  url.pathname = "drug/event.json";
  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_OPENFDA_API_KEY
  });
  for (var key in params) {
    var value = params[key]
    url.searchParams.append(key, value);
  }

  try {
    url = decodeURIComponent(url);
  } catch (err) {
    console.error(err);
  }

  return await fetch(url)
    .then((res) => res.json())
    .then((data) => {return data})
    .catch((err) => console.error(err));
}

exports.fetchFDA = fetchFDA;
