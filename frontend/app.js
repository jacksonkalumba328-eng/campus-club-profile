const API_URL = "http://localhost:3000/api/clubs";

const clubsContainer = document.getElementById("clubs");
const clubForm = document.getElementById("clubForm");

let editingClubId = null;

// Load and display all clubs
async function loadClubs() {
    clubsContainer.innerHTML = "Loading clubs...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load clubs");
        }

        const clubs = await response.json();
        clubsContainer.innerHTML = "";

        if (clubs.length === 0) {
            clubsContainer.textContent = "No clubs available yet.";
            return;
        }

        clubs.forEach(function (club) {
            const card = document.createElement("div");
            card.className = "club-card";

            const title = document.createElement("h3");
            title.textContent = club.name;

            const description = document.createElement("p");
            description.textContent =
                "Description: " + (club.description || "Not provided");

            const category = document.createElement("p");
            category.textContent =
                "Category: " + (club.category || "Not provided");

            const president = document.createElement("p");
            president.textContent =
                "President: " + (club.president || "Not provided");

            const meetingDay = document.createElement("p");
            meetingDay.textContent =
                "Meeting Day: " + (club.meeting_day || "Not provided");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.type = "button";
            editButton.addEventListener("click", function () {
                editClub(club);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.type = "button";
            deleteButton.addEventListener("click", function () {
                deleteClub(club.id);
            });

            card.append(
                title,
                description,
                category,
                president,
                meetingDay,
                editButton,
                deleteButton
            );

            clubsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading clubs:", error);
        clubsContainer.textContent =
            "Could not load clubs. Please check that the backend is running.";
    }
}

// Add a new club or update an existing club
clubForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const club = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        category: document.getElementById("category").value.trim(),
        president: document.getElementById("president").value.trim(),
        meeting_day: document.getElementById("meeting_day").value.trim()
    };

    try {
        const isEditing = editingClubId !== null;

        const response = await fetch(
            isEditing ? `${API_URL}/${editingClubId}` : API_URL,
            {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(club)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to save club");
        }

        clubForm.reset();
        editingClubId = null;

        const submitButton = clubForm.querySelector('button[type="submit"]');
        submitButton.textContent = "Add Club";

        await loadClubs();

        alert(isEditing ? "Club updated successfully!" : "Club added successfully!");
    } catch (error) {
        console.error("Error saving club:", error);
        alert("Could not save the club. Please check the backend.");
    }
});

// Load a club into the form for editing
function editClub(club) {
    editingClubId = club.id;

    document.getElementById("name").value = club.name || "";
    document.getElementById("description").value = club.description || "";
    document.getElementById("category").value = club.category || "";
    document.getElementById("president").value = club.president || "";
    document.getElementById("meeting_day").value = club.meeting_day || "";

    const submitButton = clubForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Update Club";

    clubForm.scrollIntoView({ behavior: "smooth" });
}

// Delete a club
async function deleteClub(id) {
    const confirmed = confirm("Are you sure you want to delete this club?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete club");
        }

        await loadClubs();
        alert("Club deleted successfully!");
    } catch (error) {
        console.error("Error deleting club:", error);
        alert("Could not delete the club. Please check the backend.");
    }
}

// Display clubs when the page opens
loadClubs();