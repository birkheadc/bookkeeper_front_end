async function postReport(transactions) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/transaction/report';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to post TRANSACTIONS to: " + apiUrl);
        console.log("Object to post: ");
        console.log(transactions);
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
            console.log("Failed to post transactions.");
            throw "Could not connect to server."
        }
        console.log("Successfully posted.");
    }
    catch {
        console.log("Failed to post transactions.");
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