import { useInView } from 'react-intersection-observer';
import ReactDOM from 'react-dom'

import Head from 'next/head';
import Image from 'next/image';
//import Script from 'next/script';
import styles from '../styles/Home.module.css';
import Card from './card';
import SubcardCard from './subcard';
import { SendFill, EnvelopeFill, Github } from 'react-bootstrap-icons';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Home ({prop}) {
    const num = 100;
    const rate = 1 / (num + 1);
    const [ref, inView, entry] = useInView({
        /* Optional options */
        root: null,
        rootMargin: '0px',
        threshold: new Array(num).fill(0).map( (item, index) => (index + 1) * rate),
    });

    const ratio = entry?.intersectionRatio ?? 1;

    const listCard = [
        {
            id: 1,
            title: 'About me',
            info: [
                {
                    id: 1,
                    title: 'Aleksandr Aparin (mathematician, developer)',
                    child: <><p><a rel="noreferrer" href="https://t.me/alxaparin" taget="_blank">
                                <SendFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
                                @alxaparin
                            </a></p>
                            <p><a rel="noreferrer" href='mailto:alxaparin@mgail.com' target="_blank">
                                <EnvelopeFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
                                alxaparin@gmail.com
                            </a></p></>
                }
            ],
            
        },
        {
            id: 2,
            title: 'Education',
            info: [
                {
                    id: 1,
                    title: 'Lomonosov State University (MSU)',
                    description: 'Faculty of fundamental mechanic and mathematic. Department theory of probabilities',
                    subdescription: '2015-2021 (Master)'
                },
                {
                    id: 2,
                    title: 'Lomonosov State University (MSU)',
                    description: 'Faculty of fundamental mechanic and mathematic. Department theory of probabilities',
                    subdescription: '2021-to present (PhD student'
                },
                
            ]
        },
        {
            id: 3,
            title: 'Science work',
            info: [
                {
                    id: 1,
                    title: <>On the sojourn time distribution of a random walk at a multidimensional lattice point
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
                    </a></>,
                    description: 'Theory of Probability and Its Applications',
                    subdescription: 'Oct. 2021'
                }
            ]
        },
        {
            id: 4,
            title: 'Proficient',
            info: [
                {
                    id: 1,
                    child: <ul className={styles.list}>
                        <li>Python</li>
                        <li>Django</li>
                        <li>JavaScript</li>
                        <li>TypeScript</li>
                        <li>React.js</li>
                        <li>Next.js</li>
                        <li>Git</li>
                        <li>TeX</li>
                    </ul>
                }
            ]
        },
        {
            id: 5,
            title: 'Work experience',
            info: [
                {
                    id: 1,
                    title: 'Main deputy chief',
                    description: 'Lomonosov Moscow State University. Department Admissions Committee and work with matriculant',
                    subdescription: 'Feb. 2016 - Oct. 2019',
                    child: <ul>
                                <li>Personnel management</li>
                                <li>Generation pivot table</li>
                                <li>Analysis of various data</li> 
                            </ul>
                                
                },
                {
                    id: 2,
                    title: 'Data analyst, task management and coordination',
                    description: 'National Research University Higher School of Economics',
                    subdescription: 'Oct. 2019 - Jun. 2022',
                    child:  <ul>
                                <li>Created the website "Я-эксперт" for expert review used <i>Django, React.js</i></li>
                                <li>Participated in the creation of the largest student competition</li>
                                <li>Trained and created the contests in Yandex.Contest's system used <i>Python, C++</i></li>
                                <li>Participated create the pivot tables</li>
                            </ul>
                }
            ]
        },
        {
            id: 6,
            title: 'Projects',
            info: [
                {
                    id: 1,
                    child: <>
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
                            </>
                }
            ]
        },        
        {
            id: 7,
            title: 'Hobbies',
            info: [
                {
                    id: 1,
                    child: <>
                                <p>Finance</p>
                                <p>Crypto</p>
                            </>
                }
            ]
        },        
    ]
    let str = `<p><a rel="noreferrer" href="https://t.me/alxaparin" taget="_blank">
    <SendFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
    @alxaparin
</a></p>
<p><a rel="noreferrer" href='mailto:alxaparin@mgail.com' target="_blank">
    <EnvelopeFill style={{margin: "0 3px 0 0", padding: "5px 0 0 0"}}/>
    alxaparin@gmail.com
</a></p>`
    
    return (
        <div className={styles.container} id="body">
            <Head>
                <title>Visit card</title>
                <meta name="description" content="" />
                <link rel="icon" href={`${prefix}/aa.ico`} />
            </Head>
            
            <div 
                className={styles.title}
                id="title" ref={ref}
                style={{'opacity' : ratio * ratio * ratio * ratio * ratio * ratio, backgroundImage : `url(${prefix}/welcomtextMini.svg)`}}
            />
            
            
            <main className={styles.main} id="main">
                <div className={styles.grid}>
                    <div className={styles.info} id="info" style={{"opacity": 1 - 1.2 * ratio}}>
                        {listCard.map( item => (
                            <Card title={item?.title} key={`card_${item.id}`}>
                                {item.info.map( infItem => {
                                    return <SubcardCard 
                                        key={`subcard_${item.id}_${infItem?.id}`}
                                        title={infItem?.title}
                                        description={infItem?.description}
                                        subdescription={infItem?.subdescription}
                                    > {infItem?.child} </SubcardCard>
                                })}
                                {item?.child}
                            </Card>
                        ))}
                    </div>
                    
                </div>
                <footer className={styles.footer}>
                    Powered by{' '} X6P
                </footer>
            </main>

        </div>
    )
}

export async function getStaticProps() {
    var prop = 1;
    
    return {
        props: {
            prop: prop
        }
    }
}