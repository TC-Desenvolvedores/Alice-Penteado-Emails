async (page) => {
  const GIST_RAW =
    "https://gist.githubusercontent.com/TiagoAFernandes/2c835dd804abee8f84a432dd5ff51a32/raw/email-premailer.html";

  await page.goto("https://app.rdstation.com.br/bee_templates", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(4000);

  await page.evaluate(() => {
    const match = [...document.querySelectorAll("*")].find(
      (el) => el.childNodes.length === 1 && el.textContent?.trim() === "Importar com HTML"
    );
    if (match) match.click();
  });
  await page.waitForTimeout(2000);

  const urlInput = page
    .locator(
      'input[type="url"], input[placeholder*="http"], input[name*="url" i], input[id*="url" i]'
    )
    .first();
  if (await urlInput.count()) {
    await urlInput.fill(GIST_RAW);
  } else {
    const any = page.locator("input[type='text']").filter({ hasNot: page.locator("[name=search]") });
    const n = await any.count();
    for (let i = 0; i < n; i++) {
      const ph = await any.nth(i).getAttribute("placeholder");
      if (ph && /http|url|link/i.test(ph)) {
        await any.nth(i).fill(GIST_RAW);
        break;
      }
    }
  }

  const importBtn = page.getByRole("button", { name: /importar|continuar|criar|avançar|usar/i });
  if (await importBtn.count()) {
    await importBtn.first().click({ timeout: 10000 }).catch(() => {});
  }

  await page.waitForTimeout(5000);

  const inputs = await page.locator("input").evaluateAll((els) =>
    els.map((e) => ({
      type: e.type,
      name: e.name,
      placeholder: e.placeholder,
      value: (e.value || "").slice(0, 80),
    }))
  );

  const text = await page.locator("body").innerText();
  return {
    url: page.url(),
    inputs,
    lines: text
      .split("\n")
      .filter((l) => /url|html|import|http|link|cole|erro/i.test(l))
      .slice(0, 35),
  };
}
