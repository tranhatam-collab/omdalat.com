# AP Dalat Image Pack v1

Prepared on `2026-04-19` for `ap.omdalat.com`.

## Notes

- All shortlisted images are real Dalat photographs with clear reuse terms from Wikimedia Commons.
- No image in this pack should have any added overlay text except `Om Dalat` or `Ap Dalat`.
- This pack favors editorial calm, place texture, weather, slopes, rooftops, and working/living atmosphere over tourism cliche.
- Two files are intentionally excluded from public use and moved to `images/excluded/`: one invalid placeholder download and one watermarked image.

## Folder structure

- `images/originals/`: full original downloads
- `images/ready/hero/`: resized hero-safe exports
- `images/ready/card/`: resized card exports
- `images/ready/og/`: resized OG exports
- `images/seo/`: manifest and editorial SEO notes

## Recommended shortlist

| File | Best use | License | Credit |
|---|---|---|---|
| `dalat-city-panorama-2020.jpg` | homepage hero, about hero | CC BY-SA 4.0 | Tuong Lam Photos / Wikimedia Commons |
| `dalat-city-panorama-2014.jpg` | places hub hero, OG | CC BY-SA 4.0 | Castelfranco / Wikimedia Commons |
| `dalat-farmland-highland-patterns-2010.jpg` | livelihood, work, agriculture | Public Domain | D. Myles Cullen, U.S. Army / Wikimedia Commons |
| `dalat-view-ngoc-lan-2011.jpg` | rhythms hero, visual essays | CC BY-SA 3.0 | Diane Selwyn / Wikimedia Commons |
| `dalat-city-slopes-january-2012.jpg` | places stories, city overview | CC BY-SA 2.0 | calflier001 / Wikimedia Commons |
| `dalat-rooftops-and-valley-2012.jpg` | work hub, place essays | CC BY-SA 2.0 | calflier001 / Wikimedia Commons |
| `dalat-valley-houses-january-2012.jpg` | hub hero, story support | CC BY-SA 2.0 | calflier001 / Wikimedia Commons |
| `dalat-slope-and-hillside-homes-2012.jpg` | cards, mobile hero | CC BY-SA 2.0 | calflier001 / Wikimedia Commons |

## SEO implementation rules for dev/content

1. Use the filename exactly as shipped unless the CMS requires hash renaming.
2. Reuse the `alt_vi`, `alt_en`, `caption_vi`, and `caption_en` values from [dalat-image-manifest.json](./dalat-image-manifest.json).
3. Keep `width` and `height` in markup whenever possible.
4. Prefer `hero` assets for section heroes, `card` assets for list cards, and `og` assets for social previews.
5. If overlay text is ever added in design, only `Om Dalat` or `Ap Dalat` is allowed.

## Waiting state

This pack is ready for attachment by the dev team.
Hold here until the next plan and article batch arrives.
