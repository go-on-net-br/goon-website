export default async function fetchDataFromApi<T>(
  endpoint: string,
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}?populate=deep&pagination[start]=0&pagination[limit]=100`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((res) => res.data);
}
