import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  slugs: defineTable({
    slug: v.string(),
    startTime: v.number(),
    passedTests: v.optional(v.number()),
    failedTests: v.optional(v.number()),
    endTime: v.optional(v.number()),
    docText: v.string(),
  }),
});
