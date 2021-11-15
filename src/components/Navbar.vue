<template>
  <div class="navbar">
    <div @click="$router.push('/')">Навигация</div>
    <div class="navbar__btns">
      <button @click="$router.push('/')">Действия клиентов</button>
      <button @click="$router.push('/submitted')" style="margin-left: 20px">
        Подтвержденные действия клиентов
      </button>
    </div>
  </div>
</template>
