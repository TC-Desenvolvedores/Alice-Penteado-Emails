# Newsletter Semanal — Solitários v2 (23/10/2026)

Versão atualizada a partir do PDF `origem/Newsletter_Solitarios_Alice_Penteado.pdf`. A peça de **22/10** permanece em [`../newsletter-semanal-solitarios-2026-10-22/`](../newsletter-semanal-solitarios-2026-10-22/).

## Mudanças em relação à v1

- Layout fiel ao PDF: Times / Helvetica, cores `#FAF5ED` / `#F4C5AB` / `#9F624A`.
- Coração e gota em duas colunas; oval com polaroids em diagonal (`06_oval-diagonal`).
- `<picture>` + WebP no `email.html` (preview local); `email-rd.html` usa só `<img>` com CDN.

| Arquivo | Uso |
|---------|-----|
| `email.html` | HTML de trabalho (`imagens/...` + WebP) |
| `email-rd.html` | **Importar no RD** — CDN aplicado |
| `imagens-urls.yaml` | Mapa arquivo → URL CloudFront |
| `imagens/` | Assets |
| `origem/` | PDF fonte |

Sem links de preview/descadastro no HTML — padrão RD. Ver [`docs/variaveis-rd.md`](../../docs/variaveis-rd.md).

## Publicar no RD

1. **Upload das imagens** — skill `rd-station-email-images-upload` + `scripts/playwright-rd-upload-email-images.js` (LP temporária, não salvar).
2. Preencher **`imagens-urls.yaml`** com as URLs CloudFront (uma por arquivo listado).
3. Gerar HTML para o RD:
   ```bash
   python scripts/build_email_rd.py newsletter-semanal-solitarios-2026-10-23
   ```
4. **Importar** no RD: **Criar e-mail → Importar com HTML → Email Marketing** — colar o conteúdo de `email-rd.html` ou publicar em Gist e usar URL raw.
5. Assunto / preheader conforme `meta.yaml` → e-mail de teste.

**URL raw (importar via URL no RD):**  
`https://gist.githubusercontent.com/TiagoAFernandes/3746ed03848e1753b9fcec320cf81d5f/raw/email-rd.html`

Checklist: [`docs/publicacao-rd-checklist.md`](../../docs/publicacao-rd-checklist.md).
