### Hello. Welcome to my personal site

[Click for go to site](https://aleksandraparin.site)

[My CV in Russia](https://aleksandraparin.site/Aparin_CV_RU.pdf)

[My CV in English](https://aleksandraparin.site/Aparin_CV_EN.pdf)

---

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site -> ./out
npm run serve      # preview the built ./out
npm run lint
npm run typecheck
```

`next build` produces a fully static site in `out/` — there is no server
runtime. Deploy that directory anywhere (Vercel, GitHub Pages, Netlify, nginx).
Set `NEXT_PUBLIC_BASE_PATH` when hosting under a sub-path.

## Structure

| Path                      | What it is                                               |
| ------------------------- | -------------------------------------------------------- |
| `data/cv.ts`              | All CV content, typed, EN + RU side by side               |
| `app/page.tsx`            | The single page                                           |
| `app/globals.css`         | Every style, including the scroll-linked hero transition  |
| `components/ScrollMotion` | Writes the smoothed `--p` scroll progress                 |
| `components/CursorTrail`  | Canvas ribbon that follows the pointer                    |
| `components/Icon`         | Inlines `public/*.svg` at build time                      |

### Editing the CV

Everything lives in `data/cv.ts`. Each user-facing string is an `{ EN, RU }`
pair, so both languages are edited in the same place and cannot drift apart.
Inline `*emphasis*`, `**strong**` and `` `code` `` are supported in the copy.

Both languages are rendered into the static HTML and CSS reveals the active one,
so switching language costs no request, no re-render and no JavaScript.
