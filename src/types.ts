/**
 * Analytics Event Types
 */

import { z } from 'zod';

// Base analytics event schema
export const AnalyticsEventSchema: z.ZodObject<{
  name: z.ZodString;
  properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
  timestamp: z.ZodOptional<z.ZodNumber>;
  userId: z.ZodOptional<z.ZodString>;
  sessionId: z.ZodOptional<z.ZodString>;
}> = z.object({
  name: z.string(),
  properties: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.number().optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
});

export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;

/**
 * Generic analytics events that can be extended by applications
 *
 * @example
 * ```ts
 * interface MyAppEvents extends BaseAnalyticsEvents {
 *   button_clicked: { buttonId: string; page: string }
 *   form_submitted: { formName: string; success: boolean }
 * }
 * ```
 */
export interface BaseAnalyticsEvents {
  page_view: {
    path: string;
    title?: string;
    referrer?: string;
  };
  user_action: {
    action: string;
    category?: string;
    label?: string;
    value?: number;
  };
  error_occurred: {
    errorType: string;
    errorMessage: string;
    context?: string;
  };
}
