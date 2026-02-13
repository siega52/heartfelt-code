import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [heart, setHeart] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [glitchText, setGlitchText] = useState(false);
  const heartRef = useRef(null);
  
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
    const interval = setInterval(() => {
      if (showMessage) {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 5 + 3,
          delay: Math.random() * 5,
          emoji: ['❤️', '💖', '💝', '💕', '💗', '💓', '💘', '💞'][Math.floor(Math.random() * 8)]
        };
        setFloatingHearts(prev => [...prev.slice(-15), newHeart]);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [showMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (heartRef.current) {
        const rect = heartRef.current.getBoundingClientRect();
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: Math.random() * rect.width + rect.left,
          y: Math.random() * rect.height + rect.top,
          size: Math.random() * 4 + 2,
        };
        setSparkles(prev => [...prev.slice(-20), newSparkle]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= bigHeart.length) {
        setHeart(bigHeart.slice(0, index));
        index += 3;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowMessage(true), 300);
        
        setInterval(() => {
          setGlitchText(true);
          setTimeout(() => setGlitchText(false), 200);
        }, 3000);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* Фон с частицами */}
      <div className="particle-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              background: `rgba(255, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 0.3})`
            }}
          />
        ))}
      </div>

      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.speed}s`,
            animationDelay: `${heart.delay}s`
          }}
        >
          {heart.emoji}
        </div>
      ))}

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
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }}>❤️</span>
              ))}
            </div>

            <div className="message-card">
              <p className="main-message">
                С Днём Святого Валентина, моя любимая Маша! 💝
              </p>
              <p className="sub-message">
                Ты делаешь мою жизнь ярче каждый день!
                <br />
                Спасибо, что ты есть!
              </p>
            </div>

            <div className="love-counter">
              <span>❤️</span>
              <span className="counter-number">∞</span>
              <span>❤️</span>
            </div>
          </div>
        )}
      </div>

      {/* Музыкальная нота (декоративная) */}
      <div className="music-notes">
        <span>♪</span>
        <span>♫</span>
        <span>♩</span>
        <span>♬</span>
      </div>
    </div>
  );
}

export default App;