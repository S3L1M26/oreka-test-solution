# Contexto del ejercicio

Este repositorio esta pensado como test tecnico para contratar a un desarrollador junior para Oreka.

La idea no es evaluar conocimiento avanzado de frameworks, sino una forma de trabajar:

- Clonar y entender un repositorio desconocido.
- Levantar dos procesos separados en terminal.
- Entender como una app web consume datos de un backend legacy.
- Usar IA de forma activa para programar, investigar y debuggear.
- Diseñar una migracion simple de datos.
- Usar Drizzle dentro de SvelteKit.
- Comunicar decisiones tecnicas con claridad.

## Decisiones del starter

El backend legacy usa Hono en vez de Strapi. La razon es pragmatica: Strapi se parece mas al caso real, pero mete demasiado ruido para un test tecnico corto. Hono permite simular el mismo problema arquitectonico sin hacer que el candidato pierda tiempo peleando con configuraciones pesadas.

El ejercicio debe mantener dos piezas:

- `legacy-api`: fuente actual de datos, separada de la app principal.
- `web`: app SvelteKit nueva, con Drizzle instalado, que debe absorber esos datos.

Todo debe quedarse en SQLite local. No queremos que el candidato use Postgres, Supabase, Turso cloud ni servicios externos, porque eso agrega friccion que no queremos evaluar. El punto es ver si entiende la migracion y el flujo full stack, no si sabe configurar infraestructura.

La prueba importante no es si el candidato conoce Hono o SvelteKit de memoria. La prueba importante es si puede leer, levantar, conectar, migrar y explicar.

## Lo que queremos observar

Buenas senales:

- Corre ambos servidores sin quedarse bloqueado.
- Usa IA, pero entiende el codigo que entrega.
- Hace un schema Drizzle razonable.
- Migra datos sin perder relaciones entre categorias y productos.
- Puede explicar el antes y despues de la arquitectura.
- Agrega la funcionalidad de disponibilidad sin sobredisenar.
- Presenta compartiendo pantalla y demuestra comprension real de lo que entrego.

Malas senales:

- No logra levantar el proyecto y no sabe diagnosticar por que.
- Copia codigo de IA sin entenderlo.
- Resuelve solo la interfaz y evita la base de datos.
- Elimina el backend legacy sin migrar datos.
- No puede explicar donde quedan guardados los productos.
- No deja instrucciones para correr su solucion.
- No sabe responder preguntas basicas sobre la estructura del codigo o el uso de IA.
