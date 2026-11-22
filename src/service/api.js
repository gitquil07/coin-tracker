const baseURL = "https://api.coingecko.com/api/v3";

const apis = {
  markets: `${baseURL}/coins/markets`,
  search: `${baseURL}/search`,
  coins: `${baseURL}/coins`,
};

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const makeURL = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url;
};

const baseFetch = async (url, options = {}) => {
  const res = await fetch(url, { ...options });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error ??
        body?.status?.error_message ??
        `${res.status} ${res.statusText}`,
    );
  }

  return body;
};

export const fetchMarkets = async ({
  page = 1,
  vs_currency = "usd",
  sparkline = false,
  order = "market_cap_desc",
  per_page = 10,
  price_change_percentage = "24h",
} = {}) => {
  const url = makeURL(apis.markets, {
    page,
    order,
    sparkline,
    per_page,
    price_change_percentage,
    vs_currency,
  });

  return await baseFetch(url);
};

export const fetchCoinInfo = async (coin) => {
  const url = makeURL(`${apis.coins}/${coin}`);

  return await baseFetch(url);
};

export const search = async (key, options = {}) => {
  const params = {
    query: key,
  };
  const url = makeURL(apis.search, params);

  return await baseFetch(url, options);
};
