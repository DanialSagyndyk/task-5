import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/service.js";
export const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  list: filters => [...productKeys.lists(), filters],
  details: () => [...productKeys.all, "detail"],
  detail: id => [...productKeys.details(), id],
};
export function useProducts() {
  const query = useQuery({ queryKey: productKeys.list({ limit: 194 }), queryFn: ({ signal }) => getProducts({ signal }), select: data => data.products ?? [] });
  return { products: query.data ?? [], loading: query.isLoading, error: query.error?.message ?? "", ...query };
}
export function useProductMutations() {
  const client = useQueryClient();
  const invalidate = () => client.invalidateQueries({ queryKey: productKeys.all });
  const create = useMutation({ mutationFn: createProduct, onSuccess: invalidate });
  const update = useMutation({ mutationFn: updateProduct, onSuccess: invalidate });
  const remove = useMutation({ mutationFn: deleteProduct, onSuccess: invalidate });
  return { create, update, remove };
}
