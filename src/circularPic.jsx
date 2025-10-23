import React from 'react';

export default function SpinningCircularText() {
  const text = " DYLAN RYAN  ✦  DYLAN RYAN  ✦  DYLAN RYAN  ✦  DYLAN RYAN  ✦  DYLAN RYAN  ✦ ";
  const text2 = "✦ SOFTWARE ENGINEER ✦ SOFTWARE ENGINEER ✦ SOFTWARE ENGINEER ✦ SOFTWARE ENGINEER ✦ SOFTWARE ENGINEER";

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  };

  const outerContainerStyle = {
    position: 'relative',
    width: '300px',
    height: '300px',
  };

  const centralImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const imageContentStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/assets/Headshot.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const spinningContainerStyle = {
    position: 'absolute',
    top: '-30px',
    left: '-30px',
    right: '-30px',
    bottom: '-30px',
    animation: 'spin 10s linear infinite',
  };

  const outerSpinningContainerStyle = {
    position: 'absolute',
    top: '-45px',
    left: '-45px',
    right: '-45px',
    bottom: '-45px',
    animation: 'spin-reverse 15s linear infinite',
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
  };

  const textStyle = {
    fill: 'var(--red)',
    fontSize: '20.6px',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
  };

  const outerTextStyle = {
    fill: 'var(--darkRed)',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    opacity: 0.6,
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `}
      </style>

      <div style={outerContainerStyle}>
        {/* Central circular image */}
        <div style={centralImageStyle}>
          <div style={imageContentStyle}></div>
        </div>

        {/* First spinning text (just outside image) */}
        <div style={spinningContainerStyle}>
          <svg style={svgStyle} viewBox="0 0 360 360">
            <defs>
              <path
                id="circle-path"
                d="M 180,180 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
              />
            </defs>
            <text style={textStyle}>
              <textPath href="#circle-path">{text}</textPath>
            </text>
          </svg>
        </div>

        {/* Outer spinning text (closer in) */}
        <div style={outerSpinningContainerStyle}>
          <svg style={svgStyle} viewBox="0 0 380 380">
            <defs>
              <path
                id="circle-path-2"
                d="M 190,190 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
              />
            </defs>
            <text style={outerTextStyle}>
              <textPath href="#circle-path-2">{text2}</textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
