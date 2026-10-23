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

## Fluxo (você → agente → você)

1. Enviar no chat o **HTML** e o **ZIP de imagens** (ou paths locais).
2. O agente cria a pasta em `emails/`, variáveis RD, upload de imagens (quando possível) e `email-rd.html`.
3. O agente informa **próximos passos** e a **URL raw** (ou arquivo) para importar no RD.
4. Você importa no RD, revisa links/variáveis, configura assunto e envia **e-mail de teste**.

Checklist completo: [`docs/publicacao-rd-checklist.md`](docs/publicacao-rd-checklist.md).

## Índice de e-mails

| Pasta | Tipo | Data |
|-------|------|------|
| [newsletter-semanal-solitarios-2026-10-23](emails/newsletter-semanal-solitarios-2026-10-23/) | Newsletter semanal (v2, PDF) | 2026-10-23 |
| [newsletter-semanal-solitarios-2026-10-22](emails/newsletter-semanal-solitarios-2026-10-22/) | Newsletter semanal (v1) | 2026-10-22 |

## Ferramentas

- **MCP `user-marketing`:** buscar e-mails/campanhas na conta (metadados; HTML não vem pela API).
- **Skill do projeto:** `.cursor/skills/alice-penteado-rd-email/SKILL.md`
