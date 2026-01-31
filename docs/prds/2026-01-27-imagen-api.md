# PRD: Imagen Image Generation API

**Date:** 2026-01-27
**Author:** Claude
**Status:** Draft
**Reference:** https://ai.google.dev/gemini-api/docs/imagen

---

## Overview

Imagen is Google's high-fidelity image generation model, capable of generating realistic and high-quality images from text prompts. All generated images include a SynthID watermark.

**Note:** For multimodal image generation (text + image inputs), see the Gemini 3 Pro Image Preview documentation in `2026-01-27-hero-image-generation.md`.

---

## Model Versions

### Imagen 4 (Current)

| Property | Value |
|----------|-------|
| Model ID (Standard) | `imagen-4.0-generate-001` |
| Model ID (Ultra) | `imagen-4.0-ultra-generate-001` |
| Model ID (Fast) | `imagen-4.0-fast-generate-001` |
| Input | Text only (480 tokens max) |
| Output | 1-4 images |
| Resolutions | 1K, 2K (Ultra/Standard only) |
| Aspect Ratios | 1:1, 3:4, 4:3, 9:16, 16:9 |
| Latest Update | June 2025 |

### Model Comparison

| Feature | Ultra | Standard | Fast |
|---------|-------|----------|------|
| Quality | Highest | High | Good |
| Speed | Slowest | Medium | Fastest |
| 2K Resolution | Yes | Yes | No |
| Use Case | Final assets | General use | Quick iterations |

---

## SDK Implementation

### Basic Image Generation

```python
from google import genai
from google.genai import types

client = genai.Client()

response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt='A man standing on a rocky outcrop overlooking a quarry at night',
    config=types.GenerateImagesConfig(
        number_of_images=4,
    )
)

# Display or save generated images
for i, generated_image in enumerate(response.generated_images):
    generated_image.image.save(f"output_{i}.png")
```

### Full Configuration

```python
response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt='Your detailed prompt here',
    config=types.GenerateImagesConfig(
        number_of_images=4,           # 1 to 4 images
        image_size="2K",              # "1K" or "2K" (Ultra/Standard only)
        aspect_ratio="16:9",          # See supported ratios below
        person_generation="allow_adult",  # See options below
    )
)
```

---

## Configuration Parameters

### Number of Images
- Range: 1 to 4 (inclusive)
- Default: 4

### Image Size
- `"1K"` - ~1024px (default)
- `"2K"` - ~2048px (Ultra/Standard models only)

### Aspect Ratios

| Ratio | Description | Common Use |
|-------|-------------|------------|
| 1:1 | Square (default) | Social media posts |
| 4:3 | Fullscreen landscape | Traditional media, photography |
| 3:4 | Fullscreen portrait | Vertical compositions |
| 16:9 | Widescreen | Hero backgrounds, landscapes |
| 9:16 | Portrait widescreen | Mobile stories, short-form video |

### Person Generation

| Value | Description | Notes |
|-------|-------------|-------|
| `"dont_allow"` | Block images of people | Safest option |
| `"allow_adult"` | Adults only (default) | No children |
| `"allow_all"` | Adults and children | Not allowed in EU/UK/CH/MENA |

---

## Prompt Writing Guide

### Basic Structure

A good prompt includes:
1. **Subject** - The main object, person, or scene
2. **Context** - Background, environment, setting
3. **Style** - Art style, photography type, aesthetic

```
A [style] of [subject] [context/background]
```

**Example:**
```
A sketch of a modern apartment building surrounded by skyscrapers
```

### Prompt Refinement

Start simple and add detail iteratively:

| Iteration | Prompt | Added Detail |
|-----------|--------|--------------|
| 1 | A park in the spring next to a lake | Base concept |
| 2 | A park in the spring next to a lake, the sun sets across the lake, golden hour | Lighting |
| 3 | A park in the spring next to a lake, the sun sets across the lake, golden hour, red wildflowers | Foreground detail |

### Prompt Length

- **Short prompts:** Quick generation, less control
- **Long prompts:** More specific, detailed output
- **Maximum:** 480 tokens

---

## Photography Modifiers

### Camera Proximity
| Modifier | Effect |
|----------|--------|
| close-up | Tight framing on subject |
| zoomed out | Wide view, environmental context |

### Camera Position
| Modifier | Effect |
|----------|--------|
| aerial | Bird's eye view |
| from below | Looking up at subject |

### Lighting
| Modifier | Effect |
|----------|--------|
| natural lighting | Soft, realistic |
| dramatic lighting | High contrast, shadows |
| warm lighting | Orange/yellow tones |
| cold lighting | Blue tones |

### Camera Settings
| Modifier | Effect |
|----------|--------|
| motion blur | Movement effect |
| soft focus | Dreamy, blurred |
| bokeh | Blurred background |
| portrait | Shallow DOF, subject focus |

