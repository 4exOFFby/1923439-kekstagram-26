import {getPositiveRandomInt} from './util.js';

// Данные известные заранее
const MAX_LENGTH_COMMENT = 140;
const USERS_PHOTOS_COUNT = 25;
const MAX_COUNT = 200;
const MIN_LIKES = 15;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const RANDOM_COMMENT_MIN_COUNT = 1;
const RANDOM_COMMENT_MAX_COUNT = 2;
const MULTICOMENTS_MIN_COUNT = 1;
const MULTICOMENTS_MAX_COUNT = 5;

// Данные придуманные мной
const NAMES_AUTHORS = [
  'Иван',
  'Платон',
  'Евлампий',
  'Ухтын',
  'Бурдюк',
  'Патап',
  'Алёшка',
  'Милена',
  'Даздраперма',
  'Аглая',
  'Фёкла',
  'Галя',
  'Зина'
];

const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'В целом всё неплохо. Но не всё.'
];

const DESCRIPTIONS = [
  'Упал лицом на кнопку "снять"',
  'Моя Мама говорит мне, что у меня есть талант',
  'Продаётся снимок - дорого',
  'За эту разработку мне такую премию дадут...',
  'Чисто жиза!'
];

// Универсальная функция для проверки длинны строки
const checksLength = (string, stringLengthMax) => string.length <= stringLengthMax;

checksLength('Я бы не стал таким заниматься', MAX_LENGTH_COMMENT);

// Функция для создания рандомного индекса элемента
const getRandomArrayElement = (elements) => elements[getPositiveRandomInt(0, elements.length - 1)];

// Функция для генерации случайного комментария
const getRandomComment = () => {
  let randomComment;
  randomComment = COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)];
  if (getPositiveRandomInt(RANDOM_COMMENT_MIN_COUNT, RANDOM_COMMENT_MAX_COUNT) > RANDOM_COMMENT_MIN_COUNT) {
    randomComment += ` ${  COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)]}`;
  }
  return randomComment;
};

// Функция для создания массива последовательных неповторящихся чисел
const getOrderUnicArray = (maxCount) => {
  const unicArray = [];
  for (let i = 1; i <= maxCount; i++) {
    unicArray.push(i);
  }
  return unicArray;
};

const ordererUnicArray = getOrderUnicArray(MAX_COUNT);

// Функция для перемешивания массива
const shuffleArray = (array) => {
  let j, temp;
  for(let i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

shuffleArray(ordererUnicArray);

// Функция для создания массива с комментариями
const getMultiComments = (commentsCounter) => {
  const userComments = [];
  for (let i = 0; i < commentsCounter; i++) {
    userComments[i] = {
      id: ordererUnicArray.shift(),
      avatar: `img/avatar-${getPositiveRandomInt(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
      message: getRandomComment(),
      name: getRandomArrayElement(NAMES_AUTHORS)
    };
  }
  return userComments;
};

// Функция для создания объекта фотографий пользователей
const getPhoto = (counter) => {
  const userPhoto = {
    id: counter,
    url: `photos/${counter}.jpg` ,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getPositiveRandomInt(MIN_LIKES, MAX_COUNT),
    comments: getMultiComments(getPositiveRandomInt(MULTICOMENTS_MIN_COUNT, MULTICOMENTS_MAX_COUNT))
  };
  return userPhoto;
};

// Массив объектов с фотографиями пользователей
const getPhotosArray = (photosCount) => {
  const photosArray = [];
  for (let i = 1; i <= photosCount; i++) {
    photosArray.push(getPhoto(i));
  }
  return photosArray;
};

getPhotosArray(USERS_PHOTOS_COUNT);