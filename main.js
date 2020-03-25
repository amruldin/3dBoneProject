/*
	Author 				: Amruldin Jamalli
	Project Description : Get 3D scanner objects and import them to three js  
	Logic				: Setup scene, camera, load 3d object, load material, setup controls, setup lights
						  render the scene, setup some animation
	Date				: March 25, 2020

*/



// define global variables
let camera, controls, scene, renderer, orbit;
let boneObject = null;



// create a function init to initialize the scene

function init()
{
	// setup the scene
	scene = new THREE.Scene();


	// setup the camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1,1000);

	// setup camera position
	camera.position.z = 250;


	// Load your object

	let mtlLoader = new THREE.MTLLoader();

	// setup texture path
	mtlLoader.setTexturePath('assets/bone123/');
	
	// setup the path to the actual material (mtl) file
	mtlLoader.setPath('assets/bone123/');

	// Load the material and then the object

	mtlLoader.load('bone1234.mtl',(material)=>{
		// preload the material
		material.preload();

		// instantitiace object loader
		let objLoader = new THREE.OBJLoader();

		// Assign Material to the object
		objLoader.setMaterials(material);

		// Call load fucntion to load the object
		objLoader.setPath('assets/bone123/')
		objLoader.load('bone1234.obj',(object)=>{
			
			// asigne the object to your global object variable
			boneObject = object;

			// Set the postion of the the bone on the screen
			// boneObject.position.x -= 50;

			// Add the object ot the scene
			scene.add(boneObject);


		}); // end object loader

	});// end material loader


	// add some light to the scene
	let light = new THREE.AmbientLight('white',1);
	scene.add(light);
	// Now render the object to the browser

	let light2 = new THREE.DirectionalLight('white',1);
	//light2.target = boneObject;
	scene.add(light2);


	// instantiate the web gl renderer
	renderer = new THREE.WebGLRenderer();

	// set the pixels
	renderer.setPixelRatio(window.devicePixelRatio);


	// set the size of the renderer
	renderer.setSize(window.innerWidth,window.innerHeight);

	// set the background color
	renderer.setClearColor('#42bff5');

	// append the render to the document
	document.body.appendChild(renderer.domElement);



	// Setup orbit function on the 3d object

	// instantiate the orbjt class
	orbit = new THREE.OrbitControls(camera, renderer.domElement);
	orbit.enableDamping = true;
	orbit.dampingFactor = 0.25;
	orbit.enableZoom = true;

}


// create an animation function to animate the object

function animate(){
	// animate 60 frame per second
	requestAnimationFrame(animate);
	
	// update the orbit on change
	orbit.update();

	// give the object a normal animation
	if(boneObject)
	{
		boneObject.rotation.y += 0.005;
	}

	// Call your render function
	render();

}


// call a render function
function render(){
	renderer.render(scene,camera);
}


function resize(){

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);


}

window.addEventListener('resize', resize);

// call your function to execute the animation
init();
animate();




// From dom
let yes = document.getElementById('yes');
let no = document.getElementById('no');
let submit = document.getElementById('submit');
let quizBox = document.querySelector('.quizBox');
let result = document.getElementById('result');



submit.addEventListener('click',()=>{

	
	if(yes.checked){
		result.innerHTML = 'Great, Correct!';
		result.style.color = 'darkgreen';

	}
	else{
		result.innerHTML = 'Incorrect!';
		result.style.color = 'darkred';

	}

});



