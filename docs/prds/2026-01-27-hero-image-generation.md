# PRD: Hero Section Image Generation

**Date:** 2026-01-27
**Author:** Design Team
**Status:** Draft

---

## Background & Context

The Meridian marketing site hero section requires a custom background image that conveys the brand's positioning in capital markets communications. The image should evoke themes of vision, exploration, strategic thinking, and reaching new heights—metaphors that resonate with investor relations and market building.

This document defines the AI image generation prompt structure and parameters for creating hero images, allowing for iterative experimentation with different settings.

---

## Goals

- [ ] Create a reusable prompt structure for AI image generation
- [ ] Generate a hero background image that aligns with Meridian brand aesthetics
- [ ] Document prompt parameters for future iterations and A/B testing
- [ ] Establish visual language for the "explorer/visionary" brand metaphor

## Non-Goals

- This PRD does not cover image optimization (compression, WebP conversion)
- This PRD does not cover responsive image handling
- This PRD does not define final image selection criteria

---

## Detailed Requirements

### Subject Requirements

| Parameter | Value | Notes |
|-----------|-------|-------|
| Gender | Male | |
| Age | Early 40s | Mature, experienced look |
| Build | Muscular, athletic | Conveys strength/capability |
| Face | Sharp features, defined jawline | |
| Eyes | Blue | |
| Facial Hair | Well-groomed beard | Rugged but refined |
| Overall Look | Rugged but refined | Balance of adventure and professionalism |

### Outfit & Accessories

| Item | Description | Notes |
|------|-------------|-------|
| Jacket | Weathered technical outdoor jacket | Explorer aesthetic |
| Pants | Durable hiking pants | |
| Footwear | Sturdy hiking boots | |
| Backpack | Explorer-style backpack | Preparedness, journey |
| Headwear | Beanie/toque | Winter appropriate |

### Pose & Expression

- **Pose:** Walking on path toward distant quarry
- **Orientation:** Back fully to camera, facing AWAY toward quarry (creates mystery, invites viewer to share the vision)
- **Expression:** Contemplative, determined
- **Action:** Walking into the distance toward quarry (metaphor for strategic journey, pursuing goals)

### Environment Requirements

| Element | Description | Rationale |
|---------|-------------|-----------|
| Location | Cliff-side switchback trail descending to quarry | Journey toward goal, challenging path |
| Path | Winding, descending, cliff-edge switchbacks | Treacherous journey, determination |
| Season | Winter | Clean, stark, focused |
| Weather | Light snowfall | Adds atmosphere and motion |
| Terrain | Steep cliffs, sheer drops, rocky ledges | Rugged, dangerous environment |
| Far Distance | Deep mining quarry pit at horizon | Industrial element, destination (capital markets tie-in) |
| Quarry Depth | Extremely deep, cavernous pit descending far down | Scale, ambition, depth of opportunity |
| Background | Distant mountain range beyond quarry | Scale, ambition |
| Sky | Expansive (40-50% of frame) | Epic scale, infinite possibility |

### Sky Requirements

| Element | Description | Notes |
|---------|-------------|-------|
| Time | Night (midnight, pitch black) | Dramatic, contemplative |
| Stars | Visible Milky Way stretching across sky, thousands of stars | Infinite possibility |
| Aurora | Light aurora borealis on horizon (greens/purples) | Adds brand colors (complement Fuji Nezu) |
| Proportion | 40-50% of total frame | Expansive, epic scale |
| Horizon | Visible in upper portion of frame | Shows vast distance and destination |

---

## Camera & Technical Settings

### Recommended Base Settings

| Parameter | Value | Alternatives | Rationale |
|-----------|-------|--------------|-----------|
| Lens | 16mm ultra wide | 24mm, 35mm | Ultra wide captures vast landscape + small subject |
| Aperture | f/8 | f/5.6, f/11 | Deep focus, everything sharp |
| Angle | High angle 45-50° (birds eye) | 60-70° | Shows horizon and expansive sky |
| Depth of Field | Deep focus | - | Shows full environment, no bokeh |
| Resolution | 8K | 4K | Hero section requires ultra high res |
| Aspect Ratio | 2.76:1 IMAX | 21:9, 16:9 | Ultra-wide cinematic format |
| Lighting | Natural moonlight + aurora glow | | Ethereal, natural feel |
| Sky Proportion | 40-50% of frame | 30-40% | Expansive, epic scale |
| Subject Scale | 10-15% of frame height | 15-20% | Small figure in vast landscape |

### Settings to Experiment With

**Aperture variations:**
- `f/5.6` - Deep DOF, most elements sharp
- `f/8` - Maximum sharpness across frame (recommended)
- `f/11` - Extreme depth, may lose some light

**Lens variations:**
- `16mm` - Ultra wide, vast landscape, subject very small (recommended)
- `24mm` - Very wide, dramatic perspective, landscape dominant
- `35mm` - Natural wide, good subject/landscape balance

**Angle variations:**
- `45-50°` - Birds eye showing horizon and sky (recommended)
- `60-70°` - Steeper birds eye, less sky visible
- `30-40°` - Lower angle, more horizon, less ground detail

**Sky proportion variations:**
- `40-50%` - Expansive sky, epic scale (recommended)
- `30-40%` - Balanced sky and ground
- `50-60%` - Sky dominant, minimal ground

**Aspect ratio variations:**
- `2.76:1` - IMAX ultra-wide, most cinematic (recommended)
- `21:9` - Cinematic wide
- `16:9` - Standard widescreen

---

## Prompt Structure (JSON Format)

