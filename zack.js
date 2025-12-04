"use strict";

//
let customersArray =
    JSON.parse(localStorage.getItem("customers")) ||
    [
        // {
        //     fullName: "Test"
        // }
    ];

const currencies = {
    CAD: { symbol: "$" },
    USD: { symbol: "$" },
    EUR: { symbol: "€" },
    CHF: { symbol: "CHF" },
    JPY: { symbol: "¥" },
    AUD: { symbol: "$" },
};

//
const searchInput = document.getElementById("input-search");
const addCustomerButton = document.getElementById("btn-create-user");
const customersTableBody = document.getElementById("customers-table-body");
const sortButtonsElements = document.querySelectorAll(".sort-button");

//
let searchTerm = "";
let activeSortKey = "";
let activeSortOrder = "";

let searchCustomers = [];
let sortedCustomers = [];

//
const openAddCustomerModal = () => buildCustomerModal("add");
const openEditCustomerModal = (customer) =>
    buildCustomerModal("edit", customer);
const openViewCustomerModal = (customer) =>
    buildCustomerModal("view", customer);

//
const saveCustomersToLocalStorage = () => {
    localStorage.setItem("customers", JSON.stringify(customersArray));
};

const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 w-full h-full z-500 bg-black/50";
    return overlay;
};

// Search
const filterCustomersBySearch = (array) => {
    return array.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const updateSearchCustomers = () => {
    searchCustomers = filterCustomersBySearch(customersArray);
};

// FORM
const buildCustomerModal = (mode, customer = {}) => {
    const overlay = createOverlay();
    const form = document.createElement("form");
    form.className = "customer-modal";
    const formHeader = createCustomerModalHeader(mode);
    const formBody = createCustomerModalBody(mode, customer);
    const formFooter = createCustomerModalFooter(mode);
    form.append(formHeader, formBody, formFooter);
    document.body.append(form, overlay);
    const closeFormButton = form.querySelector(".close-button");
    closeFormButton.addEventListener("click", () => {
        form.remove();
        overlay.remove();
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleCustomersFormSubmission(mode, form, customer);
    });
};

const createCustomerModalHeader = (mode) => {
    const header = document.createElement("h2");
    header.classList =
        "text-xl text-blue font-bold mb-1.5 border-b border-solid border-[#eee]";
    const titleText =
        mode === "add"
            ? "Add New Customer"
            : mode === "edit"
                ? "Edit Customer"
                : "Customer Details";
    header.textContent = titleText;
    return header;
};

const createCustomerModalBody = (mode, customer) => {
    const body = document.createElement("div");
    body.classList = "flex flex-col gap-1";
    const nameField = createCustomerNameField(mode, customer);
    const descriptionField = createCustomerDescriptionField(mode, customer);
    const statusFields = createCustomerStatusFields(mode, customer);
    const rateField = createCustomerRateField(mode, customer);
    const depositField = createCustomerDepositField(mode, customer);
    const currencyFields = createCustomerCurrencyFields(mode, customer);
    body.append(
        nameField,
        descriptionField,
        statusFields,
        rateField,
        depositField,
        currencyFields
    );
    return body;
};

const createCustomerNameField = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.name;
    container.innerHTML = `
    <label for="customer-name" class="text-[#2c3e50] font-bold text-[20px]">Name:</label>
    <input
    type="text"
    id="customer-name"
    class="input-name w-full px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
    value = "${value}"
    ${isReadOnly ? "disabled" : ""}/>`;
    return container;
};

const createCustomerDescriptionField = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.description;
    container.innerHTML = `
    <label
    for="customer-description"
    class="text-[#2c3e50] font-bold text-[20px]">Description:</label>
    <textarea
      id="customer-description"
      class="input-description w-full mx-h-[200px] px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
    ${isReadOnly ? "disabled" : ""}>${value}</textarea>`;
    return container;
};

const createCustomerStatusFields = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.status;
    container.innerHTML = `
    <label for="customer-status" class="text-[#2c3e50] font-bold text-[20px]">Status:</label>
    <select
      id="customer-status"
      class="px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
      ${isReadOnly ? "disabled" : ""}>
      <option  value="" disabled selected>Choose your status</option>
      <option value="open" ${value === "open" ? "selected" : ""}>Open</option>
      <option value="paid" ${value === "paid" ? "selected" : ""}>Paid</option>
      <option value="due" ${value === "due" ? "selected" : ""}>Due</option>
      <option value="inActive" ${value === "inactive" ? "selected" : ""
        }>Inactive</option>
    </select>`;
    return container;
};

