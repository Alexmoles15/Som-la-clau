import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import fondoLlaves from "../assets/fondo-llaves.png";
import { useLanguage } from "../i18n/LanguageContext";
import pattern from "../styles/patternPage.module.css";
import css from "../styles/Home.module.css";

import type { Servicio } from "../types/servicio";
import {
  formatearPrecio,
  normalizarListaServicios,
} from "../utils/servicios";
import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../api/api";

function Home() {
  const { t } = useLanguage();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  useEffect(() => {
    const cargarServicios = async () => {
      setLoadingServicios(true);

      try {
        const response = await fetch(getApiUrl("/servicios/activos"));

        if (!response.ok) {
          throw new Error(t.home.errors.loadServices);
        }

        const data = await response.json();
        const normalizados = normalizarListaServicios(data);
        setServicios(normalizados);
      } catch (error) {
        console.error(error);
        setServicios([]);
      } finally {
        setLoadingServicios(false);
      }
    };

    cargarServicios();
  }, [t.home.errors.loadServices]);

  const serviciosDestacados = useMemo(() => {
    return [...servicios]
      .sort((a, b) => {
        const ordenA = a.orden ?? 9999;
        const ordenB = b.orden ?? 9999;
        return ordenA - ordenB;
      })
      .slice(0, 4);
  }, [servicios]);

  return (
    <main className={pattern.page}>
      <div
        className={pattern.pattern}
        style={{ backgroundImage: `url(${fondoLlaves})` }}
      />
      <div className={pattern.softLayer} />

      <div className={pattern.content}>
        <div className={css.container}>
          <section className={css.hero}>
            <div className={css.heroGlowOne}></div>
            <div className={css.heroGlowTwo}></div>

            <div className={css.heroContent}>
              <div className={css.left}>
                <span className={css.badge}>{t.home.badge}</span>

                <h1 className={css.title}>{t.home.title}</h1>

                <p className={css.subtitle}>{t.home.subtitle}</p>

                <p className={css.coverageText}>{t.home.coverageText}</p>

                <div className={css.coverageTags}>
                  {t.home.coverageTags.map((tag: string) => (
                    <span key={tag} className={css.coverageTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={css.phoneBox}>
                  <span className={css.phoneLabel}>
                    {t.home.directAttention}
                  </span>

                  <a href="tel:667572011" className={css.phone}>
                    <span className={css.phoneIcon} aria-hidden="true">
                      ☎
                    </span>
                    <span>667 572 011</span>
                  </a>
                </div>

                <div className={css.buttons}>
                  <a href="tel:667572011" className={css.primaryButton}>
                    {t.home.callNow}
                  </a>
                  <Link to="/servicios" className={css.secondaryButton}>
                    {t.home.viewServices}
                  </Link>
                </div>

                <div className={css.miniHighlights}>
                  <div className={css.miniHighlightItem}>
                    <span className={css.miniHighlightNumber}>
                      {t.home.miniHighlights.urgentNumber}
                    </span>
                    <span className={css.miniHighlightText}>
                      {t.home.miniHighlights.urgentText}
                    </span>
                  </div>

                  <div className={css.miniHighlightItem}>
                    <span className={css.miniHighlightNumber}>
                      {t.home.miniHighlights.damageFreeNumber}
                    </span>
                    <span className={css.miniHighlightText}>
                      {t.home.miniHighlights.damageFreeText}
                    </span>
                  </div>

                  <div className={css.miniHighlightItem}>
                    <span className={css.miniHighlightNumber}>
                      {t.home.miniHighlights.securityNumber}
                    </span>
                    <span className={css.miniHighlightText}>
                      {t.home.miniHighlights.securityText}
                    </span>
                  </div>
                </div>
              </div>

              <div className={css.right}>
                <div className={css.heroRightColumn}>
                  <div className={css.logoCard}>
                    <img src={logo} alt={t.brand} className={css.logo} />
                  </div>

                  <div className={css.floatingInfoCard}>
                    <span className={css.floatingInfoTop}>
                      {t.home.floatingCard.top}
                    </span>
                    <strong className={css.floatingInfoMain}>
                      {t.home.floatingCard.main}
                    </strong>
                    <span className={css.floatingInfoBottom}>
                      {t.home.floatingCard.bottom}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={css.statsSection}>
            <div className={css.statCard}>
              <div className={css.statNumber}>{t.home.stats.urgentNumber}</div>
              <div className={css.statLabel}>{t.home.stats.urgentLabel}</div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>
                {t.home.stats.damageFreeNumber}
              </div>
              <div className={css.statLabel}>
                {t.home.stats.damageFreeLabel}
              </div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>
                {t.home.stats.securityNumber}
              </div>
              <div className={css.statLabel}>{t.home.stats.securityLabel}</div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>{t.home.stats.onlineNumber}</div>
              <div className={css.statLabel}>{t.home.stats.onlineLabel}</div>
            </div>
          </section>

          <section className={css.featuresSection}>
            <div className={css.featureCard}>
              <div className={css.featureIcon}>🕒</div>
              <h3 className={css.featureTitle}>{t.home.urgent24h}</h3>
              <p className={css.featureText}>{t.home.urgent24hText}</p>
            </div>

            <div className={css.featureCard}>
              <div className={css.featureIcon}>🔓</div>
              <h3 className={css.featureTitle}>{t.home.damageFree}</h3>
              <p className={css.featureText}>{t.home.damageFreeText}</p>
            </div>

            <div className={css.featureCard}>
              <div className={css.featureIcon}>🛡️</div>
              <h3 className={css.featureTitle}>{t.home.securityTrust}</h3>
              <p className={css.featureText}>{t.home.securityTrustText}</p>
            </div>
          </section>

          <section className={css.servicesPreviewSection}>
            <div className={css.sectionHeader}>
              <span className={css.sectionEyebrow}>
                {t.home.servicesPreview.eyebrow}
              </span>
              <h2 className={css.sectionTitle}>
                {t.home.servicesPreview.title}
              </h2>
              <p className={css.sectionText}>
                {t.home.servicesPreview.text}
              </p>
            </div>

            {loadingServicios ? (
              <div className={css.servicesPreviewGrid}>
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className={css.servicePreviewCard}>
                    <div className={css.skeletonImage}></div>
                    <div className={css.servicePreviewBody}>
                      <div className={css.skeletonTitle}></div>
                      <div className={css.skeletonText}></div>
                      <div className={css.skeletonTextShort}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : serviciosDestacados.length > 0 ? (
              <div className={css.servicesPreviewGrid}>
                {serviciosDestacados.map((servicio) => (
                  <div key={servicio.id} className={css.servicePreviewCard}>
                    <div
                      className={css.servicePreviewImage}
                      style={{
                        backgroundImage: `url(${
                          servicio.imagenUrl ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                        })`,
                      }}
                    >
                      <div className={css.servicePreviewImageOverlay}></div>

                      {servicio.urgente && (
                        <span className={css.serviceUrgentBadge}>
                          {t.home.servicesPreview.urgentBadge}
                        </span>
                      )}
                    </div>

                    <div className={css.servicePreviewBody}>
                      <h3 className={css.servicePreviewTitle}>
                        {servicio.nombre}
                      </h3>

                      <p className={css.servicePreviewText}>
                        {servicio.descripcion ||
                          t.home.servicesPreview.defaultServiceDescription}
                      </p>

                      <div className={css.servicePreviewFooter}>
                        <span className={css.servicePrice}>
                          {formatearPrecio(
                            servicio.precioBase,
                            servicio.urgente
                          )}
                        </span>

                        <Link
                          to="/servicios"
                          className={css.servicePreviewLink}
                        >
                          {t.home.servicesPreview.viewMore}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={css.emptyServicesBox}>
                <p className={css.emptyServicesText}>
                  {t.home.servicesPreview.emptyText}
                </p>
                <Link to="/servicios" className={css.servicesPreviewButton}>
                  {t.home.viewServices}
                </Link>
              </div>
            )}

            <div className={css.servicesPreviewActions}>
              <Link to="/servicios" className={css.servicesPreviewButton}>
                {t.home.servicesPreview.viewAll}
              </Link>
            </div>
          </section>

          <section className={css.trustSection}>
            <div className={css.trustLeft}>
              <span className={css.sectionEyebrow}>{t.home.trust.eyebrow}</span>
              <h2 className={css.sectionTitle}>{t.home.trust.title}</h2>
              <p className={css.sectionText}>{t.home.trust.text}</p>

              <ul className={css.trustList}>
                <li className={css.trustItem}>{t.home.trust.items.phone}</li>
                <li className={css.trustItem}>{t.home.trust.items.services}</li>
                <li className={css.trustItem}>{t.home.trust.items.quote}</li>
                <li className={css.trustItem}>{t.home.trust.items.security}</li>
              </ul>
            </div>

            <div className={css.trustRight}>
              <div className={css.trustCardDark}>
                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>
                    {t.home.trust.card.phoneLabel}
                  </span>
                  <a href="tel:667572011" className={css.trustCardPhone}>
                    667 572 011
                  </a>
                </div>

                <div className={css.trustDivider}></div>

                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>
                    {t.home.trust.card.quickConsultationLabel}
                  </span>
                  <span className={css.trustCardText}>
                    {t.home.trust.card.quickConsultationText}
                  </span>
                </div>

                <div className={css.trustDivider}></div>

                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>
                    {t.home.trust.card.onlineQuoteLabel}
                  </span>
                  <span className={css.trustCardText}>
                    {t.home.trust.card.onlineQuoteText}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className={css.ctaSection}>
            <h2 className={css.ctaTitle}>{t.home.needLocksmith}</h2>
            <p className={css.ctaText}>{t.home.needLocksmithText}</p>

            <div className={css.ctaButtons}>
              <a href="tel:667572011" className={css.ctaButton}>
                {t.home.callFull}
              </a>

              <Link to="/servicios" className={css.ctaSecondaryButton}>
                {t.home.cta.requestQuote}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;