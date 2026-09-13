import QueryString from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type QueryParams = Record<string, any>;

const serverFetch = async <T = any>(
  endpoint?: string,
  query?: QueryParams,
  cache: RequestInit = { cache: "force-cache" },
): Promise<T | false> => {
  let url: string = BASE_URL || "";
  if (endpoint) url += endpoint;
  if (query) url += `?${QueryString.stringify(query)}`;

  console.log(url);

  try {
    const res = await fetch(`${url}`, cache);
    const json: T = await res.json();
    return json;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
};

export { serverFetch };