```json
{
  "reference_image": "uploaded_photo",

  "identity": {
    "keep_face": true,
    "keep_identity": true
  },

  "scene": {
    "type": "ultra_realistic_cinematic_landscape",
    "time": "extremely dark night - so dark a flashlight is needed",
    "time_of_day": "dead of night, pitch black",
    "lighting_condition": "FLASHLIGHT required - primary illumination comes from handheld flashlight, with distant moon and aurora in sky",
    "action": "subject standing on path in EXACT CENTER of frame, holding flashlight pointing DOWN at ground, looking toward DISTANT quarry far ahead",
    "darkness": "extremely dark - the flashlight beam is the main light source cutting through the blackness"
  },

  "subject": {
    "gender": "male",
    "age": "early 40s",
    "build": "muscular, athletic",
    "face": {
      "features": "sharp, defined jawline",
      "eyes": "blue",
      "facial_hair": "well-groomed beard"
    },
    "appearance": "rugged but refined",
    "skin": {
      "detail": "high detail skin texture with visible pores",
      "tone": "natural weathered complexion"
    },
    "outfit": {
      "style": "explorer/mountaineer - WORN and WEATHERED from long trek",
      "wear_level": "clothing shows signs of extensive use, NOT new, looks like days on the trail",
      "jacket": {
        "type": "weathered technical outdoor jacket",
        "material": "Gore-Tex or similar technical fabric, showing wear",
        "details": "visible stitching, worn patches, functional pockets",
        "color": "dark earth tones, charcoal or navy",
        "condition": "visibly worn - faded patches, minor scuffs, dust/dirt accumulation, creased and broken-in, salt stains from dried sweat, small abrasions"
      },
      "pants": {
        "type": "durable hiking pants",
        "material": "ripstop nylon or canvas",
        "details": "cargo pockets, reinforced knees",
        "condition": "worn and dirty - dust covered, mud stains on lower legs, faded at knees from kneeling, frayed edges, signs of hard use"
      },
      "footwear": {
        "type": "sturdy hiking boots",
        "details": "worn leather, visible laces, mud-stained",
        "condition": "heavily worn - scuffed leather, mud-caked soles, worn laces, dust and dirt embedded, broken-in creases"
      },
      "overall_appearance": "clothing looks LIVED IN - this person has been trekking for days, not fresh from the store"
    },
    "accessories": [
      {
        "item": "backpack",
        "details": "technical hiking pack, 40-50L, weathered straps, attached gear"
      },
      {
        "item": "beanie/toque",
        "material": "wool knit",
        "color": "dark grey or navy"
      },
      {
        "item": "flashlight/torch",
        "held_in": "right hand, pointing DOWNWARD toward the ground/path",
        "type": "powerful handheld LED flashlight/torch",
        "beam": "visible light beam pointing DOWN at the ground, illuminating the path at his feet and ground ahead",
        "beam_direction": "DOWNWARD - flashlight aimed at the ground, not forward into the distance",
        "light_color": "warm white/yellow flashlight beam",
        "importance": "PRIMARY LIGHT SOURCE in the scene - the flashlight beam illuminates the ground"
      }
    ],
    "expression": "contemplative, determined",
    "pose": "standing on path looking toward distant quarry, BACK TO CAMERA, holding flashlight in right hand pointing DOWN at the ground, we see his back NOT his face",
    "orientation": "subject facing away from viewer, looking toward distant quarry ahead, back of head and shoulders visible, flashlight beam pointing DOWNWARD at ground",
    "position": "standing EXACTLY IN CENTER OF FRAME on the path, distant quarry visible far ahead"
  },

  "camera": {
    "angle": "behind and slightly above subject, looking past him INTO the abyss",
    "lens": "35mm",
    "aperture": "f/2.8",
    "resolution": "8K",
    "depth_of_field": "SHALLOW - subject sharp in focus, abyss/quarry falls away into soft blur, background mountains soft",
    "focus_point": "sharp focus on subject's back, everything beyond falls into gradual blur",
    "format": "cinematic_ultra_wide_2.76:1 IMAX ratio",
    "perspective": "camera positioned behind man, lens pointing past him into the dark abyss below",
    "horizon_line": "horizon visible in upper portion of frame, mountainous background"
  },

  "composition": {
    "rule": "ABSOLUTE CENTER - man must be mathematically centered",
    "subject_placement": "subject EXACTLY at 50% horizontal position - dead center",
    "subject_centering": "equal pixel distance from left edge to man = equal distance from man to right edge",
    "subject_scale": "subject appears small - occupies only 10-15% of frame height",
    "layout": {
      "left_side": "jagged mountainous terrain, rocky peaks, rugged cliffs",
      "center": "man standing at cliff edge, quarry/abyss dropping away below him",
      "right_side": "the path that led here, continuing terrain"
    },
    "path_position": "path is on the RIGHT side of the frame",
    "terrain_left": "jagged, rocky mountainous terrain on LEFT side",
    "quarry_position": "quarry/abyss CENTERED below where man stands",
    "depth_layers": "foreground man (SHARP focus), cliff edge, abyss falling away (BLUR), distant mountains (soft blur)",
    "symmetry": "man centered, but ASYMMETRIC terrain (jagged mountains LEFT, path RIGHT)",
    "sky_proportion": "sky takes up upper 40-50% of frame, moon on RIGHT side, NO aurora",
    "vertical_placement": "subject in lower-middle of frame, cliff edge ahead, quarry depth below, mountainous background"
  },

  "lighting": {
    "overall": "EXTREMELY DARK - only TWO color light sources: FLASHLIGHT and AURORA. Everything else is GRAYSCALE/BLACK",
    "darkness_level": "pitch black darkness - flashlight is the ONLY ground-level light source",
    "color_sources": {
      "only_one": "ONLY the flashlight beam has COLOR - everything else is grayscale/monochrome",
      "flashlight": "warm white/yellow - the ONLY color in the entire scene"
    },
    "primary": {
      "source": "FLASHLIGHT held by subject pointing DOWNWARD - ONLY light source illuminating terrain",
      "beam": "visible cone of warm light pointing DOWN at the ground",
      "beam_direction": "DOWNWARD toward the ground/path at subject's feet",
      "color": "warm white/yellow - this is the ONLY color in the entire scene",
      "illumination": "flashlight illuminates the ground/path around the subject's feet and slightly ahead",
      "falloff": "light falls off RAPIDLY into darkness - tight cone on ground",
      "reach": "flashlight illuminates ground area around subject - maybe 10-15 feet radius on ground"
    },
    "terrain_darkness": {
      "path": "path is VERY DARK - only visible where flashlight hits it, otherwise near-black",
      "left_mountains": "jagged mountains on left are DARK SILHOUETTES - no direct light, just faint moonlight edge",
      "background_mountains": "distant mountains are DARK GREY SILHOUETTES against sky - NO color, very little light",
      "cliff_edge": "cliff edge only visible where flashlight beam reaches",
      "quarry_below": "quarry is PITCH BLACK abyss - almost no light reaches down there"
    },
    "secondary": {
      "source": "MOON on RIGHT side of sky",
      "position": "upper RIGHT portion of frame",
      "intensity": "very dim, cool GRAYSCALE light only",
      "color": "NO color from moon - just faint grey/silver",
      "effect": "provides ONLY faint silhouette edges on mountains and subject rim light"
    },
    "grayscale_rule": {
      "terrain": "ALL terrain outside flashlight beam is GRAYSCALE - dark greys and blacks",
      "mountains": "mountains are MONOCHROME dark silhouettes",
      "rocks": "rocks outside flashlight are grey/black with no color",
      "sky": "sky is dark GRAYSCALE - moon is grey, stars are white points, NO aurora"
    },
    "light_realism": {
      "rule": "light ONLY comes from actual sources and ONLY illuminates what it physically can reach",
      "flashlight_limit": "flashlight has limited range - distant objects receive NO flashlight light",
      "no_ambient": "there is NO ambient fill light - areas not hit by a light source are BLACK",
      "distance_falloff": "light intensity drops off with distance squared - distant terrain is DARK"
    },
    "shadows": {
      "quality": "extremely deep, near-total darkness",
      "density": "areas outside light sources are 90-100% black"
    }
  },

  "atmosphere": {
    "fog": "light ground mist in quarry valley",
    "particles": "visible snowflakes in air, catching moonlight",
    "volumetric_light": "subtle god rays from moonlight through atmosphere",
    "breath_visible": "slight breath vapor from cold air",
    "dust_motes": "subtle particles catching light near ground"
  },

  "environment": {
    "location": "cliff edge overlooking deep quarry abyss, mountainous terrain",
    "season": "winter",
    "weather": "clear or light snow particles",
    "layout": {
      "left_side": {
        "description": "jagged mountainous terrain on LEFT - DARK SILHOUETTES",
        "lighting": "NO direct light - these are dark silhouettes against the sky",
        "color": "GRAYSCALE ONLY - dark grey/black shapes, no color",
        "features": [
          "rocky mountain peaks as DARK SILHOUETTES",
          "rugged cliff faces in deep shadow",
          "sharp ridgelines barely visible against sky",
          "snow-dusted crags (snow appears grey, not white, due to darkness)",
          "jagged rocky terrain - all in dark shadow"
        ],
        "visibility": "mountains are dark shapes - no detail visible, just silhouette outlines against sky"
      },
      "center": {
        "description": "cliff edge and quarry abyss below where man stands",
        "features": [
          "cliff edge where man stands (CENTERED)",
          "deep quarry pit dropping away below",
          "vertiginous depth into darkness"
        ]
      },
      "right_side": {
        "description": "the path on RIGHT side",
        "features": [
          "worn path that led to this point",
          "path ends at cliff edge",
          "rocky terrain continuing"
        ]
      }
    },
    "background": {
      "description": "distant mountainous terrain - DARK GRAYSCALE SILHOUETTES",
      "lighting": "NO direct light on background mountains - they are dark silhouettes only",
      "color": "GRAYSCALE ONLY - no color on distant terrain, pure dark grey/black silhouettes",
      "features": [
        "mountain range as DARK SILHOUETTES against night sky",
        "peaks and ridges barely visible as dark shapes",
        "layered mountain depths fading into darkness"
      ],
      "visibility": "very low - distant mountains receive almost no light, just faint outlines against sky",
      "blur": "soft focus due to shallow depth of field"
    },
    "path": {
      "type": "trail that ENDS at cliff edge",
      "position": "path is on the RIGHT side of the frame",
      "direction": "path leads from right side to cliff edge where it STOPS",
      "termination": "path ENDS at the cliff edge - quarry drops away below",
      "lighting": "path is VERY DARK - only visible where flashlight beam directly hits it",
      "color": "GRAYSCALE - dark grey/brown tones with NO color except where flashlight illuminates",
      "features": [
        "worn dirt path on RIGHT side - DARK, barely visible outside flashlight beam",
        "path terminates at precipice",
        "subject stands where path ends"
      ],
      "surface": "worn dirt and loose gravel, some snow - all DARK except in flashlight cone",
      "darkness": "path beyond flashlight reach is near-black, indistinguishable from surrounding terrain"
    },
    "cliff_edge": {
      "description": "sheer cliff face where terrain drops away vertically",
      "position": "directly in front of the centered subject",
      "drop": "vertical cliff face dropping down to the quarry below",
      "visibility": "cliff edge illuminated by flashlight"
    },
    "terrain": {
      "left_side": "jagged mountainous terrain with rocky peaks and cliffs",
      "right_side": "path and continuing rocky terrain",
      "steepness": "extremely steep cliff at edge",
      "features": [
        "jagged mountain terrain on left",
        "sheer cliff face dropping to quarry",
        "rocky precipice",
        "path on right side"
      ]
    },
    "quarry": {
      "visibility": "visible FAR IN THE DISTANCE ahead of subject - NOT close, NOT at cliff edge",
      "position": "quarry is FAR AWAY in the distance, subject is on path APPROACHING it from afar",
      "distance": "quarry is VERY FAR AWAY - maybe 500m-1km in the distance, small on the horizon",
      "placement": "CENTERED in frame but FAR in the distance ahead",
      "view": "looking TOWARD the distant quarry across the terrain",
      "type": "massive deep open pit mining quarry",
      "depth": "deep pit visible as dark shape in the distance",
      "lighting": {
        "overall": "quarry is a dark shape in the distance - too far for flashlight to reach",
        "distant": "quarry is just a dark silhouette/shape far away",
        "faint_lights": "maybe tiny faint lights from quarry equipment visible in the far distance"
      },
      "color": "GRAYSCALE - dark grey shape in the distance",
      "features": [
        "quarry visible as dark depression/pit FAR in the distance",
        "terraced levels barely visible as dark shapes far away",
        "industrial scale visible even from far distance",
        "destination the man is walking TOWARD"
      ],
      "scale": "appears smaller due to distance but clearly massive",
      "relationship_to_subject": "subject is FAR from quarry, walking TOWARD it on the path, long journey ahead"
    },
    "sky": {
      "type": "night sky with moon on RIGHT side - NO AURORA",
      "proportion": "sky takes up 40-50% of the frame, dominant visual element",
      "moon": {
        "visibility": "PROMINENT, clearly visible moon",
        "position": "RIGHT side of sky, upper RIGHT portion of frame",
        "phase": "full or gibbous moon, bright and visible",
        "color": "GRAYSCALE - silver/grey moon, no color",
        "effect": "moon provides faint secondary light, silhouettes mountains"
      },
      "aurora": "NO AURORA - sky is clear with just moon and stars",
      "features": [
        "moon on RIGHT side of sky (grayscale)",
        "milky way visible stretching across sky",
        "thousands of bright stars (white points)",
        "NO aurora borealis",
        "clear dark night sky",
        "mountainous horizon silhouetted against sky"
      ]
    },
    "textures": {
      "rocks": "razor sharp rough granite with lichen, every crack and crevice visible, snow accumulation in crevices, 8K texture detail",
      "path": "worn dirt and gravel with individual stones visible, boot prints with tread detail",
      "snow": "fresh powder with individual crystalline flakes visible, macro detail",
      "fabric": "visible weave pattern on jacket, individual fibers on wool beanie",
      "ground": "every pebble, every grain of dirt sharp and distinct"
    }
  },

  "style": {
    "mood": "epic, aspirational, solitary contemplation, dark and moody, existential",
    "aesthetic": "cinematic landscape photography, RAW photograph, IMAX film quality",
    "reference": "Christopher Nolan cinematography, Interstellar, Dunkirk, Oppenheimer visual style, Hoyte van Hoytema cinematography, shot on IMAX 70mm film",
    "film_style": "Christopher Nolan epic scale, practical effects look, IMAX large format, Hans Zimmer atmosphere",
    "detail": "extreme detail textures where flashlight illuminates - elsewhere too dark to see detail",
    "color_approach": {
      "rule": "COLOR ONLY from flashlight beam. EVERYTHING ELSE IS GRAYSCALE - no aurora",
      "flashlight_area": "warm white/yellow color ONLY in flashlight beam cone on the ground",
      "everything_else": "GRAYSCALE - dark greys, blacks, no color saturation anywhere else"
    },
    "color_grading": {
      "overall": "95% GRAYSCALE - only flashlight beam has color",
      "terrain": "completely desaturated except where flashlight hits - pure grey/black tones",
      "mountains": "dark grey silhouettes, NO color",
      "sky": "grayscale - grey moon, white stars, NO aurora colors",
      "shadows": "pure black, crushed blacks",
      "midtones": "dark grey, completely desaturated",
      "highlights": "only flashlight beam on ground has warm color"
    },
    "contrast": "extremely high contrast - bright flashlight beam on ground against pitch black surroundings",
    "brightness": "extremely dark exposure, -3 to -4 stops, dead of night darkness",
    "saturation": "ZERO saturation except flashlight beam (warm) - true grayscale everywhere else, NO aurora"
  },

  "quality": {
    "resolution": "8K ultra_high_resolution, upscaled",
    "realism": "hyper_realistic, indistinguishable from real photograph",
    "render": "photorealistic, Octane render quality, Unreal Engine 5",
    "noise": "natural film grain, ISO 800-1600 noise pattern",
    "sharpness": "razor sharp micro-details, visible fabric weave, individual hair strands, rock texture detail",
    "upscale": "4x upscale, enhance details, preserve sharpness",
    "detail_level": "extreme micro-detail on all surfaces"
  },

  "negative_prompts": [
    "blurry",
    "out of focus",
    "soft focus",
    "low quality",
    "low resolution",
    "pixelated",
    "oversaturated",
    "vibrant colors",
    "colorful",
    "saturated",
    "cartoon",
    "anime",
    "illustration",
    "painting",
    "drawing",
    "digital art",
    "CGI looking",
    "fake looking",
    "artificial",
    "plastic skin",
    "smooth skin",
    "airbrushed",
    "extra limbs",
    "missing limbs",
    "deformed hands",
    "distorted face",
    "disfigured",
    "bad anatomy",
    "wrong proportions",
    "watermark",
    "text",
    "logo",
    "signature",
    "duplicate",
    "cropped",
    "worst quality",
    "jpeg artifacts",
    "compression artifacts",
    "ugly",
    "unnatural pose",
    "floating objects",
    "inconsistent lighting",
    "daytime",
    "daylight",
    "sunset",
    "sunrise",
    "golden hour",
    "blue hour",
    "twilight",
    "bright sky",
    "bright image",
    "overexposed",
    "washed out",
    "flat lighting",
    "video game",
    "render",
    "3D render looking",
    "deep focus everywhere",
    "close up",
    "portrait",
    "tight framing",
    "low angle",
    "eye level",
    "ground level",
    "face visible",
    "frontal view",
    "side profile",
    "off center subject",
    "asymmetrical",
    "subject on left",
    "subject on right",
    "rule of thirds",
    "subject facing camera",
    "subject looking at camera",
    "front view of subject",
    "narrow framing",
    "tight crop",
    "minimal sky",
    "no horizon",
    "quarry on left",
    "quarry on right",
    "front lighting",
    "front lit",
    "lit from front",
    "horizontal aurora",
    "aurora bands",
    "subject off center",
    "man on left",
    "man on right",
    "no moon",
    "moonless",
    "no flashlight",
    "ambient lighting",
    "evenly lit",
    "bright scene",
    "well illuminated",
    "man off center",
    "subject not centered",
    "quarry off center",
    "asymmetric composition",
    "fake aurora",
    "neon aurora",
    "rigid aurora pillars",
    "aurora touching ground",
    "moon on left",
    "moon centered",
    "path on left",
    "new clothing",
    "clean clothes",
    "pristine outfit",
    "fresh clothing",
    "unworn gear",
    "blurry subject",
    "man out of focus",
    "colorful terrain",
    "saturated colors",
    "colored mountains",
    "visible quarry bottom",
    "lit terrain",
    "ambient fill light",
    "even lighting",
    "bright path",
    "visible distant details"
  ]
}
```

