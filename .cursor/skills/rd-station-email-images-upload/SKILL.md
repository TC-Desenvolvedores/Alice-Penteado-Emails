---
name: rd-station-email-images-upload
description: >-
  Upload de imagens de e-mail HTML no RD Station Marketing via Playwright MCP,
  no editor de e-mail (Beefree): bloco Imagem, upload e URLs CloudFront.
  Não usar Landing Pages. Use ao publicar assets da Alice Penteado antes de importar HTML.
---

# Upload de imagens — Editor de e-mail RD (Beefree)

## Regra de ouro

**Sempre** no **construtor de e-mail** (`/email/{id}/edit`, iframe `app.getbee.io`).  
**Nunca** em Landing Pages para gerar URLs de campanhas de e-mail.

Documentação detalhada e resultado do teste: `docs/upload-imagens-editor-email-rd.md`.

## Pré-requisitos

- MCP **user-playwright** (`browser_navigate`, `browser_resize`, `browser_run_code_unsafe`, `browser_wait_for`)
- Imagens em `emails/{slug}/imagens/`
- Humano conclui login + 2FA em `accounts.rdstation.com` ou `app.rdstation.com.br`
- Viewport **1920×1400**
- Rascunho de e-mail com permissão de editar **Conteúdo** (recomendado: rascunho `[TC]` só para upload)

## Workflow

```
1. Login (humano)
2. E-mails → Rascunhos → abrir campanha → Conteúdo → Editar
   (URL: /email/{id}/edit)
3. No iframe Beefree: arrastar bloco Imagem (sidebar) para linha vazia no stage
4. Para cada arquivo: Procurar / Add image → upload → copiar URL
5. Gravar imagens-urls.yaml
6. python scripts/build_email_rd.py emails/{slug}
7. (Opcional) Remover blocos Imagem temporários; não publicar LP
```

## Iframe Beefree

```javascript
const bee = page.frames().find((f) => f.url().includes("getbee.io"));
```

| Ação | Seletor |
|------|---------|
| Arrastar Imagem | `[data-qa="sidebar-draggable"][aria-label="Imagem"]` → `.drop-target` |
| Módulo no stage | `.module-box--image` |
| Upload | **Procurar** ou **Add image** → `input[type="file"]` no iframe |
| Painel | **DADOS DA IMAGEM** → campo **Url** |

Preferir **mouse drag** se `dragTo` falhar entre frame e página.

## Captura da URL (ordem)

1. Campo **Url** no painel do módulo Imagem (`cloudfront.net`).
2. Atributo **`src`** do `<img>` do módulo selecionado.
3. Interceptar POST `rdstation-static.s3.amazonaws.com` → `scripts/rd-s3-key-to-cloudfront.js`.

Não confiar só na UI sem validar que a URL é CloudFront da conta.

## Script de referência

`scripts/playwright-rd-upload-email-images.js` — corpo para `browser_run_code_unsafe` (parâmetros `emailEditUrl`, `imagesDir`, `files[]` no topo).

## Saída no repositório

`emails/{slug}/imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-23T...
upload_via: email-editor-beefree
email_draft_id: 23511919
cdn_base: https://d335luupugsy2.cloudfront.net
account_id: 975793
files:
  01_logo.png: https://d335luupugsy2.cloudfront.net/cms/files/...
```

Atualizar `meta.yaml` com `imagens_publicadas: true`.

## Catálogo

| Skill | Uso |
|-------|-----|
| `alice-penteado-rd-email` | Estrutura de pastas + pipeline RD |
| `rd-station-email-images-upload` | Playwright no editor de e-mail |
| `optimize-images` | Comprimir antes do upload |
