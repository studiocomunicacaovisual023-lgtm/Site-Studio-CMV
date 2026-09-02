# Imagens da galeria de equipamentos

Criadas em 2 de setembro de 2026 com a ferramenta integrada de geração de imagens, sem CLI. Uma chamada por imagem, sem novas tentativas ou edição posterior. As seis saídas têm 1448×1086 px (4:3); a resolução sugerida de 1600×1200 não foi entregue, e os arquivos foram mantidos sem ampliação artificial.

São representações das categorias da lista enviada pelo responsável, não fotografias das máquinas reais nem reproduções verificadas de modelos específicos. As imagens foram inspecionadas individualmente; todas mostram um equipamento inteiro. A apresentação usa `object-fit: contain` e a legenda “Imagem ilustrativa”. A imagem anterior da impressora Mimaki foi mantida como primeiro slide.

## Arquivos finais

Os arquivos estão em `src/assets/generated/equipment/`:

- [Router CNC](../../src/assets/generated/equipment/equipment-router-cnc.png)
- [Plotter de grande formato](../../src/assets/generated/equipment/equipment-large-format-plotter.png)
- [Impressora de alta resolução](../../src/assets/generated/equipment/equipment-high-resolution-printer.png)
- [Máquina de corte a laser](../../src/assets/generated/equipment/equipment-laser-cutting.png)
- [Gravação a laser em metal](../../src/assets/generated/equipment/equipment-metal-engraving.png)
- [Impressora da categoria Konica](../../src/assets/generated/equipment/equipment-konica-press.png)

O router, o plotter e a Konica têm margens laterais menores que as solicitadas, mas não há partes cortadas. O nome Konica Minolta é legível no último arquivo; nenhum modelo ou série foi indicado. A estação de gravação em metal não tem um detalhe azul destacado. Essas diferenças não impedem o uso ilustrativo, mas as imagens não são referências de engenharia ou segurança.

## Prompts exatos

### Router CNC

```text
Use case: product-mockup
Asset type: standalone landscape equipment photograph for a print and signage company's website gallery; conceptually named equipment-router-cnc.png.
Primary request: a polished photorealistic industrial product photograph of one industrial CNC router table used to cut signage materials. This is a representative equipment category, not any company's exact machine or a specific commercial model.
Scene/backdrop: seamless pale cool gray-blue studio floor and background, approximately #e4ebf3, no visible room, props or clutter.
Subject: a mechanically believable large horizontal CNC router table with a rigid rectangular steel base on sturdy legs, broad flat sacrificial MDF spoilboard bed, parallel linear guide rails along the bed, and a transverse moving gantry carrying a vertical router spindle. Show a realistic spindle dust shoe with bristles and a compact supported flexible extraction hose contained within the machine silhouette. On the bed is one flat MDF sheet with a few cleanly routed geometric sign-component cutouts, not lettering. The machine is switched off and idle, no cutting activity.
Style/medium: high-quality photorealistic industrial catalogue photography with authentic powder-coated steel, extruded rail detail, metal fasteners, a real MDF surface, restrained reflections and credible construction. The machine must read specifically as a CNC router, not a printer, laser cutter or futuristic imaginary device.
Composition/framing: horizontal 4:3 frame, target 1600x1200 or highest practical resolution. A complete single machine in a slightly elevated front three-quarter view, centered, with roughly 12 percent clear padding on every side. The entire bed, gantry, base, all legs and any hose must fit inside the image. No cropping.
Lighting/mood: balanced neutral soft studio light, gently defined form, believable soft contact shadows beneath the legs.
Color palette: restrained white and charcoal structural casing with only small blue accents; pale cool gray-blue seamless backdrop.
Constraints: exactly one machine, idle and safe; no people, room props, detached accessories, extra equipment, labels, captions, UI, logos, brand names, model numbers, made-up text, watermark, active cutting, bright beams, sparks, smoke or flying chips. No grid or contact sheet.
```

### Plotter de grande formato