---

## Flat Text Prompt Version

For AI generators that prefer natural language prompts:

```
Ultra realistic cinematic photograph of a rugged man in his early 40s with a well-groomed beard, sharp facial features, blue eyes, and muscular athletic build. High detail skin texture with visible pores. He wears a weathered dark Gore-Tex technical outdoor jacket with visible stitching and functional pockets, durable ripstop hiking pants with cargo pockets, mud-stained leather hiking boots, a 40-50L technical hiking backpack with weathered straps, and a dark grey wool knit beanie. Walking down a winding path toward a mining quarry, back mostly to camera with slight partial profile visible, moving into the distance.

Scene: Deep winter night, midnight, pitch black sky. Light snowfall with visible snowflakes catching moonlight. Winding dirt path with visible boot prints leading down into quarry creates strong leading line. Rocky terrain with rough granite boulders covered in lichen, snow accumulation in crevices. Mining quarry visible ahead in the distance with light ground mist in the valley. Distant mountain range. Dark pitch black night sky with thousands of bright stars and visible Milky Way and subtle aurora borealis glowing on horizon in greens and purples. Subtle breath vapor visible from cold air.

Composition: Centered composition, subject positioned in middle of frame occupying 30-40% of frame height. Path creates leading line from foreground through subject to quarry beyond. Balanced negative space on both sides.

Lighting: Primary soft diffused moonlight from upper right (cool blue, 6500K). Subtle rim light on subject's back and shoulders for edge definition. Aurora provides ambient green/purple glow on horizon. Soft fill from starlight and snow reflection. Shadows are soft with gradual falloff, cast toward lower left, deep but with visible detail. Subtle volumetric god rays through atmosphere.

Camera: 35mm lens, f/2.8 aperture, slightly elevated angle from behind, moderate depth of field with focus on subject's back and shoulders. 4K resolution, cinematic 21:9 aspect ratio. Subtle motion blur on feet to convey walking motion.

Style: Epic cinematic landscape photography in the style of Ansel Adams meets Roger Deakins cinematography. Cool blue-grey color tones with aurora accents. Color grading: deep blue-black shadows, neutral slightly desaturated midtones, cool white highlights with subtle warmth. Dramatic contrast. Hyper-realistic detail on textures. Aspirational, contemplative mood. Octane render quality.

Quality: 4K, ultra high resolution, photorealistic, tack sharp on subject with natural falloff, minimal cinematic grain.

Negative prompt: blurry, out of focus, low quality, pixelated, oversaturated, cartoon, anime, illustration, painting, drawing, extra limbs, missing limbs, deformed hands, distorted face, disfigured, bad anatomy, wrong proportions, watermark, text, logo, signature, duplicate, cropped, worst quality, jpeg artifacts, ugly, unnatural pose, floating objects, inconsistent lighting, daytime, daylight, sunset, sunrise, golden hour, blue hour, twilight, bright sky.
```

