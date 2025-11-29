let fleetData=[];
const sampleVehicleImage="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
function renderFleetCards(dataTorender){
    const container=document.getElementById('fleet-cards-container');
    const nodataMessage=document.getElementById('no-data-message')
    container.innerHTML='';
    if (dataTorender.length===0){
        nodataMessage.style.display='block'
        return
    }
    nodataMessage.style.display='none'
    dataTorender.forEach((vehicle,index)=>{
        const card=document.createElement('div');
        card.className='fleet-card'
        card.setAttribute('data-id','vehicle.id')
        const statusClass=vehicle.isAvailable==='Available'?'available':'unavailable';
        card.innerHTML=`<img src="${sampleVehicleImage} " alt="${vehicle.category} vehicle">
        <p><strong>Reg No:</strong>${vehicle.regNo}</p><br><br>
        <p><strong>Category:</strong>${vehicle.category}</p><br><br>
        <p><strong>Driver:</strong><span id="driver-name-${vehicle.id}">${vehicle.driverName || 'N/A'}</span></p>
        <p><strong>Status:</strong><span class="status${statusClass}" id="vavilability-status=${vehicle.id}">${vehicle.isAvailable}</span></p>
        <div class="card-buttons">
        <button class="update-driver-btn" data-id="${vehicle.id}">Update Driver</button>
        <button class="change-availability-btn" data-id="${vehicle.id}">Change Availability</button>
        <button class="delete-vehicle-btn" data-id="${vehicle.id}">Delete vehicle</button>`;
        container.appendChild(card);

    })
}
document.getElementById("fleet-form").addEventListener('submit',function(event)){
    event.preventDefault();
    const regNo=document.getElementById('reg-no').value.trim();
    const category=document.getElementById('category').value;
    const driverName=document.getElementById('driver-name').value.trim();
    const isAvailable=document.getElementById('availability').value;
    if (!regNo || !category){
        alert("Reg No Vehicle and Category are required fields")
        return;
    }
    const newVehicle={
        id:Date.now(),
        regNo:regNo,
        category:category,
        driverName:driverName,
        isAvailable:isAvailable
    };
    fleetData.push(newVehicle);
    document.getElementById('fleet-form').reset();
    document.getElementById('availability').value='Available';
    applyFilters();
}
function applyFilters(){
    const selectedCategory=document.getElementById('category-filter').value;
    const selectedAvailability=document.getElementById('availability-filter').value;
    let filteredData=fleetData.filter(vehicle=>{
        const match=(selectedCategory==='All' || vehicle.category===selectedCategory)
        const matchavailable=(selectedAvailability==='All' || vehicle.isAvailable===selectedAvailability);
        return match&& matchavailable
    })
    renderFleetCards(filteredData)
}
document.getElementById('catergory-filter').addEventListener('change',applyFilters);
document.getElementById('availability-filter').addEventListener('change',applyFilters)
document.getElementById('clear-filter-btn').addEventListener('click',function(){
    document.getElementById('category-filter').value='All'

})
