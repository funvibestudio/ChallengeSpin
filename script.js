let participants = [];
let items = [];
let maxElements = 5;

function addParticipant() {
    const participantName = document.getElementById('participant-name').value;
    if (participantName) {
        participants.push(participantName);
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
}

function reset() {
    participants = [];
    items = [];
    maxElements = 5;
    document.getElementById('participants').innerHTML = '';
    document.getElementById('result').textContent = '';
    updateParticipantDropdown();
}

function getRandomParticipant() {
    const randomIndex = Math.floor(Math.random() * participants.length);
    return participants[randomIndex];
}

function addItem() {
    const itemType = document.getElementById('item-type').value;
    const itemContent = document.getElementById('item-content').value;
    if (itemContent && participants.length > 0 && items.length < maxElements) {
        const randomParticipant = getRandomParticipant();
        items.push({ type: itemType, content: itemContent, participant: randomParticipant });
        document.getElementById('item-content').value = '';
        alert(`Élément ajouté pour ${randomParticipant}`);
    } else {
        alert('Contenu de l\'élément vide, aucun participant ajouté ou nombre maximum d\'éléments atteint.');
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
