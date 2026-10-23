# Alice Penteado — E-mails HTML (RD Station)

Repositório local de HTML e imagens para campanhas de e-mail marketing da **Alice Penteado** no **RD Station Marketing**.

## Estrutura

```
emails/
  {slug-da-campanha}/
    email.html      # HTML pronto para importar no RD
    meta.yaml       # assunto, preheader, notas de publicação
    imagens/        # assets do e-mail
    README.md       # resumo da peça
docs/
  variaveis-rd.md   # merge tags e boas práticas RD
```

**Convenção de pasta:** `tipo-tema-AAAA-MM-DD` (ex.: `newsletter-semanal-solitarios-2026-10-22`).

## Fluxo (você → agente)

1. Enviar no chat o **HTML** e o **ZIP de imagens** (ou paths locais).
2. O agente cria uma pasta em `emails/`, aplica variáveis RD e documenta em `meta.yaml`.
3. No RD: **Relacionar → E-mail → Criar e-mail → Importar com HTML** ([ajuda](https://ajuda.rdstation.com/s/article/Criar-um-Email?language=pt_BR)).
4. Subir imagens no gerenciador do RD e trocar `imagens/...` por URLs absolutas do CDN antes do envio.

## Índice de e-mails

| Pasta | Tipo | Data |
|-------|------|------|
| [newsletter-semanal-solitarios-2026-10-22](emails/newsletter-semanal-solitarios-2026-10-22/) | Newsletter semanal | 2026-10-22 |

## Ferramentas

- **MCP `user-marketing`:** buscar e-mails/campanhas na conta (metadados; HTML não vem pela API).
- **Skill do projeto:** `.cursor/skills/alice-penteado-rd-email/SKILL.md`
