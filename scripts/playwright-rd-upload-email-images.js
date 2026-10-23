/**
 * Playwright MCP — browser_run_code_unsafe (colar o corpo da função abaixo).
 * Parâmetros: imagesDir absoluto, files[] com nomes de arquivo.
 * Editor: LP ou e-mail com bloco .bricks-image (Alice 975793 — canvas na página, sem iframe).
 */
async (page) => {
  const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";
  const base =
    "c:/Users/DIWER/Documents/TC/Alice-Penteado-Emails/emails/newsletter-semanal-solitarios-2026-10-22/imagens/";
  const files = [
    "01_logo-topo.png",
    "02_titulo-esta-aqui.png",
    "03_hero-azulejo-polaroid.jpg",
    "04_titulo-qual-vai-ser-o-seu.png",
    "05_polaroid-coracao.jpg",
    "06_titulo-lapidacao-coracao.png",
    "07_polaroid-oval-ouro-branco.jpg",
    "08_polaroid-oval-ouro-amarelo.jpg",
    "09_titulo-diamante-de-lapidacao-oval.png",
    "10_polaroid-gota.jpg",
    "11_titulo-diamante-gota.png",
    "12_certificacao-gia.jpg",
    "13_logo-rodape-sao-paulo.png",
  ];

  function s3XmlToCloudFront(xml) {
    const key = (xml.match(/<Key>([^<]+)<\/Key>/) || [])[1];
    return key ? `${CLOUDFRONT}/${key}` : null;
  }

  if (!/app\.rdstation\.com\.br/.test(page.url())) {
    return { error: "not_logged_in", url: page.url() };
  }

  const mapping = {};
  const errors = [];

  for (const fileName of files) {
    try {
      const responsePromise = page.waitForResponse(
        (r) =>
          r.url().includes("rdstation-static.s3.amazonaws.com") &&
          r.request().method() === "POST",
        { timeout: 90000 }
      );
      await page.locator(".bricks-image").last().click({ force: true });
      await page
        .getByRole("button", { name: /Carregar imagem/i })
        .click({ timeout: 20000 });
      await page.locator("input#file").setInputFiles(base + fileName);
      const body = await (await responsePromise).text();
      const url = s3XmlToCloudFront(body);
      if (!url) throw new Error("S3 sem Key");
      mapping[fileName] = url;
      const confirm = page.locator("button.js-insert-image-by-url");
      if (await confirm.count()) {
        await confirm.first().click({ timeout: 5000 }).catch(() => {});
      }
      await page.waitForTimeout(600);
    } catch (e) {
      errors.push({ fileName, error: String(e.message || e) });
    }
  }

  return { mapping, errors };
};
