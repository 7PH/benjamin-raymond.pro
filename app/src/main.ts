import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";
import {AnimatedBackground} from "./animation/nodes/AnimatedBackground";

async function start() {

    let pagePreview: HTMLElement | null = document.getElementById('page-preview');
    let pageContent: HTMLElement | null = document.getElementById('page-content');

    if (pagePreview === null || pageContent === null)
        return alert("Error. Please try to refresh the page");

    pagePreview.style.display = 'none';
    pageContent.style.display = 'block';

    // animation
    const stage: Stage = new Stage('animation-canvas');
    const nodeContainer: NodeContainer = new NodeContainer(stage);
    nodeContainer.populate();
    stage.addChild(nodeContainer);
    stage.addChildAt(new AnimatedBackground(stage), 0);
    stage.run();

    // fps counter
    setInterval(() => {
        const fps = (1 / stage.lastDelta);
        let el = document.getElementById('fps');
        if (el === null)
            return;
        el.innerHTML = Math.floor(fps).toString();
    }, 1000);

    // start sound
    setTimeout(async () => {

        await AudioHandler.play();
    }, 400);
}

let songs: string[] = [
    'assets/crossfire.webm',
    'assets/glitchmob.ogg',
    'assets/liftmefromtheground.webm',
    'assets/sandblast.webm',
    'assets/odd-look.mp3'
].map(path => 'https://benjamin-raymond.pro/' + path);

let songIndex: number = parseInt(window.location.hash.replace('#', ''));
console.log("Song index:", songIndex);
AudioHandler.init(songs[songIndex] || songs[0]);
document.addEventListener('click', start);
