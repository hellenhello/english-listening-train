// 主应用逻辑

// 应用状态管理
const appState = {
    currentModule: 'word',
    wordModule: {
        currentIndex: 0,
        score: 0,
        mistakes: []
    },
    sentenceModule: {
        currentIndex: 0,
        score: 0,
        mistakes: []
    },
    passageModule: {
        currentIndex: 0,
        score: 0,
        mistakes: [],
        currentAnswers: []
    }
};

// 本地存储管理
const storage = {
    save() {
        localStorage.setItem('listeningAppState', JSON.stringify(appState));
    },
    load() {
        const saved = localStorage.getItem('listeningAppState');
        if (saved) {
            const loaded = JSON.parse(saved);
            Object.assign(appState, loaded);
        }
    },
    clear() {
        localStorage.removeItem('listeningAppState');
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    storage.load();
    initNavigation();
    initWordModule();
    initSentenceModule();
    initPassageModule();
    initReviewModule();
    updateAllProgress();
});

// ==================== 导航功能 ====================
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const module = btn.dataset.module;
            switchModule(module);
        });
    });
}

function switchModule(moduleName) {
    // 停止当前播放的音频
    audioPlayer.stop();
    
    // 更新导航按钮状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.module === moduleName);
    });
    
    // 更新模块显示
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    document.getElementById(`${moduleName}-module`).classList.add('active');
    
    appState.currentModule = moduleName;
    
    // 如果切换到错题本，刷新显示
    if (moduleName === 'review') {
        displayMistakes();
    }
}

// ==================== 单词听写模块 ====================
function initWordModule() {
    const playBtn = document.getElementById('word-play');
    const submitBtn = document.getElementById('word-submit');
    const nextBtn = document.getElementById('word-next');
    const replayBtn = document.getElementById('word-replay');
    const input = document.getElementById('word-input');
    const speedSelect = document.getElementById('word-speed');

    playBtn.addEventListener('click', () => playCurrentWord());
    
    submitBtn.addEventListener('click', () => checkWordAnswer());
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkWordAnswer();
        }
    });

    nextBtn.addEventListener('click', () => {
        nextWord();
    });

    replayBtn.addEventListener('click', () => {
        resetWordModule();
    });

    // 初始化第一题
    if (appState.wordModule.currentIndex === 0) {
        loadWord();
    } else {
        loadWord(appState.wordModule.currentIndex);
    }
}

function playCurrentWord() {
    const currentWord = wordData[appState.wordModule.currentIndex];
    const speed = parseFloat(document.getElementById('word-speed').value);
    const playBtn = document.getElementById('word-play');
    
    playBtn.disabled = true;
    playBtn.textContent = '🔊 播放中...';
    
    audioPlayer.playWord(currentWord.word, speed).then(() => {
        playBtn.disabled = false;
        playBtn.textContent = '🔊 播放单词';
    });
}

function loadWord(index = 0) {
    appState.wordModule.currentIndex = index;
    
    if (index >= wordData.length) {
        showWordCompletion();
        return;
    }

    const input = document.getElementById('word-input');
    const feedback = document.getElementById('word-feedback');
    const nextBtn = document.getElementById('word-next');
    const submitBtn = document.getElementById('word-submit');
    
    input.value = '';
    input.disabled = false;
    feedback.className = 'feedback';
    nextBtn.classList.remove('show');
    submitBtn.style.display = 'inline-block';
    
    updateWordProgress();
}

