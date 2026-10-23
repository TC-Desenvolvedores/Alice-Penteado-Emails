/**
 * Playwright MCP — browser_run_code_unsafe
 *
 * Upload de imagens no editor de E-MAIL do RD (Beefree / getbee.io).
 * NÃO usar Landing Pages.
 *
 * Parâmetros editáveis no início da função:
 * - emailEditUrl: rascunho com Conteúdo → Editar
 * - imagesDir + files[]
 */
async (page) => {
  const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";
  const emailEditUrl =
    "https://app.rdstation.com.br/email/23511919/edit";
  const imagesDir =
    "c:/Users/DIWER/Documents/TC/Alice-Penteado-Emails/emails/newsletter-semanal-solitarios-2026-10-23/imagens/";
  const files = ["01_logo.png"];

  function s3XmlToCloudFront(xml) {
    const key = (xml.match(/<Key>([^<]+)<\/Key>/) || [])[1];
    return key ? `${CLOUDFRONT}/${key}` : null;
  }

  function beeFrame(page) {
    return page.frames().find((f) => f.url().includes("getbee.io"));
  }

  async function dragImageBlock(page, bee) {
    const drag = bee.locator(
      '[data-qa="sidebar-draggable"][aria-label="Imagem"]'
    );
    await drag.waitFor({ state: "visible", timeout: 60000 });
    const dbox = await drag.boundingBox();
    const drop = bee.locator(".drop-target").first();
    const sbox = await drop.boundingBox();
    if (!dbox || !sbox) throw new Error("drag boxes not found");
    await page.mouse.move(dbox.x + dbox.width / 2, dbox.y + dbox.height / 2);
    await page.mouse.down();
    await page.mouse.move(sbox.x + 100, sbox.y + 12, { steps: 22 });
    await page.mouse.up();
    await page.waitForTimeout(2000);
  }

  async function readUrlFromPanel(bee, imageModule) {
    const fromInput = await bee
      .locator('input[type="text"]')
      .evaluateAll((els) =>
        els.map((e) => e.value).filter((v) => v && v.includes("cloudfront"))
      );
    if (fromInput.length) return fromInput[fromInput.length - 1];
    const fromImg = await imageModule
      .locator("img")
      .first()
      .getAttribute("src")
      .catch(() => null);
    if (fromImg && fromImg.includes("cloudfront")) return fromImg;
    return null;
  }

  if (!/app\.rdstation\.com\.br/.test(page.url())) {
    await page.goto(emailEditUrl, { waitUntil: "domcontentloaded" });
  } else if (!page.url().includes("/edit")) {
    await page.goto(emailEditUrl, { waitUntil: "domcontentloaded" });
  }

  await page.waitForTimeout(10000);
  const bee = beeFrame(page);
  if (!bee) return { error: "bee_frame_not_found", url: page.url() };

  const mapping = {};
  const errors = [];

  for (const fileName of files) {
    try {
      await dragImageBlock(page, bee);
      const imageModule = bee.locator(".module-box--image").last();
      await imageModule.click({ force: true });
      await page.waitForTimeout(800);

      const responsePromise = page
        .waitForResponse(
          (r) =>
            r.url().includes("rdstation-static.s3.amazonaws.com") &&
            r.request().method() === "POST",
          { timeout: 120000 }
        )
        .catch(() => null);

      await bee.evaluate(() => {
        const procurar = [...document.querySelectorAll("*")].find(
          (e) => e.textContent?.trim() === "Procurar" && e.children.length === 0
        );
        if (procurar) procurar.click();
        else {
          const add = [...document.querySelectorAll("button")].find((b) =>
            /add image/i.test(b.textContent || "")
          );
          add?.click();
        }
      });

      await page.waitForTimeout(1000);
      const fileInput = bee.locator('input[type="file"]').first();
      if (await fileInput.count()) {
        await fileInput.setInputFiles(imagesDir + fileName);
      } else {
        throw new Error("input[type=file] not found in bee frame");
      }

      let url = null;
      const resp = await responsePromise;
      if (resp) url = s3XmlToCloudFront(await resp.text());

      await page.waitForTimeout(8000);
      if (!url) url = await readUrlFromPanel(bee, imageModule);
      if (!url) throw new Error("URL not captured");

      mapping[fileName] = url;

      await bee
        .getByRole("button", { name: /delete Imagem module/i })
        .last()
        .click({ timeout: 5000 })
        .catch(() => {});
      await page.waitForTimeout(400);
    } catch (e) {
      errors.push({ fileName, error: String(e.message || e) });
    }
  }

  return { mapping, errors, editor: "email-beefree", upload_via: "email-editor" };
};
