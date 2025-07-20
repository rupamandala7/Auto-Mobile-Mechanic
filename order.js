// order.js

function proceedToSummary() {
  const checkboxes = document.querySelectorAll('input[name="service"]:checked');
  let selectedServices = [];
  let total = 0;

  checkboxes.forEach((box) => {
    const price = parseFloat(box.value);
    const name = box.dataset.name;
    total += price;
    selectedServices.push({ name, price });
  });

  const discount = total * 0.15;
  const discountedTotal = total - discount;

  // Save data to localStorage
  localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
  localStorage.setItem("total", total.toFixed(2));
  localStorage.setItem("discount", discount.toFixed(2));
  localStorage.setItem("discountedTotal", discountedTotal.toFixed(2));

  // Go to summary page
  window.location.href = "booking-success.html";
}

function displaySummary() {
  const booking = JSON.parse(localStorage.getItem('bookingDetails'));
  const summaryElement = document.getElementById('order-summary');
  if (!booking || !summaryElement) return;
  let html = '';
  html += `<h3>Personal Information</h3>`;
  html += `<p><strong>Name:</strong> ${booking.name}</p>`;
  html += `<p><strong>Email:</strong> ${booking.email}</p>`;
  html += `<p><strong>Phone:</strong> ${booking.countryCode} ${booking.phone}</p>`;
  html += `<h3>Vehicle Information</h3>`;
  html += `<p><strong>Car Make:</strong> ${booking.carMake}</p>`;
  html += `<p><strong>Car Model:</strong> ${booking.carModel}</p>`;
  html += `<p><strong>Kilometers Driven:</strong> ${booking.kilometers}</p>`;
  html += `<p><strong>Fuel Type:</strong> ${booking.fuel}</p>`;
  html += `<h3>Selected Services</h3>`;
  html += '<ul>';
  booking.selectedServices.forEach(service => {
    html += `<li>${service.name} - ₹${service.price}</li>`;
  });
  html += '</ul>';
  html += `<h5 class="bill"><strong>Total amount before discount:</strong> ₹${booking.total}</h5>`;
  html += `<h5 class="bill"><strong>Discount (15%):</strong> ₹${booking.discount}</h5>`;
  html += `<h5 class="bill"><strong>Final amount after discount:</strong> ₹${booking.discountedTotal}</h5>`;
  if (booking.notes) {
    html += `<h3>Additional Notes</h3><p>${booking.notes}</p>`;
  }
  summaryElement.innerHTML = html;
}