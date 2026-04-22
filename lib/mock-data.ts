import { Campaign, Donation, Donor, IntegrationStatus, YearEndStatement } from "@/lib/domain";

export const campaigns: Campaign[] = [
  {
    id: "camp_general_expansion",
    name: "Community Health Expansion",
    slug: "community-health-expansion",
    description: "Fund the next phase of neighborhood-based care.",
    goalAmount: 150000,
    raisedAmount: 98750,
    status: "active",
    featured: true
  },
  {
    id: "camp_scholarships",
    name: "Youth Scholarship Fund",
    slug: "youth-scholarship-fund",
    description: "Open access for students through sponsored scholarships.",
    goalAmount: 50000,
    raisedAmount: 42800,
    status: "active",
    featured: true
  },
  {
    id: "camp_general",
    name: "General Fund",
    slug: "general-fund",
    description: "Flexible support where it is needed most.",
    goalAmount: 250000,
    raisedAmount: 136400,
    status: "active",
    featured: false
  }
];

export const donors: Donor[] = [
  {
    id: "donor_001",
    firstName: "Alex",
    lastName: "Jordan",
    email: "alex@example.org",
    lifetimeGiving: 2840,
    recurringStatus: "active",
    stripeCustomerId: "cus_12345",
    quickbooksCustomerId: "qb_991",
    mailchimpMemberId: "mc_100"
  },
  {
    id: "donor_002",
    firstName: "Morgan",
    lastName: "Lee",
    email: "morgan@example.org",
    lifetimeGiving: 500,
    recurringStatus: "none"
  }
];

export const donations: Donation[] = [
  {
    id: "gift_001",
    donorId: "donor_001",
    amount: 100,
    frequency: "monthly",
    designation: {
      type: "campaign",
      campaignId: "camp_scholarships",
      label: "Youth Scholarship Fund"
    },
    source: "embed",
    channel: "card",
    donatedAt: "2026-04-05T12:00:00.000Z",
    status: "succeeded",
    receiptSent: true
  },
  {
    id: "gift_002",
    donorId: "donor_001",
    amount: 250,
    frequency: "one-time",
    designation: {
      type: "general",
      label: "General Fund"
    },
    source: "admin",
    channel: "check",
    donatedAt: "2026-03-14T12:00:00.000Z",
    status: "succeeded",
    receiptSent: true
  },
  {
    id: "gift_003",
    donorId: "donor_002",
    amount: 500,
    frequency: "one-time",
    designation: {
      type: "campaign",
      campaignId: "camp_general_expansion",
      label: "Community Health Expansion"
    },
    source: "embed",
    channel: "ach",
    donatedAt: "2026-02-20T12:00:00.000Z",
    status: "succeeded",
    receiptSent: true
  }
];

export const statements: YearEndStatement[] = [
  {
    donorId: "donor_001",
    taxYear: 2025,
    totalAmount: 1640,
    generatedAt: "2026-01-08T09:30:00.000Z",
    deliveryStatus: "sent"
  }
];

export const integrationStatuses: IntegrationStatus[] = [
  {
    provider: "stripe",
    status: "connected",
    lastSync: "2026-04-21T13:30:00.000Z",
    detail: "Webhook delivery healthy. 0 failed events."
  },
  {
    provider: "quickbooks",
    status: "attention",
    lastSync: "2026-04-20T17:45:00.000Z",
    detail: "2 donations awaiting account mapping."
  },
  {
    provider: "mailchimp",
    status: "connected",
    lastSync: "2026-04-21T10:15:00.000Z",
    detail: "Audience sync completed with 1 new tag update."
  }
];

export const currentDonor = donors[0];
