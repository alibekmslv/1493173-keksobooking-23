const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_PREVIEW_ATTRIBUTES = {
  width: 70,
  height: 70,
};

const defaultPreviewImagesMap = new Map();

const setImagePreviewOnLoad = (fileInputElement, previewContainerElement, { width, height } = IMAGE_PREVIEW_ATTRIBUTES) => {
  const imageElement = document.createElement('img');
  imageElement.width = width;
  imageElement.height = height;
  imageElement.style.borderRadius = 'inherit';

  const defaultImagePreviewElement = previewContainerElement.querySelector('img');
  const hasDefaultPreviewImage = Boolean(defaultImagePreviewElement);

  if (hasDefaultPreviewImage) {
    defaultPreviewImagesMap.set(previewContainerElement, defaultImagePreviewElement);
  }

  const readerLoadHandler = (evt) => {
    imageElement.src = evt.target.result;
    previewContainerElement.innerHTML = '';
    previewContainerElement.style.padding = 0;
    previewContainerElement.appendChild(imageElement);
  };

  fileInputElement.addEventListener('change', () => {
    const file = fileInputElement.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', readerLoadHandler);

      reader.readAsDataURL(file);
    }
  });
};

const resetImagePreview = (previewContainerElement) => {
  const imagePreviewElement = previewContainerElement.querySelector('img');
  const hasPreviewImage = Boolean(imagePreviewElement);

  if (hasPreviewImage) {
    imagePreviewElement.remove();
  }

  if (defaultPreviewImagesMap.has(previewContainerElement)) {
    previewContainerElement.appendChild(defaultPreviewImagesMap.get(previewContainerElement));
    previewContainerElement.style = '';
  }
};

export { setImagePreviewOnLoad, resetImagePreview };
