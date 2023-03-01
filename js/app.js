// step 1
const loadPhone = (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneData(data.data, datalimit))
}


const displayPhoneData = (phones, datalimit) => {
    // step 2
    const phoneContainer = document.getElementById('phones_container');
    phoneContainer.innerHTML = '';
    // console.log(phones.data[0]);
    // step 3
    // show 10 item 
    const showAllBtn = document.getElementById('showAll');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none')
    }
    else{
        showAllBtn.classList.add('d-none')
    }
    // no phone display 
    const noPhoneFound = document.getElementById('no-phoneFound')
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none');
    }
    else{
        noPhoneFound.classList.add('d-none');
    }

    // phone display
    phones.forEach((phone) =>{
        // console.log(phone)
        // step 4
        const phoneDiv = document.createElement('div')
        phoneDiv.innerHTML = `
        
        <div class="col">
            <div class="card p-3">
                <div style="width: 80%">
                    <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
        </div>
        `;
        // step 5
        phoneContainer.appendChild(phoneDiv);
    })
    searchLoad(false);
}

// search process 
const searchProcess = (datalimit) => {
    searchLoad(true);
    // search field 
    const searchText = document.getElementById('search_field').value;
    loadPhone(searchText, datalimit);
}

// search function
const searchPhone = () => {
    searchProcess(10);
}

// start loader
const searchLoad = (isLoad) => {
    const searchLoader = document.getElementById('searchLoader');
    if(isLoad){
        searchLoader.classList.remove('d-none');
    }
    else{
        searchLoader.classList.add('d-none');
    }
}

// not the best way to load show all 
document.getElementById('btnShowAll').addEventListener('click', function(){
    searchProcess();
})


// enter key hendler 
document.getElementById('search_field').addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        searchProcess();
    }
});

// show phone details
const loadPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data));
}

const displayModal = (phone) => {
    console.log(phone);
    const phoneDetailsModalTitle = document.getElementById('phoneDetailsModalTitle');
    phoneDetailsModalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
    <div class="text-center"><img class="img-fluid" src="${phone.image}"></div><br><br>
    
    
    <h5 class="mb-3">Released Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</h5>
    <h5 class="mb-3">Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "No data found storage"}</h5>
    <h5 class="mb-3">Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : "No data found memory"}</h5>
    <h5 class="mb-3">ChipSet: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : "No data found chipSet"}</h5>
    
    
    `
}
