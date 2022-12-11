const API_BASE_URL = "https://api.tvmaze.com";

async function apiGet(query) {
  const response = await fetch(`${API_BASE_URL}/${query}`).then((r) =>
    r.json()
  );
  return response;
}

export default apiGet;
