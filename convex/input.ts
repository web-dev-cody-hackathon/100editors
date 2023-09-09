import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getInputValue = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("input").unique();
  },
});

export const updateInputValue = mutation({
  args: { id: v.id("input"), text: v.string() },
  handler: async (ctx, args) => {
    const { id, text } = args;
    await ctx.db.patch(id, { text: text });
  },
});