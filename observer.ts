interface Subject {
    addObserver(o: Observer)
    deleteObserver(o: Observer)
    notifyObservers()
}
interface Observer {
    update(time: Date)
}

class TimeStation implements Subject {
    private time: Date
    private observers: Observer[] = [] // Also initialize with empty array

    setTime(date: Date){
        console.log(`TimeStation, client time is- ${date}`)
        this.time = date
        this.notifyObservers()
    }

    addObserver(o: Observer) {
        this.observers.push(o)
    }
    deleteObserver(o: Observer) {
        let index = this.observers.indexOf(o)
        this.observers.splice(index, 1)
    }
    notifyObservers() {
        for (let observer of this.observers){
            observer.update(this.time)
        }
    }
}

class TimeDisplay implements Observer {
    private subject: Subject
    constructor(TimeStation: Subject){
        this.subject = TimeStation
        TimeStation.addObserver(this)
    }
    update(time: Date) {
        console.log(`TimeDisplay, need an update- ${time}`)
        let currentOffset = time.getTimezoneOffset()
        let ISTOffset = 330
        let ISTTime = new Date(time.getTime() + (ISTOffset + currentOffset)*60000);
        // IST result
        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let secondsIST = ISTTime.getSeconds()
        console.log(`${hoursIST}:${minutesIST}:${secondsIST}`)
    }
}
let station = new TimeStation()
let display = new TimeDisplay(station)

station.setTime(new Date())