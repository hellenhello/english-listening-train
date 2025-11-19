// 音频控制模块 - 使用浏览器 Web Speech API (TTS)

class AudioPlayer {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPlaying = false;
    }

    /**
     * 播放文本内容
     * @param {string} text - 要播放的英文文本
     * @param {number} rate - 播放速率 (0.75 = 慢速, 1 = 正常, 1.25 = 快速)
     * @param {function} onStart - 播放开始时的回调
     * @param {function} onEnd - 播放结束时的回调
     */
    play(text, rate = 1, onStart = null, onEnd = null) {
        // 停止当前正在播放的内容
        this.stop();

        // 创建新的语音合成对象
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // 设置语言为美式英语
        this.currentUtterance.lang = 'en-US';
        
        // 设置播放速率
        this.currentUtterance.rate = rate;
        
        // 设置音量 (0-1)
        this.currentUtterance.volume = 1;
        
        // 设置音调 (0-2, 1是默认)
        this.currentUtterance.pitch = 1;

        // 播放开始事件
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            if (onStart) onStart();
        };

        // 播放结束事件
        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            if (onEnd) onEnd();
        };

        // 播放错误事件
        this.currentUtterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.isPlaying = false;
            if (onEnd) onEnd();
        };

        // 开始播放
        this.synth.speak(this.currentUtterance);
    }

    /**
     * 停止播放
     */
    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.isPlaying = false;
        this.currentUtterance = null;
    }

    /**
     * 暂停播放
     */
    pause() {
        if (this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
        }
    }

    /**
     * 恢复播放
     */
    resume() {
        if (this.synth.paused) {
            this.synth.resume();
        }
    }

    /**
     * 检查是否正在播放
     */
    getIsPlaying() {
        return this.isPlaying;
    }

    /**
     * 获取可用的语音列表
     */
    getVoices() {
        return this.synth.getVoices();
    }

    /**
     * 设置特定的语音
     * @param {string} voiceName - 语音名称
     */
    setVoice(voiceName) {
        const voices = this.getVoices();
        const voice = voices.find(v => v.name === voiceName);
        if (voice && this.currentUtterance) {
            this.currentUtterance.voice = voice;
        }
    }

    /**
     * 播放单词（适用于单词听写）
     * @param {string} word - 单词
     * @param {number} rate - 播放速率
     */
    playWord(word, rate = 1) {
        return new Promise((resolve) => {
            this.play(
                word,
                rate,
                null,
                () => resolve()
            );
        });
    }

    /**
     * 播放句子（适用于句子理解）
     * @param {string} sentence - 句子
     * @param {number} rate - 播放速率
     */
    playSentence(sentence, rate = 1) {
        return new Promise((resolve) => {
            this.play(
                sentence,
                rate,
                null,
                () => resolve()
            );
        });
    }

    /**
     * 播放短文（适用于短文听力）
     * 短文会在适当的位置添加停顿
     * @param {string} passage - 短文
     * @param {number} rate - 播放速率
     */
    playPassage(passage, rate = 1) {
        return new Promise((resolve) => {
            // 在句子结束处添加停顿（用逗号模拟）
            const processedText = passage.replace(/\./g, '...');
            
            this.play(
                processedText,
                rate,
                null,
                () => resolve()
            );
        });
    }
}

// 创建全局音频播放器实例
const audioPlayer = new AudioPlayer();

// 等待语音列表加载完成（某些浏览器需要）
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
        const voices = audioPlayer.getVoices();
        
        // 尝试选择美式英语语音
        const preferredVoices = [
            'Google US English',
            'Microsoft David - English (United States)',
            'Microsoft Zira - English (United States)',
            'Alex',
            'Samantha'
        ];

        for (let voiceName of preferredVoices) {
            const voice = voices.find(v => v.name.includes(voiceName) || v.name === voiceName);
            if (voice) {
                console.log('Selected voice:', voice.name);
                break;
            }
        }
    };
}
