import { describe, it, expect } from "vitest"
import Decimal from "decimal.js"
import {
  formatCurrency,
  parseCurrency,
  isValidAmount,
  addAmounts,
  subtractAmounts,
} from "./currency"

describe("formatCurrency", () => {
  it("formats a Decimal as PHP currency", () => {
    const result = formatCurrency(new Decimal("1234.56"))
    expect(result).toContain("1,234.56")
  })

  it("formats a number", () => {
    const result = formatCurrency(100)
    expect(result).toContain("100")
  })
})

describe("parseCurrency", () => {
  it("parses a plain number string", () => {
    expect(parseCurrency("250").toNumber()).toBe(250)
  })

  it("strips currency symbols", () => {
    expect(parseCurrency("₱1,234.56").toNumber()).toBe(1234.56)
  })
})

describe("isValidAmount", () => {
  it("returns true for a positive amount", () => {
    expect(isValidAmount("100")).toBe(true)
  })

  it("returns false for zero", () => {
    expect(isValidAmount("0")).toBe(false)
  })

  it("returns false for empty string", () => {
    expect(isValidAmount("")).toBe(false)
  })

  it("returns false for non-numeric", () => {
    expect(isValidAmount("abc")).toBe(false)
  })
})

describe("addAmounts", () => {
  it("adds amounts without floating point errors", () => {
    const result = addAmounts("0.1", "0.2")
    expect(result.toFixed(1)).toBe("0.3")
  })

  it("adds multiple amounts", () => {
    const result = addAmounts(100, 200, 50)
    expect(result.toNumber()).toBe(350)
  })
})

describe("subtractAmounts", () => {
  it("subtracts correctly", () => {
    const result = subtractAmounts("1000", "250.50")
    expect(result.toNumber()).toBe(749.5)
  })
})
