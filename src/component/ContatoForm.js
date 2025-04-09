import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import '../App.css';
import { showSuccessAlert, showErrorAlert } from './SweetAlert'; 

export default function ContactForm() {
  const form = useRef();

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      serviceID,
      templateID,
      form.current,
      publicKey
    ).then(
      () => {
        showSuccessAlert('Mensagem enviada com sucesso! Aguarde retorno.');
        form.current.reset();
      },
      (error) => {
        console.error(error.text);
        showErrorAlert('Erro ao enviar mensagem. Tente novamente.');
      }
    );
  };

  return (
    <section id="contato" className="contact">
      <h2>Entre em contato</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <input type="email" name="from_email" placeholder="Seu e-mail" required />
        <textarea name="message" placeholder="Sua mensagem" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
