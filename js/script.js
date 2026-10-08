const html=document.documentElement;
const navbar=document.getElementById("navbar");
const mobileMenu=document.getElementById("mobileMenu");
const menuBtn=document.getElementById("menuBtn");

function setTheme(theme){
  html.classList.toggle("dark",theme==="dark");
  localStorage.setItem("theme",theme);
  document.querySelectorAll("#themeToggle,#themeToggleMobile").forEach(b=>b.textContent=theme==="dark"?"☀":"☾");
}
const saved=localStorage.getItem("theme");
setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));

document.querySelectorAll("#themeToggle,#themeToggleMobile").forEach(btn=>{
  btn.addEventListener("click",()=>setTheme(html.classList.contains("dark")?"light":"dark"));
});
menuBtn?.addEventListener("click",()=>mobileMenu.classList.toggle("hidden"));
document.querySelectorAll(".mobile-link").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.add("hidden")));

window.addEventListener("scroll",()=>{
  navbar.classList.toggle("border-slate-200/70",scrollY>20);
  navbar.classList.toggle("bg-white/75",scrollY>20);
  navbar.classList.toggle("backdrop-blur-xl",scrollY>20);
  navbar.classList.toggle("dark:bg-[#070b14]/75",scrollY>20);
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));

document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      const show=filter==="all" || card.dataset.category.split(" ").includes(filter);
      card.style.display=show?"block":"none";
    });
  });
});

const projectData={
 smart:{title:"Smart Home Guide",category:"Bootstrap / Frontend",desc:"Fully responsive smart-home product guide featuring a hero banner, category grid, comparison tables and carousel sliders.",tags:["HTML","Bootstrap 5","JavaScript"],live:"https://tinyurl.com/2c4qv4ly",git:"https://tinyurl.com/255d58zd",visual:"visual-one"},
 dwellfi:{title:"DwellFi",category:"Fintech Landing Page",desc:"Responsive fintech landing page designed for investors and fund managers with dropdown navigation, KPI statistics, tabbed solutions and a leadership/team slider.",tags:["HTML","Tailwind CSS","JavaScript"],live:"https://mrpritam777.github.io/dwellfi-assignment/",visual:"visual-two"},
 decor:{title:"Decor Furniture",category:"E-Commerce",desc:"Responsive home-decor e-commerce showcase website with a structured product presentation and modern UI.",tags:["HTML5","CSS3","JavaScript"],live:"https://tinyurl.com/yke43v66",visual:"visual-three"},
 mmcr:{title:"MMCR",category:"Restaurant & Catering",desc:"Responsive restaurant and catering website supporting dine-in, delivery and event catering, with Maps, click-to-call, WhatsApp contact, ratings and scroll animations.",tags:["HTML","Tailwind CSS","JavaScript"],live:"https://mrpritam777.github.io/MMCR/",visual:"visual-four"},
 crud:{title:"Product CRUD Management System",category:"PHP / MySQL",desc:"Structured product management application covering product add, list, edit and view operations with supporting authentication and profile functionality.",tags:["PHP","MySQL","PDO"],live:"https://github.com/mrpritam777/Product_curd",git:"https://github.com/mrpritam777/Product_curd",visual:"visual-five"},
 food:{title:"Online Food Ordering System",category:"Online Food Ordering",desc:"Web-based food ordering system concept covering food browsing, categories, cart, order placement, order history and administration.",tags:["PHP","MySQL","HTML"],live:"https://github.com/mrpritam777/onlinefoodorder",git:"https://github.com/mrpritam777/onlinefoodorder",visual:"visual-six"}
};
const modal=document.getElementById("projectModal");
const modalVisual=document.getElementById("modalVisual");
document.querySelectorAll(".project-open").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const p=projectData[btn.dataset.project];
    document.getElementById("modalTitle").textContent=p.title;
    document.getElementById("modalCategory").textContent=p.category;
    document.getElementById("modalDesc").textContent=p.desc;
    modalVisual.className="project-visual rounded-2xl "+p.visual;
    document.getElementById("modalTags").innerHTML=p.tags.map(t=>`<span class="tag">${t}</span>`).join("");
    const live=document.getElementById("modalLive"); live.href=p.live;
    const git=document.getElementById("modalGit");
    if(p.git){git.classList.remove("hidden");git.href=p.git}else git.classList.add("hidden");
    modal.classList.remove("hidden");modal.classList.add("flex");document.body.style.overflow="hidden";
  });
});
function closeModal(){modal.classList.add("hidden");modal.classList.remove("flex");document.body.style.overflow=""}
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const msg=document.getElementById("formMessage");
  msg.textContent="Thanks! Your message has been received.";
  msg.classList.remove("hidden");
  e.target.reset();
});
