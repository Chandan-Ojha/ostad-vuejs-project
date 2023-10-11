import { reactive, computed } from "vue";

const cartStore = reactive({
  items: {},

  //count total items in cart
  totalCartItems: computed(() => {
    let total = 0;
    for (let id in cartStore.items) {
      total += cartStore.items[id].quantity;
    }
    return total;
  }),

  //calculate total price
  totalPrice: computed(() => {
    let total = 0;
    for (let id in cartStore.items) {
      total += cartStore.items[id].product.price * cartStore.items[id].quantity;
    }
    return parseFloat(total.toFixed(2));
  }),

  //add item into cart
  addItem(product) {
    if (this.items[product.id]) {
      this.items[product.id].quantity++;
    } else {
      this.items[product.id] = {
        product,
        quantity: 1,
      };
    }
    this.saveCartInLocalStorage();
  },

  //remove item from cart
  removeItem(product) {},

  //empty cart
  emptyCart() {
    this.items = {};
    this.saveCartInLocalStorage();
  },

  //save cart in local storage
  saveCartInLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },

  //get cart from local storage
  getCartFromLocalStorage() {
    this.items = JSON.parse(localStorage.getItem("cart")) || {};
  },
});

cartStore.getCartFromLocalStorage();

export { cartStore };
