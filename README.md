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

Para crear un proyecto Laravel se ha optado utilizar `Laravel Sail` por su facilidad de ejecución, la versatilidad de utilizar distintas versiones de PHP en un mismo equipo y la portabilidad. Según la documentación oficial de [Laravel Sail](https://laravel.com/docs/11.x/sail), _es una interfaz de línea de comandos liviana para interactuar con el entorno de desarrollo Docker de Laravel_. Como el entorno de desarrollo se encuentra en Linux se utilizará la guía [Sail on Linux](https://laravel.com/docs/11.x/installation#sail-on-linux):

Definir el contexto de Docker que se utilizará

```shell
docker context use default
```

Crear un nuevo proyecto

```shell
curl -s https://laravel.build/laravel-backend?with=mysql | bash
```

Al finalizar la ejecución del comando se podrá ver un proyecto con todos los recursos necesarios. Con esto tenemos una versión preliminar del proyecto de backend base.

## Cambios al proyecto

Para crear un API con el proyecto Laravel con Sail primero ingresamos a la carpeta `laravel-backend`

```shell
cd laravel-backend
```

Antes de cualquier modificación en el código se modificará el archivo el [docker-compose.yml](./laravel-backend/docker-compose.yml) para que tenga una configuración de MySQL como en la sección [MySQL in Docker](#mysql-in-docker), y se modificarán las credenciales de la base de datos que se encuentran en el archivo [.env](./laravel-backend/.env). Luego de las modificaciones anteriores procedemos a crear un modelo para la tabla `Form` de la base de datos:

```shell
./vendor/bin/sail artisan make:model Form --migration
```

La ejecución del comando anterior creó el archivo [Form.php](./laravel-backend/app/Models/Form.php) y el archivo de migración [2024_04_20_161015_create_forms_table.php](./laravel-backend/database/migrations/2024_04_20_161015_create_forms_table.php).

Ahora se corresponde crear un Controlador para la definición de las funciones del API Rest:

```shell
./vendor/bin/sail artisan make:controller FormController
```

Se creó el archivo [FormController.php](./laravel-backend/app/Http/Controllers/FormController.php). Crear una API, será la que recibirá las peticiones HTTP del backend:

```shell
./vendor/bin/sail php artisan install:api
```

Se creó el archivo [api.php](./laravel-backend/routes/api.php) y otros archivos de migración.

## EJECUTAR EL PROYECTO

### API Rest

Ingresar a la carpeta `laravel-backend`

```shell
cd laravel-backend
```

Correr el proyecto

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

```shell

```

```shell

```

```shell

```

```shell

```

# Notas

El comando `build` del propio Sail es necesario ejecutarlo cada vez que se hacen cambios en el docker-compose.yml

```shell
./vendor/bin/sail build
```

Restaurar la base de datos con el comando de [`artisan migrate`](https://laravel.com/docs/master/migrations#running-migrations):

```shell
./vendor/bin/sail php artisan migrate
```

```shell

```

```shell

```

```shell

```

# Referencias

- [How to Set Up and Configure MySQL in Docker](https://www.datacamp.com/tutorial/set-up-and-configure-mysql-in-docker)
- [6.2.4 Connecting to the MySQL Server Using Command Options](https://dev.mysql.com/doc/refman/8.0/en/connecting.html)
- [Eloquent: API Resources](https://laravel.com/docs/11.x/eloquent-resources)
- [Laravel Installation - Docker Compose](https://laravel.com/docs/11.x/installation#sail-on-linux)
- [Guía de Laravel Sail](https://desarrolloweb.com/articulos/laravel-sail)
- [Available Column Types](https://laravel.com/docs/9.x/migrations?source=post_page-----80a516abdba1--------------------------------#available-column-types)
- [Laravel CSRF Protection Guide](https://www.stackhawk.com/blog/laravel-csrf-protection-guide/)
- [Validation](https://laravel.com/docs/11.x/validation)
- []()
- []()
