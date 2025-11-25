const header = document.querySelector("#header");
const filterAndSearchBar = document.querySelector(".filter-and-search-bar");
const addCustomerBtn = document.getElementById("add-customer-btn");
const customersList = document.querySelector(".customers-list");
const searchInput = document.getElementById("search-input");
const headingsort = document.querySelectorAll(".sort-col");
const searchForm = document.querySelector(".search-form");
let arrayofCustomers = JSON.parse(localStorage.getItem("customers")) || [];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

const saveDataCustomers = () => {
  localStorage.setItem("customers", JSON.stringify(arrayofCustomers));
}

const checkData = (nameValue,descriptionValue,statusValue,rateValue,curancyValue,depositValue) => {
  if (!nameValue) return "please enter the customer name";
  if (!descriptionValue) return "please enter the customer description";
  if (!statusValue) return "please enter the customer status";
  if (!rateValue) return "please enter the customer rate";
  if(!curancyValue) return "please enter the customer curancy";
  if (!depositValue) return "please enter the customer depodit";
  return "";
};

const addCustomer = (nameValue,descriptionValue,statusValue,rateValue,curancyValue,depositValue) => {
  let newCustomer = {
    id: null,
    name: nameValue,
    description: descriptionValue,
    status: statusValue,
    rate: rateValue,
    balance: calculateBalance(depositValue, rateValue),
    curancy: curancyValue,
    depodit: depositValue,
    isSelected: false
  };
  arrayofCustomers.push(newCustomer);
  saveDataCustomers();
  renderIds();
  renderCustomer();
}

const renderIds = () => {
  arrayofCustomers.forEach((customer, index) => {
    customer.id = index + 1;
  });
};

const attachFormEvents = (form,mode,customer) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputName = form.querySelector(".input-name");
    const inputDescription = form.querySelector(".input-description");
    const inputStatus = form.querySelector(".input-status");
    const inputRate = form.querySelector(".input-rate");
    const inputCurancy = form.querySelector(".input-curancy");
    const inputDepodit = form.querySelector(".input-deposit");
    const nameValue = inputName.value.trim();
    const descriptionValue = inputDescription.value.trim();
    const statusValue = inputStatus.value;
    const rateValue = inputRate.value;
    const curancyValue = inputCurancy.value;
    const depositValue = inputDepodit.value;
    const alertMsg = checkData(nameValue,descriptionValue,statusValue,rateValue,curancyValue,depositValue);
    if(alertMsg) {
      alert(alertMsg);
      return "";
    }
    if (mode === "edit") {
      updateCustomerData(customer.id,nameValue, descriptionValue, statusValue, rateValue, curancyValue, depositValue);
    } else {
      addCustomer(nameValue, descriptionValue, statusValue, rateValue, curancyValue, depositValue);
    }
    closePopup(form);
    saveDataCustomers();
  });
};

const createOverlay = () => {
  const overlay = document.createElement("div");
  overlay.className = `overlay fixed top-0 left-0 w-full h-full z-500 opacity-50 bg-black`;
  return overlay;
};

const closePopup = (form) => {
  if (form) {
    form.classList.replace("scale-100", "scale-0");
    setTimeout(() => form.remove(), 300);
  }
  const overlay = document.querySelector(".overlay");
  if (overlay) overlay.remove();
}

const createCustomerModal = (mode,customer) => {
  const form = document.createElement("form");
  form.classList = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-999 bg-white p-6 rounded-lg shadow-lg max-w-[500px] w-[90%] scale-0 my-transition";
  form.append(
    createCustomerModalHeader(mode),
    createCustomerModalBody(mode,customer),
    createCustomerModalFooter(mode)
  );
  const overlay = createOverlay();
  document.body.append(form,overlay);
    setTimeout(() => {
      form.classList.replace("scale-0", "scale-100");
    }, 10);
    const inputName = form.querySelector(".input-name");
    setTimeout(() => {
      inputName.focus();
    },100);
  const closeButtons = form.querySelectorAll("#close-popup-btn");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
    form.classList.replace("scale-100", "scale-0");
    setTimeout(() => form.remove(), 100);
    overlay.remove();
  });
  });
  attachFormEvents(form, mode, customer);
}

