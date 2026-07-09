const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
const readToken = process.env.SANITY_API_READ_TOKEN;

type SanityFetchOptions<QueryParams extends Record<string, string>> = {
  query: string;
  params?: QueryParams;
};

export async function sanityFetch<Result, QueryParams extends Record<string, string> = Record<string, string>>({
  query,
  params = {} as QueryParams,
}: SanityFetchOptions<QueryParams>): Promise<Result> {
  if (!projectId || !dataset) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.");
  }

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  const response = await fetch(url, {
    headers: readToken
      ? {
          Authorization: `Bearer ${readToken}`,
        }
      : undefined,
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Sanity request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as { result: Result };

  return payload.result;
}
