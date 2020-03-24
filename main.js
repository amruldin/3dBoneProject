
// Author Amruldin Jamalli

let camera, controls, scene, renderer,orbit;
let myObject = null;

//animate();



function init()
{
    // Define the camera
    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
    camera.position.z = 50;

    

    scene = new THREE.Scene();

    

    let light = new THREE.AmbientLight('white',2);
    light.position.set(100,10,-100);
    scene.add(light);


    let light2 = new THREE.DirectionalLight('green',0.5);
    light2.position.set(-100,0,100);
    scene.add(light2);

    //let geometry = new THREE.BoxGeometry(1,1,1);
    //let material = new THREE.MeshBasicMaterial({color:0x00ff00});


    let mtlLoader = new THREE.MTLLoader();

    mtlLoader.setTexturePath('assets/');
    mtlLoader.setPath('assets/');

    mtlLoader.load('box.mtl',(material)=>{
        material.preload();

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(material);
        objLoader.load('assets/box.obj',(object)=>{
            myObject = object;
            myObject.position.z -= 0;
            scene.add(object);

        })


    });


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor('#DDDDDD');
    document.body.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.addEventListener('change',render);

    renderer.render(scene,camera);

    // Orbit Control
    orbit = new THREE.OrbitControls(camera,renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.25;

}






function animate()
{
    requestAnimationFrame(animate);
    controls.update();
    orbit.update();
    if(myObject)
    {   console.log('Object is loaded');
        //myObject.rotation.y += 0.01;

    }
    else{
        console.log('Object not Loaded!');
    }

    
    render();

}

function render(){
    renderer.render(scene,camera);
}

init();
animate();
