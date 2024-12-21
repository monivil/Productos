import { servicioProductos } from  "../servicios/conexionAPI.js";


const productoContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
    const card = document.createElement("div");
    card.classList.add("card");

    
  card.innerHTML = `
  <div class="imagen__productos">
      <img src="${image}" alt="${name}">
  </div>
  <div class="card__info">
      <p>${name}</p>
      <div class="card__precio">
          <p>$${price}</p>
          <button class="button__eliminar" data-id="${id}">
              <img src="./assets/botoneliminar.png" alt="Eliminar">
          </button>
      </div>
  </div>
`;

addDeleteEvent(card, id);

return card

}

// para renderizar
const renderProducts = async () => {
    try {
      const listProducts = await servicioProductos.productos();
      listProducts.forEach((products) => {
        const productCard = createCard(products);
        productoContainer.appendChild(productCard);
      });
    } catch (error) {
      console.error("Error al renderizar los productos:", error);
    }
  };

  //para agregar producto mediante el formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("[data-nombre]").value;
    const price = document.querySelector("[data-precio]").value;
    const image = document.querySelector("[data-imagen]").value;

    if (name === "" || price === "" || image === "") {
      alert("Por favor, complete todos los campos.");
      return; // Detener el envío si algún campo está vacío
    }
  
    // Validar si la URL de la imagen es válida
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlPattern.test(image)) {
      alert("Por favor, ingrese una URL válida para la imagen.");
      return; // Detener el envío si la URL no es válida
    }

    try {
      const newProduct = await servicioProductos.createProduct(name,price,image);
      const newCard = createCard(newProduct);
      productoContainer.appendChild(newCard);
    } catch (error) {
      console.error("Hubo error al crear el producto:", error);
    }

    form.reset();

  });

  // elimina un producto mediante el boton 
function addDeleteEvent(card, id) {
  const deleteButton = card.querySelector(".button__eliminar");
  deleteButton.addEventListener("click", async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmDelete) {
    try {
      await servicioProductos.deleteProduct(id);
      card.remove();
    } catch (error) {
      console.error(`Error al eliminar el producto con id ${id}:`, error);
    }
  }
  });
}


  renderProducts();
