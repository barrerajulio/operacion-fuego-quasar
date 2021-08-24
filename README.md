# Operación Fuego de Quasar

Han Solo ha sido recientemente nombrado General de la Alianza Rebelde y busca dar un gran golpe contra el Imperio Galáctico para reavivar la llama de la resistencia.

El servicio de inteligencia rebelde ha detectado un llamado de auxilio de una nave portacarga imperial a la deriva en un campo de asteroides. El manifiesto de la nave es ultra clasificado, pero se rumorea que transporta raciones y armamento para una legión entera.

## Consideraciones

Se adjunta export para usarlo en postman e interactuar con la API ya incluye entorno de desarrollo y productivo. Ruta: projects/api-design-spec/operacion-fuego-quasar-api.postman_collection.json

El repositorio tiene integración y despliegue continuo y las variables ya están configuradas en él mismo.

Se maneja lerna para mantener un mono-repositorio y una librería core que extrae la lógica de negocio genérica.

La mayor parte de pruebas unitarias son orientadas a mantener la menor deuda de confianza en lógica de negocio delicada.

El proyecto está montado con el framework de serverless y deje documentados varios tickets https://github.com/codebit-labs/operacion-fuego-quasar/issues con proceso de análisis.

La forma de resolver el ejercicio no es realista pero intenta exponer el conocimiento de varias tecnologías y metodologias entre las que destaco:

- Arquitectura hexagonal
- SOLID
- TDD
- Manejo de AWS
- Manejo de serverless
- Lerna
- Inyección de dependencias

Fue montado a propósito con express y no algun framework como nestjs para justo ocuparme de resolver retos de capa de validación y ruteo.

Con respecto a la db no invertí mucho tiempo en una estructura mayor así que solo existe una tabla para mantener los mensajes parciales.

**Url productivo:** https://qfo6g6d273.execute-api.us-east-1.amazonaws.com/dev/v1

**NOTA 1**: Perdón por mi mal inglés en varias secciones ya no tuve tiempo de volver a analizar si fue escrito de la mejor manera. Si necesitan que explique la intención de algun caso narrado con gusto lo haré.

**NOTA 2**: intente simular un entorno de trabajo cotidiano. Administrando el proyecto, tickets y PR's

**NOTA 3**: Con respecto a API Design spec, genere un pequeño archivo en raml para escribir primero la especificación con la que debia cumplir el api. Quise abarcar oauth2.0 con auth0 pero creo que fue demasiado lo que intente y para no tardar más días no está implementado en código (Ruta: projects/api-design-spec/api.raml)

**NOTA 4**: igual quise implementar microservicios disparados por eventos con eventbridge pero me fue inviable igual a causa de tiempo; entonces esos tickets los deje sin completar

## Instrucciones de instalación

### Requerimientos globales

- commitlint [https://commitlint.js.org/#/guides-local-setup](https://commitlint.js.org/#/guides-local-setup)
- lerna [https://github.com/lerna/lerna](https://github.com/lerna/lerna)
- serverless [https://www.serverless.com/](https://www.serverless.com/)

### Instalación

Es requerido contar con el cliente de lerna instalado de manera global.

```bash
npm i -g lerna-cli
```

Ejecutar

`lerna bootstrap`

que se encargara de instalar todas las dependencias del proyecto

**lerna run build** que será el encargado de construir las librerias creadas para este proyecto (core)

si se quiere ejecutar las pruebas unitarias de todos los proyectos el comando debe ser **lerna run test**

Si se desea hacer un despliegue del proyecto en la nube de amazon considere llenar el archivo env.[stage].json, para ello es necesario renombrar el archivo env.example.json a .env.[stage].json donde stage es el entorno de trabajo sobre el que se desea trabajar, se recomienda dev quedando el archivo como .env.dev.json, en el encontrará varias variables que deben ser configuradas para poder recrear la base de datos y completar la subida a aws.

- Debe crear un bucket en S3 con el nombre **codebit-labs-fo-api-serverless**
- Deberá seguir las instrucciones de instalación y configuración de serverless y aws https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

## Desafío

Como jefe de comunicaciones rebelde, tu misión es crear un programa en Golang que retorne la fuente y contenido del mensaje de auxilio. Para esto, cuentas con tres satélites que te permitirán triangular la posición, ¡pero cuidado! el mensaje puede no llegar completo a cada satélite debido al campo de asteroides frente a la nave.

**Posición de los satélites actualmente en servicio**

- Kenobi: [-500, -200]
- Skywalker: [100, -100]
- Sato: [500, 100]

### Nivel 1

Crear un programa con las siguientes firmas:

```js
// input: distancia al emisor tal cual se recibe en cada satélite
// output: las coordenadas ‘x’ e ‘y’ del emisor del mensaje
func GetLocation(distances ...float32) (x, y float32)
// input: el mensaje tal cual es recibido en cada satélite
// output: el mensaje tal cual lo genera el emisor del mensaje
func GetMessage(messages ...[]string) (msg string)
```

Consideraciones:

- La unidad de distancia en los parámetros de GetLocation es la misma que la que se utiliza para indicar la posición de cada satélite.
- El mensaje recibido en cada satélite se recibe en forma de arreglo de strings.
- Cuando una palabra del mensaje no pueda ser determinada, se reemplaza por un string en blanco en el array. Ejemplo: ["este", "es", "", "mensaje"]
- Considerar que existe un desfasaje (a determinar) en el mensaje que se recibe en cada satélite.
- Ejemplo:
  - Kenobi: ["", "este", "es", "un", "mensaje"]
  - Skywalker: ["este", "", "un", "mensaje"]
  - Sato: ["", ", "es", ", "mensaje"]

### Nivel 2

Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine, Amazon AWS, etc), crear el servicio /topsecret/ en donde se pueda obtener la ubicación de la nave y el mensaje que emite.

El servicio recibirá la información de la nave a través de un HTTP POST con un payload con el siguiente formato:

```json
POST → /topsecret/
{
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100.0,
            "message": ["este", "", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "distance": 115.5
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "distance": 142.7
            "message": ["este", "", "un", "", ""]
        }
    ]
}
```

La respuesta, por otro lado, deberá tener la siguiente forma:

```json
RESPONSE CODE: 200
{
"position": {
"x": -100.0,
"y": 75.5
},
"message": "este es un mensaje secreto"
}
```

En caso que no se pueda determinar la posición o el mensaje, retorna:

RESPONSE CODE: 404

### Nivel 3

Considerar que el mensaje ahora debe poder recibirse en diferentes POST al nuevo servicio /topsecret_split/, respetando la misma firma que antes. Por ejemplo:

```json
POST → /topsecret_split/{satellite_name}
{
"distance": 100.0,
"message": ["este", "", "", "mensaje", ""]
}
```

Crear un nuevo servicio /topsecret_split/ que acepte POST y GET. En el GET la respuesta deberá indicar la posición y el mensaje en caso que sea posible determinarlo y tener la misma estructura del ejemplo del Nivel 2. Caso contrario, deberá responder un mensaje de error indicando que no hay suficiente información.
