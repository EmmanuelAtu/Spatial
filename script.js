// ============================================================
// NOVA CORE — MOBILE NAVIGATION
// ============================================================

(() => {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("mobile-nav");
    if (!toggle || !menu) return;

    const close = () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.hidden = isOpen;
    });

    menu.addEventListener("click", (event) => {
        if (event.target.tagName === "A") close();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
    });
})();


// ============================================================
// NOVA CORE — THREE.JS EXPERIENCE
// Deep Space / Electric Cyan
// ============================================================

const container =
    document.getElementById("three-container");


if (!container) {

    console.warn(
        "Nova Core: #three-container was not found."
    );

} else if (typeof THREE === "undefined") {

    console.error(
        "Nova Core: Three.js failed to load."
    );

} else {


    // ========================================================
    // 01. SCENE
    // ========================================================

    const scene = new THREE.Scene();


    // ========================================================
    // 02. CAMERA
    // ========================================================

    const camera =
        new THREE.PerspectiveCamera(
            38,
            container.clientWidth /
                container.clientHeight,
            0.1,
            100
        );

    camera.position.set(
        0,
        0,
        5
    );


    // ========================================================
    // 03. RENDERER
    // ========================================================

    const renderer =
        new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.75
        )
    );


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.setClearColor(
        0x000000,
        0
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    container.appendChild(
        renderer.domElement
    );


    // ========================================================
    // 04. MAIN CORE GROUP
    // ========================================================

    const coreGroup =
        new THREE.Group();

    scene.add(coreGroup);


    // ========================================================
    // 05. MAIN NOVA CORE
    // ========================================================

    const coreGeometry =
        new THREE.IcosahedronGeometry(
            1.45,
            3
        );


    const coreMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x22d3ee,

            wireframe: true,

            transparent: true,

            opacity: 0.48
        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    coreGroup.add(core);


    // ========================================================
    // 06. INNER CORE
    // ========================================================

    const innerGeometry =
        new THREE.IcosahedronGeometry(
            1.06,
            2
        );


    const innerMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xa5f3fc,

            wireframe: true,

            transparent: true,

            opacity: 0.13
        });


    const innerCore =
        new THREE.Mesh(
            innerGeometry,
            innerMaterial
        );


    innerCore.rotation.x =
        0.45;

    innerCore.rotation.y =
        0.65;


    coreGroup.add(
        innerCore
    );


    // ========================================================
    // 07. OUTER RING
    // ========================================================

    const ringGeometry =
        new THREE.TorusGeometry(
            1.82,
            0.008,
            8,
            96
        );


    const ringMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x22d3ee,

            transparent: true,

            opacity: 0.20
        });


    const ring =
        new THREE.Mesh(
            ringGeometry,
            ringMaterial
        );


    ring.rotation.x =
        Math.PI / 2.3;


    coreGroup.add(
        ring
    );


    // ========================================================
    // 08. SECOND RING
    // ========================================================

    const ring2Geometry =
        new THREE.TorusGeometry(
            1.62,
            0.006,
            8,
            96
        );


    const ring2Material =
        new THREE.MeshBasicMaterial({

            color: 0x6366f1,

            transparent: true,

            opacity: 0.13
        });


    const ring2 =
        new THREE.Mesh(
            ring2Geometry,
            ring2Material
        );


    ring2.rotation.y =
        Math.PI / 2.6;


    coreGroup.add(
        ring2
    );


    // ========================================================
    // 09. AMBIENT PARTICLES
    // ========================================================

    const particleCount = 150;


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            2.15 +
            Math.random() * 1.7;


        const theta =
            Math.random() *
            Math.PI *
            2;


        const phi =
            Math.acos(
                (Math.random() * 2) - 1
            );


        particlePositions[
            i * 3
        ] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        particlePositions[
            i * 3 + 1
        ] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);


        particlePositions[
            i * 3 + 2
        ] =
            radius *
            Math.cos(phi);
    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x67e8f9,

            size: 0.016,

            transparent: true,

            opacity: 0.32,

            sizeAttenuation: true
        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    coreGroup.add(
        particles
    );


    // ========================================================
    // 10. INITIAL POSITION
    // ========================================================

    coreGroup.position.set(
        0.55,
        0,
        0
    );


    coreGroup.scale.setScalar(
        0.92
    );


    // ========================================================
    // 11. RESPONSIVE STATE
    // ========================================================

    let isMobile =
        window.innerWidth <= 800;


    function updateResponsiveSettings() {

        isMobile =
            window.innerWidth <= 800;


        if (isMobile) {

            coreGroup.position.x =
                0.95;

        } else {

            coreGroup.position.x =
                0.55;
        }
    }


    updateResponsiveSettings();


    // ========================================================
    // 12. SCROLL STATE
    // ========================================================

    let targetScroll =
        window.scrollY;


    let currentScroll =
        window.scrollY;


    window.addEventListener(

        "scroll",

        () => {

            targetScroll =
                window.scrollY;

        },

        {
            passive: true
        }
    );


    // ========================================================
    // 13. SMOOTH INTERPOLATION
    // ========================================================

    function lerp(
        start,
        end,
        amount
    ) {

        return (
            start +
            (end - start) *
            amount
        );
    }


    // ========================================================
    // 14. SCROLL BEHAVIOR
    // ========================================================

    function updateScrollEffects() {


        currentScroll =
            lerp(
                currentScroll,
                targetScroll,
                0.075
            );


        const scrollProgress =
            Math.min(
                currentScroll /
                    window.innerHeight,
                3
            );


        // ----------------------------------------------------
        // SCALE
        // ----------------------------------------------------

        const scale =
            lerp(
                0.92,
                0.46,
                Math.min(
                    scrollProgress,
                    1
                )
            );


        coreGroup.scale.setScalar(
            scale
        );


        // ----------------------------------------------------
        // VERTICAL POSITION
        // ----------------------------------------------------

        const targetY =
            -scrollProgress *
            0.72;


        coreGroup.position.y =
            lerp(
                coreGroup.position.y,
                targetY,
                0.08
            );


        // ----------------------------------------------------
        // HORIZONTAL POSITION
        // ----------------------------------------------------

        const targetX =
            isMobile

                ? 1.15

                : 0.55 +
                  scrollProgress *
                  0.65;


        coreGroup.position.x =
            lerp(
                coreGroup.position.x,
                targetX,
                0.08
            );


        // ----------------------------------------------------
        // OPACITY
        // ----------------------------------------------------

        const fadeProgress =
            Math.min(

                Math.max(

                    (
                        scrollProgress -
                        0.1
                    ) / 0.9,

                    0

                ),

                1
            );


        const opacity =
            lerp(
                1,
                0.25,
                fadeProgress
            );


        coreMaterial.opacity =
            0.48 * opacity;


        innerMaterial.opacity =
            0.13 * opacity;


        ringMaterial.opacity =
            0.20 * opacity;


        ring2Material.opacity =
            0.13 * opacity;


        particleMaterial.opacity =
            0.32 * opacity;
    }


    // ========================================================
    // 15. REDUCED MOTION
    // ========================================================

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    // ========================================================
    // 16. ANIMATION
    // ========================================================

    let elapsed = 0;


    function animate(time) {

        elapsed =
            time * 0.001;


        updateScrollEffects();


        if (!prefersReducedMotion) {


            core.rotation.x +=
                0.0017;


            core.rotation.y +=
                0.003;


            innerCore.rotation.x -=
                0.001;


            innerCore.rotation.y +=
                0.0018;


            ring.rotation.z +=
                0.0014;


            ring.rotation.y +=
                0.0006;


            ring2.rotation.x -=
                0.0011;


            ring2.rotation.z +=
                0.0007;


            particles.rotation.y +=
                0.0004;


            particles.rotation.x +=
                0.00012;


            const floatAmount =
                Math.sin(
                    elapsed * 0.75
                ) * 0.0008;


            coreGroup.position.y +=
                floatAmount;
        }


        renderer.render(
            scene,
            camera
        );
    }


    // ========================================================
    // 17. START RENDER LOOP
    // ========================================================

    renderer.setAnimationLoop(
        animate
    );


    // ========================================================
    // 18. RESIZE
    // ========================================================

    function handleResize() {

        const width =
            container.clientWidth;


        const height =
            container.clientHeight;


        if (
            !width ||
            !height
        ) {
            return;
        }


        camera.aspect =
            width / height;


        camera.updateProjectionMatrix();


        renderer.setPixelRatio(

            Math.min(
                window.devicePixelRatio,
                1.75
            )
        );


        renderer.setSize(
            width,
            height,
            false
        );


        updateResponsiveSettings();
    }


    window.addEventListener(
        "resize",
        handleResize
    );


    handleResize();


    // ========================================================
    // 19. PAUSE WHEN TAB HIDDEN
    // ========================================================

    document.addEventListener(
        "visibilitychange",

        () => {

            if (document.visibilityState === "hidden") {

                renderer.setAnimationLoop(null);

            } else {

                renderer.setAnimationLoop(animate);
            }
        }
    );


    // ========================================================
    // 20. CLEANUP
    // ========================================================

    window.addEventListener(

        "beforeunload",

        () => {

            renderer.setAnimationLoop(
                null
            );


            coreGeometry.dispose();

            coreMaterial.dispose();


            innerGeometry.dispose();

            innerMaterial.dispose();


            ringGeometry.dispose();

            ringMaterial.dispose();


            ring2Geometry.dispose();

            ring2Material.dispose();


            particleGeometry.dispose();

            particleMaterial.dispose();


            renderer.dispose();
        }
    );
}