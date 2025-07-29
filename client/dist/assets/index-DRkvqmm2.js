(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();let Tc=class{constructor(e=0,t=0){this.resource=e,this.victories=t}gainResource(e){e>0&&(this.resource+=e,console.log(`Player gained ${e} resource. Total: ${this.resource}`))}spendResource(e){return e>0&&this.resource>=e?(this.resource-=e,console.log(`Player spent ${e} resource. Remaining: ${this.resource}`),!0):(console.log(`Player attempted to spend ${e} resource, but has only ${this.resource}.`),!1)}incrementVictories(){this.victories++,console.log(`Player victories incremented. Total: ${this.victories}`)}};const Qt=new Tc(10,0),Dn=class Dn{constructor(){this.playerParty=[],this.enemyUnits=[],this.shopUnits=[],this.storageUnits=[],this.playerItems=[],this.shopItems=[]}addUnitToPlayerParty(e){this.playerParty.length<Dn.MAX_PLAYER_PARTY_SIZE?(this.playerParty.push(e),console.log(`${e.name} (${e.className}) added to player party. Party size: ${this.playerParty.length}/${Dn.MAX_PLAYER_PARTY_SIZE}`)):console.warn(`Player party is full (${Dn.MAX_PLAYER_PARTY_SIZE} units). ${e.name} (${e.className}) was not added.`)}addUnitToEnemies(e){this.enemyUnits.push(e),console.log(`${e.name} (${e.className}) added to enemy units.`)}addUnitToShop(e){this.shopUnits.push(e),console.log(`${e.name} (${e.className}) added to shop units.`)}addUnitToStorage(e){this.storageUnits.push(e),console.log(`${e.name} (${e.className}) added to storage units.`)}addItemToPlayer(e){this.playerItems.push(e),console.log(`${e.name} added to player items.`)}addItemToShop(e){this.shopItems.push(e),console.log(`${e.name} added to shop items.`)}removeItemFromPlayer(e){const t=this.playerItems.findIndex(n=>n.id===e);if(t>-1){const n=this.playerItems[t];return this.playerItems.splice(t,1),console.log(`${n.name} removed from player items.`),!0}return!1}removeItemFromShop(e){const t=this.shopItems.findIndex(n=>n.id===e);if(t>-1){const n=this.shopItems[t];return this.shopItems.splice(t,1),console.log(`${n.name} removed from shop items.`),!0}return!1}findItemById(e){return[...this.playerItems,...this.shopItems].find(n=>n.id===e)}useItemOnUnit(e,t){const n=this.findItemById(e);if(!n)return console.warn(`Item with ID ${e} not found.`),!1;if(!this.playerItems.find(r=>r.id===e))return console.warn(`Item ${n.name} is not in player's inventory.`),!1;const s=n.effect(t);return s&&n.type==="consumable"&&(this.removeItemFromPlayer(e),console.log(`Consumable item ${n.name} was used and removed from inventory.`)),s}findUnitById(e){return[...this.playerParty,...this.enemyUnits,...this.shopUnits,...this.storageUnits].find(n=>n.id===e)}removeUnitFromPlayerParty(e){const t=this.playerParty.findIndex(n=>n.id===e);if(t>-1){const n=this.playerParty[t];return this.playerParty.splice(t,1),console.log(`${n.name} (${n.className}) removed from player party.`),!0}return!1}removeUnitFromEnemies(e){const t=this.enemyUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.enemyUnits[t];return this.enemyUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from enemy units.`),!0}return!1}removeUnitFromShop(e){const t=this.shopUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.shopUnits[t];return this.shopUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from shop units.`),!0}return!1}removeUnitFromStorage(e){const t=this.storageUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.storageUnits[t];return this.storageUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from storage units.`),!0}return!1}_removeUnitFromList(e,t){const n=e.findIndex(s=>s.id===t);return n>-1?e.splice(n,1)[0]:(console.warn(`_removeUnitFromList: Unit with ID ${t} not found in provided list.`),null)}reorderUnitInSquad(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`Reordered ${n.name} in squad to index ${s}.`)}else console.error(`reorderUnitInSquad: Unit ${e} not found in player party.`)}reorderUnitInStorage(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`Reordered ${n.name} in storage to index ${s}.`)}else console.error(`reorderUnitInStorage: Unit ${e} not found in storage units.`)}moveUnitToStorage(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const s=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(s,0,n),console.log(`${n.name} moved from squad to storage at index ${s}.`)}else console.error(`moveUnitToStorage: Unit ${e} not found in player party to move to storage.`)}moveUnitToSquad(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n)if(this.playerParty.length<Dn.MAX_PLAYER_PARTY_SIZE){const s=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(s,0,n),console.log(`${n.name} moved from storage to squad at index ${s}. Party size: ${this.playerParty.length}/${Dn.MAX_PLAYER_PARTY_SIZE}`)}else this.storageUnits.push(n),console.warn(`moveUnitToSquad: Squad is full (${this.playerParty.length}/${Dn.MAX_PLAYER_PARTY_SIZE}). ${n.name} could not be moved from storage and was returned.`);else console.error(`moveUnitToSquad: Unit ${e} not found in storage to move to squad.`)}swapUnitsBetweenSquadAndStorage(e,t,n,s){const r=this._removeUnitFromList(this.storageUnits,e),o=this._removeUnitFromList(this.playerParty,t);if(r&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,r);const l=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(l,0,o),console.log(`Swapped ${r.name} (to squad slot ${a}) with ${o.name} (to box slot ${l}).`)}else if(r&&!o){const a=Math.max(0,Math.min(s,this.storageUnits.length));this.storageUnits.splice(a,0,r),console.error(`Swap failed: Unit ${t} (to go to box) not found in squad. ${r.name} returned to storage.`)}else if(!r&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,o),console.error(`Swap failed: Unit ${e} (to go to squad) not found in storage. ${o.name} returned to squad.`)}else console.error(`Swap failed: Critical. Neither unit involved in the swap could be found and removed. Unit ${e} (from box) or ${t} (from squad).`)}};Dn.MAX_PLAYER_PARTY_SIZE=5;let Xi=Dn;const ue=new Xi;let xn=null;function Ac(i,e,t,n,s){i.addEventListener("dragstart",r=>{if(!(r.target instanceof HTMLElement))return;const a=r.target.closest(".squad-unit-display");!a||a!==i||(xn={unitId:e.id,sourceContainer:t,originalIndex:n,element:i},r.dataTransfer&&(r.dataTransfer.setData("text/plain",e.id),r.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".unit-slot").forEach(r=>{r.style.border="1px dashed #566573",r.style.backgroundColor="#34495e"}),xn=null})}function wc(i,e,t,n){i.addEventListener("dragover",s=>{s.preventDefault(),xn&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",s.dataTransfer&&(s.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573"}),i.addEventListener("drop",s=>{if(s.preventDefault(),i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573",!xn)return;const{unitId:r,sourceContainer:o,originalIndex:a}=xn;if(o===e&&a===t&&i.contains(xn.element)){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop unit ${r}`),console.log(`Source: ${o}[${a}] -> Target: ${e}[${t}]`);const l=ue.findUnitById(r);if(!l){console.error("Drag-and-drop: Unit not found by ID",r),xn=null;return}if(o==="squad"&&e==="squad")ue.reorderUnitInSquad(r,t);else if(o==="box"&&e==="box")ue.reorderUnitInStorage(r,t);else if(o==="squad"&&e==="box"){if(ue.playerParty.length<=1){console.warn("Cannot move the last unit from squad to box. At least one unit must remain in the squad."),xn=null;return}ue.moveUnitToStorage(r,t)}else if(o==="box"&&e==="squad")if(ue.playerParty.length>=Xi.MAX_PLAYER_PARTY_SIZE&&ue.playerParty[t]){const c=ue.playerParty[t];if(c)console.log(`Squad full, swapping ${l.name} with ${c.name}`),ue.swapUnitsBetweenSquadAndStorage(r,c.id,t,a);else{console.warn("Squad full, but target slot unexpectedly empty. Cannot move from box."),xn=null;return}}else ue.moveUnitToSquad(r,t);xn=null,n()})}let It=null;function Cc(i){const e=document.createElement("div");return e.id="squad-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function Rc(i){It&&(It.innerHTML=`
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
    `)}function xl(i){if(!It)return;let e=i.clientX+15,t=i.clientY+15;e+It.offsetWidth>window.innerWidth&&(e=window.innerWidth-It.offsetWidth-10),t+It.offsetHeight>window.innerHeight&&(t=window.innerHeight-It.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),It.style.left=`${e}px`,It.style.top=`${t}px`}function Pc(i,e){It&&(Rc(i),It.style.display="block",xl(e))}function Lc(){It&&(It.style.display="none")}function Dc(i){(!It||!i.contains(It))&&(It=Cc(i))}function ka(i,e,t,n){const s=document.createElement("div");s.className="squad-unit-display",s.dataset.unitId=i.id,s.style.width="50px",s.style.height="65px",s.style.border="1px solid #7f8c8d",s.style.borderRadius="4px",s.style.backgroundColor="#4a6378",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.padding="3px",s.style.textAlign="center",s.style.cursor="grab",s.draggable=!0,Ac(s,i,e,t),s.addEventListener("mouseenter",l=>{Pc(i,l)}),s.addEventListener("mousemove",l=>{xl(l)}),s.addEventListener("mouseleave",()=>{Lc()});const r=document.createElement("img");r.src=i.imageUrl,r.alt=i.className,r.style.width="25px",r.style.height="25px",r.style.marginBottom="3px",r.style.borderRadius="2px";const o=document.createElement("h5");o.textContent=i.name,o.style.margin="0 0 2px 0",o.style.fontSize="0.7em",o.style.color="#ecf0f1";const a=document.createElement("p");return a.textContent=`(${i.className})`,a.style.margin="0",a.style.fontSize="0.6em",a.style.fontStyle="italic",a.style.color="#bdc3c7",s.appendChild(r),s.appendChild(o),s.appendChild(a),s}function Ia(i,e,t,n){const s=document.createElement("div");return s.id=i,s.className=`unit-slot ${e}-slot`,s.dataset.slotType=e,s.dataset.slotIndex=String(t),s.style.width="60px",s.style.height="75px",s.style.border="1px dashed #566573",s.style.borderRadius="5px",s.style.backgroundColor="#34495e",s.style.margin="3px",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.transition="background-color 0.2s, border-color 0.2s",wc(s,e,t,n),s}let oi=null;function Uc(i,e,t,n){i.draggable=!0,i.addEventListener("dragstart",s=>{if(!(s.target instanceof HTMLElement))return;const o=s.target.closest(".squad-item-display");!o||o!==i||(oi={itemId:e.id,originalIndex:t,element:i},s.dataTransfer&&(s.dataTransfer.setData("text/plain",e.id),s.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".item-slot").forEach(s=>{const r=s;r.classList.contains("empty-item-slot")?r.style.border="1px dashed #566573":r.style.border="1px solid #f39c12",r.style.backgroundColor="#34495e"}),oi=null})}function _l(i,e,t){i.addEventListener("dragover",n=>{n.preventDefault(),oi&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",n.dataTransfer&&(n.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.classList.contains("empty-item-slot")?i.style.border="1px dashed #566573":i.style.border="1px solid #f39c12"}),i.addEventListener("drop",n=>{if(n.preventDefault(),i.style.backgroundColor="#34495e",i.classList.contains("empty-item-slot")?i.style.border="1px dashed #566573":i.style.border="1px solid #f39c12",!oi)return;const{itemId:s,originalIndex:r}=oi;if(r===e){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop item ${s}`),console.log(`Source: [${r}] -> Target: [${e}]`);const o=ue.playerItems.find(l=>l.id===s);if(!o){console.error("Drag-and-drop: Item not found by ID",s),oi=null;return}ue.playerItems.splice(r,1);const a=Math.min(e,ue.playerItems.length);ue.playerItems.splice(a,0,o),console.log(`Item ${o.name} moved from ${r} to ${a}`),oi=null,t()})}let Jr=null,Qr=null,ea=null;function kc(i){const e=document.getElementById("need-units-message");e&&e.remove();const t=document.createElement("div");t.id="need-units-message",t.textContent="Need At Least 1 Unit In Party",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}let sn=null,lt=null;function Ic(i){const e=document.createElement("div");return e.id=`empty-item-slot-${i}`,e.className="item-slot empty-item-slot",e.style.width="60px",e.style.height="75px",e.style.border="1px dashed #566573",e.style.borderRadius="5px",e.style.backgroundColor="#34495e",e.style.margin="3px",e.style.display="flex",e.style.alignItems="center",e.style.justifyContent="center",e.style.transition="background-color 0.2s, border-color 0.2s",_l(e,i,us),e}function Nc(i,e,t){const n=document.createElement("div");n.id=`item-slot-${e}`,n.className="item-slot squad-item-display",n.dataset.itemId=i.id,n.style.width="60px",n.style.height="75px",n.style.border="1px solid #f39c12",n.style.borderRadius="5px",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.backgroundColor="#34495e",n.style.padding="3px",n.style.boxSizing="border-box",n.style.textAlign="center",n.style.cursor="grab",n.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",n.style.margin="3px";const s=document.createElement("img");s.src=i.imageUrl,s.alt=i.name,s.style.width="25px",s.style.height="25px",s.style.marginBottom="2px",s.style.borderRadius="2px",n.appendChild(s);const r=document.createElement("h6");return r.textContent=i.name,r.style.margin="0",r.style.fontSize="0.4em",r.style.color="#ecf0f1",r.style.fontWeight="bold",r.style.lineHeight="1.1",r.style.wordWrap="break-word",r.style.textAlign="center",r.style.maxWidth="54px",n.appendChild(r),n.addEventListener("mouseenter",()=>{n.title=`${i.name}
${i.description}`}),Uc(n,i,e),_l(n,e,t),n.addEventListener("click",()=>{if(sn&&sn!==n){sn.style.transform="translateY(0)",sn.style.boxShadow="none",sn.style.borderColor="#f39c12",sn.style.backgroundColor="#34495e";const o=sn.querySelector("button.use-button-item");o&&sn.removeChild(o)}if(sn===n){n.style.transform="translateY(0)",n.style.boxShadow="none",n.style.borderColor="#f39c12",n.style.backgroundColor="#34495e";const o=n.querySelector("button.use-button-item");o&&n.removeChild(o),sn=null,lt=null}else{sn=n,n.style.transform="translateY(-3px)",n.style.boxShadow="0px 2px 8px rgba(0,0,0,0.3)",n.style.borderColor="#27ae60",n.style.backgroundColor="#2c5238";const o=n.querySelector("button.use-button-item");o&&n.removeChild(o),lt=document.createElement("button"),lt.className="use-button-item",lt.textContent="Use",lt.style.padding="6px 8px",lt.style.fontSize="0.8em",lt.style.backgroundColor="#27ae60",lt.style.color="white",lt.style.border="none",lt.style.borderRadius="4px",lt.style.cursor="pointer",lt.style.marginTop="4px",lt.style.width="100%",lt.style.fontWeight="bold",lt.style.transition="background-color 0.2s",lt.dataset.itemId=i.id,lt.addEventListener("mouseenter",()=>{lt&&(lt.style.backgroundColor="#2ecc71")}),lt.addEventListener("mouseleave",()=>{lt&&(lt.style.backgroundColor="#27ae60")}),lt.onclick=a=>{a.stopPropagation(),_n=i,t()},n.appendChild(lt)}}),n}let _n=null;function Na(i,e){i.addEventListener("click",t=>{_n&&(t.preventDefault(),t.stopPropagation(),ue.useItemOnUnit(_n.id,e)?(console.log(`Used ${_n.name} on ${e.name}`),_n=null,sn=null,lt=null,us()):console.warn(`Failed to use ${_n.name} on ${e.name}`))}),_n?(i.style.boxShadow="0 0 5px #e74c3c",i.style.cursor="pointer",i.title=`Click to use ${_n.name} on ${e.name}`):(i.style.boxShadow="none",i.style.cursor="grab",i.title="")}function us(){if(Jr&&Qr&&ea){const i=document.getElementById("box-area"),e=i?i.scrollTop:0;ma(Jr,Qr,ea);const t=document.getElementById("box-area");t&&(t.scrollTop=e)}else console.error("Cannot refresh squad scene: a container or callback is missing.")}function ma(i,e,t){Jr=i,Qr=e,ea=t,console.log("Showing Squad/Inventory Scene..."),i.innerHTML="",Dc(i);const n=document.createElement("div");n.id="squad-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");s.textContent="SQUAD / INVENTORY",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0";const r=document.createElement("div");r.id="squad-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-between",r.style.overflow="hidden";const o=document.createElement("div");o.id="units-section",o.style.width="65%",o.style.height="100%",o.style.display="flex",o.style.flexDirection="column",o.style.borderRight="2px solid #34495e",o.style.paddingRight="10px",o.style.boxSizing="border-box";const a=document.createElement("div");a.id="squad-area",a.style.marginBottom="10px";const l=document.createElement("h2");l.textContent="SQUAD (Active Party)",l.style.fontSize="1.2em",l.style.borderBottom="1px solid #7f8c8d",l.style.paddingBottom="3px",l.style.marginBottom="5px",a.appendChild(l);const c=document.createElement("div");c.style.display="flex",c.style.flexWrap="wrap",c.style.justifyContent="flex-start";for(let H=0;H<Xi.MAX_PLAYER_PARTY_SIZE;H++){const te=Ia(`squad-slot-${H}`,"squad",H,us),R=ue.playerParty[H];if(R){const O=ka(R,"squad",H);Na(O,R),te.appendChild(O)}c.appendChild(te)}a.appendChild(c),o.appendChild(a);const d=document.createElement("div");d.id="box-area",d.style.flexGrow="1",d.style.overflowY="auto",d.style.padding="5px",d.style.border="1px solid #34495e",d.style.borderRadius="5px";const h=document.createElement("h2");h.textContent="BOX (Storage)",h.style.fontSize="1.2em",h.style.borderBottom="1px solid #7f8c8d",h.style.paddingBottom="3px",h.style.marginBottom="5px",d.appendChild(h);const f=document.createElement("div");f.style.display="flex",f.style.flexWrap="wrap",f.style.justifyContent="flex-start",f.style.width="340px";const u=20,g=ue.storageUnits.length,y=Math.max(u,Math.ceil((g+4)/5)*5);for(let H=0;H<y;H++){const te=Ia(`box-slot-${H}`,"box",H,us),R=ue.storageUnits[H];if(R){const O=ka(R,"box",H);Na(O,R),te.appendChild(O)}f.appendChild(te)}d.appendChild(f),o.appendChild(d);const m=document.createElement("div");m.id="items-section",m.style.width="33%",m.style.height="100%",m.style.paddingLeft="10px",m.style.boxSizing="border-box",m.style.display="flex",m.style.flexDirection="column",m.style.alignItems="center";const p=document.createElement("h2");p.textContent="ITEMS",p.style.fontSize="1.2em",p.style.borderBottom="1px solid #7f8c8d",p.style.paddingBottom="3px",p.style.marginBottom="10px",p.style.width="100%",p.style.textAlign="center";const v=document.createElement("div");v.style.width="100%",v.style.overflowY="auto",v.style.maxHeight="60%",v.style.padding="5px",v.style.border="1px solid #34495e",v.style.borderRadius="5px",v.style.backgroundColor="#34495e",v.style.display="flex",v.style.flexWrap="wrap",v.style.justifyContent="flex-start",v.style.alignContent="flex-start",v.style.paddingBottom="10px";const x=20,M=ue.playerItems.length,P=Math.max(x,Math.ceil((M+4)/5)*5);for(let H=0;H<P;H++){const te=ue.playerItems[H];if(te){const R=Nc(te,H,us);v.appendChild(R)}else{const R=Ic(H);v.appendChild(R)}}const A=document.createElement("p");A.id="item-instructions",_n?(A.innerHTML=`<span style="color: #e74c3c;">✓ ${_n.name} selected</span><br>Click a unit to use it`,A.style.color="#e74c3c"):(A.textContent='Click an item to select it, then click "Use" to prepare it, then click a unit to apply it.',A.style.color="#bdc3c7"),A.style.textAlign="center",A.style.fontSize="0.9em",A.style.marginTop="10px",A.style.fontStyle="italic",m.appendChild(p),m.appendChild(v),m.appendChild(A),r.appendChild(o),r.appendChild(m);const w=document.createElement("div");w.style.width="100%",w.style.display="flex",w.style.justifyContent="space-between",w.style.alignItems="center",w.style.paddingTop="15px",w.style.flexShrink="0";const G=document.createElement("div");G.id="player-resource-display",G.textContent=`Resource: ${Qt.resource}`,G.style.padding="10px 15px",G.style.backgroundColor="#1a1a1a",G.style.color="#f1c40f",G.style.borderRadius="5px",G.style.fontSize="1em",G.style.fontWeight="bold",G.style.display="flex",G.style.alignItems="center";const S=document.createElement("button");S.textContent="Shop",S.style.padding="8px 15px",S.style.fontSize="1em",S.style.backgroundColor="#3498db",S.style.color="white",S.style.border="none",S.style.borderRadius="5px",S.style.cursor="pointer",S.style.margin="0 8px",S.addEventListener("mouseover",()=>S.style.backgroundColor="#2980b9"),S.addEventListener("mouseout",()=>S.style.backgroundColor="#3498db"),S.onclick=t;const T=document.createElement("div");T.style.display="flex",T.style.justifyContent="center",T.style.alignItems="center",T.style.flexGrow="2",T.appendChild(S);const B=document.createElement("button");B.textContent="PROCEED",B.style.padding="8px 15px",B.style.fontSize="1em",B.style.backgroundColor="#27ae60",B.style.color="white",B.style.border="none",B.style.borderRadius="5px",B.style.cursor="pointer",B.onclick=()=>{if(ue.playerParty.length===0){kc(i);return}e()},w.appendChild(G),w.appendChild(T),w.appendChild(B),n.appendChild(s),n.appendChild(r),n.appendChild(w),i.appendChild(n),console.log("Squad/Inventory Scene displayed with new layout and smaller slots.")}const Oc="/assets/swordsman-DZczeJA5.PNG",Fc="/assets/healer-6PZSpLWU.PNG",Bc="/assets/hater-xGQmM0-V.PNG",$c="/assets/wizard-dFT0bH_F.PNG",Hc="/assets/marksman-KgIJVx8I.PNG",zc="/assets/bannerman-BAY_kXBe.png",Gc="/assets/hypeman-Brzlnppa.png",Vc="/assets/shieldbearer-BBpwnJC6.png",Wc="/assets/salesman-r534qERA.png",ga={swordsman:{name:"Swordsman",energyType:"Kinetic",health:17,maxEnergy:10,basicDamage:8,skillDamage:3,range:1,move:3,cost:3,imageUrl:Oc,skills:[],isTall:!1},healer:{name:"Healer",energyType:"Potential",health:18,maxEnergy:20,basicDamage:3,skillDamage:4,range:2,move:3,cost:3,imageUrl:Fc,skills:[],isTall:!1},hater:{name:"Hater",energyType:"Potential",health:16,maxEnergy:22,basicDamage:5,skillDamage:4,range:3,move:3,cost:3,imageUrl:Bc,skills:[],isTall:!1},wizard:{name:"Wizard",energyType:"Potential",health:10,maxEnergy:15,basicDamage:3,skillDamage:7,range:3,move:3,cost:3,imageUrl:$c,skills:[],isTall:!1},marksman:{name:"Marksman",energyType:"Kinetic",health:12,maxEnergy:10,basicDamage:7,skillDamage:3,range:4,move:3,cost:3,imageUrl:Hc,skills:[],isTall:!1},bannerman:{name:"Bannerman",energyType:"Potential",health:20,maxEnergy:25,basicDamage:3,skillDamage:3,range:2,move:4,cost:3,imageUrl:zc,skills:[],isTall:!1},hypeman:{name:"Hype Man",energyType:"Potential",health:16,maxEnergy:22,basicDamage:4,skillDamage:5,range:3,move:3,cost:3,imageUrl:Gc,skills:[],isTall:!1},shieldbearer:{name:"Shieldbearer",energyType:"Kinetic",health:23,maxEnergy:18,basicDamage:5,skillDamage:5,range:1,move:3,cost:3,imageUrl:Vc,skills:[],isTall:!1},salesman:{name:"Salesman",energyType:"Potential",health:15,maxEnergy:15,basicDamage:4,skillDamage:5,range:2,move:4,cost:3,imageUrl:Wc,skills:[],isTall:!1}},Xc={id:"blazing-knuckle",name:"Blazing Knuckle",description:"Unleashes fiery strikes in all cardinal directions around the target",energyCost:3,bonusDamage:3,targetingType:"non-rotational",emoji:"🔥",getTargetPattern:(i,e)=>[{x:i,y:e-1,isPrimary:!1},{x:i+1,y:e,isPrimary:!1},{x:i,y:e+1,isPrimary:!1},{x:i-1,y:e,isPrimary:!1}]},qc={id:"tera-fire",name:"Tera Fire",description:"Strikes primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:3,targetingType:"dual-rotational",emoji:"🔥",getTargetPattern:(i,e,t,n)=>{const s=n||0;let r=1,o=-1;switch(s%4){case 0:r=1,o=-1;break;case 1:r=1,o=1;break;case 2:r=-1,o=1;break;case 3:r=-1,o=-1;break}return[{x:i,y:e,isPrimary:!0},{x:i+r,y:e+o,isPrimary:!1}]}},Yc={id:"universal-whisper",name:"Universal Whisper",description:"Heals primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:4,bonusDamage:1,targetingType:"dual-rotational",emoji:"🪐",getTargetPattern:(i,e,t,n)=>{const o=[{x:1,y:-1},{x:1,y:1},{x:-1,y:1},{x:-1,y:-1}][(n||0)%4];return[{x:i,y:e},{x:i+o.x,y:e+o.y}]}},jc={id:"healing-circle",name:"Healing Circle",description:"Creates a circle of healing energy that affects all cardinal directions around the target.",energyCost:6,bonusDamage:3,targetingType:"non-rotational",emoji:"⭐",getTargetPattern:(i,e)=>[{x:i,y:e-1,isPrimary:!1},{x:i+1,y:e,isPrimary:!1},{x:i,y:e+1,isPrimary:!1},{x:i-1,y:e,isPrimary:!1}]},Kc={id:"beam",name:"Beam",description:"Focus energy into a concentrated beam that can target enemies 2 squares away in cardinal directions.",energyCost:2,bonusDamage:2,targetingType:"adjacent-attack",emoji:"✨",getTargetPattern:(i,e)=>[{x:i,y:e}]},Zc={id:"lights-on",name:"Light's On",description:"Target 3 squares away in any cardinal direction to create a row of 3 spotlight tiles centered on that position. Spotlights trigger when enemies step on them, causing the caster to attack if in range.",energyCost:4,bonusDamage:0,targetingType:"adjacent-attack",emoji:"🔍",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},Jc={id:"hurricane-slash",name:"Hurricane Slash",description:"A powerful melee attack that can target any adjacent enemy within 1 range.",energyCost:3,bonusDamage:3,targetingType:"adjacent-attack",emoji:"🌩️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},Qc={id:"bandage",name:"Bandage",description:"Heals the user for (Skill Damage + 1) Health. Targets self only.",energyCost:2,bonusDamage:1,targetingType:"non-rotational",emoji:"🩹",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},ed={id:"teleport",name:"Teleport",description:"Teleports the user 3 squares in any cardinal direction without triggering tile effects along the path.",energyCost:1,bonusDamage:0,targetingType:"non-rotational",emoji:"⚡",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},td={id:"prepare",name:"Prepare",description:"Grants 1 stack of Strength (+1 Basic Attack damage) and 1 stack of Sturdy (-1 Basic Attack damage taken). Targets self only.",energyCost:1,bonusDamage:0,targetingType:"non-rotational",emoji:"🛡️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},nd={id:"longshot",name:"Longshot",description:"A precision shot that can hit targets 5 squares away in any cardinal direction. Costs 5 energy, deals (Skill Damage - 1) damage.",energyCost:5,bonusDamage:-1,targetingType:"adjacent-attack",emoji:"🎯",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},id={id:"toxic-cloud",name:"Toxic Cloud",description:"Target 1 square away in any cardinal direction to create a line of 3 toxic tiles centered on that position. Toxic tiles apply 1 Toxic to units that enter them, then disappear.",energyCost:4,bonusDamage:0,targetingType:"adjacent-attack",emoji:"☢️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},sd={id:"exhaust",name:"Exhaust",description:"Apply 1 Weak, 1 Slow, and 1 Tired to target enemy unit within range 4. Costs 2 energy.",energyCost:2,bonusDamage:0,targetingType:"dual-rotational",emoji:"😴",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},rd={id:"jeer",name:"Jeer",description:"Apply 3 Exposed and 3 Weak to target enemy unit within range 3. Costs 2 energy.",energyCost:2,bonusDamage:0,targetingType:"dual-rotational",emoji:"😈",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},ad={id:"flare-shot",name:"Flare Shot",description:"Launch a flaming projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 3 stacks of Burn. Costs 5 energy.",energyCost:5,bonusDamage:0,targetingType:"adjacent-attack",emoji:"🔥",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},od={id:"splash",name:"Splash",description:"Launch a water projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 2 stacks of Wet. Costs 6 energy.",energyCost:6,bonusDamage:0,targetingType:"adjacent-attack",emoji:"💧",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},ld={id:"spark-lance",name:"Spark Lance",description:"Conjure a piercing lance of electrical energy that can hit targets exactly 4 squares away in any cardinal direction. Deals (Skill Damage - 2) damage and inflicts 2 stacks of Shocked. Costs 5 energy.",energyCost:5,bonusDamage:-2,targetingType:"adjacent-attack",emoji:"⚡",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},cd={id:"lead-the-charge",name:"Lead The Charge",description:"Apply 4 Charge to all adjacent Allied Units, then Leap 3 squares in any cardinal direction. Costs 2 energy.",energyCost:2,bonusDamage:0,targetingType:"non-rotational",emoji:"🏃",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},dd={id:"rally",name:"Rally",description:"Restores 3 energy to all cardinally and diagonally adjacent ally units. Costs 3 energy.",energyCost:3,bonusDamage:0,targetingType:"non-rotational",emoji:"📢",getTargetPattern:(i,e,t,n)=>[{x:i,y:e,isPrimary:!0}]},ud={id:"pierce",name:"Pierce",description:"Piercing attack that hits enemies 1 and 2 squares away in the target direction. Can be rotated to face different directions. Costs 4 energy.",energyCost:4,bonusDamage:0,targetingType:"unit-rotational",emoji:"🗡️",getTargetPattern:(i,e,t,n)=>{const s=n||0;let r=0,o=0,a=0,l=0;switch(s%4){case 0:r=0,o=-1,a=0,l=-2;break;case 1:r=1,o=0,a=2,l=0;break;case 2:r=0,o=1,a=0,l=2;break;case 3:r=-1,o=0,a=-2,l=0;break}return[{x:i+r,y:e+o,isPrimary:!0},{x:i+a,y:e+l,isPrimary:!1}]}},ye={"blazing-knuckle":Xc,"tera-fire":qc,"universal-whisper":Yc,"healing-circle":jc,beam:Kc,"lights-on":Zc,"hurricane-slash":Jc,bandage:Qc,teleport:ed,prepare:td,longshot:nd,"toxic-cloud":id,exhaust:sd,jeer:rd,"flare-shot":ad,splash:od,"spark-lance":ld,"lead-the-charge":cd,rally:dd,pierce:ud},Oa=["Mike","Bryan","Matt","Gabe","Waylin","Axel","Laharl","Steve","Garrison","Sock","Franz","Edgar","Dan","Frank","Keyboard","Justin","Jack","Ned","Elliot","Sam","Alex","Jackson","Kyle","Don Julio","Derek","Peter","Herbert","Liam","Arthur","Gavin","Dylan","Kieran","Romulus"];let hd=1;function fd(){return`unit-${hd++}`}function pd(){const i=Math.floor(Math.random()*Oa.length);return Oa[i]}class md{constructor(e){this.registry=e}createUnit(e,t="player"){const n=ga[e];if(!n)return console.error(`Unit type "${e}" not found in UnitDex.`),null;let s;n.energyType.toLowerCase()==="potential"?s=n.maxEnergy:n.energyType.toLowerCase()==="kinetic"?s=0:(console.warn(`Unknown energy type "${n.energyType}" for unit "${e}". Defaulting to max energy.`),s=n.maxEnergy);const r=n.skills.map(a=>ye[a]).filter(a=>a!==void 0),o={id:fd(),name:pd(),className:n.name,energyType:n.energyType,health:n.health,currentHealth:n.health,maxEnergy:n.maxEnergy,currentEnergy:s,basicDamage:n.basicDamage,skillDamage:n.skillDamage,range:n.range,move:n.move,cost:n.cost,imageUrl:n.imageUrl,skills:r,activeModifiers:[],team:t,level:1,perkPoints:0,purchasedPerks:[],isAlive:!0,turnTakenThisRound:!1,isTargetable:!0,isDestructible:!0,isSubUnit:!1,isStructure:!1,isTall:n.isTall};return console.log(`Created unit: ${o.name} (${o.className}) (ID: ${o.id}) - Cost: ${o.cost} - Energy: ${o.currentEnergy}/${o.maxEnergy} (${o.energyType})`),o}createAndAddUnitToPlayerParty(e){const t=this.createUnit(e);return t&&this.registry.addUnitToPlayerParty(t),t}}const li=new md(ue),gd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKraVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Q3JlYXRvclRvb2w+PHhtcDpjcmVhdG9ydG9vbD5NaWNyb3NvZnQgV2luZG93cyBQaG90byBWaWV3ZXIgMTAuMC4yNjEwMC4xODgyPC94bXA6Y3JlYXRvcnRvb2w+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+PHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSd3Jz8+d1SxtAAAAi1JREFUaEPtmCGUgkAQhn8vGY1EIpFINF40Go0XicSNRKLRSCQaLxKJRCLRaPPC+vvcOffdqoiH8r1nYKXMfjszO0yKosCQ+ZALQ2NyqwGl1EE8T86f++L9DHDn99MvYz0IAgDAarHr1cTrG5BnPZxvAABlWQIAYrUCAKyTCHhCLgzegDUApdRBKXXwwwx+mCGcb067/5+wBjAUfuUAz7wfZgCAuq6N/wnPfrnV/zMn0sQbc+AanA1Eka4ycaLrfVnp95t6BwBomxYAUH1rMxL2ja4NvY4B287Ls+75HgBguZzp9aOJba5zYDbT63xPIk3d2zdez4DstHlhnuk812eeFLmZQ4vlwnj2A21EwtzZbj6BO0y8jgEi7z5E3j6n+zVwljM8+zRHmENRaCyfcoe5tZg3owEnZLVyrTrE1kduzYXBG+g8AD+YGb84CRAnATzfg+d7yNIaWXr5fnULnQfQNw8PoKz0j0ZooiseHsCj6TyApt6dKsslaKLc1qcegGOfkb3Ghc4D6Jur+wBJ0vaAs+9Btn4g70JyfuD7dWVWpqaKAYe+8L4GZEcmNhM2eJvlnYlwvvjLxPsaIPJbKXOCBKH5TLjznB844Ul4Z7J9+RsNSOQ8IWs7d5zViWedprguq5Vthh4NuCKrltxxkik9k3PiI3LnyWjAFZsBQhO2amNj8AZ6D6CpYjRVjLZpjXlZ3k5d6T2AruktBySyXxDXs09GA89m8AbGAJ7ND9DxIKyQkDFTAAAAAElFTkSuQmCC",yd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACU0lEQVR4AdXBoZLqPBzG4V8yXEDkykpkJXLlyiORyEouIXJlJLISGYmMrKxERq7830FP3/lMBcM3O3BEnsflnGmZp3Gexnka52mcp3Gexnka52mcp3Gexnka52mcp3Gexnkat+MfqXVc2Oi6k+Mf8DRux5vVOi6shmFk63I5Lay67uR4I0/jdrxJrePCahhGHjkeB+R6vSysuu7keANP43a8qNZxYTUMI8+YVeTr6wu53caFVdedHC/wNM7lnPmNktLCqvsTkGEYecZsYsussnW73ZBxrEiM0fELnsbt+B8lpYVVMUNOpw4ZhpFHzCYeMatICB1iVpHjceA/F6SktLAqZkiM0fGEp3Eu58xWSWlhVcyQ9PmJ7PseCcc/iNmEhHBAzCYkhANiNiFmFQmhQ8wqEkKHmFUkhA65Xi9IXzskzzNSzJAYo2PD0ziXc0ZijAur9PmJ7Pueh74+kBAOiNmEhHBAzCbErCIhdIhZRULoELOKhNAhZhX5udyRfd+zdZ9n5FwKEmN0rDyNczlntkpKC6tihtzOZx65zzNy+I6I2YSEcEDMJiSEA2I28cj1ekH62iH7vmfrexyRYobEGB0bnsa5nDPPlJQWVsUMuZ3PPHKfZ+Rj2CM/lzvyMeyRn8sd+Rj2yM/ljuz7nq3vcUSKGRJjdDzhaZzLOfMbJaWFVTFDbuczr/geR6SYITFGxy94GudyzryipLSwKmbI7Xzmkfs8I3mekWKGxBgdL/A0zuWceaeS0sIDxQyJMTreyNM4l3OmZZ7GeRrnaZyncZ7G/QXXH/ttJS3xdQAAAABJRU5ErkJggg==",xd={Swordsman:{className:"Swordsman",perks:[{id:"swordsman-bandage",name:"Bandage",description:"Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",icon:"🩹",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye.bandage;e&&!i.skills.find(t=>t.id==="bandage")&&(i.skills.push(e),console.log(`${i.name} learned Bandage skill!`))}},{id:"swordsman-prepare",name:"Prepare",description:"Grants the Prepare skill: Apply 1 stack of Strength (+1 Basic Attack damage) and 1 stack of Sturdy (-1 Basic Attack damage taken).",icon:"🛡️",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.prepare;e&&!i.skills.find(t=>t.id==="prepare")&&(i.skills.push(e),console.log(`${i.name} learned Prepare skill!`))}},{id:"swordsman-teleport",name:"Teleport",description:"Grants the ability to teleport 3 squares in any cardinal direction for 1 energy.",icon:"⚡",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.teleport;e&&!i.skills.find(t=>t.id==="teleport")&&(i.skills.push(e),console.log(`${i.name} learned Teleport skill!`))}},{id:"swordsman-disarming-slash",name:"Disarming Slash",description:"Strike that disarms enemies, reducing their attack power.",icon:"🗡️",row:1,column:0,unlockRequirements:["swordsman-bandage"],effect:i=>{console.log(`${i.name} learned Disarming Slash!`)}},{id:"swordsman-inspiring-slash",name:"Inspiring Slash",description:"Strike that boosts nearby allies' morale and energy.",icon:"⚔️",row:1,column:1,unlockRequirements:["swordsman-prepare"],effect:i=>{console.log(`${i.name} learned Inspiring Slash!`)}},{id:"swordsman-spring-slash",name:"Spring Slash",description:"Swift leaping attack that covers great distance.",icon:"🌸",row:1,column:2,unlockRequirements:["swordsman-teleport"],effect:i=>{console.log(`${i.name} learned Spring Slash!`)}},{id:"swordsman-revenge",name:"Revenge",description:"Deal massive damage when health is low.",icon:"💀",row:2,column:0,unlockRequirements:["swordsman-disarming-slash"],effect:i=>{console.log(`${i.name} learned Revenge!`)}},{id:"swordsman-forceful-strike",name:"Forceful Strike",description:"Powerful attack that can push enemies back.",icon:"💥",row:2,column:1,unlockRequirements:["swordsman-inspiring-slash"],effect:i=>{console.log(`${i.name} learned Forceful Strike!`)}},{id:"swordsman-smoke-grenade",name:"Smoke Grenade",description:"Create a smoke screen to obscure vision and escape.",icon:"💨",row:2,column:2,unlockRequirements:["swordsman-spring-slash"],effect:i=>{console.log(`${i.name} learned Smoke Grenade!`)}},{id:"swordsman-lifeblade",name:"Lifeblade",description:"Attacks heal the wielder based on damage dealt.",icon:"❤️",row:3,column:0,unlockRequirements:["swordsman-revenge"],effect:i=>{console.log(`${i.name} learned Lifeblade!`)}},{id:"swordsman-overpierce",name:"Overpierce",description:"Attacks pierce through enemies to hit multiple targets.",icon:"🔥",row:3,column:1,unlockRequirements:["swordsman-forceful-strike"],effect:i=>{console.log(`${i.name} learned Overpierce!`)}},{id:"swordsman-teleport-slash",name:"Teleport Slash",description:"Instantly teleport to any enemy and strike with devastating force.",icon:"🌟",row:3,column:2,unlockRequirements:["swordsman-smoke-grenade"],effect:i=>{console.log(`${i.name} learned Teleport Slash!`)}}]},Healer:{className:"Healer",perks:[{id:"healer-universal-whisper",name:"Universal Whisper",description:"A gentle healing spell that restores health to allies.",icon:"🌟",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["universal-whisper"];e&&!i.skills.find(t=>t.id==="universal-whisper")&&(i.skills.push(e),console.log(`${i.name} learned Universal Whisper skill!`))}},{id:"healer-healing-circle",name:"Healing Circle",description:"Creates a circle of healing energy that affects all cardinal directions around the target. Costs 6 energy, heals (Skill Damage + 3).",icon:"⭐",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye["healing-circle"];e&&!i.skills.find(t=>t.id==="healing-circle")&&(i.skills.push(e),console.log(`${i.name} learned Healing Circle skill!`))}},{id:"healer-beam",name:"Beam",description:"Focus energy into a concentrated beam that can target enemies 2 squares away in cardinal directions. Costs 2 energy, deals (Skill Damage + 2) damage.",icon:"✨",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.beam;e&&!i.skills.find(t=>t.id==="beam")&&(i.skills.push(e),console.log(`${i.name} learned Beam skill!`))}},{id:"healer-stars-blessing",name:"Star's Blessing",description:"Call upon celestial power to grant divine protection.",icon:"⭐",row:1,column:0,unlockRequirements:["healer-universal-whisper"],effect:i=>{console.log(`${i.name} learned Star's Blessing!`)}},{id:"healer-outburst",name:"Outburst",description:"Release a burst of healing energy that spreads outward.",icon:"💥",row:1,column:1,unlockRequirements:["healer-healing-circle"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"healer-purifying-hand",name:"Purifying Hand",description:"Cleanse corruption and purify the battlefield with divine touch.",icon:"🤲",row:1,column:2,unlockRequirements:["healer-beam"],effect:i=>{console.log(`${i.name} learned Purifying Hand!`)}},{id:"healer-finger-of-god",name:"Finger of God",description:"Channel divine wrath to smite enemies with holy power.",icon:"👆",row:2,column:0,unlockRequirements:["healer-stars-blessing"],effect:i=>{console.log(`${i.name} learned Finger of God!`)}},{id:"healer-star-song",name:"Star Song",description:"Sing a celestial melody that inspires and empowers allies.",icon:"🎵",row:2,column:1,unlockRequirements:["healer-outburst"],effect:i=>{console.log(`${i.name} learned Star Song!`)}},{id:"healer-flash-of-sun",name:"Flash of Sun",description:"Blind enemies with brilliant solar radiance while healing allies.",icon:"☀️",row:2,column:2,unlockRequirements:["healer-purifying-hand"],effect:i=>{console.log(`${i.name} learned Flash of Sun!`)}},{id:"healer-aethers-grace",name:"Aether's Grace",description:"Invoke the highest divine blessing for ultimate healing power.",icon:"🕊️",row:3,column:0,unlockRequirements:["healer-finger-of-god"],effect:i=>{console.log(`${i.name} learned Aether's Grace!`)}},{id:"healer-symphony",name:"Symphony",description:"Conduct a divine symphony that harmonizes all magical energies.",icon:"🎼",row:3,column:1,unlockRequirements:["healer-star-song"],effect:i=>{console.log(`${i.name} learned Symphony!`)}},{id:"healer-rescue",name:"Rescue",description:"Instantly transport and fully heal any ally in mortal danger.",icon:"🚑",row:3,column:2,unlockRequirements:["healer-flash-of-sun"],effect:i=>{console.log(`${i.name} learned Rescue!`)}}]},Hater:{className:"Hater",perks:[{id:"hater-toxic-cloud",name:"Toxic Cloud",description:"Grants the Toxic Cloud skill: Creates a line of 3 toxic tiles in front of you. Toxic tiles apply 1 Toxic to units that enter them, then disappear. Costs 4 energy.",icon:"☢️",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["toxic-cloud"];e&&!i.skills.find(t=>t.id==="toxic-cloud")&&(i.skills.push(e),console.log(`${i.name} learned Toxic Cloud skill!`))}},{id:"hater-jeer",name:"Jeer",description:"Grants the Jeer skill: Apply 3 Exposed and 3 Weak to target enemy unit within range 3. Costs 2 energy.",icon:"😈",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.jeer;e&&!i.skills.find(t=>t.id==="jeer")&&(i.skills.push(e),console.log(`${i.name} learned Jeer skill!`))}},{id:"hater-exhaust",name:"Exhaust",description:"Grants the Exhaust skill: Apply 1 Weak, 1 Slow, and 1 Tired to target enemy unit within range 4. Costs 2 energy.",icon:"😴",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.exhaust;e&&!i.skills.find(t=>t.id==="exhaust")&&(i.skills.push(e),console.log(`${i.name} learned Exhaust skill!`))}},{id:"hater-poison-dart",name:"Poison Dart",description:"Launch a toxic projectile that deals damage over time.",icon:"🎯",row:1,column:0,unlockRequirements:["hater-toxic-cloud"],effect:i=>{console.log(`${i.name} learned Poison Dart!`)}},{id:"hater-outburst",name:"Outburst",description:"Explosive tantrum that damages and stuns nearby enemies.",icon:"🤬",row:1,column:1,unlockRequirements:["hater-jeer"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"hater-distraction",name:"Distraction",description:"Confuse enemies, making them attack each other instead.",icon:"🌀",row:1,column:2,unlockRequirements:["hater-exhaust"],effect:i=>{console.log(`${i.name} learned Distraction!`)}},{id:"hater-taunt",name:"Taunt",description:"Force enemies to attack you while reducing their damage.",icon:"🎭",row:2,column:0,unlockRequirements:["hater-toxic-cloud"],effect:i=>{console.log(`${i.name} learned Taunt!`)}},{id:"hater-back-off",name:"Back Off",description:"Aggressive shout that pushes enemies away and intimidates them.",icon:"🚫",row:2,column:1,unlockRequirements:["hater-outburst"],effect:i=>{console.log(`${i.name} learned Back Off!`)}},{id:"hater-drain-punch",name:"Drain Punch",description:"Steal energy from enemies on hit to fuel your own abilities.",icon:"🥊",row:2,column:2,unlockRequirements:["hater-distraction"],effect:i=>{console.log(`${i.name} learned Drain Punch!`)}},{id:"hater-toxic-king",name:"Toxic King",description:"Become immune to poison and spread toxicity with every attack.",icon:"👑",row:3,column:0,unlockRequirements:["hater-taunt"],effect:i=>{console.log(`${i.name} learned Toxic King!`)}},{id:"hater-psyche-break",name:"Psyche Break",description:"Shatter enemy morale, causing them to flee or surrender.",icon:"💔",row:3,column:1,unlockRequirements:["hater-back-off"],effect:i=>{console.log(`${i.name} learned Psyche Break!`)}},{id:"hater-dizzy-slam",name:"Dizzy Slam",description:"Devastating attack that leaves enemies disoriented and vulnerable.",icon:"🌪️",row:3,column:2,unlockRequirements:["hater-drain-punch"],effect:i=>{console.log(`${i.name} learned Dizzy Slam!`)}}]},Wizard:{className:"Wizard",perks:[{id:"wizard-flare-shot",name:"Flare Shot",description:"Grants the Flare Shot skill: Launch a flaming projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 3 stacks of Burn. Costs 5 energy.",icon:"🔥",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["flare-shot"];e&&!i.skills.find(t=>t.id==="flare-shot")&&(i.skills.push(e),console.log(`${i.name} learned Flare Shot skill!`))}},{id:"wizard-splash",name:"Splash",description:"Grants the Splash skill: Launch a water projectile that can hit targets exactly 3 squares away in any cardinal direction. Deals (Skill Damage) damage and inflicts 2 stacks of Wet. Costs 6 energy.",icon:"💧",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.splash;e&&!i.skills.find(t=>t.id==="splash")&&(i.skills.push(e),console.log(`${i.name} learned Splash skill!`))}},{id:"wizard-spark-lance",name:"Spark Lance",description:"Grants the Spark Lance skill: Conjure a piercing lance of electrical energy that can hit targets exactly 4 squares away in any cardinal direction. Deals (Skill Damage - 2) damage and inflicts 2 stacks of Shocked. Costs 5 energy.",icon:"⚡",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye["spark-lance"];e&&!i.skills.find(t=>t.id==="spark-lance")&&(i.skills.push(e),console.log(`${i.name} learned Spark Lance skill!`))}},{id:"wizard-solar-ray",name:"Solar Ray",description:"Channel the power of the sun into a concentrated beam of light.",icon:"☀️",row:1,column:0,unlockRequirements:["wizard-flare-shot"],effect:i=>{console.log(`${i.name} learned Solar Ray!`)}},{id:"wizard-comet-tail",name:"Comet Tail",description:"Summon a trailing comet that burns enemies in its path.",icon:"☄️",row:1,column:1,unlockRequirements:["wizard-splash"],effect:i=>{console.log(`${i.name} learned Comet Tail!`)}},{id:"wizard-cosmic-impact",name:"Cosmic Impact",description:"Call down cosmic forces to strike with devastating power.",icon:"🌌",row:1,column:2,unlockRequirements:["wizard-spark-lance"],effect:i=>{console.log(`${i.name} learned Cosmic Impact!`)}},{id:"wizard-flare-up",name:"Flare Up",description:"Cause existing fires to explode outward, spreading damage.",icon:"🌋",row:2,column:0,unlockRequirements:["wizard-solar-ray"],effect:i=>{console.log(`${i.name} learned Flare Up!`)}},{id:"wizard-divination",name:"Divination",description:"Peer into the future to predict and counter enemy actions.",icon:"🔮",row:2,column:1,unlockRequirements:["wizard-comet-tail"],effect:i=>{console.log(`${i.name} learned Divination!`)}},{id:"wizard-cauterize",name:"Cauterize",description:"Use magical fire to seal wounds and purify corruption.",icon:"🩸",row:2,column:2,unlockRequirements:["wizard-cosmic-impact"],effect:i=>{console.log(`${i.name} learned Cauterize!`)}},{id:"wizard-gaias-rage",name:"Gaia's Rage",description:"Channel the earth's fury to cause devastating earthquakes and eruptions.",icon:"🌍",row:3,column:0,unlockRequirements:["wizard-flare-up"],effect:i=>{console.log(`${i.name} learned Gaia's Rage!`)}},{id:"wizard-tidal-lock",name:"Tidal Lock",description:"Bind enemies in place with gravitational forces and crushing water pressure.",icon:"🌊",row:3,column:1,unlockRequirements:["wizard-divination"],effect:i=>{console.log(`${i.name} learned Tidal Lock!`)}},{id:"wizard-plasma-tempest",name:"Plasma Tempest",description:"Unleash a storm of superheated plasma that devastates the battlefield.",icon:"🌪️",row:3,column:2,unlockRequirements:["wizard-cauterize"],effect:i=>{console.log(`${i.name} learned Plasma Tempest!`)}}]},Marksman:{className:"Marksman",perks:[{id:"marksman-lights-on",name:"Light's On",description:"Target 3 squares away in any cardinal direction to create a row of 3 spotlight tiles centered on that position. When enemies step on spotlights, you automatically attack them if in range. Costs 4 energy.",icon:"🔍",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["lights-on"];e&&!i.skills.find(t=>t.id==="lights-on")&&(i.skills.push(e),console.log(`${i.name} learned Light's On skill!`))}},{id:"marksman-bandage",name:"Bandage",description:"Grants a healing skill to help survive tough battles. Costs 2 energy, heals (Skill Damage + 1) Health.",icon:"🩹",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.bandage;e&&!i.skills.find(t=>t.id==="bandage")&&(i.skills.push(e),console.log(`${i.name} learned Bandage skill!`))}},{id:"marksman-longshot",name:"Longshot",description:"Grants the Longshot skill: A precision shot that can hit targets 5 squares away in any cardinal direction. Costs 5 energy, deals (Skill Damage - 1) damage.",icon:"🎯",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.longshot;e&&!i.skills.find(t=>t.id==="longshot")&&(i.skills.push(e),console.log(`${i.name} learned Longshot skill!`))}},{id:"marksman-aim-high",name:"Aim High",description:"Target enemy weak points for increased critical hit chance.",icon:"🎪",row:1,column:0,unlockRequirements:["marksman-lights-on"],effect:i=>{console.log(`${i.name} learned Aim High!`)}},{id:"marksman-backflip",name:"Backflip",description:"Agile maneuver that repositions and evades enemy attacks.",icon:"🤸",row:1,column:1,unlockRequirements:["marksman-bandage"],effect:i=>{console.log(`${i.name} learned Backflip!`)}},{id:"marksman-zero-in",name:"Zero-In",description:"Focus intensely on a target to guarantee the next shot hits.",icon:"🔍",row:1,column:2,unlockRequirements:["marksman-longshot"],effect:i=>{console.log(`${i.name} learned Zero-In!`)}},{id:"marksman-tracking-dart",name:"Tracking Dart",description:"Fire a dart that marks enemies, revealing their position and weaknesses.",icon:"🏹",row:2,column:0,unlockRequirements:["marksman-aim-high"],effect:i=>{console.log(`${i.name} learned Tracking Dart!`)}},{id:"marksman-flashbang",name:"Flashbang",description:"Throw a blinding grenade that stuns and disorients enemies.",icon:"⚡",row:2,column:1,unlockRequirements:["marksman-backflip"],effect:i=>{console.log(`${i.name} learned Flashbang!`)}},{id:"marksman-aim-low",name:"Aim Low",description:"Target enemy legs to slow their movement and reduce mobility.",icon:"🦵",row:2,column:2,unlockRequirements:["marksman-zero-in"],effect:i=>{console.log(`${i.name} learned Aim Low!`)}},{id:"marksman-perimeter",name:"Perimeter",description:"Establish a defensive perimeter that detects and slows approaching enemies.",icon:"🛡️",row:3,column:0,unlockRequirements:["marksman-tracking-dart"],effect:i=>{console.log(`${i.name} learned Perimeter!`)}},{id:"marksman-hunker-down",name:"Hunker Down",description:"Take a defensive stance that increases defense but reduces movement.",icon:"🏠",row:3,column:1,unlockRequirements:["marksman-flashbang"],effect:i=>{console.log(`${i.name} learned Hunker Down!`)}},{id:"marksman-overpierce",name:"Overpierce",description:"Attacks pierce through enemies to hit multiple targets.",icon:"🔥",row:3,column:2,unlockRequirements:["marksman-aim-low"],effect:i=>{console.log(`${i.name} learned Overpierce!`)}}]},Bannerman:{className:"Bannerman",perks:[{id:"bannerman-lead-the-charge",name:"Lead the Charge",description:"Rally allies and charge forward with increased damage and speed.",icon:"⚡",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["lead-the-charge"];e&&!i.skills.find(t=>t.id==="lead-the-charge")&&(i.skills.push(e),console.log(`${i.name} learned Lead The Charge skill!`))}},{id:"bannerman-rally",name:"Rally",description:"Gather scattered allies and restore their fighting spirit.",icon:"📢",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.rally;e&&!i.skills.find(t=>t.id==="rally")&&(i.skills.push(e),console.log(`${i.name} learned Rally skill!`))}},{id:"bannerman-pierce",name:"Pierce",description:"Armor-piercing attack that ignores enemy defenses.",icon:"🗡️",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.pierce;e&&!i.skills.find(t=>t.id==="pierce")&&(i.skills.push(e),console.log(`${i.name} learned Pierce skill!`))}},{id:"bannerman-bash",name:"Bash",description:"Powerful shield bash that stuns enemies and creates openings.",icon:"🛡️",row:1,column:0,unlockRequirements:["bannerman-lead-the-charge"],effect:i=>{console.log(`${i.name} learned Bash!`)}},{id:"bannerman-outburst",name:"Outburst",description:"Explosive burst of energy that damages nearby enemies.",icon:"💥",row:1,column:1,unlockRequirements:["bannerman-rally"],effect:i=>{console.log(`${i.name} learned Outburst!`)}},{id:"bannerman-plant-the-flag",name:"Plant the Flag",description:"Plant a battle standard that provides massive area buffs.",icon:"🏴",row:1,column:2,unlockRequirements:["bannerman-pierce"],effect:i=>{console.log(`${i.name} learned Plant the Flag!`)}},{id:"bannerman-peace-sign",name:"Peace Sign",description:"Diplomatic gesture that can calm hostile enemies or boost morale.",icon:"✌️",row:2,column:0,unlockRequirements:["bannerman-bash"],effect:i=>{console.log(`${i.name} learned Peace Sign!`)}},{id:"bannerman-whirlwind",name:"Whirlwind",description:"Spinning attack that hits all surrounding enemies.",icon:"🌪️",row:2,column:1,unlockRequirements:["bannerman-outburst"],effect:i=>{console.log(`${i.name} learned Whirlwind!`)}},{id:"bannerman-rescue",name:"Rescue",description:"Quickly move to aid fallen allies and restore them to fighting condition.",icon:"🚑",row:2,column:2,unlockRequirements:["bannerman-plant-the-flag"],effect:i=>{console.log(`${i.name} learned Rescue!`)}},{id:"bannerman-anthem",name:"Anthem",description:"Inspiring battle song that buffs all allies with courage and strength.",icon:"🎵",row:3,column:0,unlockRequirements:["bannerman-peace-sign"],effect:i=>{console.log(`${i.name} learned Anthem!`)}},{id:"bannerman-staccato",name:"Staccato",description:"Rapid series of precise strikes that build momentum.",icon:"🎼",row:3,column:1,unlockRequirements:["bannerman-whirlwind"],effect:i=>{console.log(`${i.name} learned Staccato!`)}},{id:"bannerman-redistribute",name:"Redistribute",description:"Share resources and abilities among all allies for optimal battlefield efficiency.",icon:"⚖️",row:3,column:2,unlockRequirements:["bannerman-rescue"],effect:i=>{console.log(`${i.name} learned Redistribute!`)}}]},"Hype Man":{className:"Hype Man",perks:[{id:"hypeman-hype-up",name:"Hype Up",description:"Energize yourself and nearby allies, boosting their energy and morale for the next turn.",icon:"🔥",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye["hype-up"];e&&!i.skills.find(t=>t.id==="hype-up")&&(i.skills.push(e),console.log(`${i.name} learned Hype Up!`))}},{id:"hypeman-steady-beat",name:"Steady Beat",description:"Maintain a rhythmic pulse that grants consistent energy regeneration to all allies.",icon:"🎵",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye["steady-beat"];e&&!i.skills.find(t=>t.id==="steady-beat")&&(i.skills.push(e),console.log(`${i.name} learned Steady Beat!`))}},{id:"hypeman-outburst",name:"Outburst",description:"Release an explosive burst of hype energy that damages enemies and energizes allies.",icon:"💥",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.outburst;e&&!i.skills.find(t=>t.id==="outburst")&&(i.skills.push(e),console.log(`${i.name} learned Outburst!`))}},{id:"hypeman-inspire-violence",name:"Inspire Violence",description:"Channel aggressive energy to boost allies' attack damage and critical hit chance.",icon:"⚔️",row:1,column:0,unlockRequirements:["hypeman-hype-up"],effect:i=>{const e=ye["inspire-violence"];e&&!i.skills.find(t=>t.id==="inspire-violence")&&(i.skills.push(e),console.log(`${i.name} learned Inspire Violence!`))}},{id:"hypeman-mirror-aegis",name:"Mirror Aegis",description:"Create a reflective shield that redirects enemy attacks back at them.",icon:"🛡️",row:1,column:1,unlockRequirements:["hypeman-steady-beat"],effect:i=>{const e=ye["mirror-aegis"];e&&!i.skills.find(t=>t.id==="mirror-aegis")&&(i.skills.push(e),console.log(`${i.name} learned Mirror Aegis!`))}},{id:"hypeman-peace-sign",name:"Peace Sign",description:"Flash a calming peace sign that pacifies enemies and heals nearby allies.",icon:"✌️",row:1,column:2,unlockRequirements:["hypeman-outburst"],effect:i=>{const e=ye["peace-sign"];e&&!i.skills.find(t=>t.id==="peace-sign")&&(i.skills.push(e),console.log(`${i.name} learned Peace Sign!`))}},{id:"hypeman-idolize",name:"Idolize",description:"Become the center of attention, drawing all enemy attacks while boosting ally performance.",icon:"⭐",row:2,column:0,unlockRequirements:["hypeman-inspire-violence"],effect:i=>{const e=ye.idolize;e&&!i.skills.find(t=>t.id==="idolize")&&(i.skills.push(e),console.log(`${i.name} learned Idolize!`))}},{id:"hypeman-slip-counter",name:"Slip Counter",description:"Dodge incoming attacks with style and counter with a devastating riposte.",icon:"🤸",row:2,column:1,unlockRequirements:["hypeman-mirror-aegis"],effect:i=>{const e=ye["slip-counter"];e&&!i.skills.find(t=>t.id==="slip-counter")&&(i.skills.push(e),console.log(`${i.name} learned Slip Counter!`))}},{id:"hypeman-whirlwind",name:"Whirlwind",description:"Spin in a dazzling whirlwind that hits all surrounding enemies multiple times.",icon:"🌪️",row:2,column:2,unlockRequirements:["hypeman-peace-sign"],effect:i=>{const e=ye.whirlwind;e&&!i.skills.find(t=>t.id==="whirlwind")&&(i.skills.push(e),console.log(`${i.name} learned Whirlwind!`))}},{id:"hypeman-call-to-action",name:"Call to Action",description:"Rally all allies with an inspiring call that grants extra actions and movement.",icon:"📢",row:3,column:0,unlockRequirements:["hypeman-idolize"],effect:i=>{const e=ye["call-to-action"];e&&!i.skills.find(t=>t.id==="call-to-action")&&(i.skills.push(e),console.log(`${i.name} learned Call to Action!`))}},{id:"hypeman-sound-barrier",name:"Sound Barrier",description:"Create a sonic barrier that blocks all incoming damage and pushes enemies away.",icon:"🔊",row:3,column:1,unlockRequirements:["hypeman-slip-counter"],effect:i=>{const e=ye["sound-barrier"];e&&!i.skills.find(t=>t.id==="sound-barrier")&&(i.skills.push(e),console.log(`${i.name} learned Sound Barrier!`))}},{id:"hypeman-symphony",name:"Symphony",description:"Conduct a magnificent symphony that harmonizes all battlefield energies into ultimate power.",icon:"🎼",row:3,column:2,unlockRequirements:["hypeman-whirlwind"],effect:i=>{const e=ye.symphony;e&&!i.skills.find(t=>t.id==="symphony")&&(i.skills.push(e),console.log(`${i.name} learned Symphony!`))}}]},Shieldbearer:{className:"Shieldbearer",perks:[{id:"shieldbearer-rescue",name:"Rescue",description:"Rush to an ally's aid, pulling them to safety while blocking incoming attacks.",icon:"🚑",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye.rescue;e&&!i.skills.find(t=>t.id==="rescue")&&(i.skills.push(e),console.log(`${i.name} learned Rescue!`))}},{id:"shieldbearer-get-sturdy",name:"Get Sturdy",description:"Brace yourself for impact, gaining damage resistance and stability against attacks.",icon:"🛡️",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye["get-sturdy"];e&&!i.skills.find(t=>t.id==="get-sturdy")&&(i.skills.push(e),console.log(`${i.name} learned Get Sturdy!`))}},{id:"shieldbearer-taunt",name:"Taunt",description:"Draw enemy attention and force them to focus their attacks on you instead of allies.",icon:"😤",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye.taunt;e&&!i.skills.find(t=>t.id==="taunt")&&(i.skills.push(e),console.log(`${i.name} learned Taunt!`))}},{id:"shieldbearer-barricade",name:"Barricade",description:"Create a temporary defensive barrier that blocks enemy movement and projectiles.",icon:"🧱",row:1,column:0,unlockRequirements:["shieldbearer-rescue"],effect:i=>{const e=ye.barricade;e&&!i.skills.find(t=>t.id==="barricade")&&(i.skills.push(e),console.log(`${i.name} learned Barricade!`))}},{id:"shieldbearer-shield-bash",name:"Shield Bash",description:"Strike with your shield to stun enemies and knock them back from their position.",icon:"💥",row:1,column:1,unlockRequirements:["shieldbearer-get-sturdy"],effect:i=>{const e=ye["shield-bash"];e&&!i.skills.find(t=>t.id==="shield-bash")&&(i.skills.push(e),console.log(`${i.name} learned Shield Bash!`))}},{id:"shieldbearer-bouncer",name:"Bouncer",description:"Deflect attacks back at enemies while maintaining your defensive stance.",icon:"↩️",row:1,column:2,unlockRequirements:["shieldbearer-taunt"],effect:i=>{const e=ye.bouncer;e&&!i.skills.find(t=>t.id==="bouncer")&&(i.skills.push(e),console.log(`${i.name} learned Bouncer!`))}},{id:"shieldbearer-swap",name:"Swap",description:"Instantly switch positions with an ally, allowing for tactical repositioning.",icon:"🔄",row:2,column:0,unlockRequirements:["shieldbearer-barricade"],effect:i=>{const e=ye.swap;e&&!i.skills.find(t=>t.id==="swap")&&(i.skills.push(e),console.log(`${i.name} learned Swap!`))}},{id:"shieldbearer-entrench",name:"Entrench",description:"Dig in and become immovable, gaining massive damage reduction but losing mobility.",icon:"⚓",row:2,column:1,unlockRequirements:["shieldbearer-shield-bash"],effect:i=>{const e=ye.entrench;e&&!i.skills.find(t=>t.id==="entrench")&&(i.skills.push(e),console.log(`${i.name} learned Entrench!`))}},{id:"shieldbearer-phalanx",name:"Phalanx",description:"Form a defensive formation with nearby allies, sharing damage and increasing protection.",icon:"🏛️",row:2,column:2,unlockRequirements:["shieldbearer-bouncer"],effect:i=>{const e=ye.phalanx;e&&!i.skills.find(t=>t.id==="phalanx")&&(i.skills.push(e),console.log(`${i.name} learned Phalanx!`))}},{id:"shieldbearer-the-wall",name:"The Wall",description:"Become an immovable object that completely blocks all damage and effects for allies behind you.",icon:"🏰",row:3,column:0,unlockRequirements:["shieldbearer-swap"],effect:i=>{const e=ye["the-wall"];e&&!i.skills.find(t=>t.id==="the-wall")&&(i.skills.push(e),console.log(`${i.name} learned The Wall!`))}},{id:"shieldbearer-forceful-strike",name:"Forceful Strike",description:"Channel all your defensive power into a devastating counterattack that scales with damage taken.",icon:"⚡",row:3,column:1,unlockRequirements:["shieldbearer-entrench"],effect:i=>{const e=ye["forceful-strike"];e&&!i.skills.find(t=>t.id==="forceful-strike")&&(i.skills.push(e),console.log(`${i.name} learned Forceful Strike!`))}},{id:"shieldbearer-rock-solid",name:"Rock Solid",description:"Achieve perfect defensive mastery, becoming immune to all debuffs and gaining health regeneration.",icon:"💎",row:3,column:2,unlockRequirements:["shieldbearer-phalanx"],effect:i=>{const e=ye["rock-solid"];e&&!i.skills.find(t=>t.id==="rock-solid")&&(i.skills.push(e),console.log(`${i.name} learned Rock Solid!`))}}]},Salesman:{className:"Salesman",perks:[{id:"salesman-bash",name:"Bash",description:"Strike with your briefcase, dealing damage and potentially stunning the target.",icon:"💼",row:0,column:0,unlockRequirements:[],effect:i=>{const e=ye.bash;e&&!i.skills.find(t=>t.id==="bash")&&(i.skills.push(e),console.log(`${i.name} learned Bash!`))}},{id:"salesman-switcheroo",name:"Switcheroo",description:"Swap positions, items, or effects between two targets through clever negotiation.",icon:"🔀",row:0,column:1,unlockRequirements:[],effect:i=>{const e=ye.switcheroo;e&&!i.skills.find(t=>t.id==="switcheroo")&&(i.skills.push(e),console.log(`${i.name} learned Switcheroo!`))}},{id:"salesman-coin-toss",name:"Coin Toss",description:"Flip a coin for random effects - high risk, high reward business decisions.",icon:"🪙",row:0,column:2,unlockRequirements:[],effect:i=>{const e=ye["coin-toss"];e&&!i.skills.find(t=>t.id==="coin-toss")&&(i.skills.push(e),console.log(`${i.name} learned Coin Toss!`))}},{id:"salesman-gift-of-the-void",name:"Gift of the Void",description:"Offer mysterious void-touched items that grant powerful but unpredictable effects.",icon:"🎁",row:1,column:0,unlockRequirements:["salesman-bash"],effect:i=>{const e=ye["gift-of-the-void"];e&&!i.skills.find(t=>t.id==="gift-of-the-void")&&(i.skills.push(e),console.log(`${i.name} learned Gift of the Void!`))}},{id:"salesman-flatten",name:"Flatten",description:"Crush opposition with the weight of bureaucracy and overwhelming paperwork.",icon:"📋",row:1,column:1,unlockRequirements:["salesman-switcheroo"],effect:i=>{const e=ye.flatten;e&&!i.skills.find(t=>t.id==="flatten")&&(i.skills.push(e),console.log(`${i.name} learned Flatten!`))}},{id:"salesman-hired-help",name:"Hired Help",description:"Summon temporary mercenaries to assist in battle for a limited time.",icon:"👥",row:1,column:2,unlockRequirements:["salesman-coin-toss"],effect:i=>{const e=ye["hired-help"];e&&!i.skills.find(t=>t.id==="hired-help")&&(i.skills.push(e),console.log(`${i.name} learned Hired Help!`))}},{id:"salesman-deal-breaker",name:"Deal Breaker",description:"Cancel ongoing effects and contracts, disrupting enemy strategies and buffs.",icon:"❌",row:2,column:0,unlockRequirements:["salesman-gift-of-the-void"],effect:i=>{const e=ye["deal-breaker"];e&&!i.skills.find(t=>t.id==="deal-breaker")&&(i.skills.push(e),console.log(`${i.name} learned Deal Breaker!`))}},{id:"salesman-reinvigorate",name:"Reinvigorate",description:"Restore energy and vitality to allies through motivational sales techniques.",icon:"⚡",row:2,column:1,unlockRequirements:["salesman-flatten"],effect:i=>{const e=ye.reinvigorate;e&&!i.skills.find(t=>t.id==="reinvigorate")&&(i.skills.push(e),console.log(`${i.name} learned Reinvigorate!`))}},{id:"salesman-private-practice",name:"Private Practice",description:"Establish exclusive services that provide ongoing benefits to selected allies.",icon:"🏢",row:2,column:2,unlockRequirements:["salesman-hired-help"],effect:i=>{const e=ye["private-practice"];e&&!i.skills.find(t=>t.id==="private-practice")&&(i.skills.push(e),console.log(`${i.name} learned Private Practice!`))}},{id:"salesman-transcendance",name:"Transcendance",description:"Achieve business enlightenment, transcending physical limitations and gaining cosmic insight.",icon:"🌟",row:3,column:0,unlockRequirements:["salesman-deal-breaker"],effect:i=>{const e=ye.transcendance;e&&!i.skills.find(t=>t.id==="transcendance")&&(i.skills.push(e),console.log(`${i.name} learned Transcendance!`))}},{id:"salesman-knock-off",name:"Knock Off",description:"Create inferior copies of enemy abilities and items, weakening originals while gaining power.",icon:"📋",row:3,column:1,unlockRequirements:["salesman-reinvigorate"],effect:i=>{const e=ye["knock-off"];e&&!i.skills.find(t=>t.id==="knock-off")&&(i.skills.push(e),console.log(`${i.name} learned Knock Off!`))}},{id:"salesman-airstrike",name:"Airstrike",description:"Call in corporate air support for devastating area-of-effect bombardment.",icon:"✈️",row:3,column:2,unlockRequirements:["salesman-private-practice"],effect:i=>{const e=ye.airstrike;e&&!i.skills.find(t=>t.id==="airstrike")&&(i.skills.push(e),console.log(`${i.name} learned Airstrike!`))}}]}};function ya(i){return xd[i]||null}function _d(i,e){const t=ya(i);return t&&t.perks.find(n=>n.id===e)||null}function vl(i){const e=ya(i.className);return e?e.perks.filter(t=>i.purchasedPerks.includes(t.id)?!1:t.unlockRequirements.every(n=>i.purchasedPerks.includes(n))):[]}function vd(i,e){const t=_d(i.className,e);return!t||!vl(i).find(s=>s.id===e)||i.perkPoints<1?!1:(i.perkPoints-=1,i.purchasedPerks.push(e),t.effect(i),!0)}class Sd{constructor(){this.container=null,this.currentUnit=null,this.onClose=void 0,this.createScene()}createScene(){this.container=document.createElement("div"),this.container.className="skill-tree-scene",this.container.style.display="none",this.container.style.position="fixed",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100vw",this.container.style.height="100vh",this.container.style.backgroundColor="rgba(0, 0, 0, 0.95)",this.container.style.zIndex="1000",this.container.style.flexDirection="column",this.container.style.alignItems="center",this.container.style.padding="40px 20px",this.container.style.overflow="auto",document.body.appendChild(this.container)}openSkillTree(e,t){this.currentUnit=e,this.onClose=t||void 0,this.container&&(this.container.innerHTML="",this.createHeader(e),this.createSkillTree(e),this.createBackButton(),this.container.style.display="flex",console.log(`Opened skill tree for ${e.name} (${e.className}) - ${e.perkPoints} perk points available`))}createHeader(e){if(!this.container)return;const t=document.createElement("div");t.style.textAlign="center",t.style.marginBottom="30px",t.style.color="white";const n=document.createElement("h2");n.textContent=`${e.name} - ${e.className} Skill Tree`,n.style.fontSize="2rem",n.style.margin="0 0 10px 0",n.style.textShadow="0 0 10px rgba(255, 255, 255, 0.5)";const s=document.createElement("p");s.textContent=`Level ${e.level} | ${e.perkPoints} Perk Points Available`,s.style.fontSize="1.2rem",s.style.margin="0",s.style.color="#ffd700",t.appendChild(n),t.appendChild(s),this.container.appendChild(t)}createSkillTree(e){if(!this.container)return;const t=ya(e.className);if(!t){const o=document.createElement("p");o.textContent="No skill tree available for this unit type.",o.style.color="white",o.style.fontSize="1.2rem",this.container.appendChild(o);return}const n=document.createElement("div");n.className="skill-tree-container",n.style.position="relative",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.gap="60px",n.style.flex="1",n.style.justifyContent="center",n.style.minHeight="400px";const s=new Map;t.perks.forEach(o=>{s.has(o.row)||s.set(o.row,[]),s.get(o.row).push(o)}),Array.from(s.keys()).sort((o,a)=>o-a).forEach(o=>{const a=document.createElement("div");a.className="perk-row",a.style.display="flex",a.style.justifyContent="center",a.style.gap="80px",a.style.position="relative",a.dataset.row=o.toString(),s.get(o).sort((c,d)=>c.column-d.column).forEach(c=>{const d=this.createPerkNode(c,e);a.appendChild(d)}),n.appendChild(a)}),this.container.appendChild(n),setTimeout(()=>{this.createConnections(n,t.perks,e)},10)}createPerkNode(e,t){const n=document.createElement("div");n.className="perk-node",n.dataset.perkId=e.id,n.style.width="80px",n.style.height="80px",n.style.borderRadius="50%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="center",n.style.position="relative",n.style.transition="all 0.3s ease",n.style.border="3px solid",n.style.fontSize="1.5rem";const s=t.purchasedPerks.includes(e.id),r=vl(t).some(l=>l.id===e.id),o=t.perkPoints>0;s?(n.style.backgroundColor="#00ff88",n.style.borderColor="#ffffff",n.style.color="#000000",n.style.boxShadow="0 0 20px rgba(0, 255, 136, 0.8)"):r&&o?(n.style.backgroundColor="#4a90e2",n.style.borderColor="#00ff88",n.style.color="#ffffff",n.style.cursor="pointer",n.style.boxShadow="0 0 15px rgba(74, 144, 226, 0.5)"):(n.style.backgroundColor="#333333",n.style.borderColor="#666666",n.style.color="#888888",n.style.cursor="not-allowed");const a=document.createElement("div");return a.textContent=e.icon,a.style.fontSize="2rem",a.style.marginBottom="2px",n.appendChild(a),r&&o&&!s&&(n.addEventListener("click",()=>{this.purchasePerk(e.id)}),n.addEventListener("mouseenter",()=>{n.style.transform="scale(1.1)",n.style.boxShadow="0 0 25px rgba(0, 255, 136, 0.8)"}),n.addEventListener("mouseleave",()=>{n.style.transform="scale(1)",n.style.boxShadow="0 0 15px rgba(74, 144, 226, 0.5)"})),this.addTooltip(n,e,s,r,o),n}addTooltip(e,t,n,s,r){let o=null;const a=c=>{o=document.createElement("div"),o.className="perk-tooltip",o.style.position="absolute",o.style.backgroundColor="rgba(0, 0, 0, 0.9)",o.style.color="white",o.style.padding="12px",o.style.borderRadius="8px",o.style.border="2px solid #333",o.style.maxWidth="250px",o.style.zIndex="1001",o.style.pointerEvents="none",o.style.fontSize="0.9rem",o.style.boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)";let d="";n?d="✅ Purchased":s&&r?d="💰 Available (Click to purchase)":s&&!r?d="❌ No perk points available":d="🔒 Requirements not met",o.innerHTML=`
                <div style="color: #00ff88; font-weight: bold; margin-bottom: 5px;">${t.name}</div>
                <div style="margin-bottom: 8px;">${t.description}</div>
                <div style="color: #ffd700; font-size: 0.8rem;">${d}</div>
            `,document.body.appendChild(o);const h=e.getBoundingClientRect();o.style.left=`${h.right+10}px`,o.style.top=`${h.top}px`;const f=o.getBoundingClientRect();f.right>window.innerWidth&&(o.style.left=`${h.left-f.width-10}px`),f.bottom>window.innerHeight&&(o.style.top=`${h.bottom-f.height}px`)},l=()=>{o&&(o.remove(),o=null)};e.addEventListener("mouseenter",a),e.addEventListener("mouseleave",l)}createConnections(e,t,n){const s=e.querySelector(".skill-tree-svg");s&&s.remove();const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("class","skill-tree-svg"),r.style.position="absolute",r.style.top="0",r.style.left="0",r.style.width="100%",r.style.height="100%",r.style.pointerEvents="none",r.style.zIndex="1";const o=e.getBoundingClientRect();t.forEach(a=>{a.unlockRequirements.forEach(l=>{const c=e.querySelector(`[data-perk-id="${a.id}"]`),d=e.querySelector(`[data-perk-id="${l}"]`);if(c&&d){const h=c.getBoundingClientRect(),f=d.getBoundingClientRect(),u=f.left-o.left+f.width/2,g=f.top-o.top+f.height/2,y=h.left-o.left+h.width/2,m=h.top-o.top+h.height/2,p=document.createElementNS("http://www.w3.org/2000/svg","path"),v=`M ${u} ${g} L ${y} ${m}`;p.setAttribute("d",v),p.setAttribute("stroke-width","3"),p.setAttribute("fill","none");const x=n.purchasedPerks.includes(a.id),M=n.purchasedPerks.includes(l);x&&M?p.setAttribute("stroke","#00ff88"):M?(p.setAttribute("stroke","#4a90e2"),p.setAttribute("stroke-dasharray","5,5")):(p.setAttribute("stroke","#666666"),p.setAttribute("stroke-dasharray","5,5")),r.appendChild(p)}})}),e.appendChild(r)}purchasePerk(e){if(!this.currentUnit)return;vd(this.currentUnit,e)?(console.log(`Successfully purchased perk: ${e}`),this.currentUnit.perkPoints===0?setTimeout(()=>{this.closeSkillTree()},1e3):this.openSkillTree(this.currentUnit,this.onClose)):console.error(`Failed to purchase perk: ${e}`)}createBackButton(){if(!this.container)return;const e=document.createElement("button");e.textContent="BACK",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.padding="15px 25px",e.style.fontSize="1.1rem",e.style.fontWeight="bold",e.style.backgroundColor="#ff6b6b",e.style.color="white",e.style.border="none",e.style.borderRadius="10px",e.style.cursor="pointer",e.style.transition="all 0.3s ease",e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#ff5252",e.style.transform="translateY(-2px)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="#ff6b6b",e.style.transform="translateY(0)"}),e.addEventListener("click",()=>{this.closeSkillTree()}),this.container.appendChild(e)}closeSkillTree(){this.container&&(this.container.style.display="none"),this.onClose&&this.onClose(),console.log("Skill tree closed")}destroy(){this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.currentUnit=null,this.onClose=void 0}}const Ed=new Sd,Sl={"rare-candy":{name:"Rare Candy",description:"Causes a unit to level up and gain 1 perk point to spend on skills",cost:1,imageUrl:gd,type:"consumable",effect:i=>(i.level+=1,i.perkPoints+=1,i.currentHealth=i.health,console.log(`🍬 ${i.name} leveled up to level ${i.level}! Gained 1 perk point. Total perk points: ${i.perkPoints}`),Ed.openSkillTree(i,()=>{console.log(`Skill tree closed for ${i.name}`)}),!0)},"energy-powder":{name:"Energy Powder",description:"Permanently increases a unit's movement by 1",cost:1,imageUrl:yd,type:"consumable",effect:i=>(i.move+=1,console.log(`⚡ ${i.name} gained 1 movement! New movement: ${i.move}`),!0)}};let Md=1;function bd(){return`item-${Md++}`}class Td{createItem(e){const t=Sl[e];if(!t)return console.error(`Item type "${e}" not found in ItemDex.`),null;const n={id:bd(),name:t.name,description:t.description,cost:t.cost,imageUrl:t.imageUrl,type:t.type,effect:t.effect};return console.log(`Created item: ${n.name} (ID: ${n.id}) - Cost: ${n.cost}`),n}}const Ad=new Td;let ta=!0,qi=[null,null,null],Yi=[null,null];function xa(){ta=!0,qi=[null,null,null],Yi=[null,null]}function Fa(){return qi}function wd(){return Yi}function Cd(i,e){i>=0&&i<qi.length&&(qi[i]=e)}function Rd(i,e){i>=0&&i<Yi.length&&(Yi[i]=e)}function Pd(){if(ta){console.log("Shop requires fresh population. Clearing and generating units and items..."),ue.shopUnits=[],ue.shopItems=[],qi=[null,null,null],Yi=[null,null];const i=Object.keys(ga);if(i.length===0)console.error("No unit types defined in UNIT_DEX for the shop!");else{const t=[];for(let n=0;n<3&&i.length!==0;n++){let s,r=0;const o=i.length*2;do{const l=Math.floor(Math.random()*i.length);s=i[l],r++}while(t.includes(s)&&i.length>t.length&&r<o);t.push(s);const a=li.createUnit(s);a&&(ue.addUnitToShop(a),qi[n]=a)}}const e=Object.keys(Sl);if(e.length===0)console.error("No item types defined in ITEM_DEX for the shop!");else for(let t=0;t<Math.min(2,e.length);t++){const n=e[t],s=Ad.createItem(n);s&&(ue.addItemToShop(s),Yi[t]=s)}ta=!1}else console.log("Shop already populated for this session. Using existing display items and item slots.")}let Nt=null;function Ld(i){const e=document.createElement("div");return e.id="shop-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function Dd(i){if(!Nt)return;const e=i.skills&&i.skills.length>0?`
        <div style="margin-top: 8px; border-top: 1px solid #555; padding-top: 5px;">
            <p style="margin: 0 0 3px 0; font-weight: bold; color: #8e44ad; font-size: 0.85em;">Skills:</p>
            ${i.skills.map(t=>`
                <div style="margin: 2px 0; padding: 2px 4px; background-color: rgba(142, 68, 173, 0.1); border-radius: 3px;">
                    <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${t.emoji} ${t.name}</span>
                    <span style="color: #3498db; font-size: 0.75em; margin-left: 5px;">(${t.energyCost} ⚡)</span>
                </div>
            `).join("")}
        </div>
    `:"";Nt.innerHTML=`
        <h4 style="margin: 0 0 5px 0; text-align: center;">${i.name} (${i.className}) - Level ${i.level}</h4>
        <p style="margin: 3px 0;">HP: ${i.health} | Max Energy: ${i.maxEnergy}</p>
        <p style="margin: 3px 0;">Basic Dmg: ${i.basicDamage} | Skill Dmg: ${i.skillDamage}</p>
        <p style="margin: 3px 0;">Range: ${i.range} | Move: ${i.move}</p>
        <p style="margin: 3px 0; font-weight: bold;">Cost: ${i.cost}</p>
        ${e}
    `}function El(i){if(!Nt)return;let e=i.clientX+15,t=i.clientY+15;e+Nt.offsetWidth>window.innerWidth&&(e=window.innerWidth-Nt.offsetWidth-10),t+Nt.offsetHeight>window.innerHeight&&(t=window.innerHeight-Nt.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Nt.style.left=`${e}px`,Nt.style.top=`${t}px`}function Ud(i,e){Nt&&(Dd(i),Nt.style.display="block",El(e))}function _r(){Nt&&(Nt.style.display="none")}function kd(i){(!Nt||!i.contains(Nt))&&(Nt=Ld(i))}let ft=null,Be=null;function Ba(i){const e=document.getElementById("not-enough-resources-message");e&&e.remove();const t=document.createElement("div");t.id="not-enough-resources-message",t.textContent="Not Enough Resources",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}function Id(i){const e=document.getElementById("need-units-message");e&&e.remove();const t=document.createElement("div");t.id="need-units-message",t.textContent="Need At Least 1 Unit In Party",t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.backgroundColor="rgba(231, 76, 60, 0.9)",t.style.color="white",t.style.padding="20px 40px",t.style.borderRadius="10px",t.style.fontSize="1.5em",t.style.fontWeight="bold",t.style.fontFamily="sans-serif",t.style.zIndex="2000",t.style.border="3px solid #c0392b",t.style.boxShadow="0 5px 15px rgba(0, 0, 0, 0.3)",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in-out",i.appendChild(t),setTimeout(()=>{t.style.opacity="1"},10),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},1e3)}function er(i,e){console.log("Showing Shop Scene"),Pd(),document.querySelectorAll("button").forEach(f=>{(f.id==="victory-continue-button"||f.id==="defeat-restart-button")&&f.remove()}),i.innerHTML="",ft=null,Be=null,kd(i);const n=document.createElement("div");n.id="shop-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box";const s=document.createElement("h1");s.textContent="SHOP",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 20px 0";const r=document.createElement("div");r.style.display="flex",r.style.justifyContent="space-around",r.style.width="90%",r.style.flexGrow="1",r.style.alignItems="center",r.style.paddingBottom="20px",Fa().forEach((f,u)=>{const g=document.createElement("div");if(g.id=`shop-slot-${u}`,g.style.width="200px",g.style.height="auto",g.style.minHeight="180px",g.style.border="2px solid #3498db",g.style.borderRadius="10px",g.style.display="flex",g.style.flexDirection="column",g.style.alignItems="center",g.style.justifyContent="center",g.style.backgroundColor="#34495e",g.style.padding="10px",g.style.boxSizing="border-box",g.style.textAlign="center",g.style.cursor="pointer",g.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",f&&"sold"in f&&f.sold===!0)g.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',g.style.cursor="default",g.dataset.sold="true";else if(f&&"id"in f){const y=f;g.dataset.unitId=y.id;const m=document.createElement("img");m.src=y.imageUrl,m.alt=y.className,m.style.width="60px",m.style.height="60px",m.style.marginBottom="8px",m.style.borderRadius="4px",g.appendChild(m);const p=document.createElement("h4");p.textContent=y.name,p.style.margin="0 0 4px 0",p.style.fontSize="1.1em",g.appendChild(p);const v=document.createElement("p");v.textContent=`(${y.className})`,v.style.margin="0",v.style.fontSize="0.9em",v.style.fontStyle="italic",g.appendChild(v),g.addEventListener("mouseenter",x=>{const M=Fa()[u];M&&"id"in M&&Ud(M,x)}),g.addEventListener("mousemove",x=>{El(x)}),g.addEventListener("mouseleave",()=>{_r()}),g.addEventListener("click",()=>{if(g.dataset.sold==="true")return;const x=ue.shopUnits.find(M=>M.id===y.id);if(!x){console.warn("Clicked unit no longer available in shopUnits registry for purchase.",y.id);return}if(ft&&ft!==g){ft.style.transform="translateY(0)",ft.style.boxShadow="none",ft.style.justifyContent="center";const M=ft.querySelector("button.buy-button-shop");M&&ft.removeChild(M)}if(ft===g){g.style.transform="translateY(0)",g.style.boxShadow="none",g.style.justifyContent="center";const M=g.querySelector("button.buy-button-shop");M&&g.removeChild(M),ft=null,Be=null}else{ft=g,g.style.transform="translateY(-10px)",g.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)";const M=g.querySelector("button.buy-button-shop");M&&g.removeChild(M),Be=document.createElement("button"),Be.className="buy-button-shop",Be.textContent=`Buy (${x.cost} R)`,Be.style.padding="8px 12px",Be.style.fontSize="0.9em",Be.style.backgroundColor="#e67e22",Be.style.color="white",Be.style.border="none",Be.style.borderRadius="5px",Be.style.cursor="pointer",Be.style.marginTop="10px",Be.dataset.unitId=x.id,Be.onclick=P=>{P.stopPropagation();const A=x;if(Qt.resource<A.cost){Ba(i);return}Qt.spendResource(A.cost),ue.removeUnitFromShop(A.id),Cd(u,{sold:!0,originalUnit:A}),ue.playerParty.length<Xi.MAX_PLAYER_PARTY_SIZE?(ue.addUnitToPlayerParty(A),console.log(`${A.name} (${A.className}) purchased and added to Squad!`)):(ue.addUnitToStorage(A),console.log(`${A.name} (${A.className}) purchased and added to Box (Squad was full).`)),g.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',g.style.transform="translateY(0)",g.style.boxShadow="none",g.style.cursor="default",g.dataset.sold="true",ft=null;const w=document.getElementById("shop-resource-display");w&&(w.textContent=`Resource: ${Qt.resource}`),_r()},g.style.justifyContent="space-between",g.appendChild(Be)}})}else g.textContent="N/A",g.style.cursor="default";r.appendChild(g)});const o=document.createElement("div");o.style.display="flex",o.style.justifyContent="center",o.style.gap="20px",o.style.width="90%",o.style.alignItems="center",o.style.paddingBottom="20px",wd().forEach((f,u)=>{const g=document.createElement("div");if(g.id=`shop-item-slot-${u}`,g.style.width="100px",g.style.height="auto",g.style.minHeight="90px",g.style.border="2px solid #f39c12",g.style.borderRadius="10px",g.style.display="flex",g.style.flexDirection="column",g.style.alignItems="center",g.style.justifyContent="center",g.style.backgroundColor="#34495e",g.style.padding="8px",g.style.boxSizing="border-box",g.style.textAlign="center",g.style.cursor="pointer",g.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",f&&"sold"in f&&f.sold===!0)g.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',g.style.cursor="default",g.dataset.sold="true";else if(f&&"id"in f){const y=f;g.dataset.itemId=y.id;const m=document.createElement("img");m.src=y.imageUrl,m.alt=y.name,m.style.width="30px",m.style.height="30px",m.style.marginBottom="4px",m.style.borderRadius="2px",g.appendChild(m);const p=document.createElement("h6");p.textContent=y.name,p.style.margin="0",p.style.fontSize="0.7em",p.style.fontWeight="bold",g.appendChild(p),g.addEventListener("mouseenter",()=>{g.title=`${y.name}
${y.description}
Cost: ${y.cost} Resource`}),g.addEventListener("click",()=>{if(g.dataset.sold==="true")return;const v=ue.shopItems.find(x=>x.id===y.id);if(!v){console.warn("Clicked item no longer available in shopItems registry for purchase.",y.id);return}if(ft&&ft!==g){ft.style.transform="translateY(0)",ft.style.boxShadow="none",ft.style.justifyContent="center";const x=ft.querySelector("button.buy-button-shop");x&&ft.removeChild(x)}if(ft===g){g.style.transform="translateY(0)",g.style.boxShadow="none",g.style.justifyContent="center";const x=g.querySelector("button.buy-button-shop");x&&g.removeChild(x),ft=null,Be=null}else{ft=g,g.style.transform="translateY(-5px)",g.style.boxShadow="0px 3px 10px rgba(0,0,0,0.3)";const x=g.querySelector("button.buy-button-shop");x&&g.removeChild(x),Be=document.createElement("button"),Be.className="buy-button-shop",Be.textContent=`Buy (${v.cost} R)`,Be.style.padding="6px 10px",Be.style.fontSize="0.8em",Be.style.backgroundColor="#e67e22",Be.style.color="white",Be.style.border="none",Be.style.borderRadius="4px",Be.style.cursor="pointer",Be.style.marginTop="5px",Be.style.fontWeight="bold",Be.style.transition="background-color 0.2s",Be.dataset.itemId=v.id,Be.addEventListener("mouseenter",()=>{Be&&(Be.style.backgroundColor="#f39c12")}),Be.addEventListener("mouseleave",()=>{Be&&(Be.style.backgroundColor="#e67e22")}),Be.onclick=M=>{M.stopPropagation();const P=v;if(Qt.resource<P.cost){Ba(i);return}Qt.spendResource(P.cost),ue.removeItemFromShop(P.id),ue.addItemToPlayer(P),Rd(u,{sold:!0,originalItem:P}),console.log(`${P.name} purchased and added to inventory!`),g.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 0.8em; font-weight: bold;">SOLD</p></div>',g.style.transform="translateY(0)",g.style.boxShadow="none",g.style.cursor="default",g.dataset.sold="true",ft=null;const A=document.getElementById("shop-resource-display");A&&(A.textContent=`Resource: ${Qt.resource}`)},g.style.justifyContent="space-between",g.appendChild(Be)}})}else g.textContent="N/A",g.style.cursor="default";o.appendChild(g)});const a=document.createElement("div");a.style.width="100%",a.style.display="flex",a.style.justifyContent="space-between",a.style.alignItems="center",a.style.paddingTop="20px";const l=document.createElement("div");l.id="shop-resource-display",l.textContent=`Resource: ${Qt.resource}`,l.style.padding="10px 15px",l.style.backgroundColor="#1a1a1a",l.style.color="#f1c40f",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.display="flex",l.style.alignItems="center";const c=document.createElement("button");c.id="shop-squad-button",c.textContent="Squad/Inventory",c.style.padding="8px 15px",c.style.fontSize="1em",c.style.backgroundColor="#3498db",c.style.color="white",c.style.border="none",c.style.borderRadius="5px",c.style.cursor="pointer",c.style.margin="0 8px",c.addEventListener("mouseover",()=>c.style.backgroundColor="#2980b9"),c.addEventListener("mouseout",()=>c.style.backgroundColor="#3498db"),c.onclick=()=>{_r(),ma(i,e,()=>er(i,e))};const d=document.createElement("button");d.id="shop-proceed-button",d.textContent="PROCEED",d.style.padding="8px 15px",d.style.fontSize="1em",d.style.backgroundColor="#27ae60",d.style.color="white",d.style.border="none",d.style.borderRadius="5px",d.style.cursor="pointer",d.onclick=()=>{if(ue.playerParty.length===0){Id(i);return}e()};const h=document.createElement("div");h.style.display="flex",h.style.justifyContent="center",h.style.alignItems="center",h.style.flexGrow="2",h.appendChild(c),a.appendChild(l),a.appendChild(h),a.appendChild(d),n.appendChild(s),n.appendChild(r),n.appendChild(o),n.appendChild(a),i.appendChild(n),console.log("Shop Scene displayed with Proceed button.")}async function Nd(){console.log("Initializing application..."),xa(),document.body.style.margin="0",document.body.style.overflow="hidden";const i=document.createElement("div");i.id="app-container",i.style.width="100vw",i.style.height="100vh",i.style.margin="0",i.style.padding="0",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.overflow="hidden",document.body.appendChild(i);const e=document.createElement("div");return e.id="game-content-wrapper",e.style.position="relative",console.log("Application initialized, ready for content."),{appContainer:i,gameSpecificContainer:e}}function $a(i){i().catch(e=>{console.error("Critical error during application initialization:",e);try{document.body.innerHTML='<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #e0e0e0; font-family: sans-serif;"><h1>Application Error</h1><p>A critical error occurred and the application cannot start.</p><p>Please check the browser console for more details.</p></div>'}catch(t){console.error("Could not display error message in DOM.",t)}})}const Od="modulepreload",Fd=function(i){return"/"+i},Ha={},Ml=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var o=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=c(t.map(d=>{if(d=Fd(d),d in Ha)return;Ha[d]=!0;const h=d.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":Od,h||(u.as="script"),u.crossOrigin="",u.href=d,l&&u.setAttribute("nonce",l),document.head.appendChild(u),h)return new Promise((g,y)=>{u.addEventListener("load",g),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _a="160",Bd=0,za=1,$d=2,bl=1,Hd=2,Pn=3,En=0,qt=1,Un=2,qn=0,Gi=1,Ga=2,Va=3,Wa=4,zd=5,ci=100,Gd=101,Vd=102,Xa=103,qa=104,Wd=200,Xd=201,qd=202,Yd=203,na=204,ia=205,jd=206,Kd=207,Zd=208,Jd=209,Qd=210,eu=211,tu=212,nu=213,iu=214,su=0,ru=1,au=2,tr=3,ou=4,lu=5,cu=6,du=7,Tl=0,uu=1,hu=2,Yn=0,fu=1,pu=2,mu=3,gu=4,yu=5,xu=6,Al=300,ji=301,Ki=302,sa=303,ra=304,cr=306,aa=1e3,en=1001,oa=1002,qe=1003,Ya=1004,vr=1005,rn=1006,_u=1007,fs=1008,jn=1009,vu=1010,Su=1011,va=1012,wl=1013,Wn=1014,Xn=1015,ps=1016,Cl=1017,Rl=1018,hi=1020,Eu=1021,hn=1023,Mu=1024,bu=1025,fi=1026,Zi=1027,Tu=1028,Pl=1029,Au=1030,Ll=1031,Dl=1033,Sr=33776,Er=33777,Mr=33778,br=33779,ja=35840,Ka=35841,Za=35842,Ja=35843,Ul=36196,Qa=37492,eo=37496,to=37808,no=37809,io=37810,so=37811,ro=37812,ao=37813,oo=37814,lo=37815,co=37816,uo=37817,ho=37818,fo=37819,po=37820,mo=37821,Tr=36492,go=36494,yo=36495,wu=36283,xo=36284,_o=36285,vo=36286,kl=3e3,pi=3001,Cu=3200,Ru=3201,Pu=0,Lu=1,an="",Ct="srgb",On="srgb-linear",Sa="display-p3",dr="display-p3-linear",nr="linear",dt="srgb",ir="rec709",sr="p3",xi=7680,So=519,Du=512,Uu=513,ku=514,Il=515,Iu=516,Nu=517,Ou=518,Fu=519,Eo=35044,Mo="300 es",la=1035,In=2e3,rr=2001;class Qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ar=Math.PI/180,ca=180/Math.PI;function gs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function Xt(i,e,t){return Math.max(e,Math.min(t,i))}function Bu(i,e){return(i%e+e)%e}function wr(i,e,t){return(1-t)*i+t*e}function bo(i){return(i&i-1)===0&&i!==0}function da(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ns(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class it{constructor(e=0,t=0){it.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,n,s,r,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],f=n[2],u=n[5],g=n[8],y=s[0],m=s[3],p=s[6],v=s[1],x=s[4],M=s[7],P=s[2],A=s[5],w=s[8];return r[0]=o*y+a*v+l*P,r[3]=o*m+a*x+l*A,r[6]=o*p+a*M+l*w,r[1]=c*y+d*v+h*P,r[4]=c*m+d*x+h*A,r[7]=c*p+d*M+h*w,r[2]=f*y+u*v+g*P,r[5]=f*m+u*x+g*A,r[8]=f*p+u*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*r*d+n*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,f=a*l-d*r,u=c*r-o*l,g=t*h+n*f+s*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=h*y,e[1]=(s*c-d*n)*y,e[2]=(a*n-s*o)*y,e[3]=f*y,e[4]=(d*t-s*l)*y,e[5]=(s*r-a*t)*y,e[6]=u*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Cr.makeScale(e,t)),this}rotate(e){return this.premultiply(Cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new Ge;function Nl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ms(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $u(){const i=ms("canvas");return i.style.display="block",i}const To={};function hs(i){i in To||(To[i]=!0,console.warn(i))}const Ao=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wo=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ms={[On]:{transfer:nr,primaries:ir,toReference:i=>i,fromReference:i=>i},[Ct]:{transfer:dt,primaries:ir,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[dr]:{transfer:nr,primaries:sr,toReference:i=>i.applyMatrix3(wo),fromReference:i=>i.applyMatrix3(Ao)},[Sa]:{transfer:dt,primaries:sr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(wo),fromReference:i=>i.applyMatrix3(Ao).convertLinearToSRGB()}},Hu=new Set([On,dr]),et={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Ms[e].toReference,s=Ms[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Ms[i].primaries},getTransfer:function(i){return i===an?nr:Ms[i].transfer}};function Vi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Rr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_i===void 0&&(_i=ms("canvas")),_i.width=e.width,_i.height=e.height;const n=_i.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=_i}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ms("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Vi(t[n]/255)*255):t[n]=Vi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zu=0;class Fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=gs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Pr(s[o].image)):r.push(Pr(s[o]))}else r=Pr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Pr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gu=0;class Vt extends Qi{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=en,s=en,r=rn,o=fs,a=hn,l=jn,c=Vt.DEFAULT_ANISOTROPY,d=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=gs(),this.name="",this.source=new Fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(hs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===pi?Ct:an),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Al)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case aa:e.x=e.x-Math.floor(e.x);break;case en:e.x=e.x<0?0:1;break;case oa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case aa:e.y=e.y-Math.floor(e.y);break;case en:e.y=e.y<0?0:1;break;case oa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return hs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ct?pi:kl}set encoding(e){hs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===pi?Ct:an}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Al;Vt.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,n=0,s=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],u=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+u+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(u+1)/2,P=(p+1)/2,A=(d+f)/4,w=(h+y)/4,G=(g+m)/4;return x>M&&x>P?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=A/n,r=w/n):M>P?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=G/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=w/r,s=G/r),this.set(n,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-d)*(f-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-y)/v,this.z=(f-d)/v,this.w=Math.acos((c+u+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vu extends Qi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(hs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===pi?Ct:an),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Vt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends Vu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bl extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wu extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=qe,this.minFilter=qe,this.wrapR=en,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ys{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3];const f=r[o+0],u=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=u,e[t+2]=g,e[t+3]=y;return}if(h!==y||l!==f||c!==u||d!==g){let m=1-a;const p=l*f+c*u+d*g+h*y,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),A=Math.atan2(P,p*v);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const M=a*v;if(l=l*m+f*M,c=c*m+u*M,d=d*m+g*M,h=h*m+y*M,m===1-a){const P=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=P,c*=P,d*=P,h*=P}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[o],f=r[o+1],u=r[o+2],g=r[o+3];return e[t]=a*g+d*h+l*u-c*f,e[t+1]=l*g+d*f+c*h-a*u,e[t+2]=c*g+d*u+a*f-l*h,e[t+3]=d*g-a*h-l*f-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(s/2),h=a(r/2),f=l(n/2),u=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*d*h+c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h-f*u*g;break;case"YXZ":this._x=f*d*h+c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h+f*u*g;break;case"ZXY":this._x=f*d*h-c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h-f*u*g;break;case"ZYX":this._x=f*d*h-c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h+f*u*g;break;case"YZX":this._x=f*d*h+c*u*g,this._y=c*u*h+f*d*g,this._z=c*d*g-f*u*h,this._w=c*d*h-f*u*g;break;case"XZY":this._x=f*d*h-c*u*g,this._y=c*u*h-f*d*g,this._z=c*d*g+f*u*h,this._w=c*d*h+f*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],f=n+a+h;if(f>0){const u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(d-l)*u,this._y=(r-c)*u,this._z=(o-s)*u}else if(n>a&&n>h){const u=2*Math.sqrt(1+n-a-h);this._w=(d-l)/u,this._x=.25*u,this._y=(s+o)/u,this._z=(r+c)/u}else if(a>h){const u=2*Math.sqrt(1+a-n-h);this._w=(r-c)/u,this._x=(s+o)/u,this._y=.25*u,this._z=(l+d)/u}else{const u=2*Math.sqrt(1+h-n-a);this._w=(o-s)/u,this._x=(r+c)/u,this._y=(l+d)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-n*c,this._z=r*d+o*c+n*l-s*a,this._w=o*d-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const u=1-t;return this._w=u*o+t*this._w,this._x=u*n+t*this._x,this._y=u*s+t*this._y,this._z=u*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Co.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Co.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),d=2*(a*t-r*s),h=2*(r*n-o*t);return this.x=t+l*c+o*h-a*d,this.y=n+l*d+a*c-r*h,this.z=s+l*h+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lr.copy(this).projectOnVector(e),this.sub(Lr)}reflect(e){return this.sub(Lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new D,Co=new ys;class xs{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bs.copy(n.boundingBox)),bs.applyMatrix4(e.matrixWorld),this.union(bs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Ts.subVectors(this.max,is),vi.subVectors(e.a,is),Si.subVectors(e.b,is),Ei.subVectors(e.c,is),Fn.subVectors(Si,vi),Bn.subVectors(Ei,Si),Jn.subVectors(vi,Ei);let t=[0,-Fn.z,Fn.y,0,-Bn.z,Bn.y,0,-Jn.z,Jn.y,Fn.z,0,-Fn.x,Bn.z,0,-Bn.x,Jn.z,0,-Jn.x,-Fn.y,Fn.x,0,-Bn.y,Bn.x,0,-Jn.y,Jn.x,0];return!Dr(t,vi,Si,Ei,Ts)||(t=[1,0,0,0,1,0,0,0,1],!Dr(t,vi,Si,Ei,Ts))?!1:(As.crossVectors(Fn,Bn),t=[As.x,As.y,As.z],Dr(t,vi,Si,Ei,Ts))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Tn=[new D,new D,new D,new D,new D,new D,new D,new D],on=new D,bs=new xs,vi=new D,Si=new D,Ei=new D,Fn=new D,Bn=new D,Jn=new D,is=new D,Ts=new D,As=new D,Qn=new D;function Dr(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Qn.fromArray(i,r);const a=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),l=e.dot(Qn),c=t.dot(Qn),d=n.dot(Qn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Xu=new xs,ss=new D,Ur=new D;class ur{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ur.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(Ur)),this.expandByPoint(ss.copy(e.center).sub(Ur))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new D,kr=new D,ws=new D,$n=new D,Ir=new D,Cs=new D,Nr=new D;class $l{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,An)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=An.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(An.copy(this.origin).addScaledVector(this.direction,t),An.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){kr.copy(e).add(t).multiplyScalar(.5),ws.copy(t).sub(e).normalize(),$n.copy(this.origin).sub(kr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ws),a=$n.dot(this.direction),l=-$n.dot(ws),c=$n.lengthSq(),d=Math.abs(1-o*o);let h,f,u,g;if(d>0)if(h=o*l-a,f=o*a-l,g=r*d,h>=0)if(f>=-g)if(f<=g){const y=1/d;h*=y,f*=y,u=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),u=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),u=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),u=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),u=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(kr).addScaledVector(ws,f),u}intersectSphere(e,t){An.subVectors(e.center,this.origin);const n=An.dot(this.direction),s=An.dot(An)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,An)!==null}intersectTriangle(e,t,n,s,r){Ir.subVectors(t,e),Cs.subVectors(n,e),Nr.crossVectors(Ir,Cs);let o=this.direction.dot(Nr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$n.subVectors(this.origin,e);const l=a*this.direction.dot(Cs.crossVectors($n,Cs));if(l<0)return null;const c=a*this.direction.dot(Ir.cross($n));if(c<0||l+c>o)return null;const d=-a*$n.dot(Nr);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wt{constructor(e,t,n,s,r,o,a,l,c,d,h,f,u,g,y,m){wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,d,h,f,u,g,y,m)}set(e,t,n,s,r,o,a,l,c,d,h,f,u,g,y,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=f,p[3]=u,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Mi.setFromMatrixColumn(e,0).length(),r=1/Mi.setFromMatrixColumn(e,1).length(),o=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=o*d,u=o*h,g=a*d,y=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=u+g*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=g+u*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,u=l*h,g=c*d,y=c*h;t[0]=f+y*a,t[4]=g*a-u,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=u*a-g,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,u=l*h,g=c*d,y=c*h;t[0]=f-y*a,t[4]=-o*h,t[8]=g+u*a,t[1]=u+g*a,t[5]=o*d,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,u=o*h,g=a*d,y=a*h;t[0]=l*d,t[4]=g*c-u,t[8]=f*c+y,t[1]=l*h,t[5]=y*c+f,t[9]=u*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,u=o*c,g=a*l,y=a*c;t[0]=l*d,t[4]=y-f*h,t[8]=g*h+u,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=u*h+g,t[10]=f-y*h}else if(e.order==="XZY"){const f=o*l,u=o*c,g=a*l,y=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=f*h+y,t[5]=o*d,t[9]=u*h-g,t[2]=g*h-u,t[6]=a*d,t[10]=y*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(qu,e,Yu)}lookAt(e,t,n){const s=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),Hn.crossVectors(n,Kt),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),Hn.crossVectors(n,Kt)),Hn.normalize(),Rs.crossVectors(Kt,Hn),s[0]=Hn.x,s[4]=Rs.x,s[8]=Kt.x,s[1]=Hn.y,s[5]=Rs.y,s[9]=Kt.y,s[2]=Hn.z,s[6]=Rs.z,s[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],f=n[9],u=n[13],g=n[2],y=n[6],m=n[10],p=n[14],v=n[3],x=n[7],M=n[11],P=n[15],A=s[0],w=s[4],G=s[8],S=s[12],T=s[1],B=s[5],H=s[9],te=s[13],R=s[2],O=s[6],z=s[10],q=s[14],W=s[3],X=s[7],Y=s[11],ne=s[15];return r[0]=o*A+a*T+l*R+c*W,r[4]=o*w+a*B+l*O+c*X,r[8]=o*G+a*H+l*z+c*Y,r[12]=o*S+a*te+l*q+c*ne,r[1]=d*A+h*T+f*R+u*W,r[5]=d*w+h*B+f*O+u*X,r[9]=d*G+h*H+f*z+u*Y,r[13]=d*S+h*te+f*q+u*ne,r[2]=g*A+y*T+m*R+p*W,r[6]=g*w+y*B+m*O+p*X,r[10]=g*G+y*H+m*z+p*Y,r[14]=g*S+y*te+m*q+p*ne,r[3]=v*A+x*T+M*R+P*W,r[7]=v*w+x*B+M*O+P*X,r[11]=v*G+x*H+M*z+P*Y,r[15]=v*S+x*te+M*q+P*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],u=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*l*h-s*c*h-r*a*f+n*c*f+s*a*u-n*l*u)+y*(+t*l*u-t*c*f+r*o*f-s*o*u+s*c*d-r*l*d)+m*(+t*c*h-t*a*u-r*o*h+n*o*u+r*a*d-n*c*d)+p*(-s*a*d-t*l*h+t*a*f+s*o*h-n*o*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],u=e[11],g=e[12],y=e[13],m=e[14],p=e[15],v=h*m*c-y*f*c+y*l*u-a*m*u-h*l*p+a*f*p,x=g*f*c-d*m*c-g*l*u+o*m*u+d*l*p-o*f*p,M=d*y*c-g*h*c+g*a*u-o*y*u-d*a*p+o*h*p,P=g*h*l-d*y*l-g*a*f+o*y*f+d*a*m-o*h*m,A=t*v+n*x+s*M+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=v*w,e[1]=(y*f*r-h*m*r-y*s*u+n*m*u+h*s*p-n*f*p)*w,e[2]=(a*m*r-y*l*r+y*s*c-n*m*c-a*s*p+n*l*p)*w,e[3]=(h*l*r-a*f*r-h*s*c+n*f*c+a*s*u-n*l*u)*w,e[4]=x*w,e[5]=(d*m*r-g*f*r+g*s*u-t*m*u-d*s*p+t*f*p)*w,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*w,e[7]=(o*f*r-d*l*r+d*s*c-t*f*c-o*s*u+t*l*u)*w,e[8]=M*w,e[9]=(g*h*r-d*y*r-g*n*u+t*y*u+d*n*p-t*h*p)*w,e[10]=(o*y*r-g*a*r+g*n*c-t*y*c-o*n*p+t*a*p)*w,e[11]=(d*a*r-o*h*r-d*n*c+t*h*c+o*n*u-t*a*u)*w,e[12]=P*w,e[13]=(d*y*s-g*h*s+g*n*f-t*y*f-d*n*m+t*h*m)*w,e[14]=(g*a*s-o*y*s-g*n*l+t*y*l+o*n*m-t*a*m)*w,e[15]=(o*h*s-d*a*s+d*n*l-t*h*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+n,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,h=a+a,f=r*c,u=r*d,g=r*h,y=o*d,m=o*h,p=a*h,v=l*c,x=l*d,M=l*h,P=n.x,A=n.y,w=n.z;return s[0]=(1-(y+p))*P,s[1]=(u+M)*P,s[2]=(g-x)*P,s[3]=0,s[4]=(u-M)*A,s[5]=(1-(f+p))*A,s[6]=(m+v)*A,s[7]=0,s[8]=(g+x)*w,s[9]=(m-v)*w,s[10]=(1-(f+y))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Mi.set(s[0],s[1],s[2]).length();const o=Mi.set(s[4],s[5],s[6]).length(),a=Mi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ln.copy(this);const c=1/r,d=1/o,h=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=d,ln.elements[5]*=d,ln.elements[6]*=d,ln.elements[8]*=h,ln.elements[9]*=h,ln.elements[10]*=h,t.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=In){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let u,g;if(a===In)u=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===rr)u=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=In){const l=this.elements,c=1/(t-e),d=1/(n-s),h=1/(o-r),f=(t+e)*c,u=(n+s)*d;let g,y;if(a===In)g=(o+r)*h,y=-2*h;else if(a===rr)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new D,ln=new wt,qu=new D(0,0,0),Yu=new D(1,1,1),Hn=new D,Rs=new D,Kt=new D,Ro=new wt,Po=new ys;class hr{constructor(e=0,t=0,n=0,s=hr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],f=s[6],u=s[10];switch(t){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,u),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ro.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ro,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Po.setFromEuler(this),this.setFromQuaternion(Po,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hr.DEFAULT_ORDER="XYZ";class Hl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ju=0;const Lo=new D,bi=new ys,wn=new wt,Ps=new D,rs=new D,Ku=new D,Zu=new ys,Do=new D(1,0,0),Uo=new D(0,1,0),ko=new D(0,0,1),Ju={type:"added"},Qu={type:"removed"};class Yt extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new D,t=new hr,n=new ys,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ge}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return bi.setFromAxisAngle(e,t),this.quaternion.multiply(bi),this}rotateOnWorldAxis(e,t){return bi.setFromAxisAngle(e,t),this.quaternion.premultiply(bi),this}rotateX(e){return this.rotateOnAxis(Do,e)}rotateY(e){return this.rotateOnAxis(Uo,e)}rotateZ(e){return this.rotateOnAxis(ko,e)}translateOnAxis(e,t){return Lo.copy(e).applyQuaternion(this.quaternion),this.position.add(Lo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Do,e)}translateY(e){return this.translateOnAxis(Uo,e)}translateZ(e){return this.translateOnAxis(ko,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ps.copy(e):Ps.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(rs,Ps,this.up):wn.lookAt(Ps,rs,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),bi.setFromRotationMatrix(wn),this.quaternion.premultiply(bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ju)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,Ku),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,Zu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),f=o(e.skeletons),u=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Yt.DEFAULT_UP=new D(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new D,Cn=new D,Or=new D,Rn=new D,Ti=new D,Ai=new D,Io=new D,Fr=new D,Br=new D,$r=new D;let Ls=!1;class dn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),cn.subVectors(e,t),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){cn.subVectors(s,t),Cn.subVectors(n,t),Or.subVectors(e,t);const o=cn.dot(cn),a=cn.dot(Cn),l=cn.dot(Or),c=Cn.dot(Cn),d=Cn.dot(Or),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,u=(c*l-a*d)*f,g=(o*d-a*l)*f;return r.set(1-u-g,g,u)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getUV(e,t,n,s,r,o,a,l){return Ls===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ls=!0),this.getInterpolation(e,t,n,s,r,o,a,l)}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Rn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Rn.x),l.addScaledVector(o,Rn.y),l.addScaledVector(a,Rn.z),l)}static isFrontFacing(e,t,n,s){return cn.subVectors(n,t),Cn.subVectors(e,t),cn.cross(Cn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),cn.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Ls===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ls=!0),dn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ti.subVectors(s,n),Ai.subVectors(r,n),Fr.subVectors(e,n);const l=Ti.dot(Fr),c=Ai.dot(Fr);if(l<=0&&c<=0)return t.copy(n);Br.subVectors(e,s);const d=Ti.dot(Br),h=Ai.dot(Br);if(d>=0&&h<=d)return t.copy(s);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(Ti,o);$r.subVectors(e,r);const u=Ti.dot($r),g=Ai.dot($r);if(g>=0&&u<=g)return t.copy(r);const y=u*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ai,a);const m=d*g-u*h;if(m<=0&&h-d>=0&&u-g>=0)return Io.subVectors(r,s),a=(h-d)/(h-d+(u-g)),t.copy(s).addScaledVector(Io,a);const p=1/(m+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Ds={h:0,s:0,l:0};function Hr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Bu(e,1),t=Xt(t,0,1),n=Xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Hr(o,r,e+1/3),this.g=Hr(o,r,e),this.b=Hr(o,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=zl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return et.fromWorkingColorSpace(Dt.copy(this),e),Math.round(Xt(Dt.r*255,0,255))*65536+Math.round(Xt(Dt.g*255,0,255))*256+Math.round(Xt(Dt.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Dt.copy(this),t);const n=Dt.r,s=Dt.g,r=Dt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Ct){et.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,s=Dt.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Ds);const n=wr(zn.h,Ds.h,t),s=wr(zn.s,Ds.s,t),r=wr(zn.l,Ds.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new Ze;Ze.NAMES=zl;let eh=0;class fn extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=Gi,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=So,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xi,this.stencilZFail=xi,this.stencilZPass=xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==na&&(n.blendSrc=this.blendSrc),this.blendDst!==ia&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==tr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==So&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nt extends fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Tl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new D,Us=new it;class Sn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Eo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Us.fromBufferAttribute(this,t),Us.applyMatrix3(e),this.setXY(t,Us.x,Us.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ns(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ns(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ns(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ns(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ns(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eo&&(e.usage=this.usage),e}}class Gl extends Sn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Vl extends Sn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pn extends Sn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let th=0;const nn=new wt,zr=new Yt,wi=new D,Zt=new xs,as=new xs,Tt=new D;class Mn extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nl(e)?Vl:Gl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return zr.lookAt(e),zr.updateMatrix(),this.applyMatrix4(zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Zt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];as.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(Zt.min,as.min),Zt.expandByPoint(Tt),Tt.addVectors(Zt.max,as.max),Zt.expandByPoint(Tt)):(Zt.expandByPoint(as.min),Zt.expandByPoint(as.max))}Zt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Tt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Tt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Tt.fromBufferAttribute(a,c),l&&(wi.fromBufferAttribute(e,c),Tt.add(wi)),s=Math.max(s,n.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let T=0;T<a;T++)c[T]=new D,d[T]=new D;const h=new D,f=new D,u=new D,g=new it,y=new it,m=new it,p=new D,v=new D;function x(T,B,H){h.fromArray(s,T*3),f.fromArray(s,B*3),u.fromArray(s,H*3),g.fromArray(o,T*2),y.fromArray(o,B*2),m.fromArray(o,H*2),f.sub(h),u.sub(h),y.sub(g),m.sub(g);const te=1/(y.x*m.y-m.x*y.y);isFinite(te)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(u,-y.y).multiplyScalar(te),v.copy(u).multiplyScalar(y.x).addScaledVector(f,-m.x).multiplyScalar(te),c[T].add(p),c[B].add(p),c[H].add(p),d[T].add(v),d[B].add(v),d[H].add(v))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let T=0,B=M.length;T<B;++T){const H=M[T],te=H.start,R=H.count;for(let O=te,z=te+R;O<z;O+=3)x(n[O+0],n[O+1],n[O+2])}const P=new D,A=new D,w=new D,G=new D;function S(T){w.fromArray(r,T*3),G.copy(w);const B=c[T];P.copy(B),P.sub(w.multiplyScalar(w.dot(B))).normalize(),A.crossVectors(G,B);const te=A.dot(d[T])<0?-1:1;l[T*4]=P.x,l[T*4+1]=P.y,l[T*4+2]=P.z,l[T*4+3]=te}for(let T=0,B=M.length;T<B;++T){const H=M[T],te=H.start,R=H.count;for(let O=te,z=te+R;O<z;O+=3)S(n[O+0]),S(n[O+1]),S(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Sn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,o=new D,a=new D,l=new D,c=new D,d=new D,h=new D;if(e)for(let f=0,u=e.count;f<u;f+=3){const g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,u=t.count;f<u;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,f=new c.constructor(l.length*d);let u=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?u=l[y]*a.data.stride+a.offset:u=l[y]*d;for(let p=0;p<d;p++)f[g++]=c[u++]}return new Sn(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,h=c.length;d<h;d++){const f=c[d],u=e(f,n);l.push(u)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const u=c[h];d.push(u.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let f=0,u=h.length;f<u;f++)d.push(h[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const No=new wt,ei=new $l,ks=new ur,Oo=new D,Ci=new D,Ri=new D,Pi=new D,Gr=new D,Is=new D,Ns=new it,Os=new it,Fs=new it,Fo=new D,Bo=new D,$o=new D,Bs=new D,$s=new D;class Ye extends Yt{constructor(e=new Mn,t=new nt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Is.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],h=r[l];d!==0&&(Gr.fromBufferAttribute(h,e),o?Is.addScaledVector(Gr,d):Is.addScaledVector(Gr.sub(t),d))}t.add(Is)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(r),ei.copy(e.ray).recast(e.near),!(ks.containsPoint(ei.origin)===!1&&(ei.intersectSphere(ks,Oo)===null||ei.origin.distanceToSquared(Oo)>(e.far-e.near)**2))&&(No.copy(r).invert(),ei.copy(e.ray).applyMatrix4(No),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,f=r.groups,u=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,u.start),x=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let M=v,P=x;M<P;M+=3){const A=a.getX(M),w=a.getX(M+1),G=a.getX(M+2);s=Hs(this,p,e,n,c,d,h,A,w,G),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,u.start),y=Math.min(a.count,u.start+u.count);for(let m=g,p=y;m<p;m+=3){const v=a.getX(m),x=a.getX(m+1),M=a.getX(m+2);s=Hs(this,o,e,n,c,d,h,v,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=o[m.materialIndex],v=Math.max(m.start,u.start),x=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let M=v,P=x;M<P;M+=3){const A=M,w=M+1,G=M+2;s=Hs(this,p,e,n,c,d,h,A,w,G),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let m=g,p=y;m<p;m+=3){const v=m,x=m+1,M=m+2;s=Hs(this,o,e,n,c,d,h,v,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function nh(i,e,t,n,s,r,o,a){let l;if(e.side===qt?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===En,a),l===null)return null;$s.copy(a),$s.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo($s);return c<t.near||c>t.far?null:{distance:c,point:$s.clone(),object:i}}function Hs(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,Ci),i.getVertexPosition(l,Ri),i.getVertexPosition(c,Pi);const d=nh(i,e,t,n,Ci,Ri,Pi,Bs);if(d){s&&(Ns.fromBufferAttribute(s,a),Os.fromBufferAttribute(s,l),Fs.fromBufferAttribute(s,c),d.uv=dn.getInterpolation(Bs,Ci,Ri,Pi,Ns,Os,Fs,new it)),r&&(Ns.fromBufferAttribute(r,a),Os.fromBufferAttribute(r,l),Fs.fromBufferAttribute(r,c),d.uv1=dn.getInterpolation(Bs,Ci,Ri,Pi,Ns,Os,Fs,new it),d.uv2=d.uv1),o&&(Fo.fromBufferAttribute(o,a),Bo.fromBufferAttribute(o,l),$o.fromBufferAttribute(o,c),d.normal=dn.getInterpolation(Bs,Ci,Ri,Pi,Fo,Bo,$o,new D),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new D,materialIndex:0};dn.getNormal(Ci,Ri,Pi,h.normal),d.face=h}return d}class _s extends Mn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],h=[];let f=0,u=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pn(c,3)),this.setAttribute("normal",new pn(d,3)),this.setAttribute("uv",new pn(h,2));function g(y,m,p,v,x,M,P,A,w,G,S){const T=M/w,B=P/G,H=M/2,te=P/2,R=A/2,O=w+1,z=G+1;let q=0,W=0;const X=new D;for(let Y=0;Y<z;Y++){const ne=Y*B-te;for(let ie=0;ie<O;ie++){const $=ie*T-H;X[y]=$*v,X[m]=ne*x,X[p]=R,c.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[p]=A>0?1:-1,d.push(X.x,X.y,X.z),h.push(ie/w),h.push(1-Y/G),q+=1}}for(let Y=0;Y<G;Y++)for(let ne=0;ne<w;ne++){const ie=f+ne+O*Y,$=f+ne+O*(Y+1),j=f+(ne+1)+O*(Y+1),ce=f+(ne+1)+O*Y;l.push(ie,$,ce),l.push($,j,ce),W+=6}a.addGroup(u,W,S),u+=W,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ji(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Ji(i[t]);for(const s in n)e[s]=n[s]}return e}function ih(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Wl(i){return i.getRenderTarget()===null?i.outputColorSpace:et.workingColorSpace}const sh={clone:Ji,merge:zt};var rh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ah=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gi extends fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rh,this.fragmentShader=ah,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Xl extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=In}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class un extends Xl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ca*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ca*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Li=-90,Di=1;class oh extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(Li,Di,e,t);s.layers=this.layers,this.add(s);const r=new un(Li,Di,e,t);r.layers=this.layers,this.add(r);const o=new un(Li,Di,e,t);o.layers=this.layers,this.add(o);const a=new un(Li,Di,e,t);a.layers=this.layers,this.add(a);const l=new un(Li,Di,e,t);l.layers=this.layers,this.add(l);const c=new un(Li,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(h,f,u),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ql extends Vt{constructor(e,t,n,s,r,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:ji,super(e,t,n,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lh extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(hs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===pi?Ct:an),this.texture=new ql(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:rn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new _s(5,5,5),r=new gi({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:qn});r.uniforms.tEquirect.value=t;const o=new Ye(s,r),a=t.minFilter;return t.minFilter===fs&&(t.minFilter=rn),new oh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Vr=new D,ch=new D,dh=new Ge;class ii{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Vr.subVectors(n,t).cross(ch.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dh.getNormalMatrix(e),s=this.coplanarPoint(Vr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new ur,zs=new D;class Yl{constructor(e=new ii,t=new ii,n=new ii,s=new ii,r=new ii,o=new ii){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],h=s[6],f=s[7],u=s[8],g=s[9],y=s[10],m=s[11],p=s[12],v=s[13],x=s[14],M=s[15];if(n[0].setComponents(l-r,f-c,m-u,M-p).normalize(),n[1].setComponents(l+r,f+c,m+u,M+p).normalize(),n[2].setComponents(l+o,f+d,m+g,M+v).normalize(),n[3].setComponents(l-o,f-d,m-g,M-v).normalize(),n[4].setComponents(l-a,f-h,m-y,M-x).normalize(),t===In)n[5].setComponents(l+a,f+h,m+y,M+x).normalize();else if(t===rr)n[5].setComponents(a,h,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(zs.x=s.normal.x>0?e.max.x:e.min.x,zs.y=s.normal.y>0?e.max.y:e.min.y,zs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jl(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function uh(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,d){const h=c.array,f=c.usage,u=h.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,h,f),c.onUploadCallback();let y;if(h instanceof Float32Array)y=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)y=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=i.SHORT;else if(h instanceof Uint32Array)y=i.UNSIGNED_INT;else if(h instanceof Int32Array)y=i.INT;else if(h instanceof Int8Array)y=i.BYTE;else if(h instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:u}}function r(c,d,h){const f=d.array,u=d._updateRange,g=d.updateRanges;if(i.bindBuffer(h,c),u.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let y=0,m=g.length;y<m;y++){const p=g[y];t?i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}u.count!==-1&&(t?i.bufferSubData(h,u.offset*f.BYTES_PER_ELEMENT,f,u.offset,u.count):i.bufferSubData(h,u.offset*f.BYTES_PER_ELEMENT,f.subarray(u.offset,u.offset+u.count)),u.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,s(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,d),h.version=c.version}}return{get:o,remove:a,update:l}}class tt extends Mn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,d=l+1,h=e/a,f=t/l,u=[],g=[],y=[],m=[];for(let p=0;p<d;p++){const v=p*f-o;for(let x=0;x<c;x++){const M=x*h-r;g.push(M,-v,0),y.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const x=v+c*p,M=v+c*(p+1),P=v+1+c*(p+1),A=v+1+c*p;u.push(x,M,A),u.push(M,P,A)}this.setIndex(u),this.setAttribute("position",new pn(g,3)),this.setAttribute("normal",new pn(y,3)),this.setAttribute("uv",new pn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tt(e.width,e.height,e.widthSegments,e.heightSegments)}}var hh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fh=`#ifdef USE_ALPHAHASH
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
#endif`,ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,yh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xh=`#ifdef USE_AOMAP
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
#endif`,_h=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vh=`#ifdef USE_BATCHING
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
#endif`,Sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Th=`#ifdef USE_IRIDESCENCE
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
#endif`,Ah=`#ifdef USE_BUMPMAP
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
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ih=`#define PI 3.141592653589793
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
} // validated`,Nh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Oh=`vec3 transformedNormal = objectNormal;
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
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$h=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gh=`
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
}`,Vh=`#ifdef USE_ENVMAP
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
#endif`,Wh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xh=`#ifdef USE_ENVMAP
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
#endif`,qh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yh=`#ifdef USE_ENVMAP
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
#endif`,jh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qh=`#ifdef USE_GRADIENTMAP
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
}`,ef=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rf=`uniform bool receiveShadow;
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
#endif`,af=`#ifdef USE_ENVMAP
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
#endif`,of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
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
#endif`,hf=`struct PhysicalMaterial {
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
}`,ff=`
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
#endif`,pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,_f=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mf=`#if defined( USE_POINTS_UV )
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
#endif`,bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wf=`#ifdef USE_MORPHNORMALS
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
#endif`,Cf=`#ifdef USE_MORPHTARGETS
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
#endif`,Rf=`#ifdef USE_MORPHTARGETS
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
#endif`,Pf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,If=`#ifdef USE_NORMALMAP
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
#endif`,Nf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zf=`float getShadowMask() {
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
}`,Jf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qf=`#ifdef USE_SKINNING
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
#endif`,ep=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tp=`#ifdef USE_SKINNING
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
#endif`,np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ap=`#ifdef USE_TRANSMISSION
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
#endif`,op=`#ifdef USE_TRANSMISSION
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
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fp=`uniform sampler2D t2D;
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
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`#include <common>
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
}`,_p=`#if DEPTH_PACKING == 3200
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
}`,vp=`#define DISTANCE
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
}`,Sp=`#define DISTANCE
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`uniform float scale;
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
}`,Tp=`uniform vec3 diffuse;
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
}`,Ap=`#include <common>
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
}`,wp=`uniform vec3 diffuse;
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
}`,Cp=`#define LAMBERT
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
}`,Rp=`#define LAMBERT
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
}`,Pp=`#define MATCAP
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
}`,Lp=`#define MATCAP
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
}`,Dp=`#define NORMAL
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
}`,Up=`#define NORMAL
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
}`,kp=`#define PHONG
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
}`,Ip=`#define PHONG
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
}`,Np=`#define STANDARD
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
}`,Op=`#define STANDARD
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
}`,Fp=`#define TOON
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
}`,Bp=`#define TOON
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
}`,$p=`uniform float size;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,zp=`#include <common>
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
}`,Gp=`uniform vec3 color;
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
}`,Vp=`uniform float rotation;
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
}`,Wp=`uniform vec3 diffuse;
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
}`,Ie={alphahash_fragment:hh,alphahash_pars_fragment:fh,alphamap_fragment:ph,alphamap_pars_fragment:mh,alphatest_fragment:gh,alphatest_pars_fragment:yh,aomap_fragment:xh,aomap_pars_fragment:_h,batching_pars_vertex:vh,batching_vertex:Sh,begin_vertex:Eh,beginnormal_vertex:Mh,bsdfs:bh,iridescence_fragment:Th,bumpmap_pars_fragment:Ah,clipping_planes_fragment:wh,clipping_planes_pars_fragment:Ch,clipping_planes_pars_vertex:Rh,clipping_planes_vertex:Ph,color_fragment:Lh,color_pars_fragment:Dh,color_pars_vertex:Uh,color_vertex:kh,common:Ih,cube_uv_reflection_fragment:Nh,defaultnormal_vertex:Oh,displacementmap_pars_vertex:Fh,displacementmap_vertex:Bh,emissivemap_fragment:$h,emissivemap_pars_fragment:Hh,colorspace_fragment:zh,colorspace_pars_fragment:Gh,envmap_fragment:Vh,envmap_common_pars_fragment:Wh,envmap_pars_fragment:Xh,envmap_pars_vertex:qh,envmap_physical_pars_fragment:af,envmap_vertex:Yh,fog_vertex:jh,fog_pars_vertex:Kh,fog_fragment:Zh,fog_pars_fragment:Jh,gradientmap_pars_fragment:Qh,lightmap_fragment:ef,lightmap_pars_fragment:tf,lights_lambert_fragment:nf,lights_lambert_pars_fragment:sf,lights_pars_begin:rf,lights_toon_fragment:of,lights_toon_pars_fragment:lf,lights_phong_fragment:cf,lights_phong_pars_fragment:df,lights_physical_fragment:uf,lights_physical_pars_fragment:hf,lights_fragment_begin:ff,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:yf,logdepthbuf_pars_vertex:xf,logdepthbuf_vertex:_f,map_fragment:vf,map_pars_fragment:Sf,map_particle_fragment:Ef,map_particle_pars_fragment:Mf,metalnessmap_fragment:bf,metalnessmap_pars_fragment:Tf,morphcolor_vertex:Af,morphnormal_vertex:wf,morphtarget_pars_vertex:Cf,morphtarget_vertex:Rf,normal_fragment_begin:Pf,normal_fragment_maps:Lf,normal_pars_fragment:Df,normal_pars_vertex:Uf,normal_vertex:kf,normalmap_pars_fragment:If,clearcoat_normal_fragment_begin:Nf,clearcoat_normal_fragment_maps:Of,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Bf,opaque_fragment:$f,packing:Hf,premultiplied_alpha_fragment:zf,project_vertex:Gf,dithering_fragment:Vf,dithering_pars_fragment:Wf,roughnessmap_fragment:Xf,roughnessmap_pars_fragment:qf,shadowmap_pars_fragment:Yf,shadowmap_pars_vertex:jf,shadowmap_vertex:Kf,shadowmask_pars_fragment:Zf,skinbase_vertex:Jf,skinning_pars_vertex:Qf,skinning_vertex:ep,skinnormal_vertex:tp,specularmap_fragment:np,specularmap_pars_fragment:ip,tonemapping_fragment:sp,tonemapping_pars_fragment:rp,transmission_fragment:ap,transmission_pars_fragment:op,uv_pars_fragment:lp,uv_pars_vertex:cp,uv_vertex:dp,worldpos_vertex:up,background_vert:hp,background_frag:fp,backgroundCube_vert:pp,backgroundCube_frag:mp,cube_vert:gp,cube_frag:yp,depth_vert:xp,depth_frag:_p,distanceRGBA_vert:vp,distanceRGBA_frag:Sp,equirect_vert:Ep,equirect_frag:Mp,linedashed_vert:bp,linedashed_frag:Tp,meshbasic_vert:Ap,meshbasic_frag:wp,meshlambert_vert:Cp,meshlambert_frag:Rp,meshmatcap_vert:Pp,meshmatcap_frag:Lp,meshnormal_vert:Dp,meshnormal_frag:Up,meshphong_vert:kp,meshphong_frag:Ip,meshphysical_vert:Np,meshphysical_frag:Op,meshtoon_vert:Fp,meshtoon_frag:Bp,points_vert:$p,points_frag:Hp,shadow_vert:zp,shadow_frag:Gp,sprite_vert:Vp,sprite_frag:Wp},re={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},vn={basic:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:zt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:zt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:zt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:zt([re.points,re.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:zt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:zt([re.common,re.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:zt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:zt([re.sprite,re.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:zt([re.common,re.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:zt([re.lights,re.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};vn.physical={uniforms:zt([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const Gs={r:0,b:0,g:0};function Xp(i,e,t,n,s,r,o){const a=new Ze(0);let l=r===!0?0:1,c,d,h=null,f=0,u=null;function g(m,p){let v=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?y(a,l):x&&x.isColor&&(y(x,1),v=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===cr)?(d===void 0&&(d=new Ye(new _s(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:Ji(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=et.getTransfer(x.colorSpace)!==dt,(h!==x||f!==x.version||u!==i.toneMapping)&&(d.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ye(new tt(2,2),new gi({name:"BackgroundMaterial",uniforms:Ji(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=et.getTransfer(x.colorSpace)!==dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function y(m,p){m.getRGB(Gs,Wl(i)),n.buffers.color.setClear(Gs.r,Gs.g,Gs.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,y(a,l)},render:g}}function qp(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=m(null);let c=l,d=!1;function h(R,O,z,q,W){let X=!1;if(o){const Y=y(q,z,O);c!==Y&&(c=Y,u(c.object)),X=p(R,q,z,W),X&&v(R,q,z,W)}else{const Y=O.wireframe===!0;(c.geometry!==q.id||c.program!==z.id||c.wireframe!==Y)&&(c.geometry=q.id,c.program=z.id,c.wireframe=Y,X=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(X||d)&&(d=!1,G(R,O,z,q),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function u(R){return n.isWebGL2?i.bindVertexArray(R):r.bindVertexArrayOES(R)}function g(R){return n.isWebGL2?i.deleteVertexArray(R):r.deleteVertexArrayOES(R)}function y(R,O,z){const q=z.wireframe===!0;let W=a[R.id];W===void 0&&(W={},a[R.id]=W);let X=W[O.id];X===void 0&&(X={},W[O.id]=X);let Y=X[q];return Y===void 0&&(Y=m(f()),X[q]=Y),Y}function m(R){const O=[],z=[],q=[];for(let W=0;W<s;W++)O[W]=0,z[W]=0,q[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:z,attributeDivisors:q,object:R,attributes:{},index:null}}function p(R,O,z,q){const W=c.attributes,X=O.attributes;let Y=0;const ne=z.getAttributes();for(const ie in ne)if(ne[ie].location>=0){const j=W[ie];let ce=X[ie];if(ce===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),j===void 0||j.attribute!==ce||ce&&j.data!==ce.data)return!0;Y++}return c.attributesNum!==Y||c.index!==q}function v(R,O,z,q){const W={},X=O.attributes;let Y=0;const ne=z.getAttributes();for(const ie in ne)if(ne[ie].location>=0){let j=X[ie];j===void 0&&(ie==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),ie==="instanceColor"&&R.instanceColor&&(j=R.instanceColor));const ce={};ce.attribute=j,j&&j.data&&(ce.data=j.data),W[ie]=ce,Y++}c.attributes=W,c.attributesNum=Y,c.index=q}function x(){const R=c.newAttributes;for(let O=0,z=R.length;O<z;O++)R[O]=0}function M(R){P(R,0)}function P(R,O){const z=c.newAttributes,q=c.enabledAttributes,W=c.attributeDivisors;z[R]=1,q[R]===0&&(i.enableVertexAttribArray(R),q[R]=1),W[R]!==O&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,O),W[R]=O)}function A(){const R=c.newAttributes,O=c.enabledAttributes;for(let z=0,q=O.length;z<q;z++)O[z]!==R[z]&&(i.disableVertexAttribArray(z),O[z]=0)}function w(R,O,z,q,W,X,Y){Y===!0?i.vertexAttribIPointer(R,O,z,W,X):i.vertexAttribPointer(R,O,z,q,W,X)}function G(R,O,z,q){if(n.isWebGL2===!1&&(R.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=q.attributes,X=z.getAttributes(),Y=O.defaultAttributeValues;for(const ne in X){const ie=X[ne];if(ie.location>=0){let $=W[ne];if($===void 0&&(ne==="instanceMatrix"&&R.instanceMatrix&&($=R.instanceMatrix),ne==="instanceColor"&&R.instanceColor&&($=R.instanceColor)),$!==void 0){const j=$.normalized,ce=$.itemSize,_e=t.get($);if(_e===void 0)continue;const xe=_e.buffer,Le=_e.type,Ue=_e.bytesPerElement,Te=n.isWebGL2===!0&&(Le===i.INT||Le===i.UNSIGNED_INT||$.gpuType===wl);if($.isInterleavedBufferAttribute){const Xe=$.data,U=Xe.stride,Ft=$.offset;if(Xe.isInstancedInterleavedBuffer){for(let Se=0;Se<ie.locationSize;Se++)P(ie.location+Se,Xe.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Se=0;Se<ie.locationSize;Se++)M(ie.location+Se);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Se=0;Se<ie.locationSize;Se++)w(ie.location+Se,ce/ie.locationSize,Le,j,U*Ue,(Ft+ce/ie.locationSize*Se)*Ue,Te)}else{if($.isInstancedBufferAttribute){for(let Xe=0;Xe<ie.locationSize;Xe++)P(ie.location+Xe,$.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Xe=0;Xe<ie.locationSize;Xe++)M(ie.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Xe=0;Xe<ie.locationSize;Xe++)w(ie.location+Xe,ce/ie.locationSize,Le,j,ce*Ue,ce/ie.locationSize*Xe*Ue,Te)}}else if(Y!==void 0){const j=Y[ne];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(ie.location,j);break;case 3:i.vertexAttrib3fv(ie.location,j);break;case 4:i.vertexAttrib4fv(ie.location,j);break;default:i.vertexAttrib1fv(ie.location,j)}}}}A()}function S(){H();for(const R in a){const O=a[R];for(const z in O){const q=O[z];for(const W in q)g(q[W].object),delete q[W];delete O[z]}delete a[R]}}function T(R){if(a[R.id]===void 0)return;const O=a[R.id];for(const z in O){const q=O[z];for(const W in q)g(q[W].object),delete q[W];delete O[z]}delete a[R.id]}function B(R){for(const O in a){const z=a[O];if(z[R.id]===void 0)continue;const q=z[R.id];for(const W in q)g(q[W].object),delete q[W];delete z[R.id]}}function H(){te(),d=!0,c!==l&&(c=l,u(c.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:H,resetDefaultState:te,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:M,disableUnusedAttributes:A}}function Yp(i,e,t,n){const s=n.isWebGL2;let r;function o(d){r=d}function a(d,h){i.drawArrays(r,d,h),t.update(h,r,1)}function l(d,h,f){if(f===0)return;let u,g;if(s)u=i,g="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[g](r,d,h,f),t.update(h,r,f)}function c(d,h,f){if(f===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<f;g++)this.render(d[g],h[g]);else{u.multiDrawArraysWEBGL(r,d,0,h,0,f);let g=0;for(let y=0;y<f;y++)g+=h[y];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function jp(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),y=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,M=o||e.has("OES_texture_float"),P=x&&M,A=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:u,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:P,maxSamples:A}}function Kp(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ii,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const u=h.length!==0||f||n!==0||s;return s=f,n=h.length,u},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,u){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const v=r?0:n,x=v*4;let M=p.clippingState||null;l.value=M,M=d(g,f,x,u);for(let P=0;P!==x;++P)M[P]=t[P];p.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,f,u,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=u+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,M=u;x!==y;++x,M+=4)o.copy(h[x]).applyMatrix4(v,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function Zp(i){let e=new WeakMap;function t(o,a){return a===sa?o.mapping=ji:a===ra&&(o.mapping=Ki),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===sa||a===ra)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new lh(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Kl extends Xl{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $i=4,Ho=[.125,.215,.35,.446,.526,.582],di=20,Wr=new Kl,zo=new Ze;let Xr=null,qr=0,Yr=0;const si=(1+Math.sqrt(5))/2,Ui=1/si,Go=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,si,Ui),new D(0,si,-Ui),new D(Ui,0,si),new D(-Ui,0,si),new D(si,Ui,0),new D(-si,Ui,0)];class Vo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Xr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Xr,qr,Yr),e.scissorTest=!1,Vs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ji||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:ps,format:hn,colorSpace:On,depthBuffer:!1},s=Wo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wo(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jp(r)),this._blurMaterial=Qp(r,e,t)}return s}_compileMaterial(e){const t=new Ye(this._lodPlanes[0],e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,n,s){const a=new un(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(zo),d.toneMapping=Yn,d.autoClear=!1;const u=new nt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),g=new Ye(new _s,u);let y=!1;const m=e.background;m?m.isColor&&(u.color.copy(m),e.background=null,y=!0):(u.color.copy(zo),y=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;Vs(s,v*x,p>2?x:0,x,x),d.setRenderTarget(s),y&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ji||e.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xo());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ye(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Vs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Wr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Go[(s-1)%Go.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Ye(this._lodPlanes[s],c),f=c.uniforms,u=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*di-1),y=r/g,m=isFinite(r)?1+Math.floor(d*y):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const p=[];let v=0;for(let w=0;w<di;++w){const G=w/y,S=Math.exp(-G*G/2);p.push(S),w===0?v+=S:w<m&&(v+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const M=this._sizeLods[s],P=3*M*(s>x-$i?s-x+$i:0),A=4*(this._cubeSize-M);Vs(t,P,A,3*M,2*M),l.setRenderTarget(t),l.render(h,Wr)}}function Jp(i){const e=[],t=[],n=[];let s=i;const r=i-$i+1+Ho.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>i-$i?l=Ho[o-i+$i-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],u=6,g=6,y=3,m=2,p=1,v=new Float32Array(y*g*u),x=new Float32Array(m*g*u),M=new Float32Array(p*g*u);for(let A=0;A<u;A++){const w=A%3*2/3-1,G=A>2?0:-1,S=[w,G,0,w+2/3,G,0,w+2/3,G+1,0,w,G,0,w+2/3,G+1,0,w,G+1,0];v.set(S,y*g*A),x.set(f,m*g*A);const T=[A,A,A,A,A,A];M.set(T,p*g*A)}const P=new Mn;P.setAttribute("position",new Sn(v,y)),P.setAttribute("uv",new Sn(x,m)),P.setAttribute("faceIndex",new Sn(M,p)),e.push(P),s>$i&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wo(i,e,t){const n=new mi(i,e,t);return n.texture.mapping=cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Qp(i,e,t){const n=new Float32Array(di),s=new D(0,1,0);return new gi({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ea(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Xo(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ea(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function qo(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ea(){return`

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
	`}function em(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===sa||l===ra,d=l===ji||l===Ki;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Vo(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||d&&h&&s(h)){t===null&&(t=new Vo(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function tm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function nm(i,e,t,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete s[f.id];const u=r.get(f);u&&(e.remove(u),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const u=h.morphAttributes;for(const g in u){const y=u[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],i.ARRAY_BUFFER)}}function c(h){const f=[],u=h.index,g=h.attributes.position;let y=0;if(u!==null){const v=u.array;y=u.version;for(let x=0,M=v.length;x<M;x+=3){const P=v[x+0],A=v[x+1],w=v[x+2];f.push(P,A,A,w,w,P)}}else if(g!==void 0){const v=g.array;y=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){const P=x+0,A=x+1,w=x+2;f.push(P,A,A,w,w,P)}}else return;const m=new(Nl(f)?Vl:Gl)(f,1);m.version=y;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function d(h){const f=r.get(h);if(f){const u=h.index;u!==null&&f.version<u.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function im(i,e,t,n){const s=n.isWebGL2;let r;function o(u){r=u}let a,l;function c(u){a=u.type,l=u.bytesPerElement}function d(u,g){i.drawElements(r,g,a,u*l),t.update(g,r,1)}function h(u,g,y){if(y===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,u*l,y),t.update(g,r,y)}function f(u,g,y){if(y===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<y;p++)this.render(u[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,u,0,y);let p=0;for(let v=0;v<y;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=f}function sm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function rm(i,e){return i[0]-e[0]}function am(i,e){return Math.abs(e[1])-Math.abs(i[1])}function om(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new Rt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=g!==void 0?g.length:0;let m=r.get(d);if(m===void 0||m.count!==y){let O=function(){te.dispose(),r.delete(d),d.removeEventListener("dispose",O)};var u=O;m!==void 0&&m.texture.dispose();const x=d.morphAttributes.position!==void 0,M=d.morphAttributes.normal!==void 0,P=d.morphAttributes.color!==void 0,A=d.morphAttributes.position||[],w=d.morphAttributes.normal||[],G=d.morphAttributes.color||[];let S=0;x===!0&&(S=1),M===!0&&(S=2),P===!0&&(S=3);let T=d.attributes.position.count*S,B=1;T>e.maxTextureSize&&(B=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const H=new Float32Array(T*B*4*y),te=new Bl(H,T,B,y);te.type=Xn,te.needsUpdate=!0;const R=S*4;for(let z=0;z<y;z++){const q=A[z],W=w[z],X=G[z],Y=T*B*4*z;for(let ne=0;ne<q.count;ne++){const ie=ne*R;x===!0&&(o.fromBufferAttribute(q,ne),H[Y+ie+0]=o.x,H[Y+ie+1]=o.y,H[Y+ie+2]=o.z,H[Y+ie+3]=0),M===!0&&(o.fromBufferAttribute(W,ne),H[Y+ie+4]=o.x,H[Y+ie+5]=o.y,H[Y+ie+6]=o.z,H[Y+ie+7]=0),P===!0&&(o.fromBufferAttribute(X,ne),H[Y+ie+8]=o.x,H[Y+ie+9]=o.y,H[Y+ie+10]=o.z,H[Y+ie+11]=X.itemSize===4?o.w:1)}}m={count:y,texture:te,size:new it(T,B)},r.set(d,m),d.addEventListener("dispose",O)}let p=0;for(let x=0;x<f.length;x++)p+=f[x];const v=d.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",v),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let y=n[d.id];if(y===void 0||y.length!==g){y=[];for(let M=0;M<g;M++)y[M]=[M,0];n[d.id]=y}for(let M=0;M<g;M++){const P=y[M];P[0]=M,P[1]=f[M]}y.sort(am);for(let M=0;M<8;M++)M<g&&y[M][1]?(a[M][0]=y[M][0],a[M][1]=y[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(rm);const m=d.morphAttributes.position,p=d.morphAttributes.normal;let v=0;for(let M=0;M<8;M++){const P=a[M],A=P[0],w=P[1];A!==Number.MAX_SAFE_INTEGER&&w?(m&&d.getAttribute("morphTarget"+M)!==m[A]&&d.setAttribute("morphTarget"+M,m[A]),p&&d.getAttribute("morphNormal"+M)!==p[A]&&d.setAttribute("morphNormal"+M,p[A]),s[M]=w,v+=w):(m&&d.hasAttribute("morphTarget"+M)===!0&&d.deleteAttribute("morphTarget"+M),p&&d.hasAttribute("morphNormal"+M)===!0&&d.deleteAttribute("morphNormal"+M),s[M]=0)}const x=d.morphTargetsRelative?1:1-v;h.getUniforms().setValue(i,"morphTargetBaseInfluence",x),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function lm(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Zl extends Vt{constructor(e,t,n,s,r,o,a,l,c,d){if(d=d!==void 0?d:fi,d!==fi&&d!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===fi&&(n=Wn),n===void 0&&d===Zi&&(n=hi),super(null,s,r,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jl=new Vt,Ql=new Zl(1,1);Ql.compareFunction=Il;const ec=new Bl,tc=new Wu,nc=new ql,Yo=[],jo=[],Ko=new Float32Array(16),Zo=new Float32Array(9),Jo=new Float32Array(4);function es(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Yo[s];if(r===void 0&&(r=new Float32Array(s),Yo[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fr(i,e){let t=jo[e];t===void 0&&(t=new Int32Array(e),jo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function cm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function fm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Jo.set(n),i.uniformMatrix2fv(this.addr,!1,Jo),Et(t,n)}}function pm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Zo.set(n),i.uniformMatrix3fv(this.addr,!1,Zo),Et(t,n)}}function mm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Ko.set(n),i.uniformMatrix4fv(this.addr,!1,Ko),Et(t,n)}}function gm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function vm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function bm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Ql:Jl;t.setTexture2D(e||r,s)}function Tm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||tc,s)}function Am(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||nc,s)}function wm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ec,s)}function Cm(i){switch(i){case 5126:return cm;case 35664:return dm;case 35665:return um;case 35666:return hm;case 35674:return fm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return ym;case 35668:case 35672:return xm;case 35669:case 35673:return _m;case 5125:return vm;case 36294:return Sm;case 36295:return Em;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return wm}}function Rm(i,e){i.uniform1fv(this.addr,e)}function Pm(i,e){const t=es(e,this.size,2);i.uniform2fv(this.addr,t)}function Lm(i,e){const t=es(e,this.size,3);i.uniform3fv(this.addr,t)}function Dm(i,e){const t=es(e,this.size,4);i.uniform4fv(this.addr,t)}function Um(i,e){const t=es(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function km(i,e){const t=es(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Im(i,e){const t=es(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Nm(i,e){i.uniform1iv(this.addr,e)}function Om(i,e){i.uniform2iv(this.addr,e)}function Fm(i,e){i.uniform3iv(this.addr,e)}function Bm(i,e){i.uniform4iv(this.addr,e)}function $m(i,e){i.uniform1uiv(this.addr,e)}function Hm(i,e){i.uniform2uiv(this.addr,e)}function zm(i,e){i.uniform3uiv(this.addr,e)}function Gm(i,e){i.uniform4uiv(this.addr,e)}function Vm(i,e,t){const n=this.cache,s=e.length,r=fr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Jl,r[o])}function Wm(i,e,t){const n=this.cache,s=e.length,r=fr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||tc,r[o])}function Xm(i,e,t){const n=this.cache,s=e.length,r=fr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||nc,r[o])}function qm(i,e,t){const n=this.cache,s=e.length,r=fr(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ec,r[o])}function Ym(i){switch(i){case 5126:return Rm;case 35664:return Pm;case 35665:return Lm;case 35666:return Dm;case 35674:return Um;case 35675:return km;case 35676:return Im;case 5124:case 35670:return Nm;case 35667:case 35671:return Om;case 35668:case 35672:return Fm;case 35669:case 35673:return Bm;case 5125:return $m;case 36294:return Hm;case 36295:return zm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return Xm;case 36289:case 36303:case 36311:case 36292:return qm}}class jm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cm(t.type)}}class Km{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ym(t.type)}}class Zm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const jr=/(\w+)(\])?(\[|\.)?/g;function Qo(i,e){i.seq.push(e),i.map[e.id]=e}function Jm(i,e,t){const n=i.name,s=n.length;for(jr.lastIndex=0;;){const r=jr.exec(n),o=jr.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Qo(t,c===void 0?new jm(a,i,e):new Km(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Zm(a),Qo(t,h)),t=h}}}class qs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Jm(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function el(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qm=37297;let eg=0;function tg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function ng(i){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i);let n;switch(e===t?n="":e===sr&&t===ir?n="LinearDisplayP3ToLinearSRGB":e===ir&&t===sr&&(n="LinearSRGBToLinearDisplayP3"),i){case On:case dr:return[n,"LinearTransferOETF"];case Ct:case Sa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function tl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+tg(i.getShaderSource(e),o)}else return s}function ig(i,e){const t=ng(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function sg(i,e){let t;switch(e){case fu:t="Linear";break;case pu:t="Reinhard";break;case mu:t="OptimizedCineon";break;case gu:t="ACESFilmic";break;case xu:t="AgX";break;case yu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function rg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Hi).join(`
`)}function ag(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Hi).join(`
`)}function og(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Hi(i){return i!==""}function nl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function il(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ua(i){return i.replace(cg,ug)}const dg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ug(i,e){let t=Ie[e];if(t===void 0){const n=dg.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ua(t)}const hg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sl(i){return i.replace(hg,fg)}function fg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rl(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===bl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(e="SHADOWMAP_TYPE_VSM"),e}function mg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ji:case Ki:e="ENVMAP_TYPE_CUBE";break;case cr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ki:e="ENVMAP_MODE_REFRACTION";break}return e}function yg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Tl:e="ENVMAP_BLENDING_MULTIPLY";break;case uu:e="ENVMAP_BLENDING_MIX";break;case hu:e="ENVMAP_BLENDING_ADD";break}return e}function xg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function _g(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=pg(t),c=mg(t),d=gg(t),h=yg(t),f=xg(t),u=t.isWebGL2?"":rg(t),g=ag(t),y=og(r),m=s.createProgram();let p,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Hi).join(`
`),p.length>0&&(p+=`
`),v=[u,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Hi).join(`
`),v.length>0&&(v+=`
`)):(p=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),v=[u,rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Yn?sg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,ig("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hi).join(`
`)),o=ua(o),o=nl(o,t),o=il(o,t),a=ua(a),a=nl(a,t),a=il(a,t),o=sl(o),a=sl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=x+p+o,P=x+v+a,A=el(s,s.VERTEX_SHADER,M),w=el(s,s.FRAGMENT_SHADER,P);s.attachShader(m,A),s.attachShader(m,w),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function G(H){if(i.debug.checkShaderErrors){const te=s.getProgramInfoLog(m).trim(),R=s.getShaderInfoLog(A).trim(),O=s.getShaderInfoLog(w).trim();let z=!0,q=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,A,w);else{const W=tl(s,A,"vertex"),X=tl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+W+`
`+X)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(R===""||O==="")&&(q=!1);q&&(H.diagnostics={runnable:z,programLog:te,vertexShader:{log:R,prefix:p},fragmentShader:{log:O,prefix:v}})}s.deleteShader(A),s.deleteShader(w),S=new qs(s,m),T=lg(s,m)}let S;this.getUniforms=function(){return S===void 0&&G(this),S};let T;this.getAttributes=function(){return T===void 0&&G(this),T};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(m,Qm)),B},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=w,this}let vg=0;class Sg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Eg(e),t.set(e,n)),n}}class Eg{constructor(e){this.id=vg++,this.code=e,this.usedTimes=0}}function Mg(i,e,t,n,s,r,o){const a=new Hl,l=new Sg,c=[],d=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let u=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return S===0?"uv":`uv${S}`}function m(S,T,B,H,te){const R=H.fog,O=te.geometry,z=S.isMeshStandardMaterial?H.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||z),W=q&&q.mapping===cr?q.image.height:null,X=g[S.type];S.precision!==null&&(u=s.getMaxPrecision(S.precision),u!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",u,"instead."));const Y=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ne=Y!==void 0?Y.length:0;let ie=0;O.morphAttributes.position!==void 0&&(ie=1),O.morphAttributes.normal!==void 0&&(ie=2),O.morphAttributes.color!==void 0&&(ie=3);let $,j,ce,_e;if(X){const Bt=vn[X];$=Bt.vertexShader,j=Bt.fragmentShader}else $=S.vertexShader,j=S.fragmentShader,l.update(S),ce=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const xe=i.getRenderTarget(),Le=te.isInstancedMesh===!0,Ue=te.isBatchedMesh===!0,Te=!!S.map,Xe=!!S.matcap,U=!!q,Ft=!!S.aoMap,Se=!!S.lightMap,Re=!!S.bumpMap,pe=!!S.normalMap,ut=!!S.displacementMap,Ne=!!S.emissiveMap,b=!!S.metalnessMap,_=!!S.roughnessMap,I=S.anisotropy>0,J=S.clearcoat>0,Z=S.iridescence>0,ee=S.sheen>0,me=S.transmission>0,le=I&&!!S.anisotropyMap,he=J&&!!S.clearcoatMap,be=J&&!!S.clearcoatNormalMap,Oe=J&&!!S.clearcoatRoughnessMap,K=Z&&!!S.iridescenceMap,Qe=Z&&!!S.iridescenceThicknessMap,Ve=ee&&!!S.sheenColorMap,Ce=ee&&!!S.sheenRoughnessMap,ve=!!S.specularMap,fe=!!S.specularColorMap,ke=!!S.specularIntensityMap,Je=me&&!!S.transmissionMap,pt=me&&!!S.thicknessMap,$e=!!S.gradientMap,se=!!S.alphaMap,C=S.alphaTest>0,ae=!!S.alphaHash,oe=!!S.extensions,Ae=!!O.attributes.uv1,Ee=!!O.attributes.uv2,st=!!O.attributes.uv3;let rt=Yn;return S.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(rt=i.toneMapping),{isWebGL2:d,shaderID:X,shaderType:S.type,shaderName:S.name,vertexShader:$,fragmentShader:j,defines:S.defines,customVertexShaderID:ce,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:u,batching:Ue,instancing:Le,instancingColor:Le&&te.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:On,map:Te,matcap:Xe,envMap:U,envMapMode:U&&q.mapping,envMapCubeUVHeight:W,aoMap:Ft,lightMap:Se,bumpMap:Re,normalMap:pe,displacementMap:f&&ut,emissiveMap:Ne,normalMapObjectSpace:pe&&S.normalMapType===Lu,normalMapTangentSpace:pe&&S.normalMapType===Pu,metalnessMap:b,roughnessMap:_,anisotropy:I,anisotropyMap:le,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:be,clearcoatRoughnessMap:Oe,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:Qe,sheen:ee,sheenColorMap:Ve,sheenRoughnessMap:Ce,specularMap:ve,specularColorMap:fe,specularIntensityMap:ke,transmission:me,transmissionMap:Je,thicknessMap:pt,gradientMap:$e,opaque:S.transparent===!1&&S.blending===Gi,alphaMap:se,alphaTest:C,alphaHash:ae,combine:S.combine,mapUv:Te&&y(S.map.channel),aoMapUv:Ft&&y(S.aoMap.channel),lightMapUv:Se&&y(S.lightMap.channel),bumpMapUv:Re&&y(S.bumpMap.channel),normalMapUv:pe&&y(S.normalMap.channel),displacementMapUv:ut&&y(S.displacementMap.channel),emissiveMapUv:Ne&&y(S.emissiveMap.channel),metalnessMapUv:b&&y(S.metalnessMap.channel),roughnessMapUv:_&&y(S.roughnessMap.channel),anisotropyMapUv:le&&y(S.anisotropyMap.channel),clearcoatMapUv:he&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:be&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&y(S.sheenRoughnessMap.channel),specularMapUv:ve&&y(S.specularMap.channel),specularColorMapUv:fe&&y(S.specularColorMap.channel),specularIntensityMapUv:ke&&y(S.specularIntensityMap.channel),transmissionMapUv:Je&&y(S.transmissionMap.channel),thicknessMapUv:pt&&y(S.thicknessMap.channel),alphaMapUv:se&&y(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(pe||I),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Ae,vertexUv2s:Ee,vertexUv3s:st,pointsUvs:te.isPoints===!0&&!!O.attributes.uv&&(Te||se),fog:!!R,useFog:S.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:te.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:rt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===dt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Un,flipSided:S.side===qt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:oe&&S.extensions.derivatives===!0,extensionFragDepth:oe&&S.extensions.fragDepth===!0,extensionDrawBuffers:oe&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const B in S.defines)T.push(B),T.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(v(T,S),x(T,S),T.push(i.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function v(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function x(S,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),S.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function M(S){const T=g[S.type];let B;if(T){const H=vn[T];B=sh.clone(H.uniforms)}else B=S.uniforms;return B}function P(S,T){let B;for(let H=0,te=c.length;H<te;H++){const R=c[H];if(R.cacheKey===T){B=R,++B.usedTimes;break}}return B===void 0&&(B=new _g(i,T,S,r),c.push(B)),B}function A(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),S.destroy()}}function w(S){l.remove(S)}function G(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:P,releaseProgram:A,releaseShaderCache:w,programs:c,dispose:G}}function bg(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Tg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function al(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ol(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h,f,u,g,y,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:u,groupOrder:g,renderOrder:h.renderOrder,z:y,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=u,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=y,p.group=m),e++,p}function a(h,f,u,g,y,m){const p=o(h,f,u,g,y,m);u.transmission>0?n.push(p):u.transparent===!0?s.push(p):t.push(p)}function l(h,f,u,g,y,m){const p=o(h,f,u,g,y,m);u.transmission>0?n.unshift(p):u.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||Tg),n.length>1&&n.sort(f||al),s.length>1&&s.sort(f||al)}function d(){for(let h=e,f=i.length;h<f;h++){const u=i[h];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function Ag(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new ol,i.set(n,[o])):s>=r.length?(o=new ol,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ze};break;case"SpotLight":t={position:new D,direction:new D,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Cg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Rg=0;function Pg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lg(i,e){const t=new wg,n=Cg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new D);const r=new D,o=new wt,a=new wt;function l(d,h){let f=0,u=0,g=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let y=0,m=0,p=0,v=0,x=0,M=0,P=0,A=0,w=0,G=0,S=0;d.sort(Pg);const T=h===!0?Math.PI:1;for(let H=0,te=d.length;H<te;H++){const R=d[H],O=R.color,z=R.intensity,q=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)f+=O.r*z*T,u+=O.g*z*T,g+=O.b*z*T;else if(R.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(R.sh.coefficients[X],z);S++}else if(R.isDirectionalLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*T),R.castShadow){const Y=R.shadow,ne=n.get(R);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,s.directionalShadow[y]=ne,s.directionalShadowMap[y]=W,s.directionalShadowMatrix[y]=R.shadow.matrix,M++}s.directional[y]=X,y++}else if(R.isSpotLight){const X=t.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(O).multiplyScalar(z*T),X.distance=q,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,s.spot[p]=X;const Y=R.shadow;if(R.map&&(s.spotLightMap[w]=R.map,w++,Y.updateMatrices(R),R.castShadow&&G++),s.spotLightMatrix[p]=Y.matrix,R.castShadow){const ne=n.get(R);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,s.spotShadow[p]=ne,s.spotShadowMap[p]=W,A++}p++}else if(R.isRectAreaLight){const X=t.get(R);X.color.copy(O).multiplyScalar(z),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),s.rectArea[v]=X,v++}else if(R.isPointLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity*T),X.distance=R.distance,X.decay=R.decay,R.castShadow){const Y=R.shadow,ne=n.get(R);ne.shadowBias=Y.bias,ne.shadowNormalBias=Y.normalBias,ne.shadowRadius=Y.radius,ne.shadowMapSize=Y.mapSize,ne.shadowCameraNear=Y.camera.near,ne.shadowCameraFar=Y.camera.far,s.pointShadow[m]=ne,s.pointShadowMap[m]=W,s.pointShadowMatrix[m]=R.shadow.matrix,P++}s.point[m]=X,m++}else if(R.isHemisphereLight){const X=t.get(R);X.skyColor.copy(R.color).multiplyScalar(z*T),X.groundColor.copy(R.groundColor).multiplyScalar(z*T),s.hemi[x]=X,x++}}v>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=re.LTC_FLOAT_1,s.rectAreaLTC2=re.LTC_FLOAT_2):(s.rectAreaLTC1=re.LTC_HALF_1,s.rectAreaLTC2=re.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=re.LTC_FLOAT_1,s.rectAreaLTC2=re.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=re.LTC_HALF_1,s.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=u,s.ambient[2]=g;const B=s.hash;(B.directionalLength!==y||B.pointLength!==m||B.spotLength!==p||B.rectAreaLength!==v||B.hemiLength!==x||B.numDirectionalShadows!==M||B.numPointShadows!==P||B.numSpotShadows!==A||B.numSpotMaps!==w||B.numLightProbes!==S)&&(s.directional.length=y,s.spot.length=p,s.rectArea.length=v,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=A+w-G,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=G,s.numLightProbes=S,B.directionalLength=y,B.pointLength=m,B.spotLength=p,B.rectAreaLength=v,B.hemiLength=x,B.numDirectionalShadows=M,B.numPointShadows=P,B.numSpotShadows=A,B.numSpotMaps=w,B.numLightProbes=S,s.version=Rg++)}function c(d,h){let f=0,u=0,g=0,y=0,m=0;const p=h.matrixWorldInverse;for(let v=0,x=d.length;v<x;v++){const M=d[v];if(M.isDirectionalLight){const P=s.directional[f];P.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),f++}else if(M.isSpotLight){const P=s.spot[g];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),g++}else if(M.isRectAreaLight){const P=s.rectArea[y];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(M.isPointLight){const P=s.point[u];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(p),u++}else if(M.isHemisphereLight){const P=s.hemi[m];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:s}}function ll(i,e){const t=new Lg(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(h){n.push(h)}function a(h){s.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Dg(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new ll(i,e),t.set(r,[l])):o>=a.length?(l=new ll(i,e),a.push(l)):l=a[o],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ug extends fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kg extends fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ig=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ng=`uniform sampler2D shadow_pass;
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
}`;function Og(i,e,t){let n=new Yl;const s=new it,r=new it,o=new Rt,a=new Ug({depthPacking:Ru}),l=new kg,c={},d=t.maxTextureSize,h={[En]:qt,[qt]:En,[Un]:Un},f=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Ig,fragmentShader:Ng}),u=f.clone();u.defines.HORIZONTAL_PASS=1;const g=new Mn;g.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ye(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bl;let p=this.type;this.render=function(A,w,G){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),T=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),H=i.state;H.setBlending(qn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const te=p!==Pn&&this.type===Pn,R=p===Pn&&this.type!==Pn;for(let O=0,z=A.length;O<z;O++){const q=A[O],W=q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const X=W.getFrameExtents();if(s.multiply(X),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/X.x),s.x=r.x*X.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/X.y),s.y=r.y*X.y,W.mapSize.y=r.y)),W.map===null||te===!0||R===!0){const ne=this.type!==Pn?{minFilter:qe,magFilter:qe}:{};W.map!==null&&W.map.dispose(),W.map=new mi(s.x,s.y,ne),W.map.texture.name=q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const Y=W.getViewportCount();for(let ne=0;ne<Y;ne++){const ie=W.getViewport(ne);o.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),H.viewport(o),W.updateMatrices(q,ne),n=W.getFrustum(),M(w,G,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===Pn&&v(W,G),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,T,B)};function v(A,w){const G=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,u.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new mi(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,G,f,y,null),u.uniforms.shadow_pass.value=A.mapPass.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,G,u,y,null)}function x(A,w,G,S){let T=null;const B=G.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(B!==void 0)T=B;else if(T=G.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=T.uuid,te=w.uuid;let R=c[H];R===void 0&&(R={},c[H]=R);let O=R[te];O===void 0&&(O=T.clone(),R[te]=O,w.addEventListener("dispose",P)),T=O}if(T.visible=w.visible,T.wireframe=w.wireframe,S===Pn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:h[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,G.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const H=i.properties.get(T);H.light=G}return T}function M(A,w,G,S,T){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld);const te=e.update(A),R=A.material;if(Array.isArray(R)){const O=te.groups;for(let z=0,q=O.length;z<q;z++){const W=O[z],X=R[W.materialIndex];if(X&&X.visible){const Y=x(A,X,S,T);A.onBeforeShadow(i,A,w,G,te,Y,W),i.renderBufferDirect(G,null,te,Y,A,W),A.onAfterShadow(i,A,w,G,te,Y,W)}}}else if(R.visible){const O=x(A,R,S,T);A.onBeforeShadow(i,A,w,G,te,O,null),i.renderBufferDirect(G,null,te,O,A,null),A.onAfterShadow(i,A,w,G,te,O,null)}}const H=A.children;for(let te=0,R=H.length;te<R;te++)M(H[te],w,G,S,T)}function P(A){A.target.removeEventListener("dispose",P);for(const G in c){const S=c[G],T=A.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}function Fg(i,e,t){const n=t.isWebGL2;function s(){let C=!1;const ae=new Rt;let oe=null;const Ae=new Rt(0,0,0,0);return{setMask:function(Ee){oe!==Ee&&!C&&(i.colorMask(Ee,Ee,Ee,Ee),oe=Ee)},setLocked:function(Ee){C=Ee},setClear:function(Ee,st,rt,Mt,Bt){Bt===!0&&(Ee*=Mt,st*=Mt,rt*=Mt),ae.set(Ee,st,rt,Mt),Ae.equals(ae)===!1&&(i.clearColor(Ee,st,rt,Mt),Ae.copy(ae))},reset:function(){C=!1,oe=null,Ae.set(-1,0,0,0)}}}function r(){let C=!1,ae=null,oe=null,Ae=null;return{setTest:function(Ee){Ee?Ue(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Ee){ae!==Ee&&!C&&(i.depthMask(Ee),ae=Ee)},setFunc:function(Ee){if(oe!==Ee){switch(Ee){case su:i.depthFunc(i.NEVER);break;case ru:i.depthFunc(i.ALWAYS);break;case au:i.depthFunc(i.LESS);break;case tr:i.depthFunc(i.LEQUAL);break;case ou:i.depthFunc(i.EQUAL);break;case lu:i.depthFunc(i.GEQUAL);break;case cu:i.depthFunc(i.GREATER);break;case du:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Ee}},setLocked:function(Ee){C=Ee},setClear:function(Ee){Ae!==Ee&&(i.clearDepth(Ee),Ae=Ee)},reset:function(){C=!1,ae=null,oe=null,Ae=null}}}function o(){let C=!1,ae=null,oe=null,Ae=null,Ee=null,st=null,rt=null,Mt=null,Bt=null;return{setTest:function(at){C||(at?Ue(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(at){ae!==at&&!C&&(i.stencilMask(at),ae=at)},setFunc:function(at,$t,mn){(oe!==at||Ae!==$t||Ee!==mn)&&(i.stencilFunc(at,$t,mn),oe=at,Ae=$t,Ee=mn)},setOp:function(at,$t,mn){(st!==at||rt!==$t||Mt!==mn)&&(i.stencilOp(at,$t,mn),st=at,rt=$t,Mt=mn)},setLocked:function(at){C=at},setClear:function(at){Bt!==at&&(i.clearStencil(at),Bt=at)},reset:function(){C=!1,ae=null,oe=null,Ae=null,Ee=null,st=null,rt=null,Mt=null,Bt=null}}}const a=new s,l=new r,c=new o,d=new WeakMap,h=new WeakMap;let f={},u={},g=new WeakMap,y=[],m=null,p=!1,v=null,x=null,M=null,P=null,A=null,w=null,G=null,S=new Ze(0,0,0),T=0,B=!1,H=null,te=null,R=null,O=null,z=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=X>=1):Y.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=X>=2);let ne=null,ie={};const $=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),ce=new Rt().fromArray($),_e=new Rt().fromArray(j);function xe(C,ae,oe,Ae){const Ee=new Uint8Array(4),st=i.createTexture();i.bindTexture(C,st),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let rt=0;rt<oe;rt++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(ae,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(ae+rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return st}const Le={};Le[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Le[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Le[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(i.DEPTH_TEST),l.setFunc(tr),Ne(!1),b(za),Ue(i.CULL_FACE),pe(qn);function Ue(C){f[C]!==!0&&(i.enable(C),f[C]=!0)}function Te(C){f[C]!==!1&&(i.disable(C),f[C]=!1)}function Xe(C,ae){return u[C]!==ae?(i.bindFramebuffer(C,ae),u[C]=ae,n&&(C===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ae),C===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ae)),!0):!1}function U(C,ae){let oe=y,Ae=!1;if(C)if(oe=g.get(ae),oe===void 0&&(oe=[],g.set(ae,oe)),C.isWebGLMultipleRenderTargets){const Ee=C.texture;if(oe.length!==Ee.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let st=0,rt=Ee.length;st<rt;st++)oe[st]=i.COLOR_ATTACHMENT0+st;oe.length=Ee.length,Ae=!0}}else oe[0]!==i.COLOR_ATTACHMENT0&&(oe[0]=i.COLOR_ATTACHMENT0,Ae=!0);else oe[0]!==i.BACK&&(oe[0]=i.BACK,Ae=!0);Ae&&(t.isWebGL2?i.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Ft(C){return m!==C?(i.useProgram(C),m=C,!0):!1}const Se={[ci]:i.FUNC_ADD,[Gd]:i.FUNC_SUBTRACT,[Vd]:i.FUNC_REVERSE_SUBTRACT};if(n)Se[Xa]=i.MIN,Se[qa]=i.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(Se[Xa]=C.MIN_EXT,Se[qa]=C.MAX_EXT)}const Re={[Wd]:i.ZERO,[Xd]:i.ONE,[qd]:i.SRC_COLOR,[na]:i.SRC_ALPHA,[Qd]:i.SRC_ALPHA_SATURATE,[Zd]:i.DST_COLOR,[jd]:i.DST_ALPHA,[Yd]:i.ONE_MINUS_SRC_COLOR,[ia]:i.ONE_MINUS_SRC_ALPHA,[Jd]:i.ONE_MINUS_DST_COLOR,[Kd]:i.ONE_MINUS_DST_ALPHA,[eu]:i.CONSTANT_COLOR,[tu]:i.ONE_MINUS_CONSTANT_COLOR,[nu]:i.CONSTANT_ALPHA,[iu]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(C,ae,oe,Ae,Ee,st,rt,Mt,Bt,at){if(C===qn){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(Ue(i.BLEND),p=!0),C!==zd){if(C!==v||at!==B){if((x!==ci||A!==ci)&&(i.blendEquation(i.FUNC_ADD),x=ci,A=ci),at)switch(C){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.ONE,i.ONE);break;case Va:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ga:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Va:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}M=null,P=null,w=null,G=null,S.set(0,0,0),T=0,v=C,B=at}return}Ee=Ee||ae,st=st||oe,rt=rt||Ae,(ae!==x||Ee!==A)&&(i.blendEquationSeparate(Se[ae],Se[Ee]),x=ae,A=Ee),(oe!==M||Ae!==P||st!==w||rt!==G)&&(i.blendFuncSeparate(Re[oe],Re[Ae],Re[st],Re[rt]),M=oe,P=Ae,w=st,G=rt),(Mt.equals(S)===!1||Bt!==T)&&(i.blendColor(Mt.r,Mt.g,Mt.b,Bt),S.copy(Mt),T=Bt),v=C,B=!1}function ut(C,ae){C.side===Un?Te(i.CULL_FACE):Ue(i.CULL_FACE);let oe=C.side===qt;ae&&(oe=!oe),Ne(oe),C.blending===Gi&&C.transparent===!1?pe(qn):pe(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),a.setMask(C.colorWrite);const Ae=C.stencilWrite;c.setTest(Ae),Ae&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),I(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(C){H!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),H=C)}function b(C){C!==Bd?(Ue(i.CULL_FACE),C!==te&&(C===za?i.cullFace(i.BACK):C===$d?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),te=C}function _(C){C!==R&&(W&&i.lineWidth(C),R=C)}function I(C,ae,oe){C?(Ue(i.POLYGON_OFFSET_FILL),(O!==ae||z!==oe)&&(i.polygonOffset(ae,oe),O=ae,z=oe)):Te(i.POLYGON_OFFSET_FILL)}function J(C){C?Ue(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function Z(C){C===void 0&&(C=i.TEXTURE0+q-1),ne!==C&&(i.activeTexture(C),ne=C)}function ee(C,ae,oe){oe===void 0&&(ne===null?oe=i.TEXTURE0+q-1:oe=ne);let Ae=ie[oe];Ae===void 0&&(Ae={type:void 0,texture:void 0},ie[oe]=Ae),(Ae.type!==C||Ae.texture!==ae)&&(ne!==oe&&(i.activeTexture(oe),ne=oe),i.bindTexture(C,ae||Le[C]),Ae.type=C,Ae.texture=ae)}function me(){const C=ie[ne];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function le(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function be(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Qe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ve(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ce(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ke(C){ce.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),ce.copy(C))}function Je(C){_e.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),_e.copy(C))}function pt(C,ae){let oe=h.get(ae);oe===void 0&&(oe=new WeakMap,h.set(ae,oe));let Ae=oe.get(C);Ae===void 0&&(Ae=i.getUniformBlockIndex(ae,C.name),oe.set(C,Ae))}function $e(C,ae){const Ae=h.get(ae).get(C);d.get(ae)!==Ae&&(i.uniformBlockBinding(ae,Ae,C.__bindingPointIndex),d.set(ae,Ae))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ne=null,ie={},u={},g=new WeakMap,y=[],m=null,p=!1,v=null,x=null,M=null,P=null,A=null,w=null,G=null,S=new Ze(0,0,0),T=0,B=!1,H=null,te=null,R=null,O=null,z=null,ce.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ue,disable:Te,bindFramebuffer:Xe,drawBuffers:U,useProgram:Ft,setBlending:pe,setMaterial:ut,setFlipSided:Ne,setCullFace:b,setLineWidth:_,setPolygonOffset:I,setScissorTest:J,activeTexture:Z,bindTexture:ee,unbindTexture:me,compressedTexImage2D:le,compressedTexImage3D:he,texImage2D:ve,texImage3D:fe,updateUBOMapping:pt,uniformBlockBinding:$e,texStorage2D:Ve,texStorage3D:Ce,texSubImage2D:be,texSubImage3D:Oe,compressedTexSubImage2D:K,compressedTexSubImage3D:Qe,scissor:ke,viewport:Je,reset:se}}function Bg(i,e,t,n,s,r,o){const a=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const f=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return u?new OffscreenCanvas(b,_):ms("canvas")}function y(b,_,I,J){let Z=1;if((b.width>J||b.height>J)&&(Z=J/Math.max(b.width,b.height)),Z<1||_===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const ee=_?da:Math.floor,me=ee(Z*b.width),le=ee(Z*b.height);h===void 0&&(h=g(me,le));const he=I?g(me,le):h;return he.width=me,he.height=le,he.getContext("2d").drawImage(b,0,0,me,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+me+"x"+le+")."),he}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return bo(b.width)&&bo(b.height)}function p(b){return a?!1:b.wrapS!==en||b.wrapT!==en||b.minFilter!==qe&&b.minFilter!==rn}function v(b,_){return b.generateMipmaps&&_&&b.minFilter!==qe&&b.minFilter!==rn}function x(b){i.generateMipmap(b)}function M(b,_,I,J,Z=!1){if(a===!1)return _;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ee=_;if(_===i.RED&&(I===i.FLOAT&&(ee=i.R32F),I===i.HALF_FLOAT&&(ee=i.R16F),I===i.UNSIGNED_BYTE&&(ee=i.R8)),_===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(ee=i.R8UI),I===i.UNSIGNED_SHORT&&(ee=i.R16UI),I===i.UNSIGNED_INT&&(ee=i.R32UI),I===i.BYTE&&(ee=i.R8I),I===i.SHORT&&(ee=i.R16I),I===i.INT&&(ee=i.R32I)),_===i.RG&&(I===i.FLOAT&&(ee=i.RG32F),I===i.HALF_FLOAT&&(ee=i.RG16F),I===i.UNSIGNED_BYTE&&(ee=i.RG8)),_===i.RGBA){const me=Z?nr:et.getTransfer(J);I===i.FLOAT&&(ee=i.RGBA32F),I===i.HALF_FLOAT&&(ee=i.RGBA16F),I===i.UNSIGNED_BYTE&&(ee=me===dt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function P(b,_,I){return v(b,I)===!0||b.isFramebufferTexture&&b.minFilter!==qe&&b.minFilter!==rn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){return b===qe||b===Ya||b===vr?i.NEAREST:i.LINEAR}function w(b){const _=b.target;_.removeEventListener("dispose",w),S(_),_.isVideoTexture&&d.delete(_)}function G(b){const _=b.target;_.removeEventListener("dispose",G),B(_)}function S(b){const _=n.get(b);if(_.__webglInit===void 0)return;const I=b.source,J=f.get(I);if(J){const Z=J[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(b),Object.keys(J).length===0&&f.delete(I)}n.remove(b)}function T(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const I=b.source,J=f.get(I);delete J[_.__cacheKey],o.memory.textures--}function B(b){const _=b.texture,I=n.get(b),J=n.get(_);if(J.__webglTexture!==void 0&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(I.__webglFramebuffer[Z]))for(let ee=0;ee<I.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(I.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(I.__webglFramebuffer[Z]);I.__webglDepthbuffer&&i.deleteRenderbuffer(I.__webglDepthbuffer[Z])}else{if(Array.isArray(I.__webglFramebuffer))for(let Z=0;Z<I.__webglFramebuffer.length;Z++)i.deleteFramebuffer(I.__webglFramebuffer[Z]);else i.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&i.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&i.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let Z=0;Z<I.__webglColorRenderbuffer.length;Z++)I.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(I.__webglColorRenderbuffer[Z]);I.__webglDepthRenderbuffer&&i.deleteRenderbuffer(I.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let Z=0,ee=_.length;Z<ee;Z++){const me=n.get(_[Z]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),o.memory.textures--),n.remove(_[Z])}n.remove(_),n.remove(b)}let H=0;function te(){H=0}function R(){const b=H;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),H+=1,b}function O(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function z(b,_){const I=n.get(b);if(b.isVideoTexture&&ut(b),b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){const J=b.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(I,b,_);return}}t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+_)}function q(b,_){const I=n.get(b);if(b.version>0&&I.__version!==b.version){ce(I,b,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+_)}function W(b,_){const I=n.get(b);if(b.version>0&&I.__version!==b.version){ce(I,b,_);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+_)}function X(b,_){const I=n.get(b);if(b.version>0&&I.__version!==b.version){_e(I,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+_)}const Y={[aa]:i.REPEAT,[en]:i.CLAMP_TO_EDGE,[oa]:i.MIRRORED_REPEAT},ne={[qe]:i.NEAREST,[Ya]:i.NEAREST_MIPMAP_NEAREST,[vr]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[_u]:i.LINEAR_MIPMAP_NEAREST,[fs]:i.LINEAR_MIPMAP_LINEAR},ie={[Du]:i.NEVER,[Fu]:i.ALWAYS,[Uu]:i.LESS,[Il]:i.LEQUAL,[ku]:i.EQUAL,[Ou]:i.GEQUAL,[Iu]:i.GREATER,[Nu]:i.NOTEQUAL};function $(b,_,I){if(I?(i.texParameteri(b,i.TEXTURE_WRAP_S,Y[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Y[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Y[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ne[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ne[_.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(_.wrapS!==en||_.wrapT!==en)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,A(_.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,A(_.minFilter)),_.minFilter!==qe&&_.minFilter!==rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,ie[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===qe||_.minFilter!==vr&&_.minFilter!==fs||_.type===Xn&&e.has("OES_texture_float_linear")===!1||a===!1&&_.type===ps&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||n.get(_).__currentAnisotropy)&&(i.texParameterf(b,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy)}}function j(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",w));const J=_.source;let Z=f.get(J);Z===void 0&&(Z={},f.set(J,Z));const ee=O(_);if(ee!==b.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,I=!0),Z[ee].usedTimes++;const me=Z[b.__cacheKey];me!==void 0&&(Z[b.__cacheKey].usedTimes--,me.usedTimes===0&&T(_)),b.__cacheKey=ee,b.__webglTexture=Z[ee].texture}return I}function ce(b,_,I){let J=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=i.TEXTURE_3D);const Z=j(b,_),ee=_.source;t.bindTexture(J,b.__webglTexture,i.TEXTURE0+I);const me=n.get(ee);if(ee.version!==me.__version||Z===!0){t.activeTexture(i.TEXTURE0+I);const le=et.getPrimaries(et.workingColorSpace),he=_.colorSpace===an?null:et.getPrimaries(_.colorSpace),be=_.colorSpace===an||le===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=p(_)&&m(_.image)===!1;let K=y(_.image,Oe,!1,s.maxTextureSize);K=Ne(_,K);const Qe=m(K)||a,Ve=r.convert(_.format,_.colorSpace);let Ce=r.convert(_.type),ve=M(_.internalFormat,Ve,Ce,_.colorSpace,_.isVideoTexture);$(J,_,Qe);let fe;const ke=_.mipmaps,Je=a&&_.isVideoTexture!==!0&&ve!==Ul,pt=me.__version===void 0||Z===!0,$e=P(_,K,Qe);if(_.isDepthTexture)ve=i.DEPTH_COMPONENT,a?_.type===Xn?ve=i.DEPTH_COMPONENT32F:_.type===Wn?ve=i.DEPTH_COMPONENT24:_.type===hi?ve=i.DEPTH24_STENCIL8:ve=i.DEPTH_COMPONENT16:_.type===Xn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===fi&&ve===i.DEPTH_COMPONENT&&_.type!==va&&_.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=Wn,Ce=r.convert(_.type)),_.format===Zi&&ve===i.DEPTH_COMPONENT&&(ve=i.DEPTH_STENCIL,_.type!==hi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=hi,Ce=r.convert(_.type))),pt&&(Je?t.texStorage2D(i.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ce,null));else if(_.isDataTexture)if(ke.length>0&&Qe){Je&&pt&&t.texStorage2D(i.TEXTURE_2D,$e,ve,ke[0].width,ke[0].height);for(let se=0,C=ke.length;se<C;se++)fe=ke[se],Je?t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,se,ve,fe.width,fe.height,0,Ve,Ce,fe.data);_.generateMipmaps=!1}else Je?(pt&&t.texStorage2D(i.TEXTURE_2D,$e,ve,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,K.width,K.height,Ve,Ce,K.data)):t.texImage2D(i.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ce,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Je&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,$e,ve,ke[0].width,ke[0].height,K.depth);for(let se=0,C=ke.length;se<C;se++)fe=ke[se],_.format!==hn?Ve!==null?Je?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,K.depth,Ve,fe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,ve,fe.width,fe.height,K.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,K.depth,Ve,Ce,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,ve,fe.width,fe.height,K.depth,0,Ve,Ce,fe.data)}else{Je&&pt&&t.texStorage2D(i.TEXTURE_2D,$e,ve,ke[0].width,ke[0].height);for(let se=0,C=ke.length;se<C;se++)fe=ke[se],_.format!==hn?Ve!==null?Je?t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,se,ve,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe.width,fe.height,Ve,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,se,ve,fe.width,fe.height,0,Ve,Ce,fe.data)}else if(_.isDataArrayTexture)Je?(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,$e,ve,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ve,Ce,K.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,Ve,Ce,K.data);else if(_.isData3DTexture)Je?(pt&&t.texStorage3D(i.TEXTURE_3D,$e,ve,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ve,Ce,K.data)):t.texImage3D(i.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,Ve,Ce,K.data);else if(_.isFramebufferTexture){if(pt)if(Je)t.texStorage2D(i.TEXTURE_2D,$e,ve,K.width,K.height);else{let se=K.width,C=K.height;for(let ae=0;ae<$e;ae++)t.texImage2D(i.TEXTURE_2D,ae,ve,se,C,0,Ve,Ce,null),se>>=1,C>>=1}}else if(ke.length>0&&Qe){Je&&pt&&t.texStorage2D(i.TEXTURE_2D,$e,ve,ke[0].width,ke[0].height);for(let se=0,C=ke.length;se<C;se++)fe=ke[se],Je?t.texSubImage2D(i.TEXTURE_2D,se,0,0,Ve,Ce,fe):t.texImage2D(i.TEXTURE_2D,se,ve,Ve,Ce,fe);_.generateMipmaps=!1}else Je?(pt&&t.texStorage2D(i.TEXTURE_2D,$e,ve,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ve,Ce,K)):t.texImage2D(i.TEXTURE_2D,0,ve,Ve,Ce,K);v(_,Qe)&&x(J),me.__version=ee.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function _e(b,_,I){if(_.image.length!==6)return;const J=j(b,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+I);const ee=n.get(Z);if(Z.version!==ee.__version||J===!0){t.activeTexture(i.TEXTURE0+I);const me=et.getPrimaries(et.workingColorSpace),le=_.colorSpace===an?null:et.getPrimaries(_.colorSpace),he=_.colorSpace===an||me===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const be=_.isCompressedTexture||_.image[0].isCompressedTexture,Oe=_.image[0]&&_.image[0].isDataTexture,K=[];for(let se=0;se<6;se++)!be&&!Oe?K[se]=y(_.image[se],!1,!0,s.maxCubemapSize):K[se]=Oe?_.image[se].image:_.image[se],K[se]=Ne(_,K[se]);const Qe=K[0],Ve=m(Qe)||a,Ce=r.convert(_.format,_.colorSpace),ve=r.convert(_.type),fe=M(_.internalFormat,Ce,ve,_.colorSpace),ke=a&&_.isVideoTexture!==!0,Je=ee.__version===void 0||J===!0;let pt=P(_,Qe,Ve);$(i.TEXTURE_CUBE_MAP,_,Ve);let $e;if(be){ke&&Je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pt,fe,Qe.width,Qe.height);for(let se=0;se<6;se++){$e=K[se].mipmaps;for(let C=0;C<$e.length;C++){const ae=$e[C];_.format!==hn?Ce!==null?ke?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,ae.width,ae.height,Ce,ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,fe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,0,0,ae.width,ae.height,Ce,ve,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C,fe,ae.width,ae.height,0,Ce,ve,ae.data)}}}else{$e=_.mipmaps,ke&&Je&&($e.length>0&&pt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,pt,fe,K[0].width,K[0].height));for(let se=0;se<6;se++)if(Oe){ke?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,K[se].width,K[se].height,Ce,ve,K[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,K[se].width,K[se].height,0,Ce,ve,K[se].data);for(let C=0;C<$e.length;C++){const oe=$e[C].image[se].image;ke?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,oe.width,oe.height,Ce,ve,oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,fe,oe.width,oe.height,0,Ce,ve,oe.data)}}else{ke?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ce,ve,K[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,fe,Ce,ve,K[se]);for(let C=0;C<$e.length;C++){const ae=$e[C];ke?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,0,0,Ce,ve,ae.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,C+1,fe,Ce,ve,ae.image[se])}}}v(_,Ve)&&x(i.TEXTURE_CUBE_MAP),ee.__version=Z.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function xe(b,_,I,J,Z,ee){const me=r.convert(I.format,I.colorSpace),le=r.convert(I.type),he=M(I.internalFormat,me,le,I.colorSpace);if(!n.get(_).__hasExternalTextures){const Oe=Math.max(1,_.width>>ee),K=Math.max(1,_.height>>ee);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,he,Oe,K,_.depth,0,me,le,null):t.texImage2D(Z,ee,he,Oe,K,0,me,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),pe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,n.get(I).__webglTexture,0,Re(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,n.get(I).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(b,_,I){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer&&!_.stencilBuffer){let J=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(I||pe(_)){const Z=_.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Xn?J=i.DEPTH_COMPONENT32F:Z.type===Wn&&(J=i.DEPTH_COMPONENT24));const ee=Re(_);pe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,J,_.width,_.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,J,_.width,_.height)}else i.renderbufferStorage(i.RENDERBUFFER,J,_.width,_.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(_.depthBuffer&&_.stencilBuffer){const J=Re(_);I&&pe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,_.width,_.height):pe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{const J=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let Z=0;Z<J.length;Z++){const ee=J[Z],me=r.convert(ee.format,ee.colorSpace),le=r.convert(ee.type),he=M(ee.internalFormat,me,le,ee.colorSpace),be=Re(_);I&&pe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,be,he,_.width,_.height):pe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,be,he,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,he,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z(_.depthTexture,0);const J=n.get(_.depthTexture).__webglTexture,Z=Re(_);if(_.depthTexture.format===fi)pe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(_.depthTexture.format===Zi)pe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Te(b){const _=n.get(b),I=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");Ue(_.__webglFramebuffer,b)}else if(I){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]=i.createRenderbuffer(),Le(_.__webglDepthbuffer[J],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),Le(_.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(b,_,I){const J=n.get(b);_!==void 0&&xe(J.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&Te(b)}function U(b){const _=b.texture,I=n.get(b),J=n.get(_);b.addEventListener("dispose",G),b.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=_.version,o.memory.textures++);const Z=b.isWebGLCubeRenderTarget===!0,ee=b.isWebGLMultipleRenderTargets===!0,me=m(b)||a;if(Z){I.__webglFramebuffer=[];for(let le=0;le<6;le++)if(a&&_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[le]=[];for(let he=0;he<_.mipmaps.length;he++)I.__webglFramebuffer[le][he]=i.createFramebuffer()}else I.__webglFramebuffer[le]=i.createFramebuffer()}else{if(a&&_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let le=0;le<_.mipmaps.length;le++)I.__webglFramebuffer[le]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){const le=b.texture;for(let he=0,be=le.length;he<be;he++){const Oe=n.get(le[he]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&pe(b)===!1){const le=ee?_:[_];I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let he=0;he<le.length;he++){const be=le[he];I.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[he]);const Oe=r.convert(be.format,be.colorSpace),K=r.convert(be.type),Qe=M(be.internalFormat,Oe,K,be.colorSpace,b.isXRRenderTarget===!0),Ve=Re(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,Qe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,I.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(I.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),$(i.TEXTURE_CUBE_MAP,_,me);for(let le=0;le<6;le++)if(a&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)xe(I.__webglFramebuffer[le][he],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,he);else xe(I.__webglFramebuffer[le],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);v(_,me)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const le=b.texture;for(let he=0,be=le.length;he<be;he++){const Oe=le[he],K=n.get(Oe);t.bindTexture(i.TEXTURE_2D,K.__webglTexture),$(i.TEXTURE_2D,Oe,me),xe(I.__webglFramebuffer,b,Oe,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),v(Oe,me)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?le=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,J.__webglTexture),$(le,_,me),a&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)xe(I.__webglFramebuffer[he],b,_,i.COLOR_ATTACHMENT0,le,he);else xe(I.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,le,0);v(_,me)&&x(le),t.unbindTexture()}b.depthBuffer&&Te(b)}function Ft(b){const _=m(b)||a,I=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let J=0,Z=I.length;J<Z;J++){const ee=I[J];if(v(ee,_)){const me=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(ee).__webglTexture;t.bindTexture(me,le),x(me),t.unbindTexture()}}}function Se(b){if(a&&b.samples>0&&pe(b)===!1){const _=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],I=b.width,J=b.height;let Z=i.COLOR_BUFFER_BIT;const ee=[],me=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(b),he=b.isWebGLMultipleRenderTargets===!0;if(he)for(let be=0;be<_.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let be=0;be<_.length;be++){ee.push(i.COLOR_ATTACHMENT0+be),b.depthBuffer&&ee.push(me);const Oe=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Oe===!1&&(b.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[be]),Oe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[me]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[me])),he){const K=n.get(_[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,I,J,0,0,I,J,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<_.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,le.__webglColorRenderbuffer[be]);const Oe=n.get(_[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Re(b){return Math.min(s.maxSamples,b.samples)}function pe(b){const _=n.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ut(b){const _=o.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function Ne(b,_){const I=b.colorSpace,J=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===la||I!==On&&I!==an&&(et.getTransfer(I)===dt?a===!1?e.has("EXT_sRGB")===!0&&J===hn?(b.format=la,b.minFilter=rn,b.generateMipmaps=!1):_=Ol.sRGBToLinear(_):(J!==hn||Z!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),_}this.allocateTextureUnit=R,this.resetTextureUnits=te,this.setTexture2D=z,this.setTexture2DArray=q,this.setTexture3D=W,this.setTextureCube=X,this.rebindTextures=Xe,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=pe}function $g(i,e,t){const n=t.isWebGL2;function s(r,o=an){let a;const l=et.getTransfer(o);if(r===jn)return i.UNSIGNED_BYTE;if(r===Cl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Rl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===vu)return i.BYTE;if(r===Su)return i.SHORT;if(r===va)return i.UNSIGNED_SHORT;if(r===wl)return i.INT;if(r===Wn)return i.UNSIGNED_INT;if(r===Xn)return i.FLOAT;if(r===ps)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Eu)return i.ALPHA;if(r===hn)return i.RGBA;if(r===Mu)return i.LUMINANCE;if(r===bu)return i.LUMINANCE_ALPHA;if(r===fi)return i.DEPTH_COMPONENT;if(r===Zi)return i.DEPTH_STENCIL;if(r===la)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Tu)return i.RED;if(r===Pl)return i.RED_INTEGER;if(r===Au)return i.RG;if(r===Ll)return i.RG_INTEGER;if(r===Dl)return i.RGBA_INTEGER;if(r===Sr||r===Er||r===Mr||r===br)if(l===dt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Sr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Er)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Sr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Er)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===br)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ja||r===Ka||r===Za||r===Ja)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===ja)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ka)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Za)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ja)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ul)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Qa||r===eo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Qa)return l===dt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===eo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===to||r===no||r===io||r===so||r===ro||r===ao||r===oo||r===lo||r===co||r===uo||r===ho||r===fo||r===po||r===mo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===to)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===no)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===io)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===so)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ro)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ao)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===oo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===lo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===co)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===uo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ho)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===fo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===po)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===mo)return l===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Tr||r===go||r===yo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Tr)return l===dt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===go)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===yo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===wu||r===xo||r===_o||r===vo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Tr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===xo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===_o)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===vo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===hi?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Hg extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class zi extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zg={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),u=.02,g=.005;c.inputState.pinching&&f>u+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=u-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Gg extends Qi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,f=null,u=null,g=null;const y=t.getContextAttributes();let m=null,p=null;const v=[],x=[],M=new it;let P=null;const A=new un;A.layers.enable(1),A.viewport=new Rt;const w=new un;w.layers.enable(2),w.viewport=new Rt;const G=[A,w],S=new Hg;S.layers.enable(1),S.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let j=v[$];return j===void 0&&(j=new Kr,v[$]=j),j.getTargetRaySpace()},this.getControllerGrip=function($){let j=v[$];return j===void 0&&(j=new Kr,v[$]=j),j.getGripSpace()},this.getHand=function($){let j=v[$];return j===void 0&&(j=new Kr,v[$]=j),j.getHandSpace()};function H($){const j=x.indexOf($.inputSource);if(j===-1)return;const ce=v[j];ce!==void 0&&(ce.update($.inputSource,$.frame,c||o),ce.dispatchEvent({type:$.type,data:$.inputSource}))}function te(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",R);for(let $=0;$<v.length;$++){const j=x[$];j!==null&&(x[$]=null,v[$].disconnect(j))}T=null,B=null,e.setRenderTarget(m),u=null,f=null,h=null,s=null,p=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",te),s.addEventListener("inputsourceschange",R),y.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(M),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:s.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),p=new mi(u.framebufferWidth,u.framebufferHeight,{format:hn,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let j=null,ce=null,_e=null;y.depth&&(_e=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=y.stencil?Zi:fi,ce=y.stencil?hi:Wn);const xe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new mi(f.textureWidth,f.textureHeight,{format:hn,type:jn,depthTexture:new Zl(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});const Le=e.properties.get(p);Le.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ie.setContext(s),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function R($){for(let j=0;j<$.removed.length;j++){const ce=$.removed[j],_e=x.indexOf(ce);_e>=0&&(x[_e]=null,v[_e].disconnect(ce))}for(let j=0;j<$.added.length;j++){const ce=$.added[j];let _e=x.indexOf(ce);if(_e===-1){for(let Le=0;Le<v.length;Le++)if(Le>=x.length){x.push(ce),_e=Le;break}else if(x[Le]===null){x[Le]=ce,_e=Le;break}if(_e===-1)break}const xe=v[_e];xe&&xe.connect(ce)}}const O=new D,z=new D;function q($,j,ce){O.setFromMatrixPosition(j.matrixWorld),z.setFromMatrixPosition(ce.matrixWorld);const _e=O.distanceTo(z),xe=j.projectionMatrix.elements,Le=ce.projectionMatrix.elements,Ue=xe[14]/(xe[10]-1),Te=xe[14]/(xe[10]+1),Xe=(xe[9]+1)/xe[5],U=(xe[9]-1)/xe[5],Ft=(xe[8]-1)/xe[0],Se=(Le[8]+1)/Le[0],Re=Ue*Ft,pe=Ue*Se,ut=_e/(-Ft+Se),Ne=ut*-Ft;j.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ne),$.translateZ(ut),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const b=Ue+ut,_=Te+ut,I=Re-Ne,J=pe+(_e-Ne),Z=Xe*Te/_*b,ee=U*Te/_*b;$.projectionMatrix.makePerspective(I,J,Z,ee,b,_),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function W($,j){j===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(j.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;S.near=w.near=A.near=$.near,S.far=w.far=A.far=$.far,(T!==S.near||B!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,B=S.far);const j=$.parent,ce=S.cameras;W(S,j);for(let _e=0;_e<ce.length;_e++)W(ce[_e],j);ce.length===2?q(S,A,w):S.projectionMatrix.copy(A.projectionMatrix),X($,S,j)};function X($,j,ce){ce===null?$.matrix.copy(j.matrixWorld):($.matrix.copy(ce.matrixWorld),$.matrix.invert(),$.matrix.multiply(j.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ca*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=$)};let Y=null;function ne($,j){if(d=j.getViewerPose(c||o),g=j,d!==null){const ce=d.views;u!==null&&(e.setRenderTargetFramebuffer(p,u.framebuffer),e.setRenderTarget(p));let _e=!1;ce.length!==S.cameras.length&&(S.cameras.length=0,_e=!0);for(let xe=0;xe<ce.length;xe++){const Le=ce[xe];let Ue=null;if(u!==null)Ue=u.getViewport(Le);else{const Xe=h.getViewSubImage(f,Le);Ue=Xe.viewport,xe===0&&(e.setRenderTargetTextures(p,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(p))}let Te=G[xe];Te===void 0&&(Te=new un,Te.layers.enable(xe),Te.viewport=new Rt,G[xe]=Te),Te.matrix.fromArray(Le.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Le.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(S.matrix.copy(Te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),_e===!0&&S.cameras.push(Te)}}for(let ce=0;ce<v.length;ce++){const _e=x[ce],xe=v[ce];_e!==null&&xe!==void 0&&xe.update(_e,j,c||o)}Y&&Y($,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const ie=new jl;ie.setAnimationLoop(ne),this.setAnimationLoop=function($){Y=$},this.dispose=function(){}}}function Vg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,x,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&u(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function u(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Wg(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){const M=x.program;n.uniformBlockBinding(v,M)}function c(v,x){let M=s[v.id];M===void 0&&(g(v),M=d(v),s[v.id]=M,v.addEventListener("dispose",m));const P=x.program;n.updateUBOMapping(v,P);const A=e.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function d(v){const x=h();v.__bindingPointIndex=x;const M=i.createBuffer(),P=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,M),M}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const x=s[v.id],M=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let A=0,w=M.length;A<w;A++){const G=Array.isArray(M[A])?M[A]:[M[A]];for(let S=0,T=G.length;S<T;S++){const B=G[S];if(u(B,A,S,P)===!0){const H=B.__offset,te=Array.isArray(B.value)?B.value:[B.value];let R=0;for(let O=0;O<te.length;O++){const z=te[O],q=y(z);typeof z=="number"||typeof z=="boolean"?(B.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,H+R,B.__data)):z.isMatrix3?(B.__data[0]=z.elements[0],B.__data[1]=z.elements[1],B.__data[2]=z.elements[2],B.__data[3]=0,B.__data[4]=z.elements[3],B.__data[5]=z.elements[4],B.__data[6]=z.elements[5],B.__data[7]=0,B.__data[8]=z.elements[6],B.__data[9]=z.elements[7],B.__data[10]=z.elements[8],B.__data[11]=0):(z.toArray(B.__data,R),R+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,B.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,x,M,P){const A=v.value,w=x+"_"+M;if(P[w]===void 0)return typeof A=="number"||typeof A=="boolean"?P[w]=A:P[w]=A.clone(),!0;{const G=P[w];if(typeof A=="number"||typeof A=="boolean"){if(G!==A)return P[w]=A,!0}else if(G.equals(A)===!1)return G.copy(A),!0}return!1}function g(v){const x=v.uniforms;let M=0;const P=16;for(let w=0,G=x.length;w<G;w++){const S=Array.isArray(x[w])?x[w]:[x[w]];for(let T=0,B=S.length;T<B;T++){const H=S[T],te=Array.isArray(H.value)?H.value:[H.value];for(let R=0,O=te.length;R<O;R++){const z=te[R],q=y(z),W=M%P;W!==0&&P-W<q.boundary&&(M+=P-W),H.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=M,M+=q.storage}}}const A=M%P;return A>0&&(M+=P-A),v.__size=M,v.__cache={},this}function y(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class ic{constructor(e={}){const{canvas:t=$u(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const u=new Uint32Array(4),g=new Int32Array(4);let y=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ct,this._useLegacyLights=!1,this.toneMapping=Yn,this.toneMappingExposure=1;const x=this;let M=!1,P=0,A=0,w=null,G=-1,S=null;const T=new Rt,B=new Rt;let H=null;const te=new Ze(0);let R=0,O=t.width,z=t.height,q=1,W=null,X=null;const Y=new Rt(0,0,O,z),ne=new Rt(0,0,O,z);let ie=!1;const $=new Yl;let j=!1,ce=!1,_e=null;const xe=new wt,Le=new it,Ue=new D,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return w===null?q:1}let U=n;function Ft(E,L){for(let N=0;N<E.length;N++){const F=E[N],k=t.getContext(F,L);if(k!==null)return k}return null}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${_a}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",ae,!1),U===null){const L=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&L.shift(),U=Ft(L,E),U===null)throw Ft(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Se,Re,pe,ut,Ne,b,_,I,J,Z,ee,me,le,he,be,Oe,K,Qe,Ve,Ce,ve,fe,ke,Je;function pt(){Se=new tm(U),Re=new jp(U,Se,e),Se.init(Re),fe=new $g(U,Se,Re),pe=new Fg(U,Se,Re),ut=new sm(U),Ne=new bg,b=new Bg(U,Se,pe,Ne,Re,fe,ut),_=new Zp(x),I=new em(x),J=new uh(U,Re),ke=new qp(U,Se,J,Re),Z=new nm(U,J,ut,ke),ee=new lm(U,Z,J,ut),Ve=new om(U,Re,b),Oe=new Kp(Ne),me=new Mg(x,_,I,Se,Re,ke,Oe),le=new Vg(x,Ne),he=new Ag,be=new Dg(Se,Re),Qe=new Xp(x,_,I,pe,ee,f,l),K=new Og(x,ee,Re),Je=new Wg(U,ut,Re,pe),Ce=new Yp(U,Se,ut,Re),ve=new im(U,Se,ut,Re),ut.programs=me.programs,x.capabilities=Re,x.extensions=Se,x.properties=Ne,x.renderLists=he,x.shadowMap=K,x.state=pe,x.info=ut}pt();const $e=new Gg(x,U);this.xr=$e,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const E=Se.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Se.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(E){E!==void 0&&(q=E,this.setSize(O,z,!1))},this.getSize=function(E){return E.set(O,z)},this.setSize=function(E,L,N=!0){if($e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,z=L,t.width=Math.floor(E*q),t.height=Math.floor(L*q),N===!0&&(t.style.width=E+"px",t.style.height=L+"px"),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set(O*q,z*q).floor()},this.setDrawingBufferSize=function(E,L,N){O=E,z=L,q=N,t.width=Math.floor(E*N),t.height=Math.floor(L*N),this.setViewport(0,0,E,L)},this.getCurrentViewport=function(E){return E.copy(T)},this.getViewport=function(E){return E.copy(Y)},this.setViewport=function(E,L,N,F){E.isVector4?Y.set(E.x,E.y,E.z,E.w):Y.set(E,L,N,F),pe.viewport(T.copy(Y).multiplyScalar(q).floor())},this.getScissor=function(E){return E.copy(ne)},this.setScissor=function(E,L,N,F){E.isVector4?ne.set(E.x,E.y,E.z,E.w):ne.set(E,L,N,F),pe.scissor(B.copy(ne).multiplyScalar(q).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(E){pe.setScissorTest(ie=E)},this.setOpaqueSort=function(E){W=E},this.setTransparentSort=function(E){X=E},this.getClearColor=function(E){return E.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(E=!0,L=!0,N=!0){let F=0;if(E){let k=!1;if(w!==null){const de=w.texture.format;k=de===Dl||de===Ll||de===Pl}if(k){const de=w.texture.type,ge=de===jn||de===Wn||de===va||de===hi||de===Cl||de===Rl,Me=Qe.getClearColor(),we=Qe.getClearAlpha(),Fe=Me.r,Pe=Me.g,De=Me.b;ge?(u[0]=Fe,u[1]=Pe,u[2]=De,u[3]=we,U.clearBufferuiv(U.COLOR,0,u)):(g[0]=Fe,g[1]=Pe,g[2]=De,g[3]=we,U.clearBufferiv(U.COLOR,0,g))}else F|=U.COLOR_BUFFER_BIT}L&&(F|=U.DEPTH_BUFFER_BIT),N&&(F|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),he.dispose(),be.dispose(),Ne.dispose(),_.dispose(),I.dispose(),ee.dispose(),ke.dispose(),Je.dispose(),me.dispose(),$e.dispose(),$e.removeEventListener("sessionstart",Bt),$e.removeEventListener("sessionend",at),_e&&(_e.dispose(),_e=null),$t.stop()};function se(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=ut.autoReset,L=K.enabled,N=K.autoUpdate,F=K.needsUpdate,k=K.type;pt(),ut.autoReset=E,K.enabled=L,K.autoUpdate=N,K.needsUpdate=F,K.type=k}function ae(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function oe(E){const L=E.target;L.removeEventListener("dispose",oe),Ae(L)}function Ae(E){Ee(E),Ne.remove(E)}function Ee(E){const L=Ne.get(E).programs;L!==void 0&&(L.forEach(function(N){me.releaseProgram(N)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,N,F,k,de){L===null&&(L=Te);const ge=k.isMesh&&k.matrixWorld.determinant()<0,Me=Sc(E,L,N,F,k);pe.setMaterial(F,ge);let we=N.index,Fe=1;if(F.wireframe===!0){if(we=Z.getWireframeAttribute(N),we===void 0)return;Fe=2}const Pe=N.drawRange,De=N.attributes.position;let gt=Pe.start*Fe,jt=(Pe.start+Pe.count)*Fe;de!==null&&(gt=Math.max(gt,de.start*Fe),jt=Math.min(jt,(de.start+de.count)*Fe)),we!==null?(gt=Math.max(gt,0),jt=Math.min(jt,we.count)):De!=null&&(gt=Math.max(gt,0),jt=Math.min(jt,De.count));const bt=jt-gt;if(bt<0||bt===1/0)return;ke.setup(k,F,Me,N,we);let bn,ht=Ce;if(we!==null&&(bn=J.get(we),ht=ve,ht.setIndex(bn)),k.isMesh)F.wireframe===!0?(pe.setLineWidth(F.wireframeLinewidth*Xe()),ht.setMode(U.LINES)):ht.setMode(U.TRIANGLES);else if(k.isLine){let He=F.linewidth;He===void 0&&(He=1),pe.setLineWidth(He*Xe()),k.isLineSegments?ht.setMode(U.LINES):k.isLineLoop?ht.setMode(U.LINE_LOOP):ht.setMode(U.LINE_STRIP)}else k.isPoints?ht.setMode(U.POINTS):k.isSprite&&ht.setMode(U.TRIANGLES);if(k.isBatchedMesh)ht.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)ht.renderInstances(gt,bt,k.count);else if(N.isInstancedBufferGeometry){const He=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,mr=Math.min(N.instanceCount,He);ht.renderInstances(gt,bt,mr)}else ht.render(gt,bt)};function st(E,L,N){E.transparent===!0&&E.side===Un&&E.forceSinglePass===!1?(E.side=qt,E.needsUpdate=!0,Es(E,L,N),E.side=En,E.needsUpdate=!0,Es(E,L,N),E.side=Un):Es(E,L,N)}this.compile=function(E,L,N=null){N===null&&(N=E),m=be.get(N),m.init(),v.push(m),N.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),E!==N&&E.traverseVisible(function(k){k.isLight&&k.layers.test(L.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights(x._useLegacyLights);const F=new Set;return E.traverse(function(k){const de=k.material;if(de)if(Array.isArray(de))for(let ge=0;ge<de.length;ge++){const Me=de[ge];st(Me,N,k),F.add(Me)}else st(de,N,k),F.add(de)}),v.pop(),m=null,F},this.compileAsync=function(E,L,N=null){const F=this.compile(E,L,N);return new Promise(k=>{function de(){if(F.forEach(function(ge){Ne.get(ge).currentProgram.isReady()&&F.delete(ge)}),F.size===0){k(E);return}setTimeout(de,10)}Se.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let rt=null;function Mt(E){rt&&rt(E)}function Bt(){$t.stop()}function at(){$t.start()}const $t=new jl;$t.setAnimationLoop(Mt),typeof self<"u"&&$t.setContext(self),this.setAnimationLoop=function(E){rt=E,$e.setAnimationLoop(E),E===null?$t.stop():$t.start()},$e.addEventListener("sessionstart",Bt),$e.addEventListener("sessionend",at),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&($e.cameraAutoUpdate===!0&&$e.updateCamera(L),L=$e.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,L,w),m=be.get(E,v.length),m.init(),v.push(m),xe.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),$.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,j=Oe.init(this.clippingPlanes,ce),y=he.get(E,p.length),y.init(),p.push(y),mn(E,L,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(W,X),this.info.render.frame++,j===!0&&Oe.beginShadows();const N=m.state.shadowsArray;if(K.render(N,E,L),j===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qe.render(y,E),m.setupLights(x._useLegacyLights),L.isArrayCamera){const F=L.cameras;for(let k=0,de=F.length;k<de;k++){const ge=F[k];Ca(y,E,ge,ge.viewport)}}else Ca(y,E,L);w!==null&&(b.updateMultisampleRenderTarget(w),b.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(x,E,L),ke.resetDefaultState(),G=-1,S=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function mn(E,L,N,F){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)N=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$.intersectsSprite(E)){F&&Ue.setFromMatrixPosition(E.matrixWorld).applyMatrix4(xe);const ge=ee.update(E),Me=E.material;Me.visible&&y.push(E,ge,Me,N,Ue.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$.intersectsObject(E))){const ge=ee.update(E),Me=E.material;if(F&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ue.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ue.copy(ge.boundingSphere.center)),Ue.applyMatrix4(E.matrixWorld).applyMatrix4(xe)),Array.isArray(Me)){const we=ge.groups;for(let Fe=0,Pe=we.length;Fe<Pe;Fe++){const De=we[Fe],gt=Me[De.materialIndex];gt&&gt.visible&&y.push(E,ge,gt,N,Ue.z,De)}}else Me.visible&&y.push(E,ge,Me,N,Ue.z,null)}}const de=E.children;for(let ge=0,Me=de.length;ge<Me;ge++)mn(de[ge],L,N,F)}function Ca(E,L,N,F){const k=E.opaque,de=E.transmissive,ge=E.transparent;m.setupLightsView(N),j===!0&&Oe.setGlobalState(x.clippingPlanes,N),de.length>0&&vc(k,de,L,N),F&&pe.viewport(T.copy(F)),k.length>0&&Ss(k,L,N),de.length>0&&Ss(de,L,N),ge.length>0&&Ss(ge,L,N),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function vc(E,L,N,F){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;const de=Re.isWebGL2;_e===null&&(_e=new mi(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?ps:jn,minFilter:fs,samples:de?4:0})),x.getDrawingBufferSize(Le),de?_e.setSize(Le.x,Le.y):_e.setSize(da(Le.x),da(Le.y));const ge=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(te),R=x.getClearAlpha(),R<1&&x.setClearColor(16777215,.5),x.clear();const Me=x.toneMapping;x.toneMapping=Yn,Ss(E,N,F),b.updateMultisampleRenderTarget(_e),b.updateRenderTargetMipmap(_e);let we=!1;for(let Fe=0,Pe=L.length;Fe<Pe;Fe++){const De=L[Fe],gt=De.object,jt=De.geometry,bt=De.material,bn=De.group;if(bt.side===Un&&gt.layers.test(F.layers)){const ht=bt.side;bt.side=qt,bt.needsUpdate=!0,Ra(gt,N,F,jt,bt,bn),bt.side=ht,bt.needsUpdate=!0,we=!0}}we===!0&&(b.updateMultisampleRenderTarget(_e),b.updateRenderTargetMipmap(_e)),x.setRenderTarget(ge),x.setClearColor(te,R),x.toneMapping=Me}function Ss(E,L,N){const F=L.isScene===!0?L.overrideMaterial:null;for(let k=0,de=E.length;k<de;k++){const ge=E[k],Me=ge.object,we=ge.geometry,Fe=F===null?ge.material:F,Pe=ge.group;Me.layers.test(N.layers)&&Ra(Me,L,N,we,Fe,Pe)}}function Ra(E,L,N,F,k,de){E.onBeforeRender(x,L,N,F,k,de),E.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(x,L,N,F,E,de),k.transparent===!0&&k.side===Un&&k.forceSinglePass===!1?(k.side=qt,k.needsUpdate=!0,x.renderBufferDirect(N,L,F,k,E,de),k.side=En,k.needsUpdate=!0,x.renderBufferDirect(N,L,F,k,E,de),k.side=Un):x.renderBufferDirect(N,L,F,k,E,de),E.onAfterRender(x,L,N,F,k,de)}function Es(E,L,N){L.isScene!==!0&&(L=Te);const F=Ne.get(E),k=m.state.lights,de=m.state.shadowsArray,ge=k.state.version,Me=me.getParameters(E,k.state,de,L,N),we=me.getProgramCacheKey(Me);let Fe=F.programs;F.environment=E.isMeshStandardMaterial?L.environment:null,F.fog=L.fog,F.envMap=(E.isMeshStandardMaterial?I:_).get(E.envMap||F.environment),Fe===void 0&&(E.addEventListener("dispose",oe),Fe=new Map,F.programs=Fe);let Pe=Fe.get(we);if(Pe!==void 0){if(F.currentProgram===Pe&&F.lightsStateVersion===ge)return La(E,Me),Pe}else Me.uniforms=me.getUniforms(E),E.onBuild(N,Me,x),E.onBeforeCompile(Me,x),Pe=me.acquireProgram(Me,we),Fe.set(we,Pe),F.uniforms=Me.uniforms;const De=F.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(De.clippingPlanes=Oe.uniform),La(E,Me),F.needsLights=Mc(E),F.lightsStateVersion=ge,F.needsLights&&(De.ambientLightColor.value=k.state.ambient,De.lightProbe.value=k.state.probe,De.directionalLights.value=k.state.directional,De.directionalLightShadows.value=k.state.directionalShadow,De.spotLights.value=k.state.spot,De.spotLightShadows.value=k.state.spotShadow,De.rectAreaLights.value=k.state.rectArea,De.ltc_1.value=k.state.rectAreaLTC1,De.ltc_2.value=k.state.rectAreaLTC2,De.pointLights.value=k.state.point,De.pointLightShadows.value=k.state.pointShadow,De.hemisphereLights.value=k.state.hemi,De.directionalShadowMap.value=k.state.directionalShadowMap,De.directionalShadowMatrix.value=k.state.directionalShadowMatrix,De.spotShadowMap.value=k.state.spotShadowMap,De.spotLightMatrix.value=k.state.spotLightMatrix,De.spotLightMap.value=k.state.spotLightMap,De.pointShadowMap.value=k.state.pointShadowMap,De.pointShadowMatrix.value=k.state.pointShadowMatrix),F.currentProgram=Pe,F.uniformsList=null,Pe}function Pa(E){if(E.uniformsList===null){const L=E.currentProgram.getUniforms();E.uniformsList=qs.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function La(E,L){const N=Ne.get(E);N.outputColorSpace=L.outputColorSpace,N.batching=L.batching,N.instancing=L.instancing,N.instancingColor=L.instancingColor,N.skinning=L.skinning,N.morphTargets=L.morphTargets,N.morphNormals=L.morphNormals,N.morphColors=L.morphColors,N.morphTargetsCount=L.morphTargetsCount,N.numClippingPlanes=L.numClippingPlanes,N.numIntersection=L.numClipIntersection,N.vertexAlphas=L.vertexAlphas,N.vertexTangents=L.vertexTangents,N.toneMapping=L.toneMapping}function Sc(E,L,N,F,k){L.isScene!==!0&&(L=Te),b.resetTextureUnits();const de=L.fog,ge=F.isMeshStandardMaterial?L.environment:null,Me=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:On,we=(F.isMeshStandardMaterial?I:_).get(F.envMap||ge),Fe=F.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Pe=!!N.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),De=!!N.morphAttributes.position,gt=!!N.morphAttributes.normal,jt=!!N.morphAttributes.color;let bt=Yn;F.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(bt=x.toneMapping);const bn=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ht=bn!==void 0?bn.length:0,He=Ne.get(F),mr=m.state.lights;if(j===!0&&(ce===!0||E!==S)){const tn=E===S&&F.id===G;Oe.setState(F,E,tn)}let mt=!1;F.version===He.__version?(He.needsLights&&He.lightsStateVersion!==mr.state.version||He.outputColorSpace!==Me||k.isBatchedMesh&&He.batching===!1||!k.isBatchedMesh&&He.batching===!0||k.isInstancedMesh&&He.instancing===!1||!k.isInstancedMesh&&He.instancing===!0||k.isSkinnedMesh&&He.skinning===!1||!k.isSkinnedMesh&&He.skinning===!0||k.isInstancedMesh&&He.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&He.instancingColor===!1&&k.instanceColor!==null||He.envMap!==we||F.fog===!0&&He.fog!==de||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Oe.numPlanes||He.numIntersection!==Oe.numIntersection)||He.vertexAlphas!==Fe||He.vertexTangents!==Pe||He.morphTargets!==De||He.morphNormals!==gt||He.morphColors!==jt||He.toneMapping!==bt||Re.isWebGL2===!0&&He.morphTargetsCount!==ht)&&(mt=!0):(mt=!0,He.__version=F.version);let Kn=He.currentProgram;mt===!0&&(Kn=Es(F,L,k));let Da=!1,ts=!1,gr=!1;const Pt=Kn.getUniforms(),Zn=He.uniforms;if(pe.useProgram(Kn.program)&&(Da=!0,ts=!0,gr=!0),F.id!==G&&(G=F.id,ts=!0),Da||S!==E){Pt.setValue(U,"projectionMatrix",E.projectionMatrix),Pt.setValue(U,"viewMatrix",E.matrixWorldInverse);const tn=Pt.map.cameraPosition;tn!==void 0&&tn.setValue(U,Ue.setFromMatrixPosition(E.matrixWorld)),Re.logarithmicDepthBuffer&&Pt.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Pt.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,ts=!0,gr=!0)}if(k.isSkinnedMesh){Pt.setOptional(U,k,"bindMatrix"),Pt.setOptional(U,k,"bindMatrixInverse");const tn=k.skeleton;tn&&(Re.floatVertexTextures?(tn.boneTexture===null&&tn.computeBoneTexture(),Pt.setValue(U,"boneTexture",tn.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(Pt.setOptional(U,k,"batchingTexture"),Pt.setValue(U,"batchingTexture",k._matricesTexture,b));const yr=N.morphAttributes;if((yr.position!==void 0||yr.normal!==void 0||yr.color!==void 0&&Re.isWebGL2===!0)&&Ve.update(k,N,Kn),(ts||He.receiveShadow!==k.receiveShadow)&&(He.receiveShadow=k.receiveShadow,Pt.setValue(U,"receiveShadow",k.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Zn.envMap.value=we,Zn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),ts&&(Pt.setValue(U,"toneMappingExposure",x.toneMappingExposure),He.needsLights&&Ec(Zn,gr),de&&F.fog===!0&&le.refreshFogUniforms(Zn,de),le.refreshMaterialUniforms(Zn,F,q,z,_e),qs.upload(U,Pa(He),Zn,b)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(qs.upload(U,Pa(He),Zn,b),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Pt.setValue(U,"center",k.center),Pt.setValue(U,"modelViewMatrix",k.modelViewMatrix),Pt.setValue(U,"normalMatrix",k.normalMatrix),Pt.setValue(U,"modelMatrix",k.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const tn=F.uniformsGroups;for(let xr=0,bc=tn.length;xr<bc;xr++)if(Re.isWebGL2){const Ua=tn[xr];Je.update(Ua,Kn),Je.bind(Ua,Kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Kn}function Ec(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function Mc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,L,N){Ne.get(E.texture).__webglTexture=L,Ne.get(E.depthTexture).__webglTexture=N;const F=Ne.get(E);F.__hasExternalTextures=!0,F.__hasExternalTextures&&(F.__autoAllocateDepthBuffer=N===void 0,F.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,L){const N=Ne.get(E);N.__webglFramebuffer=L,N.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(E,L=0,N=0){w=E,P=L,A=N;let F=!0,k=null,de=!1,ge=!1;if(E){const we=Ne.get(E);we.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(U.FRAMEBUFFER,null),F=!1):we.__webglFramebuffer===void 0?b.setupRenderTarget(E):we.__hasExternalTextures&&b.rebindTextures(E,Ne.get(E.texture).__webglTexture,Ne.get(E.depthTexture).__webglTexture);const Fe=E.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(ge=!0);const Pe=Ne.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[L])?k=Pe[L][N]:k=Pe[L],de=!0):Re.isWebGL2&&E.samples>0&&b.useMultisampledRTT(E)===!1?k=Ne.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?k=Pe[N]:k=Pe,T.copy(E.viewport),B.copy(E.scissor),H=E.scissorTest}else T.copy(Y).multiplyScalar(q).floor(),B.copy(ne).multiplyScalar(q).floor(),H=ie;if(pe.bindFramebuffer(U.FRAMEBUFFER,k)&&Re.drawBuffers&&F&&pe.drawBuffers(E,k),pe.viewport(T),pe.scissor(B),pe.setScissorTest(H),de){const we=Ne.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,we.__webglTexture,N)}else if(ge){const we=Ne.get(E.texture),Fe=L||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,we.__webglTexture,N||0,Fe)}G=-1},this.readRenderTargetPixels=function(E,L,N,F,k,de,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ne.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){pe.bindFramebuffer(U.FRAMEBUFFER,Me);try{const we=E.texture,Fe=we.format,Pe=we.type;if(Fe!==hn&&fe.convert(Fe)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=Pe===ps&&(Se.has("EXT_color_buffer_half_float")||Re.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Pe!==jn&&fe.convert(Pe)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Xn&&(Re.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-F&&N>=0&&N<=E.height-k&&U.readPixels(L,N,F,k,fe.convert(Fe),fe.convert(Pe),de)}finally{const we=w!==null?Ne.get(w).__webglFramebuffer:null;pe.bindFramebuffer(U.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(E,L,N=0){const F=Math.pow(2,-N),k=Math.floor(L.image.width*F),de=Math.floor(L.image.height*F);b.setTexture2D(L,0),U.copyTexSubImage2D(U.TEXTURE_2D,N,0,0,E.x,E.y,k,de),pe.unbindTexture()},this.copyTextureToTexture=function(E,L,N,F=0){const k=L.image.width,de=L.image.height,ge=fe.convert(N.format),Me=fe.convert(N.type);b.setTexture2D(N,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment),L.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,E.x,E.y,k,de,ge,Me,L.image.data):L.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,E.x,E.y,L.mipmaps[0].width,L.mipmaps[0].height,ge,L.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,F,E.x,E.y,ge,Me,L.image),F===0&&N.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(E,L,N,F,k=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=E.max.x-E.min.x+1,ge=E.max.y-E.min.y+1,Me=E.max.z-E.min.z+1,we=fe.convert(F.format),Fe=fe.convert(F.type);let Pe;if(F.isData3DTexture)b.setTexture3D(F,0),Pe=U.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)b.setTexture2DArray(F,0),Pe=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const De=U.getParameter(U.UNPACK_ROW_LENGTH),gt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),jt=U.getParameter(U.UNPACK_SKIP_PIXELS),bt=U.getParameter(U.UNPACK_SKIP_ROWS),bn=U.getParameter(U.UNPACK_SKIP_IMAGES),ht=N.isCompressedTexture?N.mipmaps[k]:N.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,ht.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ht.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,E.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,E.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,E.min.z),N.isDataTexture||N.isData3DTexture?U.texSubImage3D(Pe,k,L.x,L.y,L.z,de,ge,Me,we,Fe,ht.data):N.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Pe,k,L.x,L.y,L.z,de,ge,Me,we,ht.data)):U.texSubImage3D(Pe,k,L.x,L.y,L.z,de,ge,Me,we,Fe,ht),U.pixelStorei(U.UNPACK_ROW_LENGTH,De),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,gt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,jt),U.pixelStorei(U.UNPACK_SKIP_ROWS,bt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,bn),k===0&&F.generateMipmaps&&U.generateMipmap(Pe),pe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?b.setTextureCube(E,0):E.isData3DTexture?b.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?b.setTexture2DArray(E,0):b.setTexture2D(E,0),pe.unbindTexture()},this.resetState=function(){P=0,A=0,w=null,pe.reset(),ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Sa?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===dr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ct?pi:kl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===pi?Ct:On}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Xg extends ic{}Xg.prototype.isWebGL1Renderer=!0;class qg extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class sc extends fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cl=new D,dl=new D,ul=new wt,Zr=new $l,Ws=new ur;class Yg extends Yt{constructor(e=new Mn,t=new sc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)cl.fromBufferAttribute(t,s-1),dl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=cl.distanceTo(dl);e.setAttribute("lineDistance",new pn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(s),Ws.radius+=r,e.ray.intersectsSphere(Ws)===!1)return;ul.copy(s).invert(),Zr.copy(e.ray).applyMatrix4(ul);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new D,d=new D,h=new D,f=new D,u=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=p,M=v-1;x<M;x+=u){const P=g.getX(x),A=g.getX(x+1);if(c.fromBufferAttribute(m,P),d.fromBufferAttribute(m,A),Zr.distanceSqToSegment(c,d,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const G=e.ray.origin.distanceTo(f);G<e.near||G>e.far||t.push({distance:G,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=p,M=v-1;x<M;x+=u){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),Zr.distanceSqToSegment(c,d,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class kn extends Vt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const hl={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class jg{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=c.length;h<f;h+=2){const u=c[h],g=c[h+1];if(u.global&&(u.lastIndex=0),u.test(d))return g}return null}}}const Kg=new jg;class Ma{constructor(e){this.manager=e!==void 0?e:Kg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ma.DEFAULT_MATERIAL_NAME="__DEFAULT";class Zg extends Ma{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=hl.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=ms("img");function l(){d(),hl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class yi extends Ma{constructor(e){super(e)}load(e,t,n,s){const r=new Vt,o=new Zg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_a}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_a);const Jg="/assets/Overworld-D95CtR7o.png",pr="/assets/hoverselect-03w42iXs.png";var ze=(i=>(i.ON_PERFORM_BASIC_ATTACK="ON_PERFORM_BASIC_ATTACK",i.ON_RECEIVE_BASIC_ATTACK="ON_RECEIVE_BASIC_ATTACK",i.ON_PERFORM_SKILL_DAMAGE="ON_PERFORM_SKILL_DAMAGE",i.ON_RECEIVE_SKILL_DAMAGE="ON_RECEIVE_SKILL_DAMAGE",i.ON_PERFORM_MOVEMENT="ON_PERFORM_MOVEMENT",i.ON_PERFORM_ANY_SKILL="ON_PERFORM_ANY_SKILL",i.ON_PERFORM_ACTION_EXCEPT_MOVEMENT="ON_PERFORM_ACTION_EXCEPT_MOVEMENT",i.ON_PERFORM_SKILL_HEAL="ON_PERFORM_SKILL_HEAL",i.ON_RECEIVE_SKILL_HEAL="ON_RECEIVE_SKILL_HEAL",i.ON_ROUND_END="ON_ROUND_END",i.ON_DEAL_DAMAGE_TO_NON_APPLIER="ON_DEAL_DAMAGE_TO_NON_APPLIER",i))(ze||{});const os={STRENGTH:{key:"STRENGTH",name:"Strength",description:"Basic Attack does +1 damage per stack.",triggerType:ze.ON_PERFORM_BASIC_ATTACK,triggerDescription:"Perform a Basic Attack"},WEAK:{key:"WEAK",name:"Weak",description:"Basic Attack does -1 damage per stack.",triggerType:ze.ON_PERFORM_BASIC_ATTACK,triggerDescription:"Perform a Basic Attack"},EXPOSED:{key:"EXPOSED",name:"Exposed",description:"Take 1 more damage per stack from Basic Attacks that target you.",triggerType:ze.ON_RECEIVE_BASIC_ATTACK,triggerDescription:"Be the target of a Basic Attack"},STURDY:{key:"STURDY",name:"Sturdy",description:"Take 1 less damage per stack from Basic Attacks that target you.",triggerType:ze.ON_RECEIVE_BASIC_ATTACK,triggerDescription:"Be the target of a Basic Attack"},LEECH:{key:"LEECH",name:"Leech",description:"Give 1 Health per stack to the Unit that applied this Modifier to you.",triggerType:ze.ON_RECEIVE_BASIC_ATTACK,triggerDescription:"Be the target of a Basic Attack"},COUNTER:{key:"COUNTER",name:"Counter",description:"Deal 1 damage per stack to the Unit that targets you with a Basic Attack.",triggerType:ze.ON_RECEIVE_BASIC_ATTACK,triggerDescription:"Be the target of a Basic Attack"},BURN:{key:"BURN",name:"Burn",description:"Take 1 damage per stack.",triggerType:ze.ON_PERFORM_BASIC_ATTACK,triggerDescription:"Perform a Basic Attack"},FOCUS:{key:"FOCUS",name:"Focus",description:"Skills do +1 damage per stack.",triggerType:ze.ON_PERFORM_SKILL_DAMAGE,triggerDescription:"Perform a Skill which deals Damage"},CONFUSION:{key:"CONFUSION",name:"Confusion",description:"Skills do -1 damage per stack.",triggerType:ze.ON_PERFORM_SKILL_DAMAGE,triggerDescription:"Perform a Skill which deals Damage"},WARD:{key:"WARD",name:"Ward",description:"Take 1 less damage per stack from Skills that target you.",triggerType:ze.ON_RECEIVE_SKILL_DAMAGE,triggerDescription:"Be the target of a Skill which deals Damage to you"},WET:{key:"WET",name:"Wet",description:"Take 1 more damage per stack from Skills that target you.",triggerType:ze.ON_RECEIVE_SKILL_DAMAGE,triggerDescription:"Be the target of a Skill which deals Damage to you"},SAP:{key:"SAP",name:"Sap",description:"Give 1 Energy per stack to the Unit that applied this Modifier to you.",triggerType:ze.ON_RECEIVE_SKILL_DAMAGE,triggerDescription:"Be the target of a Skill which deals Damage to you"},MIRROR:{key:"MIRROR",name:"Mirror",description:"Deal 1 damage per stack to the Unit that targets you with a Skill.",triggerType:ze.ON_RECEIVE_SKILL_DAMAGE,triggerDescription:"Be the target of a Skill which deals Damage to you"},HASTE:{key:"HASTE",name:"Haste",description:"Movement range is increased by 1 per stack.",triggerType:ze.ON_PERFORM_MOVEMENT,triggerDescription:"Perform any movement"},SLOW:{key:"SLOW",name:"Slow",description:"Movement range is decreased by 1 per stack.",triggerType:ze.ON_PERFORM_MOVEMENT,triggerDescription:"Perform any movement"},BLEED:{key:"BLEED",name:"Bleed",description:"Take 1 damage per stack per Tile moved.",triggerType:ze.ON_PERFORM_MOVEMENT,triggerDescription:"Perform any movement"},TIRED:{key:"TIRED",name:"Tired",description:"Lose 1 energy per stack per Tile moved.",triggerType:ze.ON_PERFORM_MOVEMENT,triggerDescription:"Perform any movement"},HEADACHE:{key:"HEADACHE",name:"Headache",description:"Take 1 damage per stack.",triggerType:ze.ON_PERFORM_ANY_SKILL,triggerDescription:"Perform any Skill"},SHOCKED:{key:"SHOCKED",name:"Shocked",description:"Lose 1 Energy per stack.",triggerType:ze.ON_PERFORM_ACTION_EXCEPT_MOVEMENT,triggerDescription:"Perform an action besides movement"},BLESSED:{key:"BLESSED",name:"Blessed",description:"Restore +1 Health per stack.",triggerType:ze.ON_RECEIVE_SKILL_HEAL,triggerDescription:"Be the target of a Skill that restores Health"},CURSED:{key:"CURSED",name:"Cursed",description:"Restore -1 Health per stack.",triggerType:ze.ON_RECEIVE_SKILL_HEAL,triggerDescription:"Be the target of a Skill that restores Health"},FAITH:{key:"FAITH",name:"Faith",description:"Restore 1 more Health per stack with a Skill that restores Health.",triggerType:ze.ON_PERFORM_SKILL_HEAL,triggerDescription:"Perform a Skill that restores Health"},DOUBT:{key:"DOUBT",name:"Doubt",description:"Restore 1 less Health per stack with a Skill that restores Health.",triggerType:ze.ON_PERFORM_SKILL_HEAL,triggerDescription:"Perform a Skill that restores Health"},TOXICITY:{key:"TOXICITY",name:"Toxicity",description:"Take 1 damage per stack.",triggerType:ze.ON_ROUND_END,triggerDescription:"The Round ends"},LEAK:{key:"LEAK",name:"Leak",description:"Lose 1 Energy per stack.",triggerType:ze.ON_ROUND_END,triggerDescription:"The Round ends"},GLITCHED:{key:"GLITCHED",name:"Glitched",description:"Teleport to 1 random Tile on the map (effect happens once regardless of stacks, then consumes).",triggerType:ze.ON_ROUND_END,triggerDescription:"The Round ends"},WISH:{key:"WISH",name:"Wish",description:"Gain 1 Health per stack.",triggerType:ze.ON_ROUND_END,triggerDescription:"The Round ends"},CHARGE:{key:"CHARGE",name:"Charge",description:"Gain 1 Energy per stack.",triggerType:ze.ON_ROUND_END,triggerDescription:"The Round ends"},ANGER:{key:"ANGER",name:"Anger",description:"Take 1 damage per stack.",triggerType:ze.ON_DEAL_DAMAGE_TO_NON_APPLIER,triggerDescription:"Deal damage to any target besides the one which applied this Modifier to you"}};class je{static applyModifier(e,t,n,s){const r=os[t];if(!r)return console.warn(`❌ Unknown modifier: ${t}`),!1;const o=e.activeModifiers.find(a=>a.modifierKey===t);if(o)o.stacks+=n,console.log(`🔄 Added ${n} stacks of ${r.name} to ${e.name} (Total: ${o.stacks})`);else{const a={modifierKey:t,stacks:n,sourceUnitId:s};e.activeModifiers.push(a),console.log(`✨ Applied ${n} stacks of ${r.name} to ${e.name}`)}return!0}static removeModifierStacks(e,t,n){const s=e.activeModifiers.findIndex(a=>a.modifierKey===t);if(s===-1)return;const r=e.activeModifiers[s],o=os[t];n>=r.stacks?(e.activeModifiers.splice(s,1),console.log(`🗑️ Removed all ${r.stacks} stacks of ${o?.name||t} from ${e.name}`)):(r.stacks-=n,console.log(`🔽 Removed ${n} stacks of ${o?.name||t} from ${e.name} (${r.stacks} remaining)`))}static getModifiersByTrigger(e,t){return e.activeModifiers.map(n=>({modifier:n,definition:os[n.modifierKey]})).filter(({definition:n})=>n&&n.triggerType===t)}static processBasicAttackDamageModifiers(e,t){let n=t;const s=[],r=this.getModifiersByTrigger(e,ze.ON_PERFORM_BASIC_ATTACK);for(const{modifier:o,definition:a}of r){switch(a.key){case"STRENGTH":n+=o.stacks,s.push(`+${o.stacks} damage from Strength`);break;case"WEAK":n-=o.stacks,s.push(`-${o.stacks} damage from Weak`);break;case"BURN":e.currentHealth=Math.max(0,e.currentHealth-o.stacks),s.push(`${o.stacks} self-damage from Burn`);break}this.removeModifierStacks(e,o.modifierKey,o.stacks)}return{finalDamage:Math.max(0,n),triggeredModifiers:s}}static processBasicAttackDefenseModifiers(e,t,n){let s=t;const r=[],o=this.getModifiersByTrigger(e,ze.ON_RECEIVE_BASIC_ATTACK);for(const{modifier:a,definition:l}of o){switch(l.key){case"EXPOSED":s+=a.stacks,r.push(`+${a.stacks} damage from Exposed`);break;case"STURDY":s-=a.stacks,r.push(`-${a.stacks} damage from Sturdy`);break;case"LEECH":const c=this.findUnitById(a.sourceUnitId);c&&(c.currentHealth=Math.min(c.health,c.currentHealth+a.stacks),r.push(`${a.stacks} health to ${c.name} from Leech`));break;case"COUNTER":n.currentHealth=Math.max(0,n.currentHealth-a.stacks),r.push(`${a.stacks} counter damage to ${n.name}`);break}this.removeModifierStacks(e,a.modifierKey,a.stacks)}return{finalDamage:Math.max(0,s),triggeredModifiers:r}}static processSkillDamageModifiers(e,t){let n=t;const s=[],r=this.getModifiersByTrigger(e,ze.ON_PERFORM_SKILL_DAMAGE);for(const{modifier:o,definition:a}of r){switch(a.key){case"FOCUS":n+=o.stacks,s.push(`+${o.stacks} damage from Focus`);break;case"CONFUSION":n-=o.stacks,s.push(`-${o.stacks} damage from Confusion`);break}this.removeModifierStacks(e,o.modifierKey,o.stacks)}return{finalDamage:Math.max(0,n),triggeredModifiers:s}}static processSkillDamageDefenseModifiers(e,t,n){let s=t;const r=[],o=this.getModifiersByTrigger(e,ze.ON_RECEIVE_SKILL_DAMAGE);for(const{modifier:a,definition:l}of o){switch(l.key){case"WET":s+=a.stacks,r.push(`+${a.stacks} damage from Wet`);break;case"WARD":s-=a.stacks,r.push(`-${a.stacks} damage from Ward`);break;case"SAP":const c=this.findUnitById(a.sourceUnitId);c&&(c.currentEnergy=Math.min(c.maxEnergy,c.currentEnergy+a.stacks),r.push(`${a.stacks} energy to ${c.name} from Sap`));break;case"MIRROR":n.currentHealth=Math.max(0,n.currentHealth-a.stacks),r.push(`${a.stacks} mirror damage to ${n.name}`);break}this.removeModifierStacks(e,a.modifierKey,a.stacks)}return{finalDamage:Math.max(0,s),triggeredModifiers:r}}static processMovementModifiers(e,t,n){let s=t;const r=[],o=this.getModifiersByTrigger(e,ze.ON_PERFORM_MOVEMENT);for(const{modifier:a,definition:l}of o){switch(l.key){case"HASTE":s+=a.stacks,r.push(`+${a.stacks} movement from Haste`);break;case"SLOW":s-=a.stacks,r.push(`-${a.stacks} movement from Slow`);break;case"BLEED":const c=a.stacks*n;if(c>0){const h=e.currentHealth;e.currentHealth=Math.max(0,e.currentHealth-c),r.push(`${c} damage from Bleed (${a.stacks} per tile × ${n} tiles)`),console.log(`🩸 ${e.name} takes ${c} bleed damage: ${h} → ${e.currentHealth}/${e.health}`)}break;case"TIRED":const d=a.stacks*n;if(d>0){const h=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-d),r.push(`${d} energy lost from Tired (${a.stacks} per tile × ${n} tiles)`),console.log(`😴 ${e.name} loses ${d} energy from being tired: ${h} → ${e.currentEnergy}/${e.maxEnergy}`)}break}this.removeModifierStacks(e,a.modifierKey,a.stacks)}return s=Math.max(0,s),{modifiedRange:s,triggeredModifiers:r}}static calculateMovementRange(e,t){let n=t;const s=this.getModifiersByTrigger(e,ze.ON_PERFORM_MOVEMENT);for(const{modifier:r,definition:o}of s)switch(o.key){case"HASTE":n+=r.stacks;break;case"SLOW":n-=r.stacks;break}return Math.max(0,n)}static processActionModifiers(e){let t=0;const n=[],s=this.getModifiersByTrigger(e,ze.ON_PERFORM_ACTION_EXCEPT_MOVEMENT);for(const{modifier:r,definition:o}of s){switch(o.key){case"SHOCKED":const a=r.stacks;t+=a,n.push(`-${a} energy from Shocked`),console.log(`⚡ ${e.name} loses ${a} energy from ${r.stacks} Shocked stacks`);break;case"HEADACHE":const l=r.stacks,c=e.currentHealth;e.currentHealth=Math.max(0,e.currentHealth-l),n.push(`-${l} health from Headache`),console.log(`🤕 ${e.name} takes ${l} damage from ${r.stacks} Headache stacks: ${c} → ${e.currentHealth}/${e.health}`);break}this.removeModifierStacks(e,r.modifierKey,r.stacks)}if(t>0){const r=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-t),console.log(`⚡ ${e.name} total energy loss from action modifiers: -${t} (${r} → ${e.currentEnergy}/${e.maxEnergy})`)}return{energyLoss:t,triggeredModifiers:n}}static processRoundEndModifiers(){console.log("🔄 Processing round-end modifiers for all units...");const e=[...ue.playerParty,...ue.enemyUnits],t=[],n=[];if(e.forEach(s=>{if(s.currentHealth<=0)return;const r=this.getModifiersByTrigger(s,ze.ON_ROUND_END);r.length>0&&(console.log(`⏰ Processing round-end modifiers for ${s.name}...`),t.push(s));for(const{modifier:o,definition:a}of r){switch(a.key){case"TOXICITY":const l=o.stacks,c=s.currentHealth;s.currentHealth=Math.max(0,s.currentHealth-l),console.log(`☢️ ${s.name} takes ${l} toxic damage: ${c} → ${s.currentHealth}/${s.health}`),s.currentHealth<=0&&c>0&&(console.log(`💀 ${s.name} died from toxicity!`),n.push(s));break;case"LEAK":const d=o.stacks,h=s.currentEnergy;s.currentEnergy=Math.max(0,s.currentEnergy-d),console.log(`💧 ${s.name} loses ${d} energy from leak: ${h} → ${s.currentEnergy}/${s.maxEnergy}`);break;case"WISH":const f=o.stacks,u=s.currentHealth;s.currentHealth=Math.min(s.health,s.currentHealth+f),console.log(`✨ ${s.name} gains ${f} health from wish: ${u} → ${s.currentHealth}/${s.health}`);break;case"CHARGE":const g=o.stacks,y=s.currentEnergy;s.currentEnergy=Math.min(s.maxEnergy,s.currentEnergy+g),console.log(`⚡ ${s.name} gains ${g} energy from charge: ${y} → ${s.currentEnergy}/${s.maxEnergy}`);break;case"GLITCHED":console.log(`🔀 ${s.name} is glitched and will teleport to a random location!`);break;default:console.warn(`⚠️ Unhandled round-end modifier: ${a.key}`);break}this.removeModifierStacks(s,o.modifierKey,o.stacks)}}),t.length>0){const s=window.GAME_SCENE_INSTANCE;s&&t.forEach(r=>{s.updateUnitBars(r),s.unitRenderer.updateUnitModifiers(r)})}if(n.length>0){const s=window.GAME_SCENE_INSTANCE;s&&n.forEach(r=>{console.log(`☠️ Handling death from round-end modifiers: ${r.name}`),s.handleUnitDeath(r)})}console.log("✅ Round-end modifier processing complete")}static getModifierColor(e){switch(e){case"STRENGTH":return"#3498db";case"STURDY":return"#e67e22";case"WEAK":return"#e74c3c";case"EXPOSED":return"#8e44ad";case"LEECH":return"#27ae60";case"COUNTER":return"#f39c12";case"BURN":return"#e74c3c";case"FOCUS":return"#2ecc71";case"CONFUSION":return"#f39c12";case"WARD":return"#1abc9c";case"WET":return"#3498db";case"SAP":return"#9b59b6";case"MIRROR":return"#ecf0f1";case"HASTE":return"#f1c40f";case"SLOW":return"#95a5a6";case"BLEED":return"#c0392b";case"TIRED":return"#7f8c8d";case"HEADACHE":return"#8e44ad";case"SHOCKED":return"#f1c40f";case"BLESSED":return"#f39c12";case"CURSED":return"#8e44ad";case"FAITH":return"#f39c12";case"DOUBT":return"#7f8c8d";case"TOXICITY":return"#27ae60";case"LEAK":return"#3498db";case"GLITCHED":return"#e74c3c";case"WISH":return"#f39c12";case"CHARGE":return"#f1c40f";case"ANGER":return"#e74c3c";default:return"#bdc3c7"}}static getModifierAbbreviation(e){switch(e){case"STRENGTH":return"STR";case"STURDY":return"STU";case"WEAK":return"WEA";case"EXPOSED":return"EXP";case"LEECH":return"LEE";case"COUNTER":return"CTR";case"BURN":return"BRN";case"FOCUS":return"FOC";case"CONFUSION":return"CON";case"WARD":return"WAR";case"WET":return"WET";case"SAP":return"SAP";case"MIRROR":return"MIR";case"HASTE":return"HAS";case"SLOW":return"SLO";case"BLEED":return"BLD";case"TIRED":return"TIR";case"HEADACHE":return"HED";case"SHOCKED":return"SHK";case"BLESSED":return"BLS";case"CURSED":return"CRS";case"FAITH":return"FAI";case"DOUBT":return"DOT";case"TOXICITY":return"TOX";case"LEAK":return"LEK";case"GLITCHED":return"GLI";case"WISH":return"WSH";case"CHARGE":return"CHG";case"ANGER":return"ANG";default:return"MOD"}}static validateModifierVisuals(){const e=[];let t=!0;const n=Object.keys(os);e.push("🎨 Modifier Visual Representation Report"),e.push(`Total modifiers: ${n.length}`),e.push("---");for(const s of n){const r=this.getModifierColor(s)!=="#bdc3c7",o=this.getModifierAbbreviation(s)!=="MOD";r&&o?e.push(`✅ ${s}: ${this.getModifierAbbreviation(s)} (${this.getModifierColor(s)})`):(t=!1,e.push(`❌ ${s}: Missing ${r?"":"color"} ${o?"":"abbreviation"}`))}return t&&(e.push("---"),e.push(`🎉 All ${n.length} modifiers have complete visual representations!`)),{hasAllVisuals:t,report:e}}static getModifierVisualsReference(){return this.validateModifierVisuals().report.join(`
`)}static findUnitById(e){const t=ue.findUnitById(e);return t||console.warn(`⚠️ Unit not found for ID: ${e}`),t||null}}class Qg{constructor(e=8,t=8){this.occupiedTiles=new Map,this.mapWidth=e,this.mapHeight=t}updateOccupiedTiles(e){this.occupiedTiles.clear();for(const[t,n]of e){const s=`${n.x},${n.y}`;this.occupiedTiles.set(s,t)}}calculateValidMovement(e,t){const n=[],s=new Map,r=e.move||3,o=je.calculateMovementRange(e,r);console.log(`🗺️ Calculating movement for ${e.name} with base range ${r}, modified range ${o} from (${t.x}, ${t.y})`),o!==r&&console.log(`🔥 Movement range modified by ${o-r} (SLOW/HASTE effects)`),console.log("🔍 Unit properties:",{name:e.name,range:e.range,move:e.move,className:e.className});const a=[],l=new Set;for(a.push({pos:t,distance:0,path:[t]}),l.add(`${t.x},${t.y}`);a.length>0;){const{pos:d,distance:h,path:f}=a.shift();if(h>0&&h<=o){const u=`${d.x},${d.y}`;this.occupiedTiles.has(u)?console.log(`❌ Occupied tile at distance ${h}: (${d.x}, ${d.y}) - occupied by ${this.occupiedTiles.get(u)?.name}`):(n.push({x:d.x,y:d.y}),s.set(u,[...f]),console.log(`✅ Valid tile at distance ${h}: (${d.x}, ${d.y})`))}if(h<o){const u=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];for(const g of u){const y={x:d.x+g.x,y:d.y+g.y},m=`${y.x},${y.y}`;y.x>=0&&y.x<this.mapWidth&&y.y>=0&&y.y<this.mapHeight&&!l.has(m)&&(l.add(m),a.push({pos:y,distance:h+1,path:[...f,y]}),console.log(`🔍 Exploring: (${y.x}, ${y.y}) at distance ${h+1}`))}}}console.log(`🎯 Found ${n.length} valid movement tiles with range ${o}`),console.log("📋 Valid tiles by distance:");const c={};for(const d of n){const h=Math.abs(d.x-t.x)+Math.abs(d.y-t.y);c[h]||(c[h]=[]),c[h].push(d)}for(let d=1;d<=o;d++){const h=c[d]||[];console.log(`  Distance ${d}: ${h.length} tiles`,h)}return{validTiles:n,paths:s}}calculateStepPath(e,t){const n=[e],s={x:e.x,y:e.y};for(;s.x!==t.x;)s.x<t.x?s.x++:s.x--,n.push({x:s.x,y:s.y});for(;s.y!==t.y;)s.y<t.y?s.y++:s.y--,n.push({x:s.x,y:s.y});return console.log(`🛤️ Step path from (${e.x},${e.y}) to (${t.x},${t.y}):`,n),n}isValidMovementTile(e,t,n){const s=e.move||3,r=Math.abs(n.x-t.x)+Math.abs(n.y-t.y),o=`${n.x},${n.y}`;return r<=s&&!this.occupiedTiles.has(o)&&n.x>=0&&n.x<this.mapWidth&&n.y>=0&&n.y<this.mapHeight}calculateValidLeapDestinations(e,t,n){const s=[];console.log(`🦘 Calculating leap destinations for ${e.name} with range ${n} from (${t.x}, ${t.y})`);for(let r=0;r<this.mapWidth;r++)for(let o=0;o<this.mapHeight;o++){const a={x:r,y:o},l=Math.abs(a.x-t.x)+Math.abs(a.y-t.y);if(l===n){const c=this.findReachableLeapDestination(t,a);if(c){const d=`${c.x},${c.y}`;if(!this.occupiedTiles.has(d)&&!s.some(f=>f.x===c.x&&f.y===c.y))if(s.push(c),c.x===a.x&&c.y===a.y)console.log(`✅ Valid leap destination: (${c.x}, ${c.y}) at distance ${l}`);else{const f=Math.abs(c.x-t.x)+Math.abs(c.y-t.y);console.log(`🔄 Leap shortened to: (${c.x}, ${c.y}) at distance ${f} (blocked by tall unit)`)}}}}return console.log(`🎯 Found ${s.length} valid leap destinations`),s}findReachableLeapDestination(e,t){const n=this.getFullLeapPathTiles(e,t);let s=e;for(const r of n){const o=`${r.x},${r.y}`,a=this.occupiedTiles.get(o);if(a&&a.isTall){console.log(`🚫 Leap stopped by tall unit ${a.name} at (${r.x}, ${r.y}), landing at (${s.x}, ${s.y})`);break}else s=r}return s.x===e.x&&s.y===e.y?null:s}getFullLeapPathTiles(e,t){const n=[],s=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y),o=e.x<t.x?1:-1,a=e.y<t.y?1:-1;let l=s-r,c=e.x,d=e.y;for(;c===e.x&&d===e.y||n.push({x:c,y:d}),!(c===t.x&&d===t.y);){const h=2*l;h>-r&&(l-=r,c+=o),h<s&&(l+=s,d+=a)}return n}isValidLeapPath(e,t){const n=this.getLeapPathTiles(e,t);for(const s of n){const r=`${s.x},${s.y}`,o=this.occupiedTiles.get(r);if(o&&o.isTall)return console.log(`🚫 Leap blocked by tall unit ${o.name} at (${s.x}, ${s.y})`),!1}return!0}getLeapPathTiles(e,t){const n=[],s=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y),o=e.x<t.x?1:-1,a=e.y<t.y?1:-1;let l=s-r,c=e.x,d=e.y;for(;!(c===e.x&&d===e.y)&&!(c===t.x&&d===t.y)&&n.push({x:c,y:d}),!(c===t.x&&d===t.y);){const h=2*l;h>-r&&(l-=r,c+=o),h<s&&(l+=s,d+=a)}return n}setMapDimensions(e,t){this.mapWidth=e,this.mapHeight=t,console.log(`🗺️ NavigationManager map dimensions set to ${e}x${t}`)}}const ui=new Qg;let Ht=32,Ut=32;function ey(i,e){Ht=i,Ut=e}class ty{constructor(){this.unitPositions=new Map,this.unitMeshes=new Map,this.unitBorders=new Map,this.unitHealthBars=new Map,this.unitEnergyBars=new Map,this.unitModifierIndicators=new Map,this.textureLoader=new yi}async placeUnit(e,t,n){console.log(`🎨 UnitRenderer.placeUnit: Placing unit ${e.name} at (${t}, ${n})`),console.log(`📊 Unit team before setting: ${e.team}`),console.log(`📊 globalUnitRegistry.playerParty.length: ${ue.playerParty.length}`),console.log(`📊 globalUnitRegistry.enemyUnits.length: ${ue.enemyUnits.length}`),console.log(`📊 Unit is in playerParty: ${ue.playerParty.includes(e)}`),console.log(`📊 Unit is in enemyUnits: ${ue.enemyUnits.includes(e)}`),this.unitPositions.set(e,{x:t,y:n}),ue.playerParty.includes(e)?e.team="player":ue.enemyUnits.includes(e)&&(e.team="enemy"),console.log(`📊 Unit team after setting: ${e.team}`),console.log(`📊 SCENE_GLOBAL exists: ${!!V}`),console.log(`📊 CAMERA_GLOBAL exists: ${!!Wi}`),console.log(`📊 Unit imageUrl: ${e.imageUrl}`),V&&Wi?(console.log(`🖼️ Loading texture for ${e.name} from: ${e.imageUrl}`),this.textureLoader.load(e.imageUrl,s=>{if(console.log(`✅ Texture loaded successfully for ${e.name}`),!V)return;s.magFilter=qe,s.minFilter=qe,s.flipY=!0,s.generateMipmaps=!1,s.wrapS=en,s.wrapT=en;const r=s.image.width,o=s.image.height;console.log(`Unit ${e.name} image size: ${r}x${o}`);const l=Ht/r,c=r*l,d=o*l;console.log(`Scaling unit to ${c}x${d} (scale factor: ${l})`);const h=new tt(c,d),f=new nt({map:s,transparent:!0,alphaTest:.1,depthTest:!0,depthWrite:!1}),u=new Ye(h,f);u.position.set(t*Ht+Ht/2,-n*Ut-Ut/2,1),V&&(V.add(u),this.unitMeshes.set(e,u),console.log(`Added unit mesh to scene at (${u.position.x}, ${u.position.y}) scaled to ${c}x${d}`),this.createUnitBorder(e,c,d,u.position.x,u.position.y),this.createUnitBars(e,u.position.x,u.position.y),this.createModifierIndicators(e,u.position.x,u.position.y))},s=>{console.log(`📊 Loading progress for ${e.name}: ${s.loaded}/${s.total} bytes`)},s=>{console.error(`❌ Failed to load texture for ${e.name}:`,s),console.error(`❌ Image URL: ${e.imageUrl}`),console.error("❌ Error details:",s instanceof Error?s.message:s)})):console.error("Three.js scene or camera not initialized")}getUnitPosition(e){return this.unitPositions.get(e)}removeUnit(e){const t=this.unitMeshes.get(e);t&&V&&(V.remove(t),this.unitMeshes.delete(e));const n=this.unitBorders.get(e);n&&V&&(V.remove(n),this.unitBorders.delete(e));const s=this.unitHealthBars.get(e);if(s&&V){const a=s.backgroundMesh;a&&V.remove(a),V.remove(s),this.unitHealthBars.delete(e)}const r=this.unitEnergyBars.get(e);if(r&&V){const a=r.backgroundMesh;a&&V.remove(a),V.remove(r),this.unitEnergyBars.delete(e)}const o=this.unitModifierIndicators.get(e);o&&V&&(V.remove(o),this.unitModifierIndicators.delete(e)),this.unitPositions.delete(e),console.log(`Removed unit ${e.name} from scene`)}getUnitAtPosition(e,t){for(const[n,s]of this.unitPositions)if(s.x===e&&s.y===t)return n;return null}getAllUnits(){return Array.from(this.unitPositions.keys())}moveUnitToPosition(e,t){this.unitPositions.set(e,t);const n=this.unitMeshes.get(e);n&&(n.position.set(t.x*Ht+Ht/2,-t.y*Ut-Ut/2,1),this.updateUnitBorder(e,n.position.x,n.position.y),this.updateUnitBarsPosition(e,n.position.x,n.position.y),this.updateModifierIndicatorsPosition(e,n.position.x,n.position.y)),console.log(`Moved unit ${e.name} to (${t.x}, ${t.y})`)}createUnitBorder(e,t,n,s,r){if(!V)return;const o=e.team==="player"?16711680:255,a=2,l=Ht,c=Ut,d=[new D(-l/2,c/2,0),new D(l/2,c/2,0),new D(l/2,-c/2,0),new D(-l/2,-c/2,0),new D(-l/2,c/2,0)],h=new Mn().setFromPoints(d),f=new sc({color:o,linewidth:a,transparent:!0,opacity:.8}),u=new Yg(h,f);u.position.set(s,r,.9),V.add(u),this.unitBorders.set(e,u),console.log(`✅ Added ${e.team} team border for ${e.name} (size: ${l}x${c}, color: ${o.toString(16)})`)}updateUnitBorder(e,t,n){const s=this.unitBorders.get(e);s&&s.position.set(t,n,.9)}updateUnitBarsPosition(e,t,n){const o=Ht*.8,a=this.unitHealthBars.get(e),l=a?a.backgroundMesh:null;if(a&&l){const h=n-Ut/2+4+2;l.position.set(t,h,1.1);const f=e.currentHealth/e.health,u=o*f;a.position.set(t-o/2+u/2,h,1.2)}const c=this.unitEnergyBars.get(e),d=c?c.backgroundMesh:null;if(c&&d){const h=n-Ut/2+4+2-6;d.position.set(t,h,1.1);const f=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,u=o*f;c.position.set(t-o/2+u/2,h,1.2)}console.log(`🔄 Updated unit bars position for ${e.name} at (${t}, ${n})`)}updateModifierIndicatorsPosition(e,t,n){const s=this.unitModifierIndicators.get(e);s&&s.position.set(t,n,2)}createUnitBars(e,t,n){if(!V)return;const s=Ht*.8,r=4,o=6,a=e.currentHealth/e.health,l=s*a,c=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,d=s*c,h=new tt(s,r),f=new nt({color:3355443,transparent:!0,opacity:.8}),u=new Ye(h,f),g=new tt(l,r),y=new nt({color:65280,transparent:!0,opacity:.9}),m=new Ye(g,y),p=new tt(s,r),v=new nt({color:3355443,transparent:!0,opacity:.8}),x=new Ye(p,v),M=new tt(d,r),P=new nt({color:33023,transparent:!0,opacity:.9}),A=new Ye(M,P),w=n-Ut/2+r+2,G=w-o;u.position.set(t,w,1.1),m.position.set(t-s/2+l/2,w,1.2),x.position.set(t,G,1.1),A.position.set(t-s/2+d/2,G,1.2),V.add(u),V.add(m),V.add(x),V.add(A),this.unitHealthBars.set(e,m),this.unitEnergyBars.set(e,A),m.backgroundMesh=u,A.backgroundMesh=x,console.log(`💚💙 Created health/energy bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(a*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(c*100)}%)`)}createModifierIndicators(e,t,n){if(!V)return;const s=new zi;s.position.set(t,n,2),this.updateModifierIndicators(e,s),V.add(s),this.unitModifierIndicators.set(e,s)}updateModifierIndicators(e,t){if(V){for(;t.children.length>0;){const n=t.children[0];t.remove(n),n.geometry&&n.geometry.dispose(),n.material&&(Array.isArray(n.material)?n.material.forEach(s=>s.dispose()):n.material.dispose())}if(e.activeModifiers&&e.activeModifiers.length>0){const n=e.activeModifiers.slice(0,6);n.forEach((s,r)=>{const o=je.getModifierAbbreviation(s.modifierKey),a=je.getModifierColor(s.modifierKey),l=`${o}x${s.stacks}`,c=this.createTextTexture(l,a),d=28,h=22,f=new tt(d,h),u=new nt({map:c,transparent:!0,opacity:.85,alphaTest:.01,depthTest:!1,depthWrite:!1}),g=new Ye(f,u),y=this.getDicePosition(r,n.length),m=1,p=y.x*(Ht/2-d/2-m),v=y.y*(Ut/2-h/2-m);g.position.set(p,v,.1),t.add(g),console.log(`🏷️ Created modifier indicator for ${e.name}: ${l} at dice position ${r+1}/${n.length} -> offset (${p.toFixed(1)}, ${v.toFixed(1)})`)}),e.activeModifiers.length>6&&console.log(`🏷️ ${e.name} has ${e.activeModifiers.length} modifiers, showing first 6 visually (rest in info panel)`)}}}getDicePosition(e,t){switch(t){case 1:return{x:0,y:0};case 2:return e===0?{x:-.6,y:.6}:{x:.6,y:-.6};case 3:return[{x:-.6,y:.6},{x:0,y:0},{x:.6,y:-.6}][e];case 4:return[{x:-.6,y:.6},{x:.6,y:.6},{x:-.6,y:-.6},{x:.6,y:-.6}][e];case 5:return[{x:-.6,y:.6},{x:.6,y:.6},{x:0,y:0},{x:-.6,y:-.6},{x:.6,y:-.6}][e];case 6:default:return[{x:-.6,y:.6},{x:-.6,y:0},{x:-.6,y:-.6},{x:.6,y:.6},{x:.6,y:0},{x:.6,y:-.6}][e]}}createTextTexture(e,t){const n=document.createElement("canvas"),s=n.getContext("2d");n.width=128,n.height=64,s.fillStyle=t,s.font="bold 24px Arial",s.textAlign="center",s.textBaseline="middle",s.strokeStyle="black",s.lineWidth=4,s.strokeText(e,n.width/2,n.height/2),s.fillText(e,n.width/2,n.height/2);const r=new kn(n);return r.magFilter=qe,r.minFilter=qe,r.generateMipmaps=!1,r}updateUnitBars(e){if(!V)return;if(!e){console.warn("❌ updateUnitBars called with undefined unit");return}console.log(`🎨 updateUnitBars called for ${e.name} - Current energy: ${e.currentEnergy}/${e.maxEnergy}`);const t=Ht*.8,n=e.currentHealth/e.health,s=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,r=this.unitHealthBars.get(e);if(r){console.log(`💚 Updating health bar for ${e.name}: ${n*100}% (${e.currentHealth}/${e.health})`);const a=Math.max(.1,t*n),l=new tt(a,4);r.geometry.dispose(),r.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Ht+Ht/2,f=-c.y*Ut-Ut/2-Ut/2+4+2;r.position.set(d-t/2+a/2,f,1.2)}r.visible=n>0}else console.warn(`❌ No health bar found for ${e.name}`);const o=this.unitEnergyBars.get(e);if(o){console.log(`💙 Updating energy bar for ${e.name}: ${s*100}% (${e.currentEnergy}/${e.maxEnergy})`);const a=Math.max(.1,t*s),l=new tt(a,4);o.geometry.dispose(),o.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*Ht+Ht/2,u=-c.y*Ut-Ut/2-Ut/2+4+2-6;o.position.set(d-t/2+a/2,u,1.2)}o.visible=s>0}else console.warn(`❌ No energy bar found for ${e.name}`);console.log(`🔄 Updated bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(n*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(s*100)}%)`)}updateUnitModifiers(e){const t=this.unitModifierIndicators.get(e);t&&(this.updateModifierIndicators(e,t),console.log(`🏷️ Updated modifier indicators for ${e.name}`))}getUnitMesh(e){return this.unitMeshes.get(e)}getUnitPositions(){return this.unitPositions}getUnitBorder(e){return this.unitBorders.get(e)}setUnitBorder(e,t){this.unitBorders.set(e,t)}getUnitHealthBar(e){return this.unitHealthBars.get(e)}setUnitHealthBar(e,t){this.unitHealthBars.set(e,t)}getUnitEnergyBar(e){return this.unitEnergyBars.get(e)}setUnitEnergyBar(e,t){this.unitEnergyBars.set(e,t)}}const ny="/assets/select-s3pTX8ku.png";let Ys=32,js=32;function iy(i,e){Ys=i,js=e}class sy{constructor(){this.selectedUnit=null,this.textureLoader=new yi,this.selectTexture=null,this.selectionIndicators=new Map,this.loadSelectTexture()}async loadSelectTexture(){this.selectTexture=await this.textureLoader.loadAsync(ny),this.selectTexture.magFilter=qe,this.selectTexture.minFilter=qe}updateUnitSelectionIndicators(e){if(console.log("🎯 Updating unit selection indicators"),this.clearSelectionIndicators(),!Q||!Q.canSelect()){console.log("❌ Cannot show selection indicators - not in SELECT phase");return}const t=Q.getSelectableUnits();console.log(`📋 Found ${t.length} selectable units`),t.forEach(n=>{const s=e(n);s&&this.selectTexture&&V&&this.createSelectionIndicator(n,s.x,s.y)})}createSelectionIndicator(e,t,n){if(!this.selectTexture||!V){console.warn("❌ Cannot create selection indicator - texture or scene not available");return}const s=new tt(Ys,js),r=new nt({map:this.selectTexture,transparent:!0,opacity:.8}),o=new Ye(s,r);o.position.set(t*Ys+Ys/2,-n*js-js/2,.5),V.add(o),this.selectionIndicators.set(e,o),console.log(`✅ Created selection indicator for ${e.name} at (${t}, ${n})`)}clearSelectionIndicators(){this.selectionIndicators.forEach((e,t)=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.selectionIndicators.clear(),console.log("🧹 Cleared all selection indicators")}selectUnit(e){return Q&&Q.canSelect()?Q.getSelectableUnits().some(s=>s.id===e.id)?(this.selectedUnit=e,Q.setSelectedUnit(e.id),console.log(`✅ Selected unit: ${e.name} (${e.id})`),!0):(console.log(`❌ Unit ${e.name} is not selectable`),!1):(console.log("❌ Cannot select unit - not in SELECT phase"),!1)}setSelectedUnit(e){this.selectedUnit=e,Q&&Q.setSelectedUnit(e.id),console.log(`🎯 Set selected unit: ${e.name} (${e.id})`)}getSelectedUnit(){return this.selectedUnit}cleanup(){this.clearSelectionIndicators()}}class ry{constructor(){this.activeEffects=new Map,this.effectDefinitions=new Map,this.initializeDefaultEffects()}initializeDefaultEffects(){this.registerEffect({id:"spike-trap",name:"Spike Trap",description:"Deals 2 damage to any unit that steps on it",icon:"🗡️",visualColor:"#8B0000",persistent:!0,triggerOn:"enter",effect:(e,t)=>{e.currentHealth=Math.max(0,e.currentHealth-2),console.log(`💥 ${e.name} stepped on a spike trap at (${t.x}, ${t.y}) and took 2 damage! Health: ${e.currentHealth}/${e.health}`)}}),this.registerEffect({id:"healing-spring",name:"Healing Spring",description:"Restores 3 health to any unit that steps on it",icon:"💧",visualColor:"#00FF00",persistent:!0,triggerOn:"enter",effect:(e,t)=>{e.currentHealth=Math.min(e.health,e.currentHealth+3),console.log(`💚 ${e.name} stepped on a healing spring at (${t.x}, ${t.y}) and recovered 3 health! Health: ${e.currentHealth}/${e.health}`)}}),this.registerEffect({id:"energy-well",name:"Energy Well",description:"Restores 2 energy to any unit that steps on it",icon:"⚡",visualColor:"#0080FF",persistent:!0,triggerOn:"enter",effect:(e,t)=>{e.currentEnergy=Math.min(e.maxEnergy,e.currentEnergy+2),console.log(`⚡ ${e.name} stepped on an energy well at (${t.x}, ${t.y}) and recovered 2 energy! Energy: ${e.currentEnergy}/${e.maxEnergy}`)}}),this.registerEffect({id:"toxic-tile",name:"Toxic Tile",description:"Applies 1 Toxic to any unit that steps on it. Tile remains active.",icon:"☢️",visualColor:"#800080",persistent:!0,triggerOn:"enter",effect:(e,t)=>{je.applyModifier(e,"TOXICITY",1,"toxic-tile"),console.log(`☢️ ${e.name} stepped on a toxic tile at (${t.x}, ${t.y}) and gained 1 Toxicity!`)}}),this.registerEffect({id:"spotlight",name:"Spotlight",description:"When an enemy unit enters this tile, the creator will perform a basic attack on them if in range",icon:"🔍",visualColor:"#FFD700",persistent:!1,triggerOn:"enter",effect:(e,t)=>{const s=this.getEffectsAtPosition(t).find(l=>l.effectId==="spotlight");if(!s||!s.appliedBy){console.log(`🔍 Spotlight triggered but no creator found at (${t.x}, ${t.y})`);return}const r=this.findCreatorUnit(s.appliedBy);if(!r){console.log(`🔍 Spotlight creator unit not found: ${s.appliedBy}`);return}if(e.team===r.team){console.log(`🔍 ${e.name} is not an enemy of ${r.name}, spotlight not triggered`);return}const o=this.getUnitPosition(r);if(!o){console.log(`🔍 Creator ${r.name} position not found`);return}const a=Math.abs(o.x-t.x)+Math.abs(o.y-t.y);if(a>r.range){console.log(`🔍 ${r.name} is out of range to attack ${e.name} (distance: ${a}, range: ${r.range})`);return}console.log(`🔍 Spotlight activated! ${r.name} attacks ${e.name} at (${t.x}, ${t.y})`),this.performBasicAttack(r,e)}})}registerEffect(e){this.effectDefinitions.set(e.id,e),console.log(`📝 Registered tile effect: ${e.name}`)}addEffect(e,t,n=-1,s){const r=this.effectDefinitions.get(e);if(!r)return console.error(`❌ Unknown tile effect: ${e}`),null;const o=`${e}-${Date.now()}-${Math.random()}`,a={id:o,effectId:e,position:t,duration:n,appliedBy:s},l=`${t.x},${t.y}`,c=this.activeEffects.get(l)||[];return c.push(a),this.activeEffects.set(l,c),console.log(`✨ Added ${r.name} effect at (${t.x}, ${t.y})`),o}removeEffect(e){for(const[t,n]of this.activeEffects.entries()){const s=n.findIndex(r=>r.id===e);if(s!==-1){const r=n.splice(s,1)[0],o=this.effectDefinitions.get(r.effectId);return console.log(`🗑️ Removed ${o?.name||"unknown"} effect (ID: ${e}) from (${r.position.x}, ${r.position.y})`),console.log(`🗑️ Remaining effects at position: ${n.length}`),n.length===0&&(this.activeEffects.delete(t),console.log(`🗑️ Cleared position (${r.position.x}, ${r.position.y}) from active effects map`)),!0}}return console.warn(`🗑️ Failed to find effect with ID: ${e}`),!1}getEffectsAtPosition(e){const t=`${e.x},${e.y}`;return this.activeEffects.get(t)||[]}triggerEffects(e,t,n){const s=this.getEffectsAtPosition(t);let r=!1;for(const o of s){const a=this.effectDefinitions.get(o.effectId);a&&(a.triggerOn===n||a.triggerOn==="both")&&(a.effect(e,t),a.persistent||(this.removeEffect(o.id),r=!0))}r&&setTimeout(()=>{const o=window.globalTileEffectRenderer;o?(console.log("🔍 Updating tile effect renderer to remove non-persistent effects"),o.updateTileEffects(this)):console.warn("🔍 globalTileEffectRenderer not found in window object")},200)}updateEffects(){for(const[e,t]of this.activeEffects.entries()){const n=[];for(const s of t)s.duration>0&&(s.duration--,s.duration===0&&n.push(s.id));n.forEach(s=>this.removeEffect(s))}}getAllActiveEffects(){return new Map(this.activeEffects)}getEffectDefinition(e){return this.effectDefinitions.get(e)}findCreatorUnit(e){for(const t of ue.playerParty)if(t.id===e)return t;for(const t of ue.enemyUnits)if(t.id===e)return t;return null}getUnitPosition(e){const t=window.GAME_SCENE_INSTANCE;return t&&t.getUnitPosition(e)||null}performBasicAttack(e,t){const n=e.basicDamage,s=je.processBasicAttackDamageModifiers(e,n),o=je.processBasicAttackDefenseModifiers(t,s.finalDamage,e).finalDamage,a=t.currentHealth;t.currentHealth=Math.max(0,t.currentHealth-o),console.log(`🔍 Spotlight attack: ${e.name} deals ${o} damage to ${t.name} (${a} → ${t.currentHealth})`),e.energyType.toLowerCase()==="kinetic"&&(e.currentEnergy=Math.min(e.maxEnergy,e.currentEnergy+1)),t.energyType.toLowerCase()==="kinetic"&&(t.currentEnergy=Math.min(t.maxEnergy,t.currentEnergy+1));const l=window.GAME_SCENE_INSTANCE;l&&(l.showDamageAnimation(t,o,"🔍"),l.updateUnitBars(t),l.updateUnitBars(e),t.currentHealth<=0&&(console.log(`💀 ${t.name} was killed by spotlight attack from ${e.name}`),l.handleUnitDeath(t)))}}const Nn=new ry;let ri=32,ai=32;function ay(i,e){ri=i,ai=e}class oy{constructor(){this.textureLoader=new yi,this.hoverSelectTexture=null,this.movementIndicators=[],this.selectedMoveTarget=null,this.currentMovementData=null,this.pathIndicators=[],this.isAnimating=!1,this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(pr),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe}enterMovePhase(e,t,n){console.log(`🚶 Entering MOVE phase for ${e.name}`),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null;const s=t(e);if(!s){console.error(`❌ No position found for unit ${e.name}`);return}const r=n(),o=new Map;r.forEach((l,c)=>{o.set(c,{x:l.x,y:l.y})}),ui.updateOccupiedTiles(o);const a=ui.calculateValidMovement(e,s);this.currentMovementData=a,this.createMovementIndicators(a.validTiles),console.log(`✅ Created ${a.validTiles.length} movement indicators for ${e.name}`)}createMovementIndicators(e){if(!this.hoverSelectTexture||!V){console.warn("❌ Cannot create movement indicators - texture or scene not available");return}e.forEach(t=>{const n=new tt(ri,ai),s=new nt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:65280}),r=new Ye(n,s);r.position.set(t.x*ri+ri/2,-t.y*ai-ai/2,.4),V&&(V.add(r),this.movementIndicators.push(r))}),console.log(`✅ Created ${e.length} movement indicators`)}clearMovementIndicators(){this.movementIndicators.forEach(e=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.movementIndicators=[],console.log("🧹 Cleared movement indicators")}exitMovePhase(){console.log("🚪 Exiting MOVE phase"),this.clearMovementIndicators(),this.clearPathIndicators(),this.selectedMoveTarget=null,this.currentMovementData=null}selectMoveTarget(e,t){return console.log(`🎯 Attempting to select move target: (${e}, ${t})`),this.currentMovementData?this.currentMovementData.validTiles.some(s=>s.x===e&&s.y===t)?(this.selectedMoveTarget={x:e,y:t},console.log(`✅ Selected valid move target: (${e}, ${t})`),!0):(console.log(`❌ Invalid move target: (${e}, ${t}) - not in valid tiles`),!1):(console.warn("❌ No movement data available"),!1)}drawPathToTarget(e,t){if(console.log("🛤️ Drawing path to target"),this.clearPathIndicators(),!this.selectedMoveTarget||!this.currentMovementData){console.warn("❌ No target selected or movement data missing");return}if(!e(t)){console.error(`❌ No position found for unit ${t.name}`);return}const s=`${this.selectedMoveTarget.x},${this.selectedMoveTarget.y}`,r=this.currentMovementData.paths.get(s);r&&r.length>1&&(this.createPathIndicators(r),console.log(`✅ Created path with ${r.length} steps`))}createPathIndicators(e){if(!(!this.hoverSelectTexture||!V))for(let t=1;t<e.length;t++){const n=e[t],s=new tt(ri*.5,ai*.5),r=new nt({color:16776960,transparent:!0,opacity:.8}),o=new Ye(s,r);o.position.set(n.x*ri+ri/2,-n.y*ai-ai/2,.6),V&&(V.add(o),this.pathIndicators.push(o))}}clearPathIndicators(){this.pathIndicators.forEach(e=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.pathIndicators=[]}getSelectedMoveTarget(){return this.selectedMoveTarget}cancelMove(){console.log("❌ Cancelling move"),this.clearPathIndicators(),this.selectedMoveTarget=null}async executeMovement(e,t,n,s,r){if(this.isAnimating){console.warn("❌ Movement already in progress");return}const o=r(e);if(!o){console.error(`❌ No position found for unit ${e.name}`);return}console.log(`🏃 Executing ${n} movement for ${e.name} from (${o.x}, ${o.y}) to (${t.x}, ${t.y})`),this.isAnimating=!0;const a=this.calculateMovementData(e,o,t,n);n==="basic"&&Nn.triggerEffects(e,o,"exit"),await this.animateMovement(e,a,s);const l=a.path.length-1;if(l>0){const{modifiedRange:c,triggeredModifiers:d}=je.processMovementModifiers(e,0,l);d.length>0&&console.log(`🔥 Movement effects triggered for ${e.name}: ${d.join(", ")}`)}(n==="teleport"||n==="leap")&&Nn.triggerEffects(e,t,"enter"),this.isAnimating=!1,console.log(`✅ Movement completed for ${e.name}`)}calculateMovementData(e,t,n,s){let r,o;if(s==="basic"){if(this.currentMovementData){const a=`${n.x},${n.y}`;r=this.currentMovementData.paths.get(a)||[t,n]}else r=ui.calculateStepPath(t,n);o=r.slice(1)}else s==="leap"?(r=[t,n],o=[n]):(r=[t,n],o=[n]);return{type:s,origin:t,destination:n,path:r,affectedTiles:o}}async animateMovement(e,t,n){if(t.type==="teleport"){n(e,t.destination),console.log(`⚡ ${e.name} teleported instantly to (${t.destination.x}, ${t.destination.y})`);return}const s=500,r=t.type==="leap"?"leaping":"moving";for(let o=1;o<t.path.length;o++){const a=t.path[o];n(e,a),console.log(`🚶 ${e.name} ${r} to (${a.x}, ${a.y}) [step ${o}/${t.path.length-1}]`),Nn.triggerEffects(e,a,"enter"),await new Promise(l=>setTimeout(l,200)),o<t.path.length-1&&await new Promise(l=>setTimeout(l,s-200))}}isValidTeleportMove(e,t,n,s){return!(Math.abs(n.x-t.x)+Math.abs(n.y-t.y)>s||n.x<0||n.x>=8||n.y<0||n.y>=8)}getValidTeleportDestinations(e,t,n,s){const r=[];for(let o=0;o<8;o++)for(let a=0;a<8;a++){const l={x:o,y:a},c=Math.abs(l.x-t.x)+Math.abs(l.y-t.y);if(c<=n&&c>0){const d=`${o},${a}`;s.has(d)||r.push(l)}}return r}getValidLeapDestinations(e,t,n,s){return ui.calculateValidLeapDestinations(e,t,n)}isValidLeapPath(e,t,n){const s=this.getLeapPathTiles(e,t);for(const r of s){const o=`${r.x},${r.y}`,a=n.get(o);if(a&&a.isTall)return console.log(`🚫 Leap blocked by tall unit ${a.name} at (${r.x}, ${r.y})`),!1}return!0}getLeapPathTiles(e,t){const n=[],s=Math.abs(t.x-e.x),r=Math.abs(t.y-e.y),o=e.x<t.x?1:-1,a=e.y<t.y?1:-1;let l=s-r,c=e.x,d=e.y;for(;!(c===e.x&&d===e.y)&&!(c===t.x&&d===t.y)&&n.push({x:c,y:d}),!(c===t.x&&d===t.y);){const h=2*l;h>-r&&(l-=r,c+=o),h<s&&(l+=s,d+=a)}return n}getIsAnimating(){return this.isAnimating}}let vs=!1;function ly(i){vs=i,console.log(`Debug mode ${i?"enabled":"disabled"}`)}function Ot(){return vs}function cy(){return vs?"ON":"OFF"}function At(i,e){vs&&console.log(`[DEBUG] ${i}`,e||"")}function ar(i){vs&&console.warn(`[DEBUG ALERT] ${i}`)}class Fi{static countAliveUnits(e){return(e==="player"?ue.playerParty:ue.enemyUnits).filter(n=>n.currentHealth>0).length}static calculateActionableUnitLimit(){const e=this.countAliveUnits("player"),t=this.countAliveUnits("enemy"),n=Math.min(e,t);return At("Calculated actionable unit limit",{alivePlayerUnits:e,aliveEnemyUnits:t,actionableUnitLimit:n}),Math.max(1,n)}static getAliveUnitCounts(){return{player:this.countAliveUnits("player"),enemy:this.countAliveUnits("enemy")}}static checkPlayerVictory(){const t=this.countAliveUnits("enemy")===0;return t&&console.log("🎉 PLAYER VICTORY! All enemies have been defeated!"),t}static checkPlayerDefeat(){const t=this.countAliveUnits("player")===0;return t&&console.log("💀 PLAYER DEFEAT! All player units have been defeated!"),t}static checkGameEndConditions(){return this.checkPlayerVictory()?"victory":this.checkPlayerDefeat()?"defeat":"continue"}}class dy{constructor(){this.selectedAttackTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.selectedSkillTarget=null,this.skillRotation=0,this.attackMode="basic",this.currentSkill=null,this.targetUnit=null}reset(){this.selectedAttackTarget=null,this.currentAttackData=null,this.validSkillTargets=[],this.selectedSkillTarget=null,this.skillRotation=0,this.attackMode="basic",this.currentSkill=null,this.targetUnit=null}setSelectedAttackTarget(e){this.selectedAttackTarget=e}getSelectedAttackTarget(){return this.selectedAttackTarget}setCurrentAttackData(e){this.currentAttackData=e}getCurrentAttackData(){return this.currentAttackData}setValidSkillTargets(e){this.validSkillTargets=e}getValidSkillTargets(){return this.validSkillTargets}setSelectedSkillTarget(e){this.selectedSkillTarget=e}getSelectedSkillTarget(){return this.selectedSkillTarget}setSkillRotation(e){this.skillRotation=e}getSkillRotation(){return this.skillRotation}rotateSkill(){return this.skillRotation=(this.skillRotation+1)%4,this.skillRotation}setAttackMode(e){this.attackMode=e}getAttackMode(){return this.attackMode}setCurrentSkill(e){this.currentSkill=e}getCurrentSkill(){return this.currentSkill}setTargetUnit(e){this.targetUnit=e}getTargetUnit(){return this.targetUnit}}let gn=32,yn=32;function uy(i,e){gn=i,yn=e}class hy{constructor(){this.textureLoader=new yi,this.hoverSelectTexture=null,this.attackIndicators=[],this.skillTargetIndicators=[],this.skillPreviewIndicators=[],this.loadHoverSelectTexture()}async loadHoverSelectTexture(){this.hoverSelectTexture=await this.textureLoader.loadAsync(pr),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe}clearAllIndicators(){this.clearAttackIndicators(),this.clearSkillTargetIndicators(),this.clearSkillPreviewIndicators()}createAttackIndicators(e){if(console.log("🎯 Creating attack indicators"),this.clearAttackIndicators(),!e||!this.hoverSelectTexture||!V){console.warn("❌ Cannot create attack indicators - missing data, texture, or scene");return}e.validTiles.forEach(t=>{const n=new tt(gn,yn),s=new nt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:16711680}),r=new Ye(n,s);r.position.set(t.x*gn+gn/2,-t.y*yn-yn/2,.4),V&&(V.add(r),this.attackIndicators.push(r))}),console.log(`✅ Created ${e.validTiles.length} attack indicators`)}clearAttackIndicators(){this.attackIndicators.forEach(e=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.attackIndicators=[],console.log("🧹 Cleared attack indicators")}createSkillTargetIndicators(e){if(console.log("✨ Creating skill target indicators"),this.clearSkillTargetIndicators(),!e.length||!this.hoverSelectTexture||!V){console.warn("❌ Cannot create skill target indicators - missing data, texture, or scene");return}e.forEach(t=>{const n=new tt(gn,yn),s=new nt({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:65280}),r=new Ye(n,s);r.position.set(t.x*gn+gn/2,-t.y*yn-yn/2,.4),V&&(V.add(r),this.skillTargetIndicators.push(r))}),console.log(`✅ Created ${e.length} skill target indicators`)}clearSkillTargetIndicators(){this.skillTargetIndicators.forEach(e=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.skillTargetIndicators=[],console.log("🧹 Cleared skill target indicators")}showSkillPreview(e,t,n,s){if(console.log(`👁️ Showing skill preview at (${t}, ${n})`),this.clearSkillPreviewIndicators(),!e||!this.hoverSelectTexture||!V){console.warn("❌ Cannot show skill preview - missing skill, texture, or scene");return}const r=e.getTargetPattern(t,n,"north",s);r.forEach(o=>{if(o.x>=0&&o.x<8&&o.y>=0&&o.y<8){const a=new tt(gn,yn),l=new nt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:o.isPrimary?16746496:16776960}),c=new Ye(a,l);c.position.set(o.x*gn+gn/2,-o.y*yn-yn/2,.5),V&&(V.add(c),this.skillPreviewIndicators.push(c))}}),console.log(`✅ Created ${r.length} skill preview indicators`)}clearSkillPreviewIndicators(){this.skillPreviewIndicators.forEach(e=>{V&&V.remove(e),e.geometry.dispose(),e.material instanceof fn&&e.material.dispose()}),this.skillPreviewIndicators=[],console.log("🧹 Cleared skill preview indicators")}}class fy{constructor(e){this.actionState=e}selectTarget(e,t,n,s){console.log(`🎯 Attempting to select attack target at (${e}, ${t})`);const r=this.actionState.getCurrentAttackData();if(!r)return console.warn("❌ No attack data available"),{success:!1,targetUnit:null};if(!r.validTiles.some(l=>l.x===e&&l.y===t))return console.log(`❌ Invalid target: (${e}, ${t}) - not in valid targets`),{success:!1,targetUnit:null};const a=n(e,t);return a?a.team===s.team?(console.log(`❌ Cannot attack unit of same team: ${a.name}`),{success:!1,targetUnit:null}):(this.actionState.setSelectedAttackTarget({x:e,y:t}),this.actionState.setTargetUnit(a),console.log(`✅ Selected valid attack target: ${a.name} at (${e}, ${t})`),{success:!0,targetUnit:a}):(console.log(`❌ No unit found at attack target (${e}, ${t})`),{success:!1,targetUnit:null})}confirmAttack(e){console.log(`⚔️ Confirming attack from ${e.name}`);const t=this.actionState.getSelectedAttackTarget(),n=this.actionState.getTargetUnit();if(!t||!n)return console.warn("❌ No attack target selected"),null;const s=e.basicDamage,r=je.processBasicAttackDamageModifiers(e,s);console.log(`💥 Base damage: ${s}, Modified damage: ${r.finalDamage}`),r.triggeredModifiers.length>0&&console.log(`🔥 Attacker modifiers triggered: ${r.triggeredModifiers.join(", ")}`);const o=je.processBasicAttackDefenseModifiers(n,r.finalDamage,e),a=o.finalDamage;if(console.log(`🛡️ Final damage after defense modifiers: ${a}`),o.triggeredModifiers.length>0&&console.log(`🔥 Defender modifiers triggered: ${o.triggeredModifiers.join(", ")}`),e.energyType.toLowerCase()!=="kinetic"&&e.currentEnergy<1){console.warn(`❌ Not enough energy for basic attack. Required: 1, Current: ${e.currentEnergy}`);const f=window.GAME_SCENE_INSTANCE;return f&&f.animationManager&&f.unitRenderer&&(f.animationManager.showFailedTextPopup(e,u=>f.unitRenderer.getUnitPosition(u)),console.log(`🎬 Showing FAILED animation for ${e.name} due to insufficient energy for basic attack`)),null}const l=n.currentHealth;n.currentHealth=Math.max(0,n.currentHealth-a);const c=n.currentHealth,d=e.currentEnergy;e.energyType.toLowerCase()==="kinetic"?(e.currentEnergy=Math.min(e.maxEnergy,e.currentEnergy+5),console.log(`⚡ Kinetic unit ${e.name} gains 5 energy from attack: ${d} → ${e.currentEnergy}/${e.maxEnergy}`)):(e.currentEnergy=Math.max(0,e.currentEnergy-1),console.log(`⚡ Potential unit ${e.name} consumes 1 energy: ${d} → ${e.currentEnergy}/${e.maxEnergy}`));const h=je.processActionModifiers(e);return h.triggeredModifiers.length>0&&console.log(`⚡ Action modifiers triggered for ${e.name} after attack: ${h.triggeredModifiers.join(", ")}`),console.log(`💥 ${e.name} attacks ${n.name} for ${a} damage`),console.log(`🩸 ${n.name} health: ${l} → ${c}/${n.health}`),{success:!0,damage:a,target:n}}cancelAttack(){console.log("❌ Cancelling attack"),this.actionState.setSelectedAttackTarget(null),this.actionState.setTargetUnit(null)}}let Gn=32,Vn=32;function rc(i,e){Gn=i,Vn=e}class ac{constructor(){this.effectMeshes=new Map,this.textureLoader=new yi,this.hoverSelectTexture=null,this.loadHoverSelectTexture()}loadHoverSelectTexture(){this.textureLoader.load(pr,e=>{e.magFilter=qe,e.minFilter=qe,e.generateMipmaps=!1,this.hoverSelectTexture=e,console.log("✅ Loaded hover select texture for tile effects")})}renderTileEffects(e){console.log("🎨 Rendering tile effects"),this.clearAllEffectMeshes();const t=e.getAllActiveEffects(),n=[];for(const s of t.values())n.push(...s);console.log(`🎨 Found ${n.length} active effects to render:`),n.forEach(s=>{console.log(`  - ${s.effectId} at (${s.position.x}, ${s.position.y}) ID: ${s.id}`),this.renderSingleEffect(s,e)}),console.log(`✅ Rendered ${n.length} tile effects`)}renderSingleEffect(e,t){if(!V)return;const n=t.getEffectDefinition(e.effectId);if(n){if(e.effectId==="toxic-tile"&&this.hoverSelectTexture){this.renderToxicTile(e,n);return}this.renderStandardTileEffect(e,n)}}renderToxicTile(e,t){if(!V||!this.hoverSelectTexture)return;const n=new tt(Gn,Vn),s=new nt({map:this.hoverSelectTexture,transparent:!0,opacity:.6,color:8388736,depthTest:!1,depthWrite:!1}),r=new Ye(n,s),o=e.position.x*Gn+Gn/2,a=-e.position.y*Vn-Vn/2;r.position.set(o,a,.3);const l=document.createElement("canvas");l.width=64,l.height=64;const c=l.getContext("2d");if(c){c.clearRect(0,0,64,64),c.font="32px Arial",c.textAlign="center",c.textBaseline="middle",c.fillStyle="#FFFF00",c.strokeStyle="#000000",c.lineWidth=2,c.strokeText(t.icon,32,32),c.fillText(t.icon,32,32);const d=new kn(l);d.needsUpdate=!0;const h=new tt(Gn*.6,Vn*.6),f=new nt({map:d,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),u=new Ye(h,f);u.position.set(o,a,.4);const g=new zi;g.add(r),g.add(u),V.add(g),this.effectMeshes.set(e.id,g)}console.log(`☢️ Rendered toxic tile with purple overlay at (${e.position.x}, ${e.position.y})`)}renderStandardTileEffect(e,t){if(!V)return;const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");if(!s)return;s.clearRect(0,0,64,64);const r=32,o=32,a=24;s.fillStyle=t.visualColor,s.globalAlpha=.3,s.beginPath(),s.arc(r,o,a,0,2*Math.PI),s.fill(),s.globalAlpha=1,s.font="32px Arial",s.textAlign="center",s.textBaseline="middle",s.fillStyle=t.visualColor,s.fillText(t.icon,r,o);const l=new kn(n);l.needsUpdate=!0;const c=new tt(Gn*.8,Vn*.8),d=new nt({map:l,transparent:!0,opacity:.8,alphaTest:.1,depthTest:!1,depthWrite:!1}),h=new Ye(c,d),f=e.position.x*Gn+Gn/2,u=-e.position.y*Vn-Vn/2;h.position.set(f,u,.3),V&&(V.add(h),this.effectMeshes.set(e.id,h)),console.log(`🎨 Rendered ${t.name} effect at (${e.position.x}, ${e.position.y})`)}updateTileEffects(e){this.renderTileEffects(e)}clearAllEffectMeshes(){V&&(console.log(`🧹 Clearing ${this.effectMeshes.size} effect meshes from scene`),this.effectMeshes.forEach((e,t)=>{V&&(V.remove(e),console.log(`🧹 Removed effect mesh for ${t}`)),e.geometry.dispose(),e.material instanceof nt&&(e.material.dispose(),e.material.map&&e.material.map.dispose())}),this.effectMeshes.clear(),console.log(`🧹 Cleared all effect meshes, map size: ${this.effectMeshes.size}`))}removeEffect(e){const t=this.effectMeshes.get(e);t&&V&&(V.remove(t),t.geometry.dispose(),t.material instanceof nt&&(t.material.dispose(),t.material.map&&t.material.map.dispose()),this.effectMeshes.delete(e))}cleanup(){this.clearAllEffectMeshes()}}const ha=new ac,py=Object.freeze(Object.defineProperty({__proto__:null,TileEffectRenderer:ac,globalTileEffectRenderer:ha,setTileSizeForTileEffects:rc},Symbol.toStringTag,{value:"Module"}));class my{constructor(e){this.actionState=e}setSkillTargeting(e,t){console.log(`🎯 Setting skill targeting for ${e.name} with ${t.length} targets`),this.actionState.setCurrentSkill(e),this.actionState.setValidSkillTargets(t),this.actionState.setSelectedSkillTarget(null),this.actionState.setSkillRotation(0)}setSkillTarget(e,t){console.log(`🎯 Setting skill target for ${e.name} at (${t.x}, ${t.y})`),this.actionState.setCurrentSkill(e),this.actionState.setSelectedSkillTarget(t),this.actionState.setSkillRotation(0)}selectTarget(e,t,n,s){console.log(`🎯 Attempting to select skill target at (${e}, ${t})`);const r=this.actionState.getValidSkillTargets(),o=this.actionState.getCurrentAttackData();if(!r.length&&!o)return console.warn("❌ No skill targets or attack data available"),{success:!1,targetUnit:null};let a=!1;if(r.length>0?a=r.some(c=>c.x===e&&c.y===t):o&&(a=o.validTiles.some(c=>c.x===e&&c.y===t)),!a)return console.log(`❌ Invalid skill target: (${e}, ${t}) - not in valid targets`),{success:!1,targetUnit:null};this.actionState.setSelectedSkillTarget({x:e,y:t});const l=n(e,t);return this.actionState.setTargetUnit(l),console.log(`✅ Selected skill target at (${e}, ${t})${l?` with unit ${l.name}`:" (empty tile)"}`),{success:!0,targetUnit:l}}rotateSkillTargets(){console.log("🔄 Rotating skill targets");const e=this.actionState.getCurrentSkill(),t=this.actionState.getSelectedSkillTarget();if(!e||!t){console.warn("❌ No skill or target selected for rotation");return}const n=this.actionState.rotateSkill();console.log(`🔄 Rotated to step ${n}`)}confirmSkill(e,t,n){const s=this.actionState.getCurrentSkill();if(!s)return console.warn("❌ No skill selected"),null;const r=this.actionState.getSelectedSkillTarget();if(!r)return console.warn("❌ No skill target selected"),null;console.log(`🎯 Executing skill: ${s.name} at position (${r.x}, ${r.y})`);const o=e.skillDamage+(s.bonusDamage||0);console.log(`💥 Total skill damage calculation: ${e.skillDamage} + ${s.bonusDamage||0} = ${o}`);const a=je.processActionModifiers(e);if(a.triggeredModifiers.length>0&&console.log(`⚡ Action modifiers triggered for ${e.name}: ${a.triggeredModifiers.join(", ")}`),e.currentEnergy<s.energyCost){console.warn(`❌ Not enough energy for ${s.name} after action modifiers. Required: ${s.energyCost}, Current: ${e.currentEnergy}`);const u=window.GAME_SCENE_INSTANCE;return u&&u.animationManager&&u.unitRenderer&&(u.animationManager.showFailedTextPopup(e,g=>u.unitRenderer.getUnitPosition(g)),console.log(`🎬 Showing FAILED animation for ${e.name} due to insufficient energy after action modifiers`)),null}e.currentEnergy-=s.energyCost,console.log(`⚡ ${e.name} uses ${s.energyCost} energy for ${s.name}, remaining: ${e.currentEnergy}/${e.maxEnergy}`);const l=new Map;if(s?.id==="teleport")return console.log(`🌀 ${e.name} teleports to (${r.x}, ${r.y})`),{success:!0,affectedUnits:[e],skill:s,damageDealt:l};if(s?.id==="prepare"){je.applyModifier(e,"STRENGTH",1,e.id),je.applyModifier(e,"STURDY",1,e.id);const u=window.GAME_SCENE_INSTANCE;return u&&u.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${e.name} - current modifiers:`,e.activeModifiers.length),u.unitRenderer.updateUnitModifiers(e),console.log(`🏷️ Updated visual modifiers for ${e.name} after Prepare`),setTimeout(()=>{u.unitRenderer.updateUnitModifiers(e),console.log(`🔄 Delayed visual modifier update for ${e.name}`)},100)),console.log(`🛡️ ${e.name} prepared themselves with Strength and Sturdy modifiers`),{success:!0,affectedUnits:[e],skill:s,damageDealt:l}}if(s?.id==="exhaust"){const u=t(r.x,r.y);if(!u)return console.warn(`❌ No target unit found for Exhaust skill at position (${r.x}, ${r.y})`),null;if(console.log(`🎯 Exhaust targeting: ${u.name} (${u.team}) at (${r.x}, ${r.y})`),u.team===e.team)return console.warn(`❌ Cannot use Exhaust on allied unit ${u.name}. Exhaust can only target enemy units.`),null;je.applyModifier(u,"WEAK",1,e.id),je.applyModifier(u,"SLOW",1,e.id),je.applyModifier(u,"TIRED",1,e.id);const g=window.GAME_SCENE_INSTANCE;return g&&g.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${u.name} - current modifiers:`,u.activeModifiers.length),g.unitRenderer.updateUnitModifiers(u),console.log(`🏷️ Updated visual modifiers for ${u.name} after Exhaust`),setTimeout(()=>{g.unitRenderer.updateUnitModifiers(u),console.log(`🔄 Delayed visual modifier update for ${u.name}`)},100)),console.log(`😴 ${e.name} exhausted ${u.name} - applied Weak, Slow, and Tired!`),{success:!0,affectedUnits:[u],skill:s,damageDealt:l}}if(s?.id==="jeer"){const u=t(r.x,r.y);if(!u)return console.warn(`❌ No target unit found for Jeer skill at position (${r.x}, ${r.y})`),null;if(console.log(`🎯 Jeer targeting: ${u.name} (${u.team}) at (${r.x}, ${r.y})`),u.team===e.team)return console.warn(`❌ Cannot use Jeer on allied unit ${u.name}. Jeer can only target enemy units.`),null;je.applyModifier(u,"EXPOSED",3,e.id),je.applyModifier(u,"WEAK",3,e.id);const g=window.GAME_SCENE_INSTANCE;return g&&g.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${u.name} - current modifiers:`,u.activeModifiers.length),g.unitRenderer.updateUnitModifiers(u),console.log(`🏷️ Updated visual modifiers for ${u.name} after Jeer`),setTimeout(()=>{g.unitRenderer.updateUnitModifiers(u),console.log(`🔄 Delayed visual modifier update for ${u.name}`)},100)),console.log(`😈 ${e.name} jeered at ${u.name}, applying Exposed and Weak modifiers`),{success:!0,affectedUnits:[u],skill:s,damageDealt:l}}if(s?.id==="lead-the-charge"){console.log(`🏃 ${e.name} is leading the charge!`);const u=n?n(e):null;if(!u)return console.warn(`❌ Cannot determine ${e.name}'s current position for Lead The Charge`),null;const g=[],y=[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}];for(const p of y){const v=u.x+p.x,x=u.y+p.y,M=t(v,x);M&&M.team===e.team&&M.id!==e.id&&(g.push(M),console.log(`⚡ Found adjacent ally: ${M.name} at (${v}, ${x})`))}g.forEach(p=>{je.applyModifier(p,"CHARGE",4,e.id),console.log(`⚡ Applied 4 Charge to ${p.name}`)});const m=window.GAME_SCENE_INSTANCE;return m&&m.unitRenderer&&g.forEach(p=>{m.unitRenderer.updateUnitModifiers(p)}),console.log(`🏃 ${e.name} completed Lead The Charge buffing - charged ${g.length} allies. Leap movement will be handled by targeting system.`),{success:!0,affectedUnits:[e,...g],skill:s,damageDealt:l}}if(s?.id==="rally"){console.log(`📢 ${e.name} is rallying allies!`);const u=r,g=[],y=[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}];for(const v of y){const x=u.x+v.x,M=u.y+v.y,P=t(x,M);P&&P.team===e.team&&P.id!==e.id&&(g.push(P),console.log(`⚡ Found adjacent ally: ${P.name} at (${x}, ${M})`))}const m=3;g.forEach(v=>{const x=v.currentEnergy;v.currentEnergy=Math.min(v.maxEnergy,v.currentEnergy+m);const M=v.currentEnergy;console.log(`⚡ ${v.name} energy restored: ${x} → ${M}/${v.maxEnergy} (+${M-x})`)});const p=window.GAME_SCENE_INSTANCE;return p&&p.unitRenderer&&g.forEach(v=>{p.unitRenderer.updateUnitBars(v)}),console.log(`📢 ${e.name} completed Rally - restored energy to ${g.length} allies.`),{success:!0,affectedUnits:[e,...g],skill:s,damageDealt:l}}if(s?.id==="flare-shot"){const u=t(r.x,r.y);if(!u)return console.warn(`❌ No target unit found for Flare Shot skill at position (${r.x}, ${r.y})`),null;if(console.log(`🎯 Flare Shot targeting: ${u.name} (${u.team}) at (${r.x}, ${r.y})`),u.team===e.team)return console.warn(`❌ Cannot use Flare Shot on allied unit ${u.name}. Flare Shot can only target enemy units.`),null;const g=o,y=je.processSkillDamageModifiers(e,g);console.log(`🔥 Base damage: ${g}, Modified damage: ${y.finalDamage}`),y.triggeredModifiers.length>0&&console.log(`🔥 Attacker modifiers triggered: ${y.triggeredModifiers.join(", ")}`);const m=je.processSkillDamageDefenseModifiers(u,y.finalDamage,e),p=m.finalDamage;console.log(`🛡️ Final damage after defense modifiers: ${p}`),m.triggeredModifiers.length>0&&console.log(`🔥 Defender modifiers triggered: ${m.triggeredModifiers.join(", ")}`);const v=u.currentHealth;u.currentHealth=Math.max(0,u.currentHealth-p);const x=u.currentHealth;console.log(`🔥 ${u.name} takes ${p} damage from Flare Shot: ${v} → ${x}/${u.health}`),l.set(u.id,p),je.applyModifier(u,"BURN",3,e.id);const M=window.GAME_SCENE_INSTANCE;return M&&M.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${u.name} - current modifiers:`,u.activeModifiers.length),M.unitRenderer.updateUnitModifiers(u),console.log(`🏷️ Updated visual modifiers for ${u.name} after Flare Shot`),setTimeout(()=>{M.unitRenderer.updateUnitModifiers(u),console.log(`🔄 Delayed visual modifier update for ${u.name}`)},100)),console.log(`🔥 ${e.name} hit ${u.name} with Flare Shot - dealt ${p} damage and applied 3 Burn!`),{success:!0,affectedUnits:[u],skill:s,damageDealt:l}}if(s?.id==="splash"){const u=t(r.x,r.y);if(!u)return console.warn(`❌ No target unit found for Splash skill at position (${r.x}, ${r.y})`),null;if(console.log(`🎯 Splash targeting: ${u.name} (${u.team}) at (${r.x}, ${r.y})`),u.team===e.team)return console.warn(`❌ Cannot use Splash on allied unit ${u.name}. Splash can only target enemy units.`),null;const g=o,y=je.processSkillDamageModifiers(e,g);console.log(`💧 Base damage: ${g}, Modified damage: ${y.finalDamage}`),y.triggeredModifiers.length>0&&console.log(`💧 Attacker modifiers triggered: ${y.triggeredModifiers.join(", ")}`);const m=je.processSkillDamageDefenseModifiers(u,y.finalDamage,e),p=m.finalDamage;console.log(`🛡️ Final damage after defense modifiers: ${p}`),m.triggeredModifiers.length>0&&console.log(`💧 Defender modifiers triggered: ${m.triggeredModifiers.join(", ")}`);const v=u.currentHealth;u.currentHealth=Math.max(0,u.currentHealth-p);const x=u.currentHealth;console.log(`💧 ${u.name} takes ${p} damage from Splash: ${v} → ${x}/${u.health}`),l.set(u.id,p),je.applyModifier(u,"WET",2,e.id);const M=window.GAME_SCENE_INSTANCE;return M&&M.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${u.name} - current modifiers:`,u.activeModifiers.length),M.unitRenderer.updateUnitModifiers(u),console.log(`🏷️ Updated visual modifiers for ${u.name} after Splash`),setTimeout(()=>{M.unitRenderer.updateUnitModifiers(u),console.log(`🔄 Delayed visual modifier update for ${u.name}`)},100)),console.log(`💧 ${e.name} hit ${u.name} with Splash - dealt ${p} damage and applied 2 Wet!`),{success:!0,affectedUnits:[u],skill:s,damageDealt:l}}if(s?.id==="spark-lance"){const u=t(r.x,r.y);if(!u)return console.warn(`❌ No target unit found for Spark Lance skill at position (${r.x}, ${r.y})`),null;if(console.log(`🎯 Spark Lance targeting: ${u.name} (${u.team}) at (${r.x}, ${r.y})`),u.team===e.team)return console.warn(`❌ Cannot use Spark Lance on allied unit ${u.name}. Spark Lance can only target enemy units.`),null;const g=o,y=je.processSkillDamageModifiers(e,g);console.log(`⚡ Base damage: ${g}, Modified damage: ${y.finalDamage}`),y.triggeredModifiers.length>0&&console.log(`⚡ Attacker modifiers triggered: ${y.triggeredModifiers.join(", ")}`);const m=je.processSkillDamageDefenseModifiers(u,y.finalDamage,e),p=m.finalDamage;console.log(`🛡️ Final damage after defense modifiers: ${p}`),m.triggeredModifiers.length>0&&console.log(`⚡ Defender modifiers triggered: ${m.triggeredModifiers.join(", ")}`);const v=u.currentHealth;u.currentHealth=Math.max(0,u.currentHealth-p);const x=u.currentHealth;console.log(`⚡ ${u.name} takes ${p} damage from Spark Lance: ${v} → ${x}/${u.health}`),l.set(u.id,p),je.applyModifier(u,"SHOCKED",2,e.id);const M=window.GAME_SCENE_INSTANCE;return M&&M.unitRenderer&&(console.log(`🔍 Updating visual modifiers for ${u.name} - current modifiers:`,u.activeModifiers.length),M.unitRenderer.updateUnitModifiers(u),console.log(`🏷️ Updated visual modifiers for ${u.name} after Spark Lance`),setTimeout(()=>{M.unitRenderer.updateUnitModifiers(u),console.log(`🔄 Delayed visual modifier update for ${u.name}`)},100)),console.log(`⚡ ${e.name} hit ${u.name} with Spark Lance - dealt ${p} damage and applied 2 Shocked!`),{success:!0,affectedUnits:[u],skill:s,damageDealt:l}}if(s?.id==="lights-on"){const u=n?n(e):null;if(!u)return console.warn("❌ Cannot determine caster position for Light's On"),null;const g=r.x,y=r.y,m=g-u.x,p=y-u.y;let v;return Math.abs(m)>Math.abs(p)?(v=[{x:g,y:y-1},{x:g,y},{x:g,y:y+1}],console.log(`🔍 Creating vertical spotlight row at (${g}, ${y}) - target is east/west of caster`)):(v=[{x:g-1,y},{x:g,y},{x:g+1,y}],console.log(`🔍 Creating horizontal spotlight row at (${g}, ${y}) - target is north/south of caster`)),v.forEach(x=>{x.x>=0&&x.x<8&&x.y>=0&&x.y<8&&(Nn.addEffect("spotlight",{x:x.x,y:x.y},-1,e.id),console.log(`🔍 ${e.name} placed a spotlight tile at (${x.x}, ${x.y})`))}),console.log(`🔍 ${e.name} activated Light's On, placed ${v.length} spotlight tiles in a row centered at (${g}, ${y})`),ha.updateTileEffects(Nn),{success:!0,affectedUnits:[],skill:s}}if(s?.id==="toxic-cloud"){const u=n?n(e):null;if(!u)return console.warn("❌ Cannot determine caster position for Toxic Cloud"),null;const g=r.x,y=r.y,m=g-u.x,p=y-u.y;let v;return Math.abs(m)>Math.abs(p)?(v=[{x:g,y:y-1},{x:g,y},{x:g,y:y+1}],console.log(`☢️ Creating vertical toxic line at (${g}, ${y}) - target is east/west of caster`)):(v=[{x:g-1,y},{x:g,y},{x:g+1,y}],console.log(`☢️ Creating horizontal toxic line at (${g}, ${y}) - target is north/south of caster`)),v.forEach(x=>{x.x>=0&&x.x<8&&x.y>=0&&x.y<8&&(Nn.addEffect("toxic-tile",{x:x.x,y:x.y},-1,e.id),console.log(`☢️ ${e.name} placed a toxic tile at (${x.x}, ${x.y})`))}),console.log(`☢️ ${e.name} activated Toxic Cloud, placed ${v.length} toxic tiles in a line centered at (${g}, ${y})`),ha.updateTileEffects(Nn),{success:!0,affectedUnits:[],skill:s}}const c=this.actionState.getSkillRotation(),d=s.getTargetPattern(r.x,r.y,"north",c);console.log(`🎯 Skill pattern has ${d.length} targets:`,d);const h=[];d.forEach(u=>{if(u.x>=0&&u.x<8&&u.y>=0&&u.y<8){const g=t(u.x,u.y);g&&(h.push(g),console.log(`🎯 Unit found at (${u.x}, ${u.y}): ${g.name} (${g.team})`))}}),console.log(`💥 Skill will affect ${h.length} units`),h.forEach(u=>{if(s?.id==="universal-whisper"||s?.id==="healing-circle"){const g=o,y=u.currentHealth;u.currentHealth=Math.min(u.health,u.currentHealth+g);const m=u.currentHealth;console.log(`💚 ${u.name} healed for ${g}: ${y} → ${m}/${u.health} (${s.name} can heal anyone!)`)}else if(u.team!==e.team){const g=o,y=je.processSkillDamageModifiers(e,g);console.log(`💥 Base damage: ${g}, Modified damage: ${y.finalDamage}`),y.triggeredModifiers.length>0&&console.log(`💥 Attacker modifiers triggered: ${y.triggeredModifiers.join(", ")}`);const m=je.processSkillDamageDefenseModifiers(u,y.finalDamage,e),p=m.finalDamage;console.log(`🛡️ Final damage after defense modifiers: ${p}`),m.triggeredModifiers.length>0&&console.log(`💥 Defender modifiers triggered: ${m.triggeredModifiers.join(", ")}`);const v=u.currentHealth;u.currentHealth=Math.max(0,u.currentHealth-p);const x=u.currentHealth;console.log(`💥 ${u.name} takes ${p} damage: ${v} → ${x}/${u.health}`),l.set(u.id,p)}else console.log(`💚 Skipping friendly unit ${u.name} (same team as caster)`)});const f=h.filter(u=>s?.id==="universal-whisper"||s?.id==="healing-circle"?!0:u.team!==e.team);return console.log(`✅ Skill ${s.name} executed successfully, affected ${f.length} units`),{success:!0,affectedUnits:f,skill:s,damageDealt:l}}}function gy(i,e){uy(i,e)}class yy{constructor(){this.actionState=new dy,this.indicatorManager=new hy,this.attackHandler=new fy(this.actionState),this.skillHandler=new my(this.actionState)}enterActionPhase(e,t,n){console.log(`⚔️ Entering ACTION phase for ${e.name}`),this.indicatorManager.clearAllIndicators(),this.actionState.reset()}exitActionPhase(){console.log("🚪 Exiting ACTION phase"),this.indicatorManager.clearAllIndicators(),this.actionState.reset()}clearVisualIndicators(){console.log("🧹 Clearing visual indicators only"),this.indicatorManager.clearAllIndicators()}setAttackMode(e,t){this.actionState.setAttackMode(e),this.actionState.setCurrentSkill(t),console.log(`🎯 Attack mode set to: ${e}${t?` (${t.name})`:""}`)}setAttackData(e){this.actionState.setCurrentAttackData(e),console.log(`📋 Attack data set with ${e.validTiles.length} valid targets`)}createAttackIndicators(){const e=this.actionState.getCurrentAttackData();e&&this.indicatorManager.createAttackIndicators(e)}setSkillTarget(e,t){this.skillHandler.setSkillTarget(e,t)}showSkillPreview(e,t){const n=this.actionState.getCurrentSkill(),s=this.actionState.getSkillRotation();n&&this.indicatorManager.showSkillPreview(n,e,t,s)}setSkillTargeting(e,t){this.skillHandler.setSkillTargeting(e,t)}createSkillTargetIndicators(){const e=this.actionState.getValidSkillTargets();this.indicatorManager.createSkillTargetIndicators(e)}selectAttackTarget(e,t,n,s){return this.actionState.getAttackMode()==="basic"?this.attackHandler.selectTarget(e,t,n,s):this.skillHandler.selectTarget(e,t,n,s)}getCurrentAttackMode(){return this.actionState.getAttackMode()}getCurrentSkill(){return this.actionState.getCurrentSkill()}getSelectedSkillTarget(){return this.actionState.getSelectedSkillTarget()}getSkillRotation(){return this.actionState.getSkillRotation()}confirmAttack(e){return this.actionState.getAttackMode()==="basic"?this.attackHandler.confirmAttack(e):(console.warn("❌ Skill attacks should use confirmSkill() method"),null)}cancelAttack(){this.attackHandler.cancelAttack()}rotateSkillTargets(){this.skillHandler.rotateSkillTargets();const e=this.actionState.getSelectedSkillTarget();e&&this.showSkillPreview(e.x,e.y)}checkGameEndConditions(){return Fi.checkGameEndConditions()}confirmSkill(e,t,n){return this.skillHandler.confirmSkill(e,t,n)}}class xy{showSkipButton(e){if(ni()){console.log("🚫 Blocked skip button creation - game has ended");return}console.log("⏭️ Creating skip button..."),this.hideMovementButtons();const t=document.createElement("button");t.id="move-skip-button",t.textContent="Skip Move",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#95a5a6",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Skip button added to document body")}showConfirmCancelButtons(e,t){if(ni()){console.log("🚫 Blocked confirm/cancel button creation - game has ended");return}this.hideMovementButtons();const n=document.createElement("button");n.id="move-confirm-button",n.textContent="Confirm",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#27ae60",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="move-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="90px",s.style.padding="8px 16px",s.style.backgroundColor="#e74c3c",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s)}hideMovementButtons(){const e=document.getElementById("move-skip-button"),t=document.getElementById("move-confirm-button"),n=document.getElementById("move-cancel-button");e&&e.remove(),t&&t.remove(),n&&n.remove()}showActionOptions(e,t,n,s){if(ni()){console.log("🚫 Blocked action options creation - game has ended");return}console.log(`⚔️ Creating action options for ${e.name}...`),this.hideActionButtons();let r=10;const o=document.createElement("button");o.id="action-skip-button",o.textContent="Skip Action",o.style.position="absolute",o.style.top="10px",o.style.right=`${r}px`,o.style.padding="8px 16px",o.style.backgroundColor="#e67e22",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>{console.log("⏭️ Action skip button clicked"),s()},document.body.appendChild(o),r+=120;const a=document.createElement("button");a.id="basic-attack-button",a.textContent="Attack",a.style.position="absolute",a.style.top="10px",a.style.right=`${r}px`,a.style.padding="8px 16px",a.style.backgroundColor="#c0392b",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>{console.log("⚔️ Basic attack button clicked"),t()},document.body.appendChild(a),r+=80,e.skills.forEach((l,c)=>{const d=e.currentEnergy>=l.energyCost,h=document.createElement("button");h.id=`skill-button-${c}`,h.textContent=`${l.emoji} ${l.name}`,h.style.position="absolute",h.style.top="10px",h.style.right=`${r}px`,h.style.padding="8px 16px",h.style.backgroundColor=d?"#8e44ad":"#7f8c8d",h.style.color="white",h.style.border="none",h.style.borderRadius="5px",h.style.cursor=d?"pointer":"not-allowed",h.style.zIndex="1000",h.style.fontFamily="sans-serif",h.style.fontWeight="bold",h.style.opacity=d?"1":"0.5",d&&(h.onclick=()=>{console.log(`✨ Skill button clicked: ${l.name}`),n(l)}),h.title=`${l.name} (${l.energyCost} energy)
${l.description}`,document.body.appendChild(h),r+=h.textContent.length*8+32}),console.log("✅ Action options added to document body")}showActionSkipButton(e){if(ni()){console.log("🚫 Blocked action skip button creation - game has ended");return}console.log("⏭️ Creating action skip button..."),this.hideActionButtons();const t=document.createElement("button");t.id="action-skip-button",t.textContent="Skip Action",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#e67e22",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Action skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Action skip button added to document body")}showAttackConfirmCancelButtons(e,t){if(ni()){console.log("🚫 Blocked attack confirm/cancel button creation - game has ended");return}console.log("🔴 showAttackConfirmCancelButtons called"),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const n=document.createElement("button");n.id="attack-confirm-button",n.textContent="Attack",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#c0392b",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const s=document.createElement("button");s.id="attack-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right="80px",s.style.padding="8px 16px",s.style.backgroundColor="#95a5a6",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(s),console.log("✅ Added Attack and Cancel buttons to document body")}showSkillConfirmCancelButtons(e,t,n){if(ni()){console.log("🚫 Blocked skill confirm/cancel button creation - game has ended");return}console.log(`✨ showSkillConfirmCancelButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const s=document.createElement("button");s.id="skill-confirm-button",s.textContent=`Confirm ${e}`,s.style.position="absolute",s.style.top="10px",s.style.right="10px",s.style.padding="8px 16px",s.style.backgroundColor="#8e44ad",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t();const r=document.createElement("button");r.id="skill-cancel-button",r.textContent="Cancel",r.style.position="absolute",r.style.top="10px",r.style.right=`${s.textContent.length*8+32+10}px`,r.style.padding="8px 16px",r.style.backgroundColor="#95a5a6",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>n(),document.body.appendChild(s),document.body.appendChild(r),console.log(`✅ Added ${e} Confirm and Cancel buttons to document body`)}showDualRotationalSkillButtons(e,t,n,s){if(ni()){console.log("🚫 Blocked dual rotational skill button creation - game has ended");return}console.log(`🔄 showDualRotationalSkillButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const r=document.createElement("button");r.id="skill-confirm-button",r.textContent=`Confirm ${e}`,r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.padding="8px 16px",r.style.backgroundColor="#8e44ad",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t();const o=document.createElement("button");o.id="skill-rotate-button",o.textContent="🔄 Rotate",o.style.position="absolute",o.style.top="10px",o.style.right=`${r.textContent.length*8+32+10}px`,o.style.padding="8px 16px",o.style.backgroundColor="#3498db",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>s();const a=document.createElement("button");a.id="skill-cancel-button",a.textContent="Cancel",a.style.position="absolute",a.style.top="10px",a.style.right=`${(r.textContent.length+o.textContent.length)*8+64+20}px`,a.style.padding="8px 16px",a.style.backgroundColor="#95a5a6",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>n(),document.body.appendChild(r),document.body.appendChild(o),document.body.appendChild(a),console.log(`✅ Added ${e} Confirm, Rotate, and Cancel buttons to document body`)}hideActionButtons(){const e=document.getElementById("action-skip-button"),t=document.getElementById("basic-attack-button"),n=document.getElementById("attack-confirm-button"),s=document.getElementById("attack-cancel-button"),r=document.getElementById("skill-confirm-button"),o=document.getElementById("skill-cancel-button"),a=document.getElementById("skill-rotate-button");e&&e.remove(),t&&t.remove(),n&&n.remove(),s&&s.remove(),r&&r.remove(),o&&o.remove(),a&&a.remove();for(let l=0;l<10;l++){const c=document.getElementById(`skill-button-${l}`);c&&c.remove()}}cleanup(){this.hideMovementButtons(),this.hideActionButtons()}}const _y="/assets/boom-DXpj0BEC.png";let ct=32,ot=32;function vy(i,e){ct=i,ot=e}class Sy{constructor(){this.textureLoader=new yi}showDamageAnimation(e,t){V&&(this.textureLoader.load(_y,n=>{if(!V)return;n.magFilter=qe,n.minFilter=qe,n.flipY=!0,n.generateMipmaps=!1;const s=new tt(ct*.8,ct*.8),r=new nt({map:n,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),o=new Ye(s,r),a=t(e);if(a){const l=a.x*ct+ct/2,c=-a.y*ot-ot/2;o.position.set(l,c,2.5),V.add(o),setTimeout(()=>{V&&V.remove(o)},500)}}),this.flickerUnit(e))}flickerUnit(e,t){let n;if(t)n=t(e);else{console.warn("No getUnitMesh function provided to flickerUnit");return}if(!n)return;const s=n.material.opacity;[{opacity:.2,delay:100},{opacity:s,delay:200},{opacity:.2,delay:300},{opacity:s,delay:400}].forEach(({opacity:o,delay:a})=>{setTimeout(()=>{if(n&&n.material){const l=n.material;l.opacity=o,l.transparent=!0}},a)})}showDeathAnimation(e,t,n){if(!V)return;console.log(`💀 Starting death animation for ${e.name}`);const s=document.createElement("canvas");s.width=64,s.height=64;const r=s.getContext("2d");if(r){r.clearRect(0,0,64,64),r.font="48px Arial",r.textAlign="center",r.textBaseline="middle",r.fillStyle="white",r.fillText("💀",32,32);const o=new kn(s);o.needsUpdate=!0;const a=new tt(ct*.6,ct*.6),l=new nt({map:o,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),c=new Ye(a,l),d=t(e);if(d){const h=d.x*ct+ct/2,f=-d.y*ot-ot/2;c.position.set(h,f-ot*.3,3),V.add(c),setTimeout(()=>{V&&V.remove(c),n&&(console.log(`🗑️ Death animation complete for ${e.name}, calling cleanup callback`),n())},2e3),console.log(`💀 Skull animation added for ${e.name}`)}}}showDamageAnimationWithFlicker(e,t,n){this.showDamageAnimation(e,t),this.flickerUnit(e,n)}showDamageTextPopup(e,t,n,s){if(!V)return;const r=s(e);if(!r)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=n?`${n}💥 -${t}`:`💥 -${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="white",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new kn(o);c.needsUpdate=!0;const d=new tt(ct*1.5,ct*.75),h=new nt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new Ye(d,h),u=r.x*ct+ct/2,g=-r.y*ot-ot/2;f.position.set(u,g-ot*.7,3),V.add(f);let y=Date.now();const m=2e3,p=()=>{const x=(Date.now()-y)/m;if(x>=1){V&&V.remove(f);return}const M=g-ot*.7,P=g-ot*1.5;f.position.y=M+(P-M)*x,h.opacity=1-x,requestAnimationFrame(p)};p()}showHealingTextPopup(e,t,n,s){if(!V)return;const r=s(e);if(!r)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=`${n}💚 +${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="#2ecc71",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new kn(o);c.needsUpdate=!0;const d=new tt(ct*1.5,ct*.75),h=new nt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new Ye(d,h),u=r.x*ct+ct/2,g=-r.y*ot-ot/2;f.position.set(u,g-ot*.7,3),V.add(f);let y=Date.now();const m=2e3,p=()=>{const x=(Date.now()-y)/m;if(x>=1){V&&V.remove(f);return}const M=g-ot*.7,P=g-ot*1.5;f.position.y=M+(P-M)*x,h.opacity=1-x,requestAnimationFrame(p)};p()}showHealingAnimation(e,t,n,s,r){this.showHealingTextPopup(e,t,n,s),r&&this.glowUnit(e,r,"#2ecc71")}glowUnit(e,t,n){const s=t(e);if(!s)return;const o=s.material.color.clone(),a=new Ze(n);[{color:a,delay:100},{color:o,delay:200},{color:a,delay:300},{color:o,delay:400}].forEach(({color:c,delay:d})=>{setTimeout(()=>{s&&s.material&&s.material.color.copy(c)},d)})}showSkillDamageAnimation(e,t,n,s,r){this.showDamageAnimation(e,s),this.showDamageTextPopup(e,t,n,s),r&&this.flickerUnit(e,r)}showSkillEffectAnimation(e,t,n,s,r,o=!1){o?this.showHealingAnimation(e,t,n,s,r):this.showSkillDamageAnimation(e,t,n,s,r)}showDebuffEffectAnimation(e,t,n,s){if(!V)return;const r=n(e);if(!r)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=`${t}`;a.font="bold 32px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="#9b59b6",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new kn(o);c.needsUpdate=!0;const d=new tt(ct*1.2,ct*.6),h=new nt({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),f=new Ye(d,h),u=r.x*ct+ct/2,g=-r.y*ot-ot/2;f.position.set(u,g-ot*.7,3),V.add(f);let y=Date.now();const m=1500,p=()=>{const x=(Date.now()-y)/m;if(x>=1){V&&V.remove(f);return}const M=g-ot*.7,P=g-ot*1.2;f.position.y=M+(P-M)*x,h.opacity=1-x,requestAnimationFrame(p)};if(p(),s){const v=s(e);if(v&&v.material&&v.material.color){const x=v.material,M=x.color.clone();x.color.setHex(10181046),setTimeout(()=>{x&&x.color.copy(M)},300)}}}showFailedTextPopup(e,t){if(!V)return;const n=t(e);if(!n)return;const s=document.createElement("canvas");s.width=128,s.height=64;const r=s.getContext("2d");if(!r)return;r.clearRect(0,0,128,64);const o="FAILED";r.font="bold 28px Arial",r.textAlign="center",r.textBaseline="middle",r.strokeStyle="black",r.lineWidth=3,r.fillStyle="#e74c3c",r.strokeText(o,64,32),r.fillText(o,64,32);const a=new kn(s);a.needsUpdate=!0;const l=new tt(ct*1.3,ct*.6),c=new nt({map:a,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),d=new Ye(l,c),h=n.x*ct+ct/2,f=-n.y*ot-ot/2;d.position.set(h,f-ot*.7,3),V.add(d);let u=Date.now();const g=500,y=()=>{const p=(Date.now()-u)/g;if(p>=1){V&&V.remove(d);return}const v=f-ot*.7,x=f-ot*1.1;d.position.y=v+(x-v)*p,c.opacity=1-p,requestAnimationFrame(y)};y()}}const ba={};for(const[i,e]of Object.entries(ga))ba[e.name]=i;console.log("🔄 GlobeLoader: Created className to unitType mapping:",ba);const lr=class lr{static async loadGlobe(e,t){if(console.log("🌍 Loading globe:",t.name),console.log("📋 Globe enemies (templates):",t.enemies),console.log(`📊 Globe has ${t.enemies.length} enemy templates`),console.log("🧹 Clearing existing enemy units from registry"),ue.enemyUnits=[],console.log("🏭 Creating fresh enemy units from templates..."),console.log("📊 globalUnitFactory available:",!!li),console.log("📊 globalUnitFactory.createUnit:",typeof li.createUnit),t.enemies.forEach((n,s)=>{if(!n){console.error(`❌ Enemy unit template at index ${s} is null or undefined`);return}console.log("🔨 Creating fresh enemy unit from template:",n),console.log(`📋 Template details: ${n.name} (${n.className}) - Health: ${n.currentHealth}/${n.health}`);const r=ba[n.className];if(console.log(`🔄 Mapping className '${n.className}' to unitType '${r}'`),!r){console.error(`❌ No unit type found for className: ${n.className}`);return}console.log(`🏭 Calling globalUnitFactory.createUnit('${r}', 'enemy')`);const o=li.createUnit(r,"enemy");if(!o){console.error(`❌ Failed to create fresh enemy unit of type: ${r} (className: ${n.className})`),console.error("❌ globalUnitFactory:",li),console.error("❌ Available methods:",Object.getOwnPropertyNames(li));return}console.log(`✅ Created fresh enemy unit: ${o.name} (${o.className}) with ${o.currentHealth}/${o.health} health`),console.log(`✅ Unit ID: ${o.id}, Team: ${o.team}`),ue.addUnitToEnemies(o),console.log(`✅ Added to registry. Current enemy count: ${ue.enemyUnits.length}`)}),console.log(`📊 Enemy units in registry after creation: ${ue.enemyUnits.length}`),console.log("📋 Enemy units:",ue.enemyUnits.map(n=>`${n.name} (${n.className})`)),console.log("👥 Placing player units..."),this.placePlayerUnits(e),console.log("👹 Placing enemy units..."),this.placeEnemyUnits(e),t.battleCondition.effect(ue.playerParty,ue.enemyUnits),Q&&!Q.isGameStarted()){console.log("🎮 Starting turn manager automatically after globe load"),Q.startGame();const{updateTurnDisplay:n}=await Ml(async()=>{const{updateTurnDisplay:s}=await Promise.resolve().then(()=>ux);return{updateTurnDisplay:s}},void 0);n(Q),setTimeout(()=>{console.log("🎯 Initializing unit selection indicators after delay"),e.updateUnitSelectionIndicators()},200)}}static placePlayerUnits(e){const t=ue.playerParty;console.log(`👥 Placing ${t.length} player units:`,t.map(n=>`${n.name} (${n.className})`)),t.forEach((n,s)=>{if(s<this.PLAYER_SPAWN_POINTS.length){const r=this.PLAYER_SPAWN_POINTS[s];console.log(`👤 Placing ${n.name} at (${r.x}, ${r.y})`),e.placeUnit(n,r.x,r.y)}else console.warn(`⚠️ No spawn point available for player unit ${n.name} (index ${s})`)})}static placeEnemyUnits(e){const t=ue.enemyUnits;console.log(`👹 Placing ${t.length} enemy units:`,t.map(n=>`${n.name} (${n.className})`)),t.forEach((n,s)=>{if(s<this.ENEMY_SPAWN_POINTS.length){const r=this.ENEMY_SPAWN_POINTS[s];console.log(`👺 Placing ${n.name} at (${r.x}, ${r.y})`),e.placeUnit(n,r.x,r.y)}else console.warn(`⚠️ No spawn point available for enemy unit ${n.name} (index ${s})`)})}};lr.PLAYER_SPAWN_POINTS=[{x:3,y:6},{x:4,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7}],lr.ENEMY_SPAWN_POINTS=[{x:4,y:1},{x:3,y:1},{x:4,y:0},{x:3,y:0},{x:2,y:0}];let fa=lr;function Ey(i,e){console.log("Showing Victory Screen"),Aa(),document.querySelectorAll("button").forEach(c=>{c.id!=="victory-continue-button"&&c.id!=="defeat-restart-button"&&c.id!=="shop-squad-button"&&c.id!=="shop-proceed-button"&&!c.classList.contains("buy-button-shop")&&!c.closest("#victory-screen")&&!c.closest("#defeat-screen")&&!c.closest("#shop-scene")&&(console.log(`🧹 Removing leftover button: ${c.textContent} (ID: ${c.id})`),c.remove())}),document.querySelectorAll("#game-info-panel, #turn-display-game-scene, #phase-display-game-scene, #debug-mode-display-game-scene").forEach(c=>{c.parentNode&&(c.parentNode.removeChild(c),console.log(`🧹 Removed UI element: ${c.id}`))}),i.innerHTML="";const s=document.createElement("div");s.id="victory-screen",s.style.width="100%",s.style.height="100%",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.backgroundColor="#2c5234",s.style.color="#ecf0f1",s.style.fontFamily="Arial, sans-serif",s.style.textAlign="center";const r=document.createElement("h1");r.textContent="YOU WIN!",r.style.fontSize="4em",r.style.margin="0 0 30px 0",r.style.color="#27ae60",r.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)",r.style.fontWeight="bold";const o=document.createElement("p");o.textContent="Congratulations! You have defeated all enemies.",o.style.fontSize="1.5em",o.style.margin="0 0 40px 0",o.style.color="#ecf0f1";const a=document.createElement("button");a.id="victory-continue-button",a.textContent="CONTINUE TO SHOP",a.style.padding="15px 30px",a.style.fontSize="1.2em",a.style.backgroundColor="#27ae60",a.style.color="white",a.style.border="none",a.style.borderRadius="8px",a.style.cursor="pointer",a.style.fontWeight="bold",a.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",a.style.transition="background-color 0.2s ease",a.addEventListener("mouseover",()=>{a.style.backgroundColor="#229954"}),a.addEventListener("mouseout",()=>{a.style.backgroundColor="#27ae60"});const l=setInterval(()=>{document.querySelectorAll("button").forEach(d=>{d.id!=="victory-continue-button"&&d.id!=="defeat-restart-button"&&d.id!=="shop-squad-button"&&d.id!=="shop-proceed-button"&&!d.classList.contains("buy-button-shop")&&!d.closest("#victory-screen")&&!d.closest("#defeat-screen")&&!d.closest("#shop-scene")&&(console.log(`🧹 Periodic cleanup: Removing button: ${d.textContent} (ID: ${d.id})`),d.remove())})},100);a.onclick=()=>{Qt.resource=10,Qt.incrementVictories(),console.log(`🎉 Victory! Resources set to 10, victories: ${Qt.victories}`),xa(),clearInterval(l),e()},s.appendChild(r),s.appendChild(o),s.appendChild(a),i.appendChild(s)}function My(i,e){console.log("Showing Defeat Screen"),Aa(),document.querySelectorAll("button").forEach(c=>{c.id!=="victory-continue-button"&&c.id!=="defeat-restart-button"&&c.id!=="shop-squad-button"&&c.id!=="shop-proceed-button"&&!c.classList.contains("buy-button-shop")&&!c.closest("#victory-screen")&&!c.closest("#defeat-screen")&&!c.closest("#shop-scene")&&(console.log(`🧹 Removing leftover button: ${c.textContent} (ID: ${c.id})`),c.remove())}),document.querySelectorAll("#game-info-panel, #turn-display-game-scene, #phase-display-game-scene, #debug-mode-display-game-scene").forEach(c=>{c.parentNode&&(c.parentNode.removeChild(c),console.log(`🧹 Removed UI element: ${c.id}`))}),i.innerHTML="";const s=document.createElement("div");s.id="defeat-screen",s.style.width="100%",s.style.height="100%",s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="center",s.style.backgroundColor="#5c2c2c",s.style.color="#ecf0f1",s.style.fontFamily="Arial, sans-serif",s.style.textAlign="center";const r=document.createElement("h1");r.textContent="YOU LOSE!",r.style.fontSize="4em",r.style.margin="0 0 30px 0",r.style.color="#e74c3c",r.style.textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)",r.style.fontWeight="bold";const o=document.createElement("p");o.textContent="All your units have been defeated. Better luck next time!",o.style.fontSize="1.5em",o.style.margin="0 0 40px 0",o.style.color="#ecf0f1";const a=document.createElement("button");a.id="defeat-restart-button",a.textContent="RESTART GAME",a.style.padding="15px 30px",a.style.fontSize="1.2em",a.style.backgroundColor="#e74c3c",a.style.color="white",a.style.border="none",a.style.borderRadius="8px",a.style.cursor="pointer",a.style.fontWeight="bold",a.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",a.style.transition="background-color 0.2s ease",a.addEventListener("mouseover",()=>{a.style.backgroundColor="#c0392b"}),a.addEventListener("mouseout",()=>{a.style.backgroundColor="#e74c3c"}),a.onclick=()=>{e()},s.appendChild(r),s.appendChild(o),s.appendChild(a),i.appendChild(s);const l=setInterval(()=>{document.querySelectorAll("button").forEach(d=>{d.id!=="victory-continue-button"&&d.id!=="defeat-restart-button"&&d.id!=="shop-squad-button"&&d.id!=="shop-proceed-button"&&!d.classList.contains("buy-button-shop")&&!d.closest("#victory-screen")&&!d.closest("#defeat-screen")&&!d.closest("#shop-scene")&&(console.log(`🧹 Periodic cleanup: Removing button: ${d.textContent} (ID: ${d.id})`),d.remove())})},100);a.onclick,a.onclick=()=>{clearInterval(l),e()}}class ki{constructor(e,t,n,s,r,o,a){this.id=e,this.name=t,this.level=n,this.imageUrl=s,this.reward=r,this.battleCondition=o,this.enemies=a}}const by="/assets/standardglobe-K-BPCSY1.png",Ty="/assets/neonrealm-B38s6ror.png",Ay="/assets/wormwoodcastle-C2u0nrjN.png",wy="/assets/templeofrelics-CJ0WGYAS.png",Cy="/assets/cave-PQ6A8Eo4.png",Ry="/assets/forest-CSRimZNq.png",Ii={NORMAL:{name:"Standard Battle",description:"A standard battle with no special conditions.",effect:()=>{}}},Ni={STANDARD:{resource:10}};function Py(i){const e=li.createUnit(i,"enemy");return e||(console.error(`❌ Failed to create enemy unit of type ${i}`),null)}function Oi(...i){const e=[];for(const t of i){const n=Py(t);n?e.push(n):console.error(`❌ Failed to create enemy of type ${t}, skipping...`)}return e}const Ly=[new ki("standard-globe","Standard Globe",1,by,Ni.STANDARD,Ii.NORMAL,Oi("swordsman")),new ki("neon-realm","Neon Realm",1,Ty,Ni.STANDARD,Ii.NORMAL,Oi("swordsman")),new ki("wormwood-castle","Wormwood Castle",1,Ay,Ni.STANDARD,Ii.NORMAL,Oi("swordsman")),new ki("temple-of-relics","Temple of Relics",1,wy,Ni.STANDARD,Ii.NORMAL,Oi("healer","hater")),new ki("the-caves","Cave",1,Cy,Ni.STANDARD,Ii.NORMAL,Oi("swordsman")),new ki("the-forest","Forest",1,Ry,Ni.STANDARD,Ii.NORMAL,Oi("swordsman"))];function Dy(i,e=3){return[...Ly.filter(s=>s.level===i)].sort(()=>Math.random()-.5).slice(0,e)}let Ta=null;function Uy(i){Ta=i}function ky(){return Ta}function Iy(){Ta=null}let fl=[];function pa(i,e){fl=Dy(1);const t=ue.playerParty.length>0;console.log("Showing Encounter Scene..."),i.innerHTML="";const n=document.createElement("div");n.id="encounter-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const s=document.createElement("h1");if(s.textContent="ENCOUNTER",s.style.textAlign="center",s.style.fontSize="3em",s.style.margin="0 0 15px 0",!t){const c=document.createElement("div");c.style.width="100%",c.style.padding="15px",c.style.backgroundColor="#e74c3c",c.style.color="#ffffff",c.style.borderRadius="8px",c.style.textAlign="center",c.style.fontSize="1.2em",c.style.fontWeight="bold",c.style.marginBottom="15px",c.style.border="2px solid #c0392b",c.innerHTML='⚠️ NO UNITS AVAILABLE!<br><span style="font-size: 0.9em; font-weight: normal;">You need to purchase units from the Shop before entering battles.</span>',n.appendChild(c)}const r=document.createElement("div");r.id="encounter-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-around",r.style.alignItems="center",r.style.overflow="hidden",r.style.padding="20px",fl.forEach((c,d)=>{const h=document.createElement("div");h.style.width="250px",h.style.height="350px",h.style.border=t?"2px solid #3498db":"2px solid #7f8c8d",h.style.borderRadius="10px",h.style.padding="15px",h.style.display="flex",h.style.flexDirection="column",h.style.alignItems="center",h.style.justifyContent="space-between",h.style.backgroundColor=t?"#34495e":"#2c3e50",h.style.cursor=t?"pointer":"not-allowed",h.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",h.style.opacity=t?"1":"0.5";const f=document.createElement("img");f.src=c.imageUrl,f.alt=c.name,f.style.width="150px",f.style.height="150px",f.style.objectFit="contain",f.style.marginBottom="10px",f.style.filter=t?"none":"grayscale(100%)";const u=document.createElement("h3");u.textContent=c.name,u.style.margin="0 0 10px 0",u.style.textAlign="center";const g=document.createElement("p");g.textContent=`Level ${c.level}`,g.style.margin="0 0 10px 0",g.style.color="#f1c40f";const y=document.createElement("p");y.textContent=c.battleCondition.name,y.style.margin="0 0 10px 0",y.style.fontStyle="italic";const m=document.createElement("p");m.textContent=`Reward: ${c.reward.resource} Resources`,m.style.margin="0 0 10px 0",m.style.color="#2ecc71";const p=document.createElement("p");p.textContent=`Enemies: ${c.enemies.length}`,p.style.margin="0 0 10px 0",t?(h.onclick=()=>{const v=document.querySelector(".selected-globe");v&&(v.classList.remove("selected-globe"),v.style.transform="translateY(0)",v.style.boxShadow="none"),h.classList.add("selected-globe"),h.style.transform="translateY(-10px)",h.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)",Uy(c),console.log("Selected globe stored:",c),console.log("Navigating to game scene with selected globe"),e()},h.addEventListener("mouseenter",()=>{h.classList.contains("selected-globe")||(h.style.transform="translateY(-5px)",h.style.boxShadow="0px 3px 10px rgba(0,0,0,0.2)")}),h.addEventListener("mouseleave",()=>{h.classList.contains("selected-globe")||(h.style.transform="translateY(0)",h.style.boxShadow="none")})):h.addEventListener("mouseenter",()=>{h.title="Purchase units from the Shop first!"}),h.appendChild(f),h.appendChild(u),h.appendChild(g),h.appendChild(y),h.appendChild(m),h.appendChild(p),r.appendChild(h)});const o=document.createElement("div");o.style.width="100%",o.style.display="flex",o.style.justifyContent="space-between",o.style.alignItems="center",o.style.paddingTop="15px",o.style.flexShrink="0";const a=document.createElement("div");a.id="player-resource-display",a.textContent=`Resource: ${Qt.resource}`,a.style.padding="10px 15px",a.style.backgroundColor="#1a1a1a",a.style.color="#f1c40f",a.style.borderRadius="5px",a.style.fontSize="1em",a.style.fontWeight="bold",a.style.display="flex",a.style.alignItems="center";const l=document.createElement("div");l.id="squad-info-display",l.textContent=`Squad: ${ue.playerParty.length}/5 units`,l.style.padding="10px 15px",l.style.backgroundColor=t?"#27ae60":"#e74c3c",l.style.color="#ffffff",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.display="flex",l.style.alignItems="center",o.appendChild(l),o.appendChild(a),n.appendChild(s),n.appendChild(r),n.appendChild(o),i.appendChild(n),console.log("Encounter Scene displayed.")}class Ny{constructor(){this.selectedGlobe=null,this.appContainer=null,console.log("GameStateManager initialized")}setAppContainer(e){this.appContainer=e}getAppContainer(){return this.appContainer}async setSelectedGlobe(e,t){console.log("Setting selected globe:",e),this.selectedGlobe=e,e&&await this.loadGlobe(e,t)}getSelectedGlobe(){return this.selectedGlobe}async loadGlobe(e,t){console.log("Loading globe in GameStateManager:",e),await fa.loadGlobe(t,e)}checkGameEndConditions(e){if(!this.appContainer){console.warn("❌ Cannot check game end conditions - no app container set");return}const t=e.checkGameEndConditions();t==="victory"?(console.log("🎉 VICTORY! Showing victory screen..."),Ey(this.appContainer,()=>{er(this.appContainer,()=>{console.log("🎮 Navigating from shop to encounter scene..."),ds?ds.handleDisplayEncounter():(console.error("❌ Global navigation handlers not available"),pa(this.appContainer,()=>{console.error("🎮 Fallback: Globe selection may not work properly")}))})})):t==="defeat"&&(console.log("💀 DEFEAT! Showing defeat screen..."),My(this.appContainer,()=>{console.log("🔄 Restarting game..."),Q&&Q.reset(),er(this.appContainer,()=>{console.log("🎮 Navigating from shop to encounter scene..."),ds?ds.handleDisplayEncounter():(console.error("❌ Global navigation handlers not available"),pa(this.appContainer,()=>{console.error("🎮 Fallback: Globe selection may not work properly")}))})}))}}class oc{calculateValidAttackTargets(e,t){const n=[],s=new Map,r=e.range||1;console.log(`⚔️ Calculating attack targets for ${e.name} with attack range ${r}`);for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=r){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&(n.push({x:c,y:d}),s.set(`${c},${d}`,[t,{x:c,y:d}]))}}return console.log(`🎯 Found ${n.length} valid attack tiles`),{validTiles:n,paths:s}}calculateAdjacentAttackTargets(e,t,n){const s=[],r=new Map;let o=1;n==="beam"?o=2:n==="longshot"?o=5:n==="lights-on"||n==="flare-shot"||n==="splash"?o=3:n==="spark-lance"&&(o=4),console.log(`⚔️ Calculating adjacent attack targets for ${e.name} with range ${o} (skill: ${n})`);const a=[{x:0,y:-o},{x:o,y:0},{x:0,y:o},{x:-o,y:0}];for(const l of a){const c=t.x+l.x,d=t.y+l.y;c>=0&&c<8&&d>=0&&d<8&&(s.push({x:c,y:d}),r.set(`${c},${d}`,[t,{x:c,y:d}]))}return console.log(`⚔️ Found ${s.length} adjacent attack tiles at range ${o}`),{validTiles:s,paths:r}}}class lc{calculateSkillTargets(e,t,n,s){const r=[];for(let o=-s;o<=s;o++)for(let a=-s;a<=s;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=s){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&this.isValidSkillCenter(c,d,n)&&r.push({x:c,y:d})}}return r}isValidSkillCenter(e,t,n){return n.getTargetPattern(e,t).every(r=>r.x>=0&&r.x<8&&r.y>=0&&r.y<8)}calculateTeleportDestinations(e,t,n,s,r){const a=r.getValidTeleportDestinations(e,t,n,s).filter(l=>{const c=Math.abs(l.x-t.x),d=Math.abs(l.y-t.y);return c===n&&d===0||c===0&&d===n});return console.log(`⚡ Found ${a.length} valid teleport destinations`),a}calculateLeapDestinations(e,t,n,s,r){const o=new Map;s.forEach((l,c)=>{const[d,h]=c.split(",").map(Number);o.set(l,{x:d,y:h})}),ui.updateOccupiedTiles(o);const a=ui.calculateValidLeapDestinations(e,t,n);return console.log(`🦘 Found ${a.length} valid leap destinations`),a}setupSkillTargeting(e,t,n,s,r,o,a,l,c,d){if(console.log(`✨ Setting up targeting for ${e.name}`),console.log(`🎯 Skill targeting type: ${e.targetingType}`),e.id==="bandage"){console.log("🩹 Bandage skill - auto-executing on caster"),s.setSkillTarget(e,n),l();return}if(e.id==="teleport"){console.log("⚡ Teleport skill - showing valid teleport destinations");const h=3,f=new Map;a.getUnitPositions().forEach((g,y)=>{if(y.id!==t.id){const m=`${g.x},${g.y}`;f.set(m,y)}});const u=this.calculateTeleportDestinations(t,n,h,f,o);s.setSkillTargeting(e,u),s.createSkillTargetIndicators(),r.showActionSkipButton(d);return}if(e.targetingType==="non-rotational"&&(e.id==="blazing-knuckle"||e.id==="healing-circle"))console.log("🔥 Self-centered skill - showing immediate preview around caster"),s.setSkillTarget(e,n),s.showSkillPreview(n.x,n.y),r.showSkillConfirmCancelButtons(e.name,l,c);else if(e.targetingType==="non-rotational"&&e.id==="lead-the-charge"){console.log("🏃 Lead The Charge skill - showing leap targeting");const h=new Map;a.getUnitPositions().forEach((g,y)=>{if(y.id!==t.id){const m=`${g.x},${g.y}`;h.set(m,y)}});const u=this.calculateLeapDestinations(t,n,3,h,o).filter(g=>{const y=Math.abs(g.x-n.x),m=Math.abs(g.y-n.y);return y>0&&m===0||y===0&&m>0});s.setSkillTargeting(e,u),s.createSkillTargetIndicators(),r.showActionSkipButton(d);return}else if(e.targetingType==="unit-rotational")console.log("🔄 Unit-rotational skill - showing rotatable preview around caster"),s.setSkillTarget(e,n),r.showDualRotationalSkillButtons(e.name,l,c,()=>{s.rotateSkillTargets()}),s.showSkillPreview(n.x,n.y);else if(e.targetingType==="adjacent-attack"){console.log("⚔️ Adjacent attack skill - showing attack-style targeting");const f=new oc().calculateAdjacentAttackTargets(t,n,e.id);s.setAttackMode("skill",e),s.setAttackData(f),s.createAttackIndicators(),console.log(`⚔️ Created ${f.validTiles.length} adjacent attack indicators for ${e.name}`),console.log("⚔️ Adjacent attack skill set up - player can now click on red indicators to target"),r.showActionSkipButton(d)}else if(e.targetingType==="dual-rotational"){console.log("🔄 Dual-rotational skill - allowing target selection with rotation");let h=4;e.id==="universal-whisper"?h=3:e.id==="exhaust"?h=4:e.id==="jeer"&&(h=3);const f=this.calculateSkillTargets(t,n,e,h);s.setSkillTargeting(e,f),s.createSkillTargetIndicators(),console.log(`🎯 Created ${f.length} skill target indicators for ${e.name}`),r.showActionSkipButton(d)}else{const h=t.range||1,f=this.calculateSkillTargets(t,n,e,h);s.setSkillTargeting(e,f),s.createSkillTargetIndicators(),console.log(`🎯 Created ${f.length} skill target indicators for ${e.name}`),r.showActionSkipButton(d)}}handleSkillTargetSelection(e,t,n,s,r,o,a,l){n?.targetingType==="dual-rotational"?(s.showSkillPreview(e,t),n.id==="exhaust"||n.id==="jeer"?(s.setSkillTarget(n,{x:e,y:t}),r.showSkillConfirmCancelButtons(n.name,o,a)):r.showDualRotationalSkillButtons(n.name,o,a,l)):n?.targetingType==="adjacent-attack"?(s.setSkillTarget(n,{x:e,y:t}),r.showSkillConfirmCancelButtons(n.name,o,a)):n?.id==="teleport"?(s.setSkillTarget(n,{x:e,y:t}),r.showSkillConfirmCancelButtons(n.name,o,a)):r.showSkillConfirmCancelButtons(n?.name||"Skill",o,a)}}let ls=32,cs=32;function Oy(i,e){ls=i,cs=e}class Fy{constructor(){this.attackCalculationService=new oc,this.skillTargetingService=new lc}enterMovePhase(e,t,n,s,r){t.setSelectedUnit(e),n.enterMovePhase(e,o=>r.getUnitPosition(o),()=>r.getUnitPositions()),s.showSkipButton(()=>{this.exitMovePhase(n,s),Q&&Q.advancePhase()})}exitMovePhase(e,t){e.exitMovePhase(),t.hideMovementButtons()}selectMoveTarget(e,t,n,s,r,o){const a=n.selectMoveTarget(e,t);if(a){const l=s.getSelectedUnit();l&&n.drawPathToTarget(c=>r.getUnitPosition(c),l),o.showConfirmCancelButtons(()=>this.confirmMove(s,n,r,o),()=>this.cancelMove(n,o))}return a}async confirmMove(e,t,n,s){const r=e.getSelectedUnit(),o=t.getSelectedMoveTarget();if(!r||!o){console.warn("❌ No unit or target selected");return}await t.executeMovement(r,o,"basic",(a,l)=>n.moveUnitToPosition(a,l),a=>n.getUnitPosition(a)),n.updateUnitBars(r),this.exitMovePhase(t,s),Q&&Q.advancePhase()}cancelMove(e,t){e.cancelMove(),t.showSkipButton(()=>{this.exitMovePhase(e,t),Q&&Q.advancePhase()})}enterActionPhase(e,t,n,s,r,o,a){t.setSelectedUnit(e),n.enterActionPhase(e,l=>r.getUnitPosition(l),()=>r.getUnitPositions()),s.showActionOptions(e,()=>this.initiateBasicAttack(e,t,n,s,r),l=>this.initiateSkillAttack(l,e,t,n,s,r,o,a),()=>{this.exitActionPhase(n,s),Q&&Q.endTurn()})}exitActionPhase(e,t){e.exitActionPhase(),t.hideActionButtons()}initiateBasicAttack(e,t,n,s,r){console.log("⚔️ Initiating basic attack mode"),this.setupBasicAttackTargeting(e,n,s,r)}initiateSkillAttack(e,t,n,s,r,o,a,l){if(console.log(`✨ Initiating skill attack: ${e.name}`),t.currentEnergy<e.energyCost){console.warn(`❌ Not enough energy for ${e.name}. Required: ${e.energyCost}, Current: ${t.currentEnergy}`);return}if(this.isSelfTargetingSkill(e,t,o)){console.log(`🎯 Self-targeting skill detected: ${e.name} - executing immediately`),s.setAttackMode("skill",e);const c=o.getUnitPosition(t);c&&(s.setSkillTarget(e,c),s.confirmSkill(t,(h,f)=>o.getUnitAtPosition(h,f),h=>o.getUnitPosition(h)||null)&&(o.updateUnitBars(t),o.updateUnitModifiers(t),console.log(`✅ Self-targeting skill ${e.name} executed successfully`))),this.exitActionPhase(s,r),Q&&Q.endTurn();return}this.setupSkillTargeting(e,t,s,r,o,a,l)}setupBasicAttackTargeting(e,t,n,s){t.setAttackMode("basic",null);const r=s.getUnitPosition(e);if(!r){console.error(`❌ No position found for unit ${e.name}`);return}this.showBasicAttackTargeting(e,r,t),n.showActionSkipButton(()=>{this.exitActionPhase(t,n),Q&&Q.endTurn()})}showBasicAttackTargeting(e,t,n){const s=e.range||1;console.log(`📍 Unit ${e.name} current position: (${t.x}, ${t.y})`),console.log(`⚔️ Unit attack range: ${s}`);const r=this.attackCalculationService.calculateValidAttackTargets(e,t);n.setAttackData(r),n.createAttackIndicators(),console.log("🎯 Basic attack targeting indicators created")}setupSkillTargeting(e,t,n,s,r,o,a){n.setAttackMode("skill",e);const l=r.getUnitPosition(t);if(!l){console.error(`❌ No position found for unit ${t.name}`);return}this.skillTargetingService.setupSkillTargeting(e,t,l,n,s,o,r,()=>{console.log(`✅ Confirming skill: ${e.name}`);const c=n.confirmSkill(t,(d,h)=>r.getUnitAtPosition(d,h),d=>r.getUnitPosition(d)||null);if(c){const{affectedUnits:d}=c;console.log(`🎯 Skill execution result: ${d.length} units affected`),console.log(`🎬 AnimationManager available: ${!!a}`),r.updateUnitBars(t),r.updateUnitModifiers(t);const h=n.getSelectedSkillTarget();if(h){const u=n.getSkillRotation(),g=e.getTargetPattern(h.x,h.y,"north",u);console.log(`🎯 ${e.name} target pattern:`,g),console.log(`🎯 Selected target: (${h.x}, ${h.y})`),console.log(`🎯 Using rotation: ${u}`),this.showSkillEmojiEffects(g,e.emoji)}d.forEach(u=>{r.updateUnitBars(u),r.updateUnitModifiers(u);const g=t.skillDamage+(e.bonusDamage||0),y=e.id==="universal-whisper"||e.id==="healing-circle"||e.id==="bandage";if(a)console.log(`🎬 Using AnimationManager for ${e.name} on ${u.name} with damage ${g}`),y?a.showHealingAnimation(u,g,e.emoji,m=>r.getUnitPosition(m),m=>r.getUnitMesh(m)):e.id==="exhaust"||e.id==="prepare"||e.id==="jeer"?(console.log(`😈 Using debuff animation for ${e.name} on ${u.name}`),a.showDebuffEffectAnimation(u,e.emoji,m=>r.getUnitPosition(m),m=>r.getUnitMesh(m))):a.showSkillDamageAnimation(u,g,e.emoji,m=>r.getUnitPosition(m),m=>r.getUnitMesh(m));else{console.log(`⚠️ No AnimationManager, using fallback for ${e.name} on ${u.name}`),y||console.log(`💥 Showing boom effect for ${u.name}`);const m=r.getUnitMesh(u);if(m){const p=m.material.color.clone();m.material.color.setHex(y?65280:16711680),setTimeout(()=>{m.material.color.copy(p)},200)}}});const f=d.filter(u=>u.currentHealth<=0);f.length>0&&f.forEach(u=>{setTimeout(()=>{if(console.log(`🗑️ Removing dead unit: ${u.name}`),r.removeUnit(u),Q){const g=u.team==="player"?"player":"enemy";Q.onUnitDeath(u.id,g),console.log(`☠️ Notified turn manager of ${u.name} death (${g} team)`)}},1e3)}),console.log(`✅ Skill ${e.name} executed successfully, affected ${d.length} units`)}this.exitActionPhase(n,s),Q&&Q.endTurn()},()=>{console.log(`❌ Cancelling skill: ${e.name}`),n.exitActionPhase(),s.showActionOptions(t,()=>this.initiateBasicAttack(t,void 0,n,s,r),c=>this.initiateSkillAttack(c,t,void 0,n,s,r,o,a),()=>{this.exitActionPhase(n,s),Q&&Q.endTurn()})},()=>{this.exitActionPhase(n,s),Q&&Q.endTurn()})}handleSkillTargetSelection(e,t,n,s,r,o,a,l){this.skillTargetingService.handleSkillTargetSelection(e,t,n,s,r,o,a,l)}showSkillEmojiEffects(e,t){e.forEach(n=>{n.x>=0&&n.x<8&&n.y>=0&&n.y<8&&this.showEmojiAtPosition(n.x,n.y,t)})}showEmojiAtPosition(e,t,n){if(!V){console.warn("SCENE_GLOBAL not available for emoji display");return}try{const s=document.createElement("canvas");s.width=64,s.height=64;const r=s.getContext("2d");if(!r)return;r.clearRect(0,0,64,64),r.font="48px Arial",r.textAlign="center",r.textBaseline="middle",r.fillText(n,32,32);const o=new kn(s);o.needsUpdate=!0;const a=new tt(ls*.8,cs*.8),l=new nt({map:o,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),c=new Ye(a,l),d=e*ls+ls/2,h=-t*cs-cs/2;c.position.set(d,h,2.5),V.add(c),console.log(`🔥 Added emoji ${n} at grid (${e}, ${t}) -> world (${d}, ${h}) using tile size ${ls}x${cs}`),setTimeout(()=>{V&&(V.remove(c),console.log(`🔥 Removed emoji ${n} from position (${e}, ${t})`))},800)}catch(s){console.error("Error creating emoji animation:",s)}}isSelfTargetingSkill(e,t,n){const s=n.getUnitPosition(t);if(!s||e.targetingType==="adjacent-attack"||e.targetingType==="dual-rotational"||e.id==="teleport"||e.id==="lead-the-charge")return!1;const r=e.getTargetPattern(s.x,s.y);if(r.length===1){const o=r[0];return o.x===s.x&&o.y===s.y}return!1}}function By(i,e){ey(i,e),iy(i,e),ay(i,e),gy(i,e),vy(i,e),Oy(i,e),rc(i,e)}class $y{constructor(){this.unitRenderer=new ty,this.selectionManager=new sy,this.movementManager=new oy,this.actionManager=new yy,this.uiManager=new xy,this.animationManager=new Sy,this.gameStateManager=new Ny,this.gamePhaseManager=new Fy,this.skillTargetingService=new lc,console.log("GameScene initialized"),ui.setMapDimensions(8,8)}setAppContainer(e){this.gameStateManager.setAppContainer(e)}checkGameEndConditions(){this.gameStateManager.checkGameEndConditions(this.actionManager)}async setSelectedGlobe(e){await this.gameStateManager.setSelectedGlobe(e,this)}async placeUnit(e,t,n){console.log(`🎯 GameScene.placeUnit called for ${e.name} (${e.className}, ${e.team}) at (${t}, ${n})`),console.log(`📋 Unit details: ID=${e.id}, Health=${e.currentHealth}/${e.health}, Energy=${e.currentEnergy}/${e.maxEnergy}`),await this.unitRenderer.placeUnit(e,t,n),console.log(`✅ Unit placement completed for ${e.name}`)}getUnitPosition(e){return this.unitRenderer.getUnitPosition(e)}removeUnit(e){this.unitRenderer.removeUnit(e)}getUnitAtPosition(e,t){return this.unitRenderer.getUnitAtPosition(e,t)}getAllUnits(){return this.unitRenderer.getAllUnits()}updateUnitSelectionIndicators(){this.selectionManager.updateUnitSelectionIndicators(e=>this.unitRenderer.getUnitPosition(e))}selectUnit(e){return this.selectionManager.selectUnit(e)}getSelectedUnit(){return this.selectionManager.getSelectedUnit()}enterMovePhase(e){this.gamePhaseManager.enterMovePhase(e,this.selectionManager,this.movementManager,this.uiManager,this.unitRenderer)}exitMovePhase(){this.gamePhaseManager.exitMovePhase(this.movementManager,this.uiManager)}selectMoveTarget(e,t){return this.gamePhaseManager.selectMoveTarget(e,t,this.movementManager,this.selectionManager,this.unitRenderer,this.uiManager)}async confirmMove(){await this.gamePhaseManager.confirmMove(this.selectionManager,this.movementManager,this.unitRenderer,this.uiManager)}cancelMove(){this.gamePhaseManager.cancelMove(this.movementManager,this.uiManager)}async executeMovement(e,t,n){await this.movementManager.executeMovement(e,t,n,(s,r)=>this.unitRenderer.moveUnitToPosition(s,r),s=>this.unitRenderer.getUnitPosition(s)),this.unitRenderer.updateUnitBars(e)}enterActionPhase(e){this.gamePhaseManager.enterActionPhase(e,this.selectionManager,this.actionManager,this.uiManager,this.unitRenderer,this.movementManager,this.animationManager)}exitActionPhase(){this.gamePhaseManager.exitActionPhase(this.actionManager,this.uiManager)}initiateBasicAttack(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected");return}this.gamePhaseManager.initiateBasicAttack(e,this.selectionManager,this.actionManager,this.uiManager,this.unitRenderer)}initiateSkillAttack(e){const t=this.selectionManager.getSelectedUnit();if(!t){console.warn("❌ No unit selected");return}this.gamePhaseManager.initiateSkillAttack(e,t,this.selectionManager,this.actionManager,this.uiManager,this.unitRenderer,this.movementManager,this.animationManager)}selectAttackTarget(e,t){const n=this.selectionManager.getSelectedUnit();if(!n)return console.warn("❌ No unit selected"),!1;const s=this.actionManager.selectAttackTarget(e,t,(r,o)=>this.getUnitAtPosition(r,o),n);if(s.success)if(this.actionManager.getCurrentAttackMode()==="skill"){const o=this.actionManager.getCurrentSkill();o&&this.skillTargetingService.handleSkillTargetSelection(e,t,o,this.actionManager,this.uiManager,()=>this.confirmSkill(),()=>this.cancelSkill(),()=>this.rotateSkillTargets())}else s.targetUnit&&this.uiManager.showAttackConfirmCancelButtons(()=>this.confirmAttack(),()=>this.cancelAttack());return s.success}confirmAttack(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for attack");return}const t=this.actionManager.confirmAttack(e);if(!t){console.warn("❌ Attack confirmation failed");return}const{damage:n,target:s}=t;console.log("🔍 Debug - About to update unit bars:"),console.log("  - selectedUnit:",e?`${e.name} (${e.team})`:"null"),console.log("  - target:",s?`${s.name} (${s.team})`:"null"),s&&(this.unitRenderer.updateUnitBars(s),this.unitRenderer.updateUnitModifiers(s)),e&&(this.unitRenderer.updateUnitBars(e),this.unitRenderer.updateUnitModifiers(e)),this.animationManager.showDamageAnimationWithFlicker(s,r=>this.unitRenderer.getUnitPosition(r),r=>this.unitRenderer.getUnitMesh(r)),s.currentHealth<=0&&setTimeout(()=>{this.animationManager.showDeathAnimation(s,r=>this.unitRenderer.getUnitPosition(r),()=>{if(console.log(`🗑️ Removing dead unit: ${s.name}`),this.removeUnit(s),Q){const r=s.team==="player"?"player":"enemy";Q.onUnitDeath(s.id,r),console.log(`☠️ Notified turn manager of ${s.name} death (${r} team)`)}setTimeout(()=>{this.checkGameEndConditions()},100)})},900),this.exitActionPhase(),Q&&Q.endTurn()}cancelAttack(){this.actionManager.cancelAttack(),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),Q&&Q.endTurn()})}async confirmSkill(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for skill");return}const t=this.actionManager.getCurrentSkill();if(this.actionManager.getSelectedSkillTarget(),!t){console.warn("❌ No skill selected for confirmation");return}if(this.actionManager.clearVisualIndicators(),t?.id==="teleport"){await this.handleTeleportSkill(e,t);return}if(t?.id==="lead-the-charge"){await this.handleLeadTheChargeSkill(e,t);return}const n=this.actionManager.confirmSkill(e,(a,l)=>this.getUnitAtPosition(a,l),a=>this.unitRenderer.getUnitPosition(a)||null);if(!n){console.warn("❌ Skill confirmation failed");return}const{affectedUnits:s,damageDealt:r}=n;this.unitRenderer.updateUnitBars(e),this.unitRenderer.updateUnitModifiers(e),s.forEach(a=>{if(this.unitRenderer.updateUnitBars(a),t){const l=t.id==="universal-whisper"||t.id==="healing-circle"||t.id==="bandage";if(t.id==="exhaust"||t.id==="prepare"||t.id==="jeer")this.animationManager.showDebuffEffectAnimation(a,t.emoji,d=>this.unitRenderer.getUnitPosition(d),d=>this.unitRenderer.getUnitMesh(d));else{const d=r?.get(a.id)||e.skillDamage+(t.bonusDamage||0);console.log(`🎬 Using actual ${l?"healing":"damage"} amount for ${a.name}: ${d}`),this.animationManager.showSkillEffectAnimation(a,d,t.emoji,h=>this.unitRenderer.getUnitPosition(h),h=>this.unitRenderer.getUnitMesh(h),l)}}else this.animationManager.showDamageAnimationWithFlicker(a,l=>this.unitRenderer.getUnitPosition(l),l=>this.unitRenderer.getUnitMesh(l))});const o=s.filter(a=>a.currentHealth<=0);o.length>0&&o.forEach(a=>{setTimeout(()=>{console.log(`💀 Unit died from skill: ${a.name}`),this.handleUnitDeath(a)},1e3)}),this.exitActionPhase(),Q&&Q.endTurn()}async handleTeleportSkill(e,t){console.log(`⚡ Handling teleport skill for ${e.name}`);const n=this.actionManager.getSelectedSkillTarget();if(!n){console.warn("❌ No teleport destination selected");return}if(e.currentEnergy<t.energyCost){console.warn(`❌ Not enough energy for ${t.name}. Required: ${t.energyCost}, Current: ${e.currentEnergy}`);return}const s=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-t.energyCost),console.log(`⚡ ${e.name} energy: ${s} → ${e.currentEnergy}/${e.maxEnergy}`),await this.executeMovement(e,n,"teleport"),this.unitRenderer.updateUnitBars(e),console.log(`⚡ ${e.name} teleported to (${n.x}, ${n.y})`),this.exitActionPhase(),Q&&Q.endTurn()}async handleLeadTheChargeSkill(e,t){console.log(`🏃 Handling Lead The Charge skill for ${e.name}`);const n=this.actionManager.getSelectedSkillTarget();if(!n){console.warn("❌ No leap destination selected");return}if(e.currentEnergy<t.energyCost){console.warn(`❌ Not enough energy for ${t.name}. Required: ${t.energyCost}, Current: ${e.currentEnergy}`);return}const s=this.actionManager.confirmSkill(e,(o,a)=>this.unitRenderer.getUnitAtPosition(o,a),o=>this.unitRenderer.getUnitPosition(o)||null);if(!s||!s.success){console.warn("❌ Lead The Charge skill execution failed");return}const r=e.currentEnergy;e.currentEnergy=Math.max(0,e.currentEnergy-t.energyCost),console.log(`🏃 ${e.name} energy: ${r} → ${e.currentEnergy}/${e.maxEnergy}`),await this.executeMovement(e,n,"leap"),this.unitRenderer.updateUnitBars(e),console.log(`🏃 ${e.name} completed Lead The Charge and leaped to (${n.x}, ${n.y})`),this.exitActionPhase(),Q&&Q.endTurn()}cancelSkill(){console.log("❌ Cancelling skill selection");const e=this.selectionManager.getSelectedUnit();e&&this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),Q&&Q.endTurn()})}rotateSkillTargets(){console.log("🔄 Rotating skill targets"),this.actionManager.rotateSkillTargets()}showDamageAnimation(e,t,n){this.animationManager.showDamageTextPopup(e,t,n,s=>this.getUnitPosition(s))}updateUnitBars(e){this.unitRenderer.updateUnitBars(e)}handleUnitDeath(e){if(console.log(`💀 Handling death of ${e.name}`),this.removeUnit(e),Q){const n=e.team==="player"?"player":"enemy";Q.onUnitDeath(e.id,n),console.log(`☠️ Notified turn manager of ${e.name} death (${n} team)`)}Q?.getGameState().currentPhase==="ACTION"&&(console.log("🧹 Cleaning up action phase UI before victory check"),this.exitActionPhase(),Q&&Q.endTurn()),setTimeout(()=>{this.checkGameEndConditions()},50)}}function Hy(i,e,t){console.log("Creating full tilemap mesh...");const n=Math.floor(e.image.width/i.tilewidth);console.log("Tileset columns for full map:",n);const s=[],r=[],o=[],a=[];let l=0;const c=0;if(i.layers.forEach(u=>{if(u.type==="tilelayer"&&u.visible&&u.data)for(let g=0;g<u.height;g++)for(let y=0;y<u.width;y++){const m=u.data[g*u.width+y];if(m===c)continue;const p=i.tilesets[0].firstgid,v=m-p;if(v<0)continue;const x=v%n,M=Math.floor(v/n),P=x*i.tilewidth/e.image.width,A=(x+1)*i.tilewidth/e.image.width,w=M*i.tileheight/e.image.height,G=(M+1)*i.tileheight/e.image.height,S=y*i.tilewidth*t,T=-g*i.tileheight*t;s.push(S,T,0),r.push(P,w),a.push(0,0,1),s.push(S,T-i.tileheight*t,0),r.push(P,G),a.push(0,0,1),s.push(S+i.tilewidth*t,T,0),r.push(A,w),a.push(0,0,1),s.push(S+i.tilewidth*t,T-i.tileheight*t,0),r.push(A,G),a.push(0,0,1),o.push(l+0,l+1,l+2),o.push(l+2,l+1,l+3),l+=4}}),s.length===0)return console.log("No vertices to render for the full map."),null;const d=new Mn;d.setAttribute("position",new pn(s,3)),d.setAttribute("uv",new pn(r,2)),d.setAttribute("normal",new pn(a,3)),d.setIndex(o);const h=new nt({map:e,color:16777215,side:En}),f=new Ye(d,h);return console.log("Full tilemap mesh created."),f}let Gt=null;function zy(i){const e=document.createElement("div");return e.id="game-info-panel",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.width="280px",e.style.minHeight="120px",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="15px",e.style.borderRadius="8px",e.style.border="2px solid #555",e.style.display="none",e.style.zIndex="101",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.fontFamily="Arial, sans-serif",e.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",e.style.boxShadow="0 0 10px rgba(52, 152, 219, 0.5)",i.appendChild(e),e}function Gy(i){if(!Gt)return;const e=i.team==="player"?"#3498db":i.team==="enemy"?"#e74c3c":"#95a5a6",t=Math.max(0,Math.min(100,i.currentHealth/i.health*100)),n=i.maxEnergy>0?Math.max(0,Math.min(100,i.currentEnergy/i.maxEnergy*100)):0;Gt.innerHTML=`
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
        
        <!-- Modifiers Section -->
        ${i.activeModifiers&&i.activeModifiers.length>0?`
            <div style="margin-top: 12px; border-top: 1px solid #555; padding-top: 8px;">
                <h5 style="margin: 0 0 6px 0; color: #f39c12; font-size: 0.9em;">Active Modifiers:</h5>
                ${i.activeModifiers.map(s=>{const r=os[s.modifierKey];return`
                        <div style="margin-bottom: 4px; padding: 4px 6px; background-color: rgba(243, 156, 18, 0.1); border-radius: 3px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: bold; color: ${je.getModifierColor(s.modifierKey)}; font-size: 0.8em;">${r?.name||s.modifierKey}</span>
                                <span style="color: #f39c12; font-size: 0.75em;">x${s.stacks}</span>
                            </div>
                            <p style="margin: 2px 0 0 0; font-size: 0.7em; color: #bdc3c7; line-height: 1.2;">
                                ${r?.description||"Unknown modifier effect"}
                            </p>
                        </div>
                    `}).join("")}
            </div>
        `:""}
    `}function Vy(i){Gt&&(Gy(i),Gt.style.display="block")}function Ks(){Gt&&(Gt.style.display="none")}function pl(i,e){!Gt||i.length===0||(Gt.innerHTML=`
        <div style="border-bottom: 1px solid #f39c12; margin-bottom: 10px; padding-bottom: 8px;">
            <h4 style="margin: 0; text-align: center; color: #f39c12; font-size: 1.1em;">
                Tile Effects
            </h4>
            <p style="margin: 2px 0; text-align: center; font-style: italic; color: #bdc3c7; font-size: 0.85em;">
                Position: (${e.x}, ${e.y})
            </p>
        </div>
        
        ${i.map(t=>{const n=Nn.getEffectDefinition(t.effectId);if(!n)return"";const s=Wy(t.effectId),r=n.name,o=n.description,a=n.icon;let l="";if(t.appliedBy){const c=Xy(t.appliedBy);c?l=`<span style="color: ${c.team==="player"?"#e74c3c":"#3498db"}; font-weight: bold;">${c.name} (${c.className})</span>`:l=t.appliedBy}return`
                <div style="margin-bottom: 12px; padding: 8px; background-color: rgba(243, 156, 18, 0.1); border-radius: 6px; border-left: 3px solid ${s};">
                    <div style="display: flex; align-items: center; margin-bottom: 6px;">
                        <span style="font-size: 1.2em; margin-right: 8px;">${a}</span>
                        <div>
                            <h5 style="margin: 0; color: ${s}; font-size: 0.9em;">${r}</h5>
                            <p style="margin: 0; font-size: 0.7em; color: #bdc3c7;">
                                ${t.duration===-1?"Permanent":`Duration: ${t.duration} turns`}
                            </p>
                        </div>
                    </div>
                    <p style="margin: 0; font-size: 0.8em; color: #ecf0f1; line-height: 1.3;">
                        ${o}
                    </p>
                    ${l?`
                        <p style="margin: 4px 0 0 0; font-size: 0.7em; color: #95a5a6; font-style: italic;">
                            Applied by: ${l}
                        </p>
                    `:""}
                </div>
            `}).join("")}
        
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #555; font-size: 0.7em; color: #7f8c8d; text-align: center;">
            💡 Hover over units to see their information
        </div>
    `,Gt.style.display="block")}function Wy(i){switch(i){case"toxic-tile":return"#9b59b6";case"spotlight":return"#f1c40f";case"spike-trap":return"#e74c3c";case"healing-spring":return"#2ecc71";case"energy-well":return"#3498db";default:return"#95a5a6"}}function Xy(i){for(const e of ue.playerParty)if(e.id===i)return e;for(const e of ue.enemyUnits)if(e.id===i)return e;return null}function ml(i,e){return Nn.getEffectsAtPosition({x:i,y:e})}function qy(i){Gt=zy(i),console.log("Game info panel initialized")}function Yy(){Gt&&Gt.parentNode&&Gt.parentNode.removeChild(Gt),Gt=null}let Ke={mapData:null,hoverMesh:null,renderer:null,displayScale:1},Ln=null;function jy(i,e,t,n){Ke.mapData=i,Ke.hoverMesh=e,Ke.renderer=t,Ke.displayScale=n}function cc(i){if(!Ke.mapData||!xt||!Ke.hoverMesh||!Ke.renderer)return;const e=4,t=Ke.renderer.domElement,n=t.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,o=n.width,a=n.height;if(s<0||r<0||s>=o||r>=a){xt.innerText="Outside map",Ke.hoverMesh.visible=!1,t.style.cursor="default";return}const l=s/Ke.displayScale,c=r/Ke.displayScale,d=Ke.mapData.tilewidth*e,h=Ke.mapData.tileheight*e,f=Math.floor(l/d),u=Math.floor(c/h);if(f>=0&&f<Ke.mapData.width&&u>=0&&u<Ke.mapData.height){xt.innerText=`Tile: (${f}, ${u})`,Ke.hoverMesh.position.x=f*d+d/2,Ke.hoverMesh.position.y=-u*h-h/2,Ke.hoverMesh.visible=!0;const g=window.GAME_SCENE_INSTANCE;if(g){const y=g.getUnitAtPosition(f,u);if(y&&Q&&Q.canSelect()&&Q.canSelectUnit(y.id)?t.style.cursor="pointer":t.style.cursor="none",y&&y!==Ln)Ln=y,Vy(y);else if(!y&&Ln){Ln=null;const m=ml(f,u);m.length>0?pl(m,{x:f,y:u}):Ks()}else if(!y){const m=ml(f,u);m.length>0?pl(m,{x:f,y:u}):Ln||Ks()}}else t.style.cursor="none"}else xt.innerText="Outside map",Ke.hoverMesh.visible=!1,t.style.cursor="default",Ln&&(Ln=null,Ks())}function dc(i){if(!Ke.mapData||!Ke.renderer||!Q)return;const e=4,n=Ke.renderer.domElement.getBoundingClientRect(),s=i.clientX-n.left,r=i.clientY-n.top,o=n.width,a=n.height;if(s<0||r<0||s>=o||r>=a)return;const l=s/Ke.displayScale,c=r/Ke.displayScale,d=Ke.mapData.tilewidth*e,h=Ke.mapData.tileheight*e,f=Math.floor(l/d),u=Math.floor(c/h);if(f>=0&&f<Ke.mapData.width&&u>=0&&u<Ke.mapData.height){const g=window.GAME_SCENE_INSTANCE;if(g){const y=g.getUnitAtPosition(f,u);if(Q&&Q.canSelect())y&&(Q.getSelectableUnits().some(v=>v.id===y.id)?g.selectUnit(y)?(console.log(`✅ Successfully selected unit: ${y.name}`),Q.advancePhase()):console.log(`❌ Failed to select unit: ${y.name}`):console.log(`❌ Unit not selectable: ${y.name}`));else if(Q&&Q.canAct()){const m=g.selectAttackTarget(f,u);console.log(m?y?`✅ Successfully selected attack target: ${y.name} at (${f}, ${u})`:`✅ Successfully selected attack target position: (${f}, ${u})`:y?`❌ Invalid attack target: ${y.name} at (${f}, ${u})`:`❌ Invalid attack target position: (${f}, ${u})`)}else if(Q&&Q.canMove()&&!y){const m=g.selectMoveTarget(f,u);console.log(m?`✅ Successfully selected move target: (${f}, ${u})`:`❌ Invalid move target: (${f}, ${u})`)}}}}function uc(){Ke.hoverMesh&&xt&&(Ke.hoverMesh.visible=!1,xt.innerText="Outside map",Ke.renderer&&(Ke.renderer.domElement.style.cursor="default")),Ln&&(Ln=null,Ks())}function Ky(i){i.domElement.addEventListener("mousemove",cc,!1),i.domElement.addEventListener("mouseleave",uc,!1),i.domElement.addEventListener("click",dc,!1)}function Zy(i){i.domElement.removeEventListener("mousemove",cc),i.domElement.removeEventListener("mouseleave",uc),i.domElement.removeEventListener("click",dc)}let Zs=null,vt={renderer:null,scene:null,camera:null};function Jy(i,e,t){vt.renderer=i,vt.scene=e,vt.camera=t}function hc(){Zs=requestAnimationFrame(hc),vt.renderer&&vt.scene&&vt.camera&&vt.renderer.render(vt.scene,vt.camera)}function Qy(){hc(),console.log("Animation loop started")}function ex(){Zs!==null&&(cancelAnimationFrame(Zs),Zs=null,console.log("Animation loop stopped"))}function tx(){ex(),vt.renderer&&(vt.renderer.dispose(),vt.renderer.domElement.parentNode&&vt.renderer.domElement.parentNode.removeChild(vt.renderer.domElement)),vt.scene&&vt.scene.traverse(i=>{i instanceof Ye&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()))}),vt.renderer=null,vt.scene=null,vt.camera=null,console.log("Renderer cleaned up.")}let Bi=null,kt=null,Xs=1,Jt=null,V=null,Wi=null,fc=!1;function ni(){return fc}function pc(i){fc=i,console.log(i?"🏁 Game marked as ended - UI creation will be blocked":"🎮 Game marked as active - UI creation allowed")}async function nx(i){pc(!1);try{const f=await fetch("./TacticaMap.tmj");if(!f.ok)throw new Error(`HTTP error! status: ${f.status}`);kt=await f.json(),console.log("Tiled Map Data Loaded via fetch:",kt),By(kt.tilewidth*4,kt.tileheight*4),console.log(`Tile size set to ${kt.tilewidth*4}x${kt.tileheight*4}`)}catch(f){console.error("Error loading Tiled map data via fetch:",f);return}if(!kt)return;V=new qg,V.background=new Ze(2236962),console.log("Three.js scene initialized");const t=kt.width*kt.tilewidth,n=kt.height*kt.tileheight,s=t*4,r=n*4;Wi=new Kl(0,s,0,-r,1,1e3),Wi.position.z=10,console.log("Camera initialized"),Jt=new ic({antialias:!1,powerPreference:"high-performance"}),Jt.setSize(s,r),i.appendChild(Jt.domElement),console.log("Renderer initialized"),Xs=1,Jt.domElement.style.width=`${s*Xs}px`,Jt.domElement.style.height=`${r*Xs}px`,Jt.domElement.style.imageRendering="pixelated",Jt.domElement.style.imageRendering="crisp-edges";const o=new yi;let a,l;try{a=await o.loadAsync(Jg),a.magFilter=qe,a.minFilter=qe,a.flipY=!1,console.log("Map Texture Loaded:",a),l=await o.loadAsync(pr),l.magFilter=qe,l.minFilter=qe,l.flipY=!1,console.log("Hover Texture Loaded:",l)}catch(f){console.error("Error loading textures:",f);return}const c=Hy(kt,a,4);c&&V?(V.add(c),console.log("Map mesh added to scene")):console.error("Failed to create full tilemap mesh.");const d=new tt(kt.tilewidth*4,kt.tileheight*4),h=new nt({map:l,transparent:!0,side:En});Bi=new Ye(d,h),Bi.position.z=1,Bi.visible=!1,V&&(V.add(Bi),console.log("Hover selector added to scene")),jy(kt,Bi,Jt,Xs),Ky(Jt),Jy(Jt,V,Wi),Qy(),console.log("Three.js game started successfully")}function Aa(){Jt&&Zy(Jt),pc(!0),["action-skip-button","basic-attack-button","attack-confirm-button","attack-cancel-button","skill-confirm-button","skill-cancel-button","skill-rotate-button","move-skip-button","move-confirm-button","move-cancel-button"].forEach(e=>{const t=document.getElementById(e);t&&(t.remove(),console.log(`🧹 Removed UI button: ${e}`))});for(let e=0;e<10;e++){const t=document.getElementById(`skill-button-${e}`);t&&(t.remove(),console.log(`🧹 Removed skill button: skill-button-${e}`))}tx(),Jt=null,V=null,Wi=null,kt=null,Bi=null,console.log("Game cleaned up.")}function ix(i,e){const t=document.createElement("div");t.id="splash-screen",t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="#1a1a1a",t.style.display="flex",t.style.flexDirection="column",t.style.justifyContent="center",t.style.alignItems="center",t.style.zIndex="1000";const n=document.createElement("h1");n.textContent="Magepunk Presents: Tactica Trials",n.style.color="#e0e0e0",n.style.fontSize="2.5em",n.style.marginBottom="30px",n.style.fontFamily='"Arial Black", Gadget, sans-serif';const s=document.createElement("button");s.textContent="Start Game",s.style.padding="15px 30px",s.style.fontSize="1.5em",s.style.backgroundColor="#4CAF50",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)",s.onmouseover=()=>s.style.backgroundColor="#45a049",s.onmouseout=()=>s.style.backgroundColor="#4CAF50";const r=document.createElement("div");r.style.display="flex",r.style.alignItems="center",r.style.marginTop="20px",r.style.marginBottom="10px";const o=document.createElement("input");o.type="checkbox",o.id="debug-mode-checkbox",o.checked=Ot(),o.style.marginRight="10px",o.style.transform="scale(1.2)",o.style.cursor="pointer";const a=document.createElement("label");a.htmlFor="debug-mode-checkbox",a.textContent="Debug Mode (Player controls enemies)",a.style.color="#e0e0e0",a.style.fontSize="1.1em",a.style.cursor="pointer",a.style.userSelect="none",a.onmouseover=()=>a.style.color="#f0f0f0",a.onmouseout=()=>a.style.color="#e0e0e0";const l=()=>{ly(o.checked)};o.addEventListener("change",l),r.appendChild(o),r.appendChild(a);const c=()=>{d(),e()};s.addEventListener("click",c),t.appendChild(n),t.appendChild(r),t.appendChild(s),i.appendChild(t);const d=()=>{s.removeEventListener("click",c),o.removeEventListener("change",l),t.parentNode&&t.parentNode.removeChild(t),console.log("Splash screen cleaned up.")};return d}class gl{constructor(e,t){this.handler=e,this.unitsUsedThisRound=t}onUnitDeath(e,t){console.log(`💀 Unit died: ${e} (${t} team)`),t==="player"?this.unitsUsedThisRound[We.PLAYER_ONE].delete(e):this.unitsUsedThisRound[We.PLAYER_TWO].delete(e),At("Unit death processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitAdded(e,t){console.log(`➕ Unit added/revived: ${e} (${t} team)`),At("Unit addition processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitHealthChanged(e,t,n,s){const r=s>0,o=n>0;r!==o&&(o?this.onUnitAdded(e,t):this.onUnitDeath(e,t))}}class sx{constructor(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[We.PLAYER_ONE]:0,[We.PLAYER_TWO]:0},unitsUsedThisRound:{[We.PLAYER_ONE]:new Set,[We.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new gl(this,this.roundState.unitsUsedThisRound)}getRoundNumber(){return this.roundState.roundNumber}getActionableUnitLimit(){return this.roundState.actionableUnitLimit}getTurnsTakenThisRound(e){return this.roundState.turnsTakenThisRound[e]}canTakeAnotherTurn(e){return this.roundState.turnsTakenThisRound[e]<this.roundState.actionableUnitLimit}markUnitAsUsed(e,t){this.roundState.unitsUsedThisRound[t].add(e),At("Unit marked as used this round",{unitId:e,player:t,roundNumber:this.roundState.roundNumber})}canSelectUnit(e,t){return!this.roundState.unitsUsedThisRound[t].has(e)}recalculateActionableUnitLimit(){const e=this.roundState.actionableUnitLimit,t=Fi.calculateActionableUnitLimit();if(t!==e){console.log(`🔄 Unit count changed! Recalculating actionable unit limit: ${e} → ${t}`),this.roundState.actionableUnitLimit=t;const n=this.roundState.turnsTakenThisRound[We.PLAYER_ONE]>t,s=this.roundState.turnsTakenThisRound[We.PLAYER_TWO]>t;(n||s)&&(console.log(`⚠️ Turn limit exceeded! P1: ${this.roundState.turnsTakenThisRound[We.PLAYER_ONE]}/${t}, P2: ${this.roundState.turnsTakenThisRound[We.PLAYER_TWO]}/${t}`),console.log("🔄 Round will end immediately after current turn completes"),this.roundState.shouldEndRoundAfterTurn=!0,At("Round marked for immediate ending",{previousLimit:e,newLimit:t,player1Turns:this.roundState.turnsTakenThisRound[We.PLAYER_ONE],player2Turns:this.roundState.turnsTakenThisRound[We.PLAYER_TWO],player1Exceeded:n,player2Exceeded:s}));const r=Fi.getAliveUnitCounts();At("Actionable unit limit recalculated",{previousLimit:e,newLimit:t,alivePlayerUnits:r.player,aliveEnemyUnits:r.enemy,currentRound:this.roundState.roundNumber})}}startNewRound(){je.processRoundEndModifiers(),this.roundState.roundNumber++,this.roundState.actionableUnitLimit=Fi.calculateActionableUnitLimit(),this.roundState.turnsTakenThisRound[We.PLAYER_ONE]=0,this.roundState.turnsTakenThisRound[We.PLAYER_TWO]=0,this.roundState.unitsUsedThisRound[We.PLAYER_ONE].clear(),this.roundState.unitsUsedThisRound[We.PLAYER_TWO].clear(),this.roundState.shouldEndRoundAfterTurn=!1,console.log(`🔄 NEW ROUND ${this.roundState.roundNumber} STARTED!`),console.log(`📊 Actionable Unit Limit: ${this.roundState.actionableUnitLimit}`),console.log("🔄 All units are now eligible for selection again");const e=Fi.getAliveUnitCounts();At("New round started",{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,alivePlayerUnits:e.player,aliveEnemyUnits:e.enemy})}shouldStartNewRound(){if(this.roundState.shouldEndRoundAfterTurn)return!0;const e=this.roundState.turnsTakenThisRound[We.PLAYER_ONE]>=this.roundState.actionableUnitLimit,t=this.roundState.turnsTakenThisRound[We.PLAYER_TWO]>=this.roundState.actionableUnitLimit;return e&&t}incrementTurnCount(e){this.roundState.turnsTakenThisRound[e]++}isRoundEndingAfterTurn(){return this.roundState.shouldEndRoundAfterTurn}getUnitsUsedThisRound(e){return Array.from(this.roundState.unitsUsedThisRound[e])}hasUnitBeenUsedThisRound(e,t){return this.roundState.unitsUsedThisRound[t].has(e)}onUnitDeath(e,t){this.unitEventHandler.onUnitDeath(e,t)}onUnitAdded(e,t){this.unitEventHandler.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.unitEventHandler.onUnitHealthChanged(e,t,n,s)}forceNewRound(){this.startNewRound()}reset(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[We.PLAYER_ONE]:0,[We.PLAYER_TWO]:0},unitsUsedThisRound:{[We.PLAYER_ONE]:new Set,[We.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new gl(this,this.roundState.unitsUsedThisRound)}getRoundState(){return{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,turnsTakenThisRound:{...this.roundState.turnsTakenThisRound},unitsUsedThisRound:{[We.PLAYER_ONE]:new Set(this.roundState.unitsUsedThisRound[We.PLAYER_ONE]),[We.PLAYER_TWO]:new Set(this.roundState.unitsUsedThisRound[We.PLAYER_TWO])},shouldEndRoundAfterTurn:this.roundState.shouldEndRoundAfterTurn}}getAliveUnitCounts(){return Fi.getAliveUnitCounts()}}class rx{constructor(){this.currentPhase=_t.SELECT,this.phaseSkipped={move:!1,action:!1}}getCurrentPhase(){return this.currentPhase}getPhaseSkipped(){return{...this.phaseSkipped}}advancePhase(){const e=this.currentPhase;switch(this.currentPhase){case _t.SELECT:this.currentPhase=_t.MOVE,this.phaseSkipped.move=!1;break;case _t.MOVE:this.currentPhase=_t.ACTION,this.phaseSkipped.action=!1;break;case _t.ACTION:break}return console.log(`➡️ Phase: ${this.getPhaseDisplayName(e)} → ${this.getPhaseDisplayName(this.currentPhase)}`),At("Phase advanced",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}skipPhase(){const e=this.currentPhase;switch(this.currentPhase){case _t.SELECT:return console.warn("❌ Cannot skip SELECT phase"),this.currentPhase;case _t.MOVE:this.phaseSkipped.move=!0,this.currentPhase=_t.ACTION,console.log("⏭️ MOVE phase skipped");break;case _t.ACTION:this.phaseSkipped.action=!0,console.log("⏭️ ACTION phase skipped");break}return At("Phase skipped",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}resetToSelect(){this.currentPhase=_t.SELECT,this.phaseSkipped={move:!1,action:!1},At("Phase reset to SELECT",{currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped})}canMove(){return this.currentPhase===_t.MOVE}canAct(){return this.currentPhase===_t.ACTION}canSelect(){return this.currentPhase===_t.SELECT}getPhaseDisplayName(e){return{[_t.SELECT]:"Unit Selection",[_t.MOVE]:"Movement",[_t.ACTION]:"Action"}[e]||"Unknown"}forceSetPhase(e){ar(`Forcing phase change from ${this.currentPhase} to ${e}`);const t=this.currentPhase;this.currentPhase=e,console.log(`🔧 Phase forced: ${this.getPhaseDisplayName(t)} → ${this.getPhaseDisplayName(this.currentPhase)}`),At("Phase forced",{previousPhase:t,currentPhase:this.currentPhase})}reset(){this.currentPhase=_t.SELECT,this.phaseSkipped={move:!1,action:!1}}}class ax{constructor(e=We.PLAYER_ONE){this.currentPlayer=e}getCurrentPlayer(){return this.currentPlayer}switchPlayer(){const e=this.currentPlayer;return this.currentPlayer=this.getOpposingPlayer(this.currentPlayer),console.log(`🔄 Player switched: ${this.getPlayerDisplayName(e)} → ${this.getPlayerDisplayName(this.currentPlayer)}`),At("Player switched",{previousPlayer:e,currentPlayer:this.currentPlayer}),this.currentPlayer}getOpposingPlayer(e){return e===We.PLAYER_ONE?We.PLAYER_TWO:We.PLAYER_ONE}isPlayerTurn(e){return this.currentPlayer===e}getPlayerDisplayName(e){return{[We.PLAYER_ONE]:"Player 1",[We.PLAYER_TWO]:"Player 2"}[e]||"Unknown Player"}forceSetPlayer(e){ar(`Forcing player change from ${this.currentPlayer} to ${e}`);const t=this.currentPlayer;this.currentPlayer=e,At("Player forced",{previousPlayer:t,currentPlayer:this.currentPlayer})}reset(e=We.PLAYER_ONE){this.currentPlayer=e}}class ox{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}getSelectableUnits(){const e=this.playerManager.getCurrentPlayer();return(e===We.PLAYER_ONE?ue.playerParty:ue.enemyUnits).filter(n=>n.currentHealth>0&&this.roundManager.canSelectUnit(n.id,e))}canTakeAnotherTurn(){return this.roundManager.canTakeAnotherTurn(this.playerManager.getCurrentPlayer())}getGameState(e,t){const n=this.roundManager.getAliveUnitCounts(),s=this.roundManager.getRoundState();return{currentPlayer:this.playerManager.getCurrentPlayer(),currentPlayerName:this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer()),currentPhase:this.phaseManager.getCurrentPhase(),currentPhaseName:this.phaseManager.getPhaseDisplayName(this.phaseManager.getCurrentPhase()),turnCount:e,roundNumber:this.roundManager.getRoundNumber(),actionableUnitLimit:this.roundManager.getActionableUnitLimit(),turnsTakenThisRound:s.turnsTakenThisRound,canTakeAnotherTurn:this.canTakeAnotherTurn(),shouldEndRoundAfterTurn:this.roundManager.isRoundEndingAfterTurn(),gameStarted:t,canMove:this.phaseManager.canMove(),canAct:this.phaseManager.canAct(),canSelect:this.phaseManager.canSelect(),phaseSkipped:this.phaseManager.getPhaseSkipped(),alivePlayerUnits:n.player,aliveEnemyUnits:n.enemy,selectableUnits:this.getSelectableUnits().length}}isRoundEndingAfterTurn(){return this.roundManager.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.roundManager.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.roundManager.hasUnitBeenUsedThisRound(e,t)}markUnitAsUsed(e){this.roundManager.markUnitAsUsed(e,this.playerManager.getCurrentPlayer())}canSelectUnit(e){return this.roundManager.canSelectUnit(e,this.playerManager.getCurrentPlayer())}}class lx{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}forceRecalculateActionableUnitLimit(){ar("Forcing recalculation of actionable unit limit"),this.roundManager.recalculateActionableUnitLimit()}forceSetPlayer(e){this.playerManager.forceSetPlayer(e),this.phaseManager.resetToSelect()}forceSetPhase(e){this.phaseManager.forceSetPhase(e)}forceNewRound(){ar("Forcing new round to start"),this.roundManager.forceNewRound()}}var We=(i=>(i.PLAYER_ONE="PLAYER_ONE",i.PLAYER_TWO="PLAYER_TWO",i))(We||{}),_t=(i=>(i.SELECT="SELECT",i.MOVE="MOVE",i.ACTION="ACTION",i))(_t||{});class cx{constructor(e="PLAYER_ONE"){this.selectedUnitId=null,this.turnCount=1,this.gameStarted=!1,this.roundManager=new sx,this.phaseManager=new rx,this.playerManager=new ax(e),this.gameStateAggregator=new ox(this.roundManager,this.phaseManager,this.playerManager),this.debugger=new lx(this.roundManager,this.phaseManager,this.playerManager),At("TurnManager initialized",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}getCurrentPlayer(){return this.playerManager.getCurrentPlayer()}getCurrentPhase(){return this.phaseManager.getCurrentPhase()}getTurnCount(){return this.turnCount}getRoundNumber(){return this.roundManager.getRoundNumber()}getActionableUnitLimit(){return this.roundManager.getActionableUnitLimit()}getTurnsTakenThisRound(e){return this.roundManager.getTurnsTakenThisRound(e)}isGameStarted(){return this.gameStarted}markUnitAsUsed(e){this.gameStateAggregator.markUnitAsUsed(e)}canSelectUnit(e){return this.gameStateAggregator.canSelectUnit(e)}getSelectableUnits(){return this.gameStateAggregator.getSelectableUnits()}setSelectedUnit(e){this.selectedUnitId=e}getSelectedUnitId(){return this.selectedUnitId}startGame(){if(this.gameStarted){console.warn("⚠️ Game already started");return}this.gameStarted=!0,this.roundManager.recalculateActionableUnitLimit(),console.log("🎮 GAME STARTED!"),console.log(`👤 Starting Player: ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}`),console.log(`📊 Actionable Unit Limit: ${this.roundManager.getActionableUnitLimit()}`),At("Game started",{startingPlayer:this.playerManager.getCurrentPlayer(),actionableUnitLimit:this.roundManager.getActionableUnitLimit()})}advancePhase(){if(!this.gameStarted){console.warn("❌ Cannot advance phase - game not started");return}this.phaseManager.advancePhase()}skipPhase(){if(!this.gameStarted){console.warn("❌ Cannot skip phase - game not started");return}this.phaseManager.skipPhase()}endTurn(){if(!this.gameStarted){console.warn("❌ Cannot end turn - game not started");return}const e=this.playerManager.getCurrentPlayer();this.selectedUnitId?(this.markUnitAsUsed(this.selectedUnitId),console.log(`🎯 Unit ${this.selectedUnitId} marked as used for this round`)):console.warn("⚠️ No unit was selected for this turn"),this.roundManager.incrementTurnCount(e),this.turnCount++,console.log(`🔚 Turn ${this.turnCount-1} ended for ${this.playerManager.getPlayerDisplayName(e)}`),console.log(`📊 Turns taken this round: P1=${this.roundManager.getTurnsTakenThisRound("PLAYER_ONE")}, P2=${this.roundManager.getTurnsTakenThisRound("PLAYER_TWO")}`),this.roundManager.shouldStartNewRound()&&this.roundManager.startNewRound(),this.playerManager.switchPlayer(),this.phaseManager.resetToSelect(),this.selectedUnitId=null,console.log(`🎯 Turn ${this.turnCount} - ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}'s turn`),At("Turn ended",{previousPlayer:e,newPlayer:this.playerManager.getCurrentPlayer(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}canTakeAnotherTurn(){return this.gameStateAggregator.canTakeAnotherTurn()}canMove(){return this.phaseManager.canMove()}canAct(){return this.phaseManager.canAct()}canSelect(){return this.phaseManager.canSelect()}isPlayerTurn(e){return this.playerManager.isPlayerTurn(e)}getPlayerDisplayName(e){return this.playerManager.getPlayerDisplayName(e)}getPhaseDisplayName(e){return this.phaseManager.getPhaseDisplayName(e)}getOpposingPlayer(e){return this.playerManager.getOpposingPlayer(e)}getGameState(){return this.gameStateAggregator.getGameState(this.turnCount,this.gameStarted)}isRoundEndingAfterTurn(){return this.gameStateAggregator.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.gameStateAggregator.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.gameStateAggregator.hasUnitBeenUsedThisRound(e,t)}reset(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.selectedUnitId=null,this.roundManager.reset(),this.phaseManager.reset(),this.playerManager.reset(e),console.log("🔄 TurnManager reset"),At("TurnManager reset",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}forceRecalculateActionableUnitLimit(){this.debugger.forceRecalculateActionableUnitLimit()}forceSetPlayer(e){this.debugger.forceSetPlayer(e)}forceSetPhase(e){this.debugger.forceSetPhase(e)}forceNewRound(){this.debugger.forceNewRound()}onUnitDeath(e,t){this.roundManager.onUnitDeath(e,t)}onUnitAdded(e,t){this.roundManager.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,s){this.roundManager.onUnitHealthChanged(e,t,n,s)}recalculateActionableUnitLimit(){this.gameStarted&&this.roundManager.recalculateActionableUnitLimit()}}function mc(){const i=new cx,e=i.advancePhase.bind(i),t=i.endTurn.bind(i),n=i.startGame.bind(i);return i.advancePhase=function(){e(),Js(i),dx(i)},i.endTurn=function(){t(),Js(i),Qs()},i.startGame=function(){n(),Js(i)},i}function wa(i){const e=i.getGameState();return`Turn ${e.turnCount} - ${e.currentPlayerName}`}function gc(i){return`Phase: ${i.getGameState().currentPhaseName}`}function yc(i){return`Round ${i.getGameState().roundNumber}`}function xc(i){return`Actionable Unit Limit: ${i.getGameState().actionableUnitLimit}`}function Js(i){const e=document.getElementById("turn-display-game-scene");e&&(e.textContent=wa(i));const t=document.getElementById("phase-display-game-scene");t&&(t.textContent=gc(i));const n=document.getElementById("round-display-game-scene");if(n&&(n.textContent=yc(i)),Ot()){const s=document.getElementById("actionable-unit-limit-display-game-scene");s&&(s.textContent=xc(i))}if(Ot()){const s=i.getGameState();console.log(`🔄 UI Updated - ${s.currentPlayerName} | ${s.currentPhaseName} | Round ${s.roundNumber}`)}}function dx(i){const e=i.getGameState();Ot()&&(console.log(`🎯 Phase transition: ${e.currentPhaseName}`),console.log(`Can select: ${e.canSelect}, Can move: ${e.canMove}, Can act: ${e.canAct}`));const t=window.GAME_SCENE_INSTANCE;switch(e.currentPhase){case"SELECT":Qs();break;case"MOVE":if(Qs(),t){const n=t.getSelectedUnit();n?(console.log(`🚶 Entering MOVE phase with unit: ${n.name}`),t.enterMovePhase(n)):console.warn("❌ No unit selected for MOVE phase")}else console.warn("❌ GameScene not available for MOVE phase");break;case"ACTION":if(Qs(),t){const n=t.getSelectedUnit();n?(console.log(`⚔️ Entering ACTION phase with unit: ${n.name}`),t.enterActionPhase(n)):console.warn("❌ No unit selected for ACTION phase")}else console.warn("❌ GameScene not available for ACTION phase");break}}function Qs(){const i=window.GAME_SCENE_INSTANCE;i?i.updateUnitSelectionIndicators():Ot()&&console.log("🎯 GameScene not available for updating unit selection indicators")}const ux=Object.freeze(Object.defineProperty({__proto__:null,createUIAwareTurnManager:mc,getActionableUnitLimitDisplay:xc,getPhaseStatusDisplay:gc,getRoundStatusDisplay:yc,getTurnStatusDisplay:wa,updateTurnDisplay:Js},Symbol.toStringTag,{value:"Module"}));let or=!1;function hx(){or||(or=!0,document.addEventListener("keydown",_c),Ot()&&(console.log("🎮 Game input handler initialized"),console.log("💡 Press ENTER to advance phase, SHIFT+ENTER to skip phase, SPACE to end turn, ESC to show turn info"),console.log("💡 Debug: P for phase info, U for unit info, L to recalc limits, SHIFT+D to kill unit"),console.log("💡 Debug: CTRL+R to reset, SHIFT+R for new round")))}function fx(){or&&(or=!1,document.removeEventListener("keydown",_c),At("Game input handler cleaned up"))}function _c(i){if(Q)switch(i.code){case"Enter":i.preventDefault(),Q.isGameStarted()?i.shiftKey?Q.skipPhase():Q.advancePhase():console.log("⚠️ Game not started yet!");break;case"Space":i.preventDefault(),Q.isGameStarted()?Q.endTurn():console.log("⚠️ Game not started yet!");break;case"Escape":i.preventDefault();const e=Q.getGameState();console.log("📊 Current Game State:",e),console.log(`📋 Phase Capabilities: Select=${e.canSelect}, Move=${e.canMove}, Act=${e.canAct}`),console.log(`🔄 Round Info: Round ${e.roundNumber}, Limit ${e.actionableUnitLimit}`),console.log(`🎯 Turns taken: P1=${e.turnsTakenThisRound.PLAYER_ONE}/${e.actionableUnitLimit}, P2=${e.turnsTakenThisRound.PLAYER_TWO}/${e.actionableUnitLimit}`),console.log(`👥 Alive units: Player=${e.alivePlayerUnits}, Enemy=${e.aliveEnemyUnits}`),console.log(`🎯 Selectable units: ${e.selectableUnits}`);break;case"KeyR":i.ctrlKey&&Ot()?(i.preventDefault(),console.log("🔄 Resetting turn manager..."),Q.reset(),Q.startGame()):i.shiftKey&&Ot()&&(i.preventDefault(),console.log("🔄 Forcing new round..."),Q.forceNewRound());break;case"KeyP":if(Ot()){i.preventDefault();const t=Q.getCurrentPhase();console.log(`📋 Current Phase: ${Q.getPhaseDisplayName(t)}`),console.log("🎯 Phase Capabilities:"),console.log(`  Can Select: ${Q.canSelect()}`),console.log(`  Can Move: ${Q.canMove()}`),console.log(`  Can Act: ${Q.canAct()}`)}break;case"KeyU":if(Ot()){i.preventDefault();const t=Q.getSelectableUnits();console.log(`🎯 Selectable Units (${t.length}):`),t.forEach(s=>{console.log(`  - ${s.name} (${s.className}) - ID: ${s.id} - HP: ${s.currentHealth}/${s.health}`)});const n=Q.getGameState();console.log(`👥 Unit counts: Player=${n.alivePlayerUnits}, Enemy=${n.aliveEnemyUnits}`),console.log(`🔄 Should end round after turn: ${n.shouldEndRoundAfterTurn}`)}break;case"KeyL":Ot()&&(i.preventDefault(),console.log("🔄 Forcing recalculation of actionable unit limit..."),Q.forceRecalculateActionableUnitLimit());break;case"KeyD":if(i.shiftKey&&Ot()){i.preventDefault(),console.log("💀 Simulating unit death for testing...");const t=Q.getSelectableUnits();if(t.length>0){const n=t[0],s=n.currentHealth;n.currentHealth=0;const r=n.team;Q.onUnitHealthChanged(n.id,r,0,s),console.log(`💀 Killed ${n.name} (${r} team)`)}else console.log("⚠️ No selectable units to kill")}break}}function px(){console.log("🎮 Game Controls:"),console.log("  ENTER - Advance to next phase"),console.log("  SHIFT+ENTER - Skip current phase"),console.log("  SPACE - End current turn"),console.log("  ESC - Show current game state"),Ot()&&(console.log("  P - Show current phase info (debug only)"),console.log("  U - Show selectable units info (debug only)"),console.log("  L - Force recalculate unit limit (debug only)"),console.log("  SHIFT+D - Simulate unit death (debug only)"),console.log("  CTRL+R - Reset turn manager (debug only)"),console.log("  SHIFT+R - Force new round (debug only)"))}let xt=null,Q=null,ds=null;function mx(i,e){const t=()=>{const l=e.querySelector("canvas");e.contains(l)&&Aa();const c=i.querySelector("#player-resource-display-game-scene");c&&i.removeChild(c);const d=i.querySelector("#tile-coords-display-game-scene");d&&i.removeChild(d);const h=i.querySelector("#game-info-panel");h&&i.removeChild(h);const f=i.querySelector("#debug-mode-display-game-scene");f&&i.removeChild(f);const u=i.querySelector("#turn-display-game-scene");u&&i.removeChild(u);const g=i.querySelector("#phase-display-game-scene");g&&i.removeChild(g);const y=i.querySelector("#round-display-game-scene");y&&i.removeChild(y);const m=i.querySelector("#actionable-unit-limit-display-game-scene");for(m&&i.removeChild(m),xt&&(xt=null),Q&&(Q=null),Yy(),fx();i.firstChild;)i.removeChild(i.firstChild);i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center"},n=()=>{console.log("Proceeding to game scene..."),xa(),t(),i.appendChild(e),nx(e).then(()=>{const l=document.createElement("div");if(l.id="player-resource-display-game-scene",l.textContent=`Resource: ${Qt.resource}`,l.style.position="absolute",l.style.bottom="20px",l.style.left="20px",l.style.padding="10px 15px",l.style.backgroundColor="#1a1a1a",l.style.color="#f1c40f",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.fontFamily="sans-serif",l.style.zIndex="100",i.appendChild(l),xt=document.createElement("div"),xt.id="tile-coords-display-game-scene",xt.style.position="absolute",xt.style.top="10px",xt.style.left="10px",xt.style.color="white",xt.style.fontFamily="sans-serif",xt.style.backgroundColor="rgba(0,0,0,0.5)",xt.style.padding="5px",xt.innerText="Coords: N/A",xt.style.zIndex="100",i.appendChild(xt),Ot()){const u=document.createElement("div");u.id="debug-mode-display-game-scene",u.textContent=`DEBUG MODE: ${cy()}`,u.style.position="absolute",u.style.top="10px",u.style.right="10px",u.style.padding="8px 12px",u.style.backgroundColor="#e74c3c",u.style.color="white",u.style.borderRadius="5px",u.style.fontSize="0.9em",u.style.fontWeight="bold",u.style.fontFamily="sans-serif",u.style.zIndex="100",u.style.border="2px solid #c0392b",u.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(u)}qy(i),Q=mc();const c=document.createElement("div");c.id="turn-display-game-scene",c.textContent=wa(Q),c.style.position="absolute",c.style.top="50px",c.style.left="10px",c.style.padding="8px 12px",c.style.backgroundColor="rgba(52, 152, 219, 0.9)",c.style.color="white",c.style.borderRadius="5px",c.style.fontSize="0.9em",c.style.fontWeight="bold",c.style.fontFamily="sans-serif",c.style.zIndex="100",c.style.border="2px solid #2980b9",c.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(c);const d=document.createElement("div");d.id="phase-display-game-scene",d.textContent="Phase: Select",d.style.position="absolute",d.style.top="90px",d.style.left="10px",d.style.padding="8px 12px",d.style.backgroundColor="rgba(46, 204, 113, 0.9)",d.style.color="white",d.style.borderRadius="5px",d.style.fontSize="0.9em",d.style.fontWeight="bold",d.style.fontFamily="sans-serif",d.style.zIndex="100",d.style.border="2px solid #27ae60",d.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(d);const h=document.createElement("div");if(h.id="round-display-game-scene",h.textContent="Round 1",h.style.position="absolute",h.style.top="130px",h.style.left="10px",h.style.padding="8px 12px",h.style.backgroundColor="rgba(155, 89, 182, 0.9)",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #8e44ad",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h),Ot()){const u=document.createElement("div");u.id="actionable-unit-limit-display-game-scene",u.textContent="Actionable Unit Limit: 0",u.style.position="absolute",u.style.top="170px",u.style.left="10px",u.style.padding="8px 12px",u.style.backgroundColor="rgba(230, 126, 34, 0.9)",u.style.color="white",u.style.borderRadius="5px",u.style.fontSize="0.9em",u.style.fontWeight="bold",u.style.fontFamily="sans-serif",u.style.zIndex="100",u.style.border="2px solid #d35400",u.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(u)}hx(),Ot()&&px();const f=ky();if(f){console.log("Loading selected globe into game scene:",f);const u=new $y;u.setAppContainer(i),window.GAME_SCENE_INSTANCE=u,Ml(async()=>{const{globalTileEffectRenderer:g}=await Promise.resolve().then(()=>py);return{globalTileEffectRenderer:g}},void 0).then(({globalTileEffectRenderer:g})=>{window.globalTileEffectRenderer=g}),u.setSelectedGlobe(f).then(()=>{console.log("✅ Globe loaded successfully")}).catch(g=>{console.error("❌ Failed to load globe:",g)}),Iy()}}).catch(l=>{console.error("Failed to start game:",l),e.innerHTML='<p style="color: red; text-align: center; font-family: sans-serif; padding: 20px;">Error: Could not load the game. Please check the console for more details.</p>'})},s=()=>{console.log("Transitioning to encounter scene..."),t(),pa(i,n)},r=()=>{console.log("Transitioning to shop scene..."),t(),er(i,s)},o=()=>{console.log("Transitioning to Squad/Inventory scene..."),t(),ma(i,s,r)},a=()=>{console.log("Showing splash screen..."),ix(i,r)};return ds={proceedToGameScene:n,handleDisplayShop:r,handleDisplaySquadInventory:o,handleDisplayEncounter:s,showSplash:a},{proceedToGameScene:n,handleDisplayShop:r,handleDisplaySquadInventory:o,handleDisplayEncounter:s,showSplash:a}}async function yl(){const{appContainer:i,gameSpecificContainer:e}=await Nd();mx(i,e).showSplash()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>$a(yl)):$a(yl);
