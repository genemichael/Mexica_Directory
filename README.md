# Aztec Who's Who

A home-screen web app (PWA) for keeping track of the names in *Fifth Sun* (Camilla Townsend) and *Myths, Gods, and Rituals of Aztec Mythology* (Matthew Torres).

## Put it on GitHub Pages

1. Create a new public repository on GitHub, for example `aztec-whos-who`.
2. Upload every file in this folder to the root of the repository (Add file > Upload files).
3. Go to Settings > Pages. Under "Build and deployment", choose "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/aztec-whos-who/`.

## Install it on your phone

- iPhone (Safari): open the link, tap Share, then "Add to Home Screen".
- Android (Chrome): open the link, tap the menu, then "Install app" or "Add to Home screen".

Open the app once with a connection and tap "Save images for offline" so the codex images work without a signal.

## Image credits

Codex images are public-domain reproductions hosted on Wikimedia Commons. Two photos carry Creative Commons licenses and are credited under each image:
- Sun Stone: Juan Carlos Fonseca Mata, CC BY-SA 4.0
- Sun Stone center: El Comandante, CC BY-SA 3.0
- Coyolxauhqui Stone: Iris (Culemborg), CC BY

## Updating

Edit `index.html` and upload it again. When you change files, also change `aztec-shell-v2` to `aztec-shell-v3` in `sw.js` so phones pick up the new version.
