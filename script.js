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
    <article class="photo" data-index="${i}">
      <img src="${p.src}" alt="${p.title || 'Memory'}" loading="lazy">
      <span class="label">${p.title || '♡'}</span>
    </article>`).join("");
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
