import { useEffect, useState } from "react";
import termsData from "./termsAndConditions.json";
import { useForm } from "@formspree/react";
import Swal from "sweetalert2";
import "./ButtonsFormContact.scss";

const ButtonsFormContact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    message: "",
    termsAccepted: false,
    company: "Jaico Digital",
  });
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);
  const [invalidInput, setInvalidInput] = useState("");
  const [invalidNameInput, setInvalidNameInput] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const whatsappNumber = import.meta.env.VITE_NUMERO_WHATSAPP;
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const termsAndConditions = termsData[0];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    handleSubmit(e);
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      contact: "",
      message: "",
      termsAccepted: false,
      company: "Jaico Digital",
    });
  };

  const handleNameKeyDown = (e) => {
    if (/[^a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
      setInvalidNameInput("Ingresa solo letras...");
      setTimeout(() => setInvalidNameInput(""), 3000);
    } else {
      setInvalidNameInput("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showEmailError("Por favor ingresa un correo electrónico válido...");
    }
  };

  const showEmailError = (message) => {
    setInvalidEmailError(message);
    setTimeout(() => {
      setInvalidEmailError("");
    }, 3000);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Enter",
    ];

    if (!allowedKeys.includes(e.key) && (e.key < "0" || e.key > "9")) {
      e.preventDefault();
      setInvalidInput("Ingresa solo números...");
      setTimeout(() => setInvalidInput(""), 3000);
    } else {
      setInvalidInput("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });

    const emailIsValid = validateEmail(e.target.value);
    if (!emailIsValid) {
      showEmailError("Por favor ingresa un correo electrónico válido...");
    } else {
      setInvalidEmailError("");
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
    setIsButtonDisabled(!e.target.checked);
  };

  useEffect(() => {
    if (state.succeeded) {
      resetForm();
      setIsModalOpen(false);
      Swal.fire({
        title: "¡Éxito!",
        text: "Formulario enviado con éxito",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setIsModalOpen(false);
          resetForm();
        }
      });
    }
  }, [state.succeeded, setIsModalOpen]);

  useEffect(() => {
    if (state.errors) {
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar el formulario",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setIsModalOpen(false);
        }
      });
    }
  }, [state.errors, setIsModalOpen]);

  return (
    <div className="container-modal-form-contact">
      <p className="container-modal-form-contact__title">
        <em>¿Tienes alguna consulta?</em>
      </p>
      <div className="container__maintenance__content--left__buttons">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="container__maintenance__content--left__button container__maintenance__content--left__button--whatsapp"
        >
          Escríbeme por WhatsApp
        </a>

        <button
          onClick={handleFormSubmit}
          className="container__maintenance__content--left__button container__maintenance__content--left__button--form"
        >
          Envía un formulario
        </button>
      </div>
      {isModalOpen && (
        <div className="container__maintenance__content--left__button--form__modal">
          <div className="container__maintenance__content--left__button--form__modal-content">
            {showTerms ? (
              <div className="maintenance__content--left__button--form__modal-content--terms">
                <div className="container-modal-content--back-to-form-button__form-terms">
                  <button
                    onClick={handleToggleTerms}
                    className="modal-content--back-to-form-button__form-terms"
                  >
                    Volver
                  </button>
                </div>
                <h2 className="modal-content--title-terms">
                  {termsAndConditions.title}
                </h2>
                <p className="modal-content--description-terms">
                  {termsAndConditions.content}
                </p>
                <p className="modal-content--description-terms">
                  {termsAndConditions.consent}
                </p>
                <button
                  onClick={handleToggleTerms}
                  className="modal-content--back-to-form-button"
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <form
                className="maintenance__content--left__button--form__modal-content--form"
                onSubmit={handleFormSubmit}
                method="POST"
              >
                <h2 className="modal-content--title-form">
                  Formulario de contacto
                </h2>
                <div className="maintenance__content--left__button--form__modal-content--form__gl">
                  <label className="modal-content--form-label">
                    Nombre completo
                    <input
                      type="text"
                      name="fullname"
                      required
                      placeholder="Pepito Pérez"
                      className="modal-content--form-input"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      onKeyDown={handleNameKeyDown}
                    />
                    {invalidNameInput && (
                      <p className="modal-content--form-error-message">
                        {invalidNameInput}
                      </p>
                    )}
                  </label>
                  <label className="modal-content--form-label">
                    Correo electrónico
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="ejemplo@correo.com"
                      className="modal-content--form-input"
                      value={formData.email}
                      onChange={handleEmailChange}
                    />
                    {invalidEmailError && (
                      <p className="modal-content--form-error-message">
                        {invalidEmailError}
                      </p>
                    )}
                  </label>
                  <label className="modal-content--form-label">
                    Número de contacto
                    <input
                      type="tel"
                      name="contact"
                      placeholder="+573133133131"
                      required
                      className="modal-content--form-input"
                      value={formData.contact}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    {invalidInput && (
                      <p className="modal-content--form-error-message">
                        {invalidInput}
                      </p>
                    )}
                  </label>
                  <label className="modal-content--form-label">
                    Consulta
                    <textarea
                      name="message"
                      required
                      placeholder="En que te puedo ayudar?"
                      className="modal-content--form-input modal-content--form-input-textarea"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </label>
                </div>
                <label className="modal-content--form-label-terms">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    required
                    className="modal-content--form-input"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Acepto los{" "}
                  <span
                    onClick={handleToggleTerms}
                    className="modal-content--form__link-terms"
                  >
                    términos y condiciones
                  </span>
                </label>
                <input type="hidden" name="company" value={formData.company} />
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`modal-content--form-button-send ${
                    isButtonDisabled ? "disabled" : ""
                  }`}
                >
                  Enviar
                </button>
              </form>
            )}
            <span
              onClick={closeModal}
              className="modal-content--form-icon-closed"
            >
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { ButtonsFormContact };
