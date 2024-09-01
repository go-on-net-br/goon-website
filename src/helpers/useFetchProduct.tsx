import { Produto } from "@/types/produto";
import useSWR, { Fetcher } from "swr";

const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/produtos?populate=deep`;
const fetcher: Fetcher<
  {
    data: Produto[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  },
  string
> = (url) =>
  fetch(url, {
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  }).then((r) => r.json());

export default function useFetchProduct(qp: string[]) {
  return useSWR(`${API_URL}&${qp.join("&")}`, fetcher);
}
