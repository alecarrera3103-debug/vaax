# Transportes VAAX

Sitio corporativo de una página, en español de México. HTML, CSS y JavaScript nativos; sin backend, compilación ni dependencias de ejecución externas. Las fuentes se sirven localmente y conservan sus licencias en `assets/fonts`.

## Abrir y publicar

Abre `index.html` directamente en un navegador. Para desarrollo, desde `/workspace/vaax/transportes-vaax` ejecuta:

```sh
python -m http.server 8000 --bind 0.0.0.0
```

En un hosting estático, sube **el contenido** de esta carpeta a la raíz pública. Conserva las rutas relativas. No hace falta instalar paquetes ni publicar los PDF de referencia.

## Funcionalidades

- Navegación por secciones, menú móvil con cierre mediante Escape, indicador de desplazamiento.
- Servicios desplegables nativos, galería manual con flechas y soporte de teclado.
- Apariciones progresivas y recorrido gráfico; se respeta la preferencia de movimiento reducido.
- Contenido y contacto disponibles sin JavaScript. La galería y la preparación automática del correo requieren JavaScript.
- Formulario con validación nativa y enlace `mailto:` codificado. Abre el cliente de correo; no envía desde un servidor ni guarda datos. Si no hay un cliente configurado, se muestra el correo de contacto para envío manual.
- Dos enlaces de WhatsApp independientes con mensaje precargado, además de enlaces telefónicos.

## Fuentes y decisiones editoriales

Se revisaron las seis páginas de `TRANSPORTES VAAX 2026.pdf` y la página de `CARTA DE PRESENTACION VAAX.pdf`.

- Logotipo: extraído de la carta, con transparencia original.
- Hero y fotografía del servicio: fotografía real de la portada de la presentación.
- Galería: unidades extraídas de la página de servicios, con sus máscaras de transparencia. No se asignan modelos ni capacidades individuales.
- Imagen de conducción: página Nosotros de la presentación; imagen ilustrativa del documento, sin atribuir instalaciones o empleados a VAAX.
- `movilidad.webp` y `seguimiento.webp`: recursos adicionales extraídos de la presentación, conservados para edición futura; no se muestran en el sitio.
- Las fotografías se optimizaron a WebP. No se generaron ni incorporaron fotografías externas.
- Se usa «Desde 2011»; no se reproduce la afirmación «más de 15 años» de la carta, para evitar una antigüedad contradictoria con la fecha de fundación.
- Capacidades de 7 a 37 pasajeros, características del servicio y correo: presentación oficial.
- Ambos teléfonos, 81 2399 9360 y 81 1801 7881, fueron confirmados como vigentes por el cliente en esta conversación.
- Instagram: usuario `@transportes.vaax` identificado en la presentación. Facebook aparece como «Transportes VAAX», pero sin URL inequívoca: se muestra como texto, sin inventar enlace.
- La ruta de seguridad es una ilustración conceptual identificada como tal, sin datos en vivo.
- La secuencia comercial explica el servicio; no se presenta como certificación ni procedimiento oficial.

## Pendiente antes de publicación comercial

Confirmar la URL exacta de Facebook. Verificar que las dos líneas habilitan WhatsApp (la vigencia de ambos teléfonos fue confirmada; la disponibilidad técnica de WhatsApp no se puede comprobar desde este entorno). Revisar disponibilidad y capacidad específica de las unidades al cotizar.

No se ha desplegado ni enviado ningún mensaje o correo. Los enlaces abren las aplicaciones correspondientes solo cuando el visitante los activa.

## Validación

Revisión visual con Chromium en escritorio y móvil. Verificación automatizada de carga de imágenes, enlaces internos, galería, desplegables, menú móvil, Escape, composición y codificación del correo, movimiento reducido y contenido sin JavaScript. Sin desbordamiento horizontal en anchos de 320, 390, 768, 1024, 1440 y 1920 px. Sin errores de JavaScript en los recorridos probados.

La apertura directa mediante `file://` no pudo validarse en el navegador administrado: su política bloquea ese protocolo (`ERR_BLOCKED_BY_ADMINISTRATOR`). La validación funcional se realizó mediante servidor HTTP estático. El proyecto no usa módulos, fetch ni rutas absolutas.

## Entrega portable y recuperación de visualización

El ZIP `Transportes-VAAX-completo.zip` contiene `index.html`, `css/`, `js/` y `assets/` directamente en su raíz. Extrae **todo** el ZIP antes de abrir `index.html`: descargar solo ese archivo no descarga sus recursos. En hosting convencional sube todos los archivos a la misma carpeta pública, conservando su estructura. Las rutas son relativas y también sirven desde una subcarpeta.

`VAAX-vista-completa.html` es una copia autónoma generada a partir del mismo diseño: incluye CSS, JavaScript, imágenes y fuentes dentro del HTML. Puedes descargarla y abrirla sin carpetas adicionales. No reemplaza los archivos fuente; para editar el sitio usa `index.html`, `css/styles.css` y `js/main.js`. El HTML autónomo también está dentro del ZIP.

Se extrajo el nuevo ZIP a una carpeta temporal y se sirvió con un servidor HTTP estático independiente. Sus 18 archivos respondieron HTTP 200 y coincidieron byte por byte con el contenido del ZIP. Se verificaron tipos MIME de CSS y JavaScript, fuentes, logotipo, imágenes, galería y menú móvil. No se detectaron 404 ni errores de JavaScript. Las capturas de escritorio del original, el ZIP extraído y la vista autónoma fueron idénticas píxel por píxel. La vista autónoma no solicitó recursos HTTP adicionales al documento.

## Ajustes de legibilidad y controles

Texto de contenido y campos de formulario de al menos 16 px, notas de 14 px y etiquetas auxiliares ampliadas. Enlaces de WhatsApp con iconos SVG locales, etiquetas accesibles y ambas líneas originales. Botón circular fijo abajo a la derecha para volver al inicio mediante icono de flecha, también disponible sin JavaScript. Menú colapsable hasta 1100 px para acomodar la tipografía mayor.

Verificado en Chromium a 320, 390, 768, 1024, 1100, 1280, 1440 y 1920 px: sin desbordamiento horizontal, errores de JavaScript ni errores HTTP. Se comprobaron el menú, las etiquetas y destinos de WhatsApp, la posición fija del botón y su retorno al inicio.

## Servicios y movimiento ambiental

La fotografía de servicios mantiene altura propia (520 px; 490 px en teléfonos), independiente de los desplegables. La ruta del mapa se anima en bucle junto con un pulso suave en origen; también se animan los indicadores de señal y la flecha de desplazamiento. El movimiento se pausa al salir su sección de pantalla y se desactiva con `prefers-reduced-motion`.

Validado con todos los desplegables abiertos a 320, 390, 768, 1024 y 1440 px: la imagen conserva exactamente su altura, sin desbordamiento horizontal. Se comprobó el bucle durante más de dos ciclos, la pausa fuera de pantalla y la desactivación con movimiento reducido. Sin errores de JavaScript.
