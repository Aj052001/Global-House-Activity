// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import ThreeGlobe from "three-globe";
// import countries from "./files/globe-data-min.json";
// import travelHistory from "./files/my-flights.json";

// const Globe = React.memo(() => {
//   const globeRef = useRef(null);
//   const animationRef = useRef(null);
//   const raycaster = useRef(new THREE.Raycaster());
//   const mouseX = useRef(0);
//   const mouseY = useRef(0);
//   const windowHalfX = useRef(window.innerWidth / 5);
//   const windowHalfY = useRef(window.innerHeight / 5);
//   const renderer = useRef(new THREE.WebGLRenderer({ antialias: true }));
//   const camera = useRef(new THREE.PerspectiveCamera());
//   const scene = useRef(new THREE.Scene());
//   const controls = useRef(
//     new OrbitControls(camera.current, renderer.current.domElement)
//   );

//   // Sample data for markers
//   const locations = [
//     { lat: 28.6139, lng: 77.209, name: "Delhi", color: "#ff0000" },
//     { lat: 40.7128, lng: -74.006, name: "New York", color: "#00ff00" },
//     { lat: 51.5074, lng: -0.1278, name: "London", color: "#0000ff" },
//     { lat: 35.6895, lng: 139.6917, name: "Tokyo", color: "#ffff00" },
//     { lat: -33.8688, lng: 151.2093, name: "Sydney", color: "#ff00ff" },
//     { lat: 48.8566, lng: 2.3522, name: "Paris", color: "#00ffff" },
//     { lat: 55.7558, lng: 37.6173, name: "Moscow", color: "#ff7700" },
//   ];
  

//   useEffect(() => {
//     const onWindowResize = () => {
//       const container = globeRef.current;
//       if (container) {
//         const width = container.offsetWidth;
//         const height = container.offsetHeight;
//         camera.current.aspect = width / height;
//         camera.current.updateProjectionMatrix();
//         renderer.current.setSize(width, height);
//         windowHalfX.current = width / 2;
//         windowHalfY.current = height / 2;
//       }
//     };

//     const onMouseMove = (event) => {
//       mouseX.current = event.clientX - windowHalfX.current;
//       mouseY.current = event.clientY - windowHalfY.current;
//     };

//     const animate = () => {
//       scene.current.rotation.y -= 0.0005;

