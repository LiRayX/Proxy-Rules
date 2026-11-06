/*
 * COTTI Coffee WeChat Mini Program - request ad filter for Loon
 * Based on Zirawell's cotti.js (https://github.com/zirawell/R-Store)
 * Original source: https://raw.githubusercontent.com/zirawell/R-Store/main/Res/Scripts/AntiAd/cotti.js
 * Requires Loon Build 988+ for native AES API.
 */

const BLOCK_CODES = new Set([
  "new-float-common",
  "new-cotti-window-common",
  "cotti-order-share-window",
  "cotti-order-share-float",
  "cotti-launch-window"
]);

function base64ToBytes(input) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const value = String(input).replace(/\s/g, "").replace(/=+$/, "");
  if (!value || value.length % 4 === 1 || /[^A-Za-z0-9+/]/.test(value)) {
    throw new Error("Invalid base64 ciphertext");
  }
  const result = [];
  let buffer = 0;
  let bits = 0;
  for (const ch of value) {
    buffer = (buffer << 6) | alphabet.indexOf(ch);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      result.push((buffer >>> bits) & 255);
      buffer &= (1 << bits) - 1;
    }
  }
  return new Uint8Array(result);
}

function utf8Bytes(text) {
  return new Uint8Array(Array.from(text, c => c.charCodeAt(0)));
}

function decodeUtf8(bytes) {
  if (typeof TextDecoder !== "undefined") return new TextDecoder("utf-8").decode(bytes);
  return decodeURIComponent(Array.from(bytes, b => "%" + b.toString(16).padStart(2, "0")).join(""));
}

function main() {
  try {
    if (!$request.body) return $done({});
    const body = typeof $request.body === "string"
      ? $request.body
      : decodeUtf8($request.body);
    const payload = JSON.parse(body);
    if (!payload || typeof payload.data !== "string") return $done({});
    if (typeof $crypto === "undefined" || !$crypto.aes || !$crypto.aes.decrypt) {
      console.log("[COTTI] Loon Build 988+ required; request passed through");
      return $done({});
    }

    const plaintext = $crypto.aes.decrypt(base64ToBytes(payload.data), {
      mode: "cbc",
      key: utf8Bytes("7ji3kjfy6p1jd7f6"),
      iv: utf8Bytes("9f7hks63hj49d7b6"),
      padding: "pkcs7"
    });
    const decoded = JSON.parse(decodeUtf8(plaintext));
    if (BLOCK_CODES.has(decoded.code)) {
      console.log("[COTTI] Blocked mini-program ad: " + decoded.code);
      return $done({
        response: {
          status: 404,
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: "{}"
        }
      });
    }
  } catch (error) {
    console.log("[COTTI] Decryption/parse failed, passing request: " + error.message);
  }
  return $done({});
}

main();
