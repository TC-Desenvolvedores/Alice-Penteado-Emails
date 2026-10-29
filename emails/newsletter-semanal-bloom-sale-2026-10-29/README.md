# Newsletter Semanal — Bloom Sale (29/10/2026)

Peça da semana a partir do HTML V2 aprovado (`bloom-sale-rd-station`) e do PDF em `origem/`.

| Arquivo | Uso |
|---------|-----|
| `email.html` | HTML de trabalho (`imagens/...` + WebP) |
| `email-rd.html` | **Importar no RD** — CDN aplicado |
| `imagens-urls.yaml` | Mapa arquivo → URL CloudFront |
| `imagens/` | 8 assets originais + WebP |
| `origem/` | PDF fonte |
| `meta.yaml` | Assunto, preheader, rascunho RD |

Sem links de preview/descadastro no HTML — padrão RD. Ver [`docs/variaveis-rd.md`](../../docs/variaveis-rd.md).

## Disparo

- **Assunto:** Bloom Sale na Alice Penteado
- **Pré-header:** Novembro floresce em ouro.
- **Data:** a confirmar

Catálogo (12 pontos do layout): [Google Drive](https://drive.google.com/file/d/1jQnGkkOkjeDA8nf-mmBoCxGTjeQh3_nY/view?usp=drive_link) — o arquivo precisa estar com compartilhamento “Qualquer pessoa com o link”.

## Publicar no RD

1. Imagens já publicadas no rascunho `[TC] Newsletter Bloom Sale - 2026-10-29` (ID `23556580`).
2. `python scripts/build_email_rd.py newsletter-semanal-bloom-sale-2026-10-29`
3. Importar `email-rd.html` via URL raw.
4. Assunto e preheader conforme `meta.yaml` → e-mail de teste.

**URL raw:** `https://raw.githubusercontent.com/TC-Desenvolvedores/Alice-Penteado-Emails/master/emails/newsletter-semanal-bloom-sale-2026-10-29/email-rd.html`

Checklist: [`docs/publicacao-rd-checklist.md`](../../docs/publicacao-rd-checklist.md).