function checkWordAnswer() {
    const input = document.getElementById('word-input');
    const answer = input.value.trim().toLowerCase();
    const currentWord = wordData[appState.wordModule.currentIndex];
    const correctAnswer = currentWord.word.toLowerCase();
    const feedback = document.getElementById('word-feedback');
    const nextBtn = document.getElementById('word-next');
    const submitBtn = document.getElementById('word-submit');

    if (!answer) {
        alert('请先输入答案！');
        return;
    }

    input.disabled = true;
    submitBtn.style.display = 'none';

    if (answer === correctAnswer) {
        feedback.className = 'feedback correct show';
        feedback.innerHTML = `✅ 正确！<br><div class="correct-answer">${currentWord.word} - ${currentWord.meaning}</div>`;
        appState.wordModule.score += 10;
    } else {
        feedback.className = 'feedback wrong show';
        feedback.innerHTML = `❌ 错误！<br><div class="correct-answer">正确答案：${currentWord.word} - ${currentWord.meaning}</div>`;
        
        // 记录错题
        appState.wordModule.mistakes.push({
            type: 'word',
            question: currentWord.word,
            yourAnswer: answer,
            correctAnswer: currentWord.word,
            meaning: currentWord.meaning,
            unit: currentWord.unit
        });
    }

    nextBtn.classList.add('show');
    updateWordProgress();
    storage.save();
}

function nextWord() {
    loadWord(appState.wordModule.currentIndex + 1);
}

function resetWordModule() {
    appState.wordModule.currentIndex = 0;
    appState.wordModule.score = 0;
    loadWord(0);
    storage.save();
}

function showWordCompletion() {
    const feedback = document.getElementById('word-feedback');
    const nextBtn = document.getElementById('word-next');
    const submitBtn = document.getElementById('word-submit');
    const input = document.getElementById('word-input');
    
    input.disabled = true;
    submitBtn.style.display = 'none';
    nextBtn.classList.remove('show');
    
    feedback.className = 'feedback show';
    feedback.style.background = '#e3f2fd';
    feedback.style.color = '#1565c0';
    feedback.innerHTML = `
        🎉 恭喜完成所有单词！<br>
        <div style="margin-top: 10px; font-size: 1.2rem;">
            总得分：${appState.wordModule.score} 分<br>
            错题数：${appState.wordModule.mistakes.length} 题
        </div>
    `;
}

function updateWordProgress() {
    document.getElementById('word-progress').textContent = 
        `${appState.wordModule.currentIndex + 1}/${wordData.length}`;
    document.getElementById('word-score').textContent = appState.wordModule.score;
}

// ==================== 句子理解模块 ====================
function initSentenceModule() {
    const playBtn = document.getElementById('sentence-play');
    const nextBtn = document.getElementById('sentence-next');
    const replayBtn = document.getElementById('sentence-replay');

    playBtn.addEventListener('click', () => playCurrentSentence());
    
    nextBtn.addEventListener('click', () => {
        nextSentence();
    });

    replayBtn.addEventListener('click', () => {
        resetSentenceModule();
    });

    loadSentence();
}

function playCurrentSentence() {
    const currentSentence = sentenceData[appState.sentenceModule.currentIndex];
    const speed = parseFloat(document.getElementById('sentence-speed').value);
    const playBtn = document.getElementById('sentence-play');
    
    playBtn.disabled = true;
    playBtn.textContent = '🔊 播放中...';
    
    audioPlayer.playSentence(currentSentence.sentence, speed).then(() => {
        playBtn.disabled = false;
        playBtn.textContent = '🔊 播放句子';
    });
}

function loadSentence(index = 0) {
    appState.sentenceModule.currentIndex = index;
    
    if (index >= sentenceData.length) {
        showSentenceCompletion();
        return;
    }

    const currentSentence = sentenceData[index];
    const questionText = document.getElementById('sentence-question');
    const optionsArea = document.getElementById('sentence-options');
    const feedback = document.getElementById('sentence-feedback');
    const nextBtn = document.getElementById('sentence-next');
    
    questionText.textContent = currentSentence.question;
    feedback.className = 'feedback';
    nextBtn.classList.remove('show');
    
    // 生成选项按钮
    optionsArea.innerHTML = '';
    currentSentence.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        btn.addEventListener('click', () => selectSentenceOption(i));
        optionsArea.appendChild(btn);
    });
    
    updateSentenceProgress();
}

