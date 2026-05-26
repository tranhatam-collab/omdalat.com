# Custom OG Images Creation Guide

## Status: SVG Templates Created

I have created 5 SVG template files for custom OG images. These are vector-based templates that can be:

1. Used directly as OG images (SVG format)
2. Converted to PNG/JPEG/WebP for better compatibility
3. Customized with actual photography from the site

## Created Templates

1. **og-template-dalat-khong-chi-de-ghe-qua.svg** - Dark blue gradient
2. **og-template-nguoi-tre-o-lai-da-lat.svg** - Purple gradient
3. **og-template-da-lat-ve-dem.svg** - Blue gradient
4. **og-template-hien-nha-nho-ben-doc.svg** - Green gradient
5. **og-template-anh-sang-mua-som.svg** - Brown/amber gradient

## Specifications

- **Dimensions:** 2400x1350px (16:9 aspect ratio)
- **Format:** SVG (scalable vector graphics)
- **File size:** ~2-3KB each (very lightweight)
- **Typography:** Georgia (serif) for titles, Helvetica/Arial for body
- **Brand:** "ẤP ĐÀ LẠT" branding on each template

## Next Steps

### Option 1: Use SVG Templates Directly
Update the HTML files to reference the new SVG files instead of the generic OG image:

```html
<!-- In article HTML files -->
<meta property="og:image" content="https://ap.omdalat.com/images/ready/og/og-template-dalat-khong-chi-de-ghe-qua.svg" />
```

### Option 2: Convert to Raster Format
Convert SVGs to PNG/JPEG/WebP for better social media compatibility:

```bash
# Using ImageMagick or similar tool
convert og-template-dalat-khong-chi-de-ghe-qua.svg og-dalat-khong-chi-de-ghe-qua.png
```

### Option 3: Create Photo-Based OG Images
Use the existing hero photography with text overlays:

1. Take the hero image for each article
2. Add text overlay with article title
3. Export as 2400x1350px PNG/WebP
4. Place in `/images/ready/og/`

## Recommended Implementation

For immediate use, I recommend **Option 1** (use SVG templates directly) because:

- Lightweight and fast-loading
- Scalable at any resolution
- Already created and ready to use
- Consistent branding across all articles

## File Locations

All templates are in: `/Users/tranhatam/Documents/Devnewproject/omdalat.com/ap.omdalat.com/images/ready/og/`

## Integration Required

To use these templates, update the OG image references in the following HTML files:

1. `/cau-chuyen/da-lat-khong-chi-de-ghe-qua/index.html` → `og-template-dalat-khong-chi-de-ghe-qua.svg`
2. `/con-nguoi/nguoi-tre-o-lai-da-lat/index.html` → `og-template-nguoi-tre-o-lai-da-lat.svg`
3. `/nhip-song/da-lat-ve-dem-khong-on-nhung-khong-trong/index.html` → `og-template-da-lat-ve-dem.svg`
4. `/noi-chon/hien-nha-nho-ben-doc/index.html` → `og-template-hien-nha-nho-ben-doc.svg`
5. `/hinh-anh/anh-sang-mua-som/index.html` → `og-template-anh-sang-mua-som.svg`

And corresponding English versions.
