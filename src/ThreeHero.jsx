import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function disposeScene(scene) {
  scene.traverse((object) => {
    object.geometry?.dispose?.();

    if (Array.isArray(object.material)) {
      object.material.forEach((material) => material.dispose?.());
    } else {
      object.material?.dispose?.();
    }
  });
}

export function ThreeHero() {
  const mountRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let animationFrame = 0;
    let renderer;
    let resizeObserver;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.2, 9.6);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const world = new THREE.Group();
      world.rotation.x = -0.12;
      scene.add(world);

      const ambient = new THREE.HemisphereLight(0x9be8ff, 0x13072c, 1.55);
      scene.add(ambient);

      const cyanLight = new THREE.PointLight(0x1ee7ff, 45, 18, 2);
      cyanLight.position.set(4.5, 3.2, 5);
      scene.add(cyanLight);

      const violetLight = new THREE.PointLight(0x8b5cf6, 38, 16, 2);
      violetLight.position.set(-4.2, -2.4, 3.5);
      scene.add(violetLight);

      const coreGeometry = new THREE.IcosahedronGeometry(1.55, 4);
      const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x091c49,
        emissive: 0x0b6d8b,
        emissiveIntensity: 0.55,
        metalness: 0.62,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        transmission: 0.08,
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      world.add(core);

      const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.61, 2),
        new THREE.MeshBasicMaterial({
          color: 0x83f7ff,
          wireframe: true,
          transparent: true,
          opacity: 0.34,
        }),
      );
      world.add(wire);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(2.25, 0.045, 220, 24, 2, 5),
        new THREE.MeshStandardMaterial({
          color: 0xb7f8ff,
          emissive: 0x1fd8ff,
          emissiveIntensity: 1.4,
          metalness: 0.72,
          roughness: 0.18,
        }),
      );
      knot.rotation.set(0.55, 0.18, 0.3);
      world.add(knot);

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
      });

      const rings = [
        { radius: 2.72, tube: 0.018, rotation: [1.1, 0.1, 0.45] },
        { radius: 3.05, tube: 0.012, rotation: [0.35, 0.7, 1.25] },
        { radius: 3.35, tube: 0.01, rotation: [0.9, 1.25, 0.1] },
      ].map(({ radius, tube, rotation }) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 12, 220),
          ringMaterial.clone(),
        );
        ring.rotation.set(...rotation);
        world.add(ring);
        return ring;
      });

      const satellites = new THREE.Group();
      const satelliteGeometry = new THREE.SphereGeometry(0.08, 18, 18);
      const satelliteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x5ee8ff,
        emissiveIntensity: 2.2,
        metalness: 0.4,
        roughness: 0.22,
      });

      [
        [3.15, 0.2, 0.25],
        [-2.65, 1.75, -0.2],
        [1.2, -3.05, 0.5],
        [-1.4, -2.45, -0.8],
      ].forEach((position, index) => {
        const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial.clone());
        satellite.position.set(...position);
        satellite.scale.setScalar(index === 0 ? 1.45 : 1);
        satellites.add(satellite);
      });
      world.add(satellites);

      const particleCount = 780;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        const radius = 3.8 + Math.random() * 3.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0xbfefff,
          size: 0.027,
          transparent: true,
          opacity: 0.72,
          sizeAttenuation: true,
        }),
      );
      scene.add(particles);

      const floor = new THREE.GridHelper(18, 42, 0x135e75, 0x102340);
      floor.position.y = -3.65;
      floor.material.transparent = true;
      floor.material.opacity = 0.2;
      scene.add(floor);

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const handlePointerMove = (event) => {
        const bounds = mount.getBoundingClientRect();
        target.x = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
        target.y = -((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
      };

      const handlePointerLeave = () => {
        target.x = 0;
        target.y = 0;
      };

      if (!reduceMotion) {
        mount.addEventListener('pointermove', handlePointerMove);
        mount.addEventListener('pointerleave', handlePointerLeave);
      }

      const resize = () => {
        const width = Math.max(mount.clientWidth, 1);
        const height = Math.max(mount.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const clock = new THREE.Clock();
      const renderFrame = () => {
        const elapsed = clock.getElapsedTime();
        pointer.x += (target.x - pointer.x) * 0.035;
        pointer.y += (target.y - pointer.y) * 0.035;

        if (!reduceMotion) {
          world.rotation.y = elapsed * 0.08 + pointer.x * 0.18;
          world.rotation.x = -0.12 + Math.sin(elapsed * 0.42) * 0.06 + pointer.y * 0.12;
          core.rotation.y = elapsed * 0.12;
          core.rotation.z = elapsed * 0.055;
          wire.rotation.y = -elapsed * 0.1;
          wire.rotation.x = elapsed * 0.08;
          knot.rotation.z = 0.3 - elapsed * 0.07;
          particles.rotation.y = elapsed * 0.012;
          satellites.rotation.z = elapsed * 0.16;
          rings[0].rotation.z += 0.0015;
          rings[1].rotation.y -= 0.0012;
          rings[2].rotation.x += 0.0008;
          camera.position.x += (pointer.x * 0.32 - camera.position.x) * 0.025;
          camera.position.y += (0.2 + pointer.y * 0.22 - camera.position.y) * 0.025;
        }

        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(renderFrame);
      };

      renderFrame();

      return () => {
        window.cancelAnimationFrame(animationFrame);
        resizeObserver?.disconnect();
        mount.removeEventListener('pointermove', handlePointerMove);
        mount.removeEventListener('pointerleave', handlePointerLeave);
        disposeScene(scene);
        renderer.dispose();
        renderer.forceContextLoss?.();
        renderer.domElement.remove();
      };
    } catch (error) {
      console.error('Unable to initialise the Three.js hero scene.', error);
      setWebglFailed(true);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      renderer?.dispose?.();
      renderer?.domElement?.remove?.();
    };
  }, []);

  return (
    <div className={`three-stage${webglFailed ? ' three-stage-fallback' : ''}`} ref={mountRef}>
      <div className="scene-glow scene-glow-one" />
      <div className="scene-glow scene-glow-two" />
      <div className="scene-interface scene-interface-top">
        <span className="live-dot" />
        <span>MICIRQL CORE</span>
        <strong>ONLINE</strong>
      </div>
      <div className="scene-interface scene-interface-side">
        <small>PRODUCT SIGNAL</small>
        <strong>Problem → System</strong>
        <span>Android · Web · Cloud</span>
      </div>
      <div className="scene-coordinate">37.4° / DIGITAL PRODUCT LAB</div>
    </div>
  );
}
