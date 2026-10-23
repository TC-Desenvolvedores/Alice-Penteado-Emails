# Upload de imagens — editor de e-mail RD (Beefree)

**Obrigatório:** usar o **construtor de e-mail** (bloco **Imagem**).  
**Proibido:** upload via **Landing Pages** só para gerar URL no CDN.

Teste de validação: **2026-10-23** — conta Alice Penteado (`975793`), rascunho `[TC] Solitários - outubro 04` (`/email/23511919/edit`).

## Onde o agente trabalha

| Etapa | URL / UI |
|--------|-----------|
| Lista | `https://app.rdstation.com.br/emails` → aba **Rascunhos** |
| Campanha | `/email/{email_id}/` → bloco **Conteúdo** → **Editar** |
| Editor visual | `/email/{email_id}/edit` → iframe **Beefree** (`app.getbee.io`) |

Recomenda-se um **rascunho de trabalho** (ex.: prefixo `[TC]`) usado só para subir imagens. Não é obrigatório salvar o layout após os uploads; o que importa é o mapeamento em `imagens-urls.yaml`.

## Fluxo manual (referência para o agente)

1. Abrir `/email/{id}/edit` e aguardar o iframe Beefree carregar.
2. Na aba **CONTEÚDO** (barra lateral), **arrastar** o bloco **Imagem** para uma **linha vazia** no topo do e-mail (área `.drop-target` no stage).
3. Clicar no módulo **Imagem** recém-inserido.
4. No painel **DADOS DA IMAGEM**:
   - **Add image** ou zona **Solte o arquivo aqui** → **Procurar**
   - Selecionar o arquivo local (`emails/{slug}/imagens/...`).
5. Após o upload, **copiar a URL**:
   - Campo **Url** no painel (quando preenchido), **ou**
   - `src` da imagem no módulo selecionado (`https://d335luupugsy2.cloudfront.net/cms/files/975793/...`), **ou**
   - Resposta do POST em `rdstation-static.s3.amazonaws.com` (ver abaixo).
6. Repetir para cada arquivo; gravar `imagens-urls.yaml`.
7. (Opcional) Apagar os blocos **Imagem** temporários do rascunho antes de salvar.
8. Rodar `python scripts/build_email_rd.py emails/{slug}`.

## Automação Playwright (agente)

### Iframe

Todo o editor visual está em:

```text
page.frames().find(f => f.url().includes('getbee.io'))
```

Interações de arrastar/clicar/upload devem usar esse **frame**, não a LP.

### Arrastar bloco Imagem

| Seletor | Uso |
|---------|-----|
| `[data-qa="sidebar-draggable"][aria-label="Imagem"]` | Origem do drag (sidebar) |
| `.drop-target` (primeiro no topo) | Destino no stage |

`dragTo` entre frames costuma falhar; preferir **mouse** (`move` → `down` → `move` → `up`) com `boundingBox()` da origem e do destino.

### Upload

1. Clicar no último `.module-box--image`.
2. Clicar **Procurar** (texto exato) ou botão **Add image**.
3. Enviar arquivo:
   - `bee.locator('input[type="file"]').first().setInputFiles(path)` quando o input existir no iframe, **ou**
   - `page.waitForEvent('filechooser')` + clique em **Procurar** (varia por versão do Beefree).
4. Aguardar processamento (3–15 s).

### Obter a URL (ordem de preferência)

1. **UI — campo Url** no painel do módulo Imagem (`input` com valor `https://...cloudfront.net/...`).
2. **UI — `src` do `<img>`** dentro do `.module-box--image` selecionado.
3. **Rede — interceptar S3** (backup):

```javascript
const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";
function s3XmlToCloudFront(xml) {
  const key = (xml.match(/<Key>([^<]+)<\/Key>/) || [])[1];
  return key ? `${CLOUDFRONT}/${key}` : null;
}
page.waitForResponse(
  (r) =>
    r.url().includes("rdstation-static.s3.amazonaws.com") &&
    r.request().method() === "POST",
  { timeout: 120000 }
);
```

Helper local: `scripts/rd-s3-key-to-cloudfront.js`.

### O que foi validado no teste (2026-10-23)

- Editor em `/email/23511919/edit` com iframe `getbee.io`.
- Sidebar com tile **Imagem** (`data-qa="sidebar-draggable"`, `aria-label="Imagem"`).
- Drag para o stage cria módulo `.module-box--image` (contagem de módulos aumentou).
- Painel lateral exibe **DADOS DA IMAGEM**, **Add image**, **Url**, **Procurar** / drop zone.
- Imagens já no e-mail usam CDN `d335luupugsy2.cloudfront.net/cms/files/975793/...`.
- Upload automatizado pode exigir `filechooser` ou `input[type=file]` no iframe; sempre confirmar URL pelo painel ou `src` antes de gravar o YAML.

### O que não fazer

- Abrir `landing-pages/.../editar` para upload de assets de **e-mail**.
- Usar `.bricks-image` de LP como atalho (fluxo legado — removido).

## Saída no repositório

`emails/{slug}/imagens-urls.yaml`:

```yaml
uploaded_at: 2026-10-23T...
upload_via: email-editor-beefree
email_draft_id: 23511919  # rascunho de trabalho usado no teste
cdn_base: https://d335luupugsy2.cloudfront.net
account_id: 975793
files:
  01_logo.png: https://d335luupugsy2.cloudfront.net/cms/files/...
```

Atualizar `meta.yaml`: `imagens_publicadas: true`.

## Referências

- Skill: `.cursor/skills/rd-station-email-images-upload/SKILL.md`
- Script: `scripts/playwright-rd-upload-email-images.js`
- Regra: `.cursor/rules/alice-penteado-rd-emails.mdc`
