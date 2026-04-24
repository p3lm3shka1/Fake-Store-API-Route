const API_URL = "https://fakestoreapi.com";
const LOCAL_URL = "http://localhost:3001";

export async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, { ...options });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
}

// fetch fakestore
export function fetchProduct(id) {
  return apiFetch(`${API_URL}/products/${id}`);
}

// fetch products
export function fetchProducts() {
  return apiFetch(`${API_URL}/products`);
}

// fetch json-server
export function fetchLocalProduct(id) {
  return apiFetch(`${LOCAL_URL}/products/${id}`);
}

export function fetchLocalProducts() {
  return apiFetch(`${LOCAL_URL}/products`);
}

// update product
export function patchLocalProduct(id, data) {
  return apiFetch(`${LOCAL_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// add new product
export function addProduct(data) {
  return apiFetch(`${LOCAL_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// user ratings
export async function fetchUserRating(productId) {
  const list = await apiFetch(
    `${LOCAL_URL}/productRatings?productId=${productId}`,
  );
  return list && list.length > 0 ? list[0].rating : null;
}

export async function saveUserRating(productId, rating) {
  const res = await apiFetch(
    `${LOCAL_URL}/productRatings?productId=${productId}`,
  );
  if (res && res.length > 0) {
    return apiFetch(`${LOCAL_URL}/productRatings/${res[0].id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
  } else {
    return apiFetch(`${LOCAL_URL}/productRatings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating }),
    });
  }
}
