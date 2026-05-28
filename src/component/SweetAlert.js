import '../assets/css/SweetAlert.css';

async function getSwal() {
  const module = await import('sweetalert2');
  return module.default;
}

const buildAlertOptions = (type, title, message, confirmButtonText = 'OK') => ({
  icon: type,
  title,
  text: message,
  confirmButtonText,
  buttonsStyling: false,
  customClass: {
    popup: 'pj-swal-popup',
    title: 'pj-swal-title',
    htmlContainer: 'pj-swal-text',
    confirmButton: 'pj-swal-confirm',
    icon: 'pj-swal-icon',
  },
});

export const showSuccessAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire(buildAlertOptions('success', 'Sucesso!', message));
};

export const showErrorAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire(buildAlertOptions('error', 'Erro!', message));
};

export const showWarningAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire(buildAlertOptions('warning', 'Atenção!', message, 'Entendi'));
};
