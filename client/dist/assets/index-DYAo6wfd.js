(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let Zl=class{constructor(e=0,t=0){this.resource=e,this.victories=t}gainResource(e){e>0&&(this.resource+=e,console.log(`Player gained ${e} resource. Total: ${this.resource}`))}spendResource(e){return e>0&&this.resource>=e?(this.resource-=e,console.log(`Player spent ${e} resource. Remaining: ${this.resource}`),!0):(console.log(`Player attempted to spend ${e} resource, but has only ${this.resource}.`),!1)}incrementVictories(){this.victories++,console.log(`Player victories incremented. Total: ${this.victories}`)}};const pn=new Zl(10,0),An=class An{constructor(){this.playerParty=[],this.enemyUnits=[],this.shopUnits=[],this.storageUnits=[],this.playerItems=[],this.shopItems=[]}addUnitToPlayerParty(e){this.playerParty.length<An.MAX_PLAYER_PARTY_SIZE?(this.playerParty.push(e),console.log(`${e.name} (${e.className}) added to player party. Party size: ${this.playerParty.length}/${An.MAX_PLAYER_PARTY_SIZE}`)):console.warn(`Player party is full (${An.MAX_PLAYER_PARTY_SIZE} units). ${e.name} (${e.className}) was not added.`)}addUnitToEnemies(e){this.enemyUnits.push(e),console.log(`${e.name} (${e.className}) added to enemy units.`)}addUnitToShop(e){this.shopUnits.push(e),console.log(`${e.name} (${e.className}) added to shop units.`)}addUnitToStorage(e){this.storageUnits.push(e),console.log(`${e.name} (${e.className}) added to storage units.`)}addItemToPlayer(e){this.playerItems.push(e),console.log(`${e.name} added to player items.`)}addItemToShop(e){this.shopItems.push(e),console.log(`${e.name} added to shop items.`)}removeItemFromPlayer(e){const t=this.playerItems.findIndex(n=>n.id===e);if(t>-1){const n=this.playerItems[t];return this.playerItems.splice(t,1),console.log(`${n.name} removed from player items.`),!0}return!1}removeItemFromShop(e){const t=this.shopItems.findIndex(n=>n.id===e);if(t>-1){const n=this.shopItems[t];return this.shopItems.splice(t,1),console.log(`${n.name} removed from shop items.`),!0}return!1}findItemById(e){return[...this.playerItems,...this.shopItems].find(n=>n.id===e)}useItemOnUnit(e,t){const n=this.findItemById(e);if(!n)return console.warn(`Item with ID ${e} not found.`),!1;if(!this.playerItems.find(r=>r.id===e))return console.warn(`Item ${n.name} is not in player's inventory.`),!1;const s=n.effect(t);return s&&n.type==="consumable"&&(this.removeItemFromPlayer(e),console.log(`Consumable item ${n.name} was used and removed from inventory.`)),s}findUnitById(e){return[...this.playerParty,...this.enemyUnits,...this.shopUnits,...this.storageUnits].find(n=>n.id===e)}removeUnitFromPlayerParty(e){const t=this.playerParty.findIndex(n=>n.id===e);if(t>-1){const n=this.playerParty[t];return this.playerParty.splice(t,1),console.log(`${n.name} (${n.className}) removed from player party.`),!0}return!1}removeUnitFromEnemies(e){const t=this.enemyUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.enemyUnits[t];return this.enemyUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from enemy units.`),!0}return!1}removeUnitFromShop(e){const t=this.shopUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.shopUnits[t];return this.shopUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from shop units.`),!0}return!1}removeUnitFromStorage(e){const t=this.storageUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.storageUnits[t];return this.storageUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from storage units.`),!0}return!1}_removeUnitFromList(e,t){const n=e.findIndex(s=>s.id===t);return n>-1?e.splice(n,1)[0]:(console.warn(`_removeUnitFromList: Unit with ID ${t} not found in provided list.`),null)}reorderUnitInSquad(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`Reordered ${n.name} in squad to index ${s}.`)}else console.error(`reorderUnitInSquad: Unit ${e} not found in player party.`)}reorderUnitInStorage(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`Reordered ${n.name} in storage to index ${s}.`)}else console.error(`reorderUnitInStorage: Unit ${e} not found in storage units.`)}moveUnitToStorage(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`${n.name} moved from squad to storage at index ${s}.`)}else console.error(`moveUnitToStorage: Unit ${e} not found in player party to move to storage.`)}moveUnitToSquad(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n)if(this.playerParty.length<An.MAX_PLAYER_PARTY_SIZE){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`${n.name} moved from storage to squad at index ${s}. Party size: ${this.playerParty.length}/${An.MAX_PLAYER_PARTY_SIZE}`)}else this.storageUnits.push(n),console.warn(`moveUnitToSquad: Squad is full (${this.playerParty.length}/${An.MAX_PLAYER_PARTY_SIZE}). ${n.name} could not be moved from storage and was returned.`);else console.error(`moveUnitToSquad: Unit ${e} not found in storage to move to squad.`)}swapUnitsBetweenSquadAndStorage(e,t,n,s){const r=this._removeUnitFromList(this.storageUnits,e),o=this._removeUnitFromList(this.playerParty,t);if(r&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,r);const l=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(l,0,o),console.log(`Swapped ${r.name} (to squad slot ${a}) with ${o.name} (to box slot ${l}).`)}else if(r&&!o){const a=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(a,0,r),console.error(`Swap failed: Unit ${t} (to go to box) not found in squad. ${r.name} returned to storage.`)}else if(!r&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,o),console.error(`Swap failed: Unit ${e} (to go to squad) not found in storage. ${o.name} returned to squad.`)}else console.error(`Swap failed: Critical. Neither unit involved in the swap could be found and removed. Unit ${e} (from box) or ${t} (from squad).`)}};An.MAX_PLAYER_PARTY_SIZE=5;let Ci=An;const we=new Ci;let fn=null;function Kl(i,e,t,n,s){i.addEventListener("dragstart",r=>{if(!(r.target instanceof HTMLElement))return;const a=r.target.closest(".squad-unit-display");!a||a!==i||(fn={unitId:e.id,sourceContainer:t,originalIndex:n,element:i},r.dataTransfer&&(r.dataTransfer.setData("text/plain",e.id),r.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".unit-slot").forEach(r=>{r.style.border="1px dashed #566573",r.style.backgroundColor="#34495e"}),fn=null})}function Jl(i,e,t,n){i.addEventListener("dragover",s=>{s.preventDefault(),fn&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",s.dataTransfer&&(s.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573"}),i.addEventListener("drop",s=>{if(s.preventDefault(),i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573",!fn)return;const{unitId:r,sourceContainer:o,originalIndex:a}=fn;if(o===e&&a===t&&i.contains(fn.element)){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop unit ${r}`),console.log(`Source: ${o}[${a}] -> Target: ${e}[${t}]`);const l=we.findUnitById(r);if(!l){console.error("Drag-and-drop: Unit not found by ID",r),fn=null;return}if(o==="squad"&&e==="squad")we.reorderUnitInSquad(r,t);else if(o==="box"&&e==="box")we.reorderUnitInStorage(r,t);else if(o==="squad"&&e==="box"){if(we.playerParty.length<=1){console.warn("Cannot move the last unit from squad to box. At least one unit must remain in the squad."),fn=null;return}we.moveUnitToStorage(r,t)}else if(o==="box"&&e==="squad")if(we.playerParty.length>=Ci.MAX_PLAYER_PARTY_SIZE&&we.playerParty[t]){const c=we.playerParty[t];if(c)console.log(`Squad full, swapping ${l.name} with ${c.name}`),we.swapUnitsBetweenSquadAndStorage(r,c.id,t,a);else{console.warn("Squad full, but target slot unexpectedly empty. Cannot move from box."),fn=null;return}}else we.moveUnitToSquad(r,t);fn=null,n()})}let Lt=null;function Ql(i){const e=document.createElement("div");return e.id="squad-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function ec(i){Lt&&(Lt.innerHTML=`
        <h4 style="margin: 0 0 5px 0; text-align: center;">${i.name} (${i.className})</h4>
        <p style="margin: 3px 0;">HP: ${i.health} | Max Energy: ${i.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${i.basicDamage} | Skill Dmg: ${i.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${i.range} | Move: ${i.move}</p>
        ${i.skills.length>0?`
        <div style="margin-top: 8px; border-top: 1px solid #555; padding-top: 6px;">
            <h5 style="margin: 0 0 4px 0; color: #8e44ad; font-size: 0.85em;">Skills:</h5>
            ${i.skills.map(e=>`
                <div style="margin-bottom: 4px; padding: 3px 4px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #8e44ad; font-size: 0.75em;">${e.emoji} ${e.name}</span>
                        <span style="color: #3498db; font-size: 0.7em;">${e.energyCost} ⚡</span>
                    </div>
                    <p style="margin: 1px 0 0 0; font-size: 0.65em; color: #bdc3c7; line-height: 1.1;">
                        ${e.description}
                    </p>
                </div>
            `).join("")}
        </div>
        `:""}
    `)}function qo(i){if(!Lt)return;let e=i.clientX+15,t=i.clientY+15;e+Lt.offsetWidth>window.innerWidth&&(e=window.innerWidth-Lt.offsetWidth-10),t+Lt.offsetHeight>window.innerHeight&&(t=window.innerHeight-Lt.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Lt.style.left=`${e}px`,Lt.style.top=`${t}px`}function tc(i,e){Lt&&(ec(i),Lt.style.display="block",qo(e))}function nc(){Lt&&(Lt.style.display="none")}function ic(i){(!Lt||!i.contains(Lt))&&(Lt=Ql(i))}function ha(i,e,t,n){const s=document.createElement("div");s.className="squad-unit-display",s.dataset.unitId=i.id,s.style.width="50px",s.style.height="65px",s.style.border="1px solid #7f8c8d",s.style.borderRadius="4px",s.style.backgroundColor="#4a6378",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="3px",s.style.textAlign="center",s.style.cursor="grab",s.draggable=!0,Kl(s,i,e,t),s.addEventListener("mouseenter",l=>{tc(i,l)}),s.addEventListener("mousemove",l=>{qo(l)}),s.addEventListener("mouseleave",()=>{nc()});const r=document.createElement("img");r.src=i.imageUrl,r.alt=i.className,r.style.width="25px",r.style.height="25px",r.style.marginBottom="3px",r.style.borderRadius="2px";const o=document.createElement("h5");o.textContent=i.name,o.style.margin="0 0 2px 0",o.style.fontSize="0.7em",o.style.color="#ecf0f1";const a=document.createElement("p");return a.textContent=`(${i.className})`,a.style.margin="0",a.style.fontSize="0.6em",a.style.fontStyle="italic",a.style.color="#bdc3c7",s.appendChild(r),s.appendChild(o),s.appendChild(a),s}function fa(i,e,t,n){const s=document.createElement("div");return s.id=i,s.className=`unit-slot ${e}-slot`,s.dataset.slotType=e,s.dataset.slotIndex=String(t),s.style.width="60px",s.style.height="75px",s.style.border="1px dashed #566573",s.style.borderRadius="5px",s.style.backgroundColor="#34495e",s.style.margin="3px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.transition="background-color 0.2s, border-color 0.2s",Jl(s,e,t,n),s}let Ir=null,Nr=null,Fr=null,Et=null;function sc(i,e){const t=document.createElement("div");t.style.display="flex",t.style.alignItems="center",t.style.padding="8px",t.style.margin="4px 0",t.style.border="2px solid #f39c12",t.style.borderRadius="8px",t.style.backgroundColor="#2c3e50",t.style.cursor="pointer",t.style.transition="all 0.2s ease";const n=document.createElement("img");n.src=i.imageUrl,n.alt=i.name,n.style.width="32px",n.style.height="32px",n.style.marginRight="8px",n.style.borderRadius="4px";const s=document.createElement("div");s.style.flex="1";const r=document.createElement("div");r.textContent=i.name,r.style.fontSize="0.9em",r.style.fontWeight="bold",r.style.color="#ecf0f1";const o=document.createElement("div");o.textContent=i.description,o.style.fontSize="0.7em",o.style.color="#bdc3c7",o.style.marginTop="2px",s.appendChild(r),s.appendChild(o),t.appendChild(n),t.appendChild(s);const a=()=>{Et&&Et.id===i.id?(t.style.borderColor="#e74c3c",t.style.backgroundColor="#c0392b",t.style.transform="scale(1.02)"):(t.style.borderColor="#f39c12",t.style.backgroundColor="#2c3e50",t.style.transform="scale(1)")};return a(),t.addEventListener("click",()=>{Et&&Et.id===i.id?Et=null:Et=i,e()}),t.addEventListener("mouseenter",()=>{(!Et||Et.id!==i.id)&&(t.style.backgroundColor="#34495e")}),t.addEventListener("mouseleave",()=>{a()}),t}function pa(i,e){i.addEventListener("click",t=>{Et&&(t.preventDefault(),t.stopPropagation(),we.useItemOnUnit(Et.id,e)?(console.log(`Used ${Et.name} on ${e.name}`),Et=null,Cs()):console.warn(`Failed to use ${Et.name} on ${e.name}`))}),Et?(i.style.boxShadow="0 0 5px #e74c3c",i.style.cursor="pointer",i.title=`Click to use ${Et.name} on ${e.name}`):(i.style.boxShadow="none",i.style.cursor="grab",i.title="")}function Cs(){if(Ir&&Nr&&Fr){const i=document.getElementById("box-area"),e=i?i.scrollTop:0;Kr(Ir,Nr,Fr);const t=document.getElementById("box-area");t&&(t.scrollTop=e)}else console.error("Cannot refresh squad scene: a container or callback is missing.")}function Kr(i,e,t){Ir=i,Nr=e,Fr=t,console.log("Showing Squad/Inventory Scene..."),i.innerHTML="",ic(i);const n=document.createElement("div");n.id="squad-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");s.textContent="SQUAD / INVENTORY",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0";const r=document.createElement("div");r.id="squad-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-between",r.style.overflow="hidden";const o=document.createElement("div");o.id="units-section",o.style.width="65%",o.style.height="100%",o.style.display="flex",o.style.flexDirection="column",o.style.borderRight="2px solid #34495e",o.style.paddingRight="10px",o.style.boxSizing="border-box";const a=document.createElement("div");a.id="squad-area",a.style.marginBottom="10px";const l=document.createElement("h2");l.textContent="SQUAD (Active Party)",l.style.fontSize="1.2em",l.style.borderBottom="1px solid #7f8c8d",l.style.paddingBottom="3px",l.style.marginBottom="5px",a.appendChild(l);const c=document.createElement("div");c.style.display="flex",c.style.flexWrap="wrap",c.style.justifyContent="flex-start";for(let v=0;v<Ci.MAX_PLAYER_PARTY_SIZE;v++){const T=fa(`squad-slot-${v}`,"squad",v,Cs),B=we.playerParty[v];if(B){const V=ha(B,"squad",v);pa(V,B),T.appendChild(V)}c.appendChild(T)}a.appendChild(c),o.appendChild(a);const d=document.createElement("div");d.id="box-area",d.style.flexGrow="1",d.style.overflowY="auto",d.style.padding="5px",d.style.border="1px solid #34495e",d.style.borderRadius="5px";const u=document.createElement("h2");u.textContent="BOX (Storage)",u.style.fontSize="1.2em",u.style.borderBottom="1px solid #7f8c8d",u.style.paddingBottom="3px",u.style.marginBottom="5px",d.appendChild(u);const f=document.createElement("div");f.style.display="flex",f.style.flexWrap="wrap",f.style.justifyContent="flex-start",f.style.width="340px";const h=20,g=we.storageUnits.length,_=Math.max(h,Math.ceil((g+4)/5)*5);for(let v=0;v<_;v++){const T=fa(`box-slot-${v}`,"box",v,Cs),B=we.storageUnits[v];if(B){const V=ha(B,"box",v);pa(V,B),T.appendChild(V)}f.appendChild(T)}d.appendChild(f),o.appendChild(d);const m=document.createElement("div");m.id="items-section",m.style.width="33%",m.style.height="100%",m.style.paddingLeft="10px",m.style.boxSizing="border-box",m.style.display="flex",m.style.flexDirection="column",m.style.alignItems="center";const p=document.createElement("h2");p.textContent="ITEMS",p.style.fontSize="1.2em",p.style.borderBottom="1px solid #7f8c8d",p.style.paddingBottom="3px",p.style.marginBottom="10px",p.style.width="100%",p.style.textAlign="center";const E=document.createElement("div");if(E.style.width="100%",E.style.overflowY="auto",E.style.maxHeight="60%",E.style.padding="5px",E.style.border="1px solid #34495e",E.style.borderRadius="5px",E.style.backgroundColor="#34495e",we.playerItems.length===0){const v=document.createElement("p");v.textContent="No items in inventory",v.style.textAlign="center",v.style.color="#95a5a6",v.style.padding="20px",E.appendChild(v)}else we.playerItems.forEach((v,T)=>{const B=sc(v,Cs);E.appendChild(B)});const x=document.createElement("p");x.id="item-instructions",Et?(x.innerHTML=`<span style="color: #e74c3c;">✓ ${Et.name} selected</span><br>Click a unit to use it`,x.style.color="#e74c3c"):(x.textContent="Click an item, then click a unit to use it.",x.style.color="#bdc3c7"),x.style.textAlign="center",x.style.fontSize="0.9em",x.style.marginTop="10px",x.style.fontStyle="italic",m.appendChild(p),m.appendChild(E),m.appendChild(x),r.appendChild(o),r.appendChild(m);const b=document.createElement("div");b.style.width="100%",b.style.display="flex",b.style.justifyContent="space-between",b.style.alignItems="center",b.style.paddingTop="15px",b.style.flexShrink="0";const C=document.createElement("div");C.id="player-resource-display",C.textContent=`Resource: ${pn.resource}`,C.style.padding="10px 15px",C.style.backgroundColor="#1a1a1a",C.style.color="#f1c40f",C.style.borderRadius="5px",C.style.fontSize="1em",C.style.fontWeight="bold",C.style.display="flex",C.style.alignItems="center";const A=document.createElement("button");A.textContent="Shop",A.style.padding="8px 15px",A.style.fontSize="1em",A.style.backgroundColor="#3498db",A.style.color="white",A.style.border="none",A.style.borderRadius="5px",A.style.cursor="pointer",A.style.margin="0 8px",A.addEventListener("mouseover",()=>A.style.backgroundColor="#2980b9"),A.addEventListener("mouseout",()=>A.style.backgroundColor="#3498db"),A.onclick=t;const w=document.createElement("div");w.style.display="flex",w.style.justifyContent="center",w.style.alignItems="center",w.style.flexGrow="2",w.appendChild(A);const H=document.createElement("button");H.textContent="PROCEED",H.style.padding="8px 15px",H.style.fontSize="1em",H.style.backgroundColor="#27ae60",H.style.color="white",H.style.border="none",H.style.borderRadius="5px",H.style.cursor="pointer",H.onclick=()=>e(),b.appendChild(C),b.appendChild(w),b.appendChild(H),n.appendChild(s),n.appendChild(r),n.appendChild(b),i.appendChild(n),console.log("Squad/Inventory Scene displayed with new layout and smaller slots.")}const rc="/assets/swordsman-DZczeJA5.PNG",ac="/assets/healer-6PZSpLWU.PNG",oc="/assets/hater-xGQmM0-V.PNG",lc="/assets/wizard-dFT0bH_F.PNG",jo={swordsman:{name:"Swordsman",energyType:"Kinetic",health:17,maxEnergy:10,basicDamage:8,skillDamage:3,range:1,move:3,cost:3,imageUrl:rc,skills:["blazing-knuckle"]},healer:{name:"Healer",energyType:"Potential",health:18,maxEnergy:20,basicDamage:3,skillDamage:4,range:2,move:3,cost:3,imageUrl:ac,skills:["universal-whisper"]},hater:{name:"Hater",energyType:"Potential",health:16,maxEnergy:22,basicDamage:5,skillDamage:4,range:3,move:3,cost:3,imageUrl:oc,skills:["hurricane-slash"]},wizard:{name:"Wizard",energyType:"Potential",health:10,maxEnergy:15,basicDamage:3,skillDamage:7,range:3,move:3,cost:3,imageUrl:lc,skills:["tera-fire"]}},cc={id:"blazing-knuckle",name:"Blazing Knuckle",description:"Unleashes fiery strikes in all cardinal directions around the target",energyCost:3,bonusDamage:3,targetingType:"non-rotational",emoji:"🔥",getTargetPattern:(i,e)=>[{x:i,y:e-1,isPrimary:!1},{x:i+1,y:e,isPrimary:!1},{x:i,y:e+1,isPrimary:!1},{x:i-1,y:e,isPrimary:!1}]},dc={id:"tera-fire",name:"Tera Fire",description:"Strikes primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:3,targetingType:"dual-rotational",emoji:"🔥",getTargetPattern:(i,e,t,n)=>{const s=n||0;let r=1,o=-1;switch(s%4){case 0:r=1,o=-1;break;case 1:r=1,o=1;break;case 2:r=-1,o=1;break;case 3:r=-1,o=-1;break}return[{x:i,y:e,isPrimary:!0},{x:i+r,y:e+o,isPrimary:!1}]}},uc={id:"universal-whisper",name:"Universal Whisper",description:"Heals primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:1,targetingType:"dual-rotational",emoji:"🪐",getTargetPattern:(i,e,t,n)=>{const o=[{x:1,y:-1},{x:1,y:1},{x:-1,y:1},{x:-1,y:-1}][(n||0)%4];return[{x:i,y:e},{x:i+o.x,y:e+o.y}]}},hc={id:"hurricane-slash",name:"Hurricane Slash",description:"A powerful melee attack that can target any adjacent enemy within 1 range.",energyCost:3,bonusDamage:3,targetingType:"adjacent-attack",emoji:"🌩️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},fc={"blazing-knuckle":cc,"tera-fire":dc,"universal-whisper":uc,"hurricane-slash":hc},ma=["Mike","Bryan","Matt","Gabe","Waylin","Axel","Laharl","Steve","Garrison","Sock","Franz","Edgar","Dan","Frank","Keyboard","Justin","Jack","Ned","Elliot","Sam","Alex","Jackson","Kyle","Don Julio","Derek","Peter","Herbert","Liam","Arthur","Gavin","Dylan","Kieran","Romulus"];let pc=1;function mc(){return`unit-${pc++}`}function gc(){const i=Math.floor(Math.random()*ma.length);return ma[i]}class _c{constructor(e){this.registry=e}createUnit(e,t="player"){const n=jo[e];if(!n)return console.error(`Unit type "${e}" not found in UnitDex.`),null;let s;n.energyType.toLowerCase()==="potential"?s=n.maxEnergy:n.energyType.toLowerCase()==="kinetic"?s=0:(console.warn(`Unknown energy type "${n.energyType}" for unit "${e}". Defaulting to max energy.`),s=n.maxEnergy);const r=n.skills.map(a=>fc[a]).filter(a=>a!==void 0),o={id:mc(),name:gc(),className:n.name,energyType:n.energyType,health:n.health,currentHealth:n.health,maxEnergy:n.maxEnergy,currentEnergy:s,basicDamage:n.basicDamage,skillDamage:n.skillDamage,range:n.range,move:n.move,cost:n.cost,imageUrl:n.imageUrl,skills:r,activeModifiers:[],team:t,isAlive:!0,turnTakenThisRound:!1,isTargetable:!0,isDestructible:!0,isSubUnit:!1,isStructure:!1};return console.log(`Created unit: ${o.name} (${o.className}) (ID: ${o.id}) - Cost: ${o.cost} - Energy: ${o.currentEnergy}/${o.maxEnergy} (${o.energyType})`),o}createAndAddUnitToPlayerParty(e){const t=this.createUnit(e);return t&&this.registry.addUnitToPlayerParty(t),t}}const Zo=new _c(we),yc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKraVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Q3JlYXRvclRvb2w+PHhtcDpjcmVhdG9ydG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Y3JlYXRvcnRvb2w+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+PHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSd3Jz8+d1SxtAAAAi1JREFUaEPtmCGUgkAQhn8vGY1EIpFINF40Go0XicSNRKLRSCQaLxKJRCLRaPPC+vvcOffdqoiH8r1nYKXMfjszO0yKosCQ+ZALQ2NyqwGl1EE8T86f++L9DHDn99MvYz0IAgDAarHr1cTrG5BnPZxvAABlWQIAYrUCAKyTCHhCLgzegDUApdRBKXXwwwx+mCGcb067/5+wBjAUfuUAz7wfZgCAuq6N/wnPfrnV/zMn0sQbc+AanA1Eka4ycaLrfVnp95t6BwBomxYAUH1rMxL2ja4NvY4B287Ls+75HgBguZzp9aOJba5zYDbT63xPIk3d2zdez4DstHlhnuk812eeFLmZQ4vlwnj2A21EwtzZbj6BO0y8jgEi7z5E3j6n+zVwljM8+zRHmENRaCyfcoe5tZg3owEnZLVyrTrE1kduzYXBG+g8AD+YGb84CRAnATzfg+d7yNIaWXr5fnULnQfQNw8PoKz0j0ZooiseHsCj6TyApt6dKsslaKLc1qcegGOfkb3Ghc4D6Jur+wBJ0vaAs+9Btn4g70JyfuD7dWVWpqaKAYe+8L4GZEcmNhM2eJvlnYlwvvjLxPsaIPJbKXOCBKH5TLjznB844Ul4Z7J9+RsNSOQ8IWs7d5zViWedprguq5Vthh4NuCKrltxxkik9k3PiI3LnyWjAFZsBQhO2amNj8AZ6D6CpYjRVjLZpjXlZ3k5d6T2AruktBySyXxDXs09GA89m8AbGAJ7ND9DxIKyQkDFTAAAAAElFTkSuQmCC",xc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACU0lEQVR4AdXBoZLqPBzG4V8yXEDkykpkJXLlyiORyEouIXJlJLISGYmMrKxERq7830FP3/lMBcM3O3BEnsflnGmZp3Gexnka52mcp3Gexnka52mcp3Gexnka52mcp3Gexnkat+MfqXVc2Oi6k+Mf8DRux5vVOi6shmFk63I5Lay67uR4I0/jdrxJrePCahhGHjkeB+R6vSysuu7keANP43a8qNZxYTUMI8+YVeTr6wu53caFVdedHC/wNM7lnPmNktLCqvsTkGEYecZsYsussnW73ZBxrEiM0fELnsbt+B8lpYVVMUNOpw4ZhpFHzCYeMatICB1iVpHjceA/F6SktLAqZkiM0fGEp3Eu58xWSWlhVcyQ9PmJ7PseCcc/iNmEhHBAzCYkhANiNiFmFQmhQ8wqEkKHmFUkhA65Xi9IXzskzzNSzJAYo2PD0ziXc0ZijAur9PmJ7Pueh74+kBAOiNmEhHBAzCbErCIhdIhZRULoELOKhNAhZhX5udyRfd+zdZ9n5FwKEmN0rDyNczlntkpKC6tihtzOZx65zzNy+I6I2YSEcEDMJiSEA2I28cj1ekH62iH7vmfrexyRYobEGB0bnsa5nDPPlJQWVsUMuZ3PPHKfZ+Rj2CM/lzvyMeyRn8sd+Rj2yM/ljuz7nq3vcUSKGRJjdDzhaZzLOfMbJaWFVTFDbuczr/geR6SYITFGxy94GudyzryipLSwKmbI7Xzmkfs8I3mekWKGxBgdL/A0zuWceaeS0sIDxQyJMTreyNM4l3OmZZ7GeRrnaZyncZ7G/QXXH/ttJS3xdQAAAABJRU5ErkJggg==",Ko={"rare-candy":{name:"Rare Candy",description:"Causes a unit to level up, increasing all stats",cost:1,imageUrl:yc,type:"consumable",effect:i=>(i.health+=3,i.maxEnergy+=2,i.basicDamage+=1,i.skillDamage+=1,i.currentHealth=i.health,console.log(`🍬 ${i.name} leveled up! Health: +3, Energy: +2, Damage: +1`),!0)},"energy-powder":{name:"Energy Powder",description:"Permanently increases a unit's movement by 1",cost:1,imageUrl:xc,type:"consumable",effect:i=>(i.move+=1,console.log(`⚡ ${i.name} gained 1 movement! New movement: ${i.move}`),!0)}};let vc=1;function Sc(){return`item-${vc++}`}class Mc{createItem(e){const t=Ko[e];if(!t)return console.error(`Item type "${e}" not found in ItemDex.`),null;const n={id:Sc(),name:t.name,description:t.description,cost:t.cost,imageUrl:t.imageUrl,type:t.type,effect:t.effect};return console.log(`Created item: ${n.name} (ID: ${n.id}) - Cost: ${n.cost}`),n}}const Ec=new Mc;let Or=!0,Pi=[null,null,null],Li=[null,null];function Jo(){Or=!0,Pi=[null,null,null],Li=[null,null]}function Qs(){return Pi}function ga(){return Li}function Tc(i,e){i>=0&&i<Pi.length&&(Pi[i]=e)}function bc(i,e){i>=0&&i<Li.length&&(Li[i]=e)}function Ac(){if(Or){console.log("Shop requires fresh population. Clearing and generating units and items..."),we.shopUnits=[],we.shopItems=[],Pi=[null,null,null],Li=[null,null];const i=Object.keys(jo);if(i.length===0)console.error("No unit types defined in UNIT_DEX for the shop!");else{const t=[];for(let n=0;n<3&&i.length!==0;n++){let s,r=0;const o=i.length*2;do{const l=Math.floor(Math.random()*i.length);s=i[l],r++}while(t.includes(s)&&i.length>t.length&&r<o);t.push(s);const a=Zo.createUnit(s);a&&(we.addUnitToShop(a),Pi[n]=a)}}const e=Object.keys(Ko);if(e.length===0)console.error("No item types defined in ITEM_DEX for the shop!");else for(let t=0;t<Math.min(2,e.length);t++){const n=e[t],s=Ec.createItem(n);s&&(we.addItemToShop(s),Li[t]=s)}Or=!1}else console.log("Shop already populated for this session. Using existing display items and item slots.")}let Ut=null;function wc(i){const e=document.createElement("div");return e.id="shop-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function Rc(i){if(!Ut)return;const e=i.skills&&i.skills.length>0?`
        <div style="margin-top: 8px; border-top: 1px solid #555; padding-top: 5px;">
            <p style="margin: 0 0 3px 0; font-weight: bold; color: #8e44ad; font-size: 0.85em;">Skills:</p>
            ${i.skills.map(t=>`
                <div style="margin: 2px 0; padding: 2px 4px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                    <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${t.emoji} ${t.name}</span>
                    <span style="color: #3498db; font-size: 0.75em; margin-left: 5px;">(${t.energyCost} ⚡)</span>
                </div>
            `).join("")}
        </div>
    `:"";Ut.innerHTML=`
        <h4 style="margin: 0 0 5px 0; text-align: center;">${i.name} (${i.className})</h4>
        <p style="margin: 3px 0;">HP: ${i.health} | Max Energy: ${i.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${i.basicDamage} | Skill Dmg: ${i.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${i.range} | Move: ${i.move}</p>
        <p style="margin: 3px 0; font-weight: bold;">Cost: ${i.cost}</p>
        ${e}
    `}function Qo(i){if(!Ut)return;let e=i.clientX+15,t=i.clientY+15;e+Ut.offsetWidth>window.innerWidth&&(e=window.innerWidth-Ut.offsetWidth-10),t+Ut.offsetHeight>window.innerHeight&&(t=window.innerHeight-Ut.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Ut.style.left=`${e}px`,Ut.style.top=`${t}px`}function Cc(i,e){Ut&&(Rc(i),Ut.style.display="block",Qo(e))}function er(){Ut&&(Ut.style.display="none")}function Pc(i){(!Ut||!i.contains(Ut))&&(Ut=wc(i))}let lt=null,$e=null;function _a(i){const e=document.getElementById("not-enough-resources-message");e&&e.remove();const t=document.createElement("div");t.id="not-enough-resources-message",t.textContent="Not Enough Resources",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}function el(i,e){Ac(),console.log("Showing Shop Scene with display items:",Qs()),console.log("Showing Shop Scene with item slots:",ga()),i.innerHTML="",lt=null,$e=null,Pc(i);const t=document.createElement("div");t.id="shop-scene",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="space-between",t.style.backgroundColor="#2c3e50",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.padding="20px",t.style.boxSizing="border-box";const n=document.createElement("h1");n.textContent="SHOP",n.style.textAlign="center",n.style.fontSize="3em",n.style.margin="0 0 20px 0";const s=document.createElement("div");s.style.display="flex",s.style.justifyContent="space-around",s.style.width="90%",s.style.flexGrow="1",s.style.alignItems="center",s.style.paddingBottom="20px",Qs().forEach((u,f)=>{const h=document.createElement("div");if(h.id=`shop-slot-${f}`,h.style.width="200px",h.style.height="auto",h.style.minHeight="180px",h.style.border="2px solid #3498db",h.style.borderRadius="10px",h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.justifyContent="center",h.style.backgroundColor="#34495e",h.style.padding="10px",h.style.boxSizing="border-box",h.style.textAlign="center",h.style.cursor="pointer",h.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u&&"sold"in u&&u.sold===!0)h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',h.style.cursor="default",h.dataset.sold="true";else if(u&&"id"in u){const g=u;h.dataset.unitId=g.id;const _=document.createElement("img");_.src=g.imageUrl,_.alt=g.className,_.style.width="60px",_.style.height="60px",_.style.marginBottom="8px",_.style.borderRadius="4px",h.appendChild(_);const m=document.createElement("h4");m.textContent=g.name,m.style.margin="0 0 4px 0",m.style.fontSize="1.1em",h.appendChild(m);const p=document.createElement("p");p.textContent=`(${g.className})`,p.style.margin="0",p.style.fontSize="0.9em",p.style.fontStyle="italic",h.appendChild(p),h.addEventListener("mouseenter",E=>{const x=Qs()[f];x&&"id"in x&&Cc(x,E)}),h.addEventListener("mousemove",E=>{Qo(E)}),h.addEventListener("mouseleave",()=>{er()}),h.addEventListener("click",()=>{if(h.dataset.sold==="true")return;const E=we.shopUnits.find(x=>x.id===g.id);if(!E){console.warn("Clicked unit no longer available in shopUnits registry for purchase.",g.id);return}if(lt&&lt!==h){lt.style.transform="translateY(0)",lt.style.boxShadow="none";const x=lt.querySelector("button.buy-button-shop");x&&lt.removeChild(x)}if(lt===h){h.style.transform="translateY(0)",h.style.boxShadow="none";const x=h.querySelector("button.buy-button-shop");x&&h.removeChild(x),lt=null,$e=null}else{lt=h,h.style.transform="translateY(-10px)",h.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)";const x=h.querySelector("button.buy-button-shop");x&&h.removeChild(x),$e=document.createElement("button"),$e.className="buy-button-shop",$e.textContent=`Buy (${E.cost} R)`,$e.style.padding="8px 12px",$e.style.fontSize="0.9em",$e.style.backgroundColor="#e67e22",$e.style.color="white",$e.style.border="none",$e.style.borderRadius="5px",$e.style.cursor="pointer",$e.style.marginTop="10px",$e.dataset.unitId=E.id,$e.onclick=b=>{b.stopPropagation();const C=E;if(pn.resource<C.cost){_a(i);return}pn.spendResource(C.cost),we.removeUnitFromShop(C.id),Tc(f,{sold:!0,originalUnit:C}),we.playerParty.length<Ci.MAX_PLAYER_PARTY_SIZE?(we.addUnitToPlayerParty(C),console.log(`${C.name} (${C.className}) purchased and added to Squad!`)):(we.addUnitToStorage(C),console.log(`${C.name} (${C.className}) purchased and added to Box (Squad was full).`)),h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.cursor="default",h.dataset.sold="true",lt=null;const A=document.getElementById("shop-resource-display");A&&(A.textContent=`Resource: ${pn.resource}`),er()},h.style.justifyContent="space-between",h.appendChild($e)}})}else h.textContent="N/A",h.style.cursor="default";s.appendChild(h)});const r=document.createElement("div");r.style.display="flex",r.style.justifyContent="center",r.style.gap="20px",r.style.width="90%",r.style.alignItems="center",r.style.paddingBottom="20px",ga().forEach((u,f)=>{const h=document.createElement("div");if(h.id=`shop-item-slot-${f}`,h.style.width="100px",h.style.height="auto",h.style.minHeight="90px",h.style.border="2px solid #f39c12",h.style.borderRadius="10px",h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.justifyContent="center",h.style.backgroundColor="#34495e",h.style.padding="8px",h.style.boxSizing="border-box",h.style.textAlign="center",h.style.cursor="pointer",h.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u&&"sold"in u&&u.sold===!0)h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',h.style.cursor="default",h.dataset.sold="true";else if(u&&"id"in u){const g=u;h.dataset.itemId=g.id;const _=document.createElement("img");_.src=g.imageUrl,_.alt=g.name,_.style.width="30px",_.style.height="30px",_.style.marginBottom="4px",_.style.borderRadius="2px",h.appendChild(_);const m=document.createElement("h6");m.textContent=g.name,m.style.margin="0",m.style.fontSize="0.7em",m.style.fontWeight="bold",h.appendChild(m),h.addEventListener("mouseenter",()=>{h.title=`${g.name}
${g.description}
Cost: ${g.cost} Resource`}),h.addEventListener("click",()=>{if(h.dataset.sold==="true")return;const p=we.shopItems.find(E=>E.id===g.id);if(!p){console.warn("Clicked item no longer available in shopItems registry for purchase.",g.id);return}if(lt&&lt!==h){lt.style.transform="translateY(0)",lt.style.boxShadow="none";const E=lt.querySelector("button.buy-button-shop");E&&lt.removeChild(E)}if(lt===h){h.style.transform="translateY(0)",h.style.boxShadow="none";const E=h.querySelector("button.buy-button-shop");E&&h.removeChild(E),lt=null,$e=null}else{lt=h,h.style.transform="translateY(-5px)",h.style.boxShadow="0px 3px 10px rgba(0,0,0,0.3)";const E=h.querySelector("button.buy-button-shop");E&&h.removeChild(E),$e=document.createElement("button"),$e.className="buy-button-shop",$e.textContent=`Buy (${p.cost} R)`,$e.style.padding="4px 8px",$e.style.fontSize="0.7em",$e.style.backgroundColor="#e67e22",$e.style.color="white",$e.style.border="none",$e.style.borderRadius="3px",$e.style.cursor="pointer",$e.style.marginTop="5px",$e.dataset.itemId=p.id,$e.onclick=x=>{x.stopPropagation();const b=p;if(pn.resource<b.cost){_a(i);return}pn.spendResource(b.cost),we.removeItemFromShop(b.id),we.addItemToPlayer(b),bc(f,{sold:!0,originalItem:b}),console.log(`${b.name} purchased and added to inventory!`),h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.cursor="default",h.dataset.sold="true",lt=null;const C=document.getElementById("shop-resource-display");C&&(C.textContent=`Resource: ${pn.resource}`)},h.style.justifyContent="space-between",h.appendChild($e)}})}else h.textContent="N/A",h.style.cursor="default";r.appendChild(h)});const o=document.createElement("div");o.style.width="100%",o.style.display="flex",o.style.justifyContent="space-between",o.style.alignItems="center",o.style.paddingTop="20px";const a=document.createElement("div");a.id="shop-resource-display",a.textContent=`Resource: ${pn.resource}`,a.style.padding="10px 15px",a.style.backgroundColor="#1a1a1a",a.style.color="#f1c40f",a.style.borderRadius="5px",a.style.fontSize="1em",a.style.fontWeight="bold",a.style.display="flex",a.style.alignItems="center";const l=document.createElement("button");l.textContent="Squad/Inventory",l.style.padding="8px 15px",l.style.fontSize="1em",l.style.backgroundColor="#3498db",l.style.color="white",l.style.border="none",l.style.borderRadius="5px",l.style.cursor="pointer",l.style.margin="0 8px",l.addEventListener("mouseover",()=>l.style.backgroundColor="#2980b9"),l.addEventListener("mouseout",()=>l.style.backgroundColor="#3498db"),l.onclick=()=>{er(),Kr(i,e,()=>el(i,e))};const c=document.createElement("button");c.textContent="PROCEED",c.style.padding="8px 15px",c.style.fontSize="1em",c.style.backgroundColor="#27ae60",c.style.color="white",c.style.border="none",c.style.borderRadius="5px",c.style.cursor="pointer",c.onclick=()=>e();const d=document.createElement("div");d.style.display="flex",d.style.justifyContent="center",d.style.alignItems="center",d.style.flexGrow="2",d.appendChild(l),o.appendChild(a),o.appendChild(d),o.appendChild(c),t.appendChild(n),t.appendChild(s),t.appendChild(r),t.appendChild(o),i.appendChild(t),console.log("Shop Scene displayed with Proceed button.")}async function Lc(){console.log("Initializing application..."),Jo(),document.body.style.margin="0",document.body.style.overflow="hidden";const i=document.createElement("div");i.id="app-container",i.style.width="100vw",i.style.height="100vh",i.style.margin="0",i.style.padding="0",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.overflow="hidden",document.body.appendChild(i);const e=document.createElement("div");return e.id="game-content-wrapper",e.style.position="relative",console.log("Application initialized, ready for content."),{appContainer:i,gameSpecificContainer:e}}function ya(i){i().catch(e=>{console.error("Critical error during application initialization:",e);try{document.body.innerHTML='<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #e0e0e0; font-family: sans-serif;"><h1>Application Error</h1><p>A critical error occurred and the application cannot start.</p><p>Please check the browser console for more details.</p></div>'}catch(t){console.error("Could not display error message in DOM.",t)}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jr="160",Uc=0,xa=1,Dc=2,tl=1,Ic=2,bn=3,_n=0,Ht=1,wn=2,kn=0,wi=1,va=2,Sa=3,Ma=4,Nc=5,Jn=100,Fc=101,Oc=102,Ea=103,Ta=104,kc=200,Bc=201,zc=202,Gc=203,kr=204,Br=205,Hc=206,Vc=207,Wc=208,$c=209,Xc=210,Yc=211,qc=212,jc=213,Zc=214,Kc=0,Jc=1,Qc=2,Fs=3,ed=4,td=5,nd=6,id=7,nl=0,sd=1,rd=2,Bn=0,ad=1,od=2,ld=3,cd=4,dd=5,ud=6,il=300,Ui=301,Di=302,zr=303,Gr=304,Ws=306,Hr=1e3,jt=1001,Vr=1002,qe=1003,ba=1004,tr=1005,Jt=1006,hd=1007,qi=1008,zn=1009,fd=1010,pd=1011,Qr=1012,sl=1013,Fn=1014,On=1015,ji=1016,rl=1017,al=1018,ei=1020,md=1021,on=1023,gd=1024,_d=1025,ti=1026,Ii=1027,yd=1028,ol=1029,xd=1030,ll=1031,cl=1033,nr=33776,ir=33777,sr=33778,rr=33779,Aa=35840,wa=35841,Ra=35842,Ca=35843,dl=36196,Pa=37492,La=37496,Ua=37808,Da=37809,Ia=37810,Na=37811,Fa=37812,Oa=37813,ka=37814,Ba=37815,za=37816,Ga=37817,Ha=37818,Va=37819,Wa=37820,$a=37821,ar=36492,Xa=36494,Ya=36495,vd=36283,qa=36284,ja=36285,Za=36286,ul=3e3,ni=3001,Sd=3200,Md=3201,Ed=0,Td=1,Qt="",Tt="srgb",Cn="srgb-linear",ea="display-p3",$s="display-p3-linear",Os="linear",nt="srgb",ks="rec709",Bs="p3",ri=7680,Ka=519,bd=512,Ad=513,wd=514,hl=515,Rd=516,Cd=517,Pd=518,Ld=519,Ja=35044,Qa="300 es",Wr=1035,Rn=2e3,zs=2001;class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],or=Math.PI/180,$r=180/Math.PI;function Ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Gt(i,e,t){return Math.max(e,Math.min(t,i))}function Ud(i,e){return(i%e+e)%e}function lr(i,e,t){return(1-t)*i+t*e}function eo(i){return(i&i-1)===0&&i!==0}function Xr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function zi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,s,r,o,a,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],h=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],x=s[4],b=s[7],C=s[2],A=s[5],w=s[8];return r[0]=o*_+a*E+l*C,r[3]=o*m+a*x+l*A,r[6]=o*p+a*b+l*w,r[1]=c*_+d*E+u*C,r[4]=c*m+d*x+u*A,r[7]=c*p+d*b+u*w,r[2]=f*_+h*E+g*C,r[5]=f*m+h*x+g*A,r[8]=f*p+h*b+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=d*o-a*c,f=a*l-d*r,h=c*r-o*l,g=t*u+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-d*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(d*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=h*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(cr.makeScale(e,t)),this}rotate(e){return this.premultiply(cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const cr=new ze;function fl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Zi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Dd(){const i=Zi("canvas");return i.style.display="block",i}const to={};function Xi(i){i in to||(to[i]=!0,console.warn(i))}const no=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),io=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ss={[Cn]:{transfer:Os,primaries:ks,toReference:i=>i,fromReference:i=>i},[Tt]:{transfer:nt,primaries:ks,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[$s]:{transfer:Os,primaries:Bs,toReference:i=>i.applyMatrix3(io),fromReference:i=>i.applyMatrix3(no)},[ea]:{transfer:nt,primaries:Bs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(io),fromReference:i=>i.applyMatrix3(no).convertLinearToSRGB()}},Id=new Set([Cn,$s]),Ze={enabled:!0,_workingColorSpace:Cn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Id.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ss[e].toReference,s=ss[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ss[i].primaries},getTransfer:function(i){return i===Qt?Os:ss[i].transfer}};function Ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function dr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ai;class pl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ai===void 0&&(ai=Zi("canvas")),ai.width=e.width,ai.height=e.height;const n=ai.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Zi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ri(t[n]/255)*255):t[n]=Ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Nd=0;class ml{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Ki(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ur(s[o].image)):r.push(ur(s[o]))}else r=ur(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fd=0;class Bt extends Fi{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=jt,s=jt,r=Jt,o=qi,a=on,l=zn,c=Bt.DEFAULT_ANISOTROPY,d=Qt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ki(),this.name="",this.source=new ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===ni?Tt:Qt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Hr:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case Vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Hr:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case Vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Tt?ni:ul}set encoding(e){Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ni?Tt:Qt}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=il;Bt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,b=(h+1)/2,C=(p+1)/2,A=(d+f)/4,w=(u+_)/4,H=(g+m)/4;return x>b&&x>C?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=A/n,r=w/n):b>C?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=A/s,r=H/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=w/r,s=H/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-d)*(f-d));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(f-d)/E,this.w=Math.acos((c+h+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Od extends Fi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Xi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ni?Tt:Qt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Bt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ml(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Od{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class gl extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kd extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ji{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const f=r[o+0],h=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==f||c!==h||d!==g){let m=1-a;const p=l*f+c*h+d*g+u*_,E=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),A=Math.atan2(C,p*E);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const b=a*E;if(l=l*m+f*b,c=c*m+h*b,d=d*m+g*b,u=u*m+_*b,m===1-a){const C=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=C,c*=C,d*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[o],f=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+d*u+l*h-c*f,e[t+1]=l*g+d*f+c*u-a*h,e[t+2]=c*g+d*h+a*f-l*u,e[t+3]=d*g-a*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),u=a(r/2),f=l(n/2),h=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"YXZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"ZXY":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"ZYX":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"YZX":this._x=f*d*u+c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u-f*h*g;break;case"XZY":this._x=f*d*u-c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+a+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(n>a&&n>u){const h=2*Math.sqrt(1+n-a-u);this._w=(d-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>u){const h=2*Math.sqrt(1+a-n-u);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-n-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(so.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(so.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),d=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*d,this.y=n+l*d+a*c-r*u,this.z=s+l*u+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return hr.copy(this).projectOnVector(e),this.sub(hr)}reflect(e){return this.sub(hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hr=new U,so=new Ji;class Qi{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,tn):tn.fromBufferAttribute(r,o),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rs.copy(n.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),as.subVectors(this.max,Gi),oi.subVectors(e.a,Gi),li.subVectors(e.b,Gi),ci.subVectors(e.c,Gi),Pn.subVectors(li,oi),Ln.subVectors(ci,li),Vn.subVectors(oi,ci);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-Vn.z,Vn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,Vn.z,0,-Vn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-Vn.y,Vn.x,0];return!fr(t,oi,li,ci,as)||(t=[1,0,0,0,1,0,0,0,1],!fr(t,oi,li,ci,as))?!1:(os.crossVectors(Pn,Ln),t=[os.x,os.y,os.z],fr(t,oi,li,ci,as))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vn=[new U,new U,new U,new U,new U,new U,new U,new U],tn=new U,rs=new Qi,oi=new U,li=new U,ci=new U,Pn=new U,Ln=new U,Vn=new U,Gi=new U,as=new U,os=new U,Wn=new U;function fr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Wn.fromArray(i,r);const a=s.x*Math.abs(Wn.x)+s.y*Math.abs(Wn.y)+s.z*Math.abs(Wn.z),l=e.dot(Wn),c=t.dot(Wn),d=n.dot(Wn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Bd=new Qi,Hi=new U,pr=new U;class Xs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Hi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(pr)),this.expandByPoint(Hi.copy(e.center).sub(pr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new U,mr=new U,ls=new U,Un=new U,gr=new U,cs=new U,_r=new U;class _l{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){mr.copy(e).add(t).multiplyScalar(.5),ls.copy(t).sub(e).normalize(),Un.copy(this.origin).sub(mr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ls),a=Un.dot(this.direction),l=-Un.dot(ls),c=Un.lengthSq(),d=Math.abs(1-o*o);let u,f,h,g;if(d>0)if(u=o*l-a,f=o*a-l,g=r*d,u>=0)if(f>=-g)if(f<=g){const _=1/d;u*=_,f*=_,h=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),h=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),h=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),h=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(mr).addScaledVector(ls,f),h}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),s=Sn.dot(Sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,s,r){gr.subVectors(t,e),cs.subVectors(n,e),_r.crossVectors(gr,cs);let o=this.direction.dot(_r),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,e);const l=a*this.direction.dot(cs.crossVectors(Un,cs));if(l<0)return null;const c=a*this.direction.dot(gr.cross(Un));if(c<0||l+c>o)return null;const d=-a*Un.dot(_r);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,n,s,r,o,a,l,c,d,u,f,h,g,_,m){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,d,u,f,h,g,_,m)}set(e,t,n,s,r,o,a,l,c,d,u,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/di.setFromMatrixColumn(e,0).length(),r=1/di.setFromMatrixColumn(e,1).length(),o=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*d,h=o*u,g=a*d,_=a*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,g=c*d,_=c*u;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*u,t[5]=o*d,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,g=c*d,_=c*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*d,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,h=o*u,g=a*d,_=a*u;t[0]=l*d,t[4]=g*c-h,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=_-f*u,t[8]=g*u+h,t[1]=u,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=h*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+_,t[5]=o*d,t[9]=h*u-g,t[2]=g*u-h,t[6]=a*d,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zd,e,Gd)}lookAt(e,t,n){const s=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Dn.crossVectors(n,$t),Dn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Dn.crossVectors(n,$t)),Dn.normalize(),ds.crossVectors($t,Dn),s[0]=Dn.x,s[4]=ds.x,s[8]=$t.x,s[1]=Dn.y,s[5]=ds.y,s[9]=$t.y,s[2]=Dn.z,s[6]=ds.z,s[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],x=n[7],b=n[11],C=n[15],A=s[0],w=s[4],H=s[8],v=s[12],T=s[1],B=s[5],V=s[9],ie=s[13],P=s[2],k=s[6],G=s[10],X=s[14],W=s[3],$=s[7],Y=s[11],Q=s[15];return r[0]=o*A+a*T+l*P+c*W,r[4]=o*w+a*B+l*k+c*$,r[8]=o*H+a*V+l*G+c*Y,r[12]=o*v+a*ie+l*X+c*Q,r[1]=d*A+u*T+f*P+h*W,r[5]=d*w+u*B+f*k+h*$,r[9]=d*H+u*V+f*G+h*Y,r[13]=d*v+u*ie+f*X+h*Q,r[2]=g*A+_*T+m*P+p*W,r[6]=g*w+_*B+m*k+p*$,r[10]=g*H+_*V+m*G+p*Y,r[14]=g*v+_*ie+m*X+p*Q,r[3]=E*A+x*T+b*P+C*W,r[7]=E*w+x*B+b*k+C*$,r[11]=E*H+x*V+b*G+C*Y,r[15]=E*v+x*ie+b*X+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*h-n*l*h)+_*(+t*l*h-t*c*f+r*o*f-s*o*h+s*c*d-r*l*d)+m*(+t*c*u-t*a*h-r*o*u+n*o*h+r*a*d-n*c*d)+p*(-s*a*d-t*l*u+t*a*f+s*o*u-n*o*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],E=u*m*c-_*f*c+_*l*h-a*m*h-u*l*p+a*f*p,x=g*f*c-d*m*c-g*l*h+o*m*h+d*l*p-o*f*p,b=d*_*c-g*u*c+g*a*h-o*_*h-d*a*p+o*u*p,C=g*u*l-d*_*l-g*a*f+o*_*f+d*a*m-o*u*m,A=t*E+n*x+s*b+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=E*w,e[1]=(_*f*r-u*m*r-_*s*h+n*m*h+u*s*p-n*f*p)*w,e[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*w,e[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*h-n*l*h)*w,e[4]=x*w,e[5]=(d*m*r-g*f*r+g*s*h-t*m*h-d*s*p+t*f*p)*w,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*w,e[7]=(o*f*r-d*l*r+d*s*c-t*f*c-o*s*h+t*l*h)*w,e[8]=b*w,e[9]=(g*u*r-d*_*r-g*n*h+t*_*h+d*n*p-t*u*p)*w,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*p+t*a*p)*w,e[11]=(d*a*r-o*u*r-d*n*c+t*u*c+o*n*h-t*a*h)*w,e[12]=C*w,e[13]=(d*_*s-g*u*s+g*n*f-t*_*f-d*n*m+t*u*m)*w,e[14]=(g*a*s-o*_*s-g*n*l+t*_*l+o*n*m-t*a*m)*w,e[15]=(o*u*s-d*a*s+d*n*l-t*u*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,u=a+a,f=r*c,h=r*d,g=r*u,_=o*d,m=o*u,p=a*u,E=l*c,x=l*d,b=l*u,C=n.x,A=n.y,w=n.z;return s[0]=(1-(_+p))*C,s[1]=(h+b)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(h-b)*A,s[5]=(1-(f+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(g+x)*w,s[9]=(m-E)*w,s[10]=(1-(f+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=di.set(s[0],s[1],s[2]).length();const o=di.set(s[4],s[5],s[6]).length(),a=di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],nn.copy(this);const c=1/r,d=1/o,u=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=d,nn.elements[5]*=d,nn.elements[6]*=d,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,t.setFromRotationMatrix(nn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Rn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let h,g;if(a===Rn)h=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===zs)h=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Rn){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(o-r),f=(t+e)*c,h=(n+s)*d;let g,_;if(a===Rn)g=(o+r)*u,_=-2*u;else if(a===zs)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new U,nn=new St,zd=new U(0,0,0),Gd=new U(1,1,1),Dn=new U,ds=new U,$t=new U,ro=new St,ao=new Ji;class Ys{constructor(e=0,t=0,n=0,s=Ys.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],u=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ro.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ro,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ao.setFromEuler(this),this.setFromQuaternion(ao,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ys.DEFAULT_ORDER="XYZ";class yl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hd=0;const oo=new U,ui=new Ji,Mn=new St,us=new U,Vi=new U,Vd=new U,Wd=new Ji,lo=new U(1,0,0),co=new U(0,1,0),uo=new U(0,0,1),$d={type:"added"},Xd={type:"removed"};class Vt extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new U,t=new Ys,n=new Ji,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new St},normalMatrix:{value:new ze}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(lo,e)}rotateY(e){return this.rotateOnAxis(co,e)}rotateZ(e){return this.rotateOnAxis(uo,e)}translateOnAxis(e,t){return oo.copy(e).applyQuaternion(this.quaternion),this.position.add(oo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(lo,e)}translateY(e){return this.translateOnAxis(co,e)}translateZ(e){return this.translateOnAxis(uo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?us.copy(e):us.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Vi,us,this.up):Mn.lookAt(us,Vi,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),ui.setFromRotationMatrix(Mn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($d)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xd)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,e,Vd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),u=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Vt.DEFAULT_UP=new U(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new U,En=new U,yr=new U,Tn=new U,hi=new U,fi=new U,ho=new U,xr=new U,vr=new U,Sr=new U;let hs=!1;class rn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),sn.subVectors(e,t),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){sn.subVectors(s,t),En.subVectors(n,t),yr.subVectors(e,t);const o=sn.dot(sn),a=sn.dot(En),l=sn.dot(yr),c=En.dot(En),d=En.dot(yr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,h=(c*l-a*d)*f,g=(o*d-a*l)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getUV(e,t,n,s,r,o,a,l){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),this.getInterpolation(e,t,n,s,r,o,a,l)}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Tn.x),l.addScaledVector(o,Tn.y),l.addScaledVector(a,Tn.z),l)}static isFrontFacing(e,t,n,s){return sn.subVectors(n,t),En.subVectors(e,t),sn.cross(En).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),En.subVectors(this.a,this.b),sn.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return rn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return rn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;hi.subVectors(s,n),fi.subVectors(r,n),xr.subVectors(e,n);const l=hi.dot(xr),c=fi.dot(xr);if(l<=0&&c<=0)return t.copy(n);vr.subVectors(e,s);const d=hi.dot(vr),u=fi.dot(vr);if(d>=0&&u<=d)return t.copy(s);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(hi,o);Sr.subVectors(e,r);const h=hi.dot(Sr),g=fi.dot(Sr);if(g>=0&&h<=g)return t.copy(r);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(fi,a);const m=d*g-h*u;if(m<=0&&u-d>=0&&h-g>=0)return ho.subVectors(r,s),a=(u-d)/(u-d+(h-g)),t.copy(s).addScaledVector(ho,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(hi,o).addScaledVector(fi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},In={h:0,s:0,l:0},fs={h:0,s:0,l:0};function Mr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Ud(e,1),t=Gt(t,0,1),n=Gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Mr(o,r,e+1/3),this.g=Mr(o,r,e),this.b=Mr(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=Tt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=xl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return Ze.fromWorkingColorSpace(Rt.copy(this),e),Math.round(Gt(Rt.r*255,0,255))*65536+Math.round(Gt(Rt.g*255,0,255))*256+Math.round(Gt(Rt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,r=Rt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=d<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Tt){Ze.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(In),this.setHSL(In.h+e,In.s+t,In.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(In),e.getHSL(fs);const n=lr(In.h,fs.h,t),s=lr(In.s,fs.s,t),r=lr(In.l,fs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Xe;Xe.NAMES=xl;let Yd=0;class ln extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=wi,this.side=_n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kr,this.blendDst=Br,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==_n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==kr&&(n.blendSrc=this.blendSrc),this.blendDst!==Br&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ka&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pt extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new U,ps=new Ke;class gn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ps.fromBufferAttribute(this,t),ps.applyMatrix3(e),this.setXY(t,ps.x,ps.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ja&&(e.usage=this.usage),e}}class vl extends gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Sl extends gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class cn extends gn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let qd=0;const Kt=new St,Er=new Vt,pi=new U,Xt=new Qi,Wi=new Qi,xt=new U;class yn extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fl(e)?Sl:vl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return Er.lookAt(e),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new cn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Xt.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Wi.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Xt.min,Wi.min),Xt.expandByPoint(xt),xt.addVectors(Xt.max,Wi.max),Xt.expandByPoint(xt)):(Xt.expandByPoint(Wi.min),Xt.expandByPoint(Wi.max))}Xt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)xt.fromBufferAttribute(a,c),l&&(pi.fromBufferAttribute(e,c),xt.add(pi)),s=Math.max(s,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let T=0;T<a;T++)c[T]=new U,d[T]=new U;const u=new U,f=new U,h=new U,g=new Ke,_=new Ke,m=new Ke,p=new U,E=new U;function x(T,B,V){u.fromArray(s,T*3),f.fromArray(s,B*3),h.fromArray(s,V*3),g.fromArray(o,T*2),_.fromArray(o,B*2),m.fromArray(o,V*2),f.sub(u),h.sub(u),_.sub(g),m.sub(g);const ie=1/(_.x*m.y-m.x*_.y);isFinite(ie)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(h,-_.y).multiplyScalar(ie),E.copy(h).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(ie),c[T].add(p),c[B].add(p),c[V].add(p),d[T].add(E),d[B].add(E),d[V].add(E))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let T=0,B=b.length;T<B;++T){const V=b[T],ie=V.start,P=V.count;for(let k=ie,G=ie+P;k<G;k+=3)x(n[k+0],n[k+1],n[k+2])}const C=new U,A=new U,w=new U,H=new U;function v(T){w.fromArray(r,T*3),H.copy(w);const B=c[T];C.copy(B),C.sub(w.multiplyScalar(w.dot(B))).normalize(),A.crossVectors(H,B);const ie=A.dot(d[T])<0?-1:1;l[T*4]=C.x,l[T*4+1]=C.y,l[T*4+2]=C.z,l[T*4+3]=ie}for(let T=0,B=b.length;T<B;++T){const V=b[T],ie=V.start,P=V.count;for(let k=ie,G=ie+P;k<G;k+=3)v(n[k+0]),v(n[k+1]),v(n[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,d=new U,u=new U;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,u=a.normalized,f=new c.constructor(l.length*d);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*d;for(let p=0;p<d;p++)f[g++]=c[h++]}return new gn(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fo=new St,$n=new _l,ms=new Xs,po=new U,mi=new U,gi=new U,_i=new U,Tr=new U,gs=new U,_s=new Ke,ys=new Ke,xs=new Ke,mo=new U,go=new U,_o=new U,vs=new U,Ss=new U;class tt extends Vt{constructor(e=new yn,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){gs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],u=r[l];d!==0&&(Tr.fromBufferAttribute(u,e),o?gs.addScaledVector(Tr,d):gs.addScaledVector(Tr.sub(t),d))}t.add(gs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(r),$n.copy(e.ray).recast(e.near),!(ms.containsPoint($n.origin)===!1&&($n.intersectSphere(ms,po)===null||$n.origin.distanceToSquared(po)>(e.far-e.near)**2))&&(fo.copy(r).invert(),$n.copy(e.ray).applyMatrix4(fo),!(n.boundingBox!==null&&$n.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,$n)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],E=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let b=E,C=x;b<C;b+=3){const A=a.getX(b),w=a.getX(b+1),H=a.getX(b+2);s=Ms(this,p,e,n,c,d,u,A,w,H),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const E=a.getX(m),x=a.getX(m+1),b=a.getX(m+2);s=Ms(this,o,e,n,c,d,u,E,x,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],E=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let b=E,C=x;b<C;b+=3){const A=b,w=b+1,H=b+2;s=Ms(this,p,e,n,c,d,u,A,w,H),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const E=m,x=m+1,b=m+2;s=Ms(this,o,e,n,c,d,u,E,x,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function jd(i,e,t,n,s,r,o,a){let l;if(e.side===Ht?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===_n,a),l===null)return null;Ss.copy(a),Ss.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ss);return c<t.near||c>t.far?null:{distance:c,point:Ss.clone(),object:i}}function Ms(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,mi),i.getVertexPosition(l,gi),i.getVertexPosition(c,_i);const d=jd(i,e,t,n,mi,gi,_i,vs);if(d){s&&(_s.fromBufferAttribute(s,a),ys.fromBufferAttribute(s,l),xs.fromBufferAttribute(s,c),d.uv=rn.getInterpolation(vs,mi,gi,_i,_s,ys,xs,new Ke)),r&&(_s.fromBufferAttribute(r,a),ys.fromBufferAttribute(r,l),xs.fromBufferAttribute(r,c),d.uv1=rn.getInterpolation(vs,mi,gi,_i,_s,ys,xs,new Ke),d.uv2=d.uv1),o&&(mo.fromBufferAttribute(o,a),go.fromBufferAttribute(o,l),_o.fromBufferAttribute(o,c),d.normal=rn.getInterpolation(vs,mi,gi,_i,mo,go,_o,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new U,materialIndex:0};rn.getNormal(mi,gi,_i,u.normal),d.face=u}return d}class es extends yn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],u=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new cn(c,3)),this.setAttribute("normal",new cn(d,3)),this.setAttribute("uv",new cn(u,2));function g(_,m,p,E,x,b,C,A,w,H,v){const T=b/w,B=C/H,V=b/2,ie=C/2,P=A/2,k=w+1,G=H+1;let X=0,W=0;const $=new U;for(let Y=0;Y<G;Y++){const Q=Y*B-ie;for(let ee=0;ee<k;ee++){const z=ee*T-V;$[_]=z*E,$[m]=Q*x,$[p]=P,c.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[p]=A>0?1:-1,d.push($.x,$.y,$.z),u.push(ee/w),u.push(1-Y/H),X+=1}}for(let Y=0;Y<H;Y++)for(let Q=0;Q<w;Q++){const ee=f+Q+k*Y,z=f+Q+k*(Y+1),q=f+(Q+1)+k*(Y+1),ce=f+(Q+1)+k*Y;l.push(ee,z,ce),l.push(z,q,ce),W+=6}a.addGroup(h,W,v),h+=W,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ni(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function kt(i){const e={};for(let t=0;t<i.length;t++){const n=Ni(i[t]);for(const s in n)e[s]=n[s]}return e}function Zd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ml(i){return i.getRenderTarget()===null?i.outputColorSpace:Ze.workingColorSpace}const Kd={clone:Ni,merge:kt};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class si extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ni(e.uniforms),this.uniformsGroups=Zd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class El extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class an extends El{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$r*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(or*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $r*2*Math.atan(Math.tan(or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(or*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,xi=1;class eu extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(yi,xi,e,t);s.layers=this.layers,this.add(s);const r=new an(yi,xi,e,t);r.layers=this.layers,this.add(r);const o=new an(yi,xi,e,t);o.layers=this.layers,this.add(o);const a=new an(yi,xi,e,t);a.layers=this.layers,this.add(a);const l=new an(yi,xi,e,t);l.layers=this.layers,this.add(l);const c=new an(yi,xi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Tl extends Bt{constructor(e,t,n,s,r,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Ui,super(e,t,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tu extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Xi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ni?Tt:Qt),this.texture=new Tl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new es(5,5,5),r=new si({name:"CubemapFromEquirect",uniforms:Ni(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:kn});r.uniforms.tEquirect.value=t;const o=new tt(s,r),a=t.minFilter;return t.minFilter===qi&&(t.minFilter=Jt),new eu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const br=new U,nu=new U,iu=new ze;class qn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=br.subVectors(n,t).cross(nu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(br),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||iu.getNormalMatrix(e),s=this.coplanarPoint(br).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new Xs,Es=new U;class bl{constructor(e=new qn,t=new qn,n=new qn,s=new qn,r=new qn,o=new qn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],u=s[6],f=s[7],h=s[8],g=s[9],_=s[10],m=s[11],p=s[12],E=s[13],x=s[14],b=s[15];if(n[0].setComponents(l-r,f-c,m-h,b-p).normalize(),n[1].setComponents(l+r,f+c,m+h,b+p).normalize(),n[2].setComponents(l+o,f+d,m+g,b+E).normalize(),n[3].setComponents(l-o,f-d,m-g,b-E).normalize(),n[4].setComponents(l-a,f-u,m-_,b-x).normalize(),t===Rn)n[5].setComponents(l+a,f+u,m+_,b+x).normalize();else if(t===zs)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(e){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Es.x=s.normal.x>0?e.max.x:e.min.x,Es.y=s.normal.y>0?e.max.y:e.min.y,Es.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Al(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function su(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,d){const u=c.array,f=c.usage,h=u.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,u,f),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:h}}function r(c,d,u){const f=d.array,h=d._updateRange,g=d.updateRanges;if(i.bindBuffer(u,c),h.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}h.count!==-1&&(t?i.bufferSubData(u,h.offset*f.BYTES_PER_ELEMENT,f,h.offset,h.count):i.bufferSubData(u,h.offset*f.BYTES_PER_ELEMENT,f.subarray(h.offset,h.offset+h.count)),h.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,s(c,d));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,d),u.version=c.version}}return{get:o,remove:a,update:l}}class ct extends yn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,u=e/a,f=t/l,h=[],g=[],_=[],m=[];for(let p=0;p<d;p++){const E=p*f-o;for(let x=0;x<c;x++){const b=x*u-r;g.push(b,-E,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){const x=E+c*p,b=E+c*(p+1),C=E+1+c*(p+1),A=E+1+c*p;h.push(x,b,A),h.push(b,C,A)}this.setIndex(h),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(_,3)),this.setAttribute("uv",new cn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.width,e.height,e.widthSegments,e.heightSegments)}}var ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,au=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ou=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,du=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,mu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_u=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Au=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ru=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Lu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Du=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Ou=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$u=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ju=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ku=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ju=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Qu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,th=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ih=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ah=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ch=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,uh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,hh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ph=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_h=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,vh=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Sh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Mh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Eh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Th=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ah=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ch=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ph=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dh=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ih=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Oh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Gh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$h=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,af=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,df=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ff=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ef=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Af=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Pf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Df=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Of=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:ru,alphahash_pars_fragment:au,alphamap_fragment:ou,alphamap_pars_fragment:lu,alphatest_fragment:cu,alphatest_pars_fragment:du,aomap_fragment:uu,aomap_pars_fragment:hu,batching_pars_vertex:fu,batching_vertex:pu,begin_vertex:mu,beginnormal_vertex:gu,bsdfs:_u,iridescence_fragment:yu,bumpmap_pars_fragment:xu,clipping_planes_fragment:vu,clipping_planes_pars_fragment:Su,clipping_planes_pars_vertex:Mu,clipping_planes_vertex:Eu,color_fragment:Tu,color_pars_fragment:bu,color_pars_vertex:Au,color_vertex:wu,common:Ru,cube_uv_reflection_fragment:Cu,defaultnormal_vertex:Pu,displacementmap_pars_vertex:Lu,displacementmap_vertex:Uu,emissivemap_fragment:Du,emissivemap_pars_fragment:Iu,colorspace_fragment:Nu,colorspace_pars_fragment:Fu,envmap_fragment:Ou,envmap_common_pars_fragment:ku,envmap_pars_fragment:Bu,envmap_pars_vertex:zu,envmap_physical_pars_fragment:Ju,envmap_vertex:Gu,fog_vertex:Hu,fog_pars_vertex:Vu,fog_fragment:Wu,fog_pars_fragment:$u,gradientmap_pars_fragment:Xu,lightmap_fragment:Yu,lightmap_pars_fragment:qu,lights_lambert_fragment:ju,lights_lambert_pars_fragment:Zu,lights_pars_begin:Ku,lights_toon_fragment:Qu,lights_toon_pars_fragment:eh,lights_phong_fragment:th,lights_phong_pars_fragment:nh,lights_physical_fragment:ih,lights_physical_pars_fragment:sh,lights_fragment_begin:rh,lights_fragment_maps:ah,lights_fragment_end:oh,logdepthbuf_fragment:lh,logdepthbuf_pars_fragment:ch,logdepthbuf_pars_vertex:dh,logdepthbuf_vertex:uh,map_fragment:hh,map_pars_fragment:fh,map_particle_fragment:ph,map_particle_pars_fragment:mh,metalnessmap_fragment:gh,metalnessmap_pars_fragment:_h,morphcolor_vertex:yh,morphnormal_vertex:xh,morphtarget_pars_vertex:vh,morphtarget_vertex:Sh,normal_fragment_begin:Mh,normal_fragment_maps:Eh,normal_pars_fragment:Th,normal_pars_vertex:bh,normal_vertex:Ah,normalmap_pars_fragment:wh,clearcoat_normal_fragment_begin:Rh,clearcoat_normal_fragment_maps:Ch,clearcoat_pars_fragment:Ph,iridescence_pars_fragment:Lh,opaque_fragment:Uh,packing:Dh,premultiplied_alpha_fragment:Ih,project_vertex:Nh,dithering_fragment:Fh,dithering_pars_fragment:Oh,roughnessmap_fragment:kh,roughnessmap_pars_fragment:Bh,shadowmap_pars_fragment:zh,shadowmap_pars_vertex:Gh,shadowmap_vertex:Hh,shadowmask_pars_fragment:Vh,skinbase_vertex:Wh,skinning_pars_vertex:$h,skinning_vertex:Xh,skinnormal_vertex:Yh,specularmap_fragment:qh,specularmap_pars_fragment:jh,tonemapping_fragment:Zh,tonemapping_pars_fragment:Kh,transmission_fragment:Jh,transmission_pars_fragment:Qh,uv_pars_fragment:ef,uv_pars_vertex:tf,uv_vertex:nf,worldpos_vertex:sf,background_vert:rf,background_frag:af,backgroundCube_vert:of,backgroundCube_frag:lf,cube_vert:cf,cube_frag:df,depth_vert:uf,depth_frag:hf,distanceRGBA_vert:ff,distanceRGBA_frag:pf,equirect_vert:mf,equirect_frag:gf,linedashed_vert:_f,linedashed_frag:yf,meshbasic_vert:xf,meshbasic_frag:vf,meshlambert_vert:Sf,meshlambert_frag:Mf,meshmatcap_vert:Ef,meshmatcap_frag:Tf,meshnormal_vert:bf,meshnormal_frag:Af,meshphong_vert:wf,meshphong_frag:Rf,meshphysical_vert:Cf,meshphysical_frag:Pf,meshtoon_vert:Lf,meshtoon_frag:Uf,points_vert:Df,points_frag:If,shadow_vert:Nf,shadow_frag:Ff,sprite_vert:Of,sprite_frag:kf},ne={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},mn={basic:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:kt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:kt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:kt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:kt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:kt([ne.points,ne.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:kt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:kt([ne.common,ne.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:kt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:kt([ne.sprite,ne.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:kt([ne.common,ne.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:kt([ne.lights,ne.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};mn.physical={uniforms:kt([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Ts={r:0,b:0,g:0};function Bf(i,e,t,n,s,r,o){const a=new Xe(0);let l=r===!0?0:1,c,d,u=null,f=0,h=null;function g(m,p){let E=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),E=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ws)?(d===void 0&&(d=new tt(new es(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:Ni(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=Ze.getTransfer(x.colorSpace)!==nt,(u!==x||f!==x.version||h!==i.toneMapping)&&(d.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new tt(new ct(2,2),new si({name:"BackgroundMaterial",uniforms:Ni(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(Ts,Ml(i)),n.buffers.color.setClear(Ts.r,Ts.g,Ts.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function zf(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=m(null);let c=l,d=!1;function u(P,k,G,X,W){let $=!1;if(o){const Y=_(X,G,k);c!==Y&&(c=Y,h(c.object)),$=p(P,X,G,W),$&&E(P,X,G,W)}else{const Y=k.wireframe===!0;(c.geometry!==X.id||c.program!==G.id||c.wireframe!==Y)&&(c.geometry=X.id,c.program=G.id,c.wireframe=Y,$=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),($||d)&&(d=!1,H(P,k,G,X),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function h(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,k,G){const X=G.wireframe===!0;let W=a[P.id];W===void 0&&(W={},a[P.id]=W);let $=W[k.id];$===void 0&&($={},W[k.id]=$);let Y=$[X];return Y===void 0&&(Y=m(f()),$[X]=Y),Y}function m(P){const k=[],G=[],X=[];for(let W=0;W<s;W++)k[W]=0,G[W]=0,X[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:G,attributeDivisors:X,object:P,attributes:{},index:null}}function p(P,k,G,X){const W=c.attributes,$=k.attributes;let Y=0;const Q=G.getAttributes();for(const ee in Q)if(Q[ee].location>=0){const q=W[ee];let ce=$[ee];if(ce===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),q===void 0||q.attribute!==ce||ce&&q.data!==ce.data)return!0;Y++}return c.attributesNum!==Y||c.index!==X}function E(P,k,G,X){const W={},$=k.attributes;let Y=0;const Q=G.getAttributes();for(const ee in Q)if(Q[ee].location>=0){let q=$[ee];q===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));const ce={};ce.attribute=q,q&&q.data&&(ce.data=q.data),W[ee]=ce,Y++}c.attributes=W,c.attributesNum=Y,c.index=X}function x(){const P=c.newAttributes;for(let k=0,G=P.length;k<G;k++)P[k]=0}function b(P){C(P,0)}function C(P,k){const G=c.newAttributes,X=c.enabledAttributes,W=c.attributeDivisors;G[P]=1,X[P]===0&&(i.enableVertexAttribArray(P),X[P]=1),W[P]!==k&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,k),W[P]=k)}function A(){const P=c.newAttributes,k=c.enabledAttributes;for(let G=0,X=k.length;G<X;G++)k[G]!==P[G]&&(i.disableVertexAttribArray(G),k[G]=0)}function w(P,k,G,X,W,$,Y){Y===!0?i.vertexAttribIPointer(P,k,G,W,$):i.vertexAttribPointer(P,k,G,X,W,$)}function H(P,k,G,X){if(n.isWebGL2===!1&&(P.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=X.attributes,$=G.getAttributes(),Y=k.defaultAttributeValues;for(const Q in $){const ee=$[Q];if(ee.location>=0){let z=W[Q];if(z===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(z=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(z=P.instanceColor)),z!==void 0){const q=z.normalized,ce=z.itemSize,_e=t.get(z);if(_e===void 0)continue;const ge=_e.buffer,Pe=_e.type,Ue=_e.bytesPerElement,Ee=n.isWebGL2===!0&&(Pe===i.INT||Pe===i.UNSIGNED_INT||z.gpuType===sl);if(z.isInterleavedBufferAttribute){const Ve=z.data,D=Ve.stride,It=z.offset;if(Ve.isInstancedInterleavedBuffer){for(let xe=0;xe<ee.locationSize;xe++)C(ee.location+xe,Ve.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let xe=0;xe<ee.locationSize;xe++)b(ee.location+xe);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let xe=0;xe<ee.locationSize;xe++)w(ee.location+xe,ce/ee.locationSize,Pe,q,D*Ue,(It+ce/ee.locationSize*xe)*Ue,Ee)}else{if(z.isInstancedBufferAttribute){for(let Ve=0;Ve<ee.locationSize;Ve++)C(ee.location+Ve,z.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ve=0;Ve<ee.locationSize;Ve++)b(ee.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Ve=0;Ve<ee.locationSize;Ve++)w(ee.location+Ve,ce/ee.locationSize,Pe,q,ce*Ue,ce/ee.locationSize*Ve*Ue,Ee)}}else if(Y!==void 0){const q=Y[Q];if(q!==void 0)switch(q.length){case 2:i.vertexAttrib2fv(ee.location,q);break;case 3:i.vertexAttrib3fv(ee.location,q);break;case 4:i.vertexAttrib4fv(ee.location,q);break;default:i.vertexAttrib1fv(ee.location,q)}}}}A()}function v(){V();for(const P in a){const k=a[P];for(const G in k){const X=k[G];for(const W in X)g(X[W].object),delete X[W];delete k[G]}delete a[P]}}function T(P){if(a[P.id]===void 0)return;const k=a[P.id];for(const G in k){const X=k[G];for(const W in X)g(X[W].object),delete X[W];delete k[G]}delete a[P.id]}function B(P){for(const k in a){const G=a[k];if(G[P.id]===void 0)continue;const X=G[P.id];for(const W in X)g(X[W].object),delete X[W];delete G[P.id]}}function V(){ie(),d=!0,c!==l&&(c=l,h(c.object))}function ie(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:V,resetDefaultState:ie,dispose:v,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:b,disableUnusedAttributes:A}}function Gf(i,e,t,n){const s=n.isWebGL2;let r;function o(d){r=d}function a(d,u){i.drawArrays(r,d,u),t.update(u,r,1)}function l(d,u,f){if(f===0)return;let h,g;if(s)h=i,g="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[g](r,d,u,f),t.update(u,r,f)}function c(d,u,f){if(f===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<f;g++)this.render(d[g],u[g]);else{h.multiDrawArraysWEBGL(r,d,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Hf(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,b=o||e.has("OES_texture_float"),C=x&&b,A=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:d,maxTextures:u,maxVertexTextures:f,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:E,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:A}}function Vf(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new qn,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||s;return s=f,n=u.length,h},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const E=r?0:n,x=E*4;let b=p.clippingState||null;l.value=b,b=d(g,f,x,h);for(let C=0;C!==x;++C)b[C]=t[C];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,h,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=h;x!==_;++x,b+=4)o.copy(u[x]).applyMatrix4(E,a),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Wf(i){let e=new WeakMap;function t(o,a){return a===zr?o.mapping=Ui:a===Gr&&(o.mapping=Di),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===zr||a===Gr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tu(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class wl extends El{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bi=4,yo=[.125,.215,.35,.446,.526,.582],Qn=20,Ar=new wl,xo=new Xe;let wr=null,Rr=0,Cr=0;const jn=(1+Math.sqrt(5))/2,vi=1/jn,vo=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,jn,vi),new U(0,jn,-vi),new U(vi,0,jn),new U(-vi,0,jn),new U(jn,vi,0),new U(-jn,vi,0)];class So{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){wr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=To(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Eo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wr,Rr,Cr),e.scissorTest=!1,bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:ji,format:on,colorSpace:Cn,depthBuffer:!1},s=Mo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mo(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$f(r)),this._blurMaterial=Xf(r,e,t)}return s}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,Ar)}_sceneToCubeUV(e,t,n,s){const a=new an(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(xo),d.toneMapping=Bn,d.autoClear=!1;const h=new pt({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),g=new tt(new es,h);let _=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,_=!0):(h.color.copy(xo),_=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):E===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;bs(s,E*x,p>2?x:0,x,x),d.setRenderTarget(s),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ui||e.mapping===Di;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=To()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Eo());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new tt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ar)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=vo[(s-1)%vo.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new tt(this._lodPlanes[s],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Qn-1),_=r/g,m=isFinite(r)?1+Math.floor(d*_):Qn;m>Qn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qn}`);const p=[];let E=0;for(let w=0;w<Qn;++w){const H=w/_,v=Math.exp(-H*H/2);p.push(v),w===0?E+=v:w<m&&(E+=2*v)}for(let w=0;w<p.length;w++)p[w]=p[w]/E;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const b=this._sizeLods[s],C=3*b*(s>x-bi?s-x+bi:0),A=4*(this._cubeSize-b);bs(t,C,A,3*b,2*b),l.setRenderTarget(t),l.render(u,Ar)}}function $f(i){const e=[],t=[],n=[];let s=i;const r=i-bi+1+yo.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-bi?l=yo[o-i+bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],h=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*h),x=new Float32Array(m*g*h),b=new Float32Array(p*g*h);for(let A=0;A<h;A++){const w=A%3*2/3-1,H=A>2?0:-1,v=[w,H,0,w+2/3,H,0,w+2/3,H+1,0,w,H,0,w+2/3,H+1,0,w,H+1,0];E.set(v,_*g*A),x.set(f,m*g*A);const T=[A,A,A,A,A,A];b.set(T,p*g*A)}const C=new yn;C.setAttribute("position",new gn(E,_)),C.setAttribute("uv",new gn(x,m)),C.setAttribute("faceIndex",new gn(b,p)),e.push(C),s>bi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Mo(i,e,t){const n=new ii(i,e,t);return n.texture.mapping=Ws,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Xf(i,e,t){const n=new Float32Array(Qn),s=new U(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Eo(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function To(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function ta(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Yf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===zr||l===Gr,d=l===Ui||l===Di;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new So(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||d&&u&&s(u)){t===null&&(t=new So(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function qf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function jf(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const h=u.morphAttributes;for(const g in h){const _=h[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const f=[],h=u.index,g=u.attributes.position;let _=0;if(h!==null){const E=h.array;_=h.version;for(let x=0,b=E.length;x<b;x+=3){const C=E[x+0],A=E[x+1],w=E[x+2];f.push(C,A,A,w,w,C)}}else if(g!==void 0){const E=g.array;_=g.version;for(let x=0,b=E.length/3-1;x<b;x+=3){const C=x+0,A=x+1,w=x+2;f.push(C,A,A,w,w,C)}}else return;const m=new(fl(f)?Sl:vl)(f,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const f=r.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function Zf(i,e,t,n){const s=n.isWebGL2;let r;function o(h){r=h}let a,l;function c(h){a=h.type,l=h.bytesPerElement}function d(h,g){i.drawElements(r,g,a,h*l),t.update(g,r,1)}function u(h,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,h*l,_),t.update(g,r,_)}function f(h,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(h[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,h,0,_);let p=0;for(let E=0;E<_;E++)p+=g[E];t.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=u,this.renderMultiDraw=f}function Kf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Jf(i,e){return i[0]-e[0]}function Qf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ep(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new bt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(d);if(m===void 0||m.count!==_){let k=function(){ie.dispose(),r.delete(d),d.removeEventListener("dispose",k)};var h=k;m!==void 0&&m.texture.dispose();const x=d.morphAttributes.position!==void 0,b=d.morphAttributes.normal!==void 0,C=d.morphAttributes.color!==void 0,A=d.morphAttributes.position||[],w=d.morphAttributes.normal||[],H=d.morphAttributes.color||[];let v=0;x===!0&&(v=1),b===!0&&(v=2),C===!0&&(v=3);let T=d.attributes.position.count*v,B=1;T>e.maxTextureSize&&(B=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const V=new Float32Array(T*B*4*_),ie=new gl(V,T,B,_);ie.type=On,ie.needsUpdate=!0;const P=v*4;for(let G=0;G<_;G++){const X=A[G],W=w[G],$=H[G],Y=T*B*4*G;for(let Q=0;Q<X.count;Q++){const ee=Q*P;x===!0&&(o.fromBufferAttribute(X,Q),V[Y+ee+0]=o.x,V[Y+ee+1]=o.y,V[Y+ee+2]=o.z,V[Y+ee+3]=0),b===!0&&(o.fromBufferAttribute(W,Q),V[Y+ee+4]=o.x,V[Y+ee+5]=o.y,V[Y+ee+6]=o.z,V[Y+ee+7]=0),C===!0&&(o.fromBufferAttribute($,Q),V[Y+ee+8]=o.x,V[Y+ee+9]=o.y,V[Y+ee+10]=o.z,V[Y+ee+11]=$.itemSize===4?o.w:1)}}m={count:_,texture:ie,size:new Ke(T,B)},r.set(d,m),d.addEventListener("dispose",k)}let p=0;for(let x=0;x<f.length;x++)p+=f[x];const E=d.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",E),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=n[d.id];if(_===void 0||_.length!==g){_=[];for(let b=0;b<g;b++)_[b]=[b,0];n[d.id]=_}for(let b=0;b<g;b++){const C=_[b];C[0]=b,C[1]=f[b]}_.sort(Qf);for(let b=0;b<8;b++)b<g&&_[b][1]?(a[b][0]=_[b][0],a[b][1]=_[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(Jf);const m=d.morphAttributes.position,p=d.morphAttributes.normal;let E=0;for(let b=0;b<8;b++){const C=a[b],A=C[0],w=C[1];A!==Number.MAX_SAFE_INTEGER&&w?(m&&d.getAttribute("morphTarget"+b)!==m[A]&&d.setAttribute("morphTarget"+b,m[A]),p&&d.getAttribute("morphNormal"+b)!==p[A]&&d.setAttribute("morphNormal"+b,p[A]),s[b]=w,E+=w):(m&&d.hasAttribute("morphTarget"+b)===!0&&d.deleteAttribute("morphTarget"+b),p&&d.hasAttribute("morphNormal"+b)===!0&&d.deleteAttribute("morphNormal"+b),s[b]=0)}const x=d.morphTargetsRelative?1:1-E;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function tp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Rl extends Bt{constructor(e,t,n,s,r,o,a,l,c,d){if(d=d!==void 0?d:ti,d!==ti&&d!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===ti&&(n=Fn),n===void 0&&d===Ii&&(n=ei),super(null,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Cl=new Bt,Pl=new Rl(1,1);Pl.compareFunction=hl;const Ll=new gl,Ul=new kd,Dl=new Tl,bo=[],Ao=[],wo=new Float32Array(16),Ro=new Float32Array(9),Co=new Float32Array(4);function Oi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=bo[s];if(r===void 0&&(r=new Float32Array(s),bo[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function qs(i,e){let t=Ao[e];t===void 0&&(t=new Int32Array(e),Ao[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function ap(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Co.set(n),i.uniformMatrix2fv(this.addr,!1,Co),gt(t,n)}}function op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ro.set(n),i.uniformMatrix3fv(this.addr,!1,Ro),gt(t,n)}}function lp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;wo.set(n),i.uniformMatrix4fv(this.addr,!1,wo),gt(t,n)}}function cp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function fp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function _p(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Pl:Cl;t.setTexture2D(e||r,s)}function yp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ul,s)}function xp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Dl,s)}function vp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ll,s)}function Sp(i){switch(i){case 5126:return np;case 35664:return ip;case 35665:return sp;case 35666:return rp;case 35674:return ap;case 35675:return op;case 35676:return lp;case 5124:case 35670:return cp;case 35667:case 35671:return dp;case 35668:case 35672:return up;case 35669:case 35673:return hp;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return yp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return vp}}function Mp(i,e){i.uniform1fv(this.addr,e)}function Ep(i,e){const t=Oi(e,this.size,2);i.uniform2fv(this.addr,t)}function Tp(i,e){const t=Oi(e,this.size,3);i.uniform3fv(this.addr,t)}function bp(i,e){const t=Oi(e,this.size,4);i.uniform4fv(this.addr,t)}function Ap(i,e){const t=Oi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function wp(i,e){const t=Oi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rp(i,e){const t=Oi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Cp(i,e){i.uniform1iv(this.addr,e)}function Pp(i,e){i.uniform2iv(this.addr,e)}function Lp(i,e){i.uniform3iv(this.addr,e)}function Up(i,e){i.uniform4iv(this.addr,e)}function Dp(i,e){i.uniform1uiv(this.addr,e)}function Ip(i,e){i.uniform2uiv(this.addr,e)}function Np(i,e){i.uniform3uiv(this.addr,e)}function Fp(i,e){i.uniform4uiv(this.addr,e)}function Op(i,e,t){const n=this.cache,s=e.length,r=qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Cl,r[o])}function kp(i,e,t){const n=this.cache,s=e.length,r=qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ul,r[o])}function Bp(i,e,t){const n=this.cache,s=e.length,r=qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Dl,r[o])}function zp(i,e,t){const n=this.cache,s=e.length,r=qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ll,r[o])}function Gp(i){switch(i){case 5126:return Mp;case 35664:return Ep;case 35665:return Tp;case 35666:return bp;case 35674:return Ap;case 35675:return wp;case 35676:return Rp;case 5124:case 35670:return Cp;case 35667:case 35671:return Pp;case 35668:case 35672:return Lp;case 35669:case 35673:return Up;case 5125:return Dp;case 36294:return Ip;case 36295:return Np;case 36296:return Fp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Bp;case 36289:case 36303:case 36311:case 36292:return zp}}class Hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sp(t.type)}}class Vp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gp(t.type)}}class Wp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Pr=/(\w+)(\])?(\[|\.)?/g;function Po(i,e){i.seq.push(e),i.map[e.id]=e}function $p(i,e,t){const n=i.name,s=n.length;for(Pr.lastIndex=0;;){const r=Pr.exec(n),o=Pr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Po(t,c===void 0?new Hp(a,i,e):new Vp(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Wp(a),Po(t,u)),t=u}}}class Ps{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);$p(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Lo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Xp=37297;let Yp=0;function qp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function jp(i){const e=Ze.getPrimaries(Ze.workingColorSpace),t=Ze.getPrimaries(i);let n;switch(e===t?n="":e===Bs&&t===ks?n="LinearDisplayP3ToLinearSRGB":e===ks&&t===Bs&&(n="LinearSRGBToLinearDisplayP3"),i){case Cn:case $s:return[n,"LinearTransferOETF"];case Tt:case ea:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Uo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+qp(i.getShaderSource(e),o)}else return s}function Zp(i,e){const t=jp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Kp(i,e){let t;switch(e){case ad:t="Linear";break;case od:t="Reinhard";break;case ld:t="OptimizedCineon";break;case cd:t="ACESFilmic";break;case ud:t="AgX";break;case dd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Jp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ai).join(`
`)}function Qp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ai).join(`
`)}function em(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function tm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ai(i){return i!==""}function Do(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Io(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yr(i){return i.replace(nm,sm)}const im=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function sm(i,e){let t=Ie[e];if(t===void 0){const n=im.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Yr(t)}const rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function No(i){return i.replace(rm,am)}function am(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fo(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function om(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function lm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ui:case Di:e="ENVMAP_TYPE_CUBE";break;case Ws:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Di:e="ENVMAP_MODE_REFRACTION";break}return e}function dm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nl:e="ENVMAP_BLENDING_MULTIPLY";break;case sd:e="ENVMAP_BLENDING_MIX";break;case rd:e="ENVMAP_BLENDING_ADD";break}return e}function um(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function hm(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=om(t),c=lm(t),d=cm(t),u=dm(t),f=um(t),h=t.isWebGL2?"":Jp(t),g=Qp(t),_=em(r),m=s.createProgram();let p,E,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ai).join(`
`),p.length>0&&(p+=`
`),E=[h,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ai).join(`
`),E.length>0&&(E+=`
`)):(p=[Fo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ai).join(`
`),E=[h,Fo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Bn?Kp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Zp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ai).join(`
`)),o=Yr(o),o=Do(o,t),o=Io(o,t),a=Yr(a),a=Do(a,t),a=Io(a,t),o=No(o),a=No(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const b=x+p+o,C=x+E+a,A=Lo(s,s.VERTEX_SHADER,b),w=Lo(s,s.FRAGMENT_SHADER,C);s.attachShader(m,A),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function H(V){if(i.debug.checkShaderErrors){const ie=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(A).trim(),k=s.getShaderInfoLog(w).trim();let G=!0,X=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,A,w);else{const W=Uo(s,A,"vertex"),$=Uo(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+W+`
`+$)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(P===""||k==="")&&(X=!1);X&&(V.diagnostics={runnable:G,programLog:ie,vertexShader:{log:P,prefix:p},fragmentShader:{log:k,prefix:E}})}s.deleteShader(A),s.deleteShader(w),v=new Ps(s,m),T=tm(s,m)}let v;this.getUniforms=function(){return v===void 0&&H(this),v};let T;this.getAttributes=function(){return T===void 0&&H(this),T};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(m,Xp)),B},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=w,this}let fm=0;class pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new mm(e),t.set(e,n)),n}}class mm{constructor(e){this.id=fm++,this.code=e,this.usedTimes=0}}function gm(i,e,t,n,s,r,o){const a=new yl,l=new pm,c=[],d=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return v===0?"uv":`uv${v}`}function m(v,T,B,V,ie){const P=V.fog,k=ie.geometry,G=v.isMeshStandardMaterial?V.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||G),W=X&&X.mapping===Ws?X.image.height:null,$=g[v.type];v.precision!==null&&(h=s.getMaxPrecision(v.precision),h!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const Y=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Q=Y!==void 0?Y.length:0;let ee=0;k.morphAttributes.position!==void 0&&(ee=1),k.morphAttributes.normal!==void 0&&(ee=2),k.morphAttributes.color!==void 0&&(ee=3);let z,q,ce,_e;if($){const Nt=mn[$];z=Nt.vertexShader,q=Nt.fragmentShader}else z=v.vertexShader,q=v.fragmentShader,l.update(v),ce=l.getVertexShaderID(v),_e=l.getFragmentShaderID(v);const ge=i.getRenderTarget(),Pe=ie.isInstancedMesh===!0,Ue=ie.isBatchedMesh===!0,Ee=!!v.map,Ve=!!v.matcap,D=!!X,It=!!v.aoMap,xe=!!v.lightMap,Re=!!v.bumpMap,fe=!!v.normalMap,it=!!v.displacementMap,Ne=!!v.emissiveMap,M=!!v.metalnessMap,y=!!v.roughnessMap,N=v.anisotropy>0,K=v.clearcoat>0,Z=v.iridescence>0,J=v.sheen>0,pe=v.transmission>0,le=N&&!!v.anisotropyMap,ue=K&&!!v.clearcoatMap,Me=K&&!!v.clearcoatNormalMap,Fe=K&&!!v.clearcoatRoughnessMap,j=Z&&!!v.iridescenceMap,je=Z&&!!v.iridescenceThicknessMap,Ge=J&&!!v.sheenColorMap,Ae=J&&!!v.sheenRoughnessMap,ye=!!v.specularMap,he=!!v.specularColorMap,De=!!v.specularIntensityMap,Ye=pe&&!!v.transmissionMap,rt=pe&&!!v.thicknessMap,ke=!!v.gradientMap,te=!!v.alphaMap,R=v.alphaTest>0,ae=!!v.alphaHash,oe=!!v.extensions,Te=!!k.attributes.uv1,ve=!!k.attributes.uv2,Je=!!k.attributes.uv3;let Qe=Bn;return v.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Qe=i.toneMapping),{isWebGL2:d,shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:z,fragmentShader:q,defines:v.defines,customVertexShaderID:ce,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ue,instancing:Pe,instancingColor:Pe&&ie.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Cn,map:Ee,matcap:Ve,envMap:D,envMapMode:D&&X.mapping,envMapCubeUVHeight:W,aoMap:It,lightMap:xe,bumpMap:Re,normalMap:fe,displacementMap:f&&it,emissiveMap:Ne,normalMapObjectSpace:fe&&v.normalMapType===Td,normalMapTangentSpace:fe&&v.normalMapType===Ed,metalnessMap:M,roughnessMap:y,anisotropy:N,anisotropyMap:le,clearcoat:K,clearcoatMap:ue,clearcoatNormalMap:Me,clearcoatRoughnessMap:Fe,iridescence:Z,iridescenceMap:j,iridescenceThicknessMap:je,sheen:J,sheenColorMap:Ge,sheenRoughnessMap:Ae,specularMap:ye,specularColorMap:he,specularIntensityMap:De,transmission:pe,transmissionMap:Ye,thicknessMap:rt,gradientMap:ke,opaque:v.transparent===!1&&v.blending===wi,alphaMap:te,alphaTest:R,alphaHash:ae,combine:v.combine,mapUv:Ee&&_(v.map.channel),aoMapUv:It&&_(v.aoMap.channel),lightMapUv:xe&&_(v.lightMap.channel),bumpMapUv:Re&&_(v.bumpMap.channel),normalMapUv:fe&&_(v.normalMap.channel),displacementMapUv:it&&_(v.displacementMap.channel),emissiveMapUv:Ne&&_(v.emissiveMap.channel),metalnessMapUv:M&&_(v.metalnessMap.channel),roughnessMapUv:y&&_(v.roughnessMap.channel),anisotropyMapUv:le&&_(v.anisotropyMap.channel),clearcoatMapUv:ue&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Me&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:je&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(v.sheenRoughnessMap.channel),specularMapUv:ye&&_(v.specularMap.channel),specularColorMapUv:he&&_(v.specularColorMap.channel),specularIntensityMapUv:De&&_(v.specularIntensityMap.channel),transmissionMapUv:Ye&&_(v.transmissionMap.channel),thicknessMapUv:rt&&_(v.thicknessMap.channel),alphaMapUv:te&&_(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(fe||N),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:ve,vertexUv3s:Je,pointsUvs:ie.isPoints===!0&&!!k.attributes.uv&&(Ee||te),fog:!!P,useFog:v.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ie.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ee,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ee&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===wn,flipSided:v.side===Ht,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:oe&&v.extensions.derivatives===!0,extensionFragDepth:oe&&v.extensions.fragDepth===!0,extensionDrawBuffers:oe&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function p(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const B in v.defines)T.push(B),T.push(v.defines[B]);return v.isRawShaderMaterial===!1&&(E(T,v),x(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function E(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function x(v,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),v.push(a.mask)}function b(v){const T=g[v.type];let B;if(T){const V=mn[T];B=Kd.clone(V.uniforms)}else B=v.uniforms;return B}function C(v,T){let B;for(let V=0,ie=c.length;V<ie;V++){const P=c[V];if(P.cacheKey===T){B=P,++B.usedTimes;break}}return B===void 0&&(B=new hm(i,T,v,r),c.push(B)),B}function A(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),v.destroy()}}function w(v){l.remove(v)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:C,releaseProgram:A,releaseShaderCache:w,programs:c,dispose:H}}function _m(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function ym(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Oo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ko(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,h,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:h,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function a(u,f,h,g,_,m){const p=o(u,f,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):t.push(p)}function l(u,f,h,g,_,m){const p=o(u,f,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,f){t.length>1&&t.sort(u||ym),n.length>1&&n.sort(f||Oo),s.length>1&&s.sort(f||Oo)}function d(){for(let u=e,f=i.length;u<f;u++){const h=i[u];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function xm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new ko,i.set(n,[o])):s>=r.length?(o=new ko,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function vm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Xe};break;case"SpotLight":t={position:new U,direction:new U,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Sm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Mm=0;function Em(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tm(i,e){const t=new vm,n=Sm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new U);const r=new U,o=new St,a=new St;function l(d,u){let f=0,h=0,g=0;for(let V=0;V<9;V++)s.probe[V].set(0,0,0);let _=0,m=0,p=0,E=0,x=0,b=0,C=0,A=0,w=0,H=0,v=0;d.sort(Em);const T=u===!0?Math.PI:1;for(let V=0,ie=d.length;V<ie;V++){const P=d[V],k=P.color,G=P.intensity,X=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=k.r*G*T,h+=k.g*G*T,g+=k.b*G*T;else if(P.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(P.sh.coefficients[$],G);v++}else if(P.isDirectionalLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*T),P.castShadow){const Y=P.shadow,Q=n.get(P);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,s.directionalShadow[_]=Q,s.directionalShadowMap[_]=W,s.directionalShadowMatrix[_]=P.shadow.matrix,b++}s.directional[_]=$,_++}else if(P.isSpotLight){const $=t.get(P);$.position.setFromMatrixPosition(P.matrixWorld),$.color.copy(k).multiplyScalar(G*T),$.distance=X,$.coneCos=Math.cos(P.angle),$.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),$.decay=P.decay,s.spot[p]=$;const Y=P.shadow;if(P.map&&(s.spotLightMap[w]=P.map,w++,Y.updateMatrices(P),P.castShadow&&H++),s.spotLightMatrix[p]=Y.matrix,P.castShadow){const Q=n.get(P);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,s.spotShadow[p]=Q,s.spotShadowMap[p]=W,A++}p++}else if(P.isRectAreaLight){const $=t.get(P);$.color.copy(k).multiplyScalar(G),$.halfWidth.set(P.width*.5,0,0),$.halfHeight.set(0,P.height*.5,0),s.rectArea[E]=$,E++}else if(P.isPointLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*T),$.distance=P.distance,$.decay=P.decay,P.castShadow){const Y=P.shadow,Q=n.get(P);Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,Q.shadowCameraNear=Y.camera.near,Q.shadowCameraFar=Y.camera.far,s.pointShadow[m]=Q,s.pointShadowMap[m]=W,s.pointShadowMatrix[m]=P.shadow.matrix,C++}s.point[m]=$,m++}else if(P.isHemisphereLight){const $=t.get(P);$.skyColor.copy(P.color).multiplyScalar(G*T),$.groundColor.copy(P.groundColor).multiplyScalar(G*T),s.hemi[x]=$,x++}}E>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_FLOAT_1,s.rectAreaLTC2=ne.LTC_FLOAT_2):(s.rectAreaLTC1=ne.LTC_HALF_1,s.rectAreaLTC2=ne.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_FLOAT_1,s.rectAreaLTC2=ne.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ne.LTC_HALF_1,s.rectAreaLTC2=ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=h,s.ambient[2]=g;const B=s.hash;(B.directionalLength!==_||B.pointLength!==m||B.spotLength!==p||B.rectAreaLength!==E||B.hemiLength!==x||B.numDirectionalShadows!==b||B.numPointShadows!==C||B.numSpotShadows!==A||B.numSpotMaps!==w||B.numLightProbes!==v)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=E,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=A+w-H,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=v,B.directionalLength=_,B.pointLength=m,B.spotLength=p,B.rectAreaLength=E,B.hemiLength=x,B.numDirectionalShadows=b,B.numPointShadows=C,B.numSpotShadows=A,B.numSpotMaps=w,B.numLightProbes=v,s.version=Mm++)}function c(d,u){let f=0,h=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let E=0,x=d.length;E<x;E++){const b=d[E];if(b.isDirectionalLight){const C=s.directional[f];C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),f++}else if(b.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const C=s.rectArea[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(b.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const C=s.point[h];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(p),h++}else if(b.isHemisphereLight){const C=s.hemi[m];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function Bo(i,e){const t=new Tm(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function bm(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new Bo(i,e),t.set(r,[l])):o>=a.length?(l=new Bo(i,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Am extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wm extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Rm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Pm(i,e,t){let n=new bl;const s=new Ke,r=new Ke,o=new bt,a=new Am({depthPacking:Md}),l=new wm,c={},d=t.maxTextureSize,u={[_n]:Ht,[Ht]:_n,[wn]:wn},f=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:Rm,fragmentShader:Cm}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new yn;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new tt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let p=this.type;this.render=function(A,w,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const v=i.getRenderTarget(),T=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),V=i.state;V.setBlending(kn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const ie=p!==bn&&this.type===bn,P=p===bn&&this.type!==bn;for(let k=0,G=A.length;k<G;k++){const X=A[k],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const $=W.getFrameExtents();if(s.multiply($),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/$.x),s.x=r.x*$.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/$.y),s.y=r.y*$.y,W.mapSize.y=r.y)),W.map===null||ie===!0||P===!0){const Q=this.type!==bn?{minFilter:qe,magFilter:qe}:{};W.map!==null&&W.map.dispose(),W.map=new ii(s.x,s.y,Q),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const Y=W.getViewportCount();for(let Q=0;Q<Y;Q++){const ee=W.getViewport(Q);o.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),V.viewport(o),W.updateMatrices(X,Q),n=W.getFrustum(),b(w,H,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===bn&&E(W,H),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,T,B)};function E(A,w){const H=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ii(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,H,f,_,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,H,h,_,null)}function x(A,w,H,v){let T=null;const B=H.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)T=B;else if(T=H.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=T.uuid,ie=w.uuid;let P=c[V];P===void 0&&(P={},c[V]=P);let k=P[ie];k===void 0&&(k=T.clone(),P[ie]=k,w.addEventListener("dispose",C)),T=k}if(T.visible=w.visible,T.wireframe=w.wireframe,v===bn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:u[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,H.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const V=i.properties.get(T);V.light=H}return T}function b(A,w,H,v,T){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld);const ie=e.update(A),P=A.material;if(Array.isArray(P)){const k=ie.groups;for(let G=0,X=k.length;G<X;G++){const W=k[G],$=P[W.materialIndex];if($&&$.visible){const Y=x(A,$,v,T);A.onBeforeShadow(i,A,w,H,ie,Y,W),i.renderBufferDirect(H,null,ie,Y,A,W),A.onAfterShadow(i,A,w,H,ie,Y,W)}}}else if(P.visible){const k=x(A,P,v,T);A.onBeforeShadow(i,A,w,H,ie,k,null),i.renderBufferDirect(H,null,ie,k,A,null),A.onAfterShadow(i,A,w,H,ie,k,null)}}const V=A.children;for(let ie=0,P=V.length;ie<P;ie++)b(V[ie],w,H,v,T)}function C(A){A.target.removeEventListener("dispose",C);for(const H in c){const v=c[H],T=A.target.uuid;T in v&&(v[T].dispose(),delete v[T])}}}function Lm(i,e,t){const n=t.isWebGL2;function s(){let R=!1;const ae=new bt;let oe=null;const Te=new bt(0,0,0,0);return{setMask:function(ve){oe!==ve&&!R&&(i.colorMask(ve,ve,ve,ve),oe=ve)},setLocked:function(ve){R=ve},setClear:function(ve,Je,Qe,_t,Nt){Nt===!0&&(ve*=_t,Je*=_t,Qe*=_t),ae.set(ve,Je,Qe,_t),Te.equals(ae)===!1&&(i.clearColor(ve,Je,Qe,_t),Te.copy(ae))},reset:function(){R=!1,oe=null,Te.set(-1,0,0,0)}}}function r(){let R=!1,ae=null,oe=null,Te=null;return{setTest:function(ve){ve?Ue(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(ve){ae!==ve&&!R&&(i.depthMask(ve),ae=ve)},setFunc:function(ve){if(oe!==ve){switch(ve){case Kc:i.depthFunc(i.NEVER);break;case Jc:i.depthFunc(i.ALWAYS);break;case Qc:i.depthFunc(i.LESS);break;case Fs:i.depthFunc(i.LEQUAL);break;case ed:i.depthFunc(i.EQUAL);break;case td:i.depthFunc(i.GEQUAL);break;case nd:i.depthFunc(i.GREATER);break;case id:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=ve}},setLocked:function(ve){R=ve},setClear:function(ve){Te!==ve&&(i.clearDepth(ve),Te=ve)},reset:function(){R=!1,ae=null,oe=null,Te=null}}}function o(){let R=!1,ae=null,oe=null,Te=null,ve=null,Je=null,Qe=null,_t=null,Nt=null;return{setTest:function(et){R||(et?Ue(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(et){ae!==et&&!R&&(i.stencilMask(et),ae=et)},setFunc:function(et,Ft,dn){(oe!==et||Te!==Ft||ve!==dn)&&(i.stencilFunc(et,Ft,dn),oe=et,Te=Ft,ve=dn)},setOp:function(et,Ft,dn){(Je!==et||Qe!==Ft||_t!==dn)&&(i.stencilOp(et,Ft,dn),Je=et,Qe=Ft,_t=dn)},setLocked:function(et){R=et},setClear:function(et){Nt!==et&&(i.clearStencil(et),Nt=et)},reset:function(){R=!1,ae=null,oe=null,Te=null,ve=null,Je=null,Qe=null,_t=null,Nt=null}}}const a=new s,l=new r,c=new o,d=new WeakMap,u=new WeakMap;let f={},h={},g=new WeakMap,_=[],m=null,p=!1,E=null,x=null,b=null,C=null,A=null,w=null,H=null,v=new Xe(0,0,0),T=0,B=!1,V=null,ie=null,P=null,k=null,G=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,$=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=$>=1):Y.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=$>=2);let Q=null,ee={};const z=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),ce=new bt().fromArray(z),_e=new bt().fromArray(q);function ge(R,ae,oe,Te){const ve=new Uint8Array(4),Je=i.createTexture();i.bindTexture(R,Je),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<oe;Qe++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(ae,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(ae+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Je}const Pe={};Pe[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pe[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(i.DEPTH_TEST),l.setFunc(Fs),Ne(!1),M(xa),Ue(i.CULL_FACE),fe(kn);function Ue(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function Ee(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function Ve(R,ae){return h[R]!==ae?(i.bindFramebuffer(R,ae),h[R]=ae,n&&(R===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ae),R===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ae)),!0):!1}function D(R,ae){let oe=_,Te=!1;if(R)if(oe=g.get(ae),oe===void 0&&(oe=[],g.set(ae,oe)),R.isWebGLMultipleRenderTargets){const ve=R.texture;if(oe.length!==ve.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let Je=0,Qe=ve.length;Je<Qe;Je++)oe[Je]=i.COLOR_ATTACHMENT0+Je;oe.length=ve.length,Te=!0}}else oe[0]!==i.COLOR_ATTACHMENT0&&(oe[0]=i.COLOR_ATTACHMENT0,Te=!0);else oe[0]!==i.BACK&&(oe[0]=i.BACK,Te=!0);Te&&(t.isWebGL2?i.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function It(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const xe={[Jn]:i.FUNC_ADD,[Fc]:i.FUNC_SUBTRACT,[Oc]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[Ea]=i.MIN,xe[Ta]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(xe[Ea]=R.MIN_EXT,xe[Ta]=R.MAX_EXT)}const Re={[kc]:i.ZERO,[Bc]:i.ONE,[zc]:i.SRC_COLOR,[kr]:i.SRC_ALPHA,[Xc]:i.SRC_ALPHA_SATURATE,[Wc]:i.DST_COLOR,[Hc]:i.DST_ALPHA,[Gc]:i.ONE_MINUS_SRC_COLOR,[Br]:i.ONE_MINUS_SRC_ALPHA,[$c]:i.ONE_MINUS_DST_COLOR,[Vc]:i.ONE_MINUS_DST_ALPHA,[Yc]:i.CONSTANT_COLOR,[qc]:i.ONE_MINUS_CONSTANT_COLOR,[jc]:i.CONSTANT_ALPHA,[Zc]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(R,ae,oe,Te,ve,Je,Qe,_t,Nt,et){if(R===kn){p===!0&&(Ee(i.BLEND),p=!1);return}if(p===!1&&(Ue(i.BLEND),p=!0),R!==Nc){if(R!==E||et!==B){if((x!==Jn||A!==Jn)&&(i.blendEquation(i.FUNC_ADD),x=Jn,A=Jn),et)switch(R){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case va:i.blendFunc(i.ONE,i.ONE);break;case Sa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ma:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case va:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Sa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ma:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}b=null,C=null,w=null,H=null,v.set(0,0,0),T=0,E=R,B=et}return}ve=ve||ae,Je=Je||oe,Qe=Qe||Te,(ae!==x||ve!==A)&&(i.blendEquationSeparate(xe[ae],xe[ve]),x=ae,A=ve),(oe!==b||Te!==C||Je!==w||Qe!==H)&&(i.blendFuncSeparate(Re[oe],Re[Te],Re[Je],Re[Qe]),b=oe,C=Te,w=Je,H=Qe),(_t.equals(v)===!1||Nt!==T)&&(i.blendColor(_t.r,_t.g,_t.b,Nt),v.copy(_t),T=Nt),E=R,B=!1}function it(R,ae){R.side===wn?Ee(i.CULL_FACE):Ue(i.CULL_FACE);let oe=R.side===Ht;ae&&(oe=!oe),Ne(oe),R.blending===wi&&R.transparent===!1?fe(kn):fe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),a.setMask(R.colorWrite);const Te=R.stencilWrite;c.setTest(Te),Te&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),N(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(R){V!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),V=R)}function M(R){R!==Uc?(Ue(i.CULL_FACE),R!==ie&&(R===xa?i.cullFace(i.BACK):R===Dc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),ie=R}function y(R){R!==P&&(W&&i.lineWidth(R),P=R)}function N(R,ae,oe){R?(Ue(i.POLYGON_OFFSET_FILL),(k!==ae||G!==oe)&&(i.polygonOffset(ae,oe),k=ae,G=oe)):Ee(i.POLYGON_OFFSET_FILL)}function K(R){R?Ue(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function Z(R){R===void 0&&(R=i.TEXTURE0+X-1),Q!==R&&(i.activeTexture(R),Q=R)}function J(R,ae,oe){oe===void 0&&(Q===null?oe=i.TEXTURE0+X-1:oe=Q);let Te=ee[oe];Te===void 0&&(Te={type:void 0,texture:void 0},ee[oe]=Te),(Te.type!==R||Te.texture!==ae)&&(Q!==oe&&(i.activeTexture(oe),Q=oe),i.bindTexture(R,ae||Pe[R]),Te.type=R,Te.texture=ae)}function pe(){const R=ee[Q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function le(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Me(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function je(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ge(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ye(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function De(R){ce.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),ce.copy(R))}function Ye(R){_e.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),_e.copy(R))}function rt(R,ae){let oe=u.get(ae);oe===void 0&&(oe=new WeakMap,u.set(ae,oe));let Te=oe.get(R);Te===void 0&&(Te=i.getUniformBlockIndex(ae,R.name),oe.set(R,Te))}function ke(R,ae){const Te=u.get(ae).get(R);d.get(ae)!==Te&&(i.uniformBlockBinding(ae,Te,R.__bindingPointIndex),d.set(ae,Te))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},Q=null,ee={},h={},g=new WeakMap,_=[],m=null,p=!1,E=null,x=null,b=null,C=null,A=null,w=null,H=null,v=new Xe(0,0,0),T=0,B=!1,V=null,ie=null,P=null,k=null,G=null,ce.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ue,disable:Ee,bindFramebuffer:Ve,drawBuffers:D,useProgram:It,setBlending:fe,setMaterial:it,setFlipSided:Ne,setCullFace:M,setLineWidth:y,setPolygonOffset:N,setScissorTest:K,activeTexture:Z,bindTexture:J,unbindTexture:pe,compressedTexImage2D:le,compressedTexImage3D:ue,texImage2D:ye,texImage3D:he,updateUBOMapping:rt,uniformBlockBinding:ke,texStorage2D:Ge,texStorage3D:Ae,texSubImage2D:Me,texSubImage3D:Fe,compressedTexSubImage2D:j,compressedTexSubImage3D:je,scissor:De,viewport:Ye,reset:te}}function Um(i,e,t,n,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let u;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,y){return h?new OffscreenCanvas(M,y):Zi("canvas")}function _(M,y,N,K){let Z=1;if((M.width>K||M.height>K)&&(Z=K/Math.max(M.width,M.height)),Z<1||y===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const J=y?Xr:Math.floor,pe=J(Z*M.width),le=J(Z*M.height);u===void 0&&(u=g(pe,le));const ue=N?g(pe,le):u;return ue.width=pe,ue.height=le,ue.getContext("2d").drawImage(M,0,0,pe,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+pe+"x"+le+")."),ue}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return eo(M.width)&&eo(M.height)}function p(M){return a?!1:M.wrapS!==jt||M.wrapT!==jt||M.minFilter!==qe&&M.minFilter!==Jt}function E(M,y){return M.generateMipmaps&&y&&M.minFilter!==qe&&M.minFilter!==Jt}function x(M){i.generateMipmap(M)}function b(M,y,N,K,Z=!1){if(a===!1)return y;if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let J=y;if(y===i.RED&&(N===i.FLOAT&&(J=i.R32F),N===i.HALF_FLOAT&&(J=i.R16F),N===i.UNSIGNED_BYTE&&(J=i.R8)),y===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(J=i.R8UI),N===i.UNSIGNED_SHORT&&(J=i.R16UI),N===i.UNSIGNED_INT&&(J=i.R32UI),N===i.BYTE&&(J=i.R8I),N===i.SHORT&&(J=i.R16I),N===i.INT&&(J=i.R32I)),y===i.RG&&(N===i.FLOAT&&(J=i.RG32F),N===i.HALF_FLOAT&&(J=i.RG16F),N===i.UNSIGNED_BYTE&&(J=i.RG8)),y===i.RGBA){const pe=Z?Os:Ze.getTransfer(K);N===i.FLOAT&&(J=i.RGBA32F),N===i.HALF_FLOAT&&(J=i.RGBA16F),N===i.UNSIGNED_BYTE&&(J=pe===nt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function C(M,y,N){return E(M,N)===!0||M.isFramebufferTexture&&M.minFilter!==qe&&M.minFilter!==Jt?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function A(M){return M===qe||M===ba||M===tr?i.NEAREST:i.LINEAR}function w(M){const y=M.target;y.removeEventListener("dispose",w),v(y),y.isVideoTexture&&d.delete(y)}function H(M){const y=M.target;y.removeEventListener("dispose",H),B(y)}function v(M){const y=n.get(M);if(y.__webglInit===void 0)return;const N=M.source,K=f.get(N);if(K){const Z=K[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(M),Object.keys(K).length===0&&f.delete(N)}n.remove(M)}function T(M){const y=n.get(M);i.deleteTexture(y.__webglTexture);const N=M.source,K=f.get(N);delete K[y.__cacheKey],o.memory.textures--}function B(M){const y=M.texture,N=n.get(M),K=n.get(y);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(N.__webglFramebuffer[Z]))for(let J=0;J<N.__webglFramebuffer[Z].length;J++)i.deleteFramebuffer(N.__webglFramebuffer[Z][J]);else i.deleteFramebuffer(N.__webglFramebuffer[Z]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[Z])}else{if(Array.isArray(N.__webglFramebuffer))for(let Z=0;Z<N.__webglFramebuffer.length;Z++)i.deleteFramebuffer(N.__webglFramebuffer[Z]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Z=0;Z<N.__webglColorRenderbuffer.length;Z++)N.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[Z]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let Z=0,J=y.length;Z<J;Z++){const pe=n.get(y[Z]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(y[Z])}n.remove(y),n.remove(M)}let V=0;function ie(){V=0}function P(){const M=V;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),V+=1,M}function k(M){const y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function G(M,y){const N=n.get(M);if(M.isVideoTexture&&it(M),M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){const K=M.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(N,M,y);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+y)}function X(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){ce(N,M,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+y)}function W(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){ce(N,M,y);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+y)}function $(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){_e(N,M,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+y)}const Y={[Hr]:i.REPEAT,[jt]:i.CLAMP_TO_EDGE,[Vr]:i.MIRRORED_REPEAT},Q={[qe]:i.NEAREST,[ba]:i.NEAREST_MIPMAP_NEAREST,[tr]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[hd]:i.LINEAR_MIPMAP_NEAREST,[qi]:i.LINEAR_MIPMAP_LINEAR},ee={[bd]:i.NEVER,[Ld]:i.ALWAYS,[Ad]:i.LESS,[hl]:i.LEQUAL,[wd]:i.EQUAL,[Pd]:i.GEQUAL,[Rd]:i.GREATER,[Cd]:i.NOTEQUAL};function z(M,y,N){if(N?(i.texParameteri(M,i.TEXTURE_WRAP_S,Y[y.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,Y[y.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,Y[y.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,Q[y.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,Q[y.minFilter])):(i.texParameteri(M,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(M,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==jt||y.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(M,i.TEXTURE_MAG_FILTER,A(y.magFilter)),i.texParameteri(M,i.TEXTURE_MIN_FILTER,A(y.minFilter)),y.minFilter!==qe&&y.minFilter!==Jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,ee[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===qe||y.minFilter!==tr&&y.minFilter!==qi||y.type===On&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===ji&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(M,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function q(M,y){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",w));const K=y.source;let Z=f.get(K);Z===void 0&&(Z={},f.set(K,Z));const J=k(y);if(J!==M.__cacheKey){Z[J]===void 0&&(Z[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Z[J].usedTimes++;const pe=Z[M.__cacheKey];pe!==void 0&&(Z[M.__cacheKey].usedTimes--,pe.usedTimes===0&&T(y)),M.__cacheKey=J,M.__webglTexture=Z[J].texture}return N}function ce(M,y,N){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);const Z=q(M,y),J=y.source;t.bindTexture(K,M.__webglTexture,i.TEXTURE0+N);const pe=n.get(J);if(J.version!==pe.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const le=Ze.getPrimaries(Ze.workingColorSpace),ue=y.colorSpace===Qt?null:Ze.getPrimaries(y.colorSpace),Me=y.colorSpace===Qt||le===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Fe=p(y)&&m(y.image)===!1;let j=_(y.image,Fe,!1,s.maxTextureSize);j=Ne(y,j);const je=m(j)||a,Ge=r.convert(y.format,y.colorSpace);let Ae=r.convert(y.type),ye=b(y.internalFormat,Ge,Ae,y.colorSpace,y.isVideoTexture);z(K,y,je);let he;const De=y.mipmaps,Ye=a&&y.isVideoTexture!==!0&&ye!==dl,rt=pe.__version===void 0||Z===!0,ke=C(y,j,je);if(y.isDepthTexture)ye=i.DEPTH_COMPONENT,a?y.type===On?ye=i.DEPTH_COMPONENT32F:y.type===Fn?ye=i.DEPTH_COMPONENT24:y.type===ei?ye=i.DEPTH24_STENCIL8:ye=i.DEPTH_COMPONENT16:y.type===On&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===ti&&ye===i.DEPTH_COMPONENT&&y.type!==Qr&&y.type!==Fn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Fn,Ae=r.convert(y.type)),y.format===Ii&&ye===i.DEPTH_COMPONENT&&(ye=i.DEPTH_STENCIL,y.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=ei,Ae=r.convert(y.type))),rt&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,ye,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,ye,j.width,j.height,0,Ge,Ae,null));else if(y.isDataTexture)if(De.length>0&&je){Ye&&rt&&t.texStorage2D(i.TEXTURE_2D,ke,ye,De[0].width,De[0].height);for(let te=0,R=De.length;te<R;te++)he=De[te],Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,Ge,Ae,he.data):t.texImage2D(i.TEXTURE_2D,te,ye,he.width,he.height,0,Ge,Ae,he.data);y.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(i.TEXTURE_2D,ke,ye,j.width,j.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,j.width,j.height,Ge,Ae,j.data)):t.texImage2D(i.TEXTURE_2D,0,ye,j.width,j.height,0,Ge,Ae,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ye&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,ye,De[0].width,De[0].height,j.depth);for(let te=0,R=De.length;te<R;te++)he=De[te],y.format!==on?Ge!==null?Ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,j.depth,Ge,he.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,ye,he.width,he.height,j.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,he.width,he.height,j.depth,Ge,Ae,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,ye,he.width,he.height,j.depth,0,Ge,Ae,he.data)}else{Ye&&rt&&t.texStorage2D(i.TEXTURE_2D,ke,ye,De[0].width,De[0].height);for(let te=0,R=De.length;te<R;te++)he=De[te],y.format!==on?Ge!==null?Ye?t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,Ge,he.data):t.compressedTexImage2D(i.TEXTURE_2D,te,ye,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,he.width,he.height,Ge,Ae,he.data):t.texImage2D(i.TEXTURE_2D,te,ye,he.width,he.height,0,Ge,Ae,he.data)}else if(y.isDataArrayTexture)Ye?(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,ye,j.width,j.height,j.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,Ge,Ae,j.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ye,j.width,j.height,j.depth,0,Ge,Ae,j.data);else if(y.isData3DTexture)Ye?(rt&&t.texStorage3D(i.TEXTURE_3D,ke,ye,j.width,j.height,j.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,Ge,Ae,j.data)):t.texImage3D(i.TEXTURE_3D,0,ye,j.width,j.height,j.depth,0,Ge,Ae,j.data);else if(y.isFramebufferTexture){if(rt)if(Ye)t.texStorage2D(i.TEXTURE_2D,ke,ye,j.width,j.height);else{let te=j.width,R=j.height;for(let ae=0;ae<ke;ae++)t.texImage2D(i.TEXTURE_2D,ae,ye,te,R,0,Ge,Ae,null),te>>=1,R>>=1}}else if(De.length>0&&je){Ye&&rt&&t.texStorage2D(i.TEXTURE_2D,ke,ye,De[0].width,De[0].height);for(let te=0,R=De.length;te<R;te++)he=De[te],Ye?t.texSubImage2D(i.TEXTURE_2D,te,0,0,Ge,Ae,he):t.texImage2D(i.TEXTURE_2D,te,ye,Ge,Ae,he);y.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(i.TEXTURE_2D,ke,ye,j.width,j.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ge,Ae,j)):t.texImage2D(i.TEXTURE_2D,0,ye,Ge,Ae,j);E(y,je)&&x(K),pe.__version=J.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function _e(M,y,N){if(y.image.length!==6)return;const K=q(M,y),Z=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+N);const J=n.get(Z);if(Z.version!==J.__version||K===!0){t.activeTexture(i.TEXTURE0+N);const pe=Ze.getPrimaries(Ze.workingColorSpace),le=y.colorSpace===Qt?null:Ze.getPrimaries(y.colorSpace),ue=y.colorSpace===Qt||pe===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Me=y.isCompressedTexture||y.image[0].isCompressedTexture,Fe=y.image[0]&&y.image[0].isDataTexture,j=[];for(let te=0;te<6;te++)!Me&&!Fe?j[te]=_(y.image[te],!1,!0,s.maxCubemapSize):j[te]=Fe?y.image[te].image:y.image[te],j[te]=Ne(y,j[te]);const je=j[0],Ge=m(je)||a,Ae=r.convert(y.format,y.colorSpace),ye=r.convert(y.type),he=b(y.internalFormat,Ae,ye,y.colorSpace),De=a&&y.isVideoTexture!==!0,Ye=J.__version===void 0||K===!0;let rt=C(y,je,Ge);z(i.TEXTURE_CUBE_MAP,y,Ge);let ke;if(Me){De&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,he,je.width,je.height);for(let te=0;te<6;te++){ke=j[te].mipmaps;for(let R=0;R<ke.length;R++){const ae=ke[R];y.format!==on?Ae!==null?De?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ae.width,ae.height,Ae,ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,he,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,0,0,ae.width,ae.height,Ae,ye,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R,he,ae.width,ae.height,0,Ae,ye,ae.data)}}}else{ke=y.mipmaps,De&&Ye&&(ke.length>0&&rt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,he,j[0].width,j[0].height));for(let te=0;te<6;te++)if(Fe){De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,j[te].width,j[te].height,Ae,ye,j[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,j[te].width,j[te].height,0,Ae,ye,j[te].data);for(let R=0;R<ke.length;R++){const oe=ke[R].image[te].image;De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,oe.width,oe.height,Ae,ye,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,he,oe.width,oe.height,0,Ae,ye,oe.data)}}else{De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ae,ye,j[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,he,Ae,ye,j[te]);for(let R=0;R<ke.length;R++){const ae=ke[R];De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,0,0,Ae,ye,ae.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,R+1,he,Ae,ye,ae.image[te])}}}E(y,Ge)&&x(i.TEXTURE_CUBE_MAP),J.__version=Z.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function ge(M,y,N,K,Z,J){const pe=r.convert(N.format,N.colorSpace),le=r.convert(N.type),ue=b(N.internalFormat,pe,le,N.colorSpace);if(!n.get(y).__hasExternalTextures){const Fe=Math.max(1,y.width>>J),j=Math.max(1,y.height>>J);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,J,ue,Fe,j,y.depth,0,pe,le,null):t.texImage2D(Z,J,ue,Fe,j,0,pe,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,n.get(N).__webglTexture,0,Re(y)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,n.get(N).__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(M,y,N){if(i.bindRenderbuffer(i.RENDERBUFFER,M),y.depthBuffer&&!y.stencilBuffer){let K=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||fe(y)){const Z=y.depthTexture;Z&&Z.isDepthTexture&&(Z.type===On?K=i.DEPTH_COMPONENT32F:Z.type===Fn&&(K=i.DEPTH_COMPONENT24));const J=Re(y);fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,K,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,J,K,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,M)}else if(y.depthBuffer&&y.stencilBuffer){const K=Re(y);N&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,M)}else{const K=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let Z=0;Z<K.length;Z++){const J=K[Z],pe=r.convert(J.format,J.colorSpace),le=r.convert(J.type),ue=b(J.internalFormat,pe,le,J.colorSpace),Me=Re(y);N&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ue,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ue,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ue,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const K=n.get(y.depthTexture).__webglTexture,Z=Re(y);if(y.depthTexture.format===ti)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(y.depthTexture.format===Ii)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ee(M){const y=n.get(M),N=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ue(y.__webglFramebuffer,M)}else if(N){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]=i.createRenderbuffer(),Pe(y.__webglDepthbuffer[K],M,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Pe(y.__webglDepthbuffer,M,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ve(M,y,N){const K=n.get(M);y!==void 0&&ge(K.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ee(M)}function D(M){const y=M.texture,N=n.get(M),K=n.get(y);M.addEventListener("dispose",H),M.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,o.memory.textures++);const Z=M.isWebGLCubeRenderTarget===!0,J=M.isWebGLMultipleRenderTargets===!0,pe=m(M)||a;if(Z){N.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[le]=[];for(let ue=0;ue<y.mipmaps.length;ue++)N.__webglFramebuffer[le][ue]=i.createFramebuffer()}else N.__webglFramebuffer[le]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)N.__webglFramebuffer[le]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(J)if(s.drawBuffers){const le=M.texture;for(let ue=0,Me=le.length;ue<Me;ue++){const Fe=n.get(le[ue]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&M.samples>0&&fe(M)===!1){const le=J?y:[y];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ue=0;ue<le.length;ue++){const Me=le[ue];N.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ue]);const Fe=r.convert(Me.format,Me.colorSpace),j=r.convert(Me.type),je=b(Me.internalFormat,Fe,j,Me.colorSpace,M.isXRRenderTarget===!0),Ge=Re(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,je,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,N.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(N.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),z(i.TEXTURE_CUBE_MAP,y,pe);for(let le=0;le<6;le++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)ge(N.__webglFramebuffer[le][ue],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ue);else ge(N.__webglFramebuffer[le],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);E(y,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){const le=M.texture;for(let ue=0,Me=le.length;ue<Me;ue++){const Fe=le[ue],j=n.get(Fe);t.bindTexture(i.TEXTURE_2D,j.__webglTexture),z(i.TEXTURE_2D,Fe,pe),ge(N.__webglFramebuffer,M,Fe,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),E(Fe,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(a?le=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,K.__webglTexture),z(le,y,pe),a&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)ge(N.__webglFramebuffer[ue],M,y,i.COLOR_ATTACHMENT0,le,ue);else ge(N.__webglFramebuffer,M,y,i.COLOR_ATTACHMENT0,le,0);E(y,pe)&&x(le),t.unbindTexture()}M.depthBuffer&&Ee(M)}function It(M){const y=m(M)||a,N=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let K=0,Z=N.length;K<Z;K++){const J=N[K];if(E(J,y)){const pe=M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(J).__webglTexture;t.bindTexture(pe,le),x(pe),t.unbindTexture()}}}function xe(M){if(a&&M.samples>0&&fe(M)===!1){const y=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],N=M.width,K=M.height;let Z=i.COLOR_BUFFER_BIT;const J=[],pe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(M),ue=M.isWebGLMultipleRenderTargets===!0;if(ue)for(let Me=0;Me<y.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Me=0;Me<y.length;Me++){J.push(i.COLOR_ATTACHMENT0+Me),M.depthBuffer&&J.push(pe);const Fe=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Fe===!1&&(M.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ue&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[Me]),Fe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),ue){const j=n.get(y[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,N,K,0,0,N,K,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Me=0;Me<y.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,le.__webglColorRenderbuffer[Me]);const Fe=n.get(y[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Re(M){return Math.min(s.maxSamples,M.samples)}function fe(M){const y=n.get(M);return a&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function it(M){const y=o.render.frame;d.get(M)!==y&&(d.set(M,y),M.update())}function Ne(M,y){const N=M.colorSpace,K=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Wr||N!==Cn&&N!==Qt&&(Ze.getTransfer(N)===nt?a===!1?e.has("EXT_sRGB")===!0&&K===on?(M.format=Wr,M.minFilter=Jt,M.generateMipmaps=!1):y=pl.sRGBToLinear(y):(K!==on||Z!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}this.allocateTextureUnit=P,this.resetTextureUnits=ie,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=$,this.rebindTextures=Ve,this.setupRenderTarget=D,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function Dm(i,e,t){const n=t.isWebGL2;function s(r,o=Qt){let a;const l=Ze.getTransfer(o);if(r===zn)return i.UNSIGNED_BYTE;if(r===rl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===al)return i.UNSIGNED_SHORT_5_5_5_1;if(r===fd)return i.BYTE;if(r===pd)return i.SHORT;if(r===Qr)return i.UNSIGNED_SHORT;if(r===sl)return i.INT;if(r===Fn)return i.UNSIGNED_INT;if(r===On)return i.FLOAT;if(r===ji)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===md)return i.ALPHA;if(r===on)return i.RGBA;if(r===gd)return i.LUMINANCE;if(r===_d)return i.LUMINANCE_ALPHA;if(r===ti)return i.DEPTH_COMPONENT;if(r===Ii)return i.DEPTH_STENCIL;if(r===Wr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===yd)return i.RED;if(r===ol)return i.RED_INTEGER;if(r===xd)return i.RG;if(r===ll)return i.RG_INTEGER;if(r===cl)return i.RGBA_INTEGER;if(r===nr||r===ir||r===sr||r===rr)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===nr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===rr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===nr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===rr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Aa||r===wa||r===Ra||r===Ca)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Aa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===wa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ra)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ca)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===dl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Pa||r===La)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Pa)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===La)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ua||r===Da||r===Ia||r===Na||r===Fa||r===Oa||r===ka||r===Ba||r===za||r===Ga||r===Ha||r===Va||r===Wa||r===$a)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Ua)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Da)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ia)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Na)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Oa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ka)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ba)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===za)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ga)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ha)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Va)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Wa)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===$a)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ar||r===Xa||r===Ya)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===ar)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Xa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ya)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===vd||r===qa||r===ja||r===Za)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===ar)return a.COMPRESSED_RED_RGTC1_EXT;if(r===qa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ja)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Za)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ei?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Im extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class As extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nm={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Nm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new As;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Fm extends Fi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const E=[],x=[],b=new Ke;let C=null;const A=new an;A.layers.enable(1),A.viewport=new bt;const w=new an;w.layers.enable(2),w.viewport=new bt;const H=[A,w],v=new Im;v.layers.enable(1),v.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let q=E[z];return q===void 0&&(q=new Lr,E[z]=q),q.getTargetRaySpace()},this.getControllerGrip=function(z){let q=E[z];return q===void 0&&(q=new Lr,E[z]=q),q.getGripSpace()},this.getHand=function(z){let q=E[z];return q===void 0&&(q=new Lr,E[z]=q),q.getHandSpace()};function V(z){const q=x.indexOf(z.inputSource);if(q===-1)return;const ce=E[q];ce!==void 0&&(ce.update(z.inputSource,z.frame,c||o),ce.dispatchEvent({type:z.type,data:z.inputSource}))}function ie(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",ie),s.removeEventListener("inputsourceschange",P);for(let z=0;z<E.length;z++){const q=x[z];q!==null&&(x[z]=null,E[z].disconnect(q))}T=null,B=null,e.setRenderTarget(m),h=null,f=null,u=null,s=null,p=null,ee.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",ie),s.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),p=new ii(h.framebufferWidth,h.framebufferHeight,{format:on,type:zn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let q=null,ce=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=_.stencil?Ii:ti,ce=_.stencil?ei:Fn);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ii(f.textureWidth,f.textureHeight,{format:on,type:zn,depthTexture:new Rl(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Pe=e.properties.get(p);Pe.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ee.setContext(s),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(z){for(let q=0;q<z.removed.length;q++){const ce=z.removed[q],_e=x.indexOf(ce);_e>=0&&(x[_e]=null,E[_e].disconnect(ce))}for(let q=0;q<z.added.length;q++){const ce=z.added[q];let _e=x.indexOf(ce);if(_e===-1){for(let Pe=0;Pe<E.length;Pe++)if(Pe>=x.length){x.push(ce),_e=Pe;break}else if(x[Pe]===null){x[Pe]=ce,_e=Pe;break}if(_e===-1)break}const ge=E[_e];ge&&ge.connect(ce)}}const k=new U,G=new U;function X(z,q,ce){k.setFromMatrixPosition(q.matrixWorld),G.setFromMatrixPosition(ce.matrixWorld);const _e=k.distanceTo(G),ge=q.projectionMatrix.elements,Pe=ce.projectionMatrix.elements,Ue=ge[14]/(ge[10]-1),Ee=ge[14]/(ge[10]+1),Ve=(ge[9]+1)/ge[5],D=(ge[9]-1)/ge[5],It=(ge[8]-1)/ge[0],xe=(Pe[8]+1)/Pe[0],Re=Ue*It,fe=Ue*xe,it=_e/(-It+xe),Ne=it*-It;q.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ne),z.translateZ(it),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const M=Ue+it,y=Ee+it,N=Re-Ne,K=fe+(_e-Ne),Z=Ve*Ee/y*M,J=D*Ee/y*M;z.projectionMatrix.makePerspective(N,K,Z,J,M,y),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function W(z,q){q===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(q.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;v.near=w.near=A.near=z.near,v.far=w.far=A.far=z.far,(T!==v.near||B!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),T=v.near,B=v.far);const q=z.parent,ce=v.cameras;W(v,q);for(let _e=0;_e<ce.length;_e++)W(ce[_e],q);ce.length===2?X(v,A,w):v.projectionMatrix.copy(A.projectionMatrix),$(z,v,q)};function $(z,q,ce){ce===null?z.matrix.copy(q.matrixWorld):(z.matrix.copy(ce.matrixWorld),z.matrix.invert(),z.matrix.multiply(q.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(q.projectionMatrix),z.projectionMatrixInverse.copy(q.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=$r*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)};let Y=null;function Q(z,q){if(d=q.getViewerPose(c||o),g=q,d!==null){const ce=d.views;h!==null&&(e.setRenderTargetFramebuffer(p,h.framebuffer),e.setRenderTarget(p));let _e=!1;ce.length!==v.cameras.length&&(v.cameras.length=0,_e=!0);for(let ge=0;ge<ce.length;ge++){const Pe=ce[ge];let Ue=null;if(h!==null)Ue=h.getViewport(Pe);else{const Ve=u.getViewSubImage(f,Pe);Ue=Ve.viewport,ge===0&&(e.setRenderTargetTextures(p,Ve.colorTexture,f.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(p))}let Ee=H[ge];Ee===void 0&&(Ee=new an,Ee.layers.enable(ge),Ee.viewport=new bt,H[ge]=Ee),Ee.matrix.fromArray(Pe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Pe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),ge===0&&(v.matrix.copy(Ee.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),_e===!0&&v.cameras.push(Ee)}}for(let ce=0;ce<E.length;ce++){const _e=x[ce],ge=E[ce];_e!==null&&ge!==void 0&&ge.update(_e,q,c||o)}Y&&Y(z,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}const ee=new Al;ee.setAnimationLoop(Q),this.setAnimationLoop=function(z){Y=z},this.dispose=function(){}}}function Om(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ml(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function km(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,x){const b=x.program;n.uniformBlockBinding(E,b)}function c(E,x){let b=s[E.id];b===void 0&&(g(E),b=d(E),s[E.id]=b,E.addEventListener("dispose",m));const C=x.program;n.updateUBOMapping(E,C);const A=e.render.frame;r[E.id]!==A&&(f(E),r[E.id]=A)}function d(E){const x=u();E.__bindingPointIndex=x;const b=i.createBuffer(),C=E.__size,A=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const x=s[E.id],b=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let A=0,w=b.length;A<w;A++){const H=Array.isArray(b[A])?b[A]:[b[A]];for(let v=0,T=H.length;v<T;v++){const B=H[v];if(h(B,A,v,C)===!0){const V=B.__offset,ie=Array.isArray(B.value)?B.value:[B.value];let P=0;for(let k=0;k<ie.length;k++){const G=ie[k],X=_(G);typeof G=="number"||typeof G=="boolean"?(B.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,V+P,B.__data)):G.isMatrix3?(B.__data[0]=G.elements[0],B.__data[1]=G.elements[1],B.__data[2]=G.elements[2],B.__data[3]=0,B.__data[4]=G.elements[3],B.__data[5]=G.elements[4],B.__data[6]=G.elements[5],B.__data[7]=0,B.__data[8]=G.elements[6],B.__data[9]=G.elements[7],B.__data[10]=G.elements[8],B.__data[11]=0):(G.toArray(B.__data,P),P+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,B.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(E,x,b,C){const A=E.value,w=x+"_"+b;if(C[w]===void 0)return typeof A=="number"||typeof A=="boolean"?C[w]=A:C[w]=A.clone(),!0;{const H=C[w];if(typeof A=="number"||typeof A=="boolean"){if(H!==A)return C[w]=A,!0}else if(H.equals(A)===!1)return H.copy(A),!0}return!1}function g(E){const x=E.uniforms;let b=0;const C=16;for(let w=0,H=x.length;w<H;w++){const v=Array.isArray(x[w])?x[w]:[x[w]];for(let T=0,B=v.length;T<B;T++){const V=v[T],ie=Array.isArray(V.value)?V.value:[V.value];for(let P=0,k=ie.length;P<k;P++){const G=ie[P],X=_(G),W=b%C;W!==0&&C-W<X.boundary&&(b+=C-W),V.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=b,b+=X.storage}}}const A=b%C;return A>0&&(b+=C-A),E.__size=b,E.__cache={},this}function _(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function m(E){const x=E.target;x.removeEventListener("dispose",m);const b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Il{constructor(e={}){const{canvas:t=Dd(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const h=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this._useLegacyLights=!1,this.toneMapping=Bn,this.toneMappingExposure=1;const x=this;let b=!1,C=0,A=0,w=null,H=-1,v=null;const T=new bt,B=new bt;let V=null;const ie=new Xe(0);let P=0,k=t.width,G=t.height,X=1,W=null,$=null;const Y=new bt(0,0,k,G),Q=new bt(0,0,k,G);let ee=!1;const z=new bl;let q=!1,ce=!1,_e=null;const ge=new St,Pe=new Ke,Ue=new U,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return w===null?X:1}let D=n;function It(S,L){for(let F=0;F<S.length;F++){const O=S[F],I=t.getContext(O,L);if(I!==null)return I}return null}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jr}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",ae,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&L.shift(),D=It(L,S),D===null)throw It(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let xe,Re,fe,it,Ne,M,y,N,K,Z,J,pe,le,ue,Me,Fe,j,je,Ge,Ae,ye,he,De,Ye;function rt(){xe=new qf(D),Re=new Hf(D,xe,e),xe.init(Re),he=new Dm(D,xe,Re),fe=new Lm(D,xe,Re),it=new Kf(D),Ne=new _m,M=new Um(D,xe,fe,Ne,Re,he,it),y=new Wf(x),N=new Yf(x),K=new su(D,Re),De=new zf(D,xe,K,Re),Z=new jf(D,K,it,De),J=new tp(D,Z,K,it),Ge=new ep(D,Re,M),Fe=new Vf(Ne),pe=new gm(x,y,N,xe,Re,De,Fe),le=new Om(x,Ne),ue=new xm,Me=new bm(xe,Re),je=new Bf(x,y,N,fe,J,f,l),j=new Pm(x,J,Re),Ye=new km(D,it,Re,fe),Ae=new Gf(D,xe,it,Re),ye=new Zf(D,xe,it,Re),it.programs=pe.programs,x.capabilities=Re,x.extensions=xe,x.properties=Ne,x.renderLists=ue,x.shadowMap=j,x.state=fe,x.info=it}rt();const ke=new Fm(x,D);this.xr=ke,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=xe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=xe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(k,G,!1))},this.getSize=function(S){return S.set(k,G)},this.setSize=function(S,L,F=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=S,G=L,t.width=Math.floor(S*X),t.height=Math.floor(L*X),F===!0&&(t.style.width=S+"px",t.style.height=L+"px"),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(k*X,G*X).floor()},this.setDrawingBufferSize=function(S,L,F){k=S,G=L,X=F,t.width=Math.floor(S*F),t.height=Math.floor(L*F),this.setViewport(0,0,S,L)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(Y)},this.setViewport=function(S,L,F,O){S.isVector4?Y.set(S.x,S.y,S.z,S.w):Y.set(S,L,F,O),fe.viewport(T.copy(Y).multiplyScalar(X).floor())},this.getScissor=function(S){return S.copy(Q)},this.setScissor=function(S,L,F,O){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,L,F,O),fe.scissor(B.copy(Q).multiplyScalar(X).floor())},this.getScissorTest=function(){return ee},this.setScissorTest=function(S){fe.setScissorTest(ee=S)},this.setOpaqueSort=function(S){W=S},this.setTransparentSort=function(S){$=S},this.getClearColor=function(S){return S.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(S=!0,L=!0,F=!0){let O=0;if(S){let I=!1;if(w!==null){const de=w.texture.format;I=de===cl||de===ll||de===ol}if(I){const de=w.texture.type,me=de===zn||de===Fn||de===Qr||de===ei||de===rl||de===al,Se=je.getClearColor(),be=je.getClearAlpha(),Oe=Se.r,Ce=Se.g,Le=Se.b;me?(h[0]=Oe,h[1]=Ce,h[2]=Le,h[3]=be,D.clearBufferuiv(D.COLOR,0,h)):(g[0]=Oe,g[1]=Ce,g[2]=Le,g[3]=be,D.clearBufferiv(D.COLOR,0,g))}else O|=D.COLOR_BUFFER_BIT}L&&(O|=D.DEPTH_BUFFER_BIT),F&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ue.dispose(),Me.dispose(),Ne.dispose(),y.dispose(),N.dispose(),J.dispose(),De.dispose(),Ye.dispose(),pe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Nt),ke.removeEventListener("sessionend",et),_e&&(_e.dispose(),_e=null),Ft.stop()};function te(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=it.autoReset,L=j.enabled,F=j.autoUpdate,O=j.needsUpdate,I=j.type;rt(),it.autoReset=S,j.enabled=L,j.autoUpdate=F,j.needsUpdate=O,j.type=I}function ae(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function oe(S){const L=S.target;L.removeEventListener("dispose",oe),Te(L)}function Te(S){ve(S),Ne.remove(S)}function ve(S){const L=Ne.get(S).programs;L!==void 0&&(L.forEach(function(F){pe.releaseProgram(F)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,F,O,I,de){L===null&&(L=Ee);const me=I.isMesh&&I.matrixWorld.determinant()<0,Se=Xl(S,L,F,O,I);fe.setMaterial(O,me);let be=F.index,Oe=1;if(O.wireframe===!0){if(be=Z.getWireframeAttribute(F),be===void 0)return;Oe=2}const Ce=F.drawRange,Le=F.attributes.position;let ot=Ce.start*Oe,Wt=(Ce.start+Ce.count)*Oe;de!==null&&(ot=Math.max(ot,de.start*Oe),Wt=Math.min(Wt,(de.start+de.count)*Oe)),be!==null?(ot=Math.max(ot,0),Wt=Math.min(Wt,be.count)):Le!=null&&(ot=Math.max(ot,0),Wt=Math.min(Wt,Le.count));const yt=Wt-ot;if(yt<0||yt===1/0)return;De.setup(I,O,Se,F,be);let xn,st=Ae;if(be!==null&&(xn=K.get(be),st=ye,st.setIndex(xn)),I.isMesh)O.wireframe===!0?(fe.setLineWidth(O.wireframeLinewidth*Ve()),st.setMode(D.LINES)):st.setMode(D.TRIANGLES);else if(I.isLine){let Be=O.linewidth;Be===void 0&&(Be=1),fe.setLineWidth(Be*Ve()),I.isLineSegments?st.setMode(D.LINES):I.isLineLoop?st.setMode(D.LINE_LOOP):st.setMode(D.LINE_STRIP)}else I.isPoints?st.setMode(D.POINTS):I.isSprite&&st.setMode(D.TRIANGLES);if(I.isBatchedMesh)st.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)st.renderInstances(ot,yt,I.count);else if(F.isInstancedBufferGeometry){const Be=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,js=Math.min(F.instanceCount,Be);st.renderInstances(ot,yt,js)}else st.render(ot,yt)};function Je(S,L,F){S.transparent===!0&&S.side===wn&&S.forceSinglePass===!1?(S.side=Ht,S.needsUpdate=!0,is(S,L,F),S.side=_n,S.needsUpdate=!0,is(S,L,F),S.side=wn):is(S,L,F)}this.compile=function(S,L,F=null){F===null&&(F=S),m=Me.get(F),m.init(),E.push(m),F.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),S!==F&&S.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),m.setupLights(x._useLegacyLights);const O=new Set;return S.traverse(function(I){const de=I.material;if(de)if(Array.isArray(de))for(let me=0;me<de.length;me++){const Se=de[me];Je(Se,F,I),O.add(Se)}else Je(de,F,I),O.add(de)}),E.pop(),m=null,O},this.compileAsync=function(S,L,F=null){const O=this.compile(S,L,F);return new Promise(I=>{function de(){if(O.forEach(function(me){Ne.get(me).currentProgram.isReady()&&O.delete(me)}),O.size===0){I(S);return}setTimeout(de,10)}xe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Qe=null;function _t(S){Qe&&Qe(S)}function Nt(){Ft.stop()}function et(){Ft.start()}const Ft=new Al;Ft.setAnimationLoop(_t),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(S){Qe=S,ke.setAnimationLoop(S),S===null?Ft.stop():Ft.start()},ke.addEventListener("sessionstart",Nt),ke.addEventListener("sessionend",et),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(L),L=ke.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,L,w),m=Me.get(S,E.length),m.init(),E.push(m),ge.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),z.setFromProjectionMatrix(ge),ce=this.localClippingEnabled,q=Fe.init(this.clippingPlanes,ce),_=ue.get(S,p.length),_.init(),p.push(_),dn(S,L,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,$),this.info.render.frame++,q===!0&&Fe.beginShadows();const F=m.state.shadowsArray;if(j.render(F,S,L),q===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),je.render(_,S),m.setupLights(x._useLegacyLights),L.isArrayCamera){const O=L.cameras;for(let I=0,de=O.length;I<de;I++){const me=O[I];aa(_,S,me,me.viewport)}}else aa(_,S,L);w!==null&&(M.updateMultisampleRenderTarget(w),M.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(x,S,L),De.resetDefaultState(),H=-1,v=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function dn(S,L,F,O){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||z.intersectsSprite(S)){O&&Ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=J.update(S),Se=S.material;Se.visible&&_.push(S,me,Se,F,Ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||z.intersectsObject(S))){const me=J.update(S),Se=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ue.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ue.copy(me.boundingSphere.center)),Ue.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(Se)){const be=me.groups;for(let Oe=0,Ce=be.length;Oe<Ce;Oe++){const Le=be[Oe],ot=Se[Le.materialIndex];ot&&ot.visible&&_.push(S,me,ot,F,Ue.z,Le)}}else Se.visible&&_.push(S,me,Se,F,Ue.z,null)}}const de=S.children;for(let me=0,Se=de.length;me<Se;me++)dn(de[me],L,F,O)}function aa(S,L,F,O){const I=S.opaque,de=S.transmissive,me=S.transparent;m.setupLightsView(F),q===!0&&Fe.setGlobalState(x.clippingPlanes,F),de.length>0&&$l(I,de,L,F),O&&fe.viewport(T.copy(O)),I.length>0&&ns(I,L,F),de.length>0&&ns(de,L,F),me.length>0&&ns(me,L,F),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function $l(S,L,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;const de=Re.isWebGL2;_e===null&&(_e=new ii(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?ji:zn,minFilter:qi,samples:de?4:0})),x.getDrawingBufferSize(Pe),de?_e.setSize(Pe.x,Pe.y):_e.setSize(Xr(Pe.x),Xr(Pe.y));const me=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(ie),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=Bn,ns(S,F,O),M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e);let be=!1;for(let Oe=0,Ce=L.length;Oe<Ce;Oe++){const Le=L[Oe],ot=Le.object,Wt=Le.geometry,yt=Le.material,xn=Le.group;if(yt.side===wn&&ot.layers.test(O.layers)){const st=yt.side;yt.side=Ht,yt.needsUpdate=!0,oa(ot,F,O,Wt,yt,xn),yt.side=st,yt.needsUpdate=!0,be=!0}}be===!0&&(M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e)),x.setRenderTarget(me),x.setClearColor(ie,P),x.toneMapping=Se}function ns(S,L,F){const O=L.isScene===!0?L.overrideMaterial:null;for(let I=0,de=S.length;I<de;I++){const me=S[I],Se=me.object,be=me.geometry,Oe=O===null?me.material:O,Ce=me.group;Se.layers.test(F.layers)&&oa(Se,L,F,be,Oe,Ce)}}function oa(S,L,F,O,I,de){S.onBeforeRender(x,L,F,O,I,de),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(x,L,F,O,S,de),I.transparent===!0&&I.side===wn&&I.forceSinglePass===!1?(I.side=Ht,I.needsUpdate=!0,x.renderBufferDirect(F,L,O,I,S,de),I.side=_n,I.needsUpdate=!0,x.renderBufferDirect(F,L,O,I,S,de),I.side=wn):x.renderBufferDirect(F,L,O,I,S,de),S.onAfterRender(x,L,F,O,I,de)}function is(S,L,F){L.isScene!==!0&&(L=Ee);const O=Ne.get(S),I=m.state.lights,de=m.state.shadowsArray,me=I.state.version,Se=pe.getParameters(S,I.state,de,L,F),be=pe.getProgramCacheKey(Se);let Oe=O.programs;O.environment=S.isMeshStandardMaterial?L.environment:null,O.fog=L.fog,O.envMap=(S.isMeshStandardMaterial?N:y).get(S.envMap||O.environment),Oe===void 0&&(S.addEventListener("dispose",oe),Oe=new Map,O.programs=Oe);let Ce=Oe.get(be);if(Ce!==void 0){if(O.currentProgram===Ce&&O.lightsStateVersion===me)return ca(S,Se),Ce}else Se.uniforms=pe.getUniforms(S),S.onBuild(F,Se,x),S.onBeforeCompile(Se,x),Ce=pe.acquireProgram(Se,be),Oe.set(be,Ce),O.uniforms=Se.uniforms;const Le=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Le.clippingPlanes=Fe.uniform),ca(S,Se),O.needsLights=ql(S),O.lightsStateVersion=me,O.needsLights&&(Le.ambientLightColor.value=I.state.ambient,Le.lightProbe.value=I.state.probe,Le.directionalLights.value=I.state.directional,Le.directionalLightShadows.value=I.state.directionalShadow,Le.spotLights.value=I.state.spot,Le.spotLightShadows.value=I.state.spotShadow,Le.rectAreaLights.value=I.state.rectArea,Le.ltc_1.value=I.state.rectAreaLTC1,Le.ltc_2.value=I.state.rectAreaLTC2,Le.pointLights.value=I.state.point,Le.pointLightShadows.value=I.state.pointShadow,Le.hemisphereLights.value=I.state.hemi,Le.directionalShadowMap.value=I.state.directionalShadowMap,Le.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Le.spotShadowMap.value=I.state.spotShadowMap,Le.spotLightMatrix.value=I.state.spotLightMatrix,Le.spotLightMap.value=I.state.spotLightMap,Le.pointShadowMap.value=I.state.pointShadowMap,Le.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=Ce,O.uniformsList=null,Ce}function la(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=Ps.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function ca(S,L){const F=Ne.get(S);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function Xl(S,L,F,O,I){L.isScene!==!0&&(L=Ee),M.resetTextureUnits();const de=L.fog,me=O.isMeshStandardMaterial?L.environment:null,Se=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Cn,be=(O.isMeshStandardMaterial?N:y).get(O.envMap||me),Oe=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ce=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Le=!!F.morphAttributes.position,ot=!!F.morphAttributes.normal,Wt=!!F.morphAttributes.color;let yt=Bn;O.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(yt=x.toneMapping);const xn=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,st=xn!==void 0?xn.length:0,Be=Ne.get(O),js=m.state.lights;if(q===!0&&(ce===!0||S!==v)){const Zt=S===v&&O.id===H;Fe.setState(O,S,Zt)}let at=!1;O.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==js.state.version||Be.outputColorSpace!==Se||I.isBatchedMesh&&Be.batching===!1||!I.isBatchedMesh&&Be.batching===!0||I.isInstancedMesh&&Be.instancing===!1||!I.isInstancedMesh&&Be.instancing===!0||I.isSkinnedMesh&&Be.skinning===!1||!I.isSkinnedMesh&&Be.skinning===!0||I.isInstancedMesh&&Be.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Be.instancingColor===!1&&I.instanceColor!==null||Be.envMap!==be||O.fog===!0&&Be.fog!==de||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Fe.numPlanes||Be.numIntersection!==Fe.numIntersection)||Be.vertexAlphas!==Oe||Be.vertexTangents!==Ce||Be.morphTargets!==Le||Be.morphNormals!==ot||Be.morphColors!==Wt||Be.toneMapping!==yt||Re.isWebGL2===!0&&Be.morphTargetsCount!==st)&&(at=!0):(at=!0,Be.__version=O.version);let Gn=Be.currentProgram;at===!0&&(Gn=is(O,L,I));let da=!1,Bi=!1,Zs=!1;const At=Gn.getUniforms(),Hn=Be.uniforms;if(fe.useProgram(Gn.program)&&(da=!0,Bi=!0,Zs=!0),O.id!==H&&(H=O.id,Bi=!0),da||v!==S){At.setValue(D,"projectionMatrix",S.projectionMatrix),At.setValue(D,"viewMatrix",S.matrixWorldInverse);const Zt=At.map.cameraPosition;Zt!==void 0&&Zt.setValue(D,Ue.setFromMatrixPosition(S.matrixWorld)),Re.logarithmicDepthBuffer&&At.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&At.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,Bi=!0,Zs=!0)}if(I.isSkinnedMesh){At.setOptional(D,I,"bindMatrix"),At.setOptional(D,I,"bindMatrixInverse");const Zt=I.skeleton;Zt&&(Re.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),At.setValue(D,"boneTexture",Zt.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(At.setOptional(D,I,"batchingTexture"),At.setValue(D,"batchingTexture",I._matricesTexture,M));const Ks=F.morphAttributes;if((Ks.position!==void 0||Ks.normal!==void 0||Ks.color!==void 0&&Re.isWebGL2===!0)&&Ge.update(I,F,Gn),(Bi||Be.receiveShadow!==I.receiveShadow)&&(Be.receiveShadow=I.receiveShadow,At.setValue(D,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Hn.envMap.value=be,Hn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),Bi&&(At.setValue(D,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&Yl(Hn,Zs),de&&O.fog===!0&&le.refreshFogUniforms(Hn,de),le.refreshMaterialUniforms(Hn,O,X,G,_e),Ps.upload(D,la(Be),Hn,M)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ps.upload(D,la(Be),Hn,M),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&At.setValue(D,"center",I.center),At.setValue(D,"modelViewMatrix",I.modelViewMatrix),At.setValue(D,"normalMatrix",I.normalMatrix),At.setValue(D,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Zt=O.uniformsGroups;for(let Js=0,jl=Zt.length;Js<jl;Js++)if(Re.isWebGL2){const ua=Zt[Js];Ye.update(ua,Gn),Ye.bind(ua,Gn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Gn}function Yl(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function ql(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,L,F){Ne.get(S.texture).__webglTexture=L,Ne.get(S.depthTexture).__webglTexture=F;const O=Ne.get(S);O.__hasExternalTextures=!0,O.__hasExternalTextures&&(O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,L){const F=Ne.get(S);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,F=0){w=S,C=L,A=F;let O=!0,I=null,de=!1,me=!1;if(S){const be=Ne.get(S);be.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(D.FRAMEBUFFER,null),O=!1):be.__webglFramebuffer===void 0?M.setupRenderTarget(S):be.__hasExternalTextures&&M.rebindTextures(S,Ne.get(S.texture).__webglTexture,Ne.get(S.depthTexture).__webglTexture);const Oe=S.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(me=!0);const Ce=Ne.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[L])?I=Ce[L][F]:I=Ce[L],de=!0):Re.isWebGL2&&S.samples>0&&M.useMultisampledRTT(S)===!1?I=Ne.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?I=Ce[F]:I=Ce,T.copy(S.viewport),B.copy(S.scissor),V=S.scissorTest}else T.copy(Y).multiplyScalar(X).floor(),B.copy(Q).multiplyScalar(X).floor(),V=ee;if(fe.bindFramebuffer(D.FRAMEBUFFER,I)&&Re.drawBuffers&&O&&fe.drawBuffers(S,I),fe.viewport(T),fe.scissor(B),fe.setScissorTest(V),de){const be=Ne.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,be.__webglTexture,F)}else if(me){const be=Ne.get(S.texture),Oe=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.__webglTexture,F||0,Oe)}H=-1},this.readRenderTargetPixels=function(S,L,F,O,I,de,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ne.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){fe.bindFramebuffer(D.FRAMEBUFFER,Se);try{const be=S.texture,Oe=be.format,Ce=be.type;if(Oe!==on&&he.convert(Oe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Ce===ji&&(xe.has("EXT_color_buffer_half_float")||Re.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ce!==zn&&he.convert(Ce)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===On&&(Re.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-O&&F>=0&&F<=S.height-I&&D.readPixels(L,F,O,I,he.convert(Oe),he.convert(Ce),de)}finally{const be=w!==null?Ne.get(w).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(S,L,F=0){const O=Math.pow(2,-F),I=Math.floor(L.image.width*O),de=Math.floor(L.image.height*O);M.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,S.x,S.y,I,de),fe.unbindTexture()},this.copyTextureToTexture=function(S,L,F,O=0){const I=L.image.width,de=L.image.height,me=he.convert(F.format),Se=he.convert(F.type);M.setTexture2D(F,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,S.x,S.y,I,de,me,Se,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,S.x,S.y,L.mipmaps[0].width,L.mipmaps[0].height,me,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,O,S.x,S.y,me,Se,L.image),O===0&&F.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,L,F,O,I=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,Se=S.max.z-S.min.z+1,be=he.convert(O.format),Oe=he.convert(O.type);let Ce;if(O.isData3DTexture)M.setTexture3D(O,0),Ce=D.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)M.setTexture2DArray(O,0),Ce=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Le=D.getParameter(D.UNPACK_ROW_LENGTH),ot=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Wt=D.getParameter(D.UNPACK_SKIP_PIXELS),yt=D.getParameter(D.UNPACK_SKIP_ROWS),xn=D.getParameter(D.UNPACK_SKIP_IMAGES),st=F.isCompressedTexture?F.mipmaps[I]:F.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,st.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,st.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,S.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,S.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,S.min.z),F.isDataTexture||F.isData3DTexture?D.texSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Se,be,Oe,st.data):F.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Se,be,st.data)):D.texSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Se,be,Oe,st),D.pixelStorei(D.UNPACK_ROW_LENGTH,Le),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Wt),D.pixelStorei(D.UNPACK_SKIP_ROWS,yt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,xn),I===0&&O.generateMipmaps&&D.generateMipmap(Ce),fe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?M.setTextureCube(S,0):S.isData3DTexture?M.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?M.setTexture2DArray(S,0):M.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){C=0,A=0,w=null,fe.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ea?"display-p3":"srgb",t.unpackColorSpace=Ze.workingColorSpace===$s?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Tt?ni:ul}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ni?Tt:Cn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Bm extends Il{}Bm.prototype.isWebGL1Renderer=!0;class zm extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Nl extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zo=new U,Go=new U,Ho=new St,Ur=new _l,ws=new Xs;class Gm extends Vt{constructor(e=new yn,t=new Nl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)zo.fromBufferAttribute(t,s-1),Go.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=zo.distanceTo(Go);e.setAttribute("lineDistance",new cn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(s),ws.radius+=r,e.ray.intersectsSphere(ws)===!1)return;Ho.copy(s).invert(),Ur.copy(e.ray).applyMatrix4(Ho);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new U,d=new U,u=new U,f=new U,h=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),E=Math.min(g.count,o.start+o.count);for(let x=p,b=E-1;x<b;x+=h){const C=g.getX(x),A=g.getX(x+1);if(c.fromBufferAttribute(m,C),d.fromBufferAttribute(m,A),Ur.distanceSqToSegment(c,d,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(f);H<e.near||H>e.far||t.push({distance:H,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),E=Math.min(m.count,o.start+o.count);for(let x=p,b=E-1;x<b;x+=h){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),Ur.distanceSqToSegment(c,d,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class Dr extends Bt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Vo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Hm{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,f=c.length;u<f;u+=2){const h=c[u],g=c[u+1];if(h.global&&(h.lastIndex=0),h.test(d))return g}return null}}}const Vm=new Hm;class na{constructor(e){this.manager=e!==void 0?e:Vm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}na.DEFAULT_MATERIAL_NAME="__DEFAULT";class Wm extends na{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Vo.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Zi("img");function l(){d(),Vo.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class ki extends na{constructor(e){super(e)}load(e,t,n,s){const r=new Bt,o=new Wm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jr);const $m="/assets/Overworld-D95CtR7o.png",ia="/assets/hoverselect-03w42iXs.png",Xm="modulepreload",Ym=function(i){return"/"+i},Wo={},qm=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var o=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=c(t.map(d=>{if(d=Ym(d),d in Wo)return;Wo[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Xm,u||(h.as="script"),h.crossOrigin="",h.href=d,l&&h.setAttribute("nonce",l),document.head.appendChild(h),u)return new Promise((g,_)=>{h.addEventListener("load",g),h.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},Vs=class Vs{static async loadGlobe(e,t){if(console.log("Loading globe:",t),console.log("Globe enemies:",t.enemies),we.enemyUnits=[],t.enemies.forEach((n,s)=>{if(!n){console.error(`Enemy unit at index ${s} is null or undefined`);return}console.log("Processing enemy unit:",n),n.team!=="enemy"&&(n.team="enemy"),we.addUnitToEnemies(n)}),this.placePlayerUnits(e),this.placeEnemyUnits(e),t.battleCondition.effect(we.playerParty,we.enemyUnits),re&&!re.isGameStarted()){console.log("🎮 Starting turn manager automatically after globe load"),re.startGame();const{updateTurnDisplay:n}=await qm(async()=>{const{updateTurnDisplay:s}=await Promise.resolve().then(()=>qg);return{updateTurnDisplay:s}},void 0);n(re),setTimeout(()=>{console.log("🎯 Initializing unit selection indicators after delay"),e.updateUnitSelectionIndicators()},200)}}static placePlayerUnits(e){const t=we.playerParty;console.log("Placing player units:",t),t.forEach((n,s)=>{if(s<this.PLAYER_SPAWN_POINTS.length){const r=this.PLAYER_SPAWN_POINTS[s];e.placeUnit(n,r.x,r.y)}})}static placeEnemyUnits(e){const t=we.enemyUnits;console.log("Placing enemy units:",t),t.forEach((n,s)=>{if(s<this.ENEMY_SPAWN_POINTS.length){const r=this.ENEMY_SPAWN_POINTS[s];e.placeUnit(n,r.x,r.y)}})}};Vs.PLAYER_SPAWN_POINTS=[{x:3,y:6},{x:4,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7}],Vs.ENEMY_SPAWN_POINTS=[{x:4,y:1},{x:3,y:1},{x:4,y:0},{x:3,y:0},{x:2,y:0}];let qr=Vs;class jm{constructor(e=8,t=8){this.occupiedTiles=new Map,this.mapWidth=e,this.mapHeight=t}updateOccupiedTiles(e){this.occupiedTiles.clear();for(const[t,n]of e){const s=`${n.x},${n.y}`;this.occupiedTiles.set(s,t)}}calculateValidMovement(e,t){const n=[],s=new Map,r=e.move||3;console.log(`🗺️ Calculating movement for ${e.name} with move range ${r} from (${t.x}, ${t.y})`),console.log("🔍 Unit properties:",{name:e.name,range:e.range,move:e.move,className:e.className});const o=[],a=new Set;for(o.push({pos:t,distance:0,path:[t]}),a.add(`${t.x},${t.y}`);o.length>0;){const{pos:c,distance:d,path:u}=o.shift();if(d>0&&d<=r){const f=`${c.x},${c.y}`;this.occupiedTiles.has(f)?console.log(`❌ Occupied tile at distance ${d}: (${c.x}, ${c.y}) - occupied by ${this.occupiedTiles.get(f)?.name}`):(n.push({x:c.x,y:c.y}),s.set(f,[...u]),console.log(`✅ Valid tile at distance ${d}: (${c.x}, ${c.y})`))}if(d<r){const f=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];for(const h of f){const g={x:c.x+h.x,y:c.y+h.y},_=`${g.x},${g.y}`;g.x>=0&&g.x<this.mapWidth&&g.y>=0&&g.y<this.mapHeight&&!a.has(_)&&(a.add(_),o.push({pos:g,distance:d+1,path:[...u,g]}),console.log(`🔍 Exploring: (${g.x}, ${g.y}) at distance ${d+1}`))}}}console.log(`🎯 Found ${n.length} valid movement tiles with range ${r}`),console.log("📋 Valid tiles by distance:");const l={};for(const c of n){const d=Math.abs(c.x-t.x)+Math.abs(c.y-t.y);l[d]||(l[d]=[]),l[d].push(c)}for(let c=1;c<=r;c++){const d=l[c]||[];console.log(`  Distance ${c}: ${d.length} tiles`,d)}return{validTiles:n,paths:s}}calculateStepPath(e,t){const n=[e],s={x:e.x,y:e.y};for(;s.x!==t.x;)s.x<t.x?s.x++:s.x--,n.push({x:s.x,y:s.y});for(;s.y!==t.y;)s.y<t.y?s.y++:s.y--,n.push({x:s.x,y:s.y});return console.log(`🛤️ Step path from (${e.x},${e.y}) to (${t.x},${t.y}):`,n),n}isValidMovementTile(e,t,n){const s=e.move||3,r=Math.abs(n.x-t.x)+Math.abs(n.y-t.y),o=`${n.x},${n.y}`;return r<=s&&!this.occupiedTiles.has(o)&&n.x>=0&&n.x<this.mapWidth&&n.y>=0&&n.y<this.mapHeight}setMapDimensions(e,t){this.mapWidth=e,this.mapHeight=t,console.log(`🗺️ NavigationManager map dimensions set to ${e}x${t}`)}}const jr=new jm;let Yt=32,Ot=32;function Zm(i,e){Yt=i,Ot=e}class Km{constructor(){this.unitPositions=new Map,this.unitMeshes=new Map,this.unitBorders=new Map,this.unitHealthBars=new Map,this.unitEnergyBars=new Map,this.textureLoader=new ki}async placeUnit(e,t,n){console.log(`Placing unit ${e.name} at (${t}, ${n})`),this.unitPositions.set(e,{x:t,y:n}),we.playerParty.includes(e)?e.team="player":we.enemyUnits.includes(e)&&(e.team="enemy"),se&&Yi?this.textureLoader.load(e.imageUrl,s=>{if(!se)return;s.magFilter=qe,s.minFilter=qe,s.flipY=!0,s.generateMipmaps=!1,s.wrapS=jt,s.wrapT=jt;const r=s.image.width,o=s.image.height;console.log(`Unit ${e.name} image size: ${r}x${o}`);const l=Yt/r,c=r*l,d=o*l;console.log(`Scaling unit to ${c}x${d} (scale factor: ${l})`);const u=new ct(c,d),f=new pt({map:s,transparent:!0,alphaTest:.1,depthTest:!0,depthWrite:!1}),h=new tt(u,f);h.position.set(t*Yt+Yt/2,-n*Ot-Ot/2,1),se&&(se.add(h),this.unitMeshes.set(e,h),console.log(`Added unit mesh to scene at (${h.position.x}, ${h.position.y}) scaled to ${c}x${d}`),this.createUnitBorder(e,c,d,h.position.x,h.position.y),this.createUnitBars(e,h.position.x,h.position.y))}):console.error("Three.js scene or camera not initialized")}getUnitPosition(e){return this.unitPositions.get(e)}removeUnit(e){const t=this.unitMeshes.get(e);t&&se&&(se.remove(t),this.unitMeshes.delete(e));const n=this.unitBorders.get(e);n&&se&&(se.remove(n),this.unitBorders.delete(e));const s=this.unitHealthBars.get(e);if(s&&se){const o=s.backgroundMesh;o&&se.remove(o),se.remove(s),this.unitHealthBars.delete(e)}const r=this.unitEnergyBars.get(e);if(r&&se){const o=r.backgroundMesh;o&&se.remove(o),se.remove(r),this.unitEnergyBars.delete(e)}this.unitPositions.delete(e),console.log(`Removed unit ${e.name} from scene`)}getUnitAtPosition(e,t){for(const[n,s]of this.unitPositions)if(s.x===e&&s.y===t)return n;return null}getAllUnits(){return Array.from(this.unitPositions.keys())}moveUnitToPosition(e,t){this.unitPositions.set(e,t);const n=this.unitMeshes.get(e);n&&(n.position.set(t.x*Yt+Yt/2,-t.y*Ot-Ot/2,1),this.updateUnitBorder(e,n.position.x,n.position.y),this.updateUnitBarsPosition(e,n.position.x,n.position.y)),console.log(`Moved unit ${e.name} to (${t.x}, ${t.y})`)}createUnitBorder(e,t,n,s,r){if(!se)return;const o=e.team==="player"?16711680:255,a=2,l=Yt,c=Ot,d=[new U(-l/2,c/2,0),new U(l/2,c/2,0),new U(l/2,-c/2,0),new U(-l/2,-c/2,0),new U(-l/2,c/2,0)],u=new yn().setFromPoints(d),f=new Nl({color:o,linewidth:a,transparent:!0,opacity:.8}),h=new Gm(u,f);h.position.set(s,r,.9),se.add(h),this.unitBorders.set(e,h),console.log(`✅ Added ${e.team} team border for ${e.name} (size: ${l}x${c}, color: ${o.toString(16)})`)}updateUnitBorder(e,t,n){const s=this.unitBorders.get(e);s&&s.position.set(t,n,.9)}updateUnitBarsPosition(e,t,n){const o=this.unitHealthBars.get(e),a=o?o.backgroundMesh:null;if(o&&a){const d=n-Ot/2+4+2;a.position.set(t,d,1.1),o.position.set(o.position.x-(o.position.x-t),d,1.2)}const l=this.unitEnergyBars.get(e),c=l?l.backgroundMesh:null;if(l&&c){const d=n-Ot/2+4+2-6;c.position.set(t,d,1.1),l.position.set(l.position.x-(l.position.x-t),d,1.2)}console.log(`🔄 Updated unit bars position for ${e.name} at (${t}, ${n})`)}createUnitBars(e,t,n){if(!se)return;const s=Yt*.8,r=4,o=6,a=e.currentHealth/e.health,l=s*a,c=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,d=s*c,u=new ct(s,r),f=new pt({color:3355443,transparent:!0,opacity:.8}),h=new tt(u,f),g=new ct(l,r),_=new pt({color:65280,transparent:!0,opacity:.9}),m=new tt(g,_),p=new ct(s,r),E=new pt({color:3355443,transparent:!0,opacity:.8}),x=new tt(p,E),b=new ct(d,r),C=new pt({color:33023,transparent:!0,opacity:.9}),A=new tt(b,C),w=n-Ot/2+r+2,H=w-o;h.position.set(t,w,1.1),m.position.set(t-(s-l)/2,w,1.2),x.position.set(t,H,1.1),A.position.set(t-(s-d)/2,H,1.2),se.add(h),se.add(m),se.add(x),se.add(A),this.unitHealthBars.set(e,m),this.unitEnergyBars.set(e,A),m.backgroundMesh=h,A.backgroundMesh=x,console.log(`💚💙 Created health/energy bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(a*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(c*100)}%)`)}updateUnitBars(e){if(!se)return;if(!e){console.warn("❌ updateUnitBars called with undefined unit");return}console.log(`🎨 updateUnitBars called for ${e.name} - Current energy: ${e.currentEnergy}/${e.maxEnergy}`);const t=Yt*.8,n=e.currentHealth/e.health,s=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,r=this.unitHealthBars.get(e);if(r){console.log(`💚 Updating health bar for ${e.name}: ${n*100}% (${e.currentHealth}/${e.health})`);const a=Math.max(.1,t*n),l=new ct(a,4);r.geometry.dispose(),r.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Yt+Yt/2,f=-c.y*Ot-Ot/2-Ot/2+4+2,h=d-(t-a)/2;r.position.set(h,f,1.2)}r.visible=n>0}else console.warn(`❌ No health bar found for ${e.name}`);const o=this.unitEnergyBars.get(e);if(o){console.log(`💙 Updating energy bar for ${e.name}: ${s*100}% (${e.currentEnergy}/${e.maxEnergy})`);const a=Math.max(.1,t*s),l=new ct(a,4);o.geometry.dispose(),o.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Yt+Yt/2,h=-c.y*Ot-Ot/2-Ot/2+4+2-6,g=d-(t-a)/2;o.position.set(g,h,1.2)}o.visible=s>0}else console.warn(`❌ No energy bar found for ${e.name}`);console.log(`🔄 Updated bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(n*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(s*100)}%)`)}getUnitMesh(e){return this.unitMeshes.get(e)}getUnitPositions(){return this.unitPositions}getUnitBorder(e){return this.unitBorders.get(e)}setUnitBorder(e,t){this.unitBorders.set(e,t)}getUnitHealthBar(e){return this.unitHealthBars.get(e)}setUnitHealthBar(e,t){this.unitHealthBars.set(e,t)}getUnitEnergyBar(e){return this.unitEnergyBars.get(e)}setUnitEnergyBar(e,t){this.unitEnergyBars.set(e,t)}}const Jm="/assets/select-s3pTX8ku.png";let Ls=32,Us=32;function Qm(i,e){Ls=i,Us=e}class eg{constructor(){this.selectedUnit=null,this.textureLoader=new ki,this.selectTexture=null,this.selectionIndicators=new Map,this.loadSelectTexture()}async loadSelectTexture(){this.selectTexture=await this.textureLoader.loadAsync(Jm),this.selectTexture.magFilter=qe,this.selectTexture.minFilter=qe}updateUnitSelectionIndicators(e){if(console.log("🎯 Updating unit selection indicators"),this.clearSelectionIndicators(),!re||!re.canSelect()){console.log("❌ Cannot show selection indicators - not in SELECT phase");return}const t=re.getSelectableUnits();console.log(`📋 Found ${t.length} selectable units`),t.forEach(n=>{const s=e(n);s&&this.selectTexture&&se&&this.createSelectionIndicator(n,s.x,s.y)})}createSelectionIndicator(e,t,n){if(!this.selectTexture||!se){console.warn("❌ Cannot create selection indicator - texture or scene not available");return}const s=new ct(Ls,Us),r=new pt({map:this.selectTexture,transparent:!0,opacity:.8}),o=new tt(s,r);o.position.set(t*Ls+Ls/2,-n*Us-Us/2,.5),se.add(o),this.selectionIndicators.set(e,o),console.log(`✅ Created selection indicator for ${e.name} at (${t}, ${n})`)}clearSelectionIndicators(){this.selectionIndicators.forEach((e,t)=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.selectionIndicators.clear(),console.log("🧹 Cleared all selection indicators")}selectUnit(e){return re&&re.canSelect()?re.getSelectableUnits().some(s=>s.id===e.id)?(this.selectedUnit=e,console.log(`✅ Selected unit: ${e.name}`),!0):(console.log(`❌ Unit ${e.name} is not selectable`),!1):(console.log("❌ Cannot select unit - not in SELECT phase"),!1)}setSelectedUnit(e){this.selectedUnit=e,console.log(`🎯 Set selected unit: ${e.name}`)}getSelectedUnit(){return this.selectedUnit}cleanup(){this.clearSelectionIndicators()}}let Zn=32,Kn=32;function tg(i,e){Zn=i,Kn=e}class ng{constructor(){this.textureLoader=new ki,this.hoverSelectTexture=null,this.movementIndicators=[],this.selectedMoveTarget=null,this.currentMovementData=null,this.pathIndicators=[],this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(ia),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe}enterMovePhase(e,t,n){console.log(`🚶 Entering MOVE phase for ${e.name}`),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null;const s=t(e);if(!s){console.error(`❌ No position found for unit ${e.name}`);return}const r=n(),o=new Map;r.forEach((l,c)=>{o.set(c,{x:l.x,y:l.y})}),jr.updateOccupiedTiles(o);const a=jr.calculateValidMovement(e,s);this.currentMovementData=a,this.createMovementIndicators(a.validTiles),console.log(`✅ Created ${a.validTiles.length} movement indicators for ${e.name}`)}createMovementIndicators(e){if(!this.hoverSelectTexture||!se){console.warn("❌ Cannot create movement indicators - texture or scene not available");return}e.forEach(t=>{const n=new ct(Zn,Kn),s=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:65280}),r=new tt(n,s);r.position.set(t.x*Zn+Zn/2,-t.y*Kn-Kn/2,.4),se&&(se.add(r),this.movementIndicators.push(r))}),console.log(`✅ Created ${e.length} movement indicators`)}clearMovementIndicators(){this.movementIndicators.forEach(e=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.movementIndicators=[],console.log("🧹 Cleared movement indicators")}exitMovePhase(){console.log("🚪 Exiting MOVE phase"),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null,this.currentMovementData=null}selectMoveTarget(e,t){return console.log(`🎯 Attempting to select move target: (${e}, ${t})`),this.currentMovementData?this.currentMovementData.validTiles.some(s=>s.x===e&&s.y===t)?(this.selectedMoveTarget={x:e,y:t},console.log(`✅ Selected valid move target: (${e}, ${t})`),!0):(console.log(`❌ Invalid move target: (${e}, ${t}) - not in valid tiles`),!1):(console.warn("❌ No movement data available"),!1)}drawPathToTarget(e,t){if(console.log("🛤️ Drawing path to target"),this.clearPathIndicators(),!this.selectedMoveTarget||!this.currentMovementData){console.warn("❌ No target selected or movement data missing");return}if(!e(t)){console.error(`❌ No position found for unit ${t.name}`);return}const s=`${this.selectedMoveTarget.x},${this.selectedMoveTarget.y}`,r=this.currentMovementData.paths.get(s);r&&r.length>1&&(this.createPathIndicators(r),console.log(`✅ Created path with ${r.length} steps`))}createPathIndicators(e){if(!(!this.hoverSelectTexture||!se))for(let t=1;t<e.length;t++){const n=e[t],s=new ct(Zn*.5,Kn*.5),r=new pt({color:16776960,transparent:!0,opacity:.8}),o=new tt(s,r);o.position.set(n.x*Zn+Zn/2,-n.y*Kn-Kn/2,.6),se&&(se.add(o),this.pathIndicators.push(o))}}clearPathIndicators(){this.pathIndicators.forEach(e=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.pathIndicators=[]}getSelectedMoveTarget(){return this.selectedMoveTarget}cancelMove(){console.log("❌ Cancelling move"),this.clearPathIndicators(),this.selectedMoveTarget=null}}let un=32,hn=32;function ig(i,e){un=i,hn=e}class sg{constructor(){this.textureLoader=new ki,this.hoverSelectTexture=null,this.attackIndicators=[],this.skillTargetIndicators=[],this.skillPreviewIndicators=[],this.selectedAttackTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.selectedSkillTarget=null,this.skillRotation=0,this.attackMode="basic",this.currentSkill=null,this.targetUnit=null,this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(ia),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe}enterActionPhase(e,t,n){console.log(`⚔️ Entering ACTION phase for ${e.name}`),this.clearAttackIndicators(),this.selectedAttackTarget=null,this.currentAttackData=null,this.targetUnit=null,this.attackMode="basic",this.currentSkill=null}exitActionPhase(){console.log("🚪 Exiting ACTION phase"),this.clearAttackIndicators(),this.clearSkillTargetIndicators(),this.clearSkillPreviewIndicators(),this.selectedAttackTarget=null,this.selectedSkillTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.skillRotation=0,this.targetUnit=null,this.attackMode="basic",this.currentSkill=null}setAttackMode(e,t){this.attackMode=e,this.currentSkill=t,console.log(`🎯 Attack mode set to: ${e}${t?` (${t.name})`:""}`)}setAttackData(e){this.currentAttackData=e,console.log(`📋 Attack data set with ${e.validTiles.length} valid targets`)}createAttackIndicators(){if(console.log("🎯 Creating attack indicators"),this.clearAttackIndicators(),!this.currentAttackData||!this.hoverSelectTexture||!se){console.warn("❌ Cannot create attack indicators - missing data, texture, or scene");return}this.currentAttackData.validTiles.forEach(e=>{const t=new ct(un,hn),n=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:16711680}),s=new tt(t,n);s.position.set(e.x*un+un/2,-e.y*hn-hn/2,.4),se&&(se.add(s),this.attackIndicators.push(s))}),console.log(`✅ Created ${this.currentAttackData.validTiles.length} attack indicators`)}clearAttackIndicators(){this.attackIndicators.forEach(e=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.attackIndicators=[],console.log("🧹 Cleared attack indicators")}clearSkillTargetIndicators(){this.skillTargetIndicators.forEach(e=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.skillTargetIndicators=[],console.log("🧹 Cleared skill target indicators")}clearSkillPreviewIndicators(){this.skillPreviewIndicators.forEach(e=>{se&&se.remove(e),e.geometry.dispose(),e.material instanceof ln&&e.material.dispose()}),this.skillPreviewIndicators=[],console.log("🧹 Cleared skill preview indicators")}setSkillTarget(e,t){console.log(`🎯 Setting skill target for ${e.name}`),this.currentSkill=e,this.selectedSkillTarget=t,this.skillRotation=0}showSkillPreview(e,t){if(console.log(`👁️ Showing skill preview at (${e}, ${t})`),this.clearSkillPreviewIndicators(),!this.currentSkill||!this.hoverSelectTexture||!se){console.warn("❌ Cannot show skill preview - missing skill, texture, or scene");return}const n=this.currentSkill.getTargetPattern(e,t,"north",this.skillRotation);n.forEach(s=>{if(s.x>=0&&s.x<8&&s.y>=0&&s.y<8){const r=new ct(un,hn),o=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:s.isPrimary?16746496:16776960}),a=new tt(r,o);a.position.set(s.x*un+un/2,-s.y*hn-hn/2,.5),se&&(se.add(a),this.skillPreviewIndicators.push(a))}}),console.log(`✅ Created ${n.length} skill preview indicators`)}setSkillTargeting(e,t){console.log(`🎯 Setting skill targeting for ${e.name} with ${t.length} targets`),this.currentSkill=e,this.validSkillTargets=t,this.selectedSkillTarget=null,this.skillRotation=0}createSkillTargetIndicators(){if(console.log("✨ Creating skill target indicators"),this.clearSkillTargetIndicators(),!this.validSkillTargets.length||!this.hoverSelectTexture||!se){console.warn("❌ Cannot create skill target indicators - missing data, texture, or scene");return}this.validSkillTargets.forEach(e=>{const t=new ct(un,hn),n=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:65280}),s=new tt(t,n);s.position.set(e.x*un+un/2,-e.y*hn-hn/2,.4),se&&(se.add(s),this.skillTargetIndicators.push(s))}),console.log(`✅ Created ${this.validSkillTargets.length} skill target indicators`)}selectAttackTarget(e,t,n,s){if(console.log(`🎯 Attempting to select attack target at (${e}, ${t})`),console.log("📋 Debug - currentAttackData exists:",!!this.currentAttackData),console.log("📋 Debug - validSkillTargets exists:",!!this.validSkillTargets.length),console.log("📋 Debug - attackMode:",this.attackMode),this.attackMode==="skill"){if(!this.validSkillTargets.length&&!this.currentAttackData)return console.warn("❌ No skill targets or attack data available"),{success:!1,targetUnit:null}}else if(!this.currentAttackData)return console.warn("❌ No attack data available"),{success:!1,targetUnit:null};let r=!1;if(this.attackMode==="skill"&&this.validSkillTargets.length>0?(r=this.validSkillTargets.some(a=>a.x===e&&a.y===t),console.log("📋 Debug - isValidSkillTarget:",r),console.log("📋 Debug - validSkillTargets:",this.validSkillTargets)):this.currentAttackData&&(r=this.currentAttackData.validTiles.some(a=>a.x===e&&a.y===t),console.log("📋 Debug - isValidAttackTarget:",r),console.log("📋 Debug - validTiles:",this.currentAttackData.validTiles)),!r)return console.log(`❌ Invalid target: (${e}, ${t}) - not in valid targets`),{success:!1,targetUnit:null};if(this.attackMode==="basic"){const a=n(e,t);return console.log("📋 Debug - targetUnit at position:",a?`${a.name} (${a.team})`:"null"),a?a.team===s.team?(console.log(`❌ Cannot attack unit of same team: ${a.name}`),{success:!1,targetUnit:null}):(this.selectedAttackTarget={x:e,y:t},this.targetUnit=a,console.log(`✅ Selected valid attack target: ${a.name} at (${e}, ${t})`),console.log("📋 Debug - After setting: selectedAttackTarget:",this.selectedAttackTarget),console.log("📋 Debug - After setting: targetUnit:",this.targetUnit?`${this.targetUnit.name}`:"null"),{success:!0,targetUnit:a}):(console.log(`❌ No unit found at attack target (${e}, ${t})`),{success:!1,targetUnit:null})}if(this.currentSkill){if(!this.validSkillTargets.some(c=>c.x===e&&c.y===t))return console.log(`❌ Invalid skill target: (${e}, ${t}) - not in valid skill targets`),{success:!1,targetUnit:null};this.selectedSkillTarget={x:e,y:t};const l=n(e,t);return this.targetUnit=l,console.log(`✅ Selected skill target at (${e}, ${t})${l?` with unit ${l.name}`:" (empty tile)"}`),{success:!0,targetUnit:l}}this.selectedAttackTarget={x:e,y:t};const o=n(e,t);return this.targetUnit=o,console.log(`✅ Selected skill target at (${e}, ${t})${o?` with unit ${o.name}`:" (empty tile)"}`),{success:!0,targetUnit:o}}getCurrentAttackMode(){return this.attackMode}getCurrentSkill(){return this.currentSkill}confirmAttack(e){if(console.log(`⚔️ Confirming attack from ${e.name}`),console.log("📋 Debug - selectedAttackTarget:",this.selectedAttackTarget),console.log("📋 Debug - targetUnit:",this.targetUnit?`${this.targetUnit.name} (${this.targetUnit.team})`:"null"),console.log("📋 Debug - attackMode:",this.attackMode),console.log("📋 Debug - currentAttackData:",this.currentAttackData),!this.selectedAttackTarget||!this.targetUnit)return console.warn("❌ No attack target selected"),console.warn("❌ Missing data:",{hasTarget:!!this.selectedAttackTarget,hasUnit:!!this.targetUnit}),null;if(this.attackMode==="basic"){const t=e.basicDamage;console.log(`💥 Calculating damage: ${t} (from ${e.name}.basicDamage)`);const n=this.targetUnit.currentHealth;this.targetUnit.currentHealth=Math.max(0,this.targetUnit.currentHealth-t);const s=this.targetUnit.currentHealth,r=e.currentEnergy;return e.energyType.toLowerCase()==="kinetic"?(e.currentEnergy=Math.min(e.maxEnergy,e.currentEnergy+5),console.log(`⚡ Kinetic unit ${e.name} gains 5 energy from attack: ${r} → ${e.currentEnergy}/${e.maxEnergy}`)):(e.currentEnergy=Math.max(0,e.currentEnergy-1),console.log(`⚡ Potential unit ${e.name} consumes 1 energy: ${r} → ${e.currentEnergy}/${e.maxEnergy}`)),console.log(`💥 ${e.name} attacks ${this.targetUnit.name} for ${t} damage`),console.log(`🩸 ${this.targetUnit.name} health: ${n} → ${s}/${this.targetUnit.health}`),{success:!0,damage:t,target:this.targetUnit}}return console.warn("❌ Skill attacks not yet implemented"),null}cancelAttack(){console.log("❌ Cancelling attack"),this.selectedAttackTarget=null,this.targetUnit=null}rotateSkillTargets(){if(console.log("🔄 Rotating skill targets"),!this.currentSkill||!this.selectedSkillTarget){console.warn("❌ No skill or target selected for rotation");return}this.skillRotation=(this.skillRotation+1)%4,console.log(`🔄 Rotated to step ${this.skillRotation}`),this.showSkillPreview(this.selectedSkillTarget.x,this.selectedSkillTarget.y)}confirmSkill(e,t){if(console.log("✨ Confirming skill attack"),!this.currentSkill)return console.warn("❌ No skill selected"),null;let n=this.selectedSkillTarget;if(!n)return console.warn("❌ No skill target selected - this should not happen"),null;if(console.log(`✨ Executing skill: ${this.currentSkill.name} at (${n.x}, ${n.y})`),e.currentEnergy<this.currentSkill.energyCost)return console.warn(`❌ Not enough energy for ${this.currentSkill.name}. Required: ${this.currentSkill.energyCost}, Current: ${e.currentEnergy}`),null;const s=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-this.currentSkill.energyCost),console.log(`⚡ ${e.name} energy: ${s} → ${e.currentEnergy}/${e.maxEnergy}`);const r=this.currentSkill.getTargetPattern(n.x,n.y,"north",this.skillRotation);console.log(`🎯 Skill pattern has ${r.length} targets:`,r);const o=[];r.forEach(c=>{if(c.x>=0&&c.x<8&&c.y>=0&&c.y<8){const d=t(c.x,c.y);d&&(o.push(d),console.log(`🎯 Unit found at (${c.x}, ${c.y}): ${d.name} (${d.team})`))}}),console.log(`💥 Skill will affect ${o.length} units`);const a=e.skillDamage+(this.currentSkill.bonusDamage||0);o.forEach(c=>{if(this.currentSkill?.id==="universal-whisper"){if(c.team===e.team){const d=a,u=c.currentHealth;c.currentHealth=Math.min(c.health,c.currentHealth+d);const f=c.currentHealth;console.log(`💚 ${c.name} healed for ${d}: ${u} → ${f}/${c.health}`)}}else if(c.team!==e.team){const d=c.currentHealth;c.currentHealth=Math.max(0,c.currentHealth-a);const u=c.currentHealth;console.log(`💥 ${c.name} takes ${a} damage: ${d} → ${u}/${c.health}`)}});const l=o.filter(c=>this.currentSkill?.id==="universal-whisper"?c.team===e.team:c.team!==e.team);return console.log(`✅ Skill ${this.currentSkill.name} executed successfully, affected ${l.length} units`),{success:!0,affectedUnits:l,skill:this.currentSkill}}}class rg{showSkipButton(e){console.log("⏭️ Creating skip button..."),this.hideMovementButtons();const t=document.createElement("button");t.id="move-skip-button",t.textContent="Skip Move",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#95a5a6",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Skip button added to document body")}showConfirmCancelButtons(e,t){this.hideMovementButtons();const n=document.createElement("button");n.id="move-confirm-button",n.textContent="Confirm",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#27ae60",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="move-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="90px",s.style.padding="8px 16px",s.style.backgroundColor="#e74c3c",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s)}hideMovementButtons(){const e=document.getElementById("move-skip-button"),t=document.getElementById("move-confirm-button"),n=document.getElementById("move-cancel-button");e&&e.remove(),t&&t.remove(),n&&n.remove()}showActionOptions(e,t,n,s){console.log(`⚔️ Creating action options for ${e.name}...`),this.hideActionButtons();let r=10;const o=document.createElement("button");o.id="action-skip-button",o.textContent="Skip Action",o.style.position="absolute",o.style.top="10px",o.style.right=`${r}px`,o.style.padding="8px 16px",o.style.backgroundColor="#e67e22",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>{console.log("⏭️ Action skip button clicked"),s()},document.body.appendChild(o),r+=120;const a=document.createElement("button");a.id="basic-attack-button",a.textContent="Attack",a.style.position="absolute",a.style.top="10px",a.style.right=`${r}px`,a.style.padding="8px 16px",a.style.backgroundColor="#c0392b",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>{console.log("⚔️ Basic attack button clicked"),t()},document.body.appendChild(a),r+=80,e.skills.forEach((l,c)=>{const d=e.currentEnergy>=l.energyCost,u=document.createElement("button");u.id=`skill-button-${c}`,u.textContent=`${l.emoji} ${l.name}`,u.style.position="absolute",u.style.top="10px",u.style.right=`${r}px`,u.style.padding="8px 16px",u.style.backgroundColor=d?"#8e44ad":"#7f8c8d",u.style.color="white",u.style.border="none",u.style.borderRadius="5px",u.style.cursor=d?"pointer":"not-allowed",u.style.zIndex="1000",u.style.fontFamily="sans-serif",u.style.fontWeight="bold",u.style.opacity=d?"1":"0.5",d&&(u.onclick=()=>{console.log(`✨ Skill button clicked: ${l.name}`),n(l)}),u.title=`${l.name} (${l.energyCost} energy)
${l.description}`,document.body.appendChild(u),r+=u.textContent.length*8+32}),console.log("✅ Action options added to document body")}showActionSkipButton(e){console.log("⏭️ Creating action skip button..."),this.hideActionButtons();const t=document.createElement("button");t.id="action-skip-button",t.textContent="Skip Action",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#e67e22",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Action skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Action skip button added to document body")}showAttackConfirmCancelButtons(e,t){console.log("🔴 showAttackConfirmCancelButtons called"),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const n=document.createElement("button");n.id="attack-confirm-button",n.textContent="Attack",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#c0392b",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="attack-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="80px",s.style.padding="8px 16px",s.style.backgroundColor="#95a5a6",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s),console.log("✅ Added Attack and Cancel buttons to document body")}showSkillConfirmCancelButtons(e,t,n){console.log(`✨ showSkillConfirmCancelButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const s=document.createElement("button");s.id="skill-confirm-button",s.textContent=`Confirm ${e}`,s.style.position="absolute",s.style.top="10px",s.style.right="10px",s.style.padding="8px 16px",s.style.backgroundColor="#8e44ad",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t();const r=document.createElement("button");r.id="skill-cancel-button",r.textContent="Cancel",r.style.position="absolute",r.style.top="10px",r.style.right=`${s.textContent.length*8+32+10}px`,r.style.padding="8px 16px",r.style.backgroundColor="#95a5a6",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>n(),document.body.appendChild(s),document.body.appendChild(r),console.log(`✅ Added ${e} Confirm and Cancel buttons to document body`)}showDualRotationalSkillButtons(e,t,n,s){console.log(`🔄 showDualRotationalSkillButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const r=document.createElement("button");r.id="skill-confirm-button",r.textContent=`Confirm ${e}`,r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.padding="8px 16px",r.style.backgroundColor="#8e44ad",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t();const o=document.createElement("button");o.id="skill-rotate-button",o.textContent="🔄 Rotate",o.style.position="absolute",o.style.top="10px",o.style.right=`${r.textContent.length*8+32+10}px`,o.style.padding="8px 16px",o.style.backgroundColor="#3498db",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>s();const a=document.createElement("button");a.id="skill-cancel-button",a.textContent="Cancel",a.style.position="absolute",a.style.top="10px",a.style.right=`${(r.textContent.length+o.textContent.length)*8+64+20}px`,a.style.padding="8px 16px",a.style.backgroundColor="#95a5a6",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>n(),document.body.appendChild(r),document.body.appendChild(o),document.body.appendChild(a),console.log(`✅ Added ${e} Confirm, Rotate, and Cancel buttons to document body`)}hideActionButtons(){const e=document.getElementById("action-skip-button"),t=document.getElementById("basic-attack-button"),n=document.getElementById("attack-confirm-button"),s=document.getElementById("attack-cancel-button"),r=document.getElementById("skill-confirm-button"),o=document.getElementById("skill-cancel-button"),a=document.getElementById("skill-rotate-button");e&&e.remove(),t&&t.remove(),n&&n.remove(),s&&s.remove(),r&&r.remove(),o&&o.remove(),a&&a.remove();for(let l=0;l<10;l++){const c=document.getElementById(`skill-button-${l}`);c&&c.remove()}}cleanup(){this.hideMovementButtons(),this.hideActionButtons()}}const ag="/assets/boom-DXpj0BEC.png";let Mt=32,Ct=32;function og(i,e){Mt=i,Ct=e}class lg{constructor(){this.textureLoader=new ki}showDamageAnimation(e,t){se&&(this.textureLoader.load(ag,n=>{if(!se)return;n.magFilter=qe,n.minFilter=qe,n.flipY=!0,n.generateMipmaps=!1;const s=new ct(Mt*.8,Mt*.8),r=new pt({map:n,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),o=new tt(s,r),a=t(e);if(a){const l=a.x*Mt+Mt/2,c=-a.y*Ct-Ct/2;o.position.set(l,c,2.5),se.add(o),setTimeout(()=>{se&&se.remove(o)},500)}}),this.flickerUnit(e))}flickerUnit(e,t){let n;if(t)n=t(e);else{console.warn("No getUnitMesh function provided to flickerUnit");return}if(!n)return;const s=n.material.opacity;[{opacity:.2,delay:100},{opacity:s,delay:200},{opacity:.2,delay:300},{opacity:s,delay:400}].forEach(({opacity:o,delay:a})=>{setTimeout(()=>{if(n&&n.material){const l=n.material;l.opacity=o,l.transparent=!0}},a)})}showDeathAnimation(e,t,n){if(!se)return;console.log(`💀 Starting death animation for ${e.name}`);const s=document.createElement("canvas");s.width=64,s.height=64;const r=s.getContext("2d");if(r){r.clearRect(0,0,64,64),r.font="48px Arial",r.textAlign="center",r.textBaseline="middle",r.fillStyle="white",r.fillText("💀",32,32);const o=new Dr(s);o.needsUpdate=!0;const a=new ct(Mt*.6,Mt*.6),l=new pt({map:o,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),c=new tt(a,l),d=t(e);if(d){const u=d.x*Mt+Mt/2,f=-d.y*Ct-Ct/2;c.position.set(u,f-Ct*.3,3),se.add(c),setTimeout(()=>{se&&se.remove(c),n&&(console.log(`🗑️ Death animation complete for ${e.name}, calling cleanup callback`),n())},2e3),console.log(`💀 Skull animation added for ${e.name}`)}}}showDamageAnimationWithFlicker(e,t,n){this.showDamageAnimation(e,t),this.flickerUnit(e,n)}showDamageTextPopup(e,t,n,s){if(!se)return;const r=s(e);if(!r)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=n?`${n}💥 -${t}`:`💥 -${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="white",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new Dr(o);c.needsUpdate=!0;const d=new ct(Mt*1.5,Mt*.75),u=new pt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new tt(d,u),h=r.x*Mt+Mt/2,g=-r.y*Ct-Ct/2;f.position.set(h,g-Ct*.7,3),se.add(f);let _=Date.now();const m=2e3,p=()=>{const x=(Date.now()-_)/m;if(x>=1){se&&se.remove(f);return}const b=g-Ct*.7,C=g-Ct*1.5;f.position.y=b+(C-b)*x,u.opacity=1-x,requestAnimationFrame(p)};p()}showHealingTextPopup(e,t,n,s){if(!se)return;const r=s(e);if(!r)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=`${n}💚 +${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="#2ecc71",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new Dr(o);c.needsUpdate=!0;const d=new ct(Mt*1.5,Mt*.75),u=new pt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new tt(d,u),h=r.x*Mt+Mt/2,g=-r.y*Ct-Ct/2;f.position.set(h,g-Ct*.7,3),se.add(f);let _=Date.now();const m=2e3,p=()=>{const x=(Date.now()-_)/m;if(x>=1){se&&se.remove(f);return}const b=g-Ct*.7,C=g-Ct*1.5;f.position.y=b+(C-b)*x,u.opacity=1-x,requestAnimationFrame(p)};p()}showHealingAnimation(e,t,n,s,r){this.showHealingTextPopup(e,t,n,s),r&&this.glowUnit(e,r,"#2ecc71")}glowUnit(e,t,n){const s=t(e);if(!s)return;const o=s.material.color.clone(),a=new Xe(n);[{color:a,delay:100},{color:o,delay:200},{color:a,delay:300},{color:o,delay:400}].forEach(({color:c,delay:d})=>{setTimeout(()=>{s&&s.material&&s.material.color.copy(c)},d)})}showSkillDamageAnimation(e,t,n,s,r){this.showDamageAnimation(e,s),this.showDamageTextPopup(e,t,n,s),r&&this.flickerUnit(e,r)}showSkillEffectAnimation(e,t,n,s,r,o=!1){o?this.showHealingAnimation(e,t,n,s,r):this.showSkillDamageAnimation(e,t,n,s,r)}}function cg(i,e){Zm(i,e),Qm(i,e),tg(i,e),ig(i,e),og(i,e)}class dg{constructor(){this.selectedGlobe=null,this.unitRenderer=new Km,this.selectionManager=new eg,this.movementManager=new ng,this.actionManager=new sg,this.uiManager=new rg,this.animationManager=new lg,console.log("GameScene initialized"),jr.setMapDimensions(8,8)}async setSelectedGlobe(e){console.log("Setting selected globe:",e),this.selectedGlobe=e,e&&await this.loadGlobe(e)}async loadGlobe(e){console.log("Loading globe in GameScene:",e),await qr.loadGlobe(this,e)}async placeUnit(e,t,n){this.unitRenderer.placeUnit(e,t,n)}getUnitPosition(e){return this.unitRenderer.getUnitPosition(e)}removeUnit(e){this.unitRenderer.removeUnit(e)}getUnitAtPosition(e,t){return this.unitRenderer.getUnitAtPosition(e,t)}getAllUnits(){return this.unitRenderer.getAllUnits()}updateUnitSelectionIndicators(){this.selectionManager.updateUnitSelectionIndicators(e=>this.unitRenderer.getUnitPosition(e))}selectUnit(e){return this.selectionManager.selectUnit(e)}getSelectedUnit(){return this.selectionManager.getSelectedUnit()}enterMovePhase(e){this.selectionManager.setSelectedUnit(e),this.movementManager.enterMovePhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),re&&re.advancePhase()})}exitMovePhase(){this.movementManager.exitMovePhase(),this.uiManager.hideMovementButtons(),this.exitActionPhase()}selectMoveTarget(e,t){const n=this.movementManager.selectMoveTarget(e,t);if(n){const s=this.selectionManager.getSelectedUnit();s&&this.movementManager.drawPathToTarget(r=>this.unitRenderer.getUnitPosition(r),s),this.uiManager.showConfirmCancelButtons(()=>this.confirmMove(),()=>this.cancelMove())}return n}confirmMove(){const e=this.selectionManager.getSelectedUnit(),t=this.movementManager.getSelectedMoveTarget();if(!e||!t){console.warn("❌ No unit or target selected");return}this.moveUnitToPosition(e,t),this.exitMovePhase(),re&&re.advancePhase()}cancelMove(){this.movementManager.cancelMove(),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),re&&re.advancePhase()})}moveUnitToPosition(e,t){this.unitRenderer.getUnitPosition(e),this.unitRenderer.moveUnitToPosition(e,t)}enterActionPhase(e){this.selectionManager.setSelectedUnit(e),this.actionManager.enterActionPhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),re&&re.endTurn()})}exitActionPhase(){this.actionManager.exitActionPhase(),this.uiManager.hideActionButtons()}initiateBasicAttack(){console.log("⚔️ Initiating basic attack mode");const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected");return}this.setupAttackTargeting(e,"basic")}initiateSkillAttack(e){console.log(`✨ Initiating skill attack: ${e.name}`);const t=this.selectionManager.getSelectedUnit();if(!t){console.warn("❌ No unit selected");return}if(t.currentEnergy<e.energyCost){console.warn(`❌ Not enough energy for ${e.name}. Required: ${e.energyCost}, Current: ${t.currentEnergy}`);return}this.setupAttackTargeting(t,"skill",e)}setupAttackTargeting(e,t,n){this.actionManager.setAttackMode(t,n||null);const s=this.unitRenderer.getUnitPosition(e);if(!s){console.error(`❌ No position found for unit ${e.name}`);return}t==="basic"?(this.showBasicAttackTargeting(e,s),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),re&&re.endTurn()})):t==="skill"&&n&&this.showSkillTargeting(e,s,n)}showBasicAttackTargeting(e,t){const n=e.range||1;console.log(`📍 Unit ${e.name} current position: (${t.x}, ${t.y})`),console.log(`⚔️ Unit attack range: ${n}`);const s=this.calculateValidAttackTargets(e,t);this.actionManager.setAttackData(s),this.actionManager.createAttackIndicators(),console.log("🎯 Basic attack targeting indicators created")}calculateValidAttackTargets(e,t){const n=[],s=new Map,r=e.range||1;console.log(`⚔️ Calculating attack targets for ${e.name} with attack range ${r}`);for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=r){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&(n.push({x:c,y:d}),s.set(`${c},${d}`,[t,{x:c,y:d}]))}}return console.log(`🎯 Found ${n.length} valid attack tiles`),{validTiles:n,paths:s}}showSkillTargeting(e,t,n){if(console.log(`✨ Showing skill targeting for ${n.name}`),console.log(`🎯 Skill targeting type: ${n.targetingType}`),n.targetingType==="non-rotational"&&n.id==="blazing-knuckle")console.log("🔥 Self-centered skill - showing immediate preview around caster"),this.actionManager.setSkillTarget(n,t),this.actionManager.showSkillPreview(t.x,t.y),this.uiManager.showSkillConfirmCancelButtons(n.name,()=>this.confirmSkill(),()=>this.cancelSkill());else if(n.targetingType==="adjacent-attack"){console.log("⚔️ Adjacent attack skill - showing attack-style targeting");const s=this.calculateAdjacentAttackTargets(e,t);this.actionManager.setAttackMode("skill",n),this.actionManager.setAttackData(s),this.actionManager.createAttackIndicators(),console.log(`⚔️ Created ${s.validTiles.length} adjacent attack indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),re&&re.endTurn()})}else if(n.targetingType==="dual-rotational"){console.log("🔄 Dual-rotational skill - allowing target selection with rotation");const r=this.calculateSkillTargets(e,t,n,4);this.actionManager.setSkillTargeting(n,r),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${r.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),re&&re.endTurn()})}else{const s=e.range||1,r=this.calculateSkillTargets(e,t,n,s);this.actionManager.setSkillTargeting(n,r),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${r.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),re&&re.endTurn()})}}calculateSkillTargets(e,t,n,s){const r=[];for(let o=-s;o<=s;o++)for(let a=-s;a<=s;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=s){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&this.isValidSkillCenter(c,d,n)&&r.push({x:c,y:d})}}return r}isValidSkillCenter(e,t,n){return n.getTargetPattern(e,t).every(r=>r.x>=0&&r.x<8&&r.y>=0&&r.y<8)}calculateAdjacentAttackTargets(e,t){const n=[],s=new Map;console.log(`⚔️ Calculating adjacent attack targets for ${e.name}`);const r=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];for(const o of r){const a=t.x+o.x,l=t.y+o.y;a>=0&&a<8&&l>=0&&l<8&&(n.push({x:a,y:l}),s.set(`${a},${l}`,[t,{x:a,y:l}]))}return console.log(`⚔️ Found ${n.length} adjacent attack tiles`),{validTiles:n,paths:s}}selectAttackTarget(e,t){const n=this.selectionManager.getSelectedUnit();if(!n)return console.warn("❌ No unit selected"),!1;const s=this.actionManager.selectAttackTarget(e,t,(r,o)=>this.getUnitAtPosition(r,o),n);if(s.success)if(this.actionManager.getCurrentAttackMode()==="skill"){const o=this.actionManager.getCurrentSkill();o?.targetingType==="dual-rotational"?(this.actionManager.showSkillPreview(e,t),this.uiManager.showDualRotationalSkillButtons(o.name,()=>this.confirmSkill(),()=>this.cancelSkill(),()=>this.rotateSkillTargets())):o?.targetingType==="adjacent-attack"?(this.actionManager.setSkillTarget(o,{x:e,y:t}),this.uiManager.showSkillConfirmCancelButtons(o.name,()=>this.confirmSkill(),()=>this.cancelSkill())):this.uiManager.showSkillConfirmCancelButtons(o?.name||"Skill",()=>this.confirmSkill(),()=>this.cancelSkill())}else s.targetUnit&&this.uiManager.showAttackConfirmCancelButtons(()=>this.confirmAttack(),()=>this.cancelAttack());return s.success}confirmAttack(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for attack");return}const t=this.actionManager.confirmAttack(e);if(!t){console.warn("❌ Attack confirmation failed");return}const{damage:n,target:s}=t;console.log("🔍 Debug - About to update unit bars:"),console.log("  - selectedUnit:",e?`${e.name} (${e.team})`:"null"),console.log("  - target:",s?`${s.name} (${s.team})`:"null"),s?this.unitRenderer.updateUnitBars(s):console.warn("❌ target is null, skipping target health bar update"),e?this.unitRenderer.updateUnitBars(e):console.warn("❌ selectedUnit is null, skipping attacker energy bar update"),this.animationManager.showDamageAnimationWithFlicker(s,r=>this.unitRenderer.getUnitPosition(r),r=>this.unitRenderer.getUnitMesh(r)),s.currentHealth<=0&&setTimeout(()=>{this.animationManager.showDeathAnimation(s,r=>this.unitRenderer.getUnitPosition(r),()=>{if(console.log(`🗑️ Removing dead unit: ${s.name}`),this.removeUnit(s),re){const r=s.team==="player"?"player":"enemy";re.onUnitDeath(s.id,r),console.log(`☠️ Notified turn manager of ${s.name} death (${r} team)`)}})},900),this.exitActionPhase(),re&&re.endTurn()}cancelAttack(){this.actionManager.cancelAttack(),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),re&&re.endTurn()})}confirmSkill(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for skill");return}const t=this.actionManager.getCurrentSkill(),n=this.actionManager.confirmSkill(e,(o,a)=>this.getUnitAtPosition(o,a));if(!n){console.warn("❌ Skill confirmation failed");return}const{affectedUnits:s}=n;this.unitRenderer.updateUnitBars(e),s.forEach(o=>{if(this.unitRenderer.updateUnitBars(o),t){const a=e.skillDamage+(t.bonusDamage||0);this.animationManager.showSkillEffectAnimation(o,a,t.emoji,c=>this.unitRenderer.getUnitPosition(c),c=>this.unitRenderer.getUnitMesh(c),!1)}else this.animationManager.showDamageAnimationWithFlicker(o,a=>this.unitRenderer.getUnitPosition(a),a=>this.unitRenderer.getUnitMesh(a))}),s.filter(o=>o.currentHealth<=0).forEach(o=>{setTimeout(()=>{this.animationManager.showDeathAnimation(o,a=>this.unitRenderer.getUnitPosition(a),()=>{if(console.log(`🗑️ Removing dead unit: ${o.name}`),this.removeUnit(o),re){const a=o.team==="player"?"player":"enemy";re.onUnitDeath(o.id,a),console.log(`☠️ Notified turn manager of ${o.name} death (${a} team)`)}})},900)}),this.exitActionPhase(),re&&re.endTurn()}cancelSkill(){console.log("❌ Cancelling skill selection");const e=this.selectionManager.getSelectedUnit();e&&this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),re&&re.endTurn()})}rotateSkillTargets(){console.log("🔄 Rotating skill targets"),this.actionManager.rotateSkillTargets()}}function ug(i,e,t){console.log("Creating full tilemap mesh...");const n=Math.floor(e.image.width/i.tilewidth);console.log("Tileset columns for full map:",n);const s=[],r=[],o=[],a=[];let l=0;const c=0;if(i.layers.forEach(h=>{if(h.type==="tilelayer"&&h.visible&&h.data)for(let g=0;g<h.height;g++)for(let _=0;_<h.width;_++){const m=h.data[g*h.width+_];if(m===c)continue;const p=i.tilesets[0].firstgid,E=m-p;if(E<0)continue;const x=E%n,b=Math.floor(E/n),C=x*i.tilewidth/e.image.width,A=(x+1)*i.tilewidth/e.image.width,w=b*i.tileheight/e.image.height,H=(b+1)*i.tileheight/e.image.height,v=_*i.tilewidth*t,T=-g*i.tileheight*t;s.push(v,T,0),r.push(C,w),a.push(0,0,1),s.push(v,T-i.tileheight*t,0),r.push(C,H),a.push(0,0,1),s.push(v+i.tilewidth*t,T,0),r.push(A,w),a.push(0,0,1),s.push(v+i.tilewidth*t,T-i.tileheight*t,0),r.push(A,H),a.push(0,0,1),o.push(l+0,l+1,l+2),o.push(l+2,l+1,l+3),l+=4}}),s.length===0)return console.log("No vertices to render for the full map."),null;const d=new yn;d.setAttribute("position",new cn(s,3)),d.setAttribute("uv",new cn(r,2)),d.setAttribute("normal",new cn(a,3)),d.setIndex(o);const u=new pt({map:e,color:16777215,side:_n}),f=new tt(d,u);return console.log("Full tilemap mesh created."),f}let en=null;function hg(i){const e=document.createElement("div");return e.id="game-info-panel",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.width="280px",e.style.minHeight="120px",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="15px",e.style.borderRadius="8px",e.style.border="2px solid #555",e.style.display="none",e.style.zIndex="101",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.fontFamily="Arial, sans-serif",e.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",e.style.boxShadow="0 0 10px rgba(52, 152, 219, 0.5)",i.appendChild(e),e}function fg(i){if(!en)return;const e=i.team==="player"?"#3498db":i.team==="enemy"?"#e74c3c":"#95a5a6",t=Math.max(0,Math.min(100,i.currentHealth/i.health*100)),n=i.maxEnergy>0?Math.max(0,Math.min(100,i.currentEnergy/i.maxEnergy*100)):0;en.innerHTML=`
        <div style="border-bottom: 1px solid ${e}; margin-bottom: 10px; padding-bottom: 8px;">
            <h4 style="margin: 0; text-align: center; color: ${e}; font-size: 1.1em;">
                ${i.name}
            </h4>
            <p style="margin: 2px 0; text-align: center; font-style: italic; color: #bdc3c7; font-size: 0.85em;">
                ${i.className} (${i.team||"neutral"}) - ${i.energyType}
            </p>
        </div>
        
        <!-- Health Bar -->
        <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span style="font-size: 0.8em; color: #2ecc71;"><strong>Health</strong></span>
                <span style="font-size: 0.75em; color: #bdc3c7;">${i.currentHealth}/${i.health}</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden;">
                <div style="width: ${t}%; height: 100%; background-color: #2ecc71; transition: width 0.3s ease;"></div>
            </div>
        </div>
        
        <!-- Energy Bar -->
        <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span style="font-size: 0.8em; color: #3498db;"><strong>Energy</strong></span>
                <span style="font-size: 0.75em; color: #bdc3c7;">${i.currentEnergy}/${i.maxEnergy}</span>
            </div>
            <div style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden;">
                <div style="width: ${n}%; height: 100%; background-color: #3498db; transition: width 0.3s ease;"></div>
            </div>
        </div>
        
        <!-- Unit Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.85em;">
            <div>
                <p style="margin: 3px 0;"><strong>Range:</strong> ${i.range}</p>
                <p style="margin: 3px 0;"><strong>Move:</strong> ${i.move}</p>
            </div>
            <div>
                <p style="margin: 3px 0;"><strong>Basic Dmg:</strong> ${i.basicDamage}</p>
                <p style="margin: 3px 0;"><strong>Skill Dmg:</strong> ${i.skillDamage}</p>
            </div>
        </div>
        
        ${i.skills&&i.skills.length>0?`
        <!-- Skills Section -->
        <div style="margin-top: 12px; border-top: 1px solid #555; padding-top: 8px;">
            <h5 style="margin: 0 0 6px 0; color: #8e44ad; font-size: 0.9em;">Skills:</h5>
            ${i.skills.map(s=>`
                <div style="margin-bottom: 6px; padding: 4px 6px; background-color: rgba(142, 68, 173, 0.1); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${s.emoji} ${s.name}</span>
                        <span style="color: #3498db; font-size: 0.75em;">${s.energyCost} ⚡</span>
                    </div>
                    <p style="margin: 2px 0 0 0; font-size: 0.7em; color: #bdc3c7; line-height: 1.2;">
                        ${s.description}
                    </p>
                </div>
            `).join("")}
        </div>
        `:""}
    `}function pg(i){en&&(fg(i),en.style.display="block")}function Zr(){en&&(en.style.display="none")}function mg(i){en=hg(i),console.log("Game info panel initialized")}function gg(){en&&en.parentNode&&en.parentNode.removeChild(en),en=null}let We={mapData:null,hoverMesh:null,renderer:null,displayScale:1},Nn=null;function _g(i,e,t,n){We.mapData=i,We.hoverMesh=e,We.renderer=t,We.displayScale=n}function Fl(i){if(!We.mapData||!ut||!We.hoverMesh||!We.renderer)return;const e=4,t=We.renderer.domElement,n=t.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,o=n.width,a=n.height;if(s<0||r<0||s>=o||r>=a){ut.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default";return}const l=s/We.displayScale,c=r/We.displayScale,d=We.mapData.tilewidth*e,u=We.mapData.tileheight*e,f=Math.floor(l/d),h=Math.floor(c/u);if(f>=0&&f<We.mapData.width&&h>=0&&h<We.mapData.height){ut.innerText=`Tile: (${f}, ${h})`,We.hoverMesh.position.x=f*d+d/2,We.hoverMesh.position.y=-h*u-u/2,We.hoverMesh.visible=!0;const g=window.GAME_SCENE_INSTANCE;if(g){const _=g.getUnitAtPosition(f,h);_&&re&&re.canSelect()&&re.canSelectUnit(_.id)?t.style.cursor="pointer":t.style.cursor="none",_&&_!==Nn?(Nn=_,pg(_)):!_&&Nn&&(Nn=null,Zr())}else t.style.cursor="none"}else ut.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default",Nn&&(Nn=null,Zr())}function Ol(i){if(!We.mapData||!We.renderer||!re)return;const e=4,n=We.renderer.domElement.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,o=n.width,a=n.height;if(s<0||r<0||s>=o||r>=a)return;const l=s/We.displayScale,c=r/We.displayScale,d=We.mapData.tilewidth*e,u=We.mapData.tileheight*e,f=Math.floor(l/d),h=Math.floor(c/u);if(f>=0&&f<We.mapData.width&&h>=0&&h<We.mapData.height){const g=window.GAME_SCENE_INSTANCE;if(g){const _=g.getUnitAtPosition(f,h);if(re&&re.canSelect())_&&(re.getSelectableUnits().some(E=>E.id===_.id)?g.selectUnit(_)?(console.log(`✅ Successfully selected unit: ${_.name}`),re.advancePhase()):console.log(`❌ Failed to select unit: ${_.name}`):console.log(`❌ Unit not selectable: ${_.name}`));else if(re&&re.canAct()){const m=g.selectAttackTarget(f,h);console.log(m?_?`✅ Successfully selected attack target: ${_.name} at (${f}, ${h})`:`✅ Successfully selected attack target position: (${f}, ${h})`:_?`❌ Invalid attack target: ${_.name} at (${f}, ${h})`:`❌ Invalid attack target position: (${f}, ${h})`)}else if(re&&re.canMove()&&!_){const m=g.selectMoveTarget(f,h);console.log(m?`✅ Successfully selected move target: (${f}, ${h})`:`❌ Invalid move target: (${f}, ${h})`)}}}}function kl(){We.hoverMesh&&ut&&(We.hoverMesh.visible=!1,ut.innerText="Outside map",We.renderer&&(We.renderer.domElement.style.cursor="default")),Nn&&(Nn=null,Zr())}function yg(i){i.domElement.addEventListener("mousemove",Fl,!1),i.domElement.addEventListener("mouseleave",kl,!1),i.domElement.addEventListener("click",Ol,!1)}function xg(i){i.domElement.removeEventListener("mousemove",Fl),i.domElement.removeEventListener("mouseleave",kl),i.domElement.removeEventListener("click",Ol)}let Ds=null,ft={renderer:null,scene:null,camera:null};function vg(i,e,t){ft.renderer=i,ft.scene=e,ft.camera=t}function Bl(){Ds=requestAnimationFrame(Bl),ft.renderer&&ft.scene&&ft.camera&&ft.renderer.render(ft.scene,ft.camera)}function Sg(){Bl(),console.log("Animation loop started")}function Mg(){Ds!==null&&(cancelAnimationFrame(Ds),Ds=null,console.log("Animation loop stopped"))}function Eg(){Mg(),ft.renderer&&(ft.renderer.dispose(),ft.renderer.domElement.parentNode&&ft.renderer.domElement.parentNode.removeChild(ft.renderer.domElement)),ft.scene&&ft.scene.traverse(i=>{i instanceof tt&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()))}),ft.renderer=null,ft.scene=null,ft.camera=null,console.log("Renderer cleaned up.")}let Ti=null,Pt=null,Rs=1,qt=null,se=null,Yi=null;async function Tg(i){try{const f=await fetch("./TacticaMap.tmj");if(!f.ok)throw new Error(`HTTP error! status: ${f.status}`);Pt=await f.json(),console.log("Tiled Map Data Loaded via fetch:",Pt),cg(Pt.tilewidth*4,Pt.tileheight*4),console.log(`Tile size set to ${Pt.tilewidth*4}x${Pt.tileheight*4}`)}catch(f){console.error("Error loading Tiled map data via fetch:",f);return}if(!Pt)return;se=new zm,se.background=new Xe(2236962),console.log("Three.js scene initialized");const t=Pt.width*Pt.tilewidth,n=Pt.height*Pt.tileheight,s=t*4,r=n*4;Yi=new wl(0,s,0,-r,1,1e3),Yi.position.z=10,console.log("Camera initialized"),qt=new Il({antialias:!1,powerPreference:"high-performance"}),qt.setSize(s,r),i.appendChild(qt.domElement),console.log("Renderer initialized"),Rs=1,qt.domElement.style.width=`${s*Rs}px`,qt.domElement.style.height=`${r*Rs}px`,qt.domElement.style.imageRendering="pixelated",qt.domElement.style.imageRendering="crisp-edges";const o=new ki;let a,l;try{a=await o.loadAsync($m),a.magFilter=qe,a.minFilter=qe,a.flipY=!1,console.log("Map Texture Loaded:",a),l=await o.loadAsync(ia),l.magFilter=qe,l.minFilter=qe,l.flipY=!1,console.log("Hover Texture Loaded:",l)}catch(f){console.error("Error loading textures:",f);return}const c=ug(Pt,a,4);c&&se?(se.add(c),console.log("Map mesh added to scene")):console.error("Failed to create full tilemap mesh.");const d=new ct(Pt.tilewidth*4,Pt.tileheight*4),u=new pt({map:l,transparent:!0,side:_n});Ti=new tt(d,u),Ti.position.z=1,Ti.visible=!1,se&&(se.add(Ti),console.log("Hover selector added to scene")),_g(Pt,Ti,qt,Rs),yg(qt),vg(qt,se,Yi),Sg(),console.log("Three.js game started successfully")}function bg(){qt&&xg(qt),Eg(),qt=null,se=null,Yi=null,Pt=null,Ti=null,console.log("Game cleaned up.")}let ts=!1;function Ag(i){ts=i,console.log(`Debug mode ${i?"enabled":"disabled"}`)}function Dt(){return ts}function wg(){return ts?"ON":"OFF"}function vt(i,e){ts&&console.log(`[DEBUG] ${i}`,e||"")}function Gs(i){ts&&console.warn(`[DEBUG ALERT] ${i}`)}function Rg(i,e){const t=document.createElement("div");t.id="splash-screen",t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="#1a1a1a",t.style.display="flex",t.style.flexDirection="column",t.style.justifyContent="center",t.style.alignItems="center",t.style.zIndex="1000";const n=document.createElement("h1");n.textContent="Magepunk Presents: Tactica Trials",n.style.color="#e0e0e0",n.style.fontSize="2.5em",n.style.marginBottom="30px",n.style.fontFamily='"Arial Black", Gadget, sans-serif';const s=document.createElement("button");s.textContent="Start Game",s.style.padding="15px 30px",s.style.fontSize="1.5em",s.style.backgroundColor="#4CAF50",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)",s.onmouseover=()=>s.style.backgroundColor="#45a049",s.onmouseout=()=>s.style.backgroundColor="#4CAF50";const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.marginTop="20px",r.style.marginBottom="10px";const o=document.createElement("input");o.type="checkbox",o.id="debug-mode-checkbox",o.checked=Dt(),o.style.marginRight="10px",o.style.transform="scale(1.2)",o.style.cursor="pointer";const a=document.createElement("label");a.htmlFor="debug-mode-checkbox",a.textContent="Debug Mode (Player controls enemies)",a.style.color="#e0e0e0",a.style.fontSize="1.1em",a.style.cursor="pointer",a.style.userSelect="none",a.onmouseover=()=>a.style.color="#f0f0f0",a.onmouseout=()=>a.style.color="#e0e0e0";const l=()=>{Ag(o.checked)};o.addEventListener("change",l),r.appendChild(o),r.appendChild(a);const c=()=>{d(),e()};s.addEventListener("click",c),t.appendChild(n),t.appendChild(r),t.appendChild(s),i.appendChild(t);const d=()=>{s.removeEventListener("click",c),o.removeEventListener("change",l),t.parentNode&&t.parentNode.removeChild(t),console.log("Splash screen cleaned up.")};return d}class Si{constructor(e,t,n,s,r,o,a){this.id=e,this.name=t,this.level=n,this.imageUrl=s,this.reward=r,this.battleCondition=o,this.enemies=a}}const Cg="/assets/standardglobe-K-BPCSY1.png",Pg="/assets/neonrealm-B38s6ror.png",Lg="/assets/wormwoodcastle-C2u0nrjN.png",Ug="/assets/templeofrelics-CJ0WGYAS.png",Dg="/assets/cave-PQ6A8Eo4.png",Ig="/assets/forest-CSRimZNq.png",Mi={NORMAL:{name:"Standard Battle",description:"A standard battle with no special conditions.",effect:()=>{}}},Ei={STANDARD:{resource:10}};function Yn(i){const e=Zo.createUnit(i,"enemy");return e||(console.error(`Failed to create enemy unit of type ${i}`),null)}const Ng=[new Si("standard-globe","Standard Globe",1,Cg,Ei.STANDARD,Mi.NORMAL,[Yn("swordsman")]),new Si("neon-realm","Neon Realm",1,Pg,Ei.STANDARD,Mi.NORMAL,[Yn("swordsman")]),new Si("wormwood-castle","Wormwood Castle",1,Lg,Ei.STANDARD,Mi.NORMAL,[Yn("swordsman")]),new Si("temple-of-relics","Temple of Relics",1,Ug,Ei.STANDARD,Mi.NORMAL,[Yn("healer"),Yn("hater")]),new Si("the-caves","Cave",1,Dg,Ei.STANDARD,Mi.NORMAL,[Yn("swordsman")]),new Si("the-forest","Forest",1,Ig,Ei.STANDARD,Mi.NORMAL,[Yn("swordsman")])];function Fg(i,e=3){return[...Ng.filter(s=>s.level===i)].sort(()=>Math.random()-.5).slice(0,e)}let sa=null;function Og(i){sa=i}function kg(){return sa}function Bg(){sa=null}let $o=[];function zg(i,e){$o=Fg(1);const t=we.playerParty.length>0;console.log("Showing Encounter Scene..."),i.innerHTML="";const n=document.createElement("div");n.id="encounter-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");if(s.textContent="ENCOUNTER",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0",!t){const c=document.createElement("div");c.style.width="100%",c.style.padding="15px",c.style.backgroundColor="#e74c3c",c.style.color="#ffffff",c.style.borderRadius="8px",c.style.textAlign="center",c.style.fontSize="1.2em",c.style.fontWeight="bold",c.style.marginBottom="15px",c.style.border="2px solid #c0392b",c.innerHTML='⚠️ NO UNITS AVAILABLE!<br><span style="font-size: 0.9em; font-weight: normal;">You need to purchase units from the Shop before entering battles.</span>',n.appendChild(c)}const r=document.createElement("div");r.id="encounter-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-around",r.style.alignItems="center",r.style.overflow="hidden",r.style.padding="20px",$o.forEach((c,d)=>{const u=document.createElement("div");u.style.width="250px",u.style.height="350px",u.style.border=t?"2px solid #3498db":"2px solid #7f8c8d",u.style.borderRadius="10px",u.style.padding="15px",u.style.display="flex",u.style.flexDirection="column",u.style.alignItems="center",u.style.justifyContent="space-between",u.style.backgroundColor=t?"#34495e":"#2c3e50",u.style.cursor=t?"pointer":"not-allowed",u.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u.style.opacity=t?"1":"0.5";const f=document.createElement("img");f.src=c.imageUrl,f.alt=c.name,f.style.width="150px",f.style.height="150px",f.style.objectFit="contain",f.style.marginBottom="10px",f.style.filter=t?"none":"grayscale(100%)";const h=document.createElement("h3");h.textContent=c.name,h.style.margin="0 0 10px 0",h.style.textAlign="center";const g=document.createElement("p");g.textContent=`Level ${c.level}`,g.style.margin="0 0 10px 0",g.style.color="#f1c40f";const _=document.createElement("p");_.textContent=c.battleCondition.name,_.style.margin="0 0 10px 0",_.style.fontStyle="italic";const m=document.createElement("p");m.textContent=`Reward: ${c.reward.resource} Resources`,m.style.margin="0 0 10px 0",m.style.color="#2ecc71";const p=document.createElement("p");p.textContent=`Enemies: ${c.enemies.length}`,p.style.margin="0 0 10px 0",t?(u.onclick=()=>{const E=document.querySelector(".selected-globe");E&&(E.classList.remove("selected-globe"),E.style.transform="translateY(0)",E.style.boxShadow="none"),u.classList.add("selected-globe"),u.style.transform="translateY(-10px)",u.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)",Og(c),console.log("Selected globe stored:",c),console.log("Navigating to game scene with selected globe"),e()},u.addEventListener("mouseenter",()=>{u.classList.contains("selected-globe")||(u.style.transform="translateY(-5px)",u.style.boxShadow="0px 3px 10px rgba(0,0,0,0.2)")}),u.addEventListener("mouseleave",()=>{u.classList.contains("selected-globe")||(u.style.transform="translateY(0)",u.style.boxShadow="none")})):u.addEventListener("mouseenter",()=>{u.title="Purchase units from the Shop first!"}),u.appendChild(f),u.appendChild(h),u.appendChild(g),u.appendChild(_),u.appendChild(m),u.appendChild(p),r.appendChild(u)});const o=document.createElement("div");o.style.width="100%",o.style.display="flex",o.style.justifyContent="space-between",o.style.alignItems="center",o.style.paddingTop="15px",o.style.flexShrink="0";const a=document.createElement("div");a.id="player-resource-display",a.textContent=`Resource: ${pn.resource}`,a.style.padding="10px 15px",a.style.backgroundColor="#1a1a1a",a.style.color="#f1c40f",a.style.borderRadius="5px",a.style.fontSize="1em",a.style.fontWeight="bold",a.style.display="flex",a.style.alignItems="center";const l=document.createElement("div");l.id="squad-info-display",l.textContent=`Squad: ${we.playerParty.length}/5 units`,l.style.padding="10px 15px",l.style.backgroundColor=t?"#27ae60":"#e74c3c",l.style.color="#ffffff",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.display="flex",l.style.alignItems="center",o.appendChild(l),o.appendChild(a),n.appendChild(s),n.appendChild(r),n.appendChild(o),i.appendChild(n),console.log("Encounter Scene displayed.")}class $i{static countAliveUnits(e){return(e==="player"?we.playerParty:we.enemyUnits).filter(n=>n.currentHealth>0).length}static calculateActionableUnitLimit(){const e=this.countAliveUnits("player"),t=this.countAliveUnits("enemy"),n=Math.min(e,t);return vt("Calculated actionable unit limit",{alivePlayerUnits:e,aliveEnemyUnits:t,actionableUnitLimit:n}),Math.max(1,n)}static getAliveUnitCounts(){return{player:this.countAliveUnits("player"),enemy:this.countAliveUnits("enemy")}}}class Xo{constructor(e,t){this.handler=e,this.unitsUsedThisRound=t}onUnitDeath(e,t){console.log(`💀 Unit died: ${e} (${t} team)`),t==="player"?this.unitsUsedThisRound[He.PLAYER_ONE].delete(e):this.unitsUsedThisRound[He.PLAYER_TWO].delete(e),vt("Unit death processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitAdded(e,t){console.log(`➕ Unit added/revived: ${e} (${t} team)`),vt("Unit addition processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitHealthChanged(e,t,n,s){const r=s>0,o=n>0;r!==o&&(o?this.onUnitAdded(e,t):this.onUnitDeath(e,t))}}class Gg{constructor(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[He.PLAYER_ONE]:0,[He.PLAYER_TWO]:0},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set,[He.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new Xo(this,this.roundState.unitsUsedThisRound)}getRoundNumber(){return this.roundState.roundNumber}getActionableUnitLimit(){return this.roundState.actionableUnitLimit}getTurnsTakenThisRound(e){return this.roundState.turnsTakenThisRound[e]}canTakeAnotherTurn(e){return this.roundState.turnsTakenThisRound[e]<this.roundState.actionableUnitLimit}markUnitAsUsed(e,t){this.roundState.unitsUsedThisRound[t].add(e),vt("Unit marked as used this round",{unitId:e,player:t,roundNumber:this.roundState.roundNumber})}canSelectUnit(e,t){return!this.roundState.unitsUsedThisRound[t].has(e)}recalculateActionableUnitLimit(){const e=this.roundState.actionableUnitLimit,t=$i.calculateActionableUnitLimit();if(t!==e){console.log(`🔄 Unit count changed! Recalculating actionable unit limit: ${e} → ${t}`),this.roundState.actionableUnitLimit=t;const n=this.roundState.turnsTakenThisRound[He.PLAYER_ONE]>t,s=this.roundState.turnsTakenThisRound[He.PLAYER_TWO]>t;(n||s)&&(console.log(`⚠️ Turn limit exceeded! P1: ${this.roundState.turnsTakenThisRound[He.PLAYER_ONE]}/${t}, P2: ${this.roundState.turnsTakenThisRound[He.PLAYER_TWO]}/${t}`),console.log("🔄 Round will end immediately after current turn completes"),this.roundState.shouldEndRoundAfterTurn=!0,vt("Round marked for immediate ending",{previousLimit:e,newLimit:t,player1Turns:this.roundState.turnsTakenThisRound[He.PLAYER_ONE],player2Turns:this.roundState.turnsTakenThisRound[He.PLAYER_TWO],player1Exceeded:n,player2Exceeded:s}));const r=$i.getAliveUnitCounts();vt("Actionable unit limit recalculated",{previousLimit:e,newLimit:t,alivePlayerUnits:r.player,aliveEnemyUnits:r.enemy,currentRound:this.roundState.roundNumber})}}startNewRound(){this.roundState.roundNumber++,this.roundState.actionableUnitLimit=$i.calculateActionableUnitLimit(),this.roundState.turnsTakenThisRound[He.PLAYER_ONE]=0,this.roundState.turnsTakenThisRound[He.PLAYER_TWO]=0,this.roundState.unitsUsedThisRound[He.PLAYER_ONE].clear(),this.roundState.unitsUsedThisRound[He.PLAYER_TWO].clear(),this.roundState.shouldEndRoundAfterTurn=!1,console.log(`🔄 NEW ROUND ${this.roundState.roundNumber} STARTED!`),console.log(`📊 Actionable Unit Limit: ${this.roundState.actionableUnitLimit}`),console.log("🔄 All units are now eligible for selection again");const e=$i.getAliveUnitCounts();vt("New round started",{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,alivePlayerUnits:e.player,aliveEnemyUnits:e.enemy})}shouldStartNewRound(){if(this.roundState.shouldEndRoundAfterTurn)return!0;const e=this.roundState.turnsTakenThisRound[He.PLAYER_ONE]>=this.roundState.actionableUnitLimit,t=this.roundState.turnsTakenThisRound[He.PLAYER_TWO]>=this.roundState.actionableUnitLimit;return e&&t}incrementTurnCount(e){this.roundState.turnsTakenThisRound[e]++}isRoundEndingAfterTurn(){return this.roundState.shouldEndRoundAfterTurn}getUnitsUsedThisRound(e){return Array.from(this.roundState.unitsUsedThisRound[e])}hasUnitBeenUsedThisRound(e,t){return this.roundState.unitsUsedThisRound[t].has(e)}onUnitDeath(e,t){this.unitEventHandler.onUnitDeath(e,t)}onUnitAdded(e,t){this.unitEventHandler.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.unitEventHandler.onUnitHealthChanged(e,t,n,s)}forceNewRound(){this.startNewRound()}reset(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[He.PLAYER_ONE]:0,[He.PLAYER_TWO]:0},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set,[He.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new Xo(this,this.roundState.unitsUsedThisRound)}getRoundState(){return{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,turnsTakenThisRound:{...this.roundState.turnsTakenThisRound},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set(this.roundState.unitsUsedThisRound[He.PLAYER_ONE]),[He.PLAYER_TWO]:new Set(this.roundState.unitsUsedThisRound[He.PLAYER_TWO])},shouldEndRoundAfterTurn:this.roundState.shouldEndRoundAfterTurn}}getAliveUnitCounts(){return $i.getAliveUnitCounts()}}class Hg{constructor(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1}}getCurrentPhase(){return this.currentPhase}getPhaseSkipped(){return{...this.phaseSkipped}}advancePhase(){const e=this.currentPhase;switch(this.currentPhase){case ht.SELECT:this.currentPhase=ht.MOVE,this.phaseSkipped.move=!1;break;case ht.MOVE:this.currentPhase=ht.ACTION,this.phaseSkipped.action=!1;break;case ht.ACTION:break}return console.log(`➡️ Phase: ${this.getPhaseDisplayName(e)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase advanced",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}skipPhase(){const e=this.currentPhase;switch(this.currentPhase){case ht.SELECT:return console.warn("❌ Cannot skip SELECT phase"),this.currentPhase;case ht.MOVE:this.phaseSkipped.move=!0,this.currentPhase=ht.ACTION,console.log("⏭️ MOVE phase skipped");break;case ht.ACTION:this.phaseSkipped.action=!0,console.log("⏭️ ACTION phase skipped");break}return vt("Phase skipped",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}resetToSelect(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1},vt("Phase reset to SELECT",{currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped})}canMove(){return this.currentPhase===ht.MOVE}canAct(){return this.currentPhase===ht.ACTION}canSelect(){return this.currentPhase===ht.SELECT}getPhaseDisplayName(e){return{[ht.SELECT]:"Unit Selection",[ht.MOVE]:"Movement",[ht.ACTION]:"Action"}[e]||"Unknown"}forceSetPhase(e){Gs(`Forcing phase change from ${this.currentPhase} to ${e}`);const t=this.currentPhase;this.currentPhase=e,console.log(`🔧 Phase forced: ${this.getPhaseDisplayName(t)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase forced",{previousPhase:t,currentPhase:this.currentPhase})}reset(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1}}}class Vg{constructor(e=He.PLAYER_ONE){this.currentPlayer=e}getCurrentPlayer(){return this.currentPlayer}switchPlayer(){const e=this.currentPlayer;return this.currentPlayer=this.getOpposingPlayer(this.currentPlayer),console.log(`🔄 Player switched: ${this.getPlayerDisplayName(e)} → ${this.getPlayerDisplayName(this.currentPlayer)}`),vt("Player switched",{previousPlayer:e,currentPlayer:this.currentPlayer}),this.currentPlayer}getOpposingPlayer(e){return e===He.PLAYER_ONE?He.PLAYER_TWO:He.PLAYER_ONE}isPlayerTurn(e){return this.currentPlayer===e}getPlayerDisplayName(e){return{[He.PLAYER_ONE]:"Player 1",[He.PLAYER_TWO]:"Player 2"}[e]||"Unknown Player"}forceSetPlayer(e){Gs(`Forcing player change from ${this.currentPlayer} to ${e}`);const t=this.currentPlayer;this.currentPlayer=e,vt("Player forced",{previousPlayer:t,currentPlayer:this.currentPlayer})}reset(e=He.PLAYER_ONE){this.currentPlayer=e}}class Wg{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}getSelectableUnits(){const e=this.playerManager.getCurrentPlayer();return(e===He.PLAYER_ONE?we.playerParty:we.enemyUnits).filter(n=>n.currentHealth>0&&this.roundManager.canSelectUnit(n.id,e))}canTakeAnotherTurn(){return this.roundManager.canTakeAnotherTurn(this.playerManager.getCurrentPlayer())}getGameState(e,t){const n=this.roundManager.getAliveUnitCounts(),s=this.roundManager.getRoundState();return{currentPlayer:this.playerManager.getCurrentPlayer(),currentPlayerName:this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer()),currentPhase:this.phaseManager.getCurrentPhase(),currentPhaseName:this.phaseManager.getPhaseDisplayName(this.phaseManager.getCurrentPhase()),turnCount:e,roundNumber:this.roundManager.getRoundNumber(),actionableUnitLimit:this.roundManager.getActionableUnitLimit(),turnsTakenThisRound:s.turnsTakenThisRound,canTakeAnotherTurn:this.canTakeAnotherTurn(),shouldEndRoundAfterTurn:this.roundManager.isRoundEndingAfterTurn(),gameStarted:t,canMove:this.phaseManager.canMove(),canAct:this.phaseManager.canAct(),canSelect:this.phaseManager.canSelect(),phaseSkipped:this.phaseManager.getPhaseSkipped(),alivePlayerUnits:n.player,aliveEnemyUnits:n.enemy,selectableUnits:this.getSelectableUnits().length}}isRoundEndingAfterTurn(){return this.roundManager.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.roundManager.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.roundManager.hasUnitBeenUsedThisRound(e,t)}markUnitAsUsed(e){this.roundManager.markUnitAsUsed(e,this.playerManager.getCurrentPlayer())}canSelectUnit(e){return this.roundManager.canSelectUnit(e,this.playerManager.getCurrentPlayer())}}class $g{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}forceRecalculateActionableUnitLimit(){Gs("Forcing recalculation of actionable unit limit"),this.roundManager.recalculateActionableUnitLimit()}forceSetPlayer(e){this.playerManager.forceSetPlayer(e),this.phaseManager.resetToSelect()}forceSetPhase(e){this.phaseManager.forceSetPhase(e)}forceNewRound(){Gs("Forcing new round to start"),this.roundManager.forceNewRound()}}var He=(i=>(i.PLAYER_ONE="PLAYER_ONE",i.PLAYER_TWO="PLAYER_TWO",i))(He||{}),ht=(i=>(i.SELECT="SELECT",i.MOVE="MOVE",i.ACTION="ACTION",i))(ht||{});class Xg{constructor(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.roundManager=new Gg,this.phaseManager=new Hg,this.playerManager=new Vg(e),this.gameStateAggregator=new Wg(this.roundManager,this.phaseManager,this.playerManager),this.debugger=new $g(this.roundManager,this.phaseManager,this.playerManager),vt("TurnManager initialized",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}getCurrentPlayer(){return this.playerManager.getCurrentPlayer()}getCurrentPhase(){return this.phaseManager.getCurrentPhase()}getTurnCount(){return this.turnCount}getRoundNumber(){return this.roundManager.getRoundNumber()}getActionableUnitLimit(){return this.roundManager.getActionableUnitLimit()}getTurnsTakenThisRound(e){return this.roundManager.getTurnsTakenThisRound(e)}isGameStarted(){return this.gameStarted}markUnitAsUsed(e){this.gameStateAggregator.markUnitAsUsed(e)}canSelectUnit(e){return this.gameStateAggregator.canSelectUnit(e)}getSelectableUnits(){return this.gameStateAggregator.getSelectableUnits()}startGame(){if(this.gameStarted){console.warn("⚠️ Game already started");return}this.gameStarted=!0,this.roundManager.recalculateActionableUnitLimit(),console.log("🎮 GAME STARTED!"),console.log(`👤 Starting Player: ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}`),console.log(`📊 Actionable Unit Limit: ${this.roundManager.getActionableUnitLimit()}`),vt("Game started",{startingPlayer:this.playerManager.getCurrentPlayer(),actionableUnitLimit:this.roundManager.getActionableUnitLimit()})}advancePhase(){if(!this.gameStarted){console.warn("❌ Cannot advance phase - game not started");return}this.phaseManager.advancePhase()}skipPhase(){if(!this.gameStarted){console.warn("❌ Cannot skip phase - game not started");return}this.phaseManager.skipPhase()}endTurn(){if(!this.gameStarted){console.warn("❌ Cannot end turn - game not started");return}const e=this.playerManager.getCurrentPlayer();this.roundManager.incrementTurnCount(e),this.turnCount++,console.log(`🔚 Turn ${this.turnCount-1} ended for ${this.playerManager.getPlayerDisplayName(e)}`),console.log(`📊 Turns taken this round: P1=${this.roundManager.getTurnsTakenThisRound("PLAYER_ONE")}, P2=${this.roundManager.getTurnsTakenThisRound("PLAYER_TWO")}`),this.roundManager.shouldStartNewRound()&&this.roundManager.startNewRound(),this.playerManager.switchPlayer(),this.phaseManager.resetToSelect(),console.log(`🎯 Turn ${this.turnCount} - ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}'s turn`),vt("Turn ended",{previousPlayer:e,newPlayer:this.playerManager.getCurrentPlayer(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}canTakeAnotherTurn(){return this.gameStateAggregator.canTakeAnotherTurn()}canMove(){return this.phaseManager.canMove()}canAct(){return this.phaseManager.canAct()}canSelect(){return this.phaseManager.canSelect()}isPlayerTurn(e){return this.playerManager.isPlayerTurn(e)}getPlayerDisplayName(e){return this.playerManager.getPlayerDisplayName(e)}getPhaseDisplayName(e){return this.phaseManager.getPhaseDisplayName(e)}getOpposingPlayer(e){return this.playerManager.getOpposingPlayer(e)}getGameState(){return this.gameStateAggregator.getGameState(this.turnCount,this.gameStarted)}isRoundEndingAfterTurn(){return this.gameStateAggregator.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.gameStateAggregator.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.gameStateAggregator.hasUnitBeenUsedThisRound(e,t)}reset(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.roundManager.reset(),this.phaseManager.reset(),this.playerManager.reset(e),console.log("🔄 TurnManager reset"),vt("TurnManager reset",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}forceRecalculateActionableUnitLimit(){this.debugger.forceRecalculateActionableUnitLimit()}forceSetPlayer(e){this.debugger.forceSetPlayer(e)}forceSetPhase(e){this.debugger.forceSetPhase(e)}forceNewRound(){this.debugger.forceNewRound()}onUnitDeath(e,t){this.roundManager.onUnitDeath(e,t)}onUnitAdded(e,t){this.roundManager.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.roundManager.onUnitHealthChanged(e,t,n,s)}recalculateActionableUnitLimit(){this.gameStarted&&this.roundManager.recalculateActionableUnitLimit()}}function zl(){const i=new Xg,e=i.advancePhase.bind(i),t=i.endTurn.bind(i),n=i.startGame.bind(i);return i.advancePhase=function(){e(),Is(i),Yg(i)},i.endTurn=function(){t(),Is(i),Ns()},i.startGame=function(){n(),Is(i)},i}function ra(i){const e=i.getGameState();return`Turn ${e.turnCount} - ${e.currentPlayerName}`}function Gl(i){return`Phase: ${i.getGameState().currentPhaseName}`}function Hl(i){return`Round ${i.getGameState().roundNumber}`}function Vl(i){return`Actionable Unit Limit: ${i.getGameState().actionableUnitLimit}`}function Is(i){const e=document.getElementById("turn-display-game-scene");e&&(e.textContent=ra(i));const t=document.getElementById("phase-display-game-scene");t&&(t.textContent=Gl(i));const n=document.getElementById("round-display-game-scene");if(n&&(n.textContent=Hl(i)),Dt()){const s=document.getElementById("actionable-unit-limit-display-game-scene");s&&(s.textContent=Vl(i))}if(Dt()){const s=i.getGameState();console.log(`🔄 UI Updated - ${s.currentPlayerName} | ${s.currentPhaseName} | Round ${s.roundNumber}`)}}function Yg(i){const e=i.getGameState();Dt()&&(console.log(`🎯 Phase transition: ${e.currentPhaseName}`),console.log(`Can select: ${e.canSelect}, Can move: ${e.canMove}, Can act: ${e.canAct}`));const t=window.GAME_SCENE_INSTANCE;switch(e.currentPhase){case"SELECT":Ns();break;case"MOVE":if(Ns(),t){const n=t.getSelectedUnit();n?(console.log(`🚶 Entering MOVE phase with unit: ${n.name}`),t.enterMovePhase(n)):console.warn("❌ No unit selected for MOVE phase")}else console.warn("❌ GameScene not available for MOVE phase");break;case"ACTION":if(Ns(),t){const n=t.getSelectedUnit();n?(console.log(`⚔️ Entering ACTION phase with unit: ${n.name}`),t.enterActionPhase(n)):console.warn("❌ No unit selected for ACTION phase")}else console.warn("❌ GameScene not available for ACTION phase");break}}function Ns(){const i=window.GAME_SCENE_INSTANCE;i?i.updateUnitSelectionIndicators():Dt()&&console.log("🎯 GameScene not available for updating unit selection indicators")}const qg=Object.freeze(Object.defineProperty({__proto__:null,createUIAwareTurnManager:zl,getActionableUnitLimitDisplay:Vl,getPhaseStatusDisplay:Gl,getRoundStatusDisplay:Hl,getTurnStatusDisplay:ra,updateTurnDisplay:Is},Symbol.toStringTag,{value:"Module"}));let Hs=!1;function jg(){Hs||(Hs=!0,document.addEventListener("keydown",Wl),Dt()&&(console.log("🎮 Game input handler initialized"),console.log("💡 Press ENTER to advance phase, SHIFT+ENTER to skip phase, SPACE to end turn, ESC to show turn info"),console.log("💡 Debug: P for phase info, U for unit info, L to recalc limits, SHIFT+D to kill unit"),console.log("💡 Debug: CTRL+R to reset, SHIFT+R for new round")))}function Zg(){Hs&&(Hs=!1,document.removeEventListener("keydown",Wl),vt("Game input handler cleaned up"))}function Wl(i){if(re)switch(i.code){case"Enter":i.preventDefault(),re.isGameStarted()?i.shiftKey?re.skipPhase():re.advancePhase():console.log("⚠️ Game not started yet!");break;case"Space":i.preventDefault(),re.isGameStarted()?re.endTurn():console.log("⚠️ Game not started yet!");break;case"Escape":i.preventDefault();const e=re.getGameState();console.log("📊 Current Game State:",e),console.log(`📋 Phase Capabilities: Select=${e.canSelect}, Move=${e.canMove}, Act=${e.canAct}`),console.log(`🔄 Round Info: Round ${e.roundNumber}, Limit ${e.actionableUnitLimit}`),console.log(`🎯 Turns taken: P1=${e.turnsTakenThisRound.PLAYER_ONE}/${e.actionableUnitLimit}, P2=${e.turnsTakenThisRound.PLAYER_TWO}/${e.actionableUnitLimit}`),console.log(`👥 Alive units: Player=${e.alivePlayerUnits}, Enemy=${e.aliveEnemyUnits}`),console.log(`🎯 Selectable units: ${e.selectableUnits}`);break;case"KeyR":i.ctrlKey&&Dt()?(i.preventDefault(),console.log("🔄 Resetting turn manager..."),re.reset(),re.startGame()):i.shiftKey&&Dt()&&(i.preventDefault(),console.log("🔄 Forcing new round..."),re.forceNewRound());break;case"KeyP":if(Dt()){i.preventDefault();const t=re.getCurrentPhase();console.log(`📋 Current Phase: ${re.getPhaseDisplayName(t)}`),console.log("🎯 Phase Capabilities:"),console.log(`  Can Select: ${re.canSelect()}`),console.log(`  Can Move: ${re.canMove()}`),console.log(`  Can Act: ${re.canAct()}`)}break;case"KeyU":if(Dt()){i.preventDefault();const t=re.getSelectableUnits();console.log(`🎯 Selectable Units (${t.length}):`),t.forEach(s=>{console.log(`  - ${s.name} (${s.className}) - ID: ${s.id} - HP: ${s.currentHealth}/${s.health}`)});const n=re.getGameState();console.log(`👥 Unit counts: Player=${n.alivePlayerUnits}, Enemy=${n.aliveEnemyUnits}`),console.log(`🔄 Should end round after turn: ${n.shouldEndRoundAfterTurn}`)}break;case"KeyL":Dt()&&(i.preventDefault(),console.log("🔄 Forcing recalculation of actionable unit limit..."),re.forceRecalculateActionableUnitLimit());break;case"KeyD":if(i.shiftKey&&Dt()){i.preventDefault(),console.log("💀 Simulating unit death for testing...");const t=re.getSelectableUnits();if(t.length>0){const n=t[0],s=n.currentHealth;n.currentHealth=0;const r=n.team;re.onUnitHealthChanged(n.id,r,0,s),console.log(`💀 Killed ${n.name} (${r} team)`)}else console.log("⚠️ No selectable units to kill")}break}}function Kg(){console.log("🎮 Game Controls:"),console.log("  ENTER - Advance to next phase"),console.log("  SHIFT+ENTER - Skip current phase"),console.log("  SPACE - End current turn"),console.log("  ESC - Show current game state"),Dt()&&(console.log("  P - Show current phase info (debug only)"),console.log("  U - Show selectable units info (debug only)"),console.log("  L - Force recalculate unit limit (debug only)"),console.log("  SHIFT+D - Simulate unit death (debug only)"),console.log("  CTRL+R - Reset turn manager (debug only)"),console.log("  SHIFT+R - Force new round (debug only)"))}let ut=null,re=null;function Jg(i,e){const t=()=>{const l=e.querySelector("canvas");e.contains(l)&&bg();const c=i.querySelector("#player-resource-display-game-scene");c&&i.removeChild(c);const d=i.querySelector("#tile-coords-display-game-scene");d&&i.removeChild(d);const u=i.querySelector("#game-info-panel");u&&i.removeChild(u);const f=i.querySelector("#debug-mode-display-game-scene");f&&i.removeChild(f);const h=i.querySelector("#turn-display-game-scene");h&&i.removeChild(h);const g=i.querySelector("#phase-display-game-scene");g&&i.removeChild(g);const _=i.querySelector("#round-display-game-scene");_&&i.removeChild(_);const m=i.querySelector("#actionable-unit-limit-display-game-scene");for(m&&i.removeChild(m),ut&&(ut=null),re&&(re=null),gg(),Zg();i.firstChild;)i.removeChild(i.firstChild);i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center"},n=()=>{console.log("Proceeding to game scene..."),Jo(),t(),i.appendChild(e),Tg(e).then(()=>{const l=document.createElement("div");if(l.id="player-resource-display-game-scene",l.textContent=`Resource: ${pn.resource}`,l.style.position="absolute",l.style.bottom="20px",l.style.left="20px",l.style.padding="10px 15px",l.style.backgroundColor="#1a1a1a",l.style.color="#f1c40f",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.fontFamily="sans-serif",l.style.zIndex="100",i.appendChild(l),ut=document.createElement("div"),ut.id="tile-coords-display-game-scene",ut.style.position="absolute",ut.style.top="10px",ut.style.left="10px",ut.style.color="white",ut.style.fontFamily="sans-serif",ut.style.backgroundColor="rgba(0,0,0,0.5)",ut.style.padding="5px",ut.innerText="Coords: N/A",ut.style.zIndex="100",i.appendChild(ut),Dt()){const h=document.createElement("div");h.id="debug-mode-display-game-scene",h.textContent=`DEBUG MODE: ${wg()}`,h.style.position="absolute",h.style.top="10px",h.style.right="10px",h.style.padding="8px 12px",h.style.backgroundColor="#e74c3c",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #c0392b",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h)}mg(i),re=zl();const c=document.createElement("div");c.id="turn-display-game-scene",c.textContent=ra(re),c.style.position="absolute",c.style.top="50px",c.style.left="10px",c.style.padding="8px 12px",c.style.backgroundColor="rgba(52, 152, 219, 0.9)",c.style.color="white",c.style.borderRadius="5px",c.style.fontSize="0.9em",c.style.fontWeight="bold",c.style.fontFamily="sans-serif",c.style.zIndex="100",c.style.border="2px solid #2980b9",c.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(c);const d=document.createElement("div");d.id="phase-display-game-scene",d.textContent="Phase: Select",d.style.position="absolute",d.style.top="90px",d.style.left="10px",d.style.padding="8px 12px",d.style.backgroundColor="rgba(46, 204, 113, 0.9)",d.style.color="white",d.style.borderRadius="5px",d.style.fontSize="0.9em",d.style.fontWeight="bold",d.style.fontFamily="sans-serif",d.style.zIndex="100",d.style.border="2px solid #27ae60",d.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(d);const u=document.createElement("div");if(u.id="round-display-game-scene",u.textContent="Round 1",u.style.position="absolute",u.style.top="130px",u.style.left="10px",u.style.padding="8px 12px",u.style.backgroundColor="rgba(155, 89, 182, 0.9)",u.style.color="white",u.style.borderRadius="5px",u.style.fontSize="0.9em",u.style.fontWeight="bold",u.style.fontFamily="sans-serif",u.style.zIndex="100",u.style.border="2px solid #8e44ad",u.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(u),Dt()){const h=document.createElement("div");h.id="actionable-unit-limit-display-game-scene",h.textContent="Actionable Unit Limit: 0",h.style.position="absolute",h.style.top="170px",h.style.left="10px",h.style.padding="8px 12px",h.style.backgroundColor="rgba(230, 126, 34, 0.9)",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #d35400",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h)}jg(),Dt()&&Kg();const f=kg();if(f){console.log("Loading selected globe into game scene:",f);const h=new dg;window.GAME_SCENE_INSTANCE=h,h.setSelectedGlobe(f).then(()=>{console.log("✅ Globe loaded successfully")}).catch(g=>{console.error("❌ Failed to load globe:",g)}),Bg()}}).catch(l=>{console.error("Failed to start game:",l),e.innerHTML='<p style="color: red; text-align: center; font-family: sans-serif; padding: 20px;">Error: Could not load the game. Please check the console for more details.</p>'})},s=()=>{console.log("Transitioning to encounter scene..."),t(),zg(i,n)},r=()=>{console.log("Transitioning to shop scene..."),t(),el(i,s)};return{proceedToGameScene:n,handleDisplayShop:r,handleDisplaySquadInventory:()=>{console.log("Transitioning to Squad/Inventory scene..."),t(),Kr(i,s,r)},handleDisplayEncounter:s,showSplash:()=>{console.log("Showing splash screen..."),Rg(i,r)}}}async function Yo(){const{appContainer:i,gameSpecificContainer:e}=await Lc();Jg(i,e).showSplash()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>ya(Yo)):ya(Yo);
