const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible') }), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelector('.hero-copy').classList.add('visible');
document.addEventListener('mousemove', e => { const glow = document.querySelector('.cursor-glow'); glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => { document.querySelector('.nav-links .active')?.classList.remove('active'); link.classList.add('active'); }));
const roles = ['Student'];
const target = document.querySelector('#typed-role'); let role = 0; let char = 0; let removing = false;
function typeRole() { const word = roles[role]; target.textContent = word.slice(0, char); if (!removing && char < word.length) { char++; setTimeout(typeRole, 72); } else if (!removing) { removing = true; setTimeout(typeRole, 1600); } else if (char > 0) { char--; setTimeout(typeRole, 38); } else { removing = false; role = (role + 1) % roles.length; setTimeout(typeRole, 280); } }
typeRole();

const projectModal = document.querySelector('#project-modal');
const modalPreview = document.querySelector('#project-modal-preview');
const modalTitle = document.querySelector('#project-modal-title');
const modalDescription = document.querySelector('#project-modal-description');
const modalTech = document.querySelector('#project-modal-tech');
const modalDemo = document.querySelector('#project-modal-demo');
// const modalGithub = document.querySelector('#project-modal-github');
let lastProject;

function closeProjectModal() {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastProject?.focus();
}

function openProjectModal(project) {
  lastProject = project;
  const { projectTitle, projectDescription, projectTech, projectDemo, projectGithub, projectPreview } = project.dataset;
  modalTitle.textContent = projectTitle;
  modalDescription.textContent = projectDescription;
  modalTech.replaceChildren(...projectTech.split(',').map(tech => {
    const item = document.createElement('li');
    item.textContent = tech.trim();
    return item;
  }));
  modalDemo.href = projectDemo;
  // modalGithub.href = projectGithub;
  modalPreview.className = `project-modal__preview ${projectPreview}`;
  modalPreview.innerHTML = `
  <img src="${projectPreview}" alt="${projectTitle}" class="project-modal__image">
  
`;
   
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  projectModal.querySelector('.project-modal__close').focus();
}

document.querySelectorAll('.project[data-project-title]').forEach(project => {
  project.addEventListener('click', event => {
    event.preventDefault();
    openProjectModal(project);
  });
});
document.querySelectorAll('[data-modal-close]').forEach(control => control.addEventListener('click', closeProjectModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && projectModal.classList.contains('is-open')) closeProjectModal();
});
