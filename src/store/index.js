import { createStore } from "vuex";

export default createStore({
  state: {
    //localstorage только для демонстрации работы
    sessions: JSON.parse(localStorage.getItem("sessions")) || {},
    submittedSessions:
      JSON.parse(localStorage.getItem("submittedSessions")) || {},
  },
  mutations: {
    addSessions(state, sessions) {
      sessions.forEach((session) => {
        state.sessions[session.sessionId] = session;
      });
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    increaseProduct(state, { product, sessionId }) {
      state.sessions[sessionId].cart[
        state.sessions[sessionId].cart.findIndex(
          (i) => i.productName === product.productName
        )
      ].productCount += 1;
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    decreaseProduct(state, { product, sessionId }) {
      state.sessions[sessionId].cart[
        state.sessions[sessionId].cart.findIndex(
          (i) => i.productName === product.productName
        )
      ].productCount -= 1;
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    removeProduct(state, { product, sessionId }) {
      state.sessions[sessionId].cart.splice(
        state.sessions[sessionId].cart.findIndex(
          (i) => i.productName === product.productName
        ),
        1
      );
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    addProduct(state, { product, sessionId }) {
      state.sessions[sessionId].cart.push(product);
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    addToExistingProduct(state, { product, sessionId }) {
      state.sessions[sessionId].cart[
        state.sessions[sessionId].cart.findIndex(
          (i) => i.productName === product.productName
        )
      ].productCount += product.productCount;
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    setTime(state, { timeEnter, timeExit, sessionId }) {
      state.sessions[sessionId].entryTime = timeEnter;
      state.sessions[sessionId].exitTime = timeExit;
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
    },
    setSessionSubmitted(state, session) {
      state.submittedSessions[session.sessionId] = session;
      delete state.sessions[session.sessionId];
      console.log(state.submittedSessions);
      localStorage.setItem("sessions", JSON.stringify(state.sessions));
      localStorage.setItem(
        "submittedSessions",
        JSON.stringify(state.submittedSessions)
      );
    },
  },
  actions: {
    decreaseOrRemoveProduct(context, { product, sessionId }) {
      if (product.productCount === 1) {
        context.commit("removeProduct", { product, sessionId });
      } else {
        context.commit("decreaseProduct", { product, sessionId });
      }
    },
    checkExistingProduct(context, { product, sessionId }) {
      const index = this.state.sessions[sessionId].cart.findIndex(
        (i) => i.productName === product.productName
      );

      if (index != -1)
        context.commit("addToExistingProduct", { product, sessionId });
      else context.commit("addProduct", { product, sessionId });
    },
    getSessions(context) {
      if (localStorage.getItem("sessions")) return;

      try {
        const urls = ["./trunstile-events.json", "./events.json"];
        const promises = urls.map((url) => fetch(url).then((r) => r.json()));

        Promise.all(promises).then((results) =>
          context.dispatch("handleSessions", results)
        );
      } catch (e) {
        console.error(e);
      }
    },
    handleSessions(context, data) {
      //Массив с событиями входа/выхода преобразуется в массив посещений res
      //с данными id клиента, временем входа и временем выхода, пустой корзиной
      const res = data[0].reduce((a, { sessionId, timestamp, type }) => {
        const index = a.findIndex((i) => i.sessionId === sessionId);
        const timestampType = type === "open" ? "entryTime" : "exitTime";
        const dateType = type === "open" ? "entryDate" : "exitDate";
        const date = new Date(timestamp * 1000).toLocaleDateString();
        const time = new Date(timestamp * 1000).toLocaleTimeString();

        if (index === -1) {
          a.push({
            sessionId: sessionId,
            [dateType]: date,
            [timestampType]: time,
            cart: [],
          });
        } else {
          a[index][timestampType] = time;
          a[index][dateType] = date;
        }

        return a;
      }, []);

      //Данные из массива действий с продуктами отправляются в корзины массива посещений
      //в соответствии с id клиента
      data[1].forEach(({ productCount, productName, sessionId }) => {
        const index = res.findIndex(
          (session) => session.sessionId === sessionId
        );

        res[index].cart.push({ productCount, productName });
      });

      //Перебор корзин клиентов; в случае если клиент вернул все на полку, товар из корзины
      //исключается.
      res.forEach((i) => {
        i.cart = Object.entries(
          i.cart.reduce((acc, entry) => {
            const product = entry.productName;

            if (acc[product]) acc[product] += entry.productCount;
            else acc[product] = entry.productCount;

            return acc;
          }, {})
        ).map(([productName, productCount]) => ({
          productName,
          productCount,
        }));

        i.cart = i.cart.filter((item) => item.productCount < 0);
        i.cart.forEach(
          (product) => (product.productCount = Math.abs(product.productCount))
        );
      });

      context.commit("addSessions", res);
    },
  },
});
