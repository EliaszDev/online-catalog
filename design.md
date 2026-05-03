# Design System — Premium Watches Catalog
## Light Theme Redesign (Temu/AliExpress-Inspired, Clutter-Free)

---

## 1. Design Philosophy

### Core Goal
Transform the existing dark, glassmorphic premium aesthetic into a **light, airy, approachable e-commerce experience** that feels familiar to users of Temu, AliExpress, and modern marketplaces — but stripped of all annoyances (popups, fake urgency, overwhelming banners, aggressive reds).

### Mood
- **Clean & breathable** — generous whitespace, not cramped
- **Friendly & trustworthy** — warm neutrals instead of cold dark blues
- **Fast & scannable** — users should find products in <3 seconds
- **Mobile-first** — 70%+ of traffic will be on phones

### What We Keep From Original
- Multi-language support (PL/EN/RU/KZ/UZ)
- Admin panel with login
- Photo carousel + lightbox
- Category filtering + search
- SKU system + stock tracking
- 5-language description editing

### What We Ditch
- Dark navy/black background (`#0b0f19`)
- Heavy glassmorphism (frosted blur panels)
- Gradient text logos
- Ultra-minimalist "luxury" spacing (too sparse for catalogs)
- Desktop-first modal layout

---

## 2. Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#ffffff` | Page background |
| `--bg-secondary` | `#f8f9fa` | Cards, panels, alternating sections |
| `--bg-tertiary` | `#f1f3f5` | Hover states, subtle fills, input backgrounds |
| `--border-light` | `#e9ecef` | Card borders, dividers, hairlines |
| `--border-medium` | `#dee2e6` | Input borders, focus rings |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-blue` | `#2563eb` | Primary buttons, active filters, links, badges |
| `--accent-blue-light` | `#eff6ff` | Blue tint backgrounds (active states) |
| `--accent-blue-hover` | `#1d4ed8` | Button hover |
| `--success-green` | `#10b981` | In-stock badges, prices, positive actions |
| `--success-green-light` | `#ecfdf5` | Stock indicator backgrounds |
| `--danger-red` | `#ef4444` | Out-of-stock, delete actions, errors |
| `--danger-red-light` | `#fef2f2` | Error backgrounds |
| `--warning-amber` | `#f59e0b` | Low stock warnings (optional) |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#111827` | Headlines, product names, prices |
| `--text-secondary` | `#4b5563` | Descriptions, metadata, body copy |
| `--text-tertiary` | `#9ca3af` | Placeholders, disabled states, timestamps |
| `--text-inverse` | `#ffffff` | Text on colored buttons/badges |

### Temu/AliExpress Inspired BUT Cleaned Up
- **No** neon orange (`#ff5000`) as primary — too aggressive
- **No** flashing red countdown badges
- **No** "90% OFF" explosion graphics
- Keep the **grid density** and **clear pricing** of marketplaces, but with **premium restraint**

---

## 3. Typography

