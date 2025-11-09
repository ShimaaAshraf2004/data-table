const header = document.getElementById("header");
const addCustomerBtn = document.getElementById("add-customer-btn");
const customersList = document.querySelector(".customers-list");
const popup = document.getElementById("popup");
const addCustomerForm = document.getElementById("Customer-form");
const title = document.querySelector(".title");
const inputName = document.querySelector(".input-name");
const inputDescription = document.querySelector(".input-description");
const inputStatus = document.querySelector(".input-status");
const inputRate = document.querySelector(".input-rate");
const inputCurancy = document.querySelector(".input-curancy");
const inputDepodit = document.querySelector(".input-depodit");
const closebtn = document.querySelectorAll("#close-popup-btn");
const addBtn = document.getElementById("add-new-customer-btn");
const selectAllBtn = document.getElementById("AllCustomerCheckbox");
const filterAndSearchBarSection = document.getElementById("filter-and-search-bar");
let editingCustomerData = null;

let arrayofCustomers = JSON.parse(localStorage.getItem("customers")) || [];

const saveDataCustomers = () => {
  localStorage.setItem("customers", JSON.stringify(arrayofCustomers));
};

const toggleOverLay = () => {
  const overlay = document.getElementById("overlay-model");
  if (overlay) {
    overlay.remove();
  } else {
    const newOverLay = document.createElement("div");
    newOverLay.className ="fixed inset-0 flex items-center justify-center bg-[#00000099] z-999 my-transition";
    newOverLay.id = "overlay-model";
    document.body.appendChild(newOverLay);
  }
}

const creatCustomersForm = () => {
  const popup = document.createElement("div");
  popup.className = "bg-white p-[30px] rounded-lg w-[90%] max-w-[500px]  my-transition";
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
}

addCustomerBtn.addEventListener("click", () => {
  // toggleOverLay();
  document.body.append(creatCustomersForm());
});

const checkData = (nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue) => {
  if (!nameValue) return "please enter the customer name";
  if (!descriptionValue) return "please enter the customer description";
  if (!statusValue) return "please enter the customer status";
  if (!rateValue) return "please enter the customer rate";
  if(!curancyValue) return "please enter the customer curancy";
  if (!depoditValue) return "please enter the customer depodit";
  return "";
};

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
  renderIds();
  saveDataCustomers();
  renderCustomer();
};

const renderIds = () => {
  arrayofCustomers.forEach((customer, index) => {
    customer.id = index + 1;
  });
};



// const showPopup = () => {
//   overlay.classList.toggle("invisible");
//   overlay.classList.toggle("visible");
//   popup.classList.toggle("scale-0");
//   popup.classList.toggle("scale-100");
//   setTimeout(() => {
//     inputName.focus();
//   }, 100);
// };

// const closePopup = () => {
//   overlay.classList.remove("visible");
//   overlay.classList.add("invisible");
//   popup.classList.toggle("scale-0");
//   popup.classList.toggle("scale-100");
//   inputName.value = "";
//   inputDescription.value = "";
//   inputStatus.value = "";
//   inputRate.value = "";
//   inputCurancy.value = "";
//   inputDepodit.value = "";
//   return true;
// };

// closebtn.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     event.preventDefault();
//     closePopup();
//   });
// });

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
              <button type="button" class="w-full bg-white rounded-sm text-blue py-1 px-2.5 flex justify-between cursor-pointer my-transition hover:bg-[#eee]">
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
  const editBtn = tr.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    showPopup();
    editingCustomerData = customer.id;
    inputName.value = customer.name;
    inputDescription.value = customer.description;
    inputStatus.value = customer.status;
    inputRate.value = customer.rate;
    inputCurancy = customer.curancy;
    inputDepodit.value = customer.depodit;
    addBtn.textContent = "Update";
    title.textContent = "Edit the Customer";
  });
  const deleteBtn = tr.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteCustomer(customer.id);
  });
  return tr;
};

const renderCustomer = () => {
  customersList.innerHTML = "";
  if (arrayofCustomers.length > 0) {
    arrayofCustomers.forEach((customer) => {
      customersList.append(creatCustomerElement(customer));
    });
  }
  saveDataCustomers();
};
saveDataCustomers();
renderCustomer();


