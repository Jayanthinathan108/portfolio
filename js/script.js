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

/* DARK MODE TEXT FIX */
const toggle = document.getElementById('themeToggle');

function updateText() {
  const isDark = document.body.classList.contains('dark');
  toggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

// Check local storage on load
if (localStorage.theme === "dark") {
  document.body.classList.add("dark");
}
updateText();

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme = document.body.classList.contains("dark") ? "dark" : "light";
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

/* PROJECT FILTER FIX */
const filterBtns = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* Popup */

function openPopup(title,year,desc){
document.getElementById("popupTitle").innerText=title;
document.getElementById("popupYear").innerText=year;
document.getElementById("popupDesc").innerText=desc;
document.getElementById("popup").style.display="flex";
}

function closePopup(){
document.getElementById("popup").style.display="none";
}

/* Filter */

function filterProjects(type,btn){

let cards=document.querySelectorAll(".project-card");

cards.forEach(card=>{
if(type==="all"||card.classList.contains(type)){
card.style.display="block";
}else{
card.style.display="none";
}
});

document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

}

links.forEach(link=>{
  link.addEventListener("click",(e)=>{
    e.preventDefault();

    localStorage.currentPage = link.dataset.page;

    links.forEach(l=>l.classList.remove('active'));
    sections.forEach(s=>s.classList.remove('active'));

    link.classList.add('active');
    document.getElementById(link.dataset.page).classList.add('active');
  });
});

const date = new Date();
const options = { month: "long", year: "numeric" };
document.getElementById("updateDate").textContent =
date.toLocaleDateString("en-US", options).replace(",", " /");
