import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VirtualCoffeeStore3D({ onOpenContact, isFullscreen = false }) {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null); // 'shelves' | 'checkout' | 'fairchain' | 'postoffice'
  const [cartCount, setCartCount] = useState(0);
  const [selectedRoast, setSelectedRoast] = useState(0);
  const [nightMode, setNightMode] = useState(false);
  const [viewMode, setViewMode] = useState('overview');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioContextRef = useRef(null);

  const roasts = [
    {
      name: 'Sidama Solar Yirgacheffe',
      origin: 'Ethiopia · 2,100m Elevation',
      notes: 'Jasmine blossom, white peach, bergamot tea',
      roast: 'Light Roast · Washed',
      price: '$21.00',
      fairChainImpact: '88% export value paid directly to Oromia Co-op',
    },
    {
      name: 'Antioquia Bourbon Reserve',
      origin: 'Colombia · 1,850m Elevation',
      notes: 'Panela cane sugar, roasted cacao, red plum',
      roast: 'Medium Roast · Honey Process',
      price: '$19.50',
      fairChainImpact: '100% solar-roasted at origin in Medellín',
    },
    {
      name: 'Gayo Highland Dark Roast',
      origin: 'Sumatra · 1,600m Elevation',
      notes: 'Dark chocolate, cedarwood, warm spice',
      roast: 'Dark Roast · Wet-Hulled',
      price: '$18.50',
      fairChainImpact: 'Shade-grown organic · Verified reforestation lot',
    },
  ];

  const cameraTargets = {
    overview: { pos: [0, 5.8, 12], look: [0, 1.8, 0] },
    shelves: { pos: [-3.8, 3.2, 2.5], look: [-5, 3.0, -1] },
    checkout: { pos: [3.8, 3.0, 2.8], look: [5, 2.5, -0.5] },
    fairchain: { pos: [0, 3.4, 1.5], look: [0, 3.2, -5.5] },
    postoffice: { pos: [0, 3.2, 5.2], look: [0, 2.6, 8] },
  };

  const sceneState = useRef({
    camera: null,
    renderer: null,
    scene: null,
    targetPos: new THREE.Vector3(0, 5.8, 12),
    targetLook: new THREE.Vector3(0, 1.8, 0),
    currentLook: new THREE.Vector3(0, 1.8, 0),
    particles: null,
    steamGroup: null,
  });

  const jumpToZone = (zoneKey) => {
    setViewMode(zoneKey);
    setActiveZone(zoneKey === 'overview' ? null : zoneKey);
    const target = cameraTargets[zoneKey] || cameraTargets.overview;
    sceneState.current.targetPos.set(...target.pos);
    sceneState.current.targetLook.set(...target.look);
  };

  const toggleSound = () => {
    if (!audioPlaying) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.12;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setAudioPlaying(true);
      } catch (e) {
        console.error('Audio start error:', e);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setAudioPlaying(false);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // Classic Apple Architectural Gallery Palette (Warm Limestone & Natural White Oak)
    const bgHex = nightMode ? 0x161618 : 0xEBE9E4;
    const wallHex = nightMode ? 0x222225 : 0xF5F3EE;
    const floorHex = nightMode ? 0x3D3024 : 0xC8AD8D;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.024);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 5.8, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = nightMode ? 1.0 : 1.15;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Floor: Natural Oak Plank Floor
    const floorGeo = new THREE.PlaneGeometry(16, 18);
    const floorMat = new THREE.MeshStandardMaterial({
      color: floorHex,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(16, 18);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x18181A : 0xFAF9F6,
      roughness: 0.85,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = 7;
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    // Architectural Walls
    const backWallGeo = new THREE.BoxGeometry(16, 7, 0.4);
    const wallMat = new THREE.MeshStandardMaterial({
      color: wallHex,
      roughness: 0.7,
    });
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 3.5, -6);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const frontWall = new THREE.Mesh(backWallGeo, wallMat);
    frontWall.position.set(0, 3.5, 9);
    scene.add(frontWall);

    const sideWallGeo = new THREE.BoxGeometry(0.4, 7, 18);
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
    leftWall.position.set(-8, 3.5, 1);
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
    rightWall.position.set(8, 3.5, 1);
    scene.add(rightWall);

    // Gallery Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFDF9, nightMode ? 0.45 : 1.05);
    scene.add(ambientLight);

    const warmSpot1 = new THREE.SpotLight(0xFFE8C8, nightMode ? 2.2 : 1.8, 22, Math.PI / 3.5, 0.5, 1);
    warmSpot1.position.set(-3.5, 6.6, 0);
    warmSpot1.target.position.set(-6.5, 2.5, 0);
    warmSpot1.castShadow = true;
    scene.add(warmSpot1);
    scene.add(warmSpot1.target);

    const warmSpot2 = new THREE.SpotLight(0xFFF4E4, nightMode ? 2.0 : 1.7, 22, Math.PI / 3.5, 0.5, 1);
    warmSpot2.position.set(3.5, 6.6, 0);
    warmSpot2.target.position.set(6, 2.5, 0);
    warmSpot2.castShadow = true;
    scene.add(warmSpot2);
    scene.add(warmSpot2.target);

    const centerSpot = new THREE.SpotLight(0xFFF8EE, nightMode ? 2.2 : 1.6, 24, Math.PI / 3, 0.6, 1);
    centerSpot.position.set(0, 6.6, 0);
    centerSpot.target.position.set(0, 3, -5.8);
    scene.add(centerSpot);
    scene.add(centerSpot.target);

    // ZONE 1: PRODUCT SHELVES (Left Wall)
    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x6E4F3A,
      roughness: 0.35,
      metalness: 0.05,
    });
    for (let i = 0; i < 3; i++) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 6.4), shelfMat);
      shelf.position.set(-6.9, 1.8 + i * 1.25, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      scene.add(shelf);
    }

    // Minimalist Coffee Pouches on Shelves
    const bagGeo = new THREE.BoxGeometry(0.36, 0.62, 0.22);
    const bagColors = [0x1D1D1F, 0xD9D4CC, 0x8C6239, 0x2C3E35, 0xE6E1DA];
    for (let shelfIdx = 0; shelfIdx < 3; shelfIdx++) {
      for (let bagIdx = 0; bagIdx < 6; bagIdx++) {
        const bagMat = new THREE.MeshStandardMaterial({
          color: bagColors[(shelfIdx + bagIdx) % bagColors.length],
          roughness: 0.35,
        });
        const bag = new THREE.Mesh(bagGeo, bagMat);
        bag.position.set(-6.85, 2.18 + shelfIdx * 1.25, -2.4 + bagIdx * 0.95);
        bag.castShadow = true;
        scene.add(bag);
      }
    }

    // ZONE 2: ESPRESSO BAR & CHECKOUT (Right Wall)
    const counterMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x2A2A2D : 0xDEDAD2,
      roughness: 0.3,
      metalness: 0.1,
    });
    const counter = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.75, 5.4), counterMat);
    counter.position.set(5.5, 0.875, 0);
    counter.castShadow = true;
    counter.receiveShadow = true;
    scene.add(counter);

    // Brushed Steel Espresso Machine
    const machineMat = new THREE.MeshStandardMaterial({
      color: 0xE5E5EA,
      metalness: 0.85,
      roughness: 0.18,
    });
    const espressoMachine = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.72, 1.35), machineMat);
    espressoMachine.position.set(5.5, 2.12, -0.6);
    espressoMachine.castShadow = true;
    scene.add(espressoMachine);

    // Minimalist Apple-style iPad POS Stand
    const posStandMat = new THREE.MeshStandardMaterial({ color: 0x86868B, metalness: 0.7, roughness: 0.25 });
    const posStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 0.38), posStandMat);
    posStand.position.set(5.3, 1.95, 1.2);
    scene.add(posStand);

    const posScreenMat = new THREE.MeshStandardMaterial({
      color: 0x1D1D1F,
      roughness: 0.15,
    });
    const posScreen = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.34, 0.48), posScreenMat);
    posScreen.position.set(5.28, 2.2, 1.2);
    posScreen.rotation.y = -0.3;
    posScreen.rotation.z = -0.2;
    scene.add(posScreen);

    // Subtle Steam
    const steamGroup = new THREE.Group();
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.18,
    });
    const steamParticles = [];
    for (let s = 0; s < 14; s++) {
      const steamMesh = new THREE.Mesh(new THREE.SphereGeometry(0.05 + Math.random() * 0.04, 8, 8), steamMat);
      steamMesh.position.set(
        5.1 + (Math.random() - 0.5) * 0.35,
        2.35 + Math.random() * 0.8,
        -0.6 + (Math.random() - 0.5) * 0.7
      );
      steamGroup.add(steamMesh);
      steamParticles.push({
        mesh: steamMesh,
        speedY: 0.006 + Math.random() * 0.006,
        baseY: 2.3,
        maxY: 3.3,
      });
    }
    scene.add(steamGroup);

    // ZONE 3: PROVENANCE & IMPACT DISPLAY (Back Wall)
    const fairBoardGeo = new THREE.BoxGeometry(7.2, 3.6, 0.12);
    const fairBoardMat = new THREE.MeshStandardMaterial({
      color: 0x1D1D1F,
      roughness: 0.4,
    });
    const fairBoard = new THREE.Mesh(fairBoardGeo, fairBoardMat);
    fairBoard.position.set(0, 3.3, -5.7);
    scene.add(fairBoard);

    const badgeColors = [0xF5F5F7, 0xD2D2D7, 0xC8AD8D];
    for (let b = 0; b < 3; b++) {
      const badge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.06, 32),
        new THREE.MeshStandardMaterial({
          color: badgeColors[b],
          roughness: 0.3,
        })
      );
      badge.rotation.x = Math.PI / 2;
      badge.position.set(-2.2 + b * 2.2, 3.5, -5.58);
      scene.add(badge);
    }

    // Architectural Planter
    const planterMat = new THREE.MeshStandardMaterial({ color: 0xD2CEC6, roughness: 0.6 });
    const planter = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.75, 0.85), planterMat);
    planter.position.set(0, 0.38, -4.8);
    scene.add(planter);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x3B5E45, roughness: 0.75 });
    for (let f = 0; f < 9; f++) {
      const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32 + Math.random() * 0.12), foliageMat);
      bush.position.set(-2.5 + f * 0.62, 0.92 + Math.sin(f) * 0.06, -4.8);
      scene.add(bush);
    }

    // ZONE 4: POSTAL DISPATCH BOOTH (Front Wall)
    const postWallMat = new THREE.MeshStandardMaterial({
      color: 0x5C402B,
      roughness: 0.4,
    });
    const postCabinet = new THREE.Mesh(new THREE.BoxGeometry(5.0, 3.1, 0.65), postWallMat);
    postCabinet.position.set(0, 2.55, 8.4);
    scene.add(postCabinet);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xC9A96E,
      metalness: 0.75,
      roughness: 0.25,
    });
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const boxDoor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 0.04), brassMat);
        boxDoor.position.set(-2.0 + col * 0.56, 1.8 + row * 0.5, 8.04);
        scene.add(boxDoor);
      }
    }

    const postDesk = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 1.35, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x4A3321, roughness: 0.35 })
    );
    postDesk.position.set(0, 0.675, 6.8);
    postDesk.castShadow = true;
    scene.add(postDesk);

    // Subtle Architectural Marker Pins
    const hotspotData = [
      { id: 'shelves', pos: [-5.8, 3.6, 0] },
      { id: 'checkout', pos: [5.2, 3.3, 0] },
      { id: 'fairchain', pos: [0, 4.1, -4.8] },
      { id: 'postoffice', pos: [0, 3.1, 6.5] },
    ];

    const hotspotMeshes = [];
    hotspotData.forEach((spot) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(...spot.pos);

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0x0071E3,
          roughness: 0.2,
        })
      );
      pinGroup.add(sphere);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.02, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x0071E3 })
      );
      ring.rotation.x = Math.PI / 2;
      pinGroup.add(ring);

      scene.add(pinGroup);
      hotspotMeshes.push({ group: pinGroup, ring, id: spot.id });
    });

    sceneState.current.camera = camera;
    sceneState.current.renderer = renderer;
    sceneState.current.scene = scene;

    // Orbit / Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sphericalTheta = 0;
    let sphericalPhi = Math.PI / 3;
    const sphericalRadius = 13;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      sphericalTheta -= deltaX * 0.005;
      sphericalPhi = Math.max(0.25, Math.min(Math.PI / 2 - 0.06, sphericalPhi - deltaY * 0.005));

      if (viewMode === 'overview') {
        sceneState.current.targetPos.x = sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
        sceneState.current.targetPos.y = sphericalRadius * Math.cos(sphericalPhi);
        sceneState.current.targetPos.z = sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 580;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      camera.position.lerp(sceneState.current.targetPos, 0.05);
      sceneState.current.currentLook.lerp(sceneState.current.targetLook, 0.05);
      camera.lookAt(sceneState.current.currentLook);

      steamParticles.forEach((sp) => {
        sp.mesh.position.y += sp.speedY;
        sp.mesh.position.x += Math.sin(time * 2.5 + sp.baseY) * 0.0015;
        if (sp.mesh.position.y > sp.maxY) {
          sp.mesh.position.y = sp.baseY;
        }
      });

      hotspotMeshes.forEach((hm, idx) => {
        hm.group.position.y += Math.sin(time * 2 + idx) * 0.0015;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [nightMode]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : '600px',
        borderRadius: isFullscreen ? '0' : '22px',
        overflow: 'hidden',
        border: isFullscreen ? 'none' : '1px solid #D2D2D7',
        boxShadow: isFullscreen ? 'none' : '0 16px 40px rgba(0, 0, 0, 0.08)',
        background: nightMode ? '#161618' : '#EBE9E4',
        textAlign: 'left',
      }}
    >
      {/* 3D Canvas Mount */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />

      {/* Top Classic Apple Frosted Control Bar */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {/* Showroom Label */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '7px 14px',
            borderRadius: '980px',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#1D7D3F',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1D1D1F' }}>
            Moka Flagship Roastery
          </span>
          <span style={{ fontSize: '12px', color: '#6E6E73' }}>
            · Interactive 3D Preview
          </span>
        </div>

        {/* Classic Apple Segmented Zone Selector */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '3px',
            borderRadius: '980px',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flexWrap: 'wrap',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          {[
            { key: 'overview', label: 'Room Overview' },
            { key: 'shelves', label: '01 Shelves' },
            { key: 'checkout', label: '02 Espresso Bar' },
            { key: 'fairchain', label: '03 Provenance' },
            { key: 'postoffice', label: '04 Dispatch' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => jumpToZone(item.key)}
              style={{
                background: viewMode === item.key ? '#1D1D1F' : 'transparent',
                color: viewMode === item.key ? '#FFFFFF' : '#424245',
                border: 'none',
                padding: '6px 13px',
                borderRadius: '980px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Controls: Sound, Lighting, Bag */}
        <div style={{ display: 'flex', gap: '6px', pointerEvents: 'auto' }}>
          <button
            onClick={toggleSound}
            title={audioPlaying ? 'Mute Acoustic Ambience' : 'Enable Acoustic Ambience'}
            style={{
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'saturate(180%) blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#1D1D1F',
              padding: '0 12px',
              height: '34px',
              borderRadius: '980px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'inherit',
            }}
          >
            <span>{audioPlaying ? 'Audio On' : 'Audio Off'}</span>
          </button>

          <button
            onClick={() => setNightMode(!nightMode)}
            title="Switch Gallery Lighting"
            style={{
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'saturate(180%) blur(20px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              color: '#1D1D1F',
              padding: '0 12px',
              height: '34px',
              borderRadius: '980px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'inherit',
            }}
          >
            {nightMode ? 'Evening Light' : 'Daylight'}
          </button>

          <button
            onClick={() => jumpToZone('checkout')}
            style={{
              background: '#1D1D1F',
              border: 'none',
              color: '#FFFFFF',
              padding: '0 14px',
              height: '34px',
              borderRadius: '980px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <span>Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Guidance Bar */}
      {!activeZone && (
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            padding: '6px 16px',
            borderRadius: '980px',
            color: '#424245',
            fontSize: '12px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Drag to look around in 360° · Select a zone above to inspect products and checkout
        </div>
      )}

      {/* ZONE 1: PRODUCT SHELVES CARD */}
      {activeZone === 'shelves' && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            maxWidth: '400px',
            width: 'calc(100% - 40px)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.14)',
            zIndex: 30,
            color: '#1D1D1F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6E6E73' }}>
              Zone 01 · Product Shelving
            </span>
            <button
              onClick={() => setActiveZone(null)}
              style={{
                background: '#F5F5F7',
                border: 'none',
                color: '#6E6E73',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '2px' }}>
            {roasts[selectedRoast].name}
          </h3>
          <p style={{ fontSize: '12.5px', color: '#6E6E73', marginBottom: '12px' }}>
            {roasts[selectedRoast].origin} · {roasts[selectedRoast].roast}
          </p>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {roasts.map((r, idx) => (
              <button
                key={r.name}
                onClick={() => setSelectedRoast(idx)}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: '8px',
                  border: selectedRoast === idx ? '1px solid #1D1D1F' : '1px solid #D2D2D7',
                  background: selectedRoast === idx ? '#1D1D1F' : '#FFFFFF',
                  color: selectedRoast === idx ? '#FFFFFF' : '#424245',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {r.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <div style={{ background: '#F5F5F7', padding: '12px 14px', borderRadius: '12px', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', color: '#6E6E73', marginBottom: '2px' }}>Tasting Profile</div>
            <div style={{ fontSize: '13px', color: '#1D1D1F', fontWeight: 500, marginBottom: '6px' }}>
              {roasts[selectedRoast].notes}
            </div>
            <div style={{ fontSize: '11.5px', color: '#1D7D3F', fontWeight: 500 }}>
              {roasts[selectedRoast].fairChainImpact}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6E6E73' }}>12 oz Whole Bean</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#1D1D1F' }}>
                {roasts[selectedRoast].price}
              </div>
            </div>

            <button
              onClick={() => setCartCount(cartCount + 1)}
              className="btn-apple-blue"
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      )}

      {/* ZONE 2: CHECKOUT COUNTER CARD */}
      {activeZone === 'checkout' && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            maxWidth: '400px',
            width: 'calc(100% - 40px)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.14)',
            zIndex: 30,
            color: '#1D1D1F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6E6E73' }}>
              Zone 02 · Express Bar Checkout
            </span>
            <button
              onClick={() => setActiveZone(null)}
              style={{
                background: '#F5F5F7',
                border: 'none',
                color: '#6E6E73',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
            One-Tap Barista Register
          </h3>
          <p style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.5, marginBottom: '14px' }}>
            Instead of multi-page checkout forms, customers complete their order directly at the counter with Apple Pay or Stripe—syncing live with your Shopify inventory.
          </p>

          <div style={{ background: '#F5F5F7', padding: '12px 14px', borderRadius: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#424245', marginBottom: '4px' }}>
              <span>Selected Items</span>
              <span style={{ fontWeight: 500, color: '#1D1D1F' }}>
                {cartCount > 0 ? `${cartCount} Specialty Bags` : '1 Sidama Yirgacheffe (Sample)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1D1D1F', fontWeight: 600 }}>
              <span>Estimated Total</span>
              <span>${cartCount > 0 ? (cartCount * 21).toFixed(2) : '21.00'}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setCartCount(0);
              setActiveZone(null);
              if (onOpenContact) onOpenContact();
            }}
            className="btn-apple-dark"
            style={{ width: '100%', padding: '11px', fontSize: '13.5px' }}
          >
            Test Express Checkout · Request Prototype
          </button>
        </div>
      )}

      {/* ZONE 3: FAIRCHAIN STORY CARD */}
      {activeZone === 'fairchain' && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '480px',
            width: 'calc(100% - 40px)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '18px',
            padding: '24px',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.14)',
            zIndex: 40,
            color: '#1D1D1F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6E6E73' }}>
              Zone 03 · Brand Provenance Wall
            </span>
            <button
              onClick={() => setActiveZone(null)}
              style={{
                background: '#F5F5F7',
                border: 'none',
                color: '#6E6E73',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
            Turn Your Brand Story Into a Physical Exhibit
          </h3>
          <p style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.5, marginBottom: '16px' }}>
            Visitors rarely read buried &ldquo;About Us&rdquo; pages. Placing your sourcing metrics, craftsmanship, and sustainability proof on the flagship wall builds immediate buyer trust.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            <div style={{ background: '#F5F5F7', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>85%</div>
              <div style={{ fontSize: '11px', color: '#6E6E73' }}>Origin Value Retained</div>
            </div>
            <div style={{ background: '#F5F5F7', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>12,480</div>
              <div style={{ fontSize: '11px', color: '#6E6E73' }}>Shade Trees Planted</div>
            </div>
            <div style={{ background: '#F5F5F7', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F' }}>100%</div>
              <div style={{ fontSize: '11px', color: '#6E6E73' }}>Solar Roasted</div>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveZone(null);
              if (onOpenContact) onOpenContact();
            }}
            className="btn-apple-blue"
            style={{ width: '100%', padding: '11px', fontSize: '13.5px' }}
          >
            Feature Your Brand Story in 3D
          </button>
        </div>
      )}

      {/* ZONE 4: POSTAL BOOTH CARD */}
      {activeZone === 'postoffice' && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '440px',
            width: 'calc(100% - 40px)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '18px',
            padding: '24px',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.14)',
            zIndex: 40,
            color: '#1D1D1F',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6E6E73' }}>
              Zone 04 · Concierge Dispatch Desk
            </span>
            <button
              onClick={() => setActiveZone(null)}
              style={{
                background: '#F5F5F7',
                border: 'none',
                color: '#6E6E73',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '6px' }}>
            Direct Wholesale & Customer Inquiries
          </h3>
          <p style={{ fontSize: '13px', color: '#6E6E73', lineHeight: 1.5, marginBottom: '16px' }}>
            Replace impersonal ticket forms with an architectural concierge desk inside your store—capturing wholesale leads, subscriptions, and customer notes effortlessly.
          </p>

          <button
            onClick={() => {
              setActiveZone(null);
              if (onOpenContact) onOpenContact();
            }}
            className="btn-apple-blue"
            style={{ width: '100%', padding: '11px', fontSize: '13.5px' }}
          >
            Request Your Complimentary 3D Prototype
          </button>
        </div>
      )}
    </div>
  );
}
