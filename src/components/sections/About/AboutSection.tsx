import './AboutSection.css';

const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || '';

interface AboutSectionProps {
  mediaType?: 'video' | 'image';
  mediaSrc?: string;
  posterSrc?: string;
}

export const AboutSection = ({
  mediaType = 'image',
  mediaSrc = '/desktop-panda.png',
  posterSrc = '/desktop-panda.png',
}: AboutSectionProps) => {

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header about-header">
          <h2 className="heading-section">
            I turn ideas into impactful digital experiences.
          </h2>
        </div>

        {/* 2-Column Split: Media Showcase (Video/Image) & Editorial Bio */}
        <div className="about-grid">
          {/* Left Column: Media Stage (Video or Image) */}
          <div className="about-media-wrapper">
            <div className="about-media-card">
              {mediaType === 'video' ? (
                <div className="about-video-container">
                  <video
                    className="about-media-element"
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="media-overlay-badge">
                    <span className="media-pulse-dot" />
                    <span>SHOWREEL // 4K</span>
                  </div>
                </div>
              ) : (
                <div className="about-image-container">
                  <img
                    src={mediaSrc}
                    alt="Faizan — Builder & Engineer"
                    className="about-media-element"
                    loading="lazy"
                  />

                </div>
              )}

              {/* Ambient Glass Frame Info */}
              <div className="about-media-footer">
                <span className="media-meta-tag">MOHAMMED FAIZAN</span>
                <span className="media-meta-spec">BUILDER &bull; DEVELOPER &bull; DESIGNER</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Quick Specs */}
          <div className="about-content-wrapper">
            <div className="about-bio-block">
              <h3 className="about-subheading">
                Driven by craft, obsessed with performance, and allergic to generic templates.
              </h3>
              <p className="about-paragraph">
                From designing beautiful websites to building powerful digital products, I bring ideas to life through thoughtful design, smart technology and purposeful execution.

                I work with individuals, startups and businesses to create digital experiences that don't just look good, but work beautifully and deliver real value.
              </p>
            </div>

            {/* Quick Specs / Capabilities Matrix */}
            <div className="about-specs-grid">
              <div className="about-spec-item">
                <span className="spec-label">WHAT I DO</span>
                <span className="spec-value">Websites, Web Apps & Digital Experiences</span>
              </div>
              <div className="about-spec-item">
                <span className="spec-label">MY APPROACH</span>
                <span className="spec-value">Creative Thinking. Thoughtful Execution.</span>
              </div>
              <div className="about-spec-item">
                <span className="spec-label">MY TOOLKIT</span>
                <span className="spec-value">Full-Stack, Shopify, UI/UX & Integrations</span>
              </div>
              <div className="about-spec-item">
                <span className="spec-label">WORK WITH ME</span>
                <span className="spec-value">From First Idea to Final Launch</span>
              </div>
            </div>

            {/* Direct Section Action */}
            <div className="about-action-row">
              <a href="#contact" className="about-cta-link about-cta-primary">
                <span>Let's Talk</span>
                <span className="cta-arrow">&rarr;</span>
              </a>
              <a
                href={LINKEDIN_URL || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-link about-cta-secondary"
                aria-label="Mohammed Faizan on LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="cta-icon-linkedin"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
                <span>LinkedIn</span>

              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
