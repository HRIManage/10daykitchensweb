export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  date: string;
  readTime: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
};

export const featuredPost: BlogPost = {
  slug: "chehalis-kitchen-transformation",
  tag: "Project Story",
  title: "The 10-Day Black & White Kitchen: A Chehalis Transformation",
  excerpt:
    "A family in Chehalis reached out after watching their kitchen age for 15 years. Outdated cabinets, worn countertops, and a layout that no longer worked for how they lived. Here's exactly what happened over 10 business days and the final result.",
  img: "/images/ba-after-chehalis.jpg",
  date: "March 10, 2026",
  readTime: "5 min read",
  description:
    "A real Chehalis kitchen remodel story from first consultation through final walkthrough, completed on a disciplined 10 business day schedule.",
  seoTitle: "Chehalis Kitchen Transformation | 10 Day Kitchens",
  seoDescription:
    "See how a dated Chehalis kitchen moved from worn finishes to a crisp black and white remodel in 10 business days. Read the full project story.",
  body: [
    "This project started with a familiar problem: a kitchen that still functioned, but no longer felt like it supported how the family actually lived. Cabinets were worn, the counters had reached the end of their life, and the room felt darker and tighter than it needed to.",
    "Because the layout still worked, the homeowners were a good fit for the 10 Day Kitchens Program. That meant we could focus on careful measurements, selection planning, material staging, and a fast installation window instead of turning the remodel into a long construction process.",
    "The result was a sharper black and white palette, cleaner cabinetry, brighter surfaces, and a room that feels easier to use every day. It is a good example of how much a kitchen can change when the planning is complete before the first day on site.",
  ],
};