const createCustomerModalHeader =  (mode) => {
  const header = document.createElement("div");
  header.classList = "flex items-center justify-between gap-2.5 mb-1.5 border-b border-solid border-[#eee]";
  header.innerHTML = `
    <button type="button" class="text-[30px] text-[#7f8c8d] cursor-pointer hover:text-[#e74c3c]" id="close-popup-btn">
    &times;
    </button>
    <h2 class="title text-[20px] text-blue font-bold">Add New Customer</h2>
  `;
  const title = header.querySelector(".title");
  title.textContent = 
    mode === "add"
    ? "Add New Customer"
    : mode === "edit"
    ? "Edit the Customer"
    : "Customer Details";
  return header;
}

const createCustomerModalBody = (mode,customer) => {
  const body = document.createElement("div");
  body.classList = "flex flex-col gap-1";
  body.append(
    createNameInput(mode,customer),
    createDescriptionInput(mode,customer),
    createContainerStatusAndRate(mode,customer),
    createContainerCurancyAndDeposit(mode,customer),
  );
  const elements = body.querySelectorAll("*");
  const isView = mode === "view";
  elements.forEach((element) => {
    if(isView) {
      element.classList.add("cursor-not-allowed");
    }
  })
  return body;
}

const createNameInput = (mode,customer)=> {
  const containerName = document.createElement("div");
  containerName.classList = "flex flex-col gap-2 mb-1";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.name || "");
  containerName.innerHTML = `
  <label for="name" class="text-[#2c3e50] font-bold text-[20px]">Name:</label>
  <input
    type="text"
    id="name"
    class="input-name w-full px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
    value = "${value}"
    ${disabled}/>`;
  return containerName;
}

const createDescriptionInput = (mode,customer) => {
  const containerDescription = document.createElement("div");
  containerDescription.classList = "flex flex-col gap-2 mb-1";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.description || "");
  containerDescription.innerHTML = `
    <label
    for="description"
    class="text-[#2c3e50] font-bold text-[20px]">Description:</label>
    <textarea
      name="description"
      id="description"
      class="input-description w-full mx-h-[200px] px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
      ${disabled}>${value || "-"}</textarea>`;
  return containerDescription;
}

const createContainerStatusAndRate = (mode,customer) => {
  const container = document.createElement("div");
  container.classList = "flex gap-2.5 justify-between items-center flex-wrap";
  container.append(createStatusInput(mode,customer),createRateInput(mode,customer));
  return container;
}

const createStatusInput = (mode,customer) => {
  const containerStatus = document.createElement("div");
  containerStatus.classList = "flex flex-col gap-2 mb-1 w-[47%]";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.status || "");
  containerStatus.innerHTML = `
    <label for="status" class="text-[#2c3e50] font-bold text-[20px]">Status:</label>
    <select
      name="status"
      id="status"
      class="input-status px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
      ${disabled}>
      <option value="">Choose your status</option>
      <option value="Open" ${value === "Open" ? "selected" : ""}>Open</option>
      <option value="paid" ${value === "paid" ? "selected" : ""}>paid</option>
      <option value="Due" ${value === "Due" ? "selected" : ""}>Due</option>
      <option value="InActive" ${value === "InActive" ? "selected" : ""}>InActive</option>
    </select>`;
    return containerStatus;
}

const createRateInput = (mode,customer) => {
  const containerRate = document.createElement("div");
  containerRate.classList = "flex flex-col gap-2 mb-1 w-[50%]";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.rate || "");
  containerRate.innerHTML = `
      <label for="rate" class="text-[#2c3e50] font-bold text-[20px]">Rate:</label>
            <input
              type="number"
              id="rate"
              class="input-rate px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]" 
              value ="${value}"
            ${disabled}/>`;
  return containerRate;
}

const createContainerCurancyAndDeposit = (mode,customer) => {
  const container = document.createElement("div");
  container.classList = "flex gap-2.5 justify-between items-center flex-wrap";
  container.append(createCurancyInput(mode,customer),createDepositInput(mode,customer));
  return container;
}

const createCurancyInput = (mode,customer) => {
  const containerCutancy = document.createElement("div");
  containerCutancy.classList = "flex flex-col gap-2 mb-1 w-[47%]";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.curancy || "");
  containerCutancy.innerHTML = `
    <label for="curancy" class="text-[#2c3e50] font-bold text-[20px]">Curancy:</label>
    <select
      name="curancy"
      id="curancy"
      class="input-curancy px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
      ${disabled}>
      <option value="">Choose your curancy</option>
      <option value="CAD" ${value === "CAD" ? "selected" : ""}>CAD</option>
      <option value="USD" ${value === "USD" ? "selected" : ""}>USD</option>
      <option value="EUR" ${value === "EUR" ? "selected" : ""}>EUR</option>
      <option value="CHF" ${value === "CHF" ? "selected" : ""}>CHF</option>
      <option value="JPY" ${value === "JPY" ? "selected" : ""}>JPY</option>
      <option value="AUD" ${value === "AUD" ? "selected" : ""}>AUD</option>
    </select>`;
  return containerCutancy;
}

