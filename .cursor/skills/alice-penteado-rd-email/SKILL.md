---
name: alice-penteado-rd-email
description: >-
  Organiza HTML e imagens de e-mail da Alice Penteado para RD Station Marketing:
  pastas em emails/, meta.yaml e publicação. Use quando o usuário
  enviar HTML/ZIP de newsletter ou pedir e-mail para o RD da Alice Penteado.
---

# Alice Penteado — E-mail HTML → RD Station

## Entrada típica

- Arquivo `.html` (export do design)
- ZIP com pasta `imagens/` ou arquivos soltos

## Workflow

```
1. Definir slug (tipo-tema-AAAA-MM-DD)
2. Extrair imagens → emails/{slug}/imagens/
3. Gravar emails/{slug}/email.html
4. Remover do HTML (se existir):
   - “Ver no navegador” / *|WEB_PREVIEW_LINK|*
   - “Descadastrar” / cancelar inscrição / *|LINK_DESCADASTRO|*
   (RD Station já fornece preview e descadastro por padrão)
5. meta.yaml + README.md da pasta + índice na raiz
6. Upload imagens no editor de e-mail RD (bloco Imagem) → email-rd.html com URLs CloudFront
```

## Pipeline do agente (automação)

```
A. Organizar pasta + limpar links RD padrão em email.html
B. (Opcional) optimize-images
C0. Criar rascunho NOVO no RD: [TC] {nome}-{AAAA-MM-DD} (docs/criar-rascunho-email-rd.md)
C1. Upload imagens nesse rascunho (Beefree) → imagens-urls.yaml
C2. Se C1 falhar: LP temp [TC] temp upload — {slug} → upload → EXCLUIR LP (docs/upload-imagens-lp-temporaria-rd.md)
D. build_email_rd.py → email-rd.html
E. (Opcional) Premailer Python (base_url=None) → email-premailer.html
F. URL raw TC-Desenvolvedores/Alice-Penteado-Emails (não gist pessoal)
G. NÃO importar HTML no RD via Playwright (manual pelo usuário)
```

Cada peça nova = **novo** rascunho `[TC]`; não reutilizar rascunho de campanha anterior só para CDN.

## Entrega obrigatória no chat — Próximos passos (usuário)

Ao concluir o trabalho em uma peça, **sempre** encerrar a resposta com uma seção **「Próximos passos (você)」** em português, mesmo que o usuário não peça. Incluir no mínimo:

1. **URL raw** `raw.githubusercontent.com/TC-Desenvolvedores/Alice-Penteado-Emails/.../email-rd.html` (após push), ou colar `email-rd.html` local.
2. Caminho local dos arquivos (`emails/{slug}/...`).
3. Fluxo RD resumido: Importar com HTML → Email Marketing → Criar email → Importar via URL.
4. Conferências: imagens CloudFront; HTML **sem** preview/descadastro (padrão RD).
5. Assunto/preheader de `meta.yaml`.
6. E-mail de teste antes do disparo.

Checklist completo: `docs/publicacao-rd-checklist.md`.

## Publicação no RD (referência)

Detalhes para o **usuário** (não automatizar import): `docs/publicacao-rd-checklist.md`.  
Pipeline e pré-requisitos de outro desenvolvedor: `README.md` e `.cursor/rules/alice-penteado-rd-emails.mdc`.

Upload (Playwright): `.cursor/skills/rd-station-email-images-upload/SKILL.md`, `docs/criar-rascunho-email-rd.md`, `docs/upload-imagens-editor-email-rd.md`, fallback `docs/upload-imagens-lp-temporaria-rd.md`, `scripts/playwright-rd-upload-email-images.js`.

## MCP

- `emails_search` / `email_get_by_id`: histórico e nomes de campanhas Alice (sem HTML).

## Catálogo de peças

Manter lista em `README.md` (raiz). Uma pasta = uma campanha ou versão final aprovada.
