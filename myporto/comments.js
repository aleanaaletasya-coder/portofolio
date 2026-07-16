const form = document.querySelector('#comment-form');
const list = document.querySelector('#comment-list');
const note = document.querySelector('#form-note');
const key = 'aruna-portfolio-comments';
const escapeHTML = value => value.replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' })[char]);
function renderComments() {
  const comments = JSON.parse(localStorage.getItem(key) || '[]');
  list.innerHTML = comments.length ? comments.map(comment => `<article class="comment-item"><header><strong>${escapeHTML(comment.name)}</strong><time>${escapeHTML(comment.date)}</time></header><p>${escapeHTML(comment.message)}</p></article>`).join('') : '<p class="empty-state">Belum ada komentar. Jadilah yang pertama menyapa!</p>';
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form); const comments = JSON.parse(localStorage.getItem(key) || '[]');
  comments.unshift({ name: data.get('name').trim(), message: data.get('message').trim(), date: new Intl.DateTimeFormat('id-ID', { day:'numeric', month:'short', year:'numeric' }).format(new Date()) });
  localStorage.setItem(key, JSON.stringify(comments.slice(0, 30)));
  form.reset(); renderComments(); note.textContent = 'Terima kasih! Komentarmu sudah ditampilkan.';
});
renderComments();
