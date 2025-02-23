const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("backgroundCanvas"),
    alpha: true
});
// Set the renderer size to match the browser window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);

// Move the camera back to position it away from the center of the scene
camera.position.z = 7;

// Load textures (images) for the sprites using TextureLoader
// Update this array with 6 image file paths
const textures = [
    "images/k2.png",
    "images/k3.png",
    "images/k4.png",
    "images/k5.png",
    "images/k6.png",
    "images/k7.png"
].map(src => new THREE.TextureLoader().load(src));

// Create sprites from the textures, configure their properties, and add them to the scene
const sprites = textures.map(texture => {
    // Create the material for each sprite using the texture
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true // Allows transparency in the images
    });

    // Create a sprite using the material
    const sprite = new THREE.Sprite(spriteMaterial);

    // Set the size of the sprite (width, height, depth)
    sprite.scale.set(2, 2, 1);

    // Assign a random initial position to the sprite
    sprite.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
        0
    );

    // Attach random speed values to control the sprite's movement
    sprite.userData.speed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02
    };

    // Add the sprite to the scene
    scene.add(sprite);

    // Return the sprite to be stored in the array
    return sprite;
});

// Animation loop to continuously update the scene and render it
function animate() {
    // Update the position of each sprite
    sprites.forEach(sprite => {
        // Move the sprite by adding its speed to its current position
        sprite.position.x += sprite.userData.speed.x;
        sprite.position.y += sprite.userData.speed.y;

        // Reverse the direction of movement if the sprite exceeds the boundary
        if (sprite.position.x > 5 || sprite.position.x < -5) sprite.userData.speed.x *= -1;
        if (sprite.position.y > 3 || sprite.position.y < -3) sprite.userData.speed.y *= -1;
    });

    // Render the current state of the scene using the camera
    renderer.render(scene, camera);

    // Request the next frame of animation
    requestAnimationFrame(animate);
}

// Resize event listener to ensure the canvas and camera adjust when the window size changes
window.addEventListener("resize", () => {
    // Update the renderer size to match the new window dimensions
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update the camera aspect ratio and recalculate its projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the animation loop
animate();