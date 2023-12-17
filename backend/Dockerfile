#Establecer la imagen base

FROM node:18.14.0

#Crear y establecer el directorio de mi contenedor

WORKDIR /3RA PREENTREGA/backend

#Variable de entorno
#ENV DB_URI = mongodbatlas

#Agregar argumentos para el .env, por defecto en desarrollo

ARG ENV_FILE=.env.development

#Comando para ejecutar en producción: docker build --build-arg ENV_FILE = .env.production -t test:production

#Nombre del archivo de ruta del archivo
COPY package*.json ./
COPY src ./src
COPY $ENV_FILE ./

#Instalar dependencias

RUN npm install

#Puerto de mi app

EXPOSE 8080

#Comando para iniciar mi app

CMD [ "node", "src/index.js"]

# Comando para compilar: docker build -t index.js . 

# Comando para ejecutar: docker run -p 8080:8080 index.js 