const updateCustomerData = (nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue) => {
  arrayofCustomers = arrayofCustomers.map((customer) => {
    if (customer.id === editingCustomerData) {
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
  editingCustomerData = null;
  addBtn.textContent = "Save";
  saveDataCustomers();
  renderCustomer();
  renderIds();
  inputName.value = "";
  inputDescription.value = "";
  inputStatus.value = "";
  inputRate.value = "";
  inputCurancy.value = "";
  inputDepodit.value = "";
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

addCustomerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = inputName.value.trim();
  const descriptionValue = inputDescription.value.trim();
  const statusValue = inputStatus.value;
  const rateValue = inputRate.value;
  const curancyValue = inputCurancy.value;
  const depoditValue = inputDepodit.value;
  const alertMsg = checkData(nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue);
  if(alertMsg) {
    alert(alertMsg);
  }
  if(editingCustomerData) {
    updateCustomerData(nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue);
  } else {
    addCustomer(nameValue,descriptionValue,statusValue,rateValue,curancyValue,depoditValue);
  }
  closePopup();
  saveDataCustomers();
  inputName.value = "";
  inputDescription.value = "";
  inputStatus.value = "";
  inputRate.value = "";
  inputCurancy.value = "";
  inputDepodit.value = "";
});

// const creatDeleteAllSection  = () => {
//   const deleteAllSection = document.createElement("div");
//   deleteAllSection.className = "flex delete-all items-center gap-2";
//   deleteAllSection.innerHTML = `
//     <span class="text-[#464f60] ">0 selected</span>
//     <button type="button" class="delete-all-btn w-10 h-8 py-2 px-3 bg-white rounded shadow-delete-all-btn cursor-pointer">
//       <img src="images/delete-icon.svg" alt="delete-icon" />
//     </button>`;
//   return deleteAllSection
// };


// const showDeleteAllSection = () => {
//   const checkboxs = document.querySelectorAll(".row-check-box");
//   checkboxs.forEach((checkbox) => {
//     checkbox.addEventListener("change", () => {
//       const countCheckboxsInBody  = document.querySelectorAll("#CustomerCheckbox:checked").length;
//       const CountCheckboxs = document.querySelectorAll(".row-check-box:checked").length;
//         let deleteAllSection = document.querySelector(".delete-all");
//         if (CountCheckboxs > 0) {
//           if (!deleteAllSection) {
//             header.prepend(creatDeleteAllSection());
//             deleteAllSection = document.querySelector(".delete-all");
//             filterAndSearchBarSection.classList.remove("flex");
//             filterAndSearchBarSection.classList.add("hidden");
//           }
//         const countText = deleteAllSection.querySelector("span");
//         countText.textContent = `${countCheckboxsInBody} selected`;
//       } else {
//         if(deleteAllSection) {
//           deleteAllSection.remove();
//         }
//         filterAndSearchBarSection.classList.remove("hidden");
//         filterAndSearchBarSection.classList.add("flex");
//       }
//     });
//   });
// };
// showDeleteAllSection();

// const selectedCustomer = () => {
//   const countCheckboxsInBody  = document.querySelectorAll("#CustomerCheckbox")
//   countCheckboxsInBody.forEach((checkbox) => {
//     checkbox.addEventListener("change", (event) => {
//       selectAllBtn.checked = true;
//       const tr = event.target.closest("tr"); 
//       if (event.target.checked) {
//         tr.classList.add("border-l-2","border-solid","border-[#2264e6]","!bg-[#ebf0fa]");
//       } else {
//         tr.classList.remove("border-l-2","border-solid","border-[#2264e6]","!bg-[#ebf0fa]");
//       }
//     });
//   });
// };

// const selectAllCusromers = () => {
//   const Checkboxs = document.querySelectorAll(".row-check-box");
//   selectAllBtn.addEventListener("change", () => {
//     const checkedBox = selectAllBtn.checked; 
//     Checkboxs.forEach((checkbox) => {
//       checkbox.checked = checkedBox;
//       checkbox.dispatchEvent(new Event("change"));
//     });
//   });
// }
// selectAllCusromers();
// selectedCustomer();