```text
Use case: product-mockup
Asset type: illustrative equipment photograph for a print and signage business website carousel.
Scene/backdrop: clean pale cool gray-blue seamless studio floor and background, approximately #e4ebf3, with a soft realistic contact shadow and no horizon distractions.
Subject: ONE complete large-format roll-to-roll commercial inkjet plotter. Broad substantial horizontal printer body on a robust metal stand, visible full-width media roll and a physically plausible take-up roller below, with a colorful abstract graphic print coming down from the printer and wrapping toward the take-up roller. This is a representative equipment category, not a depiction of a specific model.
Style/medium: polished photorealistic industrial product photography. Restrained white and charcoal casing, small blue accents, realistic fine plastic texture, powder-coated metal and mechanical joins.
Composition/framing: landscape 4:3, target 1600 by 1200 pixels or the highest practical resolution. Front three-quarter viewpoint, entire SINGLE machine centered safely inside the frame with approximately 12 percent clear margins on ALL sides. Whole body, base, legs, rollers and any feet visible. Crisp subject, natural proportions and physically credible construction.
Lighting/mood: balanced neutral soft studio light, subtle highlights, professionally clean.
Constraints: no readable words anywhere, no labels, no captions, no UI overlays, no brand logos or invented model numbers, no watermarks, no room props, no people, no extra machines, no floating parts. Do not crop any part of the machine. The abstract print may show vivid flowing cyan, magenta, orange and yellow color forms but NO lettering. One image, not a collage or grid.
```

### Impressora de alta resolução

```text
Use case: product-mockup
Asset type: illustrative equipment photograph for a print and signage business website carousel.
Scene/backdrop: clean pale cool gray-blue seamless studio floor and background, approximately #e4ebf3, with a soft realistic contact shadow and no horizon distractions.
Subject: ONE high-resolution professional inkjet photo and graphics printer on a compact metal stand. Refined compact precision photo-printer form: rounded horizontal charcoal upper cover, clean white side panels, a small control display, and a deep dark fabric output basket suspended between the two stand legs. A vivid crisp photographic sample print is emerging downward into the basket, showing a colorful macro flower photograph without words. Clearly a professional photo and fine-art graphics printer rather than a giant signage plotter or office copier. This is a representative equipment category, not a specific model.
Style/medium: polished photorealistic industrial product photography. Restrained white and charcoal casing, tiny blue accents, fine realistic molded plastic texture, powder-coated metal, woven basket fabric and subtly glossy photo paper.
Composition/framing: landscape 4:3, target 1600 by 1200 pixels or the highest practical resolution. Front three-quarter viewpoint. Entire SINGLE printer and stand centered, occupying no more than 76 percent of the image width and height so approximately 12 percent clear margins remain on ALL sides. Whole body, output basket, support legs, base and feet visible. Crisp subject, natural proportions, physically credible construction.
Lighting/mood: balanced neutral soft studio light, subtle highlights, professionally clean.
Constraints: no readable words anywhere, no labels, no captions, no UI overlays, no brand logos, no invented model numbers, no watermarks, no room props, no people, no extra machines, no floating parts. No UV flatbed, no rigid-bed table, no industrial signage take-up roller. Do not crop any part of the machine. One image, not a collage or grid.
```

### Máquina de corte a laser

```text
Use case: product-mockup
Asset type: standalone landscape equipment photograph for a print and signage company's website gallery; conceptually named equipment-laser-cutting.png.
Primary request: a polished photorealistic industrial product photograph of one enclosed CO2 laser cutting machine for acrylic signage materials. This is a representative equipment category, not any company's exact machine or a specific commercial model.
Scene/backdrop: seamless pale cool gray-blue studio floor and background, approximately #e4ebf3, no visible room, props or clutter.
Subject: a mechanically believable wide rectangular enclosed CO2 laser cutting cabinet on a compact sturdy floor-standing base with feet. Its top safety lid is FULLY CLOSED and has a realistic transparent amber-tinted protective viewing window. Through that closed amber window, subtly reveal the horizontal honeycomb or slatted cutting bed, the internal XY motion rail and small laser nozzle carriage above one thin flat acrylic sample sheet. The closed lid must remain unmistakable, with flush closed edges, handle and hinges. Small integrated blank controls may sit on the cabinet; no text. The machine is switched off and idle with no visible beam or cutting activity.
Style/medium: high-quality photorealistic industrial catalogue photography with authentic powder-coated metal panels, precise seams, fasteners, believable amber transparent glazing, subtle glass reflections and credible construction. The machine must clearly read as an enclosed flatbed CO2 laser cutter, not a printer, CNC router, microwave or futuristic imaginary device.
Composition/framing: horizontal 4:3 frame, target 1600x1200 or highest practical resolution. A complete single machine in a slightly elevated front three-quarter view, centered and comfortably framed small enough to leave roughly 12 percent clear padding on every side. The entire closed lid, cabinet, base and all feet must fit inside the image. No cropping.
Lighting/mood: balanced neutral soft studio light, gently defined form, believable soft contact shadows beneath the base.
Color palette: restrained white and charcoal casing with only small blue accents; pale cool gray-blue seamless backdrop; muted amber viewing window.
Constraints: exactly one machine; all laser protection panels closed; idle and safe. No people, room props, detached accessories, extra equipment, labels, captions, UI overlays, logos, brand names, model numbers, made-up text, watermark, raised or open lid, exposed working laser, bright beams, sparks, smoke or active hazardous operation. No grid or contact sheet.
```

