let total = document.getElementById("total");
let interview = document.getElementById("total-interview");
let rejected = document.getElementById("total-rejected");

let interviewList = [];
let rejectedList = [];

let currentStatus = "all-btn";
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");

let main = document.querySelector("main");
let cards = document.getElementById("card");
let filteredcards = document.getElementById("filtered-cards");
let noJob = document.getElementById("no-job");
let totalJobs = document.getElementById("total-jobs");

function count() {
  total.innerText = cards.children.length;
  if(currentStatus === "all-btn"){
    totalJobs.innerText = `${cards.children.length} jobs`;
  }
  interview.innerText = interviewList.length;
  rejected.innerText = rejectedList.length;
}

count();

function toggleButton(id) {
  allBtn.classList.add("bg-white", "text-[#64748B]");
  interviewBtn.classList.add("bg-white", "text-[#64748B]");
  rejectedBtn.classList.add("bg-white", "text-[#64748B]");

  allBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedBtn.classList.remove("bg-[#3B82F6]", "text-white");

  const selectBtn = document.getElementById(id);
  currentStatus = id;

  selectBtn.classList.remove("bg-white", "text-[#64748B]");
  selectBtn.classList.add("bg-[#3B82F6]", "text-white");

  if (id === "all-btn") {
    cards.classList.remove("hidden");
    filteredcards.classList.add("hidden");
    noJob.classList.add("hidden");
    totalJobs.innerText = `${cards.children.length} jobs`;

    if (cards.children.length === 0) {
        noJob.classList.remove("hidden");
    }


  } else if (id === "interview-btn") {
    cards.classList.add("hidden");
    filteredcards.classList.remove("hidden");
    showInterview();
  }  else if (id === "rejected-btn") {
    cards.classList.add("hidden");
    filteredcards.classList.remove("hidden");
    showRejected();
  } 
}

main.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parent = event.target.closest(".card-container");
    const companyName = parent.querySelector(".company-name").innerText;
    const position = parent.querySelector(".position").innerText;
    const info = parent.querySelector(".info").innerText;
    const notAppliedBtn = parent.querySelector(".not-applied-btn");
    const details = parent.querySelector(".details").innerText;


    const jobInfo = {
      companyName,
      position,
      info,
      status: "INTERVIEW",
      details,
    };

    const interviewExist = interviewList.find((item=> item.companyName === jobInfo.companyName));
    parent.querySelector(".not-applied-btn").innerText = "INTERVIEW";
    notAppliedBtn.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]", "bg-[#EF4444]", "text-white");
    notAppliedBtn.classList.add("bg-[#10B981]", "text-white");

    if (!interviewExist) {
      interviewList.push(jobInfo);
    }
    
    rejectedList = rejectedList.filter((item=> item.companyName !== jobInfo.companyName));
    if(currentStatus === "rejected-btn"){
      showRejected();
    }
    count();
  }
  else if (event.target.classList.contains("rejected-btn")) {
    const parent = event.target.closest(".card-container");
    const companyName = parent.querySelector(".company-name").innerText;
    const position = parent.querySelector(".position").innerText;
    const info = parent.querySelector(".info").innerText;
    const notAppliedBtn = parent.querySelector(".not-applied-btn");
    const details = parent.querySelector(".details").innerText;
    // const interviewBtn  = parent.querySelector(".interview-btn");
    // const rejectedBtn  = parent.querySelector(".rejected-btn");

    const jobInfo = {
      companyName,
      position,
      info,
      status: "REJECTED",
      details,
    };

    const rejectExist = rejectedList.find((item=> item.companyName === jobInfo.companyName));
    parent.querySelector(".not-applied-btn").innerText = "REJECTED";
    notAppliedBtn.classList.remove("bg-[#EEF4FF]", "text-[#002C5C]");
    notAppliedBtn.classList.add("bg-[#EF4444]", "text-white");

    if (!rejectExist) {
      rejectedList.push(jobInfo);
    }
    interviewList = interviewList.filter((item=> item.companyName !== jobInfo.companyName));

    if(currentStatus === "interview-btn"){
      showInterview();
    }
    count();
  }


const deleteBtn = event.target.closest(".delete-btn");

