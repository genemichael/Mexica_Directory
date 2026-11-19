# Handoff: Nahuatl Creation Myth Walkthrough App

Paste this whole file into a new session as the opening message, or point the session at it in the repo.

## Goal

Build a phone-first companion app that walks the user through the Nahua (Mexica) creation story one step at a time, from the dual creator to the birth of the Fifth Sun. It is a sibling to the existing **Aztec Who's Who** app in this repository. The user listens to two library audiobooks and wants a visual, step-by-step guide to the story they are hearing:

- *Fifth Sun: A New History of the Aztecs* by Camilla Townsend (history focus)
- *Myths, Gods, and Rituals of Aztec Mythology* by Matthew Torres (myth focus, includes the Five Suns and underworld journeys)

## Repository and hosting

- Repo: `genemichael/Mexica_Directory` (GitHub). Default branch `main`.
- Hosting: GitHub Pages from `main`, root. Live at `https://genemichael.github.io/Mexica_Directory/` (confirm the exact URL in the repo's Settings > Pages).
- To get push access in a new session, attach the repo with the session's add-repo tool (push access), clone, commit, push. The GitHub REST API (for example the Pages endpoint) is blocked through the session proxy; plain git push works.
- Commit author used so far: `Gene Michael Lauria <genemichael@users.noreply.github.com>`.

### Recommended placement

Put the new app in a subfolder, `creation/`, in the same repo, so it is served at `.../Mexica_Directory/creation/`. Reasons:
- The existing service worker (`sw.js`, scope `./` at the root) already covers subfolders, so the new app works offline with no second worker. Add the new files to `SHELL_FILES` in `sw.js` and bump the cache name.
- Both apps can link to each other with relative URLs.
- Give `creation/` its own `manifest.webmanifest` (name "Creation Walkthrough", `start_url` and `scope` set to `./`) so it installs as a separate home-screen app. Confirm with the user whether they want one app or two icons before splitting.

## Existing app: conventions to reuse

Read `index.html` before starting. It is one self-contained file (HTML, CSS and JS inline), no build step, no libraries. Key conventions:

- **Design tokens** in `:root`: `--jade` accent, category colors `--god`, `--sun`, `--ruler`, `--person`, `--place`; display font Bricolage Grotesque, body font Source Sans 3 (Google Fonts). Light and dark themes via `prefers-color-scheme` and `[data-theme]`. Mobile first, 16px minimum gutters, safe-area insets for the iOS home-screen app.
- **Glyph sprite**: an inline `<svg><defs><symbol id="i-...">` block of about 60 original line icons (48x48 viewBox, stroke `currentColor`). Reuse them by `<use href="#i-sun"/>` and so on. Copy the sprite into the new page rather than linking across files. Notable ids: `two`, `mirror`, `featherserpent`, `hummingbird`, `tlaloc`, `waterskirt`, `wind`, `skull`, `dog`, `sunfire`, `moonrabbit`, `sun`, `croc`, `earthjaw`, `serpentskirt`, `bells`, `stars`, `flame`, `maguey`, `corn`, `pyramid`, `stairsdown`, `serpenthill`, `calendar`, `newfire`.
- **Images**: never downloaded. Each image is a Wikimedia Commons file name loaded through `https://commons.wikimedia.org/wiki/Special:FilePath/<File_Name>?width=480` (1400 for the full-screen viewer). The `IMG` constant in `index.html` holds every verified file name with a caption and credit. Reuse those entries. Each `<img>` has an `onerror` that hides its figure, so a bad file name fails quietly.
- **Credits**: codex scans are labeled "Public domain". Three photos are Creative Commons and must keep their credit lines: Sun Stone (`Piedra del Sol en MNA.jpg`, Juan Carlos Fonseca Mata, CC BY-SA 4.0), Sun Stone center (`File-Monolito de la Piedra del Sol (centro).jpg`, El Comandante, CC BY-SA 3.0), Coyolxauhqui Stone (`Coyolxauhqui stone.jpg`, Iris of Culemborg, CC BY). Each credit links to the Commons file page.
- **Offline**: a "Save images for offline" button pre-caches every image URL into the `aztec-img-v1` cache. The service worker serves `wikimedia.org` requests cache-first and the app shell cache-first with background refresh.
- **Updating**: whenever any shipped file changes, bump `SHELL` in `sw.js` (currently `aztec-shell-v3`, next is `aztec-shell-v4`) so installed phones pick up the change.

## Lessons from building the first app

- The session's shell has no network. Image files cannot be downloaded or tested for loading from the sandbox. The user tests on their phone and reports problems.
- WebFetch of the Wikipedia or Commons API with hand-built URLs is rejected. What works: WebSearch with `allowed_domains: ["commons.wikimedia.org"]`, then use file names exactly as they appear in the results. Only use a file name you have seen in a search result.
- Commons labels can be wrong. The Codex Tovar file titled for Tizoc (`... WDL6722.png`) actually shows Axayacatl, so the whole WDL/Codex Tovar ruler set is untrusted. Two Codex Fejérváry-Mayer panels looked identical on a phone, so avoid giving related figures images from visually similar pages.
- Avoid giving two different steps the same image unless the image genuinely shows both.

## User preferences that apply

- Verify claims from a source before asserting them. Mythic details vary between sources; label which source a version comes from instead of blending versions silently.
- No em dashes in written content drafted for the user.
- Deliver a complete, checked app, not a stripped-down first version.
- Answer direct questions directly in the first line.
- Change only what is asked when revising; flag any necessary deviation before making it.

## What the app should do

A guided, step-by-step story, not a reference list:

- One step per screen, with Previous and Next buttons, swipe support, and a progress indicator (for example "Step 4 of 14").
- Each step: a title, a short retelling in plain English (about 80 to 150 words), the key Nahuatl names with pronunciation (same "Say:" style as Who's Who), a glyph, and one verified codex image where a good one exists.
- A source line on every step naming the primary source for that version, plus a "Versions differ" note where sources disagree.
- Tapping a name opens that person or god's Who's Who entry. Who's Who has no deep links yet. Add a small handler to the root `index.html` that reads a plain hash such as `#Xolotl` (use the entry name, spaces as hyphens), puts it into the search box, and runs the search on load and on `hashchange`. Link from the walkthrough with `../index.html#Xolotl`.
- Remember the last step the user viewed (localStorage, wrapped in try/catch) so they can pick up where the audiobook is.
- A "Jump to step" list for quick navigation while listening.

## Draft story outline (verify every beat before writing)

This outline is from general knowledge and has not been checked against the primary sources yet. The new session should verify each beat and correct it, citing the source.

1. **The dual creator.** Ometecuhtli and Omecihuatl (Ometeotl) in the highest heaven. Main source: *Historia de los mexicanos por sus pinturas*.
2. **The four sons.** Red Tezcatlipoca (Xipe Totec or Camaxtli), Black Tezcatlipoca, Quetzalcoatl, Huitzilopochtli. Same source.
3. **Shaping the world.** Fire, the first human couple Oxomoco and Cipactonal, the calendar, the lords of the dead, the heavens and the waters. Same source.
4. **The earth monster.** Tezcatlipoca and Quetzalcoatl tear Tlaltecuhtli (Cipactli) in two to make earth and sky; plants grow from its body. Main source: *Histoyre du Mechique*.
5. **First Sun, 4 Jaguar.** Tezcatlipoca's age; giants eaten by jaguars.
6. **Second Sun, 4 Wind.** Quetzalcoatl's age; hurricanes; people become monkeys.
7. **Third Sun, 4 Rain.** Tlaloc's age; rain of fire; people become turkeys.
8. **Fourth Sun, 4 Water.** Chalchiuhtlicue's age; the flood; people become fish. Include the flood survivors Tata and Nene, whom Tezcatlipoca turns into dogs for lighting a fire. Main source for steps 5 to 8: *Leyenda de los Soles* (1558, in the Codex Chimalpopoca). The *Historia de los mexicanos por sus pinturas* gives a different order; show it as a "Versions differ" note.
9. **The bones from Mictlan.** Quetzalcoatl (with his nahual, often Xolotl) goes to Mictlantecuhtli for the bones of earlier humans: the conch with no holes, worms and bees, the trap pit, the broken bones. Cihuacoatl (Quilaztli) grinds them and the gods bleed on them to make new people. Source: *Leyenda de los Soles*.
10. **Maize from the Mountain of Sustenance.** Quetzalcoatl as an ant reaches the maize inside Tonacatepetl; Nanahuatzin splits the mountain; the Tlaloque scatter the seeds. Source: *Leyenda de los Soles*.
11. **Pulque and Mayahuel.** Source: *Histoyre du Mechique*.
12. **The fire at Teotihuacan.** Nanahuatzin leaps without hesitation; Tecuciztecatl follows; two suns; the rabbit thrown at the moon. Source: Florentine Codex, Book 7.
13. **The sun will not move.** The gods give their own lives; Ehecatl blows the sun into motion; Xolotl flees by changing into maize, maguey and an axolotl. Source: Florentine Codex, Book 7.
14. **Our age, 4 Movement.** The Fifth Sun, fed by sacrifice and foretold to end in earthquakes. Show the Sun Stone photo with the four earlier Suns in their cartouches.
15. **Epilogue, Coatepec.** The birth of Huitzilopochtli, Coatlicue, Coyolxauhqui and the 400 Southerners; why the Templo Mayor re-creates the hill. Source: Florentine Codex, Book 3.

### Decisions already made by the user

- **Order of the Suns:** follow the order Torres uses in his book. The user will confirm that order while listening. Until he does, build with the *Leyenda de los Soles* order shown above, keep the order of steps 5 to 8 in one easy-to-change array, and ask him once at the start of the session whether he has confirmed Torres's order yet.
- **Steps 11 and 15:** include both (pulque and Mayahuel, and the Coatepec epilogue).

## Images already verified on Commons (from the `IMG` constant)

Reusable for the steps above: `Black Tezcatlipoca clean.jpg`, `Quetzalcoatl 1.jpg`, `Huitzilopochtli telleriano.jpg`, `Xipe Totec (Codex Borbonicus p.27).png`, `Tlaloc Codex Borgia.jpg`, `Chalchiuhtli icue Codex Fejérváry-Mayer 33.jpg`, `Quetzalcoatl Ehecatl.jpg`, `Codex Borgia page 56.jpg` (Mictlantecuhtli and Quetzalcoatl back to back), `Xolotl, Codex Borgia page 37.jpg`, `Tecciztecatl.jpg`, `Nacimiento de Huitzilopochtli.jpg` (Florentine Codex Book 3), `Coyolxauhqui stone.jpg`, `Codex Borbonicus (p. 8).jpg` (Mayahuel trecena), `9infiernos.png` (the nine levels of Mictlan, Codex Ríos), `Tamoanchan Codex Telleriano-Remensis.jpg`, `Piedra del Sol en MNA.jpg`, `File-Monolito de la Piedra del Sol (centro).jpg`.

Still needed, search Commons for: Florentine Codex Book 7 images of the gods at Teotihuacan or the birth of the sun and moon; a Tlaltecuhtli image (the Templo Mayor Tlaltecuhtli monolith photo, credited); a Tonacatepetl or maize image; Oxomoco and Cipactonal (Codex Borbonicus p.21 is a candidate to verify).

## Definition of done

- `creation/index.html` (plus manifest and icons if it installs separately), committed and pushed to `main`.
- Every step's facts checked against a named source, with sources listed in the app.
- Every image file name seen in a Commons search result, with a caption and correct credit.
- Who's Who deep-link handler added, and names in the walkthrough link to it.
- `sw.js` updated with the new files and a bumped cache name.
- Rendered once in headless Chrome at phone width (no JS errors) before pushing.
