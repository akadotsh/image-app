import { describe, it, expect, beforeEach, vi } from "vitest";
import { storage } from "../lib/utils";

describe("storage utility", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should set and get an item from localStorage", () => {
    storage.set("key", { test: "value" });
    const item = storage.get("key");
    expect(item).toBe(JSON.stringify({ test: "value" }));
  });

  it("should return null if the item is not found", () => {
    const item = storage.get("nonexistent");
    expect(item).toBe(null);
  });

  it("should remove an item from localStorage", () => {
    storage.set("key", { test: "value" });
    storage.remove("key");
    const item = storage.get("key");
    expect(item).toBe(null);
  });

  it("should clear all items from localStorage", () => {
    storage.set("key1", { test: "value1" });
    storage.set("key2", { test: "value2" });
    storage.clear();
    expect(storage.get("key1")).toBe(null);
    expect(storage.get("key2")).toBe(null);
  });
});
