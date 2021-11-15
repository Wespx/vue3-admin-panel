<template>
  <li class="sessions__item card">
    <header class="card__header">
      <div class="card__customer-icon">
        <icon-base width="50" height="50" icon-name="user"
          ><icon-user
        /></icon-base>
      </div>

      <div class="card__customer-data">
        Клиент
        <p class="card__customer-id">
          <span class="card__customer-name">{{ session.sessionId }}</span>
        </p>
        <time class="card__customer-entry-exit-time">{{
          session.entryTime + " - " + session.exitTime
        }}</time>
        <time class="card__customer-date">{{ session.entryDate }}</time>
      </div>

      <div class="card__unlocked-icon">
        <icon-base
          width="50"
          height="50"
          icon-name="unlocked"
          icon-color="rgb(11, 100, 11)"
          ><icon-unlocked
        /></icon-base>
      </div>
    </header>

    <div class="card__enter-time">
      <div class="card__time-error">{{ errorTimeMsg }}</div>
      <div class="card__enter-wrap">
        <div class="card__enter-highlight">Вход:</div>
        <button
          class="card__enter-exit-edit"
          v-show="!formTimeEnterVisible"
          @click="this.formTimeEnterVisible = true"
        >
          <icon-base width="18" height="18" icon-name="edit"
            ><icon-edit
          /></icon-base>
        </button>
        <time class="card__customer-enter-time" v-show="!formTimeEnterVisible">
          {{ session.entryTime }}
        </time>
        <form
          class="card__edit-time-form"
          @submit.prevent
          v-show="formTimeEnterVisible"
        >
          <input
            type="number"
            min="00"
            max="23"
            class="card__edit-time-input"
            placeholder="ЧЧ"
          />
          <input
            type="number"
            min="00"
            max="59"
            class="card__edit-time-input"
            placeholder="ММ"
          />
          <input
            type="number"
            min="00"
            max="59"
            class="card__edit-time-input"
            placeholder="СС"
          />
          <button
            type="submit"
            class="card__edit-time-accept"
            @click="
              setTimeOnClick(
                session.entryTime,
                session.exitTime,
                $event,
                'enter'
              )
            "
          >
            <icon-base
              width="22"
              height="22"
              icon-name="accept"
              icon-color="rgb(11, 100, 11)"
              ><icon-accept
            /></icon-base>
          </button>

          <button
            class="card__edit-time-cancel"
            @click="
              this.formTimeEnterVisible = false;
              this.errorTimeMsg = '';
            "
          >
            <icon-base
              width="22"
              height="22"
              icon-name="cancel"
              icon-color="tomato"
              ><icon-cancel
            /></icon-base>
          </button>
        </form>
      </div>
    </div>

    <div class="card__exit-time">
      <div class="card__exit-wrap">
        <div class="card__exit-highlight">Выход:</div>
        <button
          class="card__enter-exit-edit"
          v-show="!formTimeExitVisible"
          @click="this.formTimeExitVisible = true"
        >
          <icon-base width="18" height="18" icon-name="edit"
            ><icon-edit
          /></icon-base>
        </button>
        <time class="card__customer-exit-time" v-show="!formTimeExitVisible">
          {{ session.exitTime }}
        </time>
        <form
          class="card__edit-time-form"
          @submit.prevent
          v-show="formTimeExitVisible"
        >
          <input
            type="number"
            min="00"
            max="23"
            class="card__edit-time-input"
            placeholder="ЧЧ"
          />
          <input
            type="number"
            min="00"
            max="59"
            class="card__edit-time-input"
            placeholder="ММ"
          />
          <input
            type="number"
            min="00"
            max="59"
            class="card__edit-time-input"
            placeholder="СС"
          />
          <button
            type="submit"
            class="card__edit-time-accept"
            @click="
              setTimeOnClick(
                session.entryTime,
                session.exitTime,
                $event,
                'exit'
              )
            "
          >
            <icon-base
              width="22"
              height="22"
              icon-name="accept"
              icon-color="rgb(11, 100, 11)"
              ><icon-accept
            /></icon-base>
          </button>

          <button
            class="card__edit-time-cancel"
            @click="
              this.formTimeExitVisible = false;
              this.errorTimeMsg = '';
            "
          >
            <icon-base
              width="22"
              height="22"
              icon-name="cancel"
              icon-color="tomato"
              ><icon-cancel
            /></icon-base>
          </button>
        </form>
      </div>
    </div>

    <ul class="card__products">
      <products-item
        v-for="product in session.cart"
        :product="product"
        :sessionId="session.sessionId"
        :key="session.cart.indexOf(product)"
      >
      </products-item>
    </ul>

    <div class="card__action-buttons">
      <button
        class="card__add-product"
        @click="this.formProductVisible = true"
        v-show="!formProductVisible"
      >
        Добавить продукт
      </button>

      <button
        class="card__save"
        v-show="!formProductVisible"
        @click="this.$store.commit('setSessionSubmitted', session)"
      >
        Сохранить карточку
      </button>

      <form
        class="card__form-add-product"
        v-show="formProductVisible"
        @submit.prevent
      >
        <input
          type="text"
          class="card__add-product-input"
          placeholder="Наименование продукта"
          v-model="product.productName"
        />
        <input
          type="number"
          min="1"
          class="card__add-product-input"
          placeholder="Количество продуктов"
          v-model="product.productCount"
        />
        <button
          type="submit"
          class="card__add-product-accept"
          @click="addProductOnClick(this.product, session.sessionId)"
        >
          Добавить
          <icon-base
            width="14"
            height="14"
            icon-name="accept"
            icon-color="rgb(11, 100, 11)"
            ><icon-accept
          /></icon-base>
        </button>

        <span class="card__error-msg">{{ errorMsg }}</span>

        <button
          class="card__add-product-cancel"
          @click="
            this.formProductVisible = false;
            this.errorMsg = '';
          "
        >
          Отменить
          <icon-base
            width="14"
            height="14"
            icon-name="cancel"
            icon-color="tomato"
            ><icon-cancel
          /></icon-base>
        </button>
      </form>
    </div>
  </li>
