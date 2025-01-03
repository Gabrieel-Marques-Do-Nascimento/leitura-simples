import{$screen_text as e,$button_low as t,$button_up as o,$PlayButton as n,$PauseButton as r}from"./script.js";import{loadText_Cache_json as l}from"./global.js";window.innerHeight;export function ScreenButtons(e,l,a,s,i){"display"===i?(t.style.display=e,o.style.display=l,n.style.display=a,r.style.display=s):"disabled"===i?(t.disabled=e,o.disabled=l,n.disabled=a,r.disabled=s):console.error("Invalid type passed to ScreenButtons: "+i)}export function buttonstatic(e,t){e.forEach((e=>{e.style.display=t}))}export function scrollarline(e){highlight.scrollTo({top:e,behavior:"smooth"})}export function recarregarPagina(){location.reload()}export function change_top(e=0,t=!0,o,n,r=!1){const l=window.getComputedStyle(n),a=n.getBoundingClientRect(),s=o.getBoundingClientRect();let i=parseInt(l.height.replace("px",""),10);t&&(o.style.transition="top 0.1s ease");let c=s.top+e;return c<parseInt(a.top)&&(c=parseInt(a.top)),c>i&&(c=i+a.top-e),r&&(o.style.top=`${c}px`),`${c}px`}export function skip_line(e,t){var o=e?Number(paragrafo_style.lineHeight.replace("px","")):-Number(paragrafo_style.lineHeight.replace("px",""));change_top(Number(highlight_estilo.top.replace("px",""))+o,8,o),t.style.transition="top 0.1s ease"}export function save_text_in_cache(e,t){try{const o=e;localStorage.setItem(t,o)}catch(e){return!1}return!0}export function load_text_from_cache(e){const t=localStorage.getItem(e);return t||null}export function screen_size_height({font_size:e,height:t,logs:o=!0},...n){for(let e=0;e<n.length;e++)o&&console.log(`argumentos: ${e+1}:${n[e]}`),n[e];const r=t-parseInt(n),l=parseInt(e),a=l+l/2,s=parseInt(r/a),i=parseInt(s*a);return o&&console.log(`tela disponivel: ${["screen",i,"line",a]}`),[i,a,s]}export function console_log(e,t=!1){t&&console.log(e)}export function theme_by_hour_or_auto(e=0,t=!1){let o=document.createElement("style");o.type="text/css";let n=new Date;t||(e=n.getHours()),e>=6&&e<=18&&(o.innerText="\n body {\n       background-color: #ffff;}\n#pai {\n\n        background-color: rgba(255,255,255,.80);}\n"),(e<6||e>18)&&(o.innerText="\n body {\n       background-color:  #000;\n   cursor: url('./img/cursor-black.svg'), auto; /* Substitua 'seu-cursor.png' pelo caminho da sua imagem */ \n }\n#pai {\n        background-color: rgba(255, 255, 255, 0.71);}    \n        #paragraph { border: 1px solid #ccc;\n        border: 1px solid #000;}\n\n  \n"),document.body.appendChild(o)}export function ReadScreen(t){"text"==a.screentype&&(e.innerText=t),"markdow"==a.screentype&&(e.style.margin="0 10px",e.innerHTML=marked.parse(t))}export async function delay(e){return new Promise((t=>setTimeout(t,e)))}let a=l("settings_data");export function loadScroll(e=null){const t=localStorage.getItem("$autoScroll");return console_log("scrollPosition: "+t,!0),t&&e&&e.scrollTo({top:t,behavior:"smooth"}),t||0}window.addEventListener("beforeunload",(function(){localStorage.setItem("$autoScroll",e.scrollTop)})),window.onload=function(){if(a.$autoScroll){loadScroll(e)}};