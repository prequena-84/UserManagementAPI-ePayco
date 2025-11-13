## Inico de Proyecto Development Local
-----------
bash
npm run start:dev 
------------

## Inico de Proyecto Production Local
-------------
bash
npm run build
npm run start:prod
-------------

## Inicio del contener del Stage de desarrollo de la API - management-client
bash
docker compose up --build development

-------------------------------------------------------------------------------

## Inicio del contener del Stage de producción de la API -  management-client
bash
docker compose up --build production

--------------------------------------------------------------------------------

## Configuración Nodemailer (Envio de Mails)

Se necesita contar con los siguientes detos suministrador por tu proveedor SMTP:

Host: Ejemplo gmail  smtp.gmail.com, es de tipo string.
Port: 587 u otro asignado por tu prroveedor de servicios, es de tipo number.
Secure: Es de tipo Boolean.
User: Es el Correo de tu cuenta SMTP, es de tipo string.
Pass: Password otorgado por tu proveedor de Servicios.
Rejectunauthorized: Es de tipo Boolean.

## Definicion de Puerto donde va a escuchar la API
Se define en el archivo .env para producción y developer, la variable de entorno es PORT de tipo number.

## Definición de la tiempo de vida del Token OPT
Se define el tiempo de vida del token en la variable de entorno TIME_EXPIRE_OTP, y es de tipo number, se agregar el numero entero representado en minutos.

## Instalación del Proyecto
En la carpeta raiz del proyecto de ejecutar e lsiguiente comando en la consola:

npm install, y esto creara una carpeta node_modules con todas las dependencias del proyecto, recuerda que debes tener instalado  node y npm en tu maquina.

## Ejecución del Proyecto 
Se necesitara crear una carpeta en la raiz del proyecto con el nombre de build para almacenar la compilación del proyecto, y luego ejecutar la compilación en la consola para producción

npm run build

Y luego para ejeuctar el proyecto en el servidor puedes utilizar "npm run start" o "npm run start:prod" y deberias poder levantar el proyecto del microservicio entre el client y el microservicio de la Base de Datos Mongose.