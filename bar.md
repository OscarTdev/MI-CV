# bar.md — Mecanismos de diseño extraídos de kentcdodds.com

Cada línea es algo que un crítico puede verificar mirando la salida renderizada. Nada de adjetivos ("premium", "moderno").

## Tipografía
- Máximo 3 tamaños de fuente distintos en toda la página: h1, h2, cuerpo.
- Una sola familia tipográfica para el cuerpo (sans-serif); los encabezados usan la misma familia con distinto peso/tamaño.
- El h1 del hero es claramente más grande que el h2 (al menos 1.5x el tamaño del h2).
- Ancho de contenido limitado (max-width) para que las líneas de texto no se extiendan todo el ancho en desktop.

## Colores
- Un solo color de acento (ej. naranja/dorado o cian), usado en máximo 2 lugares por pantalla (CTA principal + un detalle).
- Fondo claro (blanco o casi blanco) con texto oscuro por defecto; modo oscuro disponible como alternativa.
- Texto principal en gris oscuro o negro sobre fondo claro; gris medio para texto secundario.

## Layout y espaciado
- Whitespace generoso entre secciones: al menos un bloque vacío equivalente a 1 sección de altura entre bloques principales.
- Hero ocupa aproximadamente la mitad superior del viewport en desktop.
- Contenido alineado a la izquierda en desktop; centrado solo en el título del hero si va acompañado de ilustración.
- Tarjetas (cards) en grid para agrupar elementos relacionados (proyectos, cursos, habilidades).

## Hero
- Nombre grande (h1) + frase corta de valor (h2) + máximo 2 botones de llamada a la acción (CTA).
- Imagen o ilustración grande acompañando al texto del hero (no solo texto).

## Navegación
- Barra superior fija (sticky) con: nombre/logo a la izquierda, enlaces de navegación, y al menos una acción secundaria (modo oscuro, búsqueda o perfil).
- Enlaces de navegación con estado hover visible.

## Imágenes
- Foto de perfil del autor presente y reconocible.
- Uso de ilustración o foto personal además de íconos genéricos.

## Rendimiento / técnica
- Fuentes cargadas desde CDN (Google Fonts) con `display=swap`.
- Sin dependencia de API externa de lenguaje para mostrar contenido estático (el CV se renderiza sin llamadas a Gemini/NVIDIA al cargar).