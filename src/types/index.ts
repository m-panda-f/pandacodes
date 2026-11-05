/**
 * PANDA SELLS // CORE TYPES
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface SectionMetadata {
  id: string;
  tag: string;
  title: string;
  subtitle?: string;
  description?: string;
  status?: 'designed' | 'layout_ready' | 'concept';
}

export interface MetricItem {
  label: string;
  value: string;
  subtext: string;
}

export interface DropPreview {
  id: string;
  code: string;
  title: string;
  category: string;
  edition: string;
  status: 'upcoming' | 'curated' | 'archived';
  spec: string;
}