---

## Iteration Log

Track prompt variations and results here:

| Date | Variation | Settings Changed | Result | Keep/Discard |
|------|-----------|------------------|--------|--------------|
| 2026-01-27 | Base prompt v1 | Initial: 24mm, low_angle, deep focus | [pending] | |
| 2026-01-27 | Variation v2 | 35mm, slightly_elevated, moderate DOF | Gemini - bad results | Discard |
| 2026-01-27 | Variation v3 | Side profile, subject left looking right at quarry | Not great | Discard |
| 2026-01-27 | Variation v4 | Walking down path toward quarry, back to camera, partial profile | [pending] | |
| 2026-01-27 | Variation v5 | Enhanced: lighting, atmosphere, textures, composition, negative prompts. Subject centered. | Still looks fake, blurry terrain | Discard |
| 2026-01-27 | Variation v6 | 8K upscale, extreme texture detail, heavily desaturated/greyscale, darker exposure, crushed blacks | DOF off, not zoomed out enough, man not centered | Discard |
| 2026-01-27 | Variation v7 | 24mm wide angle, f/8 deep focus, zoomed out wide shot, subject small and dead center, 15-20% frame height | Angle off, man not facing quarry | Discard |
| 2026-01-27 | Variation v8 | Birds eye view 60-70 degrees, drone shot, man facing away walking toward quarry, back fully visible from above | Quarry not visible | Discard |
| 2026-01-27 | Variation v9 | Added detailed quarry description - large open pit mining quarry visible in distance ahead, terraced levels, path leads to quarry | Man off center, quarry too close | Discard |
| 2026-01-27 | Variation v10 | Man EXACTLY centered (50/50), quarry moved to far distance near horizon, symmetrical composition | [pending] | |
| 2026-01-27 | Variation v11 | Man facing AWAY toward quarry (back to camera), 16mm ultra-wide, 2.76:1 IMAX ratio, sky 40-50% of frame, subject in lower third, expansive horizon | [pending] | |
| 2026-01-27 | Variation v12 | Deep cavernous quarry pit, winding cliff-side switchback trail descending, steep drops, vertiginous depth | [pending] | |
| 2026-01-27 | Variation v13 | Quarry on RIGHT side, steeper near-vertical terrain, extremely dark dead-of-night lighting, new moon darkness | [pending] | |
| 2026-01-27 | Variation v14 | Man PERFECTLY CENTERED, quarry DROP in CENTER (see depth), prominent visible MOON as backlight, VERTICAL aurora pillars, realistic backlighting from moon/stars/aurora, dark ground silhouette | [pending] | |
| 2026-01-27 | Variation v15 | Man DEAD CENTER with FLASHLIGHT as PRIMARY light source, cliff edge blocks path (terrain barrier), quarry BELOW cliff in center, pitch black darkness - flashlight beam is main illumination | [pending] | |
| 2026-01-27 | Variation v16 | Moon on RIGHT, path on RIGHT, jagged mountains on LEFT, mountainous background, REALISTIC aurora curtains (not pillars), shallow DOF (man sharp, abyss blurs), WORN/WEATHERED clothing | [pending] | |
| 2026-01-27 | Variation v17 | GRAYSCALE except for 2 color sources (flashlight=warm, aurora=green/purple), path DARK outside flashlight, mountains as dark silhouettes, quarry is BLACK ABYSS, realistic light physics | [pending] | |
| 2026-01-27 | Variation v18 | NO AURORA (removed), quarry FAR in distance (not at cliff edge), flashlight pointing DOWN at ground, only 1 color source (flashlight) | [pending] | |
| | | | | |

