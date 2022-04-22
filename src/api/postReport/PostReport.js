import { Utils } from '../../helpers'

async function postReport(transactions) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/transaction/report';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post TRANSACTIONS to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(transactions);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactions: transactions
            })
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post transactions.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully posted.");
    }
    catch {
        Utils.devlog("Failed to post transactions.");
        throw "Could not connect to server."
    }
    
}

const getTestTransactions = function() {
    return [
        {
            date: new Date(),
            type: 'cash',
            amount: '100',
            note: 'cashhhhhh',
        },
        {
            date: new Date(),
            type: 'delivery',
            amount: '-10',
            note: 'not djorno',
        }
    ];
}

export default postReport;