#!/usr/bin/env python3
"""Gera email-rd.html a partir de email.html + imagens-urls.yaml (URLs CloudFront)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Instale PyYAML: python -m pip install pyyaml", file=sys.stderr)
    raise SystemExit(1)

REPO = Path(__file__).resolve().parents[1]


def strip_picture_to_img(html: str) -> str:
    """RD: img único com URL absoluta (remove picture/source webp)."""
    pattern = re.compile(
        r"<picture>\s*<source[^>]+>\s*(<img[^>]+>)\s*</picture>",
        re.IGNORECASE | re.DOTALL,
    )
    return pattern.sub(r"\1", html)


def apply_urls(html: str, files: dict[str, str]) -> str:
    out = html
    for name, url in files.items():
        if not url or not str(url).startswith("http"):
            continue
        out = out.replace(f"imagens/{name}", url)
        stem = Path(name).stem
        for ext in (".webp", ".png", ".jpg", ".jpeg"):
            out = out.replace(f"imagens/{stem}{ext}", url)
    return out


def main() -> None:
    if len(sys.argv) != 2:
        print(f"Uso: {sys.argv[0]} <slug-da-pasta-em-emails/>", file=sys.stderr)
        raise SystemExit(2)

    slug = sys.argv[1].strip("/")
    folder = REPO / "emails" / slug
    email_html = folder / "email.html"
    mapping_yaml = folder / "imagens-urls.yaml"
    out_html = folder / "email-rd.html"

    if not email_html.is_file():
        raise SystemExit(f"Não encontrado: {email_html}")
    if not mapping_yaml.is_file():
        raise SystemExit(f"Não encontrado: {mapping_yaml}")

    data = yaml.safe_load(mapping_yaml.read_text(encoding="utf-8")) or {}
    files = data.get("files") or {}
    missing = [k for k, v in files.items() if not v or not str(v).startswith("http")]
    if missing:
        print("URLs ausentes em imagens-urls.yaml:", ", ".join(missing), file=sys.stderr)
        raise SystemExit(1)

    html = email_html.read_text(encoding="utf-8")
    html = apply_urls(html, files)
    html = strip_picture_to_img(html)
    out_html.write_text(html, encoding="utf-8")
    print(f"OK: {out_html.relative_to(REPO)}")


if __name__ == "__main__":
    main()
