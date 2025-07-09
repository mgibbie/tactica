(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let ic=class{constructor(e=0,t=0){this.resource=e,this.victories=t}gainResource(e){e>0&&(this.resource+=e,console.log(`Player gained ${e} resource. Total: ${this.resource}`))}spendResource(e){return e>0&&this.resource>=e?(this.resource-=e,console.log(`Player spent ${e} resource. Remaining: ${this.resource}`),!0):(console.log(`Player attempted to spend ${e} resource, but has only ${this.resource}.`),!1)}incrementVictories(){this.victories++,console.log(`Player victories incremented. Total: ${this.victories}`)}};const mn=new ic(10,0),Rn=class Rn{constructor(){this.playerParty=[],this.enemyUnits=[],this.shopUnits=[],this.storageUnits=[],this.playerItems=[],this.shopItems=[]}addUnitToPlayerParty(e){this.playerParty.length<Rn.MAX_PLAYER_PARTY_SIZE?(this.playerParty.push(e),console.log(`${e.name} (${e.className}) added to player party. Party size: ${this.playerParty.length}/${Rn.MAX_PLAYER_PARTY_SIZE}`)):console.warn(`Player party is full (${Rn.MAX_PLAYER_PARTY_SIZE} units). ${e.name} (${e.className}) was not added.`)}addUnitToEnemies(e){this.enemyUnits.push(e),console.log(`${e.name} (${e.className}) added to enemy units.`)}addUnitToShop(e){this.shopUnits.push(e),console.log(`${e.name} (${e.className}) added to shop units.`)}addUnitToStorage(e){this.storageUnits.push(e),console.log(`${e.name} (${e.className}) added to storage units.`)}addItemToPlayer(e){this.playerItems.push(e),console.log(`${e.name} added to player items.`)}addItemToShop(e){this.shopItems.push(e),console.log(`${e.name} added to shop items.`)}removeItemFromPlayer(e){const t=this.playerItems.findIndex(n=>n.id===e);if(t>-1){const n=this.playerItems[t];return this.playerItems.splice(t,1),console.log(`${n.name} removed from player items.`),!0}return!1}removeItemFromShop(e){const t=this.shopItems.findIndex(n=>n.id===e);if(t>-1){const n=this.shopItems[t];return this.shopItems.splice(t,1),console.log(`${n.name} removed from shop items.`),!0}return!1}findItemById(e){return[...this.playerItems,...this.shopItems].find(n=>n.id===e)}useItemOnUnit(e,t){const n=this.findItemById(e);if(!n)return console.warn(`Item with ID ${e} not found.`),!1;if(!this.playerItems.find(r=>r.id===e))return console.warn(`Item ${n.name} is not in player's inventory.`),!1;const s=n.effect(t);return s&&n.type==="consumable"&&(this.removeItemFromPlayer(e),console.log(`Consumable item ${n.name} was used and removed from inventory.`)),s}findUnitById(e){return[...this.playerParty,...this.enemyUnits,...this.shopUnits,...this.storageUnits].find(n=>n.id===e)}removeUnitFromPlayerParty(e){const t=this.playerParty.findIndex(n=>n.id===e);if(t>-1){const n=this.playerParty[t];return this.playerParty.splice(t,1),console.log(`${n.name} (${n.className}) removed from player party.`),!0}return!1}removeUnitFromEnemies(e){const t=this.enemyUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.enemyUnits[t];return this.enemyUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from enemy units.`),!0}return!1}removeUnitFromShop(e){const t=this.shopUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.shopUnits[t];return this.shopUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from shop units.`),!0}return!1}removeUnitFromStorage(e){const t=this.storageUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.storageUnits[t];return this.storageUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from storage units.`),!0}return!1}_removeUnitFromList(e,t){const n=e.findIndex(s=>s.id===t);return n>-1?e.splice(n,1)[0]:(console.warn(`_removeUnitFromList: Unit with ID ${t} not found in provided list.`),null)}reorderUnitInSquad(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`Reordered ${n.name} in squad to index ${s}.`)}else console.error(`reorderUnitInSquad: Unit ${e} not found in player party.`)}reorderUnitInStorage(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`Reordered ${n.name} in storage to index ${s}.`)}else console.error(`reorderUnitInStorage: Unit ${e} not found in storage units.`)}moveUnitToStorage(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`${n.name} moved from squad to storage at index ${s}.`)}else console.error(`moveUnitToStorage: Unit ${e} not found in player party to move to storage.`)}moveUnitToSquad(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n)if(this.playerParty.length<Rn.MAX_PLAYER_PARTY_SIZE){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`${n.name} moved from storage to squad at index ${s}. Party size: ${this.playerParty.length}/${Rn.MAX_PLAYER_PARTY_SIZE}`)}else this.storageUnits.push(n),console.warn(`moveUnitToSquad: Squad is full (${this.playerParty.length}/${Rn.MAX_PLAYER_PARTY_SIZE}). ${n.name} could not be moved from storage and was returned.`);else console.error(`moveUnitToSquad: Unit ${e} not found in storage to move to squad.`)}swapUnitsBetweenSquadAndStorage(e,t,n,s){const r=this._removeUnitFromList(this.storageUnits,e),a=this._removeUnitFromList(this.playerParty,t);if(r&&a){const o=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(o,0,r);const l=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(l,0,a),console.log(`Swapped ${r.name} (to squad slot ${o}) with ${a.name} (to box slot ${l}).`)}else if(r&&!a){const o=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(o,0,r),console.error(`Swap failed: Unit ${t} (to go to box) not found in squad. ${r.name} returned to storage.`)}else if(!r&&a){const o=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(o,0,a),console.error(`Swap failed: Unit ${e} (to go to squad) not found in storage. ${a.name} returned to squad.`)}else console.error(`Swap failed: Critical. Neither unit involved in the swap could be found and removed. Unit ${e} (from box) or ${t} (from squad).`)}};Rn.MAX_PLAYER_PARTY_SIZE=5;let Di=Rn;const Se=new Di;let pn=null;function sc(i,e,t,n,s){i.addEventListener("dragstart",r=>{if(!(r.target instanceof HTMLElement))return;const o=r.target.closest(".squad-unit-display");!o||o!==i||(pn={unitId:e.id,sourceContainer:t,originalIndex:n,element:i},r.dataTransfer&&(r.dataTransfer.setData("text/plain",e.id),r.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".unit-slot").forEach(r=>{r.style.border="1px dashed #566573",r.style.backgroundColor="#34495e"}),pn=null})}function rc(i,e,t,n){i.addEventListener("dragover",s=>{s.preventDefault(),pn&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",s.dataTransfer&&(s.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573"}),i.addEventListener("drop",s=>{if(s.preventDefault(),i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573",!pn)return;const{unitId:r,sourceContainer:a,originalIndex:o}=pn;if(a===e&&o===t&&i.contains(pn.element)){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop unit ${r}`),console.log(`Source: ${a}[${o}] -> Target: ${e}[${t}]`);const l=Se.findUnitById(r);if(!l){console.error("Drag-and-drop: Unit not found by ID",r),pn=null;return}if(a==="squad"&&e==="squad")Se.reorderUnitInSquad(r,t);else if(a==="box"&&e==="box")Se.reorderUnitInStorage(r,t);else if(a==="squad"&&e==="box"){if(Se.playerParty.length<=1){console.warn("Cannot move the last unit from squad to box. At least one unit must remain in the squad."),pn=null;return}Se.moveUnitToStorage(r,t)}else if(a==="box"&&e==="squad")if(Se.playerParty.length>=Di.MAX_PLAYER_PARTY_SIZE&&Se.playerParty[t]){const c=Se.playerParty[t];if(c)console.log(`Squad full, swapping ${l.name} with ${c.name}`),Se.swapUnitsBetweenSquadAndStorage(r,c.id,t,o);else{console.warn("Squad full, but target slot unexpectedly empty. Cannot move from box."),pn=null;return}}else Se.moveUnitToSquad(r,t);pn=null,n()})}let Lt=null;function oc(i){const e=document.createElement("div");return e.id="squad-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function ac(i){Lt&&(Lt.innerHTML=`
        <h4 style="margin: 0 0 5px 0; text-align: center;">${i.name} (${i.className}) - Level ${i.level}</h4>
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
    `)}function tl(i){if(!Lt)return;let e=i.clientX+15,t=i.clientY+15;e+Lt.offsetWidth>window.innerWidth&&(e=window.innerWidth-Lt.offsetWidth-10),t+Lt.offsetHeight>window.innerHeight&&(t=window.innerHeight-Lt.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Lt.style.left=`${e}px`,Lt.style.top=`${t}px`}function lc(i,e){Lt&&(ac(i),Lt.style.display="block",tl(e))}function cc(){Lt&&(Lt.style.display="none")}function dc(i){(!Lt||!i.contains(Lt))&&(Lt=oc(i))}function vo(i,e,t,n){const s=document.createElement("div");s.className="squad-unit-display",s.dataset.unitId=i.id,s.style.width="50px",s.style.height="65px",s.style.border="1px solid #7f8c8d",s.style.borderRadius="4px",s.style.backgroundColor="#4a6378",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="3px",s.style.textAlign="center",s.style.cursor="grab",s.draggable=!0,sc(s,i,e,t),s.addEventListener("mouseenter",l=>{lc(i,l)}),s.addEventListener("mousemove",l=>{tl(l)}),s.addEventListener("mouseleave",()=>{cc()});const r=document.createElement("img");r.src=i.imageUrl,r.alt=i.className,r.style.width="25px",r.style.height="25px",r.style.marginBottom="3px",r.style.borderRadius="2px";const a=document.createElement("h5");a.textContent=i.name,a.style.margin="0 0 2px 0",a.style.fontSize="0.7em",a.style.color="#ecf0f1";const o=document.createElement("p");return o.textContent=`(${i.className})`,o.style.margin="0",o.style.fontSize="0.6em",o.style.fontStyle="italic",o.style.color="#bdc3c7",s.appendChild(r),s.appendChild(a),s.appendChild(o),s}function So(i,e,t,n){const s=document.createElement("div");return s.id=i,s.className=`unit-slot ${e}-slot`,s.dataset.slotType=e,s.dataset.slotIndex=String(t),s.style.width="60px",s.style.height="75px",s.style.border="1px dashed #566573",s.style.borderRadius="5px",s.style.backgroundColor="#34495e",s.style.margin="3px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.transition="background-color 0.2s, border-color 0.2s",rc(s,e,t,n),s}let ei=null;function uc(i,e,t,n){i.draggable=!0,i.addEventListener("dragstart",s=>{if(!(s.target instanceof HTMLElement))return;const a=s.target.closest(".squad-item-display");!a||a!==i||(ei={itemId:e.id,originalIndex:t,element:i},s.dataTransfer&&(s.dataTransfer.setData("text/plain",e.id),s.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".item-slot").forEach(s=>{const r=s;r.classList.contains("empty-item-slot")?r.style.border="1px dashed #566573":r.style.border="1px solid #f39c12",r.style.backgroundColor="#34495e"}),ei=null})}function nl(i,e,t){i.addEventListener("dragover",n=>{n.preventDefault(),ei&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",n.dataTransfer&&(n.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.classList.contains("empty-item-slot")?i.style.border="1px dashed #566573":i.style.border="1px solid #f39c12"}),i.addEventListener("drop",n=>{if(n.preventDefault(),i.style.backgroundColor="#34495e",i.classList.contains("empty-item-slot")?i.style.border="1px dashed #566573":i.style.border="1px solid #f39c12",!ei)return;const{itemId:s,originalIndex:r}=ei;if(r===e){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop item ${s}`),console.log(`Source: [${r}] -> Target: [${e}]`);const a=Se.playerItems.find(l=>l.id===s);if(!a){console.error("Drag-and-drop: Item not found by ID",s),ei=null;return}Se.playerItems.splice(r,1);const o=Math.min(e,Se.playerItems.length);Se.playerItems.splice(o,0,a),console.log(`Item ${a.name} moved from ${r} to ${o}`),ei=null,t()})}let Br=null,zr=null,Hr=null;function hc(i){const e=document.getElementById("need-units-message");e&&e.remove();const t=document.createElement("div");t.id="need-units-message",t.textContent="Need At Least 1 Unit In Party",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}let Jt=null,Mt=null;function fc(i){const e=document.createElement("div");return e.id=`empty-item-slot-${i}`,e.className="item-slot empty-item-slot",e.style.width="60px",e.style.height="75px",e.style.border="1px dashed #566573",e.style.borderRadius="5px",e.style.backgroundColor="#34495e",e.style.margin="3px",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.transition="background-color 0.2s, border-color 0.2s",nl(e,i,ji),e}function pc(i,e,t){const n=document.createElement("div");n.id=`item-slot-${e}`,n.className="item-slot squad-item-display",n.dataset.itemId=i.id,n.style.width="60px",n.style.height="75px",n.style.border="1px solid #f39c12",n.style.borderRadius="5px",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.backgroundColor="#34495e",n.style.padding="3px",n.style.boxSizing="border-box",n.style.textAlign="center",n.style.cursor="grab",n.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",n.style.margin="3px";const s=document.createElement("img");s.src=i.imageUrl,s.alt=i.name,s.style.width="25px",s.style.height="25px",s.style.marginBottom="2px",s.style.borderRadius="2px",n.appendChild(s);const r=document.createElement("h6");return r.textContent=i.name,r.style.margin="0",r.style.fontSize="0.4em",r.style.color="#ecf0f1",r.style.fontWeight="bold",r.style.lineHeight="1.1",r.style.wordWrap="break-word",r.style.textAlign="center",r.style.maxWidth="54px",n.appendChild(r),n.addEventListener("mouseenter",()=>{n.title=`${i.name}
${i.description}`}),uc(n,i,e),nl(n,e,t),n.addEventListener("click",()=>{if(Jt&&Jt!==n){Jt.style.transform="translateY(0)",Jt.style.boxShadow="none",Jt.style.borderColor="#f39c12",Jt.style.backgroundColor="#34495e";const a=Jt.querySelector("button.use-button-item");a&&Jt.removeChild(a)}if(Jt===n){n.style.transform="translateY(0)",n.style.boxShadow="none",n.style.borderColor="#f39c12",n.style.backgroundColor="#34495e";const a=n.querySelector("button.use-button-item");a&&n.removeChild(a),Jt=null,Mt=null}else{Jt=n,n.style.transform="translateY(-3px)",n.style.boxShadow="0px 2px 8px rgba(0,0,0,0.3)",n.style.borderColor="#27ae60",n.style.backgroundColor="#2c5238";const a=n.querySelector("button.use-button-item");a&&n.removeChild(a),Mt=document.createElement("button"),Mt.className="use-button-item",Mt.textContent="Use",Mt.style.padding="1px 3px",Mt.style.fontSize="0.5em",Mt.style.backgroundColor="#27ae60",Mt.style.color="white",Mt.style.border="none",Mt.style.borderRadius="2px",Mt.style.cursor="pointer",Mt.style.marginTop="1px",Mt.style.width="100%",Mt.dataset.itemId=i.id,Mt.onclick=o=>{o.stopPropagation(),gn=i,t()},n.appendChild(Mt)}}),n}let gn=null;function Mo(i,e){i.addEventListener("click",t=>{gn&&(t.preventDefault(),t.stopPropagation(),Se.useItemOnUnit(gn.id,e)?(console.log(`Used ${gn.name} on ${e.name}`),gn=null,Jt=null,Mt=null,ji()):console.warn(`Failed to use ${gn.name} on ${e.name}`))}),gn?(i.style.boxShadow="0 0 5px #e74c3c",i.style.cursor="pointer",i.title=`Click to use ${gn.name} on ${e.name}`):(i.style.boxShadow="none",i.style.cursor="grab",i.title="")}function ji(){if(Br&&zr&&Hr){const i=document.getElementById("box-area"),e=i?i.scrollTop:0;no(Br,zr,Hr);const t=document.getElementById("box-area");t&&(t.scrollTop=e)}else console.error("Cannot refresh squad scene: a container or callback is missing.")}function no(i,e,t){Br=i,zr=e,Hr=t,console.log("Showing Squad/Inventory Scene..."),i.innerHTML="",dc(i);const n=document.createElement("div");n.id="squad-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");s.textContent="SQUAD / INVENTORY",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0";const r=document.createElement("div");r.id="squad-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-between",r.style.overflow="hidden";const a=document.createElement("div");a.id="units-section",a.style.width="65%",a.style.height="100%",a.style.display="flex",a.style.flexDirection="column",a.style.borderRight="2px solid #34495e",a.style.paddingRight="10px",a.style.boxSizing="border-box";const o=document.createElement("div");o.id="squad-area",o.style.marginBottom="10px";const l=document.createElement("h2");l.textContent="SQUAD (Active Party)",l.style.fontSize="1.2em",l.style.borderBottom="1px solid #7f8c8d",l.style.paddingBottom="3px",l.style.marginBottom="5px",o.appendChild(l);const c=document.createElement("div");c.style.display="flex",c.style.flexWrap="wrap",c.style.justifyContent="flex-start";for(let H=0;H<Di.MAX_PLAYER_PARTY_SIZE;H++){const Q=So(`squad-slot-${H}`,"squad",H,ji),C=Se.playerParty[H];if(C){const F=vo(C,"squad",H);Mo(F,C),Q.appendChild(F)}c.appendChild(Q)}o.appendChild(c),a.appendChild(o);const d=document.createElement("div");d.id="box-area",d.style.flexGrow="1",d.style.overflowY="auto",d.style.padding="5px",d.style.border="1px solid #34495e",d.style.borderRadius="5px";const u=document.createElement("h2");u.textContent="BOX (Storage)",u.style.fontSize="1.2em",u.style.borderBottom="1px solid #7f8c8d",u.style.paddingBottom="3px",u.style.marginBottom="5px",d.appendChild(u);const f=document.createElement("div");f.style.display="flex",f.style.flexWrap="wrap",f.style.justifyContent="flex-start",f.style.width="340px";const h=20,g=Se.storageUnits.length,y=Math.max(h,Math.ceil((g+4)/5)*5);for(let H=0;H<y;H++){const Q=So(`box-slot-${H}`,"box",H,ji),C=Se.storageUnits[H];if(C){const F=vo(C,"box",H);Mo(F,C),Q.appendChild(F)}f.appendChild(Q)}d.appendChild(f),a.appendChild(d);const m=document.createElement("div");m.id="items-section",m.style.width="33%",m.style.height="100%",m.style.paddingLeft="10px",m.style.boxSizing="border-box",m.style.display="flex",m.style.flexDirection="column",m.style.alignItems="center";const p=document.createElement("h2");p.textContent="ITEMS",p.style.fontSize="1.2em",p.style.borderBottom="1px solid #7f8c8d",p.style.paddingBottom="3px",p.style.marginBottom="10px",p.style.width="100%",p.style.textAlign="center";const M=document.createElement("div");M.style.width="100%",M.style.overflowY="auto",M.style.maxHeight="60%",M.style.padding="5px",M.style.border="1px solid #34495e",M.style.borderRadius="5px",M.style.backgroundColor="#34495e",M.style.display="flex",M.style.flexWrap="wrap",M.style.justifyContent="flex-start",M.style.alignContent="flex-start",M.style.paddingBottom="10px";const x=20,T=Se.playerItems.length,P=Math.max(x,Math.ceil((T+4)/5)*5);for(let H=0;H<P;H++){const Q=Se.playerItems[H];if(Q){const C=pc(Q,H,ji);M.appendChild(C)}else{const C=fc(H);M.appendChild(C)}}const w=document.createElement("p");w.id="item-instructions",gn?(w.innerHTML=`<span style="color: #e74c3c;">✓ ${gn.name} selected</span><br>Click a unit to use it`,w.style.color="#e74c3c"):(w.textContent='Click an item to select it, then click "Use" to prepare it, then click a unit to apply it.',w.style.color="#bdc3c7"),w.style.textAlign="center",w.style.fontSize="0.9em",w.style.marginTop="10px",w.style.fontStyle="italic",m.appendChild(p),m.appendChild(M),m.appendChild(w),r.appendChild(a),r.appendChild(m);const A=document.createElement("div");A.style.width="100%",A.style.display="flex",A.style.justifyContent="space-between",A.style.alignItems="center",A.style.paddingTop="15px",A.style.flexShrink="0";const V=document.createElement("div");V.id="player-resource-display",V.textContent=`Resource: ${mn.resource}`,V.style.padding="10px 15px",V.style.backgroundColor="#1a1a1a",V.style.color="#f1c40f",V.style.borderRadius="5px",V.style.fontSize="1em",V.style.fontWeight="bold",V.style.display="flex",V.style.alignItems="center";const v=document.createElement("button");v.textContent="Shop",v.style.padding="8px 15px",v.style.fontSize="1em",v.style.backgroundColor="#3498db",v.style.color="white",v.style.border="none",v.style.borderRadius="5px",v.style.cursor="pointer",v.style.margin="0 8px",v.addEventListener("mouseover",()=>v.style.backgroundColor="#2980b9"),v.addEventListener("mouseout",()=>v.style.backgroundColor="#3498db"),v.onclick=t;const b=document.createElement("div");b.style.display="flex",b.style.justifyContent="center",b.style.alignItems="center",b.style.flexGrow="2",b.appendChild(v);const B=document.createElement("button");B.textContent="PROCEED",B.style.padding="8px 15px",B.style.fontSize="1em",B.style.backgroundColor="#27ae60",B.style.color="white",B.style.border="none",B.style.borderRadius="5px",B.style.cursor="pointer",B.onclick=()=>{if(Se.playerParty.length===0){hc(i);return}e()},A.appendChild(V),A.appendChild(b),A.appendChild(B),n.appendChild(s),n.appendChild(r),n.appendChild(A),i.appendChild(n),console.log("Squad/Inventory Scene displayed with new layout and smaller slots.")}const mc="/assets/swordsman-DZczeJA5.PNG",gc="/assets/healer-6PZSpLWU.PNG",yc="/assets/hater-xGQmM0-V.PNG",_c="/assets/wizard-dFT0bH_F.PNG",xc="/assets/marksman-KgIJVx8I.PNG",vc="/assets/bannerman-BAY_kXBe.png",il={swordsman:{name:"Swordsman",energyType:"Kinetic",health:17,maxEnergy:10,basicDamage:8,skillDamage:3,range:1,move:3,cost:3,imageUrl:mc,skills:["blazing-knuckle"]},healer:{name:"Healer",energyType:"Potential",health:18,maxEnergy:20,basicDamage:3,skillDamage:4,range:2,move:3,cost:3,imageUrl:gc,skills:[]},hater:{name:"Hater",energyType:"Potential",health:16,maxEnergy:22,basicDamage:5,skillDamage:4,range:3,move:3,cost:3,imageUrl:yc,skills:["hurricane-slash"]},wizard:{name:"Wizard",energyType:"Potential",health:10,maxEnergy:15,basicDamage:3,skillDamage:7,range:3,move:3,cost:3,imageUrl:_c,skills:["tera-fire"]},marksman:{name:"Marksman",energyType:"Kinetic",health:12,maxEnergy:10,basicDamage:7,skillDamage:3,range:4,move:3,cost:3,imageUrl:xc,skills:["blazing-knuckle"]},bannerman:{name:"Bannerman",energyType:"Potential",health:20,maxEnergy:25,basicDamage:3,skillDamage:3,range:2,move:4,cost:3,imageUrl:vc,skills:["blazing-knuckle"]}},Sc={id:"blazing-knuckle",name:"Blazing Knuckle",description:"Unleashes fiery strikes in all cardinal directions around the target",energyCost:3,bonusDamage:3,targetingType:"non-rotational",emoji:"🔥",getTargetPattern:(i,e)=>[{x:i,y:e-1,isPrimary:!1},{x:i+1,y:e,isPrimary:!1},{x:i,y:e+1,isPrimary:!1},{x:i-1,y:e,isPrimary:!1}]},Mc={id:"tera-fire",name:"Tera Fire",description:"Strikes primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:3,targetingType:"dual-rotational",emoji:"🔥",getTargetPattern:(i,e,t,n)=>{const s=n||0;let r=1,a=-1;switch(s%4){case 0:r=1,a=-1;break;case 1:r=1,a=1;break;case 2:r=-1,a=1;break;case 3:r=-1,a=-1;break}return[{x:i,y:e,isPrimary:!0},{x:i+r,y:e+a,isPrimary:!1}]}},Ec={id:"universal-whisper",name:"Universal Whisper",description:"Heals primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:1,targetingType:"dual-rotational",emoji:"🪐",getTargetPattern:(i,e,t,n)=>{const a=[{x:1,y:-1},{x:1,y:1},{x:-1,y:1},{x:-1,y:-1}][(n||0)%4];return[{x:i,y:e},{x:i+a.x,y:e+a.y}]}},bc={id:"hurricane-slash",name:"Hurricane Slash",description:"A powerful melee attack that can target any adjacent enemy within 1 range.",energyCost:3,bonusDamage:3,targetingType:"adjacent-attack",emoji:"🌩️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},Tc={id:"bandage",name:"Bandage",description:"Heals the user for (Skill Damage + 1) Health. Targets self only.",energyCost:2,bonusDamage:1,targetingType:"non-rotational",emoji:"🩹",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},Ds={"blazing-knuckle":Sc,"tera-fire":Mc,"universal-whisper":Ec,"hurricane-slash":bc,bandage:Tc},Eo=["Mike","Bryan","Matt","Gabe","Waylin","Axel","Laharl","Steve","Garrison","Sock","Franz","Edgar","Dan","Frank","Keyboard","Justin","Jack","Ned","Elliot","Sam","Alex","Jackson","Kyle","Don Julio","Derek","Peter","Herbert","Liam","Arthur","Gavin","Dylan","Kieran","Romulus"];let Ac=1;function wc(){return`unit-${Ac++}`}function Rc(){const i=Math.floor(Math.random()*Eo.length);return Eo[i]}class Cc{constructor(e){this.registry=e}createUnit(e,t="player"){const n=il[e];if(!n)return console.error(`Unit type "${e}" not found in UnitDex.`),null;let s;n.energyType.toLowerCase()==="potential"?s=n.maxEnergy:n.energyType.toLowerCase()==="kinetic"?s=0:(console.warn(`Unknown energy type "${n.energyType}" for unit "${e}". Defaulting to max energy.`),s=n.maxEnergy);const r=n.skills.map(o=>Ds[o]).filter(o=>o!==void 0),a={id:wc(),name:Rc(),className:n.name,energyType:n.energyType,health:n.health,currentHealth:n.health,maxEnergy:n.maxEnergy,currentEnergy:s,basicDamage:n.basicDamage,skillDamage:n.skillDamage,range:n.range,move:n.move,cost:n.cost,imageUrl:n.imageUrl,skills:r,activeModifiers:[],team:t,level:1,perkPoints:0,purchasedPerks:[],isAlive:!0,turnTakenThisRound:!1,isTargetable:!0,isDestructible:!0,isSubUnit:!1,isStructure:!1};return console.log(`Created unit: ${a.name} (${a.className}) (ID: ${a.id}) - Cost: ${a.cost} - Energy: ${a.currentEnergy}/${a.maxEnergy} (${a.energyType})`),a}createAndAddUnitToPlayerParty(e){const t=this.createUnit(e);return t&&this.registry.addUnitToPlayerParty(t),t}}const sl=new Cc(Se),Pc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKraVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Q3JlYXRvclRvb2w+PHhtcDpjcmVhdG9ydG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Y3JlYXRvcnRvb2w+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+PHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSd3Jz8+d1SxtAAAAi1JREFUaEPtmCGUgkAQhn8vGY1EIpFINF40Go0XicSNRKLRSCQaLxKJRCLRaPPC+vvcOffdqoiH8r1nYKXMfjszO0yKosCQ+ZALQ2NyqwGl1EE8T86f++L9DHDn99MvYz0IAgDAarHr1cTrG5BnPZxvAABlWQIAYrUCAKyTCHhCLgzegDUApdRBKXXwwwx+mCGcb067/5+wBjAUfuUAz7wfZgCAuq6N/wnPfrnV/zMn0sQbc+AanA1Eka4ycaLrfVnp95t6BwBomxYAUH1rMxL2ja4NvY4B287Ls+75HgBguZzp9aOJba5zYDbT63xPIk3d2zdez4DstHlhnuk812eeFLmZQ4vlwnj2A21EwtzZbj6BO0y8jgEi7z5E3j6n+zVwljM8+zRHmENRaCyfcoe5tZg3owEnZLVyrTrE1kduzYXBG+g8AD+YGb84CRAnATzfg+d7yNIaWXr5fnULnQfQNw8PoKz0j0ZooiseHsCj6TyApt6dKsslaKLc1qcegGOfkb3Ghc4D6Jur+wBJ0vaAs+9Btn4g70JyfuD7dWVWpqaKAYe+8L4GZEcmNhM2eJvlnYlwvvjLxPsaIPJbKXOCBKH5TLjznB844Ul4Z7J9+RsNSOQ8IWs7d5zViWedprguq5Vthh4NuCKrltxxkik9k3PiI3LnyWjAFZsBQhO2amNj8AZ6D6CpYjRVjLZpjXlZ3k5d6T2AruktBySyXxDXs09GA89m8AbGAJ7ND9DxIKyQkDFTAAAAAElFTkSuQmCC",Lc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACU0lEQVR4AdXBoZLqPBzG4V8yXEDkykpkJXLlyiORyEouIXJlJLISGYmMrKxERq7830FP3/lMBcM3O3BEnsflnGmZp3Gexnka52mcp3Gexnka52mcp3Gexnka52mcp3Gexnkat+MfqXVc2Oi6k+Mf8DRux5vVOi6shmFk63I5Lay67uR4I0/jdrxJrePCahhGHjkeB+R6vSysuu7keANP43a8qNZxYTUMI8+YVeTr6wu53caFVdedHC/wNM7lnPmNktLCqvsTkGEYecZsYsussnW73ZBxrEiM0fELnsbt+B8lpYVVMUNOpw4ZhpFHzCYeMatICB1iVpHjceA/F6SktLAqZkiM0fGEp3Eu58xWSWlhVcyQ9PmJ7PseCcc/iNmEhHBAzCYkhANiNiFmFQmhQ8wqEkKHmFUkhA65Xi9IXzskzzNSzJAYo2PD0ziXc0ZijAur9PmJ7Pueh74+kBAOiNmEhHBAzCbErCIhdIhZRULoELOKhNAhZhX5udyRfd+zdZ9n5FwKEmN0rDyNczlntkpKC6tihtzOZx65zzNy+I6I2YSEcEDMJiSEA2I28cj1ekH62iH7vmfrexyRYobEGB0bnsa5nDPPlJQWVsUMuZ3PPHKfZ+Rj2CM/lzvyMeyRn8sd+Rj2yM/ljuz7nq3vcUSKGRJjdDzhaZzLOfMbJaWFVTFDbuczr/geR6SYITFGxy94GudyzryipLSwKmbI7Xzmkfs8I3mekWKGxBgdL/A0zuWceaeS0sIDxQyJMTreyNM4l3OmZZ7GeRrnaZyncZ7G/QXXH/ttJS3xdQAAAABJRU5ErkJggg==",Uc={Swordsman:{className:"Swordsman",perks:[{id:"swordsman-bandage",name:"Bandage",description:"Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",icon:"🩹",row:0,column:0,unlockRequirements:[],effect:i=>{const e=Ds.bandage;e&&!i.skills.find(t=>t.id==="bandage")&&(i.skills.push(e),console.log(`${i.name} learned Bandage skill!`))}},{id:"swordsman-prepare",name:"Prepare",description:"Allows the unit to prepare for upcoming attacks.",icon:"🛡️",row:0,column:1,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Prepare!`)}},{id:"swordsman-teleport",name:"Teleport",description:"Grants the ability to teleport short distances.",icon:"⚡",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Teleport!`)}},{id:"swordsman-disarming-slash",name:"Disarming Slash",description:"Strike that disarms enemies, reducing their attack power.",icon:"🗡️",row:1,column:0,unlockRequirements:["swordsman-bandage"],effect:i=>{console.log(`${i.name} learned Disarming Slash!`)}},{id:"swordsman-inspiring-slash",name:"Inspiring Slash",description:"Strike that boosts nearby allies' morale and energy.",icon:"⚔️",row:1,column:1,unlockRequirements:["swordsman-prepare"],effect:i=>{console.log(`${i.name} learned Inspiring Slash!`)}},{id:"swordsman-spring-slash",name:"Spring Slash",description:"Swift leaping attack that covers great distance.",icon:"🌸",row:1,column:2,unlockRequirements:["swordsman-teleport"],effect:i=>{console.log(`${i.name} learned Spring Slash!`)}},{id:"swordsman-revenge",name:"Revenge",description:"Deal massive damage when health is low.",icon:"💀",row:2,column:0,unlockRequirements:["swordsman-disarming-slash"],effect:i=>{console.log(`${i.name} learned Revenge!`)}},{id:"swordsman-forceful-strike",name:"Forceful Strike",description:"Powerful attack that can push enemies back.",icon:"💥",row:2,column:1,unlockRequirements:["swordsman-inspiring-slash"],effect:i=>{console.log(`${i.name} learned Forceful Strike!`)}},{id:"swordsman-smoke-grenade",name:"Smoke Grenade",description:"Create a smoke screen to obscure vision and escape.",icon:"💨",row:2,column:2,unlockRequirements:["swordsman-spring-slash"],effect:i=>{console.log(`${i.name} learned Smoke Grenade!`)}},{id:"swordsman-lifeblade",name:"Lifeblade",description:"Attacks heal the wielder based on damage dealt.",icon:"❤️",row:3,column:0,unlockRequirements:["swordsman-revenge"],effect:i=>{console.log(`${i.name} learned Lifeblade!`)}},{id:"swordsman-overpierce",name:"Overpierce",description:"Attacks pierce through enemies to hit multiple targets.",icon:"🔥",row:3,column:1,unlockRequirements:["swordsman-forceful-strike"],effect:i=>{console.log(`${i.name} learned Overpierce!`)}},{id:"swordsman-teleport-slash",name:"Teleport Slash",description:"Instantly teleport to any enemy and strike with devastating force.",icon:"🌟",row:3,column:2,unlockRequirements:["swordsman-smoke-grenade"],effect:i=>{console.log(`${i.name} learned Teleport Slash!`)}}]},Healer:{className:"Healer",perks:[{id:"healer-universal-whisper",name:"Universal Whisper",description:"A gentle healing spell that restores health to allies.",icon:"🌟",row:0,column:0,unlockRequirements:[],effect:i=>{const e=Ds["universal-whisper"];e&&!i.skills.find(t=>t.id==="universal-whisper")&&(i.skills.push(e),console.log(`${i.name} learned Universal Whisper skill!`))}},{id:"healer-healing-circle",name:"Healing Circle",description:"Create a circle of healing energy that affects multiple allies.",icon:"⭕",row:0,column:1,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Healing Circle!`)}},{id:"healer-beam",name:"Beam",description:"Focus healing energy into a concentrated beam of light.",icon:"✨",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Beam!`)}},{id:"healer-stars-blessing",name:"Star's Blessing",description:"Call upon celestial power to grant divine protection.",icon:"⭐",row:1,column:0,unlockRequirements:["healer-universal-whisper"],effect:i=>{console.log(`${i.name} learned Star's Blessing!`)}},{id:"healer-outburst",name:"Outburst",description:"Release a burst of healing energy that spreads outward.",icon:"💥",row:1,column:1,unlockRequirements:["healer-healing-circle"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"healer-purifying-hand",name:"Purifying Hand",description:"Cleanse corruption and purify the battlefield with divine touch.",icon:"🤲",row:1,column:2,unlockRequirements:["healer-beam"],effect:i=>{console.log(`${i.name} learned Purifying Hand!`)}},{id:"healer-finger-of-god",name:"Finger of God",description:"Channel divine wrath to smite enemies with holy power.",icon:"👆",row:2,column:0,unlockRequirements:["healer-stars-blessing"],effect:i=>{console.log(`${i.name} learned Finger of God!`)}},{id:"healer-star-song",name:"Star Song",description:"Sing a celestial melody that inspires and empowers allies.",icon:"🎵",row:2,column:1,unlockRequirements:["healer-outburst"],effect:i=>{console.log(`${i.name} learned Star Song!`)}},{id:"healer-flash-of-sun",name:"Flash of Sun",description:"Blind enemies with brilliant solar radiance while healing allies.",icon:"☀️",row:2,column:2,unlockRequirements:["healer-purifying-hand"],effect:i=>{console.log(`${i.name} learned Flash of Sun!`)}},{id:"healer-aethers-grace",name:"Aether's Grace",description:"Invoke the highest divine blessing for ultimate healing power.",icon:"🕊️",row:3,column:0,unlockRequirements:["healer-finger-of-god"],effect:i=>{console.log(`${i.name} learned Aether's Grace!`)}},{id:"healer-symphony",name:"Symphony",description:"Conduct a divine symphony that harmonizes all magical energies.",icon:"🎼",row:3,column:1,unlockRequirements:["healer-star-song"],effect:i=>{console.log(`${i.name} learned Symphony!`)}},{id:"healer-rescue",name:"Rescue",description:"Instantly transport and fully heal any ally in mortal danger.",icon:"🚑",row:3,column:2,unlockRequirements:["healer-flash-of-sun"],effect:i=>{console.log(`${i.name} learned Rescue!`)}}]},Hater:{className:"Hater",perks:[{id:"hater-poison-dart",name:"Poison Dart",description:"Launch a toxic projectile that deals damage over time.",icon:"🎯",row:0,column:0,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Poison Dart!`)}},{id:"hater-jeer",name:"Jeer",description:"Mock enemies to reduce their morale and accuracy.",icon:"😈",row:0,column:1,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Jeer!`)}},{id:"hater-exhaust",name:"Exhaust",description:"Drain energy from enemies to weaken their abilities.",icon:"💤",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Exhaust!`)}},{id:"hater-toxic-cloud",name:"Toxic Cloud",description:"Create a poisonous cloud that damages all enemies within.",icon:"☁️",row:1,column:0,unlockRequirements:["hater-poison-dart"],effect:i=>{console.log(`${i.name} learned Toxic Cloud!`)}},{id:"hater-outburst",name:"Outburst",description:"Explosive tantrum that damages and stuns nearby enemies.",icon:"🤬",row:1,column:1,unlockRequirements:["hater-jeer"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"hater-distraction",name:"Distraction",description:"Confuse enemies, making them attack each other instead.",icon:"🌀",row:1,column:2,unlockRequirements:["hater-exhaust"],effect:i=>{console.log(`${i.name} learned Distraction!`)}},{id:"hater-taunt",name:"Taunt",description:"Force enemies to attack you while reducing their damage.",icon:"🎭",row:2,column:0,unlockRequirements:["hater-toxic-cloud"],effect:i=>{console.log(`${i.name} learned Taunt!`)}},{id:"hater-back-off",name:"Back Off",description:"Aggressive shout that pushes enemies away and intimidates them.",icon:"🚫",row:2,column:1,unlockRequirements:["hater-outburst"],effect:i=>{console.log(`${i.name} learned Back Off!`)}},{id:"hater-drain-punch",name:"Drain Punch",description:"Steal energy from enemies on hit to fuel your own abilities.",icon:"🥊",row:2,column:2,unlockRequirements:["hater-distraction"],effect:i=>{console.log(`${i.name} learned Drain Punch!`)}},{id:"hater-toxic-king",name:"Toxic King",description:"Become immune to poison and spread toxicity with every attack.",icon:"👑",row:3,column:0,unlockRequirements:["hater-taunt"],effect:i=>{console.log(`${i.name} learned Toxic King!`)}},{id:"hater-psyche-break",name:"Psyche Break",description:"Shatter enemy morale, causing them to flee or surrender.",icon:"💔",row:3,column:1,unlockRequirements:["hater-back-off"],effect:i=>{console.log(`${i.name} learned Psyche Break!`)}},{id:"hater-dizzy-slam",name:"Dizzy Slam",description:"Devastating attack that leaves enemies disoriented and vulnerable.",icon:"🌪️",row:3,column:2,unlockRequirements:["hater-drain-punch"],effect:i=>{console.log(`${i.name} learned Dizzy Slam!`)}}]},Wizard:{className:"Wizard",perks:[{id:"wizard-flare-shot",name:"Flare Shot",description:"Launch a bright projectile that illuminates and damages enemies.",icon:"🔥",row:0,column:0,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Flare Shot!`)}},{id:"wizard-splash",name:"Splash",description:"Create a magical splash that affects multiple nearby targets.",icon:"💧",row:0,column:1,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Splash!`)}},{id:"wizard-spark-lance",name:"Spark Lance",description:"Conjure a piercing lance of electrical energy.",icon:"⚡",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Spark Lance!`)}},{id:"wizard-solar-ray",name:"Solar Ray",description:"Channel the power of the sun into a concentrated beam of light.",icon:"☀️",row:1,column:0,unlockRequirements:["wizard-flare-shot"],effect:i=>{console.log(`${i.name} learned Solar Ray!`)}},{id:"wizard-comet-tail",name:"Comet Tail",description:"Summon a trailing comet that burns enemies in its path.",icon:"☄️",row:1,column:1,unlockRequirements:["wizard-splash"],effect:i=>{console.log(`${i.name} learned Comet Tail!`)}},{id:"wizard-cosmic-impact",name:"Cosmic Impact",description:"Call down cosmic forces to strike with devastating power.",icon:"🌌",row:1,column:2,unlockRequirements:["wizard-spark-lance"],effect:i=>{console.log(`${i.name} learned Cosmic Impact!`)}},{id:"wizard-flare-up",name:"Flare Up",description:"Cause existing fires to explode outward, spreading damage.",icon:"🌋",row:2,column:0,unlockRequirements:["wizard-solar-ray"],effect:i=>{console.log(`${i.name} learned Flare Up!`)}},{id:"wizard-divination",name:"Divination",description:"Peer into the future to predict and counter enemy actions.",icon:"🔮",row:2,column:1,unlockRequirements:["wizard-comet-tail"],effect:i=>{console.log(`${i.name} learned Divination!`)}},{id:"wizard-cauterize",name:"Cauterize",description:"Use magical fire to seal wounds and purify corruption.",icon:"🩸",row:2,column:2,unlockRequirements:["wizard-cosmic-impact"],effect:i=>{console.log(`${i.name} learned Cauterize!`)}},{id:"wizard-gaias-rage",name:"Gaia's Rage",description:"Channel the earth's fury to cause devastating earthquakes and eruptions.",icon:"🌍",row:3,column:0,unlockRequirements:["wizard-flare-up"],effect:i=>{console.log(`${i.name} learned Gaia's Rage!`)}},{id:"wizard-tidal-lock",name:"Tidal Lock",description:"Bind enemies in place with gravitational forces and crushing water pressure.",icon:"🌊",row:3,column:1,unlockRequirements:["wizard-divination"],effect:i=>{console.log(`${i.name} learned Tidal Lock!`)}},{id:"wizard-plasma-tempest",name:"Plasma Tempest",description:"Unleash a storm of superheated plasma that devastates the battlefield.",icon:"🌪️",row:3,column:2,unlockRequirements:["wizard-cauterize"],effect:i=>{console.log(`${i.name} learned Plasma Tempest!`)}}]},Marksman:{className:"Marksman",perks:[{id:"marksman-lights-on",name:"Light's On",description:"Illuminates the battlefield, revealing hidden enemies and weak points.",icon:"💡",row:0,column:0,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Light's On!`)}},{id:"marksman-bandage",name:"Bandage",description:"Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",icon:"🩹",row:0,column:1,unlockRequirements:[],effect:i=>{const e=Ds.bandage;e&&!i.skills.find(t=>t.id==="bandage")&&(i.skills.push(e),console.log(`${i.name} learned Bandage skill!`))}},{id:"marksman-longshot",name:"Longshot",description:"Extends attack range for precision strikes at maximum distance.",icon:"🎯",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Longshot!`)}},{id:"marksman-aim-high",name:"Aim High",description:"Target enemy weak points for increased critical hit chance.",icon:"🎪",row:1,column:0,unlockRequirements:["marksman-lights-on"],effect:i=>{console.log(`${i.name} learned Aim High!`)}},{id:"marksman-backflip",name:"Backflip",description:"Agile maneuver that repositions and evades enemy attacks.",icon:"🤸",row:1,column:1,unlockRequirements:["marksman-bandage"],effect:i=>{console.log(`${i.name} learned Backflip!`)}},{id:"marksman-zero-in",name:"Zero-In",description:"Focus intensely on a target to guarantee the next shot hits.",icon:"🔍",row:1,column:2,unlockRequirements:["marksman-longshot"],effect:i=>{console.log(`${i.name} learned Zero-In!`)}},{id:"marksman-tracking-dart",name:"Tracking Dart",description:"Fire a dart that marks enemies, revealing their position and weaknesses.",icon:"🏹",row:2,column:0,unlockRequirements:["marksman-aim-high"],effect:i=>{console.log(`${i.name} learned Tracking Dart!`)}},{id:"marksman-flashbang",name:"Flashbang",description:"Throw a blinding grenade that stuns and disorients enemies.",icon:"⚡",row:2,column:1,unlockRequirements:["marksman-backflip"],effect:i=>{console.log(`${i.name} learned Flashbang!`)}},{id:"marksman-aim-low",name:"Aim Low",description:"Target enemy legs to slow their movement and reduce mobility.",icon:"🦵",row:2,column:2,unlockRequirements:["marksman-zero-in"],effect:i=>{console.log(`${i.name} learned Aim Low!`)}},{id:"marksman-perimeter",name:"Perimeter",description:"Establish a defensive perimeter that detects and slows approaching enemies.",icon:"🛡️",row:3,column:0,unlockRequirements:["marksman-tracking-dart"],effect:i=>{console.log(`${i.name} learned Perimeter!`)}},{id:"marksman-hunker-down",name:"Hunker Down",description:"Take a defensive stance that increases defense but reduces movement.",icon:"🏠",row:3,column:1,unlockRequirements:["marksman-flashbang"],effect:i=>{console.log(`${i.name} learned Hunker Down!`)}},{id:"marksman-overpierce",name:"Overpierce",description:"Attacks pierce through enemies to hit multiple targets.",icon:"🔥",row:3,column:2,unlockRequirements:["marksman-aim-low"],effect:i=>{console.log(`${i.name} learned Overpierce!`)}}]},Bannerman:{className:"Bannerman",perks:[{id:"bannerman-lead-the-charge",name:"Lead the Charge",description:"Rally allies and charge forward with increased damage and speed.",icon:"⚡",row:0,column:0,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Lead the Charge!`)}},{id:"bannerman-bash",name:"Bash",description:"Powerful shield bash that stuns enemies and creates openings.",icon:"🛡️",row:0,column:1,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Bash!`)}},{id:"bannerman-peace-sign",name:"Peace Sign",description:"Diplomatic gesture that can calm hostile enemies or boost morale.",icon:"✌️",row:0,column:2,unlockRequirements:[],effect:i=>{console.log(`${i.name} learned Peace Sign!`)}},{id:"bannerman-anthem",name:"Anthem",description:"Inspiring battle song that buffs all allies with courage and strength.",icon:"🎵",row:1,column:0,unlockRequirements:["bannerman-lead-the-charge"],effect:i=>{console.log(`${i.name} learned Anthem!`)}},{id:"bannerman-rally",name:"Rally",description:"Gather scattered allies and restore their fighting spirit.",icon:"📢",row:1,column:1,unlockRequirements:["bannerman-bash"],effect:i=>{console.log(`${i.name} learned Rally!`)}},{id:"bannerman-outburst",name:"Outburst",description:"Explosive burst of energy that damages nearby enemies.",icon:"💥",row:1,column:2,unlockRequirements:["bannerman-peace-sign"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"bannerman-whirlwind",name:"Whirlwind",description:"Spinning attack that hits all surrounding enemies.",icon:"🌪️",row:2,column:0,unlockRequirements:["bannerman-anthem"],effect:i=>{console.log(`${i.name} learned Whirlwind!`)}},{id:"bannerman-staccato",name:"Staccato",description:"Rapid series of precise strikes that build momentum.",icon:"🎼",row:2,column:1,unlockRequirements:["bannerman-rally"],effect:i=>{console.log(`${i.name} learned Staccato!`)}},{id:"bannerman-pierce",name:"Pierce",description:"Armor-piercing attack that ignores enemy defenses.",icon:"🗡️",row:2,column:2,unlockRequirements:["bannerman-outburst"],effect:i=>{console.log(`${i.name} learned Pierce!`)}},{id:"bannerman-plant-the-flag",name:"Plant the Flag",description:"Plant a battle standard that provides massive area buffs.",icon:"🏴",row:3,column:0,unlockRequirements:["bannerman-whirlwind"],effect:i=>{console.log(`${i.name} learned Plant the Flag!`)}},{id:"bannerman-rescue",name:"Rescue",description:"Quickly move to aid fallen allies and restore them to fighting condition.",icon:"🚑",row:3,column:1,unlockRequirements:["bannerman-staccato"],effect:i=>{console.log(`${i.name} learned Rescue!`)}},{id:"bannerman-redistribute",name:"Redistribute",description:"Share resources and abilities among all allies for optimal battlefield efficiency.",icon:"⚖️",row:3,column:2,unlockRequirements:["bannerman-pierce"],effect:i=>{console.log(`${i.name} learned Redistribute!`)}}]}};function io(i){return Uc[i]||null}function Dc(i,e){const t=io(i);return t&&t.perks.find(n=>n.id===e)||null}function rl(i){const e=io(i.className);return e?e.perks.filter(t=>i.purchasedPerks.includes(t.id)?!1:t.unlockRequirements.every(n=>i.purchasedPerks.includes(n))):[]}function Ic(i,e){const t=Dc(i.className,e);return!t||!rl(i).find(s=>s.id===e)||i.perkPoints<1?!1:(i.perkPoints-=1,i.purchasedPerks.push(e),t.effect(i),!0)}class Nc{constructor(){this.container=null,this.currentUnit=null,this.onClose=void 0,this.createScene()}createScene(){this.container=document.createElement("div"),this.container.className="skill-tree-scene",this.container.style.display="none",this.container.style.position="fixed",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100vw",this.container.style.height="100vh",this.container.style.backgroundColor="rgba(0, 0, 0, 0.95)",this.container.style.zIndex="1000",this.container.style.flexDirection="column",this.container.style.alignItems="center",this.container.style.padding="40px 20px",this.container.style.overflow="auto",document.body.appendChild(this.container)}openSkillTree(e,t){this.currentUnit=e,this.onClose=t||void 0,this.container&&(this.container.innerHTML="",this.createHeader(e),this.createSkillTree(e),this.createBackButton(),this.container.style.display="flex",console.log(`Opened skill tree for ${e.name} (${e.className}) - ${e.perkPoints} perk points available`))}createHeader(e){if(!this.container)return;const t=document.createElement("div");t.style.textAlign="center",t.style.marginBottom="30px",t.style.color="white";const n=document.createElement("h2");n.textContent=`${e.name} - ${e.className} Skill Tree`,n.style.fontSize="2rem",n.style.margin="0 0 10px 0",n.style.textShadow="0 0 10px rgba(255, 255, 255, 0.5)";const s=document.createElement("p");s.textContent=`Level ${e.level} | ${e.perkPoints} Perk Points Available`,s.style.fontSize="1.2rem",s.style.margin="0",s.style.color="#ffd700",t.appendChild(n),t.appendChild(s),this.container.appendChild(t)}createSkillTree(e){if(!this.container)return;const t=io(e.className);if(!t){const a=document.createElement("p");a.textContent="No skill tree available for this unit type.",a.style.color="white",a.style.fontSize="1.2rem",this.container.appendChild(a);return}const n=document.createElement("div");n.className="skill-tree-container",n.style.position="relative",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.gap="60px",n.style.flex="1",n.style.justifyContent="center",n.style.minHeight="400px";const s=new Map;t.perks.forEach(a=>{s.has(a.row)||s.set(a.row,[]),s.get(a.row).push(a)}),Array.from(s.keys()).sort((a,o)=>a-o).forEach(a=>{const o=document.createElement("div");o.className="perk-row",o.style.display="flex",o.style.justifyContent="center",o.style.gap="80px",o.style.position="relative",o.dataset.row=a.toString(),s.get(a).sort((c,d)=>c.column-d.column).forEach(c=>{const d=this.createPerkNode(c,e);o.appendChild(d)}),n.appendChild(o)}),this.container.appendChild(n),setTimeout(()=>{this.createConnections(n,t.perks,e)},10)}createPerkNode(e,t){const n=document.createElement("div");n.className="perk-node",n.dataset.perkId=e.id,n.style.width="80px",n.style.height="80px",n.style.borderRadius="50%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.position="relative",n.style.transition="all 0.3s ease",n.style.border="3px solid",n.style.fontSize="1.5rem";const s=t.purchasedPerks.includes(e.id),r=rl(t).some(l=>l.id===e.id),a=t.perkPoints>0;s?(n.style.backgroundColor="#00ff88",n.style.borderColor="#ffffff",n.style.color="#000000",n.style.boxShadow="0 0 20px rgba(0, 255, 136, 0.8)"):r&&a?(n.style.backgroundColor="#4a90e2",n.style.borderColor="#00ff88",n.style.color="#ffffff",n.style.cursor="pointer",n.style.boxShadow="0 0 15px rgba(74, 144, 226, 0.5)"):(n.style.backgroundColor="#333333",n.style.borderColor="#666666",n.style.color="#888888",n.style.cursor="not-allowed");const o=document.createElement("div");return o.textContent=e.icon,o.style.fontSize="2rem",o.style.marginBottom="2px",n.appendChild(o),r&&a&&!s&&(n.addEventListener("click",()=>{this.purchasePerk(e.id)}),n.addEventListener("mouseenter",()=>{n.style.transform="scale(1.1)",n.style.boxShadow="0 0 25px rgba(0, 255, 136, 0.8)"}),n.addEventListener("mouseleave",()=>{n.style.transform="scale(1)",n.style.boxShadow="0 0 15px rgba(74, 144, 226, 0.5)"})),this.addTooltip(n,e,s,r,a),n}addTooltip(e,t,n,s,r){let a=null;const o=c=>{a=document.createElement("div"),a.className="perk-tooltip",a.style.position="absolute",a.style.backgroundColor="rgba(0, 0, 0, 0.9)",a.style.color="white",a.style.padding="12px",a.style.borderRadius="8px",a.style.border="2px solid #333",a.style.maxWidth="250px",a.style.zIndex="1001",a.style.pointerEvents="none",a.style.fontSize="0.9rem",a.style.boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)";let d="";n?d="✅ Purchased":s&&r?d="💰 Available (Click to purchase)":s&&!r?d="❌ No perk points available":d="🔒 Requirements not met",a.innerHTML=`
                <div style="color: #00ff88; font-weight: bold; margin-bottom: 5px;">${t.name}</div>
                <div style="margin-bottom: 8px;">${t.description}</div>
                <div style="color: #ffd700; font-size: 0.8rem;">${d}</div>
            `,document.body.appendChild(a);const u=e.getBoundingClientRect();a.style.left=`${u.right+10}px`,a.style.top=`${u.top}px`;const f=a.getBoundingClientRect();f.right>window.innerWidth&&(a.style.left=`${u.left-f.width-10}px`),f.bottom>window.innerHeight&&(a.style.top=`${u.bottom-f.height}px`)},l=()=>{a&&(a.remove(),a=null)};e.addEventListener("mouseenter",o),e.addEventListener("mouseleave",l)}createConnections(e,t,n){const s=e.querySelector(".skill-tree-svg");s&&s.remove();const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("class","skill-tree-svg"),r.style.position="absolute",r.style.top="0",r.style.left="0",r.style.width="100%",r.style.height="100%",r.style.pointerEvents="none",r.style.zIndex="1";const a=e.getBoundingClientRect();t.forEach(o=>{o.unlockRequirements.forEach(l=>{const c=e.querySelector(`[data-perk-id="${o.id}"]`),d=e.querySelector(`[data-perk-id="${l}"]`);if(c&&d){const u=c.getBoundingClientRect(),f=d.getBoundingClientRect(),h=f.left-a.left+f.width/2,g=f.top-a.top+f.height/2,y=u.left-a.left+u.width/2,m=u.top-a.top+u.height/2,p=document.createElementNS("http://www.w3.org/2000/svg","path"),M=`M ${h} ${g} L ${y} ${m}`;p.setAttribute("d",M),p.setAttribute("stroke-width","3"),p.setAttribute("fill","none");const x=n.purchasedPerks.includes(o.id),T=n.purchasedPerks.includes(l);x&&T?p.setAttribute("stroke","#00ff88"):T?(p.setAttribute("stroke","#4a90e2"),p.setAttribute("stroke-dasharray","5,5")):(p.setAttribute("stroke","#666666"),p.setAttribute("stroke-dasharray","5,5")),r.appendChild(p)}})}),e.appendChild(r)}purchasePerk(e){if(!this.currentUnit)return;Ic(this.currentUnit,e)?(console.log(`Successfully purchased perk: ${e}`),this.currentUnit.perkPoints===0?setTimeout(()=>{this.closeSkillTree()},1e3):this.openSkillTree(this.currentUnit,this.onClose)):console.error(`Failed to purchase perk: ${e}`)}createBackButton(){if(!this.container)return;const e=document.createElement("button");e.textContent="BACK",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.padding="15px 25px",e.style.fontSize="1.1rem",e.style.fontWeight="bold",e.style.backgroundColor="#ff6b6b",e.style.color="white",e.style.border="none",e.style.borderRadius="10px",e.style.cursor="pointer",e.style.transition="all 0.3s ease",e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#ff5252",e.style.transform="translateY(-2px)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="#ff6b6b",e.style.transform="translateY(0)"}),e.addEventListener("click",()=>{this.closeSkillTree()}),this.container.appendChild(e)}closeSkillTree(){this.container&&(this.container.style.display="none"),this.onClose&&this.onClose(),console.log("Skill tree closed")}destroy(){this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.currentUnit=null,this.onClose=void 0}}const kc=new Nc,ol={"rare-candy":{name:"Rare Candy",description:"Causes a unit to level up and gain 1 perk point to spend on skills",cost:1,imageUrl:Pc,type:"consumable",effect:i=>(i.level+=1,i.perkPoints+=1,i.currentHealth=i.health,console.log(`🍬 ${i.name} leveled up to level ${i.level}! Gained 1 perk point. Total perk points: ${i.perkPoints}`),kc.openSkillTree(i,()=>{console.log(`Skill tree closed for ${i.name}`)}),!0)},"energy-powder":{name:"Energy Powder",description:"Permanently increases a unit's movement by 1",cost:1,imageUrl:Lc,type:"consumable",effect:i=>(i.move+=1,console.log(`⚡ ${i.name} gained 1 movement! New movement: ${i.move}`),!0)}};let Fc=1;function Oc(){return`item-${Fc++}`}class Bc{createItem(e){const t=ol[e];if(!t)return console.error(`Item type "${e}" not found in ItemDex.`),null;const n={id:Oc(),name:t.name,description:t.description,cost:t.cost,imageUrl:t.imageUrl,type:t.type,effect:t.effect};return console.log(`Created item: ${n.name} (ID: ${n.id}) - Cost: ${n.cost}`),n}}const zc=new Bc;let Gr=!0,Ii=[null,null,null],Ni=[null,null];function so(){Gr=!0,Ii=[null,null,null],Ni=[null,null]}function sr(){return Ii}function bo(){return Ni}function Hc(i,e){i>=0&&i<Ii.length&&(Ii[i]=e)}function Gc(i,e){i>=0&&i<Ni.length&&(Ni[i]=e)}function Vc(){if(Gr){console.log("Shop requires fresh population. Clearing and generating units and items..."),Se.shopUnits=[],Se.shopItems=[],Ii=[null,null,null],Ni=[null,null];const i=Object.keys(il);if(i.length===0)console.error("No unit types defined in UNIT_DEX for the shop!");else{const t=[];for(let n=0;n<3&&i.length!==0;n++){let s,r=0;const a=i.length*2;do{const l=Math.floor(Math.random()*i.length);s=i[l],r++}while(t.includes(s)&&i.length>t.length&&r<a);t.push(s);const o=sl.createUnit(s);o&&(Se.addUnitToShop(o),Ii[n]=o)}}const e=Object.keys(ol);if(e.length===0)console.error("No item types defined in ITEM_DEX for the shop!");else for(let t=0;t<Math.min(2,e.length);t++){const n=e[t],s=zc.createItem(n);s&&(Se.addItemToShop(s),Ni[t]=s)}Gr=!1}else console.log("Shop already populated for this session. Using existing display items and item slots.")}let Ut=null;function Wc(i){const e=document.createElement("div");return e.id="shop-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function $c(i){if(!Ut)return;const e=i.skills&&i.skills.length>0?`
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
        <h4 style="margin: 0 0 5px 0; text-align: center;">${i.name} (${i.className}) - Level ${i.level}</h4>
        <p style="margin: 3px 0;">HP: ${i.health} | Max Energy: ${i.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${i.basicDamage} | Skill Dmg: ${i.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${i.range} | Move: ${i.move}</p>
        <p style="margin: 3px 0; font-weight: bold;">Cost: ${i.cost}</p>
        ${e}
    `}function al(i){if(!Ut)return;let e=i.clientX+15,t=i.clientY+15;e+Ut.offsetWidth>window.innerWidth&&(e=window.innerWidth-Ut.offsetWidth-10),t+Ut.offsetHeight>window.innerHeight&&(t=window.innerHeight-Ut.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Ut.style.left=`${e}px`,Ut.style.top=`${t}px`}function Xc(i,e){Ut&&($c(i),Ut.style.display="block",al(e))}function rr(){Ut&&(Ut.style.display="none")}function qc(i){(!Ut||!i.contains(Ut))&&(Ut=Wc(i))}let rt=null,$e=null;function To(i){const e=document.getElementById("not-enough-resources-message");e&&e.remove();const t=document.createElement("div");t.id="not-enough-resources-message",t.textContent="Not Enough Resources",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}function Yc(i){const e=document.getElementById("need-units-message");e&&e.remove();const t=document.createElement("div");t.id="need-units-message",t.textContent="Need At Least 1 Unit In Party",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}function zs(i,e){Vc(),console.log("Showing Shop Scene with display items:",sr()),console.log("Showing Shop Scene with item slots:",bo()),i.innerHTML="",rt=null,$e=null,qc(i);const t=document.createElement("div");t.id="shop-scene",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="space-between",t.style.backgroundColor="#2c3e50",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.padding="20px",t.style.boxSizing="border-box";const n=document.createElement("h1");n.textContent="SHOP",n.style.textAlign="center",n.style.fontSize="3em",n.style.margin="0 0 20px 0";const s=document.createElement("div");s.style.display="flex",s.style.justifyContent="space-around",s.style.width="90%",s.style.flexGrow="1",s.style.alignItems="center",s.style.paddingBottom="20px",sr().forEach((u,f)=>{const h=document.createElement("div");if(h.id=`shop-slot-${f}`,h.style.width="200px",h.style.height="auto",h.style.minHeight="180px",h.style.border="2px solid #3498db",h.style.borderRadius="10px",h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.justifyContent="center",h.style.backgroundColor="#34495e",h.style.padding="10px",h.style.boxSizing="border-box",h.style.textAlign="center",h.style.cursor="pointer",h.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u&&"sold"in u&&u.sold===!0)h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',h.style.cursor="default",h.dataset.sold="true";else if(u&&"id"in u){const g=u;h.dataset.unitId=g.id;const y=document.createElement("img");y.src=g.imageUrl,y.alt=g.className,y.style.width="60px",y.style.height="60px",y.style.marginBottom="8px",y.style.borderRadius="4px",h.appendChild(y);const m=document.createElement("h4");m.textContent=g.name,m.style.margin="0 0 4px 0",m.style.fontSize="1.1em",h.appendChild(m);const p=document.createElement("p");p.textContent=`(${g.className})`,p.style.margin="0",p.style.fontSize="0.9em",p.style.fontStyle="italic",h.appendChild(p),h.addEventListener("mouseenter",M=>{const x=sr()[f];x&&"id"in x&&Xc(x,M)}),h.addEventListener("mousemove",M=>{al(M)}),h.addEventListener("mouseleave",()=>{rr()}),h.addEventListener("click",()=>{if(h.dataset.sold==="true")return;const M=Se.shopUnits.find(x=>x.id===g.id);if(!M){console.warn("Clicked unit no longer available in shopUnits registry for purchase.",g.id);return}if(rt&&rt!==h){rt.style.transform="translateY(0)",rt.style.boxShadow="none",rt.style.justifyContent="center";const x=rt.querySelector("button.buy-button-shop");x&&rt.removeChild(x)}if(rt===h){h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.justifyContent="center";const x=h.querySelector("button.buy-button-shop");x&&h.removeChild(x),rt=null,$e=null}else{rt=h,h.style.transform="translateY(-10px)",h.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)";const x=h.querySelector("button.buy-button-shop");x&&h.removeChild(x),$e=document.createElement("button"),$e.className="buy-button-shop",$e.textContent=`Buy (${M.cost} R)`,$e.style.padding="8px 12px",$e.style.fontSize="0.9em",$e.style.backgroundColor="#e67e22",$e.style.color="white",$e.style.border="none",$e.style.borderRadius="5px",$e.style.cursor="pointer",$e.style.marginTop="10px",$e.dataset.unitId=M.id,$e.onclick=T=>{T.stopPropagation();const P=M;if(mn.resource<P.cost){To(i);return}mn.spendResource(P.cost),Se.removeUnitFromShop(P.id),Hc(f,{sold:!0,originalUnit:P}),Se.playerParty.length<Di.MAX_PLAYER_PARTY_SIZE?(Se.addUnitToPlayerParty(P),console.log(`${P.name} (${P.className}) purchased and added to Squad!`)):(Se.addUnitToStorage(P),console.log(`${P.name} (${P.className}) purchased and added to Box (Squad was full).`)),h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.cursor="default",h.dataset.sold="true",rt=null;const w=document.getElementById("shop-resource-display");w&&(w.textContent=`Resource: ${mn.resource}`),rr()},h.style.justifyContent="space-between",h.appendChild($e)}})}else h.textContent="N/A",h.style.cursor="default";s.appendChild(h)});const r=document.createElement("div");r.style.display="flex",r.style.justifyContent="center",r.style.gap="20px",r.style.width="90%",r.style.alignItems="center",r.style.paddingBottom="20px",bo().forEach((u,f)=>{const h=document.createElement("div");if(h.id=`shop-item-slot-${f}`,h.style.width="100px",h.style.height="auto",h.style.minHeight="90px",h.style.border="2px solid #f39c12",h.style.borderRadius="10px",h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.justifyContent="center",h.style.backgroundColor="#34495e",h.style.padding="8px",h.style.boxSizing="border-box",h.style.textAlign="center",h.style.cursor="pointer",h.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u&&"sold"in u&&u.sold===!0)h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',h.style.cursor="default",h.dataset.sold="true";else if(u&&"id"in u){const g=u;h.dataset.itemId=g.id;const y=document.createElement("img");y.src=g.imageUrl,y.alt=g.name,y.style.width="30px",y.style.height="30px",y.style.marginBottom="4px",y.style.borderRadius="2px",h.appendChild(y);const m=document.createElement("h6");m.textContent=g.name,m.style.margin="0",m.style.fontSize="0.7em",m.style.fontWeight="bold",h.appendChild(m),h.addEventListener("mouseenter",()=>{h.title=`${g.name}
${g.description}
Cost: ${g.cost} Resource`}),h.addEventListener("click",()=>{if(h.dataset.sold==="true")return;const p=Se.shopItems.find(M=>M.id===g.id);if(!p){console.warn("Clicked item no longer available in shopItems registry for purchase.",g.id);return}if(rt&&rt!==h){rt.style.transform="translateY(0)",rt.style.boxShadow="none",rt.style.justifyContent="center";const M=rt.querySelector("button.buy-button-shop");M&&rt.removeChild(M)}if(rt===h){h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.justifyContent="center";const M=h.querySelector("button.buy-button-shop");M&&h.removeChild(M),rt=null,$e=null}else{rt=h,h.style.transform="translateY(-5px)",h.style.boxShadow="0px 3px 10px rgba(0,0,0,0.3)";const M=h.querySelector("button.buy-button-shop");M&&h.removeChild(M),$e=document.createElement("button"),$e.className="buy-button-shop",$e.textContent=`Buy (${p.cost} R)`,$e.style.padding="4px 8px",$e.style.fontSize="0.7em",$e.style.backgroundColor="#e67e22",$e.style.color="white",$e.style.border="none",$e.style.borderRadius="3px",$e.style.cursor="pointer",$e.style.marginTop="5px",$e.dataset.itemId=p.id,$e.onclick=x=>{x.stopPropagation();const T=p;if(mn.resource<T.cost){To(i);return}mn.spendResource(T.cost),Se.removeItemFromShop(T.id),Se.addItemToPlayer(T),Gc(f,{sold:!0,originalItem:T}),console.log(`${T.name} purchased and added to inventory!`),h.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',h.style.transform="translateY(0)",h.style.boxShadow="none",h.style.cursor="default",h.dataset.sold="true",rt=null;const P=document.getElementById("shop-resource-display");P&&(P.textContent=`Resource: ${mn.resource}`)},h.style.justifyContent="space-between",h.appendChild($e)}})}else h.textContent="N/A",h.style.cursor="default";r.appendChild(h)});const a=document.createElement("div");a.style.width="100%",a.style.display="flex",a.style.justifyContent="space-between",a.style.alignItems="center",a.style.paddingTop="20px";const o=document.createElement("div");o.id="shop-resource-display",o.textContent=`Resource: ${mn.resource}`,o.style.padding="10px 15px",o.style.backgroundColor="#1a1a1a",o.style.color="#f1c40f",o.style.borderRadius="5px",o.style.fontSize="1em",o.style.fontWeight="bold",o.style.display="flex",o.style.alignItems="center";const l=document.createElement("button");l.textContent="Squad/Inventory",l.style.padding="8px 15px",l.style.fontSize="1em",l.style.backgroundColor="#3498db",l.style.color="white",l.style.border="none",l.style.borderRadius="5px",l.style.cursor="pointer",l.style.margin="0 8px",l.addEventListener("mouseover",()=>l.style.backgroundColor="#2980b9"),l.addEventListener("mouseout",()=>l.style.backgroundColor="#3498db"),l.onclick=()=>{rr(),no(i,e,()=>zs(i,e))};const c=document.createElement("button");c.textContent="PROCEED",c.style.padding="8px 15px",c.style.fontSize="1em",c.style.backgroundColor="#27ae60",c.style.color="white",c.style.border="none",c.style.borderRadius="5px",c.style.cursor="pointer",c.onclick=()=>{if(Se.playerParty.length===0){Yc(i);return}e()};const d=document.createElement("div");d.style.display="flex",d.style.justifyContent="center",d.style.alignItems="center",d.style.flexGrow="2",d.appendChild(l),a.appendChild(o),a.appendChild(d),a.appendChild(c),t.appendChild(n),t.appendChild(s),t.appendChild(r),t.appendChild(a),i.appendChild(t),console.log("Shop Scene displayed with Proceed button.")}async function jc(){console.log("Initializing application..."),so(),document.body.style.margin="0",document.body.style.overflow="hidden";const i=document.createElement("div");i.id="app-container",i.style.width="100vw",i.style.height="100vh",i.style.margin="0",i.style.padding="0",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.overflow="hidden",document.body.appendChild(i);const e=document.createElement("div");return e.id="game-content-wrapper",e.style.position="relative",console.log("Application initialized, ready for content."),{appContainer:i,gameSpecificContainer:e}}function Ao(i){i().catch(e=>{console.error("Critical error during application initialization:",e);try{document.body.innerHTML='<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #e0e0e0; font-family: sans-serif;"><h1>Application Error</h1><p>A critical error occurred and the application cannot start.</p><p>Please check the browser console for more details.</p></div>'}catch(t){console.error("Could not display error message in DOM.",t)}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ro="160",Zc=0,wo=1,Kc=2,ll=1,Jc=2,wn=3,xn=0,Vt=1,Cn=2,zn=0,Li=1,Ro=2,Co=3,Po=4,Qc=5,ti=100,ed=101,td=102,Lo=103,Uo=104,nd=200,id=201,sd=202,rd=203,Vr=204,Wr=205,od=206,ad=207,ld=208,cd=209,dd=210,ud=211,hd=212,fd=213,pd=214,md=0,gd=1,yd=2,Hs=3,_d=4,xd=5,vd=6,Sd=7,cl=0,Md=1,Ed=2,Hn=0,bd=1,Td=2,Ad=3,wd=4,Rd=5,Cd=6,dl=300,ki=301,Fi=302,$r=303,Xr=304,js=306,qr=1e3,jt=1001,Yr=1002,Ye=1003,Do=1004,or=1005,Qt=1006,Pd=1007,Ji=1008,Gn=1009,Ld=1010,Ud=1011,oo=1012,ul=1013,On=1014,Bn=1015,Qi=1016,hl=1017,fl=1018,ii=1020,Dd=1021,ln=1023,Id=1024,Nd=1025,si=1026,Oi=1027,kd=1028,pl=1029,Fd=1030,ml=1031,gl=1033,ar=33776,lr=33777,cr=33778,dr=33779,Io=35840,No=35841,ko=35842,Fo=35843,yl=36196,Oo=37492,Bo=37496,zo=37808,Ho=37809,Go=37810,Vo=37811,Wo=37812,$o=37813,Xo=37814,qo=37815,Yo=37816,jo=37817,Zo=37818,Ko=37819,Jo=37820,Qo=37821,ur=36492,ea=36494,ta=36495,Od=36283,na=36284,ia=36285,sa=36286,_l=3e3,ri=3001,Bd=3200,zd=3201,Hd=0,Gd=1,en="",bt="srgb",Ln="srgb-linear",ao="display-p3",Zs="display-p3-linear",Gs="linear",nt="srgb",Vs="rec709",Ws="p3",li=7680,ra=519,Vd=512,Wd=513,$d=514,xl=515,Xd=516,qd=517,Yd=518,jd=519,oa=35044,aa="300 es",jr=1035,Pn=2e3,$s=2001;class zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hr=Math.PI/180,Zr=180/Math.PI;function ts(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Gt(i,e,t){return Math.max(e,Math.min(t,i))}function Zd(i,e){return(i%e+e)%e}function fr(i,e,t){return(1-t)*i+t*e}function la(i){return(i&i-1)===0&&i!==0}function Kr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,s,r,a,o,l,c){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],f=n[2],h=n[5],g=n[8],y=s[0],m=s[3],p=s[6],M=s[1],x=s[4],T=s[7],P=s[2],w=s[5],A=s[8];return r[0]=a*y+o*M+l*P,r[3]=a*m+o*x+l*w,r[6]=a*p+o*T+l*A,r[1]=c*y+d*M+u*P,r[4]=c*m+d*x+u*w,r[7]=c*p+d*T+u*A,r[2]=f*y+h*M+g*P,r[5]=f*m+h*x+g*w,r[8]=f*p+h*T+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*a-o*c,f=o*l-d*r,h=c*r-a*l,g=t*u+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=u*y,e[1]=(s*c-d*n)*y,e[2]=(o*n-s*a)*y,e[3]=f*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=h*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pr.makeScale(e,t)),this}rotate(e){return this.premultiply(pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pr=new ze;function vl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kd(){const i=es("canvas");return i.style.display="block",i}const ca={};function Zi(i){i in ca||(ca[i]=!0,console.warn(i))}const da=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ua=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ls={[Ln]:{transfer:Gs,primaries:Vs,toReference:i=>i,fromReference:i=>i},[bt]:{transfer:nt,primaries:Vs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Zs]:{transfer:Gs,primaries:Ws,toReference:i=>i.applyMatrix3(ua),fromReference:i=>i.applyMatrix3(da)},[ao]:{transfer:nt,primaries:Ws,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ua),fromReference:i=>i.applyMatrix3(da).convertLinearToSRGB()}},Jd=new Set([Ln,Zs]),Ze={enabled:!0,_workingColorSpace:Ln,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Jd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ls[e].toReference,s=ls[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ls[i].primaries},getTransfer:function(i){return i===en?Gs:ls[i].transfer}};function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ci;class Sl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ci===void 0&&(ci=es("canvas")),ci.width=e.width,ci.height=e.height;const n=ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ui(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Qd=0;class Ml{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=ts(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gr(s[a].image)):r.push(gr(s[a]))}else r=gr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function gr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eu=0;class Bt extends zi{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=jt,s=jt,r=Qt,a=Ji,o=ln,l=Gn,c=Bt.DEFAULT_ANISOTROPY,d=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=ts(),this.name="",this.source=new Ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Zi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===ri?bt:en),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qr:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qr:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Zi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?ri:_l}set encoding(e){Zi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ri?bt:en}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=dl;Bt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],u=l[8],f=l[1],h=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,T=(h+1)/2,P=(p+1)/2,w=(d+f)/4,A=(u+y)/4,V=(g+m)/4;return x>T&&x>P?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=w/n,r=A/n):T>P?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=w/s,r=V/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=A/r,s=V/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-d)*(f-d));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-y)/M,this.z=(f-d)/M,this.w=Math.acos((c+h+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tu extends zi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Zi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ri?bt:en),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Bt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ml(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends tu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class El extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nu extends Bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],u=n[s+3];const f=r[a+0],h=r[a+1],g=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=y;return}if(u!==y||l!==f||c!==h||d!==g){let m=1-o;const p=l*f+c*h+d*g+u*y,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),w=Math.atan2(P,p*M);m=Math.sin(m*w)/P,o=Math.sin(o*w)/P}const T=o*M;if(l=l*m+f*T,c=c*m+h*T,d=d*m+g*T,u=u*m+y*T,m===1-o){const P=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=P,c*=P,d*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],u=r[a],f=r[a+1],h=r[a+2],g=r[a+3];return e[t]=o*g+d*u+l*h-c*f,e[t+1]=l*g+d*f+c*u-o*h,e[t+2]=c*g+d*h+o*f-l*u,e[t+3]=d*g-o*u-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),u=o(r/2),f=l(n/2),h=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"YXZ":this._x=f*d*u+c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"ZXY":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u-f*h*g;break;case"ZYX":this._x=f*d*u-c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u+f*h*g;break;case"YZX":this._x=f*d*u+c*h*g,this._y=c*h*u+f*d*g,this._z=c*d*g-f*h*u,this._w=c*d*u-f*h*g;break;case"XZY":this._x=f*d*u-c*h*g,this._y=c*h*u-f*d*g,this._z=c*d*g+f*h*u,this._w=c*d*u+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],f=n+o+u;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(d-l)*h,this._y=(r-c)*h,this._z=(a-s)*h}else if(n>o&&n>u){const h=2*Math.sqrt(1+n-o-u);this._w=(d-l)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+c)/h}else if(o>u){const h=2*Math.sqrt(1+o-n-u);this._w=(r-c)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(l+d)/h}else{const h=2*Math.sqrt(1+u-n-o);this._w=(a-s)/h,this._x=(r+c)/h,this._y=(l+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const h=1-t;return this._w=h*a+t*this._w,this._x=h*n+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ha.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ha.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*d,this.y=n+l*d+o*c-r*u,this.z=s+l*u+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yr.copy(this).projectOnVector(e),this.sub(yr)}reflect(e){return this.sub(yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yr=new U,ha=new ns;class is{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cs.copy(n.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),ds.subVectors(this.max,$i),di.subVectors(e.a,$i),ui.subVectors(e.b,$i),hi.subVectors(e.c,$i),Un.subVectors(ui,di),Dn.subVectors(hi,ui),$n.subVectors(di,hi);let t=[0,-Un.z,Un.y,0,-Dn.z,Dn.y,0,-$n.z,$n.y,Un.z,0,-Un.x,Dn.z,0,-Dn.x,$n.z,0,-$n.x,-Un.y,Un.x,0,-Dn.y,Dn.x,0,-$n.y,$n.x,0];return!_r(t,di,ui,hi,ds)||(t=[1,0,0,0,1,0,0,0,1],!_r(t,di,ui,hi,ds))?!1:(us.crossVectors(Un,Dn),t=[us.x,us.y,us.z],_r(t,di,ui,hi,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mn=[new U,new U,new U,new U,new U,new U,new U,new U],nn=new U,cs=new is,di=new U,ui=new U,hi=new U,Un=new U,Dn=new U,$n=new U,$i=new U,ds=new U,us=new U,Xn=new U;function _r(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Xn.fromArray(i,r);const o=s.x*Math.abs(Xn.x)+s.y*Math.abs(Xn.y)+s.z*Math.abs(Xn.z),l=e.dot(Xn),c=t.dot(Xn),d=n.dot(Xn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const iu=new is,Xi=new U,xr=new U;class Ks{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):iu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xi.subVectors(e,this.center);const t=Xi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Xi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xi.copy(e.center).add(xr)),this.expandByPoint(Xi.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new U,vr=new U,hs=new U,In=new U,Sr=new U,fs=new U,Mr=new U;class bl{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){vr.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),In.copy(this.origin).sub(vr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(hs),o=In.dot(this.direction),l=-In.dot(hs),c=In.lengthSq(),d=Math.abs(1-a*a);let u,f,h,g;if(d>0)if(u=a*l-o,f=a*o-l,g=r*d,u>=0)if(f>=-g)if(f<=g){const y=1/d;u*=y,f*=y,h=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),h=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),h=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),h=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),h=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),h=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(vr).addScaledVector(hs,f),h}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,r){Sr.subVectors(t,e),fs.subVectors(n,e),Mr.crossVectors(Sr,fs);let a=this.direction.dot(Mr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,e);const l=o*this.direction.dot(fs.crossVectors(In,fs));if(l<0)return null;const c=o*this.direction.dot(Sr.cross(In));if(c<0||l+c>a)return null;const d=-o*In.dot(Mr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,n,s,r,a,o,l,c,d,u,f,h,g,y,m){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,u,f,h,g,y,m)}set(e,t,n,s,r,a,o,l,c,d,u,f,h,g,y,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=f,p[3]=h,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/fi.setFromMatrixColumn(e,0).length(),r=1/fi.setFromMatrixColumn(e,1).length(),a=1/fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*d,h=a*u,g=o*d,y=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=h+g*c,t[5]=f-y*c,t[9]=-o*l,t[2]=y-f*c,t[6]=g+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,h=l*u,g=c*d,y=c*u;t[0]=f+y*o,t[4]=g*o-h,t[8]=a*c,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=h*o-g,t[6]=y+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,h=l*u,g=c*d,y=c*u;t[0]=f-y*o,t[4]=-a*u,t[8]=g+h*o,t[1]=h+g*o,t[5]=a*d,t[9]=y-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,h=a*u,g=o*d,y=o*u;t[0]=l*d,t[4]=g*c-h,t[8]=f*c+y,t[1]=l*u,t[5]=y*c+f,t[9]=h*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=y-f*u,t[8]=g*u+h,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=h*u+g,t[10]=f-y*u}else if(e.order==="XZY"){const f=a*l,h=a*c,g=o*l,y=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=f*u+y,t[5]=a*d,t[9]=h*u-g,t[2]=g*u-h,t[6]=o*d,t[10]=y*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(su,e,ru)}lookAt(e,t,n){const s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Nn.crossVectors(n,Xt),Nn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Nn.crossVectors(n,Xt)),Nn.normalize(),ps.crossVectors(Xt,Nn),s[0]=Nn.x,s[4]=ps.x,s[8]=Xt.x,s[1]=Nn.y,s[5]=ps.y,s[9]=Xt.y,s[2]=Nn.z,s[6]=ps.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],f=n[9],h=n[13],g=n[2],y=n[6],m=n[10],p=n[14],M=n[3],x=n[7],T=n[11],P=n[15],w=s[0],A=s[4],V=s[8],v=s[12],b=s[1],B=s[5],H=s[9],Q=s[13],C=s[2],F=s[6],G=s[10],X=s[14],W=s[3],$=s[7],q=s[11],ee=s[15];return r[0]=a*w+o*b+l*C+c*W,r[4]=a*A+o*B+l*F+c*$,r[8]=a*V+o*H+l*G+c*q,r[12]=a*v+o*Q+l*X+c*ee,r[1]=d*w+u*b+f*C+h*W,r[5]=d*A+u*B+f*F+h*$,r[9]=d*V+u*H+f*G+h*q,r[13]=d*v+u*Q+f*X+h*ee,r[2]=g*w+y*b+m*C+p*W,r[6]=g*A+y*B+m*F+p*$,r[10]=g*V+y*H+m*G+p*q,r[14]=g*v+y*Q+m*X+p*ee,r[3]=M*w+x*b+T*C+P*W,r[7]=M*A+x*B+T*F+P*$,r[11]=M*V+x*H+T*G+P*q,r[15]=M*v+x*Q+T*X+P*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],f=e[10],h=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*h-n*l*h)+y*(+t*l*h-t*c*f+r*a*f-s*a*h+s*c*d-r*l*d)+m*(+t*c*u-t*o*h-r*a*u+n*a*h+r*o*d-n*c*d)+p*(-s*o*d-t*l*u+t*o*f+s*a*u-n*a*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],f=e[10],h=e[11],g=e[12],y=e[13],m=e[14],p=e[15],M=u*m*c-y*f*c+y*l*h-o*m*h-u*l*p+o*f*p,x=g*f*c-d*m*c-g*l*h+a*m*h+d*l*p-a*f*p,T=d*y*c-g*u*c+g*o*h-a*y*h-d*o*p+a*u*p,P=g*u*l-d*y*l-g*o*f+a*y*f+d*o*m-a*u*m,w=t*M+n*x+s*T+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=M*A,e[1]=(y*f*r-u*m*r-y*s*h+n*m*h+u*s*p-n*f*p)*A,e[2]=(o*m*r-y*l*r+y*s*c-n*m*c-o*s*p+n*l*p)*A,e[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*h-n*l*h)*A,e[4]=x*A,e[5]=(d*m*r-g*f*r+g*s*h-t*m*h-d*s*p+t*f*p)*A,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*A,e[7]=(a*f*r-d*l*r+d*s*c-t*f*c-a*s*h+t*l*h)*A,e[8]=T*A,e[9]=(g*u*r-d*y*r-g*n*h+t*y*h+d*n*p-t*u*p)*A,e[10]=(a*y*r-g*o*r+g*n*c-t*y*c-a*n*p+t*o*p)*A,e[11]=(d*o*r-a*u*r-d*n*c+t*u*c+a*n*h-t*o*h)*A,e[12]=P*A,e[13]=(d*y*s-g*u*s+g*n*f-t*y*f-d*n*m+t*u*m)*A,e[14]=(g*o*s-a*y*s-g*n*l+t*y*l+a*n*m-t*o*m)*A,e[15]=(a*u*s-d*o*s+d*n*l-t*u*l-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,u=o+o,f=r*c,h=r*d,g=r*u,y=a*d,m=a*u,p=o*u,M=l*c,x=l*d,T=l*u,P=n.x,w=n.y,A=n.z;return s[0]=(1-(y+p))*P,s[1]=(h+T)*P,s[2]=(g-x)*P,s[3]=0,s[4]=(h-T)*w,s[5]=(1-(f+p))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+x)*A,s[9]=(m-M)*A,s[10]=(1-(f+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=fi.set(s[0],s[1],s[2]).length();const a=fi.set(s[4],s[5],s[6]).length(),o=fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const c=1/r,d=1/a,u=1/o;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=d,sn.elements[5]*=d,sn.elements[6]*=d,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Pn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let h,g;if(o===Pn)h=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===$s)h=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Pn){const l=this.elements,c=1/(t-e),d=1/(n-s),u=1/(a-r),f=(t+e)*c,h=(n+s)*d;let g,y;if(o===Pn)g=(a+r)*u,y=-2*u;else if(o===$s)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fi=new U,sn=new St,su=new U(0,0,0),ru=new U(1,1,1),Nn=new U,ps=new U,Xt=new U,fa=new St,pa=new ns;class Js{constructor(e=0,t=0,n=0,s=Js.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pa.setFromEuler(this),this.setFromQuaternion(pa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Js.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ou=0;const ma=new U,pi=new ns,bn=new St,ms=new U,qi=new U,au=new U,lu=new ns,ga=new U(1,0,0),ya=new U(0,1,0),_a=new U(0,0,1),cu={type:"added"},du={type:"removed"};class Wt extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new U,t=new Js,n=new ns,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new St},normalMatrix:{value:new ze}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(ga,e)}rotateY(e){return this.rotateOnAxis(ya,e)}rotateZ(e){return this.rotateOnAxis(_a,e)}translateOnAxis(e,t){return ma.copy(e).applyQuaternion(this.quaternion),this.position.add(ma.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ga,e)}translateY(e){return this.translateOnAxis(ya,e)}translateZ(e){return this.translateOnAxis(_a,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ms.copy(e):ms.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(qi,ms,this.up):bn.lookAt(ms,qi,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),pi.setFromRotationMatrix(bn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(cu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(du)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,e,au),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,lu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),u=a(e.shapes),f=a(e.skeletons),h=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Wt.DEFAULT_UP=new U(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new U,Tn=new U,Er=new U,An=new U,mi=new U,gi=new U,xa=new U,br=new U,Tr=new U,Ar=new U;let gs=!1;class on{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),Tn.subVectors(n,t),Er.subVectors(e,t);const a=rn.dot(rn),o=rn.dot(Tn),l=rn.dot(Er),c=Tn.dot(Tn),d=Tn.dot(Er),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,h=(c*l-o*d)*f,g=(a*d-o*l)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getUV(e,t,n,s,r,a,o,l){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),this.getInterpolation(e,t,n,s,r,a,o,l)}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),Tn.subVectors(e,t),rn.cross(Tn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),rn.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;mi.subVectors(s,n),gi.subVectors(r,n),br.subVectors(e,n);const l=mi.dot(br),c=gi.dot(br);if(l<=0&&c<=0)return t.copy(n);Tr.subVectors(e,s);const d=mi.dot(Tr),u=gi.dot(Tr);if(d>=0&&u<=d)return t.copy(s);const f=l*u-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(mi,a);Ar.subVectors(e,r);const h=mi.dot(Ar),g=gi.dot(Ar);if(g>=0&&h<=g)return t.copy(r);const y=h*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(gi,o);const m=d*g-h*u;if(m<=0&&u-d>=0&&h-g>=0)return xa.subVectors(r,s),o=(u-d)/(u-d+(h-g)),t.copy(s).addScaledVector(xa,o);const p=1/(m+y+f);return a=y*p,o=f*p,t.copy(n).addScaledVector(mi,a).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Al={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},ys={h:0,s:0,l:0};function wr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Zd(e,1),t=Gt(t,0,1),n=Gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=wr(a,r,e+1/3),this.g=wr(a,r,e),this.b=wr(a,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=bt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const n=Al[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return Ze.fromWorkingColorSpace(Rt.copy(this),e),Math.round(Gt(Rt.r*255,0,255))*65536+Math.round(Gt(Rt.g*255,0,255))*256+Math.round(Gt(Rt.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,r=Rt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=d<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=bt){Ze.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(ys);const n=fr(kn.h,ys.h,t),s=fr(kn.s,ys.s,t),r=fr(kn.l,ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Xe;Xe.NAMES=Al;let uu=0;class cn extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=Li,this.side=xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vr,this.blendDst=Wr,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ra,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=li,this.stencilZFail=li,this.stencilZPass=li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Li&&(n.blending=this.blending),this.side!==xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vr&&(n.blendSrc=this.blendSrc),this.blendDst!==Wr&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ra&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pt extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new U,_s=new Ke;class _n{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==oa&&(e.usage=this.usage),e}}class wl extends _n{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Rl extends _n{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dn extends _n{constructor(e,t,n){super(new Float32Array(e),t,n)}}let hu=0;const Kt=new St,Rr=new Wt,yi=new U,qt=new is,Yi=new is,xt=new U;class vn extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vl(e)?Rl:wl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return Rr.lookAt(e),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new dn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Yi.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(qt.min,Yi.min),qt.expandByPoint(xt),xt.addVectors(qt.max,Yi.max),qt.expandByPoint(xt)):(qt.expandByPoint(Yi.min),qt.expandByPoint(Yi.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)xt.fromBufferAttribute(o,c),l&&(yi.fromBufferAttribute(e,c),xt.add(yi)),s=Math.max(s,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let b=0;b<o;b++)c[b]=new U,d[b]=new U;const u=new U,f=new U,h=new U,g=new Ke,y=new Ke,m=new Ke,p=new U,M=new U;function x(b,B,H){u.fromArray(s,b*3),f.fromArray(s,B*3),h.fromArray(s,H*3),g.fromArray(a,b*2),y.fromArray(a,B*2),m.fromArray(a,H*2),f.sub(u),h.sub(u),y.sub(g),m.sub(g);const Q=1/(y.x*m.y-m.x*y.y);isFinite(Q)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(h,-y.y).multiplyScalar(Q),M.copy(h).multiplyScalar(y.x).addScaledVector(f,-m.x).multiplyScalar(Q),c[b].add(p),c[B].add(p),c[H].add(p),d[b].add(M),d[B].add(M),d[H].add(M))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let b=0,B=T.length;b<B;++b){const H=T[b],Q=H.start,C=H.count;for(let F=Q,G=Q+C;F<G;F+=3)x(n[F+0],n[F+1],n[F+2])}const P=new U,w=new U,A=new U,V=new U;function v(b){A.fromArray(r,b*3),V.copy(A);const B=c[b];P.copy(B),P.sub(A.multiplyScalar(A.dot(B))).normalize(),w.crossVectors(V,B);const Q=w.dot(d[b])<0?-1:1;l[b*4]=P.x,l[b*4+1]=P.y,l[b*4+2]=P.z,l[b*4+3]=Q}for(let b=0,B=T.length;b<B;++b){const H=T[b],Q=H.start,C=H.count;for(let F=Q,G=Q+C;F<G;F+=3)v(n[F+0]),v(n[F+1]),v(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,c=new U,d=new U,u=new U;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,f=new c.constructor(l.length*d);let h=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?h=l[y]*o.data.stride+o.offset:h=l[y]*d;for(let p=0;p<d;p++)f[g++]=c[h++]}return new _n(f,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,u=c.length;d<u;d++){const f=c[d],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,f=c.length;u<f;u++){const h=c[u];d.push(h.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],u=r[c];for(let f=0,h=u.length;f<h;f++)d.push(u[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const va=new St,qn=new bl,xs=new Ks,Sa=new U,_i=new U,xi=new U,vi=new U,Cr=new U,vs=new U,Ss=new Ke,Ms=new Ke,Es=new Ke,Ma=new U,Ea=new U,ba=new U,bs=new U,Ts=new U;class tt extends Wt{constructor(e=new vn,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],u=r[l];d!==0&&(Cr.fromBufferAttribute(u,e),a?vs.addScaledVector(Cr,d):vs.addScaledVector(Cr.sub(t),d))}t.add(vs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),qn.copy(e.ray).recast(e.near),!(xs.containsPoint(qn.origin)===!1&&(qn.intersectSphere(xs,Sa)===null||qn.origin.distanceToSquared(Sa)>(e.far-e.near)**2))&&(va.copy(r).invert(),qn.copy(e.ray).applyMatrix4(va),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,h.start),x=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let T=M,P=x;T<P;T+=3){const w=o.getX(T),A=o.getX(T+1),V=o.getX(T+2);s=As(this,p,e,n,c,d,u,w,A,V),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),y=Math.min(o.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){const M=o.getX(m),x=o.getX(m+1),T=o.getX(m+2);s=As(this,a,e,n,c,d,u,M,x,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let T=M,P=x;T<P;T+=3){const w=T,A=T+1,V=T+2;s=As(this,p,e,n,c,d,u,w,A,V),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),y=Math.min(l.count,h.start+h.count);for(let m=g,p=y;m<p;m+=3){const M=m,x=m+1,T=m+2;s=As(this,a,e,n,c,d,u,M,x,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function fu(i,e,t,n,s,r,a,o){let l;if(e.side===Vt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===xn,o),l===null)return null;Ts.copy(o),Ts.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ts);return c<t.near||c>t.far?null:{distance:c,point:Ts.clone(),object:i}}function As(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,_i),i.getVertexPosition(l,xi),i.getVertexPosition(c,vi);const d=fu(i,e,t,n,_i,xi,vi,bs);if(d){s&&(Ss.fromBufferAttribute(s,o),Ms.fromBufferAttribute(s,l),Es.fromBufferAttribute(s,c),d.uv=on.getInterpolation(bs,_i,xi,vi,Ss,Ms,Es,new Ke)),r&&(Ss.fromBufferAttribute(r,o),Ms.fromBufferAttribute(r,l),Es.fromBufferAttribute(r,c),d.uv1=on.getInterpolation(bs,_i,xi,vi,Ss,Ms,Es,new Ke),d.uv2=d.uv1),a&&(Ma.fromBufferAttribute(a,o),Ea.fromBufferAttribute(a,l),ba.fromBufferAttribute(a,c),d.normal=on.getInterpolation(bs,_i,xi,vi,Ma,Ea,ba,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};on.getNormal(_i,xi,vi,u.normal),d.face=u}return d}class ss extends vn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],u=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new dn(c,3)),this.setAttribute("normal",new dn(d,3)),this.setAttribute("uv",new dn(u,2));function g(y,m,p,M,x,T,P,w,A,V,v){const b=T/A,B=P/V,H=T/2,Q=P/2,C=w/2,F=A+1,G=V+1;let X=0,W=0;const $=new U;for(let q=0;q<G;q++){const ee=q*B-Q;for(let te=0;te<F;te++){const z=te*b-H;$[y]=z*M,$[m]=ee*x,$[p]=C,c.push($.x,$.y,$.z),$[y]=0,$[m]=0,$[p]=w>0?1:-1,d.push($.x,$.y,$.z),u.push(te/A),u.push(1-q/V),X+=1}}for(let q=0;q<V;q++)for(let ee=0;ee<A;ee++){const te=f+ee+F*q,z=f+ee+F*(q+1),Y=f+(ee+1)+F*(q+1),ce=f+(ee+1)+F*q;l.push(te,z,ce),l.push(z,Y,ce),W+=6}o.addGroup(h,W,v),h+=W,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ss(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ot(i){const e={};for(let t=0;t<i.length;t++){const n=Bi(i[t]);for(const s in n)e[s]=n[s]}return e}function pu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cl(i){return i.getRenderTarget()===null?i.outputColorSpace:Ze.workingColorSpace}const mu={clone:Bi,merge:Ot};var gu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gu,this.fragmentShader=yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=pu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Pl extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class an extends Pl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zr*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,Mi=1;class _u extends Wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(Si,Mi,e,t);s.layers=this.layers,this.add(s);const r=new an(Si,Mi,e,t);r.layers=this.layers,this.add(r);const a=new an(Si,Mi,e,t);a.layers=this.layers,this.add(a);const o=new an(Si,Mi,e,t);o.layers=this.layers,this.add(o);const l=new an(Si,Mi,e,t);l.layers=this.layers,this.add(l);const c=new an(Si,Mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$s)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(u,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ll extends Bt{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:ki,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xu extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Zi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ri?bt:en),this.texture=new Ll(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ss(5,5,5),r=new ai({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:zn});r.uniforms.tEquirect.value=t;const a=new tt(s,r),o=t.minFilter;return t.minFilter===Ji&&(t.minFilter=Qt),new _u(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Pr=new U,vu=new U,Su=new ze;class Zn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Pr.subVectors(n,t).cross(vu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Su.getNormalMatrix(e),s=this.coplanarPoint(Pr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new Ks,ws=new U;class Ul{constructor(e=new Zn,t=new Zn,n=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],u=s[6],f=s[7],h=s[8],g=s[9],y=s[10],m=s[11],p=s[12],M=s[13],x=s[14],T=s[15];if(n[0].setComponents(l-r,f-c,m-h,T-p).normalize(),n[1].setComponents(l+r,f+c,m+h,T+p).normalize(),n[2].setComponents(l+a,f+d,m+g,T+M).normalize(),n[3].setComponents(l-a,f-d,m-g,T-M).normalize(),n[4].setComponents(l-o,f-u,m-y,T-x).normalize(),t===Pn)n[5].setComponents(l+o,f+u,m+y,T+x).normalize();else if(t===$s)n[5].setComponents(o,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ws.x=s.normal.x>0?e.max.x:e.min.x,ws.y=s.normal.y>0?e.max.y:e.min.y,ws.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Mu(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,d){const u=c.array,f=c.usage,h=u.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,u,f),c.onUploadCallback();let y;if(u instanceof Float32Array)y=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)y=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)y=i.SHORT;else if(u instanceof Uint32Array)y=i.UNSIGNED_INT;else if(u instanceof Int32Array)y=i.INT;else if(u instanceof Int8Array)y=i.BYTE;else if(u instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:y,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:h}}function r(c,d,u){const f=d.array,h=d._updateRange,g=d.updateRanges;if(i.bindBuffer(u,c),h.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let y=0,m=g.length;y<m;y++){const p=g[y];t?i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}h.count!==-1&&(t?i.bufferSubData(u,h.offset*f.BYTES_PER_ELEMENT,f,h.offset,h.count):i.bufferSubData(u,h.offset*f.BYTES_PER_ELEMENT,f.subarray(h.offset,h.offset+h.count)),h.count=-1),d.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,s(c,d));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,d),u.version=c.version}}return{get:a,remove:o,update:l}}class ct extends vn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,u=e/o,f=t/l,h=[],g=[],y=[],m=[];for(let p=0;p<d;p++){const M=p*f-a;for(let x=0;x<c;x++){const T=x*u-r;g.push(T,-M,0),y.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const x=M+c*p,T=M+c*(p+1),P=M+1+c*(p+1),w=M+1+c*p;h.push(x,T,w),h.push(T,P,w)}this.setIndex(h),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(y,3)),this.setAttribute("uv",new dn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.width,e.height,e.widthSegments,e.heightSegments)}}var Eu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
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
#endif`,Tu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
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
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lu=`#ifdef USE_BATCHING
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
#endif`,Uu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ku=`#ifdef USE_IRIDESCENCE
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
#endif`,Fu=`#ifdef USE_BUMPMAP
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
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Xu=`#define PI 3.141592653589793
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
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yu=`vec3 transformedNormal = objectNormal;
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
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",eh=`
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
}`,th=`#ifdef USE_ENVMAP
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
#endif`,nh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ih=`#ifdef USE_ENVMAP
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
#endif`,sh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rh=`#ifdef USE_ENVMAP
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
#endif`,oh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ah=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ch=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dh=`#ifdef USE_GRADIENTMAP
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
}`,uh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ph=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mh=`uniform bool receiveShadow;
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
#endif`,gh=`#ifdef USE_ENVMAP
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
#endif`,yh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_h=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sh=`PhysicalMaterial material;
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
#endif`,Mh=`struct PhysicalMaterial {
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
}`,Eh=`
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
#endif`,bh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Th=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ah=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ch=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ph=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dh=`#if defined( USE_POINTS_UV )
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
#endif`,Ih=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fh=`#ifdef USE_MORPHNORMALS
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
#endif`,Oh=`#ifdef USE_MORPHTARGETS
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
#endif`,Bh=`#ifdef USE_MORPHTARGETS
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
#endif`,zh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$h=`#ifdef USE_NORMALMAP
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
#endif`,Xh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lf=`float getShadowMask() {
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
}`,cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,df=`#ifdef USE_SKINNING
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
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hf=`#ifdef USE_SKINNING
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
#endif`,ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yf=`#ifdef USE_TRANSMISSION
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
#endif`,_f=`#ifdef USE_TRANSMISSION
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
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ef=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bf=`uniform sampler2D t2D;
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
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`#include <common>
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
}`,Pf=`#if DEPTH_PACKING == 3200
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
}`,Lf=`#define DISTANCE
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
}`,Uf=`#define DISTANCE
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
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nf=`uniform float scale;
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
}`,kf=`uniform vec3 diffuse;
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
}`,Ff=`#include <common>
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
}`,Of=`uniform vec3 diffuse;
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
}`,Bf=`#define LAMBERT
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
}`,zf=`#define LAMBERT
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
}`,Hf=`#define MATCAP
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
}`,Gf=`#define MATCAP
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
}`,Vf=`#define NORMAL
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
}`,Wf=`#define NORMAL
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
}`,$f=`#define PHONG
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
}`,Xf=`#define PHONG
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
}`,qf=`#define STANDARD
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
}`,Yf=`#define STANDARD
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
}`,jf=`#define TOON
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
}`,Zf=`#define TOON
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
}`,Kf=`uniform float size;
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
}`,Jf=`uniform vec3 diffuse;
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
}`,Qf=`#include <common>
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
}`,ep=`uniform vec3 color;
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
}`,tp=`uniform float rotation;
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
}`,np=`uniform vec3 diffuse;
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
}`,Ie={alphahash_fragment:Eu,alphahash_pars_fragment:bu,alphamap_fragment:Tu,alphamap_pars_fragment:Au,alphatest_fragment:wu,alphatest_pars_fragment:Ru,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Lu,batching_vertex:Uu,begin_vertex:Du,beginnormal_vertex:Iu,bsdfs:Nu,iridescence_fragment:ku,bumpmap_pars_fragment:Fu,clipping_planes_fragment:Ou,clipping_planes_pars_fragment:Bu,clipping_planes_pars_vertex:zu,clipping_planes_vertex:Hu,color_fragment:Gu,color_pars_fragment:Vu,color_pars_vertex:Wu,color_vertex:$u,common:Xu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Yu,displacementmap_pars_vertex:ju,displacementmap_vertex:Zu,emissivemap_fragment:Ku,emissivemap_pars_fragment:Ju,colorspace_fragment:Qu,colorspace_pars_fragment:eh,envmap_fragment:th,envmap_common_pars_fragment:nh,envmap_pars_fragment:ih,envmap_pars_vertex:sh,envmap_physical_pars_fragment:gh,envmap_vertex:rh,fog_vertex:oh,fog_pars_vertex:ah,fog_fragment:lh,fog_pars_fragment:ch,gradientmap_pars_fragment:dh,lightmap_fragment:uh,lightmap_pars_fragment:hh,lights_lambert_fragment:fh,lights_lambert_pars_fragment:ph,lights_pars_begin:mh,lights_toon_fragment:yh,lights_toon_pars_fragment:_h,lights_phong_fragment:xh,lights_phong_pars_fragment:vh,lights_physical_fragment:Sh,lights_physical_pars_fragment:Mh,lights_fragment_begin:Eh,lights_fragment_maps:bh,lights_fragment_end:Th,logdepthbuf_fragment:Ah,logdepthbuf_pars_fragment:wh,logdepthbuf_pars_vertex:Rh,logdepthbuf_vertex:Ch,map_fragment:Ph,map_pars_fragment:Lh,map_particle_fragment:Uh,map_particle_pars_fragment:Dh,metalnessmap_fragment:Ih,metalnessmap_pars_fragment:Nh,morphcolor_vertex:kh,morphnormal_vertex:Fh,morphtarget_pars_vertex:Oh,morphtarget_vertex:Bh,normal_fragment_begin:zh,normal_fragment_maps:Hh,normal_pars_fragment:Gh,normal_pars_vertex:Vh,normal_vertex:Wh,normalmap_pars_fragment:$h,clearcoat_normal_fragment_begin:Xh,clearcoat_normal_fragment_maps:qh,clearcoat_pars_fragment:Yh,iridescence_pars_fragment:jh,opaque_fragment:Zh,packing:Kh,premultiplied_alpha_fragment:Jh,project_vertex:Qh,dithering_fragment:ef,dithering_pars_fragment:tf,roughnessmap_fragment:nf,roughnessmap_pars_fragment:sf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:of,shadowmap_vertex:af,shadowmask_pars_fragment:lf,skinbase_vertex:cf,skinning_pars_vertex:df,skinning_vertex:uf,skinnormal_vertex:hf,specularmap_fragment:ff,specularmap_pars_fragment:pf,tonemapping_fragment:mf,tonemapping_pars_fragment:gf,transmission_fragment:yf,transmission_pars_fragment:_f,uv_pars_fragment:xf,uv_pars_vertex:vf,uv_vertex:Sf,worldpos_vertex:Mf,background_vert:Ef,background_frag:bf,backgroundCube_vert:Tf,backgroundCube_frag:Af,cube_vert:wf,cube_frag:Rf,depth_vert:Cf,depth_frag:Pf,distanceRGBA_vert:Lf,distanceRGBA_frag:Uf,equirect_vert:Df,equirect_frag:If,linedashed_vert:Nf,linedashed_frag:kf,meshbasic_vert:Ff,meshbasic_frag:Of,meshlambert_vert:Bf,meshlambert_frag:zf,meshmatcap_vert:Hf,meshmatcap_frag:Gf,meshnormal_vert:Vf,meshnormal_frag:Wf,meshphong_vert:$f,meshphong_frag:Xf,meshphysical_vert:qf,meshphysical_frag:Yf,meshtoon_vert:jf,meshtoon_frag:Zf,points_vert:Kf,points_frag:Jf,shadow_vert:Qf,shadow_frag:ep,sprite_vert:tp,sprite_frag:np},ie={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},yn={basic:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Ot([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Ot([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Ot([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Ot([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Ot([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Ot([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Ot([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Ot([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Ot([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Ot([ie.common,ie.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Ot([ie.lights,ie.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};yn.physical={uniforms:Ot([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Rs={r:0,b:0,g:0};function ip(i,e,t,n,s,r,a){const o=new Xe(0);let l=r===!0?0:1,c,d,u=null,f=0,h=null;function g(m,p){let M=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?y(o,l):x&&x.isColor&&(y(x,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===js)?(d===void 0&&(d=new tt(new ss(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:Bi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=Ze.getTransfer(x.colorSpace)!==nt,(u!==x||f!==x.version||h!==i.toneMapping)&&(d.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new tt(new ct(2,2),new ai({name:"BackgroundMaterial",uniforms:Bi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,p){m.getRGB(Rs,Cl(i)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,y(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(o,l)},render:g}}function sp(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null);let c=l,d=!1;function u(C,F,G,X,W){let $=!1;if(a){const q=y(X,G,F);c!==q&&(c=q,h(c.object)),$=p(C,X,G,W),$&&M(C,X,G,W)}else{const q=F.wireframe===!0;(c.geometry!==X.id||c.program!==G.id||c.wireframe!==q)&&(c.geometry=X.id,c.program=G.id,c.wireframe=q,$=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),($||d)&&(d=!1,V(C,F,G,X),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function h(C){return n.isWebGL2?i.bindVertexArray(C):r.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?i.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function y(C,F,G){const X=G.wireframe===!0;let W=o[C.id];W===void 0&&(W={},o[C.id]=W);let $=W[F.id];$===void 0&&($={},W[F.id]=$);let q=$[X];return q===void 0&&(q=m(f()),$[X]=q),q}function m(C){const F=[],G=[],X=[];for(let W=0;W<s;W++)F[W]=0,G[W]=0,X[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:X,object:C,attributes:{},index:null}}function p(C,F,G,X){const W=c.attributes,$=F.attributes;let q=0;const ee=G.getAttributes();for(const te in ee)if(ee[te].location>=0){const Y=W[te];let ce=$[te];if(ce===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(ce=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(ce=C.instanceColor)),Y===void 0||Y.attribute!==ce||ce&&Y.data!==ce.data)return!0;q++}return c.attributesNum!==q||c.index!==X}function M(C,F,G,X){const W={},$=F.attributes;let q=0;const ee=G.getAttributes();for(const te in ee)if(ee[te].location>=0){let Y=$[te];Y===void 0&&(te==="instanceMatrix"&&C.instanceMatrix&&(Y=C.instanceMatrix),te==="instanceColor"&&C.instanceColor&&(Y=C.instanceColor));const ce={};ce.attribute=Y,Y&&Y.data&&(ce.data=Y.data),W[te]=ce,q++}c.attributes=W,c.attributesNum=q,c.index=X}function x(){const C=c.newAttributes;for(let F=0,G=C.length;F<G;F++)C[F]=0}function T(C){P(C,0)}function P(C,F){const G=c.newAttributes,X=c.enabledAttributes,W=c.attributeDivisors;G[C]=1,X[C]===0&&(i.enableVertexAttribArray(C),X[C]=1),W[C]!==F&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,F),W[C]=F)}function w(){const C=c.newAttributes,F=c.enabledAttributes;for(let G=0,X=F.length;G<X;G++)F[G]!==C[G]&&(i.disableVertexAttribArray(G),F[G]=0)}function A(C,F,G,X,W,$,q){q===!0?i.vertexAttribIPointer(C,F,G,W,$):i.vertexAttribPointer(C,F,G,X,W,$)}function V(C,F,G,X){if(n.isWebGL2===!1&&(C.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=X.attributes,$=G.getAttributes(),q=F.defaultAttributeValues;for(const ee in $){const te=$[ee];if(te.location>=0){let z=W[ee];if(z===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(z=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(z=C.instanceColor)),z!==void 0){const Y=z.normalized,ce=z.itemSize,ye=t.get(z);if(ye===void 0)continue;const ge=ye.buffer,Pe=ye.type,Ue=ye.bytesPerElement,be=n.isWebGL2===!0&&(Pe===i.INT||Pe===i.UNSIGNED_INT||z.gpuType===ul);if(z.isInterleavedBufferAttribute){const Ve=z.data,D=Ve.stride,It=z.offset;if(Ve.isInstancedInterleavedBuffer){for(let xe=0;xe<te.locationSize;xe++)P(te.location+xe,Ve.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let xe=0;xe<te.locationSize;xe++)T(te.location+xe);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let xe=0;xe<te.locationSize;xe++)A(te.location+xe,ce/te.locationSize,Pe,Y,D*Ue,(It+ce/te.locationSize*xe)*Ue,be)}else{if(z.isInstancedBufferAttribute){for(let Ve=0;Ve<te.locationSize;Ve++)P(te.location+Ve,z.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ve=0;Ve<te.locationSize;Ve++)T(te.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Ve=0;Ve<te.locationSize;Ve++)A(te.location+Ve,ce/te.locationSize,Pe,Y,ce*Ue,ce/te.locationSize*Ve*Ue,be)}}else if(q!==void 0){const Y=q[ee];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(te.location,Y);break;case 3:i.vertexAttrib3fv(te.location,Y);break;case 4:i.vertexAttrib4fv(te.location,Y);break;default:i.vertexAttrib1fv(te.location,Y)}}}}w()}function v(){H();for(const C in o){const F=o[C];for(const G in F){const X=F[G];for(const W in X)g(X[W].object),delete X[W];delete F[G]}delete o[C]}}function b(C){if(o[C.id]===void 0)return;const F=o[C.id];for(const G in F){const X=F[G];for(const W in X)g(X[W].object),delete X[W];delete F[G]}delete o[C.id]}function B(C){for(const F in o){const G=o[F];if(G[C.id]===void 0)continue;const X=G[C.id];for(const W in X)g(X[W].object),delete X[W];delete G[C.id]}}function H(){Q(),d=!0,c!==l&&(c=l,h(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:H,resetDefaultState:Q,dispose:v,releaseStatesOfGeometry:b,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:T,disableUnusedAttributes:w}}function rp(i,e,t,n){const s=n.isWebGL2;let r;function a(d){r=d}function o(d,u){i.drawArrays(r,d,u),t.update(u,r,1)}function l(d,u,f){if(f===0)return;let h,g;if(s)h=i,g="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[g](r,d,u,f),t.update(u,r,f)}function c(d,u,f){if(f===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<f;g++)this.render(d[g],u[g]);else{h.multiDrawArraysWEBGL(r,d,0,u,0,f);let g=0;for(let y=0;y<f;y++)g+=u[y];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function op(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),y=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,T=a||e.has("OES_texture_float"),P=x&&T,w=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:d,maxTextures:u,maxVertexTextures:f,maxTextureSize:h,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:P,maxSamples:w}}function ap(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Zn,o=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const h=u.length!==0||f||n!==0||s;return s=f,n=u.length,h},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,h){const g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const M=r?0:n,x=M*4;let T=p.clippingState||null;l.value=T,T=d(g,f,x,h);for(let P=0;P!==x;++P)T[P]=t[P];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,f,h,g){const y=u!==null?u.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=h+y*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,T=h;x!==y;++x,T+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function lp(i){let e=new WeakMap;function t(a,o){return o===$r?a.mapping=ki:o===Xr&&(a.mapping=Fi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===$r||o===Xr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new xu(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Il extends Pl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ci=4,Ta=[.125,.215,.35,.446,.526,.582],ni=20,Lr=new Il,Aa=new Xe;let Ur=null,Dr=0,Ir=0;const Kn=(1+Math.sqrt(5))/2,Ei=1/Kn,wa=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Kn,Ei),new U(0,Kn,-Ei),new U(Ei,0,Kn),new U(-Ei,0,Kn),new U(Kn,Ei,0),new U(-Kn,Ei,0)];class Ra{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ur=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=La(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ur,Dr,Ir),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===Fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ur=this._renderer.getRenderTarget(),Dr=this._renderer.getActiveCubeFace(),Ir=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Qi,format:ln,colorSpace:Ln,depthBuffer:!1},s=Ca(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ca(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(r)),this._blurMaterial=dp(r,e,t)}return s}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,Lr)}_sceneToCubeUV(e,t,n,s){const o=new an(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Aa),d.toneMapping=Hn,d.autoClear=!1;const h=new pt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new tt(new ss,h);let y=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,y=!0):(h.color.copy(Aa),y=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;Cs(s,M*x,p>2?x:0,x,x),d.setRenderTarget(s),y&&d.render(g,o),d.render(e,o)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ki||e.mapping===Fi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=La()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pa());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Cs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Lr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=wa[(s-1)%wa.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new tt(this._lodPlanes[s],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*ni-1),y=r/g,m=isFinite(r)?1+Math.floor(d*y):ni;m>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const p=[];let M=0;for(let A=0;A<ni;++A){const V=A/y,v=Math.exp(-V*V/2);p.push(v),A===0?M+=v:A<m&&(M+=2*v)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const T=this._sizeLods[s],P=3*T*(s>x-Ci?s-x+Ci:0),w=4*(this._cubeSize-T);Cs(t,P,w,3*T,2*T),l.setRenderTarget(t),l.render(u,Lr)}}function cp(i){const e=[],t=[],n=[];let s=i;const r=i-Ci+1+Ta.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Ci?l=Ta[a-i+Ci-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,u=1+c,f=[d,d,u,d,u,u,d,d,u,u,d,u],h=6,g=6,y=3,m=2,p=1,M=new Float32Array(y*g*h),x=new Float32Array(m*g*h),T=new Float32Array(p*g*h);for(let w=0;w<h;w++){const A=w%3*2/3-1,V=w>2?0:-1,v=[A,V,0,A+2/3,V,0,A+2/3,V+1,0,A,V,0,A+2/3,V+1,0,A,V+1,0];M.set(v,y*g*w),x.set(f,m*g*w);const b=[w,w,w,w,w,w];T.set(b,p*g*w)}const P=new vn;P.setAttribute("position",new _n(M,y)),P.setAttribute("uv",new _n(x,m)),P.setAttribute("faceIndex",new _n(T,p)),e.push(P),s>Ci&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ca(i,e,t){const n=new oi(i,e,t);return n.texture.mapping=js,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function dp(i,e,t){const n=new Float32Array(ni),s=new U(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lo(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Pa(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lo(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function La(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function lo(){return`

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
	`}function up(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===$r||l===Xr,d=l===ki||l===Fi;if(c||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Ra(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||d&&u&&s(u)){t===null&&(t=new Ra(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function hp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function fp(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",a),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const h=u.morphAttributes;for(const g in h){const y=h[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],i.ARRAY_BUFFER)}}function c(u){const f=[],h=u.index,g=u.attributes.position;let y=0;if(h!==null){const M=h.array;y=h.version;for(let x=0,T=M.length;x<T;x+=3){const P=M[x+0],w=M[x+1],A=M[x+2];f.push(P,w,w,A,A,P)}}else if(g!==void 0){const M=g.array;y=g.version;for(let x=0,T=M.length/3-1;x<T;x+=3){const P=x+0,w=x+1,A=x+2;f.push(P,w,w,A,A,P)}}else return;const m=new(vl(f)?Rl:wl)(f,1);m.version=y;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function d(u){const f=r.get(u);if(f){const h=u.index;h!==null&&f.version<h.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function pp(i,e,t,n){const s=n.isWebGL2;let r;function a(h){r=h}let o,l;function c(h){o=h.type,l=h.bytesPerElement}function d(h,g){i.drawElements(r,g,o,h*l),t.update(g,r,1)}function u(h,g,y){if(y===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,h*l,y),t.update(g,r,y)}function f(h,g,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<y;p++)this.render(h[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,h,0,y);let p=0;for(let M=0;M<y;M++)p+=g[M];t.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=d,this.renderInstances=u,this.renderMultiDraw=f}function mp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gp(i,e){return i[0]-e[0]}function yp(i,e){return Math.abs(e[1])-Math.abs(i[1])}function _p(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new Tt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,d,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=g!==void 0?g.length:0;let m=r.get(d);if(m===void 0||m.count!==y){let F=function(){Q.dispose(),r.delete(d),d.removeEventListener("dispose",F)};var h=F;m!==void 0&&m.texture.dispose();const x=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,P=d.morphAttributes.color!==void 0,w=d.morphAttributes.position||[],A=d.morphAttributes.normal||[],V=d.morphAttributes.color||[];let v=0;x===!0&&(v=1),T===!0&&(v=2),P===!0&&(v=3);let b=d.attributes.position.count*v,B=1;b>e.maxTextureSize&&(B=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const H=new Float32Array(b*B*4*y),Q=new El(H,b,B,y);Q.type=Bn,Q.needsUpdate=!0;const C=v*4;for(let G=0;G<y;G++){const X=w[G],W=A[G],$=V[G],q=b*B*4*G;for(let ee=0;ee<X.count;ee++){const te=ee*C;x===!0&&(a.fromBufferAttribute(X,ee),H[q+te+0]=a.x,H[q+te+1]=a.y,H[q+te+2]=a.z,H[q+te+3]=0),T===!0&&(a.fromBufferAttribute(W,ee),H[q+te+4]=a.x,H[q+te+5]=a.y,H[q+te+6]=a.z,H[q+te+7]=0),P===!0&&(a.fromBufferAttribute($,ee),H[q+te+8]=a.x,H[q+te+9]=a.y,H[q+te+10]=a.z,H[q+te+11]=$.itemSize===4?a.w:1)}}m={count:y,texture:Q,size:new Ke(b,B)},r.set(d,m),d.addEventListener("dispose",F)}let p=0;for(let x=0;x<f.length;x++)p+=f[x];const M=d.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",M),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let y=n[d.id];if(y===void 0||y.length!==g){y=[];for(let T=0;T<g;T++)y[T]=[T,0];n[d.id]=y}for(let T=0;T<g;T++){const P=y[T];P[0]=T,P[1]=f[T]}y.sort(yp);for(let T=0;T<8;T++)T<g&&y[T][1]?(o[T][0]=y[T][0],o[T][1]=y[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(gp);const m=d.morphAttributes.position,p=d.morphAttributes.normal;let M=0;for(let T=0;T<8;T++){const P=o[T],w=P[0],A=P[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&d.getAttribute("morphTarget"+T)!==m[w]&&d.setAttribute("morphTarget"+T,m[w]),p&&d.getAttribute("morphNormal"+T)!==p[w]&&d.setAttribute("morphNormal"+T,p[w]),s[T]=A,M+=A):(m&&d.hasAttribute("morphTarget"+T)===!0&&d.deleteAttribute("morphTarget"+T),p&&d.hasAttribute("morphNormal"+T)===!0&&d.deleteAttribute("morphNormal"+T),s[T]=0)}const x=d.morphTargetsRelative?1:1-M;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function xp(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Nl extends Bt{constructor(e,t,n,s,r,a,o,l,c,d){if(d=d!==void 0?d:si,d!==si&&d!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===si&&(n=On),n===void 0&&d===Oi&&(n=ii),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ye,this.minFilter=l!==void 0?l:Ye,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const kl=new Bt,Fl=new Nl(1,1);Fl.compareFunction=xl;const Ol=new El,Bl=new nu,zl=new Ll,Ua=[],Da=[],Ia=new Float32Array(16),Na=new Float32Array(9),ka=new Float32Array(4);function Hi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ua[s];if(r===void 0&&(r=new Float32Array(s),Ua[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Qs(i,e){let t=Da[e];t===void 0&&(t=new Int32Array(e),Da[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;ka.set(n),i.uniformMatrix2fv(this.addr,!1,ka),gt(t,n)}}function Tp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Na.set(n),i.uniformMatrix3fv(this.addr,!1,Na),gt(t,n)}}function Ap(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ia.set(n),i.uniformMatrix4fv(this.addr,!1,Ia),gt(t,n)}}function wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Lp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function Np(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Fl:kl;t.setTexture2D(e||r,s)}function kp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Bl,s)}function Fp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zl,s)}function Op(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ol,s)}function Bp(i){switch(i){case 5126:return vp;case 35664:return Sp;case 35665:return Mp;case 35666:return Ep;case 35674:return bp;case 35675:return Tp;case 35676:return Ap;case 5124:case 35670:return wp;case 35667:case 35671:return Rp;case 35668:case 35672:return Cp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Up;case 36295:return Dp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Fp;case 36289:case 36303:case 36311:case 36292:return Op}}function zp(i,e){i.uniform1fv(this.addr,e)}function Hp(i,e){const t=Hi(e,this.size,2);i.uniform2fv(this.addr,t)}function Gp(i,e){const t=Hi(e,this.size,3);i.uniform3fv(this.addr,t)}function Vp(i,e){const t=Hi(e,this.size,4);i.uniform4fv(this.addr,t)}function Wp(i,e){const t=Hi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $p(i,e){const t=Hi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Xp(i,e){const t=Hi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function qp(i,e){i.uniform1iv(this.addr,e)}function Yp(i,e){i.uniform2iv(this.addr,e)}function jp(i,e){i.uniform3iv(this.addr,e)}function Zp(i,e){i.uniform4iv(this.addr,e)}function Kp(i,e){i.uniform1uiv(this.addr,e)}function Jp(i,e){i.uniform2uiv(this.addr,e)}function Qp(i,e){i.uniform3uiv(this.addr,e)}function em(i,e){i.uniform4uiv(this.addr,e)}function tm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||kl,r[a])}function nm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Bl,r[a])}function im(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zl,r[a])}function sm(i,e,t){const n=this.cache,s=e.length,r=Qs(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ol,r[a])}function rm(i){switch(i){case 5126:return zp;case 35664:return Hp;case 35665:return Gp;case 35666:return Vp;case 35674:return Wp;case 35675:return $p;case 35676:return Xp;case 5124:case 35670:return qp;case 35667:case 35671:return Yp;case 35668:case 35672:return jp;case 35669:case 35673:return Zp;case 5125:return Kp;case 36294:return Jp;case 36295:return Qp;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}class om{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bp(t.type)}}class am{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rm(t.type)}}class lm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Nr=/(\w+)(\])?(\[|\.)?/g;function Fa(i,e){i.seq.push(e),i.map[e.id]=e}function cm(i,e,t){const n=i.name,s=n.length;for(Nr.lastIndex=0;;){const r=Nr.exec(n),a=Nr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fa(t,c===void 0?new om(o,i,e):new am(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new lm(o),Fa(t,u)),t=u}}}class Is{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);cm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Oa(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const dm=37297;let um=0;function hm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function fm(i){const e=Ze.getPrimaries(Ze.workingColorSpace),t=Ze.getPrimaries(i);let n;switch(e===t?n="":e===Ws&&t===Vs?n="LinearDisplayP3ToLinearSRGB":e===Vs&&t===Ws&&(n="LinearSRGBToLinearDisplayP3"),i){case Ln:case Zs:return[n,"LinearTransferOETF"];case bt:case ao:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ba(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+hm(i.getShaderSource(e),a)}else return s}function pm(i,e){const t=fm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function mm(i,e){let t;switch(e){case bd:t="Linear";break;case Td:t="Reinhard";break;case Ad:t="OptimizedCineon";break;case wd:t="ACESFilmic";break;case Cd:t="AgX";break;case Rd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function gm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Pi).join(`
