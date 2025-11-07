const addCustomerBtn = document.getElementById("add-customer-btn");
const addCustomerForm = document.getElementById("Customer-form");
const arrayofCustomers = JSON.parse(localStorage.getItem("customers")) || [];
console.log(addCustomerForm);
const saveDataCustomers = () => {
  localStorage.setItem("customers", JSON.stringify(arrayofCustomers));
}

const toggleOverLay = () => {
  const overlay = document.getElementById("overlay-model");
  if (overlay) {
    overlay.remove();
  } else {
    const newOverLay = document.createElement("div");
    newOverLay.className ="fixed inset-0 flex items-center justify-center bg-[#00000099] z-500 my-transition";
    newOverLay.id = "overlay-model";
    document.body.appendChild(newOverLay);
  }
}

const creatCustomersForm = () => {
  const popup = document.createElement("div");
  popup.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[30px] rounded-lg w-[90%] max-w-[500px] shadow-2xl z-999 my-transition";
  popup.id = "popup";
  popup.innerHTML = `
          <div
          class="flex items-center justify-between gap-2.5 mb-1.5 border-b border-solid border-[#eee]">
          <button
            class="text-[30px] text-[#7f8c8d] cursor-pointer hover:text-[#e74c3c]" id="close-popup-btn">
            &times;
          </button>
          <h2 class="title text-[20px] text-blue font-bold">Add New Customer</h2>
        </div>
        <form action="#" id="Customer-form">
          <div class="flex flex-col gap-2 mb-1">
            <label for="name" class="text-[#2c3e50] font-bold text-[20px]"
              >Name:</label
            >
            <input
              type="text"
              id="name"
              class="input-name w-full px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
            />
          </div>
          <div class="flex flex-col gap-2 mb-1">
            <label
              for="description"
              class="text-[#2c3e50] font-bold text-[20px]"
              >Description:</label
            >
            <textarea
              name="description"
              id="description"
              class="input-description w-full mx-h-[200px] px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
            ></textarea>
          </div>
          <div class="flex gap-2.5 justify-between items-center flex-wrap">
          <div class="flex flex-col gap-2 mb-1 w-[47%]">
            <label for="status" class="text-[#2c3e50] font-bold text-[20px]">Status:</label>
            <select
              name="status"
              id="status"
              class="input-status px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]">
              <option value="">Choose your status</option>
              <option value="Open">Open</option>
              <option value="paid">paid</option>
              <option value="Due">Due</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
          <div class="flex flex-col gap-2 mb-1 w-[50%]">
            <label for="rate" class="text-[#2c3e50] font-bold text-[20px]">Rate:</label>
            <input
              type="number"
              id="rate"
              class="input-rate px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
            />
          </div>
          </div>
          <div class="flex gap-2.5 justify-between items-center flex-wrap">
          <div class="flex flex-col gap-2 mb-1">
            <label for="curancy" class="text-[#2c3e50] font-bold text-[20px]">Curancy:</label>
            <select
              name="curancy"
              id="curancy"
              class="input-curancy px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]">
              <option value="">Choose your curancy</option>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div class="flex flex-col gap-2 mb-1 w-[50%]">
            <label for="depodit" class="text-[#2c3e50] font-bold text-[20px]"
              >Depodit:</label
            >
            <input
              type="number"
              id="depodit"
              class="input-depodit px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
            />
          </div>
          </div>
          <div class="flex gap-2 mt-5">
            <button
              id="add-new-customer-btn"
              type="submit"
              class="py-1 px-3 bg-[#10b981] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#0a9b6b] hover:translate-y-[-3px] my-transition">
              Add
            </button>
            <button
              id="close-popup-btn"
              type="submit"
              class="py-1 px-3 bg-[#ef4444] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#cc2222] hover:translate-y-[-3px] my-transition"
            >
              Cancel
            </button>
          </div>
        </form>
    </div>`;
  return popup;
};

addCustomerBtn.addEventListener("click", () => {
  toggleOverLay();
  document.body.append(creatCustomersForm());
});

