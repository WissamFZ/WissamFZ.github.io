const grid = document.getElementById("galleryGrid");
const count = document.getElementById("photoCount");

function renderGallery(){
  count.textContent = photos.length;
  if(!photos.length){
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:55px;border:2px dashed #f3bfd5;border-radius:28px;color:#a8798d;background:#fff">
      <div style="font-size:38px">🎀</div>
      <h3>Your gallery is waiting</h3>
      <p>Add photos in <b>gallery.js</b> and put the image files inside <b>photos/</b>.</p>
    </div>`;
    return;
  }
  grid.innerHTML = photos.map((p,i)=>`
  <article class="photo visible" data-index="${i}">
    <img src="${p.src}" alt="${p.title || 'Memory'}" loading="lazy">
    <span class="label">${p.title || '♡'}</span>
    ${p.note ? `<span class="memory-note">${p.note}</span>` : ""}
  </article>
`).join("");
}
renderGallery();

const modal=document.getElementById("modal"), modalImg=document.getElementById("modalImg"), modalCaption=document.getElementById("modalCaption");
grid.addEventListener("click",e=>{
  const card=e.target.closest(".photo"); if(!card)return;
  const p=photos[card.dataset.index]; modalImg.src=p.src; modalImg.alt=p.title||"Memory"; modalCaption.textContent=p.title||"♡";
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
});
function close(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
document.getElementById("closeModal").onclick=close;
modal.addEventListener("click",e=>{if(e.target===modal)close()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});

document.getElementById("bow").addEventListener("click",()=>{
  for(let i=0;i<18;i++){
    const h=document.createElement("span"); h.textContent=["♡","🎀","✦"][i%3];
    h.style.cssText=`position:fixed;left:${45+Math.random()*10}%;top:45%;font-size:${16+Math.random()*20}px;z-index:100;pointer-events:none;animation:float 1.5s ease-out forwards`;
    document.body.appendChild(h); setTimeout(()=>h.remove(),1500);
  }
});
const style=document.createElement("style");
style.textContent="@keyframes float{to{transform:translate(${(Math.random()-.5)*300}px,-${150+Math.random()*250}px) rotate(30deg);opacity:0}}";
document.head.appendChild(style);
/* =================================
   PRISTINE BABY — OPENING ANIMATION
   ================================= */

const welcomeScreen = document.getElementById("welcomeScreen");
const enterButton = document.getElementById("enterButton");
const particleContainer = document.querySelector(".welcome-particles");

const particleSymbols = ["♡", "✦", "✧", "🎀", "·"];

function createWelcomeParticle() {
  if (!particleContainer) return;

  const particle = document.createElement("span");

  particle.className = "welcome-particle";
  particle.textContent =
    particleSymbols[Math.floor(Math.random() * particleSymbols.length)];

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.bottom = `${-10 - Math.random() * 20}%`;
  particle.style.fontSize = `${12 + Math.random() * 22}px`;
  particle.style.animationDuration = `${5 + Math.random() * 6}s`;
  particle.style.setProperty(
    "--drift",
    `${-80 + Math.random() * 160}px`
  );

  particleContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

const particleInterval = setInterval(createWelcomeParticle, 350);

for (let i = 0; i < 12; i++) {
  setTimeout(createWelcomeParticle, i * 180);
}

if (enterButton) {
  enterButton.addEventListener("click", () => {

    // Prevent double clicking
    if (welcomeScreen.classList.contains("leaving")) return;

    // Stop generating particles
    clearInterval(particleInterval);

    // Start the big transition
    welcomeScreen.classList.add("leaving");

    // Create the little heart explosion
    const symbols = ["♡", "♥", "✦", "✧", "🎀"];

    for (let i = 0; i < 28; i++) {

      const heart = document.createElement("span");

      heart.className = "transition-heart";

      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 140 + Math.random() * 420;

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      heart.style.setProperty("--x", `${x}px`);
      heart.style.setProperty("--y", `${y}px`);
      heart.style.setProperty(
        "--rotation",
        `${-45 + Math.random() * 90}deg`
      );

      heart.style.fontSize =
        `${12 + Math.random() * 25}px`;

      heart.style.animationDelay =
        `${Math.random() * .18}s`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500);
    }

    // Soft pink/white flash
    const flash = document.createElement("div");

    flash.className = "transition-flash";

    document.body.appendChild(flash);

    setTimeout(() => {
      flash.remove();
    }, 1400);

    // Finally remove the welcome screen
setTimeout(() => {
  welcomeScreen.remove();

  // Tell the homepage to start its entrance animation
  document.body.classList.add("site-ready");

  // Make sure the homepage can scroll
  document.body.style.overflow = "";

}, 1500);
  });
}
/* ==========================================
   SCROLL REVEAL SYSTEM
   ========================================== */

const revealElements = document.querySelectorAll(
  ".section-heading, .timeline article, .photo, .note"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Once revealed, we don't need to watch it anymore
        revealObserver.unobserve(entry.target);
      }

    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {

  // Give section headings the general reveal animation
  if (
    element.classList.contains("section-heading")
  ) {
    element.classList.add("reveal");
  }

  revealObserver.observe(element);
});
