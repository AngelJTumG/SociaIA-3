# SociaIA-3

## Descripción
SocialIA es una aplicación que permite a los usuarios registrarse, iniciar sesión, crear publicaciones y gestionar categorías.

## Instalación
1. Clona el repositorio:
    ```sh
    git clone https://github.com/AngelJTumG/SociaIA-3.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd SociaIA-3
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```env
    PORT=3001
    URI_MONGO=mongodb://localhost:27017/socialIA
    KEY=Diabl0MYLIDEL$$
    ```

## Uso
1. Inicia el servidor en modo desarrollo:
    ```sh
    npm run dev
    ```
2. El servidor estará corriendo en `http://localhost:3001`.

## Credenciales de Admin
- **Email:** admin@gmail.com
- **Contraseña:** AdminPassword

## Categoría por Defecto
- **Nombre:** general
- **Descripción:** Categoría general

## Endpoints Principales
- **Autenticación:** `/socialIA/v1/auth`
- **Usuarios:** `/socialIA/v1/user`
- **Publicaciones:** `/socialIA/v1/publicacion`
- **Categorías:** `/socialIA/v1/categorias`

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](http://_vscodecontentref_/0) para más detalles.