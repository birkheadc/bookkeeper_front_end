async function postReport(API_URL, transactions) {

    const testTransactions = getTestTransactions();

    const subdir = '/transaction/report';
    const apiUrl = API_URL + subdir;

    console.log("Attempting to post to: " + apiUrl);
    console.log("Object to post: ");
    console.log(testTransactions);

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactions: testTransactions
            })
        });
        if (response.status !== 200) {
            console.log("Failed to post transactions.");
            return;
        }
        console.log("Successfully posted.");
    }
    catch {
        console.log("Failed to post transactions.");
        return;
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