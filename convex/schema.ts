import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  slugs: defineTable({
    slug: v.string(),
    // startTime: v.string(),
    passedTests: v.optional(v.number()),
    failedTests: v.optional(v.number()),
  }),
});
