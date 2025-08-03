
// ฟอร์ม Validate และ Submit
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // ป้องกันการส่งฟอร์มก่อนตรวจสอบ

    let isValid = true;

    // ล้าง error เดิม
    form.querySelectorAll(".error-message").forEach(el => el.remove());
    form.querySelectorAll("input, textarea, select").forEach(el => {
      el.classList.remove("border-red-500", "ring-2", "ring-red-300");
    });

    // ฟังก์ชันแสดง error
    function showError(input, message) {
      isValid = false;
      input.classList.add("border-red-500", "ring-2", "ring-red-300");

      const error = document.createElement("p");
      error.textContent = message;
      error.className = "text-red-500 text-sm mt-1 error-message";
      input.parentNode.appendChild(error);
    }

    // ตรวจชื่อ
    const nameInput = form.querySelector('input[type="text"]');
    const name = nameInput.value.trim();
    if (!/^[A-Za-zก-๙\s]+$/.test(name)) {
      showError(nameInput, "กรุณากรอกชื่อเป็นตัวอักษรเท่านั้น");
    }

    // ตรวจที่อยู่
    const addressInput = form.querySelector("textarea");
    if (!addressInput.value.trim()) {
      showError(addressInput, "กรุณากรอกที่อยู่");
    }

    // ตรวจเบอร์โทร
    const phoneInput = form.querySelector('input[type="tel"]');
    if (!/^0\d{9}$/.test(phoneInput.value.trim())) {
      showError(phoneInput, "กรุณากรอกเบอร์โทร 10 หลัก");
    }

    // ตรวจรายการสินค้า
    const productSelect = form.querySelectorAll("select")[0];
    if (!productSelect.value) {
      showError(productSelect, "กรุณาเลือกรายการสินค้า");
    }

    // ตรวจวันที่สั่งซื้อ
    const dateInput = form.querySelector('input[type="date"]');
    const date = new Date(dateInput.value);
    const minDate = new Date("2023-01-01");
    const today = new Date();
    if (!dateInput.value || date < minDate || date > today) {
      showError(dateInput, "กรุณาเลือกวันที่ระหว่างปี 2023 ถึงปัจจุบัน");
    }

    // ตรวจวิธีรับสินค้า
    const methodSelect = form.querySelectorAll("select")[1];
    if (!methodSelect.value) {
      showError(methodSelect, "กรุณาเลือกวิธีรับสินค้า");
    }

    // ตรวจช่องทางชำระเงิน
    const paymentSelect = form.querySelectorAll("select")[2];
    if (!paymentSelect.value) {
      showError(paymentSelect, "กรุณาเลือกช่องทางชำระเงิน");
    }

    // ตรวจสลิป
    const slipInput = form.querySelector('input[type="file"]');
    if (!slipInput.files[0]) {
      showError(slipInput, "กรุณาแนบสลิปการชำระเงิน");
    }

    // ถ้าทุกอย่างผ่าน
    if (isValid) {
      const confirmSend = confirm("คุณแน่ใจหรือไม่ว่าต้องการส่งคำสั่งซื้อ?");
      if (confirmSend) {
        alert("ส่งคำสั่งซื้อเรียบร้อยแล้ว!");
        form.reset();
      }
    }
  });
});

// ระบบเลือกสินค้าแบบ dynamic

const productSelect = document.getElementById('productSelect');
const productOptions = document.getElementById('productOptions');
const confirmProductBtn = document.getElementById('confirmProductBtn');
const itemList = document.getElementById('itemList');

// รายละเอียดสินค้า
const productDetails = {
  shirt: { name: "เสื้อครบรอบ 30 ปี", sizes: ["-- กรุณาเลือกขนาด --","M", "L", "XL"], colors: ["-- กรุณาเลือกสี --","ดำ", "ขาว", "กรม"] },
  bag:   { name: "กระเป๋าผ้า", sizes: ["-- กรุณาเลือกขนาด --","เล็ก", "ใหญ่"], colors: ["-- กรุณาเลือกสี --","ขาว", "ดำ"] },
  umbrella:   { name: "ร่มพับ"},
  hat:   { name: "หมวก", colors: ["-- กรุณาเลือกสี --","เขียว", "กรม"] },
  belt:   { name: "เข็มขัด" },
  glass:   { name: "กระบอกน้ำเก็บอุณหภูมิ", colors: ["-- กรุณาเลือกสี --","กรม", "ขาว","เทา"] },
  brooch:   { name: "เข็มกลัด", colors: ["-- กรุณาเลือกสี --","ทอง", "เขียว"] },
  notebook:   { name: "สมุดโน้ต", sizes: ["-- กรุณาเลือกขนาด --","เล่มเล็ก", "เล่มใหญ่"], colors: ["-- กรุณาเลือกสี --","ขาว", "น้ำเงิน"] },
  pen:   { name: "ปากกา", colors: ["-- กรุณาเลือกสี --","ดำ", "แดง", "น้ำเงิน"] },
};

let currentProductKey = "";

// เปลี่ยนสินค้า -> แสดงตัวเลือกสี/ขนาด
productSelect.addEventListener('change', () => {
  const key = productSelect.value;
  currentProductKey = key;

  const { name, sizes, colors } = productDetails[key];
  confirmProductBtn.classList.remove('hidden');

  let html = `<h3 class="font-semibold mb-2">${name}</h3>`;

  if (colors.length) {
    html += `
      <label class="block mb-1">สี:</label>
      <select id="colorSelect" class="border rounded px-3 py-2 w-full mb-4">
        ${colors.map(c => `<option>${c}</option>`).join('')}
      </select>`;
  }

  if (sizes.length) {
    html += `
      <label class="block mb-1">ขนาด:</label>
      <select id="sizeSelect" class="border rounded px-3 py-2 w-full">
        ${sizes.map(s => `<option>${s}</option>`).join('')}
      </select>`;
  }

  productOptions.innerHTML = html;
});

// ปุ่มยืนยันรายการ -> เพิ่มรายการ + ลบได้
confirmProductBtn.addEventListener('click', () => {
  const key = currentProductKey;
  if (!key) return;

  const { name } = productDetails[key];
  const color = document.getElementById('colorSelect')?.value || "";
  const size  = document.getElementById('sizeSelect')?.value || "";

  let display = name;
  if (color) display += ` - สี: ${color}`;
  if (size)  display += ` - ขนาด: ${size}`;

  // สร้างรายการ
  const li = document.createElement('li');
  li.className = "flex items-center justify-between gap-4";

  const span = document.createElement('span');
  span.textContent = display;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "ลบ";
  deleteBtn.className = "text-red-500 hover:text-red-700 text-sm";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(deleteBtn);
  itemList.appendChild(li);

  // รีเซ็ต
  productSelect.value = "";
  productOptions.innerHTML = "";
  confirmProductBtn.classList.add('hidden');
  currentProductKey = "";
});
