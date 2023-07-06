const nodemailer = require('nodemailer');
const ENV = require('../../config')

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENV.EMAIL_ADDRESS,
        pass: ENV.EMAIL_PASSWORD
    }
});

const SendEmail = async (phone,name,feedback) => {
    const mailDetails = {
        from: name,
        to: ENV.EMAIL_ADDRESS,
        subject: "Client reference",
        html: html(phone,name,feedback)
};

    const messageSent = await mailTransporter.sendMail(mailDetails);
    console.log('messageSent',messageSent)
    if(messageSent?.accepted?.length && messageSent?.accepted?.[0].startsWith('hilligaplama')){
        return {status: 'Sent'}
    }
    return {status: 'Bad'}
}

const html = (phone,name,feedback) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Node js Email</title>
    <link rel="icon" href="./favicon.ico" type="image/x-icon">


    <style>
        body {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: sans-serif;
        }
        .email__container {
            height: 99.5vh;
            margin-left: 10px;
        }
        .span__container {
            display: flex;
            gap: 10px;
            font-size: 16px;
            font-weight: 100;
            color: #303030
        }
        .label {
            color: #1B1C1E
        }
        .content {
            width: 33rem;
            line-height: 25px;
        }
        .content p {
            border: 1px solid #1B1C1E;
            border-radius: 2px;
            font-size: 22px;
            padding: 10px;
        }
    </style>

    </head>

    <body>
        <div class="email__container">
            <span class="span__container">
                <h2>Kliendin ady: </h2>
                <h2 class="label">${name}</h2>
            </span>
            <span class="span__container">
                <h2>Kliendin tel nomeri:  </h2>
                <h2 class="label">${phone}</h2>
            </span>
            <span class="span__container">
                <div class="content">
                    <h2 >Feedback:  </h2>
                    <p>${feedback && feedback.length ? feedback : 'No feedback provided.'}</p>
                </div>
            </span>
        </div>
    </body>

</html>`

module.exports = {SendEmail}