---

## Integration Notes

### Current Hero Implementation

- **File:** `src/components/sections/Hero.tsx`
- **Image Location:** `public/images/hero-bg-temp.jpg`
- **Current Treatment:** `grayscale-[40%]` filter + `bg-black/60` overlay
- **Animation:** Ken Burns effect (slow zoom)

### When Replacing Image

1. Save new image to `public/images/hero-bg.jpg` (or appropriate name)
2. Update image path in `Hero.tsx`
3. Adjust grayscale filter if needed (may need more/less depending on image)
4. Adjust overlay opacity if needed
5. Test text readability with purple (`text-fuji-nezu`) accents

---

## Open Questions

- [x] What AI image generator will be used? → **Gemini 3 Pro Image Preview** (`gemini-3-pro-image-preview`)
- [ ] Should we generate multiple variations for A/B testing?
- [ ] Final aspect ratio preference for responsive handling?
- [ ] Do we need separate mobile-optimized hero images?

---

## Gemini 3 Pro Image Preview API

### Model Overview

| Property | Value |
|----------|-------|
| Model ID | `gemini-3-pro-image-preview` |
| Also Known As | "Nano Banana Pro" |
| Alternative | `gemini-2.5-flash-image` (faster, lower quality) |
| Max Reference Images | 14 (6 objects + 5 humans + 3 style) |
| Output Resolutions | 1K, 2K, 4K |
| Supported Aspect Ratios | 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 |
| Features | Text-to-image, image editing, multi-turn editing, thinking mode |
| Watermark | SynthID (invisible) |

### Capabilities

**Text-to-Image Generation:**
- Generate images from detailed text prompts
- Professional asset production quality
- "Thinking" mode for complex compositions

