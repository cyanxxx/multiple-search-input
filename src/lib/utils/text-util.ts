export function sanitize(text: string) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
