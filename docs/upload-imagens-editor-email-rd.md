# Upload de imagens — editor de e-mail RD (Beefree)

**Pré-requisito:** rascunho **novo** desta peça, nome `[TC] {nome}-{AAAA-MM-DD}` — ver [`criar-rascunho-email-rd.md`](criar-rascunho-email-rd.md).

**Ordem:** tentar upload **aqui** (C1). Se falhar → [`upload-imagens-lp-temporaria-rd.md`](upload-imagens-lp-temporaria-rd.md) (C2).

Teste de validação: **2026-10-23** — conta Alice Penteado (`975793`), editor Beefree em `/email/{id}/edit`.

## Onde o agente trabalha

| Etapa | URL / UI |
|--------|-----------|
| Lista | `https://app.rdstation.com.br/emails` → aba **Rascunhos** |
| Criar | **Criar e-mail** → Email Marketing → nome `[TC] ...` |
| Campanha | `/email/{email_id}/` → bloco **Conteúdo** → **Editar** |
| Editor visual | `/email/{email_id}/edit` → iframe **Beefree** (`app.getbee.io`) |

Usar o **`email_id` do rascunho criado para a peça atual** — não um rascunho antigo compartilhado.

## Fluxo manual (referência para o agente)

1. Concluir C0 (rascunho `[TC]` criado).
2. Abrir `/email/{id}/edit` e aguardar o iframe Beefree.
3. Se houver módulo **IMPORTAR HTML** selecionado, **desselecionar** para exibir blocos arrastáveis na sidebar.
4. Aba **CONTEÚDO**: **arrastar** **Imagem** para **linha vazia** (`.drop-target` no topo).
5. **Procurar** / **Add image** → arquivo em `emails/{slug}/imagens/`.
6. Copiar URL (campo **Url**, `src` ou POST S3).
7. Repetir por arquivo; gravar `imagens-urls.yaml` (`upload_via: email-editor-beefree`).
8. (Opcional) Remover blocos Imagem temporários do rascunho.
9. `python scripts/build_email_rd.py emails/{slug}`.

Se o passo 4–6 falhar de forma repetida → **C2** (LP temp + exclusão).

## Automação Playwright (agente)

### Iframe

```text
page.frames().find(f => f.url().includes('getbee.io'))
```

Interações no frame Beefree, não na LP.

### Arrastar bloco Imagem

| Seletor | Uso |
|---------|-----|
| `[data-qa="sidebar-draggable"][aria-label="Imagem"]` | Origem do drag (sidebar) |
| `.drop-target` (primeiro no topo) | Destino no stage |

`dragTo` entre frames costuma falhar; preferir **mouse** (`move` → `down` → `move` → `up`) com `boundingBox()`.

### Upload

1. Clicar no último `.module-box--image`.
2. **Procurar** ou **Add image**.
3. `bee.locator('input[type="file"]').first().setInputFiles(path)` ou `filechooser`.
4. Aguardar 3–15 s.

### Obter a URL

1. Campo **Url** no painel.
2. **`src` do `<img>`** em `.module-box--image`.
3. Interceptar POST S3:

```javascript
const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";
function s3XmlToCloudFront(xml) {
  const key = (xml.match(/<Key>([^<]+)<\/Key>/) || [])[1];
  return key ? `${CLOUDFRONT}/${key}` : null;
}
```

Helper: `scripts/rd-s3-key-to-cloudfront.js`.

### Validado (2026-10-23)

- Sidebar **Imagem** com `data-qa="sidebar-draggable"`.
- CDN `d335luupugsy2.cloudfront.net/cms/files/975793/...`.
- Rascunho com **IMPORTAR HTML** cheio pode **impedir** novo módulo Imagem → usar rascunho limpo (C0) ou C2.

## Saída no repositório

`emails/{slug}/imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-23T...
upload_via: email-editor-beefree
email_draft_id: 23511920
cdn_base: https://d335luupugsy2.cloudfront.net
rd_account_id: 975793
files:
  hero-joias.jpg: https://d335luupugsy2.cloudfront.net/cms/files/...
```

`meta.yaml`: `imagens_publicadas: true`, `publicacao_rd.rascunho_rd`.

## Referências

- Criar rascunho: [`criar-rascunho-email-rd.md`](criar-rascunho-email-rd.md)
- Fallback LP: [`upload-imagens-lp-temporaria-rd.md`](upload-imagens-lp-temporaria-rd.md)
- Skill: `.cursor/skills/rd-station-email-images-upload/SKILL.md`
- Script: `scripts/playwright-rd-upload-email-images.js`
- Regra: `.cursor/rules/alice-penteado-rd-emails.mdc`