export const blogPosts: BlogPost[] = [
  featuredPost,
  {
    slug: "choosing-cabinet-colors",
    tag: "Design Tips",
    title: "How to Choose the Right Cabinet Color for Your Kitchen",
    excerpt:
      "Cabinet color sets the entire mood of your kitchen. We break down the most popular palettes and what they say about how you live.",
    img: "/images/Hunter Green Kitchen.png",
    date: "February 28, 2026",
    readTime: "4 min read",
    description:
      "A practical guide to cabinet color choices, contrast, light, and finish direction for kitchen remodels in the South Sound.",
    seoTitle: "How to Choose Kitchen Cabinet Colors | 10 Day Kitchens",
    seoDescription:
      "Learn how to choose kitchen cabinet colors that fit your light, layout, and lifestyle. Read practical design guidance from 10 Day Kitchens.",
    body: [
      "Cabinet color affects more than style. It changes how bright the room feels, how much contrast you notice, and whether the kitchen feels quiet, bold, warm, or more architectural.",
      "Homes with limited natural light often benefit from lighter cabinet colors that help reflect available daylight. Larger rooms can support deeper tones when the counters, backsplash, and flooring keep the palette balanced.",
      "The best cabinet color is usually the one that works with the rest of the house, not the one that stands out in isolation. We always recommend choosing cabinets alongside slab samples, flooring, and fixture finishes rather than as a single decision.",
    ],
  },
  {
    slug: "heloc-vs-cash-out-refi",
    tag: "Financing",
    title: "HELOC vs. Cash-Out Refi: Which Is Right for Your Remodel?",
    excerpt:
      "Tapping into home equity is one of the smartest ways to fund a renovation. Here's how to decide between a HELOC and a cash-out refinance.",
    img: "/images/Design Review Meeting.png",
    date: "February 14, 2026",
    readTime: "6 min read",
    description:
      "Compare HELOC financing and cash-out refinance options for kitchen and bath remodeling projects with clearer tradeoffs in mind.",
    seoTitle: "HELOC vs Cash-Out Refi for Remodeling | 10 Day Kitchens",
    seoDescription:
      "Compare HELOC and cash-out refinance options for your remodel. Understand the tradeoffs before funding a kitchen or bath project.",
    body: [
      "A HELOC gives you a flexible line of credit that can be useful when a project unfolds in phases or when you want to borrow only what you use. A cash-out refinance replaces your existing mortgage and can make sense when rates and long-term payment structure line up in your favor.",
      "The right choice depends on your current mortgage, how much equity you have, and whether the remodel scope is tightly defined. For many homeowners, the decision comes down to flexibility versus payment predictability.",
      "We are not a lender, but we do help clients think through scope, timing, and budget so financing conversations happen with a clearer picture of the actual project.",
    ],
  },
  {
    slug: "quartz-vs-granite",
    tag: "Materials",
    title: "Quartz vs. Granite: Which Countertop Is Right for You?",
    excerpt:
      "Both are beautiful, but they behave very differently over time. We help you make the call based on how your family actually uses the kitchen.",
    img: "/images/Material Selection Boards.png",
    date: "January 30, 2026",
    readTime: "5 min read",
    description:
      "Quartz and granite each solve different needs. Compare maintenance, look, and long-term use before choosing counters.",
    seoTitle: "Quartz vs Granite Countertops | 10 Day Kitchens",
    seoDescription:
      "Compare quartz and granite countertops for durability, maintenance, and style. Find the right surface for your kitchen remodel.",
    body: [
      "Quartz is consistent, lower maintenance, and easier to shop as a repeatable product. Granite brings more natural variation and can be a great fit when you want movement and one-of-a-kind character.",
      "The right countertop depends on how you cook, how much maintenance you want to take on, and what the rest of the material palette is doing. Busy family kitchens often lean quartz for simplicity, while design-led projects sometimes benefit from the natural variation of stone.",
      "The most useful comparison happens in person. Looking at slab samples next to cabinets, flooring, and backsplash options is usually what makes the decision clear.",
    ],
  },
  {
    slug: "signs-time-to-remodel",
    tag: "Kitchen Tips",
    title: "5 Signs It's Time to Remodel Your Kitchen",
    excerpt:
      "Worn cabinets and outdated layouts aren't just cosmetic problems. They affect how you use your home every single day. Here's when to act.",
    img: "/images/Transitional White & Walnut Kitchen.png",
    date: "January 15, 2026",
    readTime: "3 min read",
    description:
      "A short guide to recognizing when an aging kitchen is affecting function, storage, comfort, and daily use enough to justify a remodel.",
    seoTitle: "Signs It's Time to Remodel Your Kitchen | 10 Day Kitchens",
    seoDescription:
      "See the biggest signs it is time to remodel your kitchen, from worn cabinetry and poor storage to layouts that slow down daily life.",
    body: [
      "If the kitchen slows down daily routines, wastes storage, or makes cooking feel harder than it should, the problem is not only aesthetic. It is functional.",
      "Repeated cabinet repairs, failing counters, worn flooring, and poor lighting are often the clearest signals. Another strong sign is when the room technically works but no longer supports how the household actually uses it.",
      "A remodel is usually worth exploring when the pain points are happening every day, not just when the room looks dated in photos.",
    ],
  },
  {
    slug: "what-to-expect-10-day-remodel",
    tag: "Process",
    title: "What to Expect During Your 10-Day Kitchen Remodel",
    excerpt:
      "Day by day, here's exactly what happens from the moment our crew arrives to the final walkthrough and how we keep your home livable throughout.",
    img: "/images/Materials Delivery.png",
    date: "December 20, 2025",
    readTime: "7 min read",
    description:
      "A day-by-day overview of the 10 Day Kitchens process, from preparation and materials to installation and final walkthrough.",
    seoTitle: "What to Expect During a 10-Day Kitchen Remodel",
    seoDescription:
      "See what happens during a 10-day kitchen remodel, from prep and delivery through installation and final walkthrough.",
    body: [
      "The speed of the program comes from planning, not rushing. Cabinets, counters, fixtures, flooring, and finish decisions are handled before the first day on site so the install window can stay focused.",
      "During the active construction days, the project moves through demolition, prep, installation, finish work, and walkthrough on a coordinated schedule. The exact day-to-day sequence can shift a little by scope, but the discipline is the same.",
      "The biggest difference homeowners feel is less drift. The project is not waiting on late selections, missing material, or unclear next steps because those decisions were already made.",
    ],
  },
  {
    slug: "small-bathroom-design-tips",
    tag: "Bath Tips",
    title: "Small Bathroom, Big Impact: Design Strategies That Work",
    excerpt:
      "Limited square footage doesn't mean limited style. These layout and material choices can make any bathroom feel twice as large.",
    img: "/images/White Oak Spa Bathroom.png",
    date: "December 5, 2025",
    readTime: "4 min read",
    description:
      "Smart layout, finish, and storage strategies for making a small bathroom feel brighter, calmer, and easier to use.",
    seoTitle: "Small Bathroom Design Tips | 10 Day Kitchens",
    seoDescription:
      "Make a small bathroom feel bigger with layout, storage, and finish strategies that improve comfort without wasting space.",
    body: [
      "Small bathrooms benefit most from discipline. Fewer visual interruptions, better lighting, and stronger storage usually matter more than adding more material variety.",
      "Floating vanities, cleaner shower glass, brighter surfaces, and smarter mirror lighting can all help the room feel larger. Storage also matters because clutter shrinks the room faster than square footage does.",
      "The best small-bath moves are the ones that improve use first and style second. When the room works better, it almost always looks better too.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
