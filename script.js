/* =========================================================
   AMDA — script principal
   Panier (localStorage), compte simulé, données produits,
   filtres boutique, navigation mobile, toasts.
   ========================================================= */

(function(){
  "use strict";

  /* ---------------- Données produits ----------------
     Catalogue de démonstration. À remplacer par un appel API
     ou un fichier JSON séparé en production. */
  const PRODUCTS = [
    {id:"p01", name:"Huile d'argan pure 250ml", coop:"Coopérative Tighanimine", region:"souss", regionLabel:"Souss-Massa", price:145, oldPrice:170, emoji:"🫒", cat:"huiles"},
    {id:"p02", name:"Couscous de blé complet 1kg", coop:"Coopérative Tassaft", region:"kech", regionLabel:"Marrakech-Safi", price:32, emoji:"🌾", cat:"epicerie"},
    {id:"p03", name:"Miel de thym de montagne 500g", coop:"Coopérative Ait Ouirra", region:"bmk", regionLabel:"Béni Mellal-Khénifra", price:95, emoji:"🍯", cat:"epicerie"},
    {id:"p04", name:"Safran de Taliouine 1g", coop:"Coopérative Tasaft Aklim", region:"souss", regionLabel:"Souss-Massa", price:55, emoji:"🌸", cat:"epices"},
    {id:"p05", name:"Savon noir traditionnel 300g", coop:"Coopérative Yamna", region:"fes", regionLabel:"Fès-Meknès", price:38, emoji:"🧼", cat:"cosmetique"},
    {id:"p06", name:"Confiture de figues de barbarie 250g", coop:"Coopérative Aknari", region:"oriental", regionLabel:"L'Oriental", price:42, emoji:"🍈", cat:"epicerie"},
    {id:"p07", name:"Tapis de laine berbère 90x150", coop:"Coopérative Ouled Mansour", region:"draa", regionLabel:"Drâa-Tafilalet", price:680, emoji:"🧶", cat:"artisanat"},
    {id:"p08", name:"Huile de cumin noir 100ml", coop:"Coopérative Nour", region:"casa", regionLabel:"Casablanca-Settat", price:78, emoji:"🌿", cat:"huiles"},
    {id:"p09", name:"Poterie de Salé — bol décoré", coop:"Coopérative Bahia", region:"rsk", regionLabel:"Rabat-Salé-Kénitra", price:120, emoji:"🏺", cat:"artisanat"},
    {id:"p10", name:"Dattes Majhoul 500g", coop:"Coopérative Tafilalet Dattes", region:"draa", regionLabel:"Drâa-Tafilalet", price:110, emoji:"🌴", cat:"epicerie"},
    {id:"p11", name:"Henné naturel en poudre 200g", coop:"Coopérative Ghassoul Atlas", region:"gon", regionLabel:"Guelmim-Oued Noun", price:28, emoji:"🌱", cat:"cosmetique"},
    {id:"p12", name:"Panier en palmier tressé", coop:"Coopérative Lalla Mimouna", region:"lsh", regionLabel:"Laâyoune-Sakia El Hamra", price:95, emoji:"🧺", cat:"artisanat"},
  ];

  const REGIONS = [
    {code:"tth", label:"Tanger-Tétouan-Al Hoceïma"},
    {code:"oriental", label:"L'Oriental"},
    {code:"fes", label:"Fès-Meknès"},
    {code:"rsk", label:"Rabat-Salé-Kénitra"},
    {code:"casa", label:"Casablanca-Settat"},
    {code:"bmk", label:"Béni Mellal-Khénifra"},
    {code:"kech", label:"Marrakech-Safi"},
    {code:"souss", label:"Souss-Massa"},
    {code:"draa", label:"Drâa-Tafilalet"},
    {code:"gon", label:"Guelmim-Oued Noun"},
    {code:"lsh", label:"Laâyoune-Sakia El Hamra"},
    {code:"dod", label:"Dakhla-Oued Ed-Dahab"},
  ];

  window.AMDA_DATA = { PRODUCTS, REGIONS };

  /* ---------------- Stockage ---------------- */
  const STORE_KEY = "amda_cart_v1";
  const USER_KEY  = "amda_user_v1";

  function readCart(){
    try{
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }
  function writeCart(cart){
    localStorage.setItem(STORE_KEY, JSON.stringify(cart));
    updateCartBadge();
  }
  function readUser(){
    try{
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }
  function writeUser(user){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /* ---------------- API panier (exposée) ---------------- */
  const Cart = {
    getAll(){ return readCart(); },
    count(){ return readCart().reduce((s,l)=>s+l.qty,0); },
    subtotal(){
      return readCart().reduce((s,l)=>{
        const p = PRODUCTS.find(p=>p.id===l.id);
        return p ? s + p.price*l.qty : s;
      },0);
    },
    add(id, qty=1){
      const cart = readCart();
      const line = cart.find(l=>l.id===id);
      if(line){ line.qty += qty; } else { cart.push({id, qty}); }
      writeCart(cart);
      const product = PRODUCTS.find(p=>p.id===id);
      showToast(product ? `${product.name} ajouté au panier` : "Produit ajouté au panier");
    },
    setQty(id, qty){
      let cart = readCart();
      if(qty <= 0){
        cart = cart.filter(l=>l.id!==id);
      }else{
        const line = cart.find(l=>l.id===id);
        if(line) line.qty = qty;
      }
      writeCart(cart);
    },
    remove(id){
      const cart = readCart().filter(l=>l.id!==id);
      writeCart(cart);
    },
    clear(){
      writeCart([]);
    }
  };
  window.AMDA_CART = Cart;

  function updateCartBadge(){
    document.querySelectorAll("[data-cart-count]").forEach(el=>{
      el.textContent = Cart.count();
    });
  }

  /* ---------------- Compte simulé ---------------- */
  const Auth = {
    current(){ return readUser(); },
    login(email){
      const user = { email, name: email.split("@")[0], member:false, joined:new Date().toISOString() };
      writeUser(user);
      return user;
    },
    register(name, email){
      const user = { email, name, member:false, joined:new Date().toISOString() };
      writeUser(user);
      return user;
    },
    logout(){
      localStorage.removeItem(USER_KEY);
    },
    setMember(isMember){
      const user = readUser();
      if(user){ user.member = isMember; writeUser(user); }
    }
  };
  window.AMDA_AUTH = Auth;

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function showToast(message){
    let toast = document.querySelector(".toast");
    if(!toast){
      toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = `<span class="dot" aria-hidden="true"></span><span data-toast-text></span>`;
      document.body.appendChild(toast);
    }
    toast.querySelector("[data-toast-text]").textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove("show"), 2600);
  }
  window.AMDA_TOAST = showToast;

  /* ---------------- Init commun (toutes pages) ---------------- */
  document.addEventListener("DOMContentLoaded", function(){
    updateCartBadge();

    // Menu mobile
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if(toggle && nav){
      toggle.addEventListener("click", ()=>{
        const isOpen = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    // Année footer
    document.querySelectorAll("[data-year]").forEach(el=>{
      el.textContent = new Date().getFullYear();
    });

    // Affiche l'état connecté dans le header si présent
    const user = Auth.current();
    document.querySelectorAll("[data-user-name]").forEach(el=>{
      el.textContent = user ? user.name : "";
    });
    document.querySelectorAll("[data-account-link]").forEach(el=>{
      if(user){ el.setAttribute("title", `Connecté(e) — ${user.name}`); }
    });
  });

})();
