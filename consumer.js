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