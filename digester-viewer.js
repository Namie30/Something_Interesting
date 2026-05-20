document.addEventListener('DOMContentLoaded', function () {
  const eyeBtn   = document.getElementById('digesterEyeBtn');
  const overlay  = document.getElementById('dmOverlay');
  const closeBtn = document.getElementById('dmClose');
  const canvas   = document.getElementById('dmCanvas');
  const swatches = document.querySelectorAll('.dm-swatch');
  const partLbl  = document.getElementById('dmPartLabel');
  const spinner  = document.getElementById('dmSpinner');
  const wireBtn  = document.getElementById('dmWireframe');
  if (!eyeBtn || !overlay || !canvas) return;

  let renderer, scene, camera, controls, model;
  let selectedMesh = null;
  let wireframe = false;
  let initialized = false;
  let pointerMoved = false;

  var COLOR_TOP, COLOR_BOTTOM;

  /* ── error helper ── */
  function showErr(msg) {
    if (spinner) { spinner.style.color = '#f87171'; spinner.textContent = msg; }
    console.error('[DigestViewer]', msg);
  }

  /* ── init Three.js (called once, on first open) ── */
  function initViewer() {
    if (initialized) return;
    initialized = true;

    if (typeof THREE === 'undefined')  return showErr('Error: THREE not loaded.');
    if (!THREE.GLTFLoader)             return showErr('Error: GLTFLoader missing.');
    if (!THREE.OrbitControls)          return showErr('Error: OrbitControls missing.');

    COLOR_TOP    = new THREE.Color(0x1b7340); // BioNova green
    COLOR_BOTTOM = new THREE.Color(0x1a3a6e); // deep blue

    const w = canvas.clientWidth  || 500;
    const h = canvas.clientHeight || 380;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    renderer.outputEncoding   = THREE.sRGBEncoding;
    renderer.toneMapping      = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b2a16, 0.04);

    camera = new THREE.PerspectiveCamera(42, w / h, 0.01, 1000);
    camera.position.set(0, 0, 4.5);

    /* ── lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    var hemi = new THREE.HemisphereLight(0xd4f5d4, 0x0b2a16, 1.0);
    scene.add(hemi);

    var key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(5, 10, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    var fill = new THREE.DirectionalLight(0x74c69d, 0.6);
    fill.position.set(-6, 3, -4);
    scene.add(fill);

    var rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(0, -3, -6);
    scene.add(rim);

    /* ── controls ── */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.06;
    controls.autoRotate       = true;
    controls.autoRotateSpeed  = 0.6;
    controls.target.set(0, 0, 0);
    controls.minDistance      = 1.5;
    controls.maxDistance      = 20;
    controls.addEventListener('start', function () { controls.autoRotate = false; });

    /* ── load model ── */
    var loader = new THREE.GLTFLoader();
    loader.load(
      'models/BioNova_Digester.glb',
      function (gltf) {
        model = gltf.scene;

        /* center + scale – fill more of the canvas */
        var box    = new THREE.Box3().setFromObject(model);
        var center = box.getCenter(new THREE.Vector3());
        var size   = box.getSize(new THREE.Vector3());
        var scale  = 4 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.copy(center).multiplyScalar(-scale);

        /* split top/bottom by world Y midpoint */
        var worldBox = new THREE.Box3().setFromObject(model);
        var midY     = (worldBox.min.y + worldBox.max.y) / 2;

        model.traverse(function (child) {
          if (!child.isMesh) return;
          var meshBox  = new THREE.Box3().setFromObject(child);
          var meshMidY = (meshBox.min.y + meshBox.max.y) / 2;
          var col      = meshMidY >= midY ? COLOR_TOP.clone() : COLOR_BOTTOM.clone();

          child.material = new THREE.MeshStandardMaterial({
            color:     col,
            metalness: 0.25,
            roughness: 0.55,
          });
          child.castShadow    = true;
          child.receiveShadow = true;
          child._origColors   = [col.clone()];
          child._origMetal    = 0.25;
          child._origRough    = 0.55;
        });

        scene.add(model);
        if (spinner) spinner.style.display = 'none';
      },
      function (xhr) {
        if (spinner && xhr.total)
          spinner.textContent = 'Loading… ' + Math.round(xhr.loaded / xhr.total * 100) + '%';
      },
      function (err) {
        var msg = (err && err.message) ? err.message : String(err);
        showErr('Load failed: ' + msg);
      }
    );

    /* ── click-to-select part ── */
    var raycaster = new THREE.Raycaster();
    var mouse     = new THREE.Vector2();

    canvas.addEventListener('pointerdown', function () { pointerMoved = false; });
    canvas.addEventListener('pointermove', function () { pointerMoved = true;  });
    canvas.addEventListener('pointerup',   function (e) {
      if (pointerMoved || !model) return;
      var rect = canvas.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      var hits = raycaster.intersectObject(model, true);
      if (!hits.length) { deselect(); return; }
      var mesh = hits[0].object;
      if (!mesh.isMesh) return;
      deselect();
      selectedMesh = mesh;
      highlight(mesh, true);
      if (partLbl) {
        partLbl.textContent = mesh.name || 'Part selected';
        partLbl.style.opacity = '1';
      }
    });

    /* ── animate ── */
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    /* ── resize ── */
    new ResizeObserver(function () {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }).observe(canvas);
  }

  /* ── helpers ── */
  function highlight(mesh, on) {
    var mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach(function (m) {
      if (!m.emissive) m.emissive = new THREE.Color(0);
      m.emissive.set(on ? 0x1a5c1a : 0x000000);
      m.emissiveIntensity = on ? 0.45 : 0;
    });
  }

  function deselect() {
    if (selectedMesh) { highlight(selectedMesh, false); selectedMesh = null; }
    if (partLbl) partLbl.style.opacity = '0';
  }

  function resetColors() {
    if (!model) return;
    model.traverse(function (child) {
      if (!child.isMesh || !child._origColors) return;
      var mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(function (m, i) {
        if (child._origColors[i]) m.color.copy(child._origColors[i]);
        m.emissiveIntensity = 0;
        if (m.emissive) m.emissive.set(0x000000);
        if (child._origMetal !== undefined) m.metalness = child._origMetal;
        if (child._origRough !== undefined) m.roughness = child._origRough;
      });
    });
    selectedMesh = null;
    if (partLbl) partLbl.style.opacity = '0';
  }

  /* ── open / close ── */
  function openModal() {
    overlay.classList.add('dm-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { requestAnimationFrame(initViewer); });
  }
  function closeModal() {
    overlay.classList.remove('dm-open');
    document.body.style.overflow = '';
  }

  eyeBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('dm-open')) closeModal();
  });

  /* ── color swatches ── */
  swatches.forEach(function (s) {
    s.addEventListener('click', function () {
      swatches.forEach(function (x) { x.classList.remove('dm-swatch-active'); });
      s.classList.add('dm-swatch-active');
      if (!model) return;
      var col = s.dataset.color;
      if (col === 'original') { resetColors(); return; }

      if (selectedMesh) {
        var mats = Array.isArray(selectedMesh.material)
          ? selectedMesh.material : [selectedMesh.material];
        mats.forEach(function (m) { m.color.set(col); });
      } else {
        model.traverse(function (child) {
          if (!child.isMesh) return;
          var mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(function (m) { m.color.set(col); });
        });
      }
    });
  });

  /* ── wireframe toggle ── */
  if (wireBtn) {
    wireBtn.addEventListener('click', function () {
      wireframe = !wireframe;
      if (!model) return;
      model.traverse(function (child) {
        if (!child.isMesh) return;
        var mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(function (m) { m.wireframe = wireframe; });
      });
      wireBtn.classList.toggle('dm-wire-active', wireframe);
      wireBtn.innerHTML = wireframe
        ? '<i class="fa-solid fa-cube"></i> Solid'
        : '<i class="fa-solid fa-border-none"></i> Wireframe';
    });
  }
});
