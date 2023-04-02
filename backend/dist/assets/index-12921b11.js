(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const d=document.querySelector("#count"),a=document.querySelector("#coinTable"),f=document.querySelector("#controls"),i=document.querySelector("#select2"),u=document.querySelector("#buyBtn");i.addEventListener("change",function(){u.textContent=`Buy ${i.value}`});let s=90;setInterval(function(){s<=0&&(s=90),d.textContent=s,s--},1e3);async function p(){const t=await(await fetch("/api/coins")).json();console.log(t),y(t),m(t)}p();function m(c){let t="";for(let r of c)t+=`<option class="dropdown-option" value="${r.base_unit.toUpperCase()}">${r.base_unit.toUpperCase()}</option>`;i.innerHTML=t,u.textContent=`Buy ${i.value}`,f.classList.remove("hidden")}function y(c){let t="",r=0;for(let n of c)t+=`<tr>
    <td>${++r}</td>
    <td>${n.name}</td>
    <td>${n.last}</td>
    <td>₹${n.buy}/₹${n.sell}</td>
    <td>${n.volume}</td>
    <td>${n.base_unit}</td>
  </tr>`;a.innerHTML=t}
