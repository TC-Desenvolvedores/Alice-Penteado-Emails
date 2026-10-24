---
name: rd-station-email-images-upload
description: >-
  Alice Penteado: criar rascunho [TC] no RD, upload de imagens no editor Beefree
  desse rascunho; se falhar, LP temporária, upload e exclusão da LP. Playwright MCP.
---

# Upload de imagens — Alice Penteado (RD Station)

## Ordem obrigatória (cada peça nova)

```
C0. Criar rascunho de e-mail: [TC] {nome}-{AAAA-MM-DD}
C1. Upload no /email/{id}/edit (Beefree)
C2. Se C1 falhar → LP [TC] temp upload — {slug} → upload → EXCLUIR LP
```

Documentação:

| Etapa | Doc |
|--------|-----|
| C0 | `docs/criar-rascunho-email-rd.md` |
| C1 | `docs/upload-imagens-editor-email-rd.md` |
| C2 | `docs/upload-imagens-lp-temporaria-rd.md` |

Skill global LP (snippets S3): `~/.cursor/skills/rd-station-landing-images-upload/SKILL.md` — usar `rd_account_id: 975793`.

## Pré-requisitos

- MCP **user-playwright** (`browser_navigate`, `browser_resize`, `browser_run_code_unsafe`, `browser_wait_for`)
- Imagens em `emails/{slug}/imagens/`
- Humano: login + 2FA em `app.rdstation.com.br`
- Viewport **1920×1400**

## C0 — Nome do rascunho

```text
[TC] Newsletter Solitários - 2026-10-23
```

Derivar de `meta.yaml` (`campanha.nome_sugerido` + data). Gravar `email_draft_id` em `imagens-urls.yaml` e `publicacao_rd.rascunho_rd` em `meta.yaml`.

## C1 — Editor de e-mail (tentar primeiro)

**Sempre** no rascunho **desta peça** (`/email/{id}/edit`, iframe `app.getbee.io`).

| Ação | Seletor |
|------|---------|
| Arrastar Imagem | `[data-qa="sidebar-draggable"][aria-label="Imagem"]` → `.drop-target` |
| Módulo | `.module-box--image` |
| Upload | **Procurar** / **Add image** → `input[type="file"]` |

Preferir **mouse drag** se `dragTo` falhar. Desselecionar módulo IMPORTAR HTML se a sidebar não mostrar blocos arrastáveis.

### Captura da URL

1. Campo **Url** no painel (`cloudfront.net`).
2. `src` do `<img>` no módulo.
3. POST `rdstation-static.s3.amazonaws.com` → `scripts/rd-s3-key-to-cloudfront.js`.

### Critério de falha (ir para C2)

- Nenhum `.module-box--image` após drag em rascunho limpo.
- Upload incompleto / timeout em um ou mais arquivos.
- Rascunho só com IMPORTAR HTML e impossível inserir bloco Imagem.

## C2 — LP temporária (fallback)

1. Criar LP `[TC] temp upload — {slug}`.
2. Upload **apenas** em `/landing-pages/{id_dessa_lp}/editar` (ver skill global). **Proibido** outra LP da conta.
3. Editor pode estar no documento principal (`page`, não iframe).
4. Preencher `imagens-urls.yaml` com `upload_via: landing-page-temporaria` e `landing_page_id` = essa LP.
5. **Excluir** a LP temp; marcar `landing_page_excluida: true`.
6. Se exclusão falhar: reportar ID/nome ao usuário.

## Script de referência (C1)

`scripts/playwright-rd-upload-email-images.js` — ajustar `emailEditUrl` para o rascunho **criado em C0** (não ID fixo de outra campanha).

## Saída no repositório

`emails/{slug}/imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-23T...
upload_via: email-editor-beefree   # ou landing-page-temporaria
email_draft_id: 23511920
landing_page_id: null            # ou ID se usou C2; excluida: true
rd_account_id: 975793
cdn_base: https://d335luupugsy2.cloudfront.net
files:
  03_hero.jpg: https://d335luupugsy2.cloudfront.net/cms/files/...
```

`meta.yaml`: `imagens_publicadas: true`.

## Catálogo

| Skill | Uso |
|-------|-----|
| `alice-penteado-rd-email` | Pasta + pipeline completo |
| `rd-station-email-images-upload` | C0–C2 Playwright |
| `rd-station-landing-images-upload` | Snippets upload LP (global) |
| `optimize-images` | Antes do upload |
