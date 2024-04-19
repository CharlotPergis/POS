document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });

    document.querySelector(".close").addEventListener("click", function() {
        closeModal();
    });

    document.querySelector(".bl1").addEventListener("click", openAddModal);
    document.getElementById("addForm").addEventListener("submit", addEmployee);
});

function closeModal() {
    document.querySelector(".modal").style.display = "none";
}

function toggleDropdown() {
    const dropdown = document.getElementById("filterDropdown");
    dropdown.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.filter')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.addEventListener('click', function(event) {
    const filterOptions = document.querySelectorAll('.dropdown-content a');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedOptionText = option.textContent;
            const filterButton = document.querySelector('.filter');
            filterButton.textContent = `Filter By (${selectedOptionText})`;
            toggleDropdown();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    populateEditDropdown();
});

function populateEditDropdown() {
    const dropdown = document.getElementById("editEmployeeDropdown");
    const employeeCodes = document.querySelectorAll("#item-table tbody td:first-child");

    employeeCodes.forEach(function(employeeCode) {
        const option = document.createElement("option");
        option.value = employeeCode.textContent;
        option.textContent = employeeCode.textContent;
        dropdown.appendChild(option);
    });
}

function openEditModal() {
    resetEditModal();

    const tableRows = document.querySelectorAll("#item-table tbody tr");
    tableRows.forEach(function(row) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary');
        editButton.addEventListener('click', function() {
            populateEditModal(row);
        });

        const lastCell = row.cells[row.cells.length - 1];
        lastCell.appendChild(editButton);
    });

    document.getElementById("editModal").style.display = "block";
}

document.getElementById("editForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const editedEmployeeCode = document.getElementById("editEmployeeCode").value;
    const  editedEmployeeName = document.getElementById("editEmployeeName").value.trim();
    const  editedEmployeeUsername = document.getElementById("editEmployeeUsername").value.trim();
    const  editedEmployeePassword = document.getElementById("editEmployeePassword").value.trim();

    if (editedEmployeeName === '' || editedEmployeeUsername === '' || editedEmployeePassword === '') {
        alert("Please fill in all fields.");
        return;
    }

    const tableRows = document.getElementById("item-table").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        const employeeCodeCell = tableRows[i].getElementsByTagName("td")[0];
        if (employeeCodeCell.textContent === editedEmployeeCode) {
            tableRows[i].getElementsByTagName("td")[1].textContent = editedEmployeeName;
            tableRows[i].getElementsByTagName("td")[2].textContent = editedEmployeeUsername;
            tableRows[i].getElementsByTagName("td")[3].textContent = editedEmployeePassword;
        break;
    }
}

    populateEditDropdown(); // Update dropdown options after edit
    resetEditModal(); // Reset the modal after editing
    document.getElementById("editModal").style.display = "none";
});

function populateEditModal(row) {
    const selectedEmployeeCode = row.cells[0].textContent;

    // Populate the modal fields with the data from the selected row
    const selectedEmployeeName = row.cells[1].textContent;
    const selectedEmployeeUsername = row.cells[2].textContent;
    const selectedEmployeePassword = row.cells[3].textContent;

    document.getElementById("editEmployeeCode").value = selectedEmployeeCode;
    document.getElementById("editEmployeeName").value = selectedEmployeeName;
    document.getElementById("editEmployeeUsername").value = selectedEmployeeUsername;
    document.getElementById("editEmployeePassword").value = selectedEmployeePassword;
}

function editRow(buttonElement) {
    const row = buttonElement.closest('tr');
    populateEditModal(row);

    document.getElementById("editModal").style.display = "block";
}

function resetEditModal() {
    document.getElementById("editEmployeeCode").value = "";
    document.getElementById("editEmployeeName").value = "";
    document.getElementById("editEmployeeUsername").value = "";
    document.getElementById("editEmployeePassword").value = "";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".bl1").addEventListener("click", openAddModal);
    document.getElementById("addForm").addEventListener("submit", addEmployee);
    document.querySelector(".close").addEventListener("click", closeModal);

});

function openAddModal() {
    document.getElementById("addModal").style.display = "block";
}

function addEmployee(event) {
    event.preventDefault();

    const employeeName = document.getElementById("addEmployeeName").value.trim();
    const employeeUsername = document.getElementById("addEmployeeUsername").value.trim();
    const employeePassword = document.getElementById("addEmployeePassword").value.trim();

    if (employeeName === '' || employeeUsername === '' || employeePassword === '') {
        alert("Please fill in all fields.");
        return;
    }
    const newEmployeeCode = generateEmployeeCode();
    const tableBody = document.getElementById("item-table").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${newEmployeeCode}</td>
                        <td>${employeeName}</td>
                        <td>${employeeUsername}</td>
                        <td>${employeePassword}</td>
                        <td class="actions">
                            <button class="btn btn-primary edit-button" onclick="editRow(this)">Edit</button>
                            <button class="btn btn-danger delete-button" onclick="deleteRow(this)">Delete</button>
                        </td>`;

    closeModal();
    populateEditDropdown();

};

function editRow(buttonElement) {
    const row = buttonElement.closest('tr');
    populateEditModal(row);

    document.getElementById("editModal").style.display = "block";
}

function deleteRow(buttonElement) {
    const row = buttonElement.closest('tr');
    row.remove();
    populateEditDropdown();
}

function closeModal() {
    document.getElementById("addModal").style.display = "none";
    document.getElementById("addForm").reset();
    document.getElementById("editModal").style.display = "none";

}

let nextEmployeeCode = 1;

function generateEmployeeCode() {
    const formattedEmployeeCode = String(nextEmployeeCode).padStart(3, '0');
    nextEmployeeCode++;
    return formattedEmployeeCode;
}