//       camera.current.position.x +=
//         Math.abs(mouseX.current) <= windowHalfX.current / 2
//           ? (mouseX.current / 2 - camera.current.position.x) * 0.005
//           : 0;
//       camera.current.position.y +=
//         (-mouseY.current / 2 - camera.current.position.y) * 0.005;
//       camera.current.lookAt(scene.current.position);
//       controls.current.update();
//       renderer.current.render(scene.current, camera.current);
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     const init = () => {
//       const container = globeRef.current;
//       if (!container) return;

//       renderer.current.setPixelRatio(window.devicePixelRatio);
//       renderer.current.setSize(container.offsetWidth, container.offsetHeight);
//       container.appendChild(renderer.current.domElement);

//       scene.current.add(new THREE.AmbientLight(0xffffff, 0.5));
//       const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//       dirLight.position.set(5, 3, 4);
//       scene.current.add(dirLight);
//       scene.current.background = new THREE.Color(0x030712);

//       camera.current.aspect = container.offsetWidth / container.offsetHeight;
//       camera.current.position.z = 400;
//       camera.current.position.x = 0;
//       camera.current.position.y = 0;
//       camera.current.updateProjectionMatrix();

//       controls.current.enableDamping = true;
//       controls.current.dynamicDampingFactor = 0.01;
//       controls.current.enablePan = false;
//       controls.current.enableZoom = false; // Disable zoom functionality
//       controls.current.rotateSpeed = 0.8;
//       controls.current.autoRotate = false;
//       controls.current.minPolarAngle = Math.PI / 3.5;
//       controls.current.maxPolarAngle = Math.PI - Math.PI / 3;

//       window.addEventListener("resize", onWindowResize);
//       document.addEventListener("mousemove", onMouseMove);
//     };

//     const initGlobe = () => {
//       const Globe = new ThreeGlobe({
//         waitForGlobeReady: true,
//         animateIn: true,
//       })
//         .hexPolygonsData(countries.features)
//         .hexPolygonResolution(3)
//         .hexPolygonMargin(0.7)
//         .showAtmosphere(true)
//         .atmosphereColor("#3a228a")
//         .atmosphereAltitude(0.25)
//         .hexPolygonColor((e) =>
//           ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
//             e.properties.ISO_A3
//           )
//             ? "rgba(255,255,255, 1)"
//             : "rgba(255,255,255, 0.7)"
//         )
//         .pointsData(locations)
//         .pointAltitude(0.1) // Marker altitude
//         .pointColor((e) => e.color)
//         .pointRadius(2) // Marker size
//         .pointResolution(12); // Marker resolution

//       setTimeout(() => {
//         Globe.arcsData(travelHistory.flights)
//           .arcColor((e) => (e.status ? "#00ff00" : "#ff0000"))
//           .arcAltitude((e) => e.arcAlt)
//           .arcStroke((e) => (e.status ? 0.5 : 0.3))
//           .arcDashLength(0.9)
//           .arcDashGap(4)
//           .arcDashAnimateTime(1000)
//           .arcsTransitionDuration(1000)
//           .arcDashInitialGap((e) => e.order * 1);
//       }, 1000);

//       Globe.rotateY(-Math.PI * (5 / 9));
//       Globe.rotateZ(-Math.PI / 6);
//       const globeMaterial = Globe.globeMaterial();
//       globeMaterial.color = new THREE.Color(0x3a228a);
//       globeMaterial.emissive = new THREE.Color(0x220038);
//       globeMaterial.emissiveIntensity = 0.1;
//       globeMaterial.shininess = 0.7;
//       globeMaterial.opacity = 0.2;
//       globeMaterial.transparent = true;

//       scene.current.add(Globe);
//     };

//     init();
//     initGlobe();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationRef.current);
//       window.removeEventListener("resize", onWindowResize);
//       document.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       ref={globeRef}
//       style={{
//         width: "33%",
//         height: "65%",
//         position: "absolute",
//         left: "17%",
//       }}
//     />
//   );
// });

// // Add displayName for debugging purposes
// Globe.displayName = "Globe";

// export default Globe;


//update one 







import React, { useEffect,useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ThreeGlobe from "three-globe";
import countries from "./files/globe-data-min.json";
import { Text } from "troika-three-text";
import travelHistory from "./files/my-flights.json";
const Globe = React.memo(() => {
  const globeRef = useRef(null);
  const animationRef = useRef(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const renderer = useRef(new THREE.WebGLRenderer({ antialias: true }));
  const camera = useRef(new THREE.PerspectiveCamera());
  const scene = useRef(new THREE.Scene());
  const controls = useRef(
    new OrbitControls(camera.current, renderer.current.domElement)
  );
  const [popupInfo, setPopupInfo] = useState({ visible: false, location: '' });

  // Sample data for markers
  const locations = [
    { lat: 28.6139, lng: 77.209, name: "Delhi", color: "#0000ff" },
    { lat: 40.7128, lng: -74.006, name: "New York", color: "#0000ff" },
    { lat: 51.5074, lng: -0.1278, name: "London", color: "#0000ff" },
    { lat: 35.6895, lng: 139.6917, name: "Tokyo", color: "#0000ff" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney", color: "#0000ff" },
    { lat: 48.8566, lng: 2.3522, name: "Paris", color: "#0000ff" },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", color: "#0000ff" },
  ];

  useEffect(() => {
    const onWindowResize = () => {
      const container = globeRef.current;
      if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        camera.current.aspect = width / height;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(width, height);
      }
    };

    const onMouseClick = (event) => {
      const container = globeRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycaster logic to detect click on markers
        raycaster.current.setFromCamera(mouse.current, camera.current);
        const intersects = raycaster.current.intersectObjects(scene.current.children, true);

        // Check if a marker with userData.name is clicked
        if (intersects.length > 0) {
          const clickedObject = intersects[0].object;
          if (clickedObject.userData && clickedObject.userData.name) {
            const locationName = clickedObject.userData.name;
            //             const locationName = clickedObject.userData.name;
            setPopupInfo({ visible: true, location: locationName });
          }
        }
      }
    };

    const onMouseMove = (event) => {
      const container = globeRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycaster logic to detect hovering over markers
        raycaster.current.setFromCamera(mouse.current, camera.current);
        const intersects = raycaster.current.intersectObjects(scene.current.children);

        if (intersects.length > 0) {
          container.style.cursor = "pointer"; // Change cursor to pointer
        } else {
          container.style.cursor = "default"; // Reset cursor to default
        }
      }
    };

    const animate = () => {
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    const init = () => {
      const container = globeRef.current;
      if (!container) return;

      renderer.current.setPixelRatio(window.devicePixelRatio);
      renderer.current.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.current.domElement);

      scene.current.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 3, 4);
      scene.current.add(dirLight);
      scene.current.background = new THREE.Color(0x030712);

      camera.current.aspect = container.offsetWidth / container.offsetHeight;
      camera.current.position.z = 400;
      camera.current.position.x = 0;
      camera.current.position.y = 0;
      camera.current.updateProjectionMatrix();

      // Enable rotation and zoom
      controls.current.enableDamping = true;
      controls.current.dynamicDampingFactor = 0.01;
      controls.current.enablePan = false; // Pan disabled for smoother experience
      controls.current.enableZoom = true; // Enable zoom
      controls.current.rotateSpeed = 1; // Adjust rotation speed
      controls.current.autoRotate = true; // Enable auto rotation
      controls.current.autoRotateSpeed = 0.5; // Speed of auto rotation
      controls.current.minDistance = 100; // Minimum zoom distance
      controls.current.maxDistance = 1000; // Maximum zoom distance
      controls.current.minPolarAngle = Math.PI / 6; // Restrict vertical rotation
      controls.current.maxPolarAngle = Math.PI - Math.PI / 6;

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("click", onMouseClick); // Add click event listener
    };

    const initGlobe = () => {
      const Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(0.25)
                .hexPolygonColor((e) =>
          ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
            e.properties.ISO_A3
          )
            ? "rgba(255,255,255, 1)"
            : "rgba(255,255,255, 0.7)"
        );

      locations.forEach((location) => {
        const markerGeometry = new THREE.SphereGeometry(2, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: location.color,
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        const { x, y, z } = Globe.getCoords(location.lat, location.lng);
        marker.position.set(x, y, z);
        marker.userData = { name: location.name }; // Add userData to store location name
        scene.current.add(marker);

        // Add text label for the marker
        const label = new Text();
        label.text = location.name;
        label.fontSize = 5;
        label.color = "green";
         // Ensure text faces the camera
         label.position.set(x+5, y + 10, z+5); // Adjust position above the marker
         label.lookAt(camera.current.position);
        scene.current.add(label);
      });
      setTimeout(() => {
        Globe.arcsData(travelHistory.flights)
          .arcColor((e) => (e.status ? "#FFD700" : "#ff0000"))
          .arcAltitude((e) => e.arcAlt)
          .arcStroke((e) => (e.status ? 0.5 : 0.3))
          .arcDashLength(0.9)
          .arcDashGap(4)
          .arcDashAnimateTime(1000)
          .arcsTransitionDuration(1000)
          .arcDashInitialGap((e) => e.order * 1);
      }, 1000);

      Globe.rotateY(-Math.PI * (5 / 9));
      Globe.rotateZ(-Math.PI / 6);
      const globeMaterial = Globe.globeMaterial();
      globeMaterial.color = new THREE.Color(0x3a228a);
      globeMaterial.emissive = new THREE.Color(0x220038);
      globeMaterial.emissiveIntensity = 0.1;
      globeMaterial.shininess = 0.7;
      globeMaterial.opacity = 0.2;
      globeMaterial.transparent = true;

      scene.current.add(Globe);
    };

    init();
    initGlobe();
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onMouseClick); // Unsubscribe click listener
    };
  }, []);

    // Popup component
  const LocationPopup = () => {
    if (!popupInfo.visible) return null;

    return (
      <div 
        className="absolute z-50 bottom-4 left-1/2 transform -translate-x-1/2 
        bg-gray-800 text-white p-4 rounded-lg shadow-lg"
        style={{ minWidth: '200px',position:'relative',top: 157,left: 275 }}
      >
        <h3 className="text-lg font-bold mb-2">Location</h3>
        <p className="text-md">{popupInfo.location}</p>
        <p className="text-md">{popupInfo.location}</p>

        <p className="text-md">{popupInfo.location}</p>

        <p className="text-md">{popupInfo.location}</p>

        <p className="text-md">{popupInfo.location}</p>

        <p className="text-md">{popupInfo.location}</p>

        <button 
          onClick={() => setPopupInfo({ visible: false, location: '' })}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <><div
    ref={globeRef}
    style={{
      width: "33%",
      height: "65%",
      position: "absolute",
      left: "17%",
    }}
  />
  <LocationPopup />
  </>
    
  );
});

// Add displayName for debugging purposes
Globe.displayName = "Globe";

export default Globe;