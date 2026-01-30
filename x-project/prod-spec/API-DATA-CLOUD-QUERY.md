# Data Cloud Query Connect API - Developer Documentation

## Overview

REST API for querying Salesforce Data Cloud consumption metrics including:
- **Einstein AI Requests** - Token usage, request counts by model/feature/user
- **Flex Credits** - Daily/monthly consumption by card type and usage type

**Base URL**: `https://synaptic.my.salesforce.com`
**Endpoint**: `/services/apexrest/datacloud/consumption`

---

## Authentication

The API uses **OAuth 2.0 Client Credentials Flow**.

### Step 1: Get Salesforce Access Token

```bash
curl -X POST "https://synaptic.my.salesforce.com/services/oauth2/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

**Response:**
```json
{
  "access_token": "00D...",
  "instance_url": "https://synaptic.my.salesforce.com",
  "token_type": "Bearer"
}
```

### Step 2: Use Token in API Calls

Include the token in the `Authorization` header:
```
Authorization: Bearer 00D...
```

---

## Endpoints

### POST /services/apexrest/datacloud/consumption

Execute a query using a template or raw SQL.

#### Request Headers
| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {access_token}` |
| `Content-Type` | `application/json` |

#### Request Body (Template Mode - Recommended)

```json
{
  "template": "EINSTEIN_REQUESTS_DAILY",
  "params": {
    "startDate": "2026-01-01",
    "endDate": "2026-01-21"
  }
}
```

#### Request Body (Raw SQL Mode)

```json
{
  "sql": "SELECT feature__c, COUNT(*) as cnt FROM GenAIGatewayRequest__dlm GROUP BY feature__c",
  "maxRows": 500
}
```

#### Response

```json
{
  "success": true,
  "queryId": "abc123-def456",
  "rowCount": 10,
  "data": [
    {
      "request_date": "2026-01-14",
      "model__c": "gpt-4.1-2025-04-14",
      "request_count": 278,
      "total_tokens": "1263619.000000000000000000"
    }
  ],
  "hasMoreRows": false,
  "nextBatchId": null,
  "errorMessage": null
}
```

---

## Available Query Templates

### Einstein AI Requests

| Template | Description | Returns |
|----------|-------------|---------|
| `EINSTEIN_REQUESTS_DAILY` | Daily AI requests by model | `request_date`, `model__c`, `request_count`, `total_tokens` |
| `EINSTEIN_REQUESTS_MONTHLY` | Monthly aggregated requests | `month_num`, `year_num`, `request_count`, `total_tokens` |
| `EINSTEIN_BY_FEATURE` | Usage by Einstein feature | `feature__c`, `request_count`, `total_tokens`, `prompt_tokens`, `completion_tokens` |
| `EINSTEIN_BY_USER` | Usage by user ID | `userId__c`, `request_count`, `total_tokens` |

### Flex Credits Consumption

| Template | Description | Returns |
|----------|-------------|---------|
| `CREDITS_DAILY` | Daily credits by card and usage type | `consumption_date`, `card`, `usage_type`, `total_credits` |
| `CREDITS_MONTHLY` | Monthly credits summary | `month_num`, `year_num`, `card`, `total_credits` |
| `CREDITS_BY_CARD` | Total credits per card | `card`, `total_credits` |
| `CREDITS_BY_TYPE` | Credits by usage type with multipliers | `usage_type`, `card`, `total_credits`, `raw_usage`, `avg_multiplier` |

### Required Parameters

All templates require:
- `startDate` - Start of date range (YYYY-MM-DD)
- `endDate` - End of date range (YYYY-MM-DD)

---

## Example Requests

### 1. Get Daily Einstein AI Usage (Last 7 Days)

```bash
curl -X POST "https://synaptic.my.salesforce.com/services/apexrest/datacloud/consumption" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "EINSTEIN_REQUESTS_DAILY",
    "params": {
      "startDate": "2026-01-14",
      "endDate": "2026-01-21"
    }
  }'
```

