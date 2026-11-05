import { useState, useEffect, type FormEvent } from 'react';
import './ContactSection.css';

// Environment Variables & Secret Configuration
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
const WEB3FORMS_API_URL = import.meta.env.VITE_WEB3FORMS_API_URL || 'https://api.web3forms.com/submit';
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || '';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || '';
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || '';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do revisions work across projects?',
    answer:
      'Every project includes structured revision stages during UI/UX prototyping and development to ensure your vision is executed with rapid velocity and precision.',
  },
  {
    question: 'How is project pricing calculated?',
    answer:
      'Every project receives a customized, fixed-milestone proposal based on the technical scope of your chosen vertical (Website, Mobile App, E-Commerce, or Custom Software) and required maintenance.',
  },
  {
    question: 'Do you offer ongoing retainer & maintenance?',
    answer:
      'Yes. We provide continuous technical management, cloud server administration, security monitoring, performance auditing, and ongoing bug troubleshooting.',
  },
  {
    question: 'How quickly can we kick off a project?',
    answer:
      'Once project requirements and milestones are agreed upon, technical architecture and UI/UX design sprints begin within 3 to 5 business days.',
  },
];

const VERTICAL_OPTIONS = [
  { id: 'website', name: 'Website', subtitle: 'Websites, portfolios & landing pages' },
  { id: 'mobile', name: 'Mobile App', subtitle: 'iOS, Android & cross-platform apps' },
  { id: 'ecommerce', name: 'E-Commerce', subtitle: 'Shopify & bespoke retail stores' },
  { id: 'software', name: 'Custom Software', subtitle: 'SaaS, dashboards & business systems' },
];

const TIMELINE_TIERS = ['< 1 Month', '1 - 2 Months', '2 - 3 Months', 'Flexible'];

