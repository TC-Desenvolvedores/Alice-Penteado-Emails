# Promocional — Joias (23/10/2026)

E-mail editorial promocional (sem desconto ou prazo definido). Origem: ZIP `alice_penteado_email_v2.zip`.

| Arquivo | Uso |
|---------|-----|
| `email.html` | HTML de trabalho (`imagens/...`) |
| `email-rd.html` | **Importar no RD** — CDN aplicado |
| `imagens-urls.yaml` | Mapa arquivo → URL CloudFront |
| `imagens/` | `hero-joias.jpg`, `detalhe-esmeraldas.jpg` |
| `origem-LEIA-ME.txt` | Notas do pacote original |

Sem links de preview/descadastro no HTML — padrão RD. Ver [`docs/variaveis-rd.md`](../../docs/variaveis-rd.md).

## Publicar no RD

1. **Criar rascunho** `[TC] Promocional Joias - 2026-10-23` — `docs/criar-rascunho-email-rd.md`.
2. **Upload das imagens** nesse rascunho; se falhar, LP temp + exclusão — `docs/upload-imagens-lp-temporaria-rd.md`.
3. Preencher **`imagens-urls.yaml`** com as URLs CloudFront.
4. Gerar HTML para o RD:
   ```bash
   python scripts/build_email_rd.py promocional-joias-2026-10-23
   ```
5. **Importar** HTML no rascunho `[TC]`: **Importar com HTML → Email Marketing**.
6. Assunto / preheader conforme `meta.yaml` → e-mail de teste.

Checklist: [`docs/publicacao-rd-checklist.md`](../../docs/publicacao-rd-checklist.md).
