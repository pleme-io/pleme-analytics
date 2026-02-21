/**
 * @pleme/analytics
 *
 * Analytics service library for Nexus products
 */

export type { AnalyticsEvent, BaseAnalyticsEvents } from './types';
export { AnalyticsEventSchema } from './types';

export type { IAnalyticsService, AnalyticsServiceConfig } from './analytics.service';
export {
  MockAnalyticsService,
  ProductionAnalyticsService,
  createAnalyticsService,
} from './analytics.service';
