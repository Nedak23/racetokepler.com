# Race to Kepler — landing page

**Repository:** [github.com/Nedak23/racetokepler.com](https://github.com/Nedak23/racetokepler.com)

One-page marketing site for *Race to Kepler*, a deck-building space board game from Conduit Games.

## Preview locally

Open `index.html` directly in your browser — no server needed.

## Deploy

Vercel deploys from this GitHub repo. After connecting the repo in the Vercel dashboard, merges to your production branch will pick up commits automatically unless you deploy manually:

```bash
npx vercel@latest --prod --yes
```

## Layout

```
index.html              — the page
assets/css/style.css    — design system + layout
assets/js/parallax.js   — hero parallax + reveal-on-scroll + mailing form toast
assets/images/          — artwork and game assets
vercel.json             — tells Vercel to serve the root directory as static
```

## Notes

- Parallax effect is scroll-linked and respects `prefers-reduced-motion`.
- Social icons in the header use `#` placeholders — wire to real URLs when ready.
- Mailing list form shows a thanks-toast on submit; wire to Mailchimp / ConvertKit / etc. when ready.
- YouTube embed is `1CHGjYlZjug` (the Race to Kepler how-to-play video).
- Fonts: TT Modernoir Bold (display) + Mendl Sans Dusk (body/subheads) via Adobe Fonts kit `zup4aeo`.
