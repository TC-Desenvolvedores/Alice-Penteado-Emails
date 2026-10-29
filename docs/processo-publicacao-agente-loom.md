# Processo de publicação com agente — vídeos (Loom)

Gravações em tela do fluxo completo que o **agente de IA no Cursor** executa para preparar uma peça da Alice Penteado no **RD Station Marketing**, até a entrega da URL raw para importação manual do HTML.

**Público:** desenvolvedores da TC (ou operadores técnicos) que vão repetir o processo, configurar MCP Playwright ou revisar o que o agente faz.

**Contexto da gravação:** publicação da newsletter **Bloom Sale** (`newsletter-semanal-bloom-sale-2026-10-29`), 29/10/2026. O fluxo vale para outras peças — ajustar apenas `slug`, arquivos de entrada e nome do rascunho `[TC]`.

## Assistir na ordem

| Parte | Link | ID Loom |
|-------|------|---------|
| 1 | [Loom — parte 1](https://www.loom.com/share/94c8cf2895b84f8cb4248c51c74400db) | `94c8cf2895b84f8cb4248c51c74400db` |
| 2 | [Loom — parte 2](https://www.loom.com/share/4ff7fc28e8bd46e69b7e27e3aa7c9db1) | `4ff7fc28e8bd46e69b7e27e3aa7c9db1` |
| 3 | [Loom — parte 3](https://www.loom.com/share/8266ef1130e84121bd53bb7639f61eed) | `8266ef1130e84121bd53bb7639f61eed` |

URLs diretas (copiar):

```text
https://www.loom.com/share/94c8cf2895b84f8cb4248c51c74400db
https://www.loom.com/share/4ff7fc28e8bd46e69b7e27e3aa7c9db1
https://www.loom.com/share/8266ef1130e84121bd53bb7639f61eed
```

## O que os vídeos cobrem (visão geral)

Alinhado ao pipeline em `.cursor/rules/alice-penteado-rd-emails.mdc`:

1. **Entrada e repositório** — HTML/assets (ex.: Google Drive), pasta `emails/{slug}/`, `email.html`, `meta.yaml`, limpeza de preview/descadastro, WebP local opcional.
2. **RD Station + Playwright** — login na conta Alice, rascunho `[TC] {nome}-{AAAA-MM-DD}`, editor Beefree, upload das imagens (gerenciador **Carregar** / **Inserir**), `imagens-urls.yaml`.
3. **Build e entrega** — `python scripts/build_email_rd.py`, commit/push, URL raw no GitHub, **Próximos passos (você)** e importação manual no RD.

Detalhe escrito passo a passo: [`README.md`](../README.md) (ambiente), [`criar-rascunho-email-rd.md`](criar-rascunho-email-rd.md), [`upload-imagens-editor-email-rd.md`](upload-imagens-editor-email-rd.md), [`publicacao-rd-checklist.md`](publicacao-rd-checklist.md).

## Para o agente de IA

Quando um **novo desenvolvedor** perguntar como funciona a publicação, como configurar o fluxo ou o que esperar do agente:

- Indicar **este arquivo** e os **três links Loom na ordem acima** (não substituem a documentação escrita; complementam com a demonstração visual).
- Lembrar pré-requisitos: MCP **user-playwright**, acesso **RD Station** (Alice Penteado), push em **TC-Desenvolvedores/Alice-Penteado-Emails**.

## Após assistir

- Reproduzir uma peça de teste em pasta nova (`tipo-tema-AAAA-MM-DD`).
- Conferir checklist do operador: [`publicacao-rd-checklist.md`](publicacao-rd-checklist.md).
