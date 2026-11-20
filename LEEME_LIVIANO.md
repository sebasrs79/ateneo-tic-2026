# Ateneo TIC 2026 — versión liviana

Esta es la misma invitación, sin los archivos que no sirven.
Pasó de **145 MB a ~2 MB**.

## Qué se eliminó (y por qué no hace falta)

| Eliminado | Peso | Por qué |
|---|---|---|
| `node_modules/` | 499 MB | Las dependencias se reinstalan con `npm install` desde `package.json` + `package-lock.json` |
| `.next/` | 142 MB | Caché del build, se regenera con `npm run build` |
| `out/` | 3,8 MB | El sitio ya compilado, se regenera con `npm run build` |
| `.git/` | 80 KB | Repo vacío, sin ningún commit |

Todo eso ya estaba en el `.gitignore` del propio proyecto: nunca debió ir en el ZIP.

## Qué quedó (46 archivos, 2,2 MB)

- `app/`, `components/`, `lib/`, `types/` — el código fuente completo
- `public/` — todas las imágenes y `data/datos.json` (nada de esto se tocó, todo se usa)
- `package.json`, `package-lock.json` y configs
- `.github/workflows/deploy.yml` — despliegue automático a GitHub Pages

## Cómo usarla

```bash
npm install
npm run build   # genera out/ con el sitio listo
```

O simplemente subila a GitHub: el workflow hace `npm install` + `npm run build`
y publica `out/` solo.

## Nota

La imagen más pesada que quedó es `public/assets/mapa-escuela.jpg` (1,1 MB,
3168x1344). Si se quiere bajar aún más, se puede achicar a 1600 px de ancho
sin que se note en pantalla.
