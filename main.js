const addCustomerBtn = document.getElementById("add-customer-btn");
const addCustomerForm = document.getElementById("Customer-form");
const arrayofCustomers = JSON.parse(localStorage.getItem("customers")) || [];

const saveDataCustomers = () => {
  localStorage.setItem("customers", JSON.stringify(arrayofCustomers));
}

const addCustomer = (nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue) => {
  let newCustomer = {
    id: null,
    name: nameValue,
    description: descriptionValue,
    status: statusValue,
    rate: rateValue,
    curancy: curancyValue,
    balance: calculateBalance(depoditValue, rateValue),
    depodit: depoditValue
  };
  arrayofCustomers.push(newCustomer);
  saveDataCustomers();
}

const attachFormEvents = (form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputName = form.querySelector(".input-name");
    const inputDescription = form.querySelector(".input-description");
    const inputStatus = form.querySelector(".input-status");
    const inputRate = form.querySelector(".input-rate");
    const inputCurancy = form.querySelector(".input-curancy");
    const inputDepodit = form.querySelector(".input-depodit");
    const nameValue = inputName.value.trim();
    const descriptionValue = inputDescription.value.trim();
    const statusValue = inputStatus.value;
    const rateValue = inputRate.value;
    const curancyValue = inputCurancy.value;
    const depositValue = inputDepodit.value;
      console.log("Form Data:", {
      nameValue,
      descriptionValue,
      statusValue,
      rateValue,
      curancyValue,
      depositValue,
    });
  });
};

const closePopup = (form,overlay) => {
  const closebtns = form.querySelectorAll("#close-popup-btn");
  closebtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      form.classList.remove("scale-100");
      form.classList.add("scale-0");
      setTimeout(() => {
        form.remove();
        overlay.remove();
      }, 300);
    });
  });
}

const createOverlay = () => {
  const overlay = document.createElement("div");
  overlay.className = `fixed inset-0 flex items-center justify-center bg-[#00000099] z-500 my-transition`;
  return overlay;
}

const creatCustomerForm = (action, customer)=>{
  const customerForm = document.createElement("form");
  customerForm.classList = `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999 my-transition scale-0`;
  customerForm.append(containerOfElementsInForm(action,customer));
  const overlay = createOverlay();
  document.body.append(customerForm, overlay);
  attachFormEvents(customerForm);
  closePopup(customerForm,overlay);
    // ضع هذا الكود هنا مباشرة بعد append
  requestAnimationFrame(() => {
    customerForm.classList.remove("scale-0");
    customerForm.classList.add("scale-100");
  });
  const inputName = customerForm.querySelector(".input-name");
    setTimeout(() => {
      inputName.focus();
  },100);
}

const containerOfElementsInForm = (action,customer) => {
  const containerElements = document.createElement("div");
  containerElements.classList = "bg-white p-6 rounded-lg shadow-lg max-w-[500px] w-full";
  containerElements.append(headerForm(action),
  createNameInput(action,customer),
  createDescriptionInput(),
  createContainerStatusAndRate(),
  createContainerCurancyAndDeposit(),
  creatContainerBtnForm()
  );
  return containerElements;
}
const headerForm = (action) => {
  const headerContainer = document.createElement("div");
  headerContainer.classList ="flex items-center justify-between gap-2.5 mb-1.5 border-b border-solid border-[#eee]";
  headerContainer.append(closeBtnInHeaderForm(),createFormTitle(action));
  return headerContainer;
}
const closeBtnInHeaderForm = () => {
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.id = "close-popup-btn";
  closeButton.className = "text-[30px] text-[#7f8c8d] cursor-pointer hover:text-[#e74c3c]";
  closeButton.innerHTML = `&times;`;
  return closeButton;
}
const createFormTitle  = (action)=>{
  const formTitle = document.createElement("h2");
  formTitle.classList = "text-[20px] text-blue font-bold";
  formTitle.textContent =
  action === "add" ? "Add New Customer"
  : action === "edit" ? "Edit New Customer"
  : action === "view" ? "Customer Details" : "";
  return formTitle;
}

