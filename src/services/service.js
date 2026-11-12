const BASE = "https://dummyjson.com";
async function request(url, { signal, method = "GET", body } = {}) {
  const response = await fetch(url, { signal, method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  if (!response.ok) throw new Error(response.status === 404 ? "Product not found." : `API error: ${response.status}`);
  return response.json();
}
export function getProducts({ signal } = {}) { return request(`${BASE}/products?limit=194`, { signal }); }
export function getCategories({ signal } = {}) { return request(`${BASE}/products/categories`, { signal }); }
export function getProduct(id, { signal } = {}) { return request(`${BASE}/products/${encodeURIComponent(id)}`, { signal }); }
// DummyJSON simulates writes; changes are not persisted on its server.
export function createProduct(product) { return request(`${BASE}/products/add`, { method: "POST", body: product }); }
export function updateProduct({ id, ...changes }) { return request(`${BASE}/products/${id}`, { method: "PUT", body: changes }); }
export function deleteProduct(id) { return request(`${BASE}/products/${id}`, { method: "DELETE" }); }
