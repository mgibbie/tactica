(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();let Wl=class{constructor(e=0,t=0){this.resource=e,this.victories=t}gainResource(e){e>0&&(this.resource+=e,console.log(`Player gained ${e} resource. Total: ${this.resource}`))}spendResource(e){return e>0&&this.resource>=e?(this.resource-=e,console.log(`Player spent ${e} resource. Remaining: ${this.resource}`),!0):(console.log(`Player attempted to spend ${e} resource, but has only ${this.resource}.`),!1)}incrementVictories(){this.victories++,console.log(`Player victories incremented. Total: ${this.victories}`)}};const jn=new Wl(10,0),Tn=class Tn{constructor(){this.playerParty=[],this.enemyUnits=[],this.shopUnits=[],this.storageUnits=[]}addUnitToPlayerParty(e){this.playerParty.length<Tn.MAX_PLAYER_PARTY_SIZE?(this.playerParty.push(e),console.log(`${e.name} (${e.className}) added to player party. Party size: ${this.playerParty.length}/${Tn.MAX_PLAYER_PARTY_SIZE}`)):console.warn(`Player party is full (${Tn.MAX_PLAYER_PARTY_SIZE} units). ${e.name} (${e.className}) was not added.`)}addUnitToEnemies(e){this.enemyUnits.push(e),console.log(`${e.name} (${e.className}) added to enemy units.`)}addUnitToShop(e){this.shopUnits.push(e),console.log(`${e.name} (${e.className}) added to shop units.`)}addUnitToStorage(e){this.storageUnits.push(e),console.log(`${e.name} (${e.className}) added to storage units.`)}findUnitById(e){return[...this.playerParty,...this.enemyUnits,...this.shopUnits,...this.storageUnits].find(n=>n.id===e)}removeUnitFromPlayerParty(e){const t=this.playerParty.findIndex(n=>n.id===e);if(t>-1){const n=this.playerParty[t];return this.playerParty.splice(t,1),console.log(`${n.name} (${n.className}) removed from player party.`),!0}return!1}removeUnitFromEnemies(e){const t=this.enemyUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.enemyUnits[t];return this.enemyUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from enemy units.`),!0}return!1}removeUnitFromShop(e){const t=this.shopUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.shopUnits[t];return this.shopUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from shop units.`),!0}return!1}removeUnitFromStorage(e){const t=this.storageUnits.findIndex(n=>n.id===e);if(t>-1){const n=this.storageUnits[t];return this.storageUnits.splice(t,1),console.log(`${n.name} (${n.className}) removed from storage units.`),!0}return!1}_removeUnitFromList(e,t){const n=e.findIndex(r=>r.id===t);return n>-1?e.splice(n,1)[0]:(console.warn(`_removeUnitFromList: Unit with ID ${t} not found in provided list.`),null)}reorderUnitInSquad(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const r=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(r,0,n),console.log(`Reordered ${n.name} in squad to index ${r}.`)}else console.error(`reorderUnitInSquad: Unit ${e} not found in player party.`)}reorderUnitInStorage(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n){const r=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(r,0,n),console.log(`Reordered ${n.name} in storage to index ${r}.`)}else console.error(`reorderUnitInStorage: Unit ${e} not found in storage units.`)}moveUnitToStorage(e,t){const n=this._removeUnitFromList(this.playerParty,e);if(n){const r=Math.max(0,Math.min(t,this.storageUnits.length));this.storageUnits.splice(r,0,n),console.log(`${n.name} moved from squad to storage at index ${r}.`)}else console.error(`moveUnitToStorage: Unit ${e} not found in player party to move to storage.`)}moveUnitToSquad(e,t){const n=this._removeUnitFromList(this.storageUnits,e);if(n)if(this.playerParty.length<Tn.MAX_PLAYER_PARTY_SIZE){const r=Math.max(0,Math.min(t,this.playerParty.length));this.playerParty.splice(r,0,n),console.log(`${n.name} moved from storage to squad at index ${r}. Party size: ${this.playerParty.length}/${Tn.MAX_PLAYER_PARTY_SIZE}`)}else this.storageUnits.push(n),console.warn(`moveUnitToSquad: Squad is full (${this.playerParty.length}/${Tn.MAX_PLAYER_PARTY_SIZE}). ${n.name} could not be moved from storage and was returned.`);else console.error(`moveUnitToSquad: Unit ${e} not found in storage to move to squad.`)}swapUnitsBetweenSquadAndStorage(e,t,n,r){const s=this._removeUnitFromList(this.storageUnits,e),o=this._removeUnitFromList(this.playerParty,t);if(s&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,s);const l=Math.max(0,Math.min(r,this.storageUnits.length));this.storageUnits.splice(l,0,o),console.log(`Swapped ${s.name} (to squad slot ${a}) with ${o.name} (to box slot ${l}).`)}else if(s&&!o){const a=Math.max(0,Math.min(r,this.storageUnits.length));this.storageUnits.splice(a,0,s),console.error(`Swap failed: Unit ${t} (to go to box) not found in squad. ${s.name} returned to storage.`)}else if(!s&&o){const a=Math.max(0,Math.min(n,this.playerParty.length));this.playerParty.splice(a,0,o),console.error(`Swap failed: Unit ${e} (to go to squad) not found in storage. ${o.name} returned to squad.`)}else console.error(`Swap failed: Critical. Neither unit involved in the swap could be found and removed. Unit ${e} (from box) or ${t} (from squad).`)}};Tn.MAX_PLAYER_PARTY_SIZE=5;let wi=Tn;const Ve=new wi;let fn=null;function $l(i,e,t,n,r){i.addEventListener("dragstart",s=>{if(!(s.target instanceof HTMLElement))return;const a=s.target.closest(".squad-unit-display");!a||a!==i||(fn={unitId:e.id,sourceContainer:t,originalIndex:n,element:i},s.dataTransfer&&(s.dataTransfer.setData("text/plain",e.id),s.dataTransfer.effectAllowed="move"),i.style.opacity="0.5",i.style.cursor="grabbing")}),i.addEventListener("dragend",()=>{i.style.opacity="1",i.style.cursor="grab",document.querySelectorAll(".unit-slot").forEach(s=>{s.style.border="1px dashed #566573",s.style.backgroundColor="#34495e"}),fn=null})}function Xl(i,e,t,n){i.addEventListener("dragover",r=>{r.preventDefault(),fn&&(i.style.backgroundColor="#5e8b9e",i.style.border="1px solid #76c7c0",r.dataTransfer&&(r.dataTransfer.dropEffect="move"))}),i.addEventListener("dragleave",()=>{i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573"}),i.addEventListener("drop",r=>{if(r.preventDefault(),i.style.backgroundColor="#34495e",i.style.border="1px dashed #566573",!fn)return;const{unitId:s,sourceContainer:o,originalIndex:a}=fn;if(o===e&&a===t&&i.contains(fn.element)){console.log("Dropped onto the same slot. No action taken.");return}console.log(`Attempting to drop unit ${s}`),console.log(`Source: ${o}[${a}] -> Target: ${e}[${t}]`);const l=Ve.findUnitById(s);if(!l){console.error("Drag-and-drop: Unit not found by ID",s),fn=null;return}if(o==="squad"&&e==="squad")Ve.reorderUnitInSquad(s,t);else if(o==="box"&&e==="box")Ve.reorderUnitInStorage(s,t);else if(o==="squad"&&e==="box"){if(Ve.playerParty.length<=1){console.warn("Cannot move the last unit from squad to box. At least one unit must remain in the squad."),fn=null;return}Ve.moveUnitToStorage(s,t)}else if(o==="box"&&e==="squad")if(Ve.playerParty.length>=wi.MAX_PLAYER_PARTY_SIZE&&Ve.playerParty[t]){const c=Ve.playerParty[t];if(c)console.log(`Squad full, swapping ${l.name} with ${c.name}`),Ve.swapUnitsBetweenSquadAndStorage(s,c.id,t,a);else{console.warn("Squad full, but target slot unexpectedly empty. Cannot move from box."),fn=null;return}}else Ve.moveUnitToSquad(s,t);fn=null,n()})}let Lt=null;function ql(i){const e=document.createElement("div");return e.id="squad-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function Yl(i){Lt&&(Lt.innerHTML=`
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
    `)}function Go(i){if(!Lt)return;let e=i.clientX+15,t=i.clientY+15;e+Lt.offsetWidth>window.innerWidth&&(e=window.innerWidth-Lt.offsetWidth-10),t+Lt.offsetHeight>window.innerHeight&&(t=window.innerHeight-Lt.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Lt.style.left=`${e}px`,Lt.style.top=`${t}px`}function jl(i,e){Lt&&(Yl(i),Lt.style.display="block",Go(e))}function Kl(){Lt&&(Lt.style.display="none")}function Zl(i){(!Lt||!i.contains(Lt))&&(Lt=ql(i))}function la(i,e,t,n){const r=document.createElement("div");r.className="squad-unit-display",r.dataset.unitId=i.id,r.style.width="50px",r.style.height="65px",r.style.border="1px solid #7f8c8d",r.style.borderRadius="4px",r.style.backgroundColor="#4a6378",r.style.display="flex",r.style.flexDirection="column",r.style.alignItems="center",r.style.justifyContent="center",r.style.padding="3px",r.style.textAlign="center",r.style.cursor="grab",r.draggable=!0,$l(r,i,e,t),r.addEventListener("mouseenter",l=>{jl(i,l)}),r.addEventListener("mousemove",l=>{Go(l)}),r.addEventListener("mouseleave",()=>{Kl()});const s=document.createElement("img");s.src=i.imageUrl,s.alt=i.className,s.style.width="25px",s.style.height="25px",s.style.marginBottom="3px",s.style.borderRadius="2px";const o=document.createElement("h5");o.textContent=i.name,o.style.margin="0 0 2px 0",o.style.fontSize="0.7em",o.style.color="#ecf0f1";const a=document.createElement("p");return a.textContent=`(${i.className})`,a.style.margin="0",a.style.fontSize="0.6em",a.style.fontStyle="italic",a.style.color="#bdc3c7",r.appendChild(s),r.appendChild(o),r.appendChild(a),r}function ca(i,e,t,n){const r=document.createElement("div");return r.id=i,r.className=`unit-slot ${e}-slot`,r.dataset.slotType=e,r.dataset.slotIndex=String(t),r.style.width="60px",r.style.height="75px",r.style.border="1px dashed #566573",r.style.borderRadius="5px",r.style.backgroundColor="#34495e",r.style.margin="3px",r.style.display="flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.transition="background-color 0.2s, border-color 0.2s",Xl(r,e,t,n),r}let Us=null,Ds=null,Is=null;function da(){if(Us&&Ds&&Is){const i=document.getElementById("box-area"),e=i?i.scrollTop:0;qs(Us,Ds,Is);const t=document.getElementById("box-area");t&&(t.scrollTop=e)}else console.error("Cannot refresh squad scene: a container or callback is missing.")}function qs(i,e,t){Us=i,Ds=e,Is=t,console.log("Showing Squad/Inventory Scene..."),i.innerHTML="",Zl(i);const n=document.createElement("div");n.id="squad-scene",n.style.width="100%",n.style.height="100%",n.style.display="flex",n.style.flexDirection="column",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.backgroundColor="#2c3e50",n.style.color="#ecf0f1",n.style.fontFamily="Arial, sans-serif",n.style.padding="20px",n.style.boxSizing="border-box",n.style.position="relative";const r=document.createElement("h1");r.textContent="SQUAD / INVENTORY",r.style.textAlign="center",r.style.fontSize="3em",r.style.margin="0 0 15px 0";const s=document.createElement("div");s.id="squad-content-area",s.style.flexGrow="1",s.style.width="100%",s.style.display="flex",s.style.justifyContent="space-between",s.style.overflow="hidden";const o=document.createElement("div");o.id="units-section",o.style.width="65%",o.style.height="100%",o.style.display="flex",o.style.flexDirection="column",o.style.borderRight="2px solid #34495e",o.style.paddingRight="10px",o.style.boxSizing="border-box";const a=document.createElement("div");a.id="squad-area",a.style.marginBottom="10px";const l=document.createElement("h2");l.textContent="SQUAD (Active Party)",l.style.fontSize="1.2em",l.style.borderBottom="1px solid #7f8c8d",l.style.paddingBottom="3px",l.style.marginBottom="5px",a.appendChild(l);const c=document.createElement("div");c.style.display="flex",c.style.flexWrap="wrap",c.style.justifyContent="flex-start";for(let H=0;H<wi.MAX_PLAYER_PARTY_SIZE;H++){const S=ca(`squad-slot-${H}`,"squad",H,da),T=Ve.playerParty[H];T&&S.appendChild(la(T,"squad",H)),c.appendChild(S)}a.appendChild(c),o.appendChild(a);const d=document.createElement("div");d.id="box-area",d.style.flexGrow="1",d.style.overflowY="auto",d.style.padding="5px",d.style.border="1px solid #34495e",d.style.borderRadius="5px";const h=document.createElement("h2");h.textContent="BOX (Storage)",h.style.fontSize="1.2em",h.style.borderBottom="1px solid #7f8c8d",h.style.paddingBottom="3px",h.style.marginBottom="5px",d.appendChild(h);const u=document.createElement("div");u.style.display="flex",u.style.flexWrap="wrap",u.style.justifyContent="flex-start",u.style.width="340px";const p=20,g=Ve.storageUnits.length,_=Math.max(p,Math.ceil((g+4)/5)*5);for(let H=0;H<_;H++){const S=ca(`box-slot-${H}`,"box",H,da),T=Ve.storageUnits[H];T&&S.appendChild(la(T,"box",H)),u.appendChild(S)}d.appendChild(u),o.appendChild(d);const m=document.createElement("div");m.id="items-section",m.style.width="33%",m.style.height="100%",m.style.paddingLeft="10px",m.style.boxSizing="border-box",m.style.display="flex",m.style.flexDirection="column",m.style.alignItems="center";const f=document.createElement("h2");f.textContent="ITEMS",f.style.fontSize="1.2em",f.style.borderBottom="1px solid #7f8c8d",f.style.paddingBottom="3px",f.style.marginBottom="5px",f.style.width="100%",f.style.textAlign="center";const E=document.createElement("p");E.textContent="Item management will go here.",E.style.textAlign="center",E.style.marginTop="20px",m.appendChild(f),m.appendChild(E),s.appendChild(o),s.appendChild(m);const x=document.createElement("div");x.style.width="100%",x.style.display="flex",x.style.justifyContent="space-between",x.style.alignItems="center",x.style.paddingTop="15px",x.style.flexShrink="0";const b=document.createElement("div");b.id="player-resource-display",b.textContent=`Resource: ${jn.resource}`,b.style.padding="10px 15px",b.style.backgroundColor="#1a1a1a",b.style.color="#f1c40f",b.style.borderRadius="5px",b.style.fontSize="1em",b.style.fontWeight="bold",b.style.display="flex",b.style.alignItems="center";const C=document.createElement("button");C.textContent="Shop",C.style.padding="8px 15px",C.style.fontSize="1em",C.style.backgroundColor="#3498db",C.style.color="white",C.style.border="none",C.style.borderRadius="5px",C.style.cursor="pointer",C.style.margin="0 8px",C.addEventListener("mouseover",()=>C.style.backgroundColor="#2980b9"),C.addEventListener("mouseout",()=>C.style.backgroundColor="#3498db"),C.onclick=t;const w=document.createElement("div");w.style.display="flex",w.style.justifyContent="center",w.style.alignItems="center",w.style.flexGrow="2",w.appendChild(C);const A=document.createElement("button");A.textContent="PROCEED",A.style.padding="8px 15px",A.style.fontSize="1em",A.style.backgroundColor="#27ae60",A.style.color="white",A.style.border="none",A.style.borderRadius="5px",A.style.cursor="pointer",A.onclick=()=>e(),x.appendChild(b),x.appendChild(w),x.appendChild(A),n.appendChild(r),n.appendChild(s),n.appendChild(x),i.appendChild(n),console.log("Squad/Inventory Scene displayed with new layout and smaller slots.")}const Vo={Swordsman:{name:"Swordsman",energyType:"Kinetic",health:17,maxEnergy:10,basicDamage:8,skillDamage:3,range:1,move:3,cost:3,imageUrl:"assets/images/swordsman.png",skills:["blazing-knuckle"]},Healer:{name:"Healer",energyType:"Potential",health:18,maxEnergy:20,basicDamage:3,skillDamage:4,range:2,move:3,cost:3,imageUrl:"assets/images/healer.png",skills:["universal-whisper"]},Hater:{name:"Hater",energyType:"Potential",health:16,maxEnergy:22,basicDamage:5,skillDamage:4,range:3,move:3,cost:3,imageUrl:"assets/images/hater.png",skills:["hurricane-slash"]},Wizard:{name:"Wizard",energyType:"Potential",health:10,maxEnergy:15,basicDamage:3,skillDamage:7,range:3,move:3,cost:3,imageUrl:"assets/images/wizard.png",skills:["tera-fire"]}},Jl={id:"blazing-knuckle",name:"Blazing Knuckle",description:"Unleashes fiery strikes in all cardinal directions around the target",energyCost:3,bonusDamage:3,targetingType:"non-rotational",emoji:"🔥",getTargetPattern:(i,e)=>[{x:i,y:e-1,isPrimary:!1},{x:i+1,y:e,isPrimary:!1},{x:i,y:e+1,isPrimary:!1},{x:i-1,y:e,isPrimary:!1}]},Ql={id:"tera-fire",name:"Tera Fire",description:"Strikes primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:3,targetingType:"dual-rotational",emoji:"🔥",getTargetPattern:(i,e,t,n)=>{const r=n||0;let s=1,o=-1;switch(r%4){case 0:s=1,o=-1;break;case 1:s=1,o=1;break;case 2:s=-1,o=1;break;case 3:s=-1,o=-1;break}return[{x:i,y:e,isPrimary:!0},{x:i+s,y:e+o,isPrimary:!1}]}},ec={id:"universal-whisper",name:"Universal Whisper",description:"Heals primary target and a diagonal secondary target. Secondary target can be rotated.",energyCost:3,bonusDamage:1,targetingType:"dual-rotational",emoji:"🪐",getTargetPattern:(i,e,t,n)=>{const o=[{x:1,y:-1},{x:1,y:1},{x:-1,y:1},{x:-1,y:-1}][(n||0)%4];return[{x:i,y:e},{x:i+o.x,y:e+o.y}]}},tc={id:"hurricane-slash",name:"Hurricane Slash",description:"A powerful melee attack that can target any adjacent enemy within 1 range.",energyCost:3,bonusDamage:3,targetingType:"adjacent-attack",emoji:"🌩️",getTargetPattern:(i,e,t,n)=>[{x:i,y:e}]},nc={"blazing-knuckle":Jl,"tera-fire":Ql,"universal-whisper":ec,"hurricane-slash":tc},ua=["Mike","Bryan","Matt","Gabe","Waylin","Axel","Laharl","Steve","Garrison","Sock","Franz","Edgar","Dan","Frank","Keyboard","Justin","Jack","Ned","Elliot","Sam","Alex","Jackson","Kyle","Don Julio","Derek","Peter","Herbert","Liam","Arthur","Gavin","Dylan","Kieran","Romulus"];let ic=1;function rc(){return`unit-${ic++}`}function sc(){const i=Math.floor(Math.random()*ua.length);return ua[i]}class ac{constructor(e){this.registry=e}createUnit(e,t="player"){const n=Vo[e];if(!n)return console.error(`Unit type "${e}" not found in UnitDex.`),null;let r;n.energyType.toLowerCase()==="potential"?r=n.maxEnergy:n.energyType.toLowerCase()==="kinetic"?r=0:(console.warn(`Unknown energy type "${n.energyType}" for unit "${e}". Defaulting to max energy.`),r=n.maxEnergy);const s=n.skills.map(a=>nc[a]).filter(a=>a!==void 0),o={id:rc(),name:sc(),className:n.name,energyType:n.energyType,health:n.health,currentHealth:n.health,maxEnergy:n.maxEnergy,currentEnergy:r,basicDamage:n.basicDamage,skillDamage:n.skillDamage,range:n.range,move:n.move,cost:n.cost,imageUrl:n.imageUrl,skills:s,activeModifiers:[],team:t,isAlive:!0,turnTakenThisRound:!1,isTargetable:!0,isDestructible:!0,isSubUnit:!1,isStructure:!1};return console.log(`Created unit: ${o.name} (${o.className}) (ID: ${o.id}) - Cost: ${o.cost} - Energy: ${o.currentEnergy}/${o.maxEnergy} (${o.energyType})`),o}createAndAddUnitToPlayerParty(e){const t=this.createUnit(e);return t&&this.registry.addUnitToPlayerParty(t),t}}const Wo=new ac(Ve);let Cr=!0,Ri=[null,null,null];function $o(){Cr=!0,Ri=[null,null,null]}function Zr(){return Ri}function oc(i,e){i>=0&&i<Ri.length&&(Ri[i]=e)}function lc(){if(Cr){console.log("Shop requires fresh population. Clearing and generating units..."),Ve.shopUnits=[],Ri=[null,null,null];const i=Object.keys(Vo);if(i.length===0){console.error("No unit types defined in UNIT_DEX for the shop!"),Cr=!1;return}const e=[];for(let t=0;t<3&&i.length!==0;t++){let n,r=0;const s=i.length*2;do{const a=Math.floor(Math.random()*i.length);n=i[a],r++}while(e.includes(n)&&i.length>e.length&&r<s);e.push(n);const o=Wo.createUnit(n);o&&(Ve.addUnitToShop(o),Ri[t]=o)}Cr=!1}else console.log("Shop already populated for this session. Using existing display items.")}let Ut=null;function cc(i){const e=document.createElement("div");return e.id="shop-tooltip",e.style.position="fixed",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="10px",e.style.borderRadius="5px",e.style.border="1px solid #ccc",e.style.display="none",e.style.zIndex="1001",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.maxWidth="250px",i.appendChild(e),e}function dc(i){if(!Ut)return;const e=i.skills&&i.skills.length>0?`
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
    `}function Xo(i){if(!Ut)return;let e=i.clientX+15,t=i.clientY+15;e+Ut.offsetWidth>window.innerWidth&&(e=window.innerWidth-Ut.offsetWidth-10),t+Ut.offsetHeight>window.innerHeight&&(t=window.innerHeight-Ut.offsetHeight-10),e<10&&(e=10),t<10&&(t=10),Ut.style.left=`${e}px`,Ut.style.top=`${t}px`}function uc(i,e){Ut&&(dc(i),Ut.style.display="block",Xo(e))}function Jr(){Ut&&(Ut.style.display="none")}function hc(i){(!Ut||!i.contains(Ut))&&(Ut=cc(i))}let en=null,At=null;function qo(i,e){lc(),console.log("Showing Shop Scene with display items:",Zr()),i.innerHTML="",en=null,At=null,hc(i);const t=document.createElement("div");t.id="shop-scene",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="space-between",t.style.backgroundColor="#2c3e50",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.padding="20px",t.style.boxSizing="border-box";const n=document.createElement("h1");n.textContent="SHOP",n.style.textAlign="center",n.style.fontSize="3em",n.style.margin="0 0 20px 0";const r=document.createElement("div");r.style.display="flex",r.style.justifyContent="space-around",r.style.width="90%",r.style.flexGrow="1",r.style.alignItems="center",r.style.paddingBottom="20px",Zr().forEach((d,h)=>{const u=document.createElement("div");if(u.id=`shop-slot-${h}`,u.style.width="200px",u.style.height="auto",u.style.minHeight="180px",u.style.border="2px solid #3498db",u.style.borderRadius="10px",u.style.display="flex",u.style.flexDirection="column",u.style.alignItems="center",u.style.justifyContent="center",u.style.backgroundColor="#34495e",u.style.padding="10px",u.style.boxSizing="border-box",u.style.textAlign="center",u.style.cursor="pointer",u.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out",d&&"sold"in d&&d.sold===!0)u.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',u.style.cursor="default",u.dataset.sold="true";else if(d&&"id"in d){const p=d;u.dataset.unitId=p.id;const g=document.createElement("img");g.src=p.imageUrl,g.alt=p.className,g.style.width="60px",g.style.height="60px",g.style.marginBottom="8px",g.style.borderRadius="4px",u.appendChild(g);const _=document.createElement("h4");_.textContent=p.name,_.style.margin="0 0 4px 0",_.style.fontSize="1.1em",u.appendChild(_);const m=document.createElement("p");m.textContent=`(${p.className})`,m.style.margin="0",m.style.fontSize="0.9em",m.style.fontStyle="italic",u.appendChild(m),u.addEventListener("mouseenter",f=>{const E=Zr()[h];E&&"id"in E&&uc(E,f)}),u.addEventListener("mousemove",f=>{Xo(f)}),u.addEventListener("mouseleave",()=>{Jr()}),u.addEventListener("click",()=>{if(u.dataset.sold==="true")return;const f=Ve.shopUnits.find(E=>E.id===p.id);if(!f){console.warn("Clicked unit no longer available in shopUnits registry for purchase.",p.id);return}if(en&&en!==u){en.style.transform="translateY(0)",en.style.boxShadow="none";const E=en.querySelector("button.buy-button-shop");E&&en.removeChild(E)}if(en===u){u.style.transform="translateY(0)",u.style.boxShadow="none";const E=u.querySelector("button.buy-button-shop");E&&u.removeChild(E),en=null,At=null}else{en=u,u.style.transform="translateY(-10px)",u.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)";const E=u.querySelector("button.buy-button-shop");E&&u.removeChild(E),At=document.createElement("button"),At.className="buy-button-shop",At.textContent=`Buy (${f.cost} R)`,At.style.padding="8px 12px",At.style.fontSize="0.9em",At.style.backgroundColor="#e67e22",At.style.color="white",At.style.border="none",At.style.borderRadius="5px",At.style.cursor="pointer",At.style.marginTop="10px",At.dataset.unitId=f.id,At.onclick=x=>{x.stopPropagation();const b=f;if(jn.resource<b.cost){alert("Not enough resources to purchase this unit.");return}jn.spendResource(b.cost),Ve.removeUnitFromShop(b.id),oc(h,{sold:!0,originalUnit:b}),Ve.playerParty.length<wi.MAX_PLAYER_PARTY_SIZE?(Ve.addUnitToPlayerParty(b),console.log(`${b.name} (${b.className}) purchased and added to Squad!`)):(Ve.addUnitToStorage(b),console.log(`${b.name} (${b.className}) purchased and added to Box (Squad was full).`)),u.innerHTML='<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #bdc3c7;"><p style="font-size: 1.5em; font-weight: bold;">SOLD</p></div>',u.style.transform="translateY(0)",u.style.boxShadow="none",u.style.cursor="default",u.dataset.sold="true",en=null;const C=document.getElementById("shop-resource-display");C&&(C.textContent=`Resource: ${jn.resource}`),Jr()},u.style.justifyContent="space-between",u.appendChild(At)}})}else u.textContent="N/A",u.style.cursor="default";r.appendChild(u)});const s=document.createElement("div");s.style.width="100%",s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center",s.style.paddingTop="20px";const o=document.createElement("div");o.id="shop-resource-display",o.textContent=`Resource: ${jn.resource}`,o.style.padding="10px 15px",o.style.backgroundColor="#1a1a1a",o.style.color="#f1c40f",o.style.borderRadius="5px",o.style.fontSize="1em",o.style.fontWeight="bold",o.style.display="flex",o.style.alignItems="center";const a=document.createElement("button");a.textContent="Squad/Inventory",a.style.padding="8px 15px",a.style.fontSize="1em",a.style.backgroundColor="#3498db",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.margin="0 8px",a.addEventListener("mouseover",()=>a.style.backgroundColor="#2980b9"),a.addEventListener("mouseout",()=>a.style.backgroundColor="#3498db"),a.onclick=()=>{Jr(),qs(i,e,()=>qo(i,e))};const l=document.createElement("button");l.textContent="PROCEED",l.style.padding="8px 15px",l.style.fontSize="1em",l.style.backgroundColor="#27ae60",l.style.color="white",l.style.border="none",l.style.borderRadius="5px",l.style.cursor="pointer",l.onclick=()=>e();const c=document.createElement("div");c.style.display="flex",c.style.justifyContent="center",c.style.alignItems="center",c.style.flexGrow="2",c.appendChild(a),s.appendChild(o),s.appendChild(c),s.appendChild(l),t.appendChild(n),t.appendChild(r),t.appendChild(s),i.appendChild(t),console.log("Shop Scene displayed with Proceed button.")}async function fc(){console.log("Initializing application..."),$o(),document.body.style.margin="0",document.body.style.overflow="hidden";const i=document.createElement("div");i.id="app-container",i.style.width="100vw",i.style.height="100vh",i.style.margin="0",i.style.padding="0",i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center",i.style.overflow="hidden",document.body.appendChild(i);const e=document.createElement("div");return e.id="game-content-wrapper",e.style.position="relative",console.log("Application initialized, ready for content."),{appContainer:i,gameSpecificContainer:e}}function ha(i){i().catch(e=>{console.error("Critical error during application initialization:",e);try{document.body.innerHTML='<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1a1a1a; color: #e0e0e0; font-family: sans-serif;"><h1>Application Error</h1><p>A critical error occurred and the application cannot start.</p><p>Please check the browser console for more details.</p></div>'}catch(t){console.error("Could not display error message in DOM.",t)}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ys="160",pc=0,fa=1,mc=2,Yo=1,gc=2,En=3,gn=0,Gt=1,yt=2,Nn=0,bi=1,pa=2,ma=3,ga=4,_c=5,qn=100,xc=101,yc=102,_a=103,xa=104,vc=200,Sc=201,Mc=202,Ec=203,Ns=204,Fs=205,Tc=206,bc=207,Ac=208,wc=209,Rc=210,Cc=211,Pc=212,Lc=213,Uc=214,Dc=0,Ic=1,Nc=2,Ir=3,Fc=4,Oc=5,kc=6,Bc=7,jo=0,zc=1,Hc=2,Fn=0,Gc=1,Vc=2,Wc=3,$c=4,Xc=5,qc=6,Ko=300,Ci=301,Pi=302,Os=303,ks=304,Gr=306,Bs=1e3,ft=1001,zs=1002,qe=1003,ya=1004,Qr=1005,Zt=1006,Yc=1007,qi=1008,On=1009,jc=1010,Kc=1011,js=1012,Zo=1013,Dn=1014,In=1015,Yi=1016,Jo=1017,Qo=1018,Kn=1020,Zc=1021,on=1023,Jc=1024,Qc=1025,Zn=1026,Li=1027,ed=1028,el=1029,td=1030,tl=1031,nl=1033,es=33776,ts=33777,ns=33778,is=33779,va=35840,Sa=35841,Ma=35842,Ea=35843,il=36196,Ta=37492,ba=37496,Aa=37808,wa=37809,Ra=37810,Ca=37811,Pa=37812,La=37813,Ua=37814,Da=37815,Ia=37816,Na=37817,Fa=37818,Oa=37819,ka=37820,Ba=37821,rs=36492,za=36494,Ha=36495,nd=36283,Ga=36284,Va=36285,Wa=36286,rl=3e3,Jn=3001,id=3200,rd=3201,sd=0,ad=1,Jt="",Et="srgb",An="srgb-linear",Ks="display-p3",Vr="display-p3-linear",Nr="linear",et="srgb",Fr="rec709",Or="p3",ti=7680,$a=519,od=512,ld=513,cd=514,sl=515,dd=516,ud=517,hd=518,fd=519,Xa=35044,qa="300 es",Hs=1035,bn=2e3,kr=2001;class Di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ss=Math.PI/180,Gs=180/Math.PI;function Ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Ht(i,e,t){return Math.max(e,Math.min(t,i))}function pd(i,e){return(i%e+e)%e}function as(i,e,t){return(1-t)*i+t*e}function Ya(i){return(i&i-1)===0&&i!==0}function Vs(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,r,s,o,a,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],p=n[5],g=n[8],_=r[0],m=r[3],f=r[6],E=r[1],x=r[4],b=r[7],C=r[2],w=r[5],A=r[8];return s[0]=o*_+a*E+l*C,s[3]=o*m+a*x+l*w,s[6]=o*f+a*b+l*A,s[1]=c*_+d*E+h*C,s[4]=c*m+d*x+h*w,s[7]=c*f+d*b+h*A,s[2]=u*_+p*E+g*C,s[5]=u*m+p*x+g*w,s[8]=u*f+p*b+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*s*d+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,u=a*l-d*s,p=c*s-o*l,g=t*h+n*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-d*n)*_,e[2]=(a*n-r*o)*_,e[3]=u*_,e[4]=(d*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(os.makeScale(e,t)),this}rotate(e){return this.premultiply(os.makeRotation(-e)),this}translate(e,t){return this.premultiply(os.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const os=new Be;function al(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ji(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function md(){const i=ji("canvas");return i.style.display="block",i}const ja={};function Wi(i){i in ja||(ja[i]=!0,console.warn(i))}const Ka=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Za=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rr={[An]:{transfer:Nr,primaries:Fr,toReference:i=>i,fromReference:i=>i},[Et]:{transfer:et,primaries:Fr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Vr]:{transfer:Nr,primaries:Or,toReference:i=>i.applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ka)},[Ks]:{transfer:et,primaries:Or,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Za),fromReference:i=>i.applyMatrix3(Ka).convertLinearToSRGB()}},gd=new Set([An,Vr]),je={enabled:!0,_workingColorSpace:An,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!gd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=rr[e].toReference,r=rr[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return rr[i].primaries},getTransfer:function(i){return i===Jt?Nr:rr[i].transfer}};function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ni;class ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ni===void 0&&(ni=ji("canvas")),ni.width=e.width,ni.height=e.height;const n=ni.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ni}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ji("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ai(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _d=0;class ll{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Ki(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(cs(r[o].image)):s.push(cs(r[o]))}else s=cs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function cs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xd=0;class Bt extends Di{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=ft,r=ft,s=Zt,o=qi,a=on,l=On,c=Bt.DEFAULT_ANISOTROPY,d=Jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Ki(),this.name="",this.source=new ll(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===Jn?Et:Jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ko)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case ft:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case ft:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Et?Jn:rl}set encoding(e){Wi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Jn?Et:Jt}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Ko;Bt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,b=(p+1)/2,C=(f+1)/2,w=(d+u)/4,A=(h+_)/4,H=(g+m)/4;return x>b&&x>C?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=w/n,s=A/n):b>C?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=w/r,s=H/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=A/s,r=H/s),this.set(n,r,s,t),this}let E=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(h-_)/E,this.z=(u-d)/E,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yd extends Di{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Wi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Jn?Et:Jt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Bt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ll(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qn extends yd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class cl extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vd extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],d=n[r+2],h=n[r+3];const u=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==u||c!==p||d!==g){let m=1-a;const f=l*u+c*p+d*g+h*_,E=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,f*E);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const b=a*E;if(l=l*m+u*b,c=c*m+p*b,d=d*m+g*b,h=h*m+_*b,m===1-a){const C=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=C,c*=C,d*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],d=n[r+3],h=s[o],u=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+d*h+l*p-c*u,e[t+1]=l*g+d*u+c*h-a*p,e[t+2]=c*g+d*p+a*u-l*h,e[t+3]=d*g-a*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(r/2),h=a(s/2),u=l(n/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+a+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-n*c,this._z=s*d+o*c+n*l-r*a,this._w=o*d-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=o*h+this._w*u,this._x=n*h+this._x*u,this._y=r*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ja.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ja.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),d=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*d,this.y=n+l*d+a*c-s*h,this.z=r+l*h+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ds.copy(this).projectOnVector(e),this.sub(ds)}reflect(e){return this.sub(ds.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ds=new U,Ja=new Zi;class Ji{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,tn):tn.fromBufferAttribute(s,o),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(e.matrixWorld),this.union(sr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ki),ar.subVectors(this.max,ki),ii.subVectors(e.a,ki),ri.subVectors(e.b,ki),si.subVectors(e.c,ki),wn.subVectors(ri,ii),Rn.subVectors(si,ri),zn.subVectors(ii,si);let t=[0,-wn.z,wn.y,0,-Rn.z,Rn.y,0,-zn.z,zn.y,wn.z,0,-wn.x,Rn.z,0,-Rn.x,zn.z,0,-zn.x,-wn.y,wn.x,0,-Rn.y,Rn.x,0,-zn.y,zn.x,0];return!us(t,ii,ri,si,ar)||(t=[1,0,0,0,1,0,0,0,1],!us(t,ii,ri,si,ar))?!1:(or.crossVectors(wn,Rn),t=[or.x,or.y,or.z],us(t,ii,ri,si,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new U,new U,new U,new U,new U,new U,new U,new U],tn=new U,sr=new Ji,ii=new U,ri=new U,si=new U,wn=new U,Rn=new U,zn=new U,ki=new U,ar=new U,or=new U,Hn=new U;function us(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Hn.fromArray(i,s);const a=r.x*Math.abs(Hn.x)+r.y*Math.abs(Hn.y)+r.z*Math.abs(Hn.z),l=e.dot(Hn),c=t.dot(Hn),d=n.dot(Hn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Sd=new Ji,Bi=new U,hs=new U;class Wr{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Sd.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bi.subVectors(e,this.center);const t=Bi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Bi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bi.copy(e.center).add(hs)),this.expandByPoint(Bi.copy(e.center).sub(hs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new U,fs=new U,lr=new U,Cn=new U,ps=new U,cr=new U,ms=new U;class dl{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){fs.copy(e).add(t).multiplyScalar(.5),lr.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(fs);const s=e.distanceTo(t)*.5,o=-this.direction.dot(lr),a=Cn.dot(this.direction),l=-Cn.dot(lr),c=Cn.lengthSq(),d=Math.abs(1-o*o);let h,u,p,g;if(d>0)if(h=o*l-a,u=o*a-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const _=1/d;h*=_,u*=_,p=h*(h+o*u+2*a)+u*(o*h+u+2*l)+c}else u=s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-o*s+a)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(o*s+a)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=o>0?-s:s,h=Math.max(0,-(o*u+a)),p=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(fs).addScaledVector(lr,u),p}intersectSphere(e,t){yn.subVectors(e.center,this.origin);const n=yn.dot(this.direction),r=yn.dot(yn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,o=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,o=(e.min.y-u.y)*d),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(a=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,n,r,s){ps.subVectors(t,e),cr.subVectors(n,e),ms.crossVectors(ps,cr);let o=this.direction.dot(ms),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Cn.subVectors(this.origin,e);const l=a*this.direction.dot(cr.crossVectors(Cn,cr));if(l<0)return null;const c=a*this.direction.dot(ps.cross(Cn));if(c<0||l+c>o)return null;const d=-a*Cn.dot(ms);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,n,r,s,o,a,l,c,d,h,u,p,g,_,m){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,d,h,u,p,g,_,m)}set(e,t,n,r,s,o,a,l,c,d,h,u,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ai.setFromMatrixColumn(e,0).length(),s=1/ai.setFromMatrixColumn(e,1).length(),o=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=o*d,p=o*h,g=a*d,_=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=u-_*c,t[9]=-a*l,t[2]=_-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,_=c*h;t[0]=u+_*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-g,t[6]=_+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,_=c*h;t[0]=u-_*a,t[4]=-o*h,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*d,t[9]=_-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*d,p=o*h,g=a*d,_=a*h;t[0]=l*d,t[4]=g*c-p,t[8]=u*c+_,t[1]=l*h,t[5]=_*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=_-u*h,t[8]=g*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+g,t[10]=u-_*h}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+_,t[5]=o*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=a*d,t[10]=_*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Md,e,Ed)}lookAt(e,t,n){const r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Pn.crossVectors(n,$t),Pn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Pn.crossVectors(n,$t)),Pn.normalize(),dr.crossVectors($t,Pn),r[0]=Pn.x,r[4]=dr.x,r[8]=$t.x,r[1]=Pn.y,r[5]=dr.y,r[9]=$t.y,r[2]=Pn.z,r[6]=dr.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],E=n[3],x=n[7],b=n[11],C=n[15],w=r[0],A=r[4],H=r[8],S=r[12],T=r[1],B=r[5],Y=r[9],re=r[13],P=r[2],O=r[6],G=r[10],$=r[14],W=r[3],V=r[7],K=r[11],Q=r[15];return s[0]=o*w+a*T+l*P+c*W,s[4]=o*A+a*B+l*O+c*V,s[8]=o*H+a*Y+l*G+c*K,s[12]=o*S+a*re+l*$+c*Q,s[1]=d*w+h*T+u*P+p*W,s[5]=d*A+h*B+u*O+p*V,s[9]=d*H+h*Y+u*G+p*K,s[13]=d*S+h*re+u*$+p*Q,s[2]=g*w+_*T+m*P+f*W,s[6]=g*A+_*B+m*O+f*V,s[10]=g*H+_*Y+m*G+f*K,s[14]=g*S+_*re+m*$+f*Q,s[3]=E*w+x*T+b*P+C*W,s[7]=E*A+x*B+b*O+C*V,s[11]=E*H+x*Y+b*G+C*K,s[15]=E*S+x*re+b*$+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*l*h-r*c*h-s*a*u+n*c*u+r*a*p-n*l*p)+_*(+t*l*p-t*c*u+s*o*u-r*o*p+r*c*d-s*l*d)+m*(+t*c*h-t*a*p-s*o*h+n*o*p+s*a*d-n*c*d)+f*(-r*a*d-t*l*h+t*a*u+r*o*h-n*o*u+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],E=h*m*c-_*u*c+_*l*p-a*m*p-h*l*f+a*u*f,x=g*u*c-d*m*c-g*l*p+o*m*p+d*l*f-o*u*f,b=d*_*c-g*h*c+g*a*p-o*_*p-d*a*f+o*h*f,C=g*h*l-d*_*l-g*a*u+o*_*u+d*a*m-o*h*m,w=t*E+n*x+r*b+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=E*A,e[1]=(_*u*s-h*m*s-_*r*p+n*m*p+h*r*f-n*u*f)*A,e[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*f+n*l*f)*A,e[3]=(h*l*s-a*u*s-h*r*c+n*u*c+a*r*p-n*l*p)*A,e[4]=x*A,e[5]=(d*m*s-g*u*s+g*r*p-t*m*p-d*r*f+t*u*f)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*f-t*l*f)*A,e[7]=(o*u*s-d*l*s+d*r*c-t*u*c-o*r*p+t*l*p)*A,e[8]=b*A,e[9]=(g*h*s-d*_*s-g*n*p+t*_*p+d*n*f-t*h*f)*A,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*f+t*a*f)*A,e[11]=(d*a*s-o*h*s-d*n*c+t*h*c+o*n*p-t*a*p)*A,e[12]=C*A,e[13]=(d*_*r-g*h*r+g*n*u-t*_*u-d*n*m+t*h*m)*A,e[14]=(g*a*r-o*_*r-g*n*l+t*_*l+o*n*m-t*a*m)*A,e[15]=(o*h*r-d*a*r+d*n*l-t*h*l-o*n*u+t*a*u)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+n,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,h=a+a,u=s*c,p=s*d,g=s*h,_=o*d,m=o*h,f=a*h,E=l*c,x=l*d,b=l*h,C=n.x,w=n.y,A=n.z;return r[0]=(1-(_+f))*C,r[1]=(p+b)*C,r[2]=(g-x)*C,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(u+f))*w,r[6]=(m+E)*w,r[7]=0,r[8]=(g+x)*A,r[9]=(m-E)*A,r[10]=(1-(u+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ai.set(r[0],r[1],r[2]).length();const o=ai.set(r[4],r[5],r[6]).length(),a=ai.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],nn.copy(this);const c=1/s,d=1/o,h=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=d,nn.elements[5]*=d,nn.elements[6]*=d,nn.elements[8]*=h,nn.elements[9]*=h,nn.elements[10]*=h,t.setFromRotationMatrix(nn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=bn){const l=this.elements,c=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),u=(n+r)/(n-r);let p,g;if(a===bn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===kr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=bn){const l=this.elements,c=1/(t-e),d=1/(n-r),h=1/(o-s),u=(t+e)*c,p=(n+r)*d;let g,_;if(a===bn)g=(o+s)*h,_=-2*h;else if(a===kr)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ai=new U,nn=new St,Md=new U(0,0,0),Ed=new U(1,1,1),Pn=new U,dr=new U,$t=new U,Qa=new St,eo=new Zi;class $r{constructor(e=0,t=0,n=0,r=$r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],h=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Qa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return eo.setFromEuler(this),this.setFromQuaternion(eo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$r.DEFAULT_ORDER="XYZ";class ul{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Td=0;const to=new U,oi=new Zi,vn=new St,ur=new U,zi=new U,bd=new U,Ad=new Zi,no=new U(1,0,0),io=new U(0,1,0),ro=new U(0,0,1),wd={type:"added"},Rd={type:"removed"};class Vt extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new U,t=new $r,n=new Zi,r=new U(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Be}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ul,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(no,e)}rotateY(e){return this.rotateOnAxis(io,e)}rotateZ(e){return this.rotateOnAxis(ro,e)}translateOnAxis(e,t){return to.copy(e).applyQuaternion(this.quaternion),this.position.add(to.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(no,e)}translateY(e){return this.translateOnAxis(io,e)}translateZ(e){return this.translateOnAxis(ro,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ur.copy(e):ur.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(zi,ur,this.up):vn.lookAt(ur,zi,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),oi.setFromRotationMatrix(vn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(wd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rd)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,bd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,Ad,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new U(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new U,Sn=new U,gs=new U,Mn=new U,li=new U,ci=new U,so=new U,_s=new U,xs=new U,ys=new U;let hr=!1;class sn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),rn.subVectors(e,t),r.cross(rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){rn.subVectors(r,t),Sn.subVectors(n,t),gs.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(Sn),l=rn.dot(gs),c=Sn.dot(Sn),d=Sn.dot(gs),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-a*d)*u,g=(o*d-a*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getUV(e,t,n,r,s,o,a,l){return hr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hr=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mn.x),l.addScaledVector(o,Mn.y),l.addScaledVector(a,Mn.z),l)}static isFrontFacing(e,t,n,r){return rn.subVectors(n,t),Sn.subVectors(e,t),rn.cross(Sn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),rn.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return hr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hr=!0),sn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;li.subVectors(r,n),ci.subVectors(s,n),_s.subVectors(e,n);const l=li.dot(_s),c=ci.dot(_s);if(l<=0&&c<=0)return t.copy(n);xs.subVectors(e,r);const d=li.dot(xs),h=ci.dot(xs);if(d>=0&&h<=d)return t.copy(r);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(li,o);ys.subVectors(e,s);const p=li.dot(ys),g=ci.dot(ys);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ci,a);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return so.subVectors(s,r),a=(h-d)/(h-d+(p-g)),t.copy(r).addScaledVector(so,a);const f=1/(m+_+u);return o=_*f,a=u*f,t.copy(n).addScaledVector(li,o).addScaledVector(ci,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},fr={h:0,s:0,l:0};function vs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class $e{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=je.workingColorSpace){if(e=pd(e,1),t=Ht(t,0,1),n=Ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=vs(o,s,e+1/3),this.g=vs(o,s,e),this.b=vs(o,s,e-1/3)}return je.toWorkingColorSpace(this,r),this}setStyle(e,t=Et){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const n=hl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return je.fromWorkingColorSpace(Rt.copy(this),e),Math.round(Ht(Rt.r*255,0,255))*65536+Math.round(Ht(Rt.g*255,0,255))*256+Math.round(Ht(Rt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(Rt.copy(this),t);const n=Rt.r,r=Rt.g,s=Rt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Et){je.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,r=Rt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(fr);const n=as(Ln.h,fr.h,t),r=as(Ln.s,fr.s,t),s=as(Ln.l,fr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new $e;$e.NAMES=hl;let Cd=0;class Qi extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=bi,this.side=gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ns,this.blendDst=Fs,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ns&&(n.blendSrc=this.blendSrc),this.blendDst!==Fs&&(n.blendDst=this.blendDst),this.blendEquation!==qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class at extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lt=new U,pr=new Ke;class mn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXY(t,pr.x,pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xa&&(e.usage=this.usage),e}}class fl extends mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pl extends mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ln extends mn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Pd=0;const Kt=new St,Ss=new Vt,di=new U,Xt=new Ji,Hi=new Ji,xt=new U;class cn extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(al(e)?pl:fl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Be().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,n){return Kt.makeTranslation(e,t,n),this.applyMatrix4(Kt),this}scale(e,t,n){return Kt.makeScale(e,t,n),this.applyMatrix4(Kt),this}lookAt(e){return Ss.lookAt(e),Ss.updateMatrix(),this.applyMatrix4(Ss.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(di).negate(),this.translate(di.x,di.y,di.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ln(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Hi.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Xt.min,Hi.min),Xt.expandByPoint(xt),xt.addVectors(Xt.max,Hi.max),Xt.expandByPoint(xt)):(Xt.expandByPoint(Hi.min),Xt.expandByPoint(Hi.max))}Xt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(xt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)xt.fromBufferAttribute(a,c),l&&(di.fromBufferAttribute(e,c),xt.add(di)),r=Math.max(r,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let T=0;T<a;T++)c[T]=new U,d[T]=new U;const h=new U,u=new U,p=new U,g=new Ke,_=new Ke,m=new Ke,f=new U,E=new U;function x(T,B,Y){h.fromArray(r,T*3),u.fromArray(r,B*3),p.fromArray(r,Y*3),g.fromArray(o,T*2),_.fromArray(o,B*2),m.fromArray(o,Y*2),u.sub(h),p.sub(h),_.sub(g),m.sub(g);const re=1/(_.x*m.y-m.x*_.y);isFinite(re)&&(f.copy(u).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(re),E.copy(p).multiplyScalar(_.x).addScaledVector(u,-m.x).multiplyScalar(re),c[T].add(f),c[B].add(f),c[Y].add(f),d[T].add(E),d[B].add(E),d[Y].add(E))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let T=0,B=b.length;T<B;++T){const Y=b[T],re=Y.start,P=Y.count;for(let O=re,G=re+P;O<G;O+=3)x(n[O+0],n[O+1],n[O+2])}const C=new U,w=new U,A=new U,H=new U;function S(T){A.fromArray(s,T*3),H.copy(A);const B=c[T];C.copy(B),C.sub(A.multiplyScalar(A.dot(B))).normalize(),w.crossVectors(H,B);const re=w.dot(d[T])<0?-1:1;l[T*4]=C.x,l[T*4+1]=C.y,l[T*4+2]=C.z,l[T*4+3]=re}for(let T=0,B=b.length;T<B;++T){const Y=b[T],re=Y.start,P=Y.count;for(let O=re,G=re+P;O<G;O+=3)S(n[O+0]),S(n[O+1]),S(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new U,s=new U,o=new U,a=new U,l=new U,c=new U,d=new U,h=new U;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(d),l.add(d),c.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new mn(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new cn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ao=new St,Gn=new dl,mr=new Wr,oo=new U,ui=new U,hi=new U,fi=new U,Ms=new U,gr=new U,_r=new Ke,xr=new Ke,yr=new Ke,lo=new U,co=new U,uo=new U,vr=new U,Sr=new U;class tt extends Vt{constructor(e=new cn,t=new at){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){gr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],h=s[l];d!==0&&(Ms.fromBufferAttribute(h,e),o?gr.addScaledVector(Ms,d):gr.addScaledVector(Ms.sub(t),d))}t.add(gr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(mr.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(mr,oo)===null||Gn.origin.distanceToSquared(oo)>(e.far-e.near)**2))&&(ao.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(ao),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],E=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let b=E,C=x;b<C;b+=3){const w=a.getX(b),A=a.getX(b+1),H=a.getX(b+2);r=Mr(this,f,e,n,c,d,h,w,A,H),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=a.getX(m),x=a.getX(m+1),b=a.getX(m+2);r=Mr(this,o,e,n,c,d,h,E,x,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],E=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=E,C=x;b<C;b+=3){const w=b,A=b+1,H=b+2;r=Mr(this,f,e,n,c,d,h,w,A,H),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const E=m,x=m+1,b=m+2;r=Mr(this,o,e,n,c,d,h,E,x,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Ld(i,e,t,n,r,s,o,a){let l;if(e.side===Gt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===gn,a),l===null)return null;Sr.copy(a),Sr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Sr);return c<t.near||c>t.far?null:{distance:c,point:Sr.clone(),object:i}}function Mr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,ui),i.getVertexPosition(l,hi),i.getVertexPosition(c,fi);const d=Ld(i,e,t,n,ui,hi,fi,vr);if(d){r&&(_r.fromBufferAttribute(r,a),xr.fromBufferAttribute(r,l),yr.fromBufferAttribute(r,c),d.uv=sn.getInterpolation(vr,ui,hi,fi,_r,xr,yr,new Ke)),s&&(_r.fromBufferAttribute(s,a),xr.fromBufferAttribute(s,l),yr.fromBufferAttribute(s,c),d.uv1=sn.getInterpolation(vr,ui,hi,fi,_r,xr,yr,new Ke),d.uv2=d.uv1),o&&(lo.fromBufferAttribute(o,a),co.fromBufferAttribute(o,l),uo.fromBufferAttribute(o,c),d.normal=sn.getInterpolation(vr,ui,hi,fi,lo,co,uo,new U),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new U,materialIndex:0};sn.getNormal(ui,hi,fi,h.normal),d.face=h}return d}class er extends cn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ln(c,3)),this.setAttribute("normal",new ln(d,3)),this.setAttribute("uv",new ln(h,2));function g(_,m,f,E,x,b,C,w,A,H,S){const T=b/A,B=C/H,Y=b/2,re=C/2,P=w/2,O=A+1,G=H+1;let $=0,W=0;const V=new U;for(let K=0;K<G;K++){const Q=K*B-re;for(let de=0;de<O;de++){const z=de*T-Y;V[_]=z*E,V[m]=Q*x,V[f]=P,c.push(V.x,V.y,V.z),V[_]=0,V[m]=0,V[f]=w>0?1:-1,d.push(V.x,V.y,V.z),h.push(de/A),h.push(1-K/H),$+=1}}for(let K=0;K<H;K++)for(let Q=0;Q<A;Q++){const de=u+Q+O*K,z=u+Q+O*(K+1),X=u+(Q+1)+O*(K+1),le=u+(Q+1)+O*K;l.push(de,z,le),l.push(z,X,le),W+=6}a.addGroup(p,W,S),p+=W,u+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new er(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ui(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function kt(i){const e={};for(let t=0;t<i.length;t++){const n=Ui(i[t]);for(const r in n)e[r]=n[r]}return e}function Ud(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ml(i){return i.getRenderTarget()===null?i.outputColorSpace:je.workingColorSpace}const Dd={clone:Ui,merge:kt};var Id=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Id,this.fragmentShader=Nd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ui(e.uniforms),this.uniformsGroups=Ud(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gl extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class an extends gl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ss*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pi=-90,mi=1;class Fd extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(pi,mi,e,t);r.layers=this.layers,this.add(r);const s=new an(pi,mi,e,t);s.layers=this.layers,this.add(s);const o=new an(pi,mi,e,t);o.layers=this.layers,this.add(o);const a=new an(pi,mi,e,t);a.layers=this.layers,this.add(a);const l=new an(pi,mi,e,t);l.layers=this.layers,this.add(l);const c=new an(pi,mi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class _l extends Bt{constructor(e,t,n,r,s,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Ci,super(e,t,n,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Od extends Qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Wi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Jn?Et:Jt),this.texture=new _l(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new er(5,5,5),s=new ei({name:"CubemapFromEquirect",uniforms:Ui(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Nn});s.uniforms.tEquirect.value=t;const o=new tt(r,s),a=t.minFilter;return t.minFilter===qi&&(t.minFilter=Zt),new Fd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const Es=new U,kd=new U,Bd=new Be;class $n{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Es.subVectors(n,t).cross(kd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Es),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Bd.getNormalMatrix(e),r=this.coplanarPoint(Es).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new Wr,Er=new U;class xl{constructor(e=new $n,t=new $n,n=new $n,r=new $n,s=new $n,o=new $n){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],d=r[5],h=r[6],u=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],E=r[13],x=r[14],b=r[15];if(n[0].setComponents(l-s,u-c,m-p,b-f).normalize(),n[1].setComponents(l+s,u+c,m+p,b+f).normalize(),n[2].setComponents(l+o,u+d,m+g,b+E).normalize(),n[3].setComponents(l-o,u-d,m-g,b-E).normalize(),n[4].setComponents(l-a,u-h,m-_,b-x).normalize(),t===bn)n[5].setComponents(l+a,u+h,m+_,b+x).normalize();else if(t===kr)n[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Er.x=r.normal.x>0?e.max.x:e.min.x,Er.y=r.normal.y>0?e.max.y:e.min.y,Er.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Er)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yl(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function zd(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,d){const h=c.array,u=c.usage,p=h.byteLength,g=i.createBuffer();i.bindBuffer(d,g),i.bufferData(d,h,u),c.onUploadCallback();let _;if(h instanceof Float32Array)_=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=i.SHORT;else if(h instanceof Uint32Array)_=i.UNSIGNED_INT;else if(h instanceof Int32Array)_=i.INT;else if(h instanceof Int8Array)_=i.BYTE;else if(h instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,d,h){const u=d.array,p=d._updateRange,g=d.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&g.length===0&&i.bufferSubData(h,0,u),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];t?i.bufferSubData(h,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):i.bufferSubData(h,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}d.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(h,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):i.bufferSubData(h,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,r(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,d),h.version=c.version}}return{get:o,remove:a,update:l}}class dt extends cn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,d=l+1,h=e/a,u=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<d;f++){const E=f*u-o;for(let x=0;x<c;x++){const b=x*h-s;g.push(b,-E,0),_.push(0,0,1),m.push(x/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<a;E++){const x=E+c*f,b=E+c*(f+1),C=E+1+c*(f+1),w=E+1+c*f;p.push(x,b,w),p.push(b,C,w)}this.setIndex(p),this.setAttribute("position",new ln(g,3)),this.setAttribute("normal",new ln(_,3)),this.setAttribute("uv",new ln(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Hd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gd=`#ifdef USE_ALPHAHASH
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
#endif`,Vd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qd=`#ifdef USE_AOMAP
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
#endif`,Yd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jd=`#ifdef USE_BATCHING
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
#endif`,Kd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,eu=`#ifdef USE_IRIDESCENCE
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
#endif`,tu=`#ifdef USE_BUMPMAP
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
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,du=`#define PI 3.141592653589793
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
} // validated`,uu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hu=`vec3 transformedNormal = objectNormal;
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
#endif`,fu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_u="gl_FragColor = linearToOutputTexel( gl_FragColor );",xu=`
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
}`,yu=`#ifdef USE_ENVMAP
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
#endif`,vu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Su=`#ifdef USE_ENVMAP
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
#endif`,Mu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eu=`#ifdef USE_ENVMAP
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
#endif`,Tu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Au=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ru=`#ifdef USE_GRADIENTMAP
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
}`,Cu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Pu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Du=`uniform bool receiveShadow;
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
#endif`,Iu=`#ifdef USE_ENVMAP
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
#endif`,Nu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ou=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ku=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bu=`PhysicalMaterial material;
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
#endif`,zu=`struct PhysicalMaterial {
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
}`,Hu=`
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
#endif`,Gu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$u=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Yu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ju=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ku=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zu=`#if defined( USE_POINTS_UV )
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
#endif`,Ju=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,th=`#ifdef USE_MORPHNORMALS
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
#endif`,nh=`#ifdef USE_MORPHTARGETS
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
#endif`,ih=`#ifdef USE_MORPHTARGETS
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
#endif`,rh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ah=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ch=`#ifdef USE_NORMALMAP
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
#endif`,dh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ph=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_h=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Eh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Th=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bh=`float getShadowMask() {
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
}`,Ah=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wh=`#ifdef USE_SKINNING
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
#endif`,Rh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ch=`#ifdef USE_SKINNING
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
#endif`,Ph=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Uh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ih=`#ifdef USE_TRANSMISSION
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
#endif`,Nh=`#ifdef USE_TRANSMISSION
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
#endif`,Fh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Oh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hh=`uniform sampler2D t2D;
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
}`,Gh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vh=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$h=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xh=`#include <common>
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
}`,qh=`#if DEPTH_PACKING == 3200
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
}`,Yh=`#define DISTANCE
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
}`,jh=`#define DISTANCE
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
}`,Kh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jh=`uniform float scale;
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
}`,Qh=`uniform vec3 diffuse;
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
}`,ef=`#include <common>
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
}`,tf=`uniform vec3 diffuse;
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
}`,nf=`#define LAMBERT
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
}`,rf=`#define LAMBERT
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
}`,sf=`#define MATCAP
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
}`,af=`#define MATCAP
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
}`,of=`#define NORMAL
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
}`,lf=`#define NORMAL
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
}`,cf=`#define PHONG
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
}`,df=`#define PHONG
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
}`,uf=`#define STANDARD
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
}`,hf=`#define STANDARD
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
}`,ff=`#define TOON
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
}`,pf=`#define TOON
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
}`,mf=`uniform float size;
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
}`,gf=`uniform vec3 diffuse;
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
}`,_f=`#include <common>
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
}`,xf=`uniform vec3 color;
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
}`,yf=`uniform float rotation;
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
}`,vf=`uniform vec3 diffuse;
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
}`,De={alphahash_fragment:Hd,alphahash_pars_fragment:Gd,alphamap_fragment:Vd,alphamap_pars_fragment:Wd,alphatest_fragment:$d,alphatest_pars_fragment:Xd,aomap_fragment:qd,aomap_pars_fragment:Yd,batching_pars_vertex:jd,batching_vertex:Kd,begin_vertex:Zd,beginnormal_vertex:Jd,bsdfs:Qd,iridescence_fragment:eu,bumpmap_pars_fragment:tu,clipping_planes_fragment:nu,clipping_planes_pars_fragment:iu,clipping_planes_pars_vertex:ru,clipping_planes_vertex:su,color_fragment:au,color_pars_fragment:ou,color_pars_vertex:lu,color_vertex:cu,common:du,cube_uv_reflection_fragment:uu,defaultnormal_vertex:hu,displacementmap_pars_vertex:fu,displacementmap_vertex:pu,emissivemap_fragment:mu,emissivemap_pars_fragment:gu,colorspace_fragment:_u,colorspace_pars_fragment:xu,envmap_fragment:yu,envmap_common_pars_fragment:vu,envmap_pars_fragment:Su,envmap_pars_vertex:Mu,envmap_physical_pars_fragment:Iu,envmap_vertex:Eu,fog_vertex:Tu,fog_pars_vertex:bu,fog_fragment:Au,fog_pars_fragment:wu,gradientmap_pars_fragment:Ru,lightmap_fragment:Cu,lightmap_pars_fragment:Pu,lights_lambert_fragment:Lu,lights_lambert_pars_fragment:Uu,lights_pars_begin:Du,lights_toon_fragment:Nu,lights_toon_pars_fragment:Fu,lights_phong_fragment:Ou,lights_phong_pars_fragment:ku,lights_physical_fragment:Bu,lights_physical_pars_fragment:zu,lights_fragment_begin:Hu,lights_fragment_maps:Gu,lights_fragment_end:Vu,logdepthbuf_fragment:Wu,logdepthbuf_pars_fragment:$u,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:qu,map_fragment:Yu,map_pars_fragment:ju,map_particle_fragment:Ku,map_particle_pars_fragment:Zu,metalnessmap_fragment:Ju,metalnessmap_pars_fragment:Qu,morphcolor_vertex:eh,morphnormal_vertex:th,morphtarget_pars_vertex:nh,morphtarget_vertex:ih,normal_fragment_begin:rh,normal_fragment_maps:sh,normal_pars_fragment:ah,normal_pars_vertex:oh,normal_vertex:lh,normalmap_pars_fragment:ch,clearcoat_normal_fragment_begin:dh,clearcoat_normal_fragment_maps:uh,clearcoat_pars_fragment:hh,iridescence_pars_fragment:fh,opaque_fragment:ph,packing:mh,premultiplied_alpha_fragment:gh,project_vertex:_h,dithering_fragment:xh,dithering_pars_fragment:yh,roughnessmap_fragment:vh,roughnessmap_pars_fragment:Sh,shadowmap_pars_fragment:Mh,shadowmap_pars_vertex:Eh,shadowmap_vertex:Th,shadowmask_pars_fragment:bh,skinbase_vertex:Ah,skinning_pars_vertex:wh,skinning_vertex:Rh,skinnormal_vertex:Ch,specularmap_fragment:Ph,specularmap_pars_fragment:Lh,tonemapping_fragment:Uh,tonemapping_pars_fragment:Dh,transmission_fragment:Ih,transmission_pars_fragment:Nh,uv_pars_fragment:Fh,uv_pars_vertex:Oh,uv_vertex:kh,worldpos_vertex:Bh,background_vert:zh,background_frag:Hh,backgroundCube_vert:Gh,backgroundCube_frag:Vh,cube_vert:Wh,cube_frag:$h,depth_vert:Xh,depth_frag:qh,distanceRGBA_vert:Yh,distanceRGBA_frag:jh,equirect_vert:Kh,equirect_frag:Zh,linedashed_vert:Jh,linedashed_frag:Qh,meshbasic_vert:ef,meshbasic_frag:tf,meshlambert_vert:nf,meshlambert_frag:rf,meshmatcap_vert:sf,meshmatcap_frag:af,meshnormal_vert:of,meshnormal_frag:lf,meshphong_vert:cf,meshphong_frag:df,meshphysical_vert:uf,meshphysical_frag:hf,meshtoon_vert:ff,meshtoon_frag:pf,points_vert:mf,points_frag:gf,shadow_vert:_f,shadow_frag:xf,sprite_vert:yf,sprite_frag:vf},te={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},pn={basic:{uniforms:kt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:kt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new $e(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:kt([te.common,te.specularmap,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.fog,te.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:kt([te.common,te.envmap,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.roughnessmap,te.metalnessmap,te.fog,te.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:kt([te.common,te.aomap,te.lightmap,te.emissivemap,te.bumpmap,te.normalmap,te.displacementmap,te.gradientmap,te.fog,te.lights,{emissive:{value:new $e(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:kt([te.common,te.bumpmap,te.normalmap,te.displacementmap,te.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:kt([te.points,te.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:kt([te.common,te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:kt([te.common,te.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:kt([te.common,te.bumpmap,te.normalmap,te.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:kt([te.sprite,te.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:kt([te.common,te.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:kt([te.lights,te.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};pn.physical={uniforms:kt([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const Tr={r:0,b:0,g:0};function Sf(i,e,t,n,r,s,o){const a=new $e(0);let l=s===!0?0:1,c,d,h=null,u=0,p=null;function g(m,f){let E=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),E=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Gr)?(d===void 0&&(d=new tt(new er(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Ui(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,d.material.toneMapped=je.getTransfer(x.colorSpace)!==et,(h!==x||u!==x.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,h=x,u=x.version,p=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new tt(new dt(2,2),new ei({name:"BackgroundMaterial",uniforms:Ui(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=je.getTransfer(x.colorSpace)!==et,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,f){m.getRGB(Tr,ml(i)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),l=f,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:g}}function Mf(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,d=!1;function h(P,O,G,$,W){let V=!1;if(o){const K=_($,G,O);c!==K&&(c=K,p(c.object)),V=f(P,$,G,W),V&&E(P,$,G,W)}else{const K=O.wireframe===!0;(c.geometry!==$.id||c.program!==G.id||c.wireframe!==K)&&(c.geometry=$.id,c.program=G.id,c.wireframe=K,V=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(V||d)&&(d=!1,H(P,O,G,$),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function u(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(P){return n.isWebGL2?i.bindVertexArray(P):s.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,O,G){const $=G.wireframe===!0;let W=a[P.id];W===void 0&&(W={},a[P.id]=W);let V=W[O.id];V===void 0&&(V={},W[O.id]=V);let K=V[$];return K===void 0&&(K=m(u()),V[$]=K),K}function m(P){const O=[],G=[],$=[];for(let W=0;W<r;W++)O[W]=0,G[W]=0,$[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:G,attributeDivisors:$,object:P,attributes:{},index:null}}function f(P,O,G,$){const W=c.attributes,V=O.attributes;let K=0;const Q=G.getAttributes();for(const de in Q)if(Q[de].location>=0){const X=W[de];let le=V[de];if(le===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),X===void 0||X.attribute!==le||le&&X.data!==le.data)return!0;K++}return c.attributesNum!==K||c.index!==$}function E(P,O,G,$){const W={},V=O.attributes;let K=0;const Q=G.getAttributes();for(const de in Q)if(Q[de].location>=0){let X=V[de];X===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&(X=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&(X=P.instanceColor));const le={};le.attribute=X,X&&X.data&&(le.data=X.data),W[de]=le,K++}c.attributes=W,c.attributesNum=K,c.index=$}function x(){const P=c.newAttributes;for(let O=0,G=P.length;O<G;O++)P[O]=0}function b(P){C(P,0)}function C(P,O){const G=c.newAttributes,$=c.enabledAttributes,W=c.attributeDivisors;G[P]=1,$[P]===0&&(i.enableVertexAttribArray(P),$[P]=1),W[P]!==O&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,O),W[P]=O)}function w(){const P=c.newAttributes,O=c.enabledAttributes;for(let G=0,$=O.length;G<$;G++)O[G]!==P[G]&&(i.disableVertexAttribArray(G),O[G]=0)}function A(P,O,G,$,W,V,K){K===!0?i.vertexAttribIPointer(P,O,G,W,V):i.vertexAttribPointer(P,O,G,$,W,V)}function H(P,O,G,$){if(n.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=$.attributes,V=G.getAttributes(),K=O.defaultAttributeValues;for(const Q in V){const de=V[Q];if(de.location>=0){let z=W[Q];if(z===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(z=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(z=P.instanceColor)),z!==void 0){const X=z.normalized,le=z.itemSize,_e=t.get(z);if(_e===void 0)continue;const ge=_e.buffer,Ce=_e.type,Le=_e.bytesPerElement,Ee=n.isWebGL2===!0&&(Ce===i.INT||Ce===i.UNSIGNED_INT||z.gpuType===Zo);if(z.isInterleavedBufferAttribute){const Ge=z.data,D=Ge.stride,It=z.offset;if(Ge.isInstancedInterleavedBuffer){for(let ye=0;ye<de.locationSize;ye++)C(de.location+ye,Ge.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let ye=0;ye<de.locationSize;ye++)b(de.location+ye);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let ye=0;ye<de.locationSize;ye++)A(de.location+ye,le/de.locationSize,Ce,X,D*Le,(It+le/de.locationSize*ye)*Le,Ee)}else{if(z.isInstancedBufferAttribute){for(let Ge=0;Ge<de.locationSize;Ge++)C(de.location+Ge,z.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let Ge=0;Ge<de.locationSize;Ge++)b(de.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Ge=0;Ge<de.locationSize;Ge++)A(de.location+Ge,le/de.locationSize,Ce,X,le*Le,le/de.locationSize*Ge*Le,Ee)}}else if(K!==void 0){const X=K[Q];if(X!==void 0)switch(X.length){case 2:i.vertexAttrib2fv(de.location,X);break;case 3:i.vertexAttrib3fv(de.location,X);break;case 4:i.vertexAttrib4fv(de.location,X);break;default:i.vertexAttrib1fv(de.location,X)}}}}w()}function S(){Y();for(const P in a){const O=a[P];for(const G in O){const $=O[G];for(const W in $)g($[W].object),delete $[W];delete O[G]}delete a[P]}}function T(P){if(a[P.id]===void 0)return;const O=a[P.id];for(const G in O){const $=O[G];for(const W in $)g($[W].object),delete $[W];delete O[G]}delete a[P.id]}function B(P){for(const O in a){const G=a[O];if(G[P.id]===void 0)continue;const $=G[P.id];for(const W in $)g($[W].object),delete $[W];delete G[P.id]}}function Y(){re(),d=!0,c!==l&&(c=l,p(c.object))}function re(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:Y,resetDefaultState:re,dispose:S,releaseStatesOfGeometry:T,releaseStatesOfProgram:B,initAttributes:x,enableAttribute:b,disableUnusedAttributes:w}}function Ef(i,e,t,n){const r=n.isWebGL2;let s;function o(d){s=d}function a(d,h){i.drawArrays(s,d,h),t.update(h,s,1)}function l(d,h,u){if(u===0)return;let p,g;if(r)p=i,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,d,h,u),t.update(h,s,u)}function c(d,h,u){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u;g++)this.render(d[g],h[g]);else{p.multiDrawArraysWEBGL(s,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Tf(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,b=o||e.has("OES_texture_float"),C=x&&b,w=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:E,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:C,maxSamples:w}}function bf(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new $n,a=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||n!==0||r;return r=u,n=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?d(null):c();else{const E=s?0:n,x=E*4;let b=f.clippingState||null;l.value=b,b=d(g,u,x,p);for(let C=0;C!==x;++C)b[C]=t[C];f.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,E=u.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,b=p;x!==_;++x,b+=4)o.copy(h[x]).applyMatrix4(E,a),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Af(i){let e=new WeakMap;function t(o,a){return a===Os?o.mapping=Ci:a===ks&&(o.mapping=Pi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Os||a===ks)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Od(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class vl extends gl{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ei=4,ho=[.125,.215,.35,.446,.526,.582],Yn=20,Ts=new vl,fo=new $e;let bs=null,As=0,ws=0;const Xn=(1+Math.sqrt(5))/2,gi=1/Xn,po=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,Xn,gi),new U(0,Xn,-gi),new U(gi,0,Xn),new U(-gi,0,Xn),new U(Xn,gi,0),new U(-Xn,gi,0)];class mo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){bs=this._renderer.getRenderTarget(),As=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_o(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bs,As,ws),e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bs=this._renderer.getRenderTarget(),As=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Yi,format:on,colorSpace:An,depthBuffer:!1},r=go(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=go(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wf(s)),this._blurMaterial=Rf(s,e,t)}return r}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,Ts)}_sceneToCubeUV(e,t,n,r){const a=new an(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(fo),d.toneMapping=Fn,d.autoClear=!1;const p=new at({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),g=new tt(new er,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(fo),_=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):E===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const x=this._cubeSize;br(r,E*x,f>2?x:0,x,x),d.setRenderTarget(r),_&&d.render(g,a),d.render(e,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ci||e.mapping===Pi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_o());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new tt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;br(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ts)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=po[(r-1)%po.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new tt(this._lodPlanes[r],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Yn-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):Yn;m>Yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const f=[];let E=0;for(let A=0;A<Yn;++A){const H=A/_,S=Math.exp(-H*H/2);f.push(S),A===0?E+=S:A<m&&(E+=2*S)}for(let A=0;A<f.length;A++)f[A]=f[A]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const b=this._sizeLods[r],C=3*b*(r>x-Ei?r-x+Ei:0),w=4*(this._cubeSize-b);br(t,C,w,3*b,2*b),l.setRenderTarget(t),l.render(h,Ts)}}function wf(i){const e=[],t=[],n=[];let r=i;const s=i-Ei+1+ho.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Ei?l=ho[o-i+Ei-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,_=3,m=2,f=1,E=new Float32Array(_*g*p),x=new Float32Array(m*g*p),b=new Float32Array(f*g*p);for(let w=0;w<p;w++){const A=w%3*2/3-1,H=w>2?0:-1,S=[A,H,0,A+2/3,H,0,A+2/3,H+1,0,A,H,0,A+2/3,H+1,0,A,H+1,0];E.set(S,_*g*w),x.set(u,m*g*w);const T=[w,w,w,w,w,w];b.set(T,f*g*w)}const C=new cn;C.setAttribute("position",new mn(E,_)),C.setAttribute("uv",new mn(x,m)),C.setAttribute("faceIndex",new mn(b,f)),e.push(C),r>Ei&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function go(i,e,t){const n=new Qn(i,e,t);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Rf(i,e,t){const n=new Float32Array(Yn),r=new U(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zs(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function _o(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zs(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function xo(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Zs(){return`

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
	`}function Cf(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Os||l===ks,d=l===Ci||l===Pi;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new mo(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||d&&h&&r(h)){t===null&&(t=new mo(i));const u=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",s),u.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Pf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Lf(i,e,t,n){const r={},s=new WeakMap;function o(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}u.removeEventListener("dispose",o),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(h,u){return r[u.id]===!0||(u.addEventListener("dispose",o),r[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const g in u)e.update(u[g],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(h){const u=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let x=0,b=E.length;x<b;x+=3){const C=E[x+0],w=E[x+1],A=E[x+2];u.push(C,w,w,A,A,C)}}else if(g!==void 0){const E=g.array;_=g.version;for(let x=0,b=E.length/3-1;x<b;x+=3){const C=x+0,w=x+1,A=x+2;u.push(C,w,w,A,A,C)}}else return;const m=new(al(u)?pl:fl)(u,1);m.version=_;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function Uf(i,e,t,n){const r=n.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function d(p,g){i.drawElements(s,g,a,p*l),t.update(g,s,1)}function h(p,g,_){if(_===0)return;let m,f;if(r)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,g,a,p*l,_),t.update(g,s,_)}function u(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/l,g[f]);else{m.multiDrawElementsWEBGL(s,g,0,a,p,0,_);let f=0;for(let E=0;E<_;E++)f+=g[E];t.update(f,s,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=u}function Df(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function If(i,e){return i[0]-e[0]}function Nf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Ff(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new Tt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,h){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=p!==void 0?p.length:0;let _=s.get(d);if(_===void 0||_.count!==g){let P=function(){Y.dispose(),s.delete(d),d.removeEventListener("dispose",P)};_!==void 0&&_.texture.dispose();const E=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,b=d.morphAttributes.color!==void 0,C=d.morphAttributes.position||[],w=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let H=0;E===!0&&(H=1),x===!0&&(H=2),b===!0&&(H=3);let S=d.attributes.position.count*H,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const B=new Float32Array(S*T*4*g),Y=new cl(B,S,T,g);Y.type=In,Y.needsUpdate=!0;const re=H*4;for(let O=0;O<g;O++){const G=C[O],$=w[O],W=A[O],V=S*T*4*O;for(let K=0;K<G.count;K++){const Q=K*re;E===!0&&(o.fromBufferAttribute(G,K),B[V+Q+0]=o.x,B[V+Q+1]=o.y,B[V+Q+2]=o.z,B[V+Q+3]=0),x===!0&&(o.fromBufferAttribute($,K),B[V+Q+4]=o.x,B[V+Q+5]=o.y,B[V+Q+6]=o.z,B[V+Q+7]=0),b===!0&&(o.fromBufferAttribute(W,K),B[V+Q+8]=o.x,B[V+Q+9]=o.y,B[V+Q+10]=o.z,B[V+Q+11]=W.itemSize===4?o.w:1)}}_={count:g,texture:Y,size:new Ke(S,T)},s.set(d,_),d.addEventListener("dispose",P)}let m=0;for(let E=0;E<u.length;E++)m+=u[E];const f=d.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",f),h.getUniforms().setValue(i,"morphTargetInfluences",u),h.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{const p=u===void 0?0:u.length;let g=n[d.id];if(g===void 0||g.length!==p){g=[];for(let x=0;x<p;x++)g[x]=[x,0];n[d.id]=g}for(let x=0;x<p;x++){const b=g[x];b[0]=x,b[1]=u[x]}g.sort(Nf);for(let x=0;x<8;x++)x<p&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(If);const _=d.morphAttributes.position,m=d.morphAttributes.normal;let f=0;for(let x=0;x<8;x++){const b=a[x],C=b[0],w=b[1];C!==Number.MAX_SAFE_INTEGER&&w?(_&&d.getAttribute("morphTarget"+x)!==_[C]&&d.setAttribute("morphTarget"+x,_[C]),m&&d.getAttribute("morphNormal"+x)!==m[C]&&d.setAttribute("morphNormal"+x,m[C]),r[x]=w,f+=w):(_&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),m&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),r[x]=0)}const E=d.morphTargetsRelative?1:1-f;h.getUniforms().setValue(i,"morphTargetBaseInfluence",E),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Of(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;r.get(u)!==c&&(u.update(),r.set(u,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Sl extends Bt{constructor(e,t,n,r,s,o,a,l,c,d){if(d=d!==void 0?d:Zn,d!==Zn&&d!==Li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Zn&&(n=Dn),n===void 0&&d===Li&&(n=Kn),super(null,r,s,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:qe,this.minFilter=l!==void 0?l:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ml=new Bt,El=new Sl(1,1);El.compareFunction=sl;const Tl=new cl,bl=new vd,Al=new _l,yo=[],vo=[],So=new Float32Array(16),Mo=new Float32Array(9),Eo=new Float32Array(4);function Ii(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=yo[r];if(s===void 0&&(s=new Float32Array(r),yo[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function mt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Xr(i,e){let t=vo[e];t===void 0&&(t=new Int32Array(e),vo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function kf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2fv(this.addr,e),mt(t,e)}}function zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;i.uniform3fv(this.addr,e),mt(t,e)}}function Hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4fv(this.addr,e),mt(t,e)}}function Gf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Eo.set(n),i.uniformMatrix2fv(this.addr,!1,Eo),mt(t,n)}}function Vf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Mo.set(n),i.uniformMatrix3fv(this.addr,!1,Mo),mt(t,n)}}function Wf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;So.set(n),i.uniformMatrix4fv(this.addr,!1,So),mt(t,n)}}function $f(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2iv(this.addr,e),mt(t,e)}}function qf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3iv(this.addr,e),mt(t,e)}}function Yf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4iv(this.addr,e),mt(t,e)}}function jf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Kf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;i.uniform2uiv(this.addr,e),mt(t,e)}}function Zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;i.uniform3uiv(this.addr,e),mt(t,e)}}function Jf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;i.uniform4uiv(this.addr,e),mt(t,e)}}function Qf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?El:Ml;t.setTexture2D(e||s,r)}function ep(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||bl,r)}function tp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Al,r)}function np(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Tl,r)}function ip(i){switch(i){case 5126:return kf;case 35664:return Bf;case 35665:return zf;case 35666:return Hf;case 35674:return Gf;case 35675:return Vf;case 35676:return Wf;case 5124:case 35670:return $f;case 35667:case 35671:return Xf;case 35668:case 35672:return qf;case 35669:case 35673:return Yf;case 5125:return jf;case 36294:return Kf;case 36295:return Zf;case 36296:return Jf;case 35678:case 36198:case 36298:case 36306:case 35682:return Qf;case 35679:case 36299:case 36307:return ep;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return np}}function rp(i,e){i.uniform1fv(this.addr,e)}function sp(i,e){const t=Ii(e,this.size,2);i.uniform2fv(this.addr,t)}function ap(i,e){const t=Ii(e,this.size,3);i.uniform3fv(this.addr,t)}function op(i,e){const t=Ii(e,this.size,4);i.uniform4fv(this.addr,t)}function lp(i,e){const t=Ii(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cp(i,e){const t=Ii(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function dp(i,e){const t=Ii(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function up(i,e){i.uniform1iv(this.addr,e)}function hp(i,e){i.uniform2iv(this.addr,e)}function fp(i,e){i.uniform3iv(this.addr,e)}function pp(i,e){i.uniform4iv(this.addr,e)}function mp(i,e){i.uniform1uiv(this.addr,e)}function gp(i,e){i.uniform2uiv(this.addr,e)}function _p(i,e){i.uniform3uiv(this.addr,e)}function xp(i,e){i.uniform4uiv(this.addr,e)}function yp(i,e,t){const n=this.cache,r=e.length,s=Xr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ml,s[o])}function vp(i,e,t){const n=this.cache,r=e.length,s=Xr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||bl,s[o])}function Sp(i,e,t){const n=this.cache,r=e.length,s=Xr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Al,s[o])}function Mp(i,e,t){const n=this.cache,r=e.length,s=Xr(t,r);pt(n,s)||(i.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Tl,s[o])}function Ep(i){switch(i){case 5126:return rp;case 35664:return sp;case 35665:return ap;case 35666:return op;case 35674:return lp;case 35675:return cp;case 35676:return dp;case 5124:case 35670:return up;case 35667:case 35671:return hp;case 35668:case 35672:return fp;case 35669:case 35673:return pp;case 5125:return mp;case 36294:return gp;case 36295:return _p;case 36296:return xp;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return Sp;case 36289:case 36303:case 36311:case 36292:return Mp}}class Tp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ip(t.type)}}class bp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ep(t.type)}}class Ap{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Rs=/(\w+)(\])?(\[|\.)?/g;function To(i,e){i.seq.push(e),i.map[e.id]=e}function wp(i,e,t){const n=i.name,r=n.length;for(Rs.lastIndex=0;;){const s=Rs.exec(n),o=Rs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){To(t,c===void 0?new Tp(a,i,e):new bp(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Ap(a),To(t,h)),t=h}}}class Pr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);wp(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function bo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Rp=37297;let Cp=0;function Pp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Lp(i){const e=je.getPrimaries(je.workingColorSpace),t=je.getPrimaries(i);let n;switch(e===t?n="":e===Or&&t===Fr?n="LinearDisplayP3ToLinearSRGB":e===Fr&&t===Or&&(n="LinearSRGBToLinearDisplayP3"),i){case An:case Vr:return[n,"LinearTransferOETF"];case Et:case Ks:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ao(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Pp(i.getShaderSource(e),o)}else return r}function Up(i,e){const t=Lp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Dp(i,e){let t;switch(e){case Gc:t="Linear";break;case Vc:t="Reinhard";break;case Wc:t="OptimizedCineon";break;case $c:t="ACESFilmic";break;case qc:t="AgX";break;case Xc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ip(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ti).join(`
`)}function Np(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ti).join(`
`)}function Fp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Op(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ti(i){return i!==""}function wo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ro(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ws(i){return i.replace(kp,zp)}const Bp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function zp(i,e){let t=De[e];if(t===void 0){const n=Bp.get(e);if(n!==void 0)t=De[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ws(t)}const Hp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Co(i){return i.replace(Hp,Gp)}function Gp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Po(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Vp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function Wp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Pi:e="ENVMAP_TYPE_CUBE";break;case Gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function $p(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:e="ENVMAP_MODE_REFRACTION";break}return e}function Xp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case jo:e="ENVMAP_BLENDING_MULTIPLY";break;case zc:e="ENVMAP_BLENDING_MIX";break;case Hc:e="ENVMAP_BLENDING_ADD";break}return e}function qp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Yp(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Vp(t),c=Wp(t),d=$p(t),h=Xp(t),u=qp(t),p=t.isWebGL2?"":Ip(t),g=Np(t),_=Fp(s),m=r.createProgram();let f,E,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),f.length>0&&(f+=`
`),E=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),E.length>0&&(E+=`
`)):(f=[Po(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ti).join(`
`),E=[p,Po(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fn?"#define TONE_MAPPING":"",t.toneMapping!==Fn?De.tonemapping_pars_fragment:"",t.toneMapping!==Fn?Dp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Up("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ti).join(`
`)),o=Ws(o),o=wo(o,t),o=Ro(o,t),a=Ws(a),a=wo(a,t),a=Ro(a,t),o=Co(o),a=Co(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const b=x+f+o,C=x+E+a,w=bo(r,r.VERTEX_SHADER,b),A=bo(r,r.FRAGMENT_SHADER,C);r.attachShader(m,w),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function H(Y){if(i.debug.checkShaderErrors){const re=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(w).trim(),O=r.getShaderInfoLog(A).trim();let G=!0,$=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,w,A);else{const W=Ao(r,w,"vertex"),V=Ao(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+re+`
`+W+`
`+V)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(P===""||O==="")&&($=!1);$&&(Y.diagnostics={runnable:G,programLog:re,vertexShader:{log:P,prefix:f},fragmentShader:{log:O,prefix:E}})}r.deleteShader(w),r.deleteShader(A),S=new Pr(r,m),T=Op(r,m)}let S;this.getUniforms=function(){return S===void 0&&H(this),S};let T;this.getAttributes=function(){return T===void 0&&H(this),T};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(m,Rp)),B},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let jp=0;class Kp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Zp(e),t.set(e,n)),n}}class Zp{constructor(e){this.id=jp++,this.code=e,this.usedTimes=0}}function Jp(i,e,t,n,r,s,o){const a=new ul,l=new Kp,c=[],d=r.isWebGL2,h=r.logarithmicDepthBuffer,u=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,T,B,Y,re){const P=Y.fog,O=re.geometry,G=S.isMeshStandardMaterial?Y.environment:null,$=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),W=$&&$.mapping===Gr?$.image.height:null,V=g[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const K=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Q=K!==void 0?K.length:0;let de=0;O.morphAttributes.position!==void 0&&(de=1),O.morphAttributes.normal!==void 0&&(de=2),O.morphAttributes.color!==void 0&&(de=3);let z,X,le,_e;if(V){const Nt=pn[V];z=Nt.vertexShader,X=Nt.fragmentShader}else z=S.vertexShader,X=S.fragmentShader,l.update(S),le=l.getVertexShaderID(S),_e=l.getFragmentShaderID(S);const ge=i.getRenderTarget(),Ce=re.isInstancedMesh===!0,Le=re.isBatchedMesh===!0,Ee=!!S.map,Ge=!!S.matcap,D=!!$,It=!!S.aoMap,ye=!!S.lightMap,we=!!S.bumpMap,fe=!!S.normalMap,nt=!!S.displacementMap,Ie=!!S.emissiveMap,M=!!S.metalnessMap,y=!!S.roughnessMap,N=S.anisotropy>0,Z=S.clearcoat>0,j=S.iridescence>0,J=S.sheen>0,pe=S.transmission>0,oe=N&&!!S.anisotropyMap,ue=Z&&!!S.clearcoatMap,Me=Z&&!!S.clearcoatNormalMap,Ne=Z&&!!S.clearcoatRoughnessMap,q=j&&!!S.iridescenceMap,Ye=j&&!!S.iridescenceThicknessMap,ze=J&&!!S.sheenColorMap,Ae=J&&!!S.sheenRoughnessMap,xe=!!S.specularMap,he=!!S.specularColorMap,Ue=!!S.specularIntensityMap,Xe=pe&&!!S.transmissionMap,rt=pe&&!!S.thicknessMap,Oe=!!S.gradientMap,ee=!!S.alphaMap,R=S.alphaTest>0,se=!!S.alphaHash,ae=!!S.extensions,Te=!!O.attributes.uv1,ve=!!O.attributes.uv2,Ze=!!O.attributes.uv3;let Je=Fn;return S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Je=i.toneMapping),{isWebGL2:d,shaderID:V,shaderType:S.type,shaderName:S.name,vertexShader:z,fragmentShader:X,defines:S.defines,customVertexShaderID:le,customFragmentShaderID:_e,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Le,instancing:Ce,instancingColor:Ce&&re.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:An,map:Ee,matcap:Ge,envMap:D,envMapMode:D&&$.mapping,envMapCubeUVHeight:W,aoMap:It,lightMap:ye,bumpMap:we,normalMap:fe,displacementMap:u&&nt,emissiveMap:Ie,normalMapObjectSpace:fe&&S.normalMapType===ad,normalMapTangentSpace:fe&&S.normalMapType===sd,metalnessMap:M,roughnessMap:y,anisotropy:N,anisotropyMap:oe,clearcoat:Z,clearcoatMap:ue,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ne,iridescence:j,iridescenceMap:q,iridescenceThicknessMap:Ye,sheen:J,sheenColorMap:ze,sheenRoughnessMap:Ae,specularMap:xe,specularColorMap:he,specularIntensityMap:Ue,transmission:pe,transmissionMap:Xe,thicknessMap:rt,gradientMap:Oe,opaque:S.transparent===!1&&S.blending===bi,alphaMap:ee,alphaTest:R,alphaHash:se,combine:S.combine,mapUv:Ee&&_(S.map.channel),aoMapUv:It&&_(S.aoMap.channel),lightMapUv:ye&&_(S.lightMap.channel),bumpMapUv:we&&_(S.bumpMap.channel),normalMapUv:fe&&_(S.normalMap.channel),displacementMapUv:nt&&_(S.displacementMap.channel),emissiveMapUv:Ie&&_(S.emissiveMap.channel),metalnessMapUv:M&&_(S.metalnessMap.channel),roughnessMapUv:y&&_(S.roughnessMap.channel),anisotropyMapUv:oe&&_(S.anisotropyMap.channel),clearcoatMapUv:ue&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Me&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(S.sheenRoughnessMap.channel),specularMapUv:xe&&_(S.specularMap.channel),specularColorMapUv:he&&_(S.specularColorMap.channel),specularIntensityMapUv:Ue&&_(S.specularIntensityMap.channel),transmissionMapUv:Xe&&_(S.transmissionMap.channel),thicknessMapUv:rt&&_(S.thicknessMap.channel),alphaMapUv:ee&&_(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(fe||N),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:ve,vertexUv3s:Ze,pointsUvs:re.isPoints===!0&&!!O.attributes.uv&&(Ee||ee),fog:!!P,useFog:S.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:re.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:de,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:Je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ee&&S.map.isVideoTexture===!0&&je.getTransfer(S.map.colorSpace)===et,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===yt,flipSided:S.side===Gt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ae&&S.extensions.derivatives===!0,extensionFragDepth:ae&&S.extensions.fragDepth===!0,extensionDrawBuffers:ae&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const B in S.defines)T.push(B),T.push(S.defines[B]);return S.isRawShaderMaterial===!1&&(E(T,S),x(T,S),T.push(i.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function E(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function x(S,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),S.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function b(S){const T=g[S.type];let B;if(T){const Y=pn[T];B=Dd.clone(Y.uniforms)}else B=S.uniforms;return B}function C(S,T){let B;for(let Y=0,re=c.length;Y<re;Y++){const P=c[Y];if(P.cacheKey===T){B=P,++B.usedTimes;break}}return B===void 0&&(B=new Yp(i,T,S,s),c.push(B)),B}function w(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),S.destroy()}}function A(S){l.remove(S)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:b,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:H}}function Qp(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function em(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Lo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Uo(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,u,p,g,_,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=m),e++,f}function a(h,u,p,g,_,m){const f=o(h,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function l(h,u,p,g,_,m){const f=o(h,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function c(h,u){t.length>1&&t.sort(h||em),n.length>1&&n.sort(u||Lo),r.length>1&&r.sort(u||Lo)}function d(){for(let h=e,u=i.length;h<u;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function tm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Uo,i.set(n,[o])):r>=s.length?(o=new Uo,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function nm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new $e};break;case"SpotLight":t={position:new U,direction:new U,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function im(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rm=0;function sm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function am(i,e){const t=new nm,n=im(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new U);const s=new U,o=new St,a=new St;function l(d,h){let u=0,p=0,g=0;for(let Y=0;Y<9;Y++)r.probe[Y].set(0,0,0);let _=0,m=0,f=0,E=0,x=0,b=0,C=0,w=0,A=0,H=0,S=0;d.sort(sm);const T=h===!0?Math.PI:1;for(let Y=0,re=d.length;Y<re;Y++){const P=d[Y],O=P.color,G=P.intensity,$=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*G*T,p+=O.g*G*T,g+=O.b*G*T;else if(P.isLightProbe){for(let V=0;V<9;V++)r.probe[V].addScaledVector(P.sh.coefficients[V],G);S++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity*T),P.castShadow){const K=P.shadow,Q=n.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,r.directionalShadow[_]=Q,r.directionalShadowMap[_]=W,r.directionalShadowMatrix[_]=P.shadow.matrix,b++}r.directional[_]=V,_++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(O).multiplyScalar(G*T),V.distance=$,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,r.spot[f]=V;const K=P.shadow;if(P.map&&(r.spotLightMap[A]=P.map,A++,K.updateMatrices(P),P.castShadow&&H++),r.spotLightMatrix[f]=K.matrix,P.castShadow){const Q=n.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,r.spotShadow[f]=Q,r.spotShadowMap[f]=W,w++}f++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(O).multiplyScalar(G),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),r.rectArea[E]=V,E++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity*T),V.distance=P.distance,V.decay=P.decay,P.castShadow){const K=P.shadow,Q=n.get(P);Q.shadowBias=K.bias,Q.shadowNormalBias=K.normalBias,Q.shadowRadius=K.radius,Q.shadowMapSize=K.mapSize,Q.shadowCameraNear=K.camera.near,Q.shadowCameraFar=K.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=W,r.pointShadowMatrix[m]=P.shadow.matrix,C++}r.point[m]=V,m++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(G*T),V.groundColor.copy(P.groundColor).multiplyScalar(G*T),r.hemi[x]=V,x++}}E>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=te.LTC_FLOAT_1,r.rectAreaLTC2=te.LTC_FLOAT_2):(r.rectAreaLTC1=te.LTC_HALF_1,r.rectAreaLTC2=te.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=te.LTC_FLOAT_1,r.rectAreaLTC2=te.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=te.LTC_HALF_1,r.rectAreaLTC2=te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=u,r.ambient[1]=p,r.ambient[2]=g;const B=r.hash;(B.directionalLength!==_||B.pointLength!==m||B.spotLength!==f||B.rectAreaLength!==E||B.hemiLength!==x||B.numDirectionalShadows!==b||B.numPointShadows!==C||B.numSpotShadows!==w||B.numSpotMaps!==A||B.numLightProbes!==S)&&(r.directional.length=_,r.spot.length=f,r.rectArea.length=E,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+A-H,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=H,r.numLightProbes=S,B.directionalLength=_,B.pointLength=m,B.spotLength=f,B.rectAreaLength=E,B.hemiLength=x,B.numDirectionalShadows=b,B.numPointShadows=C,B.numSpotShadows=w,B.numSpotMaps=A,B.numLightProbes=S,r.version=rm++)}function c(d,h){let u=0,p=0,g=0,_=0,m=0;const f=h.matrixWorldInverse;for(let E=0,x=d.length;E<x;E++){const b=d[E];if(b.isDirectionalLight){const C=r.directional[u];C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),u++}else if(b.isSpotLight){const C=r.spot[g];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(f),g++}else if(b.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),a.identity(),o.copy(b.matrixWorld),o.premultiply(f),a.extractRotation(o),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const C=r.point[p];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:r}}function Do(i,e){const t=new am(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(h){n.push(h)}function a(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function om(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Do(i,e),t.set(s,[l])):o>=a.length?(l=new Do(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class lm extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cm extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,um=`uniform sampler2D shadow_pass;
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
}`;function hm(i,e,t){let n=new xl;const r=new Ke,s=new Ke,o=new Tt,a=new lm({depthPacking:rd}),l=new cm,c={},d=t.maxTextureSize,h={[gn]:Gt,[Gt]:gn,[yt]:yt},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:dm,fragmentShader:um}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new cn;g.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new tt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yo;let f=this.type;this.render=function(w,A,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),T=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),Y=i.state;Y.setBlending(Nn),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const re=f!==En&&this.type===En,P=f===En&&this.type!==En;for(let O=0,G=w.length;O<G;O++){const $=w[O],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const V=W.getFrameExtents();if(r.multiply(V),s.copy(W.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/V.x),r.x=s.x*V.x,W.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/V.y),r.y=s.y*V.y,W.mapSize.y=s.y)),W.map===null||re===!0||P===!0){const Q=this.type!==En?{minFilter:qe,magFilter:qe}:{};W.map!==null&&W.map.dispose(),W.map=new Qn(r.x,r.y,Q),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const K=W.getViewportCount();for(let Q=0;Q<K;Q++){const de=W.getViewport(Q);o.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),Y.viewport(o),W.updateMatrices($,Q),n=W.getFrustum(),b(A,H,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===En&&E(W,H),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,T,B)};function E(w,A){const H=e.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Qn(r.x,r.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,H,u,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,H,p,_,null)}function x(w,A,H,S){let T=null;const B=H.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(B!==void 0)T=B;else if(T=H.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const Y=T.uuid,re=A.uuid;let P=c[Y];P===void 0&&(P={},c[Y]=P);let O=P[re];O===void 0&&(O=T.clone(),P[re]=O,A.addEventListener("dispose",C)),T=O}if(T.visible=A.visible,T.wireframe=A.wireframe,S===En?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:h[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,H.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const Y=i.properties.get(T);Y.light=H}return T}function b(w,A,H,S,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===En)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld);const re=e.update(w),P=w.material;if(Array.isArray(P)){const O=re.groups;for(let G=0,$=O.length;G<$;G++){const W=O[G],V=P[W.materialIndex];if(V&&V.visible){const K=x(w,V,S,T);w.onBeforeShadow(i,w,A,H,re,K,W),i.renderBufferDirect(H,null,re,K,w,W),w.onAfterShadow(i,w,A,H,re,K,W)}}}else if(P.visible){const O=x(w,P,S,T);w.onBeforeShadow(i,w,A,H,re,O,null),i.renderBufferDirect(H,null,re,O,w,null),w.onAfterShadow(i,w,A,H,re,O,null)}}const Y=w.children;for(let re=0,P=Y.length;re<P;re++)b(Y[re],A,H,S,T)}function C(w){w.target.removeEventListener("dispose",C);for(const H in c){const S=c[H],T=w.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}function fm(i,e,t){const n=t.isWebGL2;function r(){let R=!1;const se=new Tt;let ae=null;const Te=new Tt(0,0,0,0);return{setMask:function(ve){ae!==ve&&!R&&(i.colorMask(ve,ve,ve,ve),ae=ve)},setLocked:function(ve){R=ve},setClear:function(ve,Ze,Je,gt,Nt){Nt===!0&&(ve*=gt,Ze*=gt,Je*=gt),se.set(ve,Ze,Je,gt),Te.equals(se)===!1&&(i.clearColor(ve,Ze,Je,gt),Te.copy(se))},reset:function(){R=!1,ae=null,Te.set(-1,0,0,0)}}}function s(){let R=!1,se=null,ae=null,Te=null;return{setTest:function(ve){ve?Le(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(ve){se!==ve&&!R&&(i.depthMask(ve),se=ve)},setFunc:function(ve){if(ae!==ve){switch(ve){case Dc:i.depthFunc(i.NEVER);break;case Ic:i.depthFunc(i.ALWAYS);break;case Nc:i.depthFunc(i.LESS);break;case Ir:i.depthFunc(i.LEQUAL);break;case Fc:i.depthFunc(i.EQUAL);break;case Oc:i.depthFunc(i.GEQUAL);break;case kc:i.depthFunc(i.GREATER);break;case Bc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=ve}},setLocked:function(ve){R=ve},setClear:function(ve){Te!==ve&&(i.clearDepth(ve),Te=ve)},reset:function(){R=!1,se=null,ae=null,Te=null}}}function o(){let R=!1,se=null,ae=null,Te=null,ve=null,Ze=null,Je=null,gt=null,Nt=null;return{setTest:function(Qe){R||(Qe?Le(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(Qe){se!==Qe&&!R&&(i.stencilMask(Qe),se=Qe)},setFunc:function(Qe,Ft,dn){(ae!==Qe||Te!==Ft||ve!==dn)&&(i.stencilFunc(Qe,Ft,dn),ae=Qe,Te=Ft,ve=dn)},setOp:function(Qe,Ft,dn){(Ze!==Qe||Je!==Ft||gt!==dn)&&(i.stencilOp(Qe,Ft,dn),Ze=Qe,Je=Ft,gt=dn)},setLocked:function(Qe){R=Qe},setClear:function(Qe){Nt!==Qe&&(i.clearStencil(Qe),Nt=Qe)},reset:function(){R=!1,se=null,ae=null,Te=null,ve=null,Ze=null,Je=null,gt=null,Nt=null}}}const a=new r,l=new s,c=new o,d=new WeakMap,h=new WeakMap;let u={},p={},g=new WeakMap,_=[],m=null,f=!1,E=null,x=null,b=null,C=null,w=null,A=null,H=null,S=new $e(0,0,0),T=0,B=!1,Y=null,re=null,P=null,O=null,G=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,V=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(K)[1]),W=V>=1):K.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),W=V>=2);let Q=null,de={};const z=i.getParameter(i.SCISSOR_BOX),X=i.getParameter(i.VIEWPORT),le=new Tt().fromArray(z),_e=new Tt().fromArray(X);function ge(R,se,ae,Te){const ve=new Uint8Array(4),Ze=i.createTexture();i.bindTexture(R,Ze),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<ae;Je++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(se+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Ze}const Ce={};Ce[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Ce[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ce[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ce[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Le(i.DEPTH_TEST),l.setFunc(Ir),Ie(!1),M(fa),Le(i.CULL_FACE),fe(Nn);function Le(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function Ee(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function Ge(R,se){return p[R]!==se?(i.bindFramebuffer(R,se),p[R]=se,n&&(R===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=se),R===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function D(R,se){let ae=_,Te=!1;if(R)if(ae=g.get(se),ae===void 0&&(ae=[],g.set(se,ae)),R.isWebGLMultipleRenderTargets){const ve=R.texture;if(ae.length!==ve.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Ze=0,Je=ve.length;Ze<Je;Ze++)ae[Ze]=i.COLOR_ATTACHMENT0+Ze;ae.length=ve.length,Te=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,Te=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,Te=!0);Te&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function It(R){return m!==R?(i.useProgram(R),m=R,!0):!1}const ye={[qn]:i.FUNC_ADD,[xc]:i.FUNC_SUBTRACT,[yc]:i.FUNC_REVERSE_SUBTRACT};if(n)ye[_a]=i.MIN,ye[xa]=i.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(ye[_a]=R.MIN_EXT,ye[xa]=R.MAX_EXT)}const we={[vc]:i.ZERO,[Sc]:i.ONE,[Mc]:i.SRC_COLOR,[Ns]:i.SRC_ALPHA,[Rc]:i.SRC_ALPHA_SATURATE,[Ac]:i.DST_COLOR,[Tc]:i.DST_ALPHA,[Ec]:i.ONE_MINUS_SRC_COLOR,[Fs]:i.ONE_MINUS_SRC_ALPHA,[wc]:i.ONE_MINUS_DST_COLOR,[bc]:i.ONE_MINUS_DST_ALPHA,[Cc]:i.CONSTANT_COLOR,[Pc]:i.ONE_MINUS_CONSTANT_COLOR,[Lc]:i.CONSTANT_ALPHA,[Uc]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(R,se,ae,Te,ve,Ze,Je,gt,Nt,Qe){if(R===Nn){f===!0&&(Ee(i.BLEND),f=!1);return}if(f===!1&&(Le(i.BLEND),f=!0),R!==_c){if(R!==E||Qe!==B){if((x!==qn||w!==qn)&&(i.blendEquation(i.FUNC_ADD),x=qn,w=qn),Qe)switch(R){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pa:i.blendFunc(i.ONE,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ga:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ga:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}b=null,C=null,A=null,H=null,S.set(0,0,0),T=0,E=R,B=Qe}return}ve=ve||se,Ze=Ze||ae,Je=Je||Te,(se!==x||ve!==w)&&(i.blendEquationSeparate(ye[se],ye[ve]),x=se,w=ve),(ae!==b||Te!==C||Ze!==A||Je!==H)&&(i.blendFuncSeparate(we[ae],we[Te],we[Ze],we[Je]),b=ae,C=Te,A=Ze,H=Je),(gt.equals(S)===!1||Nt!==T)&&(i.blendColor(gt.r,gt.g,gt.b,Nt),S.copy(gt),T=Nt),E=R,B=!1}function nt(R,se){R.side===yt?Ee(i.CULL_FACE):Le(i.CULL_FACE);let ae=R.side===Gt;se&&(ae=!ae),Ie(ae),R.blending===bi&&R.transparent===!1?fe(Nn):fe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),l.setFunc(R.depthFunc),l.setTest(R.depthTest),l.setMask(R.depthWrite),a.setMask(R.colorWrite);const Te=R.stencilWrite;c.setTest(Te),Te&&(c.setMask(R.stencilWriteMask),c.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),c.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),N(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Le(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(R){Y!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),Y=R)}function M(R){R!==pc?(Le(i.CULL_FACE),R!==re&&(R===fa?i.cullFace(i.BACK):R===mc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),re=R}function y(R){R!==P&&(W&&i.lineWidth(R),P=R)}function N(R,se,ae){R?(Le(i.POLYGON_OFFSET_FILL),(O!==se||G!==ae)&&(i.polygonOffset(se,ae),O=se,G=ae)):Ee(i.POLYGON_OFFSET_FILL)}function Z(R){R?Le(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function j(R){R===void 0&&(R=i.TEXTURE0+$-1),Q!==R&&(i.activeTexture(R),Q=R)}function J(R,se,ae){ae===void 0&&(Q===null?ae=i.TEXTURE0+$-1:ae=Q);let Te=de[ae];Te===void 0&&(Te={type:void 0,texture:void 0},de[ae]=Te),(Te.type!==R||Te.texture!==se)&&(Q!==ae&&(i.activeTexture(ae),Q=ae),i.bindTexture(R,se||Ce[R]),Te.type=R,Te.texture=se)}function pe(){const R=de[Q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Me(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ne(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function q(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ze(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ue(R){le.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),le.copy(R))}function Xe(R){_e.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),_e.copy(R))}function rt(R,se){let ae=h.get(se);ae===void 0&&(ae=new WeakMap,h.set(se,ae));let Te=ae.get(R);Te===void 0&&(Te=i.getUniformBlockIndex(se,R.name),ae.set(R,Te))}function Oe(R,se){const Te=h.get(se).get(R);d.get(se)!==Te&&(i.uniformBlockBinding(se,Te,R.__bindingPointIndex),d.set(se,Te))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,de={},p={},g=new WeakMap,_=[],m=null,f=!1,E=null,x=null,b=null,C=null,w=null,A=null,H=null,S=new $e(0,0,0),T=0,B=!1,Y=null,re=null,P=null,O=null,G=null,le.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Le,disable:Ee,bindFramebuffer:Ge,drawBuffers:D,useProgram:It,setBlending:fe,setMaterial:nt,setFlipSided:Ie,setCullFace:M,setLineWidth:y,setPolygonOffset:N,setScissorTest:Z,activeTexture:j,bindTexture:J,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:ue,texImage2D:xe,texImage3D:he,updateUBOMapping:rt,uniformBlockBinding:Oe,texStorage2D:ze,texStorage3D:Ae,texSubImage2D:Me,texSubImage3D:Ne,compressedTexSubImage2D:q,compressedTexSubImage3D:Ye,scissor:Ue,viewport:Xe,reset:ee}}function pm(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,y){return p?new OffscreenCanvas(M,y):ji("canvas")}function _(M,y,N,Z){let j=1;if((M.width>Z||M.height>Z)&&(j=Z/Math.max(M.width,M.height)),j<1||y===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const J=y?Vs:Math.floor,pe=J(j*M.width),oe=J(j*M.height);h===void 0&&(h=g(pe,oe));const ue=N?g(pe,oe):h;return ue.width=pe,ue.height=oe,ue.getContext("2d").drawImage(M,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+pe+"x"+oe+")."),ue}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return Ya(M.width)&&Ya(M.height)}function f(M){return a?!1:M.wrapS!==ft||M.wrapT!==ft||M.minFilter!==qe&&M.minFilter!==Zt}function E(M,y){return M.generateMipmaps&&y&&M.minFilter!==qe&&M.minFilter!==Zt}function x(M){i.generateMipmap(M)}function b(M,y,N,Z,j=!1){if(a===!1)return y;if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let J=y;if(y===i.RED&&(N===i.FLOAT&&(J=i.R32F),N===i.HALF_FLOAT&&(J=i.R16F),N===i.UNSIGNED_BYTE&&(J=i.R8)),y===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(J=i.R8UI),N===i.UNSIGNED_SHORT&&(J=i.R16UI),N===i.UNSIGNED_INT&&(J=i.R32UI),N===i.BYTE&&(J=i.R8I),N===i.SHORT&&(J=i.R16I),N===i.INT&&(J=i.R32I)),y===i.RG&&(N===i.FLOAT&&(J=i.RG32F),N===i.HALF_FLOAT&&(J=i.RG16F),N===i.UNSIGNED_BYTE&&(J=i.RG8)),y===i.RGBA){const pe=j?Nr:je.getTransfer(Z);N===i.FLOAT&&(J=i.RGBA32F),N===i.HALF_FLOAT&&(J=i.RGBA16F),N===i.UNSIGNED_BYTE&&(J=pe===et?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function C(M,y,N){return E(M,N)===!0||M.isFramebufferTexture&&M.minFilter!==qe&&M.minFilter!==Zt?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function w(M){return M===qe||M===ya||M===Qr?i.NEAREST:i.LINEAR}function A(M){const y=M.target;y.removeEventListener("dispose",A),S(y),y.isVideoTexture&&d.delete(y)}function H(M){const y=M.target;y.removeEventListener("dispose",H),B(y)}function S(M){const y=n.get(M);if(y.__webglInit===void 0)return;const N=M.source,Z=u.get(N);if(Z){const j=Z[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&T(M),Object.keys(Z).length===0&&u.delete(N)}n.remove(M)}function T(M){const y=n.get(M);i.deleteTexture(y.__webglTexture);const N=M.source,Z=u.get(N);delete Z[y.__cacheKey],o.memory.textures--}function B(M){const y=M.texture,N=n.get(M),Z=n.get(y);if(Z.__webglTexture!==void 0&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(N.__webglFramebuffer[j]))for(let J=0;J<N.__webglFramebuffer[j].length;J++)i.deleteFramebuffer(N.__webglFramebuffer[j][J]);else i.deleteFramebuffer(N.__webglFramebuffer[j]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[j])}else{if(Array.isArray(N.__webglFramebuffer))for(let j=0;j<N.__webglFramebuffer.length;j++)i.deleteFramebuffer(N.__webglFramebuffer[j]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let j=0;j<N.__webglColorRenderbuffer.length;j++)N.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[j]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let j=0,J=y.length;j<J;j++){const pe=n.get(y[j]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(y[j])}n.remove(y),n.remove(M)}let Y=0;function re(){Y=0}function P(){const M=Y;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),Y+=1,M}function O(M){const y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function G(M,y){const N=n.get(M);if(M.isVideoTexture&&nt(M),M.isRenderTargetTexture===!1&&M.version>0&&N.__version!==M.version){const Z=M.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(N,M,y);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+y)}function $(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){le(N,M,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+y)}function W(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){le(N,M,y);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+y)}function V(M,y){const N=n.get(M);if(M.version>0&&N.__version!==M.version){_e(N,M,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+y)}const K={[Bs]:i.REPEAT,[ft]:i.CLAMP_TO_EDGE,[zs]:i.MIRRORED_REPEAT},Q={[qe]:i.NEAREST,[ya]:i.NEAREST_MIPMAP_NEAREST,[Qr]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[Yc]:i.LINEAR_MIPMAP_NEAREST,[qi]:i.LINEAR_MIPMAP_LINEAR},de={[od]:i.NEVER,[fd]:i.ALWAYS,[ld]:i.LESS,[sl]:i.LEQUAL,[cd]:i.EQUAL,[hd]:i.GEQUAL,[dd]:i.GREATER,[ud]:i.NOTEQUAL};function z(M,y,N){if(N?(i.texParameteri(M,i.TEXTURE_WRAP_S,K[y.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,K[y.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,K[y.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,Q[y.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,Q[y.minFilter])):(i.texParameteri(M,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(M,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==ft||y.wrapT!==ft)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(M,i.TEXTURE_MAG_FILTER,w(y.magFilter)),i.texParameteri(M,i.TEXTURE_MIN_FILTER,w(y.minFilter)),y.minFilter!==qe&&y.minFilter!==Zt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,de[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Z=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===qe||y.minFilter!==Qr&&y.minFilter!==qi||y.type===In&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Yi&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(M,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function X(M,y){let N=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",A));const Z=y.source;let j=u.get(Z);j===void 0&&(j={},u.set(Z,j));const J=O(y);if(J!==M.__cacheKey){j[J]===void 0&&(j[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,N=!0),j[J].usedTimes++;const pe=j[M.__cacheKey];pe!==void 0&&(j[M.__cacheKey].usedTimes--,pe.usedTimes===0&&T(y)),M.__cacheKey=J,M.__webglTexture=j[J].texture}return N}function le(M,y,N){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);const j=X(M,y),J=y.source;t.bindTexture(Z,M.__webglTexture,i.TEXTURE0+N);const pe=n.get(J);if(J.version!==pe.__version||j===!0){t.activeTexture(i.TEXTURE0+N);const oe=je.getPrimaries(je.workingColorSpace),ue=y.colorSpace===Jt?null:je.getPrimaries(y.colorSpace),Me=y.colorSpace===Jt||oe===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ne=f(y)&&m(y.image)===!1;let q=_(y.image,Ne,!1,r.maxTextureSize);q=Ie(y,q);const Ye=m(q)||a,ze=s.convert(y.format,y.colorSpace);let Ae=s.convert(y.type),xe=b(y.internalFormat,ze,Ae,y.colorSpace,y.isVideoTexture);z(Z,y,Ye);let he;const Ue=y.mipmaps,Xe=a&&y.isVideoTexture!==!0&&xe!==il,rt=pe.__version===void 0||j===!0,Oe=C(y,q,Ye);if(y.isDepthTexture)xe=i.DEPTH_COMPONENT,a?y.type===In?xe=i.DEPTH_COMPONENT32F:y.type===Dn?xe=i.DEPTH_COMPONENT24:y.type===Kn?xe=i.DEPTH24_STENCIL8:xe=i.DEPTH_COMPONENT16:y.type===In&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Zn&&xe===i.DEPTH_COMPONENT&&y.type!==js&&y.type!==Dn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Dn,Ae=s.convert(y.type)),y.format===Li&&xe===i.DEPTH_COMPONENT&&(xe=i.DEPTH_STENCIL,y.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Kn,Ae=s.convert(y.type))),rt&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,xe,q.width,q.height):t.texImage2D(i.TEXTURE_2D,0,xe,q.width,q.height,0,ze,Ae,null));else if(y.isDataTexture)if(Ue.length>0&&Ye){Xe&&rt&&t.texStorage2D(i.TEXTURE_2D,Oe,xe,Ue[0].width,Ue[0].height);for(let ee=0,R=Ue.length;ee<R;ee++)he=Ue[ee],Xe?t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ze,Ae,he.data):t.texImage2D(i.TEXTURE_2D,ee,xe,he.width,he.height,0,ze,Ae,he.data);y.generateMipmaps=!1}else Xe?(rt&&t.texStorage2D(i.TEXTURE_2D,Oe,xe,q.width,q.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,q.width,q.height,ze,Ae,q.data)):t.texImage2D(i.TEXTURE_2D,0,xe,q.width,q.height,0,ze,Ae,q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Xe&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,xe,Ue[0].width,Ue[0].height,q.depth);for(let ee=0,R=Ue.length;ee<R;ee++)he=Ue[ee],y.format!==on?ze!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,q.depth,ze,he.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,xe,he.width,he.height,q.depth,0,he.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,q.depth,ze,Ae,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,xe,he.width,he.height,q.depth,0,ze,Ae,he.data)}else{Xe&&rt&&t.texStorage2D(i.TEXTURE_2D,Oe,xe,Ue[0].width,Ue[0].height);for(let ee=0,R=Ue.length;ee<R;ee++)he=Ue[ee],y.format!==on?ze!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ze,he.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,xe,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ze,Ae,he.data):t.texImage2D(i.TEXTURE_2D,ee,xe,he.width,he.height,0,ze,Ae,he.data)}else if(y.isDataArrayTexture)Xe?(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,xe,q.width,q.height,q.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ze,Ae,q.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,q.width,q.height,q.depth,0,ze,Ae,q.data);else if(y.isData3DTexture)Xe?(rt&&t.texStorage3D(i.TEXTURE_3D,Oe,xe,q.width,q.height,q.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ze,Ae,q.data)):t.texImage3D(i.TEXTURE_3D,0,xe,q.width,q.height,q.depth,0,ze,Ae,q.data);else if(y.isFramebufferTexture){if(rt)if(Xe)t.texStorage2D(i.TEXTURE_2D,Oe,xe,q.width,q.height);else{let ee=q.width,R=q.height;for(let se=0;se<Oe;se++)t.texImage2D(i.TEXTURE_2D,se,xe,ee,R,0,ze,Ae,null),ee>>=1,R>>=1}}else if(Ue.length>0&&Ye){Xe&&rt&&t.texStorage2D(i.TEXTURE_2D,Oe,xe,Ue[0].width,Ue[0].height);for(let ee=0,R=Ue.length;ee<R;ee++)he=Ue[ee],Xe?t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ze,Ae,he):t.texImage2D(i.TEXTURE_2D,ee,xe,ze,Ae,he);y.generateMipmaps=!1}else Xe?(rt&&t.texStorage2D(i.TEXTURE_2D,Oe,xe,q.width,q.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ze,Ae,q)):t.texImage2D(i.TEXTURE_2D,0,xe,ze,Ae,q);E(y,Ye)&&x(Z),pe.__version=J.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function _e(M,y,N){if(y.image.length!==6)return;const Z=X(M,y),j=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+N);const J=n.get(j);if(j.version!==J.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const pe=je.getPrimaries(je.workingColorSpace),oe=y.colorSpace===Jt?null:je.getPrimaries(y.colorSpace),ue=y.colorSpace===Jt||pe===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Me=y.isCompressedTexture||y.image[0].isCompressedTexture,Ne=y.image[0]&&y.image[0].isDataTexture,q=[];for(let ee=0;ee<6;ee++)!Me&&!Ne?q[ee]=_(y.image[ee],!1,!0,r.maxCubemapSize):q[ee]=Ne?y.image[ee].image:y.image[ee],q[ee]=Ie(y,q[ee]);const Ye=q[0],ze=m(Ye)||a,Ae=s.convert(y.format,y.colorSpace),xe=s.convert(y.type),he=b(y.internalFormat,Ae,xe,y.colorSpace),Ue=a&&y.isVideoTexture!==!0,Xe=J.__version===void 0||Z===!0;let rt=C(y,Ye,ze);z(i.TEXTURE_CUBE_MAP,y,ze);let Oe;if(Me){Ue&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,he,Ye.width,Ye.height);for(let ee=0;ee<6;ee++){Oe=q[ee].mipmaps;for(let R=0;R<Oe.length;R++){const se=Oe[R];y.format!==on?Ae!==null?Ue?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R,0,0,se.width,se.height,Ae,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R,he,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R,0,0,se.width,se.height,Ae,xe,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R,he,se.width,se.height,0,Ae,xe,se.data)}}}else{Oe=y.mipmaps,Ue&&Xe&&(Oe.length>0&&rt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,he,q[0].width,q[0].height));for(let ee=0;ee<6;ee++)if(Ne){Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,q[ee].width,q[ee].height,Ae,xe,q[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,he,q[ee].width,q[ee].height,0,Ae,xe,q[ee].data);for(let R=0;R<Oe.length;R++){const ae=Oe[R].image[ee].image;Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R+1,0,0,ae.width,ae.height,Ae,xe,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R+1,he,ae.width,ae.height,0,Ae,xe,ae.data)}}else{Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,xe,q[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,he,Ae,xe,q[ee]);for(let R=0;R<Oe.length;R++){const se=Oe[R];Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R+1,0,0,Ae,xe,se.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,R+1,he,Ae,xe,se.image[ee])}}}E(y,ze)&&x(i.TEXTURE_CUBE_MAP),J.__version=j.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function ge(M,y,N,Z,j,J){const pe=s.convert(N.format,N.colorSpace),oe=s.convert(N.type),ue=b(N.internalFormat,pe,oe,N.colorSpace);if(!n.get(y).__hasExternalTextures){const Ne=Math.max(1,y.width>>J),q=Math.max(1,y.height>>J);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,J,ue,Ne,q,y.depth,0,pe,oe,null):t.texImage2D(j,J,ue,Ne,q,0,pe,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,n.get(N).__webglTexture,0,we(y)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,n.get(N).__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(M,y,N){if(i.bindRenderbuffer(i.RENDERBUFFER,M),y.depthBuffer&&!y.stencilBuffer){let Z=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||fe(y)){const j=y.depthTexture;j&&j.isDepthTexture&&(j.type===In?Z=i.DEPTH_COMPONENT32F:j.type===Dn&&(Z=i.DEPTH_COMPONENT24));const J=we(y);fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,Z,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,J,Z,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,Z,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,M)}else if(y.depthBuffer&&y.stencilBuffer){const Z=we(y);N&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,M)}else{const Z=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let j=0;j<Z.length;j++){const J=Z[j],pe=s.convert(J.format,J.colorSpace),oe=s.convert(J.type),ue=b(J.internalFormat,pe,oe,J.colorSpace),Me=we(y);N&&fe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ue,y.width,y.height):fe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,ue,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ue,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const Z=n.get(y.depthTexture).__webglTexture,j=we(y);if(y.depthTexture.format===Zn)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(y.depthTexture.format===Li)fe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ee(M){const y=n.get(M),N=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Le(y.__webglFramebuffer,M)}else if(N){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ce(y.__webglDepthbuffer[Z],M,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Ce(y.__webglDepthbuffer,M,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(M,y,N){const Z=n.get(M);y!==void 0&&ge(Z.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ee(M)}function D(M){const y=M.texture,N=n.get(M),Z=n.get(y);M.addEventListener("dispose",H),M.isWebGLMultipleRenderTargets!==!0&&(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,o.memory.textures++);const j=M.isWebGLCubeRenderTarget===!0,J=M.isWebGLMultipleRenderTargets===!0,pe=m(M)||a;if(j){N.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[oe]=[];for(let ue=0;ue<y.mipmaps.length;ue++)N.__webglFramebuffer[oe][ue]=i.createFramebuffer()}else N.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let oe=0;oe<y.mipmaps.length;oe++)N.__webglFramebuffer[oe]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(J)if(r.drawBuffers){const oe=M.texture;for(let ue=0,Me=oe.length;ue<Me;ue++){const Ne=n.get(oe[ue]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&M.samples>0&&fe(M)===!1){const oe=J?y:[y];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ue=0;ue<oe.length;ue++){const Me=oe[ue];N.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[ue]);const Ne=s.convert(Me.format,Me.colorSpace),q=s.convert(Me.type),Ye=b(Me.internalFormat,Ne,q,Me.colorSpace,M.isXRRenderTarget===!0),ze=we(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,Ye,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,N.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ce(N.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),z(i.TEXTURE_CUBE_MAP,y,pe);for(let oe=0;oe<6;oe++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)ge(N.__webglFramebuffer[oe][ue],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue);else ge(N.__webglFramebuffer[oe],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);E(y,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){const oe=M.texture;for(let ue=0,Me=oe.length;ue<Me;ue++){const Ne=oe[ue],q=n.get(Ne);t.bindTexture(i.TEXTURE_2D,q.__webglTexture),z(i.TEXTURE_2D,Ne,pe),ge(N.__webglFramebuffer,M,Ne,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),E(Ne,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(a?oe=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,Z.__webglTexture),z(oe,y,pe),a&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)ge(N.__webglFramebuffer[ue],M,y,i.COLOR_ATTACHMENT0,oe,ue);else ge(N.__webglFramebuffer,M,y,i.COLOR_ATTACHMENT0,oe,0);E(y,pe)&&x(oe),t.unbindTexture()}M.depthBuffer&&Ee(M)}function It(M){const y=m(M)||a,N=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0,j=N.length;Z<j;Z++){const J=N[Z];if(E(J,y)){const pe=M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(J).__webglTexture;t.bindTexture(pe,oe),x(pe),t.unbindTexture()}}}function ye(M){if(a&&M.samples>0&&fe(M)===!1){const y=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],N=M.width,Z=M.height;let j=i.COLOR_BUFFER_BIT;const J=[],pe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(M),ue=M.isWebGLMultipleRenderTargets===!0;if(ue)for(let Me=0;Me<y.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Me=0;Me<y.length;Me++){J.push(i.COLOR_ATTACHMENT0+Me),M.depthBuffer&&J.push(pe);const Ne=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Ne===!1&&(M.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ue&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Me]),Ne===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),ue){const q=n.get(y[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,q,0)}i.blitFramebuffer(0,0,N,Z,0,0,N,Z,j,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Me=0;Me<y.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Me]);const Ne=n.get(y[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function we(M){return Math.min(r.maxSamples,M.samples)}function fe(M){const y=n.get(M);return a&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function nt(M){const y=o.render.frame;d.get(M)!==y&&(d.set(M,y),M.update())}function Ie(M,y){const N=M.colorSpace,Z=M.format,j=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Hs||N!==An&&N!==Jt&&(je.getTransfer(N)===et?a===!1?e.has("EXT_sRGB")===!0&&Z===on?(M.format=Hs,M.minFilter=Zt,M.generateMipmaps=!1):y=ol.sRGBToLinear(y):(Z!==on||j!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}this.allocateTextureUnit=P,this.resetTextureUnits=re,this.setTexture2D=G,this.setTexture2DArray=$,this.setTexture3D=W,this.setTextureCube=V,this.rebindTextures=Ge,this.setupRenderTarget=D,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function mm(i,e,t){const n=t.isWebGL2;function r(s,o=Jt){let a;const l=je.getTransfer(o);if(s===On)return i.UNSIGNED_BYTE;if(s===Jo)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Qo)return i.UNSIGNED_SHORT_5_5_5_1;if(s===jc)return i.BYTE;if(s===Kc)return i.SHORT;if(s===js)return i.UNSIGNED_SHORT;if(s===Zo)return i.INT;if(s===Dn)return i.UNSIGNED_INT;if(s===In)return i.FLOAT;if(s===Yi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Zc)return i.ALPHA;if(s===on)return i.RGBA;if(s===Jc)return i.LUMINANCE;if(s===Qc)return i.LUMINANCE_ALPHA;if(s===Zn)return i.DEPTH_COMPONENT;if(s===Li)return i.DEPTH_STENCIL;if(s===Hs)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===ed)return i.RED;if(s===el)return i.RED_INTEGER;if(s===td)return i.RG;if(s===tl)return i.RG_INTEGER;if(s===nl)return i.RGBA_INTEGER;if(s===es||s===ts||s===ns||s===is)if(l===et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===es)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ts)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ns)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===is)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===es)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ts)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ns)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===is)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===va||s===Sa||s===Ma||s===Ea)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===va)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Sa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ma)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ea)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===il)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ta||s===ba)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Ta)return l===et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===ba)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Aa||s===wa||s===Ra||s===Ca||s===Pa||s===La||s===Ua||s===Da||s===Ia||s===Na||s===Fa||s===Oa||s===ka||s===Ba)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Aa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===wa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ra)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ca)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===La)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ua)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Da)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ia)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Na)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Fa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Oa)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ka)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ba)return l===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===rs||s===za||s===Ha)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===rs)return l===et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===za)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ha)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===nd||s===Ga||s===Va||s===Wa)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===rs)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Ga)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Va)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Wa)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class gm extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ar extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _m={type:"move"};class Cs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_m)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ar;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class xm extends Di{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const E=[],x=[],b=new Ke;let C=null;const w=new an;w.layers.enable(1),w.viewport=new Tt;const A=new an;A.layers.enable(2),A.viewport=new Tt;const H=[w,A],S=new gm;S.layers.enable(1),S.layers.enable(2);let T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let X=E[z];return X===void 0&&(X=new Cs,E[z]=X),X.getTargetRaySpace()},this.getControllerGrip=function(z){let X=E[z];return X===void 0&&(X=new Cs,E[z]=X),X.getGripSpace()},this.getHand=function(z){let X=E[z];return X===void 0&&(X=new Cs,E[z]=X),X.getHandSpace()};function Y(z){const X=x.indexOf(z.inputSource);if(X===-1)return;const le=E[X];le!==void 0&&(le.update(z.inputSource,z.frame,c||o),le.dispatchEvent({type:z.type,data:z.inputSource}))}function re(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",P);for(let z=0;z<E.length;z++){const X=x[z];X!==null&&(x[z]=null,E[z].disconnect(X))}T=null,B=null,e.setRenderTarget(m),p=null,u=null,h=null,r=null,f=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",re),r.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(b),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const X={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Qn(p.framebufferWidth,p.framebufferHeight,{format:on,type:On,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let X=null,le=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=_.stencil?Li:Zn,le=_.stencil?Kn:Dn);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};h=new XRWebGLBinding(r,t),u=h.createProjectionLayer(ge),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),f=new Qn(u.textureWidth,u.textureHeight,{format:on,type:On,depthTexture:new Sl(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ce=e.properties.get(f);Ce.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P(z){for(let X=0;X<z.removed.length;X++){const le=z.removed[X],_e=x.indexOf(le);_e>=0&&(x[_e]=null,E[_e].disconnect(le))}for(let X=0;X<z.added.length;X++){const le=z.added[X];let _e=x.indexOf(le);if(_e===-1){for(let Ce=0;Ce<E.length;Ce++)if(Ce>=x.length){x.push(le),_e=Ce;break}else if(x[Ce]===null){x[Ce]=le,_e=Ce;break}if(_e===-1)break}const ge=E[_e];ge&&ge.connect(le)}}const O=new U,G=new U;function $(z,X,le){O.setFromMatrixPosition(X.matrixWorld),G.setFromMatrixPosition(le.matrixWorld);const _e=O.distanceTo(G),ge=X.projectionMatrix.elements,Ce=le.projectionMatrix.elements,Le=ge[14]/(ge[10]-1),Ee=ge[14]/(ge[10]+1),Ge=(ge[9]+1)/ge[5],D=(ge[9]-1)/ge[5],It=(ge[8]-1)/ge[0],ye=(Ce[8]+1)/Ce[0],we=Le*It,fe=Le*ye,nt=_e/(-It+ye),Ie=nt*-It;X.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ie),z.translateZ(nt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const M=Le+nt,y=Ee+nt,N=we-Ie,Z=fe+(_e-Ie),j=Ge*Ee/y*M,J=D*Ee/y*M;z.projectionMatrix.makePerspective(N,Z,j,J,M,y),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function W(z,X){X===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(X.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;S.near=A.near=w.near=z.near,S.far=A.far=w.far=z.far,(T!==S.near||B!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,B=S.far);const X=z.parent,le=S.cameras;W(S,X);for(let _e=0;_e<le.length;_e++)W(le[_e],X);le.length===2?$(S,w,A):S.projectionMatrix.copy(w.projectionMatrix),V(z,S,X)};function V(z,X,le){le===null?z.matrix.copy(X.matrixWorld):(z.matrix.copy(le.matrixWorld),z.matrix.invert(),z.matrix.multiply(X.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(X.projectionMatrix),z.projectionMatrixInverse.copy(X.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Gs*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(z){l=z,u!==null&&(u.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)};let K=null;function Q(z,X){if(d=X.getViewerPose(c||o),g=X,d!==null){const le=d.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let _e=!1;le.length!==S.cameras.length&&(S.cameras.length=0,_e=!0);for(let ge=0;ge<le.length;ge++){const Ce=le[ge];let Le=null;if(p!==null)Le=p.getViewport(Ce);else{const Ge=h.getViewSubImage(u,Ce);Le=Ge.viewport,ge===0&&(e.setRenderTargetTextures(f,Ge.colorTexture,u.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(f))}let Ee=H[ge];Ee===void 0&&(Ee=new an,Ee.layers.enable(ge),Ee.viewport=new Tt,H[ge]=Ee),Ee.matrix.fromArray(Ce.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Ce.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(Le.x,Le.y,Le.width,Le.height),ge===0&&(S.matrix.copy(Ee.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),_e===!0&&S.cameras.push(Ee)}}for(let le=0;le<E.length;le++){const _e=x[le],ge=E[le];_e!==null&&ge!==void 0&&ge.update(_e,X,c||o)}K&&K(z,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}const de=new yl;de.setAnimationLoop(Q),this.setAnimationLoop=function(z){K=z},this.dispose=function(){}}}function ym(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ml(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,E,x,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,E,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Gt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Gt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Gt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function vm(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,x){const b=x.program;n.uniformBlockBinding(E,b)}function c(E,x){let b=r[E.id];b===void 0&&(g(E),b=d(E),r[E.id]=b,E.addEventListener("dispose",m));const C=x.program;n.updateUBOMapping(E,C);const w=e.render.frame;s[E.id]!==w&&(u(E),s[E.id]=w)}function d(E){const x=h();E.__bindingPointIndex=x;const b=i.createBuffer(),C=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const x=r[E.id],b=E.uniforms,C=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,A=b.length;w<A;w++){const H=Array.isArray(b[w])?b[w]:[b[w]];for(let S=0,T=H.length;S<T;S++){const B=H[S];if(p(B,w,S,C)===!0){const Y=B.__offset,re=Array.isArray(B.value)?B.value:[B.value];let P=0;for(let O=0;O<re.length;O++){const G=re[O],$=_(G);typeof G=="number"||typeof G=="boolean"?(B.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,Y+P,B.__data)):G.isMatrix3?(B.__data[0]=G.elements[0],B.__data[1]=G.elements[1],B.__data[2]=G.elements[2],B.__data[3]=0,B.__data[4]=G.elements[3],B.__data[5]=G.elements[4],B.__data[6]=G.elements[5],B.__data[7]=0,B.__data[8]=G.elements[6],B.__data[9]=G.elements[7],B.__data[10]=G.elements[8],B.__data[11]=0):(G.toArray(B.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,B.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,x,b,C){const w=E.value,A=x+"_"+b;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const H=C[A];if(typeof w=="number"||typeof w=="boolean"){if(H!==w)return C[A]=w,!0}else if(H.equals(w)===!1)return H.copy(w),!0}return!1}function g(E){const x=E.uniforms;let b=0;const C=16;for(let A=0,H=x.length;A<H;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let T=0,B=S.length;T<B;T++){const Y=S[T],re=Array.isArray(Y.value)?Y.value:[Y.value];for(let P=0,O=re.length;P<O;P++){const G=re[P],$=_(G),W=b%C;W!==0&&C-W<$.boundary&&(b+=C-W),Y.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=b,b+=$.storage}}}const w=b%C;return w>0&&(b+=C-w),E.__size=b,E.__cache={},this}function _(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function m(E){const x=E.target;x.removeEventListener("dispose",m);const b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function f(){for(const E in r)i.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class wl{constructor(e={}){const{canvas:t=md(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Et,this._useLegacyLights=!1,this.toneMapping=Fn,this.toneMappingExposure=1;const x=this;let b=!1,C=0,w=0,A=null,H=-1,S=null;const T=new Tt,B=new Tt;let Y=null;const re=new $e(0);let P=0,O=t.width,G=t.height,$=1,W=null,V=null;const K=new Tt(0,0,O,G),Q=new Tt(0,0,O,G);let de=!1;const z=new xl;let X=!1,le=!1,_e=null;const ge=new St,Ce=new Ke,Le=new U,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return A===null?$:1}let D=n;function It(v,L){for(let F=0;F<v.length;F++){const k=v[F],I=t.getContext(k,L);if(I!==null)return I}return null}try{const v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ys}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",se,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&L.shift(),D=It(L,v),D===null)throw It(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let ye,we,fe,nt,Ie,M,y,N,Z,j,J,pe,oe,ue,Me,Ne,q,Ye,ze,Ae,xe,he,Ue,Xe;function rt(){ye=new Pf(D),we=new Tf(D,ye,e),ye.init(we),he=new mm(D,ye,we),fe=new fm(D,ye,we),nt=new Df(D),Ie=new Qp,M=new pm(D,ye,fe,Ie,we,he,nt),y=new Af(x),N=new Cf(x),Z=new zd(D,we),Ue=new Mf(D,ye,Z,we),j=new Lf(D,Z,nt,Ue),J=new Of(D,j,Z,nt),ze=new Ff(D,we,M),Ne=new bf(Ie),pe=new Jp(x,y,N,ye,we,Ue,Ne),oe=new ym(x,Ie),ue=new tm,Me=new om(ye,we),Ye=new Sf(x,y,N,fe,J,u,l),q=new hm(x,J,we),Xe=new vm(D,nt,we,fe),Ae=new Ef(D,ye,nt,we),xe=new Uf(D,ye,nt,we),nt.programs=pe.programs,x.capabilities=we,x.extensions=ye,x.properties=Ie,x.renderLists=ue,x.shadowMap=q,x.state=fe,x.info=nt}rt();const Oe=new xm(x,D);this.xr=Oe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const v=ye.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=ye.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(v){v!==void 0&&($=v,this.setSize(O,G,!1))},this.getSize=function(v){return v.set(O,G)},this.setSize=function(v,L,F=!0){if(Oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=v,G=L,t.width=Math.floor(v*$),t.height=Math.floor(L*$),F===!0&&(t.style.width=v+"px",t.style.height=L+"px"),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(O*$,G*$).floor()},this.setDrawingBufferSize=function(v,L,F){O=v,G=L,$=F,t.width=Math.floor(v*F),t.height=Math.floor(L*F),this.setViewport(0,0,v,L)},this.getCurrentViewport=function(v){return v.copy(T)},this.getViewport=function(v){return v.copy(K)},this.setViewport=function(v,L,F,k){v.isVector4?K.set(v.x,v.y,v.z,v.w):K.set(v,L,F,k),fe.viewport(T.copy(K).multiplyScalar($).floor())},this.getScissor=function(v){return v.copy(Q)},this.setScissor=function(v,L,F,k){v.isVector4?Q.set(v.x,v.y,v.z,v.w):Q.set(v,L,F,k),fe.scissor(B.copy(Q).multiplyScalar($).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(v){fe.setScissorTest(de=v)},this.setOpaqueSort=function(v){W=v},this.setTransparentSort=function(v){V=v},this.getClearColor=function(v){return v.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(v=!0,L=!0,F=!0){let k=0;if(v){let I=!1;if(A!==null){const ce=A.texture.format;I=ce===nl||ce===tl||ce===el}if(I){const ce=A.texture.type,me=ce===On||ce===Dn||ce===js||ce===Kn||ce===Jo||ce===Qo,Se=Ye.getClearColor(),be=Ye.getClearAlpha(),Fe=Se.r,Re=Se.g,Pe=Se.b;me?(p[0]=Fe,p[1]=Re,p[2]=Pe,p[3]=be,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=Fe,g[1]=Re,g[2]=Pe,g[3]=be,D.clearBufferiv(D.COLOR,0,g))}else k|=D.COLOR_BUFFER_BIT}L&&(k|=D.DEPTH_BUFFER_BIT),F&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",se,!1),ue.dispose(),Me.dispose(),Ie.dispose(),y.dispose(),N.dispose(),J.dispose(),Ue.dispose(),Xe.dispose(),pe.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",Nt),Oe.removeEventListener("sessionend",Qe),_e&&(_e.dispose(),_e=null),Ft.stop()};function ee(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const v=nt.autoReset,L=q.enabled,F=q.autoUpdate,k=q.needsUpdate,I=q.type;rt(),nt.autoReset=v,q.enabled=L,q.autoUpdate=F,q.needsUpdate=k,q.type=I}function se(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ae(v){const L=v.target;L.removeEventListener("dispose",ae),Te(L)}function Te(v){ve(v),Ie.remove(v)}function ve(v){const L=Ie.get(v).programs;L!==void 0&&(L.forEach(function(F){pe.releaseProgram(F)}),v.isShaderMaterial&&pe.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,F,k,I,ce){L===null&&(L=Ee);const me=I.isMesh&&I.matrixWorld.determinant()<0,Se=zl(v,L,F,k,I);fe.setMaterial(k,me);let be=F.index,Fe=1;if(k.wireframe===!0){if(be=j.getWireframeAttribute(F),be===void 0)return;Fe=2}const Re=F.drawRange,Pe=F.attributes.position;let ot=Re.start*Fe,Wt=(Re.start+Re.count)*Fe;ce!==null&&(ot=Math.max(ot,ce.start*Fe),Wt=Math.min(Wt,(ce.start+ce.count)*Fe)),be!==null?(ot=Math.max(ot,0),Wt=Math.min(Wt,be.count)):Pe!=null&&(ot=Math.max(ot,0),Wt=Math.min(Wt,Pe.count));const _t=Wt-ot;if(_t<0||_t===1/0)return;Ue.setup(I,k,Se,F,be);let _n,it=Ae;if(be!==null&&(_n=Z.get(be),it=xe,it.setIndex(_n)),I.isMesh)k.wireframe===!0?(fe.setLineWidth(k.wireframeLinewidth*Ge()),it.setMode(D.LINES)):it.setMode(D.TRIANGLES);else if(I.isLine){let ke=k.linewidth;ke===void 0&&(ke=1),fe.setLineWidth(ke*Ge()),I.isLineSegments?it.setMode(D.LINES):I.isLineLoop?it.setMode(D.LINE_LOOP):it.setMode(D.LINE_STRIP)}else I.isPoints?it.setMode(D.POINTS):I.isSprite&&it.setMode(D.TRIANGLES);if(I.isBatchedMesh)it.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)it.renderInstances(ot,_t,I.count);else if(F.isInstancedBufferGeometry){const ke=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,qr=Math.min(F.instanceCount,ke);it.renderInstances(ot,_t,qr)}else it.render(ot,_t)};function Ze(v,L,F){v.transparent===!0&&v.side===yt&&v.forceSinglePass===!1?(v.side=Gt,v.needsUpdate=!0,ir(v,L,F),v.side=gn,v.needsUpdate=!0,ir(v,L,F),v.side=yt):ir(v,L,F)}this.compile=function(v,L,F=null){F===null&&(F=v),m=Me.get(F),m.init(),E.push(m),F.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),v!==F&&v.traverseVisible(function(I){I.isLight&&I.layers.test(L.layers)&&(m.pushLight(I),I.castShadow&&m.pushShadow(I))}),m.setupLights(x._useLegacyLights);const k=new Set;return v.traverse(function(I){const ce=I.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const Se=ce[me];Ze(Se,F,I),k.add(Se)}else Ze(ce,F,I),k.add(ce)}),E.pop(),m=null,k},this.compileAsync=function(v,L,F=null){const k=this.compile(v,L,F);return new Promise(I=>{function ce(){if(k.forEach(function(me){Ie.get(me).currentProgram.isReady()&&k.delete(me)}),k.size===0){I(v);return}setTimeout(ce,10)}ye.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Je=null;function gt(v){Je&&Je(v)}function Nt(){Ft.stop()}function Qe(){Ft.start()}const Ft=new yl;Ft.setAnimationLoop(gt),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(v){Je=v,Oe.setAnimationLoop(v),v===null?Ft.stop():Ft.start()},Oe.addEventListener("sessionstart",Nt),Oe.addEventListener("sessionend",Qe),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(L),L=Oe.getCamera()),v.isScene===!0&&v.onBeforeRender(x,v,L,A),m=Me.get(v,E.length),m.init(),E.push(m),ge.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),z.setFromProjectionMatrix(ge),le=this.localClippingEnabled,X=Ne.init(this.clippingPlanes,le),_=ue.get(v,f.length),_.init(),f.push(_),dn(v,L,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,V),this.info.render.frame++,X===!0&&Ne.beginShadows();const F=m.state.shadowsArray;if(q.render(F,v,L),X===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,v),m.setupLights(x._useLegacyLights),L.isArrayCamera){const k=L.cameras;for(let I=0,ce=k.length;I<ce;I++){const me=k[I];na(_,v,me,me.viewport)}}else na(_,v,L);A!==null&&(M.updateMultisampleRenderTarget(A),M.updateRenderTargetMipmap(A)),v.isScene===!0&&v.onAfterRender(x,v,L),Ue.resetDefaultState(),H=-1,S=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function dn(v,L,F,k){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)F=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||z.intersectsSprite(v)){k&&Le.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ge);const me=J.update(v),Se=v.material;Se.visible&&_.push(v,me,Se,F,Le.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||z.intersectsObject(v))){const me=J.update(v),Se=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Le.copy(v.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Le.copy(me.boundingSphere.center)),Le.applyMatrix4(v.matrixWorld).applyMatrix4(ge)),Array.isArray(Se)){const be=me.groups;for(let Fe=0,Re=be.length;Fe<Re;Fe++){const Pe=be[Fe],ot=Se[Pe.materialIndex];ot&&ot.visible&&_.push(v,me,ot,F,Le.z,Pe)}}else Se.visible&&_.push(v,me,Se,F,Le.z,null)}}const ce=v.children;for(let me=0,Se=ce.length;me<Se;me++)dn(ce[me],L,F,k)}function na(v,L,F,k){const I=v.opaque,ce=v.transmissive,me=v.transparent;m.setupLightsView(F),X===!0&&Ne.setGlobalState(x.clippingPlanes,F),ce.length>0&&Bl(I,ce,L,F),k&&fe.viewport(T.copy(k)),I.length>0&&nr(I,L,F),ce.length>0&&nr(ce,L,F),me.length>0&&nr(me,L,F),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Bl(v,L,F,k){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;const ce=we.isWebGL2;_e===null&&(_e=new Qn(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?Yi:On,minFilter:qi,samples:ce?4:0})),x.getDrawingBufferSize(Ce),ce?_e.setSize(Ce.x,Ce.y):_e.setSize(Vs(Ce.x),Vs(Ce.y));const me=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(re),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=Fn,nr(v,F,k),M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e);let be=!1;for(let Fe=0,Re=L.length;Fe<Re;Fe++){const Pe=L[Fe],ot=Pe.object,Wt=Pe.geometry,_t=Pe.material,_n=Pe.group;if(_t.side===yt&&ot.layers.test(k.layers)){const it=_t.side;_t.side=Gt,_t.needsUpdate=!0,ia(ot,F,k,Wt,_t,_n),_t.side=it,_t.needsUpdate=!0,be=!0}}be===!0&&(M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e)),x.setRenderTarget(me),x.setClearColor(re,P),x.toneMapping=Se}function nr(v,L,F){const k=L.isScene===!0?L.overrideMaterial:null;for(let I=0,ce=v.length;I<ce;I++){const me=v[I],Se=me.object,be=me.geometry,Fe=k===null?me.material:k,Re=me.group;Se.layers.test(F.layers)&&ia(Se,L,F,be,Fe,Re)}}function ia(v,L,F,k,I,ce){v.onBeforeRender(x,L,F,k,I,ce),v.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),I.onBeforeRender(x,L,F,k,v,ce),I.transparent===!0&&I.side===yt&&I.forceSinglePass===!1?(I.side=Gt,I.needsUpdate=!0,x.renderBufferDirect(F,L,k,I,v,ce),I.side=gn,I.needsUpdate=!0,x.renderBufferDirect(F,L,k,I,v,ce),I.side=yt):x.renderBufferDirect(F,L,k,I,v,ce),v.onAfterRender(x,L,F,k,I,ce)}function ir(v,L,F){L.isScene!==!0&&(L=Ee);const k=Ie.get(v),I=m.state.lights,ce=m.state.shadowsArray,me=I.state.version,Se=pe.getParameters(v,I.state,ce,L,F),be=pe.getProgramCacheKey(Se);let Fe=k.programs;k.environment=v.isMeshStandardMaterial?L.environment:null,k.fog=L.fog,k.envMap=(v.isMeshStandardMaterial?N:y).get(v.envMap||k.environment),Fe===void 0&&(v.addEventListener("dispose",ae),Fe=new Map,k.programs=Fe);let Re=Fe.get(be);if(Re!==void 0){if(k.currentProgram===Re&&k.lightsStateVersion===me)return sa(v,Se),Re}else Se.uniforms=pe.getUniforms(v),v.onBuild(F,Se,x),v.onBeforeCompile(Se,x),Re=pe.acquireProgram(Se,be),Fe.set(be,Re),k.uniforms=Se.uniforms;const Pe=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Pe.clippingPlanes=Ne.uniform),sa(v,Se),k.needsLights=Gl(v),k.lightsStateVersion=me,k.needsLights&&(Pe.ambientLightColor.value=I.state.ambient,Pe.lightProbe.value=I.state.probe,Pe.directionalLights.value=I.state.directional,Pe.directionalLightShadows.value=I.state.directionalShadow,Pe.spotLights.value=I.state.spot,Pe.spotLightShadows.value=I.state.spotShadow,Pe.rectAreaLights.value=I.state.rectArea,Pe.ltc_1.value=I.state.rectAreaLTC1,Pe.ltc_2.value=I.state.rectAreaLTC2,Pe.pointLights.value=I.state.point,Pe.pointLightShadows.value=I.state.pointShadow,Pe.hemisphereLights.value=I.state.hemi,Pe.directionalShadowMap.value=I.state.directionalShadowMap,Pe.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Pe.spotShadowMap.value=I.state.spotShadowMap,Pe.spotLightMatrix.value=I.state.spotLightMatrix,Pe.spotLightMap.value=I.state.spotLightMap,Pe.pointShadowMap.value=I.state.pointShadowMap,Pe.pointShadowMatrix.value=I.state.pointShadowMatrix),k.currentProgram=Re,k.uniformsList=null,Re}function ra(v){if(v.uniformsList===null){const L=v.currentProgram.getUniforms();v.uniformsList=Pr.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function sa(v,L){const F=Ie.get(v);F.outputColorSpace=L.outputColorSpace,F.batching=L.batching,F.instancing=L.instancing,F.instancingColor=L.instancingColor,F.skinning=L.skinning,F.morphTargets=L.morphTargets,F.morphNormals=L.morphNormals,F.morphColors=L.morphColors,F.morphTargetsCount=L.morphTargetsCount,F.numClippingPlanes=L.numClippingPlanes,F.numIntersection=L.numClipIntersection,F.vertexAlphas=L.vertexAlphas,F.vertexTangents=L.vertexTangents,F.toneMapping=L.toneMapping}function zl(v,L,F,k,I){L.isScene!==!0&&(L=Ee),M.resetTextureUnits();const ce=L.fog,me=k.isMeshStandardMaterial?L.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:An,be=(k.isMeshStandardMaterial?N:y).get(k.envMap||me),Fe=k.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Re=!!F.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pe=!!F.morphAttributes.position,ot=!!F.morphAttributes.normal,Wt=!!F.morphAttributes.color;let _t=Fn;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=x.toneMapping);const _n=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,it=_n!==void 0?_n.length:0,ke=Ie.get(k),qr=m.state.lights;if(X===!0&&(le===!0||v!==S)){const jt=v===S&&k.id===H;Ne.setState(k,v,jt)}let st=!1;k.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==qr.state.version||ke.outputColorSpace!==Se||I.isBatchedMesh&&ke.batching===!1||!I.isBatchedMesh&&ke.batching===!0||I.isInstancedMesh&&ke.instancing===!1||!I.isInstancedMesh&&ke.instancing===!0||I.isSkinnedMesh&&ke.skinning===!1||!I.isSkinnedMesh&&ke.skinning===!0||I.isInstancedMesh&&ke.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&ke.instancingColor===!1&&I.instanceColor!==null||ke.envMap!==be||k.fog===!0&&ke.fog!==ce||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Ne.numPlanes||ke.numIntersection!==Ne.numIntersection)||ke.vertexAlphas!==Fe||ke.vertexTangents!==Re||ke.morphTargets!==Pe||ke.morphNormals!==ot||ke.morphColors!==Wt||ke.toneMapping!==_t||we.isWebGL2===!0&&ke.morphTargetsCount!==it)&&(st=!0):(st=!0,ke.__version=k.version);let kn=ke.currentProgram;st===!0&&(kn=ir(k,L,I));let aa=!1,Fi=!1,Yr=!1;const bt=kn.getUniforms(),Bn=ke.uniforms;if(fe.useProgram(kn.program)&&(aa=!0,Fi=!0,Yr=!0),k.id!==H&&(H=k.id,Fi=!0),aa||S!==v){bt.setValue(D,"projectionMatrix",v.projectionMatrix),bt.setValue(D,"viewMatrix",v.matrixWorldInverse);const jt=bt.map.cameraPosition;jt!==void 0&&jt.setValue(D,Le.setFromMatrixPosition(v.matrixWorld)),we.logarithmicDepthBuffer&&bt.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&bt.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),S!==v&&(S=v,Fi=!0,Yr=!0)}if(I.isSkinnedMesh){bt.setOptional(D,I,"bindMatrix"),bt.setOptional(D,I,"bindMatrixInverse");const jt=I.skeleton;jt&&(we.floatVertexTextures?(jt.boneTexture===null&&jt.computeBoneTexture(),bt.setValue(D,"boneTexture",jt.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(bt.setOptional(D,I,"batchingTexture"),bt.setValue(D,"batchingTexture",I._matricesTexture,M));const jr=F.morphAttributes;if((jr.position!==void 0||jr.normal!==void 0||jr.color!==void 0&&we.isWebGL2===!0)&&ze.update(I,F,kn),(Fi||ke.receiveShadow!==I.receiveShadow)&&(ke.receiveShadow=I.receiveShadow,bt.setValue(D,"receiveShadow",I.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Bn.envMap.value=be,Bn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),Fi&&(bt.setValue(D,"toneMappingExposure",x.toneMappingExposure),ke.needsLights&&Hl(Bn,Yr),ce&&k.fog===!0&&oe.refreshFogUniforms(Bn,ce),oe.refreshMaterialUniforms(Bn,k,$,G,_e),Pr.upload(D,ra(ke),Bn,M)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Pr.upload(D,ra(ke),Bn,M),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&bt.setValue(D,"center",I.center),bt.setValue(D,"modelViewMatrix",I.modelViewMatrix),bt.setValue(D,"normalMatrix",I.normalMatrix),bt.setValue(D,"modelMatrix",I.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const jt=k.uniformsGroups;for(let Kr=0,Vl=jt.length;Kr<Vl;Kr++)if(we.isWebGL2){const oa=jt[Kr];Xe.update(oa,kn),Xe.bind(oa,kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return kn}function Hl(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function Gl(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(v,L,F){Ie.get(v.texture).__webglTexture=L,Ie.get(v.depthTexture).__webglTexture=F;const k=Ie.get(v);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=F===void 0,k.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,L){const F=Ie.get(v);F.__webglFramebuffer=L,F.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,F=0){A=v,C=L,w=F;let k=!0,I=null,ce=!1,me=!1;if(v){const be=Ie.get(v);be.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(D.FRAMEBUFFER,null),k=!1):be.__webglFramebuffer===void 0?M.setupRenderTarget(v):be.__hasExternalTextures&&M.rebindTextures(v,Ie.get(v.texture).__webglTexture,Ie.get(v.depthTexture).__webglTexture);const Fe=v.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(me=!0);const Re=Ie.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[L])?I=Re[L][F]:I=Re[L],ce=!0):we.isWebGL2&&v.samples>0&&M.useMultisampledRTT(v)===!1?I=Ie.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?I=Re[F]:I=Re,T.copy(v.viewport),B.copy(v.scissor),Y=v.scissorTest}else T.copy(K).multiplyScalar($).floor(),B.copy(Q).multiplyScalar($).floor(),Y=de;if(fe.bindFramebuffer(D.FRAMEBUFFER,I)&&we.drawBuffers&&k&&fe.drawBuffers(v,I),fe.viewport(T),fe.scissor(B),fe.setScissorTest(Y),ce){const be=Ie.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,be.__webglTexture,F)}else if(me){const be=Ie.get(v.texture),Fe=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,be.__webglTexture,F||0,Fe)}H=-1},this.readRenderTargetPixels=function(v,L,F,k,I,ce,me){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ie.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){fe.bindFramebuffer(D.FRAMEBUFFER,Se);try{const be=v.texture,Fe=be.format,Re=be.type;if(Fe!==on&&he.convert(Fe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pe=Re===Yi&&(ye.has("EXT_color_buffer_half_float")||we.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Re!==On&&he.convert(Re)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Re===In&&(we.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Pe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-k&&F>=0&&F<=v.height-I&&D.readPixels(L,F,k,I,he.convert(Fe),he.convert(Re),ce)}finally{const be=A!==null?Ie.get(A).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(v,L,F=0){const k=Math.pow(2,-F),I=Math.floor(L.image.width*k),ce=Math.floor(L.image.height*k);M.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,v.x,v.y,I,ce),fe.unbindTexture()},this.copyTextureToTexture=function(v,L,F,k=0){const I=L.image.width,ce=L.image.height,me=he.convert(F.format),Se=he.convert(F.type);M.setTexture2D(F,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,k,v.x,v.y,I,ce,me,Se,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,k,v.x,v.y,L.mipmaps[0].width,L.mipmaps[0].height,me,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,k,v.x,v.y,me,Se,L.image),k===0&&F.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(v,L,F,k,I=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=v.max.x-v.min.x+1,me=v.max.y-v.min.y+1,Se=v.max.z-v.min.z+1,be=he.convert(k.format),Fe=he.convert(k.type);let Re;if(k.isData3DTexture)M.setTexture3D(k,0),Re=D.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)M.setTexture2DArray(k,0),Re=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const Pe=D.getParameter(D.UNPACK_ROW_LENGTH),ot=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Wt=D.getParameter(D.UNPACK_SKIP_PIXELS),_t=D.getParameter(D.UNPACK_SKIP_ROWS),_n=D.getParameter(D.UNPACK_SKIP_IMAGES),it=F.isCompressedTexture?F.mipmaps[I]:F.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,it.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,it.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,v.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,v.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,v.min.z),F.isDataTexture||F.isData3DTexture?D.texSubImage3D(Re,I,L.x,L.y,L.z,ce,me,Se,be,Fe,it.data):F.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Re,I,L.x,L.y,L.z,ce,me,Se,be,it.data)):D.texSubImage3D(Re,I,L.x,L.y,L.z,ce,me,Se,be,Fe,it),D.pixelStorei(D.UNPACK_ROW_LENGTH,Pe),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Wt),D.pixelStorei(D.UNPACK_SKIP_ROWS,_t),D.pixelStorei(D.UNPACK_SKIP_IMAGES,_n),I===0&&k.generateMipmaps&&D.generateMipmap(Re),fe.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?M.setTextureCube(v,0):v.isData3DTexture?M.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?M.setTexture2DArray(v,0):M.setTexture2D(v,0),fe.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,fe.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ks?"display-p3":"srgb",t.unpackColorSpace=je.workingColorSpace===Vr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Et?Jn:rl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Jn?Et:An}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Sm extends wl{}Sm.prototype.isWebGL1Renderer=!0;class Mm extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Js extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Io=new U,No=new U,Fo=new St,Ps=new dl,wr=new Wr;class Rl extends Vt{constructor(e=new cn,t=new Js){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Io.fromBufferAttribute(t,r-1),No.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Io.distanceTo(No);e.setAttribute("lineDistance",new ln(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(r),wr.radius+=s,e.ray.intersectsSphere(wr)===!1)return;Fo.copy(r).invert(),Ps.copy(e.ray).applyMatrix4(Fo);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new U,d=new U,h=new U,u=new U,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,o.start),E=Math.min(g.count,o.start+o.count);for(let x=f,b=E-1;x<b;x+=p){const C=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(m,C),d.fromBufferAttribute(m,w),Ps.distanceSqToSegment(c,d,u,h)>l)continue;u.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(u);H<e.near||H>e.far||t.push({distance:H,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),E=Math.min(m.count,o.start+o.count);for(let x=f,b=E-1;x<b;x+=p){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),Ps.distanceSqToSegment(c,d,u,h)>l)continue;u.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(u);w<e.near||w>e.far||t.push({distance:w,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}class Ls extends Bt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Oo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Em{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,s===!1&&r.onStart!==void 0&&r.onStart(d,o,a),s=!0},this.itemEnd=function(d){o++,r.onProgress!==void 0&&r.onProgress(d,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return g}return null}}}const Tm=new Em;class Qs{constructor(e){this.manager=e!==void 0?e:Tm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Qs.DEFAULT_MATERIAL_NAME="__DEFAULT";class bm extends Qs{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Oo.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=ji("img");function l(){d(),Oo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){d(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Ni extends Qs{constructor(e){super(e)}load(e,t,n,r){const s=new Bt,o=new bm(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ys}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ys);const Am=""+new URL("Overworld-D95CtR7o.png",import.meta.url).href,wm=""+new URL("hoverselect-03w42iXs.png",import.meta.url).href,Rm="modulepreload",Cm=function(i,e){return new URL(i,e).href},ko={},Pm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let c=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=c(t.map(d=>{if(d=Cm(d,n),d in ko)return;ko[d]=!0;const h=d.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(!!n)for(let _=o.length-1;_>=0;_--){const m=o[_];if(m.href===d&&(!h||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${u}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":Rm,h||(g.as="script"),g.crossOrigin="",g.href=d,l&&g.setAttribute("nonce",l),document.head.appendChild(g),h)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Hr=class Hr{static async loadGlobe(e,t){if(console.log("Loading globe:",t),console.log("Globe enemies:",t.enemies),Ve.enemyUnits=[],t.enemies.forEach((n,r)=>{if(!n){console.error(`Enemy unit at index ${r} is null or undefined`);return}console.log("Processing enemy unit:",n),n.team!=="enemy"&&(n.team="enemy"),Ve.addUnitToEnemies(n)}),this.placePlayerUnits(e),this.placeEnemyUnits(e),t.battleCondition.effect(Ve.playerParty,Ve.enemyUnits),ne&&!ne.isGameStarted()){console.log("🎮 Starting turn manager automatically after globe load"),ne.startGame();const{updateTurnDisplay:n}=await Pm(async()=>{const{updateTurnDisplay:r}=await Promise.resolve().then(()=>Eg);return{updateTurnDisplay:r}},void 0,import.meta.url);n(ne),setTimeout(()=>{console.log("🎯 Initializing unit selection indicators after delay"),e.updateUnitSelectionIndicators()},200)}}static placePlayerUnits(e){const t=Ve.playerParty;console.log("Placing player units:",t),t.forEach((n,r)=>{if(r<this.PLAYER_SPAWN_POINTS.length){const s=this.PLAYER_SPAWN_POINTS[r];e.placeUnit(n,s.x,s.y)}})}static placeEnemyUnits(e){const t=Ve.enemyUnits;console.log("Placing enemy units:",t),t.forEach((n,r)=>{if(r<this.ENEMY_SPAWN_POINTS.length){const s=this.ENEMY_SPAWN_POINTS[r];e.placeUnit(n,s.x,s.y)}})}};Hr.PLAYER_SPAWN_POINTS=[{x:3,y:6},{x:4,y:6},{x:3,y:7},{x:4,y:7},{x:5,y:7}],Hr.ENEMY_SPAWN_POINTS=[{x:4,y:1},{x:3,y:1},{x:4,y:0},{x:3,y:0},{x:2,y:0}];let $s=Hr;class Lm{constructor(e=8,t=8){this.occupiedTiles=new Map,this.mapWidth=e,this.mapHeight=t}updateOccupiedTiles(e){this.occupiedTiles.clear();for(const[t,n]of e){const r=`${n.x},${n.y}`;this.occupiedTiles.set(r,t)}}calculateValidMovement(e,t){const n=[],r=new Map,s=e.move||3;console.log(`🗺️ Calculating movement for ${e.name} with move range ${s} from (${t.x}, ${t.y})`),console.log("🔍 Unit properties:",{name:e.name,range:e.range,move:e.move,className:e.className});const o=[],a=new Set;for(o.push({pos:t,distance:0,path:[t]}),a.add(`${t.x},${t.y}`);o.length>0;){const{pos:c,distance:d,path:h}=o.shift();if(d>0&&d<=s){const u=`${c.x},${c.y}`;this.occupiedTiles.has(u)?console.log(`❌ Occupied tile at distance ${d}: (${c.x}, ${c.y}) - occupied by ${this.occupiedTiles.get(u)?.name}`):(n.push({x:c.x,y:c.y}),r.set(u,[...h]),console.log(`✅ Valid tile at distance ${d}: (${c.x}, ${c.y})`))}if(d<s){const u=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0}];for(const p of u){const g={x:c.x+p.x,y:c.y+p.y},_=`${g.x},${g.y}`;g.x>=0&&g.x<this.mapWidth&&g.y>=0&&g.y<this.mapHeight&&!a.has(_)&&(a.add(_),o.push({pos:g,distance:d+1,path:[...h,g]}),console.log(`🔍 Exploring: (${g.x}, ${g.y}) at distance ${d+1}`))}}}console.log(`🎯 Found ${n.length} valid movement tiles with range ${s}`),console.log("📋 Valid tiles by distance:");const l={};for(const c of n){const d=Math.abs(c.x-t.x)+Math.abs(c.y-t.y);l[d]||(l[d]=[]),l[d].push(c)}for(let c=1;c<=s;c++){const d=l[c]||[];console.log(`  Distance ${c}: ${d.length} tiles`,d)}return{validTiles:n,paths:r}}calculateStepPath(e,t){const n=[e],r={x:e.x,y:e.y};for(;r.x!==t.x;)r.x<t.x?r.x++:r.x--,n.push({x:r.x,y:r.y});for(;r.y!==t.y;)r.y<t.y?r.y++:r.y--,n.push({x:r.x,y:r.y});return console.log(`🛤️ Step path from (${e.x},${e.y}) to (${t.x},${t.y}):`,n),n}isValidMovementTile(e,t,n){const r=e.move||3,s=Math.abs(n.x-t.x)+Math.abs(n.y-t.y),o=`${n.x},${n.y}`;return s<=r&&!this.occupiedTiles.has(o)&&n.x>=0&&n.x<this.mapWidth&&n.y>=0&&n.y<this.mapHeight}setMapDimensions(e,t){this.mapWidth=e,this.mapHeight=t,console.log(`🗺️ NavigationManager map dimensions set to ${e}x${t}`)}}const $i=new Lm;let qt=32,Ot=32;function Um(i,e){qt=i,Ot=e}class Dm{constructor(){this.unitPositions=new Map,this.unitMeshes=new Map,this.unitBorders=new Map,this.unitHealthBars=new Map,this.unitEnergyBars=new Map,this.textureLoader=new Ni}async placeUnit(e,t,n){console.log(`Placing unit ${e.name} at (${t}, ${n})`),this.unitPositions.set(e,{x:t,y:n}),Ve.playerParty.includes(e)?e.team="player":Ve.enemyUnits.includes(e)&&(e.team="enemy"),ie&&Xi?this.textureLoader.load(e.imageUrl,r=>{if(!ie)return;r.magFilter=qe,r.minFilter=qe,r.flipY=!0,r.generateMipmaps=!1,r.wrapS=ft,r.wrapT=ft;const s=r.image.width,o=r.image.height;console.log(`Unit ${e.name} image size: ${s}x${o}`);const l=qt/s,c=s*l,d=o*l;console.log(`Scaling unit to ${c}x${d} (scale factor: ${l})`);const h=new dt(c,d),u=new at({map:r,transparent:!0,alphaTest:.1,depthTest:!0,depthWrite:!1}),p=new tt(h,u);p.position.set(t*qt+qt/2,-n*Ot-Ot/2,1),ie&&(ie.add(p),this.unitMeshes.set(e,p),console.log(`Added unit mesh to scene at (${p.position.x}, ${p.position.y}) scaled to ${c}x${d}`),this.createUnitBorder(e,c,d,p.position.x,p.position.y),this.createUnitBars(e,p.position.x,p.position.y))}):console.error("Three.js scene or camera not initialized")}getUnitPosition(e){return this.unitPositions.get(e)}removeUnit(e){const t=this.unitMeshes.get(e);t&&ie&&(ie.remove(t),this.unitMeshes.delete(e));const n=this.unitBorders.get(e);n&&ie&&(ie.remove(n),this.unitBorders.delete(e));const r=this.unitHealthBars.get(e);if(r&&ie){const o=r.backgroundMesh;o&&ie.remove(o),ie.remove(r),this.unitHealthBars.delete(e)}const s=this.unitEnergyBars.get(e);if(s&&ie){const o=s.backgroundMesh;o&&ie.remove(o),ie.remove(s),this.unitEnergyBars.delete(e)}this.unitPositions.delete(e),console.log(`Removed unit ${e.name} from scene`)}getUnitAtPosition(e,t){for(const[n,r]of this.unitPositions)if(r.x===e&&r.y===t)return n;return null}getAllUnits(){return Array.from(this.unitPositions.keys())}moveUnitToPosition(e,t){this.unitPositions.set(e,t);const n=this.unitMeshes.get(e);n&&(n.position.set(t.x*qt+qt/2,-t.y*Ot-Ot/2,1),this.updateUnitBorder(e,n.position.x,n.position.y),this.updateUnitBarsPosition(e,n.position.x,n.position.y)),console.log(`Moved unit ${e.name} to (${t.x}, ${t.y})`)}createUnitBorder(e,t,n,r,s){if(!ie)return;const o=e.team==="player"?16711680:255,a=2,l=qt,c=Ot,d=[new U(-l/2,c/2,0),new U(l/2,c/2,0),new U(l/2,-c/2,0),new U(-l/2,-c/2,0),new U(-l/2,c/2,0)],h=new cn().setFromPoints(d),u=new Js({color:o,linewidth:a,transparent:!0,opacity:.8}),p=new Rl(h,u);p.position.set(r,s,.9),ie.add(p),this.unitBorders.set(e,p),console.log(`✅ Added ${e.team} team border for ${e.name} (size: ${l}x${c}, color: ${o.toString(16)})`)}updateUnitBorder(e,t,n){const r=this.unitBorders.get(e);r&&r.position.set(t,n,.9)}updateUnitBarsPosition(e,t,n){const o=this.unitHealthBars.get(e),a=o?o.backgroundMesh:null;if(o&&a){const d=n-Ot/2+4+2;a.position.set(t,d,1.1),o.position.set(o.position.x-(o.position.x-t),d,1.2)}const l=this.unitEnergyBars.get(e),c=l?l.backgroundMesh:null;if(l&&c){const d=n-Ot/2+4+2-6;c.position.set(t,d,1.1),l.position.set(l.position.x-(l.position.x-t),d,1.2)}console.log(`🔄 Updated unit bars position for ${e.name} at (${t}, ${n})`)}createUnitBars(e,t,n){if(!ie)return;const r=qt*.8,s=4,o=6,a=e.currentHealth/e.health,l=r*a,c=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,d=r*c,h=new dt(r,s),u=new at({color:3355443,transparent:!0,opacity:.8}),p=new tt(h,u),g=new dt(l,s),_=new at({color:65280,transparent:!0,opacity:.9}),m=new tt(g,_),f=new dt(r,s),E=new at({color:3355443,transparent:!0,opacity:.8}),x=new tt(f,E),b=new dt(d,s),C=new at({color:33023,transparent:!0,opacity:.9}),w=new tt(b,C),A=n-Ot/2+s+2,H=A-o;p.position.set(t,A,1.1),m.position.set(t-(r-l)/2,A,1.2),x.position.set(t,H,1.1),w.position.set(t-(r-d)/2,H,1.2),ie.add(p),ie.add(m),ie.add(x),ie.add(w),this.unitHealthBars.set(e,m),this.unitEnergyBars.set(e,w),m.backgroundMesh=p,w.backgroundMesh=x,console.log(`💚💙 Created health/energy bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(a*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(c*100)}%)`)}updateUnitBars(e){if(!ie)return;console.log(`🎨 updateUnitBars called for ${e.name} - Current energy: ${e.currentEnergy}/${e.maxEnergy}`);const t=qt*.8,n=e.currentHealth/e.health,r=e.maxEnergy>0?e.currentEnergy/e.maxEnergy:0,s=this.unitHealthBars.get(e);if(s){console.log(`💚 Updating health bar for ${e.name}: ${n*100}% (${e.currentHealth}/${e.health})`);const a=Math.max(.1,t*n),l=new dt(a,4);s.geometry.dispose(),s.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*qt+qt/2,u=-c.y*Ot-Ot/2-Ot/2+4+2,p=d-(t-a)/2;s.position.set(p,u,1.2)}s.visible=n>0}else console.warn(`❌ No health bar found for ${e.name}`);const o=this.unitEnergyBars.get(e);if(o){console.log(`💙 Updating energy bar for ${e.name}: ${r*100}% (${e.currentEnergy}/${e.maxEnergy})`);const a=Math.max(.1,t*r),l=new dt(a,4);o.geometry.dispose(),o.geometry=l;const c=this.unitPositions.get(e);if(c){const d=c.x*qt+qt/2,p=-c.y*Ot-Ot/2-Ot/2+4+2-6,g=d-(t-a)/2;o.position.set(g,p,1.2)}o.visible=r>0}else console.warn(`❌ No energy bar found for ${e.name}`);console.log(`🔄 Updated bars for ${e.name} - Health: ${e.currentHealth}/${e.health} (${Math.round(n*100)}%), Energy: ${e.currentEnergy}/${e.maxEnergy} (${Math.round(r*100)}%)`)}getUnitMesh(e){return this.unitMeshes.get(e)}getUnitPositions(){return this.unitPositions}getUnitBorder(e){return this.unitBorders.get(e)}setUnitBorder(e,t){this.unitBorders.set(e,t)}getUnitHealthBar(e){return this.unitHealthBars.get(e)}setUnitHealthBar(e,t){this.unitHealthBars.set(e,t)}getUnitEnergyBar(e){return this.unitEnergyBars.get(e)}setUnitEnergyBar(e,t){this.unitEnergyBars.set(e,t)}}let Lr=32,Vi=32;function Im(i,e){Lr=i,Vi=e}class Nm{constructor(){this.selectionIndicators=new Map,this.textureLoader=new Ni,this.selectTexture=null,this.selectedUnit=null,this.loadSelectTexture()}async loadSelectTexture(){try{const e="../assets/Images/select.png";console.log("🎨 Loading select texture from:",e),this.selectTexture=await this.textureLoader.loadAsync(e),this.selectTexture.magFilter=qe,this.selectTexture.minFilter=qe,this.selectTexture.flipY=!0,this.selectTexture.generateMipmaps=!1,this.selectTexture.wrapS=ft,this.selectTexture.wrapT=ft,console.log("✅ Select texture loaded successfully")}catch(e){console.error("❌ Failed to load select texture:",e),console.log("🔄 Will use fallback colored indicator")}}updateUnitSelectionIndicators(e){if(console.log("🔍 updateUnitSelectionIndicators called"),!ne){console.warn("❌ Turn manager not available");return}if(!ne.isGameStarted()){console.warn("❌ Game not started yet");return}if(console.log("✅ Turn manager available and game started"),console.log(`Current phase: ${ne.getCurrentPhase()}`),console.log(`Can select: ${ne.canSelect()}`),console.log(`Current player: ${ne.getCurrentPlayer()}`),this.clearAllSelectionIndicators(),!ne.canSelect()){console.log("❌ Not in SELECT phase, hiding all indicators");return}console.log("✅ In SELECT phase, proceeding with indicator creation");const t=ne.getSelectableUnits();if(console.log(` Found ${t.length} selectable units for current player`),t.length===0){console.warn("❌ No selectable units found");return}let n=0;t.forEach(r=>{const s=this.createSelectionIndicator(r,e);s?(this.selectionIndicators.set(r,s),n++,console.log(`✅ Created indicator for ${r.name}`)):console.warn(`❌ Failed to create indicator for ${r.name}`)}),console.log(`🎯 Successfully added ${n}/${t.length} selection indicators`)}createSelectionIndicator(e,t){if(console.log(`🔨 Creating selection indicator for ${e.name}`),!ie)return console.warn(`❌ Scene not available for ${e.name}`),null;const n=t(e);if(!n)return console.warn(`❌ No position found for unit ${e.name}`),null;console.log(`📍 Unit ${e.name} position: (${n.x}, ${n.y})`);const r=new dt(Lr*.4,Vi*.4);let s;this.selectTexture?(console.log("🎨 Using select texture"),s=new at({map:this.selectTexture,transparent:!0,opacity:.7,alphaTest:.1,depthTest:!0,depthWrite:!1,side:yt})):(console.log("🎨 Using fallback colored indicator (yellow)"),s=new at({color:16776960,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:yt}));const o=new tt(r,s),a=n.x*Lr+Lr/2,l=-n.y*Vi-Vi/2-Vi*.2;return o.position.set(a,l,1.5),ie.add(o),console.log(`✅ Added selection indicator for ${e.name} to scene`),o}selectUnit(e){return ne?ne.canSelect()?ne.canSelectUnit(e.id)?(ne.markUnitAsUsed(e.id),this.selectedUnit=e,console.log(`Selected unit: ${e.name}`),this.clearAllSelectionIndicators(),ne.advancePhase(),!0):(console.warn(`Unit ${e.name} cannot be selected - already used this round`),!1):(console.warn("Cannot select units - not in SELECT phase"),!1):(console.warn("Turn manager not available"),!1)}clearAllSelectionIndicators(){for(const[e,t]of this.selectionIndicators)ie&&ie.remove(t);this.selectionIndicators.clear(),console.log("🧹 Cleared all selection indicators")}getSelectedUnit(){return this.selectedUnit}setSelectedUnit(e){this.selectedUnit=e}cleanup(){this.clearAllSelectionIndicators(),this.selectedUnit=null}}let vi=32,Si=32;function Fm(i,e){vi=i,Si=e}class Om{constructor(){this.movementIndicators=new Map,this.pathLines=[],this.textureLoader=new Ni,this.hoverSelectTexture=null,this.selectedMoveTarget=null,this.movementData=null,this.loadHoverSelectTexture()}async loadHoverSelectTexture(){try{const e="../assets/Images/hoverselect.png";console.log("🎨 Loading hover select texture from:",e),this.hoverSelectTexture=await this.textureLoader.loadAsync(e),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe,this.hoverSelectTexture.flipY=!0,this.hoverSelectTexture.generateMipmaps=!1,this.hoverSelectTexture.wrapS=ft,this.hoverSelectTexture.wrapT=ft,console.log("✅ Hover select texture loaded successfully")}catch(e){console.error("❌ Failed to load hover select texture:",e),console.log("🔄 Will use fallback colored indicator")}}enterMovePhase(e,t,n){console.log(`🚶 Entering move phase for unit: ${e.name}`),this.selectedMoveTarget=null,console.log(`📊 Updating occupied tiles with ${n().size} units`),$i.updateOccupiedTiles(n());const r=t(e);if(!r){console.error(`❌ No position found for unit ${e.name}`);return}console.log(`📍 Unit ${e.name} current position: (${r.x}, ${r.y})`),console.log(`🏃 Unit range: ${e.range||3}`),this.movementData=$i.calculateValidMovement(e,r),console.log("🎯 Movement data:",this.movementData),this.createMovementIndicators(),console.log("✅ Move phase setup complete")}exitMovePhase(){console.log("🚫 Exiting move phase"),this.selectedMoveTarget=null,this.movementData=null,this.clearMovementIndicators(),this.clearPathLines()}createMovementIndicators(){if(!this.movementData){console.warn("❌ No movement data available");return}if(!ie){console.warn("❌ Scene not available");return}console.log(`🔷 Creating ${this.movementData.validTiles.length} movement indicators`);let e=0;for(const t of this.movementData.validTiles){const n=this.createMovementIndicator(t);if(n){const r=`${t.x},${t.y}`;this.movementIndicators.set(r,n),e++}}console.log(`🎯 Successfully created ${e}/${this.movementData.validTiles.length} movement indicators`)}createMovementIndicator(e){if(!ie)return null;const t=new dt(vi,Si);let n;this.hoverSelectTexture?n=new at({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:33023,alphaTest:.1,depthTest:!0,depthWrite:!1,side:yt}):n=new at({color:33023,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:yt});const r=new tt(t,n),s=e.x*vi+vi/2,o=-e.y*Si-Si/2;return r.position.set(s,o,1.2),ie.add(r),r}clearMovementIndicators(){for(const[e,t]of this.movementIndicators)ie&&ie.remove(t);this.movementIndicators.clear(),console.log("🧹 Cleared movement indicators")}selectMoveTarget(e,t){if(!this.movementData)return console.warn("❌ No movement data available"),!1;const n=`${e},${t}`;return this.movementIndicators.has(n)?(console.log(`🎯 Selected move target: (${e}, ${t})`),this.selectedMoveTarget={x:e,y:t},!0):(console.warn(`❌ Tile (${e}, ${t}) is not a valid movement target`),!1)}drawPathToTarget(e,t){if(!t||!this.selectedMoveTarget||!ie)return;const n=e(t);if(!n)return;this.clearPathLines();const r=$i.calculateStepPath(n,this.selectedMoveTarget),s=[];for(const c of r){const d=c.x*vi+vi/2,h=-c.y*Si-Si/2,u=2;s.push(new U(d,h,u))}const o=new cn().setFromPoints(s),a=new Js({color:16729156,linewidth:3}),l=new Rl(o,a);ie.add(l),this.pathLines.push(l),console.log(`🛤️ Drew path with ${r.length} steps`)}clearPathLines(){for(const e of this.pathLines)ie&&ie.remove(e);this.pathLines=[]}getSelectedMoveTarget(){return this.selectedMoveTarget}cancelMove(){console.log("❌ Cancelling move selection"),this.selectedMoveTarget=null,this.clearPathLines()}cleanup(){this.clearMovementIndicators(),this.clearPathLines(),this.selectedMoveTarget=null,this.movementData=null}}let un=32,hn=32;function km(i,e){un=i,hn=e}class Bm{constructor(){this.attackIndicators=new Map,this.skillTargetIndicators=new Map,this.skillPreviewIndicators=new Map,this.textureLoader=new Ni,this.hoverSelectTexture=null,this.attackData=null,this.selectedAttackTarget=null,this.currentAttackMode="basic",this.currentSkill=null,this.skillTargets=[],this.selectedSkillTarget=null,this.currentRotation=0,this.loadHoverSelectTexture()}async loadHoverSelectTexture(){try{const e="../assets/Images/hoverselect.png";console.log("🎨 Loading hover select texture from:",e),this.hoverSelectTexture=await this.textureLoader.loadAsync(e),this.hoverSelectTexture.magFilter=qe,this.hoverSelectTexture.minFilter=qe,this.hoverSelectTexture.flipY=!0,this.hoverSelectTexture.generateMipmaps=!1,this.hoverSelectTexture.wrapS=ft,this.hoverSelectTexture.wrapT=ft,console.log("✅ Hover select texture loaded successfully")}catch(e){console.error("❌ Failed to load hover select texture:",e),console.log("🔄 Will use fallback colored indicator")}}enterActionPhase(e,t,n){console.log(`⚔️ Entering action phase for unit: ${e.name}`),this.selectedAttackTarget=null,this.currentAttackMode="basic",this.currentSkill=null,console.log("📊 Updating occupied tiles for attack targeting"),$i.updateOccupiedTiles(n()),console.log("✅ Action phase setup complete - waiting for attack mode selection")}setAttackMode(e,t){console.log(`🎯 Setting attack mode to: ${e}${t?` with skill: ${t.name}`:""}`),this.currentAttackMode=e,this.currentSkill=t||null,this.clearAttackIndicators()}setAttackData(e){this.attackData=e}setSkillTargeting(e,t){console.log(`🎯 Setting skill targeting for ${e.name} with ${t.length} targets`),this.currentSkill=e,this.skillTargets=t,this.selectedSkillTarget=null,this.clearSkillIndicators()}createSkillTargetIndicators(){if(!this.skillTargets.length){console.warn("❌ No skill targets available");return}if(!ie){console.warn("❌ Scene not available");return}console.log(`🔮 Creating ${this.skillTargets.length} skill target indicators`);let e=0;for(const t of this.skillTargets){const n=this.createSkillTargetIndicator(t);if(n){const r=`${t.x},${t.y}`;this.skillTargetIndicators.set(r,n),e++}}console.log(`🎯 Successfully created ${e}/${this.skillTargets.length} skill target indicators`)}createSkillTargetIndicator(e){if(!ie)return null;const t=new dt(un,hn);let n;this.hoverSelectTexture?n=new at({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:9323693,alphaTest:.1,depthTest:!0,depthWrite:!1,side:yt}):n=new at({color:9323693,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:yt});const r=new tt(t,n),s=e.x*un+un/2,o=-e.y*hn-hn/2;return r.position.set(s,o,1.2),ie.add(r),r}clearSkillIndicators(){for(const[e,t]of this.skillTargetIndicators)ie&&ie.remove(t);this.skillTargetIndicators.clear();for(const[e,t]of this.skillPreviewIndicators)ie&&ie.remove(t);this.skillPreviewIndicators.clear(),console.log("🧹 Cleared skill indicators")}exitActionPhase(){console.log("🚫 Exiting action phase"),this.selectedAttackTarget=null,this.attackData=null,this.selectedSkillTarget=null,this.skillTargets=[],this.currentSkill=null,this.clearAttackIndicators(),this.clearSkillIndicators()}calculateValidAttackTargets(e,t){const n=[],r=new Map,s=e.range||1;console.log(`⚔️ Calculating attack targets for ${e.name} with attack range ${s}`);for(let o=-s;o<=s;o++)for(let a=-s;a<=s;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=s){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&(n.push({x:c,y:d}),r.set(`${c},${d}`,[t,{x:c,y:d}]))}}return console.log(`🎯 Found ${n.length} valid attack tiles`),{validTiles:n,paths:r}}createAttackIndicators(){if(!this.attackData){console.warn("❌ No attack data available");return}if(!ie){console.warn("❌ Scene not available");return}console.log(`🔴 Creating ${this.attackData.validTiles.length} attack indicators`);let e=0;for(const t of this.attackData.validTiles){const n=this.createAttackIndicator(t);if(n){const r=`${t.x},${t.y}`;this.attackIndicators.set(r,n),e++}}console.log(`🎯 Successfully created ${e}/${this.attackData.validTiles.length} attack indicators`)}createAttackIndicator(e){if(!ie)return null;const t=new dt(un,hn);let n;this.hoverSelectTexture?n=new at({map:this.hoverSelectTexture,transparent:!0,opacity:.7,color:16729156,alphaTest:.1,depthTest:!0,depthWrite:!1,side:yt}):n=new at({color:16729156,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:yt});const r=new tt(t,n),s=e.x*un+un/2,o=-e.y*hn-hn/2;return r.position.set(s,o,1.2),ie.add(r),r}clearAttackIndicators(){for(const[e,t]of this.attackIndicators)ie&&ie.remove(t);this.attackIndicators.clear(),console.log("🧹 Cleared attack indicators")}selectAttackTarget(e,t,n,r){if(console.log(`🎯 selectAttackTarget called with position (${e}, ${t})`),this.currentAttackMode==="skill")if(this.currentSkill?.targetingType==="adjacent-attack"){const a=`${e},${t}`;if(!this.attackIndicators.has(a))return console.warn(`❌ Tile (${e}, ${t}) is not a valid attack target for adjacent-attack skill`),{success:!1,targetUnit:null};const l=n(e,t);return l?l.team===r.team?(console.warn(`❌ Cannot attack unit on same team: ${l.name}`),{success:!1,targetUnit:null}):(console.log(`⚔️ Selected adjacent-attack target: ${l.name} at (${e}, ${t})`),this.selectedAttackTarget=l,{success:!0,targetUnit:l}):(console.warn(`❌ No unit at position (${e}, ${t})`),{success:!1,targetUnit:null})}else return this.selectSkillTarget(e,t,r);const s=`${e},${t}`;if(!this.attackIndicators.has(s))return console.warn(`❌ Tile (${e}, ${t}) is not a valid attack target`),{success:!1,targetUnit:null};const o=n(e,t);return o?o.team===r.team?(console.warn(`❌ Cannot attack unit on same team: ${o.name}`),{success:!1,targetUnit:null}):(console.log(`🎯 Selected attack target: ${o.name} at (${e}, ${t})`),this.selectedAttackTarget=o,{success:!0,targetUnit:o}):(console.warn(`❌ No unit at position (${e}, ${t})`),{success:!1,targetUnit:null})}selectSkillTarget(e,t,n){if(console.log(`✨ selectSkillTarget called with position (${e}, ${t})`),!this.currentSkill)return console.warn("❌ No skill selected"),{success:!1,targetUnit:null};const r=`${e},${t}`;return this.skillTargetIndicators.has(r)?(console.log(`✨ Selected skill target position: (${e}, ${t}) for ${this.currentSkill.name}`),this.selectedSkillTarget={x:e,y:t},this.showSkillPreview(e,t),{success:!0,targetUnit:null}):(console.warn(`❌ Tile (${e}, ${t}) is not a valid skill target`),{success:!1,targetUnit:null})}showSkillPreview(e,t){if(!this.currentSkill)return;this.clearSkillPreview();const n=this.currentSkill.getTargetPattern(e,t,void 0,this.currentSkill.targetingType==="dual-rotational"?this.currentRotation:void 0);console.log(`🔮 Showing skill preview for ${this.currentSkill.name} at (${e}, ${t})`),console.log("🎯 Affected positions:",n);for(const r of n){const s=this.createSkillPreviewIndicator(r);if(s){const o=`${r.x},${r.y}`;this.skillPreviewIndicators.set(o,s)}}}createSkillPreviewIndicator(e){if(!ie)return null;const t=new dt(un,hn),n=new at({color:16739125,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1,side:yt}),r=new tt(t,n),s=e.x*un+un/2,o=-e.y*hn-hn/2;return r.position.set(s,o,1.3),ie.add(r),r}clearSkillPreview(){for(const[e,t]of this.skillPreviewIndicators)ie&&ie.remove(t);this.skillPreviewIndicators.clear()}getSelectedAttackTarget(){return this.selectedAttackTarget}getCurrentAttackMode(){return this.currentAttackMode}getCurrentSkill(){return this.currentSkill}getSelectedSkillTarget(){return this.selectedSkillTarget}setSkillTarget(e,t){console.log(`✨ Setting skill target for ${e.name} at (${t.x}, ${t.y})`),this.currentSkill=e,this.selectedSkillTarget=t,this.currentAttackMode="skill"}confirmAttack(e){if(!e||!this.selectedAttackTarget)return console.warn("❌ No unit or target selected for attack"),null;console.log(`⚔️ Confirming attack: ${e.name} attacks ${this.selectedAttackTarget.name}`);const t=e.basicDamage||5;if(this.selectedAttackTarget.currentHealth=Math.max(0,this.selectedAttackTarget.currentHealth-t),console.log(`💥 ${this.selectedAttackTarget.name} takes ${t} damage! Health: ${this.selectedAttackTarget.currentHealth}/${this.selectedAttackTarget.health}`),e.energyType.toLowerCase()==="kinetic"){const r=Math.min(5,e.maxEnergy-e.currentEnergy);r>0&&(e.currentEnergy+=r,console.log(`⚡ ${e.name} gained ${r} energy from basic attack (${e.currentEnergy}/${e.maxEnergy})`),console.log(`🔄 About to update grid bars for attacking unit: ${e.name}`))}this.selectedAttackTarget.currentHealth<=0&&(this.selectedAttackTarget.isAlive=!1,console.log(`💀 ${this.selectedAttackTarget.name} has died!`));const n={damage:t,targetUnit:this.selectedAttackTarget};return this.selectedAttackTarget=null,n}cancelAttack(){console.log("❌ Cancelling attack selection"),this.selectedAttackTarget=null}resetRotation(){this.currentRotation=0}confirmSkill(e,t){if(!e||!this.currentSkill)return console.warn("❌ No unit or skill selected for skill execution"),null;if(this.currentSkill.targetingType==="adjacent-attack"){if(!this.selectedAttackTarget)return console.warn("❌ No attack target selected for adjacent-attack skill execution"),null}else if(!this.selectedSkillTarget)return console.warn("❌ No skill target selected for skill execution"),null;if(console.log(`✨ Confirming skill: ${e.name} uses ${this.currentSkill.name}`),console.log(`🔥 DEBUG: Skill emoji is: "${this.currentSkill.emoji}"`),e.currentEnergy<this.currentSkill.energyCost)return console.warn(`❌ Not enough energy for ${this.currentSkill.name}`),null;e.currentEnergy=Math.max(0,e.currentEnergy-this.currentSkill.energyCost),console.log(`⚡ ${e.name} spent ${this.currentSkill.energyCost} energy (${e.currentEnergy}/${e.maxEnergy})`);const n=[];if(this.currentSkill.targetingType==="adjacent-attack"){if(!this.selectedAttackTarget)return console.warn("❌ No attack target selected for adjacent-attack skill"),null;const s=this.selectedAttackTarget,o=e.skillDamage+this.currentSkill.bonusDamage;s.currentHealth=Math.max(0,s.currentHealth-o),console.log(`${this.currentSkill.emoji}💥 ${s.name} takes ${o} skill damage from ${this.currentSkill.name}! Health: ${s.currentHealth}/${s.health}`),s.currentHealth<=0&&(s.isAlive=!1,console.log(`💀 ${s.name} has died from ${this.currentSkill.name}!`)),n.push({unit:s,damage:o}),this.selectedAttackTarget=null}else{if(!this.selectedSkillTarget)return console.warn("❌ No skill target selected for area-effect skill"),null;const s=this.currentSkill.getTargetPattern(this.selectedSkillTarget.x,this.selectedSkillTarget.y,void 0,this.currentSkill.targetingType==="dual-rotational"?this.currentRotation:void 0);for(const o of s){const a=t(o.x,o.y);if(a){if(this.currentSkill.id==="universal-whisper"){if(a.team===e.team){const l=e.skillDamage+this.currentSkill.bonusDamage,c=a.currentHealth;a.currentHealth=Math.min(a.health,a.currentHealth+l);const d=a.currentHealth-c;console.log(`${this.currentSkill.emoji}💚 ${a.name} healed for ${d} health from ${this.currentSkill.name}! Health: ${a.currentHealth}/${a.health}`),n.push({unit:a,damage:-d})}}else if(a.team!==e.team){const l=e.skillDamage+this.currentSkill.bonusDamage;a.currentHealth=Math.max(0,a.currentHealth-l),console.log(`${this.currentSkill.emoji}💥 ${a.name} takes ${l} skill damage from ${this.currentSkill.name}! Health: ${a.currentHealth}/${a.health}`),a.currentHealth<=0&&(a.isAlive=!1,console.log(`💀 ${a.name} has died from ${this.currentSkill.name}!`)),n.push({unit:a,damage:l})}}}}const r={affectedUnits:n};return this.selectedSkillTarget=null,this.currentSkill=null,this.resetRotation(),r}cleanup(){this.clearAttackIndicators(),this.clearSkillIndicators(),this.selectedAttackTarget=null,this.attackData=null,this.selectedSkillTarget=null,this.skillTargets=[],this.currentSkill=null,this.resetRotation()}rotateSkillTargets(){if(!this.currentSkill||this.currentSkill.targetingType!=="dual-rotational"){console.warn("❌ Cannot rotate non-dual-rotational skill");return}this.currentRotation=(this.currentRotation+1)%4,console.log(`🔄 Rotated skill targets: rotation=${this.currentRotation}`),this.selectedSkillTarget&&this.showSkillPreview(this.selectedSkillTarget.x,this.selectedSkillTarget.y)}getCurrentRotation(){return this.currentRotation}}class zm{showSkipButton(e){console.log("⏭️ Creating skip button..."),this.hideMovementButtons();const t=document.createElement("button");t.id="move-skip-button",t.textContent="Skip Move",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#95a5a6",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Skip button added to document body")}showConfirmCancelButtons(e,t){this.hideMovementButtons();const n=document.createElement("button");n.id="move-confirm-button",n.textContent="Confirm",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#27ae60",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const r=document.createElement("button");r.id="move-cancel-button",r.textContent="Cancel",r.style.position="absolute",r.style.top="10px",r.style.right="90px",r.style.padding="8px 16px",r.style.backgroundColor="#e74c3c",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(r)}hideMovementButtons(){const e=document.getElementById("move-skip-button"),t=document.getElementById("move-confirm-button"),n=document.getElementById("move-cancel-button");e&&e.remove(),t&&t.remove(),n&&n.remove()}showActionOptions(e,t,n,r){console.log(`⚔️ Creating action options for ${e.name}...`),this.hideActionButtons();let s=10;const o=document.createElement("button");o.id="action-skip-button",o.textContent="Skip Action",o.style.position="absolute",o.style.top="10px",o.style.right=`${s}px`,o.style.padding="8px 16px",o.style.backgroundColor="#e67e22",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>{console.log("⏭️ Action skip button clicked"),r()},document.body.appendChild(o),s+=120;const a=document.createElement("button");a.id="basic-attack-button",a.textContent="Attack",a.style.position="absolute",a.style.top="10px",a.style.right=`${s}px`,a.style.padding="8px 16px",a.style.backgroundColor="#c0392b",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>{console.log("⚔️ Basic attack button clicked"),t()},document.body.appendChild(a),s+=80,e.skills.forEach((l,c)=>{const d=e.currentEnergy>=l.energyCost,h=document.createElement("button");h.id=`skill-button-${c}`,h.textContent=`${l.emoji} ${l.name}`,h.style.position="absolute",h.style.top="10px",h.style.right=`${s}px`,h.style.padding="8px 16px",h.style.backgroundColor=d?"#8e44ad":"#7f8c8d",h.style.color="white",h.style.border="none",h.style.borderRadius="5px",h.style.cursor=d?"pointer":"not-allowed",h.style.zIndex="1000",h.style.fontFamily="sans-serif",h.style.fontWeight="bold",h.style.opacity=d?"1":"0.5",d&&(h.onclick=()=>{console.log(`✨ Skill button clicked: ${l.name}`),n(l)}),h.title=`${l.name} (${l.energyCost} energy)
${l.description}`,document.body.appendChild(h),s+=h.textContent.length*8+32}),console.log("✅ Action options added to document body")}showActionSkipButton(e){console.log("⏭️ Creating action skip button..."),this.hideActionButtons();const t=document.createElement("button");t.id="action-skip-button",t.textContent="Skip Action",t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.padding="8px 16px",t.style.backgroundColor="#e67e22",t.style.color="white",t.style.border="none",t.style.borderRadius="5px",t.style.cursor="pointer",t.style.zIndex="1000",t.style.fontFamily="sans-serif",t.style.fontWeight="bold",t.onclick=()=>{console.log("⏭️ Action skip button clicked"),e()},document.body.appendChild(t),console.log("✅ Action skip button added to document body")}showAttackConfirmCancelButtons(e,t){console.log("🔴 showAttackConfirmCancelButtons called"),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const n=document.createElement("button");n.id="attack-confirm-button",n.textContent="Attack",n.style.position="absolute",n.style.top="10px",n.style.right="10px",n.style.padding="8px 16px",n.style.backgroundColor="#c0392b",n.style.color="white",n.style.border="none",n.style.borderRadius="5px",n.style.cursor="pointer",n.style.zIndex="1000",n.style.fontFamily="sans-serif",n.style.fontWeight="bold",n.onclick=()=>e();const r=document.createElement("button");r.id="attack-cancel-button",r.textContent="Cancel",r.style.position="absolute",r.style.top="10px",r.style.right="80px",r.style.padding="8px 16px",r.style.backgroundColor="#95a5a6",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t(),document.body.appendChild(n),document.body.appendChild(r),console.log("✅ Added Attack and Cancel buttons to document body")}showSkillConfirmCancelButtons(e,t,n){console.log(`✨ showSkillConfirmCancelButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const r=document.createElement("button");r.id="skill-confirm-button",r.textContent=`Confirm ${e}`,r.style.position="absolute",r.style.top="10px",r.style.right="10px",r.style.padding="8px 16px",r.style.backgroundColor="#8e44ad",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.zIndex="1000",r.style.fontFamily="sans-serif",r.style.fontWeight="bold",r.onclick=()=>t();const s=document.createElement("button");s.id="skill-cancel-button",s.textContent="Cancel",s.style.position="absolute",s.style.top="10px",s.style.right=`${r.textContent.length*8+32+10}px`,s.style.padding="8px 16px",s.style.backgroundColor="#95a5a6",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>n(),document.body.appendChild(r),document.body.appendChild(s),console.log(`✅ Added ${e} Confirm and Cancel buttons to document body`)}showDualRotationalSkillButtons(e,t,n,r){console.log(`🔄 showDualRotationalSkillButtons called for ${e}`),this.hideActionButtons(),console.log("🧹 Cleared existing action buttons");const s=document.createElement("button");s.id="skill-confirm-button",s.textContent=`Confirm ${e}`,s.style.position="absolute",s.style.top="10px",s.style.right="10px",s.style.padding="8px 16px",s.style.backgroundColor="#8e44ad",s.style.color="white",s.style.border="none",s.style.borderRadius="5px",s.style.cursor="pointer",s.style.zIndex="1000",s.style.fontFamily="sans-serif",s.style.fontWeight="bold",s.onclick=()=>t();const o=document.createElement("button");o.id="skill-rotate-button",o.textContent="🔄 Rotate",o.style.position="absolute",o.style.top="10px",o.style.right=`${s.textContent.length*8+32+10}px`,o.style.padding="8px 16px",o.style.backgroundColor="#3498db",o.style.color="white",o.style.border="none",o.style.borderRadius="5px",o.style.cursor="pointer",o.style.zIndex="1000",o.style.fontFamily="sans-serif",o.style.fontWeight="bold",o.onclick=()=>r();const a=document.createElement("button");a.id="skill-cancel-button",a.textContent="Cancel",a.style.position="absolute",a.style.top="10px",a.style.right=`${(s.textContent.length+o.textContent.length)*8+64+20}px`,a.style.padding="8px 16px",a.style.backgroundColor="#95a5a6",a.style.color="white",a.style.border="none",a.style.borderRadius="5px",a.style.cursor="pointer",a.style.zIndex="1000",a.style.fontFamily="sans-serif",a.style.fontWeight="bold",a.onclick=()=>n(),document.body.appendChild(s),document.body.appendChild(o),document.body.appendChild(a),console.log(`✅ Added ${e} Confirm, Rotate, and Cancel buttons to document body`)}hideActionButtons(){const e=document.getElementById("action-skip-button"),t=document.getElementById("basic-attack-button"),n=document.getElementById("attack-confirm-button"),r=document.getElementById("attack-cancel-button"),s=document.getElementById("skill-confirm-button"),o=document.getElementById("skill-cancel-button"),a=document.getElementById("skill-rotate-button");e&&e.remove(),t&&t.remove(),n&&n.remove(),r&&r.remove(),s&&s.remove(),o&&o.remove(),a&&a.remove();for(let l=0;l<10;l++){const c=document.getElementById(`skill-button-${l}`);c&&c.remove()}}cleanup(){this.hideMovementButtons(),this.hideActionButtons()}}const Hm=""+new URL("boom-DXpj0BEC.png",import.meta.url).href;let Mt=32,Ct=32;function Gm(i,e){Mt=i,Ct=e}class Vm{constructor(){this.textureLoader=new Ni}showDamageAnimation(e,t){ie&&(this.textureLoader.load(Hm,n=>{if(!ie)return;n.magFilter=qe,n.minFilter=qe,n.flipY=!0,n.generateMipmaps=!1;const r=new dt(Mt*.8,Mt*.8),s=new at({map:n,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),o=new tt(r,s),a=t(e);if(a){const l=a.x*Mt+Mt/2,c=-a.y*Ct-Ct/2;o.position.set(l,c,2.5),ie.add(o),setTimeout(()=>{ie&&ie.remove(o)},500)}}),this.flickerUnit(e))}flickerUnit(e,t){let n;if(t)n=t(e);else{console.warn("No getUnitMesh function provided to flickerUnit");return}if(!n)return;const r=n.material.opacity;[{opacity:.2,delay:100},{opacity:r,delay:200},{opacity:.2,delay:300},{opacity:r,delay:400}].forEach(({opacity:o,delay:a})=>{setTimeout(()=>{if(n&&n.material){const l=n.material;l.opacity=o,l.transparent=!0}},a)})}showDeathAnimation(e,t,n){if(!ie)return;console.log(`💀 Starting death animation for ${e.name}`);const r=document.createElement("canvas");r.width=64,r.height=64;const s=r.getContext("2d");if(s){s.clearRect(0,0,64,64),s.font="48px Arial",s.textAlign="center",s.textBaseline="middle",s.fillStyle="white",s.fillText("💀",32,32);const o=new Ls(r);o.needsUpdate=!0;const a=new dt(Mt*.6,Mt*.6),l=new at({map:o,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),c=new tt(a,l),d=t(e);if(d){const h=d.x*Mt+Mt/2,u=-d.y*Ct-Ct/2;c.position.set(h,u-Ct*.3,3),ie.add(c),setTimeout(()=>{ie&&ie.remove(c),n&&(console.log(`🗑️ Death animation complete for ${e.name}, calling cleanup callback`),n())},2e3),console.log(`💀 Skull animation added for ${e.name}`)}}}showDamageAnimationWithFlicker(e,t,n){this.showDamageAnimation(e,t),this.flickerUnit(e,n)}showDamageTextPopup(e,t,n,r){if(!ie)return;const s=r(e);if(!s)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=n?`${n}💥 -${t}`:`💥 -${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="white",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new Ls(o);c.needsUpdate=!0;const d=new dt(Mt*1.5,Mt*.75),h=new at({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),u=new tt(d,h),p=s.x*Mt+Mt/2,g=-s.y*Ct-Ct/2;u.position.set(p,g-Ct*.7,3),ie.add(u);let _=Date.now();const m=2e3,f=()=>{const x=(Date.now()-_)/m;if(x>=1){ie&&ie.remove(u);return}const b=g-Ct*.7,C=g-Ct*1.5;u.position.y=b+(C-b)*x,h.opacity=1-x,requestAnimationFrame(f)};f()}showHealingTextPopup(e,t,n,r){if(!ie)return;const s=r(e);if(!s)return;const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");if(!a)return;a.clearRect(0,0,128,64);const l=`${n}💚 +${t}`;a.font="bold 24px Arial",a.textAlign="center",a.textBaseline="middle",a.strokeStyle="black",a.lineWidth=3,a.fillStyle="#2ecc71",a.strokeText(l,64,32),a.fillText(l,64,32);const c=new Ls(o);c.needsUpdate=!0;const d=new dt(Mt*1.5,Mt*.75),h=new at({map:c,transparent:!0,opacity:1,alphaTest:.1,depthTest:!1,depthWrite:!1}),u=new tt(d,h),p=s.x*Mt+Mt/2,g=-s.y*Ct-Ct/2;u.position.set(p,g-Ct*.7,3),ie.add(u);let _=Date.now();const m=2e3,f=()=>{const x=(Date.now()-_)/m;if(x>=1){ie&&ie.remove(u);return}const b=g-Ct*.7,C=g-Ct*1.5;u.position.y=b+(C-b)*x,h.opacity=1-x,requestAnimationFrame(f)};f()}showHealingAnimation(e,t,n,r,s){this.showHealingTextPopup(e,t,n,r),s&&this.glowUnit(e,s,"#2ecc71")}glowUnit(e,t,n){const r=t(e);if(!r)return;const o=r.material.color.clone(),a=new $e(n);[{color:a,delay:100},{color:o,delay:200},{color:a,delay:300},{color:o,delay:400}].forEach(({color:c,delay:d})=>{setTimeout(()=>{r&&r.material&&r.material.color.copy(c)},d)})}showSkillDamageAnimation(e,t,n,r,s){this.showDamageAnimation(e,r),this.showDamageTextPopup(e,t,n,r),s&&this.flickerUnit(e,s)}showSkillEffectAnimation(e,t,n,r,s,o=!1){o?this.showHealingAnimation(e,t,n,r,s):this.showSkillDamageAnimation(e,t,n,r,s)}}function Wm(i,e){Um(i,e),Im(i,e),Fm(i,e),km(i,e),Gm(i,e)}class $m{constructor(){this.selectedGlobe=null,this.unitRenderer=new Dm,this.selectionManager=new Nm,this.movementManager=new Om,this.actionManager=new Bm,this.uiManager=new zm,this.animationManager=new Vm,console.log("GameScene initialized"),$i.setMapDimensions(8,8)}async setSelectedGlobe(e){console.log("Setting selected globe:",e),this.selectedGlobe=e,e&&await this.loadGlobe(e)}async loadGlobe(e){console.log("Loading globe in GameScene:",e),await $s.loadGlobe(this,e)}async placeUnit(e,t,n){this.unitRenderer.placeUnit(e,t,n)}getUnitPosition(e){return this.unitRenderer.getUnitPosition(e)}removeUnit(e){this.unitRenderer.removeUnit(e)}getUnitAtPosition(e,t){return this.unitRenderer.getUnitAtPosition(e,t)}getAllUnits(){return this.unitRenderer.getAllUnits()}updateUnitSelectionIndicators(){this.selectionManager.updateUnitSelectionIndicators(e=>this.unitRenderer.getUnitPosition(e))}selectUnit(e){return this.selectionManager.selectUnit(e)}getSelectedUnit(){return this.selectionManager.getSelectedUnit()}enterMovePhase(e){this.selectionManager.setSelectedUnit(e),this.movementManager.enterMovePhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),ne&&ne.advancePhase()})}exitMovePhase(){this.movementManager.exitMovePhase(),this.uiManager.hideMovementButtons(),this.exitActionPhase()}selectMoveTarget(e,t){const n=this.movementManager.selectMoveTarget(e,t);if(n){const r=this.selectionManager.getSelectedUnit();r&&this.movementManager.drawPathToTarget(s=>this.unitRenderer.getUnitPosition(s),r),this.uiManager.showConfirmCancelButtons(()=>this.confirmMove(),()=>this.cancelMove())}return n}confirmMove(){const e=this.selectionManager.getSelectedUnit(),t=this.movementManager.getSelectedMoveTarget();if(!e||!t){console.warn("❌ No unit or target selected");return}this.moveUnitToPosition(e,t),this.exitMovePhase(),ne&&ne.advancePhase()}cancelMove(){this.movementManager.cancelMove(),this.uiManager.showSkipButton(()=>{this.exitMovePhase(),ne&&ne.advancePhase()})}moveUnitToPosition(e,t){this.unitRenderer.getUnitPosition(e),this.unitRenderer.moveUnitToPosition(e,t)}enterActionPhase(e){this.selectionManager.setSelectedUnit(e),this.actionManager.enterActionPhase(e,t=>this.unitRenderer.getUnitPosition(t),()=>this.unitRenderer.getUnitPositions()),this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),ne&&ne.endTurn()})}exitActionPhase(){this.actionManager.exitActionPhase(),this.uiManager.hideActionButtons()}initiateBasicAttack(){console.log("⚔️ Initiating basic attack mode");const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected");return}this.setupAttackTargeting(e,"basic")}initiateSkillAttack(e){console.log(`✨ Initiating skill attack: ${e.name}`);const t=this.selectionManager.getSelectedUnit();if(!t){console.warn("❌ No unit selected");return}if(t.currentEnergy<e.energyCost){console.warn(`❌ Not enough energy for ${e.name}. Required: ${e.energyCost}, Current: ${t.currentEnergy}`);return}this.setupAttackTargeting(t,"skill",e)}setupAttackTargeting(e,t,n){this.actionManager.setAttackMode(t,n);const r=this.unitRenderer.getUnitPosition(e);if(!r){console.error(`❌ No position found for unit ${e.name}`);return}t==="basic"?(this.showBasicAttackTargeting(e,r),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),ne&&ne.endTurn()})):t==="skill"&&n&&this.showSkillTargeting(e,r,n)}showBasicAttackTargeting(e,t){const n=e.range||1;console.log(`📍 Unit ${e.name} current position: (${t.x}, ${t.y})`),console.log(`⚔️ Unit attack range: ${n}`);const r=this.calculateValidAttackTargets(e,t);this.actionManager.setAttackData(r),this.actionManager.createAttackIndicators(),console.log("🎯 Basic attack targeting indicators created")}calculateValidAttackTargets(e,t){const n=[],r=new Map,s=e.range||1;console.log(`⚔️ Calculating attack targets for ${e.name} with attack range ${s}`);for(let o=-s;o<=s;o++)for(let a=-s;a<=s;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=s){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&(n.push({x:c,y:d}),r.set(`${c},${d}`,[t,{x:c,y:d}]))}}return console.log(`🎯 Found ${n.length} valid attack tiles`),{validTiles:n,paths:r}}showSkillTargeting(e,t,n){if(console.log(`✨ Showing skill targeting for ${n.name}`),console.log(`🎯 Skill targeting type: ${n.targetingType}`),n.targetingType==="non-rotational"&&n.id==="blazing-knuckle")console.log("🔥 Self-centered skill - showing immediate preview around caster"),this.actionManager.setSkillTarget(n,t),this.actionManager.showSkillPreview(t.x,t.y),this.uiManager.showSkillConfirmCancelButtons(n.name,()=>this.confirmSkill(),()=>this.cancelSkill());else if(n.targetingType==="adjacent-attack"){console.log("⚔️ Adjacent attack skill - showing attack-style targeting");const r=this.calculateAdjacentAttackTargets(e,t);this.actionManager.setAttackMode("skill",n),this.actionManager.setAttackData(r),this.actionManager.createAttackIndicators(),console.log(`⚔️ Created ${r.validTiles.length} adjacent attack indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),ne&&ne.endTurn()})}else if(n.targetingType==="dual-rotational"){console.log("🔄 Dual-rotational skill - allowing target selection with rotation");const s=this.calculateSkillTargets(e,t,n,4);this.actionManager.setSkillTargeting(n,s),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${s.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),ne&&ne.endTurn()})}else{const r=e.range||1,s=this.calculateSkillTargets(e,t,n,r);this.actionManager.setSkillTargeting(n,s),this.actionManager.createSkillTargetIndicators(),console.log(`🎯 Created ${s.length} skill target indicators for ${n.name}`),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),ne&&ne.endTurn()})}}calculateSkillTargets(e,t,n,r){const s=[];for(let o=-r;o<=r;o++)for(let a=-r;a<=r;a++){const l=Math.abs(o)+Math.abs(a);if(l>0&&l<=r){const c=t.x+o,d=t.y+a;c>=0&&c<8&&d>=0&&d<8&&this.isValidSkillCenter(c,d,n)&&s.push({x:c,y:d})}}return s}isValidSkillCenter(e,t,n){return n.getTargetPattern(e,t).every(s=>s.x>=0&&s.x<8&&s.y>=0&&s.y<8)}calculateAdjacentAttackTargets(e,t){const n=[],r=new Map;console.log(`⚔️ Calculating adjacent attack targets for ${e.name}`);const s=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];for(const o of s){const a=t.x+o.x,l=t.y+o.y;a>=0&&a<8&&l>=0&&l<8&&(n.push({x:a,y:l}),r.set(`${a},${l}`,[t,{x:a,y:l}]))}return console.log(`⚔️ Found ${n.length} adjacent attack tiles`),{validTiles:n,paths:r}}selectAttackTarget(e,t){const n=this.selectionManager.getSelectedUnit();if(!n)return console.warn("❌ No unit selected"),!1;const r=this.actionManager.selectAttackTarget(e,t,(s,o)=>this.getUnitAtPosition(s,o),n);if(r.success)if(this.actionManager.getCurrentAttackMode()==="skill"){const o=this.actionManager.getCurrentSkill();o?.targetingType==="dual-rotational"?this.uiManager.showDualRotationalSkillButtons(o.name,()=>this.confirmSkill(),()=>this.cancelSkill(),()=>this.rotateSkillTargets()):o?.targetingType==="adjacent-attack"?this.uiManager.showSkillConfirmCancelButtons(o.name,()=>this.confirmSkill(),()=>this.cancelSkill()):this.uiManager.showSkillConfirmCancelButtons(o?.name||"Skill",()=>this.confirmSkill(),()=>this.cancelSkill())}else r.targetUnit&&this.uiManager.showAttackConfirmCancelButtons(()=>this.confirmAttack(),()=>this.cancelAttack());return r.success}confirmAttack(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for attack");return}const t=this.actionManager.confirmAttack(e);if(!t){console.warn("❌ Attack confirmation failed");return}const{damage:n,targetUnit:r}=t;this.unitRenderer.updateUnitBars(r),this.unitRenderer.updateUnitBars(e),this.animationManager.showDamageAnimationWithFlicker(r,s=>this.unitRenderer.getUnitPosition(s),s=>this.unitRenderer.getUnitMesh(s)),r.currentHealth<=0&&setTimeout(()=>{this.animationManager.showDeathAnimation(r,s=>this.unitRenderer.getUnitPosition(s),()=>{if(console.log(`🗑️ Removing dead unit: ${r.name}`),this.removeUnit(r),ne){const s=r.team==="player"?"player":"enemy";ne.onUnitDeath(r.id,s),console.log(`☠️ Notified turn manager of ${r.name} death (${s} team)`)}})},900),this.exitActionPhase(),ne&&ne.endTurn()}cancelAttack(){this.actionManager.cancelAttack(),this.uiManager.showActionSkipButton(()=>{this.exitActionPhase(),ne&&ne.endTurn()})}confirmSkill(){const e=this.selectionManager.getSelectedUnit();if(!e){console.warn("❌ No unit selected for skill");return}const t=this.actionManager.getCurrentSkill(),n=this.actionManager.confirmSkill(e,(o,a)=>this.getUnitAtPosition(o,a));if(!n){console.warn("❌ Skill confirmation failed");return}const{affectedUnits:r}=n;this.unitRenderer.updateUnitBars(e),r.forEach(({unit:o,damage:a})=>{if(this.unitRenderer.updateUnitBars(o),t){const l=a<0,c=Math.abs(a);this.animationManager.showSkillEffectAnimation(o,c,t.emoji,d=>this.unitRenderer.getUnitPosition(d),d=>this.unitRenderer.getUnitMesh(d),l)}else this.animationManager.showDamageAnimationWithFlicker(o,l=>this.unitRenderer.getUnitPosition(l),l=>this.unitRenderer.getUnitMesh(l))}),r.filter(({unit:o})=>o.currentHealth<=0).forEach(({unit:o})=>{setTimeout(()=>{this.animationManager.showDeathAnimation(o,a=>this.unitRenderer.getUnitPosition(a),()=>{if(console.log(`🗑️ Removing dead unit: ${o.name}`),this.removeUnit(o),ne){const a=o.team==="player"?"player":"enemy";ne.onUnitDeath(o.id,a),console.log(`☠️ Notified turn manager of ${o.name} death (${a} team)`)}})},900)}),this.exitActionPhase(),ne&&ne.endTurn()}cancelSkill(){console.log("❌ Cancelling skill selection");const e=this.selectionManager.getSelectedUnit();e&&this.uiManager.showActionOptions(e,()=>this.initiateBasicAttack(),t=>this.initiateSkillAttack(t),()=>{this.exitActionPhase(),ne&&ne.endTurn()})}rotateSkillTargets(){console.log("🔄 Rotating skill targets"),this.actionManager.rotateSkillTargets()}}function Xm(i,e,t){console.log("Creating full tilemap mesh...");const n=Math.floor(e.image.width/i.tilewidth);console.log("Tileset columns for full map:",n);const r=[],s=[],o=[],a=[];let l=0;const c=0;if(i.layers.forEach(p=>{if(p.type==="tilelayer"&&p.visible&&p.data)for(let g=0;g<p.height;g++)for(let _=0;_<p.width;_++){const m=p.data[g*p.width+_];if(m===c)continue;const f=i.tilesets[0].firstgid,E=m-f;if(E<0)continue;const x=E%n,b=Math.floor(E/n),C=x*i.tilewidth/e.image.width,w=(x+1)*i.tilewidth/e.image.width,A=b*i.tileheight/e.image.height,H=(b+1)*i.tileheight/e.image.height,S=_*i.tilewidth*t,T=-g*i.tileheight*t;r.push(S,T,0),s.push(C,A),a.push(0,0,1),r.push(S,T-i.tileheight*t,0),s.push(C,H),a.push(0,0,1),r.push(S+i.tilewidth*t,T,0),s.push(w,A),a.push(0,0,1),r.push(S+i.tilewidth*t,T-i.tileheight*t,0),s.push(w,H),a.push(0,0,1),o.push(l+0,l+1,l+2),o.push(l+2,l+1,l+3),l+=4}}),r.length===0)return console.log("No vertices to render for the full map."),null;const d=new cn;d.setAttribute("position",new ln(r,3)),d.setAttribute("uv",new ln(s,2)),d.setAttribute("normal",new ln(a,3)),d.setIndex(o);const h=new at({map:e,color:16777215,side:gn}),u=new tt(d,h);return console.log("Full tilemap mesh created."),u}let Qt=null;function qm(i){const e=document.createElement("div");return e.id="game-info-panel",e.style.position="absolute",e.style.bottom="20px",e.style.right="20px",e.style.width="280px",e.style.minHeight="120px",e.style.backgroundColor="rgba(0, 0, 0, 0.85)",e.style.color="white",e.style.padding="15px",e.style.borderRadius="8px",e.style.border="2px solid #555",e.style.display="none",e.style.zIndex="101",e.style.pointerEvents="none",e.style.fontSize="0.9em",e.style.fontFamily="Arial, sans-serif",e.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)",e.style.boxShadow="0 0 10px rgba(52, 152, 219, 0.5)",i.appendChild(e),e}function Ym(i){if(!Qt)return;const e=i.team==="player"?"#3498db":i.team==="enemy"?"#e74c3c":"#95a5a6",t=Math.max(0,Math.min(100,i.currentHealth/i.health*100)),n=i.maxEnergy>0?Math.max(0,Math.min(100,i.currentEnergy/i.maxEnergy*100)):0;Qt.innerHTML=`
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
            ${i.skills.map(r=>`
                <div style="margin-bottom: 6px; padding: 4px 6px; background-color: rgba(142, 68, 173, 0.1); border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #8e44ad; font-size: 0.8em;">${r.emoji} ${r.name}</span>
                        <span style="color: #3498db; font-size: 0.75em;">${r.energyCost} ⚡</span>
                    </div>
                    <p style="margin: 2px 0 0 0; font-size: 0.7em; color: #bdc3c7; line-height: 1.2;">
                        ${r.description}
                    </p>
                </div>
            `).join("")}
        </div>
        `:""}
    `}function jm(i){Qt&&(Ym(i),Qt.style.display="block")}function Xs(){Qt&&(Qt.style.display="none")}function Km(i){Qt=qm(i),console.log("Game info panel initialized")}function Zm(){Qt&&Qt.parentNode&&Qt.parentNode.removeChild(Qt),Qt=null}let We={mapData:null,hoverMesh:null,renderer:null,displayScale:1},Un=null;function Jm(i,e,t,n){We.mapData=i,We.hoverMesh=e,We.renderer=t,We.displayScale=n}function Cl(i){if(!We.mapData||!ct||!We.hoverMesh||!We.renderer)return;const e=4,t=We.renderer.domElement,n=t.getBoundingClientRect(),r=i.clientX-n.left,s=i.clientY-n.top,o=n.width,a=n.height;if(r<0||s<0||r>=o||s>=a){ct.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default";return}const l=r/We.displayScale,c=s/We.displayScale,d=We.mapData.tilewidth*e,h=We.mapData.tileheight*e,u=Math.floor(l/d),p=Math.floor(c/h);if(u>=0&&u<We.mapData.width&&p>=0&&p<We.mapData.height){ct.innerText=`Tile: (${u}, ${p})`,We.hoverMesh.position.x=u*d+d/2,We.hoverMesh.position.y=-p*h-h/2,We.hoverMesh.visible=!0;const g=window.GAME_SCENE_INSTANCE;if(g){const _=g.getUnitAtPosition(u,p);_&&ne&&ne.canSelect()&&ne.canSelectUnit(_.id)?t.style.cursor="pointer":t.style.cursor="none",_&&_!==Un?(Un=_,jm(_)):!_&&Un&&(Un=null,Xs())}else t.style.cursor="none"}else ct.innerText="Outside map",We.hoverMesh.visible=!1,t.style.cursor="default",Un&&(Un=null,Xs())}function Pl(i){if(!We.mapData||!We.renderer||!ne)return;const e=4,n=We.renderer.domElement.getBoundingClientRect(),r=i.clientX-n.left,s=i.clientY-n.top,o=n.width,a=n.height;if(r<0||s<0||r>=o||s>=a)return;const l=r/We.displayScale,c=s/We.displayScale,d=We.mapData.tilewidth*e,h=We.mapData.tileheight*e,u=Math.floor(l/d),p=Math.floor(c/h);if(u>=0&&u<We.mapData.width&&p>=0&&p<We.mapData.height){const g=window.GAME_SCENE_INSTANCE;if(g){const _=g.getUnitAtPosition(u,p);if(ne&&ne.canSelect()){if(_)if(ne.getSelectableUnits().some(E=>E.id===_.id)){const E=g.selectUnit(_);console.log(E?`✅ Successfully selected unit: ${_.name}`:`❌ Failed to select unit: ${_.name}`)}else console.log(`❌ Unit ${_.name} is not selectable (no select indicator)`)}else if(ne&&ne.canAct())if(_){const m=g.selectAttackTarget(u,p);console.log(m?`✅ Successfully selected attack target: ${_.name} at (${u}, ${p})`:`❌ Invalid attack target: ${_.name} at (${u}, ${p})`)}else console.log(`❌ No unit to attack at (${u}, ${p})`);else if(ne&&ne.canMove()&&!_){const m=g.selectMoveTarget(u,p);console.log(m?`✅ Successfully selected move target: (${u}, ${p})`:`❌ Invalid move target: (${u}, ${p})`)}}}}function Ll(){We.hoverMesh&&ct&&(We.hoverMesh.visible=!1,ct.innerText="Outside map",We.renderer&&(We.renderer.domElement.style.cursor="default")),Un&&(Un=null,Xs())}function Qm(i){i.domElement.addEventListener("mousemove",Cl,!1),i.domElement.addEventListener("mouseleave",Ll,!1),i.domElement.addEventListener("click",Pl,!1)}function eg(i){i.domElement.removeEventListener("mousemove",Cl),i.domElement.removeEventListener("mouseleave",Ll),i.domElement.removeEventListener("click",Pl)}let Ur=null,ht={renderer:null,scene:null,camera:null};function tg(i,e,t){ht.renderer=i,ht.scene=e,ht.camera=t}function Ul(){Ur=requestAnimationFrame(Ul),ht.renderer&&ht.scene&&ht.camera&&ht.renderer.render(ht.scene,ht.camera)}function ng(){Ul(),console.log("Animation loop started")}function ig(){Ur!==null&&(cancelAnimationFrame(Ur),Ur=null,console.log("Animation loop stopped"))}function rg(){ig(),ht.renderer&&(ht.renderer.dispose(),ht.renderer.domElement.parentNode&&ht.renderer.domElement.parentNode.removeChild(ht.renderer.domElement)),ht.scene&&ht.scene.traverse(i=>{i instanceof tt&&(i.geometry&&i.geometry.dispose(),i.material&&(Array.isArray(i.material)?i.material.forEach(e=>e.dispose()):i.material.dispose()))}),ht.renderer=null,ht.scene=null,ht.camera=null,console.log("Renderer cleaned up.")}let Mi=null,Pt=null,Rr=1,Yt=null,ie=null,Xi=null;async function sg(i){try{const u=await fetch("./TacticaMap.tmj");if(!u.ok)throw new Error(`HTTP error! status: ${u.status}`);Pt=await u.json(),console.log("Tiled Map Data Loaded via fetch:",Pt),Wm(Pt.tilewidth*4,Pt.tileheight*4),console.log(`Tile size set to ${Pt.tilewidth*4}x${Pt.tileheight*4}`)}catch(u){console.error("Error loading Tiled map data via fetch:",u);return}if(!Pt)return;ie=new Mm,ie.background=new $e(2236962),console.log("Three.js scene initialized");const t=Pt.width*Pt.tilewidth,n=Pt.height*Pt.tileheight,r=t*4,s=n*4;Xi=new vl(0,r,0,-s,1,1e3),Xi.position.z=10,console.log("Camera initialized"),Yt=new wl({antialias:!1,powerPreference:"high-performance"}),Yt.setSize(r,s),i.appendChild(Yt.domElement),console.log("Renderer initialized"),Rr=1,Yt.domElement.style.width=`${r*Rr}px`,Yt.domElement.style.height=`${s*Rr}px`,Yt.domElement.style.imageRendering="pixelated",Yt.domElement.style.imageRendering="crisp-edges";const o=new Ni;let a,l;try{a=await o.loadAsync(Am),a.magFilter=qe,a.minFilter=qe,a.flipY=!1,console.log("Map Texture Loaded:",a),l=await o.loadAsync(wm),l.magFilter=qe,l.minFilter=qe,l.flipY=!1,console.log("Hover Texture Loaded:",l)}catch(u){console.error("Error loading textures:",u);return}const c=Xm(Pt,a,4);c&&ie?(ie.add(c),console.log("Map mesh added to scene")):console.error("Failed to create full tilemap mesh.");const d=new dt(Pt.tilewidth*4,Pt.tileheight*4),h=new at({map:l,transparent:!0,side:gn});Mi=new tt(d,h),Mi.position.z=1,Mi.visible=!1,ie&&(ie.add(Mi),console.log("Hover selector added to scene")),Jm(Pt,Mi,Yt,Rr),Qm(Yt),tg(Yt,ie,Xi),ng(),console.log("Three.js game started successfully")}function ag(){Yt&&eg(Yt),rg(),Yt=null,ie=null,Xi=null,Pt=null,Mi=null,console.log("Game cleaned up.")}let tr=!1;function og(i){tr=i,console.log(`Debug mode ${i?"enabled":"disabled"}`)}function Dt(){return tr}function lg(){return tr?"ON":"OFF"}function vt(i,e){tr&&console.log(`[DEBUG] ${i}`,e||"")}function Br(i){tr&&console.warn(`[DEBUG ALERT] ${i}`)}function cg(i,e){const t=document.createElement("div");t.id="splash-screen",t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="#1a1a1a",t.style.display="flex",t.style.flexDirection="column",t.style.justifyContent="center",t.style.alignItems="center",t.style.zIndex="1000";const n=document.createElement("h1");n.textContent="Magepunk Presents: Tactica Trials",n.style.color="#e0e0e0",n.style.fontSize="2.5em",n.style.marginBottom="30px",n.style.fontFamily='"Arial Black", Gadget, sans-serif';const r=document.createElement("button");r.textContent="Start Game",r.style.padding="15px 30px",r.style.fontSize="1.5em",r.style.backgroundColor="#4CAF50",r.style.color="white",r.style.border="none",r.style.borderRadius="5px",r.style.cursor="pointer",r.style.boxShadow="0 4px 8px rgba(0,0,0,0.2)",r.onmouseover=()=>r.style.backgroundColor="#45a049",r.onmouseout=()=>r.style.backgroundColor="#4CAF50";const s=document.createElement("div");s.style.display="flex",s.style.alignItems="center",s.style.marginTop="20px",s.style.marginBottom="10px";const o=document.createElement("input");o.type="checkbox",o.id="debug-mode-checkbox",o.checked=Dt(),o.style.marginRight="10px",o.style.transform="scale(1.2)",o.style.cursor="pointer";const a=document.createElement("label");a.htmlFor="debug-mode-checkbox",a.textContent="Debug Mode (Player controls enemies)",a.style.color="#e0e0e0",a.style.fontSize="1.1em",a.style.cursor="pointer",a.style.userSelect="none",a.onmouseover=()=>a.style.color="#f0f0f0",a.onmouseout=()=>a.style.color="#e0e0e0";const l=()=>{og(o.checked)};o.addEventListener("change",l),s.appendChild(o),s.appendChild(a);const c=()=>{d(),e()};r.addEventListener("click",c),t.appendChild(n),t.appendChild(s),t.appendChild(r),i.appendChild(t);const d=()=>{r.removeEventListener("click",c),o.removeEventListener("change",l),t.parentNode&&t.parentNode.removeChild(t),console.log("Splash screen cleaned up.")};return d}class _i{constructor(e,t,n,r,s,o,a){this.id=e,this.name=t,this.level=n,this.imageUrl=r,this.reward=s,this.battleCondition=o,this.enemies=a}}const xi={NORMAL:{name:"Standard Battle",description:"A standard battle with no special conditions.",effect:()=>{}}},yi={STANDARD:{resource:10}};function Wn(i){const e=Wo.createUnit(i,"enemy");return e||(console.error(`Failed to create enemy unit of type ${i}`),null)}const dg={STANDARD_GLOBE:new _i("STANDARD_GLOBE","Standard Globe",1,"/assets/Images/standardglobe.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman")]),NEON_REALM:new _i("NEON_REALM","Neon Realm",1,"/assets/Images/neonrealm.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman")]),WORMWOOD_CASTLE:new _i("WORMWOOD_CASTLE","Wormwood Castle",1,"/assets/Images/wormwoodcastle.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman")]),TEMPLE_OF_RELICS:new _i("TEMPLE_OF_RELICS","Temple of Relics",1,"/assets/Images/templeofrelics.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman"),Wn("Swordsman")]),CAVE:new _i("CAVE","Cave",1,"/assets/Images/cave.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman")]),FOREST:new _i("FOREST","Forest",1,"/assets/Images/forest.png",yi.STANDARD,xi.NORMAL,[Wn("Swordsman")])};function ug(i,e=3){return[...Object.values(dg).filter(r=>r.level===i)].sort(()=>Math.random()-.5).slice(0,e)}let ea=null;function hg(i){ea=i}function fg(){return ea}function pg(){ea=null}let Bo=[];function mg(i,e){Bo=ug(1),console.log("Showing Encounter Scene..."),i.innerHTML="";const t=document.createElement("div");t.id="encounter-scene",t.style.width="100%",t.style.height="100%",t.style.display="flex",t.style.flexDirection="column",t.style.alignItems="center",t.style.justifyContent="space-between",t.style.backgroundColor="#2c3e50",t.style.color="#ecf0f1",t.style.fontFamily="Arial, sans-serif",t.style.padding="20px",t.style.boxSizing="border-box",t.style.position="relative";const n=document.createElement("h1");n.textContent="ENCOUNTER",n.style.textAlign="center",n.style.fontSize="3em",n.style.margin="0 0 15px 0";const r=document.createElement("div");r.id="encounter-content-area",r.style.flexGrow="1",r.style.width="100%",r.style.display="flex",r.style.justifyContent="space-around",r.style.alignItems="center",r.style.overflow="hidden",r.style.padding="20px",Bo.forEach((a,l)=>{const c=document.createElement("div");c.style.width="250px",c.style.height="350px",c.style.border="2px solid #3498db",c.style.borderRadius="10px",c.style.padding="15px",c.style.display="flex",c.style.flexDirection="column",c.style.alignItems="center",c.style.justifyContent="space-between",c.style.backgroundColor="#34495e",c.style.cursor="pointer",c.style.transition="transform 0.2s ease-out, box-shadow 0.2s ease-out";const d=document.createElement("img");d.src=a.imageUrl,d.alt=a.name,d.style.width="150px",d.style.height="150px",d.style.objectFit="contain",d.style.marginBottom="10px";const h=document.createElement("h3");h.textContent=a.name,h.style.margin="0 0 10px 0",h.style.textAlign="center";const u=document.createElement("p");u.textContent=`Level ${a.level}`,u.style.margin="0 0 10px 0",u.style.color="#f1c40f";const p=document.createElement("p");p.textContent=a.battleCondition.name,p.style.margin="0 0 10px 0",p.style.fontStyle="italic";const g=document.createElement("p");g.textContent=`Reward: ${a.reward.resource} Resources`,g.style.margin="0 0 10px 0",g.style.color="#2ecc71";const _=document.createElement("p");_.textContent=`Enemies: ${a.enemies.length}`,_.style.margin="0 0 10px 0",c.onclick=()=>{const m=document.querySelector(".selected-globe");m&&(m.classList.remove("selected-globe"),m.style.transform="translateY(0)",m.style.boxShadow="none"),c.classList.add("selected-globe"),c.style.transform="translateY(-10px)",c.style.boxShadow="0px 5px 15px rgba(0,0,0,0.3)",hg(a),console.log("Selected globe stored:",a),console.log("Navigating to game scene with selected globe"),e()},c.addEventListener("mouseenter",()=>{c.classList.contains("selected-globe")||(c.style.transform="translateY(-5px)",c.style.boxShadow="0px 3px 10px rgba(0,0,0,0.2)")}),c.addEventListener("mouseleave",()=>{c.classList.contains("selected-globe")||(c.style.transform="translateY(0)",c.style.boxShadow="none")}),c.appendChild(d),c.appendChild(h),c.appendChild(u),c.appendChild(p),c.appendChild(g),c.appendChild(_),r.appendChild(c)});const s=document.createElement("div");s.style.width="100%",s.style.display="flex",s.style.justifyContent="space-between",s.style.alignItems="center",s.style.paddingTop="15px",s.style.flexShrink="0";const o=document.createElement("div");o.id="player-resource-display",o.textContent=`Resource: ${jn.resource}`,o.style.padding="10px 15px",o.style.backgroundColor="#1a1a1a",o.style.color="#f1c40f",o.style.borderRadius="5px",o.style.fontSize="1em",o.style.fontWeight="bold",o.style.display="flex",o.style.alignItems="center",s.appendChild(o),t.appendChild(n),t.appendChild(r),t.appendChild(s),i.appendChild(t),console.log("Encounter Scene displayed.")}class Gi{static countAliveUnits(e){return(e==="player"?Ve.playerParty:Ve.enemyUnits).filter(n=>n.currentHealth>0).length}static calculateActionableUnitLimit(){const e=this.countAliveUnits("player"),t=this.countAliveUnits("enemy"),n=Math.min(e,t);return vt("Calculated actionable unit limit",{alivePlayerUnits:e,aliveEnemyUnits:t,actionableUnitLimit:n}),Math.max(1,n)}static getAliveUnitCounts(){return{player:this.countAliveUnits("player"),enemy:this.countAliveUnits("enemy")}}}class zo{constructor(e,t){this.handler=e,this.unitsUsedThisRound=t}onUnitDeath(e,t){console.log(`💀 Unit died: ${e} (${t} team)`),t==="player"?this.unitsUsedThisRound[He.PLAYER_ONE].delete(e):this.unitsUsedThisRound[He.PLAYER_TWO].delete(e),vt("Unit death processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitAdded(e,t){console.log(`➕ Unit added/revived: ${e} (${t} team)`),vt("Unit addition processed",{unitId:e,team:t}),this.handler.recalculateActionableUnitLimit()}onUnitHealthChanged(e,t,n,r){const s=r>0,o=n>0;s!==o&&(o?this.onUnitAdded(e,t):this.onUnitDeath(e,t))}}class gg{constructor(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[He.PLAYER_ONE]:0,[He.PLAYER_TWO]:0},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set,[He.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new zo(this,this.roundState.unitsUsedThisRound)}getRoundNumber(){return this.roundState.roundNumber}getActionableUnitLimit(){return this.roundState.actionableUnitLimit}getTurnsTakenThisRound(e){return this.roundState.turnsTakenThisRound[e]}canTakeAnotherTurn(e){return this.roundState.turnsTakenThisRound[e]<this.roundState.actionableUnitLimit}markUnitAsUsed(e,t){this.roundState.unitsUsedThisRound[t].add(e),vt("Unit marked as used this round",{unitId:e,player:t,roundNumber:this.roundState.roundNumber})}canSelectUnit(e,t){return!this.roundState.unitsUsedThisRound[t].has(e)}recalculateActionableUnitLimit(){const e=this.roundState.actionableUnitLimit,t=Gi.calculateActionableUnitLimit();if(t!==e){console.log(`🔄 Unit count changed! Recalculating actionable unit limit: ${e} → ${t}`),this.roundState.actionableUnitLimit=t;const n=this.roundState.turnsTakenThisRound[He.PLAYER_ONE]>t,r=this.roundState.turnsTakenThisRound[He.PLAYER_TWO]>t;(n||r)&&(console.log(`⚠️ Turn limit exceeded! P1: ${this.roundState.turnsTakenThisRound[He.PLAYER_ONE]}/${t}, P2: ${this.roundState.turnsTakenThisRound[He.PLAYER_TWO]}/${t}`),console.log("🔄 Round will end immediately after current turn completes"),this.roundState.shouldEndRoundAfterTurn=!0,vt("Round marked for immediate ending",{previousLimit:e,newLimit:t,player1Turns:this.roundState.turnsTakenThisRound[He.PLAYER_ONE],player2Turns:this.roundState.turnsTakenThisRound[He.PLAYER_TWO],player1Exceeded:n,player2Exceeded:r}));const s=Gi.getAliveUnitCounts();vt("Actionable unit limit recalculated",{previousLimit:e,newLimit:t,alivePlayerUnits:s.player,aliveEnemyUnits:s.enemy,currentRound:this.roundState.roundNumber})}}startNewRound(){this.roundState.roundNumber++,this.roundState.actionableUnitLimit=Gi.calculateActionableUnitLimit(),this.roundState.turnsTakenThisRound[He.PLAYER_ONE]=0,this.roundState.turnsTakenThisRound[He.PLAYER_TWO]=0,this.roundState.unitsUsedThisRound[He.PLAYER_ONE].clear(),this.roundState.unitsUsedThisRound[He.PLAYER_TWO].clear(),this.roundState.shouldEndRoundAfterTurn=!1,console.log(`🔄 NEW ROUND ${this.roundState.roundNumber} STARTED!`),console.log(`📊 Actionable Unit Limit: ${this.roundState.actionableUnitLimit}`),console.log("🔄 All units are now eligible for selection again");const e=Gi.getAliveUnitCounts();vt("New round started",{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,alivePlayerUnits:e.player,aliveEnemyUnits:e.enemy})}shouldStartNewRound(){if(this.roundState.shouldEndRoundAfterTurn)return!0;const e=this.roundState.turnsTakenThisRound[He.PLAYER_ONE]>=this.roundState.actionableUnitLimit,t=this.roundState.turnsTakenThisRound[He.PLAYER_TWO]>=this.roundState.actionableUnitLimit;return e&&t}incrementTurnCount(e){this.roundState.turnsTakenThisRound[e]++}isRoundEndingAfterTurn(){return this.roundState.shouldEndRoundAfterTurn}getUnitsUsedThisRound(e){return Array.from(this.roundState.unitsUsedThisRound[e])}hasUnitBeenUsedThisRound(e,t){return this.roundState.unitsUsedThisRound[t].has(e)}onUnitDeath(e,t){this.unitEventHandler.onUnitDeath(e,t)}onUnitAdded(e,t){this.unitEventHandler.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,r){this.unitEventHandler.onUnitHealthChanged(e,t,n,r)}forceNewRound(){this.startNewRound()}reset(){this.roundState={roundNumber:1,actionableUnitLimit:0,turnsTakenThisRound:{[He.PLAYER_ONE]:0,[He.PLAYER_TWO]:0},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set,[He.PLAYER_TWO]:new Set},shouldEndRoundAfterTurn:!1},this.unitEventHandler=new zo(this,this.roundState.unitsUsedThisRound)}getRoundState(){return{roundNumber:this.roundState.roundNumber,actionableUnitLimit:this.roundState.actionableUnitLimit,turnsTakenThisRound:{...this.roundState.turnsTakenThisRound},unitsUsedThisRound:{[He.PLAYER_ONE]:new Set(this.roundState.unitsUsedThisRound[He.PLAYER_ONE]),[He.PLAYER_TWO]:new Set(this.roundState.unitsUsedThisRound[He.PLAYER_TWO])},shouldEndRoundAfterTurn:this.roundState.shouldEndRoundAfterTurn}}getAliveUnitCounts(){return Gi.getAliveUnitCounts()}}class _g{constructor(){this.currentPhase=ut.SELECT,this.phaseSkipped={move:!1,action:!1}}getCurrentPhase(){return this.currentPhase}getPhaseSkipped(){return{...this.phaseSkipped}}advancePhase(){const e=this.currentPhase;switch(this.currentPhase){case ut.SELECT:this.currentPhase=ut.MOVE,this.phaseSkipped.move=!1;break;case ut.MOVE:this.currentPhase=ut.ACTION,this.phaseSkipped.action=!1;break;case ut.ACTION:break}return console.log(`➡️ Phase: ${this.getPhaseDisplayName(e)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase advanced",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}skipPhase(){const e=this.currentPhase;switch(this.currentPhase){case ut.SELECT:return console.warn("❌ Cannot skip SELECT phase"),this.currentPhase;case ut.MOVE:this.phaseSkipped.move=!0,this.currentPhase=ut.ACTION,console.log("⏭️ MOVE phase skipped");break;case ut.ACTION:this.phaseSkipped.action=!0,console.log("⏭️ ACTION phase skipped");break}return vt("Phase skipped",{previousPhase:e,currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped}),this.currentPhase}resetToSelect(){this.currentPhase=ut.SELECT,this.phaseSkipped={move:!1,action:!1},vt("Phase reset to SELECT",{currentPhase:this.currentPhase,phaseSkipped:this.phaseSkipped})}canMove(){return this.currentPhase===ut.MOVE}canAct(){return this.currentPhase===ut.ACTION}canSelect(){return this.currentPhase===ut.SELECT}getPhaseDisplayName(e){return{[ut.SELECT]:"Unit Selection",[ut.MOVE]:"Movement",[ut.ACTION]:"Action"}[e]||"Unknown"}forceSetPhase(e){Br(`Forcing phase change from ${this.currentPhase} to ${e}`);const t=this.currentPhase;this.currentPhase=e,console.log(`🔧 Phase forced: ${this.getPhaseDisplayName(t)} → ${this.getPhaseDisplayName(this.currentPhase)}`),vt("Phase forced",{previousPhase:t,currentPhase:this.currentPhase})}reset(){this.currentPhase=ut.SELECT,this.phaseSkipped={move:!1,action:!1}}}class xg{constructor(e=He.PLAYER_ONE){this.currentPlayer=e}getCurrentPlayer(){return this.currentPlayer}switchPlayer(){const e=this.currentPlayer;return this.currentPlayer=this.getOpposingPlayer(this.currentPlayer),console.log(`🔄 Player switched: ${this.getPlayerDisplayName(e)} → ${this.getPlayerDisplayName(this.currentPlayer)}`),vt("Player switched",{previousPlayer:e,currentPlayer:this.currentPlayer}),this.currentPlayer}getOpposingPlayer(e){return e===He.PLAYER_ONE?He.PLAYER_TWO:He.PLAYER_ONE}isPlayerTurn(e){return this.currentPlayer===e}getPlayerDisplayName(e){return{[He.PLAYER_ONE]:"Player 1",[He.PLAYER_TWO]:"Player 2"}[e]||"Unknown Player"}forceSetPlayer(e){Br(`Forcing player change from ${this.currentPlayer} to ${e}`);const t=this.currentPlayer;this.currentPlayer=e,vt("Player forced",{previousPlayer:t,currentPlayer:this.currentPlayer})}reset(e=He.PLAYER_ONE){this.currentPlayer=e}}class yg{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}getSelectableUnits(){const e=this.playerManager.getCurrentPlayer();return(e===He.PLAYER_ONE?Ve.playerParty:Ve.enemyUnits).filter(n=>n.currentHealth>0&&this.roundManager.canSelectUnit(n.id,e))}canTakeAnotherTurn(){return this.roundManager.canTakeAnotherTurn(this.playerManager.getCurrentPlayer())}getGameState(e,t){const n=this.roundManager.getAliveUnitCounts(),r=this.roundManager.getRoundState();return{currentPlayer:this.playerManager.getCurrentPlayer(),currentPlayerName:this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer()),currentPhase:this.phaseManager.getCurrentPhase(),currentPhaseName:this.phaseManager.getPhaseDisplayName(this.phaseManager.getCurrentPhase()),turnCount:e,roundNumber:this.roundManager.getRoundNumber(),actionableUnitLimit:this.roundManager.getActionableUnitLimit(),turnsTakenThisRound:r.turnsTakenThisRound,canTakeAnotherTurn:this.canTakeAnotherTurn(),shouldEndRoundAfterTurn:this.roundManager.isRoundEndingAfterTurn(),gameStarted:t,canMove:this.phaseManager.canMove(),canAct:this.phaseManager.canAct(),canSelect:this.phaseManager.canSelect(),phaseSkipped:this.phaseManager.getPhaseSkipped(),alivePlayerUnits:n.player,aliveEnemyUnits:n.enemy,selectableUnits:this.getSelectableUnits().length}}isRoundEndingAfterTurn(){return this.roundManager.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.roundManager.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.roundManager.hasUnitBeenUsedThisRound(e,t)}markUnitAsUsed(e){this.roundManager.markUnitAsUsed(e,this.playerManager.getCurrentPlayer())}canSelectUnit(e){return this.roundManager.canSelectUnit(e,this.playerManager.getCurrentPlayer())}}class vg{constructor(e,t,n){this.roundManager=e,this.phaseManager=t,this.playerManager=n}forceRecalculateActionableUnitLimit(){Br("Forcing recalculation of actionable unit limit"),this.roundManager.recalculateActionableUnitLimit()}forceSetPlayer(e){this.playerManager.forceSetPlayer(e),this.phaseManager.resetToSelect()}forceSetPhase(e){this.phaseManager.forceSetPhase(e)}forceNewRound(){Br("Forcing new round to start"),this.roundManager.forceNewRound()}}var He=(i=>(i.PLAYER_ONE="PLAYER_ONE",i.PLAYER_TWO="PLAYER_TWO",i))(He||{}),ut=(i=>(i.SELECT="SELECT",i.MOVE="MOVE",i.ACTION="ACTION",i))(ut||{});class Sg{constructor(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.roundManager=new gg,this.phaseManager=new _g,this.playerManager=new xg(e),this.gameStateAggregator=new yg(this.roundManager,this.phaseManager,this.playerManager),this.debugger=new vg(this.roundManager,this.phaseManager,this.playerManager),vt("TurnManager initialized",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}getCurrentPlayer(){return this.playerManager.getCurrentPlayer()}getCurrentPhase(){return this.phaseManager.getCurrentPhase()}getTurnCount(){return this.turnCount}getRoundNumber(){return this.roundManager.getRoundNumber()}getActionableUnitLimit(){return this.roundManager.getActionableUnitLimit()}getTurnsTakenThisRound(e){return this.roundManager.getTurnsTakenThisRound(e)}isGameStarted(){return this.gameStarted}markUnitAsUsed(e){this.gameStateAggregator.markUnitAsUsed(e)}canSelectUnit(e){return this.gameStateAggregator.canSelectUnit(e)}getSelectableUnits(){return this.gameStateAggregator.getSelectableUnits()}startGame(){if(this.gameStarted){console.warn("⚠️ Game already started");return}this.gameStarted=!0,this.roundManager.recalculateActionableUnitLimit(),console.log("🎮 GAME STARTED!"),console.log(`👤 Starting Player: ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}`),console.log(`📊 Actionable Unit Limit: ${this.roundManager.getActionableUnitLimit()}`),vt("Game started",{startingPlayer:this.playerManager.getCurrentPlayer(),actionableUnitLimit:this.roundManager.getActionableUnitLimit()})}advancePhase(){if(!this.gameStarted){console.warn("❌ Cannot advance phase - game not started");return}this.phaseManager.advancePhase()}skipPhase(){if(!this.gameStarted){console.warn("❌ Cannot skip phase - game not started");return}this.phaseManager.skipPhase()}endTurn(){if(!this.gameStarted){console.warn("❌ Cannot end turn - game not started");return}const e=this.playerManager.getCurrentPlayer();this.roundManager.incrementTurnCount(e),this.turnCount++,console.log(`🔚 Turn ${this.turnCount-1} ended for ${this.playerManager.getPlayerDisplayName(e)}`),console.log(`📊 Turns taken this round: P1=${this.roundManager.getTurnsTakenThisRound("PLAYER_ONE")}, P2=${this.roundManager.getTurnsTakenThisRound("PLAYER_TWO")}`),this.roundManager.shouldStartNewRound()&&this.roundManager.startNewRound(),this.playerManager.switchPlayer(),this.phaseManager.resetToSelect(),console.log(`🎯 Turn ${this.turnCount} - ${this.playerManager.getPlayerDisplayName(this.playerManager.getCurrentPlayer())}'s turn`),vt("Turn ended",{previousPlayer:e,newPlayer:this.playerManager.getCurrentPlayer(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}canTakeAnotherTurn(){return this.gameStateAggregator.canTakeAnotherTurn()}canMove(){return this.phaseManager.canMove()}canAct(){return this.phaseManager.canAct()}canSelect(){return this.phaseManager.canSelect()}isPlayerTurn(e){return this.playerManager.isPlayerTurn(e)}getPlayerDisplayName(e){return this.playerManager.getPlayerDisplayName(e)}getPhaseDisplayName(e){return this.phaseManager.getPhaseDisplayName(e)}getOpposingPlayer(e){return this.playerManager.getOpposingPlayer(e)}getGameState(){return this.gameStateAggregator.getGameState(this.turnCount,this.gameStarted)}isRoundEndingAfterTurn(){return this.gameStateAggregator.isRoundEndingAfterTurn()}getUnitsUsedThisRound(e){return this.gameStateAggregator.getUnitsUsedThisRound(e)}hasUnitBeenUsedThisRound(e,t){return this.gameStateAggregator.hasUnitBeenUsedThisRound(e,t)}reset(e="PLAYER_ONE"){this.turnCount=1,this.gameStarted=!1,this.roundManager.reset(),this.phaseManager.reset(),this.playerManager.reset(e),console.log("🔄 TurnManager reset"),vt("TurnManager reset",{startingPlayer:this.playerManager.getCurrentPlayer(),currentPhase:this.phaseManager.getCurrentPhase(),turnCount:this.turnCount,roundNumber:this.roundManager.getRoundNumber()})}forceRecalculateActionableUnitLimit(){this.debugger.forceRecalculateActionableUnitLimit()}forceSetPlayer(e){this.debugger.forceSetPlayer(e)}forceSetPhase(e){this.debugger.forceSetPhase(e)}forceNewRound(){this.debugger.forceNewRound()}onUnitDeath(e,t){this.roundManager.onUnitDeath(e,t)}onUnitAdded(e,t){this.roundManager.onUnitAdded(e,t)}onUnitHealthChanged(e,t,n,r){this.roundManager.onUnitHealthChanged(e,t,n,r)}recalculateActionableUnitLimit(){this.gameStarted&&this.roundManager.recalculateActionableUnitLimit()}}function Dl(){const i=new Sg,e=i.advancePhase.bind(i),t=i.endTurn.bind(i),n=i.startGame.bind(i);return i.advancePhase=function(){e(),Dr(i),Mg(i)},i.endTurn=function(){t(),Dr(i),Ol()},i.startGame=function(){n(),Dr(i)},i}function ta(i){const e=i.getGameState();return`Turn ${e.turnCount} - ${e.currentPlayerName}`}function Il(i){return`Phase: ${i.getGameState().currentPhaseName}`}function Nl(i){return`Round ${i.getGameState().roundNumber}`}function Fl(i){return`Actionable Unit Limit: ${i.getGameState().actionableUnitLimit}`}function Dr(i){const e=document.getElementById("turn-display-game-scene");e&&(e.textContent=ta(i));const t=document.getElementById("phase-display-game-scene");t&&(t.textContent=Il(i));const n=document.getElementById("round-display-game-scene");if(n&&(n.textContent=Nl(i)),Dt()){const r=document.getElementById("actionable-unit-limit-display-game-scene");r&&(r.textContent=Fl(i))}if(Dt()){const r=i.getGameState();console.log(`🔄 UI Updated - ${r.currentPlayerName} | ${r.currentPhaseName} | Round ${r.roundNumber}`)}}function Mg(i){const e=i.getGameState();Dt()&&(console.log(`🎯 Phase transition: ${e.currentPhaseName}`),console.log(`Can select: ${e.canSelect}, Can move: ${e.canMove}, Can act: ${e.canAct}`));const t=window.GAME_SCENE_INSTANCE;switch(e.currentPhase){case"SELECT":Ol();break;case"MOVE":if(t){const n=t.getSelectedUnit();n?(console.log(`🚶 Entering MOVE phase with unit: ${n.name}`),t.enterMovePhase(n)):console.warn("❌ No unit selected for MOVE phase")}else console.warn("❌ GameScene not available for MOVE phase");break;case"ACTION":if(t){const n=t.getSelectedUnit();n?(console.log(`⚔️ Entering ACTION phase with unit: ${n.name}`),t.enterActionPhase(n)):console.warn("❌ No unit selected for ACTION phase")}else console.warn("❌ GameScene not available for ACTION phase");break}}function Ol(){const i=window.GAME_SCENE_INSTANCE;i?i.updateUnitSelectionIndicators():Dt()&&console.log("🎯 GameScene not available for updating unit selection indicators")}const Eg=Object.freeze(Object.defineProperty({__proto__:null,createUIAwareTurnManager:Dl,getActionableUnitLimitDisplay:Fl,getPhaseStatusDisplay:Il,getRoundStatusDisplay:Nl,getTurnStatusDisplay:ta,updateTurnDisplay:Dr},Symbol.toStringTag,{value:"Module"}));let zr=!1;function Tg(){zr||(zr=!0,document.addEventListener("keydown",kl),Dt()&&(console.log("🎮 Game input handler initialized"),console.log("💡 Press ENTER to advance phase, SHIFT+ENTER to skip phase, SPACE to end turn, ESC to show turn info"),console.log("💡 Debug: P for phase info, U for unit info, L to recalc limits, SHIFT+D to kill unit"),console.log("💡 Debug: CTRL+R to reset, SHIFT+R for new round")))}function bg(){zr&&(zr=!1,document.removeEventListener("keydown",kl),vt("Game input handler cleaned up"))}function kl(i){if(ne)switch(i.code){case"Enter":i.preventDefault(),ne.isGameStarted()?i.shiftKey?ne.skipPhase():ne.advancePhase():console.log("⚠️ Game not started yet!");break;case"Space":i.preventDefault(),ne.isGameStarted()?ne.endTurn():console.log("⚠️ Game not started yet!");break;case"Escape":i.preventDefault();const e=ne.getGameState();console.log("📊 Current Game State:",e),console.log(`📋 Phase Capabilities: Select=${e.canSelect}, Move=${e.canMove}, Act=${e.canAct}`),console.log(`🔄 Round Info: Round ${e.roundNumber}, Limit ${e.actionableUnitLimit}`),console.log(`🎯 Turns taken: P1=${e.turnsTakenThisRound.PLAYER_ONE}/${e.actionableUnitLimit}, P2=${e.turnsTakenThisRound.PLAYER_TWO}/${e.actionableUnitLimit}`),console.log(`👥 Alive units: Player=${e.alivePlayerUnits}, Enemy=${e.aliveEnemyUnits}`),console.log(`🎯 Selectable units: ${e.selectableUnits}`);break;case"KeyR":i.ctrlKey&&Dt()?(i.preventDefault(),console.log("🔄 Resetting turn manager..."),ne.reset(),ne.startGame()):i.shiftKey&&Dt()&&(i.preventDefault(),console.log("🔄 Forcing new round..."),ne.forceNewRound());break;case"KeyP":if(Dt()){i.preventDefault();const t=ne.getCurrentPhase();console.log(`📋 Current Phase: ${ne.getPhaseDisplayName(t)}`),console.log("🎯 Phase Capabilities:"),console.log(`  Can Select: ${ne.canSelect()}`),console.log(`  Can Move: ${ne.canMove()}`),console.log(`  Can Act: ${ne.canAct()}`)}break;case"KeyU":if(Dt()){i.preventDefault();const t=ne.getSelectableUnits();console.log(`🎯 Selectable Units (${t.length}):`),t.forEach(r=>{console.log(`  - ${r.name} (${r.className}) - ID: ${r.id} - HP: ${r.currentHealth}/${r.health}`)});const n=ne.getGameState();console.log(`👥 Unit counts: Player=${n.alivePlayerUnits}, Enemy=${n.aliveEnemyUnits}`),console.log(`🔄 Should end round after turn: ${n.shouldEndRoundAfterTurn}`)}break;case"KeyL":Dt()&&(i.preventDefault(),console.log("🔄 Forcing recalculation of actionable unit limit..."),ne.forceRecalculateActionableUnitLimit());break;case"KeyD":if(i.shiftKey&&Dt()){i.preventDefault(),console.log("💀 Simulating unit death for testing...");const t=ne.getSelectableUnits();if(t.length>0){const n=t[0],r=n.currentHealth;n.currentHealth=0;const s=n.team;ne.onUnitHealthChanged(n.id,s,0,r),console.log(`💀 Killed ${n.name} (${s} team)`)}else console.log("⚠️ No selectable units to kill")}break}}function Ag(){console.log("🎮 Game Controls:"),console.log("  ENTER - Advance to next phase"),console.log("  SHIFT+ENTER - Skip current phase"),console.log("  SPACE - End current turn"),console.log("  ESC - Show current game state"),Dt()&&(console.log("  P - Show current phase info (debug only)"),console.log("  U - Show selectable units info (debug only)"),console.log("  L - Force recalculate unit limit (debug only)"),console.log("  SHIFT+D - Simulate unit death (debug only)"),console.log("  CTRL+R - Reset turn manager (debug only)"),console.log("  SHIFT+R - Force new round (debug only)"))}let ct=null,ne=null;function wg(i,e){const t=()=>{const l=e.querySelector("canvas");e.contains(l)&&ag();const c=i.querySelector("#player-resource-display-game-scene");c&&i.removeChild(c);const d=i.querySelector("#tile-coords-display-game-scene");d&&i.removeChild(d);const h=i.querySelector("#game-info-panel");h&&i.removeChild(h);const u=i.querySelector("#debug-mode-display-game-scene");u&&i.removeChild(u);const p=i.querySelector("#turn-display-game-scene");p&&i.removeChild(p);const g=i.querySelector("#phase-display-game-scene");g&&i.removeChild(g);const _=i.querySelector("#round-display-game-scene");_&&i.removeChild(_);const m=i.querySelector("#actionable-unit-limit-display-game-scene");for(m&&i.removeChild(m),ct&&(ct=null),ne&&(ne=null),Zm(),bg();i.firstChild;)i.removeChild(i.firstChild);i.style.display="flex",i.style.justifyContent="center",i.style.alignItems="center"},n=()=>{console.log("Proceeding to game scene..."),$o(),t(),i.appendChild(e),sg(e).then(()=>{const l=document.createElement("div");if(l.id="player-resource-display-game-scene",l.textContent=`Resource: ${jn.resource}`,l.style.position="absolute",l.style.bottom="20px",l.style.left="20px",l.style.padding="10px 15px",l.style.backgroundColor="#1a1a1a",l.style.color="#f1c40f",l.style.borderRadius="5px",l.style.fontSize="1em",l.style.fontWeight="bold",l.style.fontFamily="sans-serif",l.style.zIndex="100",i.appendChild(l),ct=document.createElement("div"),ct.id="tile-coords-display-game-scene",ct.style.position="absolute",ct.style.top="10px",ct.style.left="10px",ct.style.color="white",ct.style.fontFamily="sans-serif",ct.style.backgroundColor="rgba(0,0,0,0.5)",ct.style.padding="5px",ct.innerText="Coords: N/A",ct.style.zIndex="100",i.appendChild(ct),Dt()){const p=document.createElement("div");p.id="debug-mode-display-game-scene",p.textContent=`DEBUG MODE: ${lg()}`,p.style.position="absolute",p.style.top="10px",p.style.right="10px",p.style.padding="8px 12px",p.style.backgroundColor="#e74c3c",p.style.color="white",p.style.borderRadius="5px",p.style.fontSize="0.9em",p.style.fontWeight="bold",p.style.fontFamily="sans-serif",p.style.zIndex="100",p.style.border="2px solid #c0392b",p.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(p)}Km(i),ne=Dl();const c=document.createElement("div");c.id="turn-display-game-scene",c.textContent=ta(ne),c.style.position="absolute",c.style.top="50px",c.style.left="10px",c.style.padding="8px 12px",c.style.backgroundColor="rgba(52, 152, 219, 0.9)",c.style.color="white",c.style.borderRadius="5px",c.style.fontSize="0.9em",c.style.fontWeight="bold",c.style.fontFamily="sans-serif",c.style.zIndex="100",c.style.border="2px solid #2980b9",c.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(c);const d=document.createElement("div");d.id="phase-display-game-scene",d.textContent="Phase: Select",d.style.position="absolute",d.style.top="90px",d.style.left="10px",d.style.padding="8px 12px",d.style.backgroundColor="rgba(46, 204, 113, 0.9)",d.style.color="white",d.style.borderRadius="5px",d.style.fontSize="0.9em",d.style.fontWeight="bold",d.style.fontFamily="sans-serif",d.style.zIndex="100",d.style.border="2px solid #27ae60",d.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(d);const h=document.createElement("div");if(h.id="round-display-game-scene",h.textContent="Round 1",h.style.position="absolute",h.style.top="130px",h.style.left="10px",h.style.padding="8px 12px",h.style.backgroundColor="rgba(155, 89, 182, 0.9)",h.style.color="white",h.style.borderRadius="5px",h.style.fontSize="0.9em",h.style.fontWeight="bold",h.style.fontFamily="sans-serif",h.style.zIndex="100",h.style.border="2px solid #8e44ad",h.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(h),Dt()){const p=document.createElement("div");p.id="actionable-unit-limit-display-game-scene",p.textContent="Actionable Unit Limit: 0",p.style.position="absolute",p.style.top="170px",p.style.left="10px",p.style.padding="8px 12px",p.style.backgroundColor="rgba(230, 126, 34, 0.9)",p.style.color="white",p.style.borderRadius="5px",p.style.fontSize="0.9em",p.style.fontWeight="bold",p.style.fontFamily="sans-serif",p.style.zIndex="100",p.style.border="2px solid #d35400",p.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)",i.appendChild(p)}Tg(),Dt()&&Ag();const u=fg();if(u){console.log("Loading selected globe into game scene:",u);const p=new $m;window.GAME_SCENE_INSTANCE=p,p.setSelectedGlobe(u).then(()=>{console.log("✅ Globe loaded successfully")}).catch(g=>{console.error("❌ Failed to load globe:",g)}),pg()}}).catch(l=>{console.error("Failed to start game:",l),e.innerHTML='<p style="color: red; text-align: center; font-family: sans-serif; padding: 20px;">Error: Could not load the game. Please check the console for more details.</p>'})},r=()=>{console.log("Transitioning to encounter scene..."),t(),mg(i,n)},s=()=>{console.log("Transitioning to shop scene..."),t(),qo(i,r)};return{proceedToGameScene:n,handleDisplayShop:s,handleDisplaySquadInventory:()=>{console.log("Transitioning to Squad/Inventory scene..."),t(),qs(i,r,s)},handleDisplayEncounter:r,showSplash:()=>{console.log("Showing splash screen..."),cg(i,s)}}}async function Ho(){const{appContainer:i,gameSpecificContainer:e}=await fc();wg(i,e).showSplash()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>ha(Ho)):ha(Ho);
