import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';

/* ═══════════════════════════════════════════════
   DATA — Artworks from zigguratss.com
   ═══════════════════════════════════════════════ */
const artworks = [
  {
    id: 1,
    title: 'Tune Of Bengal — 4',
    artist: 'Sekhar Roy',
    price: '₹ 4,16,000',
    dimensions: '121.92 x 91.44 cm',
    category: 'Painting',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1800&auto=format',
  },
  {
    id: 2,
    title: 'Tune Of Bengal — 3',
    artist: 'Sekhar Roy',
    price: '₹ 8,32,000',
    dimensions: '152.40 x 121.92 cm',
    category: 'Painting',
    image:
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1800&auto=format',
  },
  {
    id: 3,
    title: 'The Juggler Within',
    artist: 'Pramod Neelakandan',
    price: '₹ 45,500',
    dimensions: '60.96 x 45.72 cm',
    category: 'Contemporary',
    image:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1800&auto=format',
  },
  {
    id: 4,
    title: 'Ocean Of Dreams',
    artist: 'Uttam Bhattacharya',
    price: '₹ 52,000',
    dimensions: '76.20 x 101.60 cm',
    category: 'Abstract',
    image:
      'https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=1800&auto=format',
  },
  {
    id: 5,
    title: 'Eternal Grace',
    artist: 'Priyanka Bardhan',
    price: '₹ 68,750',
    dimensions: '76.20 x 76.20 cm',
    category: 'Figurative',
    image:
      'https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1800&auto=format',
  },
  {
    id: 6,
    title: 'Melody of Feathers',
    artist: 'Priyanka Bardhan',
    price: '₹ 68,750',
    dimensions: '76.20 x 91.44 cm',
    category: 'Nature',
    image:
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=1800&auto=format',
  },
  {
    id: 7,
    title: 'Inner Peace 6',
    artist: 'Monalisa Sarkar Mitra',
    price: '₹ 1,17,000',
    dimensions: '91.44 x 91.44 cm',
    category: 'Spiritual',
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1800&auto=format',
  },
];

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */
const EASE = [0.16, 1, 0.3, 1];

