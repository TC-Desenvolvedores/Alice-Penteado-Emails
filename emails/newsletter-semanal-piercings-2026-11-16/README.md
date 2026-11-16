# Newsletter Semanal — Piercings (16/11/2026)

Peça a partir do HTML V2 aprovado (`index.html` na pasta do Drive) e do `ORIENTACOES.md`.

| Arquivo | Uso |
|---------|-----|
| `email.html` | HTML de trabalho (`imagens/...`) |
| `imagens/` | 12 imagens do Drive (`images/`), baixadas e conferidas por tamanho |
| `meta.yaml` | Assunto, preheader, pendências |
| `email-rd.html` | Gerado depois do upload no RD |
| `imagens-urls.yaml` | Mapa arquivo → URL CloudFront (após upload) |

Sem links de preview/descadastro no HTML — padrão RD. O link “Descadastrar” do rascunho do Drive foi removido.

## Status

Conteúdo aprovado: sem pendências de texto, assunto ou link. Assunto **“Uni, duni, tê”** e pré-header aprovados.

Antes do disparo, falta só o fluxo manual:
1. Importar `email-rd.html` no RD (via URL raw) e conferir o rascunho.
2. Definir a data de disparo.
3. Teste de envio em Gmail, Apple Mail e Outlook.

## Publicar no RD

1. Rascunho `[TC] Newsletter Piercings - 2026-11-16` (ID `23663681`) com as 12 imagens enviadas. URLs em `imagens-urls.yaml`.
2. `email-rd.html` já gerado (`python scripts/build_email_rd.py newsletter-semanal-piercings-2026-11-16`).
3. Subir `email-rd.html` ao GitHub (push) e importar pela URL raw no RD.
