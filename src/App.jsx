import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [heart, setHeart] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [glitchText, setGlitchText] = useState(false);
  const heartRef = useRef(null);
  const heartIntervalRef = useRef(null);
  const sparkleIntervalRef = useRef(null);
  const glitchIntervalRef = useRef(null);
  
  // Увеличенное и более детальное сердце
  const bigHeart = `⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀00000000000000⠀⠀⠀⠀⠀00000000000000⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀000000000000000000⠀⠀0000000000000000000⠀⠀⠀⠀
⠀⠀⠀⠀000000000000000000000000000000________00000⠀⠀⠀
⠀⠀⠀0000000000000000000000000000000__________0000⠀⠀
⠀⠀0000000000000000000000000000000000__________000⠀ 
⠀⠀00000000000000000000000000000000000000_____0000⠀ 
⠀00000000000000000000000000000000000000000___00000 
⠀000000000000000000000000000000000000000000_000000 
⠀000000000000000000000000000000000000000000000000⠀ 
⠀000000000000000000000000000000000000000000000000⠀ 
⠀⠀00000000000000000000000000000000000000000000000⠀ 
⠀⠀⠀000000000000000000000000000000000000000000000⠀⠀ 
⠀⠀⠀⠀00000000000000000000000000000000000000000⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀0000000000000000000000000000000000000⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀0000000000000000000000000000000⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀00000000000000000000000000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀00000000000000000000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀000000000000000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀0000000000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀000000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀0000⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀00⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
  `;

  useEffect(() => {
    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
      if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, []);

  // Оптимизированная генерация летающих сердечек (с ограничением)
  useEffect(() => {
    if (!showMessage) return;

    // Очищаем предыдущий интервал
    if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);

    heartIntervalRef.current = setInterval(() => {
      setFloatingHearts(prev => {
        // Ограничиваем количество сердечек до 15
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 20 + 15, // Уменьшил размер
          speed: Math.random() * 4 + 3,
          emoji: ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]
        };
        
        // Добавляем новое и удаляем старые, если больше 15
        const updated = [...prev.slice(-14), newHeart];
        return updated;
      });
    }, 500); // Увеличил интервал до 500ms

    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
    };
  }, [showMessage]);

  // Оптимизированная генерация искр
  useEffect(() => {
    if (!showMessage) return;

    if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);

    sparkleIntervalRef.current = setInterval(() => {
      if (heartRef.current) {
        const rect = heartRef.current.getBoundingClientRect();
        setSparkles(prev => {
          const newSparkle = {
            id: Date.now() + Math.random(),
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            size: Math.random() * 3 + 1,
          };
          // Ограничиваем до 10 искр
          const updated = [...prev.slice(-9), newSparkle];
          return updated;
        });

        // Удаляем искры через 1 секунду
        setTimeout(() => {
          setSparkles(prev => prev.slice(1));
        }, 1000);
      }
    }, 300); // Увеличил интервал до 300ms

    return () => {
      if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);
    };
  }, [showMessage]);

  // Эффект печатания сердца
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= bigHeart.length) {
        setHeart(bigHeart.slice(0, index));
        index += 2; // Увеличил шаг для более быстрой печати
      } else {
        clearInterval(interval);
        setTimeout(() => setShowMessage(true), 300);
        
        // Глитч эффект
        glitchIntervalRef.current = setInterval(() => {
          setGlitchText(true);
          setTimeout(() => setGlitchText(false), 150);
        }, 4000); // Увеличил интервал глитча до 4 секунд

        return () => {
          if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
        };
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Оптимизированная функция создания сердечка по клику
  const createHeart = useCallback(() => {
    setFloatingHearts(prev => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: 35,
        speed: 4,
        emoji: '💖'
      };
      return [...prev.slice(-14), newHeart];
    });
  }, []);

  return (
    <div className="app">
      {/* Фон с частицами (уменьшил количество до 25) */}
      <div className="particle-background">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Летающие сердечки */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.speed}s`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Искры над сердцем */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}

      <div className="container">
        <div className="heart-wrapper" ref={heartRef}>
          <pre className={`heart-ascii ${showMessage ? 'pulse' : ''}`}>
            {heart}
          </pre>
          <div className="heart-glow" />
        </div>
        
        {showMessage && (
          <div className="message-container">
            <h1 className={`valentine-message ${glitchText ? 'glitch' : ''}`}>
              <span className="from" data-text="От Сережи">От Сережи</span>
              <span className="to" data-text="Кому Маше">Кому Маше</span>
            </h1>
            
            <div className="heart-rain">
              {[...Array(3)].map((_, i) => ( // Уменьшил до 3
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>❤️</span>
              ))}
            </div>

            <div className="message-card">
              <p className="main-message">
                С Днём Святого Валентина, Маша! 💝
              </p>
              <p className="sub-message">
                Ты делаешь мою жизнь ярче каждый день!
              </p>
            </div>

            <button 
              className="heart-button"
              onClick={createHeart}
            >
              💝 Отправить сердечко 💝
            </button>

            <div className="love-counter">
              <span className="counter-number">❤️ ∞ ❤️</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;