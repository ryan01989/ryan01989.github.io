import { useEffect } from 'react';
import CurvedLoop from './CurvedLoop.jsx';
import './App.css'; // Adjust path if needed

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const topBar = document.getElementById('topBar');
      const title = document.getElementById('title');

      if (window.scrollY > 50) {
        title?.classList.remove('visible');
        topBar?.classList.add('visible');
      } else {
        title?.classList.add('visible');
        topBar?.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="topBar" id="topBar">
        <a href="#" className="logo">
          {/* INLINE SVG — you could also extract this to its own React component */}
          <svg viewBox="0 0 210 297" fill="currentColor">
            <defs id="defs1">
              <clipPath clipPathUnits="userSpaceOnUse" id="clipPath1">
                <path
                  style={{ display: 'none', opacity: 1 }}
                  d="m 117.64329,121.13271 v 46.52559 l 34.56187,0.49849 c 0,0 24.42594,1.3293 24.42594,-25.42291 0,0 -1.32931,-22.26582 -22.93048,-21.9335 z"
                  id="path4"
                />
                <path
                  id="lpe_path-effect4"
                  style={{ opacity: 1 }}
                  d="M 90.377467,95.36235 H 208.38331 V 259.89379 H 90.377467 Z m 27.265823,25.77036 v 46.52559 l 34.56187,0.49849 c 0,0 24.42594,1.3293 24.42594,-25.42291 0,0 -1.32931,-22.26582 -22.93048,-21.9335 z"
                />
              </clipPath>
            </defs>
            <g style={{ display: 'inline', fillOpacity: 1 }}>
              <path
                style={{ opacity: 1, fillOpacity: 1 }}
                d="m 14.112069,198.60662 57.278398,-0.41506 c 0,0 12.451826,0 19.196563,-7.26357 l -0.103764,-25.52624 c 0,0 -1.703388,-2.95931 -3.96335,-0.0275 -2.259963,2.93185 -7.120044,10.3319 -16.931815,10.48285 -9.811771,0.15095 -33.360023,0 -33.360023,0 L 35.699752,65.965294 66.116244,65.663391 c 0,0 21.812321,-0.981175 28.605086,28.227713 l 22.86897,0.15095 c 0,0 -0.65313,-44.675437 -46.93433,-50.846264 l -58.160045,0.462812 z"
              />
            </g>
            <path
              style={{ opacity: 1, fillOpacity: 1 }}
              d="M 95.377467,100.52852 V 254.3953 h 22.099663 l 0.16616,-65.80048 27.91535,0.16616 31.23862,65.80048 26.58605,0.33233 -34.3957,-68.62525 c 0,0 30.74012,-10.13593 28.58,-43.3685 -2.16012,-33.23257 -29.41082,-42.53769 -39.04827,-42.53769 z"
              clipPath="url(#clipPath1)"
            />
          </svg>
        </a>

        <div className="top-links">
          <a href="https://github.com/ryan01989" target="_blank" rel="noreferrer">Github</a>
          <a href="/assets/Ryan.Resume2024Sep.pdf" target="_blank" rel="noreferrer">Resume</a>
          <a href="https://linkedin.com/in/dylan-ryan-116999326" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/contact.html" target="_blank" rel="noreferrer">Contact</a>
        </div>
      </div>

      <h1 className="title visible" id="title">Dylan Ryan</h1>
      <img className="headImage" id="headImage" src="./assets/sf.jpg" alt="San Francisco" />
      <CurvedLoop
        marqueeText=" ABOUT ✦ ME ✦"
        speed={1}
        curveAmount={0}
        direction="right"
        interactive={true}
        className="custom-text-style"
      />
      <p className="paragraph">
        I am a sophomore at{" "}
        <a href="https://www.osu.edu/" target="_blank" rel="noreferrer">
          THE Ohio State University
        </a>{" "}
        studying Computer Science and Engineering and Applied Mathematics in the honors college.
        I am on track to graduate at a 4-year pace (05/2028) but I am considering pursuing a master's
        degree in Computer Science which would delay my graduation date.
        <br></br><br></br><br></br><br></br><br></br>
      </p>
    </>
  );
}