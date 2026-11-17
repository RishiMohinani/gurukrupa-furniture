// Service landing pages. Each entry becomes its own pre-rendered page at /<slug>
// with its own title, description and FAQ (see scripts/prerender.mjs).
// Keep claims factual: only things the business has confirmed.
import livingRoom from '../Assets/living-room.webp'
import kitchenDesign from '../Assets/kitchen-design.webp'
import wardrobe from '../Assets/wardrobe.webp'
import mandirDesign from '../Assets/mandir-design.webp'
import tvCabinet from '../Assets/TV-Cabinet.webp'
import officeFurniture from '../Assets/office-furniture.webp'
import bedroomDesign from '../Assets/Bedroom-design.webp'

const DELIVERY = ['Do you deliver outside Vadodara?', 'Yes. We deliver across Vadodara and all over Gujarat. You can also pick up your order from our factory.']
const SITE_VISIT = ['Do you visit the site before starting?', 'Yes. Every project starts with a visit to your site so we can see the space, take measurements and understand what you need.']

export const SERVICE_PAGES = [
  {
    slug: 'custom-furniture-vadodara',
    name: 'Custom furniture',
    title: 'Custom Furniture in Vadodara | Gurukrupa Furniture',
    description: 'Furniture made to your size, design and finish in Vadodara: beds, sofas, tables, wardrobes and more. Site visit first. Over 30 years of experience.',
    h1: 'Custom furniture in Vadodara, made to your size and design',
    intro: 'Ready-made furniture rarely fits every room. We make furniture to your measurements, finish and style, whether you need a single centre table or furniture for a complete home. Gurukrupa Furniture has been making furniture in Vadodara since the 1990s.',
    image: livingRoom,
    alt: 'Custom living room furniture made by Gurukrupa Furniture in Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'Furniture we make to order',
    items: ['Beds and bedroom furniture', 'Sofas and seating', 'Centre tables', 'Dining tables and chairs', 'Dressing tables', 'Computer and study tables', 'Wardrobes and storage', 'TV cabinets'],
    blocks: [
      ['Made for your space', 'We start with a visit to your site to see the room and take measurements. Then we go through sizes, finishes and your preferences before anything is made, so the finished piece fits your space and the way you use it.'],
      ['From one piece to a whole home', 'Some customers come to us for a single table, others for every room in the house. We provide the materials and workers and take each order from scratch to a ready product, with work done on site and in our factory.'],
    ],
    faq: [
      ['Can I share a design I like?', 'Yes. Share photos or links of designs you like along with approximate dimensions, and we will discuss what can be made for your space.'],
      ['Do you make single pieces?', 'Yes. We make individual pieces as well as furniture for complete homes and bulk orders.'],
      SITE_VISIT,
      DELIVERY,
    ],
  },
  {
    slug: 'kitchen-furniture-vadodara',
    name: 'Kitchen furniture',
    title: 'Kitchen Furniture & Kitchen Design in Vadodara | Gurukrupa',
    description: 'Kitchen cabinets and storage made to fit your kitchen in Vadodara. We visit your site, plan the layout with you and provide materials and workers.',
    h1: 'Kitchen furniture made to fit your kitchen in Vadodara',
    intro: 'Every kitchen has its own size, layout and way of working. We design and make kitchen furniture to fit your space, with the storage, finishes and look you want.',
    image: kitchenDesign,
    alt: 'Kitchen furniture designed and made by Gurukrupa Furniture, Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'What we can make for your kitchen',
    items: ['Kitchen cabinets', 'Overhead storage units', 'Drawers and pull-out storage', 'Crockery units', 'Kitchen furniture for new and renovated homes'],
    blocks: [
      ['Planned around your kitchen', 'We visit your home to measure the kitchen and understand how you use it. Then we go through the layout, finishes and storage you need before work begins.'],
      ['Made and fitted by our team', 'We provide the materials and workers. Work is done on site, with some parts made in our factory, so your kitchen is taken from scratch to ready to use.'],
    ],
    faq: [
      ['Can you make kitchen furniture for an existing kitchen?', 'Yes. We visit the site, measure the existing space and make furniture to fit it.'],
      ['Do you provide the materials and workers?', 'Yes. We provide the materials and workers and handle the work from start to finish.'],
      SITE_VISIT,
      DELIVERY,
    ],
  },
  {
    slug: 'wardrobes-vadodara',
    name: 'Wardrobes',
    title: 'Custom Wardrobes in Vadodara | Gurukrupa Furniture',
    description: 'Wardrobes made to your room size and storage needs in Vadodara. Choose the layout, finish and design. Site visit first, made by our own team.',
    h1: 'Custom wardrobes in Vadodara, made to fit your room',
    intro: 'A wardrobe that fits the wall properly gives you far more storage than a ready-made one. We make wardrobes to your room size, storage needs and preferred finish.',
    image: wardrobe,
    alt: 'Custom wardrobe made by Gurukrupa Furniture in Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'Wardrobes and storage we make',
    items: ['Bedroom wardrobes', 'Wall-to-wall and floor-to-ceiling wardrobes', 'Wardrobes with drawers, shelves and hanging space', 'Storage units and cabinets', "Children's room storage"],
    blocks: [
      ['Designed around what you store', 'Tell us what needs to go inside: clothes, bedding, bags or documents. We plan the shelves, drawers and hanging space around it, along with the size and finish you prefer.'],
      ['Measured on site', 'We visit your home to take exact measurements, so the wardrobe fits the wall and uses the space properly. Our team provides the materials and workers and handles the work from start to finish.'],
    ],
    faq: [
      ['Can you make a wardrobe for an odd-shaped or small room?', 'Yes. Because we measure on site and make to size, we can plan a wardrobe around the space you have.'],
      ['Can I choose the finish?', 'Yes. We go through sizes, finishes and your preferences with you before production starts.'],
      SITE_VISIT,
      DELIVERY,
    ],
  },
  {
    slug: 'mandir-design-vadodara',
    name: 'Mandir designs',
    title: 'Mandir Design for Home in Vadodara | Gurukrupa Furniture',
    description: 'Home mandir and pooja units made to your space, size and design in Vadodara by Gurukrupa Furniture, a family furniture business since the 1990s.',
    h1: 'Home mandir designs in Vadodara',
    intro: 'The mandir is one of the most important pieces of furniture in many homes. We make mandirs and pooja units to suit your space, size and design, whether it stands on its own, sits on a wall or is part of a larger unit.',
    image: mandirDesign,
    alt: 'Home mandir designed and made by Gurukrupa Furniture, Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'Mandir designs we make',
    items: ['Floor-standing mandirs', 'Wall-mounted mandirs', 'Pooja units with storage', 'Mandirs for a dedicated pooja room', 'Mandirs built into wall units'],
    blocks: [
      ['Made for your home', 'Share the space you have and any designs you like. We will go through the size, finish and details with you, and make a mandir that suits your home.'],
      ['Decades of local experience', 'Known to generations of Vadodara customers as “Ram Bhai Tipoi Wala”, we have been making furniture here for more than 30 years.'],
    ],
    faq: [
      ['Can you make a mandir to fit a specific space?', 'Yes. We visit your site, measure the space and make the mandir to fit it.'],
      ['Can I share a design I have seen?', 'Yes. Share photos or links of designs you like, and we will discuss what can be made for your home.'],
      DELIVERY,
    ],
  },
  {
    slug: 'tv-unit-vadodara',
    name: 'TV units',
    title: 'TV Units & TV Cabinets in Vadodara | Gurukrupa Furniture',
    description: 'TV units and TV cabinets made to your wall size and design in Vadodara. Storage, shelves and finish of your choice. Site visit and delivery available.',
    h1: 'TV units and TV cabinets in Vadodara',
    intro: 'A TV unit sets the look of a living room. We make TV units and cabinets to your wall size and design, with the storage and finish you want.',
    image: tvCabinet,
    alt: 'TV cabinet made by Gurukrupa Furniture in Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'TV units we make',
    items: ['Wall-mounted TV units', 'Floor-standing TV cabinets', 'TV units with storage and shelves', 'Full-wall living room units'],
    blocks: [
      ['Made to your wall', 'We measure the wall and plan the unit around your TV size, storage needs and the rest of the room, then go through the finish and design with you.'],
      ['From scratch to ready', 'We provide the materials and workers and handle everything from making the unit to fitting it in your home.'],
    ],
    faq: [
      ['Can the TV unit include storage?', 'Yes. Tell us what you need to store and we will plan drawers, cabinets and shelves into the design.'],
      SITE_VISIT,
      DELIVERY,
    ],
  },
  {
    slug: 'office-furniture-vadodara',
    name: 'Office furniture and bulk orders',
    title: 'Office Furniture & Bulk Orders in Vadodara | Gurukrupa',
    description: 'Office, commercial and industrial furniture and bulk orders made in our Vadodara factory. Share your design, dimensions and quantity for a quote.',
    h1: 'Office furniture and bulk orders in Vadodara',
    intro: 'We make furniture for offices, shops, industrial spaces, retailers, designers and contractors. Because we make our own furniture, we can take on bulk and mass production as well as single pieces.',
    image: officeFurniture,
    alt: 'Office furniture made by Gurukrupa Furniture, Vadodara',
    type: 'Bulk / mass production',
    itemsTitle: 'What we make for businesses',
    items: ['Office desks and workstations', 'Computer tables', 'Storage and filing cabinets', 'Furniture for shops and commercial spaces', 'Furniture for industrial spaces', 'Bulk orders for retailers, designers and contractors'],
    blocks: [
      ['Made to your specifications', 'Share your design, dimensions and quantity. We will go through the specifications and production with you before work begins.'],
      ['Bulk and mass production', 'Orders are made in our factory and on site by our own team, which lets us handle larger quantities. We deliver across Vadodara and all over Gujarat.'],
    ],
    faq: [
      ['Do you take bulk orders?', 'Yes. We handle bulk and mass production for offices, industrial spaces, retailers, designers and contractors.'],
      ['What do you need to give a quote?', 'Your design or reference, dimensions and quantity. Call or WhatsApp us, or send an enquiry through the form on this page.'],
      DELIVERY,
    ],
  },
  {
    slug: 'home-interiors-vadodara',
    name: 'Home interiors',
    title: 'Home Interior Furnishing in Vadodara | Gurukrupa Furniture',
    description: 'Home design, custom furniture and interior furnishing in Vadodara. Designs tailored to your space, with materials and workers provided by us.',
    h1: 'Home interior furnishing in Vadodara',
    intro: 'Furnishing a room or a whole home? We offer home design, custom furniture and interior furnishing in Vadodara, with designs tailored to your space and requirements.',
    image: bedroomDesign,
    alt: 'Bedroom interior designed and furnished by Gurukrupa Furniture, Vadodara',
    type: 'Custom home furnishing',
    itemsTitle: 'Rooms we furnish',
    items: ['Living rooms', 'Bedrooms', 'Kitchens', 'Pooja rooms and mandirs', 'Dining areas', 'Study and home office'],
    blocks: [
      ['One team for the whole home', 'From individual furniture pieces to customised interiors, we handle the design and making of furniture for your home. We provide the materials and workers, and work is done on site and in our factory.'],
      ['How we start', 'We visit your home first to see the space. Then we go through what you need for each room: sizes, finishes, requirements and your preferences.'],
    ],
    faq: [
      ['Can you furnish a complete home?', 'Yes. We furnish individual rooms as well as complete homes, with furniture made to fit each space.'],
      ['Do you provide the materials and workers?', 'Yes. We provide the materials and workers and take the work from scratch to a ready home.'],
      SITE_VISIT,
      DELIVERY,
    ],
  },
]
