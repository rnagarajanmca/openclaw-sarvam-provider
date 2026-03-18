import { describe, it, expect, beforeAll } from "vitest";
import {
  buildSarvamProvider,
  validateSarvamApiKey,
  getSarvamApiKeyFromEnv,
  type SarvamRequest,
} from "../src/sarvam-provider.js";

describe("Sarvam Provider", () => {
  describe("validateSarvamApiKey", () => {
    it("should validate valid UUID-like API keys", () => {
      const validKeys = [
        "123e4567-e89b-12d3-a456-426614174000",
        "ABC12345-DEF6-7890-GHIJ-KLMN0PQR9STU",
      ];
      validKeys.forEach((key) => {
        expect(validateSarvamApiKey(key)).toBe(true);
      });
    });

    it("should reject invalid API keys", () => {
      const invalidKeys = [
        "",
        "not-a-uuid",
        "123456",
        "simple-string",
      ];
      invalidKeys.forEach((key) => {
        expect(validateSarvamApiKey(key)).toBe(false);
      });
    });
  });

  describe("buildSarvamProvider", () => {
    it("should create provider with correct configuration", () => {
      const provider = buildSarvamProvider();
      expect(provider.id).toBe("sarvam");
      expect(provider.label).toBe("Sarvam");
      expect(provider.defaultModel).toBe("sarvam/sarvam-m");
    });

    it("should include Sarvam M model in models list", () => {
      const provider = buildSarvamProvider();
      const sarvamMModel = provider.models.find(
        (model) => model.id === "sarvam/sarvam-m"
      );
      expect(sarvamMModel).toBeDefined();
      expect(sarvamMModel?.capabilities.text).toBe(true);
      expect(sarvamMModel?.capabilities.streaming).toBe(true);
    });
  });

  describe("chatCompletion", () => {
    it("should throw error for invalid API key", async () => {
      const provider = buildSarvamProvider();
      const config = {
        apiKey: "invalid-api-key",
        baseURL: "https://api.sarvam.ai",
      };

      const request: SarvamRequest = {
        messages: [{ role: "user", content: "Hello" }],
        model: "sarvam-m",
      };

      await expect(provider.chatCompletion(config, request)).rejects.toThrow();
    });

    // Integration test - requires valid API key
    it.skip("should successfully complete chat with valid API key", async () => {
      const apiKey = getSarvamApiKeyFromEnv();
      if (!apiKey) {
        console.warn("Skipping integration test - SARVAM_API_KEY not set");
        return;
      }

      const provider = buildSarvamProvider();
      const config = {
        apiKey,
        baseURL: "https://api.sarvam.ai",
      };

      const request: SarvamRequest = {
        messages: [{ role: "user", content: "Say hello" }],
        model: "sarvam-m",
      };

      const response = await provider.chatCompletion(config, request);
      expect(response.choices).toHaveLength(1);
      expect(response.choices[0].message.content).toBeTruthy();
    });
  });

  describe("chatCompletionStream", () => {
    it("should create stream generator", async () => {
      const provider = buildSarvamProvider();
      const config = {
        apiKey: "test-key",
        baseURL: "https://api.sarvam.ai",
      };

      const request: SarvamRequest = {
        messages: [{ role: "user", content: "Hello" }],
        model: "sarvam-m",
        stream: true,
      };

      const stream = provider.chatCompletionStream(config, request);
      expect(stream).toBeDefined();
      expect(typeof stream[Symbol.asyncIterator]).toBe("function");
    });
  });
});

describe("Utility Functions", () => {
  describe("getSarvamApiKeyFromEnv", () => {
    it("should return API key from environment", () => {
      const testKey = "123e4567-e89b-12d3-a456-426614174000";
      process.env.SARVAM_API_KEY = testKey;
      expect(getSarvamApiKeyFromEnv()).toBe(testKey);
      delete process.env.SARVAM_API_KEY;
    });

    it("should return undefined when environment variable not set", () => {
      delete process.env.SARVAM_API_KEY;
      expect(getSarvamApiKeyFromEnv()).toBeUndefined();
    });
  });
});