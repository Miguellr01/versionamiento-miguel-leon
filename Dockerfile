# Imagen base
FROM nginx:alpine

# Copiar los archivos de la aplicación al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
