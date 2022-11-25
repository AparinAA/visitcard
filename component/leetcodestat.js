import { PieChart, Pie, Cell } from 'recharts';
import styles from '../styles/Home.module.css';
import { useEffect, useReducer } from 'react';
import { renderCustomizedLabel } from '../lib/helpFunction';

const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

let initState = {
    "loading": true,
    "name": "",
    "data": [],
    "error": ''
}

function reducer (state, action) {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {loading: false, name: action.data.name, data: action.data.data, error: ''};
        case FETCH_ERROR:
            return {...state, loading: false, error: 'Smt went nothing'};
        default:
            return state;
    }
}

export default function LeetCodeStat (props) {
    
    let [dataAddition, setAddition] = useReducer(reducer, initState);

    useEffect( () => {
        fetch('api/leetcodequery', { method: "GET" })
        .then(res => res.json())
        .then(data => {
            setAddition({
                "type": "FETCH_SUCCESS",
                "data": { 
                    "name": "leetcodestat",
                    "data": data.data
                } 
            });
        })
        .catch( error => {
            setAddition({"type": "FETCH_ERROR"})
        });
    }, []);


    const data = dataAddition?.data?.filter( item => item.name !== "All");
    const COLORS = ['#00C49F', 'rgb(255,184,0)', 'rgb(255,45,85)'];

    const listNameLevel = COLORS.map( (color, i) =>
        <li key={color} style={{'listStyle': 'none', "width": "max-content"}}>
            <div style={{backgroundColor: color, width: 10, height: 10, display: 'inline-block'}} /> {data[i]?.name}
        </li>
    );

    const Cells = data.map((entry, index) =>
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    );

    const element = !dataAddition.loading ? 
                    (
                        dataAddition.error ? dataAddition.error :
                        <div className={styles.withAdditionPie}>
                            <ul style={{'alignSelf': 'center'}}>
                                {listNameLevel}
                            </ul>
                            <div >
                                <PieChart width={140} height={140}>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        isAnimationActive={false}
                                        outerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {Cells}
                                    </Pie>
                                </PieChart>
                            </div>
                        </div>
                    ) :
                    "...Loading";

    return ( 
        <>
            {element}
        </>
        
    );
}