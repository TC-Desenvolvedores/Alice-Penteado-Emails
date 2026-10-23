---
name: alice-penteado-rd-email
description: >-
  Organiza HTML e imagens de e-mail da Alice Penteado para RD Station Marketing:
  pastas em emails/, variáveis *|...|*, meta.yaml e publicação. Use quando o usuário
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
4. Substituir # em links RD:
   - Ver no navegador → href="*|WEB_PREVIEW_LINK|*"
   - Descadastrar → href="*|LINK_DESCADASTRO|*"
5. meta.yaml + README.md da pasta + índice na raiz
6. Lembrar: upload de imagens no RD + URLs absolutas antes do envio
```

## Publicação no RD

1. [Criar e-mail](https://ajuda.rdstation.com/s/article/Criar-um-Email?language=pt_BR) → **Importar com HTML** (ou colar na etapa de conteúdo).
2. Configurar assunto/preheader (campos do RD; podem espelhar `meta.yaml`).
3. Substituir cada `src="imagens/..."` pela URL CloudFront após upload no editor.
4. E-mail de teste; validar variáveis e links.

Upload de imagens em LPs (referência de CDN/playwright): skill global `rd-station-landing-images-upload` — adaptar para e-mail quando automatizarmos.

## MCP

- `emails_search` / `email_get_by_id`: histórico e nomes de campanhas Alice (sem HTML).

## Catálogo de peças

Manter lista em `README.md` (raiz). Uma pasta = uma campanha ou versão final aprovada.
