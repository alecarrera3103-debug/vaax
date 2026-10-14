"""Generate static production metadata after the public URL is confirmed."""
import argparse
import json
from pathlib import Path
import re
from urllib.parse import urlparse
from xml.sax.saxutils import escape

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--site-url', help='Confirmed public HTTPS directory URL')
parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
parser.add_argument('--check', action='store_true', help='Fail if the production domain is pending')
args = parser.parse_args()
root = args.root.resolve()
if args.check:
    config = json.loads((root / 'seo-config.json').read_text())
    if not config.get('site_url'):
        parser.exit(1, 'PENDIENTE: URL pública definitiva. Canonical, Open Graph absoluto y sitemap aún no están completos.\n')
    print('Dominio configurado:', config['site_url'])
    raise SystemExit(0)
if not args.site_url:
    parser.error('--site-url is required unless --check is used')
parsed = urlparse(args.site_url)
if parsed.scheme != 'https' or not parsed.hostname or '.' not in parsed.hostname or parsed.username or parsed.password or parsed.query or parsed.fragment:
    parser.error('Use a public HTTPS URL without credentials, query or fragment')
base = args.site_url.rstrip('/') + '/'
public = f'''<!-- SEO:PUBLIC_URL:START -->
<link rel="canonical" href="{escape(base, {'"': '&quot;'})}">
<meta property="og:url" content="{escape(base, {'"': '&quot;'})}">
<meta property="og:image" content="{escape(base + 'assets/images/vaax-social.jpg', {'"': '&quot;'})}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="960">
<meta property="og:image:alt" content="Unidad de transporte de personal de Transportes VAAX">
<meta name="twitter:image" content="{escape(base + 'assets/images/vaax-social.jpg', {'"': '&quot;'})}">
<meta name="twitter:image:alt" content="Unidad de transporte de personal de Transportes VAAX">
<!-- SEO:PUBLIC_URL:END -->'''
html_path = root / 'index.html'
html = html_path.read_text()
html, count = re.subn(r'<!-- SEO:PUBLIC_URL:START -->.*?<!-- SEO:PUBLIC_URL:END -->', lambda _: public, html, flags=re.S)
if count != 1:
    parser.error('Expected exactly one public metadata marker')
match = re.search(r'(<script type="application/ld\+json" id="organization-schema">)(.*?)(</script>)', html, re.S)
if not match:
    parser.error('Missing Organization JSON-LD')
organization = json.loads(match[2])
organization.update({'@id': base + '#organization', 'url': base, 'logo': base + 'assets/logo/vaax.png'})
html = html[:match.start()] + match[1] + json.dumps(organization, ensure_ascii=False).replace('<', '\\u003c') + match[3] + html[match.end():]
html_path.write_text(html)
(root / 'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: ' + base + 'sitemap.xml\n')
(root / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + escape(base) + '</loc></url></urlset>\n')
(root / 'seo-config.json').write_text(json.dumps({'site_url': base, 'status': 'configured'}, ensure_ascii=False, indent=2) + '\n')
print('Canonical, Open Graph, JSON-LD, robots y sitemap configurados:', base)
