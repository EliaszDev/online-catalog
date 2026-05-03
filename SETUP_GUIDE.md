# Decap CMS Setup Guide — Premium Watches Catalog

## What You're Building

A true CMS (Content Management System) for your product catalog. You will:
1. Store your website files on **GitHub**
2. Host the site on **Netlify** (connected to GitHub)
3. Edit products through a web interface at `yoursite.netlify.app/admin/`
4. Every save auto-redeploys your live site in ~1 minute

**No more downloading JSON files. No more manual uploads.**

---

## Phase 1: Create a GitHub Repository

GitHub stores your website files and tracks every change you make.

1. Go to **github.com** and sign up (or log in)
2. Click the **+** button (top right) → **"New repository"**
3. Name it: `premium-watches-catalog` (or any name)
4. Select **Public** (required for Netlify free tier)
5. Click **"Create repository"**

---

## Phase 2: Upload Your Website Files

You need to upload these files to GitHub:

```
premium-watches-catalog/
├── index.html
├── csvjson.json
├── admin/
│   ├── index.html
│   └── config.yml
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
3. For folders: GitHub web upload doesn't support folders directly. Instead:
   - Click **"Add file" → "Create new file"**
   - Type the path: `admin/index.html`
   - Paste the contents of the `admin/index.html` file
   - Click **"Commit changes"**
   - Repeat for `admin/config.yml`
4. For images: Click **"Add file" → "Upload files"**
   - Create the folder structure by typing `images/watches/` before the filename when using "Create new file" (GitHub creates folders automatically when you use `/` in the filename)
   - Or use GitHub Desktop app for easier folder uploads

**Alternative for folders:** Download [GitHub Desktop](https://desktop.github.com/), clone your repo to your PC, copy all files into the folder, and sync. Much easier for bulk image uploads.

---

## Phase 3: Connect Netlify to GitHub

1. Go to **app.netlify.com** and sign up/log in (use your GitHub account for easiest setup)
2. Click **"Add new site" → "Import an existing project"**
3. Select **GitHub** as your Git provider
4. Find and select your `premium-watches-catalog` repository
5. Netlify will auto-detect settings. Leave everything default:
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)
6. Click **"Deploy site"**

Netlify will give you a random URL like `https://premium-watches-123abc.netlify.app`

**Your site is now live!** But the CMS isn't enabled yet.

---

## Phase 4: Enable Netlify Identity (Authentication)

This lets you log into the CMS securely.

1. In your Netlify dashboard, click your site
2. Go to the **"Identity"** tab
3. Click **"Enable Identity"**
4. Go to **"Settings"** (still in Identity tab)
5. Under **"Registration"**, select **"Invite only"** (recommended — prevents random signups)
6. Under **"External providers"**, you can leave everything off

---

## Phase 5: Enable Git Gateway

This lets the CMS write changes back to your GitHub repository.

1. Still in the **Identity** tab, scroll to **"Services"**
2. Click **"Enable Git Gateway"**
3. Netlify will generate a token automatically — this is secure and normal

---

## Phase 6: Add Yourself as a User

1. In the **Identity** tab, click **"Invite users"**
2. Enter your email address
3. Click **"Send invite"**
4. Check your email inbox for an invite from Netlify
5. Click the link in the email and set your password

**Note:** This password is separate from your old `admin`/`Illia2004` login. You can use any password you want here.

---

## Phase 7: Access the CMS

1. Go to your site URL: `https://YOUR-SITE.netlify.app/admin/`
   (Replace YOUR-SITE with your actual Netlify subdomain)
2. You'll see a **"Login with Netlify Identity"** button
3. Click it and enter your email + the password you just set
4. You are now in the CMS!

---

## Phase 8: Using the CMS

### Interface Overview

The CMS shows **"Produkty"** in the left sidebar. Click it.

You will see a list of all your products. Each product shows:
- SKU
- Model name
- Quantity in stock

### Adding a New Product

