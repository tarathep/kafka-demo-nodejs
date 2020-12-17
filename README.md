# kafka-demo-nodejs
kafka message queue demo using node js

## STEP
1. npm install 
```npm i kafka-node``` see more this : https://www.npmjs.com/package/kafka-node
2. RUN producer with command ```node producer.js``` before to init auto crete topic and publish message to 10.138.38.65:9092 (endpoint kafka dev internal AIS)

<img src="https://raw.githubusercontent.com/tarathep/kafka-demo-nodejs/main/example_producer.JPG">

3. RUN consumer with command ```node consumer.js```

<img src="https://raw.githubusercontent.com/tarathep/kafka-demo-nodejs/main/example_comsumer.JPG">

## EXAMPLE CODE
### PRODUCER.JS
```
const kafka = require("kafka-node")


const client = new kafka.KafkaClient({ kafkaHost: '10.138.38.65:9092' });

const Producer = kafka.Producer
const producer = new Producer(client);



//PRODUCER SERDER VALUES
// uuid is REFID for 
publish("941a3018-d599-4f9a-9365-17e2c397aa00", "topicA", '{"key","val"}');
publish("941a3018-d599-4f9a-9365-17e2c397aa00", "topicB", '{"key","val"}');


function publish(uuid, topic, payload) {
    message = {
        "uuid": uuid,
        "timestamp": new Date(),
        "topic": topic,
        "payload": payload
    }

    payloads = [
        {
            topic: message['topic'],
            messages: JSON.stringify(message),
            partition: 0
        }
    ];

    //SENDER MESSAGE
    producer.send(payloads, function (err, data) {
        if (err){
            //ON ERROR
            console.log("send data error", err);
        }else{
            //ON SUCCESS
            console.log("send data sucess", data, message);
        }
    });
}
```
### CONSUMER.JS
```
const kafka = require("kafka-node")


//INIT CONF SETIP CLIENT
const broker = '10.138.38.65:9092';


const client = new kafka.KafkaClient({ kafkaHost: broker });

var options = {
    groupId: 'kafka-node-group',//consumer group id, default `kafka-node-group`
    // Auto commit config
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
    fetchMaxWaitMs: 100,
    // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
    fetchMinBytes: 1,
    // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
    fetchMaxBytes: 1024 * 1024,
    // If set true, consumer will fetch message from the given offset in the payloads
    fromOffset: false,
    // If set to 'buffer', values will be returned as raw buffer objects.
    encoding: 'utf8',
    keyEncoding: 'utf8'
};

//SUBSCRIBE TOPIC : topicA and topicB
new kafka.Consumer(client,[{topic:"topicA"},{topic:"topicB"}],options).on("message", function(message) { 
    //RECIVED MESSAGE
    message = message['value'];
    console.log(message)
});
```
