# Upload de imagens — Landing Page temporária (fallback)

Usar **somente** quando o upload no **editor de e-mail** do rascunho `[TC]` falhar (ex.: módulo IMPORTAR HTML impede arrastar **Imagem**, drag não cria `.module-box--image`, timeout repetido).

Fluxo principal continua em [`upload-imagens-editor-email-rd.md`](upload-imagens-editor-email-rd.md).

## Conta Alice Penteado

| Item | Valor |
|------|--------|
| `rd_account_id` | `975793` |
| CloudFront | `https://d335luupugsy2.cloudfront.net` |
| Path S3 típico | `cms/files/975793/{timestamp}/{hash}` |

As URLs geradas na LP são as **mesmas** usadas em e-mail (`email-rd.html`).

## Nome da LP temporária

```text
[TC] temp upload — {slug}
```

Ex.: `[TC] temp upload — newsletter-semanal-solitarios-2026-10-23`

## Workflow do agente

```
1. Criar LP em rascunho (Playwright) com o nome acima
2. Abrir /landing-pages/{id}/editar
3. Arrastar bloco Imagem → upload de cada arquivo em emails/{slug}/imagens/
4. Capturar URL CloudFront (POST S3 ou src no editor) — ver skill global rd-station-landing-images-upload
5. Gravar imagens-urls.yaml (upload_via: landing-page-temporaria; landing_page_id: {id})
6. EXCLUIR a LP temporária (obrigatório)
7. python scripts/build_email_rd.py emails/{slug}
```

### Criar LP

1. **Conversão** → **Landing Pages** → **Criar landing page** (ou equivalente no menu).
2. Nome = padrão `[TC] temp upload — {slug}`.
3. Salvar rascunho; anotar `landing_page_id` na URL.

### Upload no editor de LP

- Iframe: `landing-pages/editor?id={id}`.
- Bloco **Imagem** (`.draggable-component`) → coluna `.bricks-column`.
- **Carregar imagem** → modal com `input#file` no documento pai.
- Interceptar `POST https://rdstation-static.s3.amazonaws.com/` → `<Key>` → CloudFront.

Detalhes e snippets: skill global `~/.cursor/skills/rd-station-landing-images-upload/SKILL.md` (adaptar `account_id` **975793**, não Planeta `104128`).

### Excluir LP (obrigatório após URLs no YAML)

1. Lista de LPs → localizar `[TC] temp upload — {slug}`.
2. **Excluir** / remover landing (confirmar diálogo).
3. Atualizar `imagens-urls.yaml`:

```yaml
landing_page_id: 9012250
landing_page_excluida: true
landing_page_excluida_em: 2026-10-23T21:00:00-03:00
```

Se a exclusão falhar, **informar o usuário** com o ID e o nome para exclusão manual — não deixar LP órfã sem aviso.

## Saída no repositório

`imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-23T...
upload_via: landing-page-temporaria
email_draft_id: 23511920
landing_page_id: 9012251
landing_page_excluida: true
rd_account_id: 975793
cdn_base: https://d335luupugsy2.cloudfront.net
files:
  03_hero.jpg: https://d335luupugsy2.cloudfront.net/cms/files/975793/...
```

`meta.yaml`: `imagens_publicadas: true` e `publicacao_rd.rascunho_rd.email_id` preenchido.

## O que não fazer

- Manter LP temporária publicada ou em rascunho após o upload.
- Usar LP como atalho **sem** tentar antes o rascunho de e-mail `[TC]` da peça.
- **Usar qualquer LP que não seja** `[TC] temp upload — {slug}` **criada para esta peça** (proibido: LP de produção, “Catálogo”, newsletter anterior, ID 9012250, etc.).
- Se `/landing-pages/{id}/editar` da LP temp demorar: aguardar o editor (`.draggable-component` no documento principal ou iframe `landing-pages/editor`); reabrir a mesma LP temp; em último caso nova LP temp `[TC] temp upload — {slug}-2` — **nunca** mudar para outra LP existente.

## Editor LP (Alice, 2026-10)

O canvas pode estar no **documento principal** (sem iframe `landing-pages/editor`). Usar `page.locator('.draggable-component')` e `page.locator('.bricks-image')` na página, não só em frame filho.

## Referências

- Skill repo: `.cursor/skills/rd-station-email-images-upload/SKILL.md`
- Criar rascunho e-mail: [`criar-rascunho-email-rd.md`](criar-rascunho-email-rd.md)