if (deleteBtn) {
    const parent = deleteBtn.closest(".card-container");
    const companyName = parent.querySelector(".company-name").innerText;

    if (currentStatus === "all-btn") {
        parent.remove();
        
        interviewList = interviewList.filter(item=> item.companyName !== companyName);
        rejectedList = rejectedList.filter(item=> item.companyName !== companyName);
    } else {
        const allTabCards = cards.querySelectorAll(".card-container");
        allTabCards.forEach(card=> {if (card.querySelector(".company-name").innerText === companyName){
                const statusBtn = card.querySelector(".not-applied-btn");
                statusBtn.innerText = "NOT APPLIED";
                statusBtn.className = "not-applied-btn bg-[#EEF4FF] p-2 text-[14px] mb-2 rounded-sm font-semibold text-[#002C5C]";
            }
        });

        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        if(currentStatus==="interview-btn")
        {
            showInterview();
        } 
        else if(currentStatus==="rejected-btn"){
          showRejected();
        } 
    }

    if (cards.children.length === 0) {
        noJob.classList.remove("hidden");
    }
    count();
}
        
});

function showInterview() {
  filteredcards.innerHTML = "";
  totalJobs.innerText = `${interviewList.length} of ${cards.children.length} jobs`;
  if (interviewList.length === 0) {
    cards.classList.add("hidden");
    noJob.classList.remove("hidden");

  } else {
    noJob.classList.add("hidden");
    filteredcards.innerHTML = "";
    for (let i of interviewList) {
      let div = document.createElement("div");
      div.className = "card-container bg-white p-6 flex justify-between border-l-4 border-[#10B981] shadow-sm";
      div.innerHTML = `
          <div class="left">
            <div>
              <h3 class="company-name text-[#002C5C] font-semibold text-[18px]">${i.companyName}</h3>
              <p class="position text-[#64748B] text-[16px] mb-5">${i.position}</p>
              <p class="info text-[#64748B] text-[14px] mb-5">${i.info}</p>
            </div>

            <!-- Status -->
            <div class="mb-5">
                <button class="not-applied-btn bg-[#10B981] p-2 text-[14px] mb-2 rounded-sm font-semibold text-white">${i.status}</button>
                <p class="details text-[#323B49] text-[14px]">Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.</p>
            </div>

            <!-- Buttons -->
             <div class="flex gap-2">
                <button class="interview-btn text-[#10B981] font-semibold border px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 hover:text-white">INTERVIEW</button>
                <button class="rejected-btn text-[#EF4444] font-semibold border px-2 py-2 rounded-sm cursor-pointer hover:bg-red-500 hover:text-white">REJECTED</button>
             </div>
          </div>

          <div class="right">
            <button class="delete-btn cursor-pointer"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" fill="white" stroke="#F1F2F4"/>
            <path d="M21.5 11H19V10.5C19 10.1022 18.842 9.72064 18.5607 9.43934C18.2794 9.15804 17.8978 9 17.5 9H14.5C14.1022 9 13.7206 9.15804 13.4393 9.43934C13.158 9.72064 13 10.1022 13 10.5V11H10.5C10.3674 11 10.2402 11.0527 10.1464 11.1464C10.0527 11.2402 10 11.3674 10 11.5C10 11.6326 10.0527 11.7598 10.1464 11.8536C10.2402 11.9473 10.3674 12 10.5 12H11V21C11 21.2652 11.1054 21.5196 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22H20C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21V12H21.5C21.6326 12 21.7598 11.9473 21.8536 11.8536C21.9473 11.7598 22 11.6326 22 11.5C22 11.3674 21.9473 11.2402 21.8536 11.1464C21.7598 11.0527 21.6326 11 21.5 11ZM14 10.5C14 10.3674 14.0527 10.2402 14.1464 10.1464C14.2402 10.0527 14.3674 10 14.5 10H17.5C17.6326 10 17.7598 10.0527 17.8536 10.1464C17.9473 10.2402 18 10.3674 18 10.5V11H14V10.5ZM20 21H12V12H20V21ZM15 14.5V18.5C15 18.6326 14.9473 18.7598 14.8536 18.8536C14.7598 18.9473 14.6326 19 14.5 19C14.3674 19 14.2402 18.9473 14.1464 18.8536C14.0527 18.7598 14 18.6326 14 18.5V14.5C14 14.3674 14.0527 14.2402 14.1464 14.1464C14.2402 14.0527 14.3674 14 14.5 14C14.6326 14 14.7598 14.0527 14.8536 14.1464C14.9473 14.2402 15 14.3674 15 14.5ZM18 14.5V18.5C18 18.6326 17.9473 18.7598 17.8536 18.8536C17.7598 18.9473 17.6326 19 17.5 19C17.3674 19 17.2402 18.9473 17.1464 18.8536C17.0527 18.7598 17 18.6326 17 18.5V14.5C17 14.3674 17.0527 14.2402 17.1464 14.1464C17.2402 14.0527 17.3674 14 17.5 14C17.6326 14 17.7598 14.0527 17.8536 14.1464C17.9473 14.2402 18 14.3674 18 14.5Z" fill="#64748B"/></svg>
            </button>
          </div>
        </div>
            `;
      filteredcards.appendChild(div);
    }
  }
}

