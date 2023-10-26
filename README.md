# App de citas

## Instrucciones para instalar y ejecutar el proyecto

### Clonar repositorio dentro de wsl
- git clone https://github.com/EduDan343/app-citas.git

### Instalar y configurar backend

Para ejecutar el backend, vamos a la carpeta /api y ejecutamos el siguiente comando
- npm install

Despues tenemos que construir la imagen de docker, para ello se debe tener instalado Docker Desktop:
- https://www.docker.com/products/docker-desktop/

Una ves instalado configuramos Docker para poder trabajar con Windows Subsystem for Linux (WSL), para ello debemos tener ya instalado WSL2 en windows, vamos a:
- Configuracion - General - Activamos Use the WSL 2 based engine

![Esta es una imagen de ejemplo](/public/configuracion_docker.png)

Una ves configurado construimos la imagen de docker que contiene la base de datos Postgres y administrador web pgadmin

Ejecutamos el siguiente comando estando en la carpeta /api del backend
- docker compose build

Una ves configurado las imagenes las ejecutamos con los siguientes comandos:

- docker compose up -d pgadmin


- docker compose up -d postgres

Por ultimo ejecutamos el backend con el comando:
- npm run start

## Instalar y configurar frontend App Citas

Para ejecutar el frontend primero vamos a la carpeta /client
- /client

Instalamos los packetes con el comando
- npm install

Una ves instalados ejecutamos el proyecto con el comando: 
- npm run dev

