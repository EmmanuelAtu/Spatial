/* =========================================================
   NOVA CORE
   Three.js Interactive 3D Core
   ========================================================= */

const container = document.getElementById("three-container");


// =========================================================
// SCENE
// =========================================================

const scene = new THREE.Scene();


// =========================================================
// CAMERA
// =========================================================

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 5;


// =========================================================
// RENDERER
// =========================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


// =========================================================
// NOVA CORE GROUP
// =========================================================

const core = new THREE.Group();

scene.add(core);


// =========================================================
// MAIN WIREFRAME SPHERE
// =========================================================

const sphereGeometry = new THREE.IcosahedronGeometry(
    1.55,
    4
);

const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.48
});

const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
);

core.add(sphere);


// =========================================================
// SECONDARY INNER SPHERE
// =========================================================

const innerGeometry = new THREE.IcosahedronGeometry(
    1.18,
    2
);

const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    wireframe: true,
    transparent: true,
    opacity: 0.18
});

const innerSphere = new THREE.Mesh(
    innerGeometry,
    innerMaterial
);

core.add(innerSphere);


// =========================================================
// OUTER ORBIT RINGS
// =========================================================

function createRing(radius, rotation) {

    const geometry =
        new THREE.TorusGeometry(
            radius,
            0.008,
            8,
            120
        );

    const material =
        new THREE.MeshBasicMaterial({
            color: 0x00ffcc,
            transparent: true,
            opacity: 0.45
        });

    const ring =
        new THREE.Mesh(
            geometry,
            material
        );

    ring.rotation.x = rotation.x;
    ring.rotation.y = rotation.y;
    ring.rotation.z = rotation.z;

    core.add(ring);

    return ring;
}


const ringOne = createRing(
    1.95,
    {
        x: Math.PI / 2.5,
        y: 0.3,
        z: 0
    }
);

const ringTwo = createRing(
    2.1,
    {
        x: 0.5,
        y: Math.PI / 2,
        z: 0.5
    }
);

const ringThree = createRing(
    2.25,
    {
        x: 1,
        y: 0.3,
        z: 0.7
    }
);


// =========================================================
// PARTICLE FIELD
// =========================================================

const particleCount = 900;

const particleGeometry =
    new THREE.BufferGeometry();

const particlePositions =
    new Float32Array(
        particleCount * 3
    );

for (let i = 0; i < particleCount; i++) {

    const radius =
        2.3 + Math.random() * 1.8;

    const theta =
        Math.random() * Math.PI * 2;

    const phi =
        Math.acos(
            (Math.random() * 2) - 1
        );

    particlePositions[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

    particlePositions[i * 3 + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    particlePositions[i * 3 + 2] =
        radius *
        Math.cos(phi);
}

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        particlePositions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.012,
        transparent: true,
        opacity: 0.5
    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

core.add(particles);


// =========================================================
// SCROLL STATE
// =========================================================

let scrollY = window.scrollY;

let targetRotation = 0;
let targetVertical = 0;


// =========================================================
// SCROLL LISTENER
// =========================================================

window.addEventListener(
    "scroll",
    () => {

        scrollY = window.scrollY;

        /*
         * Rotation:
         *
         * Every 100px of scrolling adds
         * approximately 0.12 radians.
         *
         * This means scrolling down causes
         * the Core to rotate continuously.
         */

        targetRotation =
            scrollY * 0.0012;


        /*
         * Vertical movement:
         *
         * Math.sin() produces a smooth
         * floating movement as the user scrolls.
         */

        targetVertical =
            Math.sin(scrollY * 0.003) * 0.45;

    },
    {
        passive: true
    }
);


// =========================================================
// ANIMATION LOOP
// =========================================================

let time = 0;

function animate() {

    requestAnimationFrame(animate);

    time += 0.01;


    // -----------------------------------------------------
    // 1. AUTONOMOUS ROTATION
    // -----------------------------------------------------

    core.rotation.y += 0.0025;

    core.rotation.x += 0.0005;


    // -----------------------------------------------------
    // 2. SCROLL-BASED ROTATION
    // -----------------------------------------------------

    /*
     * Smoothly approach the rotation dictated
     * by scroll position.
     */

    core.rotation.y +=
        (targetRotation - core.rotation.y) * 0.018;


    // -----------------------------------------------------
    // 3. SCROLL-BASED VERTICAL POSITION
    // -----------------------------------------------------

    const desiredY =
        targetVertical +
        Math.sin(time) * 0.08;

    core.position.y +=
        (desiredY - core.position.y) * 0.025;


    // -----------------------------------------------------
    // 4. INDIVIDUAL OBJECT ROTATION
    // -----------------------------------------------------

    innerSphere.rotation.y -= 0.003;
    innerSphere.rotation.x += 0.001;

    ringOne.rotation.z += 0.002;
    ringTwo.rotation.x -= 0.0015;
    ringThree.rotation.y += 0.001;

    particles.rotation.y += 0.00025;


    // -----------------------------------------------------
    // 5. SUBTLE BREATHING EFFECT
    // -----------------------------------------------------

    const scale =
        1 + Math.sin(time * 1.5) * 0.025;

    core.scale.set(
        scale,
        scale,
        scale
    );


    // -----------------------------------------------------
    // RENDER
    // -----------------------------------------------------

    renderer.render(
        scene,
        camera
    );
}


// =========================================================
// RESPONSIVE RESIZE
// =========================================================

function resizeRenderer() {

    const width =
        container.clientWidth;

    const height =
        container.clientHeight;

    camera.aspect =
        width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(
        width,
        height
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );
}

window.addEventListener(
    "resize",
    resizeRenderer
);


// =========================================================
// START
// =========================================================

resizeRenderer();
animate();