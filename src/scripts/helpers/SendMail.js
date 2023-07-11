const nodemailer = require('nodemailer');
const ENV = require('../../config')

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'http://localhost',
    port: 465,
    secure: true,
  
    auth: {
        user: 'hudayguliyevm@gmail.com',
        pass: 'lnpzhurkjykswshz'
    }
});

const SendEmail = async (phone,name,feedback) => {
    const mailDetails = {
        from: name,
        to: 'hudayguliyevm@gmail.com',
        subject: "Client reference",
        html: html(phone,name,feedback)
};

    const messageSent = await mailTransporter.sendMail(mailDetails);
    console.log('messageSent',messageSent)
    if(messageSent.accepted.length !== 0){
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
            margin: 5px 0;
            gap: 10px;
            font-size: 16px;
            font-weight: 100;
            color: #303030;
        }
        .label {
            color: #4a4a4a;
        }
        .content {
            width: 33rem;
            line-height: 25px;
        }
        .content p {
            border: 1px solid #1B1C1E;
            border-radius: 2px;
            font-size: 16px;
            padding: 10px;
        }
    </style>

    </head>

    <body>
        <div class="email__container">
            <span class="span__container">
                <h3>Müşderiniň ady: </h3>
                <h4 class="label">${name}</h4>
            </span>
            <span class="span__container">
                <h3>Müşderiniň tel nomeri:  </h3>
                <h4 class="label">${phone}</h4>
            </span>
            <span class="span__container">
                <div class="content">
                    <h3 >Feedback:  </h3>
                    <p>${feedback && feedback.length ? feedback : 'No feedback provided.'}</p>
                </div>
            </span>
        </div>
    </body>

</html>`

module.exports = {SendEmail}