const createCustomerRateField = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.rate;
    container.innerHTML = `
    <label for="customer-rate" class="text-[#2c3e50] font-bold text-[20px]">Rate:</label>
      <input
        type="number"
        id="customer-rate"
        class="px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
        value ="${value}"
      ${isReadOnly ? "disabled" : ""}/>`;
    return container;
};

const createCustomerDepositField = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.deposit;
    container.innerHTML = `
    <label for="customer-deposit" class="text-[#2c3e50] font-bold text-[20px]">Deposit:</label>
      <input
        type="number"
        id="customer-deposit"
        class="px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
        value ="${value}"
      ${isReadOnly ? "disabled" : ""}/>`;
    return container;
};

const createCustomerCurrencyFields = (mode, customer) => {
    const container = document.createElement("div");
    container.classList = "flex flex-col gap-2 mb-1";
    const isReadOnly = mode === "view";
    const value = mode === "add" ? "" : customer.currency;
    container.innerHTML = `
    <label for="customer-currency" class="text-[#2c3e50] font-bold text-[20px]">Currency:</label>
    <select
      id="customer-currency"
      class="px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
      ${isReadOnly ? "disabled" : ""}>
      <option  value="" disabled selected>Choose your currency</option>
      <option value="CAD" ${value === "CAD" ? "selected" : ""}>CAD</option>
      <option value="USD" ${value === "USD" ? "selected" : ""}>USD</option>
      <option value="EUR" ${value === "EUR" ? "selected" : ""}>EUR</option>
      <option value="CHF" ${value === "CHF" ? "selected" : ""}>CHF</option>
      <option value="JPY" ${value === "JPY" ? "selected" : ""}>JPY</option>
      <option value="AUD" ${value === "AUD" ? "selected" : ""}>AUD</option>
    </select>`;
    return container;
};

const createCustomerModalFooter = (mode) => {
    const footer = document.createElement("div");
    footer.className = "flex gap-2 mt-5";
    const isEditable = mode !== "view";
    const cancelLabel = isEditable ? "Cancel" : "Close";
    const submitLabel = mode === "add" ? "Add Customer" : "Save Changes";
    footer.innerHTML = `
    <button
      type="button"
      class="close-button py-1 px-3 bg-[#ef4444] text-white text-base rounded-md cursor-pointer hover:bg-[#cc2222]">
      ${cancelLabel}
      </button>
    ${isEditable
            ? `
    <button
      type="submit"
      class="py-1 px-3 bg-[#10b981] text-white text-base rounded-md cursor-pointer hover:bg-[#0a9b6b]">
      ${submitLabel}
      </button>
    `
            : ""
        }
    `;
    return footer;
};

const handleCustomersFormSubmission = (mode, form, customer) => {
    const name = form.querySelector("#customer-name").value.trim();
    const description =
        form.querySelector("#customer-description").value.trim() || "";
    const status = form.querySelector("#customer-status").value || "open";
    const rateInput = form.querySelector("#customer-rate").value.trim();
    const depositInput = form.querySelector("#customer-deposit").value.trim();
    const rate = rateInput === "" ? null : Number(rateInput);
    const deposit = depositInput === "" ? null : Number(depositInput);
    const currency = form.querySelector("#customer-currency").value || "USD";
    const alertMsg = checkData(name);
    if (alertMsg) {
        alert(alertMsg);
        return "";
    }
    if (mode === "add") {
        addCustomer(name, description, status, rate, deposit, currency);
    } else if (mode === "edit") {
        updateCustomer(
            customer,
            name,
            description,
            status,
            rate,
            deposit,
            currency
        );
    }
    saveCustomersToLocalStorage();
    refreshAndDisplayCustomers();
};

const calcBalance = (rate, deposit) => {
    return deposit === null || rate === null ? null : Number(deposit) - Number(rate);
};

const addCustomer = (name, description, status, rate, deposit, currency) => {
    const newCustomer = {
        isSelected: false,
        rowIndex: 1,
        id: String(customersArray.length + 1).padStart(10, "0"),
        name,
        description,
        status,
        rate,
        deposit,
        currency,
        balance: calcBalance(rate, deposit)
    };
    customersArray.unshift(newCustomer);
    customersArray.forEach((customer, index) => (customer.rowIndex = ++index));
};

