// All products stored as a data array
const products = [
  { img: 'img.jpg',  name: 'Wireless Headphones', price: '₹7,999',  desc: 'Noise-cancelling headphones' },
  { img: 'img2.jpg',  name: 'Smartwatch',           price: '₹12,999', desc: 'Fitness tracking smartwatch' },
  { img: 'img3.jpg',  name: 'Gaming Mouse',         price: '₹2,499',  desc: 'Ergonomic gaming mouse' },
  { img: 'img4.jpg',  name: 'Laptop Stand',         price: '₹1,999',  desc: 'Adjustable stand' },
  { img: 'img5.jpg',  name: 'Bluetooth Speaker',    price: '₹3,499',  desc: 'Portable speaker' },
  { img: 'img6.jpg',  name: 'Keyboard',             price: '₹1,299',  desc: 'Mechanical keyboard' },
  { img: 'img7.jpg',  name: 'Monitor',              price: '₹9,999',  desc: '24-inch HD monitor' },
  { img: 'img8.jpg',  name: 'USB Hub',              price: '₹899',    desc: 'Multi-port USB hub' },
  { img: 'img9.jpg',  name: 'Webcam',               price: '₹2,199',  desc: 'HD webcam' },
  { img: 'img10.jpg', name: 'Power Bank',           price: '₹1,799',  desc: 'Fast charging power bank' },
  { img: 'img11.jpg', name: 'Phone Stand',          price: '₹499',    desc: 'Mobile stand' },
  { img: 'img12.jpg', name: 'Earbuds',              price: '₹4,999',  desc: 'Wireless earbuds' },
];

const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// Dynamically calculate total pages
const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

const tableBody = document.getElementById('productTable');
const pageInfo  = document.getElementById('pageInfo');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');

function show() {
  // Calculate which slice of products to show
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end   = start + ITEMS_PER_PAGE;
  const pageProducts = products.slice(start, end);

  // Build table rows
  tableBody.innerHTML = pageProducts.map(p => `
    <tr>
      <td><img src="${p.img}" alt="${p.name}"></td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.desc}</td>
    </tr>
  `).join('');

  // Update page info
  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

  // Disable buttons at boundaries
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    show();
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    show();
  }
}

// Initial render
show();
