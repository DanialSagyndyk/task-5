import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/service.js";
import { productKeys } from "./useProducts.js";
export default function useProduct(id) {
  return useQuery({ queryKey: productKeys.detail(id), queryFn: ({ signal }) => getProduct(id, { signal }), enabled: Boolean(id) });
}