const updateCustomer = (
    customer,
    name,
    description,
    status,
    rate,
    deposit,
    currency
) => {
    customer.name = name;
    customer.description = description;
    customer.status = status;
    customer.rate = rate;
    customer.deposit = deposit;
    customer.balance = calcBalance(rate, deposit)
    customer.currency = currency;
};


const checkData = (name) => {
    if (!name) return "please enter the customer name";
    return "";
};

// Sort
const initializeSortButtonHandlers = () => {
    sortButtonsElements.forEach((button) => {
        button.addEventListener("click", () => handleSortButtonClick(button));
    });
};

const handleSortButtonClick = (button) => {
    resetOtherSortButtons(button);
    const newClickCount = Number(button.dataset.clickCount) + 1;
    button.dataset.clickCount = newClickCount.toString();
    activeSortKey = button.dataset.sortKey;
    if (newClickCount === 1) {
        updateSortButtonState(button, true, "asc");
    } else if (newClickCount === 2) {
        updateSortButtonState(button, true, "desc");
    } else {
        resetSortButtonState(button);
        activeSortKey = "";
        activeSortOrder = "";
    }
    refreshAndDisplayCustomers()
};

const resetOtherSortButtons = (activeButton) => {
    sortButtonsElements.forEach((button) => {
        if (button !== activeButton) {
            resetSortButtonState(button);
        }
    });
};

const updateSortButtonState = (button, isActive, order) => {
    button.dataset.active = isActive.toString();
    button.dataset.order = order;
    activeSortOrder = order;
};

const resetSortButtonState = (button) => {
    button.dataset.clickCount = "0";
    button.dataset.active = "false";
    button.dataset.order = "none";
};

const sortCustomersByActiveKey = (array) => {
    return array.sort((a, b) =>
        compareCustomersValuesBySortOrder(
            a[activeSortKey],
            b[activeSortKey],
            activeSortOrder === "asc"
        )
    );
};

const compareCustomersValuesBySortOrder = (a, b, isAsc) => {
    const compare = (valA, valB) => (isAsc ? valA - valB : valB - valA);
    const isMixedKey =
        activeSortKey === "rate" ||
        activeSortKey === "balance" ||
        activeSortKey === "deposit";
    return isMixedKey
        ? compareMixedValues(a, b, compare)
        : compareGeneralValues(a, b, compare, isAsc);
};

const compareMixedValues = (a, b, compareFunc) => {
    const isANumber = typeof a === "number";
    const isBNumber = typeof b === "number";
    if (isANumber && !isBNumber) return -1;
    if (!isANumber && isBNumber) return 1;
    if (!isANumber && !isBNumber) return 0;
    return compareFunc(a, b);
};

const compareGeneralValues = (a, b, compareFunc, isAsc) => {
    if (typeof a === "number" && typeof b === "number") {
        return compareFunc(a, b);
    }
    if (typeof a === "string" && typeof b === "string") {
        return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    }
    return 0;
};

const updateSortedCustomers = () => {
    sortedCustomers = sortCustomersByActiveKey(searchCustomers);
};

// CUSTOMER ROW
const renderCustomersTable = (array = customersArray) => {
    if (array.length === 0) {
        customersTableBody.innerHTML = `<tr><td class="text-sm text-gray-900 py-3 px-2.5" colspan="100%">No Customers found.</td></tr>`;
        return;
    }
    customersTableBody.innerHTML = "";
    array.forEach((customer) => {
        customersTableBody.appendChild(createTableRow(customer));
    });
};

const createTableRow = (customer) => {
    const row = document.createElement("tr");
    row.append(
        createRowIndexCell(customer),
        createNameCell(customer),
        createDescriptionCell(customer),
        createStatusCell(customer),
        createRateCell(customer),
        createBalanceCell(customer),
        createDepositCell(customer),
        createActionsCell(customer)
    );
    return row;
};

const createRowIndexCell = (customer) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3 text-center";
    cell.textContent = customer.rowIndex;
    return cell;
};

const createNameCell = (customer) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3  min-w-[298px]";
    cell.innerHTML = `
    <h2 class="text-[#171c26]">${customer.name}</h2>
    <p class="text-[#687182] text-[12px]">${customer.id}</p>
    `;
    return cell;
};

const createDescriptionCell = (customer) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3  max-w-[150px]";
    cell.innerHTML = `<p class="text-left text-[#464f60] line-clamp-2">${customer.description || "-"
        }</p>`;
    return cell;
};

