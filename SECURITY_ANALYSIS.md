# Security Analysis for OpenClaw Sarvam Provider

## 🔒 Security Assessment Overview

**Package Version:** 1.0.0
**Assessment Date:** 2025-03-18
**Risk Level:** Medium
**Overall Rating:** 7/10 (Good with recommendations)

---

## ⚠️ Identified Security Issues

### 🔴 High Priority Issues

#### 1. API Key Exposure in Error Messages
**Location:** `src/sarvam-provider.ts` line 192
**Severity:** High
**Risk:** API keys may be logged in error messages

```typescript
// Current implementation (VULNERABLE)
throw new Error(
  `Sarvam API error: ${response.status} ${response.statusText} - ${errorText}`
);
```

**Issue:** If the API returns error details containing the API key, it will be exposed in logs.

**Recommendation:**
```typescript
// Fixed implementation
const safeErrorText = errorText.replace(/api[_-]?key[=:]\s*[^\s,}]+/gi, '[REDACTED]');
throw new Error(
  `Sarvam API error: ${response.status} ${response.statusText} - ${safeErrorText}`
);
```

---

### 🟡 Medium Priority Issues

#### 2. No HTTP Request Timeout
**Location:** `src/sarvam-provider.ts` lines 178, 209
**Severity:** Medium
**Risk:** Potential for hanging requests, DoS vulnerability

**Issue:** Fetch requests have no timeout, which could lead to:
- Resource exhaustion
- Hanging connections
- Service disruption

**Recommendation:**
```typescript
import { setTimeout } from 'node:timers/promises';

const response = await Promise.race([
  fetch(`${finalConfig.baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": finalConfig.apiKey,
    },
    body: JSON.stringify({
      ...request,
      model: request.model || finalConfig.model,
    }),
    signal: AbortSignal.timeout(60000), // 60 second timeout
  }),
  setTimeout(60000, null)
]);
```

#### 3. No Input Validation for Model IDs
**Location:** `src/sarvam-provider.ts` line 186
**Severity:** Medium
**Risk:** Potential for injection attacks, unexpected behavior

**Issue:** Model IDs are used directly without validation.

**Recommendation:**
```typescript
const ALLOWED_MODELS = ['sarvam-lite', 'sarvam-m', 'sarvam-pro'];

function validateModelId(modelId: string): boolean {
  // Support both formats: "sarvam-m" and "sarvam/sarvam-m"
  const normalizedId = modelId.replace('sarvam/', '');
  return ALLOWED_MODELS.includes(normalizedId);
}

// In chatCompletion function
if (request.model && !validateModelId(request.model)) {
  throw new Error(`Invalid model ID: ${request.model}. Allowed models: ${ALLOWED_MODELS.join(', ')}`);
}
```

#### 4. No HTTPS Enforcement for Custom Base URLs
**Location:** `src/sarvam-provider.ts` line 82
**Severity:** Medium
**Risk:** Man-in-the-middle attacks if users configure HTTP URLs

**Recommendation:**
```typescript
function validateBaseURL(url: string): void {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      throw new Error('Base URL must use HTTPS for security');
    }
  } catch (error) {
    throw new Error(`Invalid base URL: ${url}`);
  }
}

// In config processing
if (config.baseURL) {
  validateBaseURL(config.baseURL);
}
```

#### 5. No Message Length Limits
**Location:** `src/sarvam-provider.ts` interface `SarvamRequest`
**Severity:** Medium
**Risk:** Resource exhaustion, API abuse

**Issue:** No limits on message content length.

**Recommendation:**
```typescript
const MAX_MESSAGE_LENGTH = 32000; // 32K tokens limit
const MAX_TOTAL_CONTENT = 100000; // 100K characters

