const urlencode = require('urlencode');
var exports=module.exports={};
const http = require('https');
const querystring = require('querystring');
const fs = require('fs');
const pathname = require("path");
const ERROR_API = "Error during API call";
const HOSTNAME = 'api.smsmode.com'
const PATH_SEND_SMS = "/http/1.6/sendSMS.do";
 
/**
*    Function parameters:
*
*    - accessToken (required)
*    - message (required)
*    - destinataires (required): Receivers separated by a comma
*    - emetteur (optional): Allows to deal with the sms sender
*    - optionStop (optional): Deal with the STOP sms when marketing send (cf. API HTTP documentation)
*    - batchFilePath (required for batch mode): The path of CSV file for sms in Batch Mode
*/
 
// exports.ExempleClientHttpAPI = class {
 
//  // send SMS with GET method
//  async sendSmsGet(accessToken, message, destinataires, emetteur, optionStop) {
 
//      var finalPath = PATH_SEND_SMS + '?accessToken=' + accessToken + '&numero=' + destinataires + 
//          "&message=" + urlencode(message,'ISO-8859-15') + '&emetteur=' + emetteur + '&stop=' + optionStop;
//      const options = {
//          hostname: HOSTNAME,
//          port: 443,
//          path: finalPath,
//          method: 'GET'
//      };
//      try {
//          let http_promise = this.getHttpResponse(options, "");
//          let response_body = await http_promise;
//          return response_body;
//      }
//      catch(error) {
//          return ERROR_API;
//      }
//  }
 
//  // send SMS with POST method
 
 
// //  // send SMS with POST method (Batch)
// //  async sendSmsBatch(accessToken, batchFilePath, optionStop) {
 
// //      var finalPath = PATH_SEND_SMS_Batch + "?accessToken=" + accessToken + "&stop=" + optionStop;
// //      try {
// //          let content_file_promise = this.getContentFile(batchFilePath);
// //          let content = await content_file_promise;
// //          var boundary = "AaB03x";
// //          var postData = Buffer.concat([
// //              Buffer.from("--" + boundary + "\r\n"),
// //              Buffer.from("Content-Disposition: form-data; name=\"file\"; filename=\""),
// //              Buffer.from(pathname.basename(batchFilePath) + "\"\r\n"),
// //              Buffer.from("Content-Type:text/csv\r\n\r\n"),
// //              Buffer.from(content),
// //              Buffer.from("\r\n--" + boundary + "--\r\n"),
// //          ]);
// //          var options = {
// //              method: 'POST',
// //              hostname: HOSTNAME,
// //              port: 443,
// //              path: finalPath,
// //              headers: {
// //                  "Content-Type": "multipart/form-data; boundary=" + boundary,
// //                  'Content-Length': Buffer.byteLength(postData)
// //              }
// //          };
// //          try {
// //          let http_promise = this.getHttpResponse(options, postData);
// //          let response_body = await http_promise;
// //          return response_body;
// //          }
// //          catch(error) {
// //              return ERROR_API;
// //          }
// //      }
// //      catch(error) {
// //          return ERROR_FILE;
// //      }
// //  }
 
//  getHttpResponse(options, postData) {
//      return new Promise((resolve, reject) => {
//          const req = http.request(options, (res) => {
//              let chunks_of_data = [];
//              res.on('data', (fragments) => {
//                  chunks_of_data.push(fragments);
//              });
//              res.on('end', () => {
//                  let response_body = Buffer.concat(chunks_of_data);
//                  resolve(response_body.toString());
//              });
//          });
//          req.on('error', (error) => {
//              reject(error);
//          });
//          req.write(postData);
//          req.end();
//      });
//  }
 
//  getContentFile(batchFilePath) {
//      return new Promise((resolve, reject) => {
//          fs.readFile(batchFilePath, async function(err, content) {
//              if (err) {
//                  reject(err);
//              } else {
//                  resolve(content);
//              }
//          });
//      });
//  }
// }

async function sendSmsPost(message, destinataires) {
 
    var postData = querystring.stringify({
        'numero': destinataires, 
    });
    postData = postData + "?message=" + urlencode(message,'ISO-8859-15');
    console.log(postData)
    const options = {
        hostname: HOSTNAME,
        port: 443,
        path: PATH_SEND_SMS,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-15',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    try {
        let http_promise = await getHttpResponse(options, postData);
        return http_promise;
    }
    catch(error) {
        console.log(error)
        return ERROR_API;
    }
}

async function sendSmsGet(accessToken, message, destinataires) {
         var finalPath = PATH_SEND_SMS + '?accessToken=' + accessToken + '?numero=' + destinataires + 
             "&message=" + urlencode(message,'ISO-8859-15');
         const options = {
             hostname: HOSTNAME,
             port: 443,
             path: finalPath,
             method: 'GET'
         };
         try {
             let http_promise = await getHttpResponse(options, "");
             return http_promise;
         }
         catch(error) {
            console.log(error)
             return ERROR_API;
         }
     }

const getHttpResponse = (options, postData) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let chunks_of_data = [];
            res.on('data', (fragments) => {
                console.log('fragments', fragments)
                chunks_of_data.push(fragments);
            });
            res.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                console.log("response_body", response_body.toString())
                resolve(response_body.toString());
            });
        });

        req.on('error', (error) => {
            reject(error);
        });
        req.write(postData);
        req.end();
    });
}

module.exports = {sendSmsPost, sendSmsGet}