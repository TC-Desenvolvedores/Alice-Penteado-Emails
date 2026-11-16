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

## Pendências antes do disparo

1. Link do piercing de esmeraldas (vitrine): hoje aponta para a busca de piercings.
2. Assunto **“Uni, duni, tê”** (sugestão do Drive) e preheader aprovados.
3. Regras do frete grátis e do 10x sem juros, se houver, nas letras miúdas.
4. Data de disparo.
5. Teste de envio em Gmail, Apple Mail e Outlook, conferindo os links.

## Publicar no RD

1. Rascunho `[TC] Newsletter Piercings - 2026-11-16` (ID `23663681`) com as 12 imagens enviadas. URLs em `imagens-urls.yaml`.
2. `email-rd.html` já gerado (`python scripts/build_email_rd.py newsletter-semanal-piercings-2026-11-16`).
3. Subir `email-rd.html` ao GitHub (push) e importar pela URL raw no RD.
