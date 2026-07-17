export const site = {
  name: "10 Day Kitchens",
  tagline: "Kitchen and bath remodeling, built around a 10 business day plan.",
  phone: "360-557-3444",
  phoneHref: "tel:+13605573444",
  email: "office@10daykitchens.com",
  facebookHref: "https://www.facebook.com/profile.php?id=61561865763430",
  instagramHref: "https://www.instagram.com/10dkkitchens/",
  address: "8695 Martin Way E STE 101, Lacey, WA 98516",
  license: "License #10DAYDK757O5",
  serviceAreaShort: "Pierce & Thurston Counties",
  mapsHref: "https://maps.google.com/?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516",
  showroomHours: [
    { day: "Monday-Friday", time: "9:00 AM - 5:30 PM" },
    { day: "Saturday", time: "By appointment only" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

export const services = [
  {
    slug: "kitchen-remodel",
    title: "Kitchen Remodel",
    blurb:
      "Cabinetry, countertops, flooring, fixtures, and installation planned around a clear schedule.",
  },
  {
    slug: "bath-remodel",
    title: "Bathroom Remodel",
    blurb:
      "Vanities, tile showers, storage, surfaces, lighting, and fixtures selected with guidance from our local team.",
  },
] as const;

export const processPhases = [
  {
    step: "01",
    title: "Consultation",
    body: "We learn what you want to change, how your space works, and what timeline makes sense.",
  },
  {
    step: "02",
    title: "Design and selections",
    body: "Cabinets, surfaces, fixtures, and finishes are selected before the install schedule begins.",
  },
  {
    step: "03",
    title: "Preparation",
    body: "Measurements, materials, and site details are checked so the work can move cleanly.",
  },
  {
    step: "04",
    title: "Installation",
    body: "A planned 10 business day install keeps the project focused and your home disruption lower.",
  },
  {
    step: "05",
    title: "Walkthrough",
    body: "We review the finished work with you and address details before the project is complete.",
  },
] as const;

export const testimonials = [
  {
    name: "Cathy Sorem",
    location: "Kitchen Remodel",
    quote:
      "Highly recommend. Very happy with the outcome of our kitchen. Everyone was professional, friendly and accommodating. Responded immediately to phone calls.",
    rating: 5,
  },
  {
    name: "Bennett",
    location: "Kitchen and Bath",
    quote:
      "What we really appreciated was how much they genuinely cared. They checked in, made sure we were comfortable, and seemed invested in our happiness.",
    rating: 5,
  },
] as const;
