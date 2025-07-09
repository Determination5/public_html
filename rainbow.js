console.log("hello world")

let element = document.getElementById("tswcontainer")
let input = document.getElementById("my-input")
let angle = 0;
let shouldrainbow = true;

function onframe() {
    angle += 1
    let string = "hsl(" + angle + "deg, 100%, 50%)";
    if (shouldrainbow) {
     element.style.backgroundColor = string
    }
          //console.log(string)
    requestAnimationFrame(onframe)
}
onframe()

function start_rainbow(){
    shouldrainbow = true;
}

function onlmbclick(event){
    console.log(input.value)
    shouldrainbow = false;
    element.style.backgroundColor = input.value;
    setTimeout(start_rainbow,1000)        
}

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === '66') {
        alert('Gaster?');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'sam?') {
        alert('What?');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'seven min') {
        alert('Do not even try to finish that sentence.');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'seven minutes') {
        alert('is the time it did not take for you to spare with this secret unless it did in which case...wtf.');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'joe') {
        alert('When is part 4?');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'frontiers') {
        alert('RIP Fan 3');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'gif') {
        alert('I can not put a gif here');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'speedrunning speed') {
        alert('Are they ready for the chaos we can release?');
    }
});

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value;

    // Check for a specific value, ignoring case
    if (currentValue.toLowerCase() === 'smash') {
        alert('Colors weaving into a spire of flames. Distant sparks call to a past still unnamed. Bear this torch against the cold of the night. Search your soul and reawaken the undying light');
    }
});