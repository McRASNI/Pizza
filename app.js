/*
var restify = require('restify');
    var builder = require('botbuilder');

    // Create bot and add dialogs
    var bot = new builder.BotConnectorBot({ appId: 'appID', appSecret: 'appSecret' });
    bot.add('/', function (session) {
        session.send('Hello World');
    });

    // Setup Restify Server
    var server = restify.createServer();
    server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url); 
    });
	
	*/
	/*

	var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.matches(/^change age/i, [
    function (session) {
        session.beginDialog('/age');
    },
    function (session, results) {
        session.send('Ok... Changed your age to %s', session.userData.age);
    }
]);

intents.matches(/^change city/i, [
    function (session) {
        session.beginDialog('/city');
    },
    function (session, results) {
        session.send('Ok... Changed your city to %s', session.userData.city);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello '+session.userData.name+'! you are ' + session.userData.age + ' years old and you live in '+ session.userData.city +'!');
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
		if (!session.userData.age){
			session.beginDialog('/age');
		}
		else{
			session.endDialog();
		}
        
    }
]);


bot.dialog('/age', [
    function (session) {
        builder.Prompts.number(session, 'Hi! What is your age?');
    },
    function (session, results) {
        session.userData.age = results.response;
		
		if (!session.userData.city){
			session.beginDialog('/city');
		}
		else{
			session.endDialog();
		}
		
    }
]);

bot.dialog('/city', [
    function (session) {
        builder.Prompts.text(session, 'Hi! Where do you live?');
    },
    function (session, results) {
        session.userData.city = results.response;
        session.endDialog();
    }
]);

*/

var builder = require('botbuilder');
var restify = require('restify');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "",
    appPassword: ""
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================


//var connector = new builder.ConsoleConnector().listen();
//var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

var order = 0;

	
intents.matches(/^change size/i, [
    function (session) {
        session.beginDialog('/size');
    },
    function (session, results) {
        session.send('Ok... Changed The Pizza size to %s', session.userData.size);
    }
]);

intents.matches(/^change crust/i, [
    function (session) {
        session.beginDialog('/crust');
    },
    function (session, results) {
        session.send('Ok... Changed the crust to %s', session.userData.crust);
    }
]);

intents.matches(/^change sauce/i, [
    function (session) {
        session.beginDialog('/sauce');
    },
    function (session, results) {
        session.send('Ok... Changed sauce to %s', session.userData.sauce);
    }
]);

intents.matches(/^change cheese/i, [
    function (session) {
        session.beginDialog('/cheese');
    },
    function (session, results) {
        session.send('Ok... Changed cheeze to %s', session.userData.cheese);
    }
]);

intents.matches(/^change ingredients/i, [
    function (session) {
        session.beginDialog('/ingredients');
    },
    function (session, results) {
        session.send('Ok... Changed ingredients to %s', session.userData.ingredients);
    }
]);



intents.matches(/^show order/i, function (session) {
	if (order){
		session.send('You ordered a '+session.userData.size+' Pizza! with ' + session.userData.crust + ' Level of crust, '+ session.userData.sauce +' sauce, '+session.userData.cheese+' cheese and '+session.userData.ingredients+'!');
	}
	else{
		session.send('Please fill all Order Fields.');
	}
    
});


intents.onDefault([
    function (session, args, next) {
        if (!session.userData.size) {
            session.beginDialog('/size');
        } else {
            next();
        }
    },
    function (session, results) {
		session.send("Your Order was Register. Thank you!");
		order =1;
        }
]);

bot.dialog('/size', [
    function (session) {
        builder.Prompts.text(session, 'What Pizza size would you like?');
    },
    function (session, results) {
        session.userData.size = results.response;
		if (!session.userData.crust){
			session.beginDialog('/crust');
		}
		else{
			session.endDialog();
		}
        
    }
]);


bot.dialog('/crust', [
    function (session) {
        builder.Prompts.number(session, 'from 1-5 What crust level would you like?');
    },
    function (session, results) {
        session.userData.crust = results.response;
		
		if (!session.userData.sauce){
			session.beginDialog('/sauce');
		}
		else{
			session.endDialog();
		}
		
    }
]);

bot.dialog('/sauce', [
    function (session) {
        builder.Prompts.choice(session, 'What sauce would you like?', ["Tomato", "fonji", "Ayoli"]);
    },
    function (session, results) {
		session.userData.sauce = results.response.entity;
		
		if(!session.userData.cheese){
			session.beginDialog('/cheese');
		}
        
		else{
			session.endDialog();	
		}
		
        
    }
]);

bot.dialog('/cheese', [
    function (session) {
        builder.Prompts.choice(session, 'What cheese would you like?', ["Mozzarela", "RocFort", "Cotage"]);
    },
    function (session, results) {
		
		session.userData.cheese = results.response.entity;
		
        if(!session.userData.ingredients){
			session.beginDialog('/ingredients');
		}
        
		else{
			session.endDialog();	
		}
    }
]);

bot.dialog('/ingredients', [
    function (session) {
        builder.Prompts.choice(session, 'What ingredients would you like?', ["Olives", "Mushrooms", "Corn"]);
    },
    function (session, results) {
        session.userData.ingredients = results.response.entity;
        session.endDialog();
    }
]);

