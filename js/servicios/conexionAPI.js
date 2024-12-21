const BD_URL = "https://67639a9217ec5852cae9544c.mockapi.io/products";

const productos = async () => {
    try {
        const response = await fetch(BD_URL);
        const data = await response.json();
        return data;
    }catch (error) {
        console.error("Hubo un error de conexion a la API", error);
    }

};

const createProduct = async (name, price, image) => {
    try {
      const response = await fetch(BD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, image }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Hubo error en la solicitud POST:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${BD_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error en la solicitud DELETE:", error);
    }
  };
  

export const servicioProductos = {
    productos,
    createProduct,
    deleteProduct,
};

