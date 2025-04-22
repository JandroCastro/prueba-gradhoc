# 📋 Prueba Técnica - Gestión de Usuarios con Vite + Redux Toolkit

Este proyecto es una SPA (Single Page Application) creada con **Vite** y **React**, que consume la API pública de [https://randomuser.me](https://randomuser.me) para mostrar una tabla con 100 usuarios aleatorios. Se han implementado funcionalidades como filtrado, eliminación y restauración del estado.

---

## 🚀 Tecnologías usadas

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Lodash (debounce)](https://lodash.com/)


---

## 🛠️ Instalación y ejecución local

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. **Instala las dependencias**


```bash
npm install
```

3. **Inicia el servidor de desarrollo**


```bash
npm run dev
```

4. **Abre el navegador**


Accede a http://localhost:5173 para ver la aplicación en funcionamiento.


## 📦 Estructura del proyecto

```bash
src/
│
├── app/                # Configuración del store de Redux
│   └── store.ts
│
├── features/
│   └── users/          # Slice, API, tipos y adapters de usuario
│       ├── usersSlice.ts
│       ├── usersAPI.ts
│       ├── usersTypes.ts
│       └── usersAdapter.ts
│
├── pages/
│   └── UsersTable.tsx  # Componente principal
├── App.tsx # Renderizado principal de la herramienta
└── main.tsx
```


## ✅ Funcionalidades


✔️ Listado de 100 usuarios aleatorios en tabla.

🔍 Filtro por país en tiempo real (coincidencias parciales, insensibles a mayúsculas).

❌ Eliminación individual de filas.

♻️ Restauración del estado completo con botón "Reset".

🧹 Limpieza del filtro de país (vuelve a mostrar los usuarios pero sólo los no eliminados previamente).


## 🧠 Detalles técnicos


Los usuarios se almacenan en Redux como un diccionario (Record<string, User>) para acceso rápido y eficiente por ID.

Las eliminaciones se manejan de forma lógica a través de un array deletedUserIds.

Se puede restaurar el estado inicial completo con el botón Reset, incluso tras aplicar filtros o eliminar usuarios sin necesidad de nuevas llamadas a la API

El input de país permite búsqueda parcial: por ejemplo, escribir aus devuelve usuarios de Austria y Australia.

## Autor


Jandro Castro Alarcón -- @https://github.com/JandroCastro