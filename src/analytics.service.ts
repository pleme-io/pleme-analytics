/**
 * Analytics Service
 *
 * Tracks user interactions and events throughout the application.
 * In non-production environments, uses mock implementation.
 * In production, integrates with real analytics provider.
 */

import type { BaseAnalyticsEvents } from './types';

/**
 * Analytics service interface
 *
 * @template TEvents - Event types extending BaseAnalyticsEvents
 */
export interface IAnalyticsService<TEvents extends BaseAnalyticsEvents = BaseAnalyticsEvents> {
  /**
   * Track an analytics event
   *
   * @param event - Event name
   * @param properties - Event properties
   */
  track<K extends keyof TEvents>(event: K, properties: TEvents[K]): Promise<void>;

  /**
   * Identify a user
   *
   * @param userId - User identifier
   * @param traits - User traits/properties
   */
  identify(userId: string, traits?: Record<string, unknown>): Promise<void>;

  /**
   * Track a page view
   *
   * @param name - Page name
   * @param properties - Page properties
   */
  page(name: string, properties?: Record<string, unknown>): Promise<void>;

  /**
   * Reset analytics state (e.g., on logout)
   */
  reset(): Promise<void>;
}

/**
 * Mock analytics service for non-production environments
 */
export class MockAnalyticsService<TEvents extends BaseAnalyticsEvents = BaseAnalyticsEvents>
  implements IAnalyticsService<TEvents>
{
  private events: Array<{ event: string; properties: unknown; timestamp: number }> = [];
  private debug: boolean;

  constructor(debug = true) {
    this.debug = debug;
  }

  async track<K extends keyof TEvents>(event: K, properties: TEvents[K]): Promise<void> {
    const eventData = {
      event: String(event),
      properties,
      timestamp: Date.now(),
    };

    this.events.push(eventData);

    if (this.debug) {
      console.log('[Analytics - Mock]', event, properties);
    }
  }

  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    if (this.debug) {
      console.log('[Analytics - Mock] Identify:', userId, traits);
    }
  }

  async page(name: string, properties?: Record<string, unknown>): Promise<void> {
    if (this.debug) {
      console.log('[Analytics - Mock] Page:', name, properties);
    }
  }

  async reset(): Promise<void> {
    this.events = [];
    if (this.debug) {
      console.log('[Analytics - Mock] Reset');
    }
  }

  /**
   * Get tracked events (for testing)
   */
  getEvents(): Array<{ event: string; properties: unknown; timestamp: number }> {
    return [...this.events];
  }

  /**
   * Clear tracked events (for testing)
   */
  clearEvents(): void {
    this.events = [];
  }
}

/**
 * Production analytics service
 *
 * @remarks
 * Placeholder implementation - integrate with real analytics provider
 * (e.g., Segment, Mixpanel, PostHog, Google Analytics)
 */
export class ProductionAnalyticsService<TEvents extends BaseAnalyticsEvents = BaseAnalyticsEvents>
  implements IAnalyticsService<TEvents>
{
  async track<K extends keyof TEvents>(event: K, properties: TEvents[K]): Promise<void> {
    // TODO: Integrate with real analytics provider
    // Example for Segment:
    // await window.analytics?.track(String(event), properties)

    console.log('[Analytics - Production]', event, properties);
  }

  async identify(userId: string, traits?: Record<string, unknown>): Promise<void> {
    // TODO: Integrate with real analytics provider
    // await window.analytics?.identify(userId, traits)

    console.log('[Analytics - Production] Identify:', userId, traits);
  }

  async page(name: string, properties?: Record<string, unknown>): Promise<void> {
    // TODO: Integrate with real analytics provider
    // await window.analytics?.page(name, properties)

    console.log('[Analytics - Production] Page:', name, properties);
  }

  async reset(): Promise<void> {
    // TODO: Integrate with real analytics provider
    // await window.analytics?.reset()

    console.log('[Analytics - Production] Reset');
  }
}

/**
 * Configuration options for analytics service factory
 */
export interface AnalyticsServiceConfig {
  /**
   * Environment mode
   * @default 'development'
   */
  mode?: 'development' | 'staging' | 'production';

  /**
   * Enable debug logging in mock mode
   * @default true
   */
  debug?: boolean;
}

/**
 * Create an analytics service instance based on environment
 *
 * @param config - Service configuration
 * @returns Analytics service instance
 *
 * @example
 * ```ts
 * const analytics = createAnalyticsService({ mode: 'production' })
 * await analytics.track('page_view', { path: '/' })
 * ```
 */
export function createAnalyticsService<TEvents extends BaseAnalyticsEvents = BaseAnalyticsEvents>(
  config: AnalyticsServiceConfig = {}
): IAnalyticsService<TEvents> {
  const { mode = 'development', debug = true } = config;

  if (mode === 'production') {
    return new ProductionAnalyticsService<TEvents>();
  }

  return new MockAnalyticsService<TEvents>(debug);
}