### Lens Types
| Modifier | Focal Length | Use Case |
|----------|--------------|----------|
| macro | 60-105mm | Objects, detail shots |
| 35mm | 35mm | Portraits, general |
| 50mm | 50mm | Classic portrait |
| fisheye | Ultra-wide | Distorted perspective |
| wide angle | 10-24mm | Landscapes, architecture |

### Film Types
| Modifier | Effect |
|----------|--------|
| black and white | Monochrome |
| polaroid | Vintage, instant camera look |

---

## Art and Illustration Styles

### Art Techniques
| Style | Description |
|-------|-------------|
| technical pencil drawing | Precise, architectural |
| charcoal drawing | Bold, textured |
| color pencil drawing | Soft, colored |
| pastel painting | Soft, blended colors |
| digital art | Clean, modern illustration |
| art deco | Geometric, stylized |

### Historical Art Movements
Use: `"...in the style of [movement]"`

| Movement | Description |
|----------|-------------|
| impressionist painting | Light, brushwork visible |
| renaissance painting | Classical, detailed |
| pop art | Bold colors, graphic |

### Materials and Shapes
Use: `"...made of..."` or `"...in the shape of..."`

**Examples:**
- "a duffle bag made of cheese"
- "neon tubes in the shape of a bird"
- "an armchair made of paper, origami style"

---

## Quality Modifiers

### General
- high-quality
- beautiful
- stylized
- detailed

### Photography
- 4K
- HDR
- Studio Photo
- by a professional photographer

### Art/Illustration
- by a professional
- detailed
- high detail

---

## Text in Images

Imagen can generate text within images:

**Guidelines:**
- Keep text under 25 characters
- Use 2-3 distinct phrases maximum
- Specify font style (general, not exact fonts)
- Specify font size (small, medium, large)

**Example:**
```
A poster with the text "Summerland" in bold font as a title,
underneath this text is the slogan "Summer never felt so good"
```

---

## Photorealistic Image Guide

### Portrait Photography
| Parameter | Recommendation |
|-----------|----------------|
| Lens | Prime, zoom |
| Focal Length | 24-35mm |
| Modifiers | black and white film, film noir, depth of field, duotone |

**Example:**
```
A woman, 35mm portrait, blue and grey duotones
```

### Object/Still Life
| Parameter | Recommendation |
|-----------|----------------|
| Lens | Macro |
| Focal Length | 60-105mm |
| Modifiers | high detail, precise focusing, controlled lighting |

**Example:**
```
leaf of a prayer plant, macro lens, 60mm
```

### Motion/Action
| Parameter | Recommendation |
|-----------|----------------|
| Lens | Telephoto zoom |
| Focal Length | 100-400mm |
| Modifiers | fast shutter speed, action tracking, movement tracking |

**Example:**
```
a winning touchdown, fast shutter speed, movement tracking
```

### Landscape/Wide-Angle
| Parameter | Recommendation |
|-----------|----------------|
| Lens | Wide-angle |
| Focal Length | 10-24mm |
| Modifiers | long exposure, sharp focus, smooth water/clouds |

**Example:**
```
an expansive mountain range, landscape wide angle 10mm
```

---

## Prompt Parameterization

For dynamic/templated prompts:

```python
# Template
template = "A {logo_style} logo for a {company_area} company on a solid color background. Include the text {company_name}."

# Fill parameters
prompt = template.format(
    logo_style="minimalist",
    company_area="health care",
    company_name="Journey"
)
```

**Examples:**
| Style | Industry | Company | Result Description |
|-------|----------|---------|-------------------|
| minimalist | health care | Journey | Clean, simple healthcare logo |
| modern | software | Silo | Tech-forward software logo |
| traditional | baking | Seed | Classic bakery branding |

---

## Imagen vs Gemini Image Generation

| Feature | Imagen 4 | Gemini 3 Pro Image Preview |
|---------|----------|---------------------------|
| Input | Text only | Text + Images (up to 14) |
| Image Editing | No | Yes |
| Multi-turn | No | Yes |
| Thinking Mode | No | Yes |
| Max Resolution | 2K | 4K |
| Max Prompt | 480 tokens | Higher |
| Use Case | Text-to-image | Image editing, composition |

**Recommendation:**
- Use **Imagen 4** for pure text-to-image generation
- Use **Gemini 3 Pro** when you have reference images or need iterative editing

---

## Hero Image Generation Strategy

For the Meridian hero image, the recommended approach:

1. **Initial concepts with Imagen 4 Fast** - Quick iterations on composition
2. **Refine with Imagen 4 Standard** - Better quality for evaluation
3. **Final generation with Gemini 3 Pro** at 4K with thinking mode
4. **Iterative edits with Gemini 3 Pro** multi-turn if needed

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-01-27 | Claude | Initial PRD from Google Imagen documentation |
