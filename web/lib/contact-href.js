/**
 * Build a dial/text href for a resource phone field.
 * Short SMS codes (741741) must use sms:; N11/988 voice codes use tel:.
 *
 * @param {{ phone?: string | null, contactMethod?: string | null, smsBody?: string | null }} resource
 * @returns {{ href: string, label: string, kind: "sms" | "tel" } | null}
 */
export function contactHref(resource) {
  const raw = String(resource?.phone || "");
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  const voiceShortCodes = new Set([
    "911",
    "988",
    "211",
    "311",
    "411",
    "511",
    "611",
    "711",
    "811",
  ]);

  const forceSms = resource?.contactMethod === "sms";
  const looksLikeSmsShortCode =
    !forceSms &&
    digits.length <= 6 &&
    digits.length >= 5 &&
    !voiceShortCodes.has(digits);

  if (forceSms || looksLikeSmsShortCode) {
    const body = resource?.smsBody
      ? `?body=${encodeURIComponent(resource.smsBody)}`
      : "";
    return {
      href: `sms:${digits}${body}`,
      label: `Text ${raw}`,
      kind: "sms",
    };
  }

  return {
    href: `tel:${digits}`,
    label: `Call ${raw}`,
    kind: "tel",
  };
}
