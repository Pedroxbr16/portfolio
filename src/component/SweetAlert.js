import Swal from 'sweetalert2'

export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: message,
    confirmButtonColor: '#0061f1',
  })
}

export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Erro!',
    text: message,
    confirmButtonColor: '#e74c3c',
  })
}

export const showWarningAlert = (message) => {
  Swal.fire({
    icon: 'warning',
    title: 'Atenção!',
    text: message,
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#f1c40f',
  })
}
