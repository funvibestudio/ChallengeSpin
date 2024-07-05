let participants = [];
let items = [];
let maxElements = 5;
let currentParticipantIndex = 0;

function addParticipant() {
    const participantName = document.getElementById('participant-name').value;
    if (participantName) {
        participants.push(participantName);
        updateParticipantsList();
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

function defineMaxElements() {
    maxElements = parseInt(document.getElementById('max-elements').value);
}

function reset() {
    participants = [];
    items = [];
    maxElements = 5;
    currentParticipantIndex = 0;
    document.getElementById('participants').innerHTML = '';
    document.getElementById('draw-result').textContent = '';
}

function addItem() {
    const itemType = document.getElementById('item-type').value;
    const itemContent = document.getElementById('item-content').value;
    if (itemContent && items.length < maxElements) {
        items.push({ type: itemType, content: itemContent });
        document.getElementById('item-content').value = '';
        
        // Mise à jour de l'index du participant actuel pour le prochain élément
        currentParticipantIndex = (currentParticipantIndex + 1) % participants.length;
        alert(`Élément ajouté par ${participants[currentParticipantIndex]}`);
    } else {
        alert('Contenu de l\'élément vide ou nombre maximum d\'éléments atteint.');
    }
}

function goToDrawPage() {
    if (items.length !== maxElements) {
        alert('Le nombre d\'éléments n\'est pas encore atteint.');
        return;
    }
    document.getElementById('home').style.display = 'none';
    document.getElementById('draw-page').style.display = 'block';
}

function backToHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('draw-page').style.display = 'none';
    document.getElementById('draw-result').innerHTML = '';
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
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        const resultDiv = document.getElementById('draw-result');
        const resultItem = document.createElement('div');
        resultItem.textContent = `${randomParticipant}, tu as un ${randomItem.type} : ${randomItem.content}`;
        resultDiv.appendChild(resultItem);
        document.getElementById('loading-animation').style.display = 'none';
    }, 1000);
}
