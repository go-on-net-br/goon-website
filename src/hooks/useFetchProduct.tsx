import { Produto } from "@/types/produto";
import useSWR, { Fetcher } from "swr";
import { buildMediaQPs } from "../helpers/qpHelper";

const API_URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/produtos?populate[marca][fields][0]=Marca&populate[categoria][fields][0]=Titulo&${buildMediaQPs("FotoseVideos")}`;
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
    next: { revalidate: 1800 },
  }).then((r) => r.json());

export default function useFetchProduct(qp: string[]) {
  return useSWR(`${API_URL}&${qp.join("&")}`, fetcher);
}
