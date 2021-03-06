import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home(props) {

    const nav = useNavigate();

    useEffect(() => {
        nav('../browse', { replace: true });
    }, [nav]);
}

//     const NUM_DAYS = 7;

//     const statuses = {
//         "loading" : "Loading...",
//         "error" : "Error connecting to server",
//         "ready" : ""
//     }

//     const [status, setStatus] = useState(statuses.loading);
//     const [summaries, setSummaries] = useState();

//     useEffect(() => {
//         const getSummaries = async () => {
//             setStatus(statuses.loading);
//             try {
//                 const summaries = await Api.fetchLastNDaysSummary(NUM_DAYS);
//                 if (summaries === null) {
//                     setStatus(statuses.error);
//                     return;
//                 }
//                 setSummaries(summaries);
//                 setStatus(statuses.ready);
//             }
//             catch(e) {
//                 setStatus(e);
//             }
//         }

//         getSummaries();
//     }, [])

//     const displaySummaries = function() {
//         if (status === '')
//         {
//             return (
//                 <HomeSummary numDays={NUM_DAYS} summaries={summaries} width={props.width}/>
//             );
//         }
//         return null;
//     }

//     return(
//         <div className=''>
//             {displaySummaries()}
//         </div>
//     );
// }

export default Home;