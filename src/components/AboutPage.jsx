import React, { useRef, useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import LuxuryHero from './LuxuryHero';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';

// Easing constant used across components
const EASE = [0.16, 1, 0.3, 1];


/* ═══════════════════════════════════════════════════
   2 · SCROLL PROGRESS TIMELINE
   ═══════════════════════════════════════════════════ */
const timelineData = [
  {
    year: 'The Genesis',
    title: 'Our Story',
    content:
      'We started our journey with a thought of bringing worlds renowned and upcoming artists on one platform and connect them to the art collectors worldwide. Zigguratss is the beginning of a new era in the world of art business.',
    image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format',
  },
  {
    year: 'Heritage',
    title: 'A Brief History of Art',
    content:
      'India, being the oldest and the first in the culture and also it\'s first in producing the different kind of artifacts or arts. Be it Vatsyayana who introduced art of love through Kamasutra or Raja Ravi Verma who portrayed the beauty of woman on canvas and brought it to life through his vision.',
    image: 'https://m.media-amazon.com/images/I/513rnVnTDeL._UF1000,1000_QL80_.jpg',
  },
  {
    year: 'Legacy',
    title: 'The Lineage of Masters',
    content:
      'There were times when artists used to engrave their craft on stones and walls, and later on it all converted into papers, canvas and painters like Rabindranath Tagore, Vincent Van Gogh, M.F. Hussain, Pablo Picasso, Amrita Sher Gill, Leonardo Da Vinci, Claude Monet and many more brought arts to life through their skills.',
    image: 'https://www.theartstory.org/images20/works/old_masters_2.jpg',
  },
  {
    year: 'Purpose',
    title: 'Our Motive',
    content:
      'We believe that art is a medium of communication, innovation and above all, an inspiration. So, we at Zigguratss brings you the worlds spectacular all the original arts from the artists across the globe.',
    image: 'https://zigguratss.com/assets/images/motiveimage.jpg',
  },
  {
    year: 'Mission',
    title: 'Empowering Artists',
    content:
      'We provide artists the space which enables them to sell their artwork globally and connect with their respective audience and admirers and also manage the sale of their artwork, because art is valuable & precious and the artist should get proper acknowledge for their work.',
    image: 'https://classbento.com.au/images/article/empowering-artists-to-earn-more-doing-what-they-love-800.jpg',
  },
];

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);
  const smoothHeight = useSpring(lineHeight, { stiffness: 60, damping: 30 });

  return (
    <section id="story" ref={containerRef} className="relative py-32 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-4"
        >
          Chronicle
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gallery-dark"
        >
          The Zigguratss <span className="italic text-gallery-accent">Chronicle</span>
        </motion.h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="absolute left-6 sm:left-10 lg:left-16 top-0 bottom-0 w-px">
          <div className="h-full w-full bg-gallery-subtle" />
          <motion.div style={{ height: smoothHeight }} className="absolute top-0 left-0 w-full bg-gallery-accent origin-top" />
        </div>

        <div className="space-y-24 sm:space-y-32">
          {timelineData.map((item, i) => (
            <TimelineMilestone key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineMilestone = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const rowReverse = index % 2 === 1 ? 'lg:flex-row-reverse' : '';

  return (
    <div ref={ref} className={`relative pl-12 sm:pl-16`}>
      {/* Dot on timeline */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="absolute left-0 top-2 w-3 h-3 -translate-x-[5px]"
      >
        <div className="w-full h-full rounded-full bg-gallery-accent" />
        <div className="absolute inset-0 rounded-full bg-gallery-accent/30 animate-ping" />
      </motion.div>

      <div className={`relative z-0 flex flex-col lg:flex-row items-start gap-6 ${rowReverse}`}>
        {/* Side image */}
        {item.image && (
          <figure className="w-full lg:w-1/3 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-48 sm:h-64 lg:h-56 object-cover rounded-md shadow-sm"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </figure>
        )}

        {/* Text content */}
        <div className="w-full lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="font-sans text-[10px] tracking-[0.4em] uppercase text-gallery-accent mb-3"
          >
            {item.year}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-gallery-dark mb-4"
          >
            {item.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="font-sans text-base text-gallery-muted leading-[1.6]"
          >
            {item.content}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="mt-8 h-px w-24 bg-gallery-subtle origin-left"
          />
        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════
   3 · ARTWORK GALLERY — CURATED COLLECTION
   ═══════════════════════════════════════════════════ */
const artworks = [
  {
    id: 1,
    title: 'Tune Of Bengal — 4',
    artist: 'Sekhar Roy',
    medium: 'Acrylic on Canvas',
    price: '₹ 4,16,000',
    dimensions: '121.92 × 91.44 cm',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format',
  },
  {
    id: 2,
    title: 'Tune Of Bengal — 3',
    artist: 'Sekhar Roy',
    medium: 'Acrylic on Canvas',
    price: '₹ 8,32,000',
    dimensions: '152.40 × 121.92 cm',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format',
  },
  {
    id: 3,
    title: 'The Juggler Within',
    artist: 'Pramod Neelakandan',
    medium: 'Mixed Media',
    price: '₹ 45,500',
    dimensions: '60.96 × 45.72 cm',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200&auto=format',
  },
  {
    id: 4,
    title: 'Ocean Of Dreams',
    artist: 'Uttam Bhattacharya',
    medium: 'Oil on Canvas',
    price: '₹ 52,000',
    dimensions: '76.20 × 101.60 cm',
    image: 'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1200&auto=format',
  },
  {
    id: 5,
    title: 'Eternal Grace',
    artist: 'Priyanka Bardhan',
    medium: 'Watercolor',
    price: '₹ 68,750',
    dimensions: '76.20 × 76.20 cm',
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1200&auto=format',
  },
  {
    id: 6,
    title: 'Melody of Feathers',
    artist: 'Priyanka Bardhan',
    medium: 'Watercolor on Paper',
    price: '₹ 68,750',
    dimensions: '76.20 × 91.44 cm',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=1200&auto=format',
  },
  {
    id: 7,
    title: 'Inner Peace 6',
    artist: 'Monalisa Sarkar Mitra',
    medium: 'Acrylic on Canvas',
    price: '₹ 1,17,000',
    dimensions: '91.44 × 91.44 cm',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format',
  },
  {
    id: 8,
    title: 'Serene Horizons',
    artist: 'Ananya Gupta',
    medium: 'Oil on Linen',
    price: '₹ 95,000',
    dimensions: '91.44 × 121.92 cm',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format',
  },
  {
    id: 9,
    title: 'Fragments of Time',
    artist: 'Rajeev Kapoor',
    medium: 'Mixed Media on Board',
    price: '₹ 1,25,000',
    dimensions: '101.60 × 76.20 cm',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format',
  },
  {
    id: 10,
    title: 'Golden Whisper',
    artist: 'Sunita Devi',
    medium: 'Acrylic & Gold Leaf',
    price: '₹ 2,10,000',
    dimensions: '121.92 × 121.92 cm',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format',
  },
  {
    id: 11,
    title: 'Urban Pulse',
    artist: 'Karthik Menon',
    medium: 'Digital Print on Canvas',
    price: '₹ 38,000',
    dimensions: '60.96 × 91.44 cm',
    image: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?q=80&w=1200&auto=format',
  },
  {
    id: 12,
    title: 'Whispers of the Ganges',
    artist: 'Deepa Sharma',
    medium: 'Watercolor on Handmade Paper',
    price: '₹ 72,000',
    dimensions: '76.20 × 55.88 cm',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1200&auto=format',
  },
];


// ═══════════════════════════════════════════════════
// 3 · ABOUT PAGE FULL CONTENT SECTION (100% WIDTH)
// ═══════════════════════════════════════════════════
const AboutContentSection = () => (
  <section className="w-full py-20 sm:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-4"
          >
            Welcome to Zigguratss
          </motion.p>

          <LuxuryHero />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="font-sans text-lg text-gallery-muted max-w-2xl mb-6"
          >
            We welcome Artists around the world to showcase their work here. Our aim and mission is to bring both the Artist's and Art lovers at one stage.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            {[
              { label: '500+', sub: 'Original Works' },
              { label: '120+', sub: 'Global Artists' },
              { label: '30+', sub: 'Countries Served' },
            ].map((s) => (
              <div key={s.label} className="flex-shrink-0 bg-gallery-accent/10 rounded-md px-4 py-3">
                <div className="font-serif text-2xl text-gallery-dark font-semibold">{s.label}</div>
                <div className="text-xs text-gallery-muted">{s.sub}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap gap-4"
          >
            <a href="/artworks" className="px-6 py-3 bg-black text-white font-sans text-sm font-semibold rounded-none hover:scale-[1.01] transition-transform">Explore Collection</a>
            <a href="#story" className="px-6 py-3 text-black underline font-sans text-sm font-semibold rounded-md hover:bg-gallery-accent/5 transition-colors">Our Story</a>
          </motion.div>
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="w-full rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Abraham_Mignon_-_Flowers_in_a_metal_vase.jpg/500px-Abraham_Mignon_-_Flowers_in_a_metal_vase.jpg?20190327095151"
            alt="Flowers in a metal vase by Abraham Mignon"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full h-[640px] object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════
   4 · EDITORIAL QUOTE BREAK
   ═══════════════════════════════════════════════════ */
const QuoteBreak = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative py-32 sm:py-40 overflow-hidden bg-gallery-dark"
    >
      <div className="absolute inset-0 bg-grain opacity-40" />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-serif text-6xl sm:text-8xl text-gallery-accent/20 mb-6 leading-none select-none"
        >
          "
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 leading-[1.4] italic"
        >
          All Artworks have the power to captivate and inspire. Whether it's
          through the lens of a camera or the brush strokes of a painter, each
          of these art forms has the ability to evoke emotions, tell a story,
          and bring{' '}
          <span className="text-gallery-accent not-italic">joy to those who experience them</span>.
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mx-auto mt-10 h-px w-16 bg-gallery-accent/40 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 font-sans text-xs tracking-[0.3em] uppercase text-white/40"
        >
          — Zigguratss Manifesto
        </motion.p>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════
   4 · TEAM — GLASSMORPHISM CARDS
   ═══════════════════════════════════════════════════ */
const teamMembers = [
  {
    name: 'AKANSHA N BHATT',
    role: 'AVP - Client Relations',
    bio: `She is pursuing her career in Public Relations but gained experience in marketing at American Express. It was her passion for art that led her to join ZIGGURATSS, from the very beginning. She is the global head of client relations at ZIGGURATSS, and has been with the company since its inception in 2021. During her tenure, she has undertaken several roles, from business development and marketing to event management and operations. She now focusses on ZIGGURATSS domestic and international expansion, strategy, as well as building up the team. She is fond of cinema and travelling and when she's in private she enjoys live music!`,
    image: 'https://zigguratss.com/assets/images/akansha.jpg',
    accent: 'from-rose-300/20 to-transparent',
  },
  {
    name: 'VIJAY BHATT',
    role: 'Founder & CEO',
    bio: `He is an emerging entrepreneur with vast knowledge in the field of ARTS. He is an ardent fan of original Artwork, and loves to bring forward the spectacular works of famous artists from across the globe to one point i.e. THE ZIGGURATSS, where the whole world and its amazing Artwork comes alive from them to You. Vijay is bent upon promoting the bestest of ART and giving a platform for new-comers and established artists too with a zeal to represent their talent on ZIGGURATSS.`,
    image: 'https://zigguratss.com/assets/images/vijaypiclatest.jpg',
    accent: 'from-gallery-accent/20 to-transparent',
  },
  {
    name: 'MUKESH DABRAL',
    role: 'Co-Founder & CFO',
    bio: `He is a MBA (Finance) professional and he has worked with professionally managed corporates in the capacity of Senior Finance and Accounts Manager. He has experience of handling corporate affairs in different areas for more than 7 Years. He has helped organisations to grow business in India and operating it smoothly. Mukesh has vast knowledge and a thorough understanding of Accounting Rules and Regulations, as well as the complex corporate taxation system.`,
    image: 'https://zigguratss.com/assets/images/mukesh.jpg',
    accent: 'from-blue-300/20 to-transparent',
  },
  {
    name: 'AJAY SINGH',
    role: 'Co-Founder & AVP-S & M',
    bio: `Ajay is the Co-Founder & AVP- Sales & Marketing and also looks after the technology part of ZIGGURATSS. He is responsible for all aspects of growing and marketing ZIGGURATSS to establish its presence and dominance in the online artwork market. He designed and developed not only the ZIGGURATSS online store, but also the resource planning, customer relationship and supply chain management systems that ZIGGURATSS do every day.`,
    image: 'https://zigguratss.com/assets/images/ajay.jpeg',
    accent: 'from-emerald-300/20 to-transparent',
  },
];

const TeamSection = () => (
  <section className="relative py-32 sm:py-40 overflow-hidden">
    {/* Section header */}
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-20">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-4"
      >
        The Collective
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gallery-dark"
      >
        Meet Our <span className="italic text-gallery-accent">Team</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 font-sans text-base text-gallery-muted max-w-lg leading-relaxed"
      >
        Four distinct perspectives united by a singular conviction — that art
        transcends commerce when handled with reverence.
      </motion.p>
    </div>

    {/* Cards grid */}
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {teamMembers.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const TeamCard = ({ member, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [expanded, setExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const shortBio = member.bio.length > 180 ? member.bio.slice(0, 180) + '…' : member.bio;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group relative"
      data-magnetic
    >
      <div className="relative overflow-visible rounded-2xl transition-all duration-700">
        <div
          className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '0.5px solid rgba(201, 169, 110, 0.12)',
            boxShadow: '0 10px 36px rgba(0, 0, 0, 0.06)',
          }}
          onClick={() => setExpanded((s) => !s)}
        >
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${member.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />

          {/* Portrait (click to view larger) */}
          <div className="relative w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowOverlay(true); }}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full border border-gallery-accent/20" />
          </div>

          <div className="text-center relative z-10">
            <h3 className="font-serif text-lg sm:text-xl text-gallery-dark mb-1 group-hover:text-gallery-accent transition-colors duration-300">
              {member.name}
            </h3>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gallery-accent mb-4">
              {member.role}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-sm text-gallery-muted leading-relaxed"
            >
              {expanded ? (
                <motion.p initial={{ height: 0 }} animate={{ height: 'auto' }} transition={{ duration: 0.4 }}>
                  {member.bio}
                </motion.p>
              ) : (
                <p>{shortBio}</p>
              )}
            </motion.div>

            <button
              aria-expanded={expanded}
              className="mt-3 text-xs font-medium text-gallery-accent hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((s) => !s);
              }}
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.05 }}
            className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gallery-accent/30 to-transparent origin-center"
          />
        </div>
      </div>

      {/* Full-image overlay (no rotation) */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={() => setShowOverlay(false)}>
          <div className="relative w-full max-w-3xl">
            <img
              src={member.image}
              alt={`${member.name} full`}
              className="w-full h-auto rounded-lg shadow-2xl cursor-pointer"
              onClick={() => setShowOverlay(false)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   5 · VALUES / PROMISES
   ═══════════════════════════════════════════════════ */
const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Free Shipping World Wide',
    description: 'By Professionals.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
      </svg>
    ),
    title: 'Money Back Guarantee',
    description: 'Within 14 days after delivery.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Selected Artist',
    description: "Artist's around the world.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: 'Secure Payments',
    description: 'By credit card or online.',
  },
];

const ValuesSection = () => (
  <section className="relative py-24 bg-gallery-warm">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((val, i) => (
          <motion.div
            key={val.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            className="text-center group"
            data-magnetic
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gallery-accent/20 text-gallery-accent mb-5 group-hover:bg-gallery-accent group-hover:text-gallery-dark transition-all duration-500">
              {val.icon}
            </div>
            <h4 className="font-serif text-lg text-gallery-dark mb-2">
              {val.title}
            </h4>
            <p className="font-sans text-sm text-gallery-muted leading-relaxed">
              {val.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════
   6 · CLOSING CTA — LIVE WITH ART
   ═══════════════════════════════════════════════════ */
const ClosingCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative py-32 sm:py-40 overflow-hidden bg-gallery-dark">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format"
          alt=""
          className="w-full h-[120%] object-cover opacity-20"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-gallery-dark via-gallery-dark/80 to-gallery-dark/60" />
      <div className="absolute inset-0 bg-grain opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mx-auto w-16 h-px bg-gallery-accent/50 mb-10 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-6"
        >
          Live With Art
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-6"
        >
          Those who have fallen in love with works of our{' '}
          <span className="italic text-gallery-accent">Artist's</span> can call
          and visit us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-base text-white/50 max-w-md mx-auto mb-12 leading-relaxed"
        >
          For suggestions to buy art for their home and office. Live with Art —
          Live with Zigguratss.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a
            href="https://zigguratss.com/signup"
            data-magnetic
            className="px-10 py-4 bg-gallery-accent text-gallery-dark font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-500 hover:bg-white hover:text-gallery-dark"
          >
            Join Us
          </a>
          <a
            href="https://zigguratss.com/contact"
            data-magnetic
            className="px-10 py-4 border border-white/20 text-white/70 font-sans text-xs tracking-[0.25em] uppercase transition-all duration-500 hover:border-gallery-accent hover:text-gallery-accent"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════
   7 · FOOTER
   ═══════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-gallery-dark border-t border-white/5 py-16">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-xl text-white tracking-[0.1em] uppercase mb-4">
            Zigguratss
          </h3>
          <p className="font-sans text-sm text-white/40 leading-relaxed max-w-xs">
            Bridging art and soul since 2023. Curating global talent for
            discerning collectors worldwide.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gallery-accent mb-4">
              For Buyers
            </p>
            <ul className="space-y-2 font-sans text-sm text-white/40">
              <li><a href="https://zigguratss.com/cms/customer-guide" className="hover:text-white transition-colors duration-300">Customer Guide</a></li>
              <li><a href="https://zigguratss.com/artworks" className="hover:text-white transition-colors duration-300">Browse Artworks</a></li>
              <li><a href="https://zigguratss.com/faq" className="hover:text-white transition-colors duration-300">FAQs</a></li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gallery-accent mb-4">
              For Artists
            </p>
            <ul className="space-y-2 font-sans text-sm text-white/40">
              <li><a href="https://zigguratss.com/cms/artist-guide" className="hover:text-white transition-colors duration-300">Artist Guide</a></li>
              <li><a href="https://zigguratss.com/signup" className="hover:text-white transition-colors duration-300">Join As Artist</a></li>
              <li><a href="https://zigguratss.com/contest/artwork/week" className="hover:text-white transition-colors duration-300">Weekly Contest</a></li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gallery-accent mb-4">
            Follow Us
          </p>
          <div className="flex gap-4">
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/zigguratss/' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/company/zigguratssartwork/about/' },
              { name: 'Facebook', url: 'https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/' },
              { name: 'Pinterest', url: 'https://in.pinterest.com/zigguratss/' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-gallery-accent hover:text-gallery-accent transition-all duration-300 font-sans text-[10px] font-medium"
              >
                {social.name[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-white/30">
          © 2026 Zigguratss Artwork LLP. All Rights Reserved.
        </p>
        <div className="flex gap-6 font-sans text-xs text-white/30">
          <a href="https://zigguratss.com/cms/terms-and-conditions" className="hover:text-white/60 transition-colors duration-300">
            Terms & Conditions
          </a>
          <a href="https://zigguratss.com/cms/contest-rules" className="hover:text-white/60 transition-colors duration-300">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — ABOUT PAGE
   ═══════════════════════════════════════════════════ */

const PaintingIcon = () => (
  <svg className="w-8 h-8 text-gallery-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
const SculptureIcon = () => (
  <svg className="w-8 h-8 text-gallery-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <ellipse cx="12" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="8" y="12" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
const SerigraphIcon = () => (
  <svg className="w-8 h-8 text-gallery-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const PhotographyIcon = () => (
  <svg className="w-8 h-8 text-gallery-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="7" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const artForms = [
  {
    name: 'Painting',
    icon: <PaintingIcon />,
    desc: 'Works of art created using pigments applied to a flat surface.'
  },
  {
    name: 'Sculpture',
    icon: <SculptureIcon />,
    desc: 'Three-dimensional works of art made from stone, wood, or metal.'
  },
  {
    name: 'Serigraph',
    icon: <SerigraphIcon />,
    desc: 'Limited edition prints made by pressing ink through a stencil.'
  },
  {
    name: 'Photography',
    icon: <PhotographyIcon />,
    desc: 'The art of capturing light to create an image.'
  },
];

const ArtworksBriefSection = () => (
  <section className="relative py-32 sm:py-40 bg-gallery-warm overflow-hidden">
    <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
    <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gallery-dark mb-8 text-center"
      >
        A Brief about <span className="italic text-gallery-accent">Artworks</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        className="font-sans text-lg text-gallery-muted text-center max-w-3xl mx-auto mb-12"
      >
        All Artworks have the power to captivate and inspire. Paintings are works of art that are created using pigments applied to a flat surface. Sculptures, on the other hand, are three-dimensional works of art that are typically made from materials such as stone, wood, or metal. Serigraphs, also known as silkscreen prints, are limited edition prints made by pressing ink through a stencil onto paper or fabric. Photography, meanwhile, is the art of capturing light to create an image. Whether it's through the lens of a camera or the brush strokes of a painter, each of these art forms has the ability to evoke emotions, tell a story, and bring joy to those who experience them. <span className="text-gallery-accent font-semibold">There are many other forms of artwork created by artists, and we are on a mission to make those artworks available to art lovers and bring artists—the creators of phenomenal work—to the front stage.</span>
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {artForms.map((form, i) => (
          <motion.div
            key={form.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="flex flex-col items-center bg-white/70 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            whileHover={{ scale: 1.06, y: -6 }}
            data-magnetic
          >
            <div className="mb-4">{form.icon}</div>
            <h4 className="font-serif text-xl text-gallery-dark mb-2 group-hover:text-gallery-accent transition-colors duration-300">{form.name}</h4>
            <p className="font-sans text-sm text-gallery-muted text-center">{form.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <span className="inline-block px-8 py-4 bg-gallery-accent text-gallery-dark font-sans text-base font-semibold rounded-full shadow-lg tracking-wide animate-pulse cursor-pointer select-none">
          Discover More Art Forms
        </span>
      </motion.div>
    </div>
  </section>
);

const AboutPage = () => (
  <main className="relative bg-gallery-bg overflow-hidden">
    <Navbar />
    <AboutContentSection />
    <TimelineSection />
    <ArtworksBriefSection />
    <QuoteBreak />
    <TeamSection />
    <ValuesSection />
    <ClosingCTA />
    <Footer />
  </main>
);

export default AboutPage;