function selectSentenceOption(selectedIndex) {
    const currentSentence = sentenceData[appState.sentenceModule.currentIndex];
    const optionBtns = document.querySelectorAll('#sentence-options .option-btn');
    const feedback = document.getElementById('sentence-feedback');
    const nextBtn = document.getElementById('sentence-next');
    
    // 禁用所有按钮
    optionBtns.forEach(btn => btn.disabled = true);
    
    // 显示正确答案
    optionBtns[currentSentence.answer].classList.add('correct');
    
    if (selectedIndex === currentSentence.answer) {
        feedback.className = 'feedback correct show';
        feedback.textContent = '✅ 回答正确！';
        appState.sentenceModule.score += 10;
    } else {
        optionBtns[selectedIndex].classList.add('wrong');
        feedback.className = 'feedback wrong show';
        feedback.textContent = `❌ 回答错误！正确答案是 ${String.fromCharCode(65 + currentSentence.answer)}`;
        
        // 记录错题
        appState.sentenceModule.mistakes.push({
            type: 'sentence',
            question: currentSentence.sentence,
            questionText: currentSentence.question,
            yourAnswer: currentSentence.options[selectedIndex],
            correctAnswer: currentSentence.options[currentSentence.answer],
            unit: currentSentence.unit
        });
    }
    
    nextBtn.classList.add('show');
    updateSentenceProgress();
    storage.save();
}

function nextSentence() {
    loadSentence(appState.sentenceModule.currentIndex + 1);
}

function resetSentenceModule() {
    appState.sentenceModule.currentIndex = 0;
    appState.sentenceModule.score = 0;
    loadSentence(0);
    storage.save();
}

function showSentenceCompletion() {
    const questionText = document.getElementById('sentence-question');
    const optionsArea = document.getElementById('sentence-options');
    const feedback = document.getElementById('sentence-feedback');
    const nextBtn = document.getElementById('sentence-next');
    
    questionText.textContent = '';
    optionsArea.innerHTML = '';
    nextBtn.classList.remove('show');
    
    feedback.className = 'feedback show';
    feedback.style.background = '#e3f2fd';
    feedback.style.color = '#1565c0';
    feedback.innerHTML = `
        🎉 恭喜完成所有句子！<br>
        <div style="margin-top: 10px; font-size: 1.2rem;">
            总得分：${appState.sentenceModule.score} 分<br>
            错题数：${appState.sentenceModule.mistakes.length} 题
        </div>
    `;
}

function updateSentenceProgress() {
    document.getElementById('sentence-progress').textContent = 
        `${appState.sentenceModule.currentIndex + 1}/${sentenceData.length}`;
    document.getElementById('sentence-score').textContent = appState.sentenceModule.score;
}

// ==================== 短文听力模块 ====================
function initPassageModule() {
    const playBtn = document.getElementById('passage-play');
    const submitBtn = document.getElementById('passage-submit');
    const nextBtn = document.getElementById('passage-next');
    const replayBtn = document.getElementById('passage-replay');

    playBtn.addEventListener('click', () => playCurrentPassage());
    
    submitBtn.addEventListener('click', () => {
        checkPassageAnswers();
    });

    nextBtn.addEventListener('click', () => {
        nextPassage();
    });

    replayBtn.addEventListener('click', () => {
        resetPassageModule();
    });

    loadPassage();
}

function playCurrentPassage() {
    const currentPassage = passageData[appState.passageModule.currentIndex];
    const speed = parseFloat(document.getElementById('passage-speed').value);
    const playBtn = document.getElementById('passage-play');
    
    playBtn.disabled = true;
    playBtn.textContent = '🔊 播放中...';
    
    audioPlayer.playPassage(currentPassage.passage, speed).then(() => {
        playBtn.disabled = false;
        playBtn.textContent = '🔊 播放短文';
    });
}