1. Click **"Dodaj Produkt"** (Add Product) at the top right
2. Fill in the form:
   - **SKU**: Unique code (e.g., `ZS-14`)
   - **Model**: Product name (e.g., `X-100`)
   - **Kategoria**: Category (e.g., `zegarki-smartwatch` or create new like `sluchawki`)
   - **Kolor**: Color (e.g., `BLACK / SILVER`)
   - **Ilość na stanie**: Stock quantity (number)
   - **Cena (PLN)**: Price, optional (e.g., `199.99`)
   - **Zdjęcia**: Comma-separated filenames (e.g., `x100-black.jpg, x100-side.jpg`)
   - **Opisy w językach**: Fill descriptions in all 5 languages (PL, EN, RU, KK, NE)
3. Click **"Zapisz"** (Save) at the top right
4. The CMS will commit the changes to GitHub

### Editing a Product

1. Click on any product in the list
2. Edit fields
3. Click **"Zapisz"**

### Deleting a Product

1. Open the product
2. Click the **trash icon** (🗑️) at the top right
3. Confirm deletion
4. Click **"Zapisz"**

### Uploading Photos via CMS

You can also upload photos directly through the CMS:

1. In any product, look for the **Media** button (left sidebar, image icon)
2. Or when editing, you can use the media library
3. Uploaded images go to `images/watches/` automatically
4. **Important**: The CMS uploads original files. You still need to run the Python background-removal + resize script locally for best results, then upload the processed versions.

---

## Phase 9: Understanding Auto-Deploy

**Every time you save in the CMS:**
1. Decap CMS commits the new `csvjson.json` to GitHub
2. GitHub notifies Netlify
3. Netlify rebuilds and redeploys your site (~30–60 seconds)
4. Your live catalog updates automatically

**You don't need to do anything.** Just save and wait a minute.

---

## Your New Workflow

| Step | What You Do | Where |
|---|---|---|
| Take photos | iPhone 16 Pro | Your phone |
| Remove background + resize | Run Python script | Your Windows PC |
| Upload processed photos | GitHub Desktop or CMS Media | GitHub repo |
| Add/edit products | Fill form in CMS | `yoursite.netlify.app/admin/` |
| Site updates | Auto-deploy | Netlify (30 sec) |

---

## Troubleshooting

### "Login with Netlify Identity" button doesn't work
- Make sure you enabled **Identity** and **Git Gateway** (Steps 4–5)
- Make sure you accepted the email invite (Step 6)
- Try refreshing the `/admin/` page

### CMS loads but shows "No collections"
- Check that `admin/config.yml` was uploaded correctly
- Make sure the indentation in `config.yml` is correct (YAML is sensitive to spaces)

### Changes don't appear on the live site
- Wait 1 minute after saving
- Check the Netlify dashboard **"Deploys"** tab — you should see a new deploy triggered
- If deploy failed, check the deploy log for errors

### Images don't show on the site
- Make sure images are in the `images/watches/` folder in your repo
- Make sure the filenames in the CMS match exactly (case-sensitive)
- Remember: the site looks for `photo_thumb.jpg` and `photo_full.jpg` first, then falls back to original

### I want to go back to the old admin panel
- The old `admin.html` still works at `yoursite.netlify.app/admin.html`
- But the Decap CMS at `/admin/` is the recommended workflow now

---

## File Reference

| File | Purpose | Do Not Edit Manually |
|---|---|---|
| `index.html` | Customer catalog | No (auto-deployed) |
| `csvjson.json` | Product database | No (edit via CMS only) |
| `admin/index.html` | CMS interface loader | No |
| `admin/config.yml` | CMS configuration | Only if adding fields |
| `images/watches/` | Product photos | Upload via GitHub or CMS |

---

## Next Steps

1. **Download all files** from the output folder
2. **Create GitHub repo** and upload files
3. **Connect Netlify** and deploy
4. **Enable Identity + Git Gateway**
5. **Invite yourself** and set password
6. **Go to `/admin/`** and try adding a test product
7. **Check your live site** after 1 minute — the new product should appear

**Need help?** The most common issue is forgetting to enable Git Gateway. Double-check Step 5.