const createNameInput = (action, customer)=>{
  const containerName = document.createElement("div");
  containerName.classList = "flex flex-col gap-2 mb-1";
  const defaultName = action === "add" ? "" : customer.name;
  const disabled = action === "view" ? "disabled" : "";
  containerName.innerHTML = `
  <label for="name" class="text-[#2c3e50] font-bold text-[20px]">Name:</label>
  <input
    type="text"
    id="name"
    class="input-name w-full px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
    value = "${defaultName}"${disabled}/>`
  return containerName;
}

const createDescriptionInput = () => {
  const containerDescription = document.createElement("div");
  containerDescription.classList = "flex flex-col gap-2 mb-1";
  containerDescription.innerHTML = `
    <label
    for="description"
    class="text-[#2c3e50] font-bold text-[20px]">Description:</label>
    <textarea
      name="description"
      id="description"
      class="input-description w-full mx-h-[200px] px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"></textarea>`;

  return containerDescription;
}

const createContainerStatusAndRate = () => {
  const container = document.createElement("div");
  container.classList = "flex gap-2.5 justify-between items-center flex-wrap";
  container.append(createStatusInput(),createRateInput());
  return container;
}

const createStatusInput = () => {
  const containerStatus = document.createElement("div");
  containerStatus.classList = "flex flex-col gap-2 mb-1 w-[47%]";
  containerStatus.innerHTML = `
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
    </select>`;
    return containerStatus;
}

const createRateInput = () => {
  const containerRate = document.createElement("div");
  containerRate.classList = "flex flex-col gap-2 mb-1 w-[50%]";
  containerRate.innerHTML = `
      <label for="rate" class="text-[#2c3e50] font-bold text-[20px]">Rate:</label>
            <input
              type="number"
              id="rate"
              class="input-rate px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
            />`;
  return containerRate;
}

const createContainerCurancyAndDeposit = () => {
  const container = document.createElement("div");
  container.classList = "flex gap-2.5 justify-between items-center flex-wrap";
  container.append(createCurancyInput(),createDepositInput());
  return container;
}

const createCurancyInput = () => {
  const containerCutancy = document.createElement("div");
  containerCutancy.classList = "flex flex-col gap-2 mb-1 w-[47%]";
  containerCutancy.innerHTML = `
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
            </select>`;
  return containerCutancy;
}

const createDepositInput = () => {
  const containerDeposit = document.createElement("div");
  containerDeposit.classList = "flex flex-col gap-2 mb-1 w-[50%]";
  containerDeposit.innerHTML = `
              <label for="deposit" class="text-[#2c3e50] font-bold text-[20px]">Deposit:</label>
            <input
              type="number"
              id="deposit"
              class="input-deposit px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"/>
    `;
  return containerDeposit;
}

const creatContainerBtnForm = () => {
  const container = document.createElement("div");
  container.classList = "flex gap-2 mt-5";
  container.append(addNewCustomerBtn(),closeForm());
  return container;
}

const addNewCustomerBtn = () => {
  const btn = document.createElement("button");
  btn.type = "submit";
  btn.id = "add-new-customer-btn";
  btn.classList = "py-1 px-3 bg-[#10b981] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#0a9b6b] hover:translate-y-[-3px] my-transition";
  btn.textContent = "Add";
  return btn;
}

const closeForm = () => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "close-popup-btn";
  btn.classList = "py-1 px-3 bg-[#ef4444] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#cc2222] hover:translate-y-[-3px] my-transition";
  btn.textContent = "Cancel";
  return btn;
}

addCustomerBtn.addEventListener("click", () => {
  creatCustomerForm("add", {});
//createFormTitle("add");
// f2("add")
// f2("edit", { name: "Test Customer" })
// f2("view", { name: "Test Customer" })
});