function loadPassage(index = 0) {
    appState.passageModule.currentIndex = index;
    appState.passageModule.currentAnswers = [];
    
    if (index >= passageData.length) {
        showPassageCompletion();
        return;
    }

    const currentPassage = passageData[index];
    const questionsDiv = document.getElementById('passage-questions');
    const feedback = document.getElementById('passage-feedback');
    const submitBtn = document.getElementById('passage-submit');
    const nextBtn = document.getElementById('passage-next');
    
    feedback.className = 'feedback';
    submitBtn.style.display = 'inline-block';
    nextBtn.classList.remove('show');
    
    // 生成问题
    questionsDiv.innerHTML = '';
    currentPassage.questions.forEach((q, qIndex) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'passage-question-item';
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = `问题 ${qIndex + 1}: ${q.question}`;
        questionItem.appendChild(questionTitle);
        
        const optionsArea = document.createElement('div');
        optionsArea.className = 'options-area';
        optionsArea.dataset.questionIndex = qIndex;
        
        q.options.forEach((option, oIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + oIndex)}. ${option}`;
            btn.addEventListener('click', () => selectPassageOption(qIndex, oIndex));
            optionsArea.appendChild(btn);
        });
        
        questionItem.appendChild(optionsArea);
        questionsDiv.appendChild(questionItem);
    });
    
    updatePassageProgress();
}

function selectPassageOption(questionIndex, optionIndex) {
    const optionsArea = document.querySelector(`[data-question-index="${questionIndex}"]`);
    const buttons = optionsArea.querySelectorAll('.option-btn');
    
    // 清除之前的选择
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // 标记新选择
    buttons[optionIndex].classList.add('selected');
    
    // 保存答案
    appState.passageModule.currentAnswers[questionIndex] = optionIndex;
}

function checkPassageAnswers() {
    const currentPassage = passageData[appState.passageModule.currentIndex];
    const feedback = document.getElementById('passage-feedback');
    const submitBtn = document.getElementById('passage-submit');
    const nextBtn = document.getElementById('passage-next');
    
    // 检查是否所有问题都已回答
    if (appState.passageModule.currentAnswers.length !== currentPassage.questions.length) {
        alert('请回答所有问题！');
        return;
    }

    submitBtn.style.display = 'none';
    
    let correctCount = 0;
    
    currentPassage.questions.forEach((q, qIndex) => {
        const optionsArea = document.querySelector(`[data-question-index="${qIndex}"]`);
        const buttons = optionsArea.querySelectorAll('.option-btn');
        const userAnswer = appState.passageModule.currentAnswers[qIndex];
        
        // 禁用所有按钮
        buttons.forEach(btn => btn.disabled = true);
        
        // 显示正确答案
        buttons[q.answer].classList.add('correct');
        
        if (userAnswer === q.answer) {
            correctCount++;
        } else {
            buttons[userAnswer].classList.add('wrong');
            
            // 记录错题
            appState.passageModule.mistakes.push({
                type: 'passage',
                title: currentPassage.title,
                passage: currentPassage.passage,
                question: q.question,
                yourAnswer: q.options[userAnswer],
                correctAnswer: q.options[q.answer],
                unit: currentPassage.unit
            });
        }
    });
    
    const score = Math.round((correctCount / currentPassage.questions.length) * 30);
    appState.passageModule.score += score;
    
    feedback.className = 'feedback show';
    if (correctCount === currentPassage.questions.length) {
        feedback.classList.add('correct');
        feedback.textContent = `✅ 全部正确！得分：${score} 分`;
    } else {
        feedback.classList.add('wrong');
        feedback.textContent = `答对 ${correctCount}/${currentPassage.questions.length} 题，得分：${score} 分`;
    }
    
    nextBtn.classList.add('show');
    updatePassageProgress();
    storage.save();
}

function nextPassage() {
    loadPassage(appState.passageModule.currentIndex + 1);
}

function resetPassageModule() {
    appState.passageModule.currentIndex = 0;
    appState.passageModule.score = 0;
    loadPassage(0);
    storage.save();
}

function showPassageCompletion() {
    const questionsDiv = document.getElementById('passage-questions');
    const feedback = document.getElementById('passage-feedback');
    const submitBtn = document.getElementById('passage-submit');
    const nextBtn = document.getElementById('passage-next');
    
    questionsDiv.innerHTML = '';
    submitBtn.style.display = 'none';
    nextBtn.classList.remove('show');
    
    feedback.className = 'feedback show';
    feedback.style.background = '#e3f2fd';
    feedback.style.color = '#1565c0';
    feedback.innerHTML = `
        🎉 恭喜完成所有短文！<br>
        <div style="margin-top: 10px; font-size: 1.2rem;">
            总得分：${appState.passageModule.score} 分<br>
            错题数：${appState.passageModule.mistakes.length} 题
        </div>
    `;
}

function updatePassageProgress() {
    document.getElementById('passage-progress').textContent = 
        `${appState.passageModule.currentIndex + 1}/${passageData.length}`;
    document.getElementById('passage-score').textContent = appState.passageModule.score;
}

// ==================== 错题本模块 ====================
function initReviewModule() {
    const clearBtn = document.getElementById('clear-mistakes');
    clearBtn.addEventListener('click', () => {
        if (confirm('确定要清空所有错题吗？')) {
            appState.wordModule.mistakes = [];
            appState.sentenceModule.mistakes = [];
            appState.passageModule.mistakes = [];
            storage.save();
            displayMistakes();
        }
    });
}

function displayMistakes() {
    const reviewContent = document.getElementById('review-content');
    const allMistakes = [
        ...appState.wordModule.mistakes,
        ...appState.sentenceModule.mistakes,
        ...appState.passageModule.mistakes
    ];
    
    if (allMistakes.length === 0) {
        reviewContent.innerHTML = '<p class="empty-message">暂无错题记录 😊</p>';
        return;
    }
    
    reviewContent.innerHTML = '';
    
    allMistakes.forEach((mistake, index) => {
        const item = document.createElement('div');
        item.className = 'mistake-item';
        
        let content = '';
        
        if (mistake.type === 'word') {
            content = `
                <h4>单词听写 - ${mistake.unit}</h4>
                <p><strong>单词：</strong>${mistake.question} (${mistake.meaning})</p>
                <p><strong>你的答案：</strong><span class="your-answer">${mistake.yourAnswer}</span></p>
                <p><strong>正确答案：</strong><span class="correct-answer">${mistake.correctAnswer}</span></p>
                <button class="replay-audio" onclick="replayMistakeAudio('${mistake.question}', 'word')">🔊 重新播放</button>
            `;
        } else if (mistake.type === 'sentence') {
            content = `
                <h4>句子理解 - ${mistake.unit}</h4>
                <p><strong>句子：</strong>${mistake.question}</p>
                <p><strong>问题：</strong>${mistake.questionText}</p>
                <p><strong>你的答案：</strong><span class="your-answer">${mistake.yourAnswer}</span></p>
                <p><strong>正确答案：</strong><span class="correct-answer">${mistake.correctAnswer}</span></p>
                <button class="replay-audio" onclick="replayMistakeAudio('${mistake.question}', 'sentence')">🔊 重新播放</button>
            `;
        } else if (mistake.type === 'passage') {
            content = `
                <h4>短文听力 - ${mistake.unit}: ${mistake.title}</h4>
                <p><strong>问题：</strong>${mistake.question}</p>
                <p><strong>你的答案：</strong><span class="your-answer">${mistake.yourAnswer}</span></p>
                <p><strong>正确答案：</strong><span class="correct-answer">${mistake.correctAnswer}</span></p>
                <button class="replay-audio" onclick="replayMistakeAudio(\`${mistake.passage.replace(/`/g, '\\`')}\`, 'passage')">🔊 重新播放短文</button>
            `;
        }
        
        item.innerHTML = content;
        reviewContent.appendChild(item);
    });
}

// 重新播放错题音频（全局函数）
window.replayMistakeAudio = function(text, type) {
    if (type === 'word') {
        audioPlayer.playWord(text, 1);
    } else if (type === 'sentence') {
        audioPlayer.playSentence(text, 1);
    } else if (type === 'passage') {
        audioPlayer.playPassage(text, 1);
    }
};

// ==================== 辅助函数 ====================
function updateAllProgress() {
    updateWordProgress();
    updateSentenceProgress();
    updatePassageProgress();
}