const createStatusCell = (customer) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3  max-w-[150px]";
    cell.innerHTML = `<span class="text-[13px] px-2.5 py-px rounded-[20px] text-center capitalize ${customer.status}">${customer.status}</span>`;
    return cell;
};

const createMoneyCell = (value, currency) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3 max-w-[150px]";
    const symbol = currencies[currency].symbol;
    cell.innerHTML =
        value === null
            ? `<span class="text-left text-[#464f60] block">-</span>`
            : `
        <span class="text-left text-[#464f60] block">${value} ${symbol}</span>
        <span class="text-left text-[#464f60] text-xs block">${currency}</span>
      `;
    return cell;
};

const createRateCell = (customer) => createMoneyCell(customer.rate, customer.currency);

const createDepositCell = (customer) => createMoneyCell(customer.deposit, customer.currency);

// const createRateCell = (customer) => {
//     const cell = document.createElement("td");
//     cell.className = "px-2.5 py-3  max-w-[150px]";
//     const rateValue = customer.rate;
//     const currencyCode = customer.currency;
//     const symbol = currencies[currencyCode].symbol;
//     let content = "";
//     if (rateValue === null) {
//         content = `<span class="text-left text-[#464f60] block">-</span>`;
//     } else {
//         content = `
//       <span class="text-left text-[#464f60] block">${rateValue} ${symbol}</span>
//       <span class="text-left text-[#464f60] text-xs block">${currencyCode}</span>
//     `;
//     }
//     cell.innerHTML = content;
//     return cell;
// };

const createBalanceCell = (customer) => {
    const cell = document.createElement("td");
    cell.className = "px-2.5 py-3  max-w-[150px]";
    const balanceValue = customer.balance;
    const currencyCode = customer.currency;
    const symbol = currencies[currencyCode].symbol;
    let content = "";
    if (balanceValue === null) {
        content = `<span class="text-left text-[#464f60] block">-</span>`;
    } else {
        content = `
      <span class="text-left block ${balanceValue < 0 ? "text-red" : balanceValue > 0 ? "text-green" : "text-[#464f60]"}">${balanceValue} ${symbol}</span>
      <span class="text-left text-[#464f60] text-xs block">${currencyCode}</span>
    `;
    }
    cell.innerHTML = content;
    return cell;
};

// const createDepositCell = (customer) => {
//     const cell = document.createElement("td");
//     cell.className = "px-2.5 py-3  max-w-[150px]";
//     const depositValue = customer.deposit;
//     const currencyCode = customer.currency;
//     const symbol = currencies[currencyCode].symbol;
//     let content = "";
//     if (depositValue === null) {
//         content = `<span class="text-left text-[#464f60] block">-</span>`;
//     } else {
//         content = `
//       <span class="text-left text-[#464f60] block">${depositValue} ${symbol}</span>
//       <span class="text-left text-[#464f60] text-xs block">${currencyCode}</span>
//     `;
//     }
//     cell.innerHTML = content;
//     return cell;
// };

const createActionsCell = (customer) => {
    const cell = document.createElement("td");
    const container = document.createElement("div");
    container.className = "px-2.5 flex items-center justify-center gap-6 w-full";
    container.append(
        createViewButton(customer),
        createEditButton(customer),
        createDeleteButton(customer)
    );
    cell.append(container);
    return cell;
};

const createViewButton = (customer) => {
    const button = document.createElement("button");
    button.className =
        "ph ph-eye cursor-pointer text-xl text-yellow-500 hover:text-yellow-400";
    button.addEventListener("click", () => openViewCustomerModal(customer));
    return button;
};

const createEditButton = (customer) => {
    const button = document.createElement("button");
    button.className =
        "ph ph-pencil cursor-pointer text-xl text-blue-500 hover:text-blue-400";
    button.addEventListener("click", () => openEditCustomerModal(customer));
    return button;
};

const createDeleteButton = (customer) => {
    const button = document.createElement("button");
    button.className =
        "ph ph-trash cursor-pointer text-xl text-red-500 hover:text-red-400";
    return button;
};

const refreshAndDisplayCustomers = () => {
    updateSearchCustomers()
    updateSortedCustomers()
    renderCustomersTable(sortedCustomers)
}

//
initializeSortButtonHandlers()
refreshAndDisplayCustomers()
//
addCustomerButton.addEventListener("click", openAddCustomerModal);

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value
    refreshAndDisplayCustomers()
});


// console.table(customersArray)