### Font Family
- **Primary:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, sans-serif
- **Monospace (SKUs only):** `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace

### Type Scale (Mobile-first, rem-based)
| Token | Size | Weight | Line-Height | Usage |
|-------|------|--------|-------------|-------|
| `text-hero` | 1.75rem (28px) | 800 | 1.2 | Page title "PREMIUM WATCHES" |
| `text-h1` | 1.5rem (24px) | 700 | 1.3 | Section headers |
| `text-h2` | 1.25rem (20px) | 600 | 1.4 | Product names in cards |
| `text-h3` | 1.125rem (18px) | 600 | 1.4 | Modal product name |
| `text-body` | 1rem (16px) | 400 | 1.5 | Descriptions, general text |
| `text-small` | 0.875rem (14px) | 500 | 1.5 | Metadata, stock info, labels |
| `text-xs` | 0.75rem (12px) | 500 | 1.4 | Badges, SKU, timestamps, hints |
| `text-price` | 1.25rem (20px) | 700 | 1.2 | Price display |
| `text-price-lg` | 1.5rem (24px) | 800 | 1.2 | Modal price |

### Rules
- Product names: **max 2 lines**, `line-clamp: 2`, `overflow: hidden`
- Descriptions in cards: **max 2 lines**, `line-clamp: 2`
- Full descriptions in modal: no clamp, comfortable reading width (max 65ch)
- All caps only for **badges** and **buttons** — never for body text
- Letter-spacing: normal everywhere except badges (`tracking-wide` for SKU)

---

## 4. Layout & Grid System

### Container
- Max-width: `1280px` (not 7xl/1280 already, but explicitly `max-w-7xl` equivalent)
- Padding: `16px` on mobile, `24px` on tablet+, `32px` on desktop
- Centered with auto margins

### Product Grid
| Breakpoint | Columns | Gap |
|------------|---------|-----|
| < 480px | 2 columns | 12px |
| 480–767px | 2 columns | 16px |
| 768–1023px | 3 columns | 16px |
| 1024–1279px | 4 columns | 20px |
| 1280px+ | 5 columns | 20px |

> **Why 5 columns on desktop?** Temu/AliExpress use dense grids. With 5 columns, users see more products without scrolling. Images are still large enough at ~220px wide.

### Card Aspect Ratio
- Image area: **square (1:1)** — consistent with marketplace standards
- Total card height: dynamic based on content, but aim for uniform rows via `display: grid` on the container

### Header Layout
```
[Mobile]  Stacked: Logo + Search + Lang + Admin (vertical)
[Tablet+] Horizontal: Logo/Subtitle | Search | Lang | Admin
```
- Sticky header on scroll? **No.** Keep it static. Sticky headers steal viewport on mobile.
- Instead: put **category filters** in a horizontal sticky bar below header if needed.

### Modal Layout
- Mobile: **full-screen overlay** (not a centered box). Slide up from bottom like native app.
- Tablet+: Centered panel, max-width `900px`, rounded-2xl top corners on mobile, all corners on desktop.
- Two-column on desktop (image left, info right). Single column stacked on mobile.

---

## 5. Component Specifications

### 5.1 Header
```
Background: #ffffff
Border-bottom: 1px solid #e9ecef
Padding: 16px vertical
```

**Logo Area:**
- "PREMIUM WATCHES" in `text-hero`, weight 800, color `#111827`
- Subtitle "Katalog Produktów..." in `text-small`, color `#9ca3af`, margin-top 4px
- **No gradient text.** Solid black for maximum readability and trust.

**Search Bar:**
- Full width on mobile, max-width `400px` on desktop
- Background: `#f1f3f5`
- Border: `1px solid #e9ecef`, rounded-full (`9999px`)
- Height: `44px`
- Icon: magnifying glass, `#9ca3af`, left padding `16px`
- Placeholder: `#9ca3af`
- Focus: border `#2563eb`, background `#ffffff`, subtle shadow `0 0 0 3px rgba(37,99,235,0.1)`
- **No glass effect.** Solid, clean, recognizable.

**Language Switcher:**
- Horizontal row of text buttons: PL | EN | RU | KZ | UZ
- Active: `color: #2563eb`, `font-weight: 600`, underline 2px `#2563eb`
- Inactive: `color: #6b7280`, `font-weight: 500`
- No background pills, no borders. Clean text tabs.

**Admin Link:**
- Icon + text "Panel CMS"
- Color `#6b7280`, hover `#2563eb`
- No border, no background. Just a subtle link.

### 5.2 Category Filters
```
Container: horizontal scroll on mobile, flex-wrap on desktop
Background: transparent
Padding: 12px 0
```

**Filter Chips:**
- Default: `bg: #f1f3f5`, `color: #4b5563`, `border: none`, `rounded-full`, `padding: 8px 16px`, `font-size: 14px`, `font-weight: 500`
- Hover: `bg: #e9ecef`
- Active: `bg: #2563eb`, `color: #ffffff`, `font-weight: 600`
- Gap between chips: `8px`
- **No border on inactive chips.** Soft gray pills are cleaner.

