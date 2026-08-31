/**
 * A block of article body content. Legacy posts use plain strings (rendered as
 * paragraphs); richer posts use typed blocks. Paragraph and list text may contain
 * inline links written as `[label](/path)` — internal paths become <Link>, full
 * URLs open in a new tab.
 */
export type ContentBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type BlogBody = (string | ContentBlock)[];

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  /** ISO 8601 (YYYY-MM-DD) so it is valid in Article schema. Use `formatBlogDate` for display. */
  date: string;
  readTime: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  body: BlogBody;
  /** Optional Q&A block — rendered on the page and emitted as FAQPage schema. */
  faqs?: BlogFaq[];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-03-10" -> "March 10, 2026". Parsed manually to stay timezone-safe. */
export function formatBlogDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export const featuredPost: BlogPost = {
  slug: "chehalis-kitchen-transformation",
  tag: "Project Story",
  title: "The 10-Day Black & White Kitchen: A Chehalis Transformation",
  excerpt:
    "A family in Chehalis reached out after watching their kitchen age for 15 years. Outdated cabinets, worn countertops, and a layout that no longer worked for how they lived. Here's exactly what happened over 10 business days and the final result.",
  img: "/images/ba-after-chehalis.jpg",
  date: "2026-03-10",
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
    slug: "kitchen-remodel-cost-olympia",
    tag: "Cost Guide",
    title: "How Much Does a Kitchen Remodel Cost in Olympia, WA?",
    excerpt:
      "Most kitchen remodels in Olympia run $45,000 to $80,000, with layout changes starting around $70,000. Here is what drives the number, what it buys, and how the 10-day path compares.",
    img: "/images/welcome-kitchen-subway-tile.jpg",
    date: "2026-08-31",
    readTime: "8 min read",
    description:
      "A 2026 breakdown of kitchen remodel pricing in Olympia and the South Sound — real ranges by scope, the factors that move the cost, permit rules, and how a fixed 10 business day remodel works.",
    seoTitle: "Kitchen Remodel Cost in Olympia, WA (2026 Guide)",
    seoDescription:
      "What a kitchen remodel costs in Olympia and the South Sound in 2026 — real price ranges by scope, what drives the number, and how the 10-day path works.",
    body: [
      {
        type: "p",
        text: "Most kitchen remodels in Olympia and the wider South Sound start around $45,000 and run to $80,000 or more, with layout-change and structural projects starting around $70,000. The final number depends on three things: how much of the room you change, the cabinet and countertop lines you choose, and whether walls, plumbing, or electrical have to move.",
      },
      {
        type: "p",
        text: "This guide breaks down what that money actually buys, what pushes a project up or down within the range, and how a planned 10 business day remodel compares to an open-ended construction timeline.",
      },
      { type: "h2", text: "Kitchen remodel price ranges in the South Sound" },
      {
        type: "p",
        text: "Here is how projects tend to fall by scope. These are 10 Day Kitchens package ranges for homes in Thurston and Pierce Counties, not national averages.",
      },
      {
        type: "table",
        headers: ["Project type", "Typical range", "What's included"],
        rows: [
          [
            "Same-layout remodel",
            "$45,000 – $60,000",
            "New cabinets in the existing footprint, new countertops, sink and faucet, flooring, and lighting. No walls or plumbing moved.",
          ],
          [
            "Upgraded same-layout remodel",
            "$60,000 – $80,000",
            "Everything above with higher-end cabinet lines, quartz or natural stone, tile backsplash, upgraded appliances, and more cabinetry.",
          ],
          [
            "Executive remodel (layout changes)",
            "$70,000+",
            "Removing or moving walls, relocating plumbing or gas, adding electrical circuits, structural work, custom cabinetry, and a custom timeline.",
          ],
        ],
      },
      {
        type: "p",
        text: "Every 10 Day Kitchens project is quoted with a binding price before any work starts — the number in the contract is the number you pay. If your kitchen keeps its existing layout, it may qualify for [the 10 Day Kitchens Program](/10-day-kitchen-program).",
      },
      { type: "h2", text: "What drives the cost of a kitchen remodel" },
      { type: "h3", text: "1. How much you change the layout" },
      {
        type: "p",
        text: "This is the single biggest cost lever. Keeping the sink, range, and refrigerator where they are avoids plumbing, gas, and electrical relocation, keeps you out of most permit requirements, and is what makes a fast, fixed-price remodel possible.",
      },
      {
        type: "p",
        text: "Moving those elements — opening a wall to the dining room, adding an island with a sink, relocating the range — turns the project into an Executive Remodel with a custom scope and timeline.",
      },
      { type: "h3", text: "2. Cabinetry" },
      {
        type: "p",
        text: "Cabinets are usually the largest single line in a kitchen budget. 10 Day Kitchens carries four cabinet lines at different price points, all with plywood box construction, soft-close hinges and slides, and dovetail drawer boxes as standard. Where you land depends on door style, finish, and how much cabinetry the kitchen holds.",
      },
      { type: "h3", text: "3. Countertops" },
      {
        type: "p",
        text: "Quartz is the most common choice — consistent, low-maintenance, and priced predictably. Natural stone such as granite or marble costs more and varies slab to slab. Countertop cost scales with square footage and edge detail. Our guide on [quartz vs. granite](/blog/quartz-vs-granite) walks through the trade-offs.",
      },
      { type: "h3", text: "4. Appliances, flooring, and finishes" },
      {
        type: "p",
        text: "Appliance packages, flooring type, tile backsplash, lighting, and hardware each move the number by a few thousand dollars. These are also the easiest places to adjust a budget up or down during selections.",
      },
      { type: "h3", text: "5. The condition of what is behind the walls" },
      {
        type: "p",
        text: "Older Olympia homes — especially in South Capitol and other pre-war neighborhoods — sometimes need electrical brought to code or hidden plumbing addressed once the cabinets come off. A good contractor flags this risk during the first visit rather than after demolition.",
      },
      { type: "h2", text: "Do you need a permit for a kitchen remodel in Olympia?" },
      {
        type: "p",
        text: "Standard cabinet and countertop replacements usually do not require a permit. You generally need one when the project involves:",
      },
      {
        type: "list",
        items: [
          "Moving or adding plumbing",
          "New or relocated electrical circuits",
          "Removing or altering walls or other structural elements",
          "Gas line changes",
        ],
      },
      {
        type: "p",
        text: "For homes inside city limits, permits go through the City of Olympia; properties outside the city are typically reviewed by Thurston County. 10 Day Kitchens handles the permit application and inspections when a project needs them.",
      },
      { type: "h2", text: "Why a 10-day timeline changes the cost conversation" },
      {
        type: "p",
        text: "A traditional kitchen remodel often runs 6 to 12 weeks, and much of that time is waiting — for materials, for the next trade, for a decision that was not made yet. Every week the kitchen is out of use has a real cost to the household.",
      },
      {
        type: "p",
        text: "The 10 Day Kitchens Program front-loads all of that. Cabinets, counters, fixtures, flooring, and finishes are selected and ordered before the contract is signed, and every material is staged before day one. The result is a fixed 10 business day install window for qualified same-layout kitchens, and far less drift in the schedule or the budget. Our [day-by-day walkthrough](/blog/what-to-expect-10-day-remodel) covers what each day looks like.",
      },
      { type: "p", text: "This path fits when:" },
      {
        type: "list",
        items: [
          "The kitchen keeps its existing footprint and layout",
          "Plumbing, gas, appliances, and electrical locations stay in place",
          "No load-bearing walls or structural changes are involved",
          "Selections are finalized before the contract",
        ],
      },
      {
        type: "p",
        text: "Projects that need layout changes get an Executive Remodel scope with a custom timeline instead.",
      },
      { type: "h2", text: "How to get an accurate number for your kitchen" },
      {
        type: "p",
        text: "Online calculators and national averages only get you so far — Olympia pricing, your home's age, and your selections all matter. The fastest way to a real number:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Book a free in-home consultation. We look at the space, talk through what you want to change, and identify anything unusual behind the walls.",
          "Make your selections. Cabinets, counters, fixtures, and finishes at the Lacey showroom — most homeowners finish in one visit.",
          "Get a binding quote. One price, in writing, before any work begins.",
        ],
      },
      {
        type: "p",
        text: "See more about [kitchen remodeling in Olympia](/kitchen-remodel/olympia), or [schedule a free consultation](/contact) to price your project.",
      },
    ],
    faqs: [
      {
        q: "What is the average kitchen remodel cost in Olympia?",
        a: "Most Olympia kitchen remodels fall between $45,000 and $80,000. Same-layout projects that keep the plumbing and appliances in place start around $45,000; remodels with layout or structural changes start around $70,000.",
      },
      {
        q: "How long does a kitchen remodel take in Olympia?",
        a: "Qualified same-layout kitchens are completed in 10 business days. That timeline applies when the footprint stays put and all selections are finalized before installation. Projects with structural work receive a custom timeline.",
      },
      {
        q: "What is included in the price?",
        a: "Cabinetry, countertops, flooring, sink and fixtures, lighting, and installation, plus permit handling when required. The quote is binding — there are no hidden costs added later.",
      },
      {
        q: "Can I remodel my kitchen for under $45,000 in Olympia?",
        a: "Below roughly $45,000 you are generally looking at a partial update — refacing cabinets, swapping countertops, or a cosmetic refresh rather than a full remodel with new cabinetry and installation.",
      },
      {
        q: "Do you serve areas outside Olympia?",
        a: "Yes. 10 Day Kitchens works throughout Thurston and Pierce Counties, including Lacey, Tumwater, Tacoma, Lakewood, and the surrounding South Sound, from the showroom in Lacey.",
      },
    ],
  },
  {
    slug: "how-much-does-a-10-day-kitchen-cost",
    tag: "Cost Guide",
    title: "How Much Does a 10-Day Kitchen Remodel Cost?",
    excerpt:
      "The 10 Day Kitchens Program starts around $45,000 and is quoted at a fixed price before work begins. Here is what the number covers, what qualifies, and why a fast timeline does not mean a cheap one.",
    img: "/images/Materials Delivery.png",
    date: "2026-08-29",
    readTime: "7 min read",
    description:
      "What the 10 Day Kitchens Program costs, what is included in the fixed price, which kitchens qualify, and how the 10 business day timeline affects the budget.",
    seoTitle: "How Much Does a 10-Day Kitchen Remodel Cost?",
    seoDescription:
      "The 10 Day Kitchens Program starts around $45,000 with a binding fixed price. See what is included, which kitchens qualify, and how the fast timeline works.",
    body: [
      {
        type: "p",
        text: "The 10 Day Kitchens Program starts around $45,000 for a qualified same-layout kitchen and is quoted at a binding fixed price before any work begins. Most program kitchens land between $45,000 and $80,000 depending on cabinetry, countertops, and how much of the room is being replaced.",
      },
      {
        type: "p",
        text: "A fast timeline is not the same as a budget remodel. The 10-day schedule comes from planning and staging, not from cutting scope or using cheaper materials. Here is how the pricing actually works.",
      },
      { type: "h2", text: "What the fixed price includes" },
      {
        type: "list",
        items: [
          "Cabinetry from one of four lines, all with plywood boxes, soft-close hardware, and dovetail drawers",
          "Countertops — quartz, or natural stone as an upgrade",
          "Sink, faucet, and fixture installation",
          "Flooring and lighting",
          "Demolition, haul-away, and installation labor",
          "Permit handling and inspections when the project requires them",
          "A 5-year workmanship warranty",
        ],
      },
      {
        type: "p",
        text: "The quote is binding. The number in your contract is the number you pay — there are no allowances that balloon later or change orders for work that should have been scoped up front.",
      },
      { type: "h2", text: "What moves the price within the range" },
      { type: "h3", text: "Cabinet line and quantity" },
      {
        type: "p",
        text: "Cabinets are the largest single cost in most kitchens. The four lines sit at different price points, and a kitchen with a large island and floor-to-ceiling storage costs more than a compact galley regardless of line. Door style and finish also matter — a painted shaker in a premium line is a different number than a stained slab in an entry line. Our guide to [choosing a cabinet color](/blog/choosing-cabinet-colors) covers the design side.",
      },
      { type: "h3", text: "Countertop material" },
      {
        type: "p",
        text: "Quartz is predictable and included at program pricing. Natural stone adds cost and varies by slab. See [quartz vs. granite](/blog/quartz-vs-granite) for the trade-offs.",
      },
      { type: "h3", text: "Appliances and finishes" },
      {
        type: "p",
        text: "Appliance packages, tile backsplash, hardware, and lighting each shift the total by a few thousand dollars. These are the easiest levers to pull during selections if you need to hit a specific budget.",
      },
      { type: "h2", text: "Which kitchens qualify for the 10-day price?" },
      {
        type: "p",
        text: "The fixed 10 business day schedule and pricing apply when the project stays within the existing layout:",
      },
      {
        type: "list",
        items: [
          "The kitchen keeps its current footprint and cabinet configuration",
          "Plumbing, gas, appliances, and electrical stay in their current locations",
          "No load-bearing walls or structural work is involved",
          "All selections are finalized before the contract is signed",
        ],
      },
      {
        type: "p",
        text: "If you want to move the sink, open a wall, or add an island with plumbing, the project becomes an Executive Remodel — still a fixed quote, but with a custom scope and timeline that starts around $70,000. Read more about [the 10 Day Kitchens Program](/10-day-kitchen-program) and [what to expect day by day](/blog/what-to-expect-10-day-remodel).",
      },
      { type: "h2", text: "Why a faster remodel can cost less overall" },
      {
        type: "p",
        text: "A traditional remodel that drags for 8 to 12 weeks has hidden costs: more meals out, longer disruption, and more opportunities for the budget to drift as decisions get made mid-project. Locking every selection and the full price before day one removes most of that risk. You are paying for a planned two-week install, not an open-ended construction project.",
      },
      {
        type: "p",
        text: "The fastest way to a real number is a free in-home consultation. [Book one here](/contact) and we will bring the plan, the schedule, and a binding quote.",
      },
    ],
    faqs: [
      {
        q: "How much does the 10 Day Kitchens Program cost?",
        a: "Program kitchens start around $45,000 and typically run to $80,000, quoted at a binding fixed price before work begins. Executive Remodels with layout or structural changes start around $70,000.",
      },
      {
        q: "Is a 10-day kitchen cheaper than a regular remodel?",
        a: "Not necessarily. The speed comes from planning and staging, not from lower-cost materials. The advantage is a fixed price and a fixed timeline, which removes the budget drift common in long remodels.",
      },
      {
        q: "What if my kitchen does not qualify for the 10-day schedule?",
        a: "Kitchens that need layout changes, moved plumbing, or structural work are handled as Executive Remodels — still a fixed quote, with a custom timeline instead of the 10 business day window.",
      },
      {
        q: "Are there hidden costs or change orders?",
        a: "No. The contract price is binding. Selections and scope are finalized before work starts, so there are no allowances that increase later or surprise change orders.",
      },
    ],
  },
  {
    slug: "kitchen-remodel-cost-tacoma",
    tag: "Cost Guide",
    title: "How Much Does a Kitchen Remodel Cost in Tacoma, WA?",
    excerpt:
      "Kitchen remodels in Tacoma generally run $45,000 to $80,000, with layout and structural changes starting around $70,000. Here is what drives the number in Tacoma's older housing stock.",
    img: "/images/full kitchen with marble cpuntertop.jpg",
    date: "2026-08-27",
    readTime: "8 min read",
    description:
      "A 2026 guide to kitchen remodel pricing in Tacoma and Pierce County — real ranges by scope, what older Tacoma homes tend to need, permit rules, and the 10 business day path.",
    seoTitle: "Kitchen Remodel Cost in Tacoma, WA (2026 Guide)",
    seoDescription:
      "What a kitchen remodel costs in Tacoma in 2026 — price ranges by scope, what Tacoma's older homes tend to need, permits, and how the 10-day remodel works.",
    body: [
      {
        type: "p",
        text: "Most kitchen remodels in Tacoma start around $45,000 and run to $80,000 or more, with layout-change and structural projects starting around $70,000. Tacoma's housing stock spans a full century, so the biggest swing factor here is often what a remodel uncovers behind the walls of an older home.",
      },
      { type: "h2", text: "Kitchen remodel price ranges in Tacoma" },
      {
        type: "table",
        headers: ["Project type", "Typical range", "What's included"],
        rows: [
          [
            "Same-layout remodel",
            "$45,000 – $60,000",
            "New cabinets in the existing footprint, countertops, sink and faucet, flooring, and lighting. No walls or plumbing moved.",
          ],
          [
            "Upgraded same-layout remodel",
            "$60,000 – $80,000",
            "Higher-end cabinet lines, quartz or natural stone, tile backsplash, upgraded appliances, and more cabinetry.",
          ],
          [
            "Executive remodel (layout changes)",
            "$70,000+",
            "Opening closed-off kitchens, moving plumbing or gas, electrical upgrades, structural work, custom cabinetry, and a custom timeline.",
          ],
        ],
      },
      {
        type: "p",
        text: "Every quote is binding — the contract price is the price you pay. Same-layout kitchens may qualify for [the 10 Day Kitchens Program](/10-day-kitchen-program).",
      },
      { type: "h2", text: "What drives kitchen remodel cost in Tacoma" },
      { type: "h3", text: "The age of the home" },
      {
        type: "p",
        text: "Craftsman and Tudor homes in the North End and Proctor were built long before modern electrical and plumbing codes. When cabinets come off, older wiring often needs to be brought to code, and pre-war walls deserve a structural look before anything is removed. A good contractor assesses both during the first visit so it is in the quote, not a surprise after demolition.",
      },
      { type: "h3", text: "Opening up a closed layout" },
      {
        type: "p",
        text: "Many older Tacoma kitchens are walled off from the dining room. Opening that up is one of the most requested changes — and one of the biggest cost drivers, because it usually involves structural work, electrical rerouting, and sometimes plumbing. That moves the project into Executive Remodel territory.",
      },
      { type: "h3", text: "Cabinetry and countertops" },
      {
        type: "p",
        text: "As in any kitchen, cabinets are the largest single line, followed by countertops. Mid-century and 1980s–90s homes in the West End and Northeast Tacoma are often good candidates for efficient same-layout updates — swapping dated oak and laminate for shaker cabinetry and quartz without moving anything.",
      },
      { type: "h2", text: "Do you need a permit for a kitchen remodel in Tacoma?" },
      {
        type: "p",
        text: "Standard cabinet and countertop replacements usually do not require a permit. Permits are typically needed for plumbing changes, new or relocated electrical circuits, structural work, and gas line changes. In Tacoma these go through the City of Tacoma Planning and Development Services department. 10 Day Kitchens manages the application and inspections when a project requires them.",
      },
      { type: "h2", text: "How the showroom and timeline work for Tacoma homeowners" },
      {
        type: "p",
        text: "The 10 Day Kitchens showroom is in Lacey, about 35 minutes south of Tacoma on I-5. Most homeowners complete cabinet, countertop, and finish selections in a single visit, because everything is organized around the project schedule before installation begins. Qualified same-layout Tacoma kitchens are then installed in 10 business days; larger structural projects get a custom timeline in the contract.",
      },
      {
        type: "p",
        text: "For a real number on your kitchen, [book a free consultation](/contact) or see more about [kitchen remodeling in Tacoma](/kitchen-remodel/tacoma).",
      },
    ],
    faqs: [
      {
        q: "What is the average kitchen remodel cost in Tacoma?",
        a: "Most Tacoma kitchen remodels fall between $45,000 and $80,000. Same-layout projects start around $45,000; remodels that open up the layout or involve structural work start around $70,000.",
      },
      {
        q: "Why do older Tacoma homes sometimes cost more to remodel?",
        a: "Homes in the North End, Proctor, and Stadium District were built before modern codes. Electrical often needs updating and pre-war walls need structural review, both of which are assessed and priced during the first consultation.",
      },
      {
        q: "How long does a kitchen remodel take in Tacoma?",
        a: "Qualified same-layout kitchens are completed in 10 business days. Projects with structural changes or layout work receive a custom timeline stated in the contract.",
      },
      {
        q: "Where do Tacoma homeowners choose materials?",
        a: "At the 10 Day Kitchens showroom in Lacey, about 35 minutes from Tacoma via I-5. Most clients finish selections in one visit.",
      },
    ],
  },
  {
    slug: "bathroom-remodel-cost-south-sound",
    tag: "Cost Guide",
    title: "How Much Does a Bathroom Remodel Cost in the South Sound?",
    excerpt:
      "Bathroom remodel costs in the South Sound depend heavily on scope — a focused shower or tub update, a full guest bath, or a primary suite are three very different numbers. Here is how to think about it.",
    img: "/images/modern master bathroom with nice shower and double vanity.jpg",
    date: "2026-08-25",
    readTime: "6 min read",
    description:
      "How bathroom remodel pricing works in Olympia, Tacoma, and the South Sound — the difference between a Fast Bath update, a full bathroom remodel, and a primary suite.",
    seoTitle: "Bathroom Remodel Cost in the South Sound (2026)",
    seoDescription:
      "Bathroom remodel costs in Olympia, Tacoma, and the South Sound by scope — Fast Bath updates, full bathroom remodels, and primary suites, plus what drives the price.",
    body: [
      {
        type: "p",
        text: "Bathroom remodel cost comes down to scope more than anything else. A focused shower or tub replacement, a full guest bathroom, and a primary suite are three different projects with three different budgets. The ranges below are typical for the South Sound — your quote depends on the size of the room, the fixtures you choose, and whether plumbing moves.",
      },
      { type: "h2", text: "Bathroom remodel price ranges" },
      {
        type: "table",
        headers: ["Project type", "Typical range", "What's involved"],
        rows: [
          [
            "Fast Bath update",
            "$9,000 – $18,000",
            "Tub-to-shower conversion or shower replacement, new fixtures and surround, minimal disruption. Plumbing stays in place.",
          ],
          [
            "Full bathroom remodel",
            "$18,000 – $35,000",
            "New vanity, tile shower or tub, flooring, lighting, fixtures, and finishes in the existing footprint.",
          ],
          [
            "Primary suite remodel",
            "$35,000 – $60,000+",
            "Larger footprint, double vanity, tile shower with glass, freestanding tub, heated floors, and higher-end finishes. May involve layout changes.",
          ],
        ],
      },
      { type: "h2", text: "What drives bathroom remodel cost" },
      { type: "h3", text: "Whether plumbing moves" },
      {
        type: "p",
        text: "Keeping the toilet, sink, and shower drain where they are is the single biggest way to control cost. Relocating fixtures means opening walls and floors and adds both time and money.",
      },
      { type: "h3", text: "The shower" },
      {
        type: "p",
        text: "A tiled shower with a glass enclosure is usually the most expensive element in a bathroom, more than the vanity or flooring. Tile choice, niche and bench details, and the size of the glass all affect the number.",
      },
      { type: "h3", text: "Tile and finish level" },
      {
        type: "p",
        text: "Floor and wall tile, vanity material, faucet and fixture finishes, mirror and lighting — these compound quickly. A calm, consistent material palette usually looks better and costs less than mixing many finishes. Our [small bathroom design guide](/blog/small-bathroom-design-tips) covers getting more impact from a tight space.",
      },
      { type: "h3", text: "The condition of the subfloor and walls" },
      {
        type: "p",
        text: "Bathrooms hide water damage. Once tile and the vanity come out, a soft subfloor or damaged framing sometimes needs repair. A thorough contractor checks for this during the consultation and notes the risk in the quote.",
      },
      { type: "h2", text: "Fast Bath vs. a full bathroom remodel" },
      {
        type: "p",
        text: "If the layout works and you mainly want a better, safer, cleaner shower or tub, a [Fast Bath](/fast-bath) upgrade is the efficient path — lower cost, shorter timeline, less disruption. If the whole room feels dated or does not function, a full [bathroom remodel](/bathroom-remodel) replaces everything and is planned around a clear schedule with a 5-year workmanship warranty.",
      },
      {
        type: "p",
        text: "The only way to price your bathroom accurately is to look at it. [Book a free consultation](/contact) and we will walk through options, timeline, and a binding quote.",
      },
    ],
    faqs: [
      {
        q: "What is the average bathroom remodel cost in the South Sound?",
        a: "It depends on scope. A Fast Bath shower or tub update typically runs $9,000 to $18,000; a full bathroom remodel $18,000 to $35,000; a primary suite $35,000 to $60,000 or more.",
      },
      {
        q: "What is the most expensive part of a bathroom remodel?",
        a: "Usually the shower — a tiled shower with a glass enclosure costs more than the vanity or flooring. Moving plumbing is the other major cost driver.",
      },
      {
        q: "How can I keep my bathroom remodel affordable?",
        a: "Keep the fixtures where they are, choose a simple consistent tile and finish palette, and consider a Fast Bath update if the layout already works and only the shower or tub needs attention.",
      },
      {
        q: "Do you offer a warranty on bathroom remodels?",
        a: "Yes. Full bathroom remodels come with a 5-year workmanship warranty.",
      },
    ],
  },
  {
    slug: "choosing-cabinet-colors",
    tag: "Design Tips",
    title: "How to Choose the Right Cabinet Color for Your Kitchen",
    excerpt:
      "Cabinet color sets the entire mood of your kitchen. We break down the most popular palettes and what they say about how you live.",
    img: "/images/Hunter Green Kitchen.png",
    date: "2026-02-28",
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
    date: "2026-02-14",
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
    date: "2026-01-30",
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
    img: "/images/Modern Farmhouse Two-Tone Kitchen.png",
    date: "2026-01-15",
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
    date: "2025-12-20",
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
    date: "2025-12-05",
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
