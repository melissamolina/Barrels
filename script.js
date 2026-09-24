(() => {
  const state = {
    material: 'Waterproof',
    design: 'Tropical Hibiscus',
    designImage: 'design-tropical-hibiscus.jpg',
    detailColor: '#22dce0',
    view: 'front',
    logo: 'front'
  };

  const bag = document.getElementById('bagPreview');
  const designImage = document.getElementById('designImage');
  const bodyBase = document.getElementById('bodyBase');
  const rotateBtn = document.getElementById('rotateBag');

  function setActive(selector, target) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove('active'));
    if (target) target.classList.add('active');
  }

  function render() {
    designImage.setAttribute('href', state.designImage);
    bag.style.setProperty('--detail', state.detailColor);

    bag.className = 'bag-preview ' + (state.view === 'back' ? 'back-view' : 'front-view');
    if (state.logo === 'front') bag.classList.add('logo-front');
    if (state.logo === 'back') bag.classList.add('logo-back');
    if (state.logo === 'icon') bag.classList.add('icon-only');

    rotateBtn.textContent = state.view === 'front' ? 'ROTATE TO BACK' : 'ROTATE TO FRONT';

    if (state.design === 'Classic White') {
      bodyBase.style.fill = '#f2f2ef';
      designImage.style.opacity = '1';
    } else {
      bodyBase.style.fill = '#f2f2ef';
      designImage.style.opacity = '1';
    }

    let filter = 'none';
    if (state.material === 'Coffee Bags') filter = 'sepia(.13) saturate(.92)';
    if (state.material === 'Reclaimed Banner') filter = 'contrast(1.05) brightness(1.03)';
    designImage.style.filter = filter;
  }

  document.querySelectorAll('[data-material]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.material = btn.dataset.material;
      setActive('[data-material]', btn);
      render();
    });
  });

  document.querySelectorAll('.design-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      state.design = btn.dataset.design;
      state.designImage = btn.dataset.image;
      setActive('.design-thumb', btn);
      render();
    });
  });

  document.querySelectorAll('[data-detail]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.detailColor = btn.dataset.detail;
      document.getElementById('customDetailColor').value = state.detailColor;
      setActive('[data-detail]', btn);
      render();
    });
  });

  document.getElementById('customDetailColor').addEventListener('input', e => {
    state.detailColor = e.target.value;
    document.querySelectorAll('[data-detail]').forEach(el => el.classList.remove('active'));
    render();
  });

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      setActive('[data-view]', btn);
      render();
    });
  });

  rotateBtn.addEventListener('click', () => {
    state.view = state.view === 'front' ? 'back' : 'front';
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === state.view);
    });
    render();
  });

  document.querySelectorAll('[data-logo]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.logo = btn.dataset.logo;
      setActive('[data-logo]', btn);
      render();
    });
  });

  const upload = document.getElementById('artworkUpload');
  upload.addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.design = 'Custom Upload';
      state.designImage = reader.result;
      document.querySelectorAll('.design-thumb').forEach(el => el.classList.remove('active'));
      render();
    };
    reader.readAsDataURL(file);
  });

  function syncForm() {
    document.getElementById('formBoardType').value = document.getElementById('boardType').value;
    document.getElementById('formBoardSize').value = document.getElementById('boardSize').value;
    document.getElementById('formMaterial').value = state.material;
    document.getElementById('formDesign').value = state.design;
    document.getElementById('formDetailColor').value = state.detailColor;
    document.getElementById('formBagView').value = state.view;
    document.getElementById('formLogoOption').value = state.logo;
  }

  document.getElementById('generateDesign').addEventListener('click', () => {
    syncForm();
    document.getElementById('generatedMessage').textContent = 'DESIGN READY — SAVE IT BELOW TO JOIN THE NEXT BATCH.';
    document.querySelector('.save').scrollIntoView({behavior:'smooth'});
  });

  document.getElementById('nextBatchForm').addEventListener('submit', syncForm);

  render();
})();