<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #3B5998; */
}
#nav {
    padding: 30px;
}
.facebook {
    width: 300px;
    height: 80px;
    background-color: #3b5998;
    fill: #3b5998;
    background-image: url('assets/logo2.png');
    background-size: 300px 80px;
}
#nav a {
    font-weight: bold;
    color: #3b5998;
}
ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #3b5998;
}

li {
    width: 100%;
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}
img.resize {
    width: 300px; /* you can use % */
    height: auto;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
