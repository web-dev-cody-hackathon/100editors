import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const slug = await ctx.db
      .query("slugs")
      .filter((s) => s.eq(s.field("slug"), args.slug))
      .first();
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
  },
  handler: async (ctx, args) => {
    const existingSlug = await ctx.db
      .query("slugs")
      .filter((s) => s.eq(s.field("slug"), args.slug))
      .first();
    if (existingSlug) {
      console.log("slug already exists");
      const slugId = await ctx.db.replace(existingSlug._id, {
        slug: args.slug,
        startTime: existingSlug.startTime,
      });
      return slugId;
    } else {
      const slugId = await ctx.db.insert("slugs", {
        slug: args.slug,
        startTime: Date.now(),
      });
      return slugId;
    }
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
