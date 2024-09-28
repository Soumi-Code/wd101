const registrationForm = document.getElementById('registrationForm');
const output = document.getElementById('output');

registrationForm.addEventListener('submit', function (event) {
	event.preventDefault(); 
	
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const dob = document.getElementById('dob').value;
	const acceptedTerms = document.getElementById('terms').checked;

	const age = calculateAge(dob);
	if (age < 18 || age > 55) {
		alert('Date of Birth must be for someone aged between 18 and 55.');
		return; 
	}

	const newRow = `<tr>
		<td>${name}</td>
		<td>${email}</td>
		<td>${password}</td>
		<td>${dob}</td>
		<td>${acceptedTerms}</td>
	</tr>`;
	output.innerHTML += newRow;
	
	saveDataToLocalStorage(name, email, password, dob, acceptedTerms);
	
	registrationForm.reset();
});

function calculateAge(dob) {
	const dobDate = new Date(dob);
	const today = new Date();
	const age = today.getFullYear() - dobDate.getFullYear();
	const monthDiff = today.getMonth() - dobDate.getMonth();
	
	if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < dobDate.getDate())) {
		return age - 1;
	}
	return age;
}

function saveDataToLocalStorage(name, email, password, dob, acceptedTerms) {
	const userData = {
		name,
		email,
		password,
		dob,
		acceptedTerms,
	};

	localStorage.setItem(name, JSON.stringify(userData));
}