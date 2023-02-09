const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '739454889198-607r68m9q1epb42giuf54lj8f3561aa3.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04rRuB6C7U_KtCgYIARAAGAQSNwF-L9Ir9DIwm6y7InhEXh9QX0ZwMrXlWc1HahU0tLiDCZOiKAUdUX0gleppgPL5g9WzZj1MNFY'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN })

export async function sendmail(Email,token){
try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'raccess97@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            //accessToken:accessToken
        }
    })

    const mailoption = {
        from: 'Rahul  <raccess97@gmail.com>',
        to: Email,
        subject: 'Forgot Password',
        text: 'You can Reset the Password',
       html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${4000}/${token}">click here</a></h1>`
    };

    const Result = await transport.sendMail(mailoption)
    return Result
}catch (error){
 return error;
}
}

//sendmail().then(Result => console.log("Email Sent.....", Result))
//.catch((error) => console.log(error.message));