**Image Editing:**
- Edit existing images with text instructions
- Multi-turn editing (iterative refinement)
- Up to 14 reference images for composition

**Grounding with Google Search:**
- Real-time data for current events, logos, products
- Useful for accurate brand/product representation

### SDK Implementation

**Basic Text-to-Image:**
```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=["A man stands on a rocky outcrop overlooking a quarry at night..."],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="21:9",  # IMAX-like cinematic
            image_size="4K"       # Highest quality
        ),
    )
)

# Extract generated image
for part in response.parts:
    if image := part.as_image():
        image.save("hero-image.png")
```

**Image-to-Image Editing:**
```python
from PIL import Image

# Load reference image
reference = Image.open("reference.jpg")

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=[
        "Edit this image to add aurora borealis on the horizon and falling snow",
        reference
    ],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="21:9",
            image_size="4K"
        ),
    )
)
```

**Multi-Turn Editing (Iterative Refinement):**
```python
# First generation
chat = client.chats.create(model="gemini-3-pro-image-preview")

response1 = chat.send_message(
    "Generate a man on a cliff overlooking a quarry at night",
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(image_size="2K")
    )
)

# Refine with follow-up
response2 = chat.send_message(
    "Add a flashlight in his hand pointing down at the ground",
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(image_size="4K")
    )
)
```

**Thinking Mode (Complex Compositions):**
```python
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=[detailed_prompt],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        thinking_config=types.ThinkingConfig(
            thinking_budget=2048  # More tokens = more deliberate composition
        ),
        image_config=types.ImageConfig(
            aspect_ratio="21:9",
            image_size="4K"
        ),
    )
)
```

**With Google Search Grounding:**
```python
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=["Generate the Meridian logo in a night scene..."],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        tools=[types.Tool(google_search=types.GoogleSearch())],
        image_config=types.ImageConfig(image_size="2K")
    )
)
```

### Resolution Options

| Size | Dimensions (approx) | Use Case |
|------|---------------------|----------|
| 1K | 1024px | Quick iterations, previews |
| 2K | 2048px | Standard web use |
| 4K | 4096px | Hero images, high-DPI displays |

**Note:** Resolution must be uppercase (`"4K"` not `"4k"`).

### Aspect Ratio Mapping

| Ratio | Description | Use Case |
|-------|-------------|----------|
| 21:9 | Ultra-wide cinematic | Hero backgrounds |
| 16:9 | Standard widescreen | Video thumbnails |
| 3:2 | Classic photo | General photography |
| 1:1 | Square | Social media |
| 9:16 | Portrait | Mobile stories |

### Configuration Reference

```python
types.GenerateContentConfig(
    # What to return
    response_modalities=['TEXT', 'IMAGE'],  # or just ['IMAGE']

    # Image settings
    image_config=types.ImageConfig(
        aspect_ratio="21:9",      # See table above
        image_size="4K",          # 1K, 2K, or 4K
        number_of_images=1,       # How many to generate
        person_generation="ALLOW_ALL",  # or "ALLOW_ADULT", "DONT_ALLOW"
        safety_filter_level="BLOCK_LOW_AND_ABOVE"  # Safety threshold
    ),

    # Optional: Thinking mode for complex prompts
    thinking_config=types.ThinkingConfig(
        thinking_budget=2048      # Token budget for reasoning
    ),

    # Optional: Ground with Google Search
    tools=[types.Tool(google_search=types.GoogleSearch())]
)
```

### Reference Images (Up to 14)

Gemini 3 Pro supports multiple reference images for composition:

| Type | Max Count | Purpose |
|------|-----------|---------|
| Object references | 6 | Products, items, props |
| Human references | 5 | People, faces, poses |
| Style references | 3 | Artistic style, mood, lighting |

```python
# Multiple reference images
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=[
        "Combine these references into a night scene...",
        Image.open("person-reference.jpg"),
        Image.open("landscape-reference.jpg"),
        Image.open("style-reference.jpg")
    ],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(image_size="4K")
    )
)
```

### Thought Signatures (Multi-Turn Context)

For multi-turn conversations, Gemini returns encrypted "thought signatures" that preserve context:

```python
# Response includes thought signature for context preservation
response = chat.send_message("Add more stars to the sky")

# The model remembers previous edits and maintains consistency
```

### Safety & Watermarking

- **SynthID Watermark:** All generated images include invisible SynthID watermark
- **Person Generation:** Configurable (`ALLOW_ALL`, `ALLOW_ADULT`, `DONT_ALLOW`)
- **Safety Filters:** Configurable threshold levels

### Comparison: gemini-3-pro-image-preview vs gemini-2.5-flash-image

| Feature | gemini-3-pro-image-preview | gemini-2.5-flash-image |
|---------|---------------------------|------------------------|
| Quality | Highest (professional) | Good (fast iterations) |
| Speed | Slower | Faster |
| Thinking Mode | Yes | Limited |
| Max Resolution | 4K | 4K |
| Use Case | Final hero images | Quick previews, A/B tests |

### Recommended Workflow for Hero Image

1. **Iterate with gemini-2.5-flash-image** at 1K resolution
2. **Refine prompt** based on quick previews
3. **Generate final with gemini-3-pro-image-preview** at 4K
4. **Use thinking mode** for complex compositions (aurora, snow, lighting)
5. **Multi-turn edit** if adjustments needed

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-27 | Design Team | Initial draft with prompt structure |
| 2026-01-27 | Design Team | v11: Updated for ultra-wide cinematic shot, subject facing away toward quarry, 16mm lens, 2.76:1 IMAX ratio, expansive sky (40-50% of frame) |
| 2026-01-27 | Design Team | v12: Deep cavernous quarry, winding cliff-side switchback trail descending, steep drops, vertiginous depth |
| 2026-01-27 | Design Team | v13: Quarry on RIGHT side, steeper near-vertical terrain, extremely dark dead-of-night lighting |
| 2026-01-27 | Design Team | v14: Man PERFECTLY CENTERED, quarry DROP in CENTER, prominent MOON backlight, VERTICAL aurora pillars, realistic backlighting, dark ground |
| 2026-01-27 | Design Team | v15: FLASHLIGHT as primary light source, cliff blocks path, quarry below in center, pitch black darkness |
| 2026-01-27 | Design Team | v16: Moon RIGHT, path RIGHT, mountains LEFT, realistic aurora curtains, shallow DOF, worn clothing |
| 2026-01-27 | Design Team | v17: GRAYSCALE except flashlight & aurora, realistic light physics, dark terrain, black abyss |
| 2026-01-27 | Design Team | v18: NO aurora, quarry FAR in distance, flashlight pointing DOWN at ground |
| 2026-01-27 | Design Team | Added video animation prompt section for Veo 3.1 |
| 2026-01-27 | Design Team | Video prompt v2: Added moonlight flicker, aurora borealis movement, light snowfall |
| 2026-01-27 | Claude | Added Gemini 3 Pro Image Preview API documentation (model, SDK, capabilities) |