</template>

<script>
import ProductsItem from "./ProductsItem.vue";

import IconBase from "../components/IconBase.vue";
import IconUser from "./icons/IconUser.vue";
// import IconLocked from "./icons/IconLocked.vue"
import IconUnlocked from "./icons/IconUnlocked.vue";
import IconEdit from "./icons/IconEdit.vue";
import IconAccept from "./icons/IconAccept.vue";
import IconCancel from "./icons/IconCancel.vue";

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      product: {
        productCount: "",
        productName: "",
      },
      formProductVisible: false,
      formTimeEnterVisible: false,
      formTimeExitVisible: false,
      errorMsg: "",
      errorTimeMsg: "",
    };
  },
  methods: {
    ...mapActions({
      checkExistingProduct: "checkExistingProduct",
    }),
    ...mapMutations({
      setTime: "setTime",
      setSessionSubmitted: "setSessionSubmitted",
    }),
    addProductOnClick(product, sessionId) {
      if (!this.checkFormProduct()) return;

      product.productCount = parseInt(product.productCount, 10);
      this.$store.dispatch("checkExistingProduct", { product, sessionId });
      this.formProductVisible = false;

      this.product = {
        productCount: "",
        productName: "",
      };
    },
    setTimeOnClick(entryTime, exitTime, event, type) {
      const newTime = this.checkFormTime(entryTime, exitTime, event, type);
      const sessionId = this.session.sessionId;
      const timeEnter = type === "enter" ? newTime : entryTime;
      const timeExit = type === "exit" ? newTime : exitTime;

      if (!newTime) return;
      if (type === "enter") this.formTimeEnterVisible = false;
      if (type === "exit") this.formTimeExitVisible = false;

      this.$store.commit("setTime", { timeEnter, timeExit, sessionId });
    },
    checkFormProduct() {
      if (
        this.product.productCount === "" ||
        this.product.productName.trim() === ""
      ) {
        this.errorMsg = "Поля не должны быть пустыми";
        return false;
      }

      if (
        this.product.productName.length < 2 ||
        this.product.productName.length > 50
      ) {
        this.errorMsg = "Введите корректное наименование товара";
        return false;
      }

      if (parseInt(this.product.productCount) <= 0) {
        this.errorMsg = "Количество товара не может быть меньше 0";
        return false;
      }

      if (parseInt(this.product.productCount) > 200) {
        this.errorMsg = "Слишком много товара (больше 200)";
        return false;
      }

      this.errorMsg = "";
      return true;
    },
    checkFormTime(entryTime, exitTime, event, type) {
      const form = event.target.closest("form");
      const hh = (
        "0" + parseInt(form.querySelector('[placeholder="ЧЧ"]').value, 10)
      ).slice(-2);
      const mm = (
        "0" + parseInt(form.querySelector('[placeholder="ММ"]').value, 10)
      ).slice(-2);
      const ss = (
        "0" + parseInt(form.querySelector('[placeholder="СС"]').value, 10)
      ).slice(-2);
      const newTime = `${hh}:${mm}:${ss}`;

      if ((!hh && hh !== 0) || (!mm && mm !== 0) || (!ss && ss !== 0)) {
        this.errorTimeMsg = "Все поля должны быть заполнены";
        return false;
      }

      if (hh < 0 || mm < 0 || ss < 0 || hh > 23 || mm > 59 || ss > 59) {
        this.errorTimeMsg =
          "Введено одно или несколько недопустимых значений времени";
        return false;
      }

      if (type === "enter" && newTime > exitTime) {
        this.errorTimeMsg = "Время входа не может быть позже времени выхода";
        return false;
      }

      if (type === "exit" && newTime < entryTime) {
        this.errorTimeMsg = "Время выхода не может быть раньше времени входа";
        return false;
      }

      this.errorTimeMsg = "";
      return newTime;
    },
  },
  components: {
    ProductsItem,
    IconBase,
    IconUser,
    IconUnlocked,
    IconEdit,
    IconAccept,
    IconCancel,
  },
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
};
</script>
