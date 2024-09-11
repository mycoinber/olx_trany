const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { Media } = require("../models/mediaModels");
const getVideoDimensions = require("get-video-dimensions");

const backUrl = process.env.BACK_HOST;

async function getDimensions(videoPath) {
  const dimensions = await getVideoDimensions(videoPath);
  console.log(dimensions.width, dimensions.height);
  return dimensions;
}

const uploadMedia = async (req, res) => {
  console.log("req.file", req.file);
  try {
    const { title, alt, filename } = req.body;
    const { originalname, destination, path: originalPath } = req.file;
    const file = req.file;

    const filePath = file.path;
    const fileName = path.basename(filePath, path.extname(filePath));
    console.log(fileName);
    const mimeType = file.mimetype;

    let media;
    let fileId;

    if (mimeType.startsWith("image/")) {
      // Создаем директорию для сохранения изображений, если она не существует
      const resizedDir = path.resolve(__dirname, "../public/resized");
      if (!fs.existsSync(resizedDir)) {
        fs.mkdirSync(resizedDir, { recursive: true });
      }

      // Сохранение изображения в формате WebP в оригинальном размере
      const webpPath = path.join("/public/resized", `${fileName}.webp`);
      await sharp(filePath).toFile(path.join(__dirname, `../${webpPath}`));

      console.log("Это изображение");

      media = new Media({
        originalPath: originalPath.replace(destination, ""),
        path: webpPath.replace("/public", ""),
        title,
        filename: fileName + ".webp",
        alt,
        hash: fileId ? fileId : "",
        type: mimeType,
      });
    } else if (mimeType.startsWith("video/")) {
      const relativeFilePath = path.join(backUrl, path.basename(filePath));
      const { width, height } = await getDimensions(req.file.path);
      console.log("Это видеофайл", width, height);

      media = new Media({
        originalPath: originalPath.replace(destination, ""),
        path: relativeFilePath,
        title,
        alt,
        filename: originalname,
        hash: fileId ? fileId : "",
        type: mimeType,
      });
    }

    console.log(media);

    await media.save();

    res.status(201).send(media);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getMedia = async (req, res) => {
  try {
    const { id, size } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).send("Медиафайл не найден");
    }

    const basePath = path.dirname(media.path);
    const fileName = path.basename(media.path, path.extname(media.path));
    let mediaPath;

    if (media.type.startsWith("image/")) {
      // Обработка запросов на изображения разных размеров
      switch (size) {
        case "thumbnail":
          mediaPath = path.join(basePath, `thumbnail_${fileName}.webp`);
          break;
        case "medium":
          mediaPath = path.join(basePath, `medium_${fileName}.webp`);
          break;
        case "large":
          mediaPath = path.join(basePath, `large_${fileName}.webp`);
          break;
        default:
          mediaPath = media.path;
      }
    } else {
      // Для видео возвращаем оригинальный путь
      mediaPath = media.path;
    }

    res.sendFile(path.resolve(mediaPath));
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllMedia = async (req, res) => {
  try {
    const mediaFiles = await Media.find();
    res.status(200).send(mediaFiles);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, alt } = req.body;

    const media = await Media.findByIdAndUpdate(
      id,
      { title, alt },
      { new: true }
    );

    if (!media) {
      return res.status(404).send("Медиафайл не найден");
    }

    res.status(200).send(media);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const media = await Media.findByIdAndDelete(id);

    if (!media) {
      return res.status(404).send("Медиафайл не найден");
    }

    // Удаление оригинального файла
    const originalFilePath = path.join(
      __dirname,
      "../public",
      media.originalPath
    );
    console.log(originalFilePath);
    if (fs.existsSync(originalFilePath)) {
      fs.unlinkSync(originalFilePath);
    }

    // Получение имени файла без расширения и префиксов
    const fileName = path.basename(media.path, path.extname(media.path));

    // Удаление всех файлов с именем ${fileName}.webp в папке /public/resized и её поддиректориях
    const resizedDir = path.resolve(__dirname, "../public/resized");
    deleteFilesRecursively(resizedDir, `${fileName}.webp`);

    res.status(200).send({ message: "Медиафайл удален" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// Рекурсивная функция для удаления файлов с заданным именем
function deleteFilesRecursively(dir, fileName) {
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach((file) => {
    const currentPath = path.join(dir, file);
    if (fs.lstatSync(currentPath).isDirectory()) {
      // Если это директория, рекурсивно проходим по ней
      deleteFilesRecursively(currentPath, fileName);
    } else if (path.basename(currentPath) === fileName) {
      // Если это файл с нужным именем, удаляем его
      fs.unlinkSync(currentPath);
      console.log(`Удален файл: ${currentPath}`);
    }
  });
}

// Функция для проверки, существует ли файл
function fileExists(filePath) {
  return fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

// Контроллер для обработки запросов на изображения с разными размерами
const getImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const width = parseInt(req.query.width, 10);
    console.log("width", width);

    if (!width || isNaN(width)) {
      return res.status(400).send("Invalid width parameter");
    }

    const originalImagePath = path.join(
      __dirname,
      "../public/resized",
      filename
    );

    // Проверка, существует ли оригинальный файл
    if (!(await fileExists(originalImagePath))) {
      console.log("Image not found");
      return res.status(404).send("Image not found");
    }

    const resizedDir = path.join(__dirname, `../public/resized/${width}`);

    // Создаем директорию, если она не существует
    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir, { recursive: true });
    }

    const resizedImagePath = path.join(resizedDir, filename);

    // Если уже есть сгенерированное изображение, вернуть его
    if (await fileExists(resizedImagePath)) {
      return res.sendFile(resizedImagePath);
    }

    // Если нет, создаем новое изображение с указанной шириной
    await sharp(originalImagePath).resize(width).toFile(resizedImagePath);

    return res.sendFile(resizedImagePath);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  uploadMedia,
  getMedia,
  getAllMedia,
  updateMedia,
  deleteMedia,
  getImage,
};
