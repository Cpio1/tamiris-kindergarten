import { siteConfig, type SectionId } from "../config/site";

// Facts come from config/site.ts, so both sites update together.
const { ages, groups, meals, hours } = siteConfig;

export const LOCALES = ["kk", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "kk";

type Dictionary = {
  meta: { htmlLang: string; title: string; description: string };
  nav: Record<SectionId, string> & {
    contact: string;
    menuOpen: string;
    menuClose: string;
    language: string;
    homeLabel: string;
    skip: string;
  };
  hero: {
    eyebrow: string;
    titleBrand: string;
    titleRest: string;
    description: string;
    primary: string;
    secondary: string;
    stats: { value: string; label: string }[];
    photoAlt: string;
    placeholder: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    photoAlt: string;
    placeholder: string;
    badge: string;
  };
  info: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { value: string; label: string }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    showAll: string;
    collapse: string;
    empty: string;
    photoAlt: (index: number) => string;
    openPhoto: (index: number) => string;
    close: string;
    prev: string;
    next: string;
    counter: (current: number, total: number) => string;
    dialogLabel: string;
  };
  documents: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
    newTab: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    description: string;
    addressLabel: string;
    address: string;
    phonesLabel: string;
    hoursLabel: string;
    hours: string;
    instagramLabel: string;
    route: string;
    call: string;
    mapTitle: string;
  };
  footer: {
    description: string;
    navTitle: string;
    contactsTitle: string;
    rights: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  kk: {
    meta: {
      htmlLang: "kk",
      title: "«Тамирис» балабақшасы | Алматы",
      description: `Алматы қаласындағы «Тамирис» жеке балабақшасы. ${ages} жас, қазақ тіліндегі тәрбие, ${groups} топ, ${meals} мезгіл тамақтану.`,
    },
    nav: {
      home: "Басты бет",
      about: "Біз туралы",
      info: "Ақпарат",
      gallery: "Галерея",
      documents: "Құжаттар",
      contacts: "Байланыс",
      contact: "Байланысу",
      menuOpen: "Мәзірді ашу",
      menuClose: "Мәзірді жабу",
      language: "Тілді таңдау",
      homeLabel: "«Тамирис» — басты бет",
      skip: "Негізгі мазмұнға өту",
    },
    hero: {
      eyebrow: "Балалардың бақытты мекені",
      titleBrand: "«Тамирис»",
      titleRest: "— бақытты балалық шақ мекені",
      description: "Әр балаға мейірім, қамқорлық және қуанышты сәттер сыйлайтын жайлы орта.",
      primary: "Біз туралы",
      secondary: "Байланысу",
      stats: [
        { value: ages, label: "жас" },
        { value: String(groups), label: "топ" },
        { value: String(meals), label: "мезгіл тамақтану" },
      ],
      photoAlt: "«Тамирис» балабақшасы",
      placeholder: "Фото жақында қосылады",
    },
    about: {
      eyebrow: "Біз туралы",
      title: "«Тамирис» балабақшасы туралы",
      subtitle: "Балаңыздың қуанышы мен дамуына арналған жайлы орта.",
      paragraphs: [
        `«Тамирис» — Алматы қаласында орналасқан, ${ages.replace("–", " жастан ")} жасқа дейінгі балаларға арналған жеке балабақша.`,
        "Балабақшамызда қазақ тілінде тәрбие беріледі. Балалар жас ерекшеліктеріне сәйкес үш топқа бөлінген.",
        "Біз әр баланың өзін жайлы сезінуіне, достарымен қарым-қатынас жасауына және күнделікті жаңа нәрселерді үйренуіне мән береміз.",
      ],
      photoAlt: "«Тамирис» балабақшасындағы күнделікті өмір",
      placeholder: "Фото жақында қосылады",
      badge: "Қазақ тілінде тәрбие",
    },
    info: {
      eyebrow: "Ақпарат",
      title: "Балабақша туралы ақпарат",
      description: "Балаңыз үшін маңызды мәліметтер бір жерде.",
      cards: [
        { value: `${ages} жас`, label: "Балалардың жас ерекшелігі" },
        { value: `${groups} топ`, label: "Балаларға арналған топтар" },
        { value: hours, label: "Балабақшаның жұмыс уақыты" },
        { value: "Қазақ тілі", label: "Тәрбие беру тілі" },
        { value: `${meals} мезгіл`, label: "Күнделікті тамақтану" },
      ],
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Біздің балабақшадан сәттер",
      description: "Балабақшамыздың күнделікті өмірінен жарқын көріністер.",
      showAll: "Барлық суреттерді көру",
      collapse: "Галереяны жию",
      empty: "Суреттер жақында қосылады.",
      photoAlt: (i) => `«Тамирис» балабақшасынан сурет №${i}`,
      openPhoto: (i) => `№${i} суретті үлкейтіп ашу`,
      close: "Жабу",
      prev: "Алдыңғы сурет",
      next: "Келесі сурет",
      counter: (c, t) => `${c} / ${t}`,
      dialogLabel: "Суретті қарау",
    },
    documents: {
      eyebrow: "Құжаттар",
      title: "Құжаттар",
      description: "Балабақша қызметіне қатысты құжаттармен танысыңыз.",
      button: "Құжаттарды қарау",
      newTab: "(жаңа бетте ашылады)",
    },
    contacts: {
      eyebrow: "Байланыс",
      title: "Бізбен байланысыңыз",
      description: "Сұрақтарыңыз болса, бізге хабарласыңыз.",
      addressLabel: "Мекенжай",
      address: "Алматы қаласы, Наурызбай ауданы, Қарғалы шағынауданы, Кенесары хан көшесі, 116.",
      phonesLabel: "Телефондар",
      hoursLabel: "Жұмыс уақыты",
      hours,
      instagramLabel: "Instagram",
      route: "Маршрутты көру",
      call: "Қоңырау шалу",
      mapTitle: "«Тамирис» балабақшасы картада",
    },
    footer: {
      description: `Алматы қаласындағы ${ages} жастағы балаларға арналған жеке балабақша. Қазақ тілінде тәрбие.`,
      navTitle: "Бөлімдер",
      contactsTitle: "Байланыс",
      rights: "© 2026 «Тамирис». Барлық құқықтар қорғалған.",
    },
  },
  ru: {
    meta: {
      htmlLang: "ru",
      title: "Детский сад «Тамирис» | Алматы",
      description: `Частный детский сад «Тамирис» в Алматы. ${ages} лет, воспитание на казахском языке, ${groups} группы, ${meals}-разовое питание.`,
    },
    nav: {
      home: "Главная",
      about: "О садике",
      info: "Информация",
      gallery: "Галерея",
      documents: "Документы",
      contacts: "Контакты",
      contact: "Связаться",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      language: "Выбор языка",
      homeLabel: "«Тамирис» — на главную",
      skip: "Перейти к содержимому",
    },
    hero: {
      eyebrow: "Счастливый дом для детей",
      titleBrand: "«Тамирис»",
      titleRest: "— место счастливого детства",
      description: "Уютная среда, где каждый ребёнок получает доброту, заботу и радостные моменты.",
      primary: "О нас",
      secondary: "Связаться",
      stats: [
        { value: ages, label: "лет" },
        { value: String(groups), label: "группы" },
        { value: String(meals), label: "разовое питание" },
      ],
      photoAlt: "Детский сад «Тамирис»",
      placeholder: "Фото скоро появится",
    },
    about: {
      eyebrow: "О садике",
      title: "О детском саде «Тамирис»",
      subtitle: "Уютная среда для радости и развития вашего ребёнка.",
      paragraphs: [
        `«Тамирис» — частный детский сад в городе Алматы для детей от ${ages.replace("–", " до ")} лет.`,
        "Воспитание в нашем саду ведётся на казахском языке. Дети распределены по трём группам в соответствии с возрастом.",
        "Мы уделяем внимание тому, чтобы каждый ребёнок чувствовал себя комфортно, общался с друзьями и каждый день узнавал что-то новое.",
      ],
      photoAlt: "Повседневная жизнь в детском саду «Тамирис»",
      placeholder: "Фото скоро появится",
      badge: "Воспитание на казахском",
    },
    info: {
      eyebrow: "Информация",
      title: "Информация о детском саде",
      description: "Важные сведения для вашего ребёнка в одном месте.",
      cards: [
        { value: `${ages} лет`, label: "Возраст детей" },
        { value: `${groups} группы`, label: "Группы для детей" },
        { value: hours, label: "Режим работы детского сада" },
        { value: "Казахский", label: "Язык воспитания" },
        { value: `${meals} раз`, label: "Питание в день" },
      ],
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Моменты из жизни нашего сада",
      description: "Яркие кадры из повседневной жизни детского сада.",
      showAll: "Смотреть все фотографии",
      collapse: "Свернуть галерею",
      empty: "Фотографии скоро появятся.",
      photoAlt: (i) => `Фотография из детского сада «Тамирис» №${i}`,
      openPhoto: (i) => `Открыть фотографию №${i}`,
      close: "Закрыть",
      prev: "Предыдущая фотография",
      next: "Следующая фотография",
      counter: (c, t) => `${c} / ${t}`,
      dialogLabel: "Просмотр фотографии",
    },
    documents: {
      eyebrow: "Документы",
      title: "Документы",
      description: "Ознакомьтесь с документами, связанными с деятельностью детского сада.",
      button: "Посмотреть документы",
      newTab: "(откроется в новой вкладке)",
    },
    contacts: {
      eyebrow: "Контакты",
      title: "Свяжитесь с нами",
      description: "Если у вас есть вопросы, свяжитесь с нами.",
      addressLabel: "Адрес",
      address: "г. Алматы, Наурызбайский район, мкр. Каргалы, ул. Кенесары хан, 116.",
      phonesLabel: "Телефоны",
      hoursLabel: "Режим работы",
      hours,
      instagramLabel: "Instagram",
      route: "Построить маршрут",
      call: "Позвонить",
      mapTitle: "Детский сад «Тамирис» на карте",
    },
    footer: {
      description: `Частный детский сад в Алматы для детей ${ages} лет. Воспитание на казахском языке.`,
      navTitle: "Разделы",
      contactsTitle: "Контакты",
      rights: "© 2026 «Тамирис». Все права защищены.",
    },
  },
};

export type { Dictionary };
