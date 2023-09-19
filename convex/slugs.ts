import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSlug = query({
  args: {
    slugId: v.id("slugs"),
  },
  handler: async (ctx, args) => {
    const slug = await ctx.db.get(args.slugId);
    console.log("getSlug", slug);
  },
});

export const getAllSlugs = query({
  handler: async (ctx) => {
    const slugs = await ctx.db.query("slugs").collect();
    return slugs;
  },
});

export const createSlug = mutation({
  args: {
    slug: v.string(),
    // startTime: v.string(),
  },
  handler: async (ctx, args) => {
    const slugId = await ctx.db.insert("slugs", {
      slug: args.slug,
      // startTime: args.startTime,
    });

    return slugId;
  },
});

export const updateSlug = mutation({
  args: { id: v.id("slugs"), passedTests: v.number(), failedTests: v.number() },
  handler: async (ctx, args) => {
    const { id } = args;
    console.log("getId", await ctx.db.get(id));

    await ctx.db.patch(id, {
      passedTests: args.passedTests,
      failedTests: args.failedTests,
    });
    console.log("patch data", await ctx.db.get(id));
  },
});
