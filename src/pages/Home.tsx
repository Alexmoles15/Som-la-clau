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

function Home() {
  const { t } = useLanguage();

  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  useEffect(() => {
    const cargarServicios = async () => {
      setLoadingServicios(true);

      try {
        const response = await fetch(
          "http://localhost:8080/api/servicios/activos"
        );

        if (!response.ok) {
          throw new Error("No se pudieron cargar los servicios");
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
  }, []);

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

                <div className={css.phoneBox}>
                  <span className={css.phoneLabel}>
                    {t.home.directAttention}
                  </span>
                  <a href="tel:667572011" className={css.phone}>
                    667 572 011
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
                    <span className={css.miniHighlightNumber}>24h</span>
                    <span className={css.miniHighlightText}>Urgencias</span>
                  </div>

                  <div className={css.miniHighlightItem}>
                    <span className={css.miniHighlightNumber}>Sin daños</span>
                    <span className={css.miniHighlightText}>
                      Aperturas seguras
                    </span>
                  </div>

                  <div className={css.miniHighlightItem}>
                    <span className={css.miniHighlightNumber}>Seguridad</span>
                    <span className={css.miniHighlightText}>
                      Bombines y cerraduras
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
                      Servicio profesional
                    </span>
                    <strong className={css.floatingInfoMain}>
                      Aperturas, cambios de cerradura y mejoras de seguridad
                    </strong>
                    <span className={css.floatingInfoBottom}>
                      Atención rápida y valoración orientativa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={css.statsSection}>
            <div className={css.statCard}>
              <div className={css.statNumber}>24/7</div>
              <div className={css.statLabel}>
                Disponibilidad para urgencias
              </div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>Sin daños</div>
              <div className={css.statLabel}>
                Aperturas cuidadosas y profesionales
              </div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>+ Seguridad</div>
              <div className={css.statLabel}>
                Bombines y soluciones reforzadas
              </div>
            </div>

            <div className={css.statCard}>
              <div className={css.statNumber}>Online</div>
              <div className={css.statLabel}>
                Valoración aproximada desde la web
              </div>
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
              <span className={css.sectionEyebrow}>Servicios destacados</span>
              <h2 className={css.sectionTitle}>Lo que más te pueden resolver</h2>
              <p className={css.sectionText}>
                Aquí tienes algunos de los servicios activos que ya tienes
                cargados en la aplicación.
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
                          Urgente
                        </span>
                      )}
                    </div>

                    <div className={css.servicePreviewBody}>
                      <h3 className={css.servicePreviewTitle}>
                        {servicio.nombre}
                      </h3>

                      <p className={css.servicePreviewText}>
                        {servicio.descripcion ||
                          "Servicio profesional de cerrajería"}
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
                          Ver más
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={css.emptyServicesBox}>
                <p className={css.emptyServicesText}>
                  No se pudieron cargar los servicios destacados ahora mismo.
                </p>
                <Link to="/servicios" className={css.servicesPreviewButton}>
                  Ver servicios
                </Link>
              </div>
            )}

            <div className={css.servicesPreviewActions}>
              <Link to="/servicios" className={css.servicesPreviewButton}>
                Ver todos los servicios
              </Link>
            </div>
          </section>

          <section className={css.trustSection}>
            <div className={css.trustLeft}>
              <span className={css.sectionEyebrow}>Confianza</span>
              <h2 className={css.sectionTitle}>Atención clara y directa</h2>
              <p className={css.sectionText}>
                Puedes llamar directamente o revisar los servicios para pedir
                una valoración aproximada antes de la intervención.
              </p>

              <ul className={css.trustList}>
                <li className={css.trustItem}>
                  Atención inmediata por teléfono
                </li>
                <li className={css.trustItem}>
                  Servicios claros y visibles
                </li>
                <li className={css.trustItem}>
                  Valoración orientativa online
                </li>
                <li className={css.trustItem}>
                  Opciones de mejora de seguridad
                </li>
              </ul>
            </div>

            <div className={css.trustRight}>
              <div className={css.trustCardDark}>
                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>Teléfono directo</span>
                  <a href="tel:667572011" className={css.trustCardPhone}>
                    667 572 011
                  </a>
                </div>

                <div className={css.trustDivider}></div>

                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>Consulta rápida</span>
                  <span className={css.trustCardText}>
                    Explícanos tu caso y te orientamos
                  </span>
                </div>

                <div className={css.trustDivider}></div>

                <div className={css.trustCardLine}>
                  <span className={css.trustCardLabel}>Valoración online</span>
                  <span className={css.trustCardText}>
                    Selecciona servicios y solicita una estimación
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
                Solicitar valoración
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;