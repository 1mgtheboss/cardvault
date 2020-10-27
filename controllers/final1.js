'use strict';

var typingDnaClient = global.typingDnaClient;

var final1 = {
    /** GET final page. */
    get: function(req, res) {
        /** Check session variables for the last authentication result and display them. */
        if (!req.session ||
            !req.session.data ||
            !req.session.data.internalUserId) {
            return res.redirect('index')
        }

        try {

            const {
                Client
            } = require('pg')
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }

            });
            (async () => {
                await client.connect()
                const res1 = await client.query('CREATE TABLE IF NOT EXISTS cards (     userid        text PRIMARY KEY,     cards1 text );')
                const res2 = await client.query('select * from cards')

                res.send(res2)
                await client.end()
            })()


        } catch (e) {
            console.log(e);

        }

    },

    /** POST final page. */
    post: function(req, res) {
        if (!req.session ||
            !req.session.data ||
            !req.session.data.internalUserId) {
            return res.redirect('index')
        }

        try {



            const {
                Client
            } = require('pg')
            const client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }

            });
            (async () => {
                await client.connect()


                const res3 = await client.query('INSERT INTO cards (userid, cards1) VALUES(\'' + req.body.userid + '\', \'' + req.body.cards + '\') ON CONFLICT (userid) DO UPDATE SET cards1 = EXCLUDED.cards1;')


                res.send(res3)
                await client.end()
            })()



        } catch (e) {

            console.log(e);
        }

    }
};

module.exports = final1;