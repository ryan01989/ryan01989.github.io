import React, { useEffect, useState } from 'react';

const FadingParagraph = () => {
    const texts = [
        <>
            <h2>AIDRIN</h2>
            <p>
                An AI data readiness assessment tool to evaluate the relative strength of your data for training.
                A product of the IDT lab at OSU, currently being developed with expected public release August 15th, 2024.
                To learn more, please read <a href="./assets/2505.18213v2.pdf" target="_blank">our recent poster proposal</a>
                &nbsp;accepted at SSDBM 2025.
            </p>
            <p> I have been on the project since 11/2024. My work has included revamping the frontend UI to provide more repsonsive and refined use, integrating asynchronous task processing with Celery to support parralel processing and task progress information, and most recently a file processing API using pandas to support more file types.  </p>
            <p> Language(s): Python, web frontend stack</p>
            <p> Primary Tools: Flask, Redis, Celery, Pandas, Jinja, MatplotLib </p>
        </>,
        <>
            <h2>Task Manager Desk Lamp</h2>
            <p>
                A personal development project to learn more about microcontrollers and 3D print software. This smart desk lamp connects to my OSU calendar to track how many tasks I have accomplished. The lamp features three columns, each tracking a different time period: today, this week, and this month--each lighting up more according the percentage of tasks I have completed for that time period.
            </p>
            <p>
                Language(s): C++
            </p>
            <p> Primary Tools: Arduino, Solidworks, CURL</p>
        </>,
        <>
            <h2>ResearchSpherereU.com</h2>
            <p>
                Currently in develoopment, this website will be a hub for research groups seeking funding and students seeking research opportunities. This site will present ongoing research and allow private inverstors to fund and contact research groups. This project is headed by UVA students Nicolas Ecklov and Parker Glass, with me as a developer.
            </p>
            <p>
                Language(s): React, Node.js, Express, Python
            </p>
            <p>
                Primary Tools: Flask, Jinja
            </p>
            <p>
                3rd Party APIs: OpenAI, OAuth, Stripe
            </p>

        </>
    ];

    const headers = [
        "AIDRIN",
        "Task Manager Desk Lamp",
        "ResearchSphrereU.com"
    ];

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                setIndex(prev => (prev + 1) % texts.length);
                setFade(true);
            }, 1000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            transition: 'opacity 1s ease', fontSize: '1.2em', textAlign: "left", opacity: fade ? 1 : 0
        }}>
            {texts[index]}
        </div >
    );
};

export default FadingParagraph;
