# Race to Kepler — landing page

One-page marketing site for *Race to Kepler*, a deck-building space board game from Conduit Games.

## Preview locally

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080/>.

## Layout

```
index.html              — the page
assets/css/style.css    — design system + layout
assets/js/parallax.js   — hero parallax + reveal-on-scroll + mailing form toast
assets/images/          — resized web-ready artwork (sourced from ~/Documents/kepler/)
```

## Notes

- Parallax effect is scroll-linked and respects `prefers-reduced-motion`.
- Social icons in the header/footer use `#` placeholders — wire them to real URLs when ready.
- Mailing list form is inert and shows a thanks-toast on submit; wire to Mailchimp / ConvertKit / etc. when ready.
- YouTube embed is `1CHGjYlZjug` (the Race to Kepler how-to-play video featured on racetokepler.com).
- Fonts: Cinzel (display) + Inter (body) via fonts.bunny.net (no Google tracking).
