# Publicación, SEO y campañas — Transportes VAAX

## Estado real

El sitio continúa siendo estático. No hay servicios de envío, etiquetas de Analytics, GTM ni Ads instalados. El formulario no envía información y no registra conversiones al pulsar su botón.

La URL pública definitiva fue confirmada por el propietario: **https://transportesvaax.com/**. Ya se configuraron:

- Canonical único, sin parámetros de campaña.
- Open Graph/Twitter con URL e imagen social absolutas.
- `Organization` en JSON-LD, con URL, @id y logotipo del dominio confirmado, sin datos empresariales inventados.
- `robots.txt` con rastreo permitido y referencia al sitemap.
- `sitemap.xml` con una sola URL: la página principal.
- `seo-config.json` con estado `configured`.

La página mantiene un único H1, ALT descriptivos, estructura semántica y `index, follow`. La indexabilidad real y las cabeceras HTTP del hosting deben validarse al publicar; no se ha desplegado desde este entorno. La consulta de verificación a https://transportesvaax.com/ fue bloqueada por el proxy de este entorno con HTTP 403; eso no determina el estado real del hosting.

## Mantener la configuración de dominio

Desde la carpeta del proyecto, antes de subirlo al hosting:

```sh
python tools/configurar-seo.py --site-url "$VAAX_PUBLIC_URL"
python tools/configurar-seo.py --check
```

Sustituye la variable por tu URL HTTPS pública confirmada, incluyendo subcarpeta si corresponde. El script es una utilidad opcional previa a publicación; el sitio no necesita Python ni compilación en el hosting. Genera canonical, URLs Open Graph/Twitter absolutas, URL/logo/@id del JSON-LD, `robots.txt`, `sitemap.xml` y `seo-config.json`. Es repetible. Si editas a mano, conserva consistencia entre esos archivos.

Sube **todo el contenido** del proyecto conservando las carpetas. Publica HTTPS, una única variante de dominio y redirecciones permanentes desde variantes anteriores, según tu servidor. Sirve CSS/JS con tipos MIME correctos y habilita compresión Brotli/gzip y caché de recursos en el hosting. No establezcas caché inmutable sin versionar nombres.

Tras publicación verifica desde fuera del hosting:

1. Respuesta HTTP 200 para página, imágenes, CSS/JS, robots y sitemap.
2. Ausencia de `X-Robots-Tag: noindex`, autenticación o restricciones del hosting sobre el sitio final. La comprobación local no valida cabeceras del futuro servidor.
3. Canonical e imagen social accesibles mediante las URLs finales, sin parámetros de campaña.
4. Valida Organization con Schema.org y Google Rich Results Test; el marcado no garantiza resultados enriquecidos ni posiciones.
5. Conecta Google Search Console, verifica el dominio, envía el sitemap y solicita inspección de la URL principal.

`VAAX-vista-completa.html` es una vista de entrega con `noindex, follow`. No se incluye en el sitemap, no debe usarse como página de aterrizaje principal y no cambia el estado de indexación de `index.html`.

## Selección de búsquedas por intención

La selección se basa en la oferta documentada y el comprador empresarial, sin inventar volúmenes, competencia, posiciones ni cobertura geográfica:

| Intención | Búsquedas relevantes | Aplicación |
| --- | --- | --- |
| Contratar un proveedor | transporte de personal para empresas | Título, descripción, presentación principal |
| Operación industrial | transporte de personal industrial; transporte empresarial | Nosotros, descripción de servicios |
| Resolver una ruta | rutas de transporte para empresas; servicio de transporte de personal | Servicios y proceso comercial |
| Solicitar propuesta | cotización de transporte de personal | Acciones hacia el formulario y contacto |
| Entender el servicio | transporte de empleados; transporte de trabajadores; transporte corporativo | Redacción natural de apoyo, sin repeticiones artificiales |

No se añade `meta keywords`. Para investigación de demanda real, contrastar la selección con consultas de Search Console y Keyword Planner cuando el propietario conecte esas cuentas. Se intentó consultar documentación oficial de Google durante esta actualización, pero la red del entorno respondió HTTP 403; no se afirma haber obtenido datos externos de búsquedas.