function validateRequestMessages(messages: SarvamRequest['messages']): void {
  let totalContentLength = 0;
  for (const msg of messages) {
    totalContentLength += msg.content.length;
    if (msg.content.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`);
    }
  }
  if (totalContentLength > MAX_TOTAL_CONTENT) {
    throw new Error(`Total content exceeds maximum length of ${MAX_TOTAL_CONTENT} characters`);
  }
}
```

---

### 🟢 Low Priority Issues

#### 6. Strict API Key Validation
**Location:** `src/sarvam-provider.ts` `validateSarvamApiKey` function
**Severity:** Low
**Risk:** False negatives, user frustration

**Issue:** UUID regex validation may reject valid API key formats.

**Recommendation:**
```typescript
export function validateSarvamApiKey(apiKey: string): boolean {
  // More flexible validation
  const trimmed = apiKey.trim();
  if (trimmed.length < 10 || trimmed.length > 100) {
    return false;
  }

  // Allow various formats including UUID-like patterns
  const patterns = [
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, // UUID
    /^[A-Za-z0-9_-]{20,}$/, // Alphanumeric with underscores/dashes
    /^sk-[A-Za-z0-9_-]+$/, // Standard API key format
  ];

  return patterns.some(pattern => pattern.test(trimmed));
}
```

#### 7. No Rate Limiting
**Location:** `src/sarvam-provider.ts`
**Severity:** Low
**Risk:** API quota exhaustion, cost overruns

**Recommendation:** Implement client-side rate limiting
```typescript
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async acquire(): Promise<void> {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.windowMs - (now - this.requests[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.requests.push(now);
  }
}

// Use in provider
const rateLimiter = new RateLimiter(60, 60000); // 60 requests per minute

async chatCompletion(config: SarvamConfig, request: SarvamRequest): Promise<SarvamResponse> {
  await rateLimiter.acquire();
  // ... rest of implementation
}
```

---

## ✅ Security Strengths

1. **Environment Variable Support**: API keys via environment variables (industry standard)
2. **Type Safety**: TypeScript provides compile-time type checking
3. **HTTPS Default**: Uses HTTPS by default for API communications
4. **Input Validation**: Basic API key format validation
5. **Error Handling**: Proper error throwing and handling
6. **Plugin Architecture**: Follows OpenClaw's security model

---

## 🛡️ Recommended Security Enhancements

### Priority 1 (Implement Immediately)
1. ✅ Remove API key exposure in error messages
2. ✅ Add HTTP request timeouts
3. ✅ Implement model ID validation

### Priority 2 (Implement Soon)
4. ✅ Add HTTPS enforcement for custom URLs
5. ✅ Implement message length limits
6. ✅ Improve API key validation flexibility

### Priority 3 (Consider for Future)
7. ✅ Add rate limiting
8. ✅ Implement request/response logging (with sensitive data redaction)
9. ✅ Add request/response sanitization
10. ✅ Implement retry logic with exponential backoff

---

## 🔐 Best Practices for Users

1. **Never commit API keys** to version control
2. **Use environment variables** for API key storage
3. **Rotate API keys** regularly
4. **Monitor API usage** for unusual activity
5. **Use HTTPS only** for custom base URLs
6. **Limit message lengths** to prevent resource exhaustion
7. **Use appropriate models** for your use case to minimize costs

---

## 🚨 Security Checklist

- [ ] API keys never exposed in logs/error messages
- [ ] All HTTP requests have timeouts
- [ ] Model IDs are validated against allowlist
- [ ] Custom base URLs enforce HTTPS
- [ ] Message length limits implemented
- [ ] Rate limiting in place
- [ ] Input sanitization for all user inputs
- [ ] Error messages don't leak sensitive information
- [ ] Dependencies regularly audited
- [ ] Security testing performed

---

## 📊 Risk Assessment Matrix

| Issue | Severity | Likelihood | Impact | Priority |
|-------|----------|------------|---------|----------|
| API Key Exposure | High | Medium | High | P1 |
| No Timeout | Medium | High | Medium | P1 |
| No Model Validation | Medium | Low | Medium | P1 |
| No HTTPS Enforcement | Medium | Low | High | P2 |
| No Length Limits | Medium | Medium | Medium | P2 |
| Strict Key Validation | Low | Medium | Low | P3 |
| No Rate Limiting | Low | Low | Low | P3 |

---

## 📝 Conclusion

The OpenClaw Sarvam Provider follows good security practices but has some areas that need improvement. The identified issues are not critical but should be addressed to enhance security posture.

**Immediate Actions:**
1. Implement error message sanitization
2. Add request timeouts
3. Validate model IDs

**Future Enhancements:**
1. Add rate limiting
2. Implement comprehensive input validation
3. Add security testing to CI/CD

**Overall Security Score:** 7/10 - Good with recommended improvements

---

**Questions?** Open an issue at [GitHub Issues](https://github.com/your-username/openclaw-sarvam-provider/issues)