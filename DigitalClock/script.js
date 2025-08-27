const clock = document.querySelector('#clock');
// console.log(time);
// console.log(time.toLocaleTimeString());
setInterval(function(){
    const time = new Date();
    clock.textContent = `${time.toLocaleTimeString()}`;
}, 1000);
