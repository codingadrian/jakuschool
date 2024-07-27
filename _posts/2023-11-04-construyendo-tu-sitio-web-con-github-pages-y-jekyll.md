---
layout: post
title:  "Construyendo tu sitio web con GitHub Pages y Jekyll"
author: adrian
categories: [ Jekyll, GitHub Pages, tutorial ]
image: assets/images/4.jpg
---

En la era digital actual, tener un sitio web personal o profesional es casi una necesidad. Sirve como tu identidad digital, mostrando tu trabajo, portafolio, blog o cualquier contenido que quieras compartir con el mundo. Si bien existen varias formas de crear y alojar un sitio web, uno de los métodos más eficientes y sencillos es utilizar GitHub Pages y Jekyll. En este blog, te guiaré a través del proceso de creación de tu sitio web paso a paso.

## ¿Qué es GitHub Pages?

GitHub Pages es un servicio de alojamiento gratuito proporcionado por GitHub. Te permite alojar un sitio web estático directamente desde sus repositorios de GitHub. Si no estás familiarizado con los sitios web estáticos, son páginas web que no dependen del procesamiento del lado del servidor ni de bases de datos. En cambio, están prediseñados y se ofrecen tal cual a los visitantes, lo que los hace rápidos y seguros.

## ¿Qué es Jekyll?

Jekyll es un generador de sitios estáticos que facilita la creación y el mantenimiento de sitios web estáticos. Toma tu contenido, escrito en Markdown, y aplica plantillas para generar páginas HTML. Jekyll simplifica el proceso de desarrollo de sitios web y es perfecto para GitHub Pages.

## Empezando

Para crear tu sitio web usando GitHub Pages y Jekyll, sigue estos pasos:

### Paso 1: crea un repositorio de GitHub

1. Si no tienes una cuenta de GitHub, regístrate para obtener una en [https://github.com](https://github.com/).
2. Inicia sesión en tu cuenta de GitHub y crea un nuevo repositorio.
3. Asigna un nombre a tu repositorio con el siguiente formato: `nombre-de-sitio-web.github.io`.

### Paso 2: clona tu repositorio

1. Después de crear su repositorio, abre una terminal.
2. Utiliza el comando `git clone` para clonar tu repositorio en tu máquina local. Reemplaza tu nombre de usuario y el nombre del repositorio.

```bash
 git clone https://github.com/tunombredeusuario/nombredesitioweb.github.io.git
```
### Paso 3: instala Jekyll

1. Asegúrate de tener Ruby instalado en tu computadora. Puedes comprobar si Ruby está instalado ejecutando:

```bash
ruby -v
```

Si Ruby no está instalado, puede descargarlo desde [Ruby - Instalación](https://www.ruby-lang.org/en/documentation/installation/) o usar un administrador de versiones como RVM (Ruby Version Manager) para instalarlo.

2. Instala Jekyll y sus dependencias ejecutando:

```bash
gem install jekyll bundler
```

### Paso 4: crea tu sitio Jekyll

1. Cambia el directorio a tu repositorio de GitHub Pages clonado:

```bash
cd nombredetusitioweb.github.io
```

2. Crea un nuevo sitio Jekyll:

```bash
jekyll new .
```

### Paso 5: personaliza tu sitio

1. Abre el archivo `_config.yml` en tu repositorio y realiza cambios para configurar tu sitio, como cambiar el título y la descripción del sitio.

2. Crea páginas y publicaciones de blog (posts) agregando archivos Markdown a los `_posts` y directorios raíz.

3. Elije un tema de Jekyll o crea tu propio diseño editando HTML y CSS en las carpetas `_layouts` y `_sass`.

### Paso 6: obtén una vista previa de tu sitio

1. Inicia un servidor Jekyll local para obtener una vista previa de tu sitio ejecutando:

```bash
bundle exec jekyll serve
```

Tu sitio será accesible en http://localhost:4000.

### Paso 7: envia cambios a GitHub

1. Haz un "commit" de tus cambios y envíalos a tu repositorio de GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Paso 8: publica tu sitio

1. Haz click en el nombre de tu repositorio.
2. En la pestaña "Configuración", desplácese hacia abajo hasta la sección "Páginas de GitHub".
3. Seleccione la rama principal (main branch) como fuente y su sitio se publicará.

Crear un sitio web con GitHub Pages y Jekyll es una manera fantástica de crear una presencia profesional en línea. Es rentable, rápido y seguro, lo que lo convierte en una opción popular entre los desarrolladores y creadores de contenido. Si sigues los pasos descritos en esta guía, podrás tener tu sitio web en funcionamiento en poco tiempo. Ya sea que estés creando un portafolio, un blog o un sitio web personal, esta combinación de herramientas ofrece una solución poderosa y fácil de usar para sus necesidades de desarrollo web.