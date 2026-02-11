import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════
   CONSTANTS & TRANSITIONS
   ═══════════════════════════════════════════════════ */
const EASE = [0.16, 1, 0.3, 1];
const EASE_OUT = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ═══════════════════════════════════════════════════
   MAGNETIC CURSOR
   ═══════════════════════════════════════════════════ */
const MagneticCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const interactiveEls = document.querySelectorAll('a, button, [data-magnetic]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            borderColor: isHovering
              ? 'rgba(201, 169, 110, 0.8)'
              : 'rgba(26, 26, 26, 0.4)',
          }}
          transition={{ duration: 0.3, ease: EASE }}
          className="rounded-full border"
        />
      </motion.div>
      {/* inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 8 : 5,
            height: isHovering ? 8 : 5,
            backgroundColor: isHovering ? '#c9a96e' : '#1a1a1a',
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
};

/* ═══════════════════════════════════════════════════
   PARALLAX FLOATING SHAPES
   ═══════════════════════════════════════════════════ */
const ParallaxShapes = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[15%] right-[8%] w-64 h-64 rounded-full border border-gallery-accent/10 animate-pulse-soft"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-[45%] left-[5%] w-40 h-40 border border-gallery-subtle/40 rotate-45"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[70%] right-[15%] w-24 h-24 rounded-full bg-gallery-accent/[0.04] animate-float"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[25%] left-[15%] w-2 h-2 rounded-full bg-gallery-accent/30 animate-float-slow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[60%] right-[30%] w-3 h-3 rounded-full bg-gallery-muted/20 animate-float"
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   NAVIGATION BAR
   ═══════════════════════════════════════════════════ */
const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 py-5"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gallery-bg/80 backdrop-blur-xl border-b border-gallery-subtle/50"
      />
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        <motion.a
          href="/"
          data-magnetic
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="font-serif text-xl tracking-[0.15em] text-gallery-dark uppercase"
        >
          Zigguratss
        </motion.a>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="hidden md:flex items-center gap-10 font-sans text-xs tracking-[0.2em] uppercase text-gallery-muted"
        >
          {['Artworks', 'Artists', 'About', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={item === 'About' ? '#' : `https://zigguratss.com/${item.toLowerCase()}`}
              data-magnetic
              className={`relative transition-colors duration-300 hover:text-gallery-dark ${
                item === 'About' ? 'text-gallery-dark font-medium' : ''
              }`}
            >
              {item}
              {item === 'About' && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gallery-accent" />
              )}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

/* ═══════════════════════════════════════════════════
   1 · HERO — SPLIT SCREEN
   ═══════════════════════════════════════════════════ */
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left — Text */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="h-px bg-gallery-accent mb-8"
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-6"
            >
              Zigguratss Artwork LLP
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gallery-dark leading-[1.05] tracking-tight mb-8"
            >
              Bringing{' '}
              <span className="italic text-gallery-accent">Artists</span> &{' '}
              <span className="italic text-gallery-accent">Art Lovers</span>
              <br />
              at One Stage
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="font-sans text-base sm:text-lg text-gallery-muted leading-relaxed max-w-lg mb-10"
            >
              We welcome Artists around the world to showcase their work here.
              Our aim and mission is to bring both the Artist's and Art lovers
              at one stage.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.9}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="https://zigguratss.com/artworks"
                data-magnetic
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gallery-dark text-gallery-bg font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-gallery-accent hover:text-gallery-dark"
              >
                Explore Collection
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#story"
                data-magnetic
                className="font-sans text-xs tracking-[0.2em] uppercase text-gallery-muted hover:text-gallery-dark transition-colors duration-300 border-b border-gallery-muted/30 pb-1"
              >
                Our Story
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex gap-12 mt-16 pt-8 border-t border-gallery-subtle"
            >
              {[
                { number: '500+', label: 'Original Works' },
                { number: '120+', label: 'Global Artists' },
                { number: '30+', label: 'Countries Served' },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} custom={1.1}>
                  <span className="font-serif text-2xl sm:text-3xl text-gallery-dark">
                    {stat.number}
                  </span>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gallery-muted mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Featured Artwork Image */}
          <motion.div
            style={{ y: imgY }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5]">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.3 }}
                className="absolute inset-0"
              >
                <img
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1800&auto=format"
                  alt="Featured artwork — curated gallery piece"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Reveal overlay that slides away */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.3 }}
                className="absolute inset-0 bg-gallery-bg z-10"
              />
            </div>

            {/* Artwork label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white/90 backdrop-blur-sm px-6 py-4 border border-gallery-subtle/60"
            >
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gallery-muted">
                The Zigguratss
              </p>
              <p className="font-serif text-sm text-gallery-dark mt-1">
                A Brief about Artworks
              </p>
            </motion.div>

            {/* Decorative frame corner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute -top-3 -right-3 w-16 h-16 border-t border-r border-gallery-accent/30"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════
   2 · SCROLL PROGRESS TIMELINE
   ═══════════════════════════════════════════════════ */
const timelineData = [
  {
    year: 'The Genesis',
    title: 'Our Story',
    content:
      'We started our journey with a thought of bringing worlds renowned and upcoming artists on one platform and connect them to the art collectors worldwide. Zigguratss is the beginning of a new era in the world of art business.',
  },
  {
    year: 'Heritage',
    title: 'A Brief History of Art',
    content:
      'India, being the oldest and the first in the culture and also it\'s first in producing the different kind of artifacts or arts. Be it Vatsyayana who introduced art of love through Kamasutra or Raja Ravi Verma who portrayed the beauty of woman on canvas and brought it to life through his vision.',
  },
  {
    year: 'Legacy',
    title: 'The Lineage of Masters',
    content:
      'There were times when artists used to engrave their craft on stones and walls, and later on it all converted into papers, canvas and painters like Rabindranath Tagore, Vincent Van Gogh, M.F. Hussain, Pablo Picasso, Amrita Sher Gill, Leonardo Da Vinci, Claude Monet and many more brought arts to life through their skills.',
  },
  {
    year: 'Purpose',
    title: 'Our Motive',
    content:
      'We believe that art is a medium of communication, innovation and above all, an inspiration. So, we at Zigguratss brings you the worlds spectacular all the original arts from the artists across the globe.',
  },
  {
    year: 'Mission',
    title: 'Empowering Artists',
    content:
      'We provide artists the space which enables them to sell their artwork globally and connect with their respective audience and admirers and also manage the sale of their artwork, because art is valuable & precious and the artist should get proper acknowledge for their work.',
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
    <section
      id="story"
      ref={containerRef}
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* Section header */}
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

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Progress line */}
        <div className="absolute left-6 sm:left-10 lg:left-16 top-0 bottom-0 w-px">
          <div className="h-full w-full bg-gallery-subtle" />
          <motion.div
            style={{ height: smoothHeight }}
            className="absolute top-0 left-0 w-full bg-gallery-accent origin-top"
          />
        </div>

        {/* Milestones */}
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

  return (
    <div ref={ref} className="relative pl-12 sm:pl-16">
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
        className="font-sans text-base text-gallery-muted leading-[1.8] max-w-2xl"
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

const ArtworkGallery = () => (
  <section className="relative py-32 sm:py-40 overflow-hidden bg-gallery-warm">
    <div className="absolute inset-0 bg-grain opacity-20" />

    {/* Section header */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-20">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="font-sans text-xs tracking-[0.4em] uppercase text-gallery-accent mb-4"
      >
        A Brief about Artworks
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gallery-dark mb-6"
      >
        Curated <span className="italic text-gallery-accent">Collection</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-sans text-base text-gallery-muted max-w-2xl leading-relaxed"
      >
        Paintings, sculptures, serigraphs, photography — each of these art forms
        has the ability to evoke emotions, tell a story, and bring joy to those
        who experience them.
      </motion.p>
    </div>

    {/* Masonry-style grid */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {artworks.map((art, i) => (
          <ArtworkCard key={art.id} artwork={art} index={i} />
        ))}
      </div>
    </div>

    {/* View all CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 text-center mt-20"
    >
      <a
        href="https://zigguratss.com/artworks"
        data-magnetic
        className="group inline-flex items-center gap-3 px-10 py-4 bg-gallery-dark text-gallery-bg font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-500 hover:bg-gallery-accent hover:text-gallery-dark"
      >
        View All Artworks
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </motion.div>
  </section>
);

const ArtworkCard = ({ artwork, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  // Vary aspect ratios for masonry look
  const aspects = [
    'aspect-[3/4]',
    'aspect-[4/5]',
    'aspect-[2/3]',
    'aspect-square',
    'aspect-[3/4]',
    'aspect-[5/6]',
    'aspect-[2/3]',
    'aspect-[4/5]',
    'aspect-[3/4]',
    'aspect-square',
    'aspect-[4/5]',
    'aspect-[3/4]',
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 3) * 0.12 }}
      className="break-inside-avoid group"
      data-magnetic
    >
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-500"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(201, 169, 110, 0.12)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${aspects[index % aspects.length]}`}>
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span className="inline-block bg-gallery-accent/90 text-gallery-dark font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 mb-2">
              {artwork.medium}
            </span>
            <p className="font-sans text-xs text-white/80">
              {artwork.dimensions}
            </p>
          </div>
        </div>

        {/* Card info */}
        <div className="p-5">
          <h3 className="font-serif text-base sm:text-lg text-gallery-dark leading-tight mb-1 group-hover:text-gallery-accent transition-colors duration-400">
            {artwork.title}
          </h3>
          <p className="font-sans text-xs text-gallery-muted tracking-wide mb-3">
            by {artwork.artist}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-gallery-subtle/60">
            <span className="font-sans text-sm text-gallery-dark font-medium">
              {artwork.price}
            </span>
            <button
              aria-label={`View ${artwork.title}`}
              className="w-8 h-8 rounded-full border border-gallery-dark/15 flex items-center justify-center group/btn hover:border-gallery-accent hover:bg-gallery-accent transition-all duration-300"
            >
              <svg
                className="w-3.5 h-3.5 text-gallery-muted group-hover/btn:text-gallery-dark transition-colors duration-300 -rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
    name: 'Vijay Bhatt',
    role: 'Founder & Chief Curator',
    bio: 'Visionary behind the Zigguratss ethos. Two decades in art curation and a relentless pursuit of authentic provenance.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format',
    accent: 'from-gallery-accent/20 to-transparent',
  },
  {
    name: 'Mukesh Dabral',
    role: 'Director of Operations',
    bio: 'The architect of seamless logistics. Ensures every masterpiece arrives in pristine condition, anywhere on the globe.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format',
    accent: 'from-blue-300/20 to-transparent',
  },
  {
    name: 'Ajay Singh',
    role: 'Head of Artist Relations',
    bio: 'The bridge between raw talent and global recognition. Scouts emerging voices from studios across India and beyond.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format',
    accent: 'from-emerald-300/20 to-transparent',
  },
  {
    name: 'Akansha N Bhatt',
    role: 'Creative Director',
    bio: 'Shapes the visual narrative of Zigguratss. A designer with an artist\'s soul and a curator\'s precision.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format',
    accent: 'from-rose-300/20 to-transparent',
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay: index * 0.15 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="group relative"
      data-magnetic
    >
      {/* Glassmorphism card */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '0.5px solid rgba(201, 169, 110, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Gradient glow on hover */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${member.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Portrait */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 overflow-hidden rounded-full">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 rounded-full border border-gallery-accent/20" />
        </div>

        {/* Info */}
        <div className="text-center relative z-10">
          <h3 className="font-serif text-lg sm:text-xl text-gallery-dark mb-1 group-hover:text-gallery-accent transition-colors duration-500">
            {member.name}
          </h3>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gallery-accent mb-4">
            {member.role}
          </p>
          <p className="font-sans text-sm text-gallery-muted leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
          className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gallery-accent/30 to-transparent origin-center"
        />
      </div>
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
const AboutPage = () => (
  <main className="relative bg-gallery-bg overflow-hidden">
    <MagneticCursor />
    <ParallaxShapes />
    <Navbar />
    <HeroSection />
    <TimelineSection />
    <ArtworkGallery />
    <QuoteBreak />
    <TeamSection />
    <ValuesSection />
    <ClosingCTA />
    <Footer />
  </main>
);

export default AboutPage;
