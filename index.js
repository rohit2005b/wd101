document.addEventListener('DOMContentLoaded', function () {
    // Variables for form elements
    const form = document.querySelector('form');
    const inputName = document.getElementById('inputName3');
    const inputEmail = document.getElementById('inputEmail3');
    const inputPassword = document.getElementById('inputPassword3');
    const inputDate = document.getElementById('inputDate3');
    const checkboxTerms = document.getElementById('flexSwitchCheckDefault');
  
    // Event listener for form submission
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the form from submitting traditionally
  
      // Form validation
      if (!inputName.value || !inputEmail.value || !inputPassword.value || !inputDate.value || !checkboxTerms.checked) {
        alert('Please fill in all fields and accept terms to submit the form.');
        return;
      }
  
      // Check if the date of birth is at least 1967
      const birthYear = new Date(inputDate.value).getFullYear();
      if (birthYear < 1967) {
        alert('Date of birth should be 1967 or later.');
        return;
      }
  
      // Check if the age is between 18 and 55
      const today = new Date();
      const age = today.getFullYear() - birthYear;
      if (age < 18 || age > 55) {
        alert('Age should be between 18 and 55.');
        return;
      }
  
      // Create an object with the form data
      const formData = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        dob: inputDate.value,
        acceptedTerms: checkboxTerms.checked ? 'true' : 'false',
      };
  
      // Get existing entries from local storage or initialize an empty array
      const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
  
      // Add the new entry to the array
      entries.push(formData);
  
      // Store the updated entries in local storage
      localStorage.setItem('userEntries', JSON.stringify(entries));
  
      // Clear the form fields
      form.reset();
  
      // Render entries in the table
      renderEntries();
    });
  
    // Function to render entries in the table
    function renderEntries() {
      const tableBody = document.querySelector('tbody');
      tableBody.innerHTML = ''; // Clear the table body before rendering
  
      // Retrieve entries from local storage
      const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
  
      // Loop through entries and append rows to the table
      entries.forEach((entry) => {
        const row = tableBody.insertRow();
        Object.values(entry).forEach((value) => {
          const cell = row.insertCell();
          cell.textContent = value;
        });
      });
    }
  
    // Initial rendering on page load
    renderEntries();
  });
  