---

## Video Animation Prompt (Veo 3.1)

Based on the v18 hero image, this section defines the video animation prompt for creating a cinematic loop where the man walks toward the distant quarry and gradually disappears into the darkness.

### Video Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Duration | 8-10 seconds | Long enough for gradual disappear effect |
| Resolution | 4K | Match hero image quality |
| Aspect Ratio | 16:9 | Standard for video |
| Frame Rate | 24fps | Cinematic film look |
| Reference Image | hero-image-v18.jpg | Starting frame |

### Motion & Action

| Element | Description |
|---------|-------------|
| Subject Motion | Man walks FORWARD along path toward distant quarry |
| Walking Pace | Slow, deliberate, contemplative |
| Direction | Walking AWAY from camera, INTO the scene |
| Disappearing Effect | Man gradually fades into darkness as he walks further away |
| Flashlight Movement | Beam moves naturally with walking, illuminating ground ahead |

### Disappearing Effect Progression

| Time | Description |
|------|-------------|
| 0-2s | Man clearly visible, close to camera, flashlight illuminates ground |
| 2-5s | Man walks further, becomes smaller, flashlight becomes smaller point |
| 5-8s | Man is distant figure, flashlight is tiny warm glow |
| 8-10s | Man disappears into darkness, aurora and moonlight continue |

### Lighting Animation (v2 - REVISED)

**Flashlight beam:**
- Moves with subject as he walks
- Illuminates ground ahead (pointing DOWN)
- Creates moving pool of warm light on path
- As man walks away, becomes smaller point of light
- Eventually disappears into distance

**Moon (FLICKERING):**
- Subtle flickering/dimming as if thin clouds passing
- Irregular, gentle pulsing (NOT strobe - natural variation)
- 2-4 second cycles, dims to 60-80% then returns
- Creates subtle shifting of silhouette edges on mountains

**Aurora Borealis (SLOW MOVEMENT):**
- Curtains gently ripple and flow on horizon
- Subtle undulating motion - dreamlike slow drift
- Green and purple colors shift and blend slowly
- Provides faint ambient glow on distant mountain peaks
- NOT static, NOT fast

**Stars:**
- Very subtle twinkle animation

### Atmospheric Effects

**Snow (Light):**
- Intensity: Light snowfall - gentle and sparse
- Particle size: Visible individual flakes
- Fall speed: Slow, drifting gently
- Lighting interaction:
  - In flashlight beam: Snowflakes catch warm light, glow yellow/white
  - In aurora glow: Snowflakes catch faint green/purple tint
  - Outside light sources: Snowflakes are grey/dark, barely visible

**Other Effects:**
- Breath vapor: Visible puffs in cold air, rhythmic with walking
- Ground mist: Very subtle low mist near ground, catches aurora glow faintly

### Video Prompt (JSON Format) - v2 REVISED

