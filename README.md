# Alice Penteado — E-mails HTML (RD Station)

Repositório de HTML e imagens para campanhas de e-mail marketing da **Alice Penteado** no **RD Station Marketing**. O fluxo prevê um **agente de IA no Cursor** para montar a peça, subir imagens ao CDN do RD e publicar uma URL de importação; a **importação do HTML no RD e o disparo** ficam com a pessoa operadora.

Repositório remoto: [TC-Desenvolvedores/Alice-Penteado-Emails](https://github.com/TC-Desenvolvedores/Alice-Penteado-Emails)

## Estrutura

```
emails/
  {slug-da-campanha}/
    email.html           # HTML com imagens locais imagens/...
    email-rd.html        # HTML para o RD (src em CloudFront)
    imagens-urls.yaml    # Mapa arquivo → URL após upload
    meta.yaml            # assunto, preheader, URL raw, notas
    imagens/             # assets do e-mail
    README.md            # resumo da peça
docs/
  variaveis-rd.md        # merge tags e boas práticas RD
  publicacao-rd-checklist.md
  criar-rascunho-email-rd.md
  upload-imagens-editor-email-rd.md
  upload-imagens-lp-temporaria-rd.md
scripts/
  build_email_rd.py      # gera email-rd.html
  playwright-rd-upload-email-images.js
  rd-s3-key-to-cloudfront.js
.cursor/
  rules/                 # regras do agente (ler alice-penteado-rd-emails.mdc)
  skills/                # skills específicas deste repo
```

**Convenção de pasta:** `tipo-tema-AAAA-MM-DD` (ex.: `newsletter-semanal-solitarios-2026-10-23`).

## Índice de e-mails

| Pasta | Tipo | Data |
|-------|------|------|
| [promocional-joias-2026-10-23](emails/promocional-joias-2026-10-23/) | Promocional editorial | 2026-10-23 |
| [newsletter-semanal-solitarios-2026-10-23](emails/newsletter-semanal-solitarios-2026-10-23/) | Newsletter semanal (v2, PDF) | 2026-10-23 |
| [newsletter-semanal-solitarios-2026-10-22](emails/newsletter-semanal-solitarios-2026-10-22/) | Newsletter semanal (v1) | 2026-10-22 |

---

## Ambiente do desenvolvedor (para repetir o fluxo com agente de IA)

### 1. Ferramentas no sistema

| Ferramenta | Uso | Instalação |
|------------|-----|------------|
| **Git** | Versionar e enviar para `TC-Desenvolvedores` | [git-scm.com](https://git-scm.com/) |
| **GitHub CLI (`gh`)** | Push e autenticação na org | [cli.github.com](https://cli.github.com/) → `gh auth login` |
| **Python 3.10+** | `scripts/build_email_rd.py` | [python.org](https://www.python.org/) |
| **PyYAML** | Ler `imagens-urls.yaml` no build | `python -m pip install pyyaml` |
| **Node.js** (opcional) | Rodar helpers JS fora do MCP | [nodejs.org](https://nodejs.org/) |

Opcional, antes do upload:

| Ferramenta | Uso | Instalação |
|------------|-----|------------|
| **Pillow + pngquant** | Skill `optimize-images` (redimensionar/comprimir) | `python -m pip install Pillow pngquant-cli` |
| **premailer** | `email-premailer.html` (CSS mais inline) | `python -m pip install premailer` |

### 2. Cursor IDE

- Abrir esta pasta como workspace.
- Usar **Agent** (modo com ferramentas) para o pipeline completo.
- Regras do projeto: `.cursor/rules/alice-penteado-rd-emails.mdc` (o agente deve seguir o pipeline documentado ali).

### 3. MCP servers (configurar no Cursor)

Necessários para o fluxo automatizado de imagens e consulta à conta RD:

| MCP | Namespace típico | Função |
|-----|------------------|--------|
| **Playwright** | `user-playwright` | Login no RD (com você), upload de imagens, interceptar S3 |
| **RD Station Marketing** | `user-marketing` | Buscar e-mails/campanhas, metadados (HTML **não** vem pela API) |

Sem o Playwright MCP o agente ainda pode montar `email.html` e documentar upload manual; sem `user-marketing` o fluxo de e-mail continua, só perde consulta de histórico na conta.

Como instalar MCPs depende da configuração da sua máquina/Cursor (Settings → MCP). Garanta que o servidor Playwright está habilitado e que o navegador consegue abrir `app.rdstation.com.br`.

### 4. Skills (instruções para o agente)

**No repositório** (versionadas com o projeto):

| Skill | Caminho |
|-------|---------|
| Pipeline geral Alice + RD | `.cursor/skills/alice-penteado-rd-email/SKILL.md` |
| Upload de imagens Playwright | `.cursor/skills/rd-station-email-images-upload/SKILL.md` |

**Globais do usuário** (recomendadas; em `~/.cursor/skills/`):

| Skill | Função |
|-------|--------|
| `optimize-images` | Comprimir/redimensionar antes do upload |
| `rd-station-landing-images-upload` | Fallback Alice: LP **temporária** + exclusão — `docs/upload-imagens-lp-temporaria-rd.md` |

O agente carrega skills pelo nome quando a tarefa combina; manter as globais instaladas evita improviso.

### 5. Acesso GitHub (org TC)

- Membro da organização **[TC-Desenvolvedores](https://github.com/TC-Desenvolvedores)** com permissão de **push** em `Alice-Penteado-Emails`.
- `gh auth status` deve mostrar conta com acesso à org.
- **URL de importação no RD:** após push, usar `raw.githubusercontent.com` (organizações GitHub **não criam Gists novos**):

  `https://raw.githubusercontent.com/TC-Desenvolvedores/Alice-Penteado-Emails/master/emails/{slug}/email-rd.html`

### 6. Acesso RD Station (Alice Penteado)

- Conta RD com permissão para **Landing Pages** e **E-mail Marketing** (upload de mídia usa o mesmo CDN).
- Por peça: **criar rascunho** `[TC] nome-AAAA-MM-DD` → upload no **editor de e-mail** (`/email/{id}/edit`). Se falhar: LP temp `[TC] temp upload — {slug}` e **excluir** a LP — [`docs/criar-rascunho-email-rd.md`](docs/criar-rascunho-email-rd.md), [`docs/upload-imagens-editor-email-rd.md`](docs/upload-imagens-editor-email-rd.md), [`docs/upload-imagens-lp-temporaria-rd.md`](docs/upload-imagens-lp-temporaria-rd.md).
- Login e 2FA: **humano** no navegador controlado pelo Playwright; o agente não armazena senha no repositório.

Não commitar `.env` com credenciais. Se usar automação de login em outros projetos, mantenha `.env` local e listado no `.gitignore`.

### 7. Constantes úteis (Alice)

| Item | Valor |
|------|--------|
| CloudFront CDN | `https://d335luupugsy2.cloudfront.net` |
| Padrão de path | `cms/files/975793/{timestamp}/{hash}` |
| Editor de e-mail (upload) | `https://app.rdstation.com.br/email/{id}/edit` |

---

## Processo com agente de IA (resumo)

1. **Entrada:** HTML (ou PDF/design) + imagens (ZIP ou pasta).
2. **Agente:** cria `emails/{slug}/`, `email.html`, `meta.yaml`, remove preview/descadastro do HTML.
3. **RD:** criar rascunho `[TC]` → upload imagens no editor (ou LP temp + excluir) → `imagens-urls.yaml`.
4. **Build:** `python scripts/build_email_rd.py emails/{slug}` → `email-rd.html`.
5. **Publicação:** commit + push → URL `raw.githubusercontent.com` em `meta.yaml`.
6. **Operador:** importar URL no RD, revisar, teste, disparo — [`docs/publicacao-rd-checklist.md`](docs/publicacao-rd-checklist.md).

Detalhe passo a passo para o agente: `.cursor/rules/alice-penteado-rd-emails.mdc`.

### Comandos úteis

```bash
# Gerar HTML para o RD após upload
python scripts/build_email_rd.py emails/newsletter-semanal-solitarios-2026-10-23

# Converter key S3 em URL CloudFront (debug)
node scripts/rd-s3-key-to-cloudfront.js "cms/files/975793/..."

# Otimizar pasta de imagens (skill global)
python ~/.cursor/skills/optimize-images/scripts/optimize_images.py emails/{slug}/imagens
```

### O que o agente não deve fazer

- Importar HTML no editor de e-mail do RD via automação (fluxo instável / variáveis RD).
- Publicar `email-rd.html` em Gist de conta pessoal (usar repo **TC-Desenvolvedores**).
- Incluir “Ver no navegador” / “Descadastrar” no HTML importado.

---

## Fluxo rápido (você → agente → você)

1. Enviar no chat o **HTML** e o **ZIP de imagens** (ou paths locais).
2. O agente executa o pipeline acima e informa **Próximos passos (você)** com a URL raw.
3. Você importa no RD, configura assunto/preheader (`meta.yaml`), envia **e-mail de teste**.

Checklist completo: [`docs/publicacao-rd-checklist.md`](docs/publicacao-rd-checklist.md).  
Variáveis RD: [`docs/variaveis-rd.md`](docs/variaveis-rd.md).
