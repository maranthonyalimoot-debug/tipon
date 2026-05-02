import Decimal from "decimal.js"

export function formatCurrency(amount: Decimal | number | string): string {
  const value = new Decimal(amount)
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value.toNumber())
}

export function parseCurrency(input: string): Decimal {
  const cleaned = input.replace(/[^0-9.-]/g, "")
  return new Decimal(cleaned || "0")
}

export function isValidAmount(input: string): boolean {
  const cleaned = input.replace(/[^0-9.-]/g, "")
  if (!cleaned) return false
  try {
    const val = new Decimal(cleaned)
    return val.isFinite() && val.greaterThan(0)
  } catch {
    return false
  }
}

export function addAmounts(...amounts: (Decimal | number | string)[]): Decimal {
  return amounts.reduce<Decimal>(
    (acc, amt) => acc.plus(new Decimal(amt)),
    new Decimal(0)
  )
}

export function subtractAmounts(
  a: Decimal | number | string,
  b: Decimal | number | string
): Decimal {
  return new Decimal(a).minus(new Decimal(b))
}
