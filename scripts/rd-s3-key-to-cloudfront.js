#!/usr/bin/env node
/**
 * Converte Key do POST S3 (XML ou string) em URL CloudFront do RD Station.
 * Uso: node scripts/rd-s3-key-to-cloudfront.js "cms/files/123/hash"
 *      node scripts/rd-s3-key-to-cloudfront.js --xml '<PostResponse><Key>...</Key></PostResponse>'
 */
const CLOUDFRONT = "https://d335luupugsy2.cloudfront.net";

function keyFromInput(input) {
  const trimmed = input.trim();
  if (trimmed.includes("<Key>")) {
    const m = trimmed.match(/<Key>([^<]+)<\/Key>/);
    return m ? m[1] : null;
  }
  return trimmed.replace(/^\//, "");
}

const arg = process.argv.slice(2).join(" ");
if (!arg) {
  console.error("Informe a Key ou XML do S3.");
  process.exit(1);
}

const key = keyFromInput(arg);
if (!key) {
  console.error("Key não encontrada.");
  process.exit(1);
}

console.log(`${CLOUDFRONT}/${key}`);
