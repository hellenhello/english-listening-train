// 新牛津沪教版 七年级第一学期 英语听力题库
// 内容覆盖 Unit 1-6 常见词汇和句型

// 单词听写题库
const wordData = [
    // Unit 1: Making friends
    { word: "Germany", meaning: "德国", unit: "Unit 1" },
    { word: "blog", meaning: "博客", unit: "Unit 1" },
    { word: "grammar", meaning: "语法", unit: "Unit 1" },
    { word: "sound", meaning: "声音；听起来", unit: "Unit 1" },
    { word: "complete", meaning: "完成；完全的", unit: "Unit 1" },
    { word: "hobby", meaning: "爱好", unit: "Unit 1" },
    { word: "country", meaning: "国家", unit: "Unit 1" },
    { word: "age", meaning: "年龄", unit: "Unit 1" },
    { word: "dream", meaning: "梦想", unit: "Unit 1" },
    { word: "everyone", meaning: "每个人", unit: "Unit 1" },
    
    // Unit 2: Daily life
    { word: "daily", meaning: "每日的", unit: "Unit 2" },
    { word: "article", meaning: "文章", unit: "Unit 2" },
    { word: "never", meaning: "从不", unit: "Unit 2" },
    { word: "ride", meaning: "骑；乘坐", unit: "Unit 2" },
    { word: "usually", meaning: "通常", unit: "Unit 2" },
    { word: "seldom", meaning: "很少", unit: "Unit 2" },
    { word: "geography", meaning: "地理", unit: "Unit 2" },
    { word: "break", meaning: "休息；打破", unit: "Unit 2" },
    { word: "bell", meaning: "铃", unit: "Unit 2" },
    { word: "practice", meaning: "练习", unit: "Unit 2" },
    
    // Unit 3: The Earth
    { word: "earth", meaning: "地球", unit: "Unit 3" },
    { word: "protect", meaning: "保护", unit: "Unit 3" },
    { word: "pollution", meaning: "污染", unit: "Unit 3" },
    { word: "provide", meaning: "提供", unit: "Unit 3" },
    { word: "energy", meaning: "能量", unit: "Unit 3" },
    { word: "burn", meaning: "燃烧", unit: "Unit 3" },
    { word: "kilometre", meaning: "千米；公里", unit: "Unit 3" },
    { word: "ocean", meaning: "海洋", unit: "Unit 3" },
    { word: "forest", meaning: "森林", unit: "Unit 3" },
    { word: "ground", meaning: "地面", unit: "Unit 3" },
    
    // Unit 4: Seasons
    { word: "season", meaning: "季节", unit: "Unit 4" },
    { word: "weather", meaning: "天气", unit: "Unit 4" },
    { word: "temperature", meaning: "温度", unit: "Unit 4" },
    { word: "snowy", meaning: "下雪的", unit: "Unit 4" },
    { word: "sunny", meaning: "晴朗的", unit: "Unit 4" },
    { word: "wind", meaning: "风", unit: "Unit 4" },
    { word: "shine", meaning: "照耀", unit: "Unit 4" },
    { word: "brightly", meaning: "明亮地", unit: "Unit 4" },
    { word: "everything", meaning: "一切", unit: "Unit 4" },
    { word: "trip", meaning: "旅行", unit: "Unit 4" },
    
    // Unit 5: Visiting the Moon
    { word: "diary", meaning: "日记", unit: "Unit 5" },
    { word: "space", meaning: "太空", unit: "Unit 5" },
    { word: "spaceship", meaning: "宇宙飞船", unit: "Unit 5" },
    { word: "nervous", meaning: "紧张的", unit: "Unit 5" },
    { word: "leave", meaning: "离开", unit: "Unit 5" },
    { word: "gravity", meaning: "重力", unit: "Unit 5" },
    { word: "able", meaning: "能够", unit: "Unit 5" },
    { word: "float", meaning: "漂浮", unit: "Unit 5" },
    { word: "tie", meaning: "系；绑", unit: "Unit 5" },
    { word: "breathe", meaning: "呼吸", unit: "Unit 5" },
    
    // Unit 6: Travelling around Asia
    { word: "travel", meaning: "旅行", unit: "Unit 6" },
    { word: "guide", meaning: "导游；指南", unit: "Unit 6" },
    { word: "area", meaning: "地区", unit: "Unit 6" },
    { word: "traditional", meaning: "传统的", unit: "Unit 6" },
    { word: "modern", meaning: "现代的", unit: "Unit 6" },
    { word: "place", meaning: "地方", unit: "Unit 6" },
    { word: "building", meaning: "建筑物", unit: "Unit 6" },
    { word: "just", meaning: "仅仅；刚才", unit: "Unit 6" },
    { word: "sightseeing", meaning: "观光", unit: "Unit 6" },
    { word: "centre", meaning: "中心", unit: "Unit 6" }
];

