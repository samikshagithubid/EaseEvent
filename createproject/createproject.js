document.getElementById('create-project-btn').addEventListener('click', function() {
    const projectName = prompt("Enter the project name:");
    if (projectName) {
        addProject(projectName);
    }
});

function addProject(name) {
    const projectContainer = document.getElementById('projects-container');
    
    const projectDiv = document.createElement('div');
    projectDiv.className = 'bg-white rounded-lg shadow-lg p-6 w-48';

    const projectContent = `
        <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gray-200 rounded-t-lg mb-4"></div>
            <p class="text-purple-500 mb-2">${name}</p>
            <button class="text-gray-500 text-sm" onclick="showDetails('${name}')">View Details</button>
        </div>
    `;
    
    projectDiv.innerHTML = projectContent;
    projectContainer.appendChild(projectDiv);
}

function showDetails(name) {
    document.getElementById('project-title').innerText = name;
    document.getElementById('project-details').classList.remove('hidden');
    
    document.getElementById('complete-project-btn').onclick = function() {
        markAsComplete(name);
    };
}

function markAsComplete(name) {
    alert(`${name} has been marked as complete!`);
    document.getElementById('project-details').classList.add('hidden');
}
