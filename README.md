# Sreevarsha Prakhash — Learning Design Portfolio

A polished, mobile-friendly, **free-to-host** multi-page portfolio website, including a **browser-based content editor**. Pure HTML + CSS + JavaScript: **no npm, databases, servers or paid hosting required**.

## What is included?

- `index.html` — Home page, key capabilities, selected work
- `about.html` — Personal biography, editable career timeline, expertise, and downloadable résumé
- `portfolio.html` — Verified résumé-based project stories, searchable project cards, 10 editable learning and development categories, **191 preloaded material names**, and empty placeholders for attachments
- `contact.html` — Direct email, copy-to-clipboard, inquiry form that composes an email (no backend)
- `admin.html` — Content editor for bio, career roles, portfolio projects, categories, materials, and media attachments
- `assets/js/data.js` — Single editable source of truth for portfolio content
- `assets/img/professional-headshot.webp` — Enhanced professional portrait based on your supplied photo
- `assets/resume/Sreevarsha_Prakhash_Resume.pdf` — Provided résumé

**Important:** Project cards describe your résumé experience, but samples are deliberately NOT represented as public or measured outcomes until you attach evidence. Do not publish confidential client materials without permission.

## 1. Preview locally

If you have Python installed, extract the ZIP, open a command prompt in the site folder, and run:

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000` and `http://localhost:8000/admin.html`.

You can also open `index.html` directly for basic browsing, although using a local web server is recommended.

## 2. Publish with GitHub Pages (free)

1. Sign in to GitHub and create a **public** repository, such as `learning-portfolio`.
2. Upload **the contents of this extracted folder** to the repository root (not the enclosing ZIP).
3. From the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then click **Save**.
6. Your site will be accessible at `https://YOUR-USERNAME.github.io/learning-portfolio/` after the initial deployment.

The empty `.nojekyll` file prevents GitHub Pages from trying to transform the static site. All links are relative, so GitHub project-site paths work correctly.

Official instructions: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

## 3. Update the portfolio from the editor

1. Visit `https://YOUR-USERNAME.github.io/learning-portfolio/admin.html`.
2. Edit your biography, career roles, categories, materials, or projects.
3. Click **Save draft** to store changes on **this browser only**.
4. Click **Preview draft** to view the local preview (`?preview=1`).
5. To publish, go to **Publish & files**. Fill in:
   - **Repository**: `YOUR-USERNAME/learning-portfolio`
   - **Branch**: `main`
   - **Fine-grained GitHub personal access token**: a token scoped **only** to this repository with **Contents: Read and write** permission.
6. Click **Test connection**, then **Publish all changes**. The editor commits changes to `assets/js/data.js`; GitHub Pages will republish the site after the commit.

Generate a fine-grained token through **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**. Set a short expiration date and narrow repository access. Never include the token in code or screenshots.

You can edit `assets/js/data.js` directly in GitHub instead of using the editor if preferred.

## 4. Attach work samples and files

- Go to **Categories & materials**, expand a category and choose **Attach file / link** beside any deliverable.
- Or go to **Portfolio projects** and choose **Attach file / link** beside a project.
- Use **Add link** for externally hosted videos, demos, PDFs, Articulate Review links, LMS previews, or other media.
- Use **Upload to GitHub** for files **up to 18 MB** (browser upload limit). This commits the binary to `uploads/` immediately, and **Publish all changes** then publishes the link in the data file.
- Multiple files can be attached to each project or material.
- Supported file types include PDF, DOC(X), PPT(X), XLS(X), ZIP / SCORM packages, HTML, CSS, JS, XML, JSON, CSV, EPUB, TXT, Storyline `.story`, Captivate `.cptx`, images, video and audio, captions and subtitles.
- Do **not** host sensitive or proprietary samples in a public repository. Published files are accessible to everyone.
- A SCORM ZIP can be downloaded, but **GitHub Pages is not an LMS** and does not provide course tracking or LMS completion data.

For large files, VR experiences, and videos, link to another hosting service rather than committing large media directly to GitHub. This also keeps the site responsive.

## 5. Editor security and limitations

**The editor page is NOT password-protected.** GitHub Pages cannot provide server-side login or a database on its own. Anyone can access the admin page and make edits to a draft **in their own browser**, but only someone with repository write permission and a valid GitHub token can publish to the live repository. Do **not** store your GitHub token anywhere in the repository. The editor never saves tokens to localStorage and does not deliberately send them to other services.

The site is a **portfolio and lead-generation site**, not an online shop. GitHub's Pages policies restrict e-commerce sites and SaaS that primarily facilitate commercial transactions. If you want direct checkout or paid learning software later, use a suitable commerce platform and link to it.

The contact form uses `mailto:` to open the visitor's email app. It doesn't capture or store inquiries. For production contact-form submissions, a separate form service or backend would be needed.

Local drafts are browser-specific. Export a JSON backup periodically under **Publish & files**. Publishing writes updates to the same data file in the repository and can replace other changes if someone edited it concurrently, so avoid editing in multiple browsers at the same time.

## Customization

- Colors, typography and layout: `assets/css/style.css`
- Public content and categories: `assets/js/data.js`
- Profile portrait: `assets/img/professional-headshot.webp`
- Resume: `assets/resume/Sreevarsha_Prakhash_Resume.pdf`
- Public page logic: `assets/js/site.js`
- Browser editor and GitHub publishing logic: `assets/js/admin.js`

Built without frameworks or dependencies so it is easy to maintain and host at zero cost for a public portfolio.
