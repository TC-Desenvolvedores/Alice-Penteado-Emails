---
description: E-mails HTML Alice Penteado para RD Station Marketing — estrutura, pipeline do agente e publicação
globs: emails/**/*
alwaysApply: false
---

# Alice Penteado — E-mails RD Station

## Escopo

HTML de campanhas da **Alice Penteado** para importação no **RD Station Marketing** (não SFMC). O agente prepara arquivos no repositório; **importação do HTML no RD e disparo são manuais** pelo usuário.

## Ao receber HTML + imagens do usuário

1. Criar pasta `emails/{slug}/` com slug `tipo-tema-AAAA-MM-DD`.
2. Salvar HTML como `email.html`; imagens em `imagens/` (manter nomes originais).
3. Adicionar `meta.yaml` (assunto, preheader, notas) e `README.md` curto.
4. Atualizar tabela em `README.md` na raiz.
5. **Remover** links de “Ver no navegador” e “Descadastrar” (e variáveis `*|WEB_PREVIEW_LINK|*`, `*|LINK_DESCADASTRO|*`) — o RD já inclui isso por padrão. Ver `docs/variaveis-rd.md`.

## HTML

- Layout em tabelas, ~600px, CSS inline + `@media` no `<head>`.
- Manter preheader oculto, blocos MSO/VML existentes, links WhatsApp e site da marca.
- `src` de imagens: relativos `imagens/...` no repo até o upload; depois CloudFront em `email-rd.html`.
- Não incluir preview/descadastro no HTML importado (evita duplicata e erro de validação no novo editor).
- Se usar `<picture>` + WebP local, o build para RD remove `<picture>` e deixa só `<img>` com URL absoluta.

## Pipeline do agente (ordem obrigatória)

```
A. Organizar pasta + limpar links RD padrão em email.html
B. (Opcional) Otimizar imagens — skill global optimize-images
C0. Criar NOVO rascunho de e-mail no RD (Playwright) — nome [TC] {nome}-{AAAA-MM-DD} → anotar email_id em meta.yaml
C1. Upload imagens no editor desse rascunho (/email/{id}/edit, Beefree) → imagens-urls.yaml
C2. Se C1 falhar: LP temporária [TC] temp upload — {slug} → upload → EXCLUIR LP → imagens-urls.yaml (upload_via: landing-page-temporaria)
D. Gerar email-rd.html — scripts/build_email_rd.py (email.html + imagens-urls.yaml)
E. Commit + push no GitHub TC-Desenvolvedores (**só** HTML, YAML, MD — **sem** `imagens/` nem `origem/`) → URL raw de `email-rd.html`
F. NÃO importar HTML no RD via Playwright (usuário faz manualmente)
G. Encerrar o chat com 「Próximos passos (você)」 — docs/publicacao-rd-checklist.md
```

**Nunca** reutilizar rascunho `[TC]` de outra peça para upload — cada e-mail novo = novo rascunho (C0).

### C0 — Criar rascunho de e-mail no RD

- Nome: **`[TC] {nome-do-e-mail}-{AAAA-MM-DD}`** (ver `docs/criar-rascunho-email-rd.md`).
- Tipo: **Email Marketing**; gravar `publicacao_rd.rascunho_rd.nome` e `email_id` em `meta.yaml` e `imagens-urls.yaml`.

### C1 — Upload de imagens (Playwright, editor de e-mail)

- **Obrigatório tentar primeiro** no rascunho criado em C0: `/email/{id}/edit` (iframe **Beefree** `app.getbee.io`).
- Arrastar bloco **Imagem** para linha vazia → **Procurar** / **Add image** → upload → copiar **Url** ou `src` CloudFront.
- Skill: `.cursor/skills/rd-station-email-images-upload/SKILL.md` — `docs/upload-imagens-editor-email-rd.md`.
- Script: `scripts/playwright-rd-upload-email-images.js` (`browser_run_code_unsafe`; `emailEditUrl` = rascunho da peça).
- MCP **user-playwright**; viewport **1920×1400**; humano conclui login/2FA no RD.
- URL: campo **Url** / `src` do módulo; backup: POST `rdstation-static.s3.amazonaws.com` → `https://d335luupugsy2.cloudfront.net/` (`scripts/rd-s3-key-to-cloudfront.js`).
- Gravar `imagens-urls.yaml` (`upload_via: email-editor-beefree`) e `meta.yaml` (`imagens_publicadas: true`).

### C2 — Fallback: Landing Page temporária

- **Somente** se C1 não concluir todos os uploads (módulo IMPORTAR HTML, drag sem `.module-box--image`, etc.).
- Criar LP **`[TC] temp upload — {slug}`** → upload **somente nessa LP** (skill global `rd-station-landing-images-upload`, conta **975793**) → `docs/upload-imagens-lp-temporaria-rd.md`.
- **Proibido** usar LP de outra campanha, LP publicada ou rascunho legado (ex.: “Catálogo Carioca”, ID compartilhado). Se o editor da LP temp não carregar, **aguardar/reabrir a LP temp** ou criar outra LP temp com sufixo `-2` — não trocar de LP.
- **Excluir a LP temp** após gravar URLs no YAML (`landing_page_excluida: true`). Se não conseguir excluir, avisar o usuário com ID/nome.
- `upload_via: landing-page-temporaria` em `imagens-urls.yaml` (`landing_page_id` = ID da LP temp usada no upload).

### D — `email-rd.html`

```bash
python scripts/build_email_rd.py emails/{slug}
```

Requer **PyYAML** (`python -m pip install pyyaml`).

### E — URL pública para “Importar via URL” no RD

- **Não** publicar HTML em Gist de conta pessoal.
- Organizações GitHub **não criam Gists novos**; usar repositório público da org:
  - Repositório: `TC-Desenvolvedores/Alice-Penteado-Emails`
  - Padrão: `https://raw.githubusercontent.com/TC-Desenvolvedores/Alice-Penteado-Emails/master/emails/{slug}/email-rd.html`
- Após commit, **push** em `origin` (desenvolvedor precisa de acesso à org e `gh` autenticado).
- Registrar a URL em `meta.yaml` → `publicacao.importar_via_url_raw`.

### Opcional

- `email-premailer.html` via biblioteca Python `premailer` com `base_url=None` (revisar se não reintroduzir preview/descadastro).
- MCP **user-marketing**: metadados de campanhas/e-mails (não retorna HTML).

## Artefatos por pasta `emails/{slug}/`

| Arquivo | Função |
|---------|--------|
| `email.html` | Fonte com paths `imagens/...` |
| `email-rd.html` | Importação no RD (CloudFront) |
| `imagens-urls.yaml` | Mapa arquivo → URL CDN |
| `meta.yaml` | Assunto, preheader, URL raw, flags |
| `README.md` | Resumo da peça |

## Referências

- `README.md` (raiz) — ambiente do desenvolvedor e índice de peças
- `docs/processo-publicacao-agente-loom.md` — vídeos Loom do fluxo do agente (onboarding dev)
- `docs/variaveis-rd.md`
- `docs/publicacao-rd-checklist.md`
- `docs/upload-imagens-editor-email-rd.md`
- Skill: `.cursor/skills/alice-penteado-rd-email/SKILL.md`
