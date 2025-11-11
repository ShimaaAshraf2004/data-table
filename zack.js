"use strict";


const addCustomerButton = document.getElementById("addCustomerBtn");


const createOverlay = () => {
  const overlay = document.createElement("div");
  overlay.className = `fixed top-0 left-0 w-full h-full z-[99] opacity-50 bg-black`;
  return overlay;
};

const openAddCustomerModal = () => createCustomerModal("add");

const openEditCustomerModal = () =>
  createCustomerModal("edit", { fullName: "Shimaa Ashraf" });

const openViewCustomerModal = () =>
  createCustomerModal("view", { fullName: "Shimaa Ashraf" });

const createCustomerModal = (mode, customer) => {
  const form = document.createElement("form");
  form.className = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-[497px]:max-w-[440px] w-full rounded-xl z-[100] overflow-hidden";
  form.append(
    createCustomerModalHeader(mode),
    createCustomerModalBody(mode, customer),
    createCustomerModalFooter(mode)
  );
  const overlay = createOverlay(mode);
  document.body.append(form, overlay);
  const cancelButton = form.querySelector(".cancelBtn");
  const submitButton = form.querySelector(".submitBtn");
  cancelButton.addEventListener("click", () => {
    form.remove();
    overlay.remove();
  });
};

const createCustomerModalHeader = (mode) => {
  const header = document.createElement("h2");
  header.className = "text-gray-900 bg-white text-base font-medium leading-5 px-5 py-4";
  header.textContent =
    mode === "add"
      ? "Add New Customer"
      : mode === "edit"
      ? "Edit New Customer"
      : "Customer Details";
  return header;
};

const createCustomerModalBody = (mode, customer) => {
  const body = document.createElement("div");
  body.className = "flex flex-col gap-4 px-5 py-4 bg-gray-0";
  body.append(createCustomerNameInput(mode, customer), createCustomerDescriptionTextarea(mode, customer));
  return body;
};

const createCustomerNameInput = (mode, customer) => {
  const container = document.createElement("div");
  container.classList = "flex flex-col gap-2 mb-1";
  const value = mode === "add" ? "" : customer.fullName;
  const disabled = mode === "view" ? "disabled" : "";
  container.innerHTML = `
  <label for="name" class="text-sm font-medium leading-5 text-gray-700 cursor-pointer">Name:</label>
  <input
    type="text"
    id="name"
    class="input-name primary-input"
    value ="${value}"${disabled}/>`;
  return container;
};

const createCustomerDescriptionTextarea = (mode, customer) => {
  const container = document.createElement("div");
  container.classList = "flex flex-col gap-2 mb-1";
  const value = mode === "add" ? "" : customer.description;
  const disabled = mode === "view" ? "disabled" : "";
  container.innerHTML = `
    <label for="description" class="text-sm font-medium leading-5 text-gray-700 cursor-pointer">Description:</label>
    <textarea
      name="description"
      id="description"
      class="input-description primary-input"
      rows="4"
      ${disabled}>${value}</textarea>`;
  return container;
};

const createCustomerModalFooter = (mode) => {
  const footer = document.createElement("div");
  footer.className = "bg-white px-5 py-4 flex gap-5 justify-end items-center rounded-bl-xl rounded-br-xl";
  const isViewMode = mode !== "view";
  const cancelButtonLabel = isViewMode ? "Cancel" : "Close";
  const submitButtonLabel = mode === "add" ? "Add Customer" : "Save Changes";
  footer.innerHTML = `<button type="button" class="cancelBtn btn secondary-btn" >${cancelButtonLabel}</button>
    ${
      isViewMode
        ? `<button type="submit" class="submitBtn btn primary-btn">${submitButtonLabel}</button>`
        : ""
    }`;
  return footer;
};

//
// addCustomerButton.addEventListener("click", openAddCustomerModal);
// addCustomerButton.addEventListener("click", openEditCustomerModal );
addCustomerButton.addEventListener("click", openViewCustomerModal);

// openAddCustomerModal()
openEditCustomerModal()
// openViewCustomerModal();
