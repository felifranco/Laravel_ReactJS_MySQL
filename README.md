# Laravel_ReactJS_MySQL

Single project using Laravel, React and MySQL

Se consideró el uso de Docker para este proyecto

# MySQL in Docker

Descargar la imagen de docker, [MySQL - Official Image](https://hub.docker.com/_/mysql), desde Docker Hub:

```shell
docker pull mysql:latest
```

Crear un contenedor con la imagen recién descargada, habilitar el puerto 3306 que es el predeterminado para MySQL:

```shell
docker run --name mysql-service -e MYSQL_ROOT_PASSWORD=PeDi6rltEhAqategas -d -p 3306:3306 mysql:latest
```

Verificar el puerto asignado al contenedor:

```shell
docker port mysql-service
```

Ingresar al contenedor con `exec`:

```shell
docker exec -it mysql-service bash
```

Se puede ingresar a MySQL con el usuario root:

```shell
mysql -u root -p
```

Se utilizarán los parámetro --host y --port para conectar al contenedor desde el `host`:

```shell
mysql --host=127.0.0.1 --port=3306 -u root -p
```

Crear la base de datos necesaria:

```shell
CREATE DATABASE basic_info;
USE basic_info;
CREATE TABLE form (name VARCHAR(100), email VARCHAR(100), birth DATE, message VARCHAR(4000), image
BLOB);
```

# Laravel

## Creación del proyecto

Para crear un proyecto Laravel se ha optado utilizar `Laravel Sail` por su facilidad de ejecución. Según la documentación oficial de [Laravel Sail](https://laravel.com/docs/11.x/sail), _es una interfaz de línea de comandos liviana para interactuar con el entorno de desarrollo Docker de Laravel_. Como el entorno de desarrollo se encuentra en Linux se utilizará la guía [Sail on Linux](https://laravel.com/docs/11.x/installation#sail-on-linux):

Definir el contexto de Docker que se utilizará

```shell
docker context use default
```

Crear un nuevo proyecto

```shell
curl -s https://laravel.build/laravel-backend?with=mysql | bash
```

Ingresamos a la carpeta `laravel-backend`

```shell
cd laravel-backend
```

Al finalizar la ejecución del comando se podrá ver un proyecto con todos los recursos necesarios. Antes de levantarlo se modificará el archivo el [docker-compose.yml](./laravel-backend/docker-compose.yml) para que tenga una configuración de MySQL como en la sección [MySQL in Docker](#mysql-in-docker), se creará el archivo [0001_01_01_000003_create_forms_table.php](laravel-backend/database/migrations/0001_01_01_000003_create_forms_table.php) para que al ejecutar `RUN MIGRATIONS` se cree la tabla `form` y se modificarán las credenciales de la base de datos que se encuentran en el archivo [.env](./laravel-backend/.env). Una vez finalizadas esas modificaciones levantamos el proyecto:

```shell
./vendor/bin/sail up
```

con el siguiente comando se puede finalizar la ejecución del proyecto:

```shell
./vendor/bin/sail down
```

pero si se desea remover todo rastro de imagenes y volúmenes creados durante la ejecución se puede correr:

```shell
./vendor/bin/sail down --rmi all -v --remove-orphans
```

los argumentos a la derecha de `down` pertenecen a `Docker Compose` por lo que ejecutar el siguiente comando generaría el mismo resultado:

```shell
docker compose down --rmi all -v --remove-orphans
```

Con esto tenemos una versión preliminar del proyecto de backend base.

## Cambios al proyecto

```shell

```

```shell

```

# Notas

```shell

```

```shell

```

# Referencias

- [How to Set Up and Configure MySQL in Docker](https://www.datacamp.com/tutorial/set-up-and-configure-mysql-in-docker)
- [6.2.4 Connecting to the MySQL Server Using Command Options](https://dev.mysql.com/doc/refman/8.0/en/connecting.html)
- [Eloquent: API Resources](https://laravel.com/docs/11.x/eloquent-resources)
- [Laravel Installation - Docker Compose](https://laravel.com/docs/11.x/installation#sail-on-linux)
- []()
- []()
- []()
- []()
- []()
- []()