```json
{
  "input": {
    "type": "image_to_video",
    "reference_image": "hero-image-v18.jpg",
    "maintain_consistency": true
  },

  "video_settings": {
    "duration": "8-10 seconds",
    "resolution": "4K",
    "aspect_ratio": "16:9",
    "frame_rate": "24fps",
    "format": "cinematic"
  },

  "motion": {
    "subject": {
      "action": "man WALKS FORWARD along the path toward the distant quarry",
      "pace": "slow, deliberate, contemplative walking pace",
      "direction": "walking AWAY from camera, INTO the scene, toward distant quarry",
      "gait": "tired but determined trudging through snow",
      "flashlight": {
        "held_position": "right hand, pointing DOWN at ground ahead",
        "beam_motion": "flashlight beam moves naturally with walking, illuminating ground ahead of feet",
        "light_pool": "warm pool of light moves along path with subject"
      }
    },
    "disappearing_effect": {
      "type": "gradual fade into darkness",
      "progression": [
        "0-2s: man clearly visible, close to camera, flashlight illuminates ground",
        "2-5s: man walks further, becomes smaller, flashlight becomes smaller point",
        "5-8s: man is distant figure, flashlight is tiny warm glow",
        "8-10s: man disappears into the darkness, only faint light visible then gone"
      ],
      "technique": "natural distance fade - NOT dissolve, just walks into the dark void"
    }
  },

  "atmospheric_effects": {
    "snow": {
      "intensity": "light snowfall - gentle and sparse",
      "particle_size": "visible individual flakes",
      "fall_speed": "slow, drifting gently",
      "direction": "mostly vertical with slight wind drift",
      "lighting_interaction": {
        "in_flashlight_beam": "snowflakes catch warm light, glow yellow/white",
        "in_aurora_glow": "snowflakes catch faint green/purple tint from aurora",
        "outside_light_sources": "snowflakes are grey/dark, barely visible",
        "near_moon": "faint grey flakes visible against sky during moon flicker"
      },
      "density": "light - enough to see atmosphere but not obscuring view"
    },
    "breath_vapor": {
      "visible": true,
      "appearance": "subtle puffs of breath vapor in cold air",
      "timing": "rhythmic with walking pace"
    },
    "ground_mist": {
      "presence": "very subtle low mist near ground",
      "movement": "slight drift, catches aurora glow faintly"
    }
  },

  "lighting": {
    "primary_source": {
      "type": "FLASHLIGHT - primary color light source (warm)",
      "color": "warm white/yellow",
      "behavior": "moves with subject, illuminates ground ahead",
      "diminishing": "as man walks away, light becomes smaller and dimmer",
      "final_state": "tiny point of warm light before disappearing"
    },
    "secondary_source": {
      "type": "MOON on upper RIGHT",
      "color": "cool grey/silver",
      "behavior": "FLICKERING - subtle irregular dimming as if thin clouds passing",
      "flicker_pattern": {
        "type": "natural cloud-passing effect",
        "speed": "slow, gentle variation over 2-4 second cycles",
        "intensity_range": "dims to 60-80% then returns to full",
        "effect_on_scene": "mountain silhouette edges subtly shift with flicker"
      },
      "intensity": "dim with subtle variation"
    },
    "tertiary_source": {
      "type": "AURORA BOREALIS on horizon",
      "color": "green and purple - flowing curtains",
      "behavior": "SLOW MOVEMENT - gentle undulating ripple",
      "aurora_motion": {
        "type": "flowing curtain/ribbon movement",
        "speed": "very slow, dreamlike drift",
        "pattern": "vertical curtains ripple and shift horizontally",
        "color_shift": "greens and purples blend and transition slowly",
        "intensity": "subtle glow, not overpowering"
      },
      "position": "low on horizon, behind distant mountains"
    },
    "color_sources": {
      "flashlight": "warm white/yellow (primary)",
      "aurora": "green/purple (secondary, ambient on horizon)"
    },
    "ambient": "minimal - faint aurora glow on distant terrain",
    "realism": {
      "rule": "light ONLY illuminates what it can physically reach",
      "falloff": "rapid falloff from flashlight - limited range",
      "aurora_reach": "aurora provides faint ambient color on distant silhouettes only",
      "distant_terrain": "mostly dark, faint aurora reflection on peaks"
    }
  },

  "camera": {
    "movement": "STATIC or very subtle slow push forward (almost imperceptible)",
    "position": "behind and slightly above subject",
    "framing": {
      "start": "man centered in lower-middle of frame",
      "end": "same framing, man has walked into distance and disappeared"
    },
    "focus": {
      "start": "sharp focus on subject",
      "transition": "focus stays in same plane as subject walks away, causing natural blur",
      "end": "man becomes naturally blurred/indistinct as he moves into distance"
    }
  },

  "environment": {
    "static_elements": {
      "mountains_left": "jagged silhouettes, dark grey, edges shift with moonlight flicker",
      "mountains_background": "distant silhouettes, faint aurora glow on peaks",
      "path_right": "visible where flashlight hits, static terrain",
      "quarry_distant": "dark shape far in distance, static, destination"
    },
    "animated_elements": {
      "moon_flicker": "subtle brightness variation creates shifting silhouettes",
      "aurora_movement": "slow flowing curtains on horizon",
      "snow_falling": "light snowfall drifting through scene",
      "star_twinkle": "very subtle twinkling"
    },
    "sky": {
      "moon": "upper right, flickering subtly",
      "stars": "subtle twinkle animation",
      "milky_way": "visible, mostly static",
      "aurora": "slow-moving green/purple curtains on horizon"
    }
  },

  "color_grading": {
    "overall": "predominantly dark with color accents from flashlight and aurora",
    "flashlight_area": "warm white/yellow",
    "aurora_area": "green/purple glow on horizon and distant peaks",
    "everything_else": "dark grey, black, desaturated",
    "sky": "dark blue-grey with aurora colors on horizon",
    "snow": "grey flakes, warm in flashlight beam, faint color near aurora"
  },

  "style": {
    "mood": "solitary journey into the unknown, contemplative, melancholic, ethereal",
    "aesthetic": "Christopher Nolan cinematography, slow deliberate pacing",
    "reference": "Interstellar corn field scenes, Dunkirk beach evacuation atmosphere, aurora time-lapse footage",
    "feeling": "man walking into darkness, swallowed by the void, alone in wilderness under cosmic lights"
  },

  "audio_suggestion": {
    "ambient": "wind, crunching footsteps in snow, distant aurora crackle",
    "music": "minimal, Hans Zimmer-style low drone with ethereal pads",
    "sound_design": "breathing, fabric rustling, snow crunching underfoot"
  },

  "negative_prompts": [
    "fast movement", "running", "jogging",
    "camera shake", "handheld camera",
    "bright scene", "well lit", "daytime",
    "facing camera", "looking at camera",
    "sudden disappear", "teleport", "dissolve effect",
    "oversaturated", "vibrant neon colors",
    "cartoon", "animation style", "CGI looking",
    "static subject", "not moving", "standing still",
    "fast aurora", "strobing lights", "rapid flicker",
    "heavy snowfall", "blizzard", "snow storm"
  ]
}
```

### Flat Text Video Prompt - v2 REVISED

For video generators that prefer natural language:

```
REFERENCE IMAGE: Use the provided hero image as the starting frame.

VIDEO DESCRIPTION:
A man in weathered hiking gear walks slowly away from camera along a mountain path toward a distant quarry. The scene is extremely dark - dead of night. He holds a flashlight pointing DOWN at the ground, creating warm light on the path. Aurora borealis glows on the horizon with slow, flowing movement. Moon flickers subtly. Light snow falls.

MOTION:
- Man walks with slow, deliberate, tired pace toward the distant quarry
- Flashlight beam moves naturally with his walking, illuminating the path ahead
- As he walks further away, he becomes smaller and eventually disappears into the darkness
- The flashlight becomes a tiny point of warm light before vanishing

ATMOSPHERE:
- LIGHT SNOWFALL throughout - individual flakes visible, drifting gently
- Snowflakes catch flashlight beam (warm glow) and aurora (faint green/purple tint)
- Visible breath vapor in cold air
- Very subtle ground mist with faint aurora reflection

LIGHTING:
- FLASHLIGHT: Primary warm light source (yellow/white), moves with subject
- MOON: Upper right, FLICKERING SUBTLY - dims and brightens as if thin clouds passing (2-4 second cycles)
- AURORA BOREALIS: Slow-moving green and purple curtains on horizon
  - Flowing, rippling motion - dreamlike, NOT fast
  - Vertical curtains shift and blend colors slowly
  - Provides faint ambient glow on distant mountain peaks
- Ground is mostly dark except where flashlight hits

CAMERA:
- Static camera or barely perceptible slow push forward
- Man starts centered, walks away into the distance
- Focus follows subject initially, then he blurs naturally with distance

ENDING:
- Man gradually becomes smaller silhouette
- Flashlight becomes tiny warm dot
- Eventually swallowed by darkness completely
- Aurora and moonlight continue animating after man disappears
- Only distant quarry shape and mountains remain under cosmic lights

STYLE: Christopher Nolan cinematography, Interstellar/Dunkirk atmosphere, contemplative, melancholic, ethereal, man walking into the void under the northern lights.

DURATION: 8-10 seconds
RESOLUTION: 4K, 16:9, 24fps
```

### Video Implementation Notes

1. **Upload reference image first** - Use the v18 hero image as starting point
2. **Test with shorter duration** - Try 5 seconds first to check motion quality
3. **Adjust walking speed** - May need to specify "very slow" if default is too fast
4. **Snow density** - Keep light and sparse, not heavy snowfall
5. **Disappearing timing** - Adjust progression if man disappears too quickly/slowly
6. **Moonlight flicker** - If too distracting, reduce intensity range or slow the cycle
7. **Aurora speed** - Should be very slow, dreamlike - speed up slightly if too static
8. **Aurora intensity** - Start subtle, can increase if not visible enough
