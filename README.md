# Perth Contractor Agency — Website

A single-page, look-alike marketing site for a **Perth, Western Australia** web design
agency that builds websites for roofing & trade contractors. Modelled on the
King Contractor Agency layout (dark + gold theme) and rebuilt with clean,
SEO + GEO optimised code that Google can read.

## Structure

```
index.html              # The page (all sections + structured data)
robots.txt              # Crawler rules + sitemap reference
sitemap.xml             # XML sitemap
assets/
  css/styles.css        # Dark + gold theme, fully responsive
  js/main.js            # Slider, mobile nav, scroll reveal
  img/                  # Drop real screenshots/logos here
```

## SEO & GEO optimisation (what Google reads)

- **Primary meta**: localised title, meta description, keywords, canonical.
- **GEO meta tags**: `geo.region` (AU-WA), `geo.placename`, `geo.position`,
  `ICBM` — pointing to Perth's coordinates (-31.9523, 115.8613).
- **Open Graph + Twitter cards** for rich social sharing.
- **JSON-LD structured data**:
  - `ProfessionalService` / LocalBusiness with NAP (name, address, phone),
    Perth `geo` coordinates, opening hours, rating, and `areaServed`.
  - `FAQPage` schema so the FAQ can appear as Google rich results.
- **Semantic HTML5** landmarks, `lang="en-AU"`, alt/aria labels, fast static
  assets — all crawler-friendly.

## To make it production-ready

1. **Replace placeholders** — swap the `.mock` / `.card-shot__img` blocks for
   real screenshots in `assets/img/` (use `<img>` with descriptive `alt` text).
2. **Update NAP** — change the business name, phone, email, address and the
   `geo.position` coordinates in `index.html` (meta tags **and** the JSON-LD).
3. **Set the real domain** everywhere `perthcontractoragency.com.au` appears
   (canonical, Open Graph, sitemap, robots.txt).
4. Add an `og-cover.jpg` (1200×630) to `assets/img/`.
5. Validate the structured data at https://search.google.com/test/rich-results.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
