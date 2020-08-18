interface State {
    order: Order

    cancelOrder()
    verifyPayment()
    shipOrder()
}

class Order {
    public paymentPendingState: State
    public cancelledOrderState: State
    public orderBeingPreparedState: State
    public orderShippedState: State

    public currentState: State
    constructor(){
        this.paymentPendingState = new PaymentPendingState(this)
        this.cancelledOrderState = new CancelledOrderState(this)
        this.orderBeingPreparedState = new OrderBeingPreparedState(this)
        this.orderShippedState = new OrderShippedState(this)

        this.setState(this.paymentPendingState)
    }

    public setState(state: State){
        this.currentState = state
    }
    public getState(): State {
        return this.currentState
    }
}

class PaymentPendingState implements State {
    order: Order
    constructor(order: Order){
        this.order = order
    }
    cancelOrder() {
        console.log('cancelling the order')
        this.order.setState(this.order.cancelledOrderState)
    }
    verifyPayment() {
        console.log('Payment Verified! Shipping soon')
        this.order.setState(this.order.orderBeingPreparedState)
    }
    shipOrder() {
        console.log('Cannot ship the order! Payment is pending.')
    }
}

class CancelledOrderState implements State {
    order: Order
    constructor(order: Order){
        this.order = order
    }
    cancelOrder() {
        console.log('Order is already cancelled')
    }
    verifyPayment() {
        console.log('Cannot verify payment of a cancelled order.')
    }
    shipOrder() {
        console.log('Cannot ship cancelled order.')
    }
}

class OrderBeingPreparedState implements State {
    order: Order
    constructor(order: Order){
        this.order = order
    }
    cancelOrder() {
        console.log('Cancelling order')
        this.order.setState(this.order.cancelledOrderState)
    }
    verifyPayment() {
        console.log('Payment is already verified')
    }
    shipOrder() {
        console.log('Order is shipping')
        this.order.setState(this.order.orderShippedState)
    }
}

class OrderShippedState implements State {
    order: Order
    constructor(order: Order){
        this.order = order
    }
    cancelOrder() {
        throw new Error("Cannot cancelled a shipped product.")
    }
    verifyPayment() {
        console.log('Cannot verify payment of a shipped product.')
    }
    shipOrder() {
        console.log('Already shipped.')
    }
}

let order = new Order()
// order.getState().shipOrder()
// 1. console.log while commenting line 102
// 2. Uncomment line 102, and play with states :)
console.log('Order State: ' + (<any> order.getState()).constructor.name)