// 句子理解题库
const sentenceData = [
    {
        sentence: "My name is Anna. I come from Germany.",
        question: "Where does Anna come from?",
        options: ["Germany", "China", "Japan", "England"],
        answer: 0,
        unit: "Unit 1"
    },
    {
        sentence: "I want to be an engineer when I grow up.",
        question: "What does the speaker want to be?",
        options: ["A teacher", "An engineer", "A doctor", "A driver"],
        answer: 1,
        unit: "Unit 1"
    },
    {
        sentence: "Everyone loves him because he is very friendly.",
        question: "Why does everyone love him?",
        options: ["He is rich", "He is friendly", "He is smart", "He is tall"],
        answer: 1,
        unit: "Unit 1"
    },
    {
        sentence: "I always get up at six o'clock in the morning.",
        question: "When does the speaker get up?",
        options: ["At 5:00", "At 6:00", "At 7:00", "At 8:00"],
        answer: 1,
        unit: "Unit 2"
    },
    {
        sentence: "She usually rides her bike to school.",
        question: "How does she go to school?",
        options: ["By bus", "On foot", "By bike", "By car"],
        answer: 2,
        unit: "Unit 2"
    },
    {
        sentence: "We have a morning break at ten o'clock.",
        question: "What time is the morning break?",
        options: ["At 9:00", "At 10:00", "At 11:00", "At 12:00"],
        answer: 1,
        unit: "Unit 2"
    },
    {
        sentence: "The Earth provides us with air, water and food.",
        question: "What does the Earth provide us with?",
        options: ["Only water", "Only food", "Air, water and food", "Only air"],
        answer: 2,
        unit: "Unit 3"
    },
    {
        sentence: "We must stop polluting the Earth.",
        question: "What must we stop doing?",
        options: ["Polluting", "Eating", "Sleeping", "Reading"],
        answer: 0,
        unit: "Unit 3"
    },
    {
        sentence: "There are forests and rivers on Earth.",
        question: "What can we find on Earth?",
        options: ["Only forests", "Only rivers", "Forests and rivers", "Nothing"],
        answer: 2,
        unit: "Unit 3"
    },
    {
        sentence: "In spring, the weather starts to get warm.",
        question: "What's the weather like in spring?",
        options: ["Cold", "Warm", "Hot", "Cool"],
        answer: 1,
        unit: "Unit 4"
    },
    {
        sentence: "It is exciting to go on a picnic in autumn.",
        question: "What is exciting in autumn?",
        options: ["Swimming", "Going on a picnic", "Skating", "Sleeping"],
        answer: 1,
        unit: "Unit 4"
    },
    {
        sentence: "The Sun shines brightly in summer.",
        question: "How does the Sun shine in summer?",
        options: ["Weakly", "Brightly", "Slowly", "Quietly"],
        answer: 1,
        unit: "Unit 4"
    },
    {
        sentence: "I was very nervous when I left the Earth.",
        question: "How did the speaker feel?",
        options: ["Happy", "Nervous", "Sad", "Angry"],
        answer: 1,
        unit: "Unit 5"
    },
    {
        sentence: "We can float around in the spaceship.",
        question: "What can we do in the spaceship?",
        options: ["Swim", "Run", "Float", "Jump"],
        answer: 2,
        unit: "Unit 5"
    },
    {
        sentence: "There is no gravity in space.",
        question: "What is there in space?",
        options: ["Much gravity", "Some gravity", "A little gravity", "No gravity"],
        answer: 3,
        unit: "Unit 5"
    },
    {
        sentence: "Tokyo is the capital of Japan.",
        question: "Which city is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: 2,
        unit: "Unit 6"
    },
    {
        sentence: "You can see many tall buildings in this modern city.",
        question: "What can you see in the modern city?",
        options: ["Old houses", "Tall buildings", "Forests", "Rivers"],
        answer: 1,
        unit: "Unit 6"
    },
    {
        sentence: "People love to go sightseeing in beautiful places.",
        question: "What do people love to do?",
        options: ["Go shopping", "Go sightseeing", "Go swimming", "Go fishing"],
        answer: 1,
        unit: "Unit 6"
    }
];

