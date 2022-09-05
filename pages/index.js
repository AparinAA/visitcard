import { useInView } from 'react-intersection-observer';

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Card from './card';
import SubcardCard from './subcard';
import { SendFill, EnvelopeFill, Github, CaretDownFill } from 'react-bootstrap-icons';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Home () {
    const num = 100;
    const rate = 1 / num;
    const [ref, inView, entry] = useInView({
        /* Optional options */
        root: null,
        rootMargin: 0,
        threshold: new Array(num).fill(0).map( (item, index) => (index + 1) * rate),
    });

    const ratio = entry?.intersectionRatio ?? 1;

    return (
        <div className={styles.container} id="body">
            <Head>
                <title>Person Info</title>
                <meta name="description" content="" />
                <link rel="icon" href={`${prefix}/aa.ico`} />
            </Head>
            
            <div className={styles.title} id="title" ref={ref} style={{'opacity' : ratio * ratio * ratio * ratio}}>
                <p id="welcome-text">
                    Welcome to my visit card
                    <br />
                    <small style={{"opacity": "0.7"}}>Aleksandr Aparin</small>
                </p>
            </div>
            <main className={styles.main} id="main">
                <div className={styles.grid}>
                    <div className={styles.info} id="info" style={{"opacity": 1 - ratio}}>
                        <Card title="About me">
                            <SubcardCard>
                                <p>Aleksandr Aparin (mathematician, developer)</p>
                                <p>21.12.1995</p>
                                <p><a rel="noreferrer" href="https://t.me/alxaparin" taget="_blank">
                                    <SendFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
                                    @alxaparin
                                </a></p>
                                <p><a rel="noreferrer" href='mailto:alxaparin@mgail.com' target="_blank">
                                    <EnvelopeFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
                                    alxaparin@gmail.com
                                </a></p>
                            </SubcardCard>
                            
                        </Card>
                        <Card title="Education">
                            <SubcardCard>
                                <p>Lomonosov State University (MSU)</p>
                                <span>Faculty of fundamental mechanic and mathematic. Department theory of probabilities</span>
                                <small><span>2015-2021 (Master)</span></small>
                            </SubcardCard>
                            <SubcardCard>
                                <p>Lomonosov State University (MSU)</p>
                                <span>Faculty of fundamental mechanic and mathematic. Department theory of probabilities</span>
                                <small><span>2021-to present (PhD student)</span></small>
                            </SubcardCard>
                        </Card>
                        <Card title="Science work">
                            <SubcardCard>
                                <p>
                                    On the sojourn time distribution of a random walk at a multidimensional lattice point
                                    <a
                                        rel="noreferrer"
                                        href='http://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=tvp&paperid=5517&option_lang=rus'
                                        target="_blank"
                                        className={styles.lang}>
                                        RU
                                    </a>
                                    <a
                                        rel="noreferrer"
                                        href='https://epubs.siam.org/doi/pdf/10.1137/S0040585X97T990599'
                                        target="_blank"
                                        className={styles.lang}>
                                        EN
                                    </a>
                                </p>
                                <span>Theory of Probability and Its Applications</span>
                                <small><span>Oct. 2021</span></small>
                            </SubcardCard>
                        </Card>

                        <Card title="Proficient">
                            <SubcardCard>
                                <ul className={styles.list}>
                                    <li>Python</li>
                                    <li>JavaScript</li>
                                    <li>Django</li>
                                    <li>React.js</li>
                                    <li>Next.js</li>
                                    <li>TeX</li>
                                </ul>
                            </SubcardCard>
                        </Card>
                        
                        <Card title="Work experience">
                            <SubcardCard>
                                <p>Main deputy chief</p>
                                <span>
                                    Lomonosov Moscow State University. Department Admissions Committee and work with matriculant
                                </span>
                                <small><span>Feb. 2016 - Oct. 2019</span></small>
                                <ul>
                                    <li>Personnel management</li>
                                    <li>Generation pivot table</li>
                                    <li>Analysis of various data</li> 
                                </ul>
                            </SubcardCard>
                            <SubcardCard>
                                <p>Data analyst, task management and coordination</p>
                                <span>National Research University Higher School of Economics</span>
                                <small><span>Oct. 2019 - Jun. 2022</span></small>
                                <ul>
                                    <li>Created the website "Я-эксперт" for expert review used Django, React.js</li>
                                    <li>Participated in the creation of the largest student competition</li>
                                    <li>Trained and created the contests in Yandex.Contest's system used <i>Python, C++</i></li>
                                    <li>Participated create the pivot tables</li>
                                </ul>
                            </SubcardCard>
                        </Card>
                        <Card title="Projects">
                            <SubcardCard>
                                <p><a rel="noreferrer" href='https://github.com/AparinAA' target="_blank"><Github /> GitHub</a></p>
                                <p><a rel="noreferrer" href="http://195.133.1.56:8091" target="_blank">
                                    <Image 
                                        src={`${prefix}/favicon.png`}
                                        width={20}
                                        height={20}
                                        alt="Spread ico"
                                    /> SpreadMeta
                                </a></p>
                                <p><a rel="noreferrer" href="https://iprofi-expert.ru" target="_blank">
                                    <Image 
                                        src={`${prefix}/iexpert.png`}
                                        width={16}
                                        height={16}
                                        alt="iexpert"
                                    /> Я-эксперт
                                </a></p>
                                <p><a rel="noreferrer" href="https://www.npmjs.com/~x6p" target="_blank">
                                    <svg style={{"position": "relative", "top": "-2px", "width": "20px"}} viewBox="0 0 780 250">
                                        <path fill="#231F20" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"></path>
                                    </svg>
                                npm packages
                                </a></p>
                            </SubcardCard>
                        </Card>
                        <Card title="Hobbies">
                            <SubcardCard>
                                <p>Finance</p>
                                <p>Crypto</p>
                            </SubcardCard>
                        </Card>
                    </div>
                    
                </div>
                <footer className={styles.footer}>
                    Powered by{' '} X6P
                </footer>
            </main>

        </div>
    )
}
