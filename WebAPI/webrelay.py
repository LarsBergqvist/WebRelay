import RPi.GPIO as GPIO
from flask import Flask, jsonify, abort, request, render_template

app = Flask(__name__)

GPIO.setmode(GPIO.BCM)

relayStateToGPIOState = {
    'off' : GPIO.LOW,
    'on' : GPIO.HIGH
    }

relays = [
    { 'id' : 1, 'name' : 'Window lamp', 'state' : 'off'},
    { 'id' : 2, 'name' : 'Floor lamp', 'state' : 'on'}
    ]

relayIdToPin = {
    1 : 24,
    2 : 25
    }

def Setup():
    for relay in relays:
        print(relay)
        print(relayIdToPin[relay['id']])
        GPIO.setup(relayIdToPin[relay['id']],GPIO.OUT)
        GPIO.output(relayIdToPin[relay['id']],relayStateToGPIOState[relay['state']])

def UpdatePinFromRelayObject(relay):
    GPIO.output(relayIdToPin[relay['id']],relayStateToGPIOState[relay['state']])

@app.route('/WebRelay/', methods=['GET', 'POST'])
def index():
    return render_template('Index.html');
        
@app.route('/WebRelay/api/relays', methods=['GET'])
def get_relays():
    return jsonify({'relays': relays})

@app.route('/WebRelay/api/relays/<int:relay_id>', methods=['GET'])
def get_relay(relay_id):
    relay = [relay for relay in relays if relay['id'] == relay_id]
    if len(relay) == 0:
        abort(404)
    return jsonify({'relay': relay[0]})

@app.route('/WebRelay/api/relays/<int:relay_id>', methods=['PUT'])
def update_relay(relay_id):
    relay = [relay for relay in relays if relay['id'] == relay_id]
    if len(relay) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if not 'state' in request.json:
        abort(400)
    state = request.json.get('state', relay[0]['state'])
    relay[0]['state']=state
    UpdatePinFromRelayObject(relay[0])
    return jsonify({'relay': relay[0]})

if __name__ == "__main__":
    print("starting...")
    try:
        Setup()
        app.run(host='0.0.0.0',port=80,debug=True)
    finally:
        print("cleaning up")
        GPIO.cleanup()
