document.addEventListener('DOMContentLoaded', function() {

    const apiKey = "patqvpMMlBdOTWDu3.77fa643817c7bae57ae595024e4feeaba6dcb27b6e9afa8082e80c34f366f9eb";
    const baseId = "app2jLWAj9Bcz8aFh";
    const tableName = "users";
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    // Fetch users from Airtable
    async function fetchUsers() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            });
            const data = await response.json();

            // Structure the data into an array of objects
            const usersData = data.records.map(record => {
                return {
                    id: record.id,
                    userName: record.fields.user_name || "N/A",
                    status: record.fields.status || "Unverified",
                    dateJoined: record.fields.date_joined || "N/A",
                    stocks: record.fields.stocks || [], // Optional array of stocks
                };
            });

            // Log the structured data for reuse
            console.log("Structured Users Data:", usersData);

            // Populate the table with the structured data
            populateTable(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    // Populate the table dynamically
    function populateTable(users) {
        const tableBody = document.getElementById("usersTableBody");

        // Clear existing rows
        tableBody.innerHTML = "";

        users.forEach(user => {
            // Create a new row
            const row = document.createElement("tr");
        
            // Dynamically assign a class to the status span based on the user status
            const statusClass = user.status.toLowerCase(); // Convert status to lowercase for consistent class naming
        
            // Add cells for each column
            row.innerHTML = `
                <td class="user-col">${user.userName}</td>
                <td><span class="status ${statusClass}">${user.status}</span></td>
                <td>${user.dateJoined}</td>
            `;
        
            // Append the row to the table body
            tableBody.appendChild(row);
        });    
    }

    // Call the function to fetch and display users
    fetchUsers();

    document.addEventListener("DOMContentLoaded", () => {
        const themeToggle = document.getElementById("switch");
        const root = document.documentElement;

        // Initialize theme based on localStorage or default to light mode
        const savedTheme = localStorage.getItem("theme") || "light";
        root.setAttribute("data-theme", savedTheme);

        // Set toggle state based on the saved theme
        themeToggle.checked = savedTheme === "dark";

        // Toggle theme on input change
        themeToggle.addEventListener("change", () => {
            const newTheme = themeToggle.checked ? "dark" : "light";
            root.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        });
    });
});