**Sample Response:**
```json
{
  "success": true,
  "rowCount": 10,
  "data": [
    {
      "request_date": "2026-01-14",
      "model__c": "gpt-4.1-2025-04-14",
      "request_count": 278,
      "total_tokens": "1263619.000000000000000000"
    },
    {
      "request_date": "2026-01-15",
      "model__c": "gpt-4.1-2025-04-14",
      "request_count": 312,
      "total_tokens": "1456821.000000000000000000"
    }
  ]
}
```

### 2. Get Daily Flex Credits Consumption

```bash
curl -X POST "https://synaptic.my.salesforce.com/services/apexrest/datacloud/consumption" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "CREDITS_DAILY",
    "params": {
      "startDate": "2026-01-14",
      "endDate": "2026-01-21"
    }
  }'
```

**Sample Response:**
```json
{
  "success": true,
  "rowCount": 43,
  "data": [
    {
      "consumption_date": "2026-01-20",
      "card": "EinsteinAI_Einstein1",
      "usage_type": "EinsteinAI_Standard",
      "total_credits": "13590.000000000000000000"
    },
    {
      "consumption_date": "2026-01-20",
      "card": "PlatformServices",
      "usage_type": "DataCloud_Query",
      "total_credits": "250.000000000000000000"
    }
  ]
}
```

### 3. Get Monthly Summary

```bash
curl -X POST "https://synaptic.my.salesforce.com/services/apexrest/datacloud/consumption" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "CREDITS_MONTHLY",
    "params": {
      "startDate": "2026-01-01",
      "endDate": "2026-01-31"
    }
  }'
```

### 4. Raw SQL Query (Advanced)

```bash
curl -X POST "https://synaptic.my.salesforce.com/services/apexrest/datacloud/consumption" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sql": "SELECT feature__c, model__c, COUNT(*) as cnt FROM GenAIGatewayRequest__dlm WHERE timestamp__c >= '\''2026-01-01'\'' GROUP BY feature__c, model__c ORDER BY cnt DESC",
    "maxRows": 100
  }'
```

---

## Pagination

For large result sets, use the `nextBatchId` for pagination:

### Check if more rows exist:
```json
{
  "hasMoreRows": true,
  "nextBatchId": "batch-xyz-123"
}
```

### Get next batch:
```bash
GET /services/apexrest/datacloud/consumption/{queryId}?nextBatchId=batch-xyz-123
```

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "errorMessage": "Description of the error"
}
```

### Common Errors

| Status | Error | Solution |
|--------|-------|----------|
| 400 | "Either template or sql must be provided" | Include `template` or `sql` in request body |
| 400 | "Invalid JSON in request body" | Check JSON syntax |
| 401 | Unauthorized | Refresh access token |
| 500 | "Query failed with status..." | Check SQL syntax or date format |

---

## Data Sources

The API queries these Data Cloud tables:

| Table | Description |
|-------|-------------|
| `GenAIGatewayRequest__dlm` | Einstein AI API call logs |
| `TenantDailyEntitlementConsumption__dll` | Flex Credits daily consumption |

---

## Permission Set

Users calling this API need the **Data_Cloud_Query_API** permission set assigned.

---

## Rate Limits

- Max 100 callouts per transaction
- Max 1000 rows per request (configurable via `maxRows`)
- OAuth tokens expire after 24 hours

---

## Quick Reference

### Available Templates

**Einstein:**
- `EINSTEIN_REQUESTS_DAILY`
- `EINSTEIN_REQUESTS_MONTHLY`
- `EINSTEIN_BY_FEATURE`
- `EINSTEIN_BY_USER`

**Flex Credits:**
- `CREDITS_DAILY`
- `CREDITS_MONTHLY`
- `CREDITS_BY_CARD`
- `CREDITS_BY_TYPE`

### Minimal Request

```json
{
  "template": "CREDITS_DAILY",
  "params": {
    "startDate": "2026-01-01",
    "endDate": "2026-01-31"
  }
}
```

---

*Last Updated: 2026-01-21*
