<script setup>
import { reactive, computed } from "vue";
import { invoice1, invoice2 } from "./data/data.js";
const data = reactive({
  sernder: "",
  billTo: "",
  shipTo: "",
  invoiceNumber: "",
  date: "",
  dueDate: "",
  additionalNote: "",
  items: [
    {
      description: "",
      quantity: "",
      rate: "",
      discount: "",
      amount: "",
    },
  ],
  notes: "",
  terms: "",
  subtotal: "",
  tax: "",
  total: "",
  //balanceDue: "",
});

//sub total
function getSubTotal() {
  let subTotal = 0;
  data.items.forEach((item) => {
    subTotal += item.amount;
  });
  data.subtotal = subTotal;
  return subTotal;
}

//total
function getTotal() {
  const tax = (data.subtotal * data.tax) / 100;
  const total = data.subtotal + tax;
  data.total = total;
  return total;
}

//~ using computed
/*const subTotal = computed(() => {
  let subTotal = 0;
  data.items.forEach((item) => {
    subTotal += item.amount;
  });
  return subTotal;
});*/

//add item
function addMoreItem() {
  data.items.push({
    description: "",
    quantity: "",
    rate: "",
    discount: "",
    amount: "",
  });
}

//delete item
function deleteItem(index) {
  data.items.splice(index, 1);
}

//save item
function saveData() {
  console.log(data);
  // fetch("http://localhost:3000/invoice", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
}

/*function updateAmount(item) {
  item.amount = item.quantity * item.rate;
}*/
</script>

<template>
  <section
    class="mx-auto container bg-white border border-gray-400 min-h-screen p-12"
  >
    <div class="flex justify-between">
      <div class="flex flex-col space-y-5 w-1/2s">
        <div class=" ">
          <img
            class="w-40"
            src="https://www.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-600w-1027820257.jpg"
            alt=""
          />
        </div>
        <p class="mt-5">Sender</p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          v-model="data.sernder"
        ></textarea>
        <div class="flex space-x-2">
          <div class="flex flex-col">
            <span>Bill to</span>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              v-model="data.billTo"
            ></textarea>
          </div>
          <div class="flex flex-col">
            <span>Ship to</span>
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              v-model="data.shipTo"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2 items-end">
        <button
          onclick="window.print()"
          class="bg-gray-800 text-white px-3 py-1 rounded-md"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 100-2H4V3a1 1 0 00-1-1zm5 5a1 1 0 011 1v6a1 1 0 11-2 0V8a1 1 0 011-1zm5 0a1 1 0 011 1v6a1 1 0 11-2 0V8a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Print
        </button>
        <h1 class="mt-12 text-4xl uppercase text-right mb-5">Invoice</h1>
        <input
          class="w-[200px] text-right"
          type="text"
          placeholder="Invoice Number"
          v-model="data.invoiceNumber"
        />
        <div class="mt-10 flex-y-5 text-right space-y-3 w-full">
          <p>
            <span>Date</span>
            <input class="ml-2 w-[200px]" v-model="data.date" />
          </p>
          <p>
            <span>Due Date</span>
            <input class="ml-2 w-[200px]" v-model="data.dueDate" />
          </p>
          <p>
            <span>Additional Note</span>
            <input
              class="ml-2 w-[200px]"
              type="text"
              v-model="data.additionalNote"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="mt-20">
      <table class="table-auto w-full">
        <tr class="bg-gray-800 text-left text-white">
          <th class="p-2 pl-5 w-1/2">Item</th>
          <th class="p-2">Quantity</th>
          <th class="p-2">Rate</th>
          <th class="p-2">Discount</th>
          <th class="p-2 w-[200px] text-right pr-5">Amount</th>
          <th class="p-2">Action</th>
        </tr>
        <tr v-for="(item, index) in data.items" :key="index">
          <td class="py-1">
            <input
              class="w-full pl-5"
              type="text"
              placeholder="Description"
              v-model="item.description"
            />
          </td>
          <td class="">
            <input
              class="w-full"
              type="number"
              placeholder="Quantity"
              v-model="item.quantity"
            />
          </td>
          <!-- <td class="">
            <input
              class="w-full"
              type="number"
              placeholder="Rate"
              v-model="item.rate"
              @input="updateAmount(item)"
            />
          </td> -->
          <td class="">
            <input
              class="w-full"
              type="number"
              placeholder="Rate"
              v-model="item.rate"
            />
          </td>
          <td class="">
            <input
              class="w-full"
              type="number"
              placeholder="Discount"
              v-model="item.discount"
            />
          </td>
          <td class="py-1 pr-5 text-right text-gray-800">
            <!-- <input type="text" v-model="item.amount" /> -->
            $ {{ (item.amount = item.quantity * item.rate - item.discount) }}
          </td>
          <td class="py-1 pr-5 text-right text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="deleteItem(index)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </td>
        </tr>
      </table>
      <button
        @click="addMoreItem()"
        class="ml-2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add More
      </button>
      <button
        @click="saveData()"
        class="ml-2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
      <button
        @click="Object.assign(data, invoice1)"
        class="ml-2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Load Invoice 1
      </button>
      <button
        @click="Object.assign(data, invoice2)"
        class="ml-2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Load Invoice 2
      </button>
      <!-- <p class="mt-10">{{ data }}</p> -->
    </div>
    <div class="mt-[200px]">
      <div class="flex justify-between">
        <div class="flex flex-col space-y-5 w-1/2">
          <span>Notes</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            v-model="data.notes"
          ></textarea>
          <span>Terms</span>
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            v-model="data.terms"
          ></textarea>
        </div>
        <div class="flex flex-col w-1/2 items-end">
          <div class="mt-10 flex-y-5 text-right space-y-3 w-full">
            <p>
              <span>Subtotal</span>
              <input
                :value="getSubTotal()"
                readonly
                class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0"
                placeholder="Subtotal"
              />
            </p>
            <p>
              <span>Tax</span>
              <input
                type="number"
                class="tax text-right w-[200px] ml-2"
                v-model="data.tax"
              />
            </p>
            <p>
              <span>Total</span>
              <input
                :value="getTotal()"
                readonly
                class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0"
                placeholder="Total"
              />
            </p>
            <!-- <p>
              <span>Balace Due</span>
              <input
                readonly
                class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0"
                placeholder="Balance"
              />
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
input,
input,
textarea {
  border: 1px solid #ddd !important;
  padding: 5px;
  border-radius: 5px;
}
</style>