`)}function ym(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Pi).join(`
`)}function _m(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function xm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Pi(i){return i!==""}function za(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ha(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jr(i){return i.replace(vm,Mm)}const Sm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Mm(i,e){let t=Ie[e];if(t===void 0){const n=Sm.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Jr(t)}const Em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ga(i){return i.replace(Em,bm)}function bm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Va(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Tm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ll?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function Am(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ki:case Fi:e="ENVMAP_TYPE_CUBE";break;case js:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fi:e="ENVMAP_MODE_REFRACTION";break}return e}function Rm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case cl:e="ENVMAP_BLENDING_MULTIPLY";break;case Md:e="ENVMAP_BLENDING_MIX";break;case Ed:e="ENVMAP_BLENDING_ADD";break}return e}function Cm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Pm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Tm(t),c=Am(t),d=wm(t),u=Rm(t),f=Cm(t),h=t.isWebGL2?"":gm(t),g=ym(t),y=_m(r),m=s.createProgram();let p,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Pi).join(`
`),p.length>0&&(p+=`
`),M=[h,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Pi).join(`
`),M.length>0&&(M+=`
`)):(p=[Va(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pi).join(`
`),M=[h,Va(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Hn?mm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,pm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Pi).join(`
`)),a=Jr(a),a=za(a,t),a=Ha(a,t),o=Jr(o),o=za(o,t),o=Ha(o,t),a=Ga(a),o=Ga(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===aa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===aa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const T=x+p+a,P=x+M+o,w=Oa(s,s.VERTEX_SHADER,T),A=Oa(s,s.FRAGMENT_SHADER,P);s.attachShader(m,w),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function V(H){if(i.debug.checkShaderErrors){const Q=s.getProgramInfoLog(m).trim(),C=s.getShaderInfoLog(w).trim(),F=s.getShaderInfoLog(A).trim();let G=!0,X=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,w,A);else{const W=Ba(s,w,"vertex"),$=Ba(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+W+`
`+$)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(C===""||F==="")&&(X=!1);X&&(H.diagnostics={runnable:G,programLog:Q,vertexShader:{log:C,prefix:p},fragmentShader:{log:F,prefix:M}})}s.deleteShader(w),s.deleteShader(A),v=new Is(s,m),b=xm(s,m)}let v;this.getUniforms=function(){return v===void 0&&V(this),v};let b;this.getAttributes=function(){return b===void 0&&V(this),b};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(m,dm)),B},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=um++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Lm=0;class Um{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dm(e),t.set(e,n)),n}}class Dm{constructor(e){this.id=Lm++,this.code=e,this.usedTimes=0}}function Im(i,e,t,n,s,r,a){const o=new Tl,l=new Um,c=[],d=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(v){return v===0?"uv":`uv${v}`}function m(v,b,B,H,Q){const C=H.fog,F=Q.geometry,G=v.isMeshStandardMaterial?H.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||G),W=X&&X.mapping===js?X.image.height:null,$=g[v.type];v.precision!==null&&(h=s.getMaxPrecision(v.precision),h!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const q=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ee=q!==void 0?q.length:0;let te=0;F.morphAttributes.position!==void 0&&(te=1),F.morphAttributes.normal!==void 0&&(te=2),F.morphAttributes.color!==void 0&&(te=3);let z,Y,ce,ye;if($){const Nt=yn[$];z=Nt.vertexShader,Y=Nt.fragmentShader}else z=v.vertexShader,Y=v.fragmentShader,l.update(v),ce=l.getVertexShaderID(v),ye=l.getFragmentShaderID(v);const ge=i.getRenderTarget(),Pe=Q.isInstancedMesh===!0,Ue=Q.isBatchedMesh===!0,be=!!v.map,Ve=!!v.matcap,D=!!X,It=!!v.aoMap,xe=!!v.lightMap,Re=!!v.bumpMap,fe=!!v.normalMap,it=!!v.displacementMap,Ne=!!v.emissiveMap,E=!!v.metalnessMap,_=!!v.roughnessMap,N=v.anisotropy>0,K=v.clearcoat>0,Z=v.iridescence>0,J=v.sheen>0,pe=v.transmission>0,le=N&&!!v.anisotropyMap,ue=K&&!!v.clearcoatMap,Ee=K&&!!v.clearcoatNormalMap,ke=K&&!!v.clearcoatRoughnessMap,j=Z&&!!v.iridescenceMap,je=Z&&!!v.iridescenceThicknessMap,He=J&&!!v.sheenColorMap,we=J&&!!v.sheenRoughnessMap,_e=!!v.specularMap,he=!!v.specularColorMap,De=!!v.specularIntensityMap,qe=pe&&!!v.transmissionMap,ot=pe&&!!v.thicknessMap,Oe=!!v.gradientMap,ne=!!v.alphaMap,R=v.alphaTest>0,oe=!!v.alphaHash,ae=!!v.extensions,Te=!!F.attributes.uv1,ve=!!F.attributes.uv2,Je=!!F.attributes.uv3;let Qe=Hn;return v.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Qe=i.toneMapping),{isWebGL2:d,shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:z,fragmentShader:Y,defines:v.defines,customVertexShaderID:ce,customFragmentShaderID:ye,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Ue,instancing:Pe,instancingColor:Pe&&Q.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Ln,map:be,matcap:Ve,envMap:D,envMapMode:D&&X.mapping,envMapCubeUVHeight:W,aoMap:It,lightMap:xe,bumpMap:Re,normalMap:fe,displacementMap:f&&it,emissiveMap:Ne,normalMapObjectSpace:fe&&v.normalMapType===Gd,normalMapTangentSpace:fe&&v.normalMapType===Hd,metalnessMap:E,roughnessMap:_,anisotropy:N,anisotropyMap:le,clearcoat:K,clearcoatMap:ue,clearcoatNormalMap:Ee,clearcoatRoughnessMap:ke,iridescence:Z,iridescenceMap:j,iridescenceThicknessMap:je,sheen:J,sheenColorMap:He,sheenRoughnessMap:we,specularMap:_e,specularColorMap:he,specularIntensityMap:De,transmission:pe,transmissionMap:qe,thicknessMap:ot,gradientMap:Oe,opaque:v.transparent===!1&&v.blending===Li,alphaMap:ne,alphaTest:R,alphaHash:oe,combine:v.combine,mapUv:be&&y(v.map.channel),aoMapUv:It&&y(v.aoMap.channel),lightMapUv:xe&&y(v.lightMap.channel),bumpMapUv:Re&&y(v.bumpMap.channel),normalMapUv:fe&&y(v.normalMap.channel),displacementMapUv:it&&y(v.displacementMap.channel),emissiveMapUv:Ne&&y(v.emissiveMap.channel),metalnessMapUv:E&&y(v.metalnessMap.channel),roughnessMapUv:_&&y(v.roughnessMap.channel),anisotropyMapUv:le&&y(v.anisotropyMap.channel),clearcoatMapUv:ue&&y(v.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&y(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&y(v.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&y(v.iridescenceMap.channel),iridescenceThicknessMapUv:je&&y(v.iridescenceThicknessMap.channel),sheenColorMapUv:He&&y(v.sheenColorMap.channel),sheenRoughnessMapUv:we&&y(v.sheenRoughnessMap.channel),specularMapUv:_e&&y(v.specularMap.channel),specularColorMapUv:he&&y(v.specularColorMap.channel),specularIntensityMapUv:De&&y(v.specularIntensityMap.channel),transmissionMapUv:qe&&y(v.transmissionMap.channel),thicknessMapUv:ot&&y(v.thicknessMap.channel),alphaMapUv:ne&&y(v.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(fe||N),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:ve,vertexUv3s:Je,pointsUvs:Q.isPoints===!0&&!!F.attributes.uv&&(be||ne),fog:!!C,useFog:v.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Q.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:te,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:Qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Cn,flipSided:v.side===Vt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:ae&&v.extensions.derivatives===!0,extensionFragDepth:ae&&v.extensions.fragDepth===!0,extensionDrawBuffers:ae&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const B in v.defines)b.push(B),b.push(v.defines[B]);return v.isRawShaderMaterial===!1&&(M(b,v),x(b,v),b.push(i.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function M(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),v.push(o.mask)}function T(v){const b=g[v.type];let B;if(b){const H=yn[b];B=mu.clone(H.uniforms)}else B=v.uniforms;return B}function P(v,b){let B;for(let H=0,Q=c.length;H<Q;H++){const C=c[H];if(C.cacheKey===b){B=C,++B.usedTimes;break}}return B===void 0&&(B=new Pm(i,b,v,r),c.push(B)),B}function w(v){if(--v.usedTimes===0){const b=c.indexOf(v);c[b]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function V(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:P,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:V}}function Nm(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function km(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Wa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function $a(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,f,h,g,y,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:h,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=y,p.group=m),e++,p}function o(u,f,h,g,y,m){const p=a(u,f,h,g,y,m);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):t.push(p)}function l(u,f,h,g,y,m){const p=a(u,f,h,g,y,m);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,f){t.length>1&&t.sort(u||km),n.length>1&&n.sort(f||Wa),s.length>1&&s.sort(f||Wa)}function d(){for(let u=e,f=i.length;u<f;u++){const h=i[u];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function Fm(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new $a,i.set(n,[a])):s>=r.length?(a=new $a,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Om(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Xe};break;case"SpotLight":t={position:new U,direction:new U,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Bm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let zm=0;function Hm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gm(i,e){const t=new Om,n=Bm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new U);const r=new U,a=new St,o=new St;function l(d,u){let f=0,h=0,g=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let y=0,m=0,p=0,M=0,x=0,T=0,P=0,w=0,A=0,V=0,v=0;d.sort(Hm);const b=u===!0?Math.PI:1;for(let H=0,Q=d.length;H<Q;H++){const C=d[H],F=C.color,G=C.intensity,X=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=F.r*G*b,h+=F.g*G*b,g+=F.b*G*b;else if(C.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(C.sh.coefficients[$],G);v++}else if(C.isDirectionalLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity*b),C.castShadow){const q=C.shadow,ee=n.get(C);ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,s.directionalShadow[y]=ee,s.directionalShadowMap[y]=W,s.directionalShadowMatrix[y]=C.shadow.matrix,T++}s.directional[y]=$,y++}else if(C.isSpotLight){const $=t.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(F).multiplyScalar(G*b),$.distance=X,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,s.spot[p]=$;const q=C.shadow;if(C.map&&(s.spotLightMap[A]=C.map,A++,q.updateMatrices(C),C.castShadow&&V++),s.spotLightMatrix[p]=q.matrix,C.castShadow){const ee=n.get(C);ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,s.spotShadow[p]=ee,s.spotShadowMap[p]=W,w++}p++}else if(C.isRectAreaLight){const $=t.get(C);$.color.copy(F).multiplyScalar(G),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),s.rectArea[M]=$,M++}else if(C.isPointLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity*b),$.distance=C.distance,$.decay=C.decay,C.castShadow){const q=C.shadow,ee=n.get(C);ee.shadowBias=q.bias,ee.shadowNormalBias=q.normalBias,ee.shadowRadius=q.radius,ee.shadowMapSize=q.mapSize,ee.shadowCameraNear=q.camera.near,ee.shadowCameraFar=q.camera.far,s.pointShadow[m]=ee,s.pointShadowMap[m]=W,s.pointShadowMatrix[m]=C.shadow.matrix,P++}s.point[m]=$,m++}else if(C.isHemisphereLight){const $=t.get(C);$.skyColor.copy(C.color).multiplyScalar(G*b),$.groundColor.copy(C.groundColor).multiplyScalar(G*b),s.hemi[x]=$,x++}}M>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_FLOAT_1,s.rectAreaLTC2=ie.LTC_FLOAT_2):(s.rectAreaLTC1=ie.LTC_HALF_1,s.rectAreaLTC2=ie.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_FLOAT_1,s.rectAreaLTC2=ie.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_HALF_1,s.rectAreaLTC2=ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=h,s.ambient[2]=g;const B=s.hash;(B.directionalLength!==y||B.pointLength!==m||B.spotLength!==p||B.rectAreaLength!==M||B.hemiLength!==x||B.numDirectionalShadows!==T||B.numPointShadows!==P||B.numSpotShadows!==w||B.numSpotMaps!==A||B.numLightProbes!==v)&&(s.directional.length=y,s.spot.length=p,s.rectArea.length=M,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=w+A-V,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=V,s.numLightProbes=v,B.directionalLength=y,B.pointLength=m,B.spotLength=p,B.rectAreaLength=M,B.hemiLength=x,B.numDirectionalShadows=T,B.numPointShadows=P,B.numSpotShadows=w,B.numSpotMaps=A,B.numLightProbes=v,s.version=zm++)}function c(d,u){let f=0,h=0,g=0,y=0,m=0;const p=u.matrixWorldInverse;for(let M=0,x=d.length;M<x;M++){const T=d[M];if(T.isDirectionalLight){const P=s.directional[f];P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),f++}else if(T.isSpotLight){const P=s.spot[g];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),g++}else if(T.isRectAreaLight){const P=s.rectArea[y];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),o.identity(),a.copy(T.matrixWorld),a.premultiply(p),o.extractRotation(a),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),y++}else if(T.isPointLight){const P=s.point[h];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),h++}else if(T.isHemisphereLight){const P=s.hemi[m];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function Xa(i,e){const t=new Gm(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Vm(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Xa(i,e),t.set(r,[l])):a>=o.length?(l=new Xa(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Wm extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $m extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qm=`uniform sampler2D shadow_pass;
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
}`;function Ym(i,e,t){let n=new Ul;const s=new Ke,r=new Ke,a=new Tt,o=new Wm({depthPacking:zd}),l=new $m,c={},d=t.maxTextureSize,u={[xn]:Vt,[Vt]:xn,[Cn]:Cn},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:Xm,fragmentShader:qm}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new vn;g.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new tt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ll;let p=this.type;this.render=function(w,A,V){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const v=i.getRenderTarget(),b=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),H=i.state;H.setBlending(zn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const Q=p!==wn&&this.type===wn,C=p===wn&&this.type!==wn;for(let F=0,G=w.length;F<G;F++){const X=w[F],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const $=W.getFrameExtents();if(s.multiply($),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/$.x),s.x=r.x*$.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/$.y),s.y=r.y*$.y,W.mapSize.y=r.y)),W.map===null||Q===!0||C===!0){const ee=this.type!==wn?{minFilter:Ye,magFilter:Ye}:{};W.map!==null&&W.map.dispose(),W.map=new oi(s.x,s.y,ee),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const q=W.getViewportCount();for(let ee=0;ee<q;ee++){const te=W.getViewport(ee);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),H.viewport(a),W.updateMatrices(X,ee),n=W.getFrustum(),T(A,V,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===wn&&M(W,V),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(v,b,B)};function M(w,A){const V=e.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new oi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,V,f,y,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,V,h,y,null)}function x(w,A,V,v){let b=null;const B=V.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)b=B;else if(b=V.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=b.uuid,Q=A.uuid;let C=c[H];C===void 0&&(C={},c[H]=C);let F=C[Q];F===void 0&&(F=b.clone(),C[Q]=F,A.addEventListener("dispose",P)),b=F}if(b.visible=A.visible,b.wireframe=A.wireframe,v===wn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,V.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const H=i.properties.get(b);H.light=V}return b}function T(w,A,V,v,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===wn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld);const Q=e.update(w),C=w.material;if(Array.isArray(C)){const F=Q.groups;for(let G=0,X=F.length;G<X;G++){const W=F[G],$=C[W.materialIndex];if($&&$.visible){const q=x(w,$,v,b);w.onBeforeShadow(i,w,A,V,Q,q,W),i.renderBufferDirect(V,null,Q,q,w,W),w.onAfterShadow(i,w,A,V,Q,q,W)}}}else if(C.visible){const F=x(w,C,v,b);w.onBeforeShadow(i,w,A,V,Q,F,null),i.renderBufferDirect(V,null,Q,F,w,null),w.onAfterShadow(i,w,A,V,Q,F,null)}}const H=w.children;for(let Q=0,C=H.length;Q<C;Q++)T(H[Q],A,V,v,b)}function P(w){w.target.removeEventListener("dispose",P);for(const V in c){const v=c[V],b=w.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}function jm(i,e,t){const n=t.isWebGL2;function s(){let R=!1;const oe=new Tt;let ae=null;const Te=new Tt(0,0,0,0);return{setMask:function(ve){ae!==ve&&!R&&(i.colorMask(ve,ve,ve,ve),ae=ve)},setLocked:function(ve){R=ve},setClear:function(ve,Je,Qe,yt,Nt){Nt===!0&&(ve*=yt,Je*=yt,Qe*=yt),oe.set(ve,Je,Qe,yt),Te.equals(oe)===!1&&(i.clearColor(ve,Je,Qe,yt),Te.copy(oe))},reset:function(){R=!1,ae=null,Te.set(-1,0,0,0)}}}function r(){let R=!1,oe=null,ae=null,Te=null;return{setTest:function(ve){ve?Ue(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(ve){oe!==ve&&!R&&(i.depthMask(ve),oe=ve)},setFunc:function(ve){if(ae!==ve){switch(ve){case md:i.depthFunc(i.NEVER);break;case gd:i.depthFunc(i.ALWAYS);break;case yd:i.depthFunc(i.LESS);break;case Hs:i.depthFunc(i.LEQUAL);break;case _d:i.depthFunc(i.EQUAL);break;case xd:i.depthFunc(i.GEQUAL);break;case vd:i.depthFunc(i.GREATER);break;case Sd:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=ve}},setLocked:function(ve){R=ve},setClear:function(ve){Te!==ve&&(i.clearDepth(ve),Te=ve)},reset:function(){R=!1,oe=null,ae=null,Te=null}}}function a(){let R=!1,oe=null,ae=null,Te=null,ve=null,Je=null,Qe=null,yt=null,Nt=null;return{setTest:function(et){R||(et?Ue(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(et){oe!==et&&!R&&(i.stencilMask(et),oe=et)},setFunc:function(et,kt,un){(ae!==et||Te!==kt||ve!==un)&&(i.stencilFunc(et,kt,un),ae=et,Te=kt,ve=un)},setOp:function(et,kt,un){(Je!==et||Qe!==kt||yt!==un)&&(i.stencilOp(et,kt,un),Je=et,Qe=kt,yt=un)},setLocked:function(et){R=et},setClear:function(et){Nt!==et&&(i.clearStencil(et),Nt=et)},reset:function(){R=!1,oe=null,ae=null,Te=null,ve=null,Je=null,Qe=null,yt=null,Nt=null}}}const o=new s,l=new r,c=new a,d=new WeakMap,u=new WeakMap;let f={},h={},g=new WeakMap,y=[],m=null,p=!1,M=null,x=null,T=null,P=null,w=null,A=null,V=null,v=new Xe(0,0,0),b=0,B=!1,H=null,Q=null,C=null,F=null,G=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,$=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=$>=1):q.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=$>=2);let ee=null,te={};const z=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),ce=new Tt().fromArray(z),ye=new Tt().fromArray(Y);function ge(R,oe,ae,Te){const ve=new Uint8Array(4),Je=i.createTexture();i.bindTexture(R,Je),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Qe=0;Qe<ae;Qe++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(oe,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(oe+Qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Je}const Pe={};Pe[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pe[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(i.DEPTH_TEST),l.setFunc(Hs),Ne(!1),E(wo),Ue(i.CULL_FACE),fe(zn);function Ue(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function be(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function Ve(R,oe){return h[R]!==oe?(i.bindFramebuffer(R,oe),h[R]=oe,n&&(R===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),R===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe)),!0):!1}function D(R,oe){let ae=y,Te=!1;if(R)if(ae=g.get(oe),ae===void 0&&(ae=[],g.set(oe,ae)),R.isWebGLMultipleRenderTargets){const ve=R.texture;if(ae.length!==ve.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Je=0,Qe=ve.length;Je<Qe;Je++)ae[Je]=i.COLOR_ATTACHMENT0+Je;ae.length=ve.length,Te=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,Te=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,Te=!0);Te&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function It(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const xe={[ti]:i.FUNC_ADD,[ed]:i.FUNC_SUBTRACT,[td]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[Lo]=i.MIN,xe[Uo]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(xe[Lo]=R.MIN_EXT,xe[Uo]=R.MAX_EXT)}const Re={[nd]:i.ZERO,[id]:i.ONE,[sd]:i.SRC_COLOR,[Vr]:i.SRC_ALPHA,[dd]:i.SRC_ALPHA_SATURATE,[ld]:i.DST_COLOR,[od]:i.DST_ALPHA,[rd]:i.ONE_MINUS_SRC_COLOR,[Wr]:i.ONE_MINUS_SRC_ALPHA,[cd]:i.ONE_MINUS_DST_COLOR,[ad]:i.ONE_MINUS_DST_ALPHA,[ud]:i.CONSTANT_COLOR,[hd]:i.ONE_MINUS_CONSTANT_COLOR,[fd]:i.CONSTANT_ALPHA,[pd]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(R,oe,ae,Te,ve,Je,Qe,yt,Nt,et){if(R===zn){p===!0&&(be(i.BLEND),p=!1);return}if(p===!1&&(Ue(i.BLEND),p=!0),R!==Qc){if(R!==M||et!==B){if((x!==ti||w!==ti)&&(i.blendEquation(i.FUNC_ADD),x=ti,w=ti),et)switch(R){case Li:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ro:i.blendFunc(i.ONE,i.ONE);break;case Co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Li:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ro:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,P=null,A=null,V=null,v.set(0,0,0),b=0,M=R,B=et}return}ve=ve||oe,Je=Je||ae,Qe=Qe||Te,(oe!==x||ve!==w)&&(i.blendEquationSeparate(xe[oe],xe[ve]),x=oe,w=ve),(ae!==T||Te!==P||Je!==A||Qe!==V)&&(i.blendFuncSeparate(Re[ae],Re[Te],Re[Je],Re[Qe]),T=ae,P=Te,A=Je,V=Qe),(yt.equals(v)===!1||Nt!==b)&&(i.blendColor(yt.r,yt.g,yt.b,Nt),v.copy(yt),b=Nt),M=R,B=!1}function it(R,oe){R.side===Cn?be(i.CULL_FACE):Ue(i.CULL_FACE);let ae=R.side===Vt;oe&&(ae=!ae),Ne(ae),R.blending===Li&&R.transparent===!1?fe(zn):fe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),o.setMask(R.colorWrite);const Te=R.stencilWrite;c.setTest(Te),Te&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),N(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(R){H!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),H=R)}function E(R){R!==Zc?(Ue(i.CULL_FACE),R!==Q&&(R===wo?i.cullFace(i.BACK):R===Kc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),Q=R}function _(R){R!==C&&(W&&i.lineWidth(R),C=R)}function N(R,oe,ae){R?(Ue(i.POLYGON_OFFSET_FILL),(F!==oe||G!==ae)&&(i.polygonOffset(oe,ae),F=oe,G=ae)):be(i.POLYGON_OFFSET_FILL)}function K(R){R?Ue(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Z(R){R===void 0&&(R=i.TEXTURE0+X-1),ee!==R&&(i.activeTexture(R),ee=R)}function J(R,oe,ae){ae===void 0&&(ee===null?ae=i.TEXTURE0+X-1:ae=ee);let Te=te[ae];Te===void 0&&(Te={type:void 0,texture:void 0},te[ae]=Te),(Te.type!==R||Te.texture!==oe)&&(ee!==ae&&(i.activeTexture(ae),ee=ae),i.bindTexture(R,oe||Pe[R]),Te.type=R,Te.texture=oe)}function pe(){const R=te[ee];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function le(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ee(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ke(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function j(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function je(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function He(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function we(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function De(R){ce.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),ce.copy(R))}function qe(R){ye.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),ye.copy(R))}function ot(R,oe){let ae=u.get(oe);ae===void 0&&(ae=new WeakMap,u.set(oe,ae));let Te=ae.get(R);Te===void 0&&(Te=i.getUniformBlockIndex(oe,R.name),ae.set(R,Te))}function Oe(R,oe){const Te=u.get(oe).get(R);d.get(oe)!==Te&&(i.uniformBlockBinding(oe,Te,R.__bindingPointIndex),d.set(oe,Te))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ee=null,te={},h={},g=new WeakMap,y=[],m=null,p=!1,M=null,x=null,T=null,P=null,w=null,A=null,V=null,v=new Xe(0,0,0),b=0,B=!1,H=null,Q=null,C=null,F=null,G=null,ce.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:be,bindFramebuffer:Ve,drawBuffers:D,useProgram:It,setBlending:fe,setMaterial:it,setFlipSided:Ne,setCullFace:E,setLineWidth:_,setPolygonOffset:N,setScissorTest:K,activeTexture:Z,bindTexture:J,unbindTexture:pe,compressedTexImage2D:le,compressedTexImage3D:ue,texImage2D:_e,texImage3D:he,updateUBOMapping:ot,uniformBlockBinding:Oe,texStorage2D:He,texStorage3D:we,texSubImage2D:Ee,texSubImage3D:ke,compressedTexSubImage2D:j,compressedTexSubImage3D:je,scissor:De,viewport:qe,reset:ne}}function Zm(i,e,t,n,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let u;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return h?new OffscreenCanvas(E,_):es("canvas")}function y(E,_,N,K){let Z=1;if((E.width>K||E.height>K)&&(Z=K/Math.max(E.width,E.height)),Z<1||_===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const J=_?Kr:Math.floor,pe=J(Z*E.width),le=J(Z*E.height);u===void 0&&(u=g(pe,le));const ue=N?g(pe,le):u;return ue.width=pe,ue.height=le,ue.getContext("2d").drawImage(E,0,0,pe,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+pe+"x"+le+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return la(E.width)&&la(E.height)}function p(E){return o?!1:E.wrapS!==jt||E.wrapT!==jt||E.minFilter!==Ye&&E.minFilter!==Qt}function M(E,_){return E.generateMipmaps&&_&&E.minFilter!==Ye&&E.minFilter!==Qt}function x(E){i.generateMipmap(E)}function T(E,_,N,K,Z=!1){if(o===!1)return _;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let J=_;if(_===i.RED&&(N===i.FLOAT&&(J=i.R32F),N===i.HALF_FLOAT&&(J=i.R16F),N===i.UNSIGNED_BYTE&&(J=i.R8)),_===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(J=i.R8UI),N===i.UNSIGNED_SHORT&&(J=i.R16UI),N===i.UNSIGNED_INT&&(J=i.R32UI),N===i.BYTE&&(J=i.R8I),N===i.SHORT&&(J=i.R16I),N===i.INT&&(J=i.R32I)),_===i.RG&&(N===i.FLOAT&&(J=i.RG32F),N===i.HALF_FLOAT&&(J=i.RG16F),N===i.UNSIGNED_BYTE&&(J=i.RG8)),_===i.RGBA){const pe=Z?Gs:Ze.getTransfer(K);N===i.FLOAT&&(J=i.RGBA32F),N===i.HALF_FLOAT&&(J=i.RGBA16F),N===i.UNSIGNED_BYTE&&(J=pe===nt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function P(E,_,N){return M(E,N)===!0||E.isFramebufferTexture&&E.minFilter!==Ye&&E.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function w(E){return E===Ye||E===Do||E===or?i.NEAREST:i.LINEAR}function A(E){const _=E.target;_.removeEventListener("dispose",A),v(_),_.isVideoTexture&&d.delete(_)}function V(E){const _=E.target;_.removeEventListener("dispose",V),B(_)}function v(E){const _=n.get(E);if(_.__webglInit===void 0)return;const N=E.source,K=f.get(N);if(K){const Z=K[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(E),Object.keys(K).length===0&&f.delete(N)}n.remove(E)}function b(E){const _=n.get(E);i.deleteTexture(_.__webglTexture);const N=E.source,K=f.get(N);delete K[_.__cacheKey],a.memory.textures--}function B(E){const _=E.texture,N=n.get(E),K=n.get(_);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(N.__webglFramebuffer[Z]))for(let J=0;J<N.__webglFramebuffer[Z].length;J++)i.deleteFramebuffer(N.__webglFramebuffer[Z][J]);else i.deleteFramebuffer(N.__webglFramebuffer[Z]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[Z])}else{if(Array.isArray(N.__webglFramebuffer))for(let Z=0;Z<N.__webglFramebuffer.length;Z++)i.deleteFramebuffer(N.__webglFramebuffer[Z]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Z=0;Z<N.__webglColorRenderbuffer.length;Z++)N.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[Z]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Z=0,J=_.length;Z<J;Z++){const pe=n.get(_[Z]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(_[Z])}n.remove(_),n.remove(E)}let H=0;function Q(){H=0}function C(){const E=H;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),H+=1,E}function F(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function G(E,_){const N=n.get(E);if(E.isVideoTexture&&it(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(N,E,_);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+_)}function X(E,_){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ce(N,E,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+_)}function W(E,_){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ce(N,E,_);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+_)}function $(E,_){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ye(N,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+_)}const q={[qr]:i.REPEAT,[jt]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},ee={[Ye]:i.NEAREST,[Do]:i.NEAREST_MIPMAP_NEAREST,[or]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[Pd]:i.LINEAR_MIPMAP_NEAREST,[Ji]:i.LINEAR_MIPMAP_LINEAR},te={[Vd]:i.NEVER,[jd]:i.ALWAYS,[Wd]:i.LESS,[xl]:i.LEQUAL,[$d]:i.EQUAL,[Yd]:i.GEQUAL,[Xd]:i.GREATER,[qd]:i.NOTEQUAL};function z(E,_,N){if(N?(i.texParameteri(E,i.TEXTURE_WRAP_S,q[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,q[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,q[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ee[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ee[_.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(_.wrapS!==jt||_.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,w(_.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,w(_.minFilter)),_.minFilter!==Ye&&_.minFilter!==Qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,te[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const K=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===Ye||_.minFilter!==or&&_.minFilter!==Ji||_.type===Bn&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===Qi&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||n.get(_).__currentAnisotropy)&&(i.texParameterf(E,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy)}}function Y(E,_){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const K=_.source;let Z=f.get(K);Z===void 0&&(Z={},f.set(K,Z));const J=F(_);if(J!==E.__cacheKey){Z[J]===void 0&&(Z[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[J].usedTimes++;const pe=Z[E.__cacheKey];pe!==void 0&&(Z[E.__cacheKey].usedTimes--,pe.usedTimes===0&&b(_)),E.__cacheKey=J,E.__webglTexture=Z[J].texture}return N}function ce(E,_,N){let K=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(K=i.TEXTURE_3D);const Z=Y(E,_),J=_.source;t.bindTexture(K,E.__webglTexture,i.TEXTURE0+N);const pe=n.get(J);if(J.version!==pe.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const le=Ze.getPrimaries(Ze.workingColorSpace),ue=_.colorSpace===en?null:Ze.getPrimaries(_.colorSpace),Ee=_.colorSpace===en||le===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const ke=p(_)&&m(_.image)===!1;let j=y(_.image,ke,!1,s.maxTextureSize);j=Ne(_,j);const je=m(j)||o,He=r.convert(_.format,_.colorSpace);let we=r.convert(_.type),_e=T(_.internalFormat,He,we,_.colorSpace,_.isVideoTexture);z(K,_,je);let he;const De=_.mipmaps,qe=o&&_.isVideoTexture!==!0&&_e!==yl,ot=pe.__version===void 0||Z===!0,Oe=P(_,j,je);if(_.isDepthTexture)_e=i.DEPTH_COMPONENT,o?_.type===Bn?_e=i.DEPTH_COMPONENT32F:_.type===On?_e=i.DEPTH_COMPONENT24:_.type===ii?_e=i.DEPTH24_STENCIL8:_e=i.DEPTH_COMPONENT16:_.type===Bn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===si&&_e===i.DEPTH_COMPONENT&&_.type!==oo&&_.type!==On&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=On,we=r.convert(_.type)),_.format===Oi&&_e===i.DEPTH_COMPONENT&&(_e=i.DEPTH_STENCIL,_.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=ii,we=r.convert(_.type))),ot&&(qe?t.texStorage2D(i.TEXTURE_2D,1,_e,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,_e,j.width,j.height,0,He,we,null));else if(_.isDataTexture)if(De.length>0&&je){qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Oe,_e,De[0].width,De[0].height);for(let ne=0,R=De.length;ne<R;ne++)he=De[ne],qe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,he.width,he.height,He,we,he.data):t.texImage2D(i.TEXTURE_2D,ne,_e,he.width,he.height,0,He,we,he.data);_.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(i.TEXTURE_2D,Oe,_e,j.width,j.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,j.width,j.height,He,we,j.data)):t.texImage2D(i.TEXTURE_2D,0,_e,j.width,j.height,0,He,we,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){qe&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,_e,De[0].width,De[0].height,j.depth);for(let ne=0,R=De.length;ne<R;ne++)he=De[ne],_.format!==ln?He!==null?qe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,he.width,he.height,j.depth,He,he.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,_e,he.width,he.height,j.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,he.width,he.height,j.depth,He,we,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,_e,he.width,he.height,j.depth,0,He,we,he.data)}else{qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Oe,_e,De[0].width,De[0].height);for(let ne=0,R=De.length;ne<R;ne++)he=De[ne],_.format!==ln?He!==null?qe?t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,he.width,he.height,He,he.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,_e,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,he.width,he.height,He,we,he.data):t.texImage2D(i.TEXTURE_2D,ne,_e,he.width,he.height,0,He,we,he.data)}else if(_.isDataArrayTexture)qe?(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,_e,j.width,j.height,j.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,He,we,j.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,j.width,j.height,j.depth,0,He,we,j.data);else if(_.isData3DTexture)qe?(ot&&t.texStorage3D(i.TEXTURE_3D,Oe,_e,j.width,j.height,j.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,He,we,j.data)):t.texImage3D(i.TEXTURE_3D,0,_e,j.width,j.height,j.depth,0,He,we,j.data);else if(_.isFramebufferTexture){if(ot)if(qe)t.texStorage2D(i.TEXTURE_2D,Oe,_e,j.width,j.height);else{let ne=j.width,R=j.height;for(let oe=0;oe<Oe;oe++)t.texImage2D(i.TEXTURE_2D,oe,_e,ne,R,0,He,we,null),ne>>=1,R>>=1}}else if(De.length>0&&je){qe&&ot&&t.texStorage2D(i.TEXTURE_2D,Oe,_e,De[0].width,De[0].height);for(let ne=0,R=De.length;ne<R;ne++)he=De[ne],qe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,He,we,he):t.texImage2D(i.TEXTURE_2D,ne,_e,He,we,he);_.generateMipmaps=!1}else qe?(ot&&t.texStorage2D(i.TEXTURE_2D,Oe,_e,j.width,j.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,we,j)):t.texImage2D(i.TEXTURE_2D,0,_e,He,we,j);M(_,je)&&x(K),pe.__version=J.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ye(E,_,N){if(_.image.length!==6)return;const K=Y(E,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const J=n.get(Z);if(Z.version!==J.__version||K===!0){t.activeTexture(i.TEXTURE0+N);const pe=Ze.getPrimaries(Ze.workingColorSpace),le=_.colorSpace===en?null:Ze.getPrimaries(_.colorSpace),ue=_.colorSpace===en||pe===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ee=_.isCompressedTexture||_.image[0].isCompressedTexture,ke=_.image[0]&&_.image[0].isDataTexture,j=[];for(let ne=0;ne<6;ne++)!Ee&&!ke?j[ne]=y(_.image[ne],!1,!0,s.maxCubemapSize):j[ne]=ke?_.image[ne].image:_.image[ne],j[ne]=Ne(_,j[ne]);const je=j[0],He=m(je)||o,we=r.convert(_.format,_.colorSpace),_e=r.convert(_.type),he=T(_.internalFormat,we,_e,_.colorSpace),De=o&&_.isVideoTexture!==!0,qe=J.__version===void 0||K===!0;let ot=P(_,je,He);z(i.TEXTURE_CUBE_MAP,_,He);let Oe;if(Ee){De&&qe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,he,je.width,je.height);for(let ne=0;ne<6;ne++){Oe=j[ne].mipmaps;for(let R=0;R<Oe.length;R++){const oe=Oe[R];_.format!==ln?we!==null?De?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,oe.width,oe.height,we,oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,he,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,0,0,oe.width,oe.height,we,_e,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R,he,oe.width,oe.height,0,we,_e,oe.data)}}}else{Oe=_.mipmaps,De&&qe&&(Oe.length>0&&ot++,t.texStorage2D(i.TEXTURE_CUBE_MAP,ot,he,j[0].width,j[0].height));for(let ne=0;ne<6;ne++)if(ke){De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,j[ne].width,j[ne].height,we,_e,j[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,he,j[ne].width,j[ne].height,0,we,_e,j[ne].data);for(let R=0;R<Oe.length;R++){const ae=Oe[R].image[ne].image;De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,ae.width,ae.height,we,_e,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,he,ae.width,ae.height,0,we,_e,ae.data)}}else{De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,we,_e,j[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,he,we,_e,j[ne]);for(let R=0;R<Oe.length;R++){const oe=Oe[R];De?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,0,0,we,_e,oe.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,R+1,he,we,_e,oe.image[ne])}}}M(_,He)&&x(i.TEXTURE_CUBE_MAP),J.__version=Z.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ge(E,_,N,K,Z,J){const pe=r.convert(N.format,N.colorSpace),le=r.convert(N.type),ue=T(N.internalFormat,pe,le,N.colorSpace);if(!n.get(_).__hasExternalTextures){const ke=Math.max(1,_.width>>J),j=Math.max(1,_.height>>J);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,J,ue,ke,j,_.depth,0,pe,le,null):t.texImage2D(Z,J,ue,ke,j,0,pe,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,n.get(N).__webglTexture,0,Re(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,n.get(N).__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(E,_,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer&&!_.stencilBuffer){let K=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||fe(_)){const Z=_.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Bn?K=i.DEPTH_COMPONENT32F:Z.type===On&&(K=i.DEPTH_COMPONENT24));const J=Re(_);fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,K,_.width,_.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,J,K,_.width,_.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,_.width,_.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(_.depthBuffer&&_.stencilBuffer){const K=Re(_);N&&fe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,_.width,_.height):fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const K=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let Z=0;Z<K.length;Z++){const J=K[Z],pe=r.convert(J.format,J.colorSpace),le=r.convert(J.type),ue=T(J.internalFormat,pe,le,J.colorSpace),Ee=Re(_);N&&fe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,ue,_.width,_.height):fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,ue,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),G(_.depthTexture,0);const K=n.get(_.depthTexture).__webglTexture,Z=Re(_);if(_.depthTexture.format===si)fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(_.depthTexture.format===Oi)fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function be(E){const _=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ue(_.__webglFramebuffer,E)}else if(N){_.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[K]),_.__webglDepthbuffer[K]=i.createRenderbuffer(),Pe(_.__webglDepthbuffer[K],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),Pe(_.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ve(E,_,N){const K=n.get(E);_!==void 0&&ge(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&be(E)}function D(E){const _=E.texture,N=n.get(E),K=n.get(_);E.addEventListener("dispose",V),E.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=_.version,a.memory.textures++);const Z=E.isWebGLCubeRenderTarget===!0,J=E.isWebGLMultipleRenderTargets===!0,pe=m(E)||o;if(Z){N.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer[le]=[];for(let ue=0;ue<_.mipmaps.length;ue++)N.__webglFramebuffer[le][ue]=i.createFramebuffer()}else N.__webglFramebuffer[le]=i.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){N.__webglFramebuffer=[];for(let le=0;le<_.mipmaps.length;le++)N.__webglFramebuffer[le]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(J)if(s.drawBuffers){const le=E.texture;for(let ue=0,Ee=le.length;ue<Ee;ue++){const ke=n.get(le[ue]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&fe(E)===!1){const le=J?_:[_];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ue=0;ue<le.length;ue++){const Ee=le[ue];N.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ue]);const ke=r.convert(Ee.format,Ee.colorSpace),j=r.convert(Ee.type),je=T(Ee.internalFormat,ke,j,Ee.colorSpace,E.isXRRenderTarget===!0),He=Re(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,je,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,N.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),z(i.TEXTURE_CUBE_MAP,_,pe);for(let le=0;le<6;le++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ge(N.__webglFramebuffer[le][ue],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ue);else ge(N.__webglFramebuffer[le],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);M(_,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){const le=E.texture;for(let ue=0,Ee=le.length;ue<Ee;ue++){const ke=le[ue],j=n.get(ke);t.bindTexture(i.TEXTURE_2D,j.__webglTexture),z(i.TEXTURE_2D,ke,pe),ge(N.__webglFramebuffer,E,ke,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),M(ke,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,K.__webglTexture),z(le,_,pe),o&&_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ge(N.__webglFramebuffer[ue],E,_,i.COLOR_ATTACHMENT0,le,ue);else ge(N.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,le,0);M(_,pe)&&x(le),t.unbindTexture()}E.depthBuffer&&be(E)}function It(E){const _=m(E)||o,N=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let K=0,Z=N.length;K<Z;K++){const J=N[K];if(M(J,_)){const pe=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(J).__webglTexture;t.bindTexture(pe,le),x(pe),t.unbindTexture()}}}function xe(E){if(o&&E.samples>0&&fe(E)===!1){const _=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],N=E.width,K=E.height;let Z=i.COLOR_BUFFER_BIT;const J=[],pe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(E),ue=E.isWebGLMultipleRenderTargets===!0;if(ue)for(let Ee=0;Ee<_.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Ee=0;Ee<_.length;Ee++){J.push(i.COLOR_ATTACHMENT0+Ee),E.depthBuffer&&J.push(pe);const ke=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(ke===!1&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ue&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[Ee]),ke===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),ue){const j=n.get(_[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,N,K,0,0,N,K,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Ee=0;Ee<_.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,le.__webglColorRenderbuffer[Ee]);const ke=n.get(_[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Re(E){return Math.min(s.maxSamples,E.samples)}function fe(E){const _=n.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function it(E){const _=a.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function Ne(E,_){const N=E.colorSpace,K=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===jr||N!==Ln&&N!==en&&(Ze.getTransfer(N)===nt?o===!1?e.has("EXT_sRGB")===!0&&K===ln?(E.format=jr,E.minFilter=Qt,E.generateMipmaps=!1):_=Sl.sRGBToLinear(_):(K!==ln||Z!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),_}this.allocateTextureUnit=C,this.resetTextureUnits=Q,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=$,this.rebindTextures=Ve,this.setupRenderTarget=D,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function Km(i,e,t){const n=t.isWebGL2;function s(r,a=en){let o;const l=Ze.getTransfer(a);if(r===Gn)return i.UNSIGNED_BYTE;if(r===hl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===fl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Ld)return i.BYTE;if(r===Ud)return i.SHORT;if(r===oo)return i.UNSIGNED_SHORT;if(r===ul)return i.INT;if(r===On)return i.UNSIGNED_INT;if(r===Bn)return i.FLOAT;if(r===Qi)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Dd)return i.ALPHA;if(r===ln)return i.RGBA;if(r===Id)return i.LUMINANCE;if(r===Nd)return i.LUMINANCE_ALPHA;if(r===si)return i.DEPTH_COMPONENT;if(r===Oi)return i.DEPTH_STENCIL;if(r===jr)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===kd)return i.RED;if(r===pl)return i.RED_INTEGER;if(r===Fd)return i.RG;if(r===ml)return i.RG_INTEGER;if(r===gl)return i.RGBA_INTEGER;if(r===ar||r===lr||r===cr||r===dr)if(l===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===ar)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===lr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===cr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===ar)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===lr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===cr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===dr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Io||r===No||r===ko||r===Fo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Io)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===No)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ko)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Fo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===yl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Oo||r===Bo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Oo)return l===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Bo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===zo||r===Ho||r===Go||r===Vo||r===Wo||r===$o||r===Xo||r===qo||r===Yo||r===jo||r===Zo||r===Ko||r===Jo||r===Qo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===zo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ho)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Go)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Vo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Wo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===$o)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Xo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===qo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Yo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===jo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Zo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ko)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Jo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Qo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ur||r===ea||r===ta)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===ur)return l===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ea)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ta)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Od||r===na||r===ia||r===sa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===ur)return o.COMPRESSED_RED_RGTC1_EXT;if(r===na)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ia)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===sa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ii?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Jm extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ps extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ps,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ps,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ps,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=d.position.distanceTo(u.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ps;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class eg extends zi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,u=null,f=null,h=null,g=null;const y=t.getContextAttributes();let m=null,p=null;const M=[],x=[],T=new Ke;let P=null;const w=new an;w.layers.enable(1),w.viewport=new Tt;const A=new an;A.layers.enable(2),A.viewport=new Tt;const V=[w,A],v=new Jm;v.layers.enable(1),v.layers.enable(2);let b=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let Y=M[z];return Y===void 0&&(Y=new kr,M[z]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(z){let Y=M[z];return Y===void 0&&(Y=new kr,M[z]=Y),Y.getGripSpace()},this.getHand=function(z){let Y=M[z];return Y===void 0&&(Y=new kr,M[z]=Y),Y.getHandSpace()};function H(z){const Y=x.indexOf(z.inputSource);if(Y===-1)return;const ce=M[Y];ce!==void 0&&(ce.update(z.inputSource,z.frame,c||a),ce.dispatchEvent({type:z.type,data:z.inputSource}))}function Q(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",C);for(let z=0;z<M.length;z++){const Y=x[z];Y!==null&&(x[z]=null,M[z].disconnect(Y))}b=null,B=null,e.setRenderTarget(m),h=null,f=null,u=null,s=null,p=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",C),y.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:s.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),p=new oi(h.framebufferWidth,h.framebufferHeight,{format:ln,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Y=null,ce=null,ye=null;y.depth&&(ye=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=y.stencil?Oi:si,ce=y.stencil?ii:On);const ge={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new oi(f.textureWidth,f.textureHeight,{format:ln,type:Gn,depthTexture:new Nl(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Pe=e.properties.get(p);Pe.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function C(z){for(let Y=0;Y<z.removed.length;Y++){const ce=z.removed[Y],ye=x.indexOf(ce);ye>=0&&(x[ye]=null,M[ye].disconnect(ce))}for(let Y=0;Y<z.added.length;Y++){const ce=z.added[Y];let ye=x.indexOf(ce);if(ye===-1){for(let Pe=0;Pe<M.length;Pe++)if(Pe>=x.length){x.push(ce),ye=Pe;break}else if(x[Pe]===null){x[Pe]=ce,ye=Pe;break}if(ye===-1)break}const ge=M[ye];ge&&ge.connect(ce)}}const F=new U,G=new U;function X(z,Y,ce){F.setFromMatrixPosition(Y.matrixWorld),G.setFromMatrixPosition(ce.matrixWorld);const ye=F.distanceTo(G),ge=Y.projectionMatrix.elements,Pe=ce.projectionMatrix.elements,Ue=ge[14]/(ge[10]-1),be=ge[14]/(ge[10]+1),Ve=(ge[9]+1)/ge[5],D=(ge[9]-1)/ge[5],It=(ge[8]-1)/ge[0],xe=(Pe[8]+1)/Pe[0],Re=Ue*It,fe=Ue*xe,it=ye/(-It+xe),Ne=it*-It;Y.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ne),z.translateZ(it),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const E=Ue+it,_=be+it,N=Re-Ne,K=fe+(ye-Ne),Z=Ve*be/_*E,J=D*be/_*E;z.projectionMatrix.makePerspective(N,K,Z,J,E,_),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function W(z,Y){Y===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(Y.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;v.near=A.near=w.near=z.near,v.far=A.far=w.far=z.far,(b!==v.near||B!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),b=v.near,B=v.far);const Y=z.parent,ce=v.cameras;W(v,Y);for(let ye=0;ye<ce.length;ye++)W(ce[ye],Y);ce.length===2?X(v,w,A):v.projectionMatrix.copy(w.projectionMatrix),$(z,v,Y)};function $(z,Y,ce){ce===null?z.matrix.copy(Y.matrixWorld):(z.matrix.copy(ce.matrixWorld),z.matrix.invert(),z.matrix.multiply(Y.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(Y.projectionMatrix),z.projectionMatrixInverse.copy(Y.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Zr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)};let q=null;function ee(z,Y){if(d=Y.getViewerPose(c||a),g=Y,d!==null){const ce=d.views;h!==null&&(e.setRenderTargetFramebuffer(p,h.framebuffer),e.setRenderTarget(p));let ye=!1;ce.length!==v.cameras.length&&(v.cameras.length=0,ye=!0);for(let ge=0;ge<ce.length;ge++){const Pe=ce[ge];let Ue=null;if(h!==null)Ue=h.getViewport(Pe);else{const Ve=u.getViewSubImage(f,Pe);Ue=Ve.viewport,ge===0&&(e.setRenderTargetTextures(p,Ve.colorTexture,f.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(p))}let be=V[ge];be===void 0&&(be=new an,be.layers.enable(ge),be.viewport=new Tt,V[ge]=be),be.matrix.fromArray(Pe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Pe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),ge===0&&(v.matrix.copy(be.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ye===!0&&v.cameras.push(be)}}for(let ce=0;ce<M.length;ce++){const ye=x[ce],ge=M[ce];ye!==null&&ge!==void 0&&ge.update(ye,Y,c||a)}q&&q(z,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}const te=new Dl;te.setAnimationLoop(ee),this.setAnimationLoop=function(z){q=z},this.dispose=function(){}}}function tg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Cl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,x,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ng(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){const T=x.program;n.uniformBlockBinding(M,T)}function c(M,x){let T=s[M.id];T===void 0&&(g(M),T=d(M),s[M.id]=T,M.addEventListener("dispose",m));const P=x.program;n.updateUBOMapping(M,P);const w=e.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function d(M){const x=u();M.__bindingPointIndex=x;const T=i.createBuffer(),P=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,P,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,T),T}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const x=s[M.id],T=M.uniforms,P=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,A=T.length;w<A;w++){const V=Array.isArray(T[w])?T[w]:[T[w]];for(let v=0,b=V.length;v<b;v++){const B=V[v];if(h(B,w,v,P)===!0){const H=B.__offset,Q=Array.isArray(B.value)?B.value:[B.value];let C=0;for(let F=0;F<Q.length;F++){const G=Q[F],X=y(G);typeof G=="number"||typeof G=="boolean"?(B.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,H+C,B.__data)):G.isMatrix3?(B.__data[0]=G.elements[0],B.__data[1]=G.elements[1],B.__data[2]=G.elements[2],B.__data[3]=0,B.__data[4]=G.elements[3],B.__data[5]=G.elements[4],B.__data[6]=G.elements[5],B.__data[7]=0,B.__data[8]=G.elements[6],B.__data[9]=G.elements[7],B.__data[10]=G.elements[8],B.__data[11]=0):(G.toArray(B.__data,C),C+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,B.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(M,x,T,P){const w=M.value,A=x+"_"+T;if(P[A]===void 0)return typeof w=="number"||typeof w=="boolean"?P[A]=w:P[A]=w.clone(),!0;{const V=P[A];if(typeof w=="number"||typeof w=="boolean"){if(V!==w)return P[A]=w,!0}else if(V.equals(w)===!1)return V.copy(w),!0}return!1}function g(M){const x=M.uniforms;let T=0;const P=16;for(let A=0,V=x.length;A<V;A++){const v=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,B=v.length;b<B;b++){const H=v[b],Q=Array.isArray(H.value)?H.value:[H.value];for(let C=0,F=Q.length;C<F;C++){const G=Q[C],X=y(G),W=T%P;W!==0&&P-W<X.boundary&&(T+=P-W),H.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=T,T+=X.storage}}}const w=T%P;return w>0&&(T+=P-w),M.__size=T,M.__cache={},this}function y(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Hl{constructor(e={}){const{canvas:t=Kd(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const h=new Uint32Array(4),g=new Int32Array(4);let y=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let T=!1,P=0,w=0,A=null,V=-1,v=null;const b=new Tt,B=new Tt;let H=null;const Q=new Xe(0);let C=0,F=t.width,G=t.height,X=1,W=null,$=null;const q=new Tt(0,0,F,G),ee=new Tt(0,0,F,G);let te=!1;const z=new Ul;let Y=!1,ce=!1,ye=null;const ge=new St,Pe=new Ke,Ue=new U,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return A===null?X:1}let D=n;function It(S,L){for(let k=0;k<S.length;k++){const O=S[k],I=t.getContext(O,L);if(I!==null)return I}return null}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ro}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",oe,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&L.shift(),D=It(L,S),D===null)throw It(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let xe,Re,fe,it,Ne,E,_,N,K,Z,J,pe,le,ue,Ee,ke,j,je,He,we,_e,he,De,qe;function ot(){xe=new hp(D),Re=new op(D,xe,e),xe.init(Re),he=new Km(D,xe,Re),fe=new jm(D,xe,Re),it=new mp(D),Ne=new Nm,E=new Zm(D,xe,fe,Ne,Re,he,it),_=new lp(x),N=new up(x),K=new Mu(D,Re),De=new sp(D,xe,K,Re),Z=new fp(D,K,it,De),J=new xp(D,Z,K,it),He=new _p(D,Re,E),ke=new ap(Ne),pe=new Im(x,_,N,xe,Re,De,ke),le=new tg(x,Ne),ue=new Fm,Ee=new Vm(xe,Re),je=new ip(x,_,N,fe,J,f,l),j=new Ym(x,J,Re),qe=new ng(D,it,Re,fe),we=new rp(D,xe,it,Re),_e=new pp(D,xe,it,Re),it.programs=pe.programs,x.capabilities=Re,x.extensions=xe,x.properties=Ne,x.renderLists=ue,x.shadowMap=j,x.state=fe,x.info=it}ot();const Oe=new eg(x,D);this.xr=Oe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=xe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=xe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(F,G,!1))},this.getSize=function(S){return S.set(F,G)},this.setSize=function(S,L,k=!0){if(Oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=S,G=L,t.width=Math.floor(S*X),t.height=Math.floor(L*X),k===!0&&(t.style.width=S+"px",t.style.height=L+"px"),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(F*X,G*X).floor()},this.setDrawingBufferSize=function(S,L,k){F=S,G=L,X=k,t.width=Math.floor(S*k),t.height=Math.floor(L*k),this.setViewport(0,0,S,L)},this.getCurrentViewport=function(S){return S.copy(b)},this.getViewport=function(S){return S.copy(q)},this.setViewport=function(S,L,k,O){S.isVector4?q.set(S.x,S.y,S.z,S.w):q.set(S,L,k,O),fe.viewport(b.copy(q).multiplyScalar(X).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,L,k,O){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,L,k,O),fe.scissor(B.copy(ee).multiplyScalar(X).floor())},this.getScissorTest=function(){return te},this.setScissorTest=function(S){fe.setScissorTest(te=S)},this.setOpaqueSort=function(S){W=S},this.setTransparentSort=function(S){$=S},this.getClearColor=function(S){return S.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(S=!0,L=!0,k=!0){let O=0;if(S){let I=!1;if(A!==null){const de=A.texture.format;I=de===gl||de===ml||de===pl}if(I){const de=A.texture.type,me=de===Gn||de===On||de===oo||de===ii||de===hl||de===fl,Me=je.getClearColor(),Ae=je.getClearAlpha(),Fe=Me.r,Ce=Me.g,Le=Me.b;me?(h[0]=Fe,h[1]=Ce,h[2]=Le,h[3]=Ae,D.clearBufferuiv(D.COLOR,0,h)):(g[0]=Fe,g[1]=Ce,g[2]=Le,g[3]=Ae,D.clearBufferiv(D.COLOR,0,g))}else O|=D.COLOR_BUFFER_BIT}L&&(O|=D.DEPTH_BUFFER_BIT),k&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),ue.dispose(),Ee.dispose(),Ne.dispose(),_.dispose(),N.dispose(),J.dispose(),De.dispose(),qe.dispose(),pe.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",Nt),Oe.removeEventListener("sessionend",et),ye&&(ye.dispose(),ye=null),kt.stop()};function ne(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=it.autoReset,L=j.enabled,k=j.autoUpdate,O=j.needsUpdate,I=j.type;ot(),it.autoReset=S,j.enabled=L,j.autoUpdate=k,j.needsUpdate=O,j.type=I}function oe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const L=S.target;L.removeEventListener("dispose",ae),Te(L)}function Te(S){ve(S),Ne.remove(S)}function ve(S){const L=Ne.get(S).programs;L!==void 0&&(L.forEach(function(k){pe.releaseProgram(k)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,k,O,I,de){L===null&&(L=be);const me=I.isMesh&&I.matrixWorld.determinant()<0,Me=Ql(S,L,k,O,I);fe.setMaterial(O,me);let Ae=k.index,Fe=1;if(O.wireframe===!0){if(Ae=Z.getWireframeAttribute(k),Ae===void 0)return;Fe=2}const Ce=k.drawRange,Le=k.attributes.position;let lt=Ce.start*Fe,$t=(Ce.start+Ce.count)*Fe;de!==null&&(lt=Math.max(lt,de.start*Fe),$t=Math.min($t,(de.start+de.count)*Fe)),Ae!==null?(lt=Math.max(lt,0),$t=Math.min($t,Ae.count)):Le!=null&&(lt=Math.max(lt,0),$t=Math.min($t,Le.count));const _t=$t-lt;if(_t<0||_t===1/0)return;De.setup(I,O,Me,k,Ae);let Sn,st=we;if(Ae!==null&&(Sn=K.get(Ae),st=_e,st.setIndex(Sn)),I.isMesh)O.wireframe===!0?(fe.setLineWidth(O.wireframeLinewidth*Ve()),st.setMode(D.LINES)):st.setMode(D.TRIANGLES);else if(I.isLine){let Be=O.linewidth;Be===void 0&&(Be=1),fe.setLineWidth(Be*Ve()),I.isLineSegments?st.setMode(D.LINES):I.isLineLoop?st.setMode(D.LINE_LOOP):st.setMode(D.LINE_STRIP)}else I.isPoints?st.setMode(D.POINTS):I.isSprite&&st.setMode(D.TRIANGLES);if(I.isBatchedMesh)st.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)st.renderInstances(lt,_t,I.count);else if(k.isInstancedBufferGeometry){const Be=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,er=Math.min(k.instanceCount,Be);st.renderInstances(lt,_t,er)}else st.render(lt,_t)};function Je(S,L,k){S.transparent===!0&&S.side===Cn&&S.forceSinglePass===!1?(S.side=Vt,S.needsUpdate=!0,as(S,L,k),S.side=xn,S.needsUpdate=!0,as(S,L,k),S.side=Cn):as(S,L,k)}this.compile=function(S,L,k=null){k===null&&(k=S),m=Ee.get(k),m.init(),M.push(m),k.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),S!==k&&S.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),m.setupLights(x._useLegacyLights);const O=new Set;return S.traverse(function(I){const de=I.material;if(de)if(Array.isArray(de))for(let me=0;me<de.length;me++){const Me=de[me];Je(Me,k,I),O.add(Me)}else Je(de,k,I),O.add(de)}),M.pop(),m=null,O},this.compileAsync=function(S,L,k=null){const O=this.compile(S,L,k);return new Promise(I=>{function de(){if(O.forEach(function(me){Ne.get(me).currentProgram.isReady()&&O.delete(me)}),O.size===0){I(S);return}setTimeout(de,10)}xe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Qe=null;function yt(S){Qe&&Qe(S)}function Nt(){kt.stop()}function et(){kt.start()}const kt=new Dl;kt.setAnimationLoop(yt),typeof self<"u"&&kt.setContext(self),this.setAnimationLoop=function(S){Qe=S,Oe.setAnimationLoop(S),S===null?kt.stop():kt.start()},Oe.addEventListener("sessionstart",Nt),Oe.addEventListener("sessionend",et),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(L),L=Oe.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,L,A),m=Ee.get(S,M.length),m.init(),M.push(m),ge.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),z.setFromProjectionMatrix(ge),ce=this.localClippingEnabled,Y=ke.init(this.clippingPlanes,ce),y=ue.get(S,p.length),y.init(),p.push(y),un(S,L,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(W,$),this.info.render.frame++,Y===!0&&ke.beginShadows();const k=m.state.shadowsArray;if(j.render(k,S,L),Y===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),je.render(y,S),m.setupLights(x._useLegacyLights),L.isArrayCamera){const O=L.cameras;for(let I=0,de=O.length;I<de;I++){const me=O[I];po(y,S,me,me.viewport)}}else po(y,S,L);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,L),De.resetDefaultState(),V=-1,v=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function un(S,L,k,O){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||z.intersectsSprite(S)){O&&Ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=J.update(S),Me=S.material;Me.visible&&y.push(S,me,Me,k,Ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||z.intersectsObject(S))){const me=J.update(S),Me=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ue.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ue.copy(me.boundingSphere.center)),Ue.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(Me)){const Ae=me.groups;for(let Fe=0,Ce=Ae.length;Fe<Ce;Fe++){const Le=Ae[Fe],lt=Me[Le.materialIndex];lt&&lt.visible&&y.push(S,me,lt,k,Ue.z,Le)}}else Me.visible&&y.push(S,me,Me,k,Ue.z,null)}}const de=S.children;for(let me=0,Me=de.length;me<Me;me++)un(de[me],L,k,O)}function po(S,L,k,O){const I=S.opaque,de=S.transmissive,me=S.transparent;m.setupLightsView(k),Y===!0&&ke.setGlobalState(x.clippingPlanes,k),de.length>0&&Jl(I,de,L,k),O&&fe.viewport(b.copy(O)),I.length>0&&os(I,L,k),de.length>0&&os(de,L,k),me.length>0&&os(me,L,k),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Jl(S,L,k,O){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const de=Re.isWebGL2;ye===null&&(ye=new oi(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Qi:Gn,minFilter:Ji,samples:de?4:0})),x.getDrawingBufferSize(Pe),de?ye.setSize(Pe.x,Pe.y):ye.setSize(Kr(Pe.x),Kr(Pe.y));const me=x.getRenderTarget();x.setRenderTarget(ye),x.getClearColor(Q),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Me=x.toneMapping;x.toneMapping=Hn,os(S,k,O),E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye);let Ae=!1;for(let Fe=0,Ce=L.length;Fe<Ce;Fe++){const Le=L[Fe],lt=Le.object,$t=Le.geometry,_t=Le.material,Sn=Le.group;if(_t.side===Cn&&lt.layers.test(O.layers)){const st=_t.side;_t.side=Vt,_t.needsUpdate=!0,mo(lt,k,O,$t,_t,Sn),_t.side=st,_t.needsUpdate=!0,Ae=!0}}Ae===!0&&(E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye)),x.setRenderTarget(me),x.setClearColor(Q,C),x.toneMapping=Me}function os(S,L,k){const O=L.isScene===!0?L.overrideMaterial:null;for(let I=0,de=S.length;I<de;I++){const me=S[I],Me=me.object,Ae=me.geometry,Fe=O===null?me.material:O,Ce=me.group;Me.layers.test(k.layers)&&mo(Me,L,k,Ae,Fe,Ce)}}function mo(S,L,k,O,I,de){S.onBeforeRender(x,L,k,O,I,de),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),I.onBeforeRender(x,L,k,O,S,de),I.transparent===!0&&I.side===Cn&&I.forceSinglePass===!1?(I.side=Vt,I.needsUpdate=!0,x.renderBufferDirect(k,L,O,I,S,de),I.side=xn,I.needsUpdate=!0,x.renderBufferDirect(k,L,O,I,S,de),I.side=Cn):x.renderBufferDirect(k,L,O,I,S,de),S.onAfterRender(x,L,k,O,I,de)}function as(S,L,k){L.isScene!==!0&&(L=be);const O=Ne.get(S),I=m.state.lights,de=m.state.shadowsArray,me=I.state.version,Me=pe.getParameters(S,I.state,de,L,k),Ae=pe.getProgramCacheKey(Me);let Fe=O.programs;O.environment=S.isMeshStandardMaterial?L.environment:null,O.fog=L.fog,O.envMap=(S.isMeshStandardMaterial?N:_).get(S.envMap||O.environment),Fe===void 0&&(S.addEventListener("dispose",ae),Fe=new Map,O.programs=Fe);let Ce=Fe.get(Ae);if(Ce!==void 0){if(O.currentProgram===Ce&&O.lightsStateVersion===me)return yo(S,Me),Ce}else Me.uniforms=pe.getUniforms(S),S.onBuild(k,Me,x),S.onBeforeCompile(Me,x),Ce=pe.acquireProgram(Me,Ae),Fe.set(Ae,Ce),O.uniforms=Me.uniforms;const Le=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Le.clippingPlanes=ke.uniform),yo(S,Me),O.needsLights=tc(S),O.lightsStateVersion=me,O.needsLights&&(Le.ambientLightColor.value=I.state.ambient,Le.lightProbe.value=I.state.probe,Le.directionalLights.value=I.state.directional,Le.directionalLightShadows.value=I.state.directionalShadow,Le.spotLights.value=I.state.spot,Le.spotLightShadows.value=I.state.spotShadow,Le.rectAreaLights.value=I.state.rectArea,Le.ltc_1.value=I.state.rectAreaLTC1,Le.ltc_2.value=I.state.rectAreaLTC2,Le.pointLights.value=I.state.point,Le.pointLightShadows.value=I.state.pointShadow,Le.hemisphereLights.value=I.state.hemi,Le.directionalShadowMap.value=I.state.directionalShadowMap,Le.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Le.spotShadowMap.value=I.state.spotShadowMap,Le.spotLightMatrix.value=I.state.spotLightMatrix,Le.spotLightMap.value=I.state.spotLightMap,Le.pointShadowMap.value=I.state.pointShadowMap,Le.pointShadowMatrix.value=I.state.pointShadowMatrix),O.currentProgram=Ce,O.uniformsList=null,Ce}function go(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=Is.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function yo(S,L){const k=Ne.get(S);k.outputColorSpace=L.outputColorSpace,k.batching=L.batching,k.instancing=L.instancing,k.instancingColor=L.instancingColor,k.skinning=L.skinning,k.morphTargets=L.morphTargets,k.morphNormals=L.morphNormals,k.morphColors=L.morphColors,k.morphTargetsCount=L.morphTargetsCount,k.numClippingPlanes=L.numClippingPlanes,k.numIntersection=L.numClipIntersection,k.vertexAlphas=L.vertexAlphas,k.vertexTangents=L.vertexTangents,k.toneMapping=L.toneMapping}function Ql(S,L,k,O,I){L.isScene!==!0&&(L=be),E.resetTextureUnits();const de=L.fog,me=O.isMeshStandardMaterial?L.environment:null,Me=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ln,Ae=(O.isMeshStandardMaterial?N:_).get(O.envMap||me),Fe=O.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ce=!!k.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Le=!!k.morphAttributes.position,lt=!!k.morphAttributes.normal,$t=!!k.morphAttributes.color;let _t=Hn;O.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=x.toneMapping);const Sn=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,st=Sn!==void 0?Sn.length:0,Be=Ne.get(O),er=m.state.lights;if(Y===!0&&(ce===!0||S!==v)){const Zt=S===v&&O.id===V;ke.setState(O,S,Zt)}let at=!1;O.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==er.state.version||Be.outputColorSpace!==Me||I.isBatchedMesh&&Be.batching===!1||!I.isBatchedMesh&&Be.batching===!0||I.isInstancedMesh&&Be.instancing===!1||!I.isInstancedMesh&&Be.instancing===!0||I.isSkinnedMesh&&Be.skinning===!1||!I.isSkinnedMesh&&Be.skinning===!0||I.isInstancedMesh&&Be.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Be.instancingColor===!1&&I.instanceColor!==null||Be.envMap!==Ae||O.fog===!0&&Be.fog!==de||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==ke.numPlanes||Be.numIntersection!==ke.numIntersection)||Be.vertexAlphas!==Fe||Be.vertexTangents!==Ce||Be.morphTargets!==Le||Be.morphNormals!==lt||Be.morphColors!==$t||Be.toneMapping!==_t||Re.isWebGL2===!0&&Be.morphTargetsCount!==st)&&(at=!0):(at=!0,Be.__version=O.version);let Vn=Be.currentProgram;at===!0&&(Vn=as(O,L,I));let _o=!1,Vi=!1,tr=!1;const At=Vn.getUniforms(),Wn=Be.uniforms;if(fe.useProgram(Vn.program)&&(_o=!0,Vi=!0,tr=!0),O.id!==V&&(V=O.id,Vi=!0),_o||v!==S){At.setValue(D,"projectionMatrix",S.projectionMatrix),At.setValue(D,"viewMatrix",S.matrixWorldInverse);const Zt=At.map.cameraPosition;Zt!==void 0&&Zt.setValue(D,Ue.setFromMatrixPosition(S.matrixWorld)),Re.logarithmicDepthBuffer&&At.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&At.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),v!==S&&(v=S,Vi=!0,tr=!0)}if(I.isSkinnedMesh){At.setOptional(D,I,"bindMatrix"),At.setOptional(D,I,"bindMatrixInverse");const Zt=I.skeleton;Zt&&(Re.floatVertexTextures?(Zt.boneTexture===null&&Zt.computeBoneTexture(),At.setValue(D,"boneTexture",Zt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(At.setOptional(D,I,"batchingTexture"),At.setValue(D,"batchingTexture",I._matricesTexture,E));const nr=k.morphAttributes;if((nr.position!==void 0||nr.normal!==void 0||nr.color!==void 0&&Re.isWebGL2===!0)&&He.update(I,k,Vn),(Vi||Be.receiveShadow!==I.receiveShadow)&&(Be.receiveShadow=I.receiveShadow,At.setValue(D,"receiveShadow",I.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Wn.envMap.value=Ae,Wn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),Vi&&(At.setValue(D,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&ec(Wn,tr),de&&O.fog===!0&&le.refreshFogUniforms(Wn,de),le.refreshMaterialUniforms(Wn,O,X,G,ye),Is.upload(D,go(Be),Wn,E)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Is.upload(D,go(Be),Wn,E),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&At.setValue(D,"center",I.center),At.setValue(D,"modelViewMatrix",I.modelViewMatrix),At.setValue(D,"normalMatrix",I.normalMatrix),At.setValue(D,"modelMatrix",I.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Zt=O.uniformsGroups;for(let ir=0,nc=Zt.length;ir<nc;ir++)if(Re.isWebGL2){const xo=Zt[ir];qe.update(xo,Vn),qe.bind(xo,Vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Vn}function ec(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function tc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,L,k){Ne.get(S.texture).__webglTexture=L,Ne.get(S.depthTexture).__webglTexture=k;const O=Ne.get(S);O.__hasExternalTextures=!0,O.__hasExternalTextures&&(O.__autoAllocateDepthBuffer=k===void 0,O.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,L){const k=Ne.get(S);k.__webglFramebuffer=L,k.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,k=0){A=S,P=L,w=k;let O=!0,I=null,de=!1,me=!1;if(S){const Ae=Ne.get(S);Ae.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(D.FRAMEBUFFER,null),O=!1):Ae.__webglFramebuffer===void 0?E.setupRenderTarget(S):Ae.__hasExternalTextures&&E.rebindTextures(S,Ne.get(S.texture).__webglTexture,Ne.get(S.depthTexture).__webglTexture);const Fe=S.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(me=!0);const Ce=Ne.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[L])?I=Ce[L][k]:I=Ce[L],de=!0):Re.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?I=Ne.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?I=Ce[k]:I=Ce,b.copy(S.viewport),B.copy(S.scissor),H=S.scissorTest}else b.copy(q).multiplyScalar(X).floor(),B.copy(ee).multiplyScalar(X).floor(),H=te;if(fe.bindFramebuffer(D.FRAMEBUFFER,I)&&Re.drawBuffers&&O&&fe.drawBuffers(S,I),fe.viewport(b),fe.scissor(B),fe.setScissorTest(H),de){const Ae=Ne.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,Ae.__webglTexture,k)}else if(me){const Ae=Ne.get(S.texture),Fe=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ae.__webglTexture,k||0,Fe)}V=-1},this.readRenderTargetPixels=function(S,L,k,O,I,de,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ne.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){fe.bindFramebuffer(D.FRAMEBUFFER,Me);try{const Ae=S.texture,Fe=Ae.format,Ce=Ae.type;if(Fe!==ln&&he.convert(Fe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Ce===Qi&&(xe.has("EXT_color_buffer_half_float")||Re.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ce!==Gn&&he.convert(Ce)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===Bn&&(Re.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-O&&k>=0&&k<=S.height-I&&D.readPixels(L,k,O,I,he.convert(Fe),he.convert(Ce),de)}finally{const Ae=A!==null?Ne.get(A).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,Ae)}}},this.copyFramebufferToTexture=function(S,L,k=0){const O=Math.pow(2,-k),I=Math.floor(L.image.width*O),de=Math.floor(L.image.height*O);E.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,k,0,0,S.x,S.y,I,de),fe.unbindTexture()},this.copyTextureToTexture=function(S,L,k,O=0){const I=L.image.width,de=L.image.height,me=he.convert(k.format),Me=he.convert(k.type);E.setTexture2D(k,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,S.x,S.y,I,de,me,Me,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,S.x,S.y,L.mipmaps[0].width,L.mipmaps[0].height,me,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,O,S.x,S.y,me,Me,L.image),O===0&&k.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,L,k,O,I=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,Me=S.max.z-S.min.z+1,Ae=he.convert(O.format),Fe=he.convert(O.type);let Ce;if(O.isData3DTexture)E.setTexture3D(O,0),Ce=D.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)E.setTexture2DArray(O,0),Ce=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Le=D.getParameter(D.UNPACK_ROW_LENGTH),lt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),$t=D.getParameter(D.UNPACK_SKIP_PIXELS),_t=D.getParameter(D.UNPACK_SKIP_ROWS),Sn=D.getParameter(D.UNPACK_SKIP_IMAGES),st=k.isCompressedTexture?k.mipmaps[I]:k.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,st.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,st.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,S.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,S.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,S.min.z),k.isDataTexture||k.isData3DTexture?D.texSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Me,Ae,Fe,st.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Me,Ae,st.data)):D.texSubImage3D(Ce,I,L.x,L.y,L.z,de,me,Me,Ae,Fe,st),D.pixelStorei(D.UNPACK_ROW_LENGTH,Le),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,$t),D.pixelStorei(D.UNPACK_SKIP_ROWS,_t),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Sn),I===0&&O.generateMipmaps&&D.generateMipmap(Ce),fe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){P=0,w=0,A=null,fe.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ao?"display-p3":"srgb",t.unpackColorSpace=Ze.workingColorSpace===Zs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===bt?ri:_l}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ri?bt:Ln}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ig extends Hl{}ig.prototype.isWebGL1Renderer=!0;class sg extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Gl extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qa=new U,Ya=new U,ja=new St,Fr=new bl,Ls=new Ks;class rg extends Wt{constructor(e=new vn,t=new Gl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)qa.fromBufferAttribute(t,s-1),Ya.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qa.distanceTo(Ya);e.setAttribute("lineDistance",new dn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(s),Ls.radius+=r,e.ray.intersectsSphere(Ls)===!1)return;ja.copy(s).invert(),Fr.copy(e.ray).applyMatrix4(ja);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new U,d=new U,u=new U,f=new U,h=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=p,T=M-1;x<T;x+=h){const P=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(m,P),d.fromBufferAttribute(m,w),Fr.distanceSqToSegment(c,d,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const V=e.ray.origin.distanceTo(f);V<e.near||V>e.far||t.push({distance:V,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let x=p,T=M-1;x<T;x+=h){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),Fr.distanceSqToSegment(c,d,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class Or extends Bt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Za={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class og{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,u){return c.push(d,u),this},this.removeHandler=function(d){const u=c.indexOf(d);return u!==-1&&c.splice(u,2),this},this.getHandler=function(d){for(let u=0,f=c.length;u<f;u+=2){const h=c[u],g=c[u+1];if(h.global&&(h.lastIndex=0),h.test(d))return g}return null}}}const ag=new og;class co{constructor(e){this.manager=e!==void 0?e:ag,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}co.DEFAULT_MATERIAL_NAME="__DEFAULT";class lg extends co{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Za.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=es("img");function l(){d(),Za.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){d(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Gi extends co{constructor(e){super(e)}load(e,t,n,s){const r=new Bt,a=new lg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ro}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ro);const cg="/assets/Overworld-D95CtR7o.png",uo="/assets/hoverselect-03w42iXs.png",dg="modulepreload",ug=function(i){return"/"+i},Ka={},hg=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var a=c;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(t.map(d=>{if(d=ug(d),d in Ka)return;Ka[d]=!0;const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":dg,u||(h.as="script"),h.crossOrigin="",h.href=d,l&&h.setAttribute("nonce",l),document.head.appendChild(h),u)return new Promise((g,y)=>{h.addEventListener("load",g),h.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},Ys=class Ys{static async loadGlobe(e,t){if(console.log("Loading globe:",t),console.log("Globe enemies:",t.enemies),Se.enemyUnits=[],t.enemies.forEach((n,s)=>{if(!n){console.error(`Enemy unit at index ${s} is null or undefined`);return}console.log("Processing enemy unit:",n),n.team!=="enemy"&&(n.team="enemy"),Se.addUnitToEnemies(n)}),this.placePlayerUnits(e),this.placeEnemyUnits(e),t.battleCondition.effect(Se.playerParty,Se.enemyUnits),se&&!se.isGameStarted()){console.log("🎮 Starting turn manager automatically after globe load"),se.startGame();const{updateTurnDisplay:n}=await hg(async()=>{const{updateTurnDisplay:s}=await Promise.resolve().then(()=>py);return{updateTurnDisplay:s}},void 0);n(se),setTimeout(()=>{console.log("🎯 Initializing unit selection indicators after delay"),e.updateUnitSelectionIndicators()},200)}}static placePlayerUnits(e){const t=Se.playerParty;console.log("Placing player units:",t),t.forEach((n,s)=>{if(s<this.PLAYER_SPAWN_POINTS.length){const r=this.PLAYER_SPAWN_POINTS[s];e.placeUnit(n,r.x,r.y)}})}static placeEnemyUnits(e){const t=Se.enemyUnits;console.log("Placing enemy units:",t),t.forEach((n,s)=>{if(s<this.ENEMY_SPAWN_POINTS.length){const r=this.ENEMY_SPAWN_POINTS[s];e.placeUnit(n,r.x,r.y)}})}};Ys.PLAYER_SPAWN_POINTS=[{x:3,y:6},{x:4,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7}],Ys.ENEMY_SPAWN_POINTS=[{x:4,y:1},{x:3,y:1},{x:4,y:0},{x:3,y:0},{x:2,y:0}];let Qr=Ys;class fg{constructor(e=8,t=8){this.occupiedTiles=new Map,this.mapWidth=e,this.mapHeight=t}updateOccupiedTiles(e){this.occupiedTiles.clear();for(const[t,n]of e){const s=`${n.x},${n.y}`;this.occupiedTiles.set(s,t)}}calculateValidMovement(e,t){const n=[],s=new Map,r=e.move||3;console.log(`🗺️ Calculating movement for ${e.name} with move range ${r} from (${t.x}, ${t.y})`),console.log("🔍 Unit properties:",{name:e.name,range:e.range,move:e.move,className:e.className});const a=[],o=new Set;for(a.push({pos:t,distance:0,path:[t]}),o.add(`${t.x},${t.y}`);a.length>0;){const{pos:c,distance:d,path:u}=a.shift();if(d>0&&d<=r){const f=`${c.x},${c.y}`;this.occupiedTiles.has(f)?console.log(`❌ Occupied tile at distance ${d}: (${c.x}, ${c.y}) - occupied by ${this.occupiedTiles.get(f)?.name}`):(n.push({x:c.x,y:c.y}),s.set(f,[...u]),console.log(`✅ Valid tile at distance ${d}: (${c.x}, ${c.y})`))}if(d<r){const f=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];for(const h of f){const g={x:c.x+h.x,y:c.y+h.y},y=`${g.x},${g.y}`;g.x>=0&&g.x<this.mapWidth&&g.y>=0&&g.y<this.mapHeight&&!o.has(y)&&(o.add(y),a.push({pos:g,distance:d+1,path:[...u,g]}),console.log(`🔍 Exploring: (${g.x}, ${g.y}) at distance ${d+1}`))}}}console.log(`🎯 Found ${n.length} valid movement tiles with range ${r}`),console.log("📋 Valid tiles by distance:");const l={};for(const c of n){const d=Math.abs(c.x-t.x)+Math.abs(c.y-t.y);l[d]||(l[d]=[]),l[d].push(c)}for(let c=1;c<=r;c++){const d=l[c]||[];console.log(`  Distance ${c}: ${d.length} tiles`,d)}return{validTiles:n,paths:s}}calculateStepPath(e,t){const n=[e],s={x:e.x,y:e.y};for(;s.x!==t.x;)s.x<t.x?s.x++:s.x--,n.push({x:s.x,y:s.y});for(;s.y!==t.y;)s.y<t.y?s.y++:s.y--,n.push({x:s.x,y:s.y});return console.log(`🛤️ Step path from (${e.x},${e.y}) to (${t.x},${t.y}):`,n),n}isValidMovementTile(e,t,n){const s=e.move||3,r=Math.abs(n.x-t.x)+Math.abs(n.y-t.y),a=`${n.x},${n.y}`;return r<=s&&!this.occupiedTiles.has(a)&&n.x>=0&&n.x<this.mapWidth&&n.y>=0&&n.y<this.mapHeight}setMapDimensions(e,t){this.mapWidth=e,this.mapHeight=t,console.log(`🗺️ NavigationManager map dimensions set to ${e}x${t}`)}}const eo=new fg;let Ht=32,Ft=32;function pg(i,e){Ht=i,Ft=e}class mg{constructor(){this.unitPositions=new Map,this.unitMeshes=new Map,this.unitBorders=new Map,this.unitHealthBars=new Map,this.unitEnergyBars=new Map,this.textureLoader=new Gi}async placeUnit(e,t,n){console.log(`Placing unit ${e.name} at (${t}, ${n})`),this.unitPositions.set(e,{x:t,y:n}),Se.playerParty.includes(e)?e.team="player":Se.enemyUnits.includes(e)&&(e.team="enemy"),re&&Ki?this.textureLoader.load(e.imageUrl,s=>{if(!re)return;s.magFilter=Ye,s.minFilter=Ye,s.flipY=!0,s.generateMipmaps=!1,s.wrapS=jt,s.wrapT=jt;const r=s.image.width,a=s.image.height;console.log(`Unit ${e.name} image size: ${r}x${a}`);const l=Ht/r,c=r*l,d=a*l;console.log(`Scaling unit to ${c}x${d} (scale factor: ${l})`);const u=new ct(c,d),f=new pt({map:s,transparent:!0,alphaTest:.1,depthTest:!0,depthWrite:!1}),h=new tt(u,f);h.position.set(t*Ht+Ht/2,-n*Ft-Ft/2,1),re&&(re.add(h),this.unitMeshes.set(e,h),console.log(`Added unit mesh to scene at (${h.position.x}, ${h.position.y}) scaled to ${c}x${d}`),this.createUnitBorder(e,c,d,h.position.x,h.position.y),this.createUnitBars(e,h.position.x,h.position.y))}):console.error("Three.js scene or camera not initialized")}getUnitPosition(e){return this.unitPositions.get(e)}removeUnit(e){const t=this.unitMeshes.get(e);t&&re&&(re.remove(t),this.unitMeshes.delete(e));const n=this.unitBorders.get(e);n&&re&&(re.remove(n),this.unitBorders.delete(e));const s=this.unitHealthBars.get(e);if(s&&re){const a=s.backgroundMesh;a&&re.remove(a),re.remove(s),this.unitHealthBars.delete(e)}const r=this.unitEnergyBars.get(e);if(r&&re){const a=r.backgroundMesh;a&&re.remove(a),re.remove(r),this.unitEnergyBars.delete(e)}this.unitPositions.delete(e),console.log(`Removed unit ${e.name} from scene`)}getUnitAtPosition(e,t){for(const[n,s]of this.unitPositions)if(s.x===e&&s.y===t)return n;return null}getAllUnits(){return Array.from(this.unitPositions.keys())}moveUnitToPosition(e,t){this.unitPositions.set(e,t);const n=this.unitMeshes.get(e);n&&(n.position.set(t.x*Ht+Ht/2,-t.y*Ft-Ft/2,1),this.updateUnitBorder(e,n.position.x,n.position.y),this.updateUnitBarsPosition(e,n.position.x,n.position.y)),console.log(`Moved unit ${e.name} to (${t.x}, ${t.y})`)}createUnitBorder(e,t,n,s,r){if(!re)return;const a=e.team==="player"?16711680:255,o=2,l=Ht,c=Ft,d=[new U(-l/2,c/2,0),new U(l/2,c/2,0),new U(l/2,-c/2,0),new U(-l/2,-c/2,0),new U(-l/2,c/2,0)],u=new vn().setFromPoints(d),f=new Gl({color:a,linewidth:o,transparent:!0,opacity:.8}),h=new rg(u,f);h.position.set(s,r,.9),re.add(h),this.unitBorders.set(e,h),console.log(`✅ Added ${e.team} team border for ${e.name} (size: ${l}x${c}, color: ${a.toString(16)})`)}updateUnitBorder(e,t,n){const s=this.unitBorders.get(e);s&&s.position.set(t,n,.9)}updateUnitBarsPosition(e,t,n){const a=Ht*.8,o=this.unitHealthBars.get(e),l=o?o.backgroundMesh:null;if(o&&l){const u=n-Ft/2+4+2;l.position.set(t,u,1.1);const f=e.currentHealth/e.health,h=a*f;o.position.set(t-a/2+h/2,u,1.2)}const c=this.unitEnergyBars.get(e),d=c?c.backgroundMesh:null;if(c&&d){const u=n-Ft/2+4+2-6;d.position.set(t,u,1.1);const f=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,h=a*f;c.position.set(t-a/2+h/2,u,1.2)}console.log(`🔄 Updated unit bars position for ${e.name} at (${t}, ${n})`)}createUnitBars(e,t,n){if(!re)return;const s=Ht*.8,r=4,a=6,o=e.currentHealth/e.health,l=s*o,c=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,d=s*c,u=new ct(s,r),f=new pt({color:3355443,transparent:!0,opacity:.8}),h=new tt(u,f),g=new ct(l,r),y=new pt({color:65280,transparent:!0,opacity:.9}),m=new tt(g,y),p=new ct(s,r),M=new pt({color:3355443,transparent:!0,opacity:.8}),x=new tt(p,M),T=new ct(d,r),P=new pt({color:33023,transparent:!0,opacity:.9}),w=new tt(T,P),A=n-Ft/2+r+2,V=A-a;h.position.set(t,A,1.1),m.position.set(t-s/2+l/2,A,1.2),x.position.set(t,V,1.1),w.position.set(t-s/2+d/2,V,1.2),re.add(h),re.add(m),re.add(x),re.add(w),this.unitHealthBars.set(e,m),this.unitEnergyBars.set(e,w),m.backgroundMesh=h,w.backgroundMesh=x,console.log(`💚💙 Created health/energy bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(o*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(c*100)}%)`)}updateUnitBars(e){if(!re)return;if(!e){console.warn("❌ updateUnitBars called with undefined unit");return}console.log(`🎨 updateUnitBars called for ${e.name} - Current energy: ${e.currentEnergy}/${e.maxEnergy}`);const t=Ht*.8,n=e.currentHealth/e.health,s=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,r=this.unitHealthBars.get(e);if(r){console.log(`💚 Updating health bar for ${e.name}: ${n*100}% (${e.currentHealth}/${e.health})`);const o=Math.max(.1,t*n),l=new ct(o,4);r.geometry.dispose(),r.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Ht+Ht/2,f=-c.y*Ft-Ft/2-Ft/2+4+2;r.position.set(d-t/2+o/2,f,1.2)}r.visible=n>0}else console.warn(`❌ No health bar found for ${e.name}`);const a=this.unitEnergyBars.get(e);if(a){console.log(`💙 Updating energy bar for ${e.name}: ${s*100}% (${e.currentEnergy}/${e.maxEnergy})`);const o=Math.max(.1,t*s),l=new ct(o,4);a.geometry.dispose(),a.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Ht+Ht/2,h=-c.y*Ft-Ft/2-Ft/2+4+2-6;a.position.set(d-t/2+o/2,h,1.2)}a.visible=s>0}else console.warn(`❌ No energy bar found for ${e.name}`);console.log(`🔄 Updated bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(n*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(s*100)}%)`)}getUnitMesh(e){return this.unitMeshes.get(e)}getUnitPositions(){return this.unitPositions}getUnitBorder(e){return this.unitBorders.get(e)}setUnitBorder(e,t){this.unitBorders.set(e,t)}getUnitHealthBar(e){return this.unitHealthBars.get(e)}setUnitHealthBar(e,t){this.unitHealthBars.set(e,t)}getUnitEnergyBar(e){return this.unitEnergyBars.get(e)}setUnitEnergyBar(e,t){this.unitEnergyBars.set(e,t)}}const gg="/assets/select-s3pTX8ku.png";let Ns=32,ks=32;function yg(i,e){Ns=i,ks=e}class _g{constructor(){this.selectedUnit=null,this.textureLoader=new Gi,this.selectTexture=null,this.selectionIndicators=new Map,this.loadSelectTexture()}async loadSelectTexture(){this.selectTexture=await this.textureLoader.loadAsync(gg),this.selectTexture.magFilter=Ye,this.selectTexture.minFilter=Ye}updateUnitSelectionIndicators(e){if(console.log("🎯 Updating unit selection indicators"),this.clearSelectionIndicators(),!se||!se.canSelect()){console.log("❌ Cannot show selection indicators - not in SELECT phase");return}const t=se.getSelectableUnits();console.log(`📋 Found ${t.length} selectable units`),t.forEach(n=>{const s=e(n);s&&this.selectTexture&&re&&this.createSelectionIndicator(n,s.x,s.y)})}createSelectionIndicator(e,t,n){if(!this.selectTexture||!re){console.warn("❌ Cannot create selection indicator - texture or scene not available");return}const s=new ct(Ns,ks),r=new pt({map:this.selectTexture,transparent:!0,opacity:.8}),a=new tt(s,r);a.position.set(t*Ns+Ns/2,-n*ks-ks/2,.5),re.add(a),this.selectionIndicators.set(e,a),console.log(`✅ Created selection indicator for ${e.name} at (${t}, ${n})`)}clearSelectionIndicators(){this.selectionIndicators.forEach((e,t)=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.selectionIndicators.clear(),console.log("🧹 Cleared all selection indicators")}selectUnit(e){return se&&se.canSelect()?se.getSelectableUnits().some(s=>s.id===e.id)?(this.selectedUnit=e,se.setSelectedUnit(e.id),console.log(`✅ Selected unit: ${e.name} (${e.id})`),!0):(console.log(`❌ Unit ${e.name} is not selectable`),!1):(console.log("❌ Cannot select unit - not in SELECT phase"),!1)}setSelectedUnit(e){this.selectedUnit=e,se&&se.setSelectedUnit(e.id),console.log(`🎯 Set selected unit: ${e.name} (${e.id})`)}getSelectedUnit(){return this.selectedUnit}cleanup(){this.clearSelectionIndicators()}}let Jn=32,Qn=32;function xg(i,e){Jn=i,Qn=e}class vg{constructor(){this.textureLoader=new Gi,this.hoverSelectTexture=null,this.movementIndicators=[],this.selectedMoveTarget=null,this.currentMovementData=null,this.pathIndicators=[],this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(uo),this.hoverSelectTexture.magFilter=Ye,this.hoverSelectTexture.minFilter=Ye}enterMovePhase(e,t,n){console.log(`🚶 Entering MOVE phase for ${e.name}`),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null;const s=t(e);if(!s){console.error(`❌ No position found for unit ${e.name}`);return}const r=n(),a=new Map;r.forEach((l,c)=>{a.set(c,{x:l.x,y:l.y})}),eo.updateOccupiedTiles(a);const o=eo.calculateValidMovement(e,s);this.currentMovementData=o,this.createMovementIndicators(o.validTiles),console.log(`✅ Created ${o.validTiles.length} movement indicators for ${e.name}`)}createMovementIndicators(e){if(!this.hoverSelectTexture||!re){console.warn("❌ Cannot create movement indicators - texture or scene not available");return}e.forEach(t=>{const n=new ct(Jn,Qn),s=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:65280}),r=new tt(n,s);r.position.set(t.x*Jn+Jn/2,-t.y*Qn-Qn/2,.4),re&&(re.add(r),this.movementIndicators.push(r))}),console.log(`✅ Created ${e.length} movement indicators`)}clearMovementIndicators(){this.movementIndicators.forEach(e=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.movementIndicators=[],console.log("🧹 Cleared movement indicators")}exitMovePhase(){console.log("🚪 Exiting MOVE phase"),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null,this.currentMovementData=null}selectMoveTarget(e,t){return console.log(`🎯 Attempting to select move target: (${e}, ${t})`),this.currentMovementData?this.currentMovementData.validTiles.some(s=>s.x===e&&s.y===t)?(this.selectedMoveTarget={x:e,y:t},console.log(`✅ Selected valid move target: (${e}, ${t})`),!0):(console.log(`❌ Invalid move target: (${e}, ${t}) - not in valid tiles`),!1):(console.warn("❌ No movement data available"),!1)}drawPathToTarget(e,t){if(console.log("🛤️ Drawing path to target"),this.clearPathIndicators(),!this.selectedMoveTarget||!this.currentMovementData){console.warn("❌ No target selected or movement data missing");return}if(!e(t)){console.error(`❌ No position found for unit ${t.name}`);return}const s=`${this.selectedMoveTarget.x},${this.selectedMoveTarget.y}`,r=this.currentMovementData.paths.get(s);r&&r.length>1&&(this.createPathIndicators(r),console.log(`✅ Created path with ${r.length} steps`))}createPathIndicators(e){if(!(!this.hoverSelectTexture||!re))for(let t=1;t<e.length;t++){const n=e[t],s=new ct(Jn*.5,Qn*.5),r=new pt({color:16776960,transparent:!0,opacity:.8}),a=new tt(s,r);a.position.set(n.x*Jn+Jn/2,-n.y*Qn-Qn/2,.6),re&&(re.add(a),this.pathIndicators.push(a))}}clearPathIndicators(){this.pathIndicators.forEach(e=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.pathIndicators=[]}getSelectedMoveTarget(){return this.selectedMoveTarget}cancelMove(){console.log("❌ Cancelling move"),this.clearPathIndicators(),this.selectedMoveTarget=null}}let rs=!1;function Sg(i){rs=i,console.log(`Debug mode ${i?"enabled":"disabled"}`)}function Dt(){return rs}function Mg(){return rs?"ON":"OFF"}function vt(i,e){rs&&console.log(`[DEBUG] ${i}`,e||"")}function Xs(i){rs&&console.warn(`[DEBUG ALERT] ${i}`)}class wi{static countAliveUnits(e){return(e==="player"?Se.playerParty:Se.enemyUnits).filter(n=>n.currentHealth>0).length}static calculateActionableUnitLimit(){const e=this.countAliveUnits("player"),t=this.countAliveUnits("enemy"),n=Math.min(e,t);return vt("Calculated actionable unit limit",{alivePlayerUnits:e,aliveEnemyUnits:t,actionableUnitLimit:n}),Math.max(1,n)}static getAliveUnitCounts(){return{player:this.countAliveUnits("player"),enemy:this.countAliveUnits("enemy")}}static checkPlayerVictory(){const t=this.countAliveUnits("enemy")===0;return t&&console.log("🎉 PLAYER VICTORY! All enemies have been defeated!"),t}static checkPlayerDefeat(){const t=this.countAliveUnits("player")===0;return t&&console.log("💀 PLAYER DEFEAT! All player units have been defeated!"),t}static checkGameEndConditions(){return this.checkPlayerVictory()?"victory":this.checkPlayerDefeat()?"defeat":"continue"}}let hn=32,fn=32;function Eg(i,e){hn=i,fn=e}class bg{constructor(){this.textureLoader=new Gi,this.hoverSelectTexture=null,this.attackIndicators=[],this.skillTargetIndicators=[],this.skillPreviewIndicators=[],this.selectedAttackTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.selectedSkillTarget=null,this.skillRotation=0,this.attackMode="basic",this.currentSkill=null,this.targetUnit=null,this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(uo),this.hoverSelectTexture.magFilter=Ye,this.hoverSelectTexture.minFilter=Ye}enterActionPhase(e,t,n){console.log(`⚔️ Entering ACTION phase for ${e.name}`),this.clearAttackIndicators(),this.selectedAttackTarget=null,this.currentAttackData=null,this.targetUnit=null,this.attackMode="basic",this.currentSkill=null}exitActionPhase(){console.log("🚪 Exiting ACTION phase"),this.clearAttackIndicators(),this.clearSkillTargetIndicators(),this.clearSkillPreviewIndicators(),this.selectedAttackTarget=null,this.selectedSkillTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.skillRotation=0,this.targetUnit=null,this.attackMode="basic",this.currentSkill=null}setAttackMode(e,t){this.attackMode=e,this.currentSkill=t,console.log(`🎯 Attack mode set to: ${e}${t?` (${t.name})`:""}`)}setAttackData(e){this.currentAttackData=e,console.log(`📋 Attack data set with ${e.validTiles.length} valid targets`)}createAttackIndicators(){if(console.log("🎯 Creating attack indicators"),this.clearAttackIndicators(),!this.currentAttackData||!this.hoverSelectTexture||!re){console.warn("❌ Cannot create attack indicators - missing data, texture, or scene");return}this.currentAttackData.validTiles.forEach(e=>{const t=new ct(hn,fn),n=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:16711680}),s=new tt(t,n);s.position.set(e.x*hn+hn/2,-e.y*fn-fn/2,.4),re&&(re.add(s),this.attackIndicators.push(s))}),console.log(`✅ Created ${this.currentAttackData.validTiles.length} attack indicators`)}clearAttackIndicators(){this.attackIndicators.forEach(e=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.attackIndicators=[],console.log("🧹 Cleared attack indicators")}clearSkillTargetIndicators(){this.skillTargetIndicators.forEach(e=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.skillTargetIndicators=[],console.log("🧹 Cleared skill target indicators")}clearSkillPreviewIndicators(){this.skillPreviewIndicators.forEach(e=>{re&&re.remove(e),e.geometry.dispose(),e.material instanceof cn&&e.material.dispose()}),this.skillPreviewIndicators=[],console.log("🧹 Cleared skill preview indicators")}setSkillTarget(e,t){console.log(`🎯 Setting skill target for ${e.name}`),this.currentSkill=e,this.selectedSkillTarget=t,this.skillRotation=0}showSkillPreview(e,t){if(console.log(`👁️ Showing skill preview at (${e}, ${t})`),this.clearSkillPreviewIndicators(),!this.currentSkill||!this.hoverSelectTexture||!re){console.warn("❌ Cannot show skill preview - missing skill, texture, or scene");return}const n=this.currentSkill.getTargetPattern(e,t,"north",this.skillRotation);n.forEach(s=>{if(s.x>=0&&s.x<8&&s.y>=0&&s.y<8){const r=new ct(hn,fn),a=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:s.isPrimary?16746496:16776960}),o=new tt(r,a);o.position.set(s.x*hn+hn/2,-s.y*fn-fn/2,.5),re&&(re.add(o),this.skillPreviewIndicators.push(o))}}),console.log(`✅ Created ${n.length} skill preview indicators`)}setSkillTargeting(e,t){console.log(`🎯 Setting skill targeting for ${e.name} with ${t.length} targets`),this.currentSkill=e,this.validSkillTargets=t,this.selectedSkillTarget=null,this.skillRotation=0}createSkillTargetIndicators(){if(console.log("✨ Creating skill target indicators"),this.clearSkillTargetIndicators(),!this.validSkillTargets.length||!this.hoverSelectTexture||!re){console.warn("❌ Cannot create skill target indicators - missing data, texture, or scene");return}this.validSkillTargets.forEach(e=>{const t=new ct(hn,fn),n=new pt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:65280}),s=new tt(t,n);s.position.set(e.x*hn+hn/2,-e.y*fn-fn/2,.4),re&&(re.add(s),this.skillTargetIndicators.push(s))}),console.log(`✅ Created ${this.validSkillTargets.length} skill target indicators`)}selectAttackTarget(e,t,n,s){if(console.log(`🎯 Attempting to select attack target at (${e}, ${t})`),console.log("📋 Debug - currentAttackData exists:",!!this.currentAttackData),console.log("📋 Debug - validSkillTargets exists:",!!this.validSkillTargets.length),console.log("📋 Debug - attackMode:",this.attackMode),this.attackMode==="skill"){if(!this.validSkillTargets.length&&!this.currentAttackData)return console.warn("❌ No skill targets or attack data available"),{success:!1,targetUnit:null}}else if(!this.currentAttackData)return console.warn("❌ No attack data available"),{success:!1,targetUnit:null};let r=!1;if(this.attackMode==="skill"&&this.validSkillTargets.length>0?(r=this.validSkillTargets.some(o=>o.x===e&&o.y===t),console.log("📋 Debug - isValidSkillTarget:",r),console.log("📋 Debug - validSkillTargets:",this.validSkillTargets)):this.currentAttackData&&(r=this.currentAttackData.validTiles.some(o=>o.x===e&&o.y===t),console.log("📋 Debug - isValidAttackTarget:",r),console.log("📋 Debug - validTiles:",this.currentAttackData.validTiles)),!r)return console.log(`❌ Invalid target: (${e}, ${t}) - not in valid targets`),{success:!1,targetUnit:null};if(this.attackMode==="basic"){const o=n(e,t);return console.log("📋 Debug - targetUnit at position:",o?`${o.name} (${o.team})`:"null"),o?o.team===s.team?(console.log(`❌ Cannot attack unit of same team: ${o.name}`),{success:!1,targetUnit:null}):(this.selectedAttackTarget={x:e,y:t},this.targetUnit=o,console.log(`✅ Selected valid attack target: ${o.name} at (${e}, ${t})`),console.log("📋 Debug - After setting: selectedAttackTarget:",this.selectedAttackTarget),console.log("📋 Debug - After setting: targetUnit:",this.targetUnit?`${this.targetUnit.name}`:"null"),{success:!0,targetUnit:o}):(console.log(`❌ No unit found at attack target (${e}, ${t})`),{success:!1,targetUnit:null})}if(this.currentSkill){if(!this.validSkillTargets.some(c=>c.x===e&&c.y===t))return console.log(`❌ Invalid skill target: (${e}, ${t}) - not in valid skill targets`),{success:!1,targetUnit:null};this.selectedSkillTarget={x:e,y:t};const l=n(e,t);return this.targetUnit=l,console.log(`✅ Selected skill target at (${e}, ${t})${l?` with unit ${l.name}`:" (empty tile)"}`),{success:!0,targetUnit:l}}this.selectedAttackTarget={x:e,y:t};const a=n(e,t);return this.targetUnit=a,console.log(`✅ Selected skill target at (${e}, ${t})${a?` with unit ${a.name}`:" (empty tile)"}`),{success:!0,targetUnit:a}}getCurrentAttackMode(){return this.attackMode}getCurrentSkill(){return this.currentSkill}confirmAttack(e){if(console.log(`⚔️ Confirming attack from ${e.name}`),console.log("📋 Debug - selectedAttackTarget:",this.selectedAttackTarget),console.log("📋 Debug - targetUnit:",this.targetUnit?`${this.targetUnit.name} (${this.targetUnit.team})`:"null"),console.log("📋 Debug - attackMode:",this.attackMode),console.log("📋 Debug - currentAttackData:",this.currentAttackData),!this.selectedAttackTarget||!this.targetUnit)return console.warn("❌ No attack target selected"),console.warn("❌ Missing data:",{hasTarget:!!this.selectedAttackTarget,hasUnit:!!this.targetUnit}),null;if(this.attackMode==="basic"){const t=e.basicDamage;console.log(`💥 Calculating damage: ${t} (from ${e.name}.basicDamage)`);const n=this.targetUnit.currentHealth;this.targetUnit.currentHealth=Math.max(0,this.targetUnit.currentHealth-t);const s=this.targetUnit.currentHealth,r=e.currentEnergy;return e.energyType.toLowerCase()==="kinetic"?(e.currentEnergy=Math.min(e.maxEnergy,e.currentEnergy+5),console.log(`⚡ Kinetic unit ${e.name} gains 5 energy from attack: ${r} → ${e.currentEnergy}/${e.maxEnergy}`)):(e.currentEnergy=Math.max(0,e.currentEnergy-1),console.log(`⚡ Potential unit ${e.name} consumes 1 energy: ${r} → ${e.currentEnergy}/${e.maxEnergy}`)),console.log(`💥 ${e.name} attacks ${this.targetUnit.name} for ${t} damage`),console.log(`🩸 ${this.targetUnit.name} health: ${n} → ${s}/${this.targetUnit.health}`),{success:!0,damage:t,target:this.targetUnit}}return console.warn("❌ Skill attacks not yet implemented"),null}cancelAttack(){console.log("❌ Cancelling attack"),this.selectedAttackTarget=null,this.targetUnit=null}rotateSkillTargets(){if(console.log("🔄 Rotating skill targets"),!this.currentSkill||!this.selectedSkillTarget){console.warn("❌ No skill or target selected for rotation");return}this.skillRotation=(this.skillRotation+1)%4,console.log(`🔄 Rotated to step ${this.skillRotation}`),this.showSkillPreview(this.selectedSkillTarget.x,this.selectedSkillTarget.y)}checkGameEndConditions(){return wi.checkGameEndConditions()}confirmSkill(e,t){if(console.log("✨ Confirming skill attack"),!this.currentSkill)return console.warn("❌ No skill selected"),null;let n=this.selectedSkillTarget;if(!n)return console.warn("❌ No skill target selected - this should not happen"),null;if(console.log(`✨ Executing skill: ${this.currentSkill.name} at (${n.x}, ${n.y})`),e.currentEnergy<this.currentSkill.energyCost)return console.warn(`❌ Not enough energy for ${this.currentSkill.name}. Required: ${this.currentSkill.energyCost}, Current: ${e.currentEnergy}`),null;const s=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-this.currentSkill.energyCost),console.log(`⚡ ${e.name} energy: ${s} → ${e.currentEnergy}/${e.maxEnergy}`);const r=this.currentSkill.getTargetPattern(n.x,n.y,"north",this.skillRotation);console.log(`🎯 Skill pattern has ${r.length} targets:`,r);const a=[];r.forEach(c=>{if(c.x>=0&&c.x<8&&c.y>=0&&c.y<8){const d=t(c.x,c.y);d&&(a.push(d),console.log(`🎯 Unit found at (${c.x}, ${c.y}): ${d.name} (${d.team})`))}}),console.log(`💥 Skill will affect ${a.length} units`);const o=e.skillDamage+(this.currentSkill.bonusDamage||0);if(this.currentSkill?.id==="bandage"){const c=o,d=e.currentHealth;e.currentHealth=Math.min(e.health,e.currentHealth+c);const u=e.currentHealth;return console.log(`🩹 ${e.name} bandaged themselves for ${c} healing: ${d} → ${u}/${e.health}`),console.log(`✅ Skill ${this.currentSkill.name} executed successfully, healed caster`),{success:!0,affectedUnits:[e],skill:this.currentSkill}}a.forEach(c=>{if(this.currentSkill?.id==="universal-whisper"){if(c.team===e.team){const d=o,u=c.currentHealth;c.currentHealth=Math.min(c.health,c.currentHealth+d);const f=c.currentHealth;console.log(`💚 ${c.name} healed for ${d}: ${u} → ${f}/${c.health}`)}}else if(c.team!==e.team){const d=c.currentHealth;c.currentHealth=Math.max(0,c.currentHealth-o);const u=c.currentHealth;console.log(`💥 ${c.name} takes ${o} damage: ${d} → ${u}/${c.health}`)}});const l=a.filter(c=>this.currentSkill?.id==="universal-whisper"?c.team===e.team:c.team!==e.team);return console.log(`✅ Skill ${this.currentSkill.name} executed successfully, affected ${l.length} units`),{success:!0,affectedUnits:l,skill:this.currentSkill}}}class Tg{showSkipButton(e){console.log("⏭️ Creating skip button..."),this.hideMovementButtons();const t=document.createElement("button");t.id="move-skip-button",t.textContent="Skip Move",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#95a5a6",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Skip button added to document body")}showConfirmCancelButtons(e,t){this.hideMovementButtons();const n=document.createElement("button");n.id="move-confirm-button",n.textContent="Confirm",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#27ae60",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="move-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="90px",s.style.padding="8px 16px",s.style.backgroundColor="#e74c3c",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s)}hideMovementButtons(){const e=document.getElementById("move-skip-button"),t=document.getElementById("move-confirm-button"),n=document.getElementById("move-cancel-button");e&&e.remove(),t&&t.remove(),n&&n.remove()}showActionOptions(e,t,n,s){console.log(`⚔️ Creating action options for ${e.name}...`),this.hideActionButtons();let r=10;const a=document.createElement("button");a.id="action-skip-button",a.textContent="Skip Action",a.style.position="absolute",a.style.top="10px",a.style.right=`${r}px`,a.style.padding="8px 16px",a.style.backgroundColor="#e67e22",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>{console.log("⏭️ Action skip button clicked"),s()},document.body.appendChild(a),r+=120;const o=document.createElement("button");o.id="basic-attack-button",o.textContent="Attack",o.style.position="absolute",o.style.top="10px",o.style.right=`${r}px`,o.style.padding="8px 16px",o.style.backgroundColor="#c0392b",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>{console.log("⚔️ Basic attack button clicked"),t()},document.body.appendChild(o),r+=80,e.skills.forEach((l,c)=>{const d=e.currentEnergy>=l.energyCost,u=document.createElement("button");u.id=`skill-button-${c}`,u.textContent=`${l.emoji} ${l.name}`,u.style.position="absolute",u.style.top="10px",u.style.right=`${r}px`,u.style.padding="8px 16px",u.style.backgroundColor=d?"#8e44ad":"#7f8c8d",u.style.color="white",u.style.border="none",u.style.borderRadius="5px",u.style.cursor=d?"pointer":"not-allowed",u.style.zIndex="1000",u.style.fontFamily="sans-serif",u.style.fontWeight="bold",u.style.opacity=d?"1":"0.5",d&&(u.onclick=()=>{console.log(`✨ Skill button clicked: ${l.name}`),n(l)}),u.title=`${l.name} (${l.energyCost} energy)
${l.description}`,document.body.appendChild(u),r+=u.textContent.length*8+32}),console.log("✅ Action options added to document body")}showActionSkipButton(e){console.log("⏭️ Creating action skip button..."),this.hideActionButtons();const t=document.createElement("button");t.id="action-skip-button",t.textContent="Skip Action",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#e67e22",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Action skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Action skip button added to document body")}showAttackConfirmCancelButtons(e,t){console.log("🔴 showAttackConfirmCancelButtons called"),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const n=document.createElement("button");n.id="attack-confirm-button",n.textContent="Attack",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#c0392b",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="attack-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="80px",s.style.padding="8px 16px",s.style.backgroundColor="#95a5a6",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s),console.log("✅ Added Attack and Cancel buttons to document body")}showSkillConfirmCancelButtons(e,t,n){console.log(`✨ showSkillConfirmCancelButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const s=document.createElement("button");s.id="skill-confirm-button",s.textContent=`Confirm ${e}`,s.style.position="absolute",s.style.top="10px",s.style.right="10px",s.style.padding="8px 16px",s.style.backgroundColor="#8e44ad",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t();const r=document.createElement("button");r.id="skill-cancel-button",r.textContent="Cancel",r.style.position="absolute",r.style.top="10px",r.style.right=`${s.textContent.length*8+32+10}px`,r.style.padding="8px 16px",r.style.backgroundColor="#95a5a6",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>n(),document.body.appendChild(s),document.body.appendChild(r),console.log(`✅ Added ${e} Confirm and Cancel buttons to document body`)}showDualRotationalSkillButtons(e,t,n,s){console.log(`🔄 showDualRotationalSkillButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const r=document.createElement("button");r.id="skill-confirm-button",r.textContent=`Confirm ${e}`,r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.padding="8px 16px",r.style.backgroundColor="#8e44ad",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t();const a=document.createElement("button");a.id="skill-rotate-button",a.textContent="🔄 Rotate",a.style.position="absolute",a.style.top="10px",a.style.right=`${r.textContent.length*8+32+10}px`,a.style.padding="8px 16px",a.style.backgroundColor="#3498db",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>s();const o=document.createElement("button");o.id="skill-cancel-button",o.textContent="Cancel",o.style.position="absolute",o.style.top="10px",o.style.right=`${(r.textContent.length+a.textContent.length)*8+64+20}px`,o.style.padding="8px 16px",o.style.backgroundColor="#95a5a6",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>n(),document.body.appendChild(r),document.body.appendChild(a),document.body.appendChild(o),console.log(`✅ Added ${e} Confirm, Rotate, and Cancel buttons to document body`)}hideActionButtons(){const e=document.getElementById("action-skip-button"),t=document.getElementById("basic-attack-button"),n=document.getElementById("attack-confirm-button"),s=document.getElementById("attack-cancel-button"),r=document.getElementById("skill-confirm-button"),a=document.getElementById("skill-cancel-button"),o=document.getElementById("skill-rotate-button");e&&e.remove(),t&&t.remove(),n&&n.remove(),s&&s.remove(),r&&r.remove(),a&&a.remove(),o&&o.remove();for(let l=0;l<10;l++){const c=document.getElementById(`skill-button-${l}`);c&&c.remove()}}cleanup(){this.hideMovementButtons(),this.hideActionButtons()}}const Ag="/assets/boom-DXpj0BEC.png";let Et=32,Ct=32;function wg(i,e){Et=i,Ct=e}class Rg{constructor(){this.textureLoader=new Gi}showDamageAnimation(e,t){re&&(this.textureLoader.load(Ag,n=>{if(!re)return;n.magFilter=Ye,n.minFilter=Ye,n.flipY=!0,n.generateMipmaps=!1;const s=new ct(Et*.8,Et*.8),r=new pt({map:n,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),a=new tt(s,r),o=t(e);if(o){const l=o.x*Et+Et/2,c=-o.y*Ct-Ct/2;a.position.set(l,c,2.5),re.add(a),setTimeout(()=>{re&&re.remove(a)},500)}}),this.flickerUnit(e))}flickerUnit(e,t){let n;if(t)n=t(e);else{console.warn("No getUnitMesh function provided to flickerUnit");return}if(!n)return;const s=n.material.opacity;[{opacity:.2,delay:100},{opacity:s,delay:200},{opacity:.2,delay:300},{opacity:s,delay:400}].forEach(({opacity:a,delay:o})=>{setTimeout(()=>{if(n&&n.material){const l=n.material;l.opacity=a,l.transparent=!0}},o)})}showDeathAnimation(e,t,n){if(!re)return;console.log(`💀 Starting death animation for ${e.name}`);const s=document.createElement("canvas");s.width=64,s.height=64;const r=s.getContext("2d");if(r){r.clearRect(0,0,64,64),r.font="48px Arial",r.textAlign="center",r.textBaseline="middle",r.fillStyle="white",r.fillText("💀",32,32);const a=new Or(s);a.needsUpdate=!0;const o=new ct(Et*.6,Et*.6),l=new pt({map:a,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),c=new tt(o,l),d=t(e);if(d){const u=d.x*Et+Et/2,f=-d.y*Ct-Ct/2;c.position.set(u,f-Ct*.3,3),re.add(c),setTimeout(()=>{re&&re.remove(c),n&&(console.log(`🗑️ Death animation complete for ${e.name}, calling cleanup callback`),n())},2e3),console.log(`💀 Skull animation added for ${e.name}`)}}}showDamageAnimationWithFlicker(e,t,n){this.showDamageAnimation(e,t),this.flickerUnit(e,n)}showDamageTextPopup(e,t,n,s){if(!re)return;const r=s(e);if(!r)return;const a=document.createElement("canvas");a.width=128,a.height=64;const o=a.getContext("2d");if(!o)return;o.clearRect(0,0,128,64);const l=n?`${n}💥 -${t}`:`💥 -${t}`;o.font="bold 24px Arial",o.textAlign="center",o.textBaseline="middle",o.strokeStyle="black",o.lineWidth=3,o.fillStyle="white",o.strokeText(l,64,32),o.fillText(l,64,32);const c=new Or(a);c.needsUpdate=!0;const d=new ct(Et*1.5,Et*.75),u=new pt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new tt(d,u),h=r.x*Et+Et/2,g=-r.y*Ct-Ct/2;f.position.set(h,g-Ct*.7,3),re.add(f);let y=Date.now();const m=2e3,p=()=>{const x=(Date.now()-y)/m;if(x>=1){re&&re.remove(f);return}const T=g-Ct*.7,P=g-Ct*1.5;f.position.y=T+(P-T)*x,u.opacity=1-x,requestAnimationFrame(p)};p()}showHealingTextPopup(e,t,n,s){if(!re)return;const r=s(e);if(!r)return;const a=document.createElement("canvas");a.width=128,a.height=64;const o=a.getContext("2d");if(!o)return;o.clearRect(0,0,128,64);const l=`${n}💚 +${t}`;o.font="bold 24px Arial",o.textAlign="center",o.textBaseline="middle",o.strokeStyle="black",o.lineWidth=3,o.fillStyle="#2ecc71",o.strokeText(l,64,32),o.fillText(l,64,32);const c=new Or(a);c.needsUpdate=!0;const d=new ct(Et*1.5,Et*.75),u=new pt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new tt(d,u),h=r.x*Et+Et/2,g=-r.y*Ct-Ct/2;f.position.set(h,g-Ct*.7,3),re.add(f);let y=Date.now();const m=2e3,p=()=>{const x=(Date.now()-y)/m;if(x>=1){re&&re.remove(f);return}const T=g-Ct*.7,P=g-Ct*1.5;f.position.y=T+(P-T)*x,u.opacity=1-x,requestAnimationFrame(p)};p()}showHealingAnimation(e,t,n,s,r){this.showHealingTextPopup(e,t,n,s),r&&this.glowUnit(e,r,"#2ecc71")}glowUnit(e,t,n){const s=t(e);if(!s)return;const a=s.material.color.clone(),o=new Xe(n);[{color:o,delay:100},{color:a,delay:200},{color:o,delay:300},{color:a,delay:400}].forEach(({color:c,delay:d})=>{setTimeout(()=>{s&&s.material&&s.material.color.copy(c)},d)})}showSkillDamageAnimation(e,t,n,s,r){this.showDamageAnimation(e,s),this.showDamageTextPopup(e,t,n,s),r&&this.flickerUnit(e,r)}showSkillEffectAnimation(e,t,n,s,r,a=!1){a?this.showHealingAnimation(e,t,n,s,r):this.showSkillDamageAnimation(e,t,n,s,r)}}function Cg(i,e){console.log("Showing Victory Screen"),i.innerHTML="";const t=document.createElement("div");t.id="victory-screen",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="center",t.style.backgroundColor="#2c5234",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.textAlign="center";const n=document.createElement("h1");n.textContent="YOU WIN!",n.style.fontSize="4em",n.style.margin="0 0 30px 0",n.style.color="#27ae60",n.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)",n.style.fontWeight="bold";const s=document.createElement("p");s.textContent="Congratulations! You have defeated all enemies.",s.style.fontSize="1.5em",s.style.margin="0 0 40px 0",s.style.color="#ecf0f1";const r=document.createElement("button");r.textContent="CONTINUE TO SHOP",r.style.padding="15px 30px",r.style.fontSize="1.2em",r.style.backgroundColor="#27ae60",r.style.color="white",r.style.border="none",r.style.borderRadius="8px",r.style.cursor="pointer",r.style.fontWeight="bold",r.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",r.style.transition="background-color 0.2s ease",r.addEventListener("mouseover",()=>{r.style.backgroundColor="#229954"}),r.addEventListener("mouseout",()=>{r.style.backgroundColor="#27ae60"}),r.onclick=()=>{so(),e()},t.appendChild(n),t.appendChild(s),t.appendChild(r),i.appendChild(t)}function Pg(i,e){console.log("Showing Defeat Screen"),i.innerHTML="";const t=document.createElement("div");t.id="defeat-screen",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="center",t.style.backgroundColor="#5c2c2c",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.textAlign="center";const n=document.createElement("h1");n.textContent="YOU LOSE!",n.style.fontSize="4em",n.style.margin="0 0 30px 0",n.style.color="#e74c3c",n.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)",n.style.fontWeight="bold";const s=document.createElement("p");s.textContent="All your units have been defeated. Better luck next time!",s.style.fontSize="1.5em",s.style.margin="0 0 40px 0",s.style.color="#ecf0f1";const r=document.createElement("button");r.textContent="RESTART GAME",r.style.padding="15px 30px",r.style.fontSize="1.2em",r.style.backgroundColor="#e74c3c",r.style.color="white",r.style.border="none",r.style.borderRadius="8px",r.style.cursor="pointer",r.style.fontWeight="bold",r.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",r.style.transition="background-color 0.2s ease",r.addEventListener("mouseover",()=>{r.style.backgroundColor="#c0392b"}),r.addEventListener("mouseout",()=>{r.style.backgroundColor="#e74c3c"}),r.onclick=()=>{e()},t.appendChild(n),t.appendChild(s),t.appendChild(r),i.appendChild(t)}function Lg(i,e){pg(i,e),yg(i,e),xg(i,e),Eg(i,e),wg(i,e)}class Ug{constructor(){this.selectedGlobe=null,this.unitRenderer=new mg,this.selectionManager=new _g,this.movementManager=new vg,this.actionManager=new bg,this.uiManager=new Tg,this.animationManager=new Rg,this.appContainer=null,console.log("GameScene initialized"),eo.setMapDimensions(8,8)}setAppContainer(e){this.appContainer=e}checkGameEndConditions(){if(!this.appContainer){console.warn("❌ Cannot check game end conditions - no app container set");return}const e=this.actionManager.checkGameEndConditions();e==="victory"?(console.log("🎉 VICTORY! Showing victory screen..."),Cg(this.appContainer,()=>{zs(this.appContainer,()=>{console.log("🎮 Starting new game from shop...")})})):e==="defeat"&&(console.log("💀 DEFEAT! Showing defeat screen..."),Pg(this.appContainer,()=>{console.log("🔄 Restarting game..."),se&&se.reset(),zs(this.appContainer,()=>{console.log("🎮 Starting new game from shop...")})}))}async setSelectedGlobe(e){console.log("Setting selected globe:",e),this.selectedGlobe=e,e&&await this.loadGlobe(e)}async loadGlobe(e){console.log("Loading globe in GameScene:",e),await Qr.loadGlobe(this,e)}async placeUnit(e,t,n){this.unitRenderer.placeUnit(e,t,n)}getUnitPosition(e){return this.unitRenderer.getUnitPosition(e)}removeUnit(e){this.unitRenderer.removeUnit(e)}getUnitAtPosition(e,t){return this.unitRenderer.getUnitAtPosition(e,t)}getAllUnits(){return this.unitRenderer.getAllUnits()}updateUnitSelectionIndicators(){this.selectionManager.updateUnitSelectionIndicators(e=>this.unitRenderer.getUnitPosition(e))}selectUnit(e){return this.selectionManager.selectUnit(e)}getSelectedUnit(){return this.selectionManager.getSelectedUnit()}enterMovePhase(e){this.selectionManager.setSelectedUnit(e),this.movementManager.enterMovePhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),se&&se.advancePhase()})}exitMovePhase(){this.movementManager.exitMovePhase(),this.uiManager.hideMovementButtons(),this.exitActionPhase()}selectMoveTarget(e,t){const n=this.movementManager.selectMoveTarget(e,t);if(n){const s=this.selectionManager.getSelectedUnit();s&&this.movementManager.drawPathToTarget(r=>this.unitRenderer.getUnitPosition(r),s),this.uiManager.showConfirmCancelButtons(()=>this.confirmMove(),()=>this.cancelMove())}return n}confirmMove(){const e=this.selectionManager.getSelectedUnit(),t=this.movementManager.getSelectedMoveTarget();if(!e||!t){console.warn("❌ No unit or target selected");return}this.moveUnitToPosition(e,t),this.exitMovePhase(),se&&se.advancePhase()}cancelMove(){this.movementManager.cancelMove(),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),se&&se.advancePhase()})}moveUnitToPosition(e,t){this.unitRenderer.getUnitPosition(e),this.unitRenderer.moveUnitToPosition(e,t)}enterActionPhase(e){this.selectionManager.setSelectedUnit(e),this.actionManager.enterActionPhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),se&&se.endTurn()})}exitActionPhase(){this.actionManager.exitActionPhase(),this.uiManager.hideActionButtons()}initiateBasicAttack(){console.log("⚔️ Initiating basic attack mode");const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected");return}this.setupAttackTargeting(e,"basic")}initiateSkillAttack(e){console.log(`✨ Initiating skill attack: ${e.name}`);const t=this.selectionManager.getSelectedUnit();if(!t){console.warn("❌ No unit selected");return}if(t.currentEnergy<e.energyCost){console.warn(`❌ Not enough energy for ${e.name}. Required: ${e.energyCost}, Current: ${t.currentEnergy}`);return}this.setupAttackTargeting(t,"skill",e)}setupAttackTargeting(e,t,n){this.actionManager.setAttackMode(t,n||null);const s=this.unitRenderer.getUnitPosition(e);if(!s){console.error(`❌ No position found for unit ${e.name}`);return}t==="basic"?(this.showBasicAttackTargeting(e,s),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),se&&se.endTurn()})):t==="skill"&&n&&this.showSkillTargeting(e,s,n)}showBasicAttackTargeting(e,t){const n=e.range||1;console.log(`📍 Unit ${e.name} current position: (${t.x}, ${t.y})`),console.log(`⚔️ Unit attack range: ${n}`);const s=this.calculateValidAttackTargets(e,t);this.actionManager.setAttackData(s),this.actionManager.createAttackIndicators(),console.log("🎯 Basic attack targeting indicators created")}calculateValidAttackTargets(e,t){const n=[],s=new Map,r=e.range||1;console.log(`⚔️ Calculating attack targets for ${e.name} with attack range ${r}`);for(let a=-r;a<=r;a++)for(let o=-r;o<=r;o++){const l=Math.abs(a)+Math.abs(o);if(l>0&&l<=r){const c=t.x+a,d=t.y+o;c>=0&&c<8&&d>=0&&d<8&&(n.push({x:c,y:d}),s.set(`${c},${d}`,[t,{x:c,y:d}]))}}return console.log(`🎯 Found ${n.length} valid attack tiles`),{validTiles:n,paths:s}}showSkillTargeting(e,t,n){if(console.log(`✨ Showing skill targeting for ${n.name}`),console.log(`🎯 Skill targeting type: ${n.targetingType}`),n.id==="bandage"){console.log("🩹 Bandage skill - auto-executing on caster"),this.actionManager.setSkillTarget(n,t),this.confirmSkill();return}if(n.targetingType==="non-rotational"&&n.id==="blazing-knuckle")console.log("🔥 Self-centered skill - showing immediate preview around caster"),this.actionManager.setSkillTarget(n,t),this.actionManager.showSkillPreview(t.x,t.y),this.uiManager.showSkillConfirmCancelButtons(n.name,()=>this.confirmSkill(),()=>this.cancelSkill());else if(n.targetingType==="adjacent-attack"){console.log("⚔️ Adjacent attack skill - showing attack-style targeting");const s=this.calculateAdjacentAttackTargets(e,t);this.actionManager.setAttackMode("skill",n),this.actionManager.setAttackData(s),this.actionManager.createAttackIndicators(),console.log(`⚔️ Created ${s.validTiles.length} adjacent attack indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),se&&se.endTurn()})}else if(n.targetingType==="dual-rotational"){console.log("🔄 Dual-rotational skill - allowing target selection with rotation");const r=this.calculateSkillTargets(e,t,n,4);this.actionManager.setSkillTargeting(n,r),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${r.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),se&&se.endTurn()})}else{const s=e.range||1,r=this.calculateSkillTargets(e,t,n,s);this.actionManager.setSkillTargeting(n,r),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${r.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),se&&se.endTurn()})}}calculateSkillTargets(e,t,n,s){const r=[];for(let a=-s;a<=s;a++)for(let o=-s;o<=s;o++){const l=Math.abs(a)+Math.abs(o);if(l>0&&l<=s){const c=t.x+a,d=t.y+o;c>=0&&c<8&&d>=0&&d<8&&this.isValidSkillCenter(c,d,n)&&r.push({x:c,y:d})}}return r}isValidSkillCenter(e,t,n){return n.getTargetPattern(e,t).every(r=>r.x>=0&&r.x<8&&r.y>=0&&r.y<8)}calculateAdjacentAttackTargets(e,t){const n=[],s=new Map;console.log(`⚔️ Calculating adjacent attack targets for ${e.name}`);const r=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];for(const a of r){const o=t.x+a.x,l=t.y+a.y;o>=0&&o<8&&l>=0&&l<8&&(n.push({x:o,y:l}),s.set(`${o},${l}`,[t,{x:o,y:l}]))}return console.log(`⚔️ Found ${n.length} adjacent attack tiles`),{validTiles:n,paths:s}}selectAttackTarget(e,t){const n=this.selectionManager.getSelectedUnit();if(!n)return console.warn("❌ No unit selected"),!1;const s=this.actionManager.selectAttackTarget(e,t,(r,a)=>this.getUnitAtPosition(r,a),n);if(s.success)if(this.actionManager.getCurrentAttackMode()==="skill"){const a=this.actionManager.getCurrentSkill();a?.targetingType==="dual-rotational"?(this.actionManager.showSkillPreview(e,t),this.uiManager.showDualRotationalSkillButtons(a.name,()=>this.confirmSkill(),()=>this.cancelSkill(),()=>this.rotateSkillTargets())):a?.targetingType==="adjacent-attack"?(this.actionManager.setSkillTarget(a,{x:e,y:t}),this.uiManager.showSkillConfirmCancelButtons(a.name,()=>this.confirmSkill(),()=>this.cancelSkill())):this.uiManager.showSkillConfirmCancelButtons(a?.name||"Skill",()=>this.confirmSkill(),()=>this.cancelSkill())}else s.targetUnit&&this.uiManager.showAttackConfirmCancelButtons(()=>this.confirmAttack(),()=>this.cancelAttack());return s.success}confirmAttack(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for attack");return}const t=this.actionManager.confirmAttack(e);if(!t){console.warn("❌ Attack confirmation failed");return}const{damage:n,target:s}=t;console.log("🔍 Debug - About to update unit bars:"),console.log("  - selectedUnit:",e?`${e.name} (${e.team})`:"null"),console.log("  - target:",s?`${s.name} (${s.team})`:"null"),s?this.unitRenderer.updateUnitBars(s):console.warn("❌ target is null, skipping target health bar update"),e?this.unitRenderer.updateUnitBars(e):console.warn("❌ selectedUnit is null, skipping attacker energy bar update"),this.animationManager.showDamageAnimationWithFlicker(s,r=>this.unitRenderer.getUnitPosition(r),r=>this.unitRenderer.getUnitMesh(r)),s.currentHealth<=0&&setTimeout(()=>{this.animationManager.showDeathAnimation(s,r=>this.unitRenderer.getUnitPosition(r),()=>{if(console.log(`🗑️ Removing dead unit: ${s.name}`),this.removeUnit(s),se){const r=s.team==="player"?"player":"enemy";se.onUnitDeath(s.id,r),console.log(`☠️ Notified turn manager of ${s.name} death (${r} team)`)}setTimeout(()=>{this.checkGameEndConditions()},100)})},900),this.exitActionPhase(),se&&se.endTurn()}cancelAttack(){this.actionManager.cancelAttack(),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),se&&se.endTurn()})}confirmSkill(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for skill");return}const t=this.actionManager.getCurrentSkill(),n=this.actionManager.confirmSkill(e,(a,o)=>this.getUnitAtPosition(a,o));if(!n){console.warn("❌ Skill confirmation failed");return}const{affectedUnits:s}=n;this.unitRenderer.updateUnitBars(e),s.forEach(a=>{if(this.unitRenderer.updateUnitBars(a),t){const o=e.skillDamage+(t.bonusDamage||0);this.animationManager.showSkillEffectAnimation(a,o,t.emoji,c=>this.unitRenderer.getUnitPosition(c),c=>this.unitRenderer.getUnitMesh(c),!1)}else this.animationManager.showDamageAnimationWithFlicker(a,o=>this.unitRenderer.getUnitPosition(o),o=>this.unitRenderer.getUnitMesh(o))});const r=s.filter(a=>a.currentHealth<=0);if(r.length>0){let a=0;r.forEach(o=>{setTimeout(()=>{this.animationManager.showDeathAnimation(o,l=>this.unitRenderer.getUnitPosition(l),()=>{if(console.log(`🗑️ Removing dead unit: ${o.name}`),this.removeUnit(o),se){const l=o.team==="player"?"player":"enemy";se.onUnitDeath(o.id,l),console.log(`☠️ Notified turn manager of ${o.name} death (${l} team)`)}a++,a===r.length&&setTimeout(()=>{this.checkGameEndConditions()},100)})},900)})}this.exitActionPhase(),se&&se.endTurn()}cancelSkill(){console.log("❌ Cancelling skill selection");const e=this.selectionManager.getSelectedUnit();e&&this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),se&&se.endTurn()})}rotateSkillTargets(){console.log("🔄 Rotating skill targets"),this.actionManager.rotateSkillTargets()}}function Dg(i,e,t){console.log("Creating full tilemap mesh...");const n=Math.floor(e.image.width/i.tilewidth);console.log("Tileset columns for full map:",n);const s=[],r=[],a=[],o=[];let l=0;const c=0;if(i.layers.forEach(h=>{if(h.type==="tilelayer"&&h.visible&&h.data)for(let g=0;g<h.height;g++)for(let y=0;y<h.width;y++){const m=h.data[g*h.width+y];if(m===c)continue;const p=i.tilesets[0].firstgid,M=m-p;if(M<0)continue;const x=M%n,T=Math.floor(M/n),P=x*i.tilewidth/e.image.width,w=(x+1)*i.tilewidth/e.image.width,A=T*i.tileheight/e.image.height,V=(T+1)*i.tileheight/e.image.height,v=y*i.tilewidth*t,b=-g*i.tileheight*t;s.push(v,b,0),r.push(P,A),o.push(0,0,1),s.push(v,b-i.tileheight*t,0),r.push(P,V),o.push(0,0,1),s.push(v+i.tilewidth*t,b,0),r.push(w,A),o.push(0,0,1),s.push(v+i.tilewidth*t,b-i.tileheight*t,0),r.push(w,V),o.push(0,0,1),a.push(l+0,l+1,l+2),a.push(l+2,l+1,l+3),l+=4}}),s.length===0)return console.log("No vertices to render for the full map."),null;const d=new vn;d.setAttribute("position",new dn(s,3)),d.setAttribute("uv",new dn(r,2)),d.setAttribute("normal",new dn(o,3)),d.setIndex(a);const u=new pt({map:e,color:16777215,side:xn}),f=new tt(d,u);return console.log("Full tilemap mesh created."),f}let tn=null;function Ig(i){const e=document.createElement("div");return e.id="game-info-panel",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.width="280px",e.style.minHeight="120px",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="15px",e.style.borderRadius="8px",e.style.border="2px solid #555",e.style.display="none",e.style.zIndex="101",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.fontFamily="Arial, sans-serif",e.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",e.style.boxShadow="0 0 10px rgba(52, 152, 219, 0.5)",i.appendChild(e),e}function Ng(i){if(!tn)return;const e=i.team==="player"?"#3498db":i.team==="enemy"?"#e74c3c":"#95a5a6",t=Math.max(0,Math.min(100,i.currentHealth/i.health*100)),n=i.maxEnergy>0?Math.max(0,Math.min(100,i.currentEnergy/i.maxEnergy*100)):0;tn.innerHTML=`
        <div style="border-bottom: 1px solid ${e}; margin-bottom: 10px; padding-bottom: 8px;">
            <h4 style="margin: 0; text-align: center; color: ${e}; font-size: 1.1em;">
                ${i.name}
            </h4>
            <p style="margin: 2px 0; text-align: center; font-style: italic; color: #bdc3c7; font-size: 0.85em;">
                ${i.className} (${i.team||"neutral"}) - Level ${i.level} - ${i.energyType}
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
        
        <!-- Skills Section -->
        ${i.skills&&i.skills.length>0?`
            <div style="margin-top: 12px; border-top: 1px solid #555; padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; color: #8e44ad; font-size: 0.9em;">Skills:</h5>
                ${i.skills.map(s=>`
                    <div style="margin-bottom: 4px; padding: 4px 6px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
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
    `}function kg(i){tn&&(Ng(i),tn.style.display="block")}function to(){tn&&(tn.style.display="none")}function Fg(i){tn=Ig(i),console.log("Game info panel initialized")}function Og(){tn&&tn.parentNode&&tn.parentNode.removeChild(tn),tn=null}let We={mapData:null,hoverMesh:null,renderer:null,displayScale:1},Fn=null;function Bg(i,e,t,n){We.mapData=i,We.hoverMesh=e,We.renderer=t,We.displayScale=n}function Vl(i){if(!We.mapData||!ut||!We.hoverMesh||!We.renderer)return;const e=4,t=We.renderer.domElement,n=t.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,a=n.width,o=n.height;if(s<0||r<0||s>=a||r>=o){ut.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default";return}const l=s/We.displayScale,c=r/We.displayScale,d=We.mapData.tilewidth*e,u=We.mapData.tileheight*e,f=Math.floor(l/d),h=Math.floor(c/u);if(f>=0&&f<We.mapData.width&&h>=0&&h<We.mapData.height){ut.innerText=`Tile: (${f}, ${h})`,We.hoverMesh.position.x=f*d+d/2,We.hoverMesh.position.y=-h*u-u/2,We.hoverMesh.visible=!0;const g=window.GAME_SCENE_INSTANCE;if(g){const y=g.getUnitAtPosition(f,h);y&&se&&se.canSelect()&&se.canSelectUnit(y.id)?t.style.cursor="pointer":t.style.cursor="none",y&&y!==Fn?(Fn=y,kg(y)):!y&&Fn&&(Fn=null,to())}else t.style.cursor="none"}else ut.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default",Fn&&(Fn=null,to())}function Wl(i){if(!We.mapData||!We.renderer||!se)return;const e=4,n=We.renderer.domElement.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,a=n.width,o=n.height;if(s<0||r<0||s>=a||r>=o)return;const l=s/We.displayScale,c=r/We.displayScale,d=We.mapData.tilewidth*e,u=We.mapData.tileheight*e,f=Math.floor(l/d),h=Math.floor(c/u);if(f>=0&&f<We.mapData.width&&h>=0&&h<We.mapData.height){const g=window.GAME_SCENE_INSTANCE;if(g){const y=g.getUnitAtPosition(f,h);if(se&&se.canSelect())y&&(se.getSelectableUnits().some(M=>M.id===y.id)?g.selectUnit(y)?(console.log(`✅ Successfully selected unit: ${y.name}`),se.advancePhase()):console.log(`❌ Failed to select unit: ${y.name}`):console.log(`❌ Unit not selectable: ${y.name}`));else if(se&&se.canAct()){const m=g.selectAttackTarget(f,h);console.log(m?y?`✅ Successfully selected attack target: ${y.name} at (${f}, ${h})`:`✅ Successfully selected attack target position: (${f}, ${h})`:y?`❌ Invalid attack target: ${y.name} at (${f}, ${h})`:`❌ Invalid attack target position: (${f}, ${h})`)}else if(se&&se.canMove()&&!y){const m=g.selectMoveTarget(f,h);console.log(m?`✅ Successfully selected move target: (${f}, ${h})`:`❌ Invalid move target: (${f}, ${h})`)}}}}function $l(){We.hoverMesh&&ut&&(We.hoverMesh.visible=!1,ut.innerText="Outside map",We.renderer&&(We.renderer.domElement.style.cursor="default")),Fn&&(Fn=null,to())}function zg(i){i.domElement.addEventListener("mousemove",Vl,!1),i.domElement.addEventListener("mouseleave",$l,!1),i.domElement.addEventListener("click",Wl,!1)}function Hg(i){i.domElement.removeEventListener("mousemove",Vl),i.domElement.removeEventListener("mouseleave",$l),i.domElement.removeEventListener("click",Wl)}let Fs=null,ft={renderer:null,scene:null,camera:null};function Gg(i,e,t){ft.renderer=i,ft.scene=e,ft.camera=t}function Xl(){Fs=requestAnimationFrame(Xl),ft.renderer&&ft.scene&&ft.camera&&ft.renderer.render(ft.scene,ft.camera)}function Vg(){Xl(),console.log("Animation loop started")}function Wg(){Fs!==null&&(cancelAnimationFrame(Fs),Fs=null,console.log("Animation loop stopped"))}function $g(){Wg(),ft.renderer&&(ft.renderer.dispose(),ft.renderer.domElement.parentNode&&ft.renderer.domElement.parentNode.removeChild(ft.renderer.domElement)),ft.scene&&ft.scene.traverse(i=>{i instanceof tt&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()))}),ft.renderer=null,ft.scene=null,ft.camera=null,console.log("Renderer cleaned up.")}let Ri=null,Pt=null,Us=1,Yt=null,re=null,Ki=null;async function Xg(i){try{const f=await fetch("./TacticaMap.tmj");if(!f.ok)throw new Error(`HTTP error! status: ${f.status}`);Pt=await f.json(),console.log("Tiled Map Data Loaded via fetch:",Pt),Lg(Pt.tilewidth*4,Pt.tileheight*4),console.log(`Tile size set to ${Pt.tilewidth*4}x${Pt.tileheight*4}`)}catch(f){console.error("Error loading Tiled map data via fetch:",f);return}if(!Pt)return;re=new sg,re.background=new Xe(2236962),console.log("Three.js scene initialized");const t=Pt.width*Pt.tilewidth,n=Pt.height*Pt.tileheight,s=t*4,r=n*4;Ki=new Il(0,s,0,-r,1,1e3),Ki.position.z=10,console.log("Camera initialized"),Yt=new Hl({antialias:!1,powerPreference:"high-performance"}),Yt.setSize(s,r),i.appendChild(Yt.domElement),console.log("Renderer initialized"),Us=1,Yt.domElement.style.width=`${s*Us}px`,Yt.domElement.style.height=`${r*Us}px`,Yt.domElement.style.imageRendering="pixelated",Yt.domElement.style.imageRendering="crisp-edges";const a=new Gi;let o,l;try{o=await a.loadAsync(cg),o.magFilter=Ye,o.minFilter=Ye,o.flipY=!1,console.log("Map Texture Loaded:",o),l=await a.loadAsync(uo),l.magFilter=Ye,l.minFilter=Ye,l.flipY=!1,console.log("Hover Texture Loaded:",l)}catch(f){console.error("Error loading textures:",f);return}const c=Dg(Pt,o,4);c&&re?(re.add(c),console.log("Map mesh added to scene")):console.error("Failed to create full tilemap mesh.");const d=new ct(Pt.tilewidth*4,Pt.tileheight*4),u=new pt({map:l,transparent:!0,side:xn});Ri=new tt(d,u),Ri.position.z=1,Ri.visible=!1,re&&(re.add(Ri),console.log("Hover selector added to scene")),Bg(Pt,Ri,Yt,Us),zg(Yt),Gg(Yt,re,Ki),Vg(),console.log("Three.js game started successfully")}function qg(){Yt&&Hg(Yt),$g(),Yt=null,re=null,Ki=null,Pt=null,Ri=null,console.log("Game cleaned up.")}function Yg(i,e){const t=document.createElement("div");t.id="splash-screen",t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="#1a1a1a",t.style.display="flex",t.style.flexDirection="column",t.style.justifyContent="center",t.style.alignItems="center",t.style.zIndex="1000";const n=document.createElement("h1");n.textContent="Magepunk Presents: Tactica Trials",n.style.color="#e0e0e0",n.style.fontSize="2.5em",n.style.marginBottom="30px",n.style.fontFamily='"Arial Black", Gadget, sans-serif';const s=document.createElement("button");s.textContent="Start Game",s.style.padding="15px 30px",s.style.fontSize="1.5em",s.style.backgroundColor="#4CAF50",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)",s.onmouseover=()=>s.style.backgroundColor="#45a049",s.onmouseout=()=>s.style.backgroundColor="#4CAF50";const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.marginTop="20px",r.style.marginBottom="10px";const a=document.createElement("input");a.type="checkbox",a.id="debug-mode-checkbox",a.checked=Dt(),a.style.marginRight="10px",a.style.transform="scale(1.2)",a.style.cursor="pointer";const o=document.createElement("label");o.htmlFor="debug-mode-checkbox",o.textContent="Debug Mode (Player controls enemies)",o.style.color="#e0e0e0",o.style.fontSize="1.1em",o.style.cursor="pointer",o.style.userSelect="none",o.onmouseover=()=>o.style.color="#f0f0f0",o.onmouseout=()=>o.style.color="#e0e0e0";const l=()=>{Sg(a.checked)};a.addEventListener("change",l),r.appendChild(a),r.appendChild(o);const c=()=>{d(),e()};s.addEventListener("click",c),t.appendChild(n),t.appendChild(r),t.appendChild(s),i.appendChild(t);const d=()=>{s.removeEventListener("click",c),a.removeEventListener("change",l),t.parentNode&&t.parentNode.removeChild(t),console.log("Splash screen cleaned up.")};return d}class bi{constructor(e,t,n,s,r,a,o){this.id=e,this.name=t,this.level=n,this.imageUrl=s,this.reward=r,this.battleCondition=a,this.enemies=o}}const jg="/assets/standardglobe-K-BPCSY1.png",Zg="/assets/neonrealm-B38s6ror.png",Kg="/assets/wormwoodcastle-C2u0nrjN.png",Jg="/assets/templeofrelics-CJ0WGYAS.png",Qg="/assets/cave-PQ6A8Eo4.png",ey="/assets/forest-CSRimZNq.png",Ti={NORMAL:{name:"Standard Battle",description:"A standard battle with no special conditions.",effect:()=>{}}},Ai={STANDARD:{resource:10}};function jn(i){const e=sl.createUnit(i,"enemy");return e||(console.error(`Failed to create enemy unit of type ${i}`),null)}const ty=[new bi("standard-globe","Standard Globe",1,jg,Ai.STANDARD,Ti.NORMAL,[jn("swordsman")]),new bi("neon-realm","Neon Realm",1,Zg,Ai.STANDARD,Ti.NORMAL,[jn("swordsman")]),new bi("wormwood-castle","Wormwood Castle",1,Kg,Ai.STANDARD,Ti.NORMAL,[jn("swordsman")]),new bi("temple-of-relics","Temple of Relics",1,Jg,Ai.STANDARD,Ti.NORMAL,[jn("healer"),jn("hater")]),new bi("the-caves","Cave",1,Qg,Ai.STANDARD,Ti.NORMAL,[jn("swordsman")]),new bi("the-forest","Forest",1,ey,Ai.STANDARD,Ti.NORMAL,[jn("swordsman")])];function ny(i,e=3){return[...ty.filter(s=>s.level===i)].sort(()=>Math.random()-.5).slice(0,e)}let ho=null;function iy(i){ho=i}function sy(){return ho}function ry(){ho=null}let Ja=[];function oy(i,e){Ja=ny(1);const t=Se.playerParty.length>0;console.log("Showing Encounter Scene..."),i.innerHTML="";const n=document.createElement("div");n.id="encounter-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");if(s.textContent="ENCOUNTER",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0",!t){const c=document.createElement("div");c.style.width="100%",c.style.padding="15px",c.style.backgroundColor="#e74c3c",c.style.color="#ffffff",c.style.borderRadius="8px",c.style.textAlign="center",c.style.fontSize="1.2em",c.style.fontWeight="bold",c.style.marginBottom="15px",c.style.border="2px solid #c0392b",c.innerHTML='⚠️ NO UNITS AVAILABLE!<br><span style="font-size: 0.9em; font-weight: normal;">You need to purchase units from the Shop before entering battles.</span>',n.appendChild(c)}const r=document.createElement("div");r.id="encounter-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-around",r.style.alignItems="center",r.style.overflow="hidden",r.style.padding="20px",Ja.forEach((c,d)=>{const u=document.createElement("div");u.style.width="250px",u.style.height="350px",u.style.border=t?"2px solid #3498db":"2px solid #7f8c8d",u.style.borderRadius="10px",u.style.padding="15px",u.style.display="flex",u.style.flexDirection="column",u.style.alignItems="center",u.style.justifyContent="space-between",u.style.backgroundColor=t?"#34495e":"#2c3e50",u.style.cursor=t?"pointer":"not-allowed",u.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",u.style.opacity=t?"1":"0.5";const f=document.createElement("img");f.src=c.imageUrl,f.alt=c.name,f.style.width="150px",f.style.height="150px",f.style.objectFit="contain",f.style.marginBottom="10px",f.style.filter=t?"none":"grayscale(100%)";const h=document.createElement("h3");h.textContent=c.name,h.style.margin="0 0 10px 0",h.style.textAlign="center";const g=document.createElement("p");g.textContent=`Level ${c.level}`,g.style.margin="0 0 10px 0",g.style.color="#f1c40f";const y=document.createElement("p");y.textContent=c.battleCondition.name,y.style.margin="0 0 10px 0",y.style.fontStyle="italic";const m=document.createElement("p");m.textContent=`Reward: ${c.reward.resource} Resources`,m.style.margin="0 0 10px 0",m.style.color="#2ecc71";const p=document.createElement("p");p.textContent=`Enemies: ${c.enemies.length}`,p.style.margin="0 0 10px 0",t?(u.onclick=()=>{const M=document.querySelector(".selected-globe");M&&(M.classList.remove("selected-globe"),M.style.transform="translateY(0)",M.style.boxShadow="none"),u.classList.add("selected-globe"),u.style.transform="translateY(-10px)",u.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)",iy(c),console.log("Selected globe stored:",c),console.log("Navigating to game scene with selected globe"),e()},u.addEventListener("mouseenter",()=>{u.classList.contains("selected-globe")||(u.style.transform="translateY(-5px)",u.style.boxShadow="0px 3px 10px rgba(0,0,0,0.2)")}),u.addEventListener("mouseleave",()=>{u.classList.contains("selected-globe")||(u.style.transform="translateY(0)",u.style.boxShadow="none")})):u.addEventListener("mouseenter",()=>{u.title="Purchase units from the Shop first!"}),u.appendChild(f),u.appendChild(h),u.appendChild(g),u.appendChild(y),u.appendChild(m),u.appendChild(p),r.appendChild(u)});const a=document.createElement("div");a.style.width="100%",a.style.display="flex",a.style.justifyContent="space-between",a.style.alignItems="center",a.style.paddingTop="15px",a.style.flexShrink="0";const o=document.createElement("div");o.id="player-resource-display",o.textContent=`Resource: ${mn.resource}`,o.style.padding="10px 15px",o.style.backgroundColor="#1a1a1a",o.style.color="#f1c40f",o.style.borderRadius="5px",o.style.fontSize="1em",o.style.fontWeight="bold",o.style.display="flex",o.style.alignItems="center";const l=document.createElement("div");l.id="squad-info-display",l.textContent=`Squad: ${Se.playerParty.length}/5 units`,l.style.padding="10px 15px",l.style.backgroundColor=t?"#27ae60":"#e74c3c",l.style.color="#ffffff",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.display="flex",l.style.alignItems="center",a.appendChild(l),a.appendChild(o),n.appendChild(s),n.appendChild(r),n.appendChild(a),i.appendChild(n),console.log("Encounter Scene displayed.")}class Qa{constructor(e,t){this.handler=e,this.unitsUsedThisRound=t}onUnitDeath(e,t){console.log(`💀 Unit died: ${e} (${t} team)`),t==="player"?this.unitsUsedThisRound[Ge.PLAYER_ONE].delete(e):this.unitsUsedThisRound[Ge.PLAYER_TWO].delete(e),vt("Unit death processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitAdded(e,t){console.log(`➕ Unit added/revived: ${e} (${t} team)`),vt("Unit addition processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitHealthChanged(e,t,n,s){const r=s>0,a=n>0;r!==a&&(a?this.onUnitAdded(e,t):this.onUnitDeath(e,t))}}class ay{constructor(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[Ge.PLAYER_ONE]:0,[Ge.PLAYER_TWO]:0},unitsUsedThisRound:{[Ge.PLAYER_ONE]:new Set,[Ge.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new Qa(this,this.roundState.unitsUsedThisRound)}getRoundNumber(){return this.roundState.roundNumber}getActionableUnitLimit(){return this.roundState.actionableUnitLimit}getTurnsTakenThisRound(e){return this.roundState.turnsTakenThisRound[e]}canTakeAnotherTurn(e){return this.roundState.turnsTakenThisRound[e]<this.roundState.actionableUnitLimit}markUnitAsUsed(e,t){this.roundState.unitsUsedThisRound[t].add(e),vt("Unit marked as used this round",{unitId:e,player:t,roundNumber:this.roundState.roundNumber})}canSelectUnit(e,t){return!this.roundState.unitsUsedThisRound[t].has(e)}recalculateActionableUnitLimit(){const e=this.roundState.actionableUnitLimit,t=wi.calculateActionableUnitLimit();if(t!==e){console.log(`🔄 Unit count changed! Recalculating actionable unit limit: ${e} → ${t}`),this.roundState.actionableUnitLimit=t;const n=this.roundState.turnsTakenThisRound[Ge.PLAYER_ONE]>t,s=this.roundState.turnsTakenThisRound[Ge.PLAYER_TWO]>t;(n||s)&&(console.log(`⚠️ Turn limit exceeded! P1: ${this.roundState.turnsTakenThisRound[Ge.PLAYER_ONE]}/${t}, P2: ${this.roundState.turnsTakenThisRound[Ge.PLAYER_TWO]}/${t}`),console.log("🔄 Round will end immediately after current turn completes"),this.roundState.shouldEndRoundAfterTurn=!0,vt("Round marked for immediate ending",{previousLimit:e,newLimit:t,player1Turns:this.roundState.turnsTakenThisRound[Ge.PLAYER_ONE],player2Turns:this.roundState.turnsTakenThisRound[Ge.PLAYER_TWO],player1Exceeded:n,player2Exceeded:s}));const r=wi.getAliveUnitCounts();vt("Actionable unit limit recalculated",{previousLimit:e,newLimit:t,alivePlayerUnits:r.player,aliveEnemyUnits:r.enemy,currentRound:this.roundState.roundNumber})}}startNewRound(){this.roundState.roundNumber++,this.roundState.actionableUnitLimit=wi.calculateActionableUnitLimit(),this.roundState.turnsTakenThisRound[Ge.PLAYER_ONE]=0,this.roundState.turnsTakenThisRound[Ge.PLAYER_TWO]=0,this.roundState.unitsUsedThisRound[Ge.PLAYER_ONE].clear(),this.roundState.unitsUsedThisRound[Ge.PLAYER_TWO].clear(),this.roundState.shouldEndRoundAfterTurn=!1,console.log(`🔄 NEW ROUND ${this.roundState.roundNumber} STARTED!`),console.log(`📊 Actionable Unit Limit: ${this.roundState.actionableUnitLimit}`),console.log("🔄 All units are now eligible for selection again");const e=wi.getAliveUnitCounts();vt("New round started",{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,alivePlayerUnits:e.player,aliveEnemyUnits:e.enemy})}shouldStartNewRound(){if(this.roundState.shouldEndRoundAfterTurn)return!0;const e=this.roundState.turnsTakenThisRound[Ge.PLAYER_ONE]>=this.roundState.actionableUnitLimit,t=this.roundState.turnsTakenThisRound[Ge.PLAYER_TWO]>=this.roundState.actionableUnitLimit;return e&&t}incrementTurnCount(e){this.roundState.turnsTakenThisRound[e]++}isRoundEndingAfterTurn(){return this.roundState.shouldEndRoundAfterTurn}getUnitsUsedThisRound(e){return Array.from(this.roundState.unitsUsedThisRound[e])}hasUnitBeenUsedThisRound(e,t){return this.roundState.unitsUsedThisRound[t].has(e)}onUnitDeath(e,t){this.unitEventHandler.onUnitDeath(e,t)}onUnitAdded(e,t){this.unitEventHandler.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.unitEventHandler.onUnitHealthChanged(e,t,n,s)}forceNewRound(){this.startNewRound()}reset(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[Ge.PLAYER_ONE]:0,[Ge.PLAYER_TWO]:0},unitsUsedThisRound:{[Ge.PLAYER_ONE]:new Set,[Ge.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new Qa(this,this.roundState.unitsUsedThisRound)}getRoundState(){return{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,turnsTakenThisRound:{...this.roundState.turnsTakenThisRound},unitsUsedThisRound:{[Ge.PLAYER_ONE]:new Set(this.roundState.unitsUsedThisRound[Ge.PLAYER_ONE]),[Ge.PLAYER_TWO]:new Set(this.roundState.unitsUsedThisRound[Ge.PLAYER_TWO])},shouldEndRoundAfterTurn:this.roundState.shouldEndRoundAfterTurn}}getAliveUnitCounts(){return wi.getAliveUnitCounts()}}class ly{constructor(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1}}getCurrentPhase(){return this.currentPhase}getPhaseSkipped(){return{...this.phaseSkipped}}advancePhase(){const e=this.currentPhase;switch(this.currentPhase){case ht.SELECT:this.currentPhase=ht.MOVE,this.phaseSkipped.move=!1;break;case ht.MOVE:this.currentPhase=ht.ACTION,this.phaseSkipped.action=!1;break;case ht.ACTION:break}return console.log(`➡️ Phase: ${this.getPhaseDisplayName(e)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase advanced",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}skipPhase(){const e=this.currentPhase;switch(this.currentPhase){case ht.SELECT:return console.warn("❌ Cannot skip SELECT phase"),this.currentPhase;case ht.MOVE:this.phaseSkipped.move=!0,this.currentPhase=ht.ACTION,console.log("⏭️ MOVE phase skipped");break;case ht.ACTION:this.phaseSkipped.action=!0,console.log("⏭️ ACTION phase skipped");break}return vt("Phase skipped",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}resetToSelect(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1},vt("Phase reset to SELECT",{currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped})}canMove(){return this.currentPhase===ht.MOVE}canAct(){return this.currentPhase===ht.ACTION}canSelect(){return this.currentPhase===ht.SELECT}getPhaseDisplayName(e){return{[ht.SELECT]:"Unit Selection",[ht.MOVE]:"Movement",[ht.ACTION]:"Action"}[e]||"Unknown"}forceSetPhase(e){Xs(`Forcing phase change from ${this.currentPhase} to ${e}`);const t=this.currentPhase;this.currentPhase=e,console.log(`🔧 Phase forced: ${this.getPhaseDisplayName(t)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase forced",{previousPhase:t,currentPhase:this.currentPhase})}reset(){this.currentPhase=ht.SELECT,this.phaseSkipped={move:!1,action:!1}}}class cy{constructor(e=Ge.PLAYER_ONE){this.currentPlayer=e}getCurrentPlayer(){return this.currentPlayer}switchPlayer(){const e=this.currentPlayer;return this.currentPlayer=this.getOpposingPlayer(this.currentPlayer),console.log(`🔄 Player switched: ${this.getPlayerDisplayName(e)} → ${this.getPlayerDisplayName(this.currentPlayer)}`),vt("Player switched",{previousPlayer:e,currentPlayer:this.currentPlayer}),this.currentPlayer}getOpposingPlayer(e){return e===Ge.PLAYER_ONE?Ge.PLAYER_TWO:Ge.PLAYER_ONE}isPlayerTurn(e){return this.currentPlayer===e}getPlayerDisplayName(e){return{[Ge.PLAYER_ONE]:"Player 1",[Ge.PLAYER_TWO]:"Player 2"}[e]||"Unknown Player"}forceSetPlayer(e){Xs(`Forcing player change from ${this.currentPlayer} to ${e}`);const t=this.currentPlayer;this.currentPlayer=e,vt("Player forced",{previousPlayer:t,currentPlayer:this.currentPlayer})}reset(e=Ge.PLAYER_ONE){this.currentPlayer=e}}class dy{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}getSelectableUnits(){const e=this.playerManager.getCurrentPlayer();return(e===Ge.PLAYER_ONE?Se.playerParty:Se.enemyUnits).filter(n=>n.currentHealth>0&&this.roundManager.canSelectUnit(n.id,e))}canTakeAnotherTurn(){return this.roundManager.canTakeAnotherTurn(this.playerManager.getCurrentPlayer())}getGameState(e,t){const n=this.roundManager.getAliveUnitCounts(),s=this.roundManager.getRoundState();return{currentPlayer:this.playerManager.getCurrentPlayer(),currentPlayerName:this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer()),currentPhase:this.phaseManager.getCurrentPhase(),currentPhaseName:this.phaseManager.getPhaseDisplayName(this.phaseManager.getCurrentPhase()),turnCount:e,roundNumber:this.roundManager.getRoundNumber(),actionableUnitLimit:this.roundManager.getActionableUnitLimit(),turnsTakenThisRound:s.turnsTakenThisRound,canTakeAnotherTurn:this.canTakeAnotherTurn(),shouldEndRoundAfterTurn:this.roundManager.isRoundEndingAfterTurn(),gameStarted:t,canMove:this.phaseManager.canMove(),canAct:this.phaseManager.canAct(),canSelect:this.phaseManager.canSelect(),phaseSkipped:this.phaseManager.getPhaseSkipped(),alivePlayerUnits:n.player,aliveEnemyUnits:n.enemy,selectableUnits:this.getSelectableUnits().length}}isRoundEndingAfterTurn(){return this.roundManager.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.roundManager.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.roundManager.hasUnitBeenUsedThisRound(e,t)}markUnitAsUsed(e){this.roundManager.markUnitAsUsed(e,this.playerManager.getCurrentPlayer())}canSelectUnit(e){return this.roundManager.canSelectUnit(e,this.playerManager.getCurrentPlayer())}}class uy{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}forceRecalculateActionableUnitLimit(){Xs("Forcing recalculation of actionable unit limit"),this.roundManager.recalculateActionableUnitLimit()}forceSetPlayer(e){this.playerManager.forceSetPlayer(e),this.phaseManager.resetToSelect()}forceSetPhase(e){this.phaseManager.forceSetPhase(e)}forceNewRound(){Xs("Forcing new round to start"),this.roundManager.forceNewRound()}}var Ge=(i=>(i.PLAYER_ONE="PLAYER_ONE",i.PLAYER_TWO="PLAYER_TWO",i))(Ge||{}),ht=(i=>(i.SELECT="SELECT",i.MOVE="MOVE",i.ACTION="ACTION",i))(ht||{});class hy{constructor(e="PLAYER_ONE"){this.selectedUnitId=null,this.turnCount=1,this.gameStarted=!1,this.roundManager=new ay,this.phaseManager=new ly,this.playerManager=new cy(e),this.gameStateAggregator=new dy(this.roundManager,this.phaseManager,this.playerManager),this.debugger=new uy(this.roundManager,this.phaseManager,this.playerManager),vt("TurnManager initialized",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}getCurrentPlayer(){return this.playerManager.getCurrentPlayer()}getCurrentPhase(){return this.phaseManager.getCurrentPhase()}getTurnCount(){return this.turnCount}getRoundNumber(){return this.roundManager.getRoundNumber()}getActionableUnitLimit(){return this.roundManager.getActionableUnitLimit()}getTurnsTakenThisRound(e){return this.roundManager.getTurnsTakenThisRound(e)}isGameStarted(){return this.gameStarted}markUnitAsUsed(e){this.gameStateAggregator.markUnitAsUsed(e)}canSelectUnit(e){return this.gameStateAggregator.canSelectUnit(e)}getSelectableUnits(){return this.gameStateAggregator.getSelectableUnits()}setSelectedUnit(e){this.selectedUnitId=e}getSelectedUnitId(){return this.selectedUnitId}startGame(){if(this.gameStarted){console.warn("⚠️ Game already started");return}this.gameStarted=!0,this.roundManager.recalculateActionableUnitLimit(),console.log("🎮 GAME STARTED!"),console.log(`👤 Starting Player: ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}`),console.log(`📊 Actionable Unit Limit: ${this.roundManager.getActionableUnitLimit()}`),vt("Game started",{startingPlayer:this.playerManager.getCurrentPlayer(),actionableUnitLimit:this.roundManager.getActionableUnitLimit()})}advancePhase(){if(!this.gameStarted){console.warn("❌ Cannot advance phase - game not started");return}this.phaseManager.advancePhase()}skipPhase(){if(!this.gameStarted){console.warn("❌ Cannot skip phase - game not started");return}this.phaseManager.skipPhase()}endTurn(){if(!this.gameStarted){console.warn("❌ Cannot end turn - game not started");return}const e=this.playerManager.getCurrentPlayer();this.selectedUnitId?(this.markUnitAsUsed(this.selectedUnitId),console.log(`🎯 Unit ${this.selectedUnitId} marked as used for this round`)):console.warn("⚠️ No unit was selected for this turn"),this.roundManager.incrementTurnCount(e),this.turnCount++,console.log(`🔚 Turn ${this.turnCount-1} ended for ${this.playerManager.getPlayerDisplayName(e)}`),console.log(`📊 Turns taken this round: P1=${this.roundManager.getTurnsTakenThisRound("PLAYER_ONE")}, P2=${this.roundManager.getTurnsTakenThisRound("PLAYER_TWO")}`),this.roundManager.shouldStartNewRound()&&this.roundManager.startNewRound(),this.playerManager.switchPlayer(),this.phaseManager.resetToSelect(),this.selectedUnitId=null,console.log(`🎯 Turn ${this.turnCount} - ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}'s turn`),vt("Turn ended",{previousPlayer:e,newPlayer:this.playerManager.getCurrentPlayer(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}canTakeAnotherTurn(){return this.gameStateAggregator.canTakeAnotherTurn()}canMove(){return this.phaseManager.canMove()}canAct(){return this.phaseManager.canAct()}canSelect(){return this.phaseManager.canSelect()}isPlayerTurn(e){return this.playerManager.isPlayerTurn(e)}getPlayerDisplayName(e){return this.playerManager.getPlayerDisplayName(e)}getPhaseDisplayName(e){return this.phaseManager.getPhaseDisplayName(e)}getOpposingPlayer(e){return this.playerManager.getOpposingPlayer(e)}getGameState(){return this.gameStateAggregator.getGameState(this.turnCount,this.gameStarted)}isRoundEndingAfterTurn(){return this.gameStateAggregator.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.gameStateAggregator.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.gameStateAggregator.hasUnitBeenUsedThisRound(e,t)}reset(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.selectedUnitId=null,this.roundManager.reset(),this.phaseManager.reset(),this.playerManager.reset(e),console.log("🔄 TurnManager reset"),vt("TurnManager reset",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}forceRecalculateActionableUnitLimit(){this.debugger.forceRecalculateActionableUnitLimit()}forceSetPlayer(e){this.debugger.forceSetPlayer(e)}forceSetPhase(e){this.debugger.forceSetPhase(e)}forceNewRound(){this.debugger.forceNewRound()}onUnitDeath(e,t){this.roundManager.onUnitDeath(e,t)}onUnitAdded(e,t){this.roundManager.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.roundManager.onUnitHealthChanged(e,t,n,s)}recalculateActionableUnitLimit(){this.gameStarted&&this.roundManager.recalculateActionableUnitLimit()}}function ql(){const i=new hy,e=i.advancePhase.bind(i),t=i.endTurn.bind(i),n=i.startGame.bind(i);return i.advancePhase=function(){e(),Os(i),fy(i)},i.endTurn=function(){t(),Os(i),Bs()},i.startGame=function(){n(),Os(i)},i}function fo(i){const e=i.getGameState();return`Turn ${e.turnCount} - ${e.currentPlayerName}`}function Yl(i){return`Phase: ${i.getGameState().currentPhaseName}`}function jl(i){return`Round ${i.getGameState().roundNumber}`}function Zl(i){return`Actionable Unit Limit: ${i.getGameState().actionableUnitLimit}`}function Os(i){const e=document.getElementById("turn-display-game-scene");e&&(e.textContent=fo(i));const t=document.getElementById("phase-display-game-scene");t&&(t.textContent=Yl(i));const n=document.getElementById("round-display-game-scene");if(n&&(n.textContent=jl(i)),Dt()){const s=document.getElementById("actionable-unit-limit-display-game-scene");s&&(s.textContent=Zl(i))}if(Dt()){const s=i.getGameState();console.log(`🔄 UI Updated - ${s.currentPlayerName} | ${s.currentPhaseName} | Round ${s.roundNumber}`)}}function fy(i){const e=i.getGameState();Dt()&&(console.log(`🎯 Phase transition: ${e.currentPhaseName}`),console.log(`Can select: ${e.canSelect}, Can move: ${e.canMove}, Can act: ${e.canAct}`));const t=window.GAME_SCENE_INSTANCE;switch(e.currentPhase){case"SELECT":Bs();break;case"MOVE":if(Bs(),t){const n=t.getSelectedUnit();n?(console.log(`🚶 Entering MOVE phase with unit: ${n.name}`),t.enterMovePhase(n)):console.warn("❌ No unit selected for MOVE phase")}else console.warn("❌ GameScene not available for MOVE phase");break;case"ACTION":if(Bs(),t){const n=t.getSelectedUnit();n?(console.log(`⚔️ Entering ACTION phase with unit: ${n.name}`),t.enterActionPhase(n)):console.warn("❌ No unit selected for ACTION phase")}else console.warn("❌ GameScene not available for ACTION phase");break}}function Bs(){const i=window.GAME_SCENE_INSTANCE;i?i.updateUnitSelectionIndicators():Dt()&&console.log("🎯 GameScene not available for updating unit selection indicators")}const py=Object.freeze(Object.defineProperty({__proto__:null,createUIAwareTurnManager:ql,getActionableUnitLimitDisplay:Zl,getPhaseStatusDisplay:Yl,getRoundStatusDisplay:jl,getTurnStatusDisplay:fo,updateTurnDisplay:Os},Symbol.toStringTag,{value:"Module"}));let qs=!1;function my(){qs||(qs=!0,document.addEventListener("keydown",Kl),Dt()&&(console.log("🎮 Game input handler initialized"),console.log("💡 Press ENTER to advance phase, SHIFT+ENTER to skip phase, SPACE to end turn, ESC to show turn info"),console.log("💡 Debug: P for phase info, U for unit info, L to recalc limits, SHIFT+D to kill unit"),console.log("💡 Debug: CTRL+R to reset, SHIFT+R for new round")))}function gy(){qs&&(qs=!1,document.removeEventListener("keydown",Kl),vt("Game input handler cleaned up"))}function Kl(i){if(se)switch(i.code){case"Enter":i.preventDefault(),se.isGameStarted()?i.shiftKey?se.skipPhase():se.advancePhase():console.log("⚠️ Game not started yet!");break;case"Space":i.preventDefault(),se.isGameStarted()?se.endTurn():console.log("⚠️ Game not started yet!");break;case"Escape":i.preventDefault();const e=se.getGameState();console.log("📊 Current Game State:",e),console.log(`📋 Phase Capabilities: Select=${e.canSelect}, Move=${e.canMove}, Act=${e.canAct}`),console.log(`🔄 Round Info: Round ${e.roundNumber}, Limit ${e.actionableUnitLimit}`),console.log(`🎯 Turns taken: P1=${e.turnsTakenThisRound.PLAYER_ONE}/${e.actionableUnitLimit}, P2=${e.turnsTakenThisRound.PLAYER_TWO}/${e.actionableUnitLimit}`),console.log(`👥 Alive units: Player=${e.alivePlayerUnits}, Enemy=${e.aliveEnemyUnits}`),console.log(`🎯 Selectable units: ${e.selectableUnits}`);break;case"KeyR":i.ctrlKey&&Dt()?(i.preventDefault(),console.log("🔄 Resetting turn manager..."),se.reset(),se.startGame()):i.shiftKey&&Dt()&&(i.preventDefault(),console.log("🔄 Forcing new round..."),se.forceNewRound());break;case"KeyP":if(Dt()){i.preventDefault();const t=se.getCurrentPhase();console.log(`📋 Current Phase: ${se.getPhaseDisplayName(t)}`),console.log("🎯 Phase Capabilities:"),console.log(`  Can Select: ${se.canSelect()}`),console.log(`  Can Move: ${se.canMove()}`),console.log(`  Can Act: ${se.canAct()}`)}break;case"KeyU":if(Dt()){i.preventDefault();const t=se.getSelectableUnits();console.log(`🎯 Selectable Units (${t.length}):`),t.forEach(s=>{console.log(`  - ${s.name} (${s.className}) - ID: ${s.id} - HP: ${s.currentHealth}/${s.health}`)});const n=se.getGameState();console.log(`👥 Unit counts: Player=${n.alivePlayerUnits}, Enemy=${n.aliveEnemyUnits}`),console.log(`🔄 Should end round after turn: ${n.shouldEndRoundAfterTurn}`)}break;case"KeyL":Dt()&&(i.preventDefault(),console.log("🔄 Forcing recalculation of actionable unit limit..."),se.forceRecalculateActionableUnitLimit());break;case"KeyD":if(i.shiftKey&&Dt()){i.preventDefault(),console.log("💀 Simulating unit death for testing...");const t=se.getSelectableUnits();if(t.length>0){const n=t[0],s=n.currentHealth;n.currentHealth=0;const r=n.team;se.onUnitHealthChanged(n.id,r,0,s),console.log(`💀 Killed ${n.name} (${r} team)`)}else console.log("⚠️ No selectable units to kill")}break}}function yy(){console.log("🎮 Game Controls:"),console.log("  ENTER - Advance to next phase"),console.log("  SHIFT+ENTER - Skip current phase"),console.log("  SPACE - End current turn"),console.log("  ESC - Show current game state"),Dt()&&(console.log("  P - Show current phase info (debug only)"),console.log("  U - Show selectable units info (debug only)"),console.log("  L - Force recalculate unit limit (debug only)"),console.log("  SHIFT+D - Simulate unit death (debug only)"),console.log("  CTRL+R - Reset turn manager (debug only)"),console.log("  SHIFT+R - Force new round (debug only)"))}let ut=null,se=null;function _y(i,e){const t=()=>{const l=e.querySelector("canvas");e.contains(l)&&qg();const c=i.querySelector("#player-resource-display-game-scene");c&&i.removeChild(c);const d=i.querySelector("#tile-coords-display-game-scene");d&&i.removeChild(d);const u=i.querySelector("#game-info-panel");u&&i.removeChild(u);const f=i.querySelector("#debug-mode-display-game-scene");f&&i.removeChild(f);const h=i.querySelector("#turn-display-game-scene");h&&i.removeChild(h);const g=i.querySelector("#phase-display-game-scene");g&&i.removeChild(g);const y=i.querySelector("#round-display-game-scene");y&&i.removeChild(y);const m=i.querySelector("#actionable-unit-limit-display-game-scene");for(m&&i.removeChild(m),ut&&(ut=null),se&&(se=null),Og(),gy();i.firstChild;)i.removeChild(i.firstChild);i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center"},n=()=>{console.log("Proceeding to game scene..."),so(),t(),i.appendChild(e),Xg(e).then(()=>{const l=document.createElement("div");if(l.id="player-resource-display-game-scene",l.textContent=`Resource: ${mn.resource}`,l.style.position="absolute",l.style.bottom="20px",l.style.left="20px",l.style.padding="10px 15px",l.style.backgroundColor="#1a1a1a",l.style.color="#f1c40f",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.fontFamily="sans-serif",l.style.zIndex="100",i.appendChild(l),ut=document.createElement("div"),ut.id="tile-coords-display-game-scene",ut.style.position="absolute",ut.style.top="10px",ut.style.left="10px",ut.style.color="white",ut.style.fontFamily="sans-serif",ut.style.backgroundColor="rgba(0,0,0,0.5)",ut.style.padding="5px",ut.innerText="Coords: N/A",ut.style.zIndex="100",i.appendChild(ut),Dt()){const h=document.createElement("div");h.id="debug-mode-display-game-scene",h.textContent=`DEBUG MODE: ${Mg()}`,h.style.position="absolute",h.style.top="10px",h.style.right="10px",h.style.padding="8px 12px",h.style.backgroundColor="#e74c3c",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #c0392b",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h)}Fg(i),se=ql();const c=document.createElement("div");c.id="turn-display-game-scene",c.textContent=fo(se),c.style.position="absolute",c.style.top="50px",c.style.left="10px",c.style.padding="8px 12px",c.style.backgroundColor="rgba(52, 152, 219, 0.9)",c.style.color="white",c.style.borderRadius="5px",c.style.fontSize="0.9em",c.style.fontWeight="bold",c.style.fontFamily="sans-serif",c.style.zIndex="100",c.style.border="2px solid #2980b9",c.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(c);const d=document.createElement("div");d.id="phase-display-game-scene",d.textContent="Phase: Select",d.style.position="absolute",d.style.top="90px",d.style.left="10px",d.style.padding="8px 12px",d.style.backgroundColor="rgba(46, 204, 113, 0.9)",d.style.color="white",d.style.borderRadius="5px",d.style.fontSize="0.9em",d.style.fontWeight="bold",d.style.fontFamily="sans-serif",d.style.zIndex="100",d.style.border="2px solid #27ae60",d.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(d);const u=document.createElement("div");if(u.id="round-display-game-scene",u.textContent="Round 1",u.style.position="absolute",u.style.top="130px",u.style.left="10px",u.style.padding="8px 12px",u.style.backgroundColor="rgba(155, 89, 182, 0.9)",u.style.color="white",u.style.borderRadius="5px",u.style.fontSize="0.9em",u.style.fontWeight="bold",u.style.fontFamily="sans-serif",u.style.zIndex="100",u.style.border="2px solid #8e44ad",u.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(u),Dt()){const h=document.createElement("div");h.id="actionable-unit-limit-display-game-scene",h.textContent="Actionable Unit Limit: 0",h.style.position="absolute",h.style.top="170px",h.style.left="10px",h.style.padding="8px 12px",h.style.backgroundColor="rgba(230, 126, 34, 0.9)",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #d35400",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h)}my(),Dt()&&yy();const f=sy();if(f){console.log("Loading selected globe into game scene:",f);const h=new Ug;h.setAppContainer(i),window.GAME_SCENE_INSTANCE=h,h.setSelectedGlobe(f).then(()=>{console.log("✅ Globe loaded successfully")}).catch(g=>{console.error("❌ Failed to load globe:",g)}),ry()}}).catch(l=>{console.error("Failed to start game:",l),e.innerHTML='<p style="color: red; text-align: center; font-family: sans-serif; padding: 20px;">Error: Could not load the game. Please check the console for more details.</p>'})},s=()=>{console.log("Transitioning to encounter scene..."),t(),oy(i,n)},r=()=>{console.log("Transitioning to shop scene..."),t(),zs(i,s)};return{proceedToGameScene:n,handleDisplayShop:r,handleDisplaySquadInventory:()=>{console.log("Transitioning to Squad/Inventory scene..."),t(),no(i,s,r)},handleDisplayEncounter:s,showSplash:()=>{console.log("Showing splash screen..."),Yg(i,r)}}}async function el(){const{appContainer:i,gameSpecificContainer:e}=await jc();_y(i,e).showSplash()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ao(el)):Ao(el);
