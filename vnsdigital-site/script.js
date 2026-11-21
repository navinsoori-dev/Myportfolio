const API_URL="https://vns-digital-api.vnsdigital-rome.workers.dev";
const menuButton=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
menuButton?.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});
navLinks?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{navLinks.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");}));
document.querySelector("#year").textContent=new Date().getFullYear();
const workflowTemplates={
 hospitality:{
  leads:[["New enquiry received","Website form, email or booking channel"],["AI sorts the request","Identify topic, urgency and key details"],["Team gets a clear task","Send the right details to the right person"],["Follow-up is prepared","Create a reminder and track the response"]],
  reports:[["Collect weekly activity","Bring bookings, sales and feedback together"],["AI summarises the signals","Highlight changes and recurring themes"],["Create the weekly snapshot","Prepare a readable management report"],["Send to the team","Deliver the report on the agreed schedule"]],
  content:[["Add the campaign brief","Capture offer, audience and key details"],["AI drafts content ideas","Prepare caption and post variations"],["Review and approve","A person checks accuracy and brand voice"],["Schedule approved content","Move final copy to your publishing process"]]
 },
 agency:{
  leads:[["New client enquiry arrives","Capture contact details and project request"],["AI extracts the brief","Summarise scope, needs and urgency"],["Create a CRM opportunity","Assign an owner and next action"],["Prepare a personal reply","Draft a follow-up for human approval"]],
  reports:[["Gather project updates","Collect tasks, milestones and time entries"],["AI creates a summary","Surface blockers, wins and overdue items"],["Build the client report","Format progress into a clear update"],["Notify the project lead","Share the report and follow-up tasks"]],
  content:[["Capture the content brief","Store audience, channel and campaign goal"],["AI creates first drafts","Generate structured copy options"],["Editorial review","Check facts, tone and client approval"],["Publish-ready handoff","Send approved assets to the content calendar"]]
 },
 ecommerce:{
  leads:[["Customer question arrives","Capture the message and order reference"],["AI classifies the request","Identify delivery, returns or product question"],["Route to the right queue","Send priority issues to a human agent"],["Prepare a response draft","Suggest a reply for review before sending"]],
  reports:[["Collect store metrics","Orders, refunds, products and support data"],["AI spots patterns","Summarise sales movements and issues"],["Prepare performance digest","Create a weekly store snapshot"],["Send owner notification","Deliver the report and key actions"]],
  content:[["Choose product and audience","Collect product facts and promotion details"],["AI drafts product content","Prepare descriptions and campaign angles"],["Check product claims","Review pricing, availability and accuracy"],["Send for approval","Hand approved content to your store team"]]
 },
 services:{
  leads:[["Request is captured","Collect enquiry and preferred contact method"],["AI structures the request","Summarise need, deadline and service type"],["Assign the next step","Create a task for the right team member"],["Prepare a follow-up","Draft a reply and track the status"]],
  reports:[["Gather operational updates","Collect cases, tasks and delivery milestones"],["AI summarises progress","Highlight workload and outstanding items"],["Create an overview","Format the key figures and decisions"],["Share with stakeholders","Send a scheduled update to the team"]],
  content:[["Define the subject","Add expertise, audience and intended outcome"],["AI prepares a draft","Create a first version from supplied notes"],["Expert review","Check accuracy and professional judgement"],["Approve and distribute","Send final material to the selected channel"]]
 }
};
const taskLabels={leads:"Enquiry follow-up",reports:"Weekly reporting",content:"AI-assisted content"};
document.querySelector("#run-demo")?.addEventListener("click",()=>{
 const business=document.querySelector("#business-type").value;
 const task=document.querySelector("#task-type").value;
 const steps=workflowTemplates[business][task];
 const result=document.querySelector("#workflow-result");
 result.innerHTML='<div class="flow-steps">'+steps.map((step,i)=>'<div class="flow-step"><span>'+(i+1).toString().padStart(2,"0")+'</span><div><b>'+step[0]+'</b><small>'+step[1]+'</small></div><em>'+(i===1?"AI ASSIST":i===2?"HUMAN CHECK":"STEP")+'</em></div>').join("")+'</div><div class="flow-summary"><span>Sample: '+taskLabels[task]+'</span><strong>Concept generated ✓</strong></div>';
});
const form=document.querySelector("#project-form");
form?.addEventListener("submit",async event=>{
 event.preventDefault();
 const button=form.querySelector("button[type=submit]");
 const message=document.querySelector("#form-message");
 const data=new FormData(form);
 const payload=Object.fromEntries(data.entries());
 if(!data.get("consent")){message.textContent="Please confirm the privacy notice before sending.";message.classList.add("error");return;}
 button.disabled=true;button.querySelector(".submit-text").textContent="Sending…";message.textContent="";message.classList.remove("error");
 try{
  const response=await fetch(API_URL+"/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const result=await response.json();
  if(!response.ok)throw new Error(result.error||"Please try again.");
  message.textContent="Thank you — your enquiry has been received. We'll be in touch.";
  form.reset();
 }catch(error){
  message.textContent=error.message==="Failed to fetch"?"We couldn't connect just now. Please email vnsdigital.rome@gmail.com.":error.message;
  message.classList.add("error");
 }finally{button.disabled=false;button.querySelector(".submit-text").textContent="Send enquiry";}
});