# 🎬 Film Finder

Bienvenido a **Film Finder**, una aplicación web para buscar y consultar información sobre películas y series. 🎥✨

## 🔗 Demo en Vivo

Prueba la aplicación en vivo haciendo clic en el siguiente enlace:

🔗 [Demo en vivo](https://films-alejandrette.netlify.app/)

## ⚙️ Tecnologías Utilizadas

- **React ⚛️**: Biblioteca para construir interfaces de usuario interactivas y dinámicas.
- **TypeScript 📝**: Mejora la seguridad y mantenibilidad del código mediante tipado estático.
- **Zustand 🧩**: Librería ligera para gestionar el estado global de la aplicación.
- **Axios 🔄**: Cliente HTTP para realizar solicitudes a la API de The Movie Database (TMDb).
- **Tailwind CSS 🎨**: Framework de diseño para crear una interfaz moderna y responsiva.

## 🌍 Características

✔ **Búsqueda de Películas y Series** 🎬  
Consulta una lista de películas y series según categorías o búsqueda por nombre.

✔ **Favoritos** ⭐  
Añade tus películas o series favoritas a tu lista personalizada.

✔ **Gestión del Estado con Zustand** 🔄  
La aplicación utiliza **Zustand** para manejar el estado global de las películas, favoritos y notificaciones.

✔ **Diseño Responsivo** 📱💻  
Adaptado para funcionar en dispositivos móviles, tabletas y escritorios.

## 📦 Instalación y Uso

- 1️ Clona el repositorio

```bash
git clone https://github.com/tu_usuario/Film-Finder.git  
cd Film-Finder
```

- 2️ Instala las dependencias

```bash
npm install
```

- 3️ Ejecuta la aplicación

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:3000` 🚀

### 📑 Funcionamiento de la Aplicación

- 1️ **Buscar Películas o Series**  
  Utiliza el campo de búsqueda para encontrar tus películas o series favoritas.

- 2️ **Ver Detalles**  
  Haz clic en cualquier película o serie para ver más detalles, como sinopsis, clasificación y más.

- 3️ **Añadir a Favoritos**  
  Agrega tus títulos favoritos para consultarlos más fácilmente.

### 📚 Gestión de Estado con Zustand

La aplicación utiliza Zustand para manejar el estado global de las películas y favoritos. Aquí te dejo un ejemplo de cómo se utiliza Zustand para gestionar los estados de las películas:

```ts
export const useFilms = create<FilmsState>((set) => ({  
  films: [],  
  favorites: [],  
  totalPages: 1,  
  category: '',  
  filmSearch: '',  
  mediaType: '',  
  notification: { text: '', error: false, show: false },  
  fetchFilms: async (page) => {  
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&page=${page}`;  
    const { data } = await axios.get(url);  
    set({ films: data.results, totalPages: data.total_pages });  
  },  
  addToFavorite: (film) => {  
    set((state) => ({ favorites: [...state.favorites, film] }));  
  },  
  removeFromFavorite: (film) => {  
    set((state) => ({  
      favorites: state.favorites.filter((favorite) => favorite.id !== film.id),  
    }));  
  },  
}));
```

### 🚀 Desarrollo Futuro

- 🔹 **Filtrado Avanzado de Películas**  
  Mejorar la búsqueda con más filtros como género, año, y calificación.

- 🔹 **Historial de Búsquedas**  
  Guardar el historial de búsquedas realizadas para fácil acceso.

- 🔹 **Notificaciones Personalizadas**  
  Añadir notificaciones de éxito o error al interactuar con la aplicación.

¡Espero que disfrutes la aplicación y continúes mejorándola! 🚀
