/* Menu sáng theo mục đang đọc */
const links=document.querySelectorAll(".pills a");
const spy=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
}),{rootMargin:"-35% 0px -55% 0px"});
document.querySelectorAll("section[id]").forEach(s=>spy.observe(s));

/* Hiện dần khi cuộn tới */
const show=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in-view");show.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>show.observe(el));