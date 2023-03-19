<template>
  <router-view />
</template>

<style>
:root {
  --primary: #532e94;
  --secondary: #403b44;
  --text: #272727;
  --accent: #cf007f;
  --purple: #482683;
  --cyan: #35b9c8;
  --orange: #ed8a26;
  --clear0: #ffffff;
  --clear1: #efeef4;
  --clear2: #dddce6;
  --clear3: #b8b6c2;
  --clear4: #f5f5f5;
  --dark: #000000;
  --teal: #2f98bd;
  --danger: #ca3c25;
}

@font-face {
  font-family: Museo;
  src: url("./assets/fonts/MuseoSans-100.otf");
  font-weight: 100;
}

@font-face {
  font-family: Museo;
  src: url("./assets/fonts/MuseoSans-300.otf");
  font-weight: 300;
}

@font-face {
  font-family: Museo;
  src: url("./assets/fonts/MuseoSans-500.otf");
  font-weight: 500;
}

@font-face {
  font-family: Museo;
  src: url("./assets/fonts/MuseoSans-700.otf");
  font-weight: 700;
}

#app {
  font-family: "Museo", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  margin: 0;
}
</style>