export const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<'brief' | 'sync'>('brief');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('website');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    vertical: string;
    timeline: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock Telemetry
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web3Forms direct email transmission to CONTACT_EMAIL
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Automated spambot honeypot filter
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setSubmitError('Please enter your full name or company name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setSubmitError('Please enter a valid work email address (e.g. name@company.com).');
      return;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setSubmitError('Please enter a valid phone or WhatsApp number with at least 7 digits.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const verticalName = VERTICAL_OPTIONS.find((v) => v.id === selectedVertical)?.name || selectedVertical;

    try {
      const response = await fetch(WEB3FORMS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          service_vertical: verticalName,
          target_timeline: timeline,
          message: message.trim() || 'No additional notes provided.',
          from_name: `${trimmedName} (pandacodes)`,
          subject: `⚡ New Project Brief from ${trimmedName} [${verticalName}]`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Successful submission: permanently display Thank You card until refresh
        setSubmittedData({
          name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          vertical: verticalName,
          timeline: timeline,
        });
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setSubmitError(data.message || `Transmission failed. Please reach out directly to ${CONTACT_EMAIL}`);
      }
    } catch {
      setSubmitError(`Network error transmitting brief. Please reach out directly to ${CONTACT_EMAIL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <section id="contact" className="section-wrapper contact-section">
      <div className="container">
        {/* ==========================================================================
            1. SECTION MASTHEAD WITH LIVE TELEMETRY
            ========================================================================== */}
        <div className="contact-header">
          <div className="contact-telemetry-row">
            <span className="contact-live-pill">
              <span className="contact-live-dot" />
              <span>IST {currentTime || 'UTC+5:30'}</span>
              <span className="telemetry-sep">&bull;</span>
              <span>STUDIO ONLINE</span>
              <span className="telemetry-sep">&bull;</span>
              <span>ACCEPTING COMMISSIONS</span>
            </span>
          </div>
          <h2 className="contact-title">Let's Build Something Exceptional.</h2>
          <p className="contact-subtext">
            Have a project, startup idea, or architectural challenge? Transmit an executive brief or schedule an instant 15-minute technical review.
          </p>
        </div>

        <div className="contact-split-layout">
          {/* ==========================================================================
              LEFT COLUMN: EXECUTIVE DOSSIER, OPERATIONAL SLA & FAQS
              ========================================================================== */}
          <div className="contact-info-panel">
            {/* Lead Architect Direct Card */}
            <div className="contact-direct-card">
              <div className="contact-card-top-row">
                <span className="contact-card-tag">DIRECT CHANNEL</span>
                <span className="contact-card-subtag">LEAD ENGINEER</span>
              </div>

              <h4 className="contact-architect-name">Mohammed Faizan</h4>
              <p className="contact-architect-role">Principal Full-Stack Engineer &amp; Architect</p>

              <div className="contact-email-row">
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email-link">
                  {CONTACT_EMAIL}
                </a>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? 'COPIED ✓' : 'COPY'}
                </button>
              </div>

              <p className="contact-card-subtext">
                Direct inquiry channel for bespoke digital solutions, high-performance web engineering, and continuous technical management.
              </p>

              <div className="contact-channels-grid">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-pill"
                >
                  <span>Calendly</span>
                  <span className="channel-arrow">&rarr;</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-pill"
                >
                  <span>LinkedIn</span>
                  <span className="channel-arrow">&rarr;</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-pill"
                >
                  <span>Instagram</span>
                  <span className="channel-arrow">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Operational Commitments Grid */}
            <div className="contact-metrics-matrix">
              <div className="metric-box">
                <span className="metric-label">RESPONSE SLA</span>
                <span className="metric-val">&lt; 24 Hours</span>
                <span className="metric-caption">Guaranteed turnaround</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">PRICING MODEL</span>
                <span className="metric-val">Milestone Fixed</span>
                <span className="metric-caption">Zero hidden costs</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">TIMEZONE OVERLAP</span>
                <span className="metric-val">IST &bull; UTC+5:30</span>
                <span className="metric-caption">Global client overlap</span>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="contact-faq-wrapper">
              <span className="faq-tag">COMMON INQUIRIES</span>
              <h4 className="faq-title">Frequently Asked Questions</h4>
              <div className="faq-accordion-list">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-item ${activeFaq === idx ? 'is-open' : ''}`}
                    onClick={() => toggleFaq(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFaq(idx);
                      }
                    }}
                  >
                    <div className="faq-question-row">
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                    </div>
                    {activeFaq === idx && (
                      <div className="faq-answer-body">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==========================================================================
              RIGHT COLUMN: HIGH-CONTRAST ARCHITECTURAL COMMISSION HUB
              ========================================================================== */}
          <div className="contact-hub-panel">
            {/* If successfully submitted, permanently display the Thank You Card until refreshed */}
            {submitted ? (
              <div className="contact-thankyou-card">
                <div className="thankyou-badge-row">
                  <span className="thankyou-check-pill">
                    <span className="check-symbol">✓</span>
                    <span>DISPATCH LOGGED</span>
                  </span>
                  <span className="thankyou-live-tag">● STATUS: TRANSMITTED</span>
                </div>

                <h3 className="thankyou-title">
                  Thank You{submittedData?.name ? `, ${submittedData.name}` : ''}.
                </h3>

                <p className="thankyou-message">
                  Your project brief has been logged and delivered directly to lead full-stack architect <strong>Mohammed Faizan</strong>. A technical evaluation and milestone roadmap will be transmitted to <strong>{submittedData?.email || CONTACT_EMAIL}</strong> within 24 hours.
                </p>

                <div className="thankyou-receipt-box">
                  <div className="receipt-header">
                    <span className="receipt-label">COMMISSION RECEIPT</span>
                    <span className="receipt-timestamp">{currentTime || 'IST UTC+5:30'}</span>
                  </div>
                  <div className="receipt-rows">
                    <div className="receipt-row">
                      <span className="receipt-key">Client Name:</span>
                      <span className="receipt-val">{submittedData?.name}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-key">Email:</span>
                      <span className="receipt-val">{submittedData?.email}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-key">Phone / WhatsApp:</span>
                      <span className="receipt-val">{submittedData?.phone}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-key">Selected Vertical:</span>
                      <span className="receipt-val">{submittedData?.vertical || 'Website'}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-key">Target Timeline:</span>
                      <span className="receipt-val">{submittedData?.timeline || 'Flexible'}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-key">SLA Guarantee:</span>
                      <span className="receipt-val">&lt; 24h Human Review</span>
                    </div>
                  </div>
                </div>

                <div className="thankyou-actions">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="thankyou-action-btn"
                  >
                    <span>WANT TO DISCUSS NOW? SCHEDULE 15-MIN CALL</span>
                    <span className="btn-arrow">&rarr;</span>
                  </a>
                  <p className="thankyou-persist-note">
                    This confirmation will stay on screen for your records until you refresh the page.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Interactive Mode Switcher Tabs */}
                <div className="contact-mode-switch">
                  <button
                    type="button"
                    className={`mode-switch-btn ${activeTab === 'brief' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('brief')}
                  >
                    <span className="mode-btn-icon">✎</span>
                    <span>PROJECT COMMISSION BRIEF</span>
                  </button>
                  <button
                    type="button"
                    className={`mode-switch-btn ${activeTab === 'sync' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('sync')}
                  >
                    <span className="mode-btn-icon">⚡</span>
                    <span>DIRECT 15-MIN SYNC</span>
                  </button>
                </div>

                {/* TAB 1: ARCHITECTURAL BRIEF FORM */}
                {activeTab === 'brief' && (
                  <form onSubmit={handleSubmit} className="arch-form">
                    <div className="arch-form-header">
                      <div>
                        <span className="arch-form-legend">TRANSMIT TECHNICAL BRIEF</span>
                        <p className="arch-form-subtext">Fill out your project requirements for an architectural review within 24 hours.</p>
                      </div>
                      <span className="arch-live-badge">● DISPATCH ACTIVE</span>
                    </div>

                    {/* Spambot Honeypot Field */}
                    <input
                      type="text"
                      name="_bot_filter"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    {/* Minimalist Floating Underline Contact Details */}
                    <div className="arch-row-2col">
                      <div className="arch-field">
                        <label htmlFor="brief-name" className="arch-label">YOUR NAME *</label>
                        <input
                          id="brief-name"
                          type="text"
                          placeholder="e.g. Alex Chen"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (submitError) setSubmitError(null);
                          }}
                          required
                          className="arch-input"
                        />
                      </div>
                      <div className="arch-field">
                        <label htmlFor="brief-email" className="arch-label">WORK EMAIL *</label>
                        <input
                          id="brief-email"
                          type="email"
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (submitError) setSubmitError(null);
                          }}
                          required
                          className="arch-input"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp Number Field */}
                    <div className="arch-field">
                      <label htmlFor="brief-phone" className="arch-label">PHONE / WHATSAPP NUMBER *</label>
                      <input
                        id="brief-phone"
                        type="tel"
                        placeholder="e.g. +91 98765 43210 / +1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (submitError) setSubmitError(null);
                        }}
                        required
                        className="arch-input"
                      />
                    </div>

                    {/* 4 Core Options Grid (No amounts, no plans) */}
                    <div className="arch-field">
                      <label className="arch-label">WHAT WOULD YOU LIKE TO BUILD?</label>
                      <div className="arch-tiles-grid">
                        {VERTICAL_OPTIONS.map((vertical) => (
                          <button
                            key={vertical.id}
                            type="button"
                            className={`arch-tile ${selectedVertical === vertical.id ? 'is-active' : ''}`}
                            onClick={() => setSelectedVertical(vertical.id)}
                          >
                            <span className="arch-tile-name">{vertical.name}</span>
                            <span className="arch-tile-detail">{vertical.subtitle}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Timeline */}
                    <div className="arch-field">
                      <label className="arch-label">TARGET LAUNCH TIMELINE</label>
                      <div className="arch-chips-row">
                        {TIMELINE_TIERS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            className={`arch-chip ${timeline === t ? 'is-active' : ''}`}
                            onClick={() => setTimeline(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Project Vision */}
                    <div className="arch-field">
                      <label htmlFor="brief-message" className="arch-label">PROJECT DETAILS &amp; OBJECTIVES (OPTIONAL)</label>
                      <textarea
                        id="brief-message"
                        placeholder="Briefly outline your product goals, required features, or specific technical preferences..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="arch-textarea"
                      />
                    </div>

                    {/* Submit Action */}
                    <button
                      type="submit"
                      className="arch-submit-btn"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? 'TRANSMITTING BRIEF...' : 'TRANSMIT PROJECT BRIEF'}
                      </span>
                      {!isSubmitting && <span className="btn-arrow">&rarr;</span>}
                    </button>

                    {/* Error Banner if transmission fails */}
                    {submitError && (
                      <div className="contact-error-banner">
                        <div className="error-icon">!</div>
                        <div className="error-copy">
                          <h6 className="error-title">Transmission Error</h6>
                          <p className="error-desc">{submitError}</p>
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* TAB 2: DIRECT 15-MINUTE SYNC (CONNECTED TO CALENDLY) */}
                {activeTab === 'sync' && (
                  <div className="arch-sync-panel">
                    <div className="sync-header">
                      <span className="sync-tag">FAST-TRACK PATHWAY</span>
                      <h3 className="sync-title">Direct Engineering Consultation</h3>
                      <p className="sync-desc">
                        Prefer an immediate conversation? Skip the written brief and connect directly with lead engineer Mohammed Faizan to review architectural feasibility, scoping, and milestone commitments.
                      </p>
                    </div>

                    <div className="sync-cards-grid">
                      {/* Option 1: Architecture Video Call via Calendly */}
                      <div className="sync-card">
                        <div className="sync-card-icon">⚡</div>
                        <h4 className="sync-card-title">15-Minute Architecture Review</h4>
                        <p className="sync-card-desc">
                          A focused technical consultation over Google Meet to review system feasibility, stack options, and preliminary project sizing.
                        </p>
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sync-action-btn btn-primary"
                        >
                          <span>SCHEDULE ON CALENDLY</span>
                          <span className="btn-arrow">&rarr;</span>
                        </a>
                      </div>

                      {/* Option 2: Priority Direct Email */}
                      <div className="sync-card">
                        <div className="sync-card-icon">✉</div>
                        <h4 className="sync-card-title">Direct Technical Inquiry</h4>
                        <p className="sync-card-desc">
                          Already have an RFP, architecture document, or Figma spec? Send it directly to the engineering inbox for same-day evaluation.
                        </p>
                        <a
                          href={`mailto:${CONTACT_EMAIL}?subject=Project%20Inquiry%20-%20Technical%20Evaluation`}
                          className="sync-action-btn btn-secondary"
                        >
                          <span>SEND DIRECT INQUIRY</span>
                          <span className="btn-arrow">&rarr;</span>
                        </a>
                      </div>
                    </div>

                    <div className="sync-footer-note">
                      <span className="sync-pulse-dot" />
                      <span>GUARANTEED HUMAN RESPONSE WITHIN 24 HOURS &bull; ZERO ACCOUNT MANAGERS</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
