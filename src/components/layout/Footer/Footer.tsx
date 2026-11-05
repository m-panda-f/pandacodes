import { useState, useEffect } from 'react';
import { scrollTo } from '../../../hooks/useLenis';
import './Footer.css';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || '';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || '';
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || '';

export const Footer = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && legalModal) {
        setLegalModal(null);
      }
    };
    if (legalModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [legalModal]);

  const scrollToTop = () => {
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer className="pandacodes-footer">
      {/* Curved top boundary divider that spans 100% full width of the viewport */}


      <div className="footer-main-surface">
        <div className="footer-content-wrapper">
          {/* Top Links: Split Left/Right on Desktop, Strict 2-Columns on Mobile */}
          <div className="footer-nav-grid">
            {/* Column 1: Legal */}
            <div className="footer-nav-col footer-col-legal">
              <span className="footer-col-label">Legal</span>
              <button
                type="button"
                className="footer-nav-link footer-nav-btn"
                onClick={() => setLegalModal('privacy')}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className="footer-nav-link footer-nav-btn"
                onClick={() => setLegalModal('terms')}
              >
                Terms &amp; Conditions
              </button>
            </div>

            {/* Column 2: Connect */}
            <div className="footer-nav-col footer-col-connect">
              <span className="footer-col-label">Connect</span>
              <div className="footer-social-row">
                <a
                  href={INSTAGRAM_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
                <a
                  href={LINKEDIN_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
                <a
                  href={GITHUB_URL || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>
                <a
                  href={CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : '#'}
                  className="footer-social-link"
                  aria-label="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Huge Monolithic Typography: FAIZAN */}
          <div className="footer-display-block" aria-hidden="true">
            <h2 className="footer-display-name">FAIZAN</h2>
          </div>

          {/* Bottom Hairline Bar */}
          <div className="footer-bottom-row">
            <span className="footer-copyright-text">
              &copy; {new Date().getFullYear()} pandacodes &mdash; Faizan. All rights reserved.
            </span>
            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
            >
              Back to top <span>&uarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Legal Modals (Privacy Policy & Terms) */}
      {legalModal && (
        <div
          className="legal-modal-backdrop"
          onClick={() => setLegalModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div
            className="legal-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="legal-modal-header">
              <span className="legal-modal-tag">LEGAL COMPLIANCE</span>
              <button
                type="button"
                className="legal-modal-close"
                onClick={() => setLegalModal(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="legal-modal-body">
              {legalModal === 'privacy' ? (
                <>
                  <h3 id="legal-modal-title" className="legal-modal-title">
                    Privacy Policy &amp; Client Confidentiality
                  </h3>
                  <p className="legal-modal-intro">
                    At pandacodes, client trust, code security, and confidentiality form the bedrock of every technical engagement.
                  </p>
                  <div className="legal-modal-section">
                    <h4>1. Data Collection &amp; Use</h4>
                    <p>
                      Information submitted via our contact forms (including name, email address, phone number, and project briefs) is processed solely for evaluating project feasibility, responding to inquiries, and establishing bilateral communication.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>2. Zero Third-Party Sale or Disclosure</h4>
                    <p>
                      We do not sell, rent, monetize, or disclose your contact information or intellectual project details to any third party under any circumstances.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>3. Mutual Non-Disclosure (NDA)</h4>
                    <p>
                      All client project discussions, architectures, proprietary codebases, and API credentials are held strictly confidential under mutual NDA guidelines.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>4. Data Removal</h4>
                    <p>
                      You may request the full deletion of your contact records and historical briefs at any time by emailing us directly.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 id="legal-modal-title" className="legal-modal-title">
                    Terms &amp; Technical Engagement Standards
                  </h3>
                  <p className="legal-modal-intro">
                    Clear commercial parameters and engineering expectations governing client commissions and software deliverables.
                  </p>
                  <div className="legal-modal-section">
                    <h4>1. Statement of Work &amp; Scoping</h4>
                    <p>
                      Each project engagement commences following mutual agreement on a detailed Statement of Work (SOW) outlining milestone deliverables, technical specifications, and timeline estimates.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>2. Intellectual Property Rights</h4>
                    <p>
                      Upon final settlement of project fees, full intellectual property rights, source code ownership, repository access, and deployable assets are transferred 100% to the client.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>3. Quality Assurance &amp; Warranty</h4>
                    <p>
                      Every bespoke build includes rigorous cross-device QA, performance optimization, and a complimentary 30-day post-launch bug warranty to ensure operational stability.
                    </p>
                  </div>
                  <div className="legal-modal-section">
                    <h4>4. Revisions &amp; Maintenance Scope</h4>
                    <p>
                      Revisions and ongoing maintenance follow the agreed package tier (Launch, Growth, or Elite). Additional scope beyond baseline requirements is estimated transparently prior to implementation.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="legal-modal-footer">
              <button
                type="button"
                className="legal-modal-action-btn"
                onClick={() => setLegalModal(null)}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
