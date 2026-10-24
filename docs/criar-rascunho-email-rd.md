# Criar rascunho de e-mail no RD (agente)

**Obrigatório** no início de **cada peça nova** — antes do upload de imagens.

## Nome do rascunho

Padrão fixo:

```text
[TC] {nome-do-e-mail}-{AAAA-MM-DD}
```

| Parte | Origem |
|--------|--------|
| `{nome-do-e-mail}` | Título curto da campanha (`meta.yaml` → `campanha.nome_sugerido`, sem prefixo “Newsletter”) — usar hífens, sem caracteres inválidos |
| `{AAAA-MM-DD}` | Data da peça (`slug` ou `criado_em` em `meta.yaml`) |

Exemplos:

- `[TC] Newsletter Solitários - 2026-10-23`

Registrar em `meta.yaml`:

```yaml
publicacao_rd:
  rascunho_rd:
    nome: "[TC] Newsletter Solitários - 2026-10-23"
    email_id: null   # preencher após criar
```

E em `imagens-urls.yaml` → `email_draft_id` (mesmo ID).

## Playwright (MCP `user-playwright`)

1. Login (humano: 2FA).
2. `https://app.rdstation.com.br/emails` → aba **Rascunhos**.
3. **Criar e-mail** → tipo **Email Marketing**.
4. Nome = padrão `[TC] ...` acima → criar.
5. Na tela da campanha, anotar o **`email_id`** da URL (`/email/{email_id}/`).
6. **Conteúdo** → **Editar** → `/email/{email_id}/edit` (iframe Beefree).

### Rascunho “limpo” para upload

- Preferir rascunho **sem** módulo **IMPORTAR HTML** preenchido (só linhas vazias ou um bloco Imagem temporário).
- Se o fluxo de criação abrir o editor vazio, usar esse rascunho para o upload.
- O HTML final da peça entra depois via **Importar com HTML** (operador) ou em outro passo — não é obrigatório colar o `email.html` no rascunho de upload.

## MCP Marketing (metadados)

- `emails_search` / `email_get_by_id`: confirmar que o rascunho existe e o nome está correto (não retorna HTML).

## Referências

- Upload no rascunho: [`upload-imagens-editor-email-rd.md`](upload-imagens-editor-email-rd.md)
- Fallback LP: [`upload-imagens-lp-temporaria-rd.md`](upload-imagens-lp-temporaria-rd.md)
- Regra: `.cursor/rules/alice-penteado-rd-emails.mdc`
