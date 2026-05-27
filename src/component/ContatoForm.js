import React, { useRef, useState } from 'react';
import '../App.css';
import {
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
} from './SweetAlert';

const RATE_LIMIT_KEY = 'contact_form_rate_limit_v1';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 min
const COOLDOWN_MS = 30 * 1000; // 30s

function readRateLimitData() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) {
      return { timestamps: [], lastAttempt: 0 };
    }
    const parsed = JSON.parse(raw);
    return {
      timestamps: Array.isArray(parsed.timestamps)
        ? parsed.timestamps.filter((ts) => Number.isFinite(ts))
        : [],
      lastAttempt: Number.isFinite(parsed.lastAttempt) ? parsed.lastAttempt : 0,
    };
  } catch (_) {
    return { timestamps: [], lastAttempt: 0 };
  }
}

function saveRateLimitData(data) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch (_) {}
}

function normalizeRateLimitData(data, now) {
  return {
    timestamps: data.timestamps
      .filter((ts) => now - ts < WINDOW_MS)
      .sort((a, b) => a - b),
    lastAttempt: data.lastAttempt,
  };
}

function formatWaitTime(ms) {
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min`;
}

export default function ContactForm() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (e) => {
    e.preventDefault();

    if (isSending) return;

    const now = Date.now();
    const currentData = normalizeRateLimitData(readRateLimitData(), now);
    const cooldownRemaining = COOLDOWN_MS - (now - currentData.lastAttempt);

    if (cooldownRemaining > 0) {
      showWarningAlert(
        `Aguarde ${formatWaitTime(cooldownRemaining)} antes de enviar novamente.`
      );
      return;
    }

    if (currentData.timestamps.length >= MAX_SUBMISSIONS) {
      const resetMs = WINDOW_MS - (now - currentData.timestamps[0]);
      showWarningAlert(
        `Limite atingido: ${MAX_SUBMISSIONS} envios a cada 15 minutos. Tente de novo em ${formatWaitTime(
          resetMs
        )}.`
      );
      return;
    }

    const updatedData = {
      timestamps: [...currentData.timestamps, now],
      lastAttempt: now,
    };
    saveRateLimitData(updatedData);

    setIsSending(true);
    try {
      const emailjsModule = await import('emailjs-com');
      const emailjs = emailjsModule.default;

      await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      showSuccessAlert('Mensagem enviada com sucesso! Aguarde retorno.');
      form.current.reset();
    } catch (error) {
      console.error(error.text);
      showErrorAlert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="contact">
      <h2>Entre em contato</h2>
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <input type="email" name="from_email" placeholder="Seu e-mail" required />
        <textarea name="message" placeholder="Sua mensagem" required />
        <button type="submit" disabled={isSending}>
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </section>
  );
}
