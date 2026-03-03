/* PAGE SWITCH */
const links=document.querySelectorAll('.nav a[data-page]');
const sections=document.querySelectorAll('section');

links.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();
    links.forEach(l=>l.classList.remove('active'));
    sections.forEach(s=>s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(link.dataset.page).classList.add('active');
  });
});

const savedPage = localStorage.currentPage;
if(savedPage){
  document.querySelector(`[data-page="${savedPage}"]`).click();
}

/* DARK MODE TEXT */
const toggle=document.getElementById('themeToggle');
function updateText(){
  toggle.textContent=document.body.classList.contains('dark')
    ? 'Light Mode'
    : 'Dark Mode';
}
if(localStorage.theme==="dark") document.body.classList.add("dark");
updateText();
toggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.theme=document.body.classList.contains("dark")?"dark":"light";
  updateText();
};

/* BLOG POPUP */
const blogCards = document.querySelectorAll(".blog-card");
const modal = document.getElementById("blogModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");

blogCards.forEach(card=>{
  card.addEventListener("click", ()=>{
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").textContent;
    const meta = card.querySelector(".meta").textContent;
    const desc = card.querySelector("p").textContent;

    modalImg.src = img;
    modalTitle.textContent = title;
    modalMeta.textContent = meta;
    modalDesc.textContent = desc;

    modal.classList.add("active");
  });
});

closeModal.onclick = ()=>{
  modal.classList.remove("active");
};

modal.onclick = (e)=>{
  if(e.target === modal){
    modal.classList.remove("active");
  }
};