const ArrowIcon = () => (
  <svg
    className="w-4 h-4 text-luxury-muted group-hover/btn:text-luxury-dark transition-colors duration-300 -rotate-45"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ═══════════════════════════════════════════════
   1 · HERO INTRO
   ═══════════════════════════════════════════════ */
const HeroIntro = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  return (
    <motion.section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-dark"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(212,175,55,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.3) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="text-luxury-accent font-sans text-xs sm:text-sm tracking-[0.4em] uppercase mb-6"
        >
          Zigguratss — Curated Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="font-serif text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] text-luxury-text leading-[0.9] tracking-tight"
        >
          Featured
          <br />
          <span className="italic text-luxury-accent/80">Artworks</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
          className="mx-auto mt-10 h-px w-32 bg-luxury-accent/40 origin-left"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-luxury-muted font-sans text-sm sm:text-base max-w-md mx-auto leading-relaxed"
        >
          A handpicked selection of extraordinary works from India's most
          acclaimed contemporary artists.
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-luxury-muted/60 text-[10px] tracking-[0.3em] uppercase font-sans">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-luxury-accent/60 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════
   2 · HORIZONTAL SCROLL GALLERY
   ═══════════════════════════════════════════════ */
const HorizontalGallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // 7 items → each ~50 vw on desktop, first panel already visible
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(artworks.length - 1) * 50}%`],
  );
  const smoothX = useSpring(x, { stiffness: 60, damping: 30, restDelta: 0.001 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{ height: `${artworks.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-luxury-dark">
        {/* header labels */}
        <div className="absolute top-8 left-8 lg:left-16 z-20">
          <p className="text-luxury-accent/60 font-sans text-[10px] tracking-[0.4em] uppercase">
            Gallery
          </p>
        </div>
        <div className="absolute top-8 right-8 lg:right-16 z-20 font-sans text-luxury-muted/50 text-sm">
          <span className="text-luxury-text text-2xl font-light">{artworks.length}</span>
          <span className="ml-1 text-xs">works</span>
        </div>

        {/* horizontal track */}
        <motion.div
          style={{ x: smoothX }}
          className="flex h-full items-center will-change-transform"
        >
          {artworks.map((art, i) => (
            <GalleryCard key={art.id} artwork={art} index={i} />
          ))}
        </motion.div>

        {/* progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-luxury-text/5 z-20">
          <motion.div style={{ width: progressWidth }} className="h-full bg-luxury-accent/50" />
        </div>
      </div>
    </section>
  );
};

/* ─────────────── gallery card ─────────────── */
const GalleryCard = ({ artwork, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  return (
    <div
      ref={ref}
      className="flex-shrink-0 w-screen md:w-[50vw] h-full flex items-center justify-center px-4 sm:px-8 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={{ duration: 1, ease: EASE }}
        className="group relative w-full max-w-[540px]"
      >
        {/* large floating number */}
        <div className="absolute -top-6 -left-2 md:-left-6 z-10 pointer-events-none select-none">
          <span className="font-serif text-[5rem] md:text-[7rem] leading-none text-luxury-accent/[0.07]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* image */}
        <div className="relative overflow-hidden bg-luxury-neutral aspect-[3/4] cursor-pointer">
          <motion.img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={inView ? { scale: 1 } : { scale: 1.2 }}
            transition={{ duration: 1.6, ease: EASE }}
            whileHover={{ scale: 1.05 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* category badge */}
          <div className="absolute top-5 left-5">
            <span className="bg-black/40 backdrop-blur-md text-luxury-text/90 text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1.5 border border-white/10">
              {artwork.category}
            </span>
          </div>

          {/* CTA overlay */}
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button className="w-full py-3.5 bg-luxury-accent text-luxury-dark font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-luxury-text">
              View Artwork
            </button>
          </div>
        </div>

        {/* meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-6 md:mt-8"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-luxury-text leading-tight mb-2 group-hover:text-luxury-accent transition-colors duration-500">
            {artwork.title}
          </h3>
          <p className="font-sans text-sm text-luxury-muted tracking-wide mb-4">
            by {artwork.artist}
          </p>

          <div className="flex items-center justify-between border-t border-luxury-text/10 pt-4">
            <div className="flex items-center gap-4">
              <span className="font-sans text-lg md:text-xl text-luxury-text font-light">
                {artwork.price}
              </span>
              {artwork.dimensions && (
                <span className="hidden sm:inline-block text-luxury-muted/50 text-xs font-sans tracking-wider">
                  {artwork.dimensions}
                </span>
              )}
            </div>
            <button
              aria-label={`View ${artwork.title}`}
              className="w-10 h-10 rounded-full border border-luxury-text/20 flex items-center justify-center group/btn hover:border-luxury-accent hover:bg-luxury-accent transition-all duration-300"
            >
              <ArrowIcon />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   3 · IMMERSIVE SHOWCASE  (top 3 artworks)
   ═══════════════════════════════════════════════ */
const ImmersiveShowcase = () => {
  const featured = artworks.slice(0, 3);

  return (
    <section className="relative bg-luxury-dark">
      {/* section header */}
      <div className="h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="text-luxury-accent font-sans text-xs tracking-[0.4em] uppercase mb-4"
        >
          Editor's Selection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-luxury-text"
        >
          Masterpieces
        </motion.h2>
      </div>

      {featured.map((art, i) => (
        <ImmersiveSlide key={art.id} artwork={art} reversed={i % 2 !== 0} />
      ))}
    </section>
  );
};

/* ─────────────── immersive slide ─────────────── */
const ImmersiveSlide = ({ artwork, reversed }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`min-h-screen flex flex-col ${
        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-8 lg:gap-0 px-6 sm:px-10 lg:px-20 py-20 lg:py-0`}
    >
      {/* image */}
      <div className="w-full lg:w-[55%] relative">
        <motion.div style={{ y: imgY, scale: imgScale }} className="relative overflow-hidden">
          <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
            <img
              src={artwork.image}
              alt={artwork.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`absolute top-4 ${
              reversed ? 'right-4' : 'left-4'
            } bottom-4 w-px bg-luxury-accent/20`}
          />
          <div className="absolute top-4 left-4 right-4 h-px bg-luxury-accent/20" />
        </motion.div>
      </div>

      {/* text */}
      <motion.div
        style={{ y: textY }}
        className={`w-full lg:w-[45%] flex flex-col justify-center ${
          reversed ? 'lg:pr-20 lg:items-end lg:text-right' : 'lg:pl-20'
        }`}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-luxury-accent font-sans text-[10px] tracking-[0.3em] uppercase mb-4 block"
        >
          {artwork.category}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-luxury-text mb-4 leading-[1.1]"
        >
          {artwork.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="font-sans text-base text-luxury-muted mb-2"
        >
          by {artwork.artist}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="flex flex-wrap items-center gap-6 mt-4 mb-8"
        >
          <span className="font-sans text-2xl text-luxury-text font-light">
            {artwork.price}
          </span>
          {artwork.dimensions && (
            <>
              <span className="w-px h-5 bg-luxury-text/20 hidden sm:block" />
              <span className="font-sans text-xs text-luxury-muted tracking-wider">
                {artwork.dimensions}
              </span>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="flex gap-4"
        >
          <button className="px-8 py-3.5 bg-luxury-accent text-luxury-dark font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-luxury-text">
            View Artwork
          </button>
          <button className="px-8 py-3.5 border border-luxury-text/20 text-luxury-muted font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-luxury-accent hover:text-luxury-accent">
            Enquire
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════
   4 · CLOSING CTA
   ═══════════════════════════════════════════════ */
const ClosingCTA = () => (
  <section className="relative h-[60vh] flex flex-col items-center justify-center bg-luxury-dark text-center px-6 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[500px] h-[500px] rounded-full bg-luxury-accent/[0.03] blur-[120px]" />
    </div>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
      className="w-20 h-px bg-luxury-accent/40 mb-10 origin-center"
    />
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE }}
      className="font-serif text-3xl sm:text-4xl lg:text-5xl text-luxury-text mb-5"
    >
      Explore the Full Collection
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-luxury-muted font-sans text-sm max-w-md mb-10"
    >
      Discover hundreds of museum-quality works from emerging and established
      artists across India.
    </motion.p>
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="px-10 py-4 bg-luxury-accent text-luxury-dark font-sans text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 hover:bg-luxury-text"
    >
      View All Artworks
    </motion.button>
  </section>
);

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
const FeaturedArtworks = () => (
  <main className="bg-luxury-dark">
    <HeroIntro />
    <HorizontalGallery />
    <ImmersiveShowcase />
    <ClosingCTA />
  </main>
);

export default FeaturedArtworks;
