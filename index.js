const https = require('https');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 


app.get('/get-id', (req, res) => {
    https.get('https://api.quicksell.co/v1/internal/frontend-assignment', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);

                if (jsonData && Array.isArray(jsonData.tickets) && Array.isArray(jsonData.users)) {
                    const userMap = jsonData.users.reduce((map, user) => {
                        map[user.id] = user.name;
                        return map;
                    }, {});

                    const groupedData = jsonData.tickets.reduce((acc, ticket) => {
                        const userId = ticket.userId;
                        if (!acc[userId]) {
                            acc[userId] = {
                                userName: userMap[userId] || 'Unknown User',
                                tickets: []
                            };
                        }
                        acc[userId].tickets.push(ticket);
                        return acc;
                    }, {});

                    res.json(groupedData);
                } else {
                    res.status(500).send('Unexpected data format received from the API');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                res.status(500).send('Error processing data');
            }
        });

    }).on('error', (error) => {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).send('Error fetching data');
    });
});

app.get('/get-status', (req, res) => {
    https.get('https://api.quicksell.co/v1/internal/frontend-assignment', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);

                if (jsonData && Array.isArray(jsonData.tickets) && Array.isArray(jsonData.users)) {
                    const userMap = jsonData.users.reduce((map, user) => {
                        map[user.id] = user.name;
                        return map;
                    }, {});

                    const groupedData = jsonData.tickets.reduce((acc, ticket) => {
                        const status = ticket.status;
                        const userId = ticket.userId;
                        const userName = userMap[userId] || 'Unknown User';

                        const ticketWithUserName = {
                            ...ticket,
                            userName
                        };

                        if (!acc[status]) {
                            acc[status] = [];
                        }
                        acc[status].push(ticketWithUserName);
                        return acc;
                    }, {});

                    res.json(groupedData);
                } else {
                    res.status(500).send('Unexpected data format received from the API');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                res.status(500).send('Error processing data');
            }
        });

    }).on('error', (error) => {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).send('Error fetching data');
    });
});


app.get('/get-priority', (req, res) => {
    https.get('https://api.quicksell.co/v1/internal/frontend-assignment', (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const jsonData = JSON.parse(data);

                if (jsonData && Array.isArray(jsonData.tickets) && Array.isArray(jsonData.users)) {
                    const userMap = jsonData.users.reduce((map, user) => {
                        map[user.id] = user.name;
                        return map;
                    }, {});

                    const groupedData = jsonData.tickets.reduce((acc, ticket) => {
                        const priority = ticket.priority;
                        const userId = ticket.userId;
                        const userName = userMap[userId] || 'Unknown User';

                        const ticketWithUserName = {
                            ...ticket,
                            userName
                        };

                        if (!acc[priority]) {
                            acc[priority] = [];
                        }
                        acc[priority].push(ticketWithUserName);
                        return acc;
                    }, {});

                    res.json(groupedData);
                } else {
                    res.status(500).send('Unexpected data format received from the API');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
                res.status(500).send('Error processing data');
            }
        });

    }).on('error', (error) => {
        console.error(`Error fetching data: ${error.message}`);
        res.status(500).send('Error fetching data');
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

