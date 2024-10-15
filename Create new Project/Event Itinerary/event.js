// Add the JavaScript code here
document.querySelectorAll('.timeline-item').forEach(item => {
    const timeDiv = item.querySelector('.time');
    const descriptionDiv = item.querySelector('.description');

    // Create the dotted line element
    const dottedLine = document.createElement('div');
    dottedLine.className = 'dotted-line';
    
    // Insert the dotted line after the time
    item.insertBefore(dottedLine, descriptionDiv);
});

// Add hover effect
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    const time = item.querySelector('.time span[contenteditable="true"]');
    const description = item.querySelector('.description h3');

    const makeEditable = (element) => {
        element.contentEditable = "true";
        element.focus();
    };

    time.addEventListener('mouseenter', () => makeEditable(time));
    time.addEventListener('mouseleave', () => { time.contentEditable = "false"; });
    description.addEventListener('mouseenter', () => makeEditable(description));
    description.addEventListener('mouseleave', () => { description.contentEditable = "false"; });
});

// Add task
document.getElementById('addTaskButton').addEventListener('click', function() {
    const newTask = document.createElement('div');
    newTask.classList.add('timeline-item');

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.innerHTML = '<i class="fas fa-tasks"></i>';

    const time = document.createElement('div');
    time.classList.add('time');
    time.innerHTML = '<span contenteditable="true">00:00</span> <span contenteditable="true">am</span>';

    const dottedLine = document.createElement('div');
    dottedLine.classList.add('dotted-line');

    const description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = '<h3 contenteditable="true">Add something</h3>';

    newTask.appendChild(icon);
    newTask.appendChild(time);
    newTask.appendChild(dottedLine);
    newTask.appendChild(description);

    document.getElementById('timelineContainer').appendChild(newTask);
});

// Convert time to 24-hour format
function convertTimeTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier.toLowerCase() === 'pm' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier.toLowerCase() === 'am' && hours === '12') {
        hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
}

// Sort timeline items based on time
function sortTimelineItems() {
    const timelineContainer = document.getElementById('timelineContainer');
    const items = Array.from(timelineContainer.getElementsByClassName('timeline-item'));

    items.sort((a, b) => {
        // Extract time and modifier for both items
        const timeA = a.querySelector('.time span').textContent.trim();
        const modifierA = a.querySelector('.time span:nth-child(2)').textContent.trim();
        const timeB = b.querySelector('.time span').textContent.trim();
        const modifierB = b.querySelector('.time span:nth-child(2)').textContent.trim();

        // Construct full time strings
        const timeStrA = `${timeA} ${modifierA}`;
        const timeStrB = `${timeB} ${modifierB}`;

        // Convert to 24-hour format
        const time24A = convertTimeTo24Hour(timeStrA);
        const time24B = convertTimeTo24Hour(timeStrB);

        // Debugging: Log the times being compared
        console.log(`Comparing: ${time24A} with ${time24B}`);

        return time24A.localeCompare(time24B);
    });

    // Clear the timeline container and append sorted items
    timelineContainer.innerHTML = '';
    items.forEach(item => timelineContainer.appendChild(item));
}

// Sort button click event
document.getElementById('sortButton').addEventListener('click', function() {
    sortTimelineItems();
});


// Sort timeline items based on time
function sortTimelineItems() {
    const timelineContainer = document.getElementById('timelineContainer');
    const items = Array.from(timelineContainer.getElementsByClassName('timeline-item'));

    items.sort((a, b) => {
        const timeA = a.querySelector('.time span').textContent.trim();
        const modifierA = a.querySelector('.time span:nth-child(2)').textContent.trim();
        const timeB = b.querySelector('.time span').textContent.trim();
        const modifierB = b.querySelector('.time span:nth-child(2)').textContent.trim();

        const timeStrA = `${timeA} ${modifierA}`;
        const timeStrB = `${timeB} ${modifierB}`;

        const time24A = convertTimeTo24Hour(timeStrA);
        const time24B = convertTimeTo24Hour(timeStrB);

        // Debugging: Log the times being compared
        console.log(`Comparing: ${timeStrA} (${time24A}) with ${timeStrB} (${time24B})`);

        return time24A.localeCompare(time24B);
    });

    // Clear the timeline container and append sorted items
    timelineContainer.innerHTML = '';
    items.forEach(item => timelineContainer.appendChild(item));
}




















 document.querySelectorAll('.icon').forEach(icon => {
            icon.addEventListener('click', function() {
                document.getElementById('iconPickerModal').style.display = 'block';
            });
        });

        // Close the modal when the 'x' is clicked
        document.querySelector('.close').addEventListener('click', function() {
            document.getElementById('iconPickerModal').style.display = 'none';
        });

        // Close the modal when clicking outside of the modal
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('iconPickerModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        // Handle icon selection
        document.querySelectorAll('.icon-option').forEach(option => {
            option.addEventListener('click', function() {
                const selectedIcon = this.getAttribute('data-icon');
                const timelineItem = this.closest('.timeline-item');
                timelineItem.querySelector('.icon').innerHTML = `<i class="${selectedIcon}"></i>`;
                document.getElementById('iconPickerModal').style.display = 'none';
            });
        });
 