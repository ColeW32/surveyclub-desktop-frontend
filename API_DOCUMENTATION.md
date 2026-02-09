# Survey Club API Documentation

> **Base URL:** `https://api.getsurvey.club`
>
> **OpenAPI Version:** 3.0.0
>
> **API Version:** 1.0

---

## Table of Contents

- [App](#app)
- [Integrity](#integrity)
- [Users](#users)
- [Earnings](#earnings)
- [Tasks](#tasks)
- [Withdrawals](#withdrawals)
- [Webhooks](#webhooks)
- [Offers](#offers)
- [Currency Sales](#currency-sales)
- [Surveys](#surveys)
- [Welcome Survey](#welcome-survey)
- [Missions](#missions)
- [Reddit](#reddit)
- [RevenueCat](#revenuecat)
- [Auth](#auth)
- [Admin Users](#admin-users)
- [Admin](#admin)
- [Analytics](#analytics)
- [Data Schemas](#data-schemas)

---

## App

### GET `/`

**Operation:** `AppController_getHello`

Returns a basic response (health check / root endpoint).

| Detail | Value |
|--------|-------|
| **Parameters** | None |
| **Response 200** | Success |

---

### GET `/health`

**Operation:** `AppController_getHealth`

Health check endpoint.

| Detail | Value |
|--------|-------|
| **Parameters** | None |
| **Response 200** | Success |

---

## Integrity

### POST `/integrity/verify-device`

**Operation:** `IntegrityController_verifyDevice`

Verifies the device integrity.

| Detail | Value |
|--------|-------|
| **Parameters** | None |
| **Response 201** | Device verified |

---

## Users

### GET `/users/{uid}`

**Summary:** Get user details

**Description:** Retrieves complete information about a specific user.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique user identifier | `5f9d1b2b3c4d5e6f7a8b9c0d` |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | User details retrieved successfully | [`UserResponseDto`](#userresponsedto) |
| **404** | User not found | - |

---

### POST `/users/{uid}`

**Summary:** Create new user

**Description:** Registers a new user in the system.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique user identifier (usually from auth system) | `5f9d1b2b3c4d5e6f7a8b9c0d` |

**Request Body:** [`CreateUserDto`](#createuserdto) (required, `application/json`)

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **201** | User created successfully | [`UserResponseDto`](#userresponsedto) |
| **400** | Invalid user data provided | - |
| **409** | User already exists | - |

---

### PATCH `/users/{uid}`

**Summary:** Update user information

**Description:** Partially updates user details.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique user identifier | `5f9d1b2b3c4d5e6f7a8b9c0d` |

**Request Body:** [`UpdateUserDto`](#updateuserdto) (required, `application/json`)

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | User updated successfully | [`UserResponseDto`](#userresponsedto) |
| **404** | User not found | - |

---

### DELETE `/users/{uid}`

**Summary:** Delete a user and all their data

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `uid` | path | Yes | string | The unique ID of the user to delete |
| `authorization` | header | Yes | string | Authorization token |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | User deleted successfully |
| **401** | Unauthorized: Token is invalid or does not match user ID |
| **404** | User not found |

---

### POST `/users/{uid}/restore`

**Summary:** Restore a soft-deleted user account

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `uid` | path | Yes | string | The unique ID of the user to restore |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | User restored successfully |
| **404** | User not found or not deleted |

---

### POST `/users/{uid}/complete-pure-spectrum-survey`

**Operation:** `UsersController_completePureSpectrumSurvey`

Marks a PureSpectrum survey as complete for a user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/users/{uid}/besitos-stats`

**Summary:** Get Besitos offer completion stats for a user

**Description:** Retrieves the number of completed Besitos offers for a specific user. This is a public endpoint.

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `uid` | path | Yes | string | Unique user identifier |

**Responses:**

| Status | Description | Body Example |
|--------|-------------|--------------|
| **200** | Successfully retrieved the count | `{ "count": 3 }` |
| **404** | User not found | - |

---

### GET `/users/{uid}/besitos-history/{offerId}`

**Summary:** Get Besitos offer purchase history for a user

**Description:** Checks if a user has already completed a purchase/deposit for a specific Besitos offer.

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `uid` | path | Yes | string | Unique user identifier |
| `offerId` | path | Yes | string | Unique identifier for the Besitos offer |

**Responses:**

| Status | Description | Body Example |
|--------|-------------|--------------|
| **200** | Successfully retrieved the history status | `{ "hasPurchaseOrDeposit": true }` |
| **404** | User not found | - |

---

### GET `/users/{uid}/besitos-offers`

**Summary:** Get Besitos offers for a user

**Description:** Fetches available and in-progress Besitos offers for a specific user. This endpoint proxies requests to the Besitos AI API.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |
| `device_platform` | query | Yes | string |
| `idfa` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/users/phone-verification/send`

**Summary:** Send phone verification code via Twilio

**Parameters:** None

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### POST `/users/{uid}/phone-verification/confirm`

**Summary:** Confirm OTP code and reward user

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### POST `/users/{uid}/pure-spectrum-postback`

**Summary:** Record PureSpectrum transaction for analytics

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Earnings

### POST `/earnings/{uid}/reward`

**Summary:** Reward a user

**Description:** Adds a reward to the user's earnings balance.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique ID of the user | `abc123` |

**Request Body:** [`RewardUserDto`](#rewarduserdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | User rewarded successfully |
| **400** | Invalid input data |

---

### GET `/earnings/{uid}`

**Summary:** Get user earnings

**Description:** Returns all earnings records for a user.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique ID of the user | `abc123` |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Earnings data retrieved successfully |
| **404** | User not found |

---

## Tasks

### GET `/tasks/{uid}`

**Summary:** Get all tasks for a user

**Description:** Retrieves a list of all tasks associated with the specified user ID.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique identifier of the user | `5f9d1b2b3c4d5e6f7a8b9c0d` |
| `isPreviewingPremium` | query | Yes | string | Whether user is previewing premium |  |
| `isPremium` | query | Yes | string | Whether user is premium |  |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | Array of tasks retrieved successfully | Array of [`TaskDto`](#taskdto) |
| **404** | User not found | - |

---

### GET `/tasks/{uid}/{taskId}`

**Summary:** Get a specific task by ID

**Description:** Retrieves a single task by its ID for the specified user.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique identifier of the user | `5f9d1b2b3c4d5e6f7a8b9c0d` |
| `taskId` | path | Yes | string | Unique identifier of the task | `5f9d1b2b3c4d5e6f7a8b9c0d` |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | Task retrieved successfully | [`TaskDto`](#taskdto) |
| **404** | Task or user not found | - |

---

### PATCH `/tasks/{uid}/{taskId}/complete`

**Summary:** Mark a task as completed

**Description:** Updates the task status to completed.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | Unique identifier of the user | `5f9d1b2b3c4d5e6f7a8b9c0d` |
| `taskId` | path | Yes | string | Unique identifier of the task | `task1` |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Task marked as completed successfully |
| **400** | Task is already completed |
| **404** | Task or user not found |

---

## Withdrawals

### POST `/withdrawals`

**Summary:** Request a new withdrawal. Supports both JSON (legacy) and multipart/form-data (with verification).

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `x-app-version` | header | Yes | string | Application version |

**Request Body:** [`RequestWithdrawalDto`](#requestwithdrawaldto) (required)

Supported content types:
- `application/json`
- `multipart/form-data` (for withdrawal data fields and optional images: `idImage`, `selfieImage`)

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **201** | Withdrawal request created successfully | [`WithdrawalDto`](#withdrawaldto) |
| **400** | Invalid input data or insufficient balance | - |
| **404** | User not found | - |

---

### GET `/withdrawals/{uid}`

**Summary:** Get all withdrawals for a user

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uid` | path | Yes | string | User ID | `user123` |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | List of withdrawals | Array of [`WithdrawalDto`](#withdrawaldto) |
| **400** | Invalid user ID | - |

---

## Webhooks

All webhook endpoints receive postback/callback data from third-party offer networks. They typically support both GET and POST methods.

### POST `/webhooks/besitos`

**Operation:** `WebhooksController_handleBesitos`

Handles Besitos webhook postbacks.

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/webhooks/besitos`

**Operation:** `WebhooksController_handleBesitosGET`

Handles Besitos webhook postbacks (GET variant).

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/webhooks/mychips`

**Operation:** `WebhooksController_handleMyChips`

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/webhooks/mychips`

**Operation:** `WebhooksController_handleMyChipsGET`

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/webhooks/adgem`

**Operation:** `WebhooksController_handleAdGemPost`

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/webhooks/adgem`

**Operation:** `WebhooksController_handleAdGem`

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/webhooks/adjoe`

**Operation:** `WebhooksController_handleAdJoePost`

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/webhooks/adjoe`

**Operation:** `WebhooksController_handleAdJoe`

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/webhooks/purespectrum/complete`

**Operation:** `WebhooksController_handlePureSpectrumComplete`

Handles PureSpectrum survey completion postback.

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/webhooks/revu`

**Operation:** `WebhooksController_handleRevuGet`

| Status | Description |
|--------|-------------|
| **200** | Success |

### POST `/webhooks/revu`

**Operation:** `WebhooksController_handleRevuPost`

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/webhooks/cpx-research`

**Operation:** `WebhooksController_handleCpxResearchGet`

| Status | Description |
|--------|-------------|
| **200** | Success |

### POST `/webhooks/cpx-research`

**Operation:** `WebhooksController_handleCpxResearchPost`

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/webhooks/tapresearch`

**Operation:** `WebhooksController_tapresearch`

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/webhooks/cpx-offerwall`

**Operation:** `WebhooksController_getCpxOfferwallUrl`

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | query | Yes | string |

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/webhooks/inmarket`

**Operation:** `WebhooksController_handleInMarket`

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/webhooks/sync-besitos`

**Operation:** `WebhooksController_syncBesitosReward`

Synchronizes Besitos reward data.

**Request Body:** [`SyncBesitosRewardDto`](#syncbesitosrewarddto) (required, `application/json`)

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/webhooks/direct-offer`

**Operation:** `WebhooksController_handleDirectOfferGet`

| Status | Description |
|--------|-------------|
| **200** | Success |

### POST `/webhooks/direct-offer`

**Operation:** `WebhooksController_handleDirectOfferPost`

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Offers

### GET `/offers/featured`

**Summary:** Get a sorted list of featured offers

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `limit` | query | No | number | The maximum number of offers to return | `50` |
| `country` | query | No | string | The user's country (ISO 2 code) | `US` |
| `platform` | query | No | string | The user's platform. Enum: `ios`, `android`, `web` | `ios` |
| `userId` | query | Yes | string | The unique ID of the user | `u7lYe9Y8PTQ3Dv6Heju2irIlMJy2` |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | A successful response containing the list of offers | Array of [`UnifiedOfferDto`](#unifiedofferdto) |
| **400** | Bad Request (e.g., missing userId) | - |

---

### POST `/offers/{uniqueId}/track-click`

**Summary:** Track a user click on an offer (for analytics)

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uniqueId` | path | Yes | string | The globally unique ID of the offer (e.g., "revu-12345") | `revu-42410` |
| `userId` | query | Yes | string | The ID of the user who clicked the offer | `u7lYe9Y8PTQ3Dv6Heju2irIlMJy2` |

**Responses:**

| Status | Description |
|--------|-------------|
| **204** | Click tracked successfully |
| **400** | Bad Request (e.g., missing userId) |

---

### POST `/offers/{uniqueId}/suppress`

**Summary:** Suppress an offer for a user (e.g., "Not Interested")

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `uniqueId` | path | Yes | string | The globally unique ID of the offer to suppress | `revu-42410` |
| `userId` | query | Yes | string | The ID of the user | `u7lYe9Y8PTQ3Dv6Heju2irIlMJy2` |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Offer successfully added to the user's suppressed list |
| **400** | Bad Request (e.g., missing userId) |

---

### GET `/offers/offer-of-day`

**Summary:** Get the current Offer of the Day

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `userId` | query | Yes | string | The unique ID of the user |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | The Offer of the Day object | [`UnifiedOfferDto`](#unifiedofferdto) |
| **400** | Bad Request (e.g., missing userId) | - |

---

### GET `/offers/progress`

**Summary:** Get completion progress for an offer

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | query | Yes | string |
| `uniqueId` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/offers/tap`

**Summary:** Record that a user has started an offer

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `userId` | query | Yes | string | The ID of the user starting the offer |

**Request Body:** [`OfferTapDto`](#offertapdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/offers/besitos/user-data/{userId}`

**Summary:** Get Besitos user data (proxy endpoint)

**Description:** Proxies the Besitos API call to get user offer data (in_progress and completed offers). Used to check if My Games is unlocked.

**Parameters:**

| Name | In | Required | Type | Description | Example |
|------|-----|----------|------|-------------|---------|
| `userId` | path | Yes | string | The unique ID of the user | `u7lYe9Y8PTQ3Dv6Heju2irIlMJy2` |

**Responses:**

| Status | Description | Body |
|--------|-------------|------|
| **200** | User offer data from Besitos API | `{ "in_progress": [...], "completed": [...] }` |
| **400** | Bad Request (e.g., missing userId) | - |

---

### GET `/offers/{uniqueId}`

**Summary:** Get a single offer by its unique identifier

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uniqueId` | path | Yes | string |
| `userId` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/offers/besitos/wall`

**Summary:** Get Besitos wall with custom payouts applied

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | query | Yes | string |
| `platform` | query | Yes | string |
| `idfa` | query | Yes | string |
| `gaid` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

## Currency Sales

### GET `/currency-sales/active`

**Summary:** Get all active sales for the current user

**Parameters:**

| Name | In | Required | Type | Description |
|------|-----|----------|------|-------------|
| `userId` | query | Yes | string | The ID of the user |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | List of active sales |

---

## Surveys

### GET `/surveys/fusion`

**Operation:** `SurveysController_getSurveys`

Retrieves surveys from the Fusion survey provider.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `user-agent` | header | Yes | string |
| `x-forwarded-for` | header | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/surveys/fusion/entry-link`

**Operation:** `SurveysController_getSurveyEntryLink`

Retrieves a survey entry link from the Fusion provider.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `user-agent` | header | Yes | string |
| `x-forwarded-for` | header | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/surveys/{uid}/welcome`

**Operation:** `SurveysController_saveWelcomeSurvey`

Saves the user's welcome survey responses.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/surveys/respondent-id/{uid}`

**Operation:** `SurveysController_generateRespondentId`

Generates a respondent ID for the given user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/surveys/welcome-survey/{uid}`

**Operation:** `SurveysController_findWelcomeSurveyResponses`

Retrieves previous welcome survey responses for a user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/surveys/app-surveys`

**Operation:** `SurveysController_getAppSurveys`

Lists available app surveys.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `platform` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/surveys/app-surveys/{id}`

**Operation:** `SurveysController_getAppSurveyById`

Retrieves a specific app survey by its ID.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `uid` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/surveys/log-attempt`

**Operation:** `SurveysController_logAttempt`

Logs a survey attempt.

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### POST `/surveys/app-surveys/{id}/complete`

**Operation:** `SurveysController_completeAppSurvey`

Completes an app survey and rewards the user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Request Body:** [`CompleteAppSurveyDto`](#completeappsurveydto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Welcome Survey

### GET `/welcome-survey-attribution`

**Operation:** `WelcomeSurveyController_getWelcomeSurveyAttributionConfig`

Gets the welcome survey attribution configuration.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/welcome-survey/attribution-config`

**Operation:** `WelcomeSurveyController_getWelcomeSurveyAttributionConfigAlias`

Alias endpoint for getting the welcome survey attribution configuration.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/welcome-survey/attribution-response`

**Operation:** `WelcomeSurveyController_submitWelcomeSurveyAttributionResponse`

Submits a welcome survey attribution response.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Request Body:** [`WelcomeSurveyAttributionResponseDto`](#welcomesurveyattributionresponsedto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Missions

### GET `/missions/{uid}`

**Operation:** `MissionsController_getUserMissions`

Gets all missions for a user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/missions/{uid}/claim`

**Operation:** `MissionsController_claimReward`

Claims a mission reward for a user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `uid` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Reddit

### POST `/reddit/verify`

**Operation:** `RedditController_verifyPost`

Verifies a Reddit post.

**Request Body:** [`VerifyRedditPostDto`](#verifyredditpostdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### POST `/reddit/complete`

**Operation:** `RedditController_completeTask`

Completes a Reddit task.

**Request Body:** [`CompleteRedditTaskDto`](#completereddittaskdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## RevenueCat

### POST `/revenuecat/webhook`

**Operation:** `RevenueCatController_handleWebhook`

Handles RevenueCat subscription webhook events.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `Authorization` | header | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

## Auth

### POST `/auth/login`

**Operation:** `AuthController_login`

Authenticates an admin user.

**Request Body:** [`LoginDto`](#logindto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

## Admin Users

### POST `/admin-users`

**Operation:** `AdminUsersController_create`

Creates a new admin user.

**Request Body:** [`CreateAdminDto`](#createadmindto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/admin-users`

**Operation:** `AdminUsersController_findAll`

Retrieves all admin users.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### DELETE `/admin-users/{id}`

**Operation:** `AdminUsersController_remove`

Removes an admin user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **204** | Success |

---

## Admin

### GET `/admin/dashboard-stats`

**Operation:** `AdminController_getDashboardStats`

Gets dashboard statistics.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/withdrawals`

**Operation:** `AdminController_getAllWithdrawals`

Gets all withdrawal requests.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/withdrawals/status`

**Operation:** `AdminController_updateWithdrawalsStatus`

Bulk updates withdrawal statuses.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/withdrawals/{id}/on-hold`

**Summary:** Update on-hold status for a withdrawal

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `app` | query | Yes | string |

**Request Body:** [`UpdateWithdrawalOnHoldDto`](#updatewithdrawalonholddto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/withdrawals/on-hold`

**Summary:** Bulk update on-hold status for withdrawals

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Request Body:** [`UpdateWithdrawalsOnHoldDto`](#updatewithdrawalssonholddto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/withdrawals/{id}/verification`

**Summary:** Update the verification status of a withdrawal request

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `app` | query | Yes | string |

**Request Body:** [`UpdateVerificationStatusDto`](#updateverificationstatusdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Verification status updated successfully |
| **404** | Withdrawal not found |

---

### GET `/admin/users/lookup/{identifier}`

**Operation:** `AdminController_findUserByIdOrEmail`

Looks up a user by ID or email address.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `identifier` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/users/{userId}/transactions`

**Operation:** `AdminController_getUserTransactionHistory`

Gets a user's complete transaction history.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/admin/users/{userId}/adjust-balance`

**Operation:** `AdminController_issueAdjustment`

Issues a balance adjustment for a user.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/admin/home-stats`

**Operation:** `AdminController_getHomeStats`

Gets home page statistics.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/offer-of-day/candidates`

**Summary:** Get top 50 offer candidates for Offer of the Day

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | A list of top offers |

---

### POST `/admin/offer-of-day/configure`

**Summary:** Set or update the Offer of the Day

**Request Body:** [`ConfigureOfferOfDayDto`](#configureofferofdaydto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Offer of the Day configured successfully |

---

### GET `/admin/offer-of-day/configuration`

**Summary:** Get the current Offer of the Day configuration

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/featured-offers/dashboard`

**Summary:** Get merged offers data for Admin Dashboard

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `page` | query | Yes | number |
| `limit` | query | Yes | number |
| `search` | query | Yes | string |
| `source` | query | Yes | string |
| `usOnly` | query | Yes | string |
| `minMultiplier` | query | Yes | number |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/admin/featured-offers/config`

**Summary:** Update offer configuration (priority, text, tiers)

**Request Body:** [`UpdateFeaturedOfferConfigDto`](#updatefeaturedofferconfigdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/admin/featured-offers/settings`

**Operation:** `AdminController_getFeaturedGlobalSettings`

Gets global settings for featured offers.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### POST `/admin/featured-offers/settings`

**Operation:** `AdminController_updateFeaturedGlobalSettings`

Updates global settings for featured offers.

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/admin/checklist-rewards`

**Operation:** `AdminController_getChecklistRewards`

Gets all checklist reward configurations.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PUT `/admin/checklist-rewards/{taskId}`

**Operation:** `AdminController_updateChecklistReward`

Updates a checklist reward configuration.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `taskId` | path | Yes | string |

**Request Body:** [`UpdateChecklistRewardDto`](#updatechecklistrewarddto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/settings/payout`

**Operation:** `AdminController_getPayoutSettings`

Gets payout settings.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### PUT `/admin/settings/payout`

**Operation:** `AdminController_updatePayoutSettings`

Updates payout settings.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Request Body:** [`UpdatePayoutSettingsDto`](#updatepayoutsettingsdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/settings/welcome-survey-attribution`

**Summary:** Get Welcome Survey attribution config

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### PUT `/admin/settings/welcome-survey-attribution`

**Summary:** Update Welcome Survey attribution config

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Request Body:** [`UpdateWelcomeSurveyAttributionConfigDto`](#updatewelcomesurveyattributionconfigdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/welcome-survey/attribution-config`

**Operation:** `AdminController_getWelcomeSurveyAttributionConfigAlias`

Alias for getting the welcome survey attribution configuration.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### PUT `/admin/welcome-survey/attribution-config`

**Operation:** `AdminController_updateWelcomeSurveyAttributionConfigAlias`

Alias for updating the welcome survey attribution configuration.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Request Body:** [`UpdateWelcomeSurveyAttributionConfigDto`](#updatewelcomesurveyattributionconfigdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/welcome-survey-attribution/summary`

**Summary:** Get Welcome Survey attribution summary

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |
| `start` | query | Yes | string |
| `end` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/welcome-survey-attribution/responses`

**Summary:** Get Welcome Survey attribution responses

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |
| `limit` | query | Yes | string |
| `startAfter` | query | Yes | string |
| `optionId` | query | Yes | string |
| `start` | query | Yes | string |
| `end` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/admin/direct-offers`

**Summary:** Create a new Direct Offer

**Request Body:** [`CreateDirectOfferDto`](#createdirectofferdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | The offer has been successfully created |
| **400** | Bad Request. Invalid data provided |

### GET `/admin/direct-offers`

**Summary:** Get all Direct Offers

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | A list of all direct offers |

---

### GET `/admin/direct-offers/{id}`

**Summary:** Get a single Direct Offer by its ID, including goals and postback URLs

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | The offer details |
| **404** | Offer not found |

### PUT `/admin/direct-offers/{id}`

**Summary:** Update an existing Direct Offer

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Request Body:** [`UpdateDirectOfferDto`](#updatedirectofferdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | The offer has been successfully updated |
| **404** | Offer not found |

---

### POST `/admin/currency-sales`

**Summary:** Create a new currency sale

**Request Body:** [`CreateCurrencySaleDto`](#createcurrencysaledto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/admin/currency-sales`

**Summary:** Get all currency sales

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PUT `/admin/currency-sales/{id}`

**Summary:** Update an existing currency sale

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Request Body:** [`UpdateCurrencySaleDto`](#updatecurrencysaledto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/offers/search`

**Summary:** Search for offers to be used in individual sales

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `q` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/admin/app-surveys`

**Summary:** Create App Survey with Image

**Request Body:** [`CreateAppSurveyDto`](#createappsurveydto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

### GET `/admin/app-surveys`

**Summary:** Get all App Surveys (for Admin Back Office)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/app-surveys/{id}`

**Summary:** Get single App Survey details

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### PUT `/admin/app-surveys/{id}`

**Summary:** Update App Survey

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Request Body:** [`UpdateAppSurveyDto`](#updateappsurveydto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/app-surveys/{id}/responses`

**Summary:** List App Survey responses

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `limit` | query | Yes | string |
| `startAfter` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/app-surveys/{id}/status`

**Summary:** Quickly update status (Enable/Disable)

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### POST `/admin/app-surveys/reorder`

**Summary:** Reorder surveys based on ID list

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### POST `/admin/app-surveys/{id}/delete`

**Summary:** Delete an App Survey

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### GET `/admin/besitos/offers`

**Summary:** List Besitos offers with milestones (admin)

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `platform` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/besitos/offers/{offerId}`

**Summary:** Get a single Besitos offer with milestones (admin)

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `offerId` | path | Yes | string |
| `platform` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### PATCH `/admin/besitos/offers/{offerId}/milestones`

**Summary:** Update Besitos milestone payouts (admin)

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `offerId` | path | Yes | string |
| `platform` | query | Yes | string |

**Request Body:** [`UpdateBesitosMilestonesDto`](#updatebesitosmilestionesdto) (required, `application/json`)

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/besitos/top-offers`

**Summary:** Get top 10 BESITOS offers for internal reuse

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/mission-tiers`

**Operation:** `AdminController_getMissionTiers`

Gets all mission tiers.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### POST `/admin/mission-tiers`

**Operation:** `AdminController_createMissionTier`

Creates a new mission tier.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **201** | Success |

---

### PATCH `/admin/mission-tiers/{id}`

**Operation:** `AdminController_updateMissionTier`

Updates a mission tier.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

### DELETE `/admin/mission-tiers/{id}`

**Operation:** `AdminController_deleteMissionTier`

Deletes a mission tier.

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `id` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### DELETE `/admin/users/{userId}`

**Summary:** HARD DELETE user: Removes Firestore doc, subcollections and Auth record

**Parameters:**

| Name | In | Required | Type |
|------|-----|----------|------|
| `userId` | path | Yes | string |
| `app` | query | Yes | string |

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

## Analytics

### GET `/admin/analytics/unique-offer-completers`

**Operation:** `AnalyticsController_getUniqueOfferCompleters`

Gets count of unique users who have completed offers.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/analytics/revenue-by-company`

**Operation:** `AnalyticsController_getRevenueByCompany`

Gets revenue breakdown by company/network.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/analytics/new-users`

**Operation:** `AnalyticsController_getNewUsers`

Gets new user registration metrics.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/analytics/offer-completes`

**Operation:** `AnalyticsController_getOfferCompletes`

Gets offer completion metrics.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

### GET `/admin/analytics/ltv`

**Operation:** `AnalyticsController_getLtv`

Gets lifetime value analytics.

**Responses:**

| Status | Description |
|--------|-------------|
| **200** | Success |

---

## Data Schemas

### UserResponseDto

Represents a user in the system.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `uid` | string | Yes | Unique user identifier | `abc123xyz` |
| `name` | string | No | User display name | `John Doe` |
| `email` | string | No | User email address | `user@example.com` |
| `createdAt` | object (timestamp) | Yes | User creation timestamp | `2023-05-20T14:30:00Z` |
| `hasCompletedCheckList` | boolean | Yes | Whether user completed checklist | `false` |
| `balance` | number | Yes | Current user balance | `10.5` |
| `totalEarned` | number | Yes | Total amount ever earned by user | `15.75` |

---

### CreateUserDto

Data required to create a new user.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `displayName` | string | No | User display name from auth provider | `John Doe` |
| `email` | string | No | User email from auth provider | `user@example.com` |

---

### UpdateUserDto

Data for updating user information (all fields optional).

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `displayName` | string | No | User display name from auth provider | `John Doe` |
| `email` | string | No | User email from auth provider | `user@example.com` |
| `balance` | number | No | User balance | `15.5` |
| `totalEarned` | number | No | Total earned amount | `20` |
| `hasCompletedCheckList` | boolean | No | Checklist completion status | `true` |

---

### RewardUserDto

Data required to reward a user.

| Field | Type | Required | Description | Example | Enum Values |
|-------|------|----------|-------------|---------|-------------|
| `rewardAmount` | number | Yes | Reward amount in points/currency | `100` | - |
| `note` | string | Yes | Note explaining the reward | `For winning the tournament` | - |
| `type` | string | Yes | Reward type | `tournament` | `cashout`, `welcomeSurvey`, `checkIn` |

---

### TaskDto

Represents a user task.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier of the task | `task1` |
| `name` | string | Yes | Name/description of the task | `Welcome Survey` |
| `completed` | boolean | Yes | Completion status of the task | `true` |
| `reward` | number | Yes | Reward value for completing the task | `2` |
| `category` | string | No | Optional category or type of the task | `survey` |

---

### RequestWithdrawalDto

Data required to request a withdrawal.

| Field | Type | Required | Description | Example | Enum Values |
|-------|------|----------|-------------|---------|-------------|
| `uid` | string | Yes | User ID | `user123` | - |
| `email` | string | Yes | Payment email address | `user@example.com` | - |
| `amount` | number | Yes | Withdrawal amount (must be > 0.01) | `50` | - |
| `method` | string | Yes | Payment method | `paypal` | `paypal`, `mastercard`, `ebay` |
| `country` | string | Yes | User country | `US` | - |

---

### WithdrawalDto

Represents a withdrawal record.

| Field | Type | Required | Description | Example | Enum Values |
|-------|------|----------|-------------|---------|-------------|
| `id` | string | Yes | Withdrawal ID | `withdrawal123` | - |
| `uid` | string | Yes | User ID who requested withdrawal | `user123` | - |
| `email` | string | Yes | User email for payment | `user@example.com` | - |
| `amount` | number | Yes | Withdrawal amount | `50` | - |
| `method` | string | Yes | Payment method | `paypal` | `paypal`, `mastercard`, `ebay` |
| `status` | string | Yes | Withdrawal status | `pending` | `pending`, `delivered`, `canceled` |
| `createdAt` | object (timestamp) | Yes | Creation timestamp | `2023-05-20T14:30:00Z` | - |
| `country` | string | Yes | User country | `US` | - |

---

### UnifiedOfferDto

Represents a unified offer across all networks.

| Field | Type | Required | Description | Example | Enum Values |
|-------|------|----------|-------------|---------|-------------|
| `source` | string | Yes | The source network of the offer | `revu` | `my_chips`, `revu` |
| `id` | string | Yes | The offer's original ID from its source network | `42410` | - |
| `uniqueId` | string | Yes | A globally unique identifier for the offer | `revu-42410` | - |
| `dedupeKey` | string | Yes | The key used for de-duplication across networks | `com.game.name` | - |
| `name` | string | Yes | The name of the offer | `FanDuel - SportsBook` | - |
| `logoUrl` | string | Yes | A URL for the offer's logo/icon | `https://cdn...jpg` | - |
| `description` | string | Yes | A short description of the offer | `Start betting on your favorite sports!` | - |
| `terms` | string | Yes | Detailed terms and requirements for the offer | `Register and deposit at least $10.` | - |
| `payout` | number | Yes | The total potential payout for the company (USD) | `90` | - |
| `score` | number | Yes | The calculated score used for ranking (tier1 + 0.5*tier2) | `90` | - |
| `tiers` | array of [`OfferTierDto`](#offertierDto) | Yes | An array of the offer's tiers/levels | - | - |
| `platform` | string | Yes | The target platform for the offer | `ios` | `ios`, `android`, `web` |
| `countries` | array of strings | Yes | An array of targeted countries (ISO 2 codes) | `["US", "CA"]` | - |
| `isCapped` | boolean | Yes | Indicates if the offer has reached its cap | - | - |
| `clickUrl` | string | Yes | The final tracking URL for the front-end | `https://...&sid2=user-id-123` | - |
| `trackClickUrl` | string | Yes | The relative URL for tracking click events | `/offers/revu-42410/track-click` | - |
| `raw` | object | Yes | Original raw data from the source API | - | - |
| `large_image` | string | No | URL for the large header image | - | - |
| `square_image` | string | No | URL for the square icon image | - | - |
| `url` | string | No | Alias for clickUrl (legacy compatibility) | - | - |
| `goals` | array of [`OfferGoalDto`](#offergoaldto) | No | Legacy goals structure | - | - |
| `points` | array of [`OfferPointDto`](#offerpointdto) | No | Legacy points structure | - | - |
| `defaultMultipliers` | object | No | Default multiplier settings | - | - |
| `promoText` | string | No | Promotional text | - | - |

---

### OfferTierDto

Represents a single tier/level within an offer.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `requirement` | string | Yes | A description of the requirement to earn the reward for this tier | `Reach Level 10` |
| `payout` | number | Yes | The company's payout for completing this tier (in USD) | `1.5` |

---

### OfferGoalDto

Legacy offer goal structure. Properties are dynamic.

---

### OfferPointDto

Legacy offer points structure. Properties are dynamic.

---

### OfferTapDto

Data for recording an offer tap. Properties are dynamic.

---

### SyncBesitosRewardDto

Data for syncing Besitos rewards. Properties are dynamic.

---

### OfferOfDayEntryDto

Represents a configured Offer of the Day entry.

| Field | Type | Required | Description | Example | Enum Values |
|-------|------|----------|-------------|---------|-------------|
| `source` | string | Yes | The source of the offer | `my_chips` | `my_chips`, `revu`, `besitos` |
| `offerId` | string | Yes | The original ID of the offer from its source | `2612707` | - |
| `priority` | number | Yes | Priority of the offer (higher = higher priority) | `10` | - |
| `platform` | array of strings | Yes | Target platforms | `["ios", "android"]` | - |
| `titlePremium` | string | Yes | The custom display premium title for the offer | - | - |
| `titleFree` | string | Yes | The custom display free title for the offer | - | - |
| `enabled` | boolean | Yes | Enable or disable this offer as Offer of the Day | `true` | - |

---

### ConfigureOfferOfDayDto

Configuration for setting the Offer of the Day.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `offers` | array of [`OfferOfDayEntryDto`](#offerofdayentrydto) | Yes | Array of offer entries to configure |

---

### CompleteAppSurveyDto

Data for completing an app survey.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uid` | string | Yes | User ID |
| `responses` | array of objects | No | Array of survey responses |
| `variantId` | string | No | Variant ID |
| `variantName` | string | No | Variant name |

---

### SurveyQuestionDto

Represents a question within an app survey.

| Field | Type | Required | Description | Enum Values |
|-------|------|----------|-------------|-------------|
| `question` | string | Yes | The question text | - |
| `title` | string | Yes | The title/label for the question | - |
| `type` | string | Yes | The question type | `select`, `text`, `rating` |
| `options` | array of strings | No | Available answer options (for select type) | - |
| `correctAnswer` | string | No | The correct answer (for validation) | - |
| `minLength` | number | No | Minimum text length (for text type) | - |
| `allowOther` | boolean | No | Whether to allow "Other" option | - |
| `otherPlaceholder` | string | No | Placeholder text for "Other" option | - |

---

### CreateAppSurveyDto

Data for creating a new app survey.

| Field | Type | Required | Description | Enum Values |
|-------|------|----------|-------------|-------------|
| `name` | string | Yes | Survey name | - |
| `platform` | string | Yes | Target platform | `iOS`, `Android`, `Desktop`, `Any` |
| `payoutFree` | number | Yes | Payout for free users | - |
| `payoutPremium` | number | Yes | Payout for premium users | - |
| `timeToComplete` | string | Yes | Estimated time to complete | - |
| `instructions` | array of strings | Yes | Survey instructions | - |
| `questions` | array of [`SurveyQuestionDto`](#surveyquestiondto) | Yes | Survey questions | - |
| `status` | string | Yes | Survey status | `Active`, `Inactive`, `Draft` |
| `priority` | number | Yes | Display priority | - |
| `variants` | array of `AppSurveyVariantDto` | Yes | Survey variants | - |
| `taskType` | string | No | Task type | `standard`, `app_review_survey`, `reddit_post_task` |
| `rating` | number | No | Rating | - |
| `badge` | string | No | Badge text | - |
| `externalLinkUrl` | string | No | External link URL | - |
| `externalLinkLabel` | string | No | External link label | - |

---

### UpdateAppSurveyDto

Data for updating an app survey. All fields from `CreateAppSurveyDto` but none are required.

---

### LoginDto

Login credentials. Properties are dynamic.

---

### CreateAdminDto

Data for creating an admin user. Properties are dynamic.

---

### VerifyRedditPostDto

Data for verifying a Reddit post. Properties are dynamic.

---

### CompleteRedditTaskDto

Data for completing a Reddit task. Properties are dynamic.

---

### UpdateWithdrawalOnHoldDto

Data for updating withdrawal on-hold status. Properties are dynamic.

---

### UpdateWithdrawalsOnHoldDto

Data for bulk updating withdrawal on-hold status. Properties are dynamic.

---

### UpdateVerificationStatusDto

Data for updating verification status. Properties are dynamic.

---

### UpdateFeaturedOfferConfigDto

Data for updating featured offer configuration. Properties are dynamic.

---

### UpdateChecklistRewardDto

Data for updating checklist reward. Properties are dynamic.

---

### UpdatePayoutSettingsDto

Data for updating payout settings. Properties are dynamic.

---

### UpdateWelcomeSurveyAttributionConfigDto

Data for updating welcome survey attribution config. Properties are dynamic.

---

### WelcomeSurveyAttributionResponseDto

Welcome survey attribution response data. Properties are dynamic.

---

### CreateDirectOfferDto

Data for creating a direct offer. Properties are dynamic.

---

### UpdateDirectOfferDto

Data for updating a direct offer. Properties are dynamic.

---

### CreateCurrencySaleDto

Data for creating a currency sale. Properties are dynamic.

---

### UpdateCurrencySaleDto

Data for updating a currency sale. Properties are dynamic.

---

### UpdateBesitosMilestonesDto

Data for updating Besitos milestone payouts. Properties are dynamic.

---

### AppSurveyVariantDto

App survey variant data. Properties are dynamic.

---

## Endpoint Summary

| Method | Path | Tag | Summary |
|--------|------|-----|---------|
| GET | `/` | App | Root / Hello |
| GET | `/health` | App | Health check |
| POST | `/integrity/verify-device` | Integrity | Verify device integrity |
| GET | `/users/{uid}` | Users | Get user details |
| POST | `/users/{uid}` | Users | Create new user |
| PATCH | `/users/{uid}` | Users | Update user information |
| DELETE | `/users/{uid}` | Users | Delete a user and all their data |
| POST | `/users/{uid}/restore` | Users | Restore a soft-deleted user account |
| POST | `/users/{uid}/complete-pure-spectrum-survey` | Users | Complete PureSpectrum survey |
| GET | `/users/{uid}/besitos-stats` | Users | Get Besitos offer completion stats |
| GET | `/users/{uid}/besitos-history/{offerId}` | Users | Get Besitos offer purchase history |
| GET | `/users/{uid}/besitos-offers` | Users | Get Besitos offers for a user |
| POST | `/users/phone-verification/send` | Users | Send phone verification code |
| POST | `/users/{uid}/phone-verification/confirm` | Users | Confirm OTP code and reward user |
| POST | `/users/{uid}/pure-spectrum-postback` | Users | Record PureSpectrum transaction |
| POST | `/earnings/{uid}/reward` | Earnings | Reward a user |
| GET | `/earnings/{uid}` | Earnings | Get user earnings |
| GET | `/tasks/{uid}` | Tasks | Get all tasks for a user |
| GET | `/tasks/{uid}/{taskId}` | Tasks | Get a specific task by ID |
| PATCH | `/tasks/{uid}/{taskId}/complete` | Tasks | Mark a task as completed |
| POST | `/withdrawals` | Withdrawals | Request a new withdrawal |
| GET | `/withdrawals/{uid}` | Withdrawals | Get all withdrawals for a user |
| POST | `/webhooks/besitos` | Webhooks | Handle Besitos webhook |
| GET | `/webhooks/besitos` | Webhooks | Handle Besitos webhook (GET) |
| POST | `/webhooks/mychips` | Webhooks | Handle MyChips webhook |
| GET | `/webhooks/mychips` | Webhooks | Handle MyChips webhook (GET) |
| POST | `/webhooks/adgem` | Webhooks | Handle AdGem webhook |
| GET | `/webhooks/adgem` | Webhooks | Handle AdGem webhook (GET) |
| POST | `/webhooks/adjoe` | Webhooks | Handle AdJoe webhook |
| GET | `/webhooks/adjoe` | Webhooks | Handle AdJoe webhook (GET) |
| POST | `/webhooks/purespectrum/complete` | Webhooks | Handle PureSpectrum complete |
| GET | `/webhooks/revu` | Webhooks | Handle Revu webhook (GET) |
| POST | `/webhooks/revu` | Webhooks | Handle Revu webhook |
| GET | `/webhooks/cpx-research` | Webhooks | Handle CPX Research (GET) |
| POST | `/webhooks/cpx-research` | Webhooks | Handle CPX Research |
| GET | `/webhooks/tapresearch` | Webhooks | Handle TapResearch |
| GET | `/webhooks/cpx-offerwall` | Webhooks | Get CPX Offerwall URL |
| GET | `/webhooks/inmarket` | Webhooks | Handle InMarket |
| POST | `/webhooks/sync-besitos` | Webhooks | Sync Besitos reward |
| GET | `/webhooks/direct-offer` | Webhooks | Handle Direct Offer (GET) |
| POST | `/webhooks/direct-offer` | Webhooks | Handle Direct Offer |
| GET | `/offers/featured` | Offers | Get featured offers |
| POST | `/offers/{uniqueId}/track-click` | Offers | Track offer click |
| POST | `/offers/{uniqueId}/suppress` | Offers | Suppress an offer |
| GET | `/offers/offer-of-day` | Offers | Get Offer of the Day |
| GET | `/offers/progress` | Offers | Get offer progress |
| POST | `/offers/tap` | Offers | Record offer tap |
| GET | `/offers/besitos/user-data/{userId}` | Offers | Get Besitos user data |
| GET | `/offers/{uniqueId}` | Offers | Get offer by unique ID |
| GET | `/offers/besitos/wall` | Offers | Get Besitos wall |
| GET | `/currency-sales/active` | Currency Sales | Get active sales |
| GET | `/surveys/fusion` | Surveys | Get Fusion surveys |
| GET | `/surveys/fusion/entry-link` | Surveys | Get survey entry link |
| POST | `/surveys/{uid}/welcome` | Surveys | Save welcome survey |
| GET | `/surveys/respondent-id/{uid}` | Surveys | Generate respondent ID |
| GET | `/surveys/welcome-survey/{uid}` | Surveys | Get welcome survey responses |
| GET | `/surveys/app-surveys` | Surveys | Get app surveys |
| GET | `/surveys/app-surveys/{id}` | Surveys | Get app survey by ID |
| POST | `/surveys/log-attempt` | Surveys | Log survey attempt |
| POST | `/surveys/app-surveys/{id}/complete` | Surveys | Complete app survey |
| GET | `/welcome-survey-attribution` | WelcomeSurvey | Get attribution config |
| GET | `/welcome-survey/attribution-config` | WelcomeSurvey | Get attribution config (alias) |
| POST | `/welcome-survey/attribution-response` | WelcomeSurvey | Submit attribution response |
| GET | `/missions/{uid}` | Missions | Get user missions |
| POST | `/missions/{uid}/claim` | Missions | Claim mission reward |
| POST | `/reddit/verify` | Reddit | Verify Reddit post |
| POST | `/reddit/complete` | Reddit | Complete Reddit task |
| POST | `/revenuecat/webhook` | RevenueCat | Handle webhook |
| POST | `/auth/login` | Auth | Admin login |
| POST | `/admin-users` | AdminUsers | Create admin user |
| GET | `/admin-users` | AdminUsers | List admin users |
| DELETE | `/admin-users/{id}` | AdminUsers | Remove admin user |
| GET | `/admin/dashboard-stats` | Admin | Get dashboard stats |
| GET | `/admin/withdrawals` | Admin | Get all withdrawals |
| PATCH | `/admin/withdrawals/status` | Admin | Update withdrawal statuses |
| PATCH | `/admin/withdrawals/{id}/on-hold` | Admin | Update on-hold status |
| PATCH | `/admin/withdrawals/on-hold` | Admin | Bulk update on-hold |
| PATCH | `/admin/withdrawals/{id}/verification` | Admin | Update verification status |
| GET | `/admin/users/lookup/{identifier}` | Admin | Lookup user |
| GET | `/admin/users/{userId}/transactions` | Admin | Get user transactions |
| POST | `/admin/users/{userId}/adjust-balance` | Admin | Adjust user balance |
| GET | `/admin/home-stats` | Admin | Get home stats |
| GET | `/admin/offer-of-day/candidates` | Admin | Get OotD candidates |
| POST | `/admin/offer-of-day/configure` | Admin | Configure Offer of the Day |
| GET | `/admin/offer-of-day/configuration` | Admin | Get OotD configuration |
| GET | `/admin/featured-offers/dashboard` | Admin | Get featured offers dashboard |
| POST | `/admin/featured-offers/config` | Admin | Update offer config |
| GET | `/admin/featured-offers/settings` | Admin | Get featured settings |
| POST | `/admin/featured-offers/settings` | Admin | Update featured settings |
| GET | `/admin/checklist-rewards` | Admin | Get checklist rewards |
| PUT | `/admin/checklist-rewards/{taskId}` | Admin | Update checklist reward |
| GET | `/admin/settings/payout` | Admin | Get payout settings |
| PUT | `/admin/settings/payout` | Admin | Update payout settings |
| GET | `/admin/settings/welcome-survey-attribution` | Admin | Get WS attribution config |
| PUT | `/admin/settings/welcome-survey-attribution` | Admin | Update WS attribution config |
| GET | `/admin/welcome-survey/attribution-config` | Admin | Get WS attribution (alias) |
| PUT | `/admin/welcome-survey/attribution-config` | Admin | Update WS attribution (alias) |
| GET | `/admin/welcome-survey-attribution/summary` | Admin | Get attribution summary |
| GET | `/admin/welcome-survey-attribution/responses` | Admin | Get attribution responses |
| POST | `/admin/direct-offers` | Admin | Create direct offer |
| GET | `/admin/direct-offers` | Admin | Get all direct offers |
| GET | `/admin/direct-offers/{id}` | Admin | Get direct offer by ID |
| PUT | `/admin/direct-offers/{id}` | Admin | Update direct offer |
| POST | `/admin/currency-sales` | Admin | Create currency sale |
| GET | `/admin/currency-sales` | Admin | Get all currency sales |
| PUT | `/admin/currency-sales/{id}` | Admin | Update currency sale |
| GET | `/admin/offers/search` | Admin | Search offers |
| POST | `/admin/app-surveys` | Admin | Create app survey |
| GET | `/admin/app-surveys` | Admin | Get all app surveys |
| GET | `/admin/app-surveys/{id}` | Admin | Get app survey by ID |
| PUT | `/admin/app-surveys/{id}` | Admin | Update app survey |
| GET | `/admin/app-surveys/{id}/responses` | Admin | List survey responses |
| PATCH | `/admin/app-surveys/{id}/status` | Admin | Update survey status |
| POST | `/admin/app-surveys/reorder` | Admin | Reorder surveys |
| POST | `/admin/app-surveys/{id}/delete` | Admin | Delete app survey |
| GET | `/admin/besitos/offers` | Admin | List Besitos offers |
| GET | `/admin/besitos/offers/{offerId}` | Admin | Get Besitos offer |
| PATCH | `/admin/besitos/offers/{offerId}/milestones` | Admin | Update Besitos milestones |
| GET | `/admin/besitos/top-offers` | Admin | Get top Besitos offers |
| GET | `/admin/mission-tiers` | Admin | Get mission tiers |
| POST | `/admin/mission-tiers` | Admin | Create mission tier |
| PATCH | `/admin/mission-tiers/{id}` | Admin | Update mission tier |
| DELETE | `/admin/mission-tiers/{id}` | Admin | Delete mission tier |
| DELETE | `/admin/users/{userId}` | Admin | Hard delete user |
| GET | `/admin/analytics/unique-offer-completers` | Analytics | Unique offer completers |
| GET | `/admin/analytics/revenue-by-company` | Analytics | Revenue by company |
| GET | `/admin/analytics/new-users` | Analytics | New users |
| GET | `/admin/analytics/offer-completes` | Analytics | Offer completes |
| GET | `/admin/analytics/ltv` | Analytics | LTV analytics |
