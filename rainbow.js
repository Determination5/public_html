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

// A map of trigger phrases to alert messages for the input field
const secretAlerts = {
    '66': 'Gaster?',
    'sam?': 'What?',
    'seven min': 'Do not even try to finish that sentence.',
    'seven minutes': 'is the time it did not take for you to spare with this secret unless it did in which case...wtf.',
    'joe': 'When is part 4?',
    'frontiers': 'RIP Fan 3',
    'gif': 'I can not put a gif here',
    'speedrunning speed': 'Are they ready for the chaos we can release?',
    'smash': 'Colors weaving into a spire of flames. Distant sparks call to a past still unnamed. Bear this torch against the cold of the night. Search your soul and reawaken the undying light',
    '69': 'Nice',
    'lukas': 'Poyo',
    'ethan': 'Clearly you do not own an airfryer Ethan',
    'clarah': 'REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO REPO',
    'hannah': 'The secret bangers'
};

// Listen for changes on the input field
input.addEventListener('input', (event) => {
    const currentValue = event.target.value.toLowerCase();
    const message = secretAlerts[currentValue];

    // If the input value matches a key in our secretAlerts object...
    if (message) {
        // ...wait 1 second, then show the alert.
        setTimeout(() => {
            alert(message);
        }, 100); // 100 milliseconds = 0.1 second
    }
});