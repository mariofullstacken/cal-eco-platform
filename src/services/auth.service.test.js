import { normalizeAuthResponse } from "./auth.utils";

describe("normalizeAuthResponse", () => {
  it("maps authToken to access_token", () => {
    const input = { authToken: "token-123", id: 1 };
    const result = normalizeAuthResponse(input);
    expect(result.access_token).toBe("token-123");
    expect(result.id).toBe(1);
  });

  it("keeps existing access_token when provided", () => {
    const input = { access_token: "token-abc", authToken: "token-xyz" };
    const result = normalizeAuthResponse(input);
    expect(result.access_token).toBe("token-abc");
  });

  it("returns empty access_token for null input", () => {
    const result = normalizeAuthResponse(null);
    expect(result.access_token).toBe("");
  });
});
