# Composição de três serviços de envelopamento

- Data: 2 de setembro de 2026.
- Ferramenta: editor de imagens integrado ao Codex, sem CLI.
- Modo: edição da imagem anterior com duas referências adicionais; uma chamada, sem correções posteriores.
- Imagem-base: `src/assets/generated/studio-fleet-wrap.png`.
- Referência da van: `C:/Users/compr/AppData/Local/Temp/codex-clipboard-00642cdb-3925-45cd-abfb-fbb1a42fe4e0.png`.
- Referência do ônibus: `C:/Users/compr/AppData/Local/Temp/codex-clipboard-5d848373-81d1-49cd-90dc-5e024c83fb11.png`.
- Arquivo final: `src/assets/generated/studio-fleet-wrap-mixed.png`.
- Saída efetiva: PNG, 1672×941 px, sem ampliação posterior.
- Uso: segundo card de Serviços, sem tag sobreposta conforme pedido do responsável. As referências foram apresentadas por ele como trabalhos executados pela Studio; a cena que reúne os três veículos é uma montagem digital.
- Inspeção: os três veículos e as marcas principais estão reconhecíveis. O editor reduziu e reposicionou um pouco o carro principal para acomodar os veículos maiores; o carro permaneceu inteiro. Microtextos da van foram simplificados, e o retrovisor direito do ônibus encosta na borda.
- Preservação: a imagem-base e seu registro de geração foram mantidos para comparação.

## Prompt exato utilizado

```text
Use case: compositing
Asset type: one photorealistic digitally composed vehicle-wrapping service image for a website card.
Input images: Image 1 is the EDIT TARGET and must remain the base composition. Image 2 is the supporting vehicle insert/reference for the AÇAÍ GURUPI compact cargo van. Image 3 is the supporting vehicle insert/reference for the black-and-cyan JESUS double-decker coach.
Primary request: edit Image 1 by replacing only its two BACKGROUND yellow iNET hatchbacks with the two actual wrapping projects shown in Images 2 and 3. Keep the yellow iNET hatchback in the foreground unchanged.
Foreground invariants: preserve the hero yellow/orange iNET compact car's identity, exact position and scale, front-three-quarter view facing left, wrap graphics, white iNET TELECOM door lettering, wheels, body seams, complete outline, glass and realistic reflections. Do not redesign, crop, move, repaint or duplicate it. Keep its full vehicle silhouette and wheels safely inside a central 16:10 crop.
Left background replacement: replace the left rear yellow hatchback with the compact panel/cargo van from Image 2, facing left, with a tall rear cargo compartment and black wheels. Faithfully preserve the vivid lime-green and purple wrapping, leaf graphics, large purple cargo-side panel and prominent white text "AÇAÍ GURUPI". Show enough of its tall side compartment above and to the left of the hero car for the design to be recognizable. Match the reference vehicle, not a generic minibus.
Right background replacement: replace the right rear yellow hatchback with the much larger, but more distant, black-and-cyan double-decker coach from Image 3, with its front facing right as in its reference. Place it across the upper-right background, physically behind the foreground car, with convincing real-world bus scale and depth. Preserve its huge cyan "JESUS" lettering, flowing cyan lower swoop, dark tinted double-deck windows, and the reference's monochrome lion and crucifix illustrations. Keep the key bus lettering visible above/around the foreground car, with enough separation to read its identity. Do not mirror the coach or the lettering.
Scene and integration: preserve the base image's neutral paved commercial courtyard style, gray industrial facade, camera viewpoint, natural daylight, color balance, shadows and grounded contact with the pavement. Integrate the different-sized vehicles with realistic perspective, depth, scale, reflections and matching light. Exactly three distinct vehicles total. It is acceptable for the foreground car to naturally occlude the lower portions of the two background vehicles, but do not fuse the vehicles.
Text constraints: the prominent names must be faithfully readable as "iNET" / "TELECOM", "AÇAÍ GURUPI", and "JESUS". No mirrored lettering. Do not invent any extra names, phone numbers, contact information or slogans. Secondary reference copy may be omitted if too small to reproduce faithfully.
Composition/output: approximately 16:9 landscape, at least 1600 pixels wide if possible. Preserve full foreground car framing and breathing room. Keep calm foreground pavement along the lower 20–25% for a future website text overlay, and keep the hero door branding clearly visible near mid-frame. Render only the image, not the website overlay.
Avoid: extra vehicles, background yellow iNET duplicates, new brands, altered foreground hero car, implausibly tiny bus, pasted cutout edges, cartoon or CGI appearance, screenshot controls, carousel arrows, UI, labels, borders, captions, watermarks, invented contact details. This is a digitally composed illustrative service image, not a documentary photograph of a real group of vehicles. Produce exactly one image.
```
