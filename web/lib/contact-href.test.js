import { describe, expect, it } from "vitest";
import { contactHref } from "./contact-href.js";

describe("contactHref", () => {
  it("uses sms for Crisis Text Line short code", () => {
    const c = contactHref({
      phone: "741741",
      contactMethod: "sms",
      smsBody: "HOME",
    });
    expect(c.href).toBe("sms:741741?body=HOME");
    expect(c.kind).toBe("sms");
  });

  it("infers sms for 5–6 digit short codes without contactMethod", () => {
    expect(contactHref({ phone: "741741" }).href).toBe("sms:741741");
    expect(contactHref({ phone: "233733" }).kind).toBe("sms");
  });

  it("keeps voice N11 / 988 as tel:", () => {
    expect(contactHref({ phone: "211" }).href).toBe("tel:211");
    expect(contactHref({ phone: "988" }).href).toBe("tel:988");
    expect(contactHref({ phone: "911" }).href).toBe("tel:911");
  });

  it("uses tel for standard phone numbers", () => {
    expect(contactHref({ phone: "1-800-388-3888" }).href).toBe("tel:18003883888");
  });

  it("returns null without a phone", () => {
    expect(contactHref({})).toBeNull();
  });
});
