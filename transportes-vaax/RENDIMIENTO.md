# Validación de rendimiento y frontend

## Comparación local reproducible

Medición de la optimización SEO del commit `c039c97`. La corrección posterior de color y extremo de carretera conserva la arquitectura y no repite estos ensayos de carga.

Chromium headless sobre el mismo servidor HTTP estático y la misma máquina. Tres contextos nuevos por versión (sin caché), viewport móvil 390 × 844, CPU ralentizada 4×, latencia 150 ms, descarga 200 000 bytes/s y subida 93 750 bytes/s. Se midió la carga inicial antes de desplazar la página. Estos son resultados de laboratorio, no Core Web Vitals de usuarios reales.

| Métrica | Antes | Después |
| --- | ---: | ---: |
| LCP mediano | 2052 ms | 1684 ms |
| CLS mediano inicial | 0.00000775 | 0.00000000 |
| Bytes de recursos iniciales, sin documento HTML | 614,386 | 272,504 |
| Solicitudes de recursos iniciales, sin HTML | 8 | 8 |

La transferencia de recursos iniciales bajó aproximadamente 55.6% gracias a variantes WebP responsive, conservando los originales. Se precargan ambas fuentes locales. No se añadieron librerías ni solicitudes de seguimiento.

LCP por ejecución antes: 2256 ms, 2052 ms, 2052 ms.
LCP por ejecución después: 1736 ms, 1672 ms, 1684 ms.

El resultado varía según hardware, servidor, red y navegador. No se ha medido INP de campo ni se garantiza una puntuación de PageSpeed. Al publicar, comprobar compresión/caché, PageSpeed Insights y posteriormente Search Console/CrUX.

## Validación funcional

- Ruta interactiva en 320, 390, 580, 581, 768, 1024, 1280, 1440 y 1920 px. Se verificaron los cuatro destinos exactos, avance/retroceso, duración proporcional, terminación sin mantener hover, teclado, cambio de tamaño y movimiento reducido. No cambia la altura de sección y no añade animaciones infinitas.
- La geometría se mide al redimensionar/cargar fuentes; las transiciones del vehículo y progreso usan transform. El hover se procesa al entrar en el paso, evitando reinicios al moverse dentro. El teclado evita interferencias de un cursor inmóvil durante el desplazamiento.
- Actualización visual posterior: dorado original #D9AE30 y hover #EBBF43 recuperados de `f7e5d6b`, con texto azul marino #14263E (contraste normal 7.30:1). Se retiran los fondos dorados oscuros. Las posiciones de los cuatro círculos no cambian; el destino 04 continúa hasta el final extendido de la carretera, con margen para el vehículo y remate discreto. Validación específica en ocho tamaños sin recortes ni desbordamientos.
- Footer con los dos teléfonos originales, sin accesos WhatsApp; contacto conserva ambos enlaces de WhatsApp.
- SEO del dominio confirmado, Organization sin datos inventados, sitemap de una URL, robots permitido, IDs únicos y rutas locales comprobadas.
- Atribución UTM/gclid, consentimiento por defecto denegado, sin cookies ni almacenamiento persistente. Submit inactivo sin conversión ni solicitudes. Interfaz de conversión futura comprobada mediante simulación aislada y deduplicación, sin conectar un backend real.
- Sin desbordamientos horizontales, errores de JavaScript ni recursos HTTP fallidos en los recorridos probados.

Las pruebas locales no determinan la indexabilidad del hosting, el consentimiento legal aplicable ni la entrega SMTP; requieren configuración y verificación al conectar esos sistemas.
