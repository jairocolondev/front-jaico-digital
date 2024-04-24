import imgMatenimiento from "../../assets/imagen-pagina-mantenimiento.png";
import { ButtonsFormContact } from "./ButtonsFormContact/ButtonsFormContact";
import { Timer } from "./Timer/Timer";
import "./LandingMaintenance.scss";

const LandingMaintenance = () => {
  return (
    <section className="container__maintenance">
      <div className="container__maintenance__content">
        {/*** COLUMNA IZQUIERDA ***/}
        <div className="container__maintenance__content--left">
          <h1 className="container__maintenance__content--left__title">
            Bienvenidos a Mi Sitio Web
          </h1>
          <p className="container__maintenance__content--left__description">
            Estamos actualizando nuestra interfaz visual UX/UI, muy pronto
            estaremos al aire de nuevo. {String.fromCodePoint(0x1f6a7)}
          </p>
          <ButtonsFormContact />
          <Timer />
        </div>

        {/*** COLUMNA DERECHA ***/}
        <div className="container__maintenance__content--right relative">
          <img
            src={imgMatenimiento}
            alt="Imagen de página en mantenimiento - Sitio Web en construcción"
            className="container__maintenance__content--right__image"
          />
          <span className="absolute top-0 left-0">Diseño Web</span>
          <span className="absolute top-0 right-0">Desarrollo Web</span>
          <span className="absolute bottom-0 left-0">Desarrollo Mobile</span>
          <span className="absolute bottom-0 right-0">Community Manager</span>
          <span className="absolute bottom-0 right-0">Diseño Gráfico</span>
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Posicionamiento SEO
          </span>
          <span className="absolute bottom-0">Branding</span>
        </div>
      </div>
    </section>
  );
};

export { LandingMaintenance };