### 5.3 Product Card
```
Background: #ffffff
Border: 1px solid #e9ecef
Border-radius: 12px
Overflow: hidden
Transition: transform 0.2s ease, box-shadow 0.2s ease
```

**Hover State:**
- `transform: translateY(-2px)`
- `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`
- **No scale transform.** Subtle lift is more refined and less jarring.

**Image Area:**
- Aspect ratio: 1:1
- Background: `#f8f9fa` (slight contrast so white-product photos don't disappear)
- Object-fit: `contain`
- Padding: `12px` inside the image area (so images don't touch edges)
- **No hover overlay veil.** Marketplaces don't hide the product on hover. Keep it visible.

**Info Area (padding 12px):**
- **Product Name:** `text-h2` clamped to 2 lines, color `#111827`, margin-bottom `6px`
- **SKU Badge:** `text-xs`, `font-family: monospace`, color `#6b7280`, background `#f1f3f5`, padding `2px 6px`, rounded `4px`. Inline, not a separate line.
- **Description:** `text-small`, color `#6b7280`, clamped 2 lines, margin-bottom `8px`
- **Price:** `text-price`, color `#10b981` (green), margin-bottom `6px`. If no price, hide entirely (no placeholder).
- **Stock + Color Row:** flex, space-between
  - Stock: `text-xs`, green dot (6px circle) + "Dostępny: 5 szt." in `#10b981`
  - Out of stock: red dot + "Brak na stanie" in `#ef4444`
  - Color: `text-xs`, color `#9ca3af`, right-aligned

**No "View Details" hover badge.** The entire card is clickable — users know to click. The cursor pointer and lift animation are enough affordance.

### 5.4 Product Modal (Detail View)

**Mobile:**
- Full screen, slide up from bottom
- Close button: top-right, `44×44px` touch target, `#6b7280` X icon
- Image: full width, swipeable carousel, dots indicator below
- Info: stacked below image, padding `20px`

**Desktop:**
- Centered, `max-width: 900px`, `max-height: 90vh`, `overflow-y: auto`
- Background overlay: `rgba(0,0,0,0.6)` with `backdrop-filter: blur(4px)` (subtle, not heavy)
- Panel: `bg: #ffffff`, `rounded-2xl`, `shadow-2xl`
- Two-column: Image 55%, Info 45%

**Image Column:**
- Main image: `aspect-square`, `bg: #f8f9fa`, `object-contain`, padding `20px`
- Navigation arrows: circular, `40×40px`, `bg: rgba(255,255,255,0.9)`, `color: #111827`, border `1px solid #e9ecef`, positioned left/right of image
- Thumbnails: horizontal row, `64×64px`, `rounded-lg`, `gap: 8px`
  - Active: `border: 2px solid #2563eb`, `opacity: 1`
  - Inactive: `border: 2px solid transparent`, `opacity: 0.6`
- **Zoom:** tap/click to open lightbox (same as before)

**Info Column:**
- SKU badge: pill, `bg: #eff6ff`, `color: #2563eb`, `text-xs`, `font-weight: 600`, `padding: 4px 10px`, `rounded-full`
- Category: `text-small`, `#6b7280`, uppercase, tracking-wide
- Product Name: `text-h3`, `#111827`, margin `8px 0`
- Color: `text-body`, `#4b5563`
- Price: `text-price-lg`, `#10b981`, `font-weight: 800`
- Description: `text-body`, `#4b5563`, `line-height: 1.6`, inside a `bg: #f8f9fa`, `rounded-xl`, `padding: 16px` box
- Availability bar: full width, `rounded-xl`, `padding: 12px 16px`
  - In stock: `bg: #ecfdf5`, text `#059669`, strong number
  - Out of stock: `bg: #fef2f2`, text `#dc2626`

### 5.5 Lightbox
- Background: `rgba(0,0,0,0.92)`
- Image: `max-width: 90vw`, `max-height: 90vh`, `object-contain`
- Close: tap anywhere or X button top-right
- Caption: `text-small`, `#9ca3af`, centered below image

### 5.6 Buttons

**Primary Button (Save, Submit)**
```
Background: #2563eb
Color: #ffffff
Border-radius: 10px
Padding: 12px 20px
Font: 14px, weight 600
Hover: #1d4ed8
Active: scale(0.98)
Shadow: none (flat design is cleaner)
```

**Secondary Button (Cancel, Back)**
```
Background: #f1f3f5
Color: #4b5563
Border: 1px solid #e9ecef
Border-radius: 10px
Padding: 12px 20px
Hover: #e9ecef
```

**Danger Button (Delete)**
```
Background: #fef2f2
Color: #ef4444
Border: 1px solid #fecaca
Hover: #fee2e2
```

### 5.7 Form Inputs (Admin Panel)
- Background: `#ffffff`
- Border: `1px solid #dee2e6`
- Border-radius: `10px`
- Padding: `12px 14px`
- Font: `16px` (prevents iOS zoom)
- Focus: `border-color: #2563eb`, `box-shadow: 0 0 0 3px rgba(37,99,235,0.1)`
- Label: `text-small`, `#4b5563`, `font-weight: 500`, margin-bottom `6px`
- Required indicator: `#ef4444` asterisk

### 5.8 Photo Upload Grid (Admin)
- 3-column grid, gap `12px`
- Empty slot: `aspect-square`, dashed border `#dee2e6`, `bg: #f8f9fa`, plus icon `#9ca3af`
- Filled slot: `aspect-square`, `rounded-xl`, `overflow: hidden`, image `object-cover`
- Delete button: `24×24px`, `bg: #ef4444`, white X, top-right, `z-index: 2`
- Drag reordering: same as before but with light theme visuals

### 5.9 Toast Notifications
- Position: bottom-center, `16px` from bottom
- Background: `#111827` (dark, for contrast on light page)
- Color: `#ffffff`
- Padding: `12px 20px`
- Border-radius: `10px`
- Shadow: `0 4px 20px rgba(0,0,0,0.15)`
- Success variant: left border `4px solid #10b981`
- Error variant: left border `4px solid #ef4444`
- Slide up animation, 3s duration

### 5.10 Progress Overlay
- Background: `rgba(255,255,255,0.85)` (light overlay, not dark)
- Spinner: `40×40px`, `border: 3px solid #e9ecef`, `border-top: 3px solid #2563eb`
- Text: `text-small`, `#4b5563`

---

## 6. Spacing System

Use a 4px base unit:
| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |

### Page Rhythm
- Between major sections: `32–48px`
- Between cards in grid: `12–20px` (responsive)
- Inside cards: `12px` padding
- Between form groups: `20px`

---

## 7. Animations & Interactions

### Principles
- **Fast:** All transitions ≤ 300ms
- **Purposeful:** Motion guides attention, never decorates
- **Respectful:** No bouncing, no overshoot, no parallax

### Card Entrance
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Duration: `300ms`
- Easing: `ease-out`
- Stagger: `40ms` between cards (faster than before for snappier feel)

### Card Hover
```css
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.08);
transition: all 0.2s ease;
```

### Modal Open
- Mobile: `translateY(100%)` → `translateY(0)`, `300ms`, `ease-out`
- Desktop: `opacity: 0` + `scale(0.96)` → `opacity: 1` + `scale(1)`, `250ms`
- Backdrop: `opacity: 0` → `opacity: 1`, `200ms`

### Button Press
```css
:active { transform: scale(0.97); }
transition: transform 0.1s;
```

### Image Load
- Skeleton placeholder: `bg: #f1f3f5`, subtle pulse animation
- Image fade-in: `opacity: 0` → `opacity: 1`, `200ms` once loaded

---

## 8. Mobile-First Admin Panel

### Structure
Same two-view architecture (Add / List), but redesigned for light theme.

### Login Screen
- Background: `#f8f9fa` (not pitch black)
- Card: `bg: #ffffff`, `border: 1px solid #e9ecef`, `shadow-lg`, max-width `360px`, centered
- Input: standard light form input style
- Button: primary blue, full width

### Bottom Nav
- Background: `#ffffff`
- Border-top: `1px solid #e9ecef`
- Height: `64px`
- Active tab: `color: #2563eb`, icon + label
- Inactive: `color: #9ca3af`
- **No backdrop blur.** Solid white is cleaner and performs better.

### Product List
- Each row: `bg: #ffffff`, `border-bottom: 1px solid #f1f3f5`, padding `12px 16px`
- Thumbnail: `48×48px`, `rounded-lg`, `object-cover`
- Name: `text-body`, weight 600, `#111827`
- Meta: `text-xs`, `#6b7280`
- Actions: edit (blue ghost button), delete (red ghost button)

---

## 9. Image Handling

### Grid Thumbnails
- Display: `images/watches/{base}_thumb.jpg`
- Fallback: `images/watches/{filename}`
- Container: `aspect-square`, `bg: #f8f9fa`, `object-contain`, padding `12px`

### Modal Full Images
- Display: `images/watches/{base}_full.jpg`
- Fallback: `images/watches/{filename}`
- Max-height: `70vh` on desktop, `50vh` on mobile

### Admin Upload
- Resize to: thumb `600px`, full `1600px`
- Format: JPEG, quality `0.85`
- Naming: preserve original base name, append `_thumb` / `_full`

---

## 10. Accessibility

- **Contrast ratios:** All text meets WCAG AA (4.5:1 minimum)
- **Focus states:** Visible blue outline `2px solid #2563eb` on all interactive elements
- **Touch targets:** Minimum `44×44px` for buttons, `48×48px` for nav items
- **Reduced motion:** If `prefers-reduced-motion: reduce`, disable all transforms and fade animations
- **Alt text:** All product images must have meaningful `alt` attributes (model name)
- **ARIA:** Modal has `role="dialog"`, `aria-modal="true"`, close button has `aria-label="Close"`

---

## 11. Anti-Patterns (Explicitly Forbidden)

To maintain the "Temu/AliExpress usability without the annoyingness" philosophy, never implement:

1. **Fake urgency:** No countdown timers, "only 2 left!" lies, or flashing "HURRY" badges
2. **Popups:** No newsletter modals, cookie banners that block content, or spin-to-win wheels
3. **Oversized discounts:** No "90% OFF" graphics, strikethrough fake original prices unless real
4. **Auto-play:** No video backgrounds, no carousel auto-advance
5. **Aggressive colors:** No neon orange primary buttons, no red as main CTA
6. **Cluttered header:** No 3-row headers with banners, coupons, and announcements
7. **Infinite scroll without footer:** Pagination or "Load more" button preferred
8. **Hidden prices:** Price must be visible on the card without interaction
9. **Tiny tap targets:** Nothing below 44px on mobile
10. **Dark mode flash:** If user has light system pref, respect it (this design is light-only for now)

---

## 12. File Structure Reference

```
/
├── index.html          # Main catalog (this design)
├── admin/
│   └── index.html      # Admin panel (light theme version)
├── csvjson.json        # Product data
├── images/
│   └── watches/
│       ├── photo1.jpg
│       ├── photo1_thumb.jpg
│       └── photo1_full.jpg
└── design.md           # This file
```

---

## 13. Quick Reference: Before vs After

| Element | Old (Dark) | New (Light) |
|---------|-----------|-------------|
| Background | `#0b0f19` | `#ffffff` |
| Card bg | Glass `rgba(255,255,255,0.03)` | Solid `#ffffff` |
| Card border | `rgba(255,255,255,0.08)` | `#e9ecef` |
| Primary text | `#e2e8f0` | `#111827` |
| Price color | `#34d399` (bright green) | `#10b981` (calmer green) |
| Button style | Gradient + shadow | Flat solid color |
| Logo | Gradient text | Solid black |
| Hover effect | Scale 110% + blue veil | Lift -2px + soft shadow |
| Modal | Heavy blur backdrop | Light blur + white panel |
| Admin bg | `#0b0f19` | `#f8f9fa` |

---

*Document version: 1.0*
*Created for: EliaszDev/online-catalog*
*Design direction: Light marketplace aesthetic, premium restraint, mobile-first*
