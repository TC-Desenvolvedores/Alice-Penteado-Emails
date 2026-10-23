# Variáveis — RD Station Marketing (HTML importado)

Formato geral: `*|NOME_DA_VARIAVEL|*` no corpo ou no assunto (via botão **Inserir variável** no editor).

Documentação oficial:

- [Usar variáveis em e-mails](https://ajuda.rdstation.com/s/article/Usar-vari%C3%A1veis-em-emails?language=pt_BR)
- [Erros em variáveis](https://ajuda.rdstation.com/s/article/Erros-em-variaveis-de-email-e-como-resolver)
- [Descadastro](https://ajuda.rdstation.com/s/article/Descadastro-de-email-cancelar-inscri%C3%A7%C3%A3o)

## Obrigatórias neste repositório (links no `href`)

| Uso | Variável | Exemplo no HTML |
|-----|----------|-----------------|
| Ver no navegador | `*|WEB_PREVIEW_LINK|*` | `<a href="*|WEB_PREVIEW_LINK|*">Ver no navegador</a>` |
| Descadastro | `*|LINK_DESCADASTRO|*` | `<a href="*|LINK_DESCADASTRO|*">Descadastrar</a>` |

Em **pré-visualização**, o link de descadastro pode não executar a ação; após o envio real, o RD substitui pela URL `app.rdstation.email/descadastrar/...`.

> **Validação:** ao colar o HTML no RD, abra **Inserir variável** e confira se os nomes batem com os da conta. Se o editor mostrar outro identificador, copie exatamente do painel (a RD não substitui tags digitadas erradas).

## Personalização (quando necessário)

| Campo (conta Alice) | Variável usual |
|---------------------|----------------|
| Nome | `*|NOME|*` |
| Primeiro nome | `*|PRIMEIRO_NOME|*` |
| E-mail | `*|EMAIL|*` |

Campos personalizados seguem o nome exibido no botão **Inserir variável** (ex.: `*|Nome Completo|*` para o campo customizado correspondente).

## Regras rápidas

1. Variáveis de **URL** vão no atributo `href` de um `<a>`.
2. Não usar variáveis em botões CTA do editor visual; em HTML importado, links `<a>` funcionam.
3. Gmail oferece descadastro com um clique no cabeçalho automaticamente (RD); o link no rodapé continua recomendado.
4. Imagens no HTML importado precisam de **URL absoluta** após upload no RD (paths relativos `imagens/...` servem só para preview local).
