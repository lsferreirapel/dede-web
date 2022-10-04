import { createOneProduct, deleteOneProduct, getAllProducts } from "./api.js";
import { formatCurrency } from "./utils.js";

const productsList = document.getElementById("productsList");
const createForm = document.getElementById("createForm");
const deleteForm = document.getElementById("deleteForm");

async function renderProducts() {
  const products = await getAllProducts();

  const productsHtml = products.map(
    (product, index) =>
      `<tr>
      <td>
        <span class="custom-checkbox">
          <input type="checkbox" id="checkbox${index}" name="options[]" value="${
        product.id
      }">
          <label for="checkbox${index}"></label>
        </span>
      </td>
      <td><img src="${product.image}" alt="Imagem ${
        product.name
      }" class="image-preview"></td>
      <td>${product.name}</td>
      <td>R$${formatCurrency(product.price)}</td>
      <td>${product.quantity}</td>
      <td>${product.description}</td>
      <td>
        <a href="#deleteProductModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      </td>
    </tr>`
  );
  // <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>

  productsList.innerHTML = productsHtml.join("");
}

async function createProduct() {
  const { image, name, price, quantity, description } =
    document.forms["createProduct"];

  await createOneProduct(
    image.value ?? undefined,
    name.value,
    Number(price.value),
    Number(quantity.value),
    description.value
  );
  document.location.reload(true);
}

window.addEventListener("load", renderProducts);

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createProduct();
});

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedProducts = document.querySelectorAll(
    "table tbody input[type='checkbox']"
  );

  selectedProducts?.forEach(async (select) => {
    if (select?.checked) {
      await deleteOneProduct(select.value);
    }
  });

  document.location.reload(true);
});
