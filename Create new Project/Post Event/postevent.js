const { jsPDF } = window.jspdf;
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const uploadButton = document.getElementById('uploadButton');
const downloadPDFButton = document.getElementById('downloadPDF');
const commentInput = document.getElementById('commentInput');

// Handle image uploads
uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    imageContainer.innerHTML = ''; // Clear previous images

    if (files.length === 0) {
        alert("Please select files to upload.");
        return;
    }

    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 20 * 1024 * 1024) { // Check for file size
            alert(`File size should be less than 20MB for file: ${files[i].name}`);
            continue;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('image-preview');
            imgDiv.style.margin = '10px';
            imgDiv.innerHTML = `<img src="${event.target.result}" alt="Uploaded Image" style="max-width: 100%; height: auto;">`;
            imageContainer.appendChild(imgDiv);
        };
        reader.readAsDataURL(files[i]);
    }
});

// Generate PDF with comments and images
downloadPDFButton.addEventListener('click', () => {
    const pdf = new jsPDF();
    pdf.text("Post-Event Photo Uploads", 10, 10);
    pdf.text(`Comment: ${commentInput.value}`, 10, 20);

    const images = imageContainer.getElementsByTagName('img');
    let y = 30; // Starting position for images
    const imgWidth = 50; // Width of the image in PDF
    const imgHeight = 50; // Height of the image in PDF

    for (let img of images) {
        const imgData = img.src;
        // Add image to PDF
        pdf.addImage(imgData, 'JPEG', 10, y, imgWidth, imgHeight);
        y += imgHeight + 10; // Space out images vertically (10 units apart)
    }

    // Save the generated PDF
    pdf.save("post_event_photos.pdf");
});