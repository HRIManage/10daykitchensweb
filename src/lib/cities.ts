export interface CityFaq {
  question: string;
  answer: string;
}

export interface City {
  slug: string;
  name: string;
  county: string;
  distanceMiles: number;
  driveTime: string;
  tier: 1 | 2 | 3;
  published: boolean;
  /** 40–60 word answer-first paragraph an AI assistant can quote verbatim. */
  intro: string;
  neighborhoods: { name: string; note: string }[];
  /** 150–250 words: permits, housing stock, what locals typically want. */
  localContext: string;
  faqs: CityFaq[];
  testimonial?: { quote: string; name: string; project: string };
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  nearbySlugs: string[];
}

export const cities: City[] = [
  {
    slug: "tacoma",
    name: "Tacoma",
    county: "Pierce County",
    distanceMiles: 28,
    driveTime: "about 35 minutes",
    tier: 1,
    published: true,
    intro:
      "10 Day Kitchens provides kitchen remodeling in Tacoma, WA — cabinetry, countertops, flooring, and fixtures installed in 10 business days. We're a family-owned, licensed remodeler serving Tacoma homeowners from our Lacey showroom, with kitchen packages from $30,000 and a 5-year workmanship warranty.",
    neighborhoods: [
      {
        name: "Proctor & North End",
        note: "Craftsman and Tudor homes from the early 1900s, where remodels often mean opening closed-off kitchens to dining rooms while keeping period character in cabinet and trim details.",
      },
      {
        name: "Stadium District",
        note: "Historic homes and condos where galley kitchens benefit from smarter storage, counter-depth appliances, and light-maximizing finishes.",
      },
      {
        name: "West End & Northeast Tacoma",
        note: "Mid-century and 1980s–90s homes where dated oak cabinets and laminate counters give way to quartz, shaker cabinetry, and open sight lines.",
      },
    ],
    localContext:
      "Tacoma's housing stock spans a full century — from turn-of-the-century Craftsman homes in the North End to newer construction near Northeast Tacoma — and each era brings different remodel considerations. Older Tacoma homes frequently need electrical updates brought to code during a kitchen remodel, and wall removals in pre-war homes deserve careful structural review; we assess both in your first consultation. Permits, when required for plumbing, electrical, or structural changes, go through the City of Tacoma's Planning and Development Services department, and we handle that process for you. Most cabinet-and-countertop replacements don't require permits at all. Tacoma homeowners come to us most often for full kitchen updates on 1950s–1990s homes: replacing dated cabinetry with soft-close shaker lines, laminate with quartz, and closed layouts with open ones. Our showroom in Lacey is about 35 minutes south on I-5 — one visit is usually all it takes to select cabinets, counters, and finishes, because we organize every selection around your project schedule before installation begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Tacoma?",
        answer:
          "10 business days for our signature package — that's the schedule, not a sales pitch. We pre-order and stage all materials before day one, so a Tacoma kitchen goes from demo to final walkthrough in two working weeks. Larger structural projects get a custom timeline in your contract.",
      },
      {
        question: "Do you handle permits in Tacoma?",
        answer:
          "Yes. When your project needs a permit — typically for plumbing, electrical, or structural changes — we manage the application through the City of Tacoma Planning and Development Services. Standard cabinet and countertop replacements usually don't require one.",
      },
      {
        question: "What does a kitchen remodel cost in Tacoma?",
        answer:
          "Our 10-Day Package ranges from $30,000 for smaller kitchens to $80,000+ for large ones; Executive Remodels with structural work start at $70,000. You get a binding quote before any work begins — no hidden costs.",
      },
      {
        question: "Do you serve all of Tacoma?",
        answer:
          "Yes — from the North End and Proctor to the West End, South Tacoma, and Northeast Tacoma, plus neighboring Fife, University Place, and Lakewood.",
      },
      {
        question: "Where can I see cabinets and countertops in person?",
        answer:
          "Our showroom at 8695 Martin Way E in Lacey is about 35 minutes from Tacoma via I-5. You'll see full cabinet lines, quartz surfaces, and finished displays — most clients complete their selections in a single visit.",
      },
    ],
    metaTitle: "Kitchen Remodel Tacoma WA | Done in 10 Days",
    metaDescription:
      "Kitchen remodeling in Tacoma, WA installed in 10 business days. Family-owned, licensed & insured, 5-year warranty. Packages from $30k. Free consultation.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["university-place", "lakewood", "fife", "puyallup"],
  },
  {
    slug: "olympia",
    name: "Olympia",
    county: "Thurston County",
    distanceMiles: 5,
    driveTime: "about 10 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Olympia, WA can move fast without feeling rushed. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom keeps the plan, selections, and schedule under one roof.",
    neighborhoods: [
      {
        name: "South Capitol",
        note: "Historic houses near the Capitol often bring smaller kitchens, original trim, and aging systems, so remodels usually focus on better storage, brighter finishes, and careful updates that respect the home’s character.",
      },
      {
        name: "Westside",
        note: "Many Westside homes are mid-century ramblers or later infill with straightforward footprints, which makes them good candidates for cleaner cabinet layouts, bigger work zones, and more practical everyday storage.",
      },
      {
        name: "Downtown Olympia",
        note: "Downtown condos, townhomes, and compact older properties tend to need space-efficient kitchens and baths, so homeowners usually ask for smarter storage, lighter materials, and easier-to-maintain surfaces.",
      },
    ],
    localContext:
      "Olympia homes range from South Capitol historic properties and Downtown condos to Westside ramblers and newer infill around the city core. For homes inside city limits, permits are handled by the City of Olympia; properties outside the city usually fall under Thurston County review. That matters when plumbing, electrical, or structural work is part of the job. Olympia homeowners often want brighter kitchens, more storage, better traffic flow, and bathrooms that feel cleaner without losing the home's original feel. Older houses may need extra planning around small footprints, dated wiring, or hidden plumbing, while mid-century homes often benefit from opening the room and replacing older cabinets with simpler, more efficient storage. Our Lacey showroom is about 10 minutes away, so cabinet, counter, fixture, and finish selections can usually be handled in one focused visit before work begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Olympia?",
        answer:
          "Qualified Olympia kitchens can be completed in 10 business days. The schedule applies when the layout stays put and selections are finalized before installation. Projects with structural changes receive a custom timeline instead.",
      },
      {
        question: "Do you handle permits in Olympia?",
        answer:
          "Yes. Projects inside Olympia city limits go through the City of Olympia, while homes outside the city are typically reviewed by Thurston County. We help coordinate permits when plumbing, electrical, or structural work is involved.",
      },
      {
        question: "What does a kitchen remodel cost in Olympia?",
        answer:
          "Olympia kitchen remodels start at $45,000 and rise with layout changes, cabinet count, materials, and scope. Larger custom projects are priced separately after we measure the space and define the work.",
      },
      {
        question: "Do you serve Olympia neighborhoods?",
        answer:
          "Yes. We serve South Capitol, Westside, and Downtown Olympia, along with nearby areas that want the same mix of speed, planning, and quality workmanship.",
      },
      {
        question: "Where do selections happen for Olympia projects?",
        answer:
          "Selections happen at our Lacey showroom, about 10 minutes from Olympia. Most homeowners can narrow cabinets, counters, fixtures, and finishes in one visit before the project schedule is locked in.",
      },
    ],
    metaTitle: "Kitchen Remodel Olympia WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Olympia, WA in 10 business days. From $45,000 with nearby Lacey showroom support. Book your free consultation with our team today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["lacey", "tumwater", "yelm"],
  },
  {
    slug: "lacey",
    name: "Lacey",
    county: "Thurston County",
    distanceMiles: 0,
    driveTime: "Our Lacey showroom",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Lacey, WA starts right where our showroom is based. Qualified projects are completed in 10 business days, pricing begins from $45,000, and your cabinet, counter, and fixture selections happen right here in Lacey.",
    neighborhoods: [
      {
        name: "Hawks Prairie",
        note: "Hawks Prairie homes are often newer and layout-stable, which makes them strong candidates for same-layout kitchen updates, better storage planning, and bathroom finish packages that feel more custom than builder standard.",
      },
      {
        name: "Meridian Campus",
        note: "Homes around Meridian Campus usually support practical remodel planning, so owners often ask for larger islands, brighter counters, and bathrooms that clean up the everyday look without forcing a total overhaul.",
      },
      {
        name: "Jubilee",
        note: "Jubilee homes frequently call for refined kitchens and easier-access baths, with homeowners prioritizing durable finishes, cleaner lines, and spaces that support long-term comfort.",
      },
    ],
    localContext:
      "Lacey remodels cover everything from established neighborhoods with older kitchens to newer planned communities where the bones are sound but the finishes feel too generic. Permit review inside city limits generally goes through the City of Lacey, while outlying properties can move through Thurston County depending on location. Because our showroom is in Lacey, these projects tend to move efficiently: measurements, selections, scheduling, and scope conversations can all happen without asking the homeowner to travel across the region. Lacey clients often want kitchens that feel more intentional than builder-grade originals, with stronger storage, warmer cabinet colors, and counters that hold up to daily use. Bathroom requests usually center on better lighting, simpler maintenance, and finishes that make the room feel more complete. The benefit for Lacey homeowners is proximity: materials, project planning, and support are all close at hand before the install window begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Lacey?",
        answer:
          "Qualified Lacey kitchens can be completed in 10 business days. That faster schedule is most common when the layout stays in place and all design selections are finalized before installation begins.",
      },
      {
        question: "Do you handle permits in Lacey?",
        answer:
          "Yes. Projects inside Lacey generally go through the City of Lacey, while some nearby properties may move through Thurston County. We coordinate permit work whenever the scope requires it.",
      },
      {
        question: "What does a kitchen remodel cost in Lacey?",
        answer:
          "Lacey kitchen remodels start at $45,000 and increase with cabinet size, countertop area, finish level, and whether the project stays same-layout or becomes fully custom.",
      },
      {
        question: "Do you work throughout Lacey?",
        answer:
          "Yes. We serve Hawks Prairie, Meridian Campus, Jubilee, and residential neighborhoods throughout Lacey with kitchen, bath, and finish-driven remodel work.",
      },
      {
        question: "Where do Lacey homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom because that is our home base. You can compare cabinets, slab samples, plumbing fixtures, and finish combinations without leaving the city.",
      },
    ],
    metaTitle: "Kitchen Remodel Lacey WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Lacey, WA in 10 business days. Starting at $45,000 with showroom access right in Lacey. Schedule a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["olympia", "tumwater"],
  },
  {
    slug: "tumwater",
    name: "Tumwater",
    county: "Thurston County",
    distanceMiles: 8,
    driveTime: "about 12 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Tumwater, WA should feel organized from day one. Qualified projects move in 10 business days, pricing starts from $45,000, and our Lacey showroom is close enough to make cabinets, counters, and finish selections easy to handle in person.",
    neighborhoods: [
      {
        name: "Tumwater Hill",
        note: "Older homes on Tumwater Hill often have compact kitchens and chopped-up circulation, so remodels usually focus on brighter finishes, better storage, and layout improvements that make everyday cooking feel less cramped.",
      },
      {
        name: "Brewery District",
        note: "Historic properties near the Brewery District bring older framing, smaller rooms, and preservation-minded details, which means remodel planning often balances new function with the texture and proportions of the original home.",
      },
      {
        name: "Deschutes River Highlands",
        note: "Newer Deschutes River Highlands homes typically support cleaner scope planning, making them strong fits for same-layout kitchen updates, larger islands, and bathroom finish upgrades with fewer hidden conditions.",
      },
    ],
    localContext:
      "Tumwater homeowners bring a mix of goals because the city includes older neighborhoods near the historic core, mid-century areas on Tumwater Hill, and newer subdivisions on the south and west sides. Inside city limits, permits go through the City of Tumwater; homes outside the city boundary are usually reviewed by Thurston County. That distinction matters when plumbing, electrical, gas, or structural work enters the picture. We hear two common requests in Tumwater: kitchens that need more efficient storage and brighter surfaces, and bathrooms that feel easier to clean and more current without overbuilding the space. Older homes can call for extra planning around tight footprints or outdated systems, while newer homes are often better candidates for fast same-layout improvements. Our Lacey showroom is about 12 minutes away, so most Tumwater clients can handle cabinet, slab, fixture, and finish selections without a long trip or a separate design day.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Tumwater?",
        answer:
          "Qualified Tumwater kitchens can be installed in 10 business days. That timeline works when the footprint stays in place and selections are locked before the first day on site.",
      },
      {
        question: "Do you handle permits in Tumwater?",
        answer:
          "Yes. Projects inside Tumwater city limits typically go through the City of Tumwater, while nearby county properties are usually reviewed by Thurston County. We coordinate that process when permit work is required.",
      },
      {
        question: "What does a kitchen remodel cost in Tumwater?",
        answer:
          "Tumwater kitchen remodels start at $45,000 and increase with cabinet volume, finish level, and whether the job stays same-layout or moves into custom work. We price the final scope after measurement and selections.",
      },
      {
        question: "Do you serve all parts of Tumwater?",
        answer:
          "Yes. We work in Tumwater Hill, the Brewery District, Deschutes River Highlands, and surrounding residential areas throughout Tumwater.",
      },
      {
        question: "Where do Tumwater clients make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 12 minutes from Tumwater. That keeps cabinets, counters, fixtures, and finish decisions close by and easy to compare in one visit.",
      },
    ],
    metaTitle: "Kitchen Remodel Tumwater WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Tumwater, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["olympia", "lacey", "yelm"],
  },
  {
    slug: "dupont",
    name: "DuPont",
    county: "Pierce County",
    distanceMiles: 14,
    driveTime: "about 18 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in DuPont, WA works best with a tight plan and fast execution. Qualified jobs are completed in 10 business days, pricing begins from $45,000, and our Lacey showroom gives DuPont homeowners a nearby place to make selections with confidence.",
    neighborhoods: [
      {
        name: "NW Landing",
        note: "NW Landing homes are largely newer planned-community builds, so remodels often center on builder-grade kitchens and baths that need warmer finishes, better storage, and a more tailored feel.",
      },
      {
        name: "Bell Hill",
        note: "Bell Hill homes usually have practical modern footprints, which makes them good candidates for same-layout kitchen updates, cleaner cabinet lines, and bathroom refreshes that improve function without major disruption.",
      },
      {
        name: "DuPont Village",
        note: "Properties near DuPont Village often call for finish upgrades rather than structural change, so homeowners typically ask for counters, cabinetry, lighting, and bath surfaces that lift the whole house at once.",
      },
    ],
    localContext:
      "DuPont is different from many older South Sound cities because so much of its housing stock is newer and planned. That means many remodel conversations start with builder-original kitchens, standard vanities, and finishes that still function but no longer reflect how the homeowner wants the space to feel. For homes inside city limits, permit review goes through the City of DuPont; properties outside the city generally shift to Pierce County review. In DuPont we most often hear requests for more usable islands, better pantry storage, upgraded counters, and bathrooms that feel less basic and more durable. Because so many homes have straightforward footprints and predictable systems, the city is often a strong fit for same-layout remodel planning. Our Lacey showroom is about 18 minutes away, which makes the selection process simple for DuPont clients who want to compare cabinet colors, slab options, and bath finishes without a long drive.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in DuPont?",
        answer:
          "Qualified DuPont kitchens can be completed in 10 business days. That works especially well in newer same-layout homes where selections are made early and materials are staged before installation begins.",
      },
      {
        question: "Do you handle permits in DuPont?",
        answer:
          "Yes. Homes within DuPont usually go through the City of DuPont for permit review, while nearby non-city properties may fall under Pierce County. We handle that coordination when the scope requires it.",
      },
      {
        question: "What does a kitchen remodel cost in DuPont?",
        answer:
          "DuPont remodels start at $45,000 and scale upward based on cabinet count, countertop size, appliance needs, and whether the project stays same-layout or becomes a custom renovation.",
      },
      {
        question: "Do you work throughout DuPont?",
        answer:
          "Yes. We serve NW Landing, Bell Hill, DuPont Village, and other residential pockets across the city.",
      },
      {
        question: "How close is the showroom for DuPont homeowners?",
        answer:
          "Our Lacey showroom is about 18 minutes from DuPont. That short drive makes it easy to review cabinets, counters, plumbing fixtures, and finish samples in person before work starts.",
      },
    ],
    metaTitle: "Kitchen Remodel DuPont WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in DuPont, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom access. Schedule a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["lakewood", "steilacoom", "olympia"],
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    county: "Pierce County",
    distanceMiles: 20,
    driveTime: "about 25 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Lakewood, WA often starts with homes that need smarter flow and more durable finishes. Qualified projects are finished in 10 business days, pricing starts from $45,000, and our Lacey showroom keeps product selections close and straightforward.",
    neighborhoods: [
      {
        name: "Oakbrook",
        note: "Oakbrook homes often have larger footprints and established family layouts, so remodels usually target dated cabinetry, worn counters, and kitchens that need stronger work zones without changing the whole floor plan.",
      },
      {
        name: "Tillicum",
        note: "Tillicum properties near JBLM can include smaller post-war homes and rental turnovers, which makes durable finishes, efficient storage, and low-maintenance bath upgrades a frequent priority.",
      },
      {
        name: "Gravelly Lake",
        note: "Homes around Gravelly Lake often call for higher-finish remodels, especially when owners want kitchens and baths that feel cleaner, brighter, and more aligned with the rest of the property.",
      },
    ],
    localContext:
      "Lakewood covers a wide range of housing stock, from post-war neighborhoods and military-adjacent homes near Tillicum to larger established properties around Oakbrook and Gravelly Lake. That variety changes the remodel conversation. Some homes need efficient same-layout updates with durable finishes, while others justify broader custom work with more cabinetry, better lighting, and higher-end materials. Inside city limits, permit review generally goes through the City of Lakewood; unincorporated nearby properties often shift to Pierce County. Lakewood homeowners regularly ask for kitchens that work harder for family life, bathrooms that feel simpler to maintain, and finish packages that move the house out of a builder-basic or heavily dated look. Because our Lacey showroom is about 25 minutes away, most Lakewood clients can compare cabinets, slabs, plumbing fixtures, and flooring without turning selection day into an all-day trip.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Lakewood?",
        answer:
          "Qualified Lakewood kitchens can be completed in 10 business days. Same-layout projects in areas like Oakbrook and Tillicum are often the best fit for that faster schedule.",
      },
      {
        question: "Do you handle permits in Lakewood?",
        answer:
          "Yes. Homes within Lakewood usually go through the City of Lakewood for permit review, while nearby unincorporated properties may fall under Pierce County. We manage that path when the work needs permits.",
      },
      {
        question: "What does a kitchen remodel cost in Lakewood?",
        answer:
          "Lakewood kitchen remodels start at $45,000 and move up with size, finish level, and complexity. Custom projects involving layout changes or major system work are quoted separately after site review.",
      },
      {
        question: "Do you serve all of Lakewood?",
        answer:
          "Yes. We work across Lakewood, including Oakbrook, Tillicum, Gravelly Lake, and surrounding residential areas.",
      },
      {
        question: "Where do Lakewood homeowners choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 25 minutes from Lakewood. That gives you a nearby place to compare cabinets, counters, fixtures, and finish combinations before construction begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Lakewood WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Lakewood, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["dupont", "steilacoom", "university-place", "tacoma"],
  },
  {
    slug: "university-place",
    name: "University Place",
    county: "Pierce County",
    distanceMiles: 25,
    driveTime: "about 30 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in University Place, WA often begins with good homes that need sharper function and better finishes. Qualified projects are finished in 10 business days, pricing starts from $45,000, and our Lacey showroom gives University Place clients a nearby selection hub.",
    neighborhoods: [
      {
        name: "Chambers Bay",
        note: "Homes near Chambers Bay often carry higher expectations for finish quality, so remodels usually center on cleaner cabinetry, more polished surfaces, and kitchens that feel more resolved than builder-original layouts.",
      },
      {
        name: "Sunset Beach / Day Island area",
        note: "Properties near Sunset Beach and Day Island can pair established layouts with premium locations, which often leads to kitchen and bath remodels focused on brighter flow, durable finishes, and a more tailored look.",
      },
      {
        name: "Town Center area",
        note: "Homes around the Town Center area are often practical candidates for same-layout remodeling, where better storage, updated counters, and more cohesive bath finishes deliver the biggest lift.",
      },
    ],
    localContext:
      "University Place homes range from view-oriented neighborhoods near Chambers Bay to established residential pockets with kitchens and baths ready for a more current finish package. Permit review for homes inside city limits generally runs through University Place processes, with some project coordination handled through regional systems and inspections as required. That matters most when plumbing, electrical, or structural work is involved. Homeowners here usually ask for kitchens that feel calmer and more refined, with stronger storage, simpler lines, and materials that hold up without looking overly busy. Bathroom conversations often revolve around cleaner surfaces, better lighting, and a finish palette that fits the rest of the house. Our Lacey showroom is about 30 minutes away, giving University Place clients a manageable trip to compare cabinet colors, slab choices, plumbing fixtures, and finish combinations before we lock the schedule.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in University Place?",
        answer:
          "Qualified University Place kitchens can be completed in 10 business days. Same-layout projects in areas like Chambers Bay and the Town Center area are often good fits for that quicker path.",
      },
      {
        question: "Do you handle permits in University Place?",
        answer:
          "Yes. Projects in University Place generally move through city permit review, with additional coordination as needed for inspections or scope-specific requirements. We handle that process when permits are part of the job.",
      },
      {
        question: "What does a kitchen remodel cost in University Place?",
        answer:
          "University Place kitchen remodels start at $45,000 and rise with cabinet volume, finish level, and whether the project stays same-layout or moves into a custom renovation scope.",
      },
      {
        question: "Do you serve all of University Place?",
        answer:
          "Yes. We work in Chambers Bay, the Sunset Beach and Day Island area, the Town Center area, and surrounding University Place neighborhoods.",
      },
      {
        question: "Where do University Place clients choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 30 minutes from University Place. That gives homeowners a nearby place to compare cabinets, counters, fixtures, and finish combinations in person.",
      },
    ],
    metaTitle: "Kitchen Remodel University Place WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in University Place, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["tacoma", "lakewood"],
  },
  {
    slug: "fife",
    name: "Fife",
    county: "Pierce County",
    distanceMiles: 32,
    driveTime: "about 38 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Fife, WA is often about upgrading practical homes with a sharper plan and cleaner finish package. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom keeps the selection process nearby and manageable.",
    neighborhoods: [
      {
        name: "Downtown Fife",
        note: "Older homes near Downtown Fife often have smaller kitchens and fewer built-ins, so remodels typically focus on stronger storage, brighter counters, and layouts that feel more usable without major structural work.",
      },
      {
        name: "Fife Heights",
        note: "Homes in Fife Heights often sit on larger lots with established footprints, which makes them good candidates for finish-driven kitchen updates and bathroom remodels that improve function without moving the whole room.",
      },
      {
        name: "Surprise Lake area",
        note: "Properties near Surprise Lake usually push homeowners toward cleaner materials, easier maintenance, and kitchens that work better for daily family use rather than purely cosmetic upgrades.",
      },
    ],
    localContext:
      "Fife sits at a crossroads of older residential pockets, industrial edges, and established neighborhoods that often need more thoughtful kitchen and bath planning than the square footage suggests. Inside city limits, permit review generally goes through the City of Fife; nearby unincorporated properties may shift to Pierce County depending on location. Fife homeowners regularly ask for kitchens that feel larger and more efficient without expanding the footprint, along with bathrooms that clean up dated finishes and improve storage. We often see homes that benefit from better cabinet organization, more durable counters, and finish packages that move the room away from heavily worn or builder-basic materials. Our Lacey showroom is about 38 minutes away, which still makes it realistic for Fife clients to review cabinets, slab options, fixtures, and finish combinations in person before installation is scheduled.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Fife?",
        answer:
          "Qualified Fife kitchens can be completed in 10 business days. Projects in Downtown Fife and Fife Heights are often good fits when the layout stays in place and selections are made early.",
      },
      {
        question: "Do you handle permits in Fife?",
        answer:
          "Yes. Homes inside Fife generally go through the City of Fife for permit review, while nearby non-city properties may fall under Pierce County. We handle that coordination when permits are needed.",
      },
      {
        question: "What does a kitchen remodel cost in Fife?",
        answer:
          "Fife kitchen remodels start at $45,000 and increase with cabinet count, finish choices, and whether the scope stays same-layout or moves into broader custom work.",
      },
      {
        question: "Do you work throughout Fife?",
        answer:
          "Yes. We serve Downtown Fife, Fife Heights, the Surprise Lake area, and nearby residential neighborhoods across the city.",
      },
      {
        question: "Where do Fife homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 38 minutes from Fife. That gives homeowners a nearby place to compare cabinets, counters, fixtures, and finish combinations before work begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Fife WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Fife, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book your free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["tacoma", "puyallup"],
  },
  {
    slug: "puyallup",
    name: "Puyallup",
    county: "Pierce County",
    distanceMiles: 33,
    driveTime: "about 40 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Puyallup, WA usually means balancing family function with a cleaner, more current finish package. Qualified projects are installed in 10 business days, pricing begins from $45,000, and our Lacey showroom gives Puyallup homeowners a focused place to make selections.",
    neighborhoods: [
      {
        name: "Downtown Puyallup",
        note: "Older homes around Downtown Puyallup often have compact kitchens and established room divisions, so remodels usually prioritize storage, brighter surfaces, and better flow without losing the home’s scale.",
      },
      {
        name: "South Hill area",
        note: "Homes in the South Hill area often need kitchens that work harder for families, with larger islands, more pantry space, and bathrooms that feel easier to maintain day after day.",
      },
      {
        name: "North Puyallup",
        note: "North Puyallup neighborhoods often mix older homes with newer infill, creating remodel scopes that range from fast same-layout updates to finish-driven redesigns with more cabinet and counter area.",
      },
    ],
    localContext:
      "Puyallup has a broad housing mix, from older homes near downtown to newer family neighborhoods stretching up toward South Hill. That range changes what homeowners ask for. Some projects need efficient same-layout kitchen upgrades with more storage and brighter counters, while others call for larger custom work tied to busy family routines and bigger footprints. Inside city limits, permit review generally goes through the City of Puyallup; outlying properties may move through Pierce County depending on the address. In Puyallup we commonly see kitchens that need better pantry planning, stronger work zones, and finishes that feel more current without chasing trends. Bathroom work usually centers on easier upkeep, sharper fixture packages, and a more cohesive look. Our Lacey showroom is about 40 minutes away, making it practical for Puyallup homeowners to compare cabinetry, slab materials, fixtures, and finish combinations before the install date is set.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Puyallup?",
        answer:
          "Qualified Puyallup kitchens can be completed in 10 business days. Same-layout projects in areas like Downtown Puyallup and North Puyallup are often strong matches for that faster schedule.",
      },
      {
        question: "Do you handle permits in Puyallup?",
        answer:
          "Yes. Homes inside Puyallup generally go through the City of Puyallup for permit review, while some nearby properties may fall under Pierce County. We coordinate permits whenever the scope requires them.",
      },
      {
        question: "What does a kitchen remodel cost in Puyallup?",
        answer:
          "Puyallup kitchen remodels start at $45,000 and rise with kitchen size, cabinet count, finish level, and whether the work stays same-layout or becomes a custom remodel.",
      },
      {
        question: "Do you serve all parts of Puyallup?",
        answer:
          "Yes. We work in Downtown Puyallup, the South Hill area, North Puyallup, and surrounding neighborhoods throughout the city.",
      },
      {
        question: "Where do Puyallup clients choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 40 minutes from Puyallup. That gives homeowners a single place to compare cabinets, counters, fixtures, and finish combinations before installation begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Puyallup WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Puyallup, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Schedule a free consultation.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["fife", "tacoma"],
  },
  {
    slug: "yelm",
    name: "Yelm",
    county: "Thurston County",
    distanceMiles: 22,
    driveTime: "about 30 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Yelm, WA is easier when the planning stays local and the schedule stays tight. Qualified projects are finished in 10 business days, pricing begins from $45,000, and our Lacey showroom gives Yelm homeowners a nearby place to choose materials.",
    neighborhoods: [
      {
        name: "Downtown Yelm",
        note: "Older homes near downtown Yelm often have tighter kitchens and fewer built-ins, so remodels usually focus on storage, brighter finishes, and workspaces that make the room feel more open.",
      },
      {
        name: "Tahoma Terra",
        note: "Tahoma Terra homes are typically newer and more predictable in scope, which makes them strong candidates for same-layout kitchen remodels, bathroom finish upgrades, and cleaner turnkey planning.",
      },
      {
        name: "West Yelm",
        note: "West Yelm neighborhoods along the SR 507 corridor often mix newer subdivisions with expanding family homes, where owners commonly ask for larger islands, pantry space, and more durable daily-use finishes.",
      },
    ],
    localContext:
      "Yelm has grown quickly, and that growth shows up in the remodel work. Older homes near downtown often need better storage and updated finishes, while newer subdivisions like Tahoma Terra usually need less corrective work and more design refinement. Inside city limits, permit review generally goes through the City of Yelm; homes outside the city but still in the Yelm orbit typically move through Thurston County. That difference matters when plumbing, electrical, or structural changes are part of the scope. Yelm clients often ask for kitchens that feel less builder-basic, with warmer cabinetry, stronger pantry storage, and countertops that hold up to busy family use. Bathroom projects usually center on better fixtures, easier cleaning, and more polished finish packages. Our Lacey showroom is about 30 minutes away, so Yelm homeowners can still make cabinet, slab, and plumbing selections in person without a long regional drive.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Yelm?",
        answer:
          "Qualified Yelm kitchens can be completed in 10 business days. That timeline is most common when the project keeps the existing layout and all selections are finished before installation begins.",
      },
      {
        question: "Do you handle permits in Yelm?",
        answer:
          "Yes. Projects inside Yelm generally go through the City of Yelm, while nearby county properties usually fall under Thurston County review. We help handle that process when permits are needed.",
      },
      {
        question: "What does a kitchen remodel cost in Yelm?",
        answer:
          "Yelm kitchen remodels start at $45,000 and increase with material level, cabinet volume, and whether the work stays same-layout or shifts into a custom remodel scope.",
      },
      {
        question: "Do you work in all parts of Yelm?",
        answer:
          "Yes. We serve Downtown Yelm, Tahoma Terra, West Yelm, and surrounding residential areas that rely on Yelm as their daily hub.",
      },
      {
        question: "How far is the showroom from Yelm?",
        answer:
          "Our Lacey showroom is about 30 minutes from Yelm. That gives homeowners a close-enough place to compare cabinets, counters, fixtures, and finishes before the schedule is finalized.",
      },
    ],
    metaTitle: "Kitchen Remodel Yelm WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Yelm, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom guidance. Schedule a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["tumwater", "olympia", "lacey"],
  },
  {
    slug: "steilacoom",
    name: "Steilacoom",
    county: "Pierce County",
    distanceMiles: 20,
    driveTime: "about 28 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Steilacoom, WA often means updating character-rich homes without losing what makes them special. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom is a short drive away for hands-on selections.",
    neighborhoods: [
      {
        name: "Historic District",
        note: "Homes in Steilacoom's Historic District often have older room proportions, original trim, and tighter kitchens, so remodels usually require careful planning around storage, circulation, and respect for existing details.",
      },
      {
        name: "Saltars Point",
        note: "Properties near Saltars Point often pair strong views with established layouts, leading homeowners to ask for brighter kitchens, more durable finishes, and bathrooms that feel cleaner without overcomplicating the work.",
      },
      {
        name: "Chambers Creek Road area",
        note: "Homes around the Chambers Creek Road area range from older houses to newer infill, so project scope can vary from fast same-layout kitchen updates to broader finish-driven remodels.",
      },
    ],
    localContext:
      "Steilacoom stands apart from many nearby cities because of its age, its historic core, and its mix of older homes with view-oriented residential areas. That means remodel planning can be more nuanced here. Inside town limits, permit review generally goes through the Town of Steilacoom; nearby properties outside the incorporated area may move through Pierce County instead. We often see kitchens in Steilacoom that need better storage and smarter workflow but still need to feel appropriate to the home, especially in older neighborhoods. Bathroom projects tend to focus on clean upgrades, durable materials, and fixtures that improve daily function without making the house feel out of sync. Our Lacey showroom is about 28 minutes away, so Steilacoom homeowners can still handle cabinet, countertop, fixture, and finish selections nearby before we lock the schedule and start installation.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Steilacoom?",
        answer:
          "Qualified Steilacoom kitchens can be finished in 10 business days. Older homes in the Historic District may need more investigation first, but same-layout projects still fit the faster program well.",
      },
      {
        question: "Do you handle permits in Steilacoom?",
        answer:
          "Yes. Homes within Steilacoom usually go through the Town of Steilacoom for permits, while nearby non-town properties may shift to Pierce County review. We coordinate that when the scope requires it.",
      },
      {
        question: "What does a kitchen remodel cost in Steilacoom?",
        answer:
          "Steilacoom kitchen remodels start at $45,000 and rise with finish level, cabinetry volume, and whether the home needs added electrical, plumbing, or structural work.",
      },
      {
        question: "Do you serve all areas of Steilacoom?",
        answer:
          "Yes. We work in the Historic District, Saltars Point, the Chambers Creek Road area, and surrounding Steilacoom neighborhoods.",
      },
      {
        question: "Where do Steilacoom clients choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 28 minutes from Steilacoom. That lets homeowners compare cabinets, counters, fixtures, and finishes in person before construction begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Steilacoom WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Steilacoom, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["lakewood", "dupont", "university-place"],
  },
  {
    slug: "parkland-spanaway",
    name: "Parkland / Spanaway",
    county: "Pierce County",
    distanceMiles: 28,
    driveTime: "about 35 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Parkland / Spanaway, WA often starts with homes that need better flow and tougher everyday finishes. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom provides a nearby place to sort selections before work begins.",
    neighborhoods: [
      {
        name: "Parkland core",
        note: "Homes in central Parkland often include post-war and mid-century layouts, so remodels usually focus on better cabinet storage, brighter surfaces, and bathrooms that feel easier to maintain.",
      },
      {
        name: "Spanaway Lake area",
        note: "Properties around Spanaway Lake often pair family-sized footprints with dated finishes, which makes them good candidates for same-layout kitchen updates and more durable bath materials.",
      },
      {
        name: "Pacific Avenue corridor",
        note: "Homes along the Pacific Avenue corridor often need practical remodel planning, with homeowners prioritizing efficient layouts, low-maintenance surfaces, and finish packages that can handle heavier daily use.",
      },
    ],
    localContext:
      "Parkland and Spanaway sit in unincorporated Pierce County, which shapes the permit path from the start. Most project review here goes through Pierce County rather than a city building department, especially when plumbing, electrical, or structural work is involved. Housing stock in this area often includes post-war homes, mid-century layouts, and family-oriented neighborhoods where kitchens need better storage and bathrooms need simpler upkeep more than dramatic architectural change. We regularly see requests for larger work zones, brighter counters, new cabinetry, and bath updates that replace worn surfaces with materials built for everyday use. Because many homes here have workable footprints but dated finishes, the faster same-layout remodel path can be a strong fit. Our Lacey showroom is about 35 minutes away, so Parkland and Spanaway clients can still review cabinets, slab options, fixtures, and finish combinations in person before the schedule is finalized.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Parkland / Spanaway?",
        answer:
          "Qualified Parkland and Spanaway kitchens can be completed in 10 business days. That is most common when the existing layout remains in place and materials are selected before installation starts.",
      },
      {
        question: "Do you handle permits in Parkland / Spanaway?",
        answer:
          "Yes. Because Parkland and Spanaway are generally unincorporated, permit review usually runs through Pierce County. We coordinate that process when plumbing, electrical, or structural work requires approval.",
      },
      {
        question: "What does a kitchen remodel cost in Parkland / Spanaway?",
        answer:
          "Kitchen remodels in Parkland and Spanaway start at $45,000 and increase with cabinet volume, finish choices, and whether the job stays same-layout or expands into custom scope.",
      },
      {
        question: "Do you serve the full Parkland / Spanaway area?",
        answer:
          "Yes. We work in the Parkland core, the Spanaway Lake area, the Pacific Avenue corridor, and surrounding neighborhoods across the broader service area.",
      },
      {
        question: "Where do Parkland / Spanaway clients make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 35 minutes from Parkland and Spanaway. That gives homeowners one nearby place to compare cabinets, counters, fixtures, and finish combinations.",
      },
    ],
    metaTitle: "Kitchen Remodel Parkland Spanaway WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Parkland / Spanaway, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["lakewood", "tacoma", "puyallup"],
  },
  {
    slug: "edgewood-milton",
    name: "Edgewood / Milton",
    county: "Pierce County",
    distanceMiles: 37,
    driveTime: "about 45 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Edgewood / Milton, WA often means updating established homes with a cleaner, more cohesive finish plan. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Edgewood and Milton homeowners a nearby place to make selections.",
    neighborhoods: [
      {
        name: "North Edgewood",
        note: "North Edgewood homes often sit on larger lots with established footprints, so remodels usually focus on finish quality, stronger storage, and kitchens that feel more current without chasing a full structural overhaul.",
      },
      {
        name: "Meridian corridor",
        note: "Homes along the Meridian corridor often benefit from practical same-layout updates, where counters, cabinetry, and bath surfaces do most of the heavy lifting for the finished result.",
      },
      {
        name: "Downtown Milton",
        note: "Older homes around downtown Milton can bring tighter kitchens and smaller bathrooms, which makes smart storage and durable low-maintenance finishes especially important.",
      },
    ],
    localContext:
      "Edgewood and Milton are close together geographically but have slightly different housing patterns, which is why this shared landing page works best when the remodel conversation stays grounded in real site conditions. Homes in both communities often blend older layouts with later updates, and remodel scope can range from straightforward finish replacement to more involved kitchen reworking. Permit review inside Edgewood generally runs through the City of Edgewood, while projects in Milton typically go through the City of Milton. That matters when plumbing, electrical, or structural work enters the plan. Homeowners here usually ask for kitchens that feel lighter, more efficient, and less dated, along with bathrooms that are simpler to clean and better aligned with the rest of the home. Our Lacey showroom is about 45 minutes away, giving Edgewood and Milton clients a clear place to compare cabinets, slab materials, fixtures, and finish combinations before construction starts.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Edgewood / Milton?",
        answer:
          "Qualified Edgewood and Milton kitchens can be completed in 10 business days. The fastest path usually applies when the layout stays the same and all selections are finalized before installation begins.",
      },
      {
        question: "Do you handle permits in Edgewood / Milton?",
        answer:
          "Yes. Projects in Edgewood generally go through the City of Edgewood, while Milton homes usually move through the City of Milton. We coordinate whichever permit path fits the address and scope.",
      },
      {
        question: "What does a kitchen remodel cost in Edgewood / Milton?",
        answer:
          "Kitchen remodels in Edgewood and Milton start at $45,000 and rise with cabinet volume, finish package, and whether the project stays same-layout or expands into custom work.",
      },
      {
        question: "Do you serve all parts of Edgewood / Milton?",
        answer:
          "Yes. We work in North Edgewood, the Meridian corridor, Downtown Milton, and surrounding neighborhoods across both communities.",
      },
      {
        question: "Where do Edgewood / Milton clients choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 45 minutes away. That gives homeowners a single place to compare cabinets, counters, fixtures, and finish combinations before the schedule is finalized.",
      },
    ],
    metaTitle: "Kitchen Remodel Edgewood Milton WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Edgewood / Milton, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Schedule a consultation.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["puyallup", "fife", "sumner"],
  },
  {
    slug: "sumner",
    name: "Sumner",
    county: "Pierce County",
    distanceMiles: 38,
    driveTime: "about 45 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Sumner, WA is usually about making established homes feel more efficient and more current. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Sumner homeowners a nearby place to handle selections in person.",
    neighborhoods: [
      {
        name: "Downtown Sumner",
        note: "Older homes near Downtown Sumner often have tighter kitchens and more defined rooms, so remodels usually focus on storage, brighter finishes, and better movement through the main living spaces.",
      },
      {
        name: "Valley Avenue area",
        note: "Homes along the Valley Avenue area often benefit from same-layout kitchen updates and bathroom finish packages that improve day-to-day use without opening up major structural work.",
      },
      {
        name: "East Sumner",
        note: "East Sumner neighborhoods often mix established family homes with newer housing, creating remodel scopes that range from practical cabinet upgrades to broader finish-driven kitchen and bath work.",
      },
    ],
    localContext:
      "Sumner homeowners often come to remodeling with a practical goal: keep the home comfortable and well-used while updating finishes that no longer work for daily life. The city includes older homes near downtown, established family neighborhoods, and newer pockets that still want a more tailored result than the original finish package delivered. Inside city limits, permit review generally goes through the City of Sumner; nearby outlying properties may shift to Pierce County depending on the address. We frequently see requests for kitchens with stronger pantry storage, brighter counters, and a more organized work triangle, along with bathrooms that feel cleaner and easier to maintain. Because our Lacey showroom is about 45 minutes away, Sumner clients can still compare cabinets, slab options, plumbing fixtures, and finish combinations in one trip before the installation window begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Sumner?",
        answer:
          "Qualified Sumner kitchens can be completed in 10 business days. That schedule is best suited to same-layout projects where cabinets, counters, and finish choices are settled before install day.",
      },
      {
        question: "Do you handle permits in Sumner?",
        answer:
          "Yes. Homes within Sumner generally go through the City of Sumner for permit review, while some nearby addresses may fall under Pierce County. We coordinate the permit path when it is needed.",
      },
      {
        question: "What does a kitchen remodel cost in Sumner?",
        answer:
          "Sumner kitchen remodels start at $45,000 and increase with cabinet volume, material level, and whether the project stays same-layout or expands into custom work.",
      },
      {
        question: "Do you serve all of Sumner?",
        answer:
          "Yes. We work in Downtown Sumner, the Valley Avenue area, East Sumner, and surrounding neighborhoods throughout the city.",
      },
      {
        question: "Where do Sumner homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 45 minutes from Sumner. That gives homeowners one place to compare cabinets, counters, plumbing fixtures, and finish combinations before construction starts.",
      },
    ],
    metaTitle: "Kitchen Remodel Sumner WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Sumner, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a free consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["puyallup", "bonney-lake", "edgewood-milton"],
  },
  {
    slug: "bonney-lake",
    name: "Bonney Lake",
    county: "Pierce County",
    distanceMiles: 44,
    driveTime: "about 55 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Bonney Lake, WA often centers on homes that need a more finished, less builder-basic feel. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Bonney Lake homeowners a nearby place to sort materials in person.",
    neighborhoods: [
      {
        name: "Downtown Bonney Lake",
        note: "Older homes near downtown Bonney Lake often need stronger storage and more durable finish planning, so remodels usually focus on efficiency, brighter surfaces, and bathrooms that clean up years of wear.",
      },
      {
        name: "Tehaleh",
        note: "Tehaleh homes are newer and often structurally straightforward, which makes them strong candidates for same-layout kitchen upgrades, warmer cabinet palettes, and polished bathroom finish refreshes.",
      },
      {
        name: "Lake Tapps area",
        note: "Homes around the Lake Tapps area often bring higher finish expectations, with owners asking for kitchens and baths that feel more custom, more durable, and better aligned with the rest of the property.",
      },
    ],
    localContext:
      "Bonney Lake remodel work often falls into two categories: older homes that need practical updating and newer homes that need more personality than the original finish package delivered. The city includes downtown properties, master-planned neighborhoods like Tehaleh, and homes near Lake Tapps with more premium finish expectations. Inside city limits, permit review generally goes through the City of Bonney Lake; nearby addresses outside the city may be reviewed through Pierce County. Bonney Lake homeowners commonly ask for kitchens with more storage, stronger work zones, and counters that can handle daily use, along with bathrooms that feel cleaner, brighter, and more complete. Our Lacey showroom is about 55 minutes away, so selection day still works best as one focused trip where cabinets, slabs, fixtures, and finish combinations can all be compared before the install date is locked in.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Bonney Lake?",
        answer:
          "Qualified Bonney Lake kitchens can be completed in 10 business days. That timeline is most common in same-layout homes where materials and finish choices are finalized before installation starts.",
      },
      {
        question: "Do you handle permits in Bonney Lake?",
        answer:
          "Yes. Homes in Bonney Lake generally go through the City of Bonney Lake for permit review, while nearby non-city addresses may fall under Pierce County. We handle that coordination when needed.",
      },
      {
        question: "What does a kitchen remodel cost in Bonney Lake?",
        answer:
          "Bonney Lake kitchen remodels start at $45,000 and climb with cabinet size, finish level, and whether the scope stays same-layout or moves into custom remodeling.",
      },
      {
        question: "Do you serve all parts of Bonney Lake?",
        answer:
          "Yes. We work in Downtown Bonney Lake, Tehaleh, the Lake Tapps area, and surrounding neighborhoods throughout the city.",
      },
      {
        question: "Where do Bonney Lake clients choose materials?",
        answer:
          "Selections happen at our Lacey showroom, about 55 minutes from Bonney Lake. That gives homeowners one place to compare cabinets, slab materials, fixtures, and finish combinations before construction begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Bonney Lake WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Bonney Lake, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book your consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["sumner", "puyallup", "auburn"],
  },
  {
    slug: "gig-harbor",
    name: "Gig Harbor",
    county: "Pierce County",
    distanceMiles: 36,
    driveTime: "about 45 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Gig Harbor, WA often comes down to better flow, cleaner finishes, and spaces that match the rest of the home. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Gig Harbor homeowners a practical selection destination.",
    neighborhoods: [
      {
        name: "Downtown Waterfront",
        note: "Homes near the Downtown Waterfront often have established layouts and strong design expectations, so remodels usually focus on finish quality, storage efficiency, and kitchens that feel more polished without losing warmth.",
      },
      {
        name: "Artondale",
        note: "Artondale homes often sit on larger residential lots and can support broader finish-driven remodels, especially when owners want more durable materials and stronger kitchen workflow.",
      },
      {
        name: "Canterwood",
        note: "Canterwood homes typically come with higher-finish expectations, which makes kitchen and bath remodels here more focused on refined surfaces, cabinetry upgrades, and bathrooms that feel intentionally designed.",
      },
    ],
    localContext:
      "Gig Harbor remodel planning has to account for a broad spread of homes, from older properties near the waterfront to larger established residences in neighborhoods like Artondale and Canterwood. Inside Gig Harbor city limits, permit review generally goes through the City of Gig Harbor; outside the city, many nearby properties are reviewed by Pierce County instead. That distinction matters as soon as plumbing, electrical, or structural work enters the project. Gig Harbor homeowners often ask for kitchens that feel more open, better organized, and less dated, along with bathrooms that bring better storage and easier upkeep without sacrificing finish quality. Our Lacey showroom is about 45 minutes away, which still makes it realistic to compare cabinets, counters, fixtures, and finish combinations in person before construction begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Gig Harbor?",
        answer:
          "Qualified Gig Harbor kitchens can be completed in 10 business days. Same-layout projects in neighborhoods like Artondale and Canterwood are often strong fits for that faster schedule.",
      },
      {
        question: "Do you handle permits in Gig Harbor?",
        answer:
          "Yes. Homes in Gig Harbor generally go through the City of Gig Harbor for permit review, while nearby non-city properties often shift to Pierce County. We coordinate that process when permits are required.",
      },
      {
        question: "What does a kitchen remodel cost in Gig Harbor?",
        answer:
          "Gig Harbor kitchen remodels start at $45,000 and increase with finish level, cabinet count, and whether the work stays same-layout or expands into custom scope.",
      },
      {
        question: "Do you work across all of Gig Harbor?",
        answer:
          "Yes. We serve the Downtown Waterfront, Artondale, Canterwood, and surrounding Gig Harbor neighborhoods with kitchen and bath remodeling work.",
      },
      {
        question: "Where do Gig Harbor clients make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 45 minutes from Gig Harbor. That gives homeowners one place to compare cabinets, slab options, fixtures, and finish combinations before installation begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Gig Harbor WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Gig Harbor, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Schedule your consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["tacoma", "university-place"],
  },
  {
    slug: "federal-way",
    name: "Federal Way",
    county: "King County",
    distanceMiles: 42,
    driveTime: "about 45 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Federal Way, WA often means bringing busy family homes into a more functional, more durable finish era. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Federal Way homeowners a nearby place to make choices with clarity.",
    neighborhoods: [
      {
        name: "Twin Lakes",
        note: "Twin Lakes homes often have established layouts and aging finish packages, so remodels usually focus on stronger storage, brighter counters, and bathrooms that feel easier to maintain every day.",
      },
      {
        name: "Redondo",
        note: "Homes in Redondo often need kitchens and baths that feel cleaner and more cohesive, especially when homeowners want materials that hold up better in a coastal, family-focused environment.",
      },
      {
        name: "City Center",
        note: "Properties around the City Center area can range from condos to established houses, which makes space efficiency and low-maintenance finishes common priorities in both kitchen and bath work.",
      },
    ],
    localContext:
      "Federal Way includes a broad range of housing, from established single-family neighborhoods like Twin Lakes to denser pockets near the City Center and homes closer to the water in Redondo. That variety changes the remodel conversation. Some projects need compact, efficient planning, while others call for a broader upgrade in cabinetry, counters, lighting, and bathroom finishes. Permit review inside city limits generally goes through the City of Federal Way, while nearby properties outside the city may shift to King County. Federal Way homeowners often ask for kitchens that improve family function, replace worn materials, and make better use of the existing footprint. Bathroom projects usually focus on easier upkeep, better storage, and finish packages that feel more current without becoming fussy. Our Lacey showroom is about 45 minutes away, giving Federal Way clients a workable destination for cabinets, slabs, fixtures, and finish selections before work begins.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Federal Way?",
        answer:
          "Qualified Federal Way kitchens can be completed in 10 business days. The faster timeline is most common when the layout stays in place and all selections are finalized before installation begins.",
      },
      {
        question: "Do you handle permits in Federal Way?",
        answer:
          "Yes. Homes in Federal Way generally go through the City of Federal Way for permit review, while nearby non-city addresses may fall under King County. We coordinate that path when permits are needed.",
      },
      {
        question: "What does a kitchen remodel cost in Federal Way?",
        answer:
          "Federal Way kitchen remodels start at $45,000 and increase with finish level, cabinet volume, and whether the project stays same-layout or moves into a custom remodel scope.",
      },
      {
        question: "Do you serve all of Federal Way?",
        answer:
          "Yes. We work in Twin Lakes, Redondo, the City Center area, and surrounding neighborhoods throughout Federal Way.",
      },
      {
        question: "Where do Federal Way homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 45 minutes from Federal Way. That gives homeowners one place to compare cabinets, counters, fixtures, and finish combinations before the schedule is finalized.",
      },
    ],
    metaTitle: "Kitchen Remodel Federal Way WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Federal Way, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book a consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["fife", "tacoma"],
  },
  {
    slug: "auburn",
    name: "Auburn",
    county: "King County",
    distanceMiles: 47,
    driveTime: "about 55 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Auburn, WA often starts with homes that need better organization and a more finished material palette. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Auburn homeowners a clear place to handle selections in person.",
    neighborhoods: [
      {
        name: "Downtown Auburn",
        note: "Older homes near Downtown Auburn often bring tighter kitchens and more defined rooms, so remodels usually focus on brighter surfaces, better storage, and improved day-to-day workflow.",
      },
      {
        name: "Lea Hill",
        note: "Lea Hill homes often need kitchens that work harder for family life, with stronger pantry space, more durable finishes, and bathrooms that feel easier to clean and maintain.",
      },
      {
        name: "Lakeland Hills",
        note: "Lakeland Hills homes are often newer and structurally straightforward, which makes them good candidates for same-layout kitchen updates and finish-led bathroom remodels.",
      },
    ],
    localContext:
      "Auburn spans older central neighborhoods, family-oriented hillside areas like Lea Hill, and newer housing communities such as Lakeland Hills. That mix means remodel goals vary, but a common thread is making the home feel more efficient and less tied to original or aging finishes. Permit review inside city limits generally goes through the City of Auburn, while some nearby addresses may shift to county jurisdiction depending on location. Auburn homeowners often ask for kitchens with stronger storage, better task flow, and surfaces that stand up to heavy use, along with bathrooms that feel cleaner and more resolved without creating unnecessary construction. Our Lacey showroom is about 55 minutes away, so Auburn clients usually benefit from one well-planned selection visit to compare cabinets, slab options, fixtures, and finish combinations before installation is scheduled.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Auburn?",
        answer:
          "Qualified Auburn kitchens can be completed in 10 business days. That schedule is most realistic when the layout stays in place and all cabinets, counters, and finishes are chosen before installation begins.",
      },
      {
        question: "Do you handle permits in Auburn?",
        answer:
          "Yes. Homes in Auburn generally go through the City of Auburn for permit review, while some nearby properties may move through county jurisdiction. We coordinate permits whenever the scope requires them.",
      },
      {
        question: "What does a kitchen remodel cost in Auburn?",
        answer:
          "Auburn kitchen remodels start at $45,000 and rise with kitchen size, finish level, cabinet volume, and whether the job stays same-layout or becomes custom.",
      },
      {
        question: "Do you serve all parts of Auburn?",
        answer:
          "Yes. We work in Downtown Auburn, Lea Hill, Lakeland Hills, and surrounding residential neighborhoods throughout the Auburn area.",
      },
      {
        question: "Where do Auburn clients make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 55 minutes from Auburn. That gives homeowners one place to compare cabinets, counters, fixtures, and finish combinations before the project starts.",
      },
    ],
    metaTitle: "Kitchen Remodel Auburn WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Auburn, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book your consultation online today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["federal-way", "sumner", "bonney-lake"],
  },
  {
    slug: "centralia",
    name: "Centralia",
    county: "Lewis County",
    distanceMiles: 26,
    driveTime: "about 30 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Centralia, WA often begins with homes that need more efficient storage and more durable everyday finishes. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Centralia homeowners a nearby place to make selections with confidence.",
    neighborhoods: [
      {
        name: "Historic Downtown",
        note: "Homes near Historic Downtown Centralia often have older kitchens and smaller room divisions, so remodels usually focus on storage, circulation, and finishes that respect the home while improving daily use.",
      },
      {
        name: "Edison District",
        note: "Properties in and around the Edison District often carry older layouts and strong character, which makes kitchen and bath remodels more about thoughtful planning than flashy structural change.",
      },
      {
        name: "Fords Prairie area",
        note: "Homes around the Fords Prairie area often support practical same-layout remodels, where cabinetry, counters, flooring, and bathroom finishes create the biggest functional upgrade.",
      },
    ],
    localContext:
      "Centralia includes older historic homes, established residential pockets, and more straightforward neighborhoods where the biggest gains often come from better planning rather than dramatic expansion. Inside city limits, permit review generally goes through the City of Centralia; nearby properties outside the city can move through Lewis County depending on the address. That distinction matters when plumbing, electrical, or structural work enters the scope. Centralia homeowners often ask for kitchens with stronger storage, brighter work surfaces, and layouts that feel easier to use without overcomplicating the remodel. Bathroom work usually centers on durability, simpler upkeep, and finish packages that make the room feel complete. Our Lacey showroom is about 30 minutes away, which keeps Centralia projects connected to a nearby place for cabinets, slabs, fixtures, and finish selections before the install date is set.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Centralia?",
        answer:
          "Qualified Centralia kitchens can be completed in 10 business days. That faster timeline is most common when the layout stays in place and selections are finished before installation begins.",
      },
      {
        question: "Do you handle permits in Centralia?",
        answer:
          "Yes. Homes inside Centralia generally go through the City of Centralia for permit review, while some nearby addresses may fall under Lewis County. We coordinate permits when the scope requires them.",
      },
      {
        question: "What does a kitchen remodel cost in Centralia?",
        answer:
          "Centralia kitchen remodels start at $45,000 and increase with cabinet volume, finish level, and whether the project stays same-layout or moves into custom work.",
      },
      {
        question: "Do you serve all parts of Centralia?",
        answer:
          "Yes. We work in Historic Downtown, the Edison District, the Fords Prairie area, and surrounding Centralia neighborhoods.",
      },
      {
        question: "Where do Centralia homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 30 minutes from Centralia. That gives homeowners one place to compare cabinets, counters, fixtures, and finish combinations before construction starts.",
      },
    ],
    metaTitle: "Kitchen Remodel Centralia WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Centralia, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Schedule a consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["chehalis", "tumwater", "olympia"],
  },
  {
    slug: "chehalis",
    name: "Chehalis",
    county: "Lewis County",
    distanceMiles: 35,
    driveTime: "about 40 minutes",
    tier: 1,
    published: true,
    intro:
      "Kitchen remodeling and bath remodeling in Chehalis, WA often comes down to better function, stronger materials, and a simpler plan. Qualified projects are completed in 10 business days, pricing starts from $45,000, and our Lacey showroom gives Chehalis homeowners a nearby place to compare selections before work begins.",
    neighborhoods: [
      {
        name: "Downtown Chehalis",
        note: "Homes near Downtown Chehalis often bring older layouts and tighter kitchen footprints, so remodels usually focus on storage, circulation, and finishes that update the room without forcing a total rebuild.",
      },
      {
        name: "Westside Chehalis",
        note: "Westside Chehalis homes often support practical same-layout remodeling, where cabinet organization, brighter counters, and easier-care bath finishes make the biggest difference.",
      },
      {
        name: "Newaukum area",
        note: "Homes in the broader Newaukum area often need durable finish planning and kitchen upgrades that can handle family use while still fitting the scale of the property.",
      },
    ],
    localContext:
      "Chehalis homes range from older properties near downtown to more spacious residential pockets that benefit from practical kitchen and bath upgrades rather than dramatic structural change. Inside city limits, permit review generally goes through the City of Chehalis; nearby outlying properties may move through Lewis County depending on the address. That matters as soon as plumbing, electrical, or structural work enters the scope. Chehalis homeowners often ask for kitchens with better storage, brighter work surfaces, and a more efficient layout that still feels appropriate to the house. Bathroom work usually focuses on stronger daily function, lower maintenance, and finish packages that feel complete without becoming overly ornate. Our Lacey showroom is about 40 minutes away, making it realistic for Chehalis clients to compare cabinets, slabs, fixtures, and finish combinations in one trip before construction starts.",
    faqs: [
      {
        question: "How long does a kitchen remodel take in Chehalis?",
        answer:
          "Qualified Chehalis kitchens can be completed in 10 business days. That schedule works best when the layout remains in place and all selections are finalized before the install window opens.",
      },
      {
        question: "Do you handle permits in Chehalis?",
        answer:
          "Yes. Homes in Chehalis generally go through the City of Chehalis for permit review, while some nearby properties may fall under Lewis County. We coordinate that permit process when needed.",
      },
      {
        question: "What does a kitchen remodel cost in Chehalis?",
        answer:
          "Chehalis kitchen remodels start at $45,000 and increase with cabinet count, finish package, and whether the scope stays same-layout or shifts into custom work.",
      },
      {
        question: "Do you serve all parts of Chehalis?",
        answer:
          "Yes. We work in Downtown Chehalis, Westside Chehalis, the Newaukum area, and surrounding neighborhoods throughout the city.",
      },
      {
        question: "Where do Chehalis homeowners make selections?",
        answer:
          "Selections happen at our Lacey showroom, about 40 minutes from Chehalis. That gives homeowners one place to compare cabinets, counters, fixtures, and finish combinations before work begins.",
      },
    ],
    metaTitle: "Kitchen Remodel Chehalis WA | 10 Day Kitchens",
    metaDescription:
      "Kitchen remodeling in Chehalis, WA in 10 business days. Starting at $45,000 with nearby Lacey showroom support. Book your consultation today.",
    heroImage: "/images/Premium White Oak Showcase Kitchen (1).png",
    nearbySlugs: ["centralia", "olympia", "tumwater"],
  },
];

export function getPublishedCities(): City[] {
  return cities.filter((c) => c.published);
}

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug && c.published);
}

/** Full confirmed Tier-1 service area, sorted by distance from the Lacey showroom. Used for coverage lists (footer, About's #service-area section) — includes cities whose page isn't published yet. */
export function getServiceAreaCities(): City[] {
  return [...cities].sort((a, b) => a.distanceMiles - b.distanceMiles);
}
