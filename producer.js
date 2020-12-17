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


