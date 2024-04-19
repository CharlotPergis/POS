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
    document.getElementById("addForm").addEventListener("submit", addItem);
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
    document.querySelector(".bl").addEventListener("click", openAddCategoryModal);
});

function openAddCategoryModal() {
    document.getElementById("addCategoryModal").style.display = "block";
    populateCategoryTable();
}

function populateCategoryTable() {
    const categories = []; 
    const tableBody = document.getElementById('categoryTableBody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Populate table
    categories.forEach(category => {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.textContent = category;
    });
}

document.getElementById("addCategoryForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const categoryName = document.getElementById("addCategoryName").value.trim();

    if (categoryName === '') {
        alert("Please enter a category name.");
        return;
    }

    // Add new category to the table
    const tableBody = document.getElementById('categoryTableBody');
    const newRow = tableBody.insertRow();
    const newCell = newRow.insertCell();
    newCell.textContent = categoryName;

    // Clear the form input
    document.getElementById("addCategoryForm").reset();
});


document.addEventListener("DOMContentLoaded", function() {
    populateEditDropdown();
});

function populateEditDropdown() {
    const dropdown = document.getElementById("editItemDropdown");
    const itemCodes = document.querySelectorAll("#item-table tbody td:first-child");

    dropdown.innerHTML = ""; // Clear previous options

    itemCodes.forEach(function(itemCode) {
        const option = document.createElement("option");
        option.value = itemCode.textContent;
        option.textContent = itemCode.textContent;
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

    const editedItemCode = document.getElementById("editItemCode").value;
    const editedItemName = document.getElementById("editItemName").value.trim();
    const editedItemPrice = document.getElementById("editItemPrice").value.trim();
    const editedItemStatus = document.getElementById("editItemStatus").value.trim();
    const editedItemImageInput = document.getElementById("editItemImage");

    if (editedItemName === '' || editedItemPrice === '' || editedItemStatus === '') {
        alert("Please fill in all fields.");
        return;
    }

    const tableRows = document.getElementById("item-table").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        const itemCodeCell = tableRows[i].getElementsByTagName("td")[0];
        if (itemCodeCell.textContent === editedItemCode) {
            tableRows[i].getElementsByTagName("td")[1].textContent = editedItemName;
            tableRows[i].getElementsByTagName("td")[2].textContent = editedItemPrice;
            tableRows[i].getElementsByTagName("td")[3].textContent = editedItemStatus;
            
            if (editedItemImageInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const image = tableRows[i].getElementsByTagName("td")[4].getElementsByTagName("img")[0];
                    image.src = event.target.result;
                    image.alt = `${editedItemName} Image`;
                };
                reader.readAsDataURL(editedItemImageInput.files[0]);
            }

            break;
        }
    }

    populateEditDropdown(); // Update dropdown options after edit
    resetEditModal(); // Reset the modal after editing
    document.getElementById("editModal").style.display = "none";
});

function populateEditModal(row) {
    const selectedItemCode = row.cells[0].textContent;

    // Populate the modal fields with the data from the selected row
    const selectedItemName = row.cells[1].textContent;
    const selectedItemPrice = row.cells[2].textContent;
    const selectedItemStatus = row.cells[3].textContent;
    const selectedItemImageSrc = row.cells[4].getElementsByTagName("img")[0].src;

    document.getElementById("editItemCode").value = selectedItemCode;
    document.getElementById("editItemName").value = selectedItemName;
    document.getElementById("editItemPrice").value = selectedItemPrice;
    document.getElementById("editItemStatus").value = selectedItemStatus;
    document.getElementById("editItemImage").src = selectedItemImageSrc;
}

function editRow(buttonElement) {
    const row = buttonElement.closest('tr');
    populateEditModal(row);

    document.getElementById("editModal").style.display = "block";
}

function resetEditModal() {
    document.getElementById("editItemCode").value = "";
    document.getElementById("editItemName").value = "";
    document.getElementById("editItemPrice").value = "";
    document.getElementById("editItemStatus").value = "";
    document.getElementById("editItemImage").src = ""; // Reset image source if applicable
}


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".bl1").addEventListener("click", openAddModal);
    document.getElementById("addForm").addEventListener("submit", addItem);
    document.querySelector(".close").addEventListener("click", closeModal);
});

function openAddModal() {
    document.getElementById("addModal").style.display = "block";
}

function addItem(event) {
    event.preventDefault();

    const itemName = document.getElementById("addItemName").value.trim();
    const itemPrice = document.getElementById("addItemPrice").value.trim();
    const itemStatus = document.getElementById("addItemStatus").value.trim();
    const itemImageInput = document.getElementById("addItemImage");

    if (itemName === '' || itemPrice === '' || itemStatus === '' || !itemImageInput.files[0]) {
        alert("Please fill in all fields and upload an image.");
        return;
    }

    const newItemCode = generateItemCode();
    const tableBody = document.getElementById("item-table").getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    const reader = new FileReader();

    reader.onload = function(event) {
        const image = document.createElement("img");
        image.src = event.target.result;
        image.alt = `${itemName} Image`;
        image.style.maxWidth = "100px";

        newRow.innerHTML = `<td class="item-code">${newItemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemPrice}</td>
                            <td>${itemStatus}</td>
                            <td></td>
                            <td class="actions">
                                <button class="btn btn-primary edit-button" onclick="editRow(this)">Edit</button>
                                <button class="btn btn-danger delete-button" onclick="deleteRow(this)">Delete</button>
                            </td>`;

        newRow.cells[4].appendChild(image);
    };

    reader.readAsDataURL(itemImageInput.files[0]);

    closeModal();
    populateEditDropdown();
}

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
    document.getElementById("addCategoryModal").style.display = "none";
    document.getElementById("addCategoryForm").reset();
}

let nextItemCode = 1;

function generateItemCode() {
    const formattedItemCode = String(nextItemCode).padStart(3, '0');
    nextItemCode++;
    return formattedItemCode;
}




