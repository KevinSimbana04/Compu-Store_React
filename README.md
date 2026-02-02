# 🖥️ Compu-Store

Documentación oficial del proyecto **Compu-Store**, una aplicación web de **comercio electrónico** desarrollada con **React**, enfocada en la venta de productos tecnológicos y la gestión administrativa mediante un dashboard privado.

---

## 📌 Descripción General

**Compu-Store** es una plataforma de e-commerce que permite a los usuarios:

* Navegar por un catálogo de productos tecnológicos
* Gestionar un carrito de compras
* Realizar pedidos de forma segura

Además, cuenta con un **panel de administración** completo para:

* Gestión de productos
* Gestión de usuarios
* Visualización de estadísticas y ventas

---

## 🧰 Stack Tecnológico

### 🎨 Frontend

* **React (Vite)** – Construcción de interfaces de usuario modernas y rápidas
* **Tailwind CSS** – Estilos utilitarios para un diseño responsivo
* **React Router DOM** – Manejo de rutas públicas y privadas
* **Chart.js / React-Chartjs-2** – Gráficos estadísticos en el dashboard
* **SweetAlert2** – Alertas y notificaciones modales

### 🔥 Backend / Servicios

* **Firebase Authentication** – Registro, login y recuperación de cuentas
* **Firebase Firestore** – Base de datos NoSQL (productos, usuarios, ventas)
* **Firebase Storage** – Almacenamiento de imágenes de productos

---

## 📁 Estructura del Proyecto

La estructura principal dentro de `src/` es la siguiente:

```
src/
├── assets/              # Imágenes e iconos
├── components/          # Componentes públicos reutilizables
├── componentsprivate/   # Componentes exclusivos del dashboard
├── context/             # Manejo de estado global (CartContext)
├── firebase/            # Configuración de Firebase
├── layout/              # Vistas del panel de administración
├── pages/               # Páginas públicas
├── services/            # Lógica de negocio y Firebase
```

### 📦 Descripción de Carpetas

* **assets**: Recursos estáticos (logos, imágenes)
* **components**: Header, Footer, Cards, Carrito
* **componentsprivate**: HeaderPrivate, AsidePrivate
* **context**: Estado global de la aplicación
* **firebase**: Inicialización y configuración de Firebase
* **layout**: Dashboard, gestión y vistas privadas
* **pages**: Inicio, Login, Registro, Catálogo, Nosotros
* **services**: Comunicación con Firebase y reglas de negocio

---

## 🧩 Módulos Principales

### 🌐 Módulo Público (Tienda)

Accesible para cualquier visitante.

* **Inicio (Home.jsx)**

  * Carrusel de productos destacados
  * Categorías principales

* **Catálogo (Productos.jsx)**

  * Listado de productos
  * Filtros de búsqueda

* **Detalle de Producto**

  * Vista individual (modal o página)
  * Agregar productos al carrito

* **Carrito de Compras**

  * Gestión de productos seleccionados
  * Cálculo de total
  * Simulación de compra

* **Autenticación**

  * Registro de usuarios
  * Login seguro

---

### 🔐 Módulo Privado (Dashboard / Admin)

Accesible solo para usuarios autenticados.

* **Dashboard (Dashboard.jsx)**

  * Ventas totales
  * Ingresos
  * Productos activos
  * Gráficos de rendimiento
  * Ventas recientes

* **Gestión de Productos (ProductosAdmin.jsx)**

  * Crear productos
  * Editar productos
  * Eliminar productos
  * Control de stock

* **Gestión de Usuarios (UsuariosAdmin.jsx)**

  * Visualización de usuarios registrados

* **Perfil (Perfil.jsx)**

  * Ver y editar datos personales
  * Cambio de contraseña
  * Cerrar sesión

---

## ⚙️ Servicios (Lógica de Negocio)

La comunicación con Firebase se centraliza en la carpeta `services/`.

### 🔑 authServices.js

* `registrarUsuario` – Crea cuenta en Auth y perfil en Firestore
* `iniciarSesion` – Autenticación de usuarios
* `cerrarSesion` – Cierre de sesión
* `actualizarPerfilUsuario` – Actualización de datos
* `actualizarContrasenaUsuario` – Cambio de contraseña

### 📦 productServices.js

* Obtener productos
* Agregar nuevos productos
* Editar productos
* Eliminar productos

### 💰 saleServices.js

* Registrar nuevas ventas
* Consultar historial de ventas
* Generar reportes

---

## 🚀 Configuración e Instalación

### 📋 Requisitos

* Node.js instalado

### 📥 Instalación

```bash
npm install
```

### 🔐 Variables de Entorno

Configurar Firebase en:

```
src/firebase/firebase.js
```

### ▶️ Ejecutar en Desarrollo

```bash
npm run dev
```

### 📦 Compilar para Producción

```bash
npm run build
```

---

## 🔄 Flujos Clave

### 🛒 Flujo de Compra

```
Usuario → Agrega al Carrito → Checkout →
Registro en colección ventas →
Actualización de stock en productos
```

### 🔐 Flujo de Autenticación

```
Usuario → Registro → Firebase Auth →
Colección users → Acceso a Dashboard
```

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y académicos.

---

✨ **Compu-Store** – Plataforma moderna de comercio electrónico con React y Firebase
