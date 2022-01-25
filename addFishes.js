import { db } from './src/utils/firebase';

var ref = db.collection("fishes");

const data = [
    {
        "id": "full-page-hor-scroll",
        "name": "Горизонтальный скролл страницы",
        "description": "Позволяет сделать для всей страницы горизонтальный скролл блоков. Можно добавить фиксированное меню сверху",
        "tags": ["скролл"],
        "price": 1000,
        "video": "https://youtu.be/dhBbZSuJXvI"
    },
    {
        "id": "blocks-hor-scroll",
        "name": "Горизонтальный скролл нескольких блоков",
        "description": "Позволяет сделать горизонтальный скролл нескольких (смежных) блоков на странице. Рассчитана только на полноэкранные блоки.",
        "tags": ["скролл"],
        "price": 1000,
        "video": "https://youtu.be/BZ3Y7AVs-00"
    },
    {
        "id": "italic-text",
        "name": "Текст италиком",
        "description": "При наведении на ссылку ее текст становится курсивным.",
        "tags": ["hover", "текст"],
        "price": 500,
        "video": "https://youtu.be/Da10zsPgYXo"
    },
    {
        "id": "cursor-mask",
        "name": "Маска курсором",
        "description": "Позволяет положить один блок под другой (и так много блоков попарно) и использовать курсор как «маску», открывающую нижний блок.",
        "tags": ["курсор", "hover"],
        "price": 800,
        "video": "https://youtu.be/8QjVwK-2FjY"
    },
    {
        "id": "button-to-circle",
        "name": "Кнопка в кружок",
        "description": "По наведению на кнопку ее фон отъезжает вправо в кружок, а надпись – влево. ",
        "tags": ["кнопки", "hover"],
        "price": 8000,
        "video": "https://youtu.be/24wSbvSUgaE"
    }
];

data.forEach(d => {
    ref.doc(d.id).set({
        name: d.name,
        description: d.description,
        tags: d.tags,
        price: d.price,
        video: d.video
    });
});