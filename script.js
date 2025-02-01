const rooms = ["03", "04", "05", "B1", "B2", "Gallery"];
const roomStatus = {};

function updateRooms() {
    const roomContainer = document.getElementById("rooms");
    roomContainer.innerHTML = "";

    rooms.forEach(room => {
        const status = roomStatus[room] || { booked: false, timeLeft: 0 };
        const roomDiv = document.createElement("div");
        roomDiv.classList.add("room", status.booked ? "booked" : "free");

        roomDiv.innerHTML = `
            <h2>Room ${room}</h2>
            <p>${status.booked ? `Booked - Free in ${status.timeLeft} min` : "Free"}</p>
            ${!status.booked ? `<button onclick="bookRoom('${room}')">Book for 1 Hour</button>` : ""}
        `;

        roomContainer.appendChild(roomDiv);
    });
}

function bookRoom(room) {
    roomStatus[room] = { booked: true, timeLeft: 60 };
    updateRooms();
    
    const interval = setInterval(() => {
        if (roomStatus[room].timeLeft > 0) {
            roomStatus[room].timeLeft--;
            updateRooms();
        } else {
            roomStatus[room] = { booked: false, timeLeft: 0 };
            clearInterval(interval);
            updateRooms();
        }
    }, 60000); // Updates every minute
}

// Initialize Rooms
updateRooms();
