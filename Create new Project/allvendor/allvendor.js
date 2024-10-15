document.getElementById('add-vendor-btn').addEventListener('click', function() {
    const vendorName = prompt("Enter the vendor name:");
    const vendorType = prompt("Enter the vendor type (e.g., Wedding Planner):");
    const vendorLocation = prompt("Enter the vendor location (e.g., Destination):");

    if (vendorName && vendorType && vendorLocation) {
        addVendor(vendorName, vendorType, vendorLocation);
    }
});

function addVendor(name, type, location) {
    const vendorsContainer = document.getElementById('vendors-container');
    
    const vendorDiv = document.createElement('div');
    vendorDiv.className = 'bg-white shadow-md rounded-lg overflow-hidden w-1/4';

    const vendorContent = `
        <img alt="${name}" class="w-full h-40 object-cover" src="https://via.placeholder.com/300x200.png?text=${name.replace(/ /g, '+')}"/>
        <div class="p-4">
            <span class="block text-sm text-purple-600 mb-1">${location}</span>
            <span class="block text-sm font-medium mb-1">${type}</span>
            <span class="block text-sm font-semibold">${name}</span>
        </div>
    `;
    
    vendorDiv.innerHTML = vendorContent;
    vendorsContainer.insertBefore(vendorDiv, vendorsContainer.lastChild); // Insert before the add vendor button
}

document.getElementById('hide-vendors-btn').addEventListener('click', function() {
    const recommendedVendors = document.querySelectorAll('.recommended');
    recommendedVendors.forEach(vendor => vendor.style.display = 'none');
});

document.getElementById('add-custom-vendor-btn').addEventListener('click', function() {
    const vendorName = prompt("Enter custom vendor name:");
    if (vendorName) {
        alert(`${vendorName} has been added to your list of vendors!`);
    }
});

document.getElementById('copy-invite-link-btn').addEventListener('click', function() {
    const inviteLink = "https://yourinvitelink.com"; // Replace with actual invite link
    navigator.clipboard.writeText(inviteLink).then(() => {
        alert("Invite link copied to clipboard!");
    });
});

document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const pdfContent = "List of Vendors"; // You can customize this content
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendors.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
