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
    {
      id: 'html-13',
      a: 1,
      az: { q: 'Hansı teq qalın və eyni zamanda vacib (semantik) mətni bildirir?', o: ['<b>', '<strong>', '<i>', '<mark>'] },
      en: { q: 'Which tag marks text as important (semantic bold)?', o: ['<b>', '<strong>', '<i>', '<mark>'] },
    },
    {
      id: 'html-14',
      a: 2,
      az: { q: 'Səhifənin simvol kodlaşdırmasını hansı teq təyin edir?', o: ['<meta name="encoding">', '<encoding>', '<meta charset="UTF-8">', '<html lang="utf-8">'] },
      en: { q: 'Which tag sets the character encoding of the page?', o: ['<meta name="encoding">', '<encoding>', '<meta charset="UTF-8">', '<html lang="utf-8">'] },
    },
    {
      id: 'html-15',
      a: 0,
      az: { q: '<html> elementindəki lang atributu nə üçündür?', o: ['Səhifənin dilini brauzerə və ekran oxuyuculara bildirir', 'Səhifəni avtomatik tərcümə edir', 'Şrifti dəyişir', 'Kodlaşdırmanı təyin edir'] },
      en: { q: 'What is the lang attribute on <html> for?', o: ['It tells browsers and screen readers the page language', 'It translates the page automatically', 'It changes the font', 'It sets the encoding'] },
    },
    {
      id: 'html-16',
      a: 3,
      az: { q: 'Bir neçə variantdan yalnız birini seçmək üçün hansı input tipi istifadə olunur?', o: ['checkbox', 'select', 'option', 'radio'] },
      en: { q: 'Which input type lets the user pick only one option from a group?', o: ['checkbox', 'select', 'option', 'radio'] },
    },
    {
      id: 'html-17',
      a: 1,
      az: { q: 'Video yerləşdirmək üçün hansı HTML5 elementi var?', o: ['<media>', '<video>', '<movie>', '<embed-video>'] },
      en: { q: 'Which HTML5 element embeds a video?', o: ['<media>', '<video>', '<movie>', '<embed-video>'] },
    },
    {
      id: 'html-18',
      a: 2,
      az: { q: 'Formun məlumatı hara göndərəcəyini hansı atribut təyin edir?', o: ['method', 'target', 'action', 'href'] },
      en: { q: 'Which attribute sets where a form sends its data?', o: ['method', 'target', 'action', 'href'] },
    },
    {
      id: 'html-19',
      a: 0,
      az: { q: 'Cədvəldə xananı iki sütun genişliyində etmək üçün nə yazılır?', o: ['colspan="2"', 'rowspan="2"', 'width="2"', 'span="2"'] },
      en: { q: 'How do you make a table cell span two columns?', o: ['colspan="2"', 'rowspan="2"', 'width="2"', 'span="2"'] },
    },
    {
      id: 'html-20',
      a: 3,
      az: { q: 'Data atributu (data-*) JavaScript-də hansı xüsusiyyətlə oxunur?', o: ['element.data', 'element.attributes.data', 'element.getData()', 'element.dataset'] },
      en: { q: 'Which property reads data-* attributes in JavaScript?', o: ['element.data', 'element.attributes.data', 'element.getData()', 'element.dataset'] },
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
    {
      id: 'css-13',
      a: 2,
      az: { q: 'Mətni elementin daxilində üfüqi mərkəzləşdirmək üçün hansı xüsusiyyət istifadə olunur?', o: ['align: center', 'vertical-align: middle', 'text-align: center', 'justify-content: center'] },
      en: { q: 'Which property centres text horizontally inside an element?', o: ['align: center', 'vertical-align: middle', 'text-align: center', 'justify-content: center'] },
    },
    {
      id: 'css-14',
      a: 0,
      az: { q: '1rem nəyə bərabərdir?', o: ['Kök (html) elementin şrift ölçüsünə', 'Valideyn elementin şrift ölçüsünə', 'Ekran enin 1%-nə', 'Həmişə 10px-ə'] },
      en: { q: 'What is 1rem equal to?', o: ['The root (html) element\'s font size', 'The parent element\'s font size', '1% of the viewport width', 'Always 10px'] },
    },
    {
      id: 'css-15',
      a: 3,
      az: { q: 'Elementi gizlədib onun yerini də boşaldan dəyər hansıdır?', o: ['visibility: hidden', 'opacity: 0', 'overflow: hidden', 'display: none'] },
      en: { q: 'Which value hides an element and also removes the space it takes?', o: ['visibility: hidden', 'opacity: 0', 'overflow: hidden', 'display: none'] },
    },
    {
      id: 'css-16',
      a: 1,
      az: { q: 'Siçan elementin üzərinə gələndə stil vermək üçün hansı psevdo-sinif istifadə olunur?', o: [':focus', ':hover', ':active', ':visited'] },
      en: { q: 'Which pseudo-class styles an element when the mouse is over it?', o: [':focus', ':hover', ':active', ':visited'] },
    },
    {
      id: 'css-17',
      a: 2,
      az: { q: 'position: absolute olan element nəyə görə yerləşdirilir?', o: ['Həmişə səhifənin özünə', 'Öz normal yerinə', 'Ən yaxın position-u static olmayan valideynə', 'Brauzer pəncərəsinə, sürüşdürmədə də sabit qalır'] },
      en: { q: 'What is an element with position: absolute positioned relative to?', o: ['Always the page itself', 'Its own normal position', 'The nearest ancestor whose position is not static', 'The browser window, staying fixed on scroll'] },
    },
    {
      id: 'css-18',
      a: 0,
      az: { q: 'grid-template-columns: repeat(3, 1fr) nə edir?', o: ['Üç bərabər enli sütun yaradır', 'Üç sətir yaradır', 'Hər sütunu 3px edir', 'Sütunlar arasında 3fr boşluq qoyur'] },
      en: { q: 'What does grid-template-columns: repeat(3, 1fr) do?', o: ['Creates three equal-width columns', 'Creates three rows', 'Makes every column 3px wide', 'Adds a 3fr gap between columns'] },
    },
    {
      id: 'css-19',
      a: 1,
      az: { q: 'Flex elementlərin yeni sətrə keçməsinə hansı xüsusiyyət icazə verir?', o: ['flex-direction: column', 'flex-wrap: wrap', 'align-content: wrap', 'flex-flow: break'] },
      en: { q: 'Which property lets flex items wrap onto a new line?', o: ['flex-direction: column', 'flex-wrap: wrap', 'align-content: wrap', 'flex-flow: break'] },
    },
    {
      id: 'css-20',
      a: 3,
      az: { q: '::before psevdo-elementinin görünməsi üçün hansı xüsusiyyət mütləqdir?', o: ['display', 'position', 'z-index', 'content'] },
      en: { q: 'Which property is required for a ::before pseudo-element to appear?', o: ['display', 'position', 'z-index', 'content'] },
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
    {
      id: 'js-13',
      a: 1,
      az: { q: 'Massivin uzunluğunu necə öyrənirik?', o: ['arr.size', 'arr.length', 'arr.count()', 'length(arr)'] },
      en: { q: 'How do you get the length of an array?', o: ['arr.size', 'arr.length', 'arr.count()', 'length(arr)'] },
    },
    {
      id: 'js-14',
      a: 3,
      az: { q: 'Obyekti JSON sətrinə hansı metod çevirir?', o: ['JSON.parse()', 'Object.toString()', 'JSON.toText()', 'JSON.stringify()'] },
      en: { q: 'Which method turns an object into a JSON string?', o: ['JSON.parse()', 'Object.toString()', 'JSON.toText()', 'JSON.stringify()'] },
    },
    {
      id: 'js-15',
      a: 0,
      az: { q: 'const { name } = user; sətri nə edir?', o: ['user obyektinin name xüsusiyyətini name dəyişəninə yazır', 'user obyektinə name əlavə edir', 'name xüsusiyyətini silir', 'user-i name-ə kopyalayır'] },
      en: { q: 'What does const { name } = user; do?', o: ['It copies the name property of user into a name variable', 'It adds name to the user object', 'It deletes the name property', 'It copies user into name'] },
    },
    {
      id: 'js-16',
      a: 2,
      az: { q: 'setTimeout(fn, 0) funksiyanı nə vaxt işə salır?', o: ['Dərhal, sinxron şəkildə', 'Heç vaxt', 'Cari kod bitdikdən sonra, növbəti tapşırıq kimi', 'Səhifə yenidən yüklənəndə'] },
      en: { q: 'When does setTimeout(fn, 0) run the function?', o: ['Immediately, synchronously', 'Never', 'After the current code finishes, as a later task', 'When the page reloads'] },
    },
    {
      id: 'js-17',
      a: 1,
      az: { q: '[1, 2, 3].reduce((sum, x) => sum + x, 0) nə qaytarır?', o: ['[1, 2, 3]', '6', '0', '"123"'] },
      en: { q: 'What does [1, 2, 3].reduce((sum, x) => sum + x, 0) return?', o: ['[1, 2, 3]', '6', '0', '"123"'] },
    },
    {
      id: 'js-18',
      a: 0,
      az: { q: 'Ox funksiyalarının (arrow functions) adi funksiyalardan bir fərqi nədir?', o: ['Öz this dəyərləri yoxdur, onu xarici kontekstdən götürürlər', 'Arqument qəbul edə bilmirlər', 'Həmişə asinxrondurlar', 'Dəyər qaytara bilmirlər'] },
      en: { q: 'What is one difference between arrow functions and regular functions?', o: ['They have no own this; they take it from the outer scope', 'They cannot take arguments', 'They are always asynchronous', 'They cannot return a value'] },
    },
    {
      id: 'js-19',
      a: 3,
      az: { q: 'Düymə klikini dinləmək üçün hansı metod istifadə olunur?', o: ['button.onClick()', 'button.listen("click")', 'button.on("click")', 'button.addEventListener("click", fn)'] },
      en: { q: 'Which method listens for a button click?', o: ['button.onClick()', 'button.listen("click")', 'button.on("click")', 'button.addEventListener("click", fn)'] },
    },
    {
      id: 'js-20',
      a: 2,
      az: { q: 'await açar sözü harada istifadə oluna bilər?', o: ['İstənilən adi funksiyada', 'Yalnız for dövrəsində', 'async funksiyanın daxilində (və ya modulun yuxarı səviyyəsində)', 'Yalnız Promise.then() daxilində'] },
      en: { q: 'Where can the await keyword be used?', o: ['In any regular function', 'Only inside a for loop', 'Inside an async function (or at the top level of a module)', 'Only inside Promise.then()'] },
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
    {
      id: 'react-13',
      a: 0,
      az: { q: 'React komponentinin adı niyə böyük hərflə başlamalıdır?', o: ['JSX kiçik hərfli adları HTML teqi kimi qəbul edir', 'Bu yalnız üslub qaydasıdır', 'Böyük hərf komponenti sürətləndirir', 'Kiçik hərfli komponentlər state saxlaya bilmir'] },
      en: { q: 'Why must a React component name start with a capital letter?', o: ['JSX treats lowercase names as HTML tags', 'It is only a style rule', 'Capital letters make it faster', 'Lowercase components cannot hold state'] },
    },
    {
      id: 'react-14',
      a: 2,
      az: { q: 'JSX-də JavaScript ifadəsini necə yazırıq?', o: ['[[ ifadə ]]', '${ ifadə }', '{ ifadə }', '( ifadə )'] },
      en: { q: 'How do you write a JavaScript expression inside JSX?', o: ['[[ expression ]]', '${ expression }', '{ expression }', '( expression )'] },
    },
    {
      id: 'react-15',
      a: 1,
      az: { q: 'Şərtə görə element göstərmək üçün düzgün JSX hansıdır?', o: ['if (isOpen) <Modal />', '{isOpen && <Modal />}', '<Modal if={isOpen} />', '<if isOpen><Modal /></if>'] },
      en: { q: 'Which JSX correctly shows an element only when a condition is true?', o: ['if (isOpen) <Modal />', '{isOpen && <Modal />}', '<Modal if={isOpen} />', '<if isOpen><Modal /></if>'] },
    },
    {
      id: 'react-16',
      a: 3,
      az: { q: 'Props haqqında hansı fikir doğrudur?', o: ['Uşaq komponent props-u birbaşa dəyişə bilər', 'Props yalnız sətir ola bilər', 'Props state ilə eynidir', 'Props uşaq komponent üçün yalnız oxunandır'] },
      en: { q: 'Which statement about props is true?', o: ['A child can change its props directly', 'Props can only be strings', 'Props are the same as state', 'Props are read-only for the child component'] },
    },
    {
      id: 'react-17',
      a: 0,
      az: { q: 'useEffect daxilindən qaytarılan funksiya nə üçündür?', o: ['Təmizləmə (cleanup): abunəlikləri və taymerləri dayandırmaq', 'Yeni state qaytarmaq', 'Komponenti yenidən render etmək', 'Xətaları tutmaq'] },
      en: { q: 'What is the function returned from inside useEffect for?', o: ['Cleanup: stopping subscriptions and timers', 'Returning new state', 'Re-rendering the component', 'Catching errors'] },
    },
    {
      id: 'react-18',
      a: 2,
      az: { q: 'JSX-də onClick-ə nə ötürülməlidir?', o: ['Funksiyanın çağırılışı: onClick={handle()}', 'Sətir: onClick="handle"', 'Funksiyanın özü: onClick={handle}', 'Obyekt: onClick={{ handle }}'] },
      en: { q: 'What should be passed to onClick in JSX?', o: ['A function call: onClick={handle()}', 'A string: onClick="handle"', 'The function itself: onClick={handle}', 'An object: onClick={{ handle }}'] },
    },
    {
      id: 'react-19',
      a: 1,
      az: { q: 'Massivdən siyahı render etmək üçün adətən hansı metod istifadə olunur?', o: ['forEach()', 'map()', 'reduce()', 'find()'] },
      en: { q: 'Which array method is usually used to render a list?', o: ['forEach()', 'map()', 'reduce()', 'find()'] },
    },
    {
      id: 'react-20',
      a: 3,
      az: { q: 'useCallback hook-u nəyi yadda saxlayır (memoize edir)?', o: ['State dəyərini', 'DOM elementini', 'Hesablamanın nəticəsini', 'Funksiyanın özünü, asılılıqlar dəyişməyənə qədər'] },
      en: { q: 'What does the useCallback hook memoize?', o: ['A state value', 'A DOM element', 'The result of a calculation', 'The function itself, until its dependencies change'] },
    },
  ],
}
