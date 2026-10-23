---
name: rd-station-email-images-upload
description: >-
  Upload de imagens de e-mail HTML no RD Station Marketing via Playwright MCP:
  intercepta POST S3, gera URLs CloudFront e atualiza email.html. Use ao publicar
  assets da Alice Penteado (ou outro cliente RD) antes de importar HTML.
---

# Upload de imagens — E-mail RD Station (Playwright)

Baseado no fluxo validado de Landing Pages (`rd-station-landing-images-upload`). O upload no RD usa o mesmo modal `input#file` e bucket `rdstation-static.s3.amazonaws.com`.

## Pré-requisitos

- MCP **user-playwright** (`browser_navigate`, `browser_resize`, `browser_run_code_unsafe`, `browser_wait_for`)
- Imagens em `emails/{slug}/imagens/`
- Humano conclui login + 2FA em `accounts.rdstation.com` ou `app.rdstation.com.br`
- Viewport **1920×1400**

## Workflow

```
1. Login (humano)
2. Abrir editor de e-mail em rascunho (Importar HTML ou e-mail em branco → Editar conteúdo)
3. Inserir componente Imagem temporário
4. Para cada arquivo: Carregar imagem → setInputFiles → interceptar POST S3 → CloudFront
5. Salvar mapeamento em imagens-urls.yaml
6. Substituir src="imagens/..." em email.html
7. Remover bloco imagem temporário; salvar rascunho (opcional)
```

## Captura da URL (obrigatório)

Não confiar só no campo URL da UI. Interceptar:

```javascript
const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";
function s3XmlToCloudFront(xml) {
  const key = (xml.match(/<Key>([^<]+)<\/Key>/) || [])[1];
  return key ? `${CLOUDFRONT}/${key}` : null;
}
const responsePromise = page.waitForResponse(
  (r) => r.url().includes("rdstation-static.s3.amazonaws.com") && r.request().method() === "POST",
  { timeout: 45000 }
);
// ... upload ...
const body = await (await responsePromise).text();
const url = s3XmlToCloudFront(body);
```

Helper local: `scripts/rd-s3-key-to-cloudfront.js`

## Editor de e-mail (seletores)

O canvas pode estar em iframe. Se o fluxo de LP funcionar no editor de e-mail:

| Passo | Ação |
|-------|------|
| Abrir conteúdo | Relacionar → E-mail → rascunho → **Editar conteúdo** |
| Componente | Arrastar **Imagem** para o corpo |
| Upload | **Carregar imagem** → modal pai `input#file` |
| Confirmar | `button.js-insert-image-by-url` (se visível) |

Se o editor de e-mail usar outra UI, registrar seletores nesta skill após validação.

## Fallback validado — Alice Penteado (account `975793`)

1. Abrir `https://app.rdstation.com.br/landing-pages/{id}/editar` (ex.: `9012250`).
2. O editor **não usa iframe** nesta conta — seletores no `page` principal.
3. Usar bloco `.bricks-image` existente ou arrastar componente **Imagem**.
4. **Não clicar em Salvar** na LP após os uploads (só gerar URLs no CDN).
5. Script de referência: `scripts/playwright-rd-upload-email-images.js` (corpo para `browser_run_code_unsafe`).

## Saída no repositório

`emails/{slug}/imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-22T...
cdn_base: https://d335luupugsy2.cloudfront.net
files:
  01_logo-topo.png: https://d335luupugsy2.cloudfront.net/cms/files/...
```

Atualizar `meta.yaml` com `imagens_publicadas: true`.

## Catálogo

| Skill | Uso |
|-------|-----|
| `alice-penteado-rd-email` | Estrutura de pastas + variáveis HTML |
| `rd-station-email-images-upload` | Playwright + URLs |
| `rd-station-landing-images-upload` | Referência LP (tenant Planeta) |
| `optimize-images` | Comprimir antes do upload |
