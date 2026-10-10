import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import sharp from "sharp";

const html = () => readFileSync(resolve("dist/index.html"), "utf8");
const meta = (page: string, name: string) =>
  [...page.matchAll(/<meta\b[^>]*>/g)]
    .find(([tag]) => tag.includes(`property="${name}"`) || tag.includes(`name="${name}"`))
    ?.[0].match(/content="([^"]+)"/)?.[1];

describe("prévia de compartilhamento", () => {
  it("publica URLs HTTPS consistentes com o domínio final, sem redirecionamento", () => {
    const page = html();
    const canonical = page.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    const imageUrl = new URL(meta(page, "og:image")!);

    expect(canonical).toBe("https://www.studiocmv.com.br/");
    expect(meta(page, "og:url")).toBe(canonical);
    expect(imageUrl.origin).toBe(new URL(canonical!).origin);
    expect(meta(page, "og:image:secure_url")).toBe(imageUrl.href);
    expect(meta(page, "twitter:image")).toBe(imageUrl.href);
    expect(meta(page, "twitter:card")).toBe("summary_large_image");
    expect(meta(page, "og:image:alt")).toBeTruthy();
  });

  it("inclui no build uma imagem JPEG leve com dimensões e MIME corretos", async () => {
    const page = html();
    const imageUrl = new URL(meta(page, "og:image")!);
    const imagePath = resolve("dist", imageUrl.pathname.slice(1));

    expect(existsSync(imagePath)).toBe(true);
    const metadata = await sharp(imagePath).metadata();
    expect(metadata.format).toBe("jpeg");
    expect(metadata.hasAlpha).toBe(false);
    expect(metadata.width).toBe(1200);
    expect(metadata.height).toBe(630);
    expect(meta(page, "og:image:type")).toBe("image/jpeg");
    expect(Number(meta(page, "og:image:width"))).toBe(metadata.width);
    expect(Number(meta(page, "og:image:height"))).toBe(metadata.height);
    expect(statSync(imagePath).size).toBeLessThan(300_000);
  });
});
