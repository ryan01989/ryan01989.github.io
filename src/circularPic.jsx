import React from 'react';

export default function SpinningCircularText() {
  const text = "DYLAN RYAN ✦ DYLAN RYAN ✦ DYLAN RYAN ✦ DYLAN RYAN ✦ DYLAN RYAN ✦ ";
  const text2 = "✦ SOFTWARE DEVELOPER ✦ RESEARCHER ✦ ARTIST ✦ DESIGNER ✦ SOFTWARE DEVELOPER ✦";
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  };

  const outerContainerStyle = {
    position: 'relative',
    width: '320px',
    height: '320px'
  };

  const centralImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    overflow: 'hidden',
    //boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    //border: '4px solid rgba(255, 255, 255, 0.2)'
  };

  const imageContentStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/assets/Headshot.jpg)',
    backgroundSize: 'cover',   
    backgroundPosition: 'center', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };


  const spinningContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animation: 'spin 10s linear infinite'
  };

  const svgStyle = {
    width: '100%',
    height: '100%'
  };

  const textStyle = {
    fill: 'var(--red)',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.1em'
  };

  const outerSpinningContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animation: 'spin-reverse 15s linear infinite'
  };

  const outerTextStyle = {
    fill: 'var(--darkRed)',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    opacity: 0.6
  };

  

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes spin-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
          }
        `}
      </style>
      
      <div style={outerContainerStyle}>
        {/* Central circular image */}
        <div style={centralImageStyle}>
          <div style={imageContentStyle}>
          </div>
        </div>
        
        {/* Spinning text container */}
        <div style={spinningContainerStyle}>
          <svg style={svgStyle} viewBox="0 0 320 320">
            <defs>
              <path
                id="circle-path"
                d="M 160, 160 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
              />
            </defs>
            <text style={textStyle}>
              <textPath href="#circle-path">
                {text}
              </textPath>
            </text>
          </svg>
        </div>
        
        {/* Additional spinning text in opposite direction */}
        <div style={outerSpinningContainerStyle}>
          <svg style={svgStyle} viewBox="0 0 320 320">
            <defs>
              <path
                id="circle-path-2"
                d="M 160, 160 m -140, 0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0"
              />
            </defs>
            <text style={outerTextStyle}>
              <textPath href="#circle-path-2">
                {text2}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}