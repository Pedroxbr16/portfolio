async function getSwal() {
  const module = await import('sweetalert2');
  return module.default;
}

export const showSuccessAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: message,
    confirmButtonColor: '#0061f1',
  });
};

export const showErrorAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire({
    icon: 'error',
    title: 'Erro!',
    text: message,
    confirmButtonColor: '#e74c3c',
  });
};

export const showWarningAlert = async (message) => {
  const Swal = await getSwal();

  Swal.fire({
    icon: 'warning',
    title: 'Atenção!',
    text: message,
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#f1c40f',
  });
};