const createDepositInput = (mode,customer) => {
  const containerDeposit = document.createElement("div");
  containerDeposit.classList = "flex flex-col gap-2 mb-1 w-[50%]";
  const disabled = mode === "view" ? "disabled" : "";
  const value = mode === "add" ? "" : (customer?.depodit || "");
  containerDeposit.innerHTML = `
              <label for="deposit" class="text-[#2c3e50] font-bold text-[20px]">Deposit:</label>
            <input
              type="number"
              id="deposit"
              class="input-deposit px-3 py-2 rounded-sm border border-solid border-[#eee] outline-none focus:border-[blue]"
              value = "${value}" ${disabled}/>`;
  return containerDeposit;
}

const createCustomerModalFooter = (mode) => {
  const footer = document.createElement("div");
  footer.classList = "flex gap-2 mt-5";
  const isViewMode = mode !== "view";
  const cancelBtn = isViewMode ? "close" : "cancel";
  const submitBtn = mode === "add" ? "Add" : "Update";
  footer.innerHTML = `
    <button
      id="add-new-customer-btn"
      type="submit"
      class="py-1 px-3 bg-[#10b981] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#0a9b6b] hover:translate-y-[-3px] my-transition">
      ${submitBtn}
      </button>
    <button
      id="close-popup-btn"
      type="button"
      class="py-1 px-3 bg-[#ef4444] text-white text-[20px] rounded-md cursor-pointer hover:bg-[#cc2222] hover:translate-y-[-3px] my-transition">
      ${cancelBtn}
      </button>`
      const submitButton = footer.querySelector("#add-new-customer-btn");
      if(!isViewMode) {
        submitButton.remove();
      }
  return footer;
}
addCustomerBtn.addEventListener("click", () => {
  createCustomerModal("add")
});

const checkTypeOfStatus = (statusValue) => {
  switch (statusValue) {
    case "Open":
      return "text-[#4f5aed] bg-[#f0f1fa]";
    case "paid":
      return "text-[#14804a] bg-[#e1fcef]";
    case "Due":
      return "text-[#d12953] bg-[#faf0f3]";
    case "InActive":
      return "text-[#5a6376] bg-[#e9edf5]";
    default:
      return "text-[#5a6376] bg-[#e9edf5]";
  }
};

const calculateBalance = (depositValue, rateValue) => {
  const balanceValue = Number(depositValue) - Number(rateValue);
  return balanceValue;
};

