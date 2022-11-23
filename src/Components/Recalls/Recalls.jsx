import useFDA from "../../Tools/Hooks/useFDA";

const Recalls = () => {
  let url = new URL("https://api.fda.gov");
  url.pathname = "drug/event.json";
  url.search = new URLSearchParams({
    api_key: process.env.REACT_APP_OPENFDA_API_KEY,
  });
  const params = { search: "receivedate:[20040101+TO+20081231]", limit: "20" };
  for (var key in params) {
    var value = params[key];
    url.searchParams.append(key, value);
  }
  try {
    url = decodeURIComponent(url);
  } catch (err) {
    console.error(err);
  }
  const { data, loading, error } = useFDA(url);
};

export default Recalls;
