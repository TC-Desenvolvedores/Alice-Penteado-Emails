# Publicação no RD — checklist do usuário

O agente prepara HTML, imagens no CDN e (opcional) URL pública para importação. **Importação do HTML no RD e disparo são manuais** até validação de automação.

## O que o agente costuma entregar

| Artefato | Descrição |
|----------|-----------|
| `email.html` | Paths locais `imagens/...` (sem links RD de preview/descadastro) |
| `email-rd.html` | Mesmo HTML com `src` em CloudFront (conta RD) |
| `imagens-urls.yaml` | Mapa arquivo → URL após upload Playwright |
| `email-premailer.html` | (Opcional) CSS mais inline via biblioteca Python `premailer` |
| URL raw (Gist) | Link para **Importar via URL** no RD |

## Próximos passos (você)

### 1. Conferir arquivos locais

- Abrir `email-rd.html` no navegador (ou preview) e checar layout.
- Ler `meta.yaml` da pasta: assunto, preheader e nome sugerido da campanha.
- Confirmar que **não** há “Ver no navegador” nem “Descadastrar” no HTML (o RD adiciona isso no envio).

### 2. Importar no RD Station Marketing

1. Acesse **Relacionar → E-mail → Criar e-mail** (ou edite um rascunho de teste).
2. Escolha **Importar com HTML** (novo editor / bee templates).
3. Nome do e-mail + tipo **Email Marketing** → **Criar email**.
4. No passo de importação, use **Importar via URL** e cole a **URL raw** que o agente informou no chat  
   (formato `https://gist.githubusercontent.com/.../raw/....html`).  
   Alternativa: colar o conteúdo de `email-rd.html` diretamente, se o RD oferecer colagem.
5. Salve o rascunho após o HTML carregar.

Ajuda RD: [Criar um e-mail](https://ajuda.rdstation.com/s/article/Criar-um-Email?language=pt_BR).

### 3. Revisar HTML no editor

- **Imagens:** devem apontar para CloudFront (`d335luupugsy2.cloudfront.net`). Se alguma quebrar, compare com `imagens-urls.yaml`.
- **Preview / descadastro:** use os padrões do RD no editor ou no envio; não é necessário duplicar no HTML importado.

### 4. Configurar envio

- Assunto e preheader conforme `meta.yaml`.
- Remetente e lista/segmento no RD.
- **E-mail de teste** para você e para a Alice antes do disparo.

### 5. Validar no teste

- Conferir se o RD exibe preview no navegador e link de descadastro como esperado (comportamento da plataforma).
- Links de campanha (WhatsApp, site, etc.) no corpo do HTML.

### 6. (Opcional) Premailer no site Dialect

Se quiser o mesmo tratamento do [premailer.dialect.ca](https://premailer.dialect.ca/): cole `email-rd.html`, gere o resultado e publique de novo (Gist ou colagem). O agente pode usar Premailer em Python com `base_url=None`.

## O que o agente **não** faz (por enquanto)

- Importar HTML no RD via Playwright (fluxo interrompido; você importa manualmente).
- Salvar campanha disparada ou alterar listas sem sua solicitação explícita.

## Após publicar

- Anotar no `meta.yaml` da pasta: ID ou URL do e-mail no RD, data do teste/disparo (se quiser histórico no repo).
