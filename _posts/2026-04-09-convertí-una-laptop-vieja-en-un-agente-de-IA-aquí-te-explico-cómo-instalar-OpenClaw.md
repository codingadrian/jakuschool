---
layout: post
title: "Convertí una laptop vieja en un agente de IA - aquí te explico cómo instalar OpenClaw"
author: adrian
categories: [ anthropic, ia, cursos gratis ]
image: assets/images/blogs/futuristic-OpenClaw-logo.png
---

OpenClaw (antes Clawdbot/Moltbot) es un agente de IA autónomo, open-source y auto-hospedado que corre localmente en tu máquina, usando LLMs para realizar tareas como gestionar archivos, enviar correos y controlar navegadores. Se conecta a apps de mensajería como WhatsApp y Telegram para actuar como un asistente personal, ofreciendo acceso profundo al sistema y automatización 24/7.

Empecé a usarlo hace un par de meses. Tenía una laptop vieja con Ubuntu y se la dediqué a esto. Desde entonces, me ayudó a montar un home server, programar varios dashboards web para controlar mis negocios e incluso un bot de trading de crypto que empezó con $420 dólares y ahora está alrededor de $515. Incluso tiene su propio Instagram: [https://www.instagram.com/theclawdio/](https://www.instagram.com/theclawdio/)

Esta es una guía para que puedas instalarlo.

⚠️ Este script instala software en tu sistema. Procedé solo si confiás en la fuente.

---

### 🚀 Versión rápida (para los impacientes)

1. Ejecutá el instalador
2. Elegí OpenRouter
3. Agregá tu API key
4. Seleccioná Telegram
5. Hatch en TUI
6. Ejecutá:

```bash
openclaw gateway
```

7. Escribile a tu bot en Telegram

---

### Paso 1

Abrí la terminal y ejecutá (para Linux):

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Esto abre el instalador de OpenClaw.

Primero va a preparar tu entorno. Verifica si tenés Node.js, y si no lo instala o lo actualiza. Va a requerir permisos de administrador, así que te va a pedir la contraseña.

Luego procede a instalar OpenClaw y pasa a finalizar la configuración. Ahí te va a mostrar una advertencia de seguridad, leela y te va a pedir confirmación para continuar.

Seleccioná "Yes" si querés seguir.

> Nota: Esta guía usa Linux. En macOS o Windows (WSL), el comando es similar.

---

### Paso 2

Se inicia el modo de configuración.

Primero tenés que seleccionar un proveedor de modelos. Este es un paso importante. Dependiendo de tu máquina, podés correr un modelo local, o si estás dispuesto a pagar, usar un proveedor como OpenRouter o Anthropic. Usá las flechas arriba y abajo para elegir.

También podés tener múltiples modelos. Yo tengo modelos locales, pero la máquina es muy vieja y lenta, entonces uso OpenRouter como principal y Anthropic dependiendo de lo que quiera hacer y cuánto esté dispuesto a gastar.

Si elegís OpenRouter o Anthropic, primero tenés que crear una cuenta en esos proveedores y generar un API key.

Si elegís Anthropic, también podés reutilizar tu login de Claude CLI, que usa tu suscripción de Claude.

Si elegís Ollama, necesitás tenerlo instalado. Luego podés descargar modelos manualmente (por ejemplo: `ollama run llama3`) y OpenClaw los va a usar.

---

### Paso 3

Una vez que elegiste el proveedor y te conectaste usando API keys, CLI o localmente, podés pasar a seleccionar el modelo.

Buscá el proveedor y seleccioná el modelo o modelos que vas a usar.

---

### Paso 4

Ahora vas a seleccionar el canal. Esta es la forma en la que te vas a comunicar con tu asistente de IA. Tenés opciones como Slack, Discord, WhatsApp, pero yo elegí Telegram.

Creá tu bot de Telegram:

En Telegram, escribile a @BotFather y ejecutá:

```
/newbot
```

Seguí los pasos y copiá el bot token.

Luego enviá:

```
/start
```

a tu bot en Telegram.

Vas a necesitar el token para conectarlo con OpenClaw.

---

### Paso 5

Ahora tenés que seleccionar el proveedor de Web Search. Esto le permite a tu agente buscar información en internet. Algunos requieren API key y otros no.

Este paso es opcional. Tu bot va a funcionar igual sin búsqueda web.

---

### Paso 6

Ahora vas a seleccionar los skills. Los Skills de OpenClaw son capacidades reutilizables que le permiten al agente hacer cosas, no solo chatear.

Pensalo como herramientas + workflows + inteligencia empaquetada. Se seleccionan presionando la barra espaciadora.

Por ejemplo, si querés que tu asistente se conecte a Gmail, agende reuniones y organice tu calendario, necesitás el skill "gog".

---

### Paso 7

Ahora es momento de configurar los hooks. Estos te permiten automatizar acciones cuando el agente ejecuta un comando, como guardar la memoria de tus sesiones.

---

### Paso 8

Podés "hatch" el bot. Sí, básicamente darle vida. Terminás de configurarlo y lo iniciás.

TUI significa que corre en la terminal, Web UI que va en el navegador, y "do this later" no hace nada, vas a tener que ejecutarlo manualmente.

TUI probablemente sea lo más fácil si ya estás en la terminal.

Luego ejecutá:

```bash
openclaw gateway
```

---

### Paso 8.1 – Aprobar tu chat de Telegram (IMPORTANTE)

La primera vez que le escribís a tu bot, OpenClaw puede requerir aprobación.

En la terminal, ejecutá:

```bash
openclaw pairing list telegram
```

Luego aprobá tu sesión:

```bash
openclaw pairing approve telegram <CODE>
```

Después de esto, tu bot debería responder.

---

### Paso 8.2 – Probar tu bot

Andá a Telegram y enviá: "Hola"

Si todo funcionó, tu bot debería responder.

Si no responde:

* Asegurate de que `openclaw gateway` esté corriendo
* Revisá tus API keys
* Verificá el bot token

---

### Paso 9 (opcional)

Si te arrepentís de todo lo que hiciste:

```bash
rm -rf ~/.openclaw
```

Si instalaste algún modelo local como Ollama:

```bash
rm -rf ~/.ollama
```

---

En cualquier momento, si no sabés qué hacer, sacale una foto o copiá el error/instrucción en ChatGPT, Gemini, Claude o la IA que prefieras y preguntá. Así fue como yo lo hice.
