const CakePreview = {
  render(selector, options) {
    const container = document.querySelector(selector);
    if (!container) return;

    const {
      shape = "Tròn Cổ Điển",
      tiers = "1",
      sponge = "Vanilla",
      filling = "Kem tươi dâu",
      frosting = "Buttercream",
      color = "#f6f1e7",
      decor = [],
      message = ""
    } = options;

    const colors = {
      "Vanilla": "#f3d9a5",
      "Chocolate": "#69432f",
      "Red Velvet": "#b63b4c"
    };

    const fillingColors = {
      "Kem tươi dâu": "#e99eae",
      "Ganache chocolate": "#503025",
      "Custard chanh": "#f4d76c"
    };

    const spongeColor = colors[sponge] || colors.Vanilla;
    const fillingColor =
      fillingColors[filling] || fillingColors["Kem tươi dâu"];

    const square = shape === "Vuông Tối Giản";
    const heart = shape === "Trái Tim Sáng Tạo";

    const shapeTop = (x, y, w, h, fill) => {
      if (heart) {
        return `<path d="
          M ${x + w / 2} ${y + h * 0.9}
          C ${x + w * 0.38} ${y + h * 0.72},
            ${x} ${y + h * 0.43},
            ${x} ${y + h * 0.27}
          C ${x} ${y - h * 0.02},
            ${x + w * 0.3} ${y - h * 0.08},
            ${x + w / 2} ${y + h * 0.2}
          C ${x + w * 0.7} ${y - h * 0.08},
            ${x} ${y - h * 0.02},
            ${x + w} ${y + h * 0.27}
          C ${x + w} ${y + h * 0.43},
            ${x + w * 0.62} ${y + h * 0.72},
            ${x + w / 2} ${y + h * 0.9} Z"
          fill="${fill}" />`;
      }

      if (square) {
        return `<rect x="${x}" y="${y - h / 2}"
          width="${w}" height="${h}"
          rx="5" fill="${fill}" />`;
      }

      return `<ellipse cx="${x + w / 2}" cy="${y}"
        rx="${w / 2}" ry="${h / 2}"
        fill="${fill}" />`;
    };

    const makeTier = (x, y, w, h) => {
      const topH = heart ? h * 0.85 : h * 0.42;
      const bodyTop = y;
      const bodyBottom = y + h;
      const radius = square ? 7 : w / 2;

      let body;

      if (heart) {
        body = `
          <path d="
            M ${x} ${bodyTop + 3}
            L ${x + w} ${bodyTop + 3}
            L ${x + w * 0.82} ${bodyBottom - 5}
            Q ${x + w / 2} ${bodyBottom + 8} ${x + w * 0.18} ${bodyBottom - 5} Z"
            fill="${color}" stroke="#d9c6c2" stroke-width="1"/>
        `;
      } else if (square) {
        body = `
          <rect x="${x}" y="${bodyTop}"
            width="${w}" height="${h}"
            rx="${radius}" fill="${color}"
            stroke="#d9c6c2" stroke-width="1"/>
          <rect x="${x + 4}" y="${bodyTop + 5}"
            width="${w - 8}" height="${h - 10}"
            rx="3" fill="none" stroke="#ffffff"
            stroke-opacity=".35"/>
        `;
      } else {
        body = `
          <path d="M ${x} ${bodyTop}
            L ${x} ${bodyBottom - 2}
            Q ${x + w / 2} ${bodyBottom + 9} ${x + w} ${bodyBottom - 2}
            L ${x + w} ${bodyTop} Z"
            fill="${color}" stroke="#d9c6c2" stroke-width="1"/>
        `;
      }

      const layerY = y + h * 0.57;

      const fillingLine = square
        ? `<rect x="${x + 2}" y="${layerY}" width="${w - 4}"
             height="7" fill="${fillingColor}"/>`
        : `<path d="M ${x} ${layerY}
             Q ${x + w / 2} ${layerY + 5} ${x + w} ${layerY}"
             fill="none" stroke="${fillingColor}" stroke-width="7"/>`;

      const spongeLine = square
        ? `<rect x="${x + 2}" y="${layerY + 7}" width="${w - 4}"
             height="5" fill="${spongeColor}"/>`
        : `<path d="M ${x} ${layerY + 7}
             Q ${x + w / 2} ${layerY + 12} ${x + w} ${layerY + 7}"
             fill="none" stroke="${spongeColor}" stroke-width="5"/>`;

      const frostingTop = shapeTop(
        x, y, w, topH, color
      );

      let icing = "";

      if (frosting === "Whipping cream") {
        icing = `
          <path d="M ${x + 8} ${y + 2}
            Q ${x + w * .25} ${y - 10} ${x + w * .5} ${y + 2}
            T ${x + w - 8} ${y + 2}"
            fill="none" stroke="#fffaf4" stroke-width="5"
            stroke-linecap="round"/>
        `;
      } else if (frosting === "Fondant") {
        icing = `
          <path d="M ${x + 8} ${y + 5}
            L ${x + 8} ${y + h * .25}
            Q ${x + 15} ${y + h * .35} ${x + 22} ${y + h * .25}
            L ${x + 22} ${y + h * .18}"
            fill="none" stroke="#fff8f1" stroke-width="3"/>
        `;
      } else {
        icing = `
          <path d="M ${x + 8} ${y + 3}
            Q ${x + w * .25} ${y - 7} ${x + w * .5} ${y + 3}
            T ${x + w - 8} ${y + 3}"
            fill="none" stroke="#fff8f1" stroke-width="3"
            stroke-linecap="round"/>
        `;
      }

      return `
        <g>
          ${body}
          ${fillingLine}
          ${spongeLine}
          ${frostingTop}
          ${icing}
        </g>
      `;
    };

    const twoTiers = Number(tiers) >= 2;
    const bottomW = heart ? 190 : 176;
    const topW = heart ? 126 : 116;

    const bottom = twoTiers
      ? makeTier(180 - bottomW / 2, 155, bottomW, 64)
      : makeTier(180 - bottomW / 2, 128, bottomW, 83);

    const top = twoTiers
      ? makeTier(180 - topW / 2, 91, topW, 65)
      : "";

    const decorMap = {
      "Hoa tươi": "🌸",
      "Macaron": "🍪",
      "Trái cây tươi": "🍓",
      "Vàng lá ăn được": "✨",
      "Topper chữ": "🎀"
    };

    const decoration = decor.map((item, index) => {
      const positions = [
        [145, 113], [208, 113], [166, 145],
        [220, 157], [140, 164]
      ];
      const [x, y] = positions[index % positions.length];

      return `
        <text x="${x}" y="${y}" font-size="19"
          text-anchor="middle">${decorMap[item] || "✨"}</text>
      `;
    }).join("");

    const safeMessage = String(message)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .slice(0, 40);

    const label = safeMessage
      ? `<text x="180" y="${twoTiers ? 76 : 105}"
           font-size="10" fill="#65434a"
           text-anchor="middle">${safeMessage}</text>`
      : "";

    container.innerHTML = `
      <svg viewBox="0 0 360 260"
        xmlns="http://www.w3.org/2000/svg"
        role="img" aria-label="Mẫu bánh được tùy chỉnh"
        style="width:100%;height:auto;display:block">
        <defs>
          <linearGradient id="cakeBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fffaf7"/>
            <stop offset="100%" stop-color="#f0e2df"/>
          </linearGradient>
        </defs>

        <ellipse cx="180" cy="224" rx="112" ry="13"
          fill="#8f7373" opacity=".13"/>

        <ellipse cx="180" cy="215" rx="118" ry="17"
          fill="#fffdfb" stroke="#e8d9d7"/>

        ${bottom}
        ${top}
        ${label}
        ${decoration}

        <text x="180" y="246" font-size="9"
          fill="#8d7478" text-anchor="middle"
          letter-spacing="2">THE MUSE · CUSTOM CAKE</text>
      </svg>
    `;
  }
};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let cur=0;

