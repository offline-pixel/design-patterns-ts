abstract class Subscription {
    public info: string;
    public getInfo(): string {
        return this.info
    }
    public abstract cost(): number
}

class Monthly extends Subscription {
    public info = "Monthly"
    public cost(): number {
        return 899
    }
}
class Quarterly extends Subscription {
    public info = "Quarterly"
    public cost(): number {
        return 3399
    }
}
class Annual extends Subscription {
    public info = "Annual"
    public cost(): number {
        return 9899
    }
}

abstract class Options extends Subscription {
    decorator: Subscription
    
    public abstract getInfo(): string
    public abstract cost(): number
}

class PageViews extends Options {
    decorator: Subscription

    constructor( subscription: Subscription){
        super()
        this.decorator = subscription
    }
    public getInfo(): string {
        return this.decorator.getInfo() + ` PageViews: ${true}`
    }
    public cost(): number {
        return this.decorator.cost() + 100
    }
}

class DarkTheme extends Options {
    decorator: Subscription

    constructor( subscription: Subscription){
        super()
        this.decorator = subscription
    }
    public getInfo(): string {
        return this.decorator.getInfo() + ` DarkTheme: ${true}`
    }
    public cost(): number {
        return this.decorator.cost() + 1000
    }
}

let myPlan = new Monthly()
myPlan = new DarkTheme(myPlan)

console.log(myPlan)
console.log(myPlan.getInfo())
console.log(myPlan.cost())