// Question bank. Each item has the same question in Azerbaijani (az) and English (en).
// `a` is the index of the correct option in the `o` arrays (identical order in both languages).
// Options are shuffled at runtime, so the authored position does not matter.

export const CATEGORIES = ['html', 'css', 'javascript', 'react']

export const QUESTIONS = {
  html: [
    {
      id: 'html-1',
      a: 0,
      az: { q: 'Ən böyük başlığı hansı teq yaradır?', o: ['<h1>', '<h6>', '<head>', '<header>'] },
      en: { q: 'Which tag creates the largest heading?', o: ['<h1>', '<h6>', '<head>', '<header>'] },
    },
    {
      id: 'html-2',
      a: 1,
      az: { q: 'Şəkil üçün alternativ mətni hansı atribut verir?', o: ['title', 'alt', 'src', 'name'] },
      en: { q: 'Which attribute gives an image its alternative text?', o: ['title', 'alt', 'src', 'name'] },
    },
    {
      id: 'html-3',
      a: 2,
      az: { q: 'Əsas naviqasiya keçidləri üçün hansı semantik element nəzərdə tutulub?', o: ['<aside>', '<menu>', '<nav>', '<section>'] },
      en: { q: 'Which semantic element is meant for the main navigation links?', o: ['<aside>', '<menu>', '<nav>', '<section>'] },
    },
    {
      id: 'html-4',
      a: 3,
      az: {
        q: '<!DOCTYPE html> bəyannaməsi nə edir?',
        o: ['HTML kitabxanasını yükləyir', 'JavaScript-i aktiv edir', '<head> elementini yaradır', 'Brauzerə səhifəni standart rejimdə göstərməyi bildirir'],
      },
      en: {
        q: 'What does the <!DOCTYPE html> declaration do?',
        o: ['Loads an HTML library', 'Turns on JavaScript', 'Creates the <head> element', 'Tells the browser to render the page in standards mode'],
      },
    },
    {
      id: 'html-5',
      a: 0,
      az: { q: 'Xarici CSS faylı hansı elementlə qoşulur?', o: ['<link rel="stylesheet">', '<style src="...">', '<script>', '<css>'] },
      en: { q: 'Which element connects an external CSS file?', o: ['<link rel="stylesheet">', '<style src="...">', '<script>', '<css>'] },
    },
    {
      id: 'html-6',
      a: 1,
      az: { q: 'Form sahəsinin doldurulmasını məcburi edən atribut hansıdır?', o: ['checked', 'required', 'readonly', 'placeholder'] },
      en: { q: 'Which attribute makes a form field mandatory?', o: ['checked', 'required', 'readonly', 'placeholder'] },
    },
    {
      id: 'html-7',
      a: 2,
      az: { q: 'Səhifənin əsas və unikal məzmunu hansı elementə yerləşdirilir?', o: ['<body>', '<article>', '<main>', '<div>'] },
      en: { q: 'Which element holds the main, unique content of a page?', o: ['<body>', '<article>', '<main>', '<div>'] },
    },
    {
      id: 'html-8',
      a: 3,
      az: { q: 'Keçidi yeni tabda açmaq üçün <a> teqinə nə əlavə edilir?', o: ['rel="new"', 'href="_new"', 'open="tab"', 'target="_blank"'] },
      en: { q: 'What do you add to an <a> tag to open the link in a new tab?', o: ['rel="new"', 'href="_new"', 'open="tab"', 'target="_blank"'] },
    },
    {
      id: 'html-9',
      a: 0,
      az: { q: 'Nömrələnmiş siyahı hansı teqlə yaradılır?', o: ['<ol>', '<ul>', '<li>', '<dl>'] },
      en: { q: 'Which tag creates a numbered list?', o: ['<ol>', '<ul>', '<li>', '<dl>'] },
    },
    {
      id: 'html-10',
      a: 1,
      az: { q: 'Bunlardan hansı bağlanan teqi olmayan (void) elementdir?', o: ['<p>', '<img>', '<span>', '<button>'] },
      en: { q: 'Which of these is a void element (it has no closing tag)?', o: ['<p>', '<img>', '<span>', '<button>'] },
    },
    {
      id: 'html-11',
      a: 2,
      az: {
        q: '<label for="email"> yazılışında for atributu nəyə istinad edir?',
        o: ['Sahənin name dəyərinə', 'Sahənin class adına', 'Sahənin id dəyərinə', 'Formun action ünvanına'],
      },
      en: {
        q: 'In <label for="email">, what does the for attribute point to?',
        o: ["The field's name value", "The field's class name", "The field's id value", "The form's action URL"],
      },
    },
    {
      id: 'html-12',
      a: 3,
      az: { q: 'Cədvəldə başlıq xanası hansı teqlə yazılır?', o: ['<td>', '<tr>', '<thead>', '<th>'] },
      en: { q: 'Which tag is used for a header cell in a table?', o: ['<td>', '<tr>', '<thead>', '<th>'] },
    },
  ],

  css: [
    {
      id: 'css-1',
      a: 0,
      az: { q: 'Mətnin rəngini hansı xassə dəyişir?', o: ['color', 'font-color', 'text-color', 'background'] },
      en: { q: 'Which property changes the text colour?', o: ['color', 'font-color', 'text-color', 'background'] },
    },
    {
      id: 'css-2',
      a: 1,
      az: { q: '"box" class-ı olan elementləri hansı selektor seçir?', o: ['#box', '.box', 'box', '*box'] },
      en: { q: 'Which selector matches elements with the class "box"?', o: ['#box', '.box', 'box', '*box'] },
    },
    {
      id: 'css-3',
      a: 2,
      az: { q: 'position xassəsinin standart (ilkin) dəyəri hansıdır?', o: ['relative', 'absolute', 'static', 'fixed'] },
      en: { q: 'What is the default value of the position property?', o: ['relative', 'absolute', 'static', 'fixed'] },
    },
    {
      id: 'css-4',
      a: 3,
      az: {
        q: 'Box modelin qatları içəridən çölə doğru hansı ardıcıllıqdadır?',
        o: ['margin, border, padding, content', 'content, margin, padding, border', 'padding, content, border, margin', 'content, padding, border, margin'],
      },
      en: {
        q: 'What is the order of the box model layers from the inside out?',
        o: ['margin, border, padding, content', 'content, margin, padding, border', 'padding, content, border, margin', 'content, padding, border, margin'],
      },
    },
    {
      id: 'css-5',
      a: 0,
      az: { q: 'Hansı vahid kök (html) elementin şrift ölçüsünə nisbətdə hesablanır?', o: ['rem', 'em', 'vh', 'px'] },
      en: { q: "Which unit is relative to the root (html) element's font size?", o: ['rem', 'em', 'vh', 'px'] },
    },
    {
      id: 'css-6',
      a: 1,
      az: { q: 'Flexbox-da elementləri əsas ox boyunca hansı xassə düzür?', o: ['align-items', 'justify-content', 'flex-wrap', 'align-content'] },
      en: { q: 'In flexbox, which property aligns items along the main axis?', o: ['align-items', 'justify-content', 'flex-wrap', 'align-content'] },
    },
    {
      id: 'css-7',
      a: 2,
      az: { q: 'Bu selektorlardan hansının spesifikliyi ən yüksəkdir?', o: ['p', '.title', '#title', '*'] },
      en: { q: 'Which of these selectors has the highest specificity?', o: ['p', '.title', '#title', '*'] },
    },
    {
      id: 'css-8',
      a: 3,
      az: {
        q: 'box-sizing: border-box nə deməkdir?',
        o: ['margin enə daxil edilir', 'Element çərçivəsiz göstərilir', 'Yalnız content eni nəzərə alınır', 'width dəyərinə padding və border də daxildir'],
      },
      en: {
        q: 'What does box-sizing: border-box mean?',
        o: ['Margin is included in the width', 'The element is drawn without a border', 'Only the content width is counted', 'The width value includes padding and border'],
      },
    },
    {
      id: 'css-9',
      a: 0,
      az: { q: 'Hansı @-qayda (at-rule) ekran ölçüsünə görə stil yazmaq üçün istifadə olunur?', o: ['@media', '@import', '@font-face', '@keyframes'] },
      en: { q: 'Which at-rule is used to write styles for different screen sizes?', o: ['@media', '@import', '@font-face', '@keyframes'] },
    },
    {
      id: 'css-10',
      a: 1,
      az: { q: 'CSS dəyişəni (custom property) necə elan olunur?', o: ['$main: red;', '--main: red;', 'var-main: red;', '@main: red;'] },
      en: { q: 'How do you declare a CSS custom property?', o: ['$main: red;', '--main: red;', 'var-main: red;', '@main: red;'] },
    },
    {
      id: 'css-11',
      a: 2,
      az: { q: 'Üst-üstə düşən elementlərin hansının üstdə görünəcəyini hansı xassə idarə edir?', o: ['order', 'opacity', 'z-index', 'float'] },
      en: { q: 'Which property controls which overlapping element appears on top?', o: ['order', 'opacity', 'z-index', 'float'] },
    },
    {
      id: 'css-12',
      a: 3,
      az: { q: 'Elementi grid konteynerinə çevirmək üçün nə yazılır?', o: ['display: flex;', 'grid: on;', 'layout: grid;', 'display: grid;'] },
      en: { q: 'What do you write to turn an element into a grid container?', o: ['display: flex;', 'grid: on;', 'layout: grid;', 'display: grid;'] },
    },
  ],

  javascript: [
    {
      id: 'js-1',
      a: 0,
      az: { q: 'typeof null ifadəsinin nəticəsi nədir?', o: ['"object"', '"null"', '"undefined"', '"number"'] },
      en: { q: 'What does typeof null return?', o: ['"object"', '"null"', '"undefined"', '"number"'] },
    },
    {
      id: 'js-2',
      a: 1,
      az: { q: 'Blok daxilində görünən və yenidən mənimsədilə bilməyən dəyişəni hansı açar söz elan edir?', o: ['var', 'const', 'let', 'static'] },
      en: { q: 'Which keyword declares a block-scoped variable that cannot be reassigned?', o: ['var', 'const', 'let', 'static'] },
    },
    {
      id: 'js-3',
      a: 2,
      az: { q: '0.1 + 0.2 === 0.3 ifadəsinin nəticəsi nədir?', o: ['true', 'undefined', 'false', 'NaN'] },
      en: { q: 'What is the result of 0.1 + 0.2 === 0.3?', o: ['true', 'undefined', 'false', 'NaN'] },
    },
    {
      id: 'js-4',
      a: 3,
      az: { q: '[1, 2, 3].map(x => x * 2) nə qaytarır?', o: ['[1, 2, 3]', '12', '[2, 4]', '[2, 4, 6]'] },
      en: { q: 'What does [1, 2, 3].map(x => x * 2) return?', o: ['[1, 2, 3]', '12', '[2, 4]', '[2, 4, 6]'] },
    },
    {
      id: 'js-5',
      a: 0,
      az: { q: 'Massivin sonuna element əlavə edən metod hansıdır?', o: ['push()', 'pop()', 'shift()', 'unshift()'] },
      en: { q: 'Which method adds an element to the end of an array?', o: ['push()', 'pop()', 'shift()', 'unshift()'] },
    },
    {
      id: 'js-6',
      a: 1,
      az: { q: '"5" + 3 ifadəsinin nəticəsi nədir?', o: ['8', '"53"', 'NaN', 'Xəta (TypeError)'] },
      en: { q: 'What is the result of "5" + 3?', o: ['8', '"53"', 'NaN', 'An error (TypeError)'] },
    },
    {
      id: 'js-7',
      a: 2,
      az: {
        q: '=== operatoru nəyi müqayisə edir?',
        o: ['Yalnız dəyəri, tip çevirməsi ilə', 'Yalnız tipi', 'Dəyəri və tipi, tip çevirməsi olmadan', 'Yaddaşdakı ünvanı, yalnız ədədlər üçün'],
      },
      en: {
        q: 'What does the === operator compare?',
        o: ['Only the value, with type coercion', 'Only the type', 'Value and type, without type coercion', 'Memory address, for numbers only'],
      },
    },
    {
      id: 'js-8',
      a: 3,
      az: { q: 'JSON sətrini obyektə hansı metod çevirir?', o: ['JSON.stringify()', 'JSON.toObject()', 'Object.from()', 'JSON.parse()'] },
      en: { q: 'Which method turns a JSON string into an object?', o: ['JSON.stringify()', 'JSON.toObject()', 'Object.from()', 'JSON.parse()'] },
    },
    {
      id: 'js-9',
      a: 0,
      az: {
        q: 'Promise.all() nə vaxt rədd edilir (reject)?',
        o: ['Promise-lərdən hər hansı biri rədd ediləndə', 'Yalnız hamısı rədd ediləndə', 'Heç vaxt, həmişə uğurla bitir', 'İlk promise uğurla bitəndə'],
      },
      en: {
        q: 'When does Promise.all() reject?',
        o: ['As soon as any of the promises rejects', 'Only when all of them reject', 'Never, it always fulfils', 'When the first promise fulfils'],
      },
    },
    {
      id: 'js-10',
      a: 1,
      az: { q: 'console.log(typeof NaN) nə çap edir?', o: ['"NaN"', '"number"', '"undefined"', '"object"'] },
      en: { q: 'What does console.log(typeof NaN) print?', o: ['"NaN"', '"number"', '"undefined"', '"object"'] },
    },
    {
      id: 'js-11',
      a: 2,
      az: { q: 'Bu dəyərlərdən hansı falsy-dir?', o: ['"0"', '[]', '0', '{}'] },
      en: { q: 'Which of these values is falsy?', o: ['"0"', '[]', '0', '{}'] },
    },
    {
      id: 'js-12',
      a: 3,
      az: {
        q: 'Array.prototype.filter() nə qaytarır?',
        o: ['Şərtə uyğun ilk elementi', 'true və ya false', 'Dəyişdirilmiş eyni massivi', 'Şərtə uyğun elementlərdən ibarət yeni massiv'],
      },
      en: {
        q: 'What does Array.prototype.filter() return?',
        o: ['The first matching element', 'true or false', 'The same array, modified', 'A new array with the elements that pass the test'],
      },
    },
  ],

  react: [
    {
      id: 'react-1',
      a: 0,
      az: { q: 'Funksional komponentə state əlavə edən hook hansıdır?', o: ['useState', 'useEffect', 'useRef', 'useId'] },
      en: { q: 'Which hook adds state to a function component?', o: ['useState', 'useEffect', 'useRef', 'useId'] },
    },
    {
      id: 'react-2',
      a: 1,
      az: { q: 'JSX-də elementə CSS klası hansı atributla verilir?', o: ['class', 'className', 'cssClass', 'style'] },
      en: { q: 'In JSX, which attribute gives an element a CSS class?', o: ['class', 'className', 'cssClass', 'style'] },
    },
    {
      id: 'react-3',
      a: 2,
      az: {
        q: 'Siyahı elementlərinə key prop-u nə üçün lazımdır?',
        o: ['Elementləri əlifba sırası ilə düzmək üçün', 'CSS stili tətbiq etmək üçün', 'React-in hansı elementin dəyişdiyini, əlavə və ya silindiyini tanıması üçün', 'Elementə klikləmə hadisəsi əlavə etmək üçün'],
      },
      en: {
        q: 'Why do list items need a key prop?',
        o: ['To sort them alphabetically', 'To apply CSS styles', 'So React can tell which items changed, were added or removed', 'To attach a click handler'],
      },
    },
    {
      id: 'react-4',
      a: 3,
      az: { q: 'Valideyn komponentdən uşaq komponentə məlumat nə ilə ötürülür?', o: ['state', 'ref', 'context id', 'props'] },
      en: { q: 'How is data passed from a parent component to a child?', o: ['state', 'ref', 'context id', 'props'] },
    },
    {
      id: 'react-5',
      a: 0,
      az: {
        q: 'Render-lər arasında saxlanılan və dəyişəndə yenidən render etməyən .current obyektini hansı hook qaytarır?',
        o: ['useRef', 'useState', 'useMemo', 'useReducer'],
      },
      en: {
        q: 'Which hook returns an object whose .current survives renders and does not trigger a re-render when changed?',
        o: ['useRef', 'useState', 'useMemo', 'useReducer'],
      },
    },
    {
      id: 'react-6',
      a: 1,
      az: {
        q: 'Əvvəlki dəyərə əsaslanaraq state-i yeniləməyin düzgün yolu hansıdır?',
        o: ['count = count + 1', 'setCount(c => c + 1)', 'this.count++', 'setCount(count++)'],
      },
      en: {
        q: 'What is the correct way to update state based on its previous value?',
        o: ['count = count + 1', 'setCount(c => c + 1)', 'this.count++', 'setCount(count++)'],
      },
    },
    {
      id: 'react-7',
      a: 2,
      az: {
        q: 'Fragment (<>...</>) nə üçün istifadə olunur?',
        o: ['Komponenti keşləmək üçün', 'Xətaları tutmaq üçün', 'Əlavə DOM elementi yaratmadan uşaqları qruplaşdırmaq üçün', 'Komponenti tənbəl (lazy) yükləmək üçün'],
      },
      en: {
        q: 'What is a Fragment (<>...</>) used for?',
        o: ['Caching a component', 'Catching errors', 'Grouping children without adding an extra DOM node', 'Lazy-loading a component'],
      },
    },
    {
      id: 'react-8',
      a: 3,
      az: { q: 'Ağır hesablamanın nəticəsini yadda saxlayan (memoize edən) hook hansıdır?', o: ['useEffect', 'useContext', 'useRef', 'useMemo'] },
      en: { q: 'Which hook memoizes the result of an expensive calculation?', o: ['useEffect', 'useContext', 'useRef', 'useMemo'] },
    },
    {
      id: 'react-9',
      a: 0,
      az: { q: 'Context-in dəyərini oxumaq üçün hansı hook istifadə olunur?', o: ['useContext', 'useProvider', 'useState', 'useCallback'] },
      en: { q: 'Which hook reads the value of a context?', o: ['useContext', 'useProvider', 'useState', 'useCallback'] },
    },
    {
      id: 'react-10',
      a: 1,
      az: {
        q: 'useEffect(fn, []) — boş asılılıq massivi ilə effekt nə vaxt işləyir?',
        o: ['Hər render-dən sonra', 'Yalnız komponent ilk dəfə yerləşdiriləndə (mount)', 'Heç vaxt', 'Hər state dəyişəndə'],
      },
      en: {
        q: 'useEffect(fn, []) — with an empty dependency array, when does the effect run?',
        o: ['After every render', 'Only when the component first mounts', 'Never', 'Every time any state changes'],
      },
    },
    {
      id: 'react-11',
      a: 2,
      az: {
        q: '"Controlled input" nədir?',
        o: ['Yalnız oxumaq üçün olan input', 'ref ilə dəyəri oxunan input', 'Dəyəri React state-i ilə idarə olunan input', 'Brauzerin özünün idarə etdiyi input'],
      },
      en: {
        q: 'What is a controlled input?',
        o: ['A read-only input', 'An input whose value is read through a ref', 'An input whose value is driven by React state', 'An input fully managed by the browser'],
      },
    },
    {
      id: 'react-12',
      a: 3,
      az: {
        q: '"State-i yuxarı qaldırmaq" (lifting state up) nə deməkdir?',
        o: ['State-i localStorage-ə yazmaq', 'State-i qlobal dəyişənə köçürmək', 'Komponenti siyahının başına qoymaq', 'Ortaq state-i ən yaxın ümumi valideyn komponentə köçürmək'],
      },
      en: {
        q: 'What does "lifting state up" mean?',
        o: ['Saving state to localStorage', 'Moving state into a global variable', 'Rendering the component first in a list', 'Moving shared state to the closest common parent component'],
      },
    },
  ],
}
