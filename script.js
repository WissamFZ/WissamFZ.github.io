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

/* ==========================================
   💌 OPEN WHEN LETTERS
   ========================================== */

const letters = {

  miss: {
    title: "Open when you miss me 💗",
    message: `
      <p>Hey sweetheart,</p>

      <p>If you're reading this, I'm guessing you miss me.
      Well... congratulations, we're in the same situation. 😭</p>

      <p>I know sometimes I wish I could just magically appear beside you
      instead of having a screen between us. But until teleportation gets
      invented, I guess this little letter will have to do.</p>

      <p>Just remember that no matter how far apart we are, you're still one
      of the biggest parts of my everyday life. All those random conversations,
      stupid jokes, late-night talks, and little moments mean more to me than
      you probably realize.</p>

      <p>So don't sit there missing me too much, okay?<br>
      Because I'm probably somewhere missing you too.</p>

      <p><strong>Come back when you miss me again. I'll still be here. ♡</strong></p>
    `
  },

  sad: {
    title: "Open when you're having a bad day 🌧️",
    message: `
      <p>Hey you,</p>

      <p>First of all, I'm sorry today decided to be annoying.
      Very rude of it, honestly. 😭</p>

      <p>I don't know exactly what happened today, and I might not always
      know the perfect thing to say, but I want you to remember something:</p>

      <p><strong>You don't have to have everything figured out all the time.</strong></p>

      <p>It's okay to have bad days. It's okay to feel tired.
      It's okay if today wasn't your day.</p>

      <p>And please don't forget that one bad day doesn't change how amazing you are.</p>

      <p>So take a breath, drink some water, get comfortable,
      and give yourself a little break.</p>

      <p>And if nothing else works...</p>

      <p>Just remember there's someone out here who thinks you're pretty damn special.
      Unfortunately for you, that someone is me. 😭❤️</p>

      <p><strong>Tomorrow can be better. And until then, I'm right here. ♡</strong></p>
    `
  },

  sleep: {
    title: "Open when you can't sleep 🌙",
    message: `
      <p>Hey sleepyhead,</p>

      <p>It's probably way too late right now.</p>

      <p>And knowing us, you'd probably rather be having another one of those
      completely unnecessary late-night conversations with me instead of
      actually sleeping. 😭</p>

      <p>I honestly miss those nights sometimes. Just talking about absolutely
      everything and absolutely nothing at the same time.</p>

      <p>So if you're lying there staring at the ceiling right now,
      here's your reminder:</p>

      <p><strong>You are loved.<br>
      You are cared about.</strong></p>

      <p>And somewhere, there's a boy who is probably thinking about you
      way too much instead of sleeping too.</p>

      <p>So close your eyes, get comfortable, and pretend I'm telling you:</p>

      <p><strong>"Goodnight, sweetheart. Sleep well."</strong></p>

      <p>And no, you don't get to stay awake for another three hours after
      reading this.<br>
      <strong>Go. Sleep. 😭</strong></p>
    `
  },

  smile: {
    title: "Open when you need a smile 😊",
    message: `
      <p>Okay, first of all...</p>

      <p><strong>WHY ARE YOU SAD?</strong></p>

      <p>Who gave you permission?<br>
      Who do I need to talk to? 😭</p>

      <p>But seriously...</p>

      <p>I hope this little letter makes you smile,
      even if it's just for a few seconds.</p>

      <p>You know what's funny? There are probably a million things I could
      say about why I love you, but somehow my favorite things are usually
      the tiny ones.</p>

      <p>Your random messages.<br>
      Your little reactions.<br>
      The stupid things we laugh about.<br>
      The way our conversations somehow turn into hours.</p>

      <p>And honestly, just <strong>you being you.</strong></p>

      <p>So if you're having a bad moment right now, here's your official reminder:</p>

      <p><strong>You're my favorite person to annoy, talk to, miss, and love.</strong></p>

      <p>Now smile.</p>

      <p>Yes, I'm serious.</p>

      <p>I'm watching. 👀</p>

      <p>...Okay I'm not actually watching.</p>

      <p><strong>But you better smile anyway. 😭❤️</strong></p>
    `
  }

};


/* Create the letter popup */

const letterModal = document.createElement("div");

letterModal.className = "letter-modal";

letterModal.innerHTML = `
  <div class="letter-paper">

    <button class="letter-close" aria-label="Close letter">
      ×
    </button>

    <div class="letter-content">
      <p class="letter-eyebrow">a little letter for you ♡</p>
      <h2 class="letter-title"></h2>
      <div class="letter-message"></div>
    </div>

  </div>
`;

document.body.appendChild(letterModal);


/* Open a letter */

document.querySelectorAll(".letter-card").forEach(card => {

  card.addEventListener("click", () => {

    const letter = letters[card.dataset.letter];

    if (!letter) return;

    letterModal.querySelector(".letter-title").textContent =
      letter.title;

    letterModal.querySelector(".letter-message").innerHTML =
      letter.message;

    letterModal.classList.add("show");

    document.body.style.overflow = "hidden";

  });

});


/* Close letter */

letterModal.querySelector(".letter-close").addEventListener("click", () => {

  letterModal.classList.remove("show");

  document.body.style.overflow = "";

});


/* Close when clicking outside */

letterModal.addEventListener("click", event => {

  if (event.target === letterModal) {

    letterModal.classList.remove("show");

    document.body.style.overflow = "";

  }

});


/* Escape key */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    letterModal.classList.remove("show");

    document.body.style.overflow = "";

  }

});

/* ==========================================
   ✨ SCRAPBOOK SCROLL SPARKLES
   ========================================== */

let sparkleCooldown = false;

window.addEventListener("scroll", () => {

  if (sparkleCooldown) return;

  sparkleCooldown = true;

  setTimeout(() => {
    sparkleCooldown = false;
  }, 120);

  createScrollSparkle();

});


function createScrollSparkle() {

  const sparkle = document.createElement("span");

  sparkle.className = "scroll-sparkle";

  sparkle.textContent =
    Math.random() > .5 ? "✦" : "♡";

  sparkle.style.left =
    Math.random() * 90 + 5 + "%";

  sparkle.style.top =
    Math.random() * 80 + 10 + "%";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 900);

}
