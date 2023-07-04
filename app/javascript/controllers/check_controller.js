import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="check"
export default class extends Controller {
  connect() {
  }
  
  active(e) {
    const id = e.target.dataset.id
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content

    fetch(`/tasks/${id}/active`, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      body: JSON.stringify({completed: e.target.checked})
    })
    .then(response => response.text())
    .then(Turbo.renderStreamMessage)
  }
}
