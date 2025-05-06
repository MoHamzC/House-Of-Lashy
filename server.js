const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/book-appointment', (req, res) => {
    const { name, email, date, time } = req.body;

    // Ici, vous ajouteriez du code pour enregistrer le rendez-vous dans une base de données

    // Envoyer un email de confirmation
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'votre-email@gmail.com',
            pass: 'votre-mot-de-passe-email'
        }
    });

    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: email,
        subject: 'Confirmation de rendez-vous',
        text: `Cher ${name},\n\nVotre rendez-vous est confirmé pour le ${date} à ${time}.\n\nMerci!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erreur lors de l\'envoi de l\'email');
        }
        res.status(200).send('Rendez-vous réservé et email de confirmation envoyé');
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
