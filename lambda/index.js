const {
  getRequestType,
  getIntentName,
  getSlotValue,
  getDialogState,
} = require('ask-sdk-core');
const Alexa = require('ask-sdk-core');
var index;
var score;
var count;
const ques = [
    'What is the name of the funniest character in the team? A.Derrek. B.Gurmeet Singh. C.Himanshu Deshmukh. D.Sahil Awasthi.',
    'What is the name of the "Mummy"? A.Himanshu Deshmukh. B.Sundar Shrivastav. C.Gurmeet Singh.  D.Sahil Awasthi.',
    'What is the name of the "Bevda"? A.Himanshu Deshmukh. B.Sundar Shrivastav. C.Gurmeet Singh.  D.Sahil Awasthi.',
    'What is the colour code for H4 team? A.Green. B.Red. C.Maroon. D.Cyan.', 
    'By how much score did the H4 team lose the basketball game? A.One. B.Two. C.Three. D.Four.', 
    'Who was the goalkeeper for the field hockey? A.Derek. B.Mummy. C.Anni. D.Acid',
    'One day before the final match, how many gold medals were required by H4 to win the GC? A.One. B.Two. C.Three. D.Four.',
    'What is the hostel number of the girls hostel? A.Seven. B.Ten. C.Eleven. D.Twelve',
    'What is the name of the weight lifting champion? A.Lakdi. B.Pasli. C.Dandaa. D.Meena.',
    'What is the name of the Table Tennis player of H3? A.Raggie. B.Venky. C.Bevda D.Dandaa',
    'What is the full form of GC?A.Global Champions. B.Global Chambionships. C.General Champions. D.General Championships.',
    'Who launched the trailer? A.Aamir Khan. B.Shahrukh Khan. C.Shraddha Kapoor. D.Amitabh Bachchan.'
     ];
var flag = [0,0,0,0,0,0,0,0,0,0,0,0];
const ans_key = [
    "b",
    "b",
    "d",
    "c",
    "b",
    "d",
    "c",
    "b",
    "c",
    "b",
    "d",
    "a"
    ]    
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        score = 0;
        count = 0;
        const speechText ="Welcome to 'Chhichhore' movie quiz, you will be asked few questions. Answer the option you think is correct, like a , or a is the correct answer .At the end, your score will be declared. Would you like to play?.";
        
    
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        
            while(true)
            {
                index=Math.floor((Math.random()*ques.length)+1);
                if(flag[index]>-1)
                {
                    break;
                }
            }
                const speechText = ques[index];
                return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
            
    
        
    }
};


const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
    const speechText = 'Thank you for participating. Your score is : '+score;
        return handlerInput.responseBuilder
            .speak(speechText)
            
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = "You will be asked few questions. Answer the option you think is correct, like a , or a is the correct answer .At the end, your score will be declared. Would you like to play?.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const GetAnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAnswerIntent';
    },
    handle(handlerInput) {
        var ans = getSlotValue(handlerInput.requestEnvelope, 'Answer')
        count++;
        var speakOutput='';
        ans = ans.toLowerCase();
        if(ans === ans_key[index])
        {
            speakOutput = 'Correct. ';
            score++;
            
        }
        else
        {
            speakOutput = 'InCorrect!! correct answer is '+ ans_key[index];
        }
        if(count<=5)
        {
            speakOutput = speakOutput + 'Would you like to continue?';
        
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }
        else
        {
            speakOutput = 'Thank you for participating! Your score is : '+score;
            return handlerInput.responseBuilder
            .speak(speakOutput)
            
            .getResponse();
            
        }
        
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for participating! Your score is : '+score + 'Goodbye! Have a nice day.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        YesIntentHandler,
        GetAnswerIntentHandler,
        NoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

