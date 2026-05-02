export type AccountType =
  | "cash"
  | "bank"
  | "ewallet"
  | "credit_card"
  | "investment"

export type TransactionType = "expense" | "income" | "transfer"

export type CategoryType = "expense" | "income" | "both"

export type SubscriptionTier = "free" | "pro" | "family"

export type UserRole = "owner" | "member" | "readonly"
