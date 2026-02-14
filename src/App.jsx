import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import heart1 from '/src/assets/img/2.png';
import heart2 from '/src/assets/img/3.png';
import heart3 from '/src/assets/img/4.png';
import heart4 from '/src/assets/img/5.png';
import heart5 from '/src/assets/img/6.png';
import heart6 from '/src/assets/img/7.png';
import heart7 from '/src/assets/img/8.png';

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
  const heartImages = [heart1, heart2, heart3, heart4, heart5, heart6, heart7];
  
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

  useEffect(() => {
    if (!showMessage) return;

    if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);

    heartIntervalRef.current = setInterval(() => {
      setFloatingHearts(prev => {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 4 + 3,
          // Выбираем случайное изображение из массива
          image: heartImages[Math.floor(Math.random() * heartImages.length)],
          // Или если хочешь добавить вариаций с rotation
          rotation: Math.random() * 360,
          // Разная opacity для разнообразия
          opacity: Math.random() * 0.5 + 0.5
        };
        
        const updated = [...prev.slice(-14), newHeart];
        return updated;
      });
    }, 500);

    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
    };
  }, [showMessage]);

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

          const updated = [...prev.slice(-9), newSparkle];
          return updated;
        });


        setTimeout(() => {
          setSparkles(prev => prev.slice(1));
        }, 1000);
      }
    }, 300);

    return () => {
      if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);
    };
  }, [showMessage]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= bigHeart.length) {
        setHeart(bigHeart.slice(0, index));
        index += 2;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowMessage(true), 300);
        
        glitchIntervalRef.current = setInterval(() => {
          setGlitchText(true);
          setTimeout(() => setGlitchText(false), 150);
        }, 4000);

        return () => {
          if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
        };
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
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

      {floatingHearts.map(heart => (
        <img
          key={heart.id}
          src={heart.image}
          alt="heart"
          className="floating-heart-image"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: 'auto',
            animationDuration: `${heart.speed}s`,
            transform: `rotate(${heart.rotation || 0}deg)`,
            opacity: heart.opacity || 1,
            position: 'absolute',
            bottom: '-50px',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
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
              <span className="from" data-text="От Сережи">От: Сережи</span>
              <span className="to" data-text="Кому Маше">Кому: Маше</span>
            </h1>
            
            <div className="heart-rain">
              {[...Array(3)].map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.2}s` }}><img src="/src/assets/img/1.png" alt="#"/></span>
              ))}
            </div>

            <div className="message-card">
              <p className="main-message">
                Ты, конечно, не JavaScript, но когда ты рядом, мой null превращается в object
              </p>  
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;