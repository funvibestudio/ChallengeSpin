let participants = [];
let items = [];
let maxElements = 5;
let currentParticipantIndex = 0;
let elementsPerParticipant = [];

function addParticipant() {
    const participantName = document.getElementById('participant-name').value;
    if (participantName) {
        participants.push(participantName);
        elementsPerParticipant.push(Math.floor(maxElements / participants.length)); // Assign an equal number of elements per participant
        updateParticipantsList();
        updateParticipantDropdown();
        document.getElementById('participant-name').value = '';
    }
}

function updateParticipantsList() {
    const participantsList = document.getElementById('participants');
    participantsList.innerHTML = '';
    participants.forEach(participant => {
        const li = document.createElement('li');
        li.textContent = participant;
        participantsList.appendChild(li);
    });
}

function updateParticipantDropdown() {
    const participantDropdown = document.getElementById('item-participant');
    participantDropdown.innerHTML = '';
    participants.forEach(participant => {
        const option = document.createElement('option');
        option.value = participant;
        option.textContent = participant;
        participantDropdown.appendChild(option);
    });
}

function defineMaxElements() {
    maxElements = parseInt(document.getElementById('max-elements').value);
    elementsPerParticipant = participants.map(() => Math.floor(maxElements / participants.length));
}

function reset() {
    participants = [];
    items = [];
    maxElements = 5;
    currentParticipantIndex = 0;
    elementsPerParticipant = [];
    document.getElementById('participants').innerHTML = '';
    document.getElementById('result').textContent = '';
    updateParticipantDropdown();
}

function addItem() {
    const itemType = document.getElementById('item-type').value;
    const itemContent = document.getElementById('item-content').value;
    if (itemContent && participants.length > 0) {
        const currentParticipant = participants[currentParticipantIndex];
        if (elementsPerParticipant[currentParticipantIndex] > 0) {
            items.push({ type: itemType, content: itemContent, participant: currentParticipant });
            document.getElementById('item-content').value = '';
            elementsPerParticipant[currentParticipantIndex] -= 1;
            currentParticipantIndex = (currentParticipantIndex + 1) % participants.length;
            alert(`Élément ajouté pour ${currentParticipant}`);
        } else {
            alert(`${currentParticipant} a déjà ajouté tous ses éléments.`);
        }
    } else {
        alert('Contenu de l\'élément vide ou aucun participant ajouté.');
    }
}

function goToDrawPage() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('draw-page').style.display = 'block';
}

function backToHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('draw-page').style.display = 'none';
    document.getElementById('draw-result').innerHTML = '';
    items = [];
}

function drawItem() {
    if (items.length === 0) {
        document.getElementById('draw-result').textContent = 'Tous les éléments ont été tirés au sort.';
        return;
    }

    document.getElementById('draw-result').textContent = '';
    document.getElementById('loading-animation').style.display = 'block';

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items.splice(randomIndex, 1)[0];
        const resultDiv = document.getElementById('draw-result');
        const resultItem = document.createElement('div');
        resultItem.textContent = `${randomItem.participant}, tu as ${randomItem.type} : ${randomItem.content}`;
        resultDiv.appendChild(resultItem);
        document.getElementById('loading-animation').style.display = 'none';
    }, 1000);
}

// Ajoute des écouteurs d'événements
document.getElementById('rules-link').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    window.location.href = this.getAttribute('href'); // Redirige vers la page des règles
});
