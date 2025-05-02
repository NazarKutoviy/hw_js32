class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerRefs = this.getRefs(selector);
    this.start();
  }
  getRefs(selector) {
    const container = document.querySelector(selector);
    return {
      days: container.querySelector('[data-value="days"]'),
      hours: container.querySelector('[data-value="hours"]'),
      mins: container.querySelector('[data-value="mins"]'),
      secs: container.querySelector('[data-value="secs"]'),
    };
  }
  start() {
    this.updateTimer();
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }
  updateTimer() {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;
    if (time <= 0) {
      clearInterval(this.intervalId);
      this.updateValues(0, 0, 0, 0);
      return;
    }
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.updateValues(days, hours, mins, secs);
  }
  updateValues(days, hours, mins, secs) {
    this.timerRefs.days.textContent = days;
    this.timerRefs.hours.textContent = this.pad(hours);
    this.timerRefs.mins.textContent = this.pad(mins);
    this.timerRefs.secs.textContent = this.pad(secs);
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
}
const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2025"),
});