function go(i){
  cur=Math.max(0,Math.min(2,i));
  $$('.panel').forEach((p,j)=>p.hidden=j!==cur);
  $$('#stages .st').forEach((s,j)=>{
    s.classList.toggle('on',j===cur);
    s.classList.toggle('done',j<cur);
  });
  $('#back').style.visibility=cur===0?'hidden':'visible';
  $('#next').textContent=cur===2?'Hoàn tất thiết kế ✓':'Tiếp tục →';
  window.scrollTo({top:0,behavior:'smooth'});
}
$('#back').onclick=()=>go(cur-1);
$('#next').onclick=()=>{
  if(cur<2) go(cur+1);
  else toast('Thiết kế đã hoàn tất! Bấm "Gửi yêu cầu" để đặt bánh.');
};

document.addEventListener('click',e=>{
  const b=e.target.closest('.opt,.sw'); if(!b) return;
  if(b.parentElement.hasAttribute('data-multi')){
    b.classList.toggle('on');
  }else{
    b.parentElement.querySelectorAll('.on').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
  }
  upd();
});
['msgCake','msgCard','date','time'].forEach(id=>document.getElementById(id).addEventListener('input',upd));
$('#file').onchange=e=>{
  const f=e.target.files[0]; if(!f) return;
  $('#imgPrev').src=URL.createObjectURL(f); $('#imgPrev').hidden=false;
};

const g=k=>$('[data-k="'+k+'"] .on');
const fmt=n=>n.toLocaleString('vi-VN')+'đ';
function upd(){
  let p=0; $$('.on[data-p]').forEach(x=>p+=+x.dataset.p);
  const s=g('shape').dataset.v, t=g('tier').dataset.v;
  const deco=$$('[data-k="deco"] .on');
  sShape.textContent=s; sTier.textContent=t+' Tầng';
  sCot.textContent=g('cot').dataset.v; sNhan.textContent=g('nhan').dataset.v;
  sKem.textContent=g('kem').dataset.v; sMau.textContent=g('mau').dataset.v;
  sDeco.textContent=deco.length?deco.map(d=>d.dataset.v).join(', '):'Không';
  sMsg.textContent=$('#msgCake').value||'—';
  sDate.textContent=$('#date').value?($('#date').value.split('-').reverse().join('/')+' · '+$('#time').value):'—';
  price.textContent=fmt(p);

  /* vẽ lại bánh theo mọi lựa chọn hiện tại */
  CakePreview.render('#cake',{
    shape:s, tiers:t,
    sponge:g('cot').dataset.v, filling:g('nhan').dataset.v,
    frosting:g('kem').dataset.v,
    color:g('mau').dataset.c,
    decor:deco.map(d=>d.dataset.v),
    message:$('#msgCake').value
  });
}
$('#send').onclick=()=>{
  if(!$('#date').value){toast('Vui lòng chọn ngày hẹn nhận bánh');go(2);return;}
  toast('Đã gửi yêu cầu đặt bánh!');
};
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2200)}
go(0); upd();