/**
 * Email Service — API calls for Email Logs & Custom Notifications
 */

import api from "./api";

// ── Types ─────────────────────────────────────────────────────────
export type TemplateType =
  | "birthday"
  | "eid_fitr"
  | "eid_adha"
  | "ramadan"
  | "jumma"
  | "islamic_new_year"
  | "custom";

export type RecipientType = "user" | "role" | "all";
export type UserRole = "patient" | "doctor" | "staff" | "admin";

export interface SendNotificationPayload {
  templateType: TemplateType;
  recipientType: RecipientType;
  userId?: string;
  role?: UserRole;
  customMessage?: string;
  senderName?: string;
  // For "custom" template
  subject?: string;
  title?: string;
  message?: string;
  emoji?: string;
  badgeText?: string;
  badgeColor?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface EmailLog {
  _id: string;
  to: string;
  subject: string;
  type: string;
  status: "sent" | "failed";
  userId?: { firstName: string; lastName: string; email: string; role: string } | null;
  messageId?: string;
  error?: string;
  durationMs: number;
  createdAt: string;
}

export interface EmailStats {
  summary: {
    total: number;
    totalSent: number;
    totalFailed: number;
    successRate: string;
  };
  byType: { _id: string; total: number; sent: number; failed: number; avgDurationMs: number }[];
  dailyStats: { _id: string; total: number; sent: number; failed: number }[];
  recentFailures: EmailLog[];
}

// ── API Calls ──────────────────────────────────────────────────────

/** Get email dashboard stats */
export const getEmailStats = async (): Promise<EmailStats> => {
  const res = await api.get("/email/stats");
  return res.data.data;
};

/** Get email logs with optional filters */
export const getEmailLogs = async (params?: {
  page?: number;
  limit?: number;
  status?: "sent" | "failed";
  type?: string;
}) => {
  const res = await api.get("/email/logs", { params });
  return res.data.data;
};

/** Delete a specific email log */
export const deleteEmailLog = async (logId: string) => {
  const res = await api.delete(`/email/logs/${logId}`);
  return res.data;
};

/** Purge old email logs */
export const purgeOldLogs = async (days: number = 30) => {
  const res = await api.delete(`/email/purge`, { params: { days } });
  return res.data;
};

/** Send a custom/festive notification (Admin or Doctor) */
export const sendCustomNotification = async (payload: SendNotificationPayload) => {
  const res = await api.post("/email/notify", payload);
  return res.data;
};
