const socket = io();

let roomCode = '';
let participants = [];
let maxElements = 5;
let items = [];

function createRoom() {
    socket.emit('createRoom');
}

socket.on('roomCreated', (code) => {
    roomCode = code;
    alert(`Salle créée avec le code : ${roomCode}`);
    document.getElementById('participant-name').style.display = 'none';
});

function joinRoom() {
    const code = document.getElementById('room-code').value;
    const participantName = document.getElementById('participant-name').value;
    if (code && participantName) {
        socket.emit('joinRoom', code, participantName);
    }
}

socket.on('updateParticipants', (participantsList) => {
    participants = participantsList;
    updateParticipantsList();
    updateParticipantDropdown();
});

socket.on('error', (message) => {
    alert(message);
});

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
    document.getElementById('draw-result').textContent = '';
    updateParticipantDropdown();
}

function addItem() {
    const itemType = document.getElementById('item-type').value;
    const itemContent = document.getElementById('item-content').value;
    const itemParticipant = document.getElementById('item-participant').value;
    if (itemContent && itemParticipant && items.length < maxElements) {
        const item = { type: itemType, content: itemContent, participant: itemParticipant };
        socket.emit('addItem', roomCode, item);
        document.getElementById('item-content').value = '';
    }
}

socket.on('updateItems', (itemsList) => {
    items = itemsList;
});

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
        socket.emit('drawItem', roomCode);
    }, 1000);
}

socket.on('itemDrawn', (item) => {
    const resultDiv = document.getElementById('draw-result');
    const resultItem = document.createElement('div');
    resultItem.textContent = `${item.participant}, tu as ${item.type} : ${item.content}`;
    resultDiv.appendChild(resultItem);
    document.getElementById('loading-animation').style.display = 'none';
});
