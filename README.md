Documentación del Proyecto Compu-Store
Esta documentación detalla la estructura, funcionamiento y tecnologías utilizadas en el proyecto Compu-Store, una aplicación web de comercio electrónico desarrollada con React.

1. Descripción General
Compu-Store es una plataforma de e-commerce que permite a los usuarios navegar por un catálogo de productos tecnológicos, gestionar un carrito de compras y realizar pedidos. Además, incluye un panel de administración completo para gestionar productos, usuarios y visualizar estadísticas de ventas.

2. Stack Tecnológico
Frontend
React (Vite): Librería principal para la construcción de interfaces de usuario.
Tailwind CSS: Framework de estilos utilitarios para un diseño moderno y responsivo.
React Router DOM: Manejo de rutas y navegación (públicas y privadas).
Chart.js / React-Chartjs-2: Visualización de gráficos estadísticos en el dashboard.
SweetAlert2: Alertas y notificaciones modales interactivas.
Backend / Servicios
Firebase Auth: Gestión de autenticación de usuarios (Registro, Login, Recuperación).
Firebase Firestore: Base de datos NoSQL para almacenar productos, ventas y perfiles de usuario.
Firebase Storage: Almacenamiento de imágenes de productos.
3. Estructura del Proyecto
La estructura de carpetas en src está organizada de la siguiente manera:

assets: Imágenes e iconos estáticos del sitio.
components: Componentes reutilizables de la interfaz pública (Header, Footer, Carrito, Cards).
componentsprivate: Componentes exclusivos del panel de administración (HeaderPrivate, AsidePrivate).
context: Manejo del estado global (ej. CartContext para el carrito de compras).
firebase: Configuración e inicialización de Firebase.
layout: Páginas del panel de administración (Dashboard, Gestión de Productos, Ventas, Perfil).
pages: Páginas públicas (Inicio, Login, Registro, Catálogo, Nosotros).
Services: Lógica de negocio y comunicación con Firebase.
4. Módulos Principales
A. Módulo Público (Tienda)
Accesible para cualquier visitante.

Inicio (Home.jsx): Carrusel de destacados y categorías principales.
Catálogo (Productos.jsx): Listado de productos con filtros.
Detalle de Producto: Vista individual (modal o página) para agregar al carrito.
Carrito de Compras: Gestión de items seleccionados, cálculo de total y simulación de compra.
Autenticación:
Registro: Creación de cuenta con validación de datos.
Login: Acceso seguro para clientes y administradores.
B. Módulo Privado (Dashboard / Admin)
Accesible solo para usuarios autenticados (y con rol de admin para ciertas funciones).

Dashboard (Dashboard.jsx):
Estadísticas en tiempo real (Ventas totales, Ingresos, Productos activos).
Gráficos visuales de rendimiento.
Tabla de ventas recientes.
Gestión de Productos (ProductosAdmin.jsx): CRUD completo (Crear, Leer, Actualizar, Eliminar) de productos.
Gestión de Usuarios (UsuariosAdmin.jsx): Visualización de usuarios registrados.
Perfil (Perfil.jsx):
Visualización de datos de cuenta.
Edición de información personal.
Cambio de contraseña.
Cerrar sesión.
5. Servicios (Lógica de Negocio)
La lógica de conexión con Firebase está centralizada en la carpeta Services:

authServices.js
:
registrarUsuario
: Crea cuenta en Auth y perfil en Firestore.
iniciarSesion
: Autentica al usuario.
cerrarSesion
: Finaliza la sesión actual.
actualizarPerfilUsuario
 / 
actualizarContrasenaUsuario
: Gestión de cuenta.
productServices.js
:
Funciones para obtener lista de productos, agregar nuevos, editar y eliminar inventario en Firestore.
saleServices.js
:
Registro de nuevas ventas y consulta de historial para reportes.
6. Configuración e Instalación
Para ejecutar este proyecto localmente:

Requisitos: Node.js instalado.
Instalar dependencias:
npm install
Configurar Variables de Entorno: Asegúrate de tener el archivo de configuración de Firebase correctamente en 
src/firebase/firebase.js
.
Ejecutar servidor de desarrollo:
npm run dev
Compilar para producción:
npm run build
7. Flujos Clave
Compra: Usuario -> Agrega al Carrito -> Checkout -> Se guarda en colección ventas -> Se actualiza stock en productos.
Autenticación: Usuario -> Registro -> Se guarda en Auth y colección users -> Acceso a Dashboard.