// 短文听力题库
const passageData = [
    {
        title: "My New Friend",
        passage: "Hello, my name is Sam. I'm from England. I'm twelve years old. I have a new friend. Her name is Lily. She is from China. She is eleven years old. We both love reading books. We also like playing basketball together. Lily is very friendly and helpful. I'm happy to have her as my friend.",
        questions: [
            {
                question: "Where is Sam from?",
                options: ["China", "England", "America", "Japan"],
                answer: 1
            },
            {
                question: "How old is Lily?",
                options: ["Ten", "Eleven", "Twelve", "Thirteen"],
                answer: 1
            },
            {
                question: "What do Sam and Lily both love?",
                options: ["Reading books", "Watching TV", "Swimming", "Dancing"],
                answer: 0
            }
        ],
        unit: "Unit 1"
    },
    {
        title: "A Busy Morning",
        passage: "This is Tom. He is a student. Every morning, Tom gets up at six thirty. He always has breakfast at seven o'clock. He usually eats bread and drinks milk. After breakfast, he brushes his teeth. Then he goes to school by bus. School starts at eight o'clock. Tom is never late for school.",
        questions: [
            {
                question: "What time does Tom get up?",
                options: ["6:00", "6:30", "7:00", "7:30"],
                answer: 1
            },
            {
                question: "What does Tom usually eat for breakfast?",
                options: ["Rice", "Noodles", "Bread", "Cake"],
                answer: 2
            },
            {
                question: "How does Tom go to school?",
                options: ["On foot", "By bike", "By bus", "By car"],
                answer: 2
            }
        ],
        unit: "Unit 2"
    },
    {
        title: "Protect Our Earth",
        passage: "The Earth is our home. It provides us with air, water and food. There are many beautiful forests, rivers and mountains on Earth. However, some people throw rubbish everywhere. This pollutes our Earth. We must stop doing this. We should protect our Earth. We can plant more trees and save water. Let's work together to make the Earth a better place.",
        questions: [
            {
                question: "What does the Earth provide us with?",
                options: ["Only air", "Only water", "Air, water and food", "Nothing"],
                answer: 2
            },
            {
                question: "What pollutes the Earth?",
                options: ["Trees", "Water", "Rubbish", "Air"],
                answer: 2
            },
            {
                question: "What can we do to protect the Earth?",
                options: ["Throw rubbish", "Waste water", "Plant more trees", "Cut down trees"],
                answer: 2
            }
        ],
        unit: "Unit 3"
    },
    {
        title: "My Favourite Season",
        passage: "I love autumn. It is my favourite season. In autumn, the weather is cool and dry. The leaves turn yellow and red. They look very beautiful. I like to go on picnics with my family. We eat delicious food and enjoy the nice weather. Sometimes we fly kites in the park. Autumn is really wonderful!",
        questions: [
            {
                question: "What is the speaker's favourite season?",
                options: ["Spring", "Summer", "Autumn", "Winter"],
                answer: 2
            },
            {
                question: "What's the weather like in autumn?",
                options: ["Hot and wet", "Cool and dry", "Cold and snowy", "Warm and rainy"],
                answer: 1
            },
            {
                question: "What does the speaker like to do in autumn?",
                options: ["Go swimming", "Go skiing", "Go on picnics", "Go skating"],
                answer: 2
            }
        ],
        unit: "Unit 4"
    },
    {
        title: "A Trip to Space",
        passage: "Yesterday I had an amazing dream. I travelled to space in a spaceship. When the spaceship left the Earth, I felt very nervous. In space, there was no gravity. I could float around. It was so much fun! I looked out of the window and saw the beautiful Earth. It was blue and white. I also saw the Moon. It was grey and big. This trip was really exciting!",
        questions: [
            {
                question: "Where did the speaker travel?",
                options: ["To the sea", "To space", "To the forest", "To the mountain"],
                answer: 1
            },
            {
                question: "How did the speaker feel when leaving Earth?",
                options: ["Happy", "Excited", "Nervous", "Bored"],
                answer: 2
            },
            {
                question: "What colour was the Earth?",
                options: ["Green and yellow", "Blue and white", "Red and black", "Grey and white"],
                answer: 1
            }
        ],
        unit: "Unit 5"
    },
    {
        title: "Travelling in Asia",
        passage: "Asia is a very big area. There are many interesting places to visit. Tokyo is a modern city in Japan. You can see many tall buildings there. Bangkok is the capital of Thailand. It has a lot of traditional markets. People love to go sightseeing there. Beijing is a great city in China. It has many famous places like the Great Wall. Travelling in Asia is always fun and exciting!",
        questions: [
            {
                question: "What kind of city is Tokyo?",
                options: ["Traditional", "Modern", "Small", "Old"],
                answer: 1
            },
            {
                question: "What does Bangkok have a lot of?",
                options: ["Mountains", "Rivers", "Traditional markets", "Forests"],
                answer: 2
            },
            {
                question: "What famous place is mentioned in Beijing?",
                options: ["The Great Wall", "Big Ben", "Eiffel Tower", "Statue of Liberty"],
                answer: 0
            }
        ],
        unit: "Unit 6"
    }
];
