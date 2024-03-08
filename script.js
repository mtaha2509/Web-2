const form = document.getElementById('jobApplicationForm');
const submitButton = document.getElementById('submitButton');
const viewAsTableButton = document.getElementById('viewAsTableButton');
let applications = [];

// Function to validate email format
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Function to validate phone number format (simple check for numbers and hyphen)
function isValidPhone(phone) {
  const re = /^\d+(-\d+)*$/;
  return re.test(phone);
}

// Function to validate required fields and format
function validateForm() {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.required && input.value.trim() === '') {
      alert(`Please fill out the ${input.previousElementSibling.textContent.slice(0, -1)} field.`);
      isValid = false;
      break;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      alert('Please enter a valid email address.');
      isValid = false;
      break;
    } else if (input.id === 'phoneNumber' && !isValidPhone(input.value)) {
      alert('Please enter a valid phone number (digits and hyphen only).');
      isValid = false;
      break;
    }
  }

  return isValid;
}

// Function to collect application data
function collectApplicationData() {
  const formData = {};
  const inputs = form.querySelectorAll('input, textarea');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    formData[input.id] = input.value;
  }

  return formData;
}

// Function to display applications as a table
function displayApplicationsTable() {
  if (applications.length === 0) {
    alert('No applications submitted yet.');
    return;
  }

  const table = document.createElement('table');
  const tableHeader = table.createTHead();
  const tableRow = tableHeader.insertRow();

  // Create table header cells
  for (const key in applications[0]) {
    const headerCell = document.createElement('th');
    headerCell.textContent = key;
    tableRow.appendChild(headerCell);
  }

  // Create table body rows
  const tableBody = table.createTBody();
  for (const application of applications) {
    const bodyRow = tableBody.insertRow();
    for (const value in application) {
      const bodyCell = document.createElement('td');
      bodyCell.textContent = application[value];
      bodyRow.appendChild(bodyCell);
    }
  }

  // Display table
  document.body.appendChild(table);
}

// Add event listeners
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (validateForm()) {
    const applicationData = collectApplicationData();
    applications.push(applicationData);
    alert('Application submitted successfully! (Data logged to console)');
    console.log(applicationData); // Simulate processing data
    form.reset(); // Reset form after submission
  }
});

viewAsTableButton.addEventListener('click', displayApplicationsTable);
