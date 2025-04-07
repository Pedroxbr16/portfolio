import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import '../App.css'; // ou seu CSS



console.log("Variáveis:", process.env);


export default function ContactForm() {
  const form = useRef();

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  console.log("Chave pública:", publicKey);

  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      serviceID,      // seu Service ID
      templateID,     // substitua pelo Template ID
      form.current,
      publicKey       // substitua pela Public Key do EmailJS
    ).then(
      () => {
        alert('Mensagem enviada com sucesso!');
        form.current.reset();
      },
      (error) => {
        console.error(error.text);
        alert('Erro ao enviar mensagem. Tente novamente.');
      }
    );
  };

  return (
    <section className="contact">
      <h2>Entre em contato</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <input type="email" name="from_email" placeholder="Seu e-mail" required />
        <textarea name="message" placeholder="Sua mensagem" required />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