const creatCustomerElement = (customer) => {
  const tr = document.createElement("tr");
  tr.className = "py-3 pl-2.5 flex gap-5 w-full group";
  tr.innerHTML = `
  <td>
      <label for="CustomerCheckbox" class="relative">
        <input
          type="checkbox"
          id="CustomerCheckbox"
          class="row-check-box appearance-none cursor-pointer size-4 bg-white rounded border border-solid border-[#98a1b21a] checked:bg-blue checked:shadow-[inset_0px_1px_0px_0px_rgba(75,133,250,1),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_2px_5px_0px_rgba(34,100,230,0.12)] checked:after:content-[\'\\2713\'] checked:after:absolute checked:after:top-0 checked:after:left-1 checked:after:text-white checked:after:text-[11px]"
        />
      </label>
  </td>
      <td class="w-9 text-left">${customer.id}</td>
        <td class="w-40 text-left">
          <h2 class="text-[#171c26]">${customer.name}</h2>
          <p class="text-[#687182] text-[12px]">${Date.now()}</p>
        </td>
        <td class="w-[238px] text-left text-[#464f60]">${customer.description}</td>
            <td class="w-[70px]">
              <div
                class="text-[13px] px-2.5 py-px rounded-[20px] text-center ${checkTypeOfStatus(customer.status)}">
                ${customer.status}
              </div>
            </td>
            <td class="w-[100px] text-right">
              <h2 class="text-[#464f60]">$${customer.rate}</h2>
              <p class="text-[#687182] text-[12px]">${customer.curancy}</p>
            </td>
            <td class="w-[100px] text-right">
              <h2 id="balance" class="${customer.balance <= 0 ? "text-red" : "text-green"}">$${customer.balance}</h2>
              <p class="text-[#687182] text-[12px]">${customer.curancy}</p>
            </td>
            <td class="w-[100px] text-right">
              <h2 class="text-[#464f60]">$${customer.depodit}</h2>
              <p class="text-[#687182] text-[12px]">${customer.curancy}</p>
        </td>
            <td class="relative">
              <button
                type="button"
                class="side-menu-btn cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-[0.4s] ease"
              >
                <img src="images/menu-btn-icon.svg" alt="menu-btn-icon"/>
              </button>
              <div class="side-menu hidden absolute top-[45px] right-0 z-1100 w-[120px] bg-white rounded-md py-2 px-1.5 shadow-side-menu">
              <button type="button" class="view-btn w-full bg-white rounded-sm text-blue py-1 px-2.5 flex justify-between cursor-pointer my-transition hover:bg-[#eee]">
                View <img src="images/info-icon.svg" alt="info-icon" />
              </button>
              <button type="button" class="edit-btn w-full bg-white rounded-sm text-blue py-1 px-2.5 flex justify-between cursor-pointer my-transition hover:bg-[#eee]">
                Edit <img src="images/edit-icon.svg" alt="edit-icon" />
              </button>
              <button type="button" class="delete-btn w-full bg-white rounded-sm text-red  py-1 px-2.5 flex justify-between cursor-pointer my-transition hover:bg-[#eee]">
                Delete <img src="images/delete-icon.svg" alt="delete-icon" />
              </button>
            </div>
            </td>
  `;
  const sideMenuBtn = tr.querySelector(".side-menu-btn");
  const sideMenu = tr.querySelector(".side-menu");
  sideMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    sideMenu.classList.toggle("hidden");
    sideMenu.classList.toggle("block");
  });
  document.addEventListener("click", () => {
    sideMenu.classList.remove("block");
    sideMenu.classList.add("hidden");
  });
  const viewbtn = tr.querySelector(".view-btn");
  viewbtn.addEventListener("click", () => {
    createCustomerModal("view",customer);
  });
  const deleteBtn = tr.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteCustomer(customer.id);
  });
  const editBtn = tr.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    createCustomerModal("edit",customer);
  });
  return tr;
};

const deleteCustomer = (id) => {
  if (confirm("are you sure to remove this customer?")) {
    arrayofCustomers = arrayofCustomers.filter((customer) => {
      return customer.id !== id;
    });
    renderIds();
    saveDataCustomers();
    renderCustomer();
  }
};

customersList.addEventListener("change", (event) => {
  if(event.target.classList.contains("row-check-box")) {
    handleRowSelection();
    showActionsBar();
  }
});

const renderCustomer = (customersArray = arrayofCustomers) => {
  customersList.innerHTML = "";
  if (customersArray.length > 0) {
    customersArray.forEach((customer) => {
      customersList.append(creatCustomerElement(customer));
    });
  } else {
    customersList.innerHTML = `
      <tr class="py-3 pl-2.5 flex gap-5 w-full group">
        <td colspan="9" class=" w-full text-center py-4 text-gray-500 text-xl">
          No customers found
        </td>
      </tr>
    `;
  }
};
saveDataCustomers();
renderCustomer();

const updateCustomerData = (id,nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue) => {
  arrayofCustomers = arrayofCustomers.map((customer) => {
    if (customer.id === id) {
      return {
        id: customer.id,
        name: nameValue,
        description: descriptionValue,
        status: statusValue,
        rate: rateValue,
        curancy: curancyValue,
        balance: calculateBalance(depoditValue, rateValue),
        depodit: depoditValue
      };
    }
    return customer;
  });
  saveDataCustomers();
  renderCustomer();
  renderIds();
};

const searchCustomers = (customers,query) => {
  return customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.description.toLowerCase().includes(query.toLowerCase()) ||
      customer.status.toLowerCase().includes(query.toLowerCase()) ||
      customer.curancy.toLowerCase().includes(query.toLowerCase()) 
    );
  });
};

searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  const search = event.target.value.trim();
  let filteredCustomers = arrayofCustomers;
  if(search) {
    filteredCustomers = searchCustomers(arrayofCustomers,search);
  }
  renderCustomer(filteredCustomers);
});

let originalCustomers = [...arrayofCustomers]; 
let isSorted = false; 

