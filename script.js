document.getElementById('attendance-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const empName = document.getElementById('emp-name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const job = document.getElementById('job').value;
  const intime = document.getElementById('intime').value;
  const outtime = document.getElementById('outtime').value;
  const hourlyWage = document.getElementById('hourly-wage').value;

  const totalHoursWorked = calculateTotalHoursWorked(intime, outtime);
  const amount = calculateAmount(hourlyWage, totalHoursWorked);

  addRowToTable(empName, email, phone, job, intime, outtime, totalHoursWorked, amount);

  document.getElementById('attendance-form').reset();
});

function calculateTotalHoursWorked(intime, outtime) {
  const [intimeHours, intimeMinutes] = intime.split(':').map(Number);
  const [outtimeHours, outtimeMinutes] = outtime.split(':').map(Number);

  const totalMinutesWorked = (outtimeHours - intimeHours) * 60 + (outtimeMinutes - intimeMinutes);

  return totalMinutesWorked / 60;
}

function calculateAmount(hourlyWage, totalHoursWorked) {
  return hourlyWage * totalHoursWorked;
}

function addRowToTable(empName, email, phone, job, intime, outtime, totalHoursWorked, amount) {
  const tbody = document.getElementById('payroll-data-body');
  const row = tbody.insertRow();

  const empNameCell = row.insertCell();
  const emailCell = row.insertCell();
  const phoneCell = row.insertCell();
  const jobCell = row.insertCell();
  const intimeCell = row.insertCell();
  const outtimeCell = row.insertCell();
  const totalHoursWorkedCell = row.insertCell();
  const amountCell = row.insertCell();
  const actionsCell = row.insertCell();

  empNameCell.textContent = empName;
  emailCell.textContent = email;
  phoneCell.textContent = phone;
  jobCell.textContent = job;
  intimeCell.textContent = intime;
  outtimeCell.textContent = outtime;
  totalHoursWorkedCell.textContent = totalHoursWorked.toFixed(2);
  amountCell.textContent = amount.toFixed(2);
  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update';
  updateBtn.className = 'update-btn';
  updateBtn.onclick = function() {
    const empNameInput = prompt("Enter new employee name:");
    const emailInput = prompt("Enter new email:");
    const phoneInput = prompt("Enter new phone:");
    const jobInput = prompt("Enter new job:");
    const intimeInput = prompt("Enter new in time:");
    const outtimeInput = prompt("Enter new out time:");
    const hourlyWageInput = prompt("Enter new hourly wage:");
    
    empNameCell.textContent = empNameInput;
    emailCell.textContent = emailInput;
    phoneCell.textContent = phoneInput;
    jobCell.textContent = jobInput;
    intimeCell.textContent = intimeInput;
    outtimeCell.textContent = outtimeInput;
    totalHoursWorkedCell.textContent = totalHoursWorkedInput;
    amountCell.textContent = amountInput;


    const newTotalHoursWorked = calculateTotalHoursWorked(intimeInput, outtimeInput);
    const newAmount = calculateAmount(hourlyWageInput, newTotalHoursWorked);
    totalHoursWorked = newTotalHoursWorked; 
    amount = newAmount; 
    totalHoursWorkedCell.textContent = newTotalHoursWorked.toFixed(10) + 'hours';
    console.log(totalHoursWorkedCell.textContent);
    amountCell.textContent = newAmount.toFixed(10);
    console.log(amountCell.textContent);
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'emove-btn';
  removeBtn.onclick = function() {
    row.remove();
  };

  actionsCell.appendChild(updateBtn);
  actionsCell.appendChild(removeBtn);
}