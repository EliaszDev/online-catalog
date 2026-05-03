# Setup Guide — Premium Watches Catalog (Cloudflare Pages)

## What You're Building

A true CMS (Content Management System) for your product catalog. You will:
1. Store your website files on **GitHub**
2. Host the site on **Cloudflare Pages** (connected to GitHub)
3. Edit products through a web interface at `yoursite.pages.dev/admin/`
4. Every save auto-redeploys your live site in ~1 minute

**No more downloading JSON files. No more manual uploads.**

---

## Phase 1: Create a GitHub Repository

GitHub stores your website files and tracks every change you make.

1. Go to **github.com** and sign up (or log in)
2. Click the **+** button (top right) → **"New repository"**
3. Name it: `premium-watches-catalog` (or any name)
4. Select **Public** (easiest for setup)
5. Click **"Create repository"**

---

## Phase 2: Upload Your Website Files

You need to upload these files to GitHub:

```
premium-watches-catalog/
├── index.html
├── csvjson.json
├── _headers
├── admin/
│   └── index.html
└── images/
    └── watches/
        ├── zw-95-black.jpg
        ├── zw-95-black_thumb.jpg
        ├── zw-95-black_full.jpg
        └── ... (all your processed photos)
```

### Upload method (easiest — via browser):

1. In your new GitHub repo, click **"uploading an existing file"**
2. Drag and drop:
   - `index.html`
   - `csvjson.json`
   - `_headers`
3. For folders: GitHub web upload doesn't support folders directly. Instead:
   - Click **"Add file" → "Create new file"**
   - Type the path: `admin/index.html`
   - Paste the contents of the `admin/index.html` file
   - Click **"Commit changes"**
4. For images: Click **"Add file" → "Upload files"**
   - Create the folder structure by typing `images/watches/` before the filename when using "Create new file" (GitHub creates folders automatically when you use `/` in the filename)
   - Or use GitHub Desktop app for easier folder uploads

**Alternative for folders:** Download [GitHub Desktop](https://desktop.github.com/), clone your repo to your PC, copy all files into the folder, and sync. Much easier for bulk image uploads.

---

## Phase 3: Connect Cloudflare Pages to GitHub

1. Go to **dash.cloudflare.com** and sign up/log in
2. Navigate to **Pages** in the left sidebar
3. Click **"Create a project"**
4. Select **Connect to Git**
5. Choose **GitHub** and authorize Cloudflare to access your repositories
6. Find and select your `premium-watches-catalog` repository
7. In **Build settings**:
   - **Build command:** (leave empty for static site)
   - **Build output directory:** `/` (root)
8. Click **"Save and Deploy"**

Cloudflare Pages will give you a URL like `https://premium-watches-catalog.pages.dev`

**Your site is now live!**

---

## Phase 4: Configure GitHub Access for Admin Panel

The admin panel pushes changes directly to GitHub. You need a Personal Access Token.

1. Go to **github.com/settings/tokens/new**
2. Give it a name like `Catalog Admin`
3. Select scope: **repo** (full control of private repositories)
4. Click **"Generate token"**
5. **Copy the token immediately** — you won't be able to see it again

---

## Phase 5: Using the Admin Panel

1. Go to your site URL: `https://YOUR-SITE.pages.dev/admin/`
   (Replace YOUR-SITE with your actual Cloudflare Pages subdomain)
2. Click **"Ustawienia GitHub"** and enter:
   - **GitHub Token:** your token from Phase 4
   - **Nazwa repozytorium:** `yourusername/premium-watches-catalog`
3. Click **"Testuj Połączenie"** to verify
4. You can now add products directly through the panel

---

## Phase 6: Using the Admin Panel

### Interface Overview

The panel has two tabs at the bottom: **Dodaj** (Add) and **Lista** (List).

### Adding a New Product

1. Go to the **Dodaj** tab
2. Fill in the form:
   - **SKU:** Unique code (e.g., `ZS-14`)
   - **Model:** Product name (e.g., `X-100`)
   - **Kategoria:** Category (choose from the list or type your own)
   - **Kolor:** Color (e.g., `BLACK / SILVER`)
   - **Ilość na stanie:** Stock quantity (number)
   - **Cena (PLN):** Price, optional (e.g., `199.99`)
   - **Zdjęcia:** Tap the photo slots to upload images from your phone/computer
   - **Opisy w językach:** Fill descriptions in all 5 languages (PL, EN, RU, KK, NE)
3. Click **"Zapisz Produkt"**
4. Go to the **Lista** tab and click **"Wyślij na GitHub"**
5. Changes will be live in ~1 minute

### Editing a Product

1. Go to the **Lista** tab
2. Find the product and click the **pen icon** (✏️)
3. Edit fields
4. Click **"Zapisz Produkt"**
5. Go back to **Lista** and **"Wyślij na GitHub"**

### Deleting a Product

1. Go to the **Lista** tab
2. Find the product and click the **trash icon** (🗑️)
3. Confirm deletion
4. Click **"Wyślij na GitHub"**

---

## Phase 7: Understanding Auto-Deploy

**Every time you send changes to GitHub:**
1. The admin panel commits the new `csvjson.json` and photos to GitHub
2. GitHub notifies Cloudflare Pages
3. Cloudflare Pages rebuilds and redeploys your site (~30–60 seconds)
4. Your live catalog updates automatically

**You don't need to do anything.** Just send to GitHub and wait a minute.

---

## Your New Workflow

| Step | What You Do | Where |
|---|---|---|
| Take photos | iPhone 16 Pro | Your phone |
| Remove background + resize | Run Python script | Your Windows PC |
| Upload processed photos | Admin panel photo upload or GitHub Desktop | GitHub repo |
| Add/edit products | Fill form in admin panel | `yoursite.pages.dev/admin/` |
| Site updates | Auto-deploy | Cloudflare Pages (~30 sec) |

---

## Troubleshooting

### Admin panel shows "Błąd połączenia"
- Make sure your GitHub token is correct and has **repo** scope
- Make sure the repository name is exactly `username/repo-name`
- Check that the repository is accessible with your token

### Changes don't appear on the live site
- Wait 1 minute after sending to GitHub
- Check the Cloudflare Pages dashboard **"Deployments"** tab — you should see a new deployment triggered
- If deploy failed, check the deploy log for errors

### Images don't show on the site
- Make sure images are in the `images/watches/` folder in your repo
- Make sure the filenames match exactly (case-sensitive)
- Remember: the site looks for `photo_thumb.jpg` and `photo_full.jpg` first, then falls back to original

### Adding new product removed previous ones
- This should not happen with the updated panel. The panel now **merges** local changes with remote data on GitHub before uploading
- Always click **"Wyślij na GitHub"** from the Lista tab to ensure all products are synced

---

## File Reference

| File | Purpose | Do Not Edit Manually |
|---|---|---|
| `index.html` | Customer catalog | No (auto-deployed) |
| `csvjson.json` | Product database | No (edit via admin panel only) |
| `admin/index.html` | Admin panel interface | No |
| `images/watches/` | Product photos | Upload via admin panel or GitHub |
| `_headers` | Cloudflare cache rules | No |

---

## Next Steps

1. **Download all files** from the project folder
2. **Create GitHub repo** and upload files
3. **Connect Cloudflare Pages** and deploy
4. **Generate GitHub token** with repo access
5. **Go to `/admin/`** and configure token + repo
6. **Add a test product** and send to GitHub
7. **Check your live site** after 1 minute — the new product should appear

**Need help?** The most common issue is forgetting the repo name format. Make sure it's exactly `username/repo-name`.