headingsort.forEach((head) => {
  head.addEventListener("click", () => {
    const arrowIcons = head.querySelector(".arrow-icon");
    arrowIcons.classList.toggle("rotate-180");
    const sortKey = head.dataset.sort;
    if (!sortKey) return;
    if (!isSorted) {
      let sorted = [...arrayofCustomers].sort((a, b) =>
        a[sortKey].localeCompare(b[sortKey])
      );
      renderCustomer(sorted);
    } else {
      renderCustomer(originalCustomers);
    }
    isSorted = !isSorted;
  });
});

const handleRowSelection = () => {
  const selectAllCheckbox = document.querySelector("#AllCustomerCheckbox");
  const customerCheckboxes = document.querySelectorAll(".row-check-box");
  const selectedCount = Array.from(customerCheckboxes).filter(checkbox => checkbox.checked).length;
  if(selectedCount > 0) {
    selectAllCheckbox.checked = true;
  } else {
    selectAllCheckbox.checked = false;
  }
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const customerCheckbox = row.querySelector(".row-check-box");
    if(customerCheckbox.checked) {
      row.classList.add("border-l-2","border-solid","border-blue","bg-[#ebf0fa]!");
    } else {
      row.classList.remove("border-l-2","border-solid","border-blue","bg-[#ebf0fa]!");
    }
  });
};

const customerCheckboxes = document.querySelectorAll(".row-check-box");
customerCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    handleRowSelection();
    showActionsBar();
  })
});

const selectAllCheckboxs = () => {
  const selectAllCheckbox = document.querySelector("#AllCustomerCheckbox");
  const customerCheckboxes = document.querySelectorAll(".row-check-box");
  const rows = document.querySelectorAll("tbody tr");
  selectAllCheckbox.addEventListener("change", () => {
  customerCheckboxes.forEach((checkbox,index) => {
    const row = rows[index];
        if(selectAllCheckbox.checked) {
          checkbox.checked = true;
          row.classList.add("border-l-2","border-solid","border-blue","bg-[#ebf0fa]!");
        } else {
          checkbox.checked = false;
          row.classList.remove("border-l-2","border-solid","border-blue","bg-[#ebf0fa]!");
        }
    });
    showActionsBar();
  });
}
selectAllCheckboxs();

const deleteSelectedCustomers = () => {
  const customerCheckboxes = document.querySelectorAll(".row-check-box");
  const selectedCheckboxes = Array.from(customerCheckboxes).filter(checkbox => checkbox.checked);
  
  if(selectedCheckboxes.length === 0) return;
  
  if(confirm(`Are you sure you want to delete ${selectedCheckboxes.length} customer?`)) {
    const selectedIds = [];
    selectedCheckboxes.forEach((checkbox) => {
      const row = checkbox.closest('tr');
      const id = parseInt(row.querySelector('td:nth-child(2)').textContent);
      selectedIds.push(id);
    });
    
    arrayofCustomers = arrayofCustomers.filter(customer => !selectedIds.includes(customer.id));
    renderIds();
    saveDataCustomers();
    renderCustomer();
    const selectAllCheckbox = document.querySelector("#AllCustomerCheckbox");
    selectAllCheckbox.checked = false;
    showActionsBar();
  }
};

const CreateActionsBar = () => {
  const customerCheckboxes = document.querySelectorAll(".row-check-box");
  const selectedCount = Array.from(customerCheckboxes).filter(checkbox => checkbox.checked).length;
  const actionBarContainer = document.createElement("div");
  actionBarContainer.classList = "delete-all flex items-center gap-2";
  actionBarContainer.innerHTML = `
    <span class="text-[#464f60]">${selectedCount} selected</span>
    <button type="button" class="delete-all-btn w-10 h-8 py-2 px-3 bg-white rounded shadow-delete-all-btn cursor-pointer">
      <img src="images/delete-icon.svg" alt="delete-icon" />
    </button>`;
  const actionBar = document.querySelector(".delete-all");
    if(actionBar) {
      actionBar.remove();
    }
    const deleteAllBtn = actionBarContainer.querySelector(".delete-all-btn");
    deleteAllBtn.addEventListener("click", deleteSelectedCustomers);
  return actionBarContainer;
}

const showActionsBar = () => {
  const customerCheckboxes = document.querySelectorAll(".row-check-box");
  const selectedCount = Array.from(customerCheckboxes).filter(checkbox => checkbox.checked).length;
  const actionBar = CreateActionsBar();
  if(selectedCount > 0) {
    filterAndSearchBar.classList.add("hidden");
    header.prepend(actionBar);
  } else {
    filterAndSearchBar.classList.remove("hidden");
  }
}
showActionsBar();


