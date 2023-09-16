## Prueba técnica para Grupo Alianza Empresarial

### Introducción

Este proyecto es una prueba técnica para Grupo Alianza Empresarial. El proyecto consiste en una aplicación web para la gestión de empleados y cargos en una empresa. La aplicación permite a los usuarios visualizar, crear, editar y eliminar registros de empleados y cargos. Los datos se almacenan en una API RESTful que se comunica con la aplicación a través de llamadas HTTP.

### Características

- **Visualización de Datos**: Los usuarios pueden visualizar todos los registros de empleados y cargos en tablas separadas.
- **Creación de Registros**: Los usuarios pueden crear nuevos registros de empleados y cargos utilizando modales con formularios de entrada.
- **Edición de Registros**: Los usuarios pueden editar registros existentes haciendo clic en el icono de editar correspondiente a cada fila en la tabla.
- **Eliminación de Registros**: Los usuarios pueden eliminar registros existentes haciendo clic en el icono de eliminar correspondiente a cada fila en la tabla.
- **Paginación y Filtrado**: La tabla proporciona opciones de paginación y filtrado para manejar grandes conjuntos de datos con facilidad.
- **Responsive Design**: El diseño es responsivo, proporcionando una experiencia de usuario fluida en una variedad de dispositivos y tamaños de pantalla.

### Tecnologías Utilizadas

- **React**: Utilizado para construir la interfaz de usuario del proyecto.
- **TypeScript**: Utilizado para agregar tipado estático al código JavaScript.
- **CSS Modules**: Utilizado para estilizar los componentes de manera modular.ç
- **Axios**: Utilizado para realizar llamadas HTTP a la API.
- **React Router**: Utilizado para manejar el enrutamiento de la aplicación.
- **React Icons**: Utilizado para agregar iconos a la aplicación.

### Configuración del Proyecto

1. **Clonar el Repositorio**

   ```
   git clone [url_del_repositorio]
   ```

2. **Instalar Dependencias**

   ```
   npm install
   ```

3. **Ejecutar el Proyecto**
   ```
   npm run dev
   ```
4. **En otra terminal, ejecutar el json server**
   ```
   npm run server
   ```
5. **Abrir la Aplicación**
   ```
   http://localhost:5173
   ```
6. **Abrir el json server**
   ```
   http://localhost:3000
   ```

### Estructura del Proyecto

El proyecto sigue una estructura modular con una separación clara de componentes y utilidades:

- `src/components/`: Contiene todos los componentes reutilizables, como la tabla, los modales, etc.
- `src/utils/`: Contiene utilidades y hooks para realizar operaciones como llamadas a la API.
- `src/interfaces/`: Contiene las interfaces TypeScript para definir los tipos de datos utilizados en el proyecto.
- `src/styles/`: Contiene los archivos de estilos CSS.

### Gitflow

El proyecto sigue una estrategia de ramificación Gitflow con dos ramas principales: `main` y `develop`. La rama `main` contiene el código de producción, mientras que la rama `develop` contiene el código de desarrollo. Las ramas de características se ramifican de la rama `develop` y se fusionan en la rama `develop` una vez que se completa la característica. Las ramas de lanzamiento se ramifican de la rama `develop` y se fusionan en la rama `main` una vez que se completa el lanzamiento. Las ramas de corrección de errores se ramifican de la rama `main` y se fusionan en la rama `main` una vez que se completa la corrección de errores.

**Desarrollado con ❤️ por [Jonathan](https://github.com/Jony1754)**
