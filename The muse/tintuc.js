/* ============================================================
   PHẦN JAVASCRIPT — xử lý chuyển trang và mục "Tin tức khác"
   ============================================================ */
const $ = s => document.querySelector(s);
const views = document.querySelectorAll('.view');      // trang danh sách + các bài viết
const other = $('#other'), rail = $('#rail'), prev = $('#prev'), next = $('#next');
// Lấy thông tin 11 bài từ phần HTML của trang danh sách (data-slug, data-date, data-title)
const items = [...document.querySelectorAll('#view-list [data-slug]')].map(e => ({
  ...e.dataset,
  img: e.querySelector('img') ? e.querySelector('img').getAttribute('src') : ''
}));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let pos = 0, count = 0;

// 1) Chuyển trang: #bai/ten-bai → hiện bài đó, còn lại → hiện danh sách
function route() {
  const slug = location.hash.startsWith('#bai/') ? location.hash.slice(5) : '';
  const target = document.getElementById(slug ? 'bai-' + slug : 'view-list') || $('#view-list');
  views.forEach(v => v.hidden = v !== target);
  const isArticle = target.id !== 'view-list';
  other.hidden = !isArticle;
  if (isArticle) buildOther(slug);
  document.title = (isArticle ? target.querySelector('h1').textContent : 'Tin tức') + ' | The Muse';
  scrollTo(0, 0);
}

// 2) Mục "Tin tức khác": tạo thẻ các bài còn lại
function buildOther(slug) {
  const list = items.filter(x => x.slug !== slug);
  count = list.length; pos = 0;
  rail.innerHTML = list.map(x => `<a class="card" href="#bai/${x.slug}"><div class="im">${x.img ? `<img class="ph" src="${esc(x.img)}" alt="${esc(x.title)}">` : '<div class="ph"></div>'}</div>
    <div class="b"><span class="date">${esc(x.date)}</span><h4>${esc(x.title)}</h4></div></a>`).join('');
  slide();
}

// 3) Nút mũi tên trượt qua lại — tự đo độ rộng thẻ nên đúng với mọi cỡ màn hình
const step = () => rail.children.length > 1 ? rail.children[1].offsetLeft - rail.children[0].offsetLeft : rail.clientWidth;
const perView = () => Math.max(1, Math.round(rail.parentElement.clientWidth / step()));   // số thẻ đang hiện (4/3/2/1)
const maxPos = () => Math.max(0, count - perView());
function slide() {
  pos = Math.min(pos, maxPos());
  rail.style.transform = `translateX(${-pos * step()}px)`;
  prev.disabled = pos === 0; next.disabled = pos >= maxPos();
}
prev.onclick = () => { pos = Math.max(0, pos - 1); slide(); };
next.onclick = () => { pos = Math.min(maxPos(), pos + 1); slide(); };

addEventListener('hashchange', route);
addEventListener('resize', slide);
route();