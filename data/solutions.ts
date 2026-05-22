import {
  BarChart3,
  Layers,
  FlaskConical,
  ShieldCheck,
  MapPin,
  RefreshCw,
} from 'lucide-react';

export const solutions = [
  {
    id: 'metals-alloys',
    icon: BarChart3,
    title: 'Metals & Alloys Sourcing',
    description: 'Access 6,000+ metal SKUs across carbon steel, stainless, aluminum, copper, titanium, and specialty alloys',
    features: [
      'Full mill certification',
      'Traceable heat numbers',
      'Carbon & stainless steel',
      'Titanium & specialty alloys',
    ],
  },
  {
    id: 'polymers-composites',
    icon: Layers,
    title: 'Polymers & Composites',
    description: 'From engineering-grade thermoplastics to high-performance fiber-reinforced composites',
    features: [
      'Verified polymer suppliers',
      'Fiber-reinforced composites',
      'Engineering thermoplastics',
      'Spec-matched sourcing',
    ],
  },
  {
    id: 'coatings-chemicals',
    icon: FlaskConical,
    title: 'Coatings & Surface Chemicals',
    description: 'Industrial coatings, adhesives, sealants, and process chemicals from certified manufacturers',
    features: [
      'SDS documentation included',
      'Compliance flags built-in',
      'Application guidance',
      'Certified manufacturers',
    ],
  },
  {
    id: 'compliance-certs',
    icon: ShieldCheck,
    title: 'Compliance & Certification Management',
    description: 'Automated cert validation, conflict minerals reporting, REACH/RoHS flagging, and DFARS tracking',
    features: [
      'Automated cert validation',
      'REACH/RoHS flagging',
      'DFARS compliance tracking',
      'Audit-ready records',
    ],
  },
  {
    id: 'multi-site-fulfillment',
    icon: MapPin,
    title: 'Multi-Site Fulfillment Coordination',
    description: 'Coordinates split fulfillment, site-specific delivery scheduling, and unified invoicing across all locations',
    features: [
      'Split fulfillment support',
      'Site-specific scheduling',
      'Unified invoicing',
      'Single account management',
    ],
  },
  {
    id: 'predictive-reorder',
    icon: RefreshCw,
    title: 'Predictive Reorder & Inventory Intelligence',
    description: 'Connect your production schedule to your procurement cadence — before a shortage hits your floor',
    features: [
      'Consumption-based alerts',
      'Production schedule sync',
      'Shortage risk flagging',
      'Reorder cadence planning',
    ],
  },
];
