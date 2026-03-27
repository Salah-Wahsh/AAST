# AAST

Course materials and lab pages served as static HTML.

## GitHub Pages

To publish this site so students can open it in a browser:

1. Push this repo to GitHub.
2. Open the repo on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** (or your default) and folder **/ (root)**, then **Save**.
5. After a minute, the site is at `https://<your-username>.github.io/AAST/` (use your actual org/username if the repo URL differs).

The landing page is [index.html](index.html). Individual labs are linked from there (e.g. [lab7.html](lab7.html)).

## Adding a lab

1. Add `labN.html` in the repo root.
2. In `index.html`, duplicate a lab `<li>` card and update the title, description, and `href`.
