// Import openclaw dependencies with fallback
let definePluginEntry: any;
let createProviderApiKeyAuthMethod: any;
let ProviderAuthResult: any;

try {
  const openclawCore = require("openclaw/plugin-sdk/core");
  const openclawAuth = require("openclaw/plugin-sdk/provider-auth");
  definePluginEntry = openclawCore.definePluginEntry;
  createProviderApiKeyAuthMethod = openclawAuth.createProviderApiKeyAuthMethod;
  ProviderAuthResult = openclawAuth.ProviderAuthResult;
} catch (e) {
  // Fallback for when openclaw is not installed
  definePluginEntry = (config: any) => config;
  createProviderApiKeyAuthMethod = (config: any) => config;
  ProviderAuthResult = class {};
}

import { buildSarvamProvider, getSarvamApiKeyFromEnv, validateSarvamApiKey } from "./sarvam-provider.js";

// Define ProviderAuthResult type for local use
export type ProviderAuthResultType = {
  providerId: string;
  methodId: string;
  config: any;
};

/**
 * Sarvam Plugin Entry Point
 *
 * This plugin provides Sarvam integration for OpenClaw,
 * featuring wiki_grounding for enhanced factual accuracy and
 * strong support for Indian languages.
 */
export default definePluginEntry({
  id: "sarvam",
  name: "Sarvam Provider",
  description: "Sarvam provider with wiki_grounding support and strong Indian language capabilities",
  version: "1.0.0",

  register(api) {
    // Register Sarvam as a provider
    api.registerProvider({
      id: "sarvam",
      label: "Sarvam",
      docsPath: "https://docs.sarvam.ai/api-reference-docs/chat/chat-completions",
      envVars: ["SARVAM_API_KEY"],

      // Authentication methods
      auth: [
        createProviderApiKeyAuthMethod({
          providerId: "sarvam",
          methodId: "api-key",
          label: "Sarvam API key",
          hint: "Get your API key from https://docs.sarvam.ai",
          optionKey: "sarvamApiKey",
          flagName: "--sarvam-api-key",
          envVar: "SARVAM_API_KEY",
          promptMessage: "Enter Sarvam API key",
          defaultModel: "sarvam/sarvam-m",
          expectedProviders: ["sarvam"],
          validate: validateSarvamApiKey,
          wizard: {
            choiceId: "sarvam-api-key",
            choiceLabel: "Sarvam API key",
            groupId: "sarvam",
            groupLabel: "Sarvam",
            groupHint: "Indian language models with wiki_grounding and strong multilingual support",
          },
        }),
      ],

      // Model configuration
      defaultModel: "sarvam/sarvam-m",
      models: buildSarvamProvider().models,

      // Request handling
      async chatCompletion(ctx) {
        const config = ctx.auth;
        const request = ctx.request;
        const provider = buildSarvamProvider();
        return provider.chatCompletion(config, request);
      },

      // Streaming support
      wrapStreamFn: (ctx) => buildSarvamProvider().createStreamWrapper(ctx.streamFn),
    });

    // Register CLI provider for easy setup
    api.registerCliProvider({
      providerId: "sarvam",
      setupCommand: "setup",
      setupDescription: "Configure Sarvam provider",
      async setup(ctx) {
        const apiKey =
          ctx.options?.sarvamApiKey ||
          getSarvamApiKeyFromEnv() ||
          (await ctx.prompt("Enter Sarvam API key:"));

        if (!apiKey) {
          throw new Error("Sarvam API key is required");
        }

        if (!validateSarvamApiKey(apiKey)) {
          throw new Error("Invalid Sarvam API key format");
        }

        const config = {
          apiKey,
          baseURL: "https://api.sarvam.ai/v1",
          model: "sarvam-m",
        };

        ctx.log.info("Sarvam provider configured successfully!");
        ctx.log.info("Default model: sarvam/sarvam-m");
        ctx.log.info(
          "Wiki grounding: available (enable via wiki_grounding: true in request)",
        );

        return {
          providerId: "sarvam",
          methodId: "api-key",
          config,
        } as ProviderAuthResultType;
      },
    });
  },
});

// Export types and utilities for external use
export * from "./sarvam-provider.js";