function showRejected() {
  filteredcards.innerHTML = "";
  totalJobs.innerText = `${rejectedList.length} of ${cards.children.length} jobs`;
  if (rejectedList.length === 0) {
    cards.classList.add("hidden");
    noJob.classList.remove("hidden");
    
  } else {
    noJob.classList.add("hidden");
    filteredcards.innerHTML = "";
    for (let j of rejectedList) {
      let div = document.createElement("div");
      div.className = "card-container bg-white p-6 flex justify-between  border-l-4 border-[#EF4444] shadow-sm";
      div.innerHTML = `
          <div class="left">
            <div>
              <h3 class="company-name text-[#002C5C] font-semibold text-[18px]">${j.companyName}</h3>
              <p class="position text-[#64748B] text-[16px] mb-5">${j.position}</p>
              <p class="info text-[#64748B] text-[14px] mb-5">${j.info}</p>
            </div>

            <!-- Status -->
            <div class="mb-5">
                <button class="not-applied-btn bg-[#EF4444] p-2 text-[14px] mb-2 rounded-sm font-semibold text-white">${j.status}</button>
                <p class="details text-[#323B49] text-[14px]">Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.</p>
            </div>

            <!-- Buttons -->
             <div class="flex gap-2">
                <button class="interview-btn text-[#10B981] font-semibold border px-2 py-2 rounded-sm cursor-pointer hover:bg-green-600 hover:text-white">INTERVIEW</button>
                <button class="rejected-btn text-[#EF4444] font-semibold border px-2 py-2 rounded-sm cursor-pointer hover:bg-red-500 hover:text-white">REJECTED</button>
             </div>
          </div>

          <div class="right">
            <button class="delete-btn cursor-pointer"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" fill="white" stroke="#F1F2F4"/>
            <path d="M21.5 11H19V10.5C19 10.1022 18.842 9.72064 18.5607 9.43934C18.2794 9.15804 17.8978 9 17.5 9H14.5C14.1022 9 13.7206 9.15804 13.4393 9.43934C13.158 9.72064 13 10.1022 13 10.5V11H10.5C10.3674 11 10.2402 11.0527 10.1464 11.1464C10.0527 11.2402 10 11.3674 10 11.5C10 11.6326 10.0527 11.7598 10.1464 11.8536C10.2402 11.9473 10.3674 12 10.5 12H11V21C11 21.2652 11.1054 21.5196 11.2929 21.7071C11.4804 21.8946 11.7348 22 12 22H20C20.2652 22 20.5196 21.8946 20.7071 21.7071C20.8946 21.5196 21 21.2652 21 21V12H21.5C21.6326 12 21.7598 11.9473 21.8536 11.8536C21.9473 11.7598 22 11.6326 22 11.5C22 11.3674 21.9473 11.2402 21.8536 11.1464C21.7598 11.0527 21.6326 11 21.5 11ZM14 10.5C14 10.3674 14.0527 10.2402 14.1464 10.1464C14.2402 10.0527 14.3674 10 14.5 10H17.5C17.6326 10 17.7598 10.0527 17.8536 10.1464C17.9473 10.2402 18 10.3674 18 10.5V11H14V10.5ZM20 21H12V12H20V21ZM15 14.5V18.5C15 18.6326 14.9473 18.7598 14.8536 18.8536C14.7598 18.9473 14.6326 19 14.5 19C14.3674 19 14.2402 18.9473 14.1464 18.8536C14.0527 18.7598 14 18.6326 14 18.5V14.5C14 14.3674 14.0527 14.2402 14.1464 14.1464C14.2402 14.0527 14.3674 14 14.5 14C14.6326 14 14.7598 14.0527 14.8536 14.1464C14.9473 14.2402 15 14.3674 15 14.5ZM18 14.5V18.5C18 18.6326 17.9473 18.7598 17.8536 18.8536C17.7598 18.9473 17.6326 19 17.5 19C17.3674 19 17.2402 18.9473 17.1464 18.8536C17.0527 18.7598 17 18.6326 17 18.5V14.5C17 14.3674 17.0527 14.2402 17.1464 14.1464C17.2402 14.0527 17.3674 14 17.5 14C17.6326 14 17.7598 14.0527 17.8536 14.1464C17.9473 14.2402 18 14.3674 18 14.5Z" fill="#64748B"/></svg>
            </button>
          </div>
        </div>
            `;
      filteredcards.appendChild(div);
    }
  }
}