Referencias oficiales para la validación posterior:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- https://developers.google.com/tag-platform/security/guides/consent

## Preparación de medición

Los controles tienen IDs estables (`cta-header-quote`, `cta-hero-quote`, `cta-services-quote`, `cta-form-submit`, `cta-phone-*`, `cta-whatsapp-*`, `cta-email-*`). Las acciones de cotización llevan al formulario mediante anclas nativas.

Se conservan `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `gclid`, `gbraid` y `wbraid` en la URL durante navegación por secciones. También se copian, con longitud acotada, a campos ocultos del formulario. No se escriben cookies, localStorage ni sessionStorage. Los parámetros nunca se insertan mediante HTML. Sin backend no se envían fuera del navegador. Si se necesitan conservar entre páginas o visitas, definir esa política y su consentimiento antes de añadir persistencia.

`window.dataLayer` se inicializa vacío, sin cargar scripts externos. `window.VAAXMeasurement` expone:

- `getAttribution()`: devuelve copia de parámetros presentes.
- `setConsent({ analytics, advertising })`: refleja en memoria el consentimiento obtenido por tu CMP; por defecto ambos son `false`. No sustituye una CMP ni configura por sí mismo el Consent Mode de Google.
- `recordBackendSuccess({ submissionId })`: interfaz para la futura integración. Solo acepta eventos si el formulario tiene `data-backend-connected="true"`, hay consentimiento de analítica y un identificador de envío válido y no repetido. No se invoca al hacer submit en la versión actual.

Con consentimiento de analítica, los enlaces pueden añadir `vaax_interaction` al dataLayer. Son interacciones, **no conversiones**. No se añaden datos de los campos de contacto. No marques estos clics ni `form_submit` como ventas o leads.

## Conectar PHP/SMTP o un endpoint y registrar leads reales

1. Implementa envío, validación y controles de servidor. Mantén secretos SMTP únicamente en servidor.
2. Cambia `action` al endpoint y sustituye el controlador que actualmente impide el envío. Decide si usar envío HTML tradicional o JavaScript con respuesta del servidor.
3. Activa `data-backend-connected="true"` únicamente al integrar un endpoint real.
4. Solo tras una respuesta de servidor que confirme la aceptación del mensaje, usa su identificador único: `VAAXMeasurement.recordBackendSuccess({ submissionId: response.submission_id })`.
5. No uses un ID generado al hacer clic como prueba de envío. No invoques el método si hay error, timeout o respuesta no confirmada. El contrato del servidor es la fuente de verdad; este guardado en cliente no demuestra por sí solo entrega SMTP.
6. En GTM, crea un activador para `vaax_lead_success`; mapéalo a `generate_lead` en GA4 y a la conversión de Ads solo según el consentimiento aplicable. No actives simultáneamente importación de GA4 y una etiqueta directa de Ads para contar dos veces el mismo lead.
7. La deduplicación de cliente es por sesión de página. Si necesitas garantizar deduplicación entre cargas, utiliza el ID y los controles de tu sistema de medición/servidor.

## Datos y decisiones pendientes

- URL exacta de Facebook y confirmación técnica de WhatsApp en ambas líneas.
- ID de GTM, ID de medición GA4 y datos de conversión de Ads (ID/etiqueta o importación desde GA4).
- Endpoint, método de respuesta y contrato de confirmación real del backend.
- CMP/política de consentimiento y textos legales aplicables a la medición y al formulario.
- Acceso del propietario a Search Console/Keyword Planner para verificar demanda e indexación reales.

No se inventaron identificadores ni se instalaron etiquetas de seguimiento. Antes de cargarlas, configura el consentimiento predeterminado y las actualizaciones de Consent Mode con tu CMP; prueba aceptación, rechazo y revocación en Tag Assistant. Los permisos de analítica y publicidad deben reflejarse también en GTM y en el código que se conecte a esta interfaz.