### Gravação a laser em metal

```text
Use case: product-mockup
Asset type: standalone landscape equipment photograph for a print and signage company's website gallery; conceptually named equipment-metal-engraving.png.
Primary request: a polished photorealistic industrial product photograph of one compact enclosed desktop fiber-laser metal engraving workstation. This is a representative equipment category, not any company's exact machine or a specific commercial model.
Scene/backdrop: seamless pale cool gray-blue studio surface and background, approximately #e4ebf3, no visible room, desk props or clutter.
Subject: a mechanically believable compact benchtop laser marking workstation with a solid rectangular base, short rubber feet and a tall fully enclosed protective cabinet. The front access door is FULLY CLOSED with flush edges, a small handle, and one broad real protective tinted viewing window. Through that closed transparent amber-tinted window, clearly but subtly show the internal vertical marking column, the adjustable rectangular fiber-laser galvanometer marking head attached near the upper part of the column, a short downward-facing circular focusing lens, and a horizontal perforated fixture plate holding one small flat brushed-metal sample. The sample is blank, with no text. A short compact cable conduit is contained inside the cabinet. The head is a marking head, not a drill, a router spindle or a print nozzle. The machine is switched off and idle, with no visible beam, no sparks and no engraving in progress.
Style/medium: high-quality photorealistic industrial catalogue photography with authentic powder-coated metal panels, precision fasteners, brushed metal, believable protective glazing and controlled reflections. It must read specifically as an enclosed compact desktop fiber-laser marking machine rather than a 3D printer, open laser arm, CNC router or futuristic imaginary device.
Composition/framing: horizontal 4:3 frame, target 1600x1200 or highest practical resolution. A complete single machine in a front three-quarter view, camera just high enough to reveal the small sample through the closed window, centered with roughly 12 percent or more clear padding on every side. Entire cabinet, base and feet visible. No cropping. The compact workstation stands alone directly on the seamless studio surface, no separate table.
Lighting/mood: balanced neutral soft studio light, gently defined form, believable soft contact shadow beneath the machine.
Color palette: restrained white and charcoal casing with only small blue accents; pale cool gray-blue seamless backdrop; subdued amber protective viewing window.
Constraints: exactly one machine; all protective panels and front access door fully closed; idle and safe. No people, room props, detached accessories, extra equipment, labels, captions, UI overlays, logos, brand names, model numbers, made-up text, watermark, open door, exposed working laser, bright beams, sparks, smoke or active hazardous operation. No grid or contact sheet.
```

### Impressora da categoria Konica

```text
Use case: product-mockup
Asset type: illustrative equipment photograph for a print and signage business website carousel.
Scene/backdrop: clean pale cool gray-blue seamless studio floor and background, approximately #e4ebf3, with a soft realistic contact shadow and no horizon distractions.
Subject: ONE complete commercial digital color production press of the Konica Minolta quick-print-shop equipment category. Professional substantial white and charcoal sheet-fed digital printing engine, integrated paper feeder with stacked drawers/trays, a mounted operator touchscreen, and a connected output finisher with practical output trays. All modules form one physically connected machine. This is an illustrative category depiction, not a particular series or model.
Style/medium: polished photorealistic industrial product photography. Restrained clean white panels and charcoal top/front surfaces, small blue accents, fine real plastic texture, powder-coated metal, realistic seams and ventilation details.
Composition/framing: landscape 4:3, target 1600 by 1200 pixels or the highest practical resolution. Front three-quarter viewpoint, a single connected machine centered. Entire machine occupying no more than 76 percent of the image width and height so approximately 12 percent clear margins remain on ALL sides. The complete feeder, printing engine, finisher, protruding trays, base and feet must be visible. Natural proportions, crisp subject and physically credible construction.
Lighting/mood: balanced neutral soft studio light, subtle highlights, professionally clean.
Text (verbatim): A single small accurate manufacturer wordmark "KONICA MINOLTA" may appear on the main engine front, in simple readable dark sans-serif lettering. Spell exactly K O N I C A space M I N O L T A. Omit the manufacturer wordmark entirely if it cannot be rendered accurately. No other readable text.
Constraints: no model numbers, no exact-series design claims, no promotional captions, no labels, no UI overlays, no watermarks, no people, no room props, no extra machines, no floating or disconnected parts. No roll printer, no plotter, no UV flatbed. Do not crop any part of the machine. One image, not a collage or grid.
```
