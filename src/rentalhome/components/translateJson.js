import fs from 'fs';
import path from 'path';
import translate from 'translate';

translate.engine = 'google'; // use Google Translate unofficially
translate.key = undefined; // no API key needed for basic usage

const baseDir = path.join('languages', 'en');
const targetLangs = ['hi', 'ta', 'fr']; // add more

const translateText = async (text, target) => {
  try {
    return await translate(text, { to: target });
  } catch (err) {
    console.error(`Error translating "${text}" to ${target}:`, err);
    return text;
  }
};

const translateJson = async (obj, target) => {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      result[key] = await translateJson(obj[key], target);
    } else {
      result[key] = await translateText(obj[key], target);
    }
  }
  return result;
};

const run = async () => {
  const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const rawData = fs.readFileSync(path.join(baseDir, file), 'utf-8');
    const jsonData = JSON.parse(rawData);

    for (const lang of targetLangs) {
      const translatedData = await translateJson(jsonData, lang);
      const langDir = path.join('languages', lang);
      if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

      const outPath = path.join(langDir, file);
      fs.writeFileSync(outPath, JSON.stringify(translatedData, null, 2));
      console.log(`Translated ${file} to ${lang}`);
    }
  }
};

run();
