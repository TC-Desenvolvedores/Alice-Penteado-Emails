# Newsletter Semanal — Bloom Sale, 2º envio (16/11/2026)

**Status: pronto para disparo** (HTML importado no RD em 16/11/2026). Falta só o agendamento manual para 23/11/2026.

Reforço da Black Friday. HTML V2 aprovado pela Alice, vindo do Drive (`bloom-sale-envio2.html`).

| Arquivo | Uso |
|---------|-----|
| `email.html` | HTML de trabalho (`imagens/...`) |
| `imagens/` | 3 imagens do Drive: 2 logos e o GIF principal (2 MB, 8 fotos) |
| `meta.yaml` | Assunto, preheader, data de disparo, rascunho RD |
| `email-rd.html` | Gerado depois do upload no RD |
| `imagens-urls.yaml` | Mapa arquivo → URL (após upload) |

Sem links de preview/descadastro no HTML — padrão RD. Ver [`docs/variaveis-rd.md`](../../docs/variaveis-rd.md).

## Disparo

- **Assunto:** Bloom Sale Alice Penteado: garanta a sua joia
- **Pré-header:** Condições especiais até o fim do mês.
- **Remetente:** Alice Penteado
- **Data:** segunda-feira 23/11/2026 (semana da Black Friday). O agendamento no RD é manual.

## Regras do pacote (LEIA-ME do Drive)

- Não alterar textos, cores, tamanhos de fonte nem espaçamentos. Os tamanhos de fonte foram aumentados de propósito.
- Não comprimir nem reconverter o GIF: as cores das joias foram ajustadas.
- O número 98452-8799 é o da campanha Bloom Sale e deve ser mantido.
- O catálogo no Google Drive precisa estar como “Qualquer pessoa com o link”.

## Checklist antes do disparo

- [ ] As 3 imagens aparecem (nenhum `src` apontando para `imagens/...`).
- [ ] O GIF anima no Gmail e no celular. No Outlook desktop aparece só o primeiro quadro, é normal.
- [ ] O catálogo abre sem pedir acesso.
- [ ] WhatsApp e Ateliê abrem a conversa com a mensagem pronta.
- [ ] Site e Instagram abrem os endereços certos.
- [ ] Assunto e pré-header conferidos.
- [ ] Os 4 canais do rodapé ficam em uma linha só no celular.

## Publicar no RD

1. Rascunho `[TC] Newsletter Bloom Sale Envio 2 - 2026-11-16` com as 3 imagens enviadas no editor Beefree.
2. `python scripts/build_email_rd.py newsletter-semanal-bloom-sale-envio2-2026-11-16`
3. Importar `email-rd.html` via URL raw: `https://raw.githubusercontent.com/TC-Desenvolvedores/Alice-Penteado-Emails/main/emails/newsletter-semanal-bloom-sale-envio2-2026-11-16/email-rd.html`

Checklist: [`docs/publicacao-rd-checklist.md`](../../docs/publicacao-rd-checklist.md).
