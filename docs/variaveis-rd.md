# Variáveis — RD Station Marketing (HTML importado)

Formato geral: `*|NOME_DA_VARIAVEL|*` no corpo ou no assunto (via botão **Inserir variável** no editor).

Documentação oficial:

- [Usar variáveis em e-mails](https://ajuda.rdstation.com/s/article/Usar-vari%C3%A1veis-em-emails?language=pt_BR)
- [Descadastro](https://ajuda.rdstation.com/s/article/Descadastro-de-email-cancelar-inscri%C3%A7%C3%A3o)

## Ver no navegador e descadastro — **não** colocar no HTML

No **novo editor**, o RD já inclui por padrão o link de visualização no navegador e o de cancelamento de inscrição (rodapé / recursos da plataforma). Duplicar no HTML importado gera validação duplicada e erros de variável.

**Regra do repositório Alice Penteado:** o agente deve **remover** do HTML recebido:

- Blocos/links “Ver no navegador” (e qualquer `*|WEB_PREVIEW_LINK|*`)
- Blocos/links “Descadastrar” / “Cancelar inscrição” (e qualquer `*|LINK_DESCADASTRO|*`)

Manter preheader oculto no `<head>` (texto de preview na caixa de entrada), WhatsApp, site, Instagram e demais links de campanha.

## Personalização (quando necessário)

| Campo (conta Alice) | Variável usual |
|---------------------|----------------|
| Nome | `*|NOME|*` |
| Primeiro nome | `*|PRIMEIRO_NOME|*` |
| E-mail | `*|EMAIL|*` |

Campos personalizados seguem o nome exibido no botão **Inserir variável** (ex.: `*|Nome Completo|*` para o campo customizado correspondente).

## Regras rápidas

1. Variáveis de lead vão onde o RD permitir (texto/assunto); copie o nome exato do painel **Inserir variável**.
2. Imagens no HTML importado precisam de **URL absoluta** no `email-rd.html` (paths `imagens/...` só no preview local).
3. Descadastro com um clique no Gmail é tratado pelo RD automaticamente; o rodapé padrão da plataforma cobre o opt-out no corpo do envio.
