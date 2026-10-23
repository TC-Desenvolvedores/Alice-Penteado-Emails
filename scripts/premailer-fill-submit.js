async (page) => {
  const fs = require("fs");
  const path = require("path");
  const htmlPath = path.join(
    "c:/Users/DIWER/Documents/TC/Alice-Penteado-Emails/emails/newsletter-semanal-solitarios-2026-10-22/email-rd.html"
  );
  const html = fs.readFileSync(htmlPath, "utf8");
  await page.locator("#html").fill(html);
  await page.getByRole("button", { name: "Submit" }).click();
  await page.waitForURL(/premailer\.dialect\.ca\/premailer\//, { timeout: 120000 });
  const outHtml = await page.locator("textarea").first().inputValue();
  const outPath =
    "c:/Users/DIWER/Documents/TC/Alice-Penteado-Emails/emails/newsletter-semanal-solitarios-2026-10-22/email-premailer-dialect.html";
  fs.writeFileSync(outPath, outHtml, "utf8");
  return { saved: outPath, length: outHtml.length, url: page.url() };
}
