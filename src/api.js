export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export async function getAllProducts() {
  const { data } = await api.get("/products");

  return data;
}

export async function createOneProduct(
  image,
  name,
  price,
  quantity,
  description
) {
  try {
    const { data } = await api.post("/products", {
      image,
      name,
      price,
      quantity,
      description,
    });

    return data;
  } catch (error) {
    console.warn("ERROR: ", error);
  }
}

export async function deleteOneProduct(id) {
  try {
    const { data } = await api.delete(`/products/${id}`);

    return data;
  } catch (error) {
    console.warn("ERROR: ", error);
  }
}
