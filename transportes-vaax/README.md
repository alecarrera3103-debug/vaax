# Transportes VAAX

Sitio corporativo de una página en español de México, desarrollado con HTML, CSS y JavaScript nativos. Sin frameworks, compilación, backend ni servicios externos de envío. Imágenes, fuentes y SVG incluidos localmente.

## Abrir y publicar

Extrae **todo** `Transportes-VAAX-completo.zip` y sube su contenido a la raíz pública de tu hosting, conservando `css/`, `js/` y `assets/`. No requiere instalar paquetes. Para desarrollo:

```sh
cd /workspace/vaax/transportes-vaax
python -m http.server 8010 --bind 0.0.0.0
```

También se entrega `VAAX-vista-completa.html`, una copia autónoma del mismo sitio con los recursos incorporados. Descárgala y ábrela en tu navegador para visualizarla sin carpetas adicionales. El archivo está dentro del ZIP y en la raíz del repositorio. Para editar usa los archivos separados.

El protocolo `file://` está bloqueado por el navegador administrado de este entorno. Las pruebas se realizan mediante servidores HTTP estáticos; el sitio no utiliza módulos, fetch ni rutas absolutas.

## Interacciones y accesibilidad

- Menú móvil y de tabletas con Escape, navegación por secciones y flecha fija para volver al inicio.
- Acordeón exclusivo con transiciones de altura mediante CSS Grid. Botones semánticos con `aria-expanded`, `aria-controls`, paneles identificados y contenido cerrado inerte. Flechas arriba/abajo, Inicio y Fin recorren los controles. Se permite cerrar el panel activo para dejar todos cerrados. Sin JavaScript se conservan los `details` nativos con el mismo atributo `name` para exclusividad en navegadores compatibles.
- La imagen de servicios mantiene altura independiente: 520 px en escritorio/tabletas y 490 px en teléfonos.
- Entradas diferenciadas para títulos, fotografía de Nosotros, listado de seguridad, proceso y formulario. Parallax acotado a ±12 px, solo en escritorio, sobre la imagen principal y la fotografía de Nosotros.
- Rutas animadas, pulsos suaves, microinteracciones de botones y flotilla con transición direccional, paginación accesible, teclado y gesto horizontal táctil. No hay avance automático de fotografías.
- Las animaciones repetitivas se pausan fuera de pantalla y se desactivan con `prefers-reduced-motion`. El desplazamiento de página es nativo.
- SVG de correo, teléfono, WhatsApp, Instagram y Facebook en sus ubicaciones de contacto. El footer conserva teléfonos con icono de teléfono, sin duplicar accesos de WhatsApp. Los originales están en `assets/icons`; los símbolos se incorporan en el HTML para evitar solicitudes adicionales. Facebook no tiene enlace porque no se ha confirmado su URL.
- Texto de contenido y campos de al menos 16 px, notas de 14 px y estados de foco visibles. Fuentes locales con sus licencias en `assets/fonts`.

## Formulario: envío pendiente

`#quote-form` es un formulario semántico con `method="post"`, `action="#"`, seis campos con `name`, `id`, `label` y validaciones HTML. **No envía mensajes ni abre aplicaciones de correo.** El controlador de `submit` en `js/main.js` impide la recarga y muestra un aviso explícito. No realiza solicitudes ni guarda los datos. Sin JavaScript el botón permanece deshabilitado y se explica que el envío no está disponible.

Para conectar PHP/SMTP o un endpoint:

1. Cambia `action="#"` por la ruta de tu servidor y conserva `method="post"`.
2. Sustituye el bloque señalado como `Integration point` en `js/main.js` por tu implementación de envío, o retíralo para utilizar el envío HTML nativo.
3. Retira `disabled` del botón si vas a permitir envío nativo sin JavaScript.
4. Implementa validación de servidor y respuesta real antes de mostrar un mensaje de éxito. No incluyas credenciales SMTP en HTML o JavaScript.

Los enlaces de correo directo en contacto/footer siguen apuntando al correo confirmado; son independientes del formulario.

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

Revisión visual en Chromium de escritorio y móvil. Verificados los tamaños 320, 390, 580, 768, 1024, 1100, 1280, 1440 y 1920 px sin desbordamiento horizontal. Comprobados: carga de todas las imágenes y SVG, exclusividad del acordeón, altura constante de imagen, navegación de teclado, paginación y flechas de flotilla, menú móvil, ausencia de solicitudes/recarga al enviar el formulario, animaciones y preferencia de movimiento reducido. Sin JavaScript se mantienen contenido, contacto y acordeón nativo; el envío permanece deshabilitado. Sin errores JavaScript ni respuestas HTTP fallidas en los recorridos probados.

El ZIP se valida con CRC y comparación de todos los archivos fuente; la copia autónoma también se prueba mediante HTTP antes de entregar. No se ha desplegado un sitio público ni enviado mensajes a contactos.

## Ruta interactiva, SEO y campañas

La sección «Así avanzamos juntos» mantiene sus cuatro textos y números, con una carretera minimalista y un minibús SVG local. Selección mediante hover, clic, toque y teclado (flechas, Inicio y Fin); el recorrido dura proporcionalmente a la distancia, termina aunque se retire el cursor y no tiene bucles. Se anima por transform sin medir layout en cada fotograma. La geometría solo se recalcula al cambiar tamaño o cargarse las fuentes. En móviles se conserva la disposición vertical y los números quedan separados del vehículo. Se respeta movimiento reducido.

Los elementos con fondo dorado muestran texto/flechas blancos sobre un dorado oscurecido con contraste mínimo 5.12:1 en estado normal. Hover 6.10:1 y active aún mayor. Se preservan los acentos dorados sobre azul.

Dominio confirmado: https://transportesvaax.com/. Canonical, robots, sitemap, Open Graph, imagen social y Organization JSON-LD están configurados con ese dominio. Consulta **SEO-Y-CAMPANAS.md** para publicación, palabras clave por intención, integración de GTM/GA4/Ads, atribución, consentimiento y confirmación real de conversiones. No se han instalado etiquetas externas. Los clics en el formulario inactivo no se cuentan como leads.

Las imágenes principales tienen variantes responsive locales; se conservan los originales. Las fuentes se precargan sin dependencias externas. Los resultados comparativos de laboratorio y sus límites están en **RENDIMIENTO.md**. La indexación y Core Web Vitals de usuarios reales requieren el hosting publicado y datos de Search Console/CrUX.
