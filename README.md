# Oreka Developer Test

Este repositorio es un ejercicio tecnico para postular al cargo de Desarrollador/a Full Stack Junior en Oreka.

El objetivo es simular una situacion real: una aplicacion web nueva en SvelteKit todavia depende de un backend legacy separado. Tu tarea sera entender ambas partes, levantar los dos servidores y migrar la carta del restaurante hacia SvelteKit usando Drizzle.

Puedes y debes usar IA para trabajar. Programar con IA no es opcional en este cargo. Usa las herramientas que usarias normalmente: Cursor, Claude Code, Codex, ChatGPT, Copilot, documentacion oficial, Google, etc. En la entrevista te vamos a pedir que expliques que hiciste, que te ayudo a hacer la IA y que decisiones tomaste tu.

## Estructura

```txt
packages/
  legacy-api/   Backend legacy en Hono. Expone la carta actual del restaurante.
  web/          Aplicacion SvelteKit. Tiene Drizzle instalado, pero todavia lee desde legacy-api.
docs/
  context.md    Contexto del ejercicio y que estamos intentando evaluar.
```

## Como correr el proyecto

Instala dependencias desde la raiz:

```sh
pnpm install
```

Prepara las variables locales de la app web:

```sh
cp packages/web/.env.example packages/web/.env
```

Levanta el backend legacy en una terminal:

```sh
pnpm dev:legacy
```

Levanta la app web en otra terminal:

```sh
pnpm dev:web
```

La app web corre normalmente en `http://localhost:5173`.
El backend legacy corre en `http://localhost:8787`.

Para revisar que el backend legacy esta vivo:

```sh
curl http://localhost:8787/health
curl http://localhost:8787/api/menu
```

## Mision

Hoy `packages/web` muestra la carta consultando `packages/legacy-api`.

Queremos que la app SvelteKit deje de depender del backend legacy para mostrar la carta.

Tu tarea:

1. Crear un schema Drizzle en `packages/web` para categorias y productos.
2. Crear o ajustar la base de datos local de SvelteKit.
3. Migrar los datos actuales desde `legacy-api` hacia la base de datos de `web`.
4. Cambiar la pagina principal para que lea desde Drizzle, no desde `legacy-api`.
5. Agregar una funcionalidad simple para marcar un producto como disponible/no disponible.

No buscamos una interfaz perfecta. Buscamos que entiendas el flujo completo: dos servidores, datos legacy, migracion, base de datos, SvelteKit y una funcionalidad pequena funcionando.

## Entrega

Haz tus cambios en Git con commits claros.

En tu README o en una seccion al final de este archivo, explica brevemente:

- Como correr tu solucion.
- Que cambiaste.
- Que herramienta de IA usaste y para que.
- Que parte te costo mas.
- Que mejorarias si tuvieras mas tiempo.

En la videollamada vamos a pedirte que compartas pantalla y nos muestres la